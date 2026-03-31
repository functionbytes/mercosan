# Security Agent Memory

## Project: Alsernet (Inoqualab) - Laravel 12 Modular App

## Key Architecture Notes
- Code lives in `modules/ModuleName/`, NOT root `app/`
- Auth policies registered in `modules/Chat/app/Providers/AuthServiceProvider.php`
- `forAccount` scope comes from `BelongsToAccount` trait (`modules/Chat/app/Models/Concerns/BelongsToAccount.php`)
- Route list command fails due to missing `Modules\Erp\Http\Controllers\Eloquent\ClienteController` - use Grep/Read instead

## Known Vulnerabilities (Chat Module - Conversation/Message Authorization)

See `conversation-auth-audit.md` for full details.

### Critical (unfixed as of 2026-02-19)
1. **Missing `authorize()` in ConversationController::update/destroy** - no policy check before modifying/deleting
2. **Missing `authorize()` in ConversationStatusController** - all 5 methods (updateStatus, close, reopen, snooze, unsnooze) lack authorization
3. **Missing `authorize()` in ConversationAssignmentController** - all 3 methods (assign, updateTeam, updatePriority) lack authorization
4. **Missing `authorize()` in ConversationLabelController** - all 3 methods lack authorization
5. **Missing `authorize()` in ConversationExportController::exportToPdf/printView/emailTranscript** - no account_id check
6. **No MessagePolicy** - messages authorized only via parent conversation ownership check, but MessageController::store lacks this check entirely
7. **MessageController::store** - no account_id isolation check, any authenticated user can post to any conversation
8. **Legacy WidgetController::getMessages/sendMessage/markAsRead/uploadFile** - no customer_id ownership check (IDOR)
9. **WidgetConversationController::getMessages/close** - uses `$request->customer_id` (raw, not validated) instead of `$request->validated('customer_id')`
10. **WidgetApiController::sendMessage** - allows `message_type` to be set to any value (including 'outgoing') from widget

### Warnings
- Private notes (`private=true`) not filtered from widget API responses - agents' internal notes could be exposed to customers
- `StoreConversationRequest::authorize()` returns `true` unconditionally (no policy used)
- `UpdateConversationRequest::authorize()` returns `true` unconditionally
- `team_id` and `assignee_id` in ConversationAssignmentController not validated against account_id

## Passed Checks
- `ConversationPolicy` registered and enforces `account_id` isolation for view/update/delete
- `ConversationRoutingController` correctly calls `$this->authorize('update', $conversation)`
- `TypingIndicatorController` correctly calls `$this->authorize('view', $conversation)`
- `MediaController` correctly uses `$this->authorize()` for all methods
- All helpdesk web routes require `auth` middleware
- Settings routes require `role:super-admin` middleware
- Widget API routes have `throttle` middleware
- `forAccount` scope consistently applied in ConversationController listing methods

## Known Vulnerabilities (Chat Module - Customer Authorization)

See `customer-auth-audit.md` for full details.

### Critical (unfixed as of 2026-02-19)
1. **CustomerController::update** - `UpdateCustomerRequest::authorize()` delegates to policy correctly, but controller itself has NO `$this->authorize()` call - double-check works but is fragile
2. **CustomerController::storeNote** - NO `$this->authorize()` call; authorization deferred to `StoreNoteRequest::authorize()` only - if request class is bypassed, no protection
3. **CustomerController::updateCustomAttributes** - NO `$this->authorize()` call; only `UpdateCustomAttributesRequest::authorize()` - same fragility as above
4. **BulkCustomerController::addLabels** - no account_id ownership check on `customer_ids` before dispatching job; job enforces it asynchronously but controller accepts any IDs
5. **BulkCustomerController::removeLabels** - same as addLabels - no synchronous account ownership check
6. **CustomerImportController::preview/execute** - `label_ids` validated as `exists:helpdesk_labels,id` but NOT checked against `account_id` - labels from other accounts can be applied
7. **CustomerSegmentController::addContacts/removeContacts** - no `$this->authorize()` call on segment; no check that customer_ids belong to the same account as the segment

### Warnings
- `StoreCustomerRequest::authorize()` returns `true` unconditionally - rely on auth middleware only
- `BulkAddLabelRequest` and `BulkRemoveLabelRequest` both have `authorize() = true` (no policy check)
- `BulkDeleteRequest` has `authorize() = true` (no policy check)
- Controller methods for avatar, notes, labels, bulk, and forceDelete have NO registered routes (dead code) - cannot be exploited currently but is a maintenance risk

