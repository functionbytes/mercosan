# Backend Agent Memory

## Authorization Pattern (Chat Module)
- Policies registered in `modules/Chat/app/Providers/AuthServiceProvider.php` via `$policies` array
- All existing policies follow: `$user->account_id === $model->account_id` for account scoping
- `ConversationPolicy` already exists with view/update/delete — covers `ConversationController`
- `MessagePolicy` created for `ConversationMessage` — uses `account_id` directly (no relation load needed)
- Use `$this->authorize('action', $model)` in controllers — replaces `abort_if($model->account_id !== $accountId, 403)`
- PostToolUse hook runs pint after every Edit/Write — file may change between reads; use Write for multi-edit files

## Module Structure (Chat)
- Controllers: `modules/Chat/app/Http/Controllers/`
- Policies: `modules/Chat/app/Policies/`
- Models: `modules/Chat/app/Models/`
- Routes: `modules/Chat/routes/web.php`
- AuthServiceProvider at: `modules/Chat/app/Providers/AuthServiceProvider.php`

## User Model / Account Scoping (Chat Module)
- `User` table has NO `account_id` or `availability_status` columns
- User-to-account is a many-to-many via `helpdesk_accounts_user` pivot (user_id, account_id)
- Agent presence/status lives in `helpdesk_agent_presence` (model: `AgentPresence`) — has account_id + status
- User has `firstname` + `lastname`, NOT a single `name` column
- To scope users to an account: JOIN `helpdesk_accounts_user as pau ON pau.user_id = users.id AND pau.account_id = ?`

## Analytics Query Patterns (Chat Module)
- `whereHas('status', fn($q) => $q->where('slug', 'X'))` → replace with `where('status_id', $this->getStatusId('X'))`
- `whereHas('conversation', fn($q) => $q->where('account_id', ...))` on messages → use `where('account_id', ...)` directly (messages table has account_id)
- Load status IDs once with `ConversationStatus::where('account_id', ...)->pluck('id', 'slug')` cached 60 min
- CSAT table name: `helpdesk_csat_survey_responses` (via `CsatSurveyResponse::getTable()`)
- DashboardMetricsService has `invalidateCache()` — called from `ConversationObserver` on created/updated/deleted

## Known Pre-existing Issues
- `Modules\Reverb\Providers\ReverServiceProvider` has a parse error on line 59 — pint exits 1 because of it (not our problem)
- `Modules\Erp\Http\Controllers\ErpController` does not exist (breaks `route:list`)
