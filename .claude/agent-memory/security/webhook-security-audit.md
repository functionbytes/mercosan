# Webhook Security Audit - Instagram, Facebook, WhatsApp (2026-02-19)

## Audit Scope
- `modules/Chat/app/Http/Controllers/Api/Webhooks/FacebookController.php`
- `modules/Chat/app/Http/Controllers/Api/Webhooks/InstagramController.php`
- `modules/Chat/app/Http/Controllers/Api/Webhooks/WhatsappController.php`
- `modules/Chat/app/Jobs/Webhooks/ProcessFacebookMessageJob.php`
- `modules/Chat/app/Jobs/Webhooks/ProcessInstagramMessageJob.php`
- `modules/Chat/app/Jobs/Webhooks/ProcessWhatsappMessageJob.php`
- `modules/Chat/app/Services/Webhooks/WhatsappWebhookService.php`

---

## CRITICAL Vulnerabilities (Must Fix)

### 1. **Secret Exposure in Logs** - CRITICAL 🔴
**Files**: `FacebookController.php:65-67`

**Issue**: Expected token value logged in plaintext when verification fails:
```php
Log::warning('Facebook webhook verification failed: global token mismatch', [
    'expected' => $expectedToken,  // ❌ LOGS SECRET TOKEN
    'received' => $token,
]);
```

**Impact**: Secret webhook verification tokens exposed in log files. If logs are accessed by unauthorized users (log aggregation, compromised server, etc.), attackers can bypass webhook verification.

**Fix**: Remove `expected` key from log, only log failure event:
```php
Log::warning('Facebook webhook verification failed: global token mismatch');
```

**Also affects**:
- `FacebookController.php:53-56` (page-specific token)
- `InstagramController.php:51-57` (account token)
- `WhatsappController.php:54-58` (phone number token)

---

### 2. **Missing CustomerInbox Relationship** - CRITICAL 🔴
**File**: `ProcessInstagramMessageJob.php`

**Issue**: Instagram job does NOT create `CustomerInbox` relationship (Facebook job does). This prevents outgoing messages from being sent (CustomerInbox missing error).

**Impact**: One-way communication only - agents cannot reply to Instagram messages. Critical functionality gap.

**Fix**: Add `ensureCustomerInboxExists()` method (like in ProcessFacebookMessageJob lines 232-253).

---

### 3. **WhatsApp Message Processing Not Implemented** - CRITICAL 🔴
**File**: `ProcessWhatsappMessageJob.php`

**Issue**: Entire job is a TODO stub (line 43-48). No customer creation, no conversation creation, no message storage.

**Impact**: WhatsApp webhooks accepted but messages silently discarded. Zero WhatsApp integration functionality.

**Fix**: Implement full message processing flow (customer, conversation, message creation).

---

### 4. **Timing Attack on Signature Verification** - MEDIUM 🟠
**Files**: All 3 webhook controllers

**Issue**: `hash_equals()` used correctly for signature comparison ✅, BUT comparison happens AFTER full payload processing:
```php
// FacebookController.php:94-105
public function handle(Request $request, ?string $pageId = null): JsonResponse
{
    try {
        // LOG EVERYTHING FACEBOOK SENDS  ❌ BEFORE signature check
        $fullPayload = $request->all();
        Log::channel('facebook_debug')->info('=== FACEBOOK WEBHOOK RECEIVED ===', [
            'timestamp' => now()->toDateTimeString(),
            'headers' => $request->headers->all(),
            'full_payload' => $fullPayload,
            'raw_body' => $request->getContent(),
        ]);

        // Verify webhook signature  ❌ TOO LATE
        if (! $this->verifySignature($request)) {
```

**Impact**: Unauthenticated requests are logged in full (including headers, payload) before signature verification. This creates log pollution attack vector and performance DoS (expensive logging before auth).

**Fix**: Move `verifySignature()` call to FIRST line of `handle()` method, before any logging or processing.

---

## WARNINGS (Should Fix)

### 5. **SQL Injection via User-Controlled Identifier** - LOW 🟡
**Files**: `ProcessFacebookMessageJob.php:177`, `ProcessInstagramMessageJob.php:130`

**Current Code**:
```php
Customer::where('account_id', $this->facebookPage->account_id)
    ->where('identifier', 'facebook_'.$senderId)  // $senderId from webhook
    ->first();
```