### Customer Auth Passed
- `CustomerPolicy` exists with view/update/delete all checking `account_id` equality
- `CustomerPolicy` registered in `AuthServiceProvider` for `Customer::class`
- `CustomerController::show/edit/destroy/block/unblock/ban/unban/removeLabel/destroyNote/restore/forceDelete` all call `$this->authorize()`
- `CustomerAvatarController::upload/destroy` both call `$this->authorize('update', $customer)`
- `CustomerMergeController::previewMerge/executeMerge` check account_id inline
- `CustomerSegmentPolicy` enforces account_id for show/update/delete
- `BulkCustomerController::delete` performs synchronous account ownership check before dispatching
- `forAccount` scope used in index/export/import/merge/mergeForm/findDuplicates
- No mass-assignment risk: `account_id` is in `$fillable` but store() sets it from `auth()->user()->account_id`

## Rate Limiting Audit (2026-02-19)

See `rate-limiting-audit.md` for full details.

### Named Rate Limiters (app/Providers/RouteServiceProvider.php)
- `helpdesk.settings`: 100/min per user (all /setting/helpdesk/* routes)
- `helpdesk.sensitive`: 10/min per user (team-roles, macro execute, HMAC regen, SMTP test, WhatsApp sync, SMS test)
- `helpdesk.imports`: 5/min per user (customer import/export, contacts export)
- `helpdesk.webhooks`: 20/min per user (webhook CRUD)
- `api`: 60/min per user/IP (default API group)

### Routes WITHOUT Throttle (gaps - all require auth)
- `/helpdesk/conversations/*` - only web+auth
- `/helpdesk/customers/*` (import sub-routes) - only web+auth (import execute has no extra throttle)
- `/settings/users/*` - web+auth+role:super-admin, NO throttle
- `/settings/roles|permissions/*` - web+auth+role:super-admin, NO throttle (HIGH risk: permission assignment)
- `/settings/documents/*` - web+auth+role:super-admin, NO throttle
- `/setting/suppliers/*` and `/suppliers/*` - web+auth+role:super-admin, NO throttle (automation run triggers)
- `/settings/warehouse/*` - web+auth+role:super-admin, NO throttle
- Agent heartbeat route (`/setting/helpdesk/agent/heartbeat`) - under helpdesk.settings (100/min) - acceptable

### What Passes
- Login: ThrottlesLogins trait (5 attempts, 1-min lockout) in LoginController
- Widget API: throttle:60,1 (IP-based)
- Widget message: WidgetMessageRateLimiter (10/min per customer_id)
- CSAT: throttle:30,1
- Webhooks (inbound): throttle:300,1
- Canneds API: throttle:120,1 per user
- All Chat settings group: throttle:helpdesk.settings at group level
- X-RateLimit-* headers: injected by ThrottleRequests::addHeaders() for named limiters
- 429 enforcement: verified correct (5 allowed, 1 blocked for helpdesk.imports)
- Supplier API: covered by api group's 60/min default throttle

## Dependency Vulnerabilities (2026-02-19)
- `cachetool/cachetool` >= 8.6 (medium) - abandoned
- `symfony/process` CVE-2026-24739 (medium) - Windows only, file operations
- Abandoned: `jenssegers/mongodb`, `setasign/fpdi-tcpdf`

## Webhook Security Audit (2026-02-19)

See `webhook-security-audit.md` for full details.

### CRITICAL Issues (P0 - Fix Immediately)
1. **Secret token exposure in logs** - FacebookController:65-67, InstagramController:51-57, WhatsappController:54-58 - Expected tokens logged on verification failure
2. **WhatsApp message processing not implemented** - ProcessWhatsappMessageJob is TODO stub, no functionality
3. **Missing CustomerInbox relationship** - ProcessInstagramMessageJob lacks CustomerInbox creation (blocks replies)
4. **Signature verification after logging** - All controllers log full payload BEFORE verifying signature (log pollution DoS)

### WARNINGS (P1-P2)
5. **Attachment URL SSRF** - ProcessFacebookMessageJob:342-360 downloads URLs without origin validation (can access internal IPs)
6. **No sender ID validation** - Facebook/Instagram sender IDs not validated as numeric (pollution risk)
7. **No message length limits** - Messages stored without size validation (storage DoS)
8. **No per-channel rate limiting** - Global 300/min limit shared across all webhook channels (abuse risk)
9. **No unique constraints** - page_id/instagram_id/phone_number can be configured by multiple accounts (cross-tenant risk)

### What Passes ✅
- HMAC-SHA256 signature verification with `hash_equals()` (timing attack safe)
- Token validation for webhook subscription challenges
- Rate limiting: 300/min per IP for all webhooks
- Multi-tenant safety: `account_id` used in ALL database queries
- SQL injection prevention: Eloquent ORM with parameterized queries
- XSS prevention: Message content stored safely, Blade auto-escaping
- Error handling: Always return 200 to Meta, retry logic with backoff
- Mass assignment protection: `$fillable` defined on Customer and ConversationMessage

### Priority Fixes
**P0**: Remove secret logging (4 files), implement WhatsApp job, add Instagram CustomerInbox
**P1**: Move signature check before logging, validate attachment URLs (Facebook CDN only)
**P2**: Add sender ID format validation, message length limits (10KB), per-channel throttling
