# Review Agent Memory

## Project Architecture

### Module Structure
- Module: `modules/Chat/`
- Public assets: `modules/Chat/public/` symlinked at `public/chat-module/`
- Asset path in Blade: `asset('chat-module/js/...')` — NOT `modules/chat/`
- JS modules live in `modules/Chat/public/js/chat/`

### Authentication & Authorization
- Routes use `middleware(['web', 'auth'])` for helpdesk
- No global scope on `Conversation` model — `forAccount()` must be called explicitly
- `ConversationController::show()` uses route model binding WITHOUT account isolation check
  → Any authenticated user can view any conversation by guessing the ID (critical bug)
- `ConversationController::getVariableData()` has the same problem (no account check)

### Known Vulnerabilities Found
- `index()` method: `orderBy($sortField, $sortDirection)` — both params come from user input
  with NO whitelist validation → SQL column injection risk (not values, but column names)
- `show()` and `getVariableData()` missing account_id ownership check

### AttachmentConfigService Pattern
- In-request cache via `private ?array $config = null`
- Uses `DB::table('settings')` directly (correct, settings is a simple KV table)
- No error handling if `json_decode` returns null on malformed JSON — falls back to `[]` (safe)
- `getMimeIconMap()` and `getMimeToFileExtension()` are static data — could be constants

### JS Module Patterns
- All modules use IIFE `(function($) { 'use strict'; ... })(jQuery);`
- Expose API via `window.ChatXxx = { ... }` pattern
- `window.ChatConfig` is the single source of truth for PHP→JS data
- `isSending` in message-sender.js is module-scoped — safe for single-page, but problematic
  if the partial is re-loaded via AJAX (multiple event listeners could bind on `.message-type-box`)
- `details/message-template.js` and `message-template.js` are near-duplicates (diverging)
- Hardcoded URL prefix `/helpdesk/conversations/` throughout all JS modules

### Event-Driven Architecture (Chat Module)
- `EventServiceProvider` uses explicit `$listen` map (NOT auto-discovery) — `$shouldDiscoverEvents = false`
- Listeners with multiple event handlers use `@method` syntax: `DispatchWebhooksListener::class.'@handleConversationCreated'`
- ALL listeners implement `ShouldQueue` with `InteractsWithQueue` — none have `failed()` methods (gap)
- `ConversationObserver` now dispatches pure events only (no service calls) — correct pattern
- `MessageObserver` still calls services directly (`SlaService`, `AutomationRuleExecutor`) — inconsistent
- `ConversationStatusController` dispatches `SendCsatSurvey` directly AND `ConversationStatusChanged` event
  → `UpdateConversationStatusListener` ALSO dispatches `SendCsatSurvey` on status=resolved
  → DOUBLE CSAT DISPATCH when status change comes from this controller
- `ConversationAssignmentController` uses `broadcast()` (not `event()`) for ConversationAssigned
  → Broadcast-only; listener `NotifyAgentsListener` WILL still fire (broadcast wraps event dispatch)
- `UpdateConversationStatusListener` has a real implementation; `AssignConversationNotificationListener` is stub-only
- `ConversationStatusChanged` payload stores raw status_id strings, not slugs → listeners check `status?->slug` via relation (works but requires DB query)

### Blade Detail Partial
- `fa-duotone fa-comments` class: Font Awesome Duotone is NOT included in this project
  → Use `fas fa-comments` instead
- Asset path in Blade uses `modules/chat/js/...` but correct path is `chat-module/js/...`
  → This breaks all 6 JS modules silently
- Missing `conversely` loading relation — `conversationSession` accessed without eager load