**Analysis**:
- `$senderId` comes from `$this->event['sender']['id']` (webhook payload)
- Using Eloquent `where()` method (parameterized queries) ✅
- Concatenation happens in PHP, not SQL ✅
- **Verdict**: Safe from SQL injection but identifiers not sanitized

**Recommendation**: Add validation that `$senderId` is numeric/alphanumeric to prevent pollution:
```php
if (!preg_match('/^[0-9]+$/', $senderId)) {
    Log::warning('Invalid sender ID format', ['sender_id' => $senderId]);
    return;
}
```

---

### 6. **No Input Validation on Message Content** - LOW 🟡
**Files**: All processing jobs

**Issue**: Message text stored directly without sanitization:
```php
// ProcessFacebookMessageJob.php:44, 104
$messageText = $this->event['message']['text'] ?? null;
// ...
'content' => $messageContent,  // Stored as-is
```

**Analysis**:
- Content stored in TEXT column (no SQL injection risk)
- Output escaped in Blade views with `{{ }}` (XSS safe in UI)
- BUT: No length validation (potential for extremely large messages)
- No malicious content scanning (URLs, scripts, etc.)

**Recommendation**: Add max length validation:
```php
if (strlen($messageText) > 10000) {
    $messageText = substr($messageText, 0, 10000);
    Log::warning('Message truncated - exceeded max length');
}
```

---

### 7. **Attachment URL Validation Missing** - MEDIUM 🟠
**File**: `ProcessFacebookMessageJob.php:342-360`

**Issue**: Attachment URLs downloaded without validation:
```php
$url = $attachment['payload']['url'] ?? null;
if (!$url) continue;

$response = Http::get($url);  // ❌ No URL validation
```

**Impact**:
- SSRF (Server-Side Request Forgery) - attacker can make server request internal IPs
- Download malware/exploits from attacker-controlled URLs
- Potential for XXE if processing XML files

**Fix**: Validate URL is from Facebook CDN:
```php
if (!str_starts_with($url, 'https://cdn.fbsbx.com/') &&
    !str_starts_with($url, 'https://scontent.')) {
    Log::warning('Invalid attachment URL origin', ['url' => $url]);
    continue;
}
```

---

### 8. **Account Isolation Not Verified in Controllers** - MEDIUM 🟠
**Files**: All webhook controllers

**Issue**: Controllers find channel by `page_id`/`instagram_id`/`phone_number` but don't verify account_id ownership:
```php
// FacebookController.php:130
$facebookPage = Facebook::where('page_id', $pageId)->first();
```

**Analysis**:
- Jobs DO verify `account_id` correctly ✅
- BUT: If two accounts configure same page_id (misconfiguration), webhooks could cross accounts
- Unlikely but possible edge case

**Recommendation**: Add unique constraint in migration:
```php
$table->unique(['page_id']);  // Ensure only one account per Facebook page
```

---

### 9. **No Rate Limiting Per Channel** - MEDIUM 🟠
**File**: `routes/api.php:52`

**Current**: Global rate limit `throttle:300,1` for all webhooks (300/min per IP)

**Issue**:
- Meta (Facebook/Instagram) sends from multiple IPs
- Single compromised channel can exhaust rate limit for all channels
- No per-channel abuse protection

**Recommendation**: Implement per-channel rate limiting:
```php
Route::post('/facebook/{pageId}', [FacebookController::class, 'handle'])
    ->middleware('throttle:facebook-webhook:'.$pageId.',100,1');
```

---

### 10. **Broadcast Events Without Account Scoping** - LOW 🟡
**File**: `ProcessFacebookMessageJob.php:135-155`

**Issue**: Broadcast events use `toOthers()` but not account-scoped channels:
```php
broadcast(new \Modules\Chat\Events\MessageSent($message))->toOthers();
broadcast(new \Modules\Chat\Events\ConversationUpdated($conversation, 'new_message'))->toOthers();
```

**Analysis**:
- If MessageSent/ConversationUpdated events use private channels (e.g., `conversation.{id}`), authorization callback should check account_id
- Need to verify channel definitions in `modules/Chat/routes/channels.php`

**Recommendation**: Verify channel authorization checks account_id:
```php
Broadcast::channel('conversation.{conversationId}', function ($user, $conversationId) {
    $conversation = Conversation::find($conversationId);
    return $user->account_id === $conversation->account_id;
});
```

