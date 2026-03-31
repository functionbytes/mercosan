# Conversation & Message Authorization Audit
# Date: 2026-02-19

## Files Audited
- `modules/Chat/app/Policies/ConversationPolicy.php`
- `modules/Chat/app/Providers/AuthServiceProvider.php`
- `modules/Chat/routes/web.php`
- `modules/Chat/routes/api.php`
- `modules/Chat/app/Http/Controllers/Helpdesk/Conversations/ConversationController.php`
- `modules/Chat/app/Http/Controllers/Helpdesk/Conversations/MessageController.php`
- `modules/Chat/app/Http/Controllers/Helpdesk/Conversations/ConversationStatusController.php`
- `modules/Chat/app/Http/Controllers/Helpdesk/Conversations/ConversationAssignmentController.php`
- `modules/Chat/app/Http/Controllers/Helpdesk/Conversations/ConversationLabelController.php`
- `modules/Chat/app/Http/Controllers/Helpdesk/Conversations/ConversationExportController.php`
- `modules/Chat/app/Http/Controllers/Helpdesk/Conversations/ConversationRoutingController.php`
- `modules/Chat/app/Http/Controllers/Helpdesk/Conversations/TypingIndicatorController.php`
- `modules/Chat/app/Http/Controllers/Helpdesk/Conversations/MediaController.php`
- `modules/Chat/app/Http/Controllers/Api/WidgetController.php`
- `modules/Chat/app/Http/Controllers/Api/WidgetApiController.php`
- `modules/Chat/app/Http/Controllers/Api/WidgetConversationController.php`

## Policy Coverage Matrix

| Controller::Method | Route | Has authorize()? | How? |
|---|---|---|---|
| ConversationController::index | GET /helpdesk/conversations | Manual account_id | abort(403) if no account |
| ConversationController::show | GET /{conversation} | Partial | abort_if account_id mismatch |
| ConversationController::store | POST /store | No policy | account_id from auth()->user() |
| ConversationController::update | PUT /{conversation} | **MISSING** | None |
| ConversationController::destroy | DELETE /{conversation} | **MISSING** | None |
| ConversationController::getVariableData | GET /{conversation}/variables | Manual | abort_if account_id mismatch |
| ConversationStatusController::updateStatus | PATCH /{conversation}/status | **MISSING** | None |
| ConversationStatusController::close | POST /{conversation}/close | **MISSING** | None |
| ConversationStatusController::reopen | POST /{conversation}/reopen | **MISSING** | None |
| ConversationStatusController::snooze | POST /{conversation}/snooze | **MISSING** | None |
| ConversationStatusController::unsnooze | POST /{conversation}/unsnooze | **MISSING** | None |
| ConversationAssignmentController::assign | PATCH /{conversation}/assign | **MISSING** | None |
| ConversationAssignmentController::updateTeam | PATCH /{conversation}/team | **MISSING** | None |
| ConversationAssignmentController::updatePriority | PATCH /{conversation}/priority | **MISSING** | None |
| ConversationLabelController::addLabels | POST /{conversation}/labels | **MISSING** | None |
| ConversationLabelController::updateLabels | PATCH /{conversation}/labels | **MISSING** | None |
| ConversationLabelController::removeLabel | DELETE /{conversation}/labels | **MISSING** | None |
| ConversationExportController::exportToPdf | GET /{conversation}/export-pdf | **MISSING** | None |
| ConversationExportController::printView | GET /{conversation}/print | **MISSING** | None |
| ConversationExportController::emailTranscript | POST /{conversation}/email-transcript | **MISSING** | None |
| ConversationExportController::exportToExcel | GET /export-excel | Manual account_id | account_id from auth |
| ConversationRoutingController::autoAssign | POST /{conversation}/auto-assign | YES | $this->authorize('update') |
| ConversationRoutingController::suggest | GET /{conversation}/suggest-agent | YES | $this->authorize('update') |
| TypingIndicatorController::__invoke | POST /{conversation}/typing | YES | $this->authorize('view') |
| MessageController::store | POST /{conversation}/messages | **MISSING** | None |
| MediaController::index | GET /{conversation}/media | YES | $this->authorize('view') |
| MediaController::download | GET /media/{media}/download | YES | $this->authorize('view') |
| MediaController::destroy | DELETE /media/{media} | YES | $this->authorize('update') |
| MediaController::preview | GET /media/{media}/preview | YES | $this->authorize('view') |

## Widget API Issues

### WidgetController (legacy, `/api/widget/conversation/{id}/...`)
- `getMessages`: No customer_id validation — any caller can read any conversation's messages
- `sendMessage`: No customer_id validation — any caller can post to any conversation
- `markAsRead`: No customer_id validation — any caller can mark any conversation as read
- `uploadFile`: No customer_id validation — any caller can upload files to any conversation
- All responses include `private` messages — internal agent notes exposed to widget users

### WidgetConversationController (`/lc/api/conversation/{id}/...`)
- `getMessages` (line 245): Uses `$request->customer_id` (raw, unvalidated) instead of `$request->validated('customer_id')` - validator result not used
- `close` (line 314): Same issue - raw `$request->customer_id` used

### WidgetApiController (`/api/widget/{websiteToken}/...`)
- `sendMessage` (line 127): Accepts `message_type` from request input — widget users could forge `'outgoing'` messages appearing to be from agents

## Fix Recommendations

### Critical Fixes

1. Add `$this->authorize('update', $conversation)` to:
   - `ConversationController::update`
   - `ConversationController::destroy`
   - `ConversationStatusController::updateStatus/close/reopen/snooze/unsnooze`
   - `ConversationAssignmentController::assign/updateTeam/updatePriority`
   - `ConversationLabelController::addLabels/updateLabels/removeLabel`
   - `ConversationExportController::exportToPdf/printView/emailTranscript`

2. Add `$this->authorize('view', $conversation)` to `MessageController::store` (or `'update'`)

3. Fix `WidgetController::getMessages/sendMessage/markAsRead/uploadFile` to validate customer_id ownership

4. Fix `WidgetConversationController::getMessages` and `close` to use `$validator->validated()['customer_id']` instead of `$request->customer_id`

5. In `WidgetApiController::sendMessage`, hardcode `'message_type' => 'incoming'` instead of trusting request input

6. Filter private notes from widget API responses: add `->where('private', false)` to all widget message queries

### Should Fix

7. Add `MessagePolicy` and register it for `ConversationMessage::class`
8. Use `$this->authorize()` in Form Request classes instead of returning `true`
9. Validate `team_id` and `assignee_id` belong to the same account in `ConversationAssignmentController`