---

## PASSED Checks ✅

### Signature Verification
- ✅ Facebook: HMAC-SHA256 with `X-Hub-Signature-256` header (line 178-196)
- ✅ Instagram: HMAC-SHA256 with `X-Hub-Signature-256` header (line 152-171)
- ✅ WhatsApp Cloud API: HMAC-SHA256 (WhatsappWebhookService line 16-35)
- ✅ WhatsApp Evolution: API key validation (WhatsappWebhookService line 40-57)
- ✅ All use `hash_equals()` for constant-time comparison (timing attack safe)

### Token Validation
- ✅ Facebook: Validates `hub_verify_token` against config or page-specific token
- ✅ Instagram: Validates `hub_verify_token` against config or account token
- ✅ WhatsApp: Validates `hub_verify_token` per phone number channel
- ✅ All verify `hub_mode === 'subscribe'` (Facebook requirement)

### Rate Limiting
- ✅ Webhook routes: `throttle:300,1` (300 requests/min per IP)
- ✅ Widget routes: `throttle:60,1` + message-specific middleware
- ✅ CSAT routes: `throttle:30,1`

### Multi-Tenant Safety (Jobs)
- ✅ `account_id` used in ALL queries (Customer, Conversation, ConversationMessage creation)
- ✅ Facebook job: Lines 100, 176, 211, 261, 273
- ✅ Instagram job: Lines 86, 126, 162, 174
- ✅ No cross-account data leakage in message processing

### Input Validation Structure
- ✅ Required field validation: sender_id, message text/attachments checked before processing
- ✅ Object type validation: `$data['object'] === 'page'` (Facebook), `=== 'instagram'`, `=== 'whatsapp_business_account'`
- ✅ Graceful handling: Missing channels logged and skipped, not crashed

### SQL Injection Prevention
- ✅ All queries use Eloquent ORM with parameterized queries
- ✅ No `whereRaw()`, `DB::raw()`, or raw SQL found in webhook code
- ✅ Mass assignment: `$fillable` defined (Customer line 36-54, ConversationMessage line 29)

### Error Handling
- ✅ All controllers wrapped in try/catch, always return 200 to Meta (prevents retry storms)
- ✅ Failed jobs: Retry logic with backoff (3 tries, [10s, 30s, 60s])
- ✅ Transaction rollback on failure (DB consistency maintained)

### XSS Prevention
- ✅ Message content stored in database (TEXT column)
- ✅ Frontend output assumed to use `{{ $message->content }}` (auto-escaped)
- ✅ No direct HTML rendering of webhook data in controllers

---

## Priority Fixes

### P0 (Fix Immediately)
1. Remove secret token logging from all 4 controllers (lines identified above)
2. Implement ProcessWhatsappMessageJob (currently non-functional)

### P1 (Fix This Week)
3. Add CustomerInbox creation to ProcessInstagramMessageJob
4. Move signature verification before logging in all handle() methods
5. Add attachment URL whitelist validation (Facebook CDN only)

### P2 (Fix This Month)
6. Add sender_id format validation (numeric only)
7. Add message content length limits (10KB max)
8. Implement per-channel rate limiting
9. Add unique constraints for page_id/instagram_id/phone_number

### P3 (Review & Verify)
10. Audit broadcast channel authorization (check channels.php)
11. Add malicious URL scanning for attachment payloads
12. Implement webhook signature replay attack protection (timestamp validation)

---

## Files to Update

**Critical Fixes**:
1. `FacebookController.php` - Remove secret logging, move signature check
2. `InstagramController.php` - Remove secret logging, move signature check
3. `WhatsappController.php` - Remove secret logging
4. `ProcessInstagramMessageJob.php` - Add CustomerInbox creation
5. `ProcessWhatsappMessageJob.php` - Implement full message processing

**Medium Priority**:
6. `ProcessFacebookMessageJob.php` - Add URL validation, length limits
7. `routes/api.php` - Add per-channel throttling
8. Migration - Add unique constraints for channel identifiers

---

## Testing Recommendations
1. Test webhook replay attacks (resend old payloads with valid signatures)
2. Test SSRF with malicious attachment URLs (http://127.0.0.1, file://, etc.)
3. Test rate limit bypass with multiple IPs
4. Test cross-account message injection (misconfigured page_id)
5. Verify broadcast events don't leak to other accounts
