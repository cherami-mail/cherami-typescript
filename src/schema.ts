// Generated from openapi.json. Do not edit.
export interface paths {
    "/v1/inboxes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List inboxes
         * @description `GET /v1/inboxes` returns `200`.
         *
         *     The list is not paginated. `inbox_limit` is the current cap; `inbox_allowance` reports the cap, occupied slots and remaining slots.
         */
        get: operations["listInboxes"];
        put?: never;
        /**
         * Create an inbox
         * @description Both names accept Unicode text up to 256 UTF-8 bytes after trimming, without control characters. Omitted, null and blank names mean no name at creation. Existing inboxes without names return null for both fields. Names need not be unique. Unknown fields are rejected.
         *
         *     Addresses are globally unique. `hello`, `test`, `reviewer_chatgpt` and prefixes beginning `reviewer_chatgpt_` are reserved; retired addresses cannot be reused. No custom domains or allocated-address renaming are supported. To replace an address while keeping the old inbox during transition, see [Change your agent's email address](https://cherami.to/docs/guides/change-email-address).
         *
         *     New creation returns `201` with the inbox object and `Location: /v1/inboxes/{id}`. `400` means invalid input. `409` covers unavailable addresses, the inbox cap and key conflicts. A definitive `address_unavailable` permits choosing another prefix; do not create accounts to evade a cap.
         *
         *     An inbox-cap failure has `error.code: "inbox_limit_reached"` and `error.details` containing `allowance` (the same shape as `inbox_allowance`), `increase_request` and `policy_url`. Request additional slots for another workflow or an address transition rather than retiring an inbox you still need. See [Free and custom allowances](https://cherami.to/pricing).
         *
         *     ### Recover creation
         *
         *     Creation keys are scoped to the authenticated account across HTTP and MCP, independently of sending keys. Protection lasts **24 hours from successful allocation**, without renewal. Keyed results add `replayed` and `idempotency_expires_at`. Initial creation returns `201` with `replayed: false`; a matching retry returns `200` with `replayed: true` and the original inbox ID. Both supply `Location`.
         *
         *     A replay returns the inbox's **current state**, including later name edits. Retry with the original creation inputs, not those edited names. JSON property order is irrelevant; address-prefix case and surrounding whitespace, trimmed name whitespace, and absent/null/blank names normalize equivalently. Different validated inputs return `409 idempotency_conflict`. If the inbox has been deleted, a matching retry returns `409 idempotency_result_unavailable` and never allocates a replacement.
         *
         *     If creation's outcome is uncertain, reuse the original key and unchanged payload **within 24 hours of your first request**. Do not replace the key or choose another address to resolve uncertainty. Validation and allocation failures do not consume a key.
         *
         *     After expiry, the key no longer protects a request: list inboxes and reconcile the intended address before creating again. Unkeyed creation is supported; a second request for the same address conflicts rather than returning the original resource.
         */
        post: operations["createInbox"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/inboxes/{inbox_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Read an inbox
         * @description Returns the owned inbox's address and current names. Missing, deleted and other-account resources return `404`.
         */
        get: operations["getInbox"];
        put?: never;
        post?: never;
        /**
         * Delete an inbox
         * @description `DELETE /v1/inboxes/{inbox_id}` returns `202`.
         *
         *     Permanently deletes the inbox and its received mail, drafts, sent copies, attachments, and threads, including unfinished messages. Confirm the specific inbox and destructive scope with the human before calling it; the API has no separate approval step.
         *
         *     The slot is freed. The address is permanently retired and no longer receives mail. Retrieval and new sends from the deleted inbox return `404`. Other inboxes and the credential remain unchanged. There is no undo or sending-quota refund.
         *
         *     Repeating DELETE is safe and can return `202` or `404`. Missing or other-account resources also return `404`. The service support inbox `hello@cherami.to` returns `409 protected_inbox` to its owner.
         *
         *     [Deletion guide and manual account deletion](https://cherami.to/docs/guides/deletion)
         */
        delete: operations["deleteInbox"];
        options?: never;
        head?: never;
        /**
         * Edit inbox names
         * @description Supply one or both editable names.
         *
         *     Returns `200` with the updated inbox. Omitted fields stay unchanged; null or blank clears a name. The same name limits apply as at creation. An empty object, unknown fields, address or `local_part` changes are rejected.
         *
         *     A sender-name edit affects subsequent sends, not historical mail or a replayed send.
         */
        patch: operations["updateInbox"];
        trace?: never;
    };
    "/v1/inboxes/{inbox_id}/sending-policy": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Inspect sending rules
         * @description `GET /v1/inboxes/{inbox_id}/sending-policy` returns `200`.
         *
         *     `enabled: false` means unrestricted by this control, even when saved addresses or domains remain. When enabled, every To/Cc/Bcc recipient must match an exact address or an exact domain; both lists empty blocks all sending. Local-part case is significant, domain case is not, and plus tags/dots remain distinct. Names do not participate in matching. Each list contains at most 100 normalized, unique entries. Domains are lowercase ASCII, including punycode; matching does not include subdomains unless listed separately.
         *
         *     `revision` is the saved policy version, starting at `0` for an unconfigured inbox. Missing, deleted and other-account inboxes return `404`.
         *
         *     This endpoint is read-only. Only the human's browser session can edit rules in [Account → Sending rules](https://cherami.to/account/sending-rules), not an API key or OAuth mail grant. New inboxes start unrestricted. See [recipient restrictions](https://cherami.to/docs/guides/sending-rules).
         */
        get: operations["getSendingPolicy"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/inboxes/{inbox_id}/receiving-policy": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Inspect receiving rules
         * @description `GET /v1/inboxes/{inbox_id}/receiving-policy` returns `200`.
         *
         *     `enabled: false` pauses blocking without clearing either saved list. When enabled, mail whose visible From address matches an exact address **or** exact domain does not arrive at the inbox, and no copy is kept. Empty lists block nothing. Local-part case matters; domain case does not. Plus tags and dots stay distinct. Each list has at most 100 normalized, unique entries. Domains are lowercase ASCII, including punycode, with no implicit subdomain matching. Messages already received are unaffected by a policy change.
         *
         *     `revision` is the saved version, starting at `0` for an unconfigured inbox. Missing, deleted and other-account inboxes return `404`.
         *
         *     This endpoint is read-only. Only the human's browser session can edit rules in [Account → Receiving rules](https://cherami.to/account/receiving-rules), not an API key or OAuth mail grant. From is written by the sender, so this is nuisance filtering, not authentication. See [receiving rules](https://cherami.to/docs/guides/receiving-rules).
         */
        get: operations["getReceivingPolicy"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/inboxes/{inbox_id}/messages": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List received messages
         * @description Returns `200` with `messages` and `next_cursor`. Messages default to newest-received first. Combine keyword search, sender, recipient, subject, date and label filters; `order` accepts `newest`, `oldest`, or `relevance`. See [search and filtering](https://cherami.to/docs/guides/search). `limit` is 1–100, default 20. Follow the returned cursor as a URL-encoded `cursor` parameter on the same URL, keeping the same filters. Use `labels_all` for required tags, optionally combined with `labels_any` and `labels_none`. See [pagination](https://cherami.to/docs/api/errors#pagination) and [label filtering](https://cherami.to/docs/guides/labels).
         *
         *     The response schema describes every summary field. `subject` may be null. `thread_id` is null until parsing succeeds. Only ready summaries additionally contain `from`, with a parsed address or null if absent; it is omitted for other states.
         *
         *     A parsed address is a mailbox (`{"name":"Sender","address":"sender@example.com"}`) or group (`{"name":"Team","group":[{"name":"Sender","address":"sender@example.com"}]}`). `envelope_from` is the SMTP sender and may be a bounce address.
         *
         *     ### Previews
         *
         *     Both received and sent listings include `preview`: null when derived content is not ready or unavailable, otherwise an object:
         *
         *     `text` is the beginning of the extracted reply when available, otherwise the plain-text body or text derived from HTML. Whitespace is normalized and the excerpt is capped at 300 Unicode code points, preferably at a word boundary. `source` is `reply_text`, `text`, or `html`; `truncated` indicates that the chosen text exceeded the excerpt. A short excerpt may contain the whole chosen text, not necessarily the whole original email. A genuinely empty extracted reply produces `text: ""`, not null.
         */
        get: operations["listMessages"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/inboxes/{inbox_id}/messages/count": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Count received messages
         * @description `GET /v1/inboxes/{inbox_id}/messages/count` returns `200` with `{"count":3}`.
         *
         *     The same search and filters as the received list apply, including combined and exclusion filters. The count is current and includes unfinished messages.
         */
        get: operations["countMessages"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/messages/{message_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Read a received message
         * @description Returns received metadata, raw size and processing completion time. The list-only `from` and `preview` are omitted.
         *
         *     Ready content includes original prepared bodies, parsed header values, extracted reply text and attachment metadata. Unfinished and failed detail responses omit content.
         *
         *     Each received attachment has `id` (string), `filename` (string or null), `size` (bytes), `mime_type`, `disposition` (string or null), `content_id` (string or null), and `related` (boolean). Use its `id` in the attachment download route.
         *
         *     Reply extraction preserves original bodies and does not change full-body search. It prefers plain text and derives text from HTML-only mail without rendering or fetching resources. It can miss unusual quoting or omit inline answers; read `text` or `html` when the full context matters. Explicitly marked forwards are retained rather than treated as quoted replies.
         *
         *     ### Processing states
         *
         *     `pending` and `processing` mean prepared content is not ready. Check later with bounded backoff. `ready` supplies `content`; `failed` does not. All four states can return detail `200`. Raw MIME remains available in unfinished and failed states. Missing stored content can return `503 content_unavailable`.
         */
        get: operations["getMessage"];
        put?: never;
        post?: never;
        /**
         * Delete a received message
         * @description `DELETE /v1/messages/{message_id}` returns `202`.
         *
         *     Permanently deletes the received message and its attachments, including when parsing is unfinished. No trash or undo. It is no longer available for retrieval or as a new reply target. Repeated deletion is safe and can return `202` or `404`.
         *
         *     [Receiving guide](https://cherami.to/docs/guides/receiving) · [Deletion guide](https://cherami.to/docs/guides/deletion)
         */
        delete: operations["deleteMessage"];
        options?: never;
        head?: never;
        /**
         * Label a received message
         * @description Adds or removes labels on a received message. Use `Content-Type: application/json` with a body up to 20 KiB.
         *
         *     At least one array must contain a label. Unknown fields are rejected. Duplicate names within an array are ignored. A name cannot appear in both arrays after trimming.
         *
         *     Names must contain 1–128 UTF-8 bytes after trimming surrounding whitespace, with no control characters or malformed Unicode. Case is preserved: `Receipts` and `receipts` are different tags. Labels are a set; do not rely on their order.
         *
         *     A successful update returns `200` with the message ID and resulting labels. Additions and removals apply together without replacing unrelated labels. Repeating the same update does not duplicate labels.
         *
         *     Invalid changes return `400 invalid_labels`. Missing, deleted, or other-account messages return `404`. Label updates do not require sending or deletion permission and consume no sending allowance.
         */
        patch: operations["updateMessageLabels"];
        trace?: never;
    };
    "/v1/messages/{message_id}/raw": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Download raw MIME
         * @description Returns `200` with original MIME bytes, `Content-Type: message/rfc822`, and attachment disposition. This does not require successful parsing.
         */
        get: operations["downloadRawMessage"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/messages/{message_id}/attachments/{attachment_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Download a received attachment
         * @description Returns `200` with file bytes, `Content-Type: application/octet-stream`, and attachment disposition. Use the ID returned in ready content, not a guessed filename. An unavailable attachment or a message that is not ready returns `404`; missing stored content can return `503`.
         *
         *     Downloads use `no-store`, `nosniff`, and a sandbox content security policy.
         */
        get: operations["downloadAttachment"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/sent/{message_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Read a sent message
         * @description `GET /v1/sent/{message_id}` returns `200` with the sent metadata (without the list-only `preview`), top-level `reply_text`, and `submission`. `reply_text` is heuristic extraction, null if unavailable, or an empty string when no new text is detected. The original attributed bodies remain in `submission`.
         *
         *     The sender and recipient names are historical snapshots, not current inbox settings. Older full submissions may retain bare-address strings. Stored attachments contain original base64 bytes; source-derived inline files also include Content-ID relationships.
         *
         *     Missing or other-account IDs return `404`; unavailable content can return `503`. Inspect `status`: `accepted` is provider acceptance, not delivery.
         */
        get: operations["getSentMessage"];
        put?: never;
        post?: never;
        /**
         * Delete a sent copy
         * @description `DELETE /v1/sent/{message_id}` returns `202` with `id` and `status: "deletion_pending"`. Permanently deletes the sent copy and its attachments with no trash or undo. Deletion does not refund sending quota. Repeating DELETE is safe and can return `202` or `404`.
         */
        delete: operations["deleteSentMessage"];
        options?: never;
        head?: never;
        /**
         * Label a sent copy
         * @description Adds or removes labels on a saved outgoing message. The [individual label validation rules](https://cherami.to/docs/api/labels/update-message-labels) apply: a JSON body up to 20 KiB, at least one nonempty change array, and no name in both arrays after trimming. Labels are case-sensitive sets; duplicate names within an array are ignored.
         *
         *     Returns `200` with the message ID and resulting labels. Additions and removals apply together without replacing unrelated labels. Repeating a change does not duplicate tags.
         *
         *     Invalid changes return `400 invalid_labels`. Missing, deleted or other-account messages return `404`. Updating labels requires neither sending nor deletion permission and consumes no sending allowance.
         */
        patch: operations["updateSentMessageLabels"];
        trace?: never;
    };
    "/v1/messages/labels": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /**
         * Label several received messages
         * @description Changes labels on an explicit set of received messages. The [individual label rules](https://cherami.to/docs/api/labels/update-message-labels) apply; the body may contain up to 32 KiB of JSON.
         *
         *     Supply 1–100 message IDs in `message_ids`; duplicate IDs are updated once. Only `message_ids`, `add_labels`, and `remove_labels` are accepted. The same additions and removals apply to every target. IDs can belong to different inboxes owned by the account, but received and sent copies must use their respective endpoint.
         *
         *     The request is atomic: if any target is missing, deleted, or inaccessible, the response is a generic `404` and no labels change. Invalid ID arrays return `400 invalid_message_ids`. Success returns `200` with one result per distinct ID in request order.
         *
         *     Select explicit IDs before updating; this endpoint does not accept a filter. Larger jobs require separate batches, each atomic on its own.
         */
        patch: operations["bulkUpdateMessageLabels"];
        trace?: never;
    };
    "/v1/sent/labels": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /**
         * Label several sent copies
         * @description Changes labels on an explicit set of saved outgoing copies. The [individual label rules](https://cherami.to/docs/api/labels/update-message-labels) apply; the body may contain up to 32 KiB of JSON.
         *
         *     Supply 1–100 message IDs in `message_ids`; duplicate IDs are updated once. Only `message_ids`, `add_labels`, and `remove_labels` are accepted. The same additions and removals apply to every target. IDs can belong to different inboxes owned by the account, but received and sent copies must use their respective endpoint.
         *
         *     The request is atomic: if any target is missing, deleted, or inaccessible, the response is a generic `404` and no labels change. Invalid ID arrays return `400 invalid_message_ids`. Success returns `200` with one result per distinct ID in request order.
         *
         *     Select explicit IDs before updating; this endpoint does not accept a filter. Larger jobs require separate batches, each atomic on its own.
         */
        patch: operations["bulkUpdateSentLabels"];
        trace?: never;
    };
    "/v1/inboxes/{inbox_id}/labels": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Discover labels
         * @description `GET /v1/inboxes/{inbox_id}/labels` lists names currently used on undeleted received and sent copies in an owned, undeleted inbox.
         *
         *     Optional `prefix` restricts names by a literal, case-sensitive prefix, trimmed using label-name rules. Empty or omitted means all names; supply it at most once. `limit` is 1–100, default 20. Results are ordered by name using case-sensitive binary order, not locale-specific collation. Continue with `cursor` and the same inbox and prefix.
         *
         *     Counts describe messages, not conversations, and include all processing and sending states. A name disappears when no undeleted message uses it. There is no separate label registry or rename operation.
         */
        get: operations["listLabels"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/inboxes/{inbox_id}/sent": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List sent messages
         * @description `GET /v1/inboxes/{inbox_id}/sent?limit=20` returns `200` with `{"messages":[...],"next_cursor":null}`.
         *
         *     Each entry contains sent metadata plus `preview`, with the same [preview contract](https://cherami.to/docs/api/messages/list-messages) as received mail. All statuses are listed, newest-submitted first by default. Combine [search and filters](https://cherami.to/docs/guides/search) and choose `newest`, `oldest`, or `relevance` ordering. Limit is 1–100, default 20. Pass `next_cursor` as a URL-encoded `cursor` parameter on the same inbox's sent URL, keeping the same filters. Lists contain bounded previews, not full bodies or attachments. Use `labels_all` for required tags, optionally combined with `labels_any` and `labels_none`. See [label filtering](https://cherami.to/docs/guides/labels).
         */
        get: operations["listSentMessages"];
        put?: never;
        /**
         * Send a message
         * @description Follow [permitted sending](https://cherami.to/docs/guides/safety#permitted-sending).
         *
         *     Inspect the inbox's [sending rules](https://cherami.to/docs/api/inboxes/get-sending-policy) before preparing a message. All send, reply, reply-all and forward paths enforce every To/Cc/Bcc destination. A blocked attempt returns `403 recipient_not_allowed` without submission or quota use.
         *
         *     For saved preparation and later submission, use the [draft API](https://cherami.to/docs/api/drafts). Draft sending uses the outcomes below, and the draft ID itself prevents a second submission.
         *
         *     ### Request fields
         *
         *     Recipient inputs are named mailbox objects, never bare strings or assembled header syntax. Names are display metadata; addresses determine delivery.
         *
         *     The owned inbox supplies From and its configured [sender name](https://cherami.to/docs/api/inboxes/update-inbox). Bcc addresses and names remain in the sender's private saved copy and are not exposed in delivered recipient headers.
         *
         *     At most 50 combined To/Cc/Bcc entries are accepted. Unknown top-level and attachment fields are rejected. You cannot override From or supply arbitrary headers, remote attachment URLs, inline attachments, or raw MIME.
         *
         *     JSON is limited to 8 MiB. The total email must fit the provider's 5 MiB limit, including generated MIME and attachments; a message that passes local checks can still be rejected by the provider for size.
         *
         *     Cherami appends "Sent via Cherami" to plain text and supplied HTML, after your body including quoted history. Do not add it yourself. Returned sent bodies include the attribution.
         *
         *     ### Reply targets
         *
         *     `in_reply_to` is a resource ID, not an RFC Message-ID or thread ID. Received parents must be ready; sent parents must be accepted. Both need a usable Message-ID and must belong to the sending inbox. Cherami sets `In-Reply-To` and accumulated `References`, shortening long ancestry as needed.
         *
         *     On this explicit-send endpoint, supply recipients and subject yourself. For derived recipients and subject, use [reply](https://cherami.to/docs/api/sending/reply-message) or [reply-all](https://cherami.to/docs/api/sending/reply-all-message). Unready, unaccepted, or headerless targets return `409`; missing, deleted, other-account, or other-inbox targets return `404`.
         *
         *     ### Response and outcomes
         *
         *     A created sent resource returns `201` and `Location: /v1/sent/{id}`.
         *
         *     Inspect `message.status`, not just HTTP status: `accepted` means provider acceptance, not delivery; `rejected` means explicit pre-acceptance rejection; `unknown` means acceptance could not be confirmed. Accepted and unknown attempts retain their sending charge. Cherami does not track delivery or bounces.
         *
         *     `provider_message_id`, `error_code`, `thread_id`, and `in_reply_to` can be null. `in_reply_to` identifies the Cherami parent resource when available.
         *
         *     When `outcome_persisted` is false, the response reports a known provider outcome that could not be saved. Later reads may still say `unknown`; keep the outcome returned here and do not resend because of the mismatch.
         *
         *     If a response is lost or an infrastructure error reports uncertainty, follow the same-key recovery contract below. Without a key, inspect sent messages before considering another send: repeating an unkeyed POST can send a duplicate.
         *
         *     Provider errors such as `E_RECIPIENT_SUPPRESSED`, `E_RATE_LIMIT_EXCEEDED`, or `E_DAILY_LIMIT_EXCEEDED` are reported as rejected sent outcomes, not HTTP errors. A suppressed recipient rejects the whole submission.
         *
         *     ### Retry a send with an idempotency key
         *
         *     Keys are scoped to the authenticated account across HTTP and MCP, not to a connection or inbox. Protection lasts **24 hours from the first reserved attempt**, without renewal on retries. Keyed results include `replayed` and `idempotency_expires_at`. A new attempt returns `201` with `replayed: false`; a matching retry returns `200` with `replayed: true`, the original `message.id` and its current saved outcome. Both include `Location`. A replay adds no submission or quota charge.
         *
         *     Use the same key, inbox and message fields for a retry. JSON property order does not matter; omitted and empty optional recipient, attachment and label arrays are equivalent, and label order and duplicates are ignored. Recipient addresses (including case), names, ordering, attachment ordering, body text, HTML, subject, reply target and initial labels do matter. Changes to the inbox's sender name or later label edits do not change a replay. Reusing an active key for different input returns `409 idempotency_conflict` without sending. Deleting the sent copy does not free its key: a matching retry returns `409 idempotency_result_unavailable`.
         *
         *     A retry recovers the reserved attempt; Cherami never resumes or repeats provider submission on a retry. This prevents a duplicate but can leave an email unsent when the first attempt stopped before submitting. Read `GET /v1/sent/{message_id}` for the saved outcome.
         *
         *     Validation, authorization and quota failures do not consume the key. After an uncertain infrastructure failure, reuse the original key and unchanged payload. Never generate a replacement key to bypass uncertainty. After expiry the same key can create a new send, so **do not retry an uncertain email after the window**; measure it conservatively from your first request time. A deliberately new email needs a new key. Requests without a key can each create a separate send.
         */
        post: operations["sendMessage"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/inboxes/{inbox_id}/reply": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Reply to a message
         * @description Creates an ordinary sent message with the [send outcomes and recovery contract](https://cherami.to/docs/api/sending/send-message). HTTP success can report `rejected` or `unknown`; `accepted` means provider acceptance, not delivery.
         *
         *     `message_id` selects a ready received or accepted sent message in the sending inbox with a usable RFC Message-ID. Missing, deleted, other-inbox and other-account sources return `404`; unready or unaccepted sources return `409 reply_not_ready`.
         *
         *     Supply `message_id` and nonblank `text`. Optional fields are `html`, new `attachments`, `labels`, and `idempotency_key`, with the [explicit-send field validation](https://cherami.to/docs/api/sending/send-message). Original attachments and quoted history are not automatically included.
         *
         *     For a received source, reply uses Reply-To when present, otherwise From. Reply-all adds original To and Cc. For a sent source, reply uses original To; reply-all also includes original Cc. Address groups are flattened. Recipients are deduplicated case-insensitively across To/Cc, excluding the sending inbox; other inboxes in the same account are not excluded. Original Bcc is never reused. Original To remains To and Cc remains Cc, except that when only Cc participants remain, the first is promoted to To. If no recipients remain, the request returns `409 reply_recipients_unavailable`.
         *
         *     The subject receives `Re: ` unless it already begins with `Re:` (case-insensitive, allowing spaces before the colon). Replies use the source's reply headers and conversation relationship. To override recipients or subject, use explicit send with `in_reply_to`; the helpers reject override fields. Derived recipients come from sender-written headers: check them against your authorized assignment before sending. Reply-all from a blind recipient can reveal that recipient's own participation.
         *
         *     ### Recover a helper send
         *
         *     Recovery follows the [send key contract](https://cherami.to/docs/api/sending/send-message#retry-a-send-with-an-idempotency-key) with the operation, sending inbox, exact helper payload, key and first request time. Helpers share the account's sending-key namespace, so changing between reply, reply-all, forward or explicit send conflicts. A matching retry recovers the reserved attempt even if the source has since been deleted.
         */
        post: operations["replyMessage"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/inboxes/{inbox_id}/reply-all": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Reply to visible participants
         * @description Replies to the source's visible participants using the [reply request and derivation rules](https://cherami.to/docs/api/sending/reply-message). Select a ready received or accepted sent message in the sending inbox with a usable RFC Message-ID. Missing, deleted, other-inbox or other-account sources return `404`; unready or unaccepted sources return `409 reply_not_ready`.
         *
         *     For received mail, To recipients come from Reply-To (or From) plus original To; Cc comes from original Cc. For sent mail, original To and Cc are used. Groups are flattened and addresses are deduplicated case-insensitively across To/Cc, excluding the sending inbox. Other inboxes in the account are not excluded. If only Cc participants remain, the first is promoted to To; no remaining recipient returns `409 reply_recipients_unavailable`.
         *
         *     Original Bcc is never reused. Reply-all from a blind recipient can reveal that recipient's own participation. Derived recipients come from sender-written headers: check them against your authorized assignment before sending.
         *
         *     Supply your response and any new attachments; original files and quoted history are not automatically included. Subject and reply-header derivation follow [reply](https://cherami.to/docs/api/sending/reply-message). Use [explicit send](https://cherami.to/docs/api/sending/send-message) with `in_reply_to` to override recipients or subject; this endpoint rejects those overrides.
         *
         *     HTTP success can report `rejected` or `unknown`; `accepted` means provider acceptance, not delivery. See [sending outcomes](https://cherami.to/docs/api/sending/send-message#response-and-outcomes) and the [helper recovery contract](https://cherami.to/docs/api/sending/reply-message#recover-a-helper-send).
         */
        post: operations["replyAllMessage"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/inboxes/{inbox_id}/forward": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Forward a message
         * @description Creates an ordinary sent message with the [send outcomes and recovery contract](https://cherami.to/docs/api/sending/send-message). HTTP success can report `rejected` or `unknown`; `accepted` means provider acceptance, not delivery.
         *
         *     `message_id` selects a ready received or accepted sent message in the sending inbox. Missing, deleted, other-inbox and other-account sources return `404`; unready or unaccepted sources return `409 reply_not_ready`. A forward does not require an RFC Message-ID.
         *
         *     Supply `message_id` and nonempty `to`. Optional fields are `cc`, `bcc`, plain-text `note`, boolean `include_attachments` (default `true`), `labels`, and `idempotency_key`. Recipient, label and size limits are the same as explicit send. Forward recipients are explicit and are not automatically deduplicated.
         *
         *     The subject receives `Fwd: ` unless it already starts with `Fw:` or `Fwd:`. The note precedes a forwarded header block containing From, available Date, Subject, To and Cc, never Bcc. Original text and HTML are forwarded as stored, including quoted history and earlier attribution; excluding Bcc from the generated headers does not redact anything written in the original body. HTML-only originals get a non-rendered plain-text alternative. A forward has no reply parent and starts a new Cherami conversation.
         *
         *     Attachments are included by default with their original bytes; embedded images retain their Content-ID relationships. Unsafe or missing filenames get safe transport names. Unusable MIME types become `application/octet-stream`. Setting `include_attachments: false` excludes all original files, including embedded images, so images referenced by the HTML may be unavailable. No attachment is silently removed to fit a limit: missing expected content returns `503 content_unavailable`, oversized forwards return `413 message_too_large` or a provider size rejection, and an unusable original inline Content-ID returns `400 invalid_message`. Exclude attachments or use an explicit send for a deliberately reduced message.
         *
         *     ### Recover a helper send
         *
         *     Recovery follows the [helper recovery contract](https://cherami.to/docs/api/sending/reply-message#recover-a-helper-send). Omitted `include_attachments` and `true` are equivalent; omitted and empty notes are equivalent.
         */
        post: operations["forwardMessage"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/outbound/quota": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Read sending allowance
         * @description Returns the current account-wide sending allowance.
         *
         *     Every To/Cc/Bcc entry costs one, including repeats. All inboxes share this allowance. Accepted and unknown submissions count; rejected submissions do not when the outcome is saved. Later bounces and message or inbox deletion do not refund charges.
         *
         *     Sending with insufficient capacity returns `429` with `error.code: "outbound_limit_reached"`, an actionable `error.message`, `quota` containing the allowance fields, and the capacity details in the response schema. Nothing is submitted.
         *
         *     `Retry-After` is supplied from `sufficient_capacity_at`, not the first charge expiry. No `Retry-After` is supplied when the message exceeds the entire account allowance: waiting cannot fix that.
         *
         *     Receiving, reading, organizing mail, saving drafts and feedback remain available when sending allowance runs out. Request inbox or sending increases through [feedback](https://cherami.to/docs/api/feedback) or hello@cherami.to; requests are reviewed manually. [Allowance policy](https://cherami.to/pricing).
         */
        get: operations["getOutboundQuota"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/inboxes/{inbox_id}/drafts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List drafts
         * @description Returns `200` with `{"drafts":[...],"next_cursor":null}`. Entries contain draft metadata without creation-key fields. `state` is `draft` (default), `submitted` or `all`. Results are newest-created first. `limit` is 1–100, default 20; use the returned opaque `cursor` with the same inbox and state. Drafts do not appear in received/sent mail search or conversations before submission.
         *
         *     Unsupported or repeated query parameters and malformed or mismatched cursors return `400 invalid_draft`; an invalid limit returns `400 invalid_limit`.
         */
        get: operations["listDrafts"];
        put?: never;
        /**
         * Create a draft
         * @description Drafts belong to one owned inbox. Saving or editing consumes no sending allowance and does not require sending permission. Sending requires current permission, recipient-policy approval and available allowance; deletion requires deletion permission.
         *
         *     The body can be `{}` for an empty draft. Supply any of `to`, `cc`, `bcc`, `subject`, `text`, `html`, `attachments`, `in_reply_to` and `labels`, using the [sending field formats and limits](https://cherami.to/docs/api/sending/send-message). Recipients, subject and text may be missing or empty until sending. Unknown fields are rejected. Creation and edit JSON may be up to 8 MiB; saved content uses the same 5 MiB local bound, 50 recipients and 32 attachments as outgoing mail. Sending also checks current limits, including the provider's generated MIME limit.
         *
         *     `html` and `in_reply_to` additionally accept null to clear. Empty arrays clear recipient lists, attachments or initial sent-copy labels. Recipient display names are preserved. Supplied attachments are padded base64 original bytes, not URLs.
         *
         *     Optional `idempotency_key` protects creation. It accepts 1–128 ASCII letters, digits, hyphens or underscores. Keep it with the original payload and first request time; follow the creation-recovery guidance on this page.
         *
         *     New creation returns `201`, `Location: /v1/drafts/{id}` and metadata. The `replayed` and `idempotency_expires_at` fields appear only for keyed creation. Creation returns metadata, not the full body; retrieve the draft to inspect saved content.
         *
         *     ### Prepare a reply or forward
         *
         *     Creation also accepts `source`.
         *
         *     `source.action` is `reply`, `reply-all` or `forward`. `message_id` must identify a ready received or accepted sent message in the same inbox. The [ordinary correspondence derivation rules](https://cherami.to/docs/api/sending/reply-message) apply: reply recipients exclude self and original Bcc; forwards retain original bodies rather than extracted reply text.
         *
         *     Replies save derived recipients, subject and `in_reply_to`, with your supplied response and new attachments. No original history or files are automatically copied. Explicit fields override derived fields, including empty arrays or a null reply target. The reply target must remain available and usable when the draft is sent; changing `in_reply_to` later does not rederive recipients or subject.
         *
         *     For forwards, `text` on creation is the introductory note. Supply recipients explicitly, or add them later. The saved text and HTML contain the full forward. `source.include_attachments` defaults to true and is valid only for forwards; false excludes all original files, including embedded images. Creation with a forward source cannot also supply `attachments`; edit afterward to replace the saved file list. Original bytes and usable inline Content-ID relationships are retained. Missing or oversized included files fail rather than being silently omitted. Forwarding does not redact private information already in the body.
         *
         *     Preparation happens once, at creation. Sending does not regenerate recipients, forward content or attachments from the source, and a prepared forward remains usable if its source is later deleted.
         *
         *     ### Recover creation
         *
         *     Creation keys are account-scoped across HTTP and MCP, in a namespace separate from inbox creation and sending. Protection lasts **24 hours from creation**, without renewal. A matching retry returns `200`, `replayed: true` and the original draft's **current metadata**, including later edits or submission state; it never reapplies the creation payload. A changed payload returns `409 idempotency_conflict`. If the draft has been deleted, a matching retry returns `409 idempotency_result_unavailable` without creating a replacement.
         *
         *     The comparison uses normalized creation intent: omitted/empty arrays, trimmed display names, normalized label sets and missing/empty subject or text are equivalent. Content and recipient/file order remain significant. With a source, explicitly supplied fields are also significant because they override derived values; preserve the original payload. Default and explicit true attachment inclusion are equivalent.
         *
         *     If creation cannot be confirmed, retry only with the original key and payload within a conservatively measured 24 hours of the first request. Without a key or after expiry, list drafts with `state=all` and reconcile before creating anything else: draft content is not unique, so recreating blindly can produce a duplicate.
         */
        post: operations["createDraft"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/drafts/{draft_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieve a draft
         * @description Returns metadata plus `from` and `content`. `from` is the inbox's **current** address and optional sender name. `content` contains full `to`, `cc`, `bcc`, `subject`, `text`, `attachments`, optional `html`, `in_reply_to` and nonempty `labels`. Attachment objects include `filename`, `type`, base64 `content`, and `disposition`; source-derived inline files also have `contentId`. Bodies are not extracted or truncated.
         *
         *     The content is the saved draft, before Cherami's outgoing attribution. Sending uses current sender settings and appends attribution then. For a submitted draft, retrieve `sent_message_id` through the [sent-message endpoint](https://cherami.to/docs/api/sending/get-sent-message) for the actual sender snapshot, attributed content and outcome.
         */
        get: operations["getDraft"];
        put?: never;
        post?: never;
        /**
         * Delete a draft
         * @description `DELETE /v1/drafts/{draft_id}` returns `202` with `id`, `status: "deletion_pending"` and a message. It permanently removes the draft and its attachments, with no undo. A linked sent copy is separate: deleting either does not delete the other. Repeating deletion is safe and can return `202` or `404`. Inbox deletion covers both drafts and sent copies.
         */
        delete: operations["deleteDraft"];
        options?: never;
        head?: never;
        /**
         * Edit a draft
         * @description Supply at least one editable creation field, excluding `source` and `idempotency_key`. Only supplied fields change. Recipient arrays, attachments and labels replace their entire respective lists. When revising `text`, revise or clear `html` separately if needed; Cherami does not synchronize the alternatives. New attachment inputs use the ordinary three-field format, not service-generated inline metadata.
         *
         *     Successful edits return `200` with draft metadata. For the same field, the last saved value wins; there is no version parameter or review lock. `409 draft_busy` means another change landed first: retrieve current content before editing again.
         *
         *     Submitted drafts return `409 draft_submitted` and cannot be edited or returned to draft.
         */
        patch: operations["updateDraft"];
        trace?: never;
    };
    "/v1/drafts/{draft_id}/send": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Send a draft
         * @description `POST /v1/drafts/{draft_id}/send` with `{}` or `{"idempotency_key":"YOUR_SEND_KEY"}`.
         *
         *     Sending takes the current saved content, not a previously retrieved copy. The draft freezes as `submitted` when an outgoing attempt is reserved, with `sent_message_id` identifying that attempt. An edit that lands first returns `409 draft_busy`: retrieve the draft and send again.
         *
         *     Validation, ownership, permission, recipient-policy or quota failures before reservation leave it editable. After reservation it remains submitted for **every** provider outcome, including rejection and uncertainty. There is no return-to-draft operation. A deliberately new attempt requires a new draft; do not create one merely to resolve an unknown outcome.
         *
         *     The response uses the [ordinary send receipt and outcomes](https://cherami.to/docs/api/sending/send-message): `201` for a new attempt, `200` with `replayed: true` when recovering. `Location` points to `/v1/sent/{sent_message_id}`. Acceptance is not proof of delivery.
         *
         *     **The draft ID itself prevents another submission, without expiry.** Repeat the same send request to recover an uncertain attempt; it never sends another copy. Deleting the sent copy does not unlock the draft; recovery then returns `409 draft_result_unavailable` (or `idempotency_result_unavailable` for an active sending key).
         *
         *     Optional sending keys share the ordinary account-scoped sending namespace and 24-hour lifetime. Their intent identifies this draft, not its mutable fields. Changing the draft ID or reusing a key from an ordinary send conflicts. Key expiry does not remove the draft's permanent submitted state.
         */
        post: operations["sendDraft"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/inboxes/{inbox_id}/threads": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List conversations
         * @description Threads are grouped automatically. They contain ready received messages and sent attempts, including rejected and unknown outcomes.
         *
         *     `GET /v1/inboxes/{inbox_id}/threads?limit=20` returns `200`.
         *
         *     Most recent activity first by default. Accepts the shared [search, filters and ordering](https://cherami.to/docs/guides/search). A conversation matches when one member satisfies every condition. Filtered results additionally include `matching_message_ids` (up to 100, newest first) and `matching_message_count` (total matching members). `subject` is from the earliest surviving message and can be null. Counts include rejected and unknown attempts.
         *
         *     Each message retains its own `labels`; threads have no label set. Filters select conversations without filtering their detail pages. Manual merging is not provided. Reply using a message resource ID, not the thread ID.
         */
        get: operations["listThreads"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/threads/{thread_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Read a conversation
         * @description `GET /v1/threads/{thread_id}?limit=20` returns `200` with conversation metadata, plus `messages` and `next_cursor`.
         *
         *     Each entry has `direction` (`received` or `sent`), `timestamp` (ISO service receipt/submission time), and the fields from [received detail](https://cherami.to/docs/api/messages/get-message) or [sent detail](https://cherami.to/docs/api/sending/get-sent-message).
         *
         *     Bodies and attachment metadata are included, without attachment bytes. Received attachments use the ordinary download endpoint. Sent thread attachments have `id`, `filename`, `mime_type`, and `size` in bytes; use ordinary sent detail for their base64 content.
         *
         *     The first page contains the newest messages, **chronological within the page**. The next page contains older messages. Metadata counts describe the conversation, not just the current page.
         *
         *     Accepts `limit` 1–100, default 20. Follow `next_cursor` as a URL-encoded `cursor` parameter on the same resource URL. Ordering uses service timestamps, not sender-controlled Date headers. Previously returned thread IDs remain usable while their conversation exists; the returned `id` may differ from the requested one.
         *
         *     Pending, processing, and failed received messages have `thread_id: null` and are absent from threads. They remain available through message endpoints. Deleted messages disappear; surviving messages remain grouped. Empty, missing, or other-account conversations return `404`. Invalid limits/cursors return `400`, and unavailable content can return `503`.
         */
        get: operations["getThread"];
        put?: never;
        post?: never;
        /**
         * Delete a conversation
         * @description `DELETE /v1/threads/{thread_id}` permanently deletes all messages currently in the conversation and their attachments. Confirm the exact conversation and full scope with the human. There is no trash or undo. Deletion requires the account's `can_delete` permission.
         *
         *     Returns the deletion result.
         *
         *     `id` is the canonical thread ID when members were selected; counts describe those selected messages. They are hidden from retrieval and search together. The inbox and saved drafts remain available. Deleting sent copies does not refund their allowance.
         *
         *     Empty, missing or other-account threads return `404`; an account without deletion permission receives `403 operation_not_allowed`.
         */
        delete: operations["deleteThread"];
        options?: never;
        head?: never;
        /**
         * Label a conversation
         * @description `PATCH /v1/threads/{thread_id}` adds or removes labels across all current received and sent members, not just one page. Use `Content-Type: application/json` with a body up to 20 KiB:
         *
         *     The [ordinary label validation rules](https://cherami.to/docs/api/labels/update-message-labels) apply. Changes publish together and preserve unrelated labels. Future replies do not inherit the changes. No sending or deletion permission is needed, and no sending allowance is consumed.
         *
         *     Returns the update result.
         *
         *     `id` is the canonical thread ID when members were selected. Counts describe updated copies, including those whose labels already matched. `add_labels` and `remove_labels` contain the normalized changes, not each message's complete label set.
         *
         *     Invalid changes return `400 invalid_labels`. Empty, missing or other-account threads return `404`.
         */
        patch: operations["updateThreadLabels"];
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        InboxList: {
            inboxes: components["schemas"]["Inbox"][];
            /** @description Authoritative current cap. */
            inbox_limit: number;
            inbox_allowance: components["schemas"]["InboxAllowance"];
        };
        Inbox: {
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            id: string;
            local_part: string;
            address: string;
            name: string | null;
            sender_name: string | null;
            /**
             * Format: date-time
             * @description UTC service instant with milliseconds and Z suffix.
             */
            created_at: string;
        };
        InboxAllowance: {
            allowance: number;
            used: number;
            remaining: number;
            /** @constant */
            unit: "inbox_slots";
        };
        Error: {
            error: {
                /** @description Programmatic error code. Handle unrecognized codes by status and operation-specific recovery. */
                code: string;
                /** @description Human-readable context, not a stable string to match. */
                message: string;
            };
        };
        /** @description Keyed creation adds both replay fields. Replay returns the inbox's current names. */
        CreatedInbox: {
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            id: string;
            local_part: string;
            address: string;
            name: string | null;
            sender_name: string | null;
            /**
             * Format: date-time
             * @description UTC service instant with milliseconds and Z suffix.
             */
            created_at: string;
            replayed?: boolean;
            /**
             * Format: date-time
             * @description UTC service instant with milliseconds and Z suffix.
             */
            idempotency_expires_at?: string;
        };
        InboxError: {
            error: {
                /** @description Programmatic error code. Handle unrecognized codes by status and operation-specific recovery. */
                code: string;
                /** @description Human-readable context, not a stable string to match. */
                message: string;
                details?: {
                    allowance: components["schemas"]["InboxAllowance"];
                    increase_request: string;
                    policy_url: string;
                };
            };
        };
        CreateInbox: {
            /** @description Trimmed and lowercased, then 1–64 ASCII letters, digits, hyphens or underscores with alphanumeric ends. Reserved, existing and retired addresses are unavailable. */
            local_part: string;
            name?: string | null;
            sender_name?: string | null;
            /** @description Retain a unique key, exact payload and first request time for this intended operation. Account-scoped protection lasts 24 hours without renewal. */
            idempotency_key?: string;
        };
        UpdateInbox: {
            name?: string | null;
            sender_name?: string | null;
        };
        Deleted: {
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            id: string;
            /** @constant */
            status: "deletion_pending";
            message: string;
        };
        Policy: {
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            inbox_id: string;
            enabled: boolean;
            addresses: string[];
            domains: string[];
            /** @description Saved policy version; zero when unconfigured. */
            revision: number;
        };
        /** @description 1–128 UTF-8 bytes after trimming. Well-formed Unicode without control characters; case-sensitive. */
        Label: string;
        ReceivedSummary: {
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            id: string;
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            inbox_id: string;
            thread_id: string | null;
            envelope_from: string;
            envelope_to: string;
            subject: string | null;
            /**
             * Format: date-time
             * @description UTC service instant with milliseconds and Z suffix.
             */
            received_at: string;
            /** @constant */
            processing_status: "ready";
            labels: string[];
            preview: components["schemas"]["Preview"] | null;
            from: components["schemas"]["ParsedAddress"] | null;
        } | {
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            id: string;
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            inbox_id: string;
            thread_id: string | null;
            envelope_from: string;
            envelope_to: string;
            subject: string | null;
            /**
             * Format: date-time
             * @description UTC service instant with milliseconds and Z suffix.
             */
            received_at: string;
            /** @enum {string} */
            processing_status: "pending" | "processing" | "failed";
            labels: string[];
            preview: null;
        };
        Preview: {
            /** @description Beginning of selected text with normalized whitespace; empty is a valid extraction. */
            text: string;
            truncated: boolean;
            /** @enum {string} */
            source: "reply_text" | "text" | "html";
        };
        /** @description Sender-controlled MIME address or group, not verified identity. */
        ParsedAddress: {
            name: string;
            address: string;
        } | {
            name: string;
            group: {
                name: string;
                address: string;
            }[];
        };
        ReceivedDetail: {
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            id: string;
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            inbox_id: string;
            thread_id: string | null;
            envelope_from: string;
            envelope_to: string;
            subject: string | null;
            /**
             * Format: date-time
             * @description UTC service instant with milliseconds and Z suffix.
             */
            received_at: string;
            /** @constant */
            processing_status: "ready";
            labels: string[];
            message_id: string | null;
            raw_size: number;
            processed_at: string | null;
            content: components["schemas"]["ReceivedContent"];
        } | {
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            id: string;
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            inbox_id: string;
            thread_id: string | null;
            envelope_from: string;
            envelope_to: string;
            subject: string | null;
            /**
             * Format: date-time
             * @description UTC service instant with milliseconds and Z suffix.
             */
            received_at: string;
            /** @enum {string} */
            processing_status: "pending" | "processing" | "failed";
            labels: string[];
            message_id: string | null;
            raw_size: number;
            processed_at: string | null;
        };
        ReceivedContent: {
            from: components["schemas"]["ParsedAddress"] | null;
            sender: components["schemas"]["ParsedAddress"] | null;
            reply_to: components["schemas"]["ParsedAddress"][];
            to: components["schemas"]["ParsedAddress"][];
            cc: components["schemas"]["ParsedAddress"][];
            bcc: components["schemas"]["ParsedAddress"][];
            subject: string | null;
            message_id: string | null;
            in_reply_to: string | null;
            references: string | null;
            date: string | null;
            reply_text: string | null;
            text: string | null;
            html: string | null;
            attachments: components["schemas"]["ReceivedAttachment"][];
        };
        ReceivedAttachment: {
            id: string;
            filename: string | null;
            size: number;
            mime_type: string;
            disposition: string | null;
            content_id: string | null;
            related: boolean;
        };
        LabelResult: {
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            id: string;
            labels: string[];
        };
        /** @description At least one array must contain a label. A normalized label cannot occur in both arrays. */
        LabelChange: {
            /** @description Trimmed, deduplicated and case-sensitive. Order is not significant. */
            add_labels?: components["schemas"]["Label"][];
            /** @description Trimmed, deduplicated and case-sensitive. Order is not significant. */
            remove_labels?: components["schemas"]["Label"][];
        };
        SentDetail: {
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            id: string;
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            inbox_id: string;
            /**
             * Format: date-time
             * @description UTC service instant with milliseconds and Z suffix.
             */
            created_at: string;
            recipient_count: number;
            /** @enum {string} */
            status: "accepted" | "rejected" | "unknown";
            provider_message_id: string | null;
            error_code: string | null;
            thread_id: string | null;
            in_reply_to: string | null;
            labels: string[];
            reply_text: string | null;
            submission: components["schemas"]["Submission"];
        };
        /** @description Stored attributed submission. Historical recipient/address strings remain strings. Forwarded files may be inline. */
        Submission: {
            to: (components["schemas"]["Mailbox"] | string)[];
            cc: (components["schemas"]["Mailbox"] | string)[];
            bcc: (components["schemas"]["Mailbox"] | string)[];
            subject: string;
            text: string;
            html?: string;
            attachments: components["schemas"]["StoredAttachment"][];
            from: components["schemas"]["Mailbox"] | string;
            headers?: {
                "In-Reply-To": string;
                References: string;
            };
        };
        Mailbox: {
            /** @description Bare ASCII address, at most 254 characters, local part at most 64. No display-name header syntax. */
            address: string;
            /** @description Unicode name, trimmed; blank means unnamed. No control characters. At most 256 UTF-8 bytes after trimming. */
            name?: string;
        };
        StoredAttachment: {
            /** @description Nonempty, no control characters, slash or backslash. At most 255 UTF-8 bytes. */
            filename: string;
            /** @description MIME type without parameters. */
            type: string;
            /** @description Padded base64 original bytes, no whitespace; encoded length must be a multiple of four. Empty files are accepted. */
            content: string;
            /** @enum {string} */
            disposition: "attachment" | "inline";
            /** @description Present for source-derived inline files. */
            contentId?: string;
        };
        /** @description At least one nonempty change array; additions and removals must not overlap. Duplicate IDs are updated once. */
        BulkLabelChange: {
            message_ids: string[];
            /** @description Trimmed, deduplicated and case-sensitive. Order is not significant. */
            add_labels?: components["schemas"]["Label"][];
            /** @description Trimmed, deduplicated and case-sensitive. Order is not significant. */
            remove_labels?: components["schemas"]["Label"][];
        };
        LabelList: {
            labels: {
                name: string;
                received_count: number;
                sent_count: number;
            }[];
            next_cursor: string | null;
        };
        /** @description Inspect message.status even on HTTP 201. accepted is provider acceptance, not delivery. Keep a known outcome when outcome_persisted is false. Keyed receipts add replayed and expiry; draft-association recovery adds replayed without an expiry. */
        SendReceipt: {
            /** @constant */
            limited: false;
            message: components["schemas"]["SentMetadata"];
            outcome_persisted: boolean;
            replayed?: boolean;
            /**
             * Format: date-time
             * @description UTC service instant with milliseconds and Z suffix.
             */
            idempotency_expires_at?: string;
        };
        SentMetadata: {
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            id: string;
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            inbox_id: string;
            /**
             * Format: date-time
             * @description UTC service instant with milliseconds and Z suffix.
             */
            created_at: string;
            recipient_count: number;
            /** @enum {string} */
            status: "accepted" | "rejected" | "unknown";
            provider_message_id: string | null;
            error_code: string | null;
            thread_id: string | null;
            in_reply_to: string | null;
            labels: string[];
        };
        QuotaError: {
            error: {
                /** @constant */
                code: "outbound_limit_reached";
                message: string;
            };
            quota: components["schemas"]["Quota"];
            requested_recipients: number;
            /** @enum {string} */
            reason: "temporary_exhaustion" | "message_exceeds_allowance";
            sufficient_capacity_at: string | null;
            guidance: string;
        };
        Quota: {
            allowance: number;
            used: number;
            remaining: number;
            next_capacity_at: string | null;
            next_capacity_amount: number;
            /** @constant */
            window_hours: 24;
            /** @constant */
            unit: "recipient_deliveries";
            increase_request: string;
            policy_url: string;
        };
        /** @description At most 50 combined To/Cc/Bcc entries. Local body/encoded-attachment sum is bounded to 5 MiB; generated MIME must also fit the provider's 5 MiB limit. No From override, arbitrary headers or inline attachment inputs. */
        SendInput: {
            to: components["schemas"]["Mailbox"][];
            cc?: components["schemas"]["Mailbox"][];
            bcc?: components["schemas"]["Mailbox"][];
            /** @description No control characters; at most 998 UTF-8 bytes. Must not be blank. */
            subject: string;
            /** @description Required nonblank plain text. */
            text: string;
            /** @description HTML alternative, sent as supplied. */
            html?: string;
            /** @description Omitted or null means no attachments; an empty array also clears draft attachments. */
            attachments?: components["schemas"]["AttachmentInput"][] | null;
            /** @description Received or accepted sent resource ID in this inbox. The source must have usable reply headers. */
            in_reply_to?: string;
            /** @description Trimmed, deduplicated and case-sensitive. Order is not significant. */
            labels?: components["schemas"]["Label"][];
            /** @description Retain a unique key, exact payload and first request time for this intended operation. Account-scoped protection lasts 24 hours without renewal. */
            idempotency_key?: string;
        };
        AttachmentInput: {
            /** @description Nonempty, no control characters, slash or backslash. At most 255 UTF-8 bytes. */
            filename: string;
            /** @description MIME type without parameters. */
            type: string;
            /** @description Padded base64 original bytes, no whitespace; encoded length must be a multiple of four. Empty files are accepted. */
            content: string;
        };
        SentSummary: {
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            id: string;
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            inbox_id: string;
            /**
             * Format: date-time
             * @description UTC service instant with milliseconds and Z suffix.
             */
            created_at: string;
            recipient_count: number;
            /** @enum {string} */
            status: "accepted" | "rejected" | "unknown";
            provider_message_id: string | null;
            error_code: string | null;
            thread_id: string | null;
            in_reply_to: string | null;
            labels: string[];
            preview: components["schemas"]["Preview"] | null;
        };
        ReplyInput: {
            /** @description Received or accepted sent resource ID in this inbox. The source must have usable reply headers. */
            message_id: string;
            /** @description Nonblank reply text; history is not automatically quoted. */
            text: string;
            /** @description HTML alternative, sent as supplied. */
            html?: string;
            /** @description Omitted or null means no attachments; an empty array also clears draft attachments. */
            attachments?: components["schemas"]["AttachmentInput"][] | null;
            /** @description Trimmed, deduplicated and case-sensitive. Order is not significant. */
            labels?: components["schemas"]["Label"][];
            /** @description Retain a unique key, exact payload and first request time for this intended operation. Account-scoped protection lasts 24 hours without renewal. */
            idempotency_key?: string;
        };
        ForwardInput: {
            /** @description Received or accepted sent resource ID in this inbox. The source must have usable reply headers. */
            message_id: string;
            to: components["schemas"]["Mailbox"][];
            cc?: components["schemas"]["Mailbox"][];
            bcc?: components["schemas"]["Mailbox"][];
            /** @description Optional plain-text introduction. */
            note?: string;
            /** @default true */
            include_attachments: boolean;
            /** @description Trimmed, deduplicated and case-sensitive. Order is not significant. */
            labels?: components["schemas"]["Label"][];
            /** @description Retain a unique key, exact payload and first request time for this intended operation. Account-scoped protection lasts 24 hours without renewal. */
            idempotency_key?: string;
        };
        CreatedDraft: {
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            id: string;
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            inbox_id: string;
            /** @enum {string} */
            state: "draft" | "submitted";
            subject: string;
            /**
             * Format: date-time
             * @description UTC service instant with milliseconds and Z suffix.
             */
            created_at: string;
            /**
             * Format: date-time
             * @description UTC service instant with milliseconds and Z suffix.
             */
            updated_at: string;
            sent_message_id: string | null;
            replayed?: boolean;
            /**
             * Format: date-time
             * @description UTC service instant with milliseconds and Z suffix.
             */
            idempotency_expires_at?: string;
        };
        /** @description Incomplete content is allowed, including missing/empty recipients, subject and text. At most 50 combined recipients and 32 attachments; same local content bound as sending. With a forward source, attachments cannot also be supplied; text is the introductory note on creation only. */
        CreateDraft: {
            to?: components["schemas"]["Mailbox"][];
            cc?: components["schemas"]["Mailbox"][];
            bcc?: components["schemas"]["Mailbox"][];
            /** @description No control characters; at most 998 UTF-8 bytes. */
            subject?: string;
            /** @description Plain-text body. */
            text?: string;
            html?: string | null;
            /** @description Omitted or null means no attachments; an empty array also clears draft attachments. */
            attachments?: components["schemas"]["AttachmentInput"][] | null;
            in_reply_to?: string | null;
            /** @description Trimmed, deduplicated and case-sensitive. Order is not significant. */
            labels?: components["schemas"]["Label"][];
            /** @description Retain a unique key, exact payload and first request time for this intended operation. Account-scoped protection lasts 24 hours without renewal. */
            idempotency_key?: string;
            source?: {
                /** @enum {string} */
                action: "reply" | "reply-all";
                /** @description Received or accepted sent resource ID in this inbox. The source must have usable reply headers. */
                message_id: string;
            } | {
                /** @constant */
                action: "forward";
                /** @description Received or accepted sent resource ID in this inbox. The source must have usable reply headers. */
                message_id: string;
                /** @default true */
                include_attachments: boolean;
            };
        };
        DraftMetadata: {
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            id: string;
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            inbox_id: string;
            /** @enum {string} */
            state: "draft" | "submitted";
            subject: string;
            /**
             * Format: date-time
             * @description UTC service instant with milliseconds and Z suffix.
             */
            created_at: string;
            /**
             * Format: date-time
             * @description UTC service instant with milliseconds and Z suffix.
             */
            updated_at: string;
            sent_message_id: string | null;
        };
        DraftDetail: {
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            id: string;
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            inbox_id: string;
            /** @enum {string} */
            state: "draft" | "submitted";
            subject: string;
            /**
             * Format: date-time
             * @description UTC service instant with milliseconds and Z suffix.
             */
            created_at: string;
            /**
             * Format: date-time
             * @description UTC service instant with milliseconds and Z suffix.
             */
            updated_at: string;
            sent_message_id: string | null;
            from: components["schemas"]["Mailbox"];
            content: components["schemas"]["DraftContent"];
        };
        DraftContent: {
            to: components["schemas"]["Mailbox"][];
            cc: components["schemas"]["Mailbox"][];
            bcc: components["schemas"]["Mailbox"][];
            subject: string;
            text: string;
            html?: string;
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            in_reply_to?: string;
            labels?: string[];
            attachments: components["schemas"]["StoredAttachment"][];
        };
        /** @description Only supplied fields change; arrays replace their entire lists. No source or idempotency key. Submitted drafts cannot be edited. */
        UpdateDraft: {
            to?: components["schemas"]["Mailbox"][];
            cc?: components["schemas"]["Mailbox"][];
            bcc?: components["schemas"]["Mailbox"][];
            /** @description No control characters; at most 998 UTF-8 bytes. */
            subject?: string;
            /** @description Plain-text body. */
            text?: string;
            html?: string | null;
            /** @description Omitted or null means no attachments; an empty array also clears draft attachments. */
            attachments?: components["schemas"]["AttachmentInput"][] | null;
            in_reply_to?: string | null;
            /** @description Trimmed, deduplicated and case-sensitive. Order is not significant. */
            labels?: components["schemas"]["Label"][];
        };
        DeletedDraft: {
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            id: string;
            /** @constant */
            status: "deletion_pending";
            message: string;
        };
        SendDraft: {
            /** @description Retain a unique key, exact payload and first request time for this intended operation. Account-scoped protection lasts 24 hours without renewal. */
            idempotency_key?: string;
        };
        ThreadSummary: {
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            id: string;
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            inbox_id: string;
            subject: string | null;
            /**
             * Format: date-time
             * @description UTC service instant with milliseconds and Z suffix.
             */
            last_activity_at: string;
            message_count: number;
            received_count: number;
            accepted_count: number;
            rejected_count: number;
            unknown_count: number;
            matching_message_ids?: string[];
            matching_message_count?: number;
        };
        ThreadDetail: {
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            id: string;
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            inbox_id: string;
            subject: string | null;
            /**
             * Format: date-time
             * @description UTC service instant with milliseconds and Z suffix.
             */
            last_activity_at: string;
            message_count: number;
            received_count: number;
            accepted_count: number;
            rejected_count: number;
            unknown_count: number;
            messages: (components["schemas"]["ThreadReceivedDetail"] | components["schemas"]["ThreadSentDetail"])[];
            next_cursor: string | null;
        };
        ThreadReceivedDetail: components["schemas"]["ReceivedDetail"] & {
            /** @constant */
            direction: "received";
            /**
             * Format: date-time
             * @description UTC service instant with milliseconds and Z suffix.
             */
            timestamp: string;
        };
        ThreadSentDetail: {
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            id: string;
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            inbox_id: string;
            /**
             * Format: date-time
             * @description UTC service instant with milliseconds and Z suffix.
             */
            created_at: string;
            recipient_count: number;
            /** @enum {string} */
            status: "accepted" | "rejected" | "unknown";
            provider_message_id: string | null;
            error_code: string | null;
            thread_id: string | null;
            in_reply_to: string | null;
            labels: string[];
            /** @constant */
            direction: "sent";
            /**
             * Format: date-time
             * @description UTC service instant with milliseconds and Z suffix.
             */
            timestamp: string;
            reply_text: string | null;
            submission: {
                to: (components["schemas"]["Mailbox"] | string)[];
                cc: (components["schemas"]["Mailbox"] | string)[];
                bcc: (components["schemas"]["Mailbox"] | string)[];
                subject: string;
                text: string;
                html?: string;
                attachments: {
                    id: string;
                    filename: string;
                    mime_type: string;
                    size: number;
                }[];
                from: components["schemas"]["Mailbox"] | string;
                headers?: {
                    "In-Reply-To": string;
                    References: string;
                };
            };
        };
        ThreadLabelResult: {
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            id: string;
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            inbox_id: string;
            message_count: number;
            received_count: number;
            sent_count: number;
            add_labels: string[];
            remove_labels: string[];
        };
        DeletedThread: {
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            id: string;
            /** @description Cherami resource ID, distinct from the RFC Message-ID. Use the returned value. */
            inbox_id: string;
            message_count: number;
            received_count: number;
            sent_count: number;
            /** @constant */
            status: "deletion_pending";
            message: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    listInboxes: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful operation; inspect resource state and outcome fields. */
            200: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "inboxes": [],
                     *       "inbox_limit": 0,
                     *       "inbox_allowance": {
                     *         "allowance": 0,
                     *         "used": 0,
                     *         "remaining": 0,
                     *         "unit": "inbox_slots"
                     *       }
                     *     }
                     */
                    "application/json": components["schemas"]["InboxList"];
                };
            };
            /** @description `unauthorized`: Provide a valid bearer credential. Use [human-approved recovery](https://cherami.to/docs/guides/recovery) if access is lost. */
            401: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: Resource is absent or inaccessible to this account. Reply targets must be in the sending inbox. */
            404: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: Operation failed; a write may already have happened. Follow the operation-specific recovery below. */
            500: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    createInbox: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description JSON object. Total UTF-8 request body limit: 4096 bytes. */
        requestBody: {
            content: {
                /**
                 * @example {
                 *       "local_part": "my-agent",
                 *       "name": "Research",
                 *       "idempotency_key": "RETAIN_A_UNIQUE_CREATION_KEY"
                 *     }
                 */
                "application/json": components["schemas"]["CreateInbox"];
            };
        };
        responses: {
            /** @description Matching replay: current resource or saved attempt, without another allocation or provider submission. */
            200: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    /** @description Relative URL of the resulting resource. */
                    Location?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "id": "11111111-1111-4111-8111-111111111111",
                     *       "local_part": "my-agent",
                     *       "address": "my-agent@cherami.to",
                     *       "name": null,
                     *       "sender_name": null,
                     *       "created_at": "2026-10-01T00:00:00.000Z",
                     *       "replayed": true,
                     *       "idempotency_expires_at": "2026-10-02T00:00:00.000Z"
                     *     }
                     */
                    "application/json": components["schemas"]["CreatedInbox"] & {
                        /** @constant */
                        replayed: true;
                        /**
                         * Format: date-time
                         * @description UTC service instant with milliseconds and Z suffix.
                         */
                        idempotency_expires_at: string;
                    };
                };
            };
            /** @description Successful operation; inspect resource state and outcome fields. */
            201: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    /** @description Relative URL of the resulting resource. */
                    Location?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "id": "11111111-1111-4111-8111-111111111111",
                     *       "local_part": "my-agent",
                     *       "address": "my-agent@cherami.to",
                     *       "name": null,
                     *       "sender_name": null,
                     *       "created_at": "2026-10-01T00:00:00.000Z",
                     *       "replayed": false,
                     *       "idempotency_expires_at": "2026-10-02T00:00:00.000Z"
                     *     }
                     */
                    "application/json": components["schemas"]["CreatedInbox"] & {
                        /** @constant */
                        replayed?: false;
                    };
                };
            };
            /**
             * @description `invalid_json`: Send a valid UTF-8 JSON object, not an array or scalar.
             *
             *     `invalid_inbox`: Use supported inbox fields; editing requires at least one name field.
             *
             *     `invalid_local_part`: Correct the requested [address prefix](https://cherami.to/docs/api/inboxes/create-inbox).
             *
             *     `invalid_name`: Correct the inbox, sender or recipient display name using the returned guidance.
             *
             *     `invalid_idempotency_key`: Use 1–128 ASCII letters, digits, hyphens or underscores.
             */
            400: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Provide a valid bearer credential. Use [human-approved recovery](https://cherami.to/docs/guides/recovery) if access is lost. */
            401: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: Resource is absent or inaccessible to this account. Reply targets must be in the sending inbox. */
            404: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `address_unavailable`: Choose another address prefix; this address cannot be allocated.
             *
             *     `inbox_limit_reached`: Read `error.details.allowance` for occupied and remaining slots; [request an increase](https://cherami.to/docs/guides/support) if needed.
             *
             *     `idempotency_conflict`: The key belongs to different input. Recover with the original inbox and payload, not a replacement key.
             *
             *     `idempotency_result_unavailable`: The key was used but its inbox, draft or sent copy has been deleted. Nothing was created or submitted; do not bypass protection with a new key.
             */
            409: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InboxError"];
                };
            };
            /** @description `body_too_large`: Reduce the JSON request to the endpoint's body limit. */
            413: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unsupported_media_type`: Send `Content-Type: application/json`. */
            415: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: Operation failed; a write may already have happened. Follow the operation-specific recovery below. */
            500: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    getInbox: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Owned Cherami resource ID returned by the API. */
                inbox_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful operation; inspect resource state and outcome fields. */
            200: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "id": "11111111-1111-4111-8111-111111111111",
                     *       "local_part": "my-agent",
                     *       "address": "my-agent@cherami.to",
                     *       "name": null,
                     *       "sender_name": null,
                     *       "created_at": "2026-10-01T00:00:00.000Z"
                     *     }
                     */
                    "application/json": components["schemas"]["Inbox"];
                };
            };
            /** @description `unauthorized`: Provide a valid bearer credential. Use [human-approved recovery](https://cherami.to/docs/guides/recovery) if access is lost. */
            401: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: Resource is absent or inaccessible to this account. Reply targets must be in the sending inbox. */
            404: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: Operation failed; a write may already have happened. Follow the operation-specific recovery below. */
            500: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    deleteInbox: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Owned Cherami resource ID returned by the API. */
                inbox_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Request accepted; inspect the response for its meaning. */
            202: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "id": "11111111-1111-4111-8111-111111111111",
                     *       "status": "deletion_pending",
                     *       "message": "Example"
                     *     }
                     */
                    "application/json": components["schemas"]["Deleted"];
                };
            };
            /** @description `unauthorized`: Provide a valid bearer credential. Use [human-approved recovery](https://cherami.to/docs/guides/recovery) if access is lost. */
            401: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `operation_not_allowed`: This account cannot send mail, delete mail, or delete inboxes. Contact support if unexpected. */
            403: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: Resource is absent or inaccessible to this account. Reply targets must be in the sending inbox. */
            404: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `protected_inbox`: The service support inbox cannot be deleted. */
            409: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: Operation failed; a write may already have happened. Follow the operation-specific recovery below. */
            500: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    updateInbox: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Owned Cherami resource ID returned by the API. */
                inbox_id: string;
            };
            cookie?: never;
        };
        /** @description JSON object. Total UTF-8 request body limit: 4096 bytes. */
        requestBody: {
            content: {
                /**
                 * @example {
                 *       "name": "Travel correspondence",
                 *       "sender_name": null
                 *     }
                 */
                "application/json": components["schemas"]["UpdateInbox"];
            };
        };
        responses: {
            /** @description Successful operation; inspect resource state and outcome fields. */
            200: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "id": "11111111-1111-4111-8111-111111111111",
                     *       "local_part": "my-agent",
                     *       "address": "my-agent@cherami.to",
                     *       "name": null,
                     *       "sender_name": null,
                     *       "created_at": "2026-10-01T00:00:00.000Z"
                     *     }
                     */
                    "application/json": components["schemas"]["Inbox"];
                };
            };
            /**
             * @description `invalid_json`: Send a valid UTF-8 JSON object, not an array or scalar.
             *
             *     `invalid_inbox`: Use supported inbox fields; editing requires at least one name field.
             *
             *     `invalid_name`: Correct the inbox, sender or recipient display name using the returned guidance.
             */
            400: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Provide a valid bearer credential. Use [human-approved recovery](https://cherami.to/docs/guides/recovery) if access is lost. */
            401: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: Resource is absent or inaccessible to this account. Reply targets must be in the sending inbox. */
            404: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `body_too_large`: Reduce the JSON request to the endpoint's body limit. */
            413: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unsupported_media_type`: Send `Content-Type: application/json`. */
            415: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: Operation failed; a write may already have happened. Follow the operation-specific recovery below. */
            500: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    getSendingPolicy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Owned Cherami resource ID returned by the API. */
                inbox_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful operation; inspect resource state and outcome fields. */
            200: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "inbox_id": "11111111-1111-4111-8111-111111111111",
                     *       "enabled": true,
                     *       "addresses": [],
                     *       "domains": [],
                     *       "revision": 0
                     *     }
                     */
                    "application/json": components["schemas"]["Policy"];
                };
            };
            /** @description `unauthorized`: Provide a valid bearer credential. Use [human-approved recovery](https://cherami.to/docs/guides/recovery) if access is lost. */
            401: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: Resource is absent or inaccessible to this account. Reply targets must be in the sending inbox. */
            404: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: Operation failed; a write may already have happened. Follow the operation-specific recovery below. */
            500: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    getReceivingPolicy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Owned Cherami resource ID returned by the API. */
                inbox_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful operation; inspect resource state and outcome fields. */
            200: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "inbox_id": "11111111-1111-4111-8111-111111111111",
                     *       "enabled": true,
                     *       "addresses": [],
                     *       "domains": [],
                     *       "revision": 0
                     *     }
                     */
                    "application/json": components["schemas"]["Policy"];
                };
            };
            /** @description `unauthorized`: Provide a valid bearer credential. Use [human-approved recovery](https://cherami.to/docs/guides/recovery) if access is lost. */
            401: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: Resource is absent or inaccessible to this account. Reply targets must be in the sending inbox. */
            404: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: Operation failed; a write may already have happened. Follow the operation-specific recovery below. */
            500: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    listMessages: {
        parameters: {
            query?: {
                /** @description Decimal integer without signs, whitespace or leading zeroes. */
                limit?: number;
                /** @description Opaque returned cursor. Keep resource URL, filters and ordering unchanged; stop when next_cursor is null. */
                cursor?: string;
                /** @description Nonempty lexical subject/body search, at most 512 UTF-16 code units and 16 words or closed quoted phrases. Every term must match; no raw FTS operators. Attachments and filenames are excluded. */
                query?: string;
                /** @description Exact case-insensitive bare parsed-header address. At most 320 UTF-16 code units before trimming; not the SMTP envelope. */
                from?: string;
                /** @description Exact case-insensitive bare parsed-header address. At most 320 UTF-16 code units before trimming; not the SMTP envelope. */
                recipient?: string;
                /** @description Case-insensitive literal substring, nonblank and at most 998 UTF-16 code units before trimming. */
                subject?: string;
                /** @description Inclusive lower service receipt/submission bound. Timezone-qualified valid calendar instant; after must precede before. URL-encode normally, including literal plus signs in offsets. */
                after?: string;
                /** @description Exclusive upper service receipt/submission bound. Timezone-qualified valid calendar instant; after must precede before. URL-encode normally, including literal plus signs in offsets. */
                before?: string;
                /** @description Require every listed label. Repeat this parameter per label, never comma-separate. Groups combine with AND; contradictory filters match nothing. Omit unused groups; use labels_all even for one label. Normalized set order and duplicates do not change cursor scope. */
                labels_all?: components["schemas"]["Label"][];
                /** @description Require at least one listed label. Repeat this parameter per label, never comma-separate. Groups combine with AND; contradictory filters match nothing. Omit unused groups; use labels_all even for one label. Normalized set order and duplicates do not change cursor scope. */
                labels_any?: components["schemas"]["Label"][];
                /** @description Exclude any message carrying a listed label; unlabeled messages qualify. Repeat this parameter per label, never comma-separate. Groups combine with AND; contradictory filters match nothing. Omit unused groups; use labels_all even for one label. Normalized set order and duplicates do not change cursor scope. */
                labels_none?: components["schemas"]["Label"][];
                /** @description relevance requires query. Listings are live views, not snapshots. */
                order?: "newest" | "oldest" | "relevance";
            };
            header?: never;
            path: {
                /** @description Owned Cherami resource ID returned by the API. */
                inbox_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful operation; inspect resource state and outcome fields. */
            200: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "messages": [],
                     *       "next_cursor": null
                     *     }
                     */
                    "application/json": {
                        messages: components["schemas"]["ReceivedSummary"][];
                        next_cursor: string | null;
                    };
                };
            };
            /**
             * @description `invalid_limit`: Use an integer from 1 to 100.
             *
             *     `invalid_cursor`: Use the cursor with its original resource and filters, or restart from the first page. Draft listings instead report invalid_draft.
             *
             *     `invalid_search`: Correct search terms, filters, timestamps, or ordering. See [search](https://cherami.to/docs/guides/search).
             *
             *     `invalid_labels`: Correct label names, changes, filter groups, or discovery prefix.
             */
            400: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Provide a valid bearer credential. Use [human-approved recovery](https://cherami.to/docs/guides/recovery) if access is lost. */
            401: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: Resource is absent or inaccessible to this account. Reply targets must be in the sending inbox. */
            404: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: Operation failed; a write may already have happened. Follow the operation-specific recovery below. */
            500: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    countMessages: {
        parameters: {
            query?: {
                /** @description Nonempty lexical subject/body search, at most 512 UTF-16 code units and 16 words or closed quoted phrases. Every term must match; no raw FTS operators. Attachments and filenames are excluded. */
                query?: string;
                /** @description Exact case-insensitive bare parsed-header address. At most 320 UTF-16 code units before trimming; not the SMTP envelope. */
                from?: string;
                /** @description Exact case-insensitive bare parsed-header address. At most 320 UTF-16 code units before trimming; not the SMTP envelope. */
                recipient?: string;
                /** @description Case-insensitive literal substring, nonblank and at most 998 UTF-16 code units before trimming. */
                subject?: string;
                /** @description Inclusive lower service receipt/submission bound. Timezone-qualified valid calendar instant; after must precede before. URL-encode normally, including literal plus signs in offsets. */
                after?: string;
                /** @description Exclusive upper service receipt/submission bound. Timezone-qualified valid calendar instant; after must precede before. URL-encode normally, including literal plus signs in offsets. */
                before?: string;
                /** @description Require every listed label. Repeat this parameter per label, never comma-separate. Groups combine with AND; contradictory filters match nothing. Omit unused groups; use labels_all even for one label. Normalized set order and duplicates do not change cursor scope. */
                labels_all?: components["schemas"]["Label"][];
                /** @description Require at least one listed label. Repeat this parameter per label, never comma-separate. Groups combine with AND; contradictory filters match nothing. Omit unused groups; use labels_all even for one label. Normalized set order and duplicates do not change cursor scope. */
                labels_any?: components["schemas"]["Label"][];
                /** @description Exclude any message carrying a listed label; unlabeled messages qualify. Repeat this parameter per label, never comma-separate. Groups combine with AND; contradictory filters match nothing. Omit unused groups; use labels_all even for one label. Normalized set order and duplicates do not change cursor scope. */
                labels_none?: components["schemas"]["Label"][];
            };
            header?: never;
            path: {
                /** @description Owned Cherami resource ID returned by the API. */
                inbox_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful operation; inspect resource state and outcome fields. */
            200: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "count": 0
                     *     }
                     */
                    "application/json": {
                        count: number;
                    };
                };
            };
            /**
             * @description `invalid_search`: Correct search terms, filters, timestamps, or ordering. See [search](https://cherami.to/docs/guides/search).
             *
             *     `invalid_labels`: Correct label names, changes, filter groups, or discovery prefix.
             */
            400: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Provide a valid bearer credential. Use [human-approved recovery](https://cherami.to/docs/guides/recovery) if access is lost. */
            401: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: Resource is absent or inaccessible to this account. Reply targets must be in the sending inbox. */
            404: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: Operation failed; a write may already have happened. Follow the operation-specific recovery below. */
            500: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    getMessage: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Owned Cherami resource ID returned by the API. */
                message_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful operation; inspect resource state and outcome fields. */
            200: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "id": "11111111-1111-4111-8111-111111111111",
                     *       "inbox_id": "11111111-1111-4111-8111-111111111111",
                     *       "thread_id": null,
                     *       "envelope_from": "sender@example.com",
                     *       "envelope_to": "my-agent@cherami.to",
                     *       "subject": null,
                     *       "received_at": "2026-10-01T00:00:00.000Z",
                     *       "processing_status": "ready",
                     *       "labels": [],
                     *       "message_id": null,
                     *       "raw_size": 0,
                     *       "processed_at": null,
                     *       "content": {
                     *         "from": null,
                     *         "sender": null,
                     *         "reply_to": [],
                     *         "to": [],
                     *         "cc": [],
                     *         "bcc": [],
                     *         "subject": null,
                     *         "message_id": null,
                     *         "in_reply_to": null,
                     *         "references": null,
                     *         "date": null,
                     *         "reply_text": null,
                     *         "text": null,
                     *         "html": null,
                     *         "attachments": []
                     *       }
                     *     }
                     */
                    "application/json": components["schemas"]["ReceivedDetail"];
                };
            };
            /** @description `unauthorized`: Provide a valid bearer credential. Use [human-approved recovery](https://cherami.to/docs/guides/recovery) if access is lost. */
            401: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: Resource is absent or inaccessible to this account. Reply targets must be in the sending inbox. */
            404: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: Operation failed; a write may already have happened. Follow the operation-specific recovery below. */
            500: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `content_unavailable`: Expected stored content is unavailable. Retry the read later. */
            503: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    deleteMessage: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Owned Cherami resource ID returned by the API. */
                message_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Request accepted; inspect the response for its meaning. */
            202: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "id": "11111111-1111-4111-8111-111111111111",
                     *       "status": "deletion_pending",
                     *       "message": "Example"
                     *     }
                     */
                    "application/json": components["schemas"]["Deleted"];
                };
            };
            /** @description `unauthorized`: Provide a valid bearer credential. Use [human-approved recovery](https://cherami.to/docs/guides/recovery) if access is lost. */
            401: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `operation_not_allowed`: This account cannot send mail, delete mail, or delete inboxes. Contact support if unexpected. */
            403: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: Resource is absent or inaccessible to this account. Reply targets must be in the sending inbox. */
            404: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: Operation failed; a write may already have happened. Follow the operation-specific recovery below. */
            500: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    updateMessageLabels: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Owned Cherami resource ID returned by the API. */
                message_id: string;
            };
            cookie?: never;
        };
        /** @description JSON object. Total UTF-8 request body limit: 20480 bytes. */
        requestBody: {
            content: {
                /**
                 * @example {
                 *       "add_labels": [
                 *         "handled"
                 *       ],
                 *       "remove_labels": [
                 *         "needs-review"
                 *       ]
                 *     }
                 */
                "application/json": components["schemas"]["LabelChange"];
            };
        };
        responses: {
            /** @description Successful operation; inspect resource state and outcome fields. */
            200: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "id": "11111111-1111-4111-8111-111111111111",
                     *       "labels": []
                     *     }
                     */
                    "application/json": components["schemas"]["LabelResult"];
                };
            };
            /**
             * @description `invalid_json`: Send a valid UTF-8 JSON object, not an array or scalar.
             *
             *     `invalid_labels`: Correct label names, changes, filter groups, or discovery prefix.
             */
            400: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Provide a valid bearer credential. Use [human-approved recovery](https://cherami.to/docs/guides/recovery) if access is lost. */
            401: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: Resource is absent or inaccessible to this account. Reply targets must be in the sending inbox. */
            404: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `body_too_large`: Reduce the JSON request to the endpoint's body limit. */
            413: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unsupported_media_type`: Send `Content-Type: application/json`. */
            415: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: Operation failed; a write may already have happened. Follow the operation-specific recovery below. */
            500: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    downloadRawMessage: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Owned Cherami resource ID returned by the API. */
                message_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Original bytes, served as a download. */
            200: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    /** @description Attachment disposition with a safely encoded suggested filename. */
                    "Content-Disposition"?: string;
                    /** @description Original byte count. */
                    "Content-Length"?: number;
                    /** @description Includes no-store. */
                    "Cache-Control"?: string;
                    "X-Content-Type-Options"?: "nosniff";
                    /** @description Sandbox with default-src 'none'. */
                    "Content-Security-Policy"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "message/rfc822": unknown;
                };
            };
            /** @description `unauthorized`: Provide a valid bearer credential. Use [human-approved recovery](https://cherami.to/docs/guides/recovery) if access is lost. */
            401: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: Resource is absent or inaccessible to this account. Reply targets must be in the sending inbox. */
            404: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: Operation failed; a write may already have happened. Follow the operation-specific recovery below. */
            500: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `content_unavailable`: Expected stored content is unavailable. Retry the read later. */
            503: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    downloadAttachment: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Owned Cherami resource ID returned by the API. */
                message_id: string;
                /** @description ID from received attachment metadata, not a filename. */
                attachment_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Original bytes, served as a download. */
            200: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    /** @description Attachment disposition with a safely encoded suggested filename. */
                    "Content-Disposition"?: string;
                    /** @description Original byte count. */
                    "Content-Length"?: number;
                    /** @description Includes no-store. */
                    "Cache-Control"?: string;
                    "X-Content-Type-Options"?: "nosniff";
                    /** @description Sandbox with default-src 'none'. */
                    "Content-Security-Policy"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/octet-stream": unknown;
                };
            };
            /** @description `unauthorized`: Provide a valid bearer credential. Use [human-approved recovery](https://cherami.to/docs/guides/recovery) if access is lost. */
            401: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: Resource is absent or inaccessible to this account. Reply targets must be in the sending inbox. */
            404: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: Operation failed; a write may already have happened. Follow the operation-specific recovery below. */
            500: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `content_unavailable`: Expected stored content is unavailable. Retry the read later. */
            503: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    getSentMessage: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Owned Cherami resource ID returned by the API. */
                message_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful operation; inspect resource state and outcome fields. */
            200: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "id": "11111111-1111-4111-8111-111111111111",
                     *       "inbox_id": "11111111-1111-4111-8111-111111111111",
                     *       "created_at": "2026-10-01T00:00:00.000Z",
                     *       "recipient_count": 0,
                     *       "status": "unknown",
                     *       "provider_message_id": null,
                     *       "error_code": null,
                     *       "thread_id": null,
                     *       "in_reply_to": null,
                     *       "labels": [],
                     *       "reply_text": null,
                     *       "submission": {
                     *         "from": {
                     *           "address": "my-agent@cherami.to"
                     *         },
                     *         "to": [],
                     *         "cc": [],
                     *         "bcc": [],
                     *         "subject": "Example",
                     *         "text": "Example",
                     *         "attachments": []
                     *       }
                     *     }
                     */
                    "application/json": components["schemas"]["SentDetail"];
                };
            };
            /** @description `unauthorized`: Provide a valid bearer credential. Use [human-approved recovery](https://cherami.to/docs/guides/recovery) if access is lost. */
            401: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: Resource is absent or inaccessible to this account. Reply targets must be in the sending inbox. */
            404: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `content_unavailable`: Expected stored content is unavailable. Retry the read later.
             *
             *     `outbound_unavailable`: The send's outcome is unknown. Recover with the original key and unchanged payload within its window, or inspect sent messages before sending again.
             */
            503: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    deleteSentMessage: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Owned Cherami resource ID returned by the API. */
                message_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Request accepted; inspect the response for its meaning. */
            202: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "id": "11111111-1111-4111-8111-111111111111",
                     *       "status": "deletion_pending",
                     *       "message": "Example"
                     *     }
                     */
                    "application/json": components["schemas"]["Deleted"];
                };
            };
            /** @description `unauthorized`: Provide a valid bearer credential. Use [human-approved recovery](https://cherami.to/docs/guides/recovery) if access is lost. */
            401: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `operation_not_allowed`: This account cannot send mail, delete mail, or delete inboxes. Contact support if unexpected. */
            403: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: Resource is absent or inaccessible to this account. Reply targets must be in the sending inbox. */
            404: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: Operation failed; a write may already have happened. Follow the operation-specific recovery below. */
            500: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    updateSentMessageLabels: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Owned Cherami resource ID returned by the API. */
                message_id: string;
            };
            cookie?: never;
        };
        /** @description JSON object. Total UTF-8 request body limit: 20480 bytes. */
        requestBody: {
            content: {
                /**
                 * @example {
                 *       "add_labels": [
                 *         "handled"
                 *       ],
                 *       "remove_labels": [
                 *         "needs-review"
                 *       ]
                 *     }
                 */
                "application/json": components["schemas"]["LabelChange"];
            };
        };
        responses: {
            /** @description Successful operation; inspect resource state and outcome fields. */
            200: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "id": "11111111-1111-4111-8111-111111111111",
                     *       "labels": []
                     *     }
                     */
                    "application/json": components["schemas"]["LabelResult"];
                };
            };
            /**
             * @description `invalid_json`: Send a valid UTF-8 JSON object, not an array or scalar.
             *
             *     `invalid_labels`: Correct label names, changes, filter groups, or discovery prefix.
             */
            400: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Provide a valid bearer credential. Use [human-approved recovery](https://cherami.to/docs/guides/recovery) if access is lost. */
            401: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: Resource is absent or inaccessible to this account. Reply targets must be in the sending inbox. */
            404: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `body_too_large`: Reduce the JSON request to the endpoint's body limit. */
            413: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unsupported_media_type`: Send `Content-Type: application/json`. */
            415: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: Operation failed; a write may already have happened. Follow the operation-specific recovery below. */
            500: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    bulkUpdateMessageLabels: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description JSON object. Total UTF-8 request body limit: 32768 bytes. */
        requestBody: {
            content: {
                /**
                 * @example {
                 *       "message_ids": [
                 *         "22222222-2222-4222-8222-222222222222"
                 *       ],
                 *       "add_labels": [
                 *         "handled"
                 *       ]
                 *     }
                 */
                "application/json": components["schemas"]["BulkLabelChange"];
            };
        };
        responses: {
            /** @description Successful operation; inspect resource state and outcome fields. */
            200: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "messages": []
                     *     }
                     */
                    "application/json": {
                        messages: components["schemas"]["LabelResult"][];
                    };
                };
            };
            /**
             * @description `invalid_json`: Send a valid UTF-8 JSON object, not an array or scalar.
             *
             *     `invalid_labels`: Correct label names, changes, filter groups, or discovery prefix.
             *
             *     `invalid_message_ids`: Supply 1–100 valid message IDs for a bulk label update.
             */
            400: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Provide a valid bearer credential. Use [human-approved recovery](https://cherami.to/docs/guides/recovery) if access is lost. */
            401: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: Resource is absent or inaccessible to this account. Reply targets must be in the sending inbox. */
            404: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `body_too_large`: Reduce the JSON request to the endpoint's body limit. */
            413: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unsupported_media_type`: Send `Content-Type: application/json`. */
            415: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: Operation failed; a write may already have happened. Follow the operation-specific recovery below. */
            500: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    bulkUpdateSentLabels: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description JSON object. Total UTF-8 request body limit: 32768 bytes. */
        requestBody: {
            content: {
                /**
                 * @example {
                 *       "message_ids": [
                 *         "22222222-2222-4222-8222-222222222222"
                 *       ],
                 *       "add_labels": [
                 *         "handled"
                 *       ]
                 *     }
                 */
                "application/json": components["schemas"]["BulkLabelChange"];
            };
        };
        responses: {
            /** @description Successful operation; inspect resource state and outcome fields. */
            200: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "messages": []
                     *     }
                     */
                    "application/json": {
                        messages: components["schemas"]["LabelResult"][];
                    };
                };
            };
            /**
             * @description `invalid_json`: Send a valid UTF-8 JSON object, not an array or scalar.
             *
             *     `invalid_labels`: Correct label names, changes, filter groups, or discovery prefix.
             *
             *     `invalid_message_ids`: Supply 1–100 valid message IDs for a bulk label update.
             */
            400: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Provide a valid bearer credential. Use [human-approved recovery](https://cherami.to/docs/guides/recovery) if access is lost. */
            401: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: Resource is absent or inaccessible to this account. Reply targets must be in the sending inbox. */
            404: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `body_too_large`: Reduce the JSON request to the endpoint's body limit. */
            413: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unsupported_media_type`: Send `Content-Type: application/json`. */
            415: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: Operation failed; a write may already have happened. Follow the operation-specific recovery below. */
            500: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    listLabels: {
        parameters: {
            query?: {
                /** @description Decimal integer without signs, whitespace or leading zeroes. */
                limit?: number;
                /** @description Opaque returned cursor. Keep resource URL, filters and ordering unchanged; stop when next_cursor is null. */
                cursor?: string;
                /** @description Literal case-sensitive prefix, trimmed, at most 128 UTF-8 bytes. Empty means all labels. Supply at most once. */
                prefix?: string;
            };
            header?: never;
            path: {
                /** @description Owned Cherami resource ID returned by the API. */
                inbox_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful operation; inspect resource state and outcome fields. */
            200: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "labels": [],
                     *       "next_cursor": null
                     *     }
                     */
                    "application/json": components["schemas"]["LabelList"];
                };
            };
            /**
             * @description `invalid_limit`: Use an integer from 1 to 100.
             *
             *     `invalid_cursor`: Use the cursor with its original resource and filters, or restart from the first page. Draft listings instead report invalid_draft.
             *
             *     `invalid_labels`: Correct label names, changes, filter groups, or discovery prefix.
             */
            400: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Provide a valid bearer credential. Use [human-approved recovery](https://cherami.to/docs/guides/recovery) if access is lost. */
            401: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: Resource is absent or inaccessible to this account. Reply targets must be in the sending inbox. */
            404: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: Operation failed; a write may already have happened. Follow the operation-specific recovery below. */
            500: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    listSentMessages: {
        parameters: {
            query?: {
                /** @description Decimal integer without signs, whitespace or leading zeroes. */
                limit?: number;
                /** @description Opaque returned cursor. Keep resource URL, filters and ordering unchanged; stop when next_cursor is null. */
                cursor?: string;
                /** @description Nonempty lexical subject/body search, at most 512 UTF-16 code units and 16 words or closed quoted phrases. Every term must match; no raw FTS operators. Attachments and filenames are excluded. */
                query?: string;
                /** @description Exact case-insensitive bare parsed-header address. At most 320 UTF-16 code units before trimming; not the SMTP envelope. */
                from?: string;
                /** @description Exact case-insensitive bare parsed-header address. At most 320 UTF-16 code units before trimming; not the SMTP envelope. */
                recipient?: string;
                /** @description Case-insensitive literal substring, nonblank and at most 998 UTF-16 code units before trimming. */
                subject?: string;
                /** @description Inclusive lower service receipt/submission bound. Timezone-qualified valid calendar instant; after must precede before. URL-encode normally, including literal plus signs in offsets. */
                after?: string;
                /** @description Exclusive upper service receipt/submission bound. Timezone-qualified valid calendar instant; after must precede before. URL-encode normally, including literal plus signs in offsets. */
                before?: string;
                /** @description Require every listed label. Repeat this parameter per label, never comma-separate. Groups combine with AND; contradictory filters match nothing. Omit unused groups; use labels_all even for one label. Normalized set order and duplicates do not change cursor scope. */
                labels_all?: components["schemas"]["Label"][];
                /** @description Require at least one listed label. Repeat this parameter per label, never comma-separate. Groups combine with AND; contradictory filters match nothing. Omit unused groups; use labels_all even for one label. Normalized set order and duplicates do not change cursor scope. */
                labels_any?: components["schemas"]["Label"][];
                /** @description Exclude any message carrying a listed label; unlabeled messages qualify. Repeat this parameter per label, never comma-separate. Groups combine with AND; contradictory filters match nothing. Omit unused groups; use labels_all even for one label. Normalized set order and duplicates do not change cursor scope. */
                labels_none?: components["schemas"]["Label"][];
                /** @description relevance requires query. Listings are live views, not snapshots. */
                order?: "newest" | "oldest" | "relevance";
            };
            header?: never;
            path: {
                /** @description Owned Cherami resource ID returned by the API. */
                inbox_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful operation; inspect resource state and outcome fields. */
            200: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "messages": [],
                     *       "next_cursor": null
                     *     }
                     */
                    "application/json": {
                        messages: components["schemas"]["SentSummary"][];
                        next_cursor: string | null;
                    };
                };
            };
            /**
             * @description `invalid_limit`: Use an integer from 1 to 100.
             *
             *     `invalid_cursor`: Use the cursor with its original resource and filters, or restart from the first page. Draft listings instead report invalid_draft.
             *
             *     `invalid_search`: Correct search terms, filters, timestamps, or ordering. See [search](https://cherami.to/docs/guides/search).
             *
             *     `invalid_labels`: Correct label names, changes, filter groups, or discovery prefix.
             */
            400: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Provide a valid bearer credential. Use [human-approved recovery](https://cherami.to/docs/guides/recovery) if access is lost. */
            401: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: Resource is absent or inaccessible to this account. Reply targets must be in the sending inbox. */
            404: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `outbound_unavailable`: The send's outcome is unknown. Recover with the original key and unchanged payload within its window, or inspect sent messages before sending again. */
            503: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    sendMessage: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Owned Cherami resource ID returned by the API. */
                inbox_id: string;
            };
            cookie?: never;
        };
        /** @description JSON object. Total UTF-8 request body limit: 8388608 bytes. */
        requestBody: {
            content: {
                /**
                 * @example {
                 *       "to": [
                 *         {
                 *           "address": "recipient@example.com",
                 *           "name": "Alex"
                 *         }
                 *       ],
                 *       "subject": "Notes",
                 *       "text": "Here are the notes.",
                 *       "idempotency_key": "RETAIN_A_UNIQUE_SEND_KEY"
                 *     }
                 */
                "application/json": components["schemas"]["SendInput"];
            };
        };
        responses: {
            /** @description Matching replay: current resource or saved attempt, without another allocation or provider submission. */
            200: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    /** @description Relative URL of the resulting resource. */
                    Location?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "limited": false,
                     *       "message": {
                     *         "id": "33333333-3333-4333-8333-333333333333",
                     *         "inbox_id": "11111111-1111-4111-8111-111111111111",
                     *         "created_at": "2026-10-01T00:00:00.000Z",
                     *         "recipient_count": 1,
                     *         "status": "unknown",
                     *         "provider_message_id": null,
                     *         "error_code": null,
                     *         "thread_id": "44444444-4444-4444-8444-444444444444",
                     *         "in_reply_to": null,
                     *         "labels": []
                     *       },
                     *       "outcome_persisted": true,
                     *       "replayed": true,
                     *       "idempotency_expires_at": "2026-10-02T00:00:00.000Z"
                     *     }
                     */
                    "application/json": components["schemas"]["SendReceipt"] & {
                        /** @constant */
                        replayed: true;
                        /**
                         * Format: date-time
                         * @description UTC service instant with milliseconds and Z suffix.
                         */
                        idempotency_expires_at: string;
                    };
                };
            };
            /** @description Successful operation; inspect resource state and outcome fields. */
            201: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    /** @description Relative URL of the resulting resource. */
                    Location?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "limited": false,
                     *       "message": {
                     *         "id": "33333333-3333-4333-8333-333333333333",
                     *         "inbox_id": "11111111-1111-4111-8111-111111111111",
                     *         "created_at": "2026-10-01T00:00:00.000Z",
                     *         "recipient_count": 1,
                     *         "status": "unknown",
                     *         "provider_message_id": null,
                     *         "error_code": null,
                     *         "thread_id": "44444444-4444-4444-8444-444444444444",
                     *         "in_reply_to": null,
                     *         "labels": []
                     *       },
                     *       "outcome_persisted": true,
                     *       "replayed": false,
                     *       "idempotency_expires_at": "2026-10-02T00:00:00.000Z"
                     *     }
                     */
                    "application/json": components["schemas"]["SendReceipt"] & {
                        /** @constant */
                        replayed?: false;
                    };
                };
            };
            /**
             * @description `invalid_json`: Send a valid UTF-8 JSON object, not an array or scalar.
             *
             *     `invalid_message`: Correct the send fields, recipients, reply ID, or attachments using the message's guidance.
             *
             *     `invalid_name`: Correct the inbox, sender or recipient display name using the returned guidance.
             *
             *     `invalid_labels`: Correct label names, changes, filter groups, or discovery prefix.
             *
             *     `invalid_idempotency_key`: Use 1–128 ASCII letters, digits, hyphens or underscores.
             */
            400: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Provide a valid bearer credential. Use [human-approved recovery](https://cherami.to/docs/guides/recovery) if access is lost. */
            401: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `operation_not_allowed`: This account cannot send mail, delete mail, or delete inboxes. Contact support if unexpected.
             *
             *     `recipient_not_allowed`: The inbox’s sending rules block one or more recipients. Nothing was submitted or charged. Use allowed recipients or ask the human to review [Sending rules](https://cherami.to/account/sending-rules); do not bypass them through another inbox.
             */
            403: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: Resource is absent or inaccessible to this account. Reply targets must be in the sending inbox. */
            404: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `reply_not_ready`: A received reply or forward source must be ready; a sent source must have confirmed provider acceptance.
             *
             *     `reply_headers_unavailable`: The target has no usable RFC Message-ID. Send a new message without `in_reply_to`.
             *
             *     `idempotency_conflict`: The key belongs to different input. Recover with the original inbox and payload, not a replacement key.
             *
             *     `idempotency_result_unavailable`: The key was used but its inbox, draft or sent copy has been deleted. Nothing was created or submitted; do not bypass protection with a new key.
             */
            409: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `body_too_large`: Reduce the JSON request to the endpoint's body limit.
             *
             *     `message_too_large`: Reduce message content and attachments. Passing local checks does not guarantee generated MIME fits the provider limit.
             */
            413: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unsupported_media_type`: Send `Content-Type: application/json`. */
            415: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `outbound_limit_reached`: Read `quota`, `reason` and `sufficient_capacity_at`. Waiting cannot fix `message_exceeds_allowance`; see [sending recovery](https://cherami.to/docs/api/sending/get-outbound-quota). */
            429: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    /** @description Delay in seconds when supplied. Quota uses sufficient_capacity_at; absent when waiting cannot make the message fit. */
                    "Retry-After"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["QuotaError"];
                };
            };
            /**
             * @description `content_unavailable`: Expected stored content is unavailable. Retry the read later.
             *
             *     `outbound_unavailable`: The send's outcome is unknown. Recover with the original key and unchanged payload within its window, or inspect sent messages before sending again.
             */
            503: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    replyMessage: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Owned Cherami resource ID returned by the API. */
                inbox_id: string;
            };
            cookie?: never;
        };
        /** @description JSON object. Total UTF-8 request body limit: 8388608 bytes. */
        requestBody: {
            content: {
                /**
                 * @example {
                 *       "message_id": "22222222-2222-4222-8222-222222222222",
                 *       "text": "Thanks for the notes.",
                 *       "idempotency_key": "RETAIN_A_UNIQUE_SEND_KEY"
                 *     }
                 */
                "application/json": components["schemas"]["ReplyInput"];
            };
        };
        responses: {
            /** @description Matching replay: current resource or saved attempt, without another allocation or provider submission. */
            200: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    /** @description Relative URL of the resulting resource. */
                    Location?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "limited": false,
                     *       "message": {
                     *         "id": "33333333-3333-4333-8333-333333333333",
                     *         "inbox_id": "11111111-1111-4111-8111-111111111111",
                     *         "created_at": "2026-10-01T00:00:00.000Z",
                     *         "recipient_count": 1,
                     *         "status": "unknown",
                     *         "provider_message_id": null,
                     *         "error_code": null,
                     *         "thread_id": "44444444-4444-4444-8444-444444444444",
                     *         "in_reply_to": null,
                     *         "labels": []
                     *       },
                     *       "outcome_persisted": true,
                     *       "replayed": true,
                     *       "idempotency_expires_at": "2026-10-02T00:00:00.000Z"
                     *     }
                     */
                    "application/json": components["schemas"]["SendReceipt"] & {
                        /** @constant */
                        replayed: true;
                        /**
                         * Format: date-time
                         * @description UTC service instant with milliseconds and Z suffix.
                         */
                        idempotency_expires_at: string;
                    };
                };
            };
            /** @description Successful operation; inspect resource state and outcome fields. */
            201: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    /** @description Relative URL of the resulting resource. */
                    Location?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "limited": false,
                     *       "message": {
                     *         "id": "33333333-3333-4333-8333-333333333333",
                     *         "inbox_id": "11111111-1111-4111-8111-111111111111",
                     *         "created_at": "2026-10-01T00:00:00.000Z",
                     *         "recipient_count": 1,
                     *         "status": "unknown",
                     *         "provider_message_id": null,
                     *         "error_code": null,
                     *         "thread_id": "44444444-4444-4444-8444-444444444444",
                     *         "in_reply_to": null,
                     *         "labels": []
                     *       },
                     *       "outcome_persisted": true,
                     *       "replayed": false,
                     *       "idempotency_expires_at": "2026-10-02T00:00:00.000Z"
                     *     }
                     */
                    "application/json": components["schemas"]["SendReceipt"] & {
                        /** @constant */
                        replayed?: false;
                    };
                };
            };
            /**
             * @description `invalid_json`: Send a valid UTF-8 JSON object, not an array or scalar.
             *
             *     `invalid_message`: Correct the send fields, recipients, reply ID, or attachments using the message's guidance.
             *
             *     `invalid_name`: Correct the inbox, sender or recipient display name using the returned guidance.
             *
             *     `invalid_labels`: Correct label names, changes, filter groups, or discovery prefix.
             *
             *     `invalid_idempotency_key`: Use 1–128 ASCII letters, digits, hyphens or underscores.
             */
            400: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Provide a valid bearer credential. Use [human-approved recovery](https://cherami.to/docs/guides/recovery) if access is lost. */
            401: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `operation_not_allowed`: This account cannot send mail, delete mail, or delete inboxes. Contact support if unexpected.
             *
             *     `recipient_not_allowed`: The inbox’s sending rules block one or more recipients. Nothing was submitted or charged. Use allowed recipients or ask the human to review [Sending rules](https://cherami.to/account/sending-rules); do not bypass them through another inbox.
             */
            403: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: Resource is absent or inaccessible to this account. Reply targets must be in the sending inbox. */
            404: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `reply_not_ready`: A received reply or forward source must be ready; a sent source must have confirmed provider acceptance.
             *
             *     `reply_headers_unavailable`: The target has no usable RFC Message-ID. Send a new message without `in_reply_to`.
             *
             *     `idempotency_conflict`: The key belongs to different input. Recover with the original inbox and payload, not a replacement key.
             *
             *     `idempotency_result_unavailable`: The key was used but its inbox, draft or sent copy has been deleted. Nothing was created or submitted; do not bypass protection with a new key.
             *
             *     `reply_recipients_unavailable`: No other visible reply recipients remain after self-exclusion. Use explicit send with human-authorized recipients.
             */
            409: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `body_too_large`: Reduce the JSON request to the endpoint's body limit.
             *
             *     `message_too_large`: Reduce message content and attachments. Passing local checks does not guarantee generated MIME fits the provider limit.
             */
            413: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unsupported_media_type`: Send `Content-Type: application/json`. */
            415: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `outbound_limit_reached`: Read `quota`, `reason` and `sufficient_capacity_at`. Waiting cannot fix `message_exceeds_allowance`; see [sending recovery](https://cherami.to/docs/api/sending/get-outbound-quota). */
            429: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    /** @description Delay in seconds when supplied. Quota uses sufficient_capacity_at; absent when waiting cannot make the message fit. */
                    "Retry-After"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["QuotaError"];
                };
            };
            /**
             * @description `content_unavailable`: Expected stored content is unavailable. Retry the read later.
             *
             *     `outbound_unavailable`: The send's outcome is unknown. Recover with the original key and unchanged payload within its window, or inspect sent messages before sending again.
             */
            503: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    replyAllMessage: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Owned Cherami resource ID returned by the API. */
                inbox_id: string;
            };
            cookie?: never;
        };
        /** @description JSON object. Total UTF-8 request body limit: 8388608 bytes. */
        requestBody: {
            content: {
                /**
                 * @example {
                 *       "message_id": "22222222-2222-4222-8222-222222222222",
                 *       "text": "Thanks for the notes.",
                 *       "idempotency_key": "RETAIN_A_UNIQUE_SEND_KEY"
                 *     }
                 */
                "application/json": components["schemas"]["ReplyInput"];
            };
        };
        responses: {
            /** @description Matching replay: current resource or saved attempt, without another allocation or provider submission. */
            200: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    /** @description Relative URL of the resulting resource. */
                    Location?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "limited": false,
                     *       "message": {
                     *         "id": "33333333-3333-4333-8333-333333333333",
                     *         "inbox_id": "11111111-1111-4111-8111-111111111111",
                     *         "created_at": "2026-10-01T00:00:00.000Z",
                     *         "recipient_count": 1,
                     *         "status": "unknown",
                     *         "provider_message_id": null,
                     *         "error_code": null,
                     *         "thread_id": "44444444-4444-4444-8444-444444444444",
                     *         "in_reply_to": null,
                     *         "labels": []
                     *       },
                     *       "outcome_persisted": true,
                     *       "replayed": true,
                     *       "idempotency_expires_at": "2026-10-02T00:00:00.000Z"
                     *     }
                     */
                    "application/json": components["schemas"]["SendReceipt"] & {
                        /** @constant */
                        replayed: true;
                        /**
                         * Format: date-time
                         * @description UTC service instant with milliseconds and Z suffix.
                         */
                        idempotency_expires_at: string;
                    };
                };
            };
            /** @description Successful operation; inspect resource state and outcome fields. */
            201: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    /** @description Relative URL of the resulting resource. */
                    Location?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "limited": false,
                     *       "message": {
                     *         "id": "33333333-3333-4333-8333-333333333333",
                     *         "inbox_id": "11111111-1111-4111-8111-111111111111",
                     *         "created_at": "2026-10-01T00:00:00.000Z",
                     *         "recipient_count": 1,
                     *         "status": "unknown",
                     *         "provider_message_id": null,
                     *         "error_code": null,
                     *         "thread_id": "44444444-4444-4444-8444-444444444444",
                     *         "in_reply_to": null,
                     *         "labels": []
                     *       },
                     *       "outcome_persisted": true,
                     *       "replayed": false,
                     *       "idempotency_expires_at": "2026-10-02T00:00:00.000Z"
                     *     }
                     */
                    "application/json": components["schemas"]["SendReceipt"] & {
                        /** @constant */
                        replayed?: false;
                    };
                };
            };
            /**
             * @description `invalid_json`: Send a valid UTF-8 JSON object, not an array or scalar.
             *
             *     `invalid_message`: Correct the send fields, recipients, reply ID, or attachments using the message's guidance.
             *
             *     `invalid_name`: Correct the inbox, sender or recipient display name using the returned guidance.
             *
             *     `invalid_labels`: Correct label names, changes, filter groups, or discovery prefix.
             *
             *     `invalid_idempotency_key`: Use 1–128 ASCII letters, digits, hyphens or underscores.
             */
            400: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Provide a valid bearer credential. Use [human-approved recovery](https://cherami.to/docs/guides/recovery) if access is lost. */
            401: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `operation_not_allowed`: This account cannot send mail, delete mail, or delete inboxes. Contact support if unexpected.
             *
             *     `recipient_not_allowed`: The inbox’s sending rules block one or more recipients. Nothing was submitted or charged. Use allowed recipients or ask the human to review [Sending rules](https://cherami.to/account/sending-rules); do not bypass them through another inbox.
             */
            403: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: Resource is absent or inaccessible to this account. Reply targets must be in the sending inbox. */
            404: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `reply_not_ready`: A received reply or forward source must be ready; a sent source must have confirmed provider acceptance.
             *
             *     `reply_headers_unavailable`: The target has no usable RFC Message-ID. Send a new message without `in_reply_to`.
             *
             *     `idempotency_conflict`: The key belongs to different input. Recover with the original inbox and payload, not a replacement key.
             *
             *     `idempotency_result_unavailable`: The key was used but its inbox, draft or sent copy has been deleted. Nothing was created or submitted; do not bypass protection with a new key.
             *
             *     `reply_recipients_unavailable`: No other visible reply recipients remain after self-exclusion. Use explicit send with human-authorized recipients.
             */
            409: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `body_too_large`: Reduce the JSON request to the endpoint's body limit.
             *
             *     `message_too_large`: Reduce message content and attachments. Passing local checks does not guarantee generated MIME fits the provider limit.
             */
            413: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unsupported_media_type`: Send `Content-Type: application/json`. */
            415: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `outbound_limit_reached`: Read `quota`, `reason` and `sufficient_capacity_at`. Waiting cannot fix `message_exceeds_allowance`; see [sending recovery](https://cherami.to/docs/api/sending/get-outbound-quota). */
            429: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    /** @description Delay in seconds when supplied. Quota uses sufficient_capacity_at; absent when waiting cannot make the message fit. */
                    "Retry-After"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["QuotaError"];
                };
            };
            /**
             * @description `content_unavailable`: Expected stored content is unavailable. Retry the read later.
             *
             *     `outbound_unavailable`: The send's outcome is unknown. Recover with the original key and unchanged payload within its window, or inspect sent messages before sending again.
             */
            503: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    forwardMessage: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Owned Cherami resource ID returned by the API. */
                inbox_id: string;
            };
            cookie?: never;
        };
        /** @description JSON object. Total UTF-8 request body limit: 8388608 bytes. */
        requestBody: {
            content: {
                /**
                 * @example {
                 *       "message_id": "22222222-2222-4222-8222-222222222222",
                 *       "to": [
                 *         {
                 *           "address": "recipient@example.com"
                 *         }
                 *       ],
                 *       "note": "For your review.",
                 *       "idempotency_key": "RETAIN_A_UNIQUE_SEND_KEY"
                 *     }
                 */
                "application/json": components["schemas"]["ForwardInput"];
            };
        };
        responses: {
            /** @description Matching replay: current resource or saved attempt, without another allocation or provider submission. */
            200: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    /** @description Relative URL of the resulting resource. */
                    Location?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "limited": false,
                     *       "message": {
                     *         "id": "33333333-3333-4333-8333-333333333333",
                     *         "inbox_id": "11111111-1111-4111-8111-111111111111",
                     *         "created_at": "2026-10-01T00:00:00.000Z",
                     *         "recipient_count": 1,
                     *         "status": "unknown",
                     *         "provider_message_id": null,
                     *         "error_code": null,
                     *         "thread_id": "44444444-4444-4444-8444-444444444444",
                     *         "in_reply_to": null,
                     *         "labels": []
                     *       },
                     *       "outcome_persisted": true,
                     *       "replayed": true,
                     *       "idempotency_expires_at": "2026-10-02T00:00:00.000Z"
                     *     }
                     */
                    "application/json": components["schemas"]["SendReceipt"] & {
                        /** @constant */
                        replayed: true;
                        /**
                         * Format: date-time
                         * @description UTC service instant with milliseconds and Z suffix.
                         */
                        idempotency_expires_at: string;
                    };
                };
            };
            /** @description Successful operation; inspect resource state and outcome fields. */
            201: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    /** @description Relative URL of the resulting resource. */
                    Location?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "limited": false,
                     *       "message": {
                     *         "id": "33333333-3333-4333-8333-333333333333",
                     *         "inbox_id": "11111111-1111-4111-8111-111111111111",
                     *         "created_at": "2026-10-01T00:00:00.000Z",
                     *         "recipient_count": 1,
                     *         "status": "unknown",
                     *         "provider_message_id": null,
                     *         "error_code": null,
                     *         "thread_id": "44444444-4444-4444-8444-444444444444",
                     *         "in_reply_to": null,
                     *         "labels": []
                     *       },
                     *       "outcome_persisted": true,
                     *       "replayed": false,
                     *       "idempotency_expires_at": "2026-10-02T00:00:00.000Z"
                     *     }
                     */
                    "application/json": components["schemas"]["SendReceipt"] & {
                        /** @constant */
                        replayed?: false;
                    };
                };
            };
            /**
             * @description `invalid_json`: Send a valid UTF-8 JSON object, not an array or scalar.
             *
             *     `invalid_message`: Correct the send fields, recipients, reply ID, or attachments using the message's guidance.
             *
             *     `invalid_name`: Correct the inbox, sender or recipient display name using the returned guidance.
             *
             *     `invalid_labels`: Correct label names, changes, filter groups, or discovery prefix.
             *
             *     `invalid_idempotency_key`: Use 1–128 ASCII letters, digits, hyphens or underscores.
             */
            400: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Provide a valid bearer credential. Use [human-approved recovery](https://cherami.to/docs/guides/recovery) if access is lost. */
            401: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `operation_not_allowed`: This account cannot send mail, delete mail, or delete inboxes. Contact support if unexpected.
             *
             *     `recipient_not_allowed`: The inbox’s sending rules block one or more recipients. Nothing was submitted or charged. Use allowed recipients or ask the human to review [Sending rules](https://cherami.to/account/sending-rules); do not bypass them through another inbox.
             */
            403: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: Resource is absent or inaccessible to this account. Reply targets must be in the sending inbox. */
            404: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `reply_not_ready`: A received reply or forward source must be ready; a sent source must have confirmed provider acceptance.
             *
             *     `idempotency_conflict`: The key belongs to different input. Recover with the original inbox and payload, not a replacement key.
             *
             *     `idempotency_result_unavailable`: The key was used but its inbox, draft or sent copy has been deleted. Nothing was created or submitted; do not bypass protection with a new key.
             */
            409: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `body_too_large`: Reduce the JSON request to the endpoint's body limit.
             *
             *     `message_too_large`: Reduce message content and attachments. Passing local checks does not guarantee generated MIME fits the provider limit.
             */
            413: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unsupported_media_type`: Send `Content-Type: application/json`. */
            415: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `outbound_limit_reached`: Read `quota`, `reason` and `sufficient_capacity_at`. Waiting cannot fix `message_exceeds_allowance`; see [sending recovery](https://cherami.to/docs/api/sending/get-outbound-quota). */
            429: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    /** @description Delay in seconds when supplied. Quota uses sufficient_capacity_at; absent when waiting cannot make the message fit. */
                    "Retry-After"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["QuotaError"];
                };
            };
            /**
             * @description `content_unavailable`: Expected stored content is unavailable. Retry the read later.
             *
             *     `outbound_unavailable`: The send's outcome is unknown. Recover with the original key and unchanged payload within its window, or inspect sent messages before sending again.
             */
            503: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    getOutboundQuota: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful operation; inspect resource state and outcome fields. */
            200: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "allowance": 25,
                     *       "used": 0,
                     *       "remaining": 25,
                     *       "next_capacity_at": null,
                     *       "next_capacity_amount": 0,
                     *       "window_hours": 24,
                     *       "unit": "recipient_deliveries",
                     *       "increase_request": "Describe your workflow and desired capacity in feedback or email hello@cherami.to.",
                     *       "policy_url": "https://cherami.to/pricing"
                     *     }
                     */
                    "application/json": components["schemas"]["Quota"];
                };
            };
            /** @description `unauthorized`: Provide a valid bearer credential. Use [human-approved recovery](https://cherami.to/docs/guides/recovery) if access is lost. */
            401: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: Resource is absent or inaccessible to this account. Reply targets must be in the sending inbox. */
            404: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `outbound_unavailable`: The send's outcome is unknown. Recover with the original key and unchanged payload within its window, or inspect sent messages before sending again. */
            503: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    listDrafts: {
        parameters: {
            query?: {
                /** @description Decimal integer without signs, whitespace or leading zeroes. */
                limit?: number;
                /** @description Opaque returned cursor. Keep resource URL, filters and ordering unchanged; stop when next_cursor is null. */
                cursor?: string;
                /** @description Include submitted drafts when reconciling uncertain creation. Only limit, cursor and state are accepted, each once. */
                state?: "draft" | "submitted" | "all";
            };
            header?: never;
            path: {
                /** @description Owned Cherami resource ID returned by the API. */
                inbox_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful operation; inspect resource state and outcome fields. */
            200: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "drafts": [],
                     *       "next_cursor": null
                     *     }
                     */
                    "application/json": {
                        drafts: components["schemas"]["DraftMetadata"][];
                        next_cursor: string | null;
                    };
                };
            };
            /**
             * @description `invalid_limit`: Use an integer from 1 to 100.
             *
             *     `invalid_draft`: Use supported draft fields, source preparation or listing parameters. Draft cursors that are malformed or do not match the inbox/state also use this code.
             */
            400: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Provide a valid bearer credential. Use [human-approved recovery](https://cherami.to/docs/guides/recovery) if access is lost. */
            401: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: Resource is absent or inaccessible to this account. Reply targets must be in the sending inbox. */
            404: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `draft_unavailable`: Draft operation is uncertain. Follow [draft-specific recovery](https://cherami.to/docs/api/drafts); do not blindly create a replacement. */
            503: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    createDraft: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Owned Cherami resource ID returned by the API. */
                inbox_id: string;
            };
            cookie?: never;
        };
        /** @description JSON object. Total UTF-8 request body limit: 8388608 bytes. */
        requestBody: {
            content: {
                /**
                 * @example {
                 *       "subject": "Proposal for review",
                 *       "text": "Draft proposal.",
                 *       "idempotency_key": "RETAIN_A_UNIQUE_CREATION_KEY"
                 *     }
                 */
                "application/json": components["schemas"]["CreateDraft"];
            };
        };
        responses: {
            /** @description Matching replay: current resource or saved attempt, without another allocation or provider submission. */
            200: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    /** @description Relative URL of the resulting resource. */
                    Location?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "id": "11111111-1111-4111-8111-111111111111",
                     *       "inbox_id": "11111111-1111-4111-8111-111111111111",
                     *       "state": "draft",
                     *       "subject": "Example",
                     *       "created_at": "2026-10-01T00:00:00.000Z",
                     *       "updated_at": "2026-10-01T00:00:00.000Z",
                     *       "sent_message_id": null,
                     *       "replayed": true,
                     *       "idempotency_expires_at": "2026-10-02T00:00:00.000Z"
                     *     }
                     */
                    "application/json": components["schemas"]["CreatedDraft"] & {
                        /** @constant */
                        replayed: true;
                        /**
                         * Format: date-time
                         * @description UTC service instant with milliseconds and Z suffix.
                         */
                        idempotency_expires_at: string;
                    };
                };
            };
            /** @description Successful operation; inspect resource state and outcome fields. */
            201: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    /** @description Relative URL of the resulting resource. */
                    Location?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "id": "11111111-1111-4111-8111-111111111111",
                     *       "inbox_id": "11111111-1111-4111-8111-111111111111",
                     *       "state": "draft",
                     *       "subject": "Example",
                     *       "created_at": "2026-10-01T00:00:00.000Z",
                     *       "updated_at": "2026-10-01T00:00:00.000Z",
                     *       "sent_message_id": null,
                     *       "replayed": false,
                     *       "idempotency_expires_at": "2026-10-02T00:00:00.000Z"
                     *     }
                     */
                    "application/json": components["schemas"]["CreatedDraft"] & {
                        /** @constant */
                        replayed?: false;
                    };
                };
            };
            /**
             * @description `invalid_json`: Send a valid UTF-8 JSON object, not an array or scalar.
             *
             *     `invalid_draft`: Use supported draft fields, source preparation or listing parameters. Draft cursors that are malformed or do not match the inbox/state also use this code.
             *
             *     `invalid_message`: Correct the send fields, recipients, reply ID, or attachments using the message's guidance.
             *
             *     `invalid_name`: Correct the inbox, sender or recipient display name using the returned guidance.
             *
             *     `invalid_labels`: Correct label names, changes, filter groups, or discovery prefix.
             *
             *     `invalid_idempotency_key`: Use 1–128 ASCII letters, digits, hyphens or underscores.
             */
            400: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Provide a valid bearer credential. Use [human-approved recovery](https://cherami.to/docs/guides/recovery) if access is lost. */
            401: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: Resource is absent or inaccessible to this account. Reply targets must be in the sending inbox. */
            404: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `idempotency_conflict`: The key belongs to different input. Recover with the original inbox and payload, not a replacement key.
             *
             *     `idempotency_result_unavailable`: The key was used but its inbox, draft or sent copy has been deleted. Nothing was created or submitted; do not bypass protection with a new key.
             *
             *     `reply_not_ready`: A received reply or forward source must be ready; a sent source must have confirmed provider acceptance.
             *
             *     `reply_recipients_unavailable`: No other visible reply recipients remain after self-exclusion. Use explicit send with human-authorized recipients.
             */
            409: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `body_too_large`: Reduce the JSON request to the endpoint's body limit.
             *
             *     `message_too_large`: Reduce message content and attachments. Passing local checks does not guarantee generated MIME fits the provider limit.
             */
            413: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unsupported_media_type`: Send `Content-Type: application/json`. */
            415: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `content_unavailable`: Expected stored content is unavailable. Retry the read later.
             *
             *     `draft_unavailable`: Draft operation is uncertain. Follow [draft-specific recovery](https://cherami.to/docs/api/drafts); do not blindly create a replacement.
             */
            503: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    getDraft: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Owned Cherami resource ID returned by the API. */
                draft_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful operation; inspect resource state and outcome fields. */
            200: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "id": "11111111-1111-4111-8111-111111111111",
                     *       "inbox_id": "11111111-1111-4111-8111-111111111111",
                     *       "state": "draft",
                     *       "subject": "Example",
                     *       "created_at": "2026-10-01T00:00:00.000Z",
                     *       "updated_at": "2026-10-01T00:00:00.000Z",
                     *       "sent_message_id": null,
                     *       "from": {
                     *         "address": "my-agent@cherami.to"
                     *       },
                     *       "content": {
                     *         "to": [],
                     *         "cc": [],
                     *         "bcc": [],
                     *         "subject": "Example",
                     *         "text": "Example",
                     *         "attachments": []
                     *       }
                     *     }
                     */
                    "application/json": components["schemas"]["DraftDetail"];
                };
            };
            /** @description `unauthorized`: Provide a valid bearer credential. Use [human-approved recovery](https://cherami.to/docs/guides/recovery) if access is lost. */
            401: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: Resource is absent or inaccessible to this account. Reply targets must be in the sending inbox. */
            404: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `content_unavailable`: Expected stored content is unavailable. Retry the read later.
             *
             *     `draft_unavailable`: Draft operation is uncertain. Follow [draft-specific recovery](https://cherami.to/docs/api/drafts); do not blindly create a replacement.
             */
            503: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    deleteDraft: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Owned Cherami resource ID returned by the API. */
                draft_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Request accepted; inspect the response for its meaning. */
            202: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "id": "11111111-1111-4111-8111-111111111111",
                     *       "status": "deletion_pending",
                     *       "message": "Example"
                     *     }
                     */
                    "application/json": components["schemas"]["DeletedDraft"];
                };
            };
            /** @description `unauthorized`: Provide a valid bearer credential. Use [human-approved recovery](https://cherami.to/docs/guides/recovery) if access is lost. */
            401: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `operation_not_allowed`: This account cannot send mail, delete mail, or delete inboxes. Contact support if unexpected. */
            403: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: Resource is absent or inaccessible to this account. Reply targets must be in the sending inbox. */
            404: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `draft_unavailable`: Draft operation is uncertain. Follow [draft-specific recovery](https://cherami.to/docs/api/drafts); do not blindly create a replacement. */
            503: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    updateDraft: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Owned Cherami resource ID returned by the API. */
                draft_id: string;
            };
            cookie?: never;
        };
        /** @description JSON object. Total UTF-8 request body limit: 8388608 bytes. */
        requestBody: {
            content: {
                /**
                 * @example {
                 *       "text": "Revised proposal.",
                 *       "html": null
                 *     }
                 */
                "application/json": components["schemas"]["UpdateDraft"];
            };
        };
        responses: {
            /** @description Successful operation; inspect resource state and outcome fields. */
            200: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "id": "11111111-1111-4111-8111-111111111111",
                     *       "inbox_id": "11111111-1111-4111-8111-111111111111",
                     *       "state": "draft",
                     *       "subject": "Example",
                     *       "created_at": "2026-10-01T00:00:00.000Z",
                     *       "updated_at": "2026-10-01T00:00:00.000Z",
                     *       "sent_message_id": null
                     *     }
                     */
                    "application/json": components["schemas"]["DraftMetadata"];
                };
            };
            /**
             * @description `invalid_json`: Send a valid UTF-8 JSON object, not an array or scalar.
             *
             *     `invalid_draft`: Use supported draft fields, source preparation or listing parameters. Draft cursors that are malformed or do not match the inbox/state also use this code.
             *
             *     `invalid_message`: Correct the send fields, recipients, reply ID, or attachments using the message's guidance.
             *
             *     `invalid_name`: Correct the inbox, sender or recipient display name using the returned guidance.
             *
             *     `invalid_labels`: Correct label names, changes, filter groups, or discovery prefix.
             */
            400: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Provide a valid bearer credential. Use [human-approved recovery](https://cherami.to/docs/guides/recovery) if access is lost. */
            401: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: Resource is absent or inaccessible to this account. Reply targets must be in the sending inbox. */
            404: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `draft_busy`: Another change to this draft landed first. Retrieve current content before trying again.
             *
             *     `draft_submitted`: Submitted drafts cannot be edited or returned to draft. Retrieve the linked sent message.
             */
            409: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `body_too_large`: Reduce the JSON request to the endpoint's body limit.
             *
             *     `message_too_large`: Reduce message content and attachments. Passing local checks does not guarantee generated MIME fits the provider limit.
             */
            413: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unsupported_media_type`: Send `Content-Type: application/json`. */
            415: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `content_unavailable`: Expected stored content is unavailable. Retry the read later.
             *
             *     `draft_unavailable`: Draft operation is uncertain. Follow [draft-specific recovery](https://cherami.to/docs/api/drafts); do not blindly create a replacement.
             */
            503: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    sendDraft: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Owned Cherami resource ID returned by the API. */
                draft_id: string;
            };
            cookie?: never;
        };
        /** @description JSON object. Total UTF-8 request body limit: 4096 bytes. */
        requestBody: {
            content: {
                /** @example {} */
                "application/json": components["schemas"]["SendDraft"];
            };
        };
        responses: {
            /** @description Matching replay: current resource or saved attempt, without another allocation or provider submission. */
            200: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    /** @description Relative URL of the resulting resource. */
                    Location?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "limited": false,
                     *       "message": {
                     *         "id": "33333333-3333-4333-8333-333333333333",
                     *         "inbox_id": "11111111-1111-4111-8111-111111111111",
                     *         "created_at": "2026-10-01T00:00:00.000Z",
                     *         "recipient_count": 1,
                     *         "status": "unknown",
                     *         "provider_message_id": null,
                     *         "error_code": null,
                     *         "thread_id": "44444444-4444-4444-8444-444444444444",
                     *         "in_reply_to": null,
                     *         "labels": []
                     *       },
                     *       "outcome_persisted": true,
                     *       "replayed": true
                     *     }
                     */
                    "application/json": components["schemas"]["SendReceipt"] & {
                        /** @constant */
                        replayed: true;
                    };
                };
            };
            /** @description Successful operation; inspect resource state and outcome fields. */
            201: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    /** @description Relative URL of the resulting resource. */
                    Location?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "limited": false,
                     *       "message": {
                     *         "id": "33333333-3333-4333-8333-333333333333",
                     *         "inbox_id": "11111111-1111-4111-8111-111111111111",
                     *         "created_at": "2026-10-01T00:00:00.000Z",
                     *         "recipient_count": 1,
                     *         "status": "unknown",
                     *         "provider_message_id": null,
                     *         "error_code": null,
                     *         "thread_id": "44444444-4444-4444-8444-444444444444",
                     *         "in_reply_to": null,
                     *         "labels": []
                     *       },
                     *       "outcome_persisted": true
                     *     }
                     */
                    "application/json": components["schemas"]["SendReceipt"] & {
                        /** @constant */
                        replayed?: false;
                    };
                };
            };
            /**
             * @description `invalid_json`: Send a valid UTF-8 JSON object, not an array or scalar.
             *
             *     `invalid_message`: Correct the send fields, recipients, reply ID, or attachments using the message's guidance.
             *
             *     `invalid_name`: Correct the inbox, sender or recipient display name using the returned guidance.
             *
             *     `invalid_labels`: Correct label names, changes, filter groups, or discovery prefix.
             *
             *     `invalid_idempotency_key`: Use 1–128 ASCII letters, digits, hyphens or underscores.
             *
             *     `invalid_draft`: Use supported draft fields, source preparation or listing parameters. Draft cursors that are malformed or do not match the inbox/state also use this code.
             */
            400: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Provide a valid bearer credential. Use [human-approved recovery](https://cherami.to/docs/guides/recovery) if access is lost. */
            401: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `operation_not_allowed`: This account cannot send mail, delete mail, or delete inboxes. Contact support if unexpected.
             *
             *     `recipient_not_allowed`: The inbox’s sending rules block one or more recipients. Nothing was submitted or charged. Use allowed recipients or ask the human to review [Sending rules](https://cherami.to/account/sending-rules); do not bypass them through another inbox.
             */
            403: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: Resource is absent or inaccessible to this account. Reply targets must be in the sending inbox. */
            404: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `reply_not_ready`: A received reply or forward source must be ready; a sent source must have confirmed provider acceptance.
             *
             *     `reply_headers_unavailable`: The target has no usable RFC Message-ID. Send a new message without `in_reply_to`.
             *
             *     `idempotency_conflict`: The key belongs to different input. Recover with the original inbox and payload, not a replacement key.
             *
             *     `idempotency_result_unavailable`: The key was used but its inbox, draft or sent copy has been deleted. Nothing was created or submitted; do not bypass protection with a new key.
             *
             *     `draft_busy`: Another change to this draft landed first. Retrieve current content before trying again.
             *
             *     `draft_result_unavailable`: The draft was already submitted but its sent copy is unavailable. Nothing was resubmitted.
             */
            409: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `body_too_large`: Reduce the JSON request to the endpoint's body limit.
             *
             *     `message_too_large`: Reduce message content and attachments. Passing local checks does not guarantee generated MIME fits the provider limit.
             */
            413: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unsupported_media_type`: Send `Content-Type: application/json`. */
            415: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `outbound_limit_reached`: Read `quota`, `reason` and `sufficient_capacity_at`. Waiting cannot fix `message_exceeds_allowance`; see [sending recovery](https://cherami.to/docs/api/sending/get-outbound-quota). */
            429: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    /** @description Delay in seconds when supplied. Quota uses sufficient_capacity_at; absent when waiting cannot make the message fit. */
                    "Retry-After"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["QuotaError"];
                };
            };
            /**
             * @description `content_unavailable`: Expected stored content is unavailable. Retry the read later.
             *
             *     `draft_unavailable`: Draft operation is uncertain. Follow [draft-specific recovery](https://cherami.to/docs/api/drafts); do not blindly create a replacement.
             */
            503: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    listThreads: {
        parameters: {
            query?: {
                /** @description Decimal integer without signs, whitespace or leading zeroes. */
                limit?: number;
                /** @description Opaque returned cursor. Keep resource URL, filters and ordering unchanged; stop when next_cursor is null. */
                cursor?: string;
                /** @description Nonempty lexical subject/body search, at most 512 UTF-16 code units and 16 words or closed quoted phrases. Every term must match; no raw FTS operators. Attachments and filenames are excluded. */
                query?: string;
                /** @description Exact case-insensitive bare parsed-header address. At most 320 UTF-16 code units before trimming; not the SMTP envelope. */
                from?: string;
                /** @description Exact case-insensitive bare parsed-header address. At most 320 UTF-16 code units before trimming; not the SMTP envelope. */
                recipient?: string;
                /** @description Case-insensitive literal substring, nonblank and at most 998 UTF-16 code units before trimming. */
                subject?: string;
                /** @description Inclusive lower service receipt/submission bound. Timezone-qualified valid calendar instant; after must precede before. URL-encode normally, including literal plus signs in offsets. */
                after?: string;
                /** @description Exclusive upper service receipt/submission bound. Timezone-qualified valid calendar instant; after must precede before. URL-encode normally, including literal plus signs in offsets. */
                before?: string;
                /** @description Require every listed label. Repeat this parameter per label, never comma-separate. Groups combine with AND; contradictory filters match nothing. Omit unused groups; use labels_all even for one label. Normalized set order and duplicates do not change cursor scope. */
                labels_all?: components["schemas"]["Label"][];
                /** @description Require at least one listed label. Repeat this parameter per label, never comma-separate. Groups combine with AND; contradictory filters match nothing. Omit unused groups; use labels_all even for one label. Normalized set order and duplicates do not change cursor scope. */
                labels_any?: components["schemas"]["Label"][];
                /** @description Exclude any message carrying a listed label; unlabeled messages qualify. Repeat this parameter per label, never comma-separate. Groups combine with AND; contradictory filters match nothing. Omit unused groups; use labels_all even for one label. Normalized set order and duplicates do not change cursor scope. */
                labels_none?: components["schemas"]["Label"][];
                /** @description relevance requires query. Listings are live views, not snapshots. */
                order?: "newest" | "oldest" | "relevance";
            };
            header?: never;
            path: {
                /** @description Owned Cherami resource ID returned by the API. */
                inbox_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful operation; inspect resource state and outcome fields. */
            200: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "threads": [],
                     *       "next_cursor": null
                     *     }
                     */
                    "application/json": {
                        threads: components["schemas"]["ThreadSummary"][];
                        next_cursor: string | null;
                    };
                };
            };
            /**
             * @description `invalid_limit`: Use an integer from 1 to 100.
             *
             *     `invalid_cursor`: Use the cursor with its original resource and filters, or restart from the first page. Draft listings instead report invalid_draft.
             *
             *     `invalid_search`: Correct search terms, filters, timestamps, or ordering. See [search](https://cherami.to/docs/guides/search).
             *
             *     `invalid_labels`: Correct label names, changes, filter groups, or discovery prefix.
             */
            400: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Provide a valid bearer credential. Use [human-approved recovery](https://cherami.to/docs/guides/recovery) if access is lost. */
            401: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: Resource is absent or inaccessible to this account. Reply targets must be in the sending inbox. */
            404: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: Operation failed; a write may already have happened. Follow the operation-specific recovery below. */
            500: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    getThread: {
        parameters: {
            query?: {
                /** @description Decimal integer without signs, whitespace or leading zeroes. */
                limit?: number;
                /** @description Opaque returned cursor. Keep resource URL, filters and ordering unchanged; stop when next_cursor is null. */
                cursor?: string;
            };
            header?: never;
            path: {
                /** @description Owned Cherami resource ID returned by the API. */
                thread_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful operation; inspect resource state and outcome fields. */
            200: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "id": "11111111-1111-4111-8111-111111111111",
                     *       "inbox_id": "11111111-1111-4111-8111-111111111111",
                     *       "subject": null,
                     *       "last_activity_at": "2026-10-01T00:00:00.000Z",
                     *       "message_count": 0,
                     *       "received_count": 0,
                     *       "accepted_count": 0,
                     *       "rejected_count": 0,
                     *       "unknown_count": 0,
                     *       "messages": [],
                     *       "next_cursor": null
                     *     }
                     */
                    "application/json": components["schemas"]["ThreadDetail"];
                };
            };
            /**
             * @description `invalid_limit`: Use an integer from 1 to 100.
             *
             *     `invalid_cursor`: Use the cursor with its original resource and filters, or restart from the first page. Draft listings instead report invalid_draft.
             */
            400: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Provide a valid bearer credential. Use [human-approved recovery](https://cherami.to/docs/guides/recovery) if access is lost. */
            401: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: Resource is absent or inaccessible to this account. Reply targets must be in the sending inbox. */
            404: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: Operation failed; a write may already have happened. Follow the operation-specific recovery below. */
            500: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `content_unavailable`: Expected stored content is unavailable. Retry the read later. */
            503: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    deleteThread: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Owned Cherami resource ID returned by the API. */
                thread_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Request accepted; inspect the response for its meaning. */
            202: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "id": "11111111-1111-4111-8111-111111111111",
                     *       "inbox_id": "11111111-1111-4111-8111-111111111111",
                     *       "message_count": 0,
                     *       "received_count": 0,
                     *       "sent_count": 0,
                     *       "status": "deletion_pending",
                     *       "message": "Example"
                     *     }
                     */
                    "application/json": components["schemas"]["DeletedThread"];
                };
            };
            /** @description `unauthorized`: Provide a valid bearer credential. Use [human-approved recovery](https://cherami.to/docs/guides/recovery) if access is lost. */
            401: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `operation_not_allowed`: This account cannot send mail, delete mail, or delete inboxes. Contact support if unexpected. */
            403: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: Resource is absent or inaccessible to this account. Reply targets must be in the sending inbox. */
            404: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: Operation failed; a write may already have happened. Follow the operation-specific recovery below. */
            500: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    updateThreadLabels: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Owned Cherami resource ID returned by the API. */
                thread_id: string;
            };
            cookie?: never;
        };
        /** @description JSON object. Total UTF-8 request body limit: 20480 bytes. */
        requestBody: {
            content: {
                /**
                 * @example {
                 *       "add_labels": [
                 *         "handled"
                 *       ]
                 *     }
                 */
                "application/json": components["schemas"]["LabelChange"];
            };
        };
        responses: {
            /** @description Successful operation; inspect resource state and outcome fields. */
            200: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "id": "11111111-1111-4111-8111-111111111111",
                     *       "inbox_id": "11111111-1111-4111-8111-111111111111",
                     *       "message_count": 0,
                     *       "received_count": 0,
                     *       "sent_count": 0,
                     *       "add_labels": [],
                     *       "remove_labels": []
                     *     }
                     */
                    "application/json": components["schemas"]["ThreadLabelResult"];
                };
            };
            /**
             * @description `invalid_json`: Send a valid UTF-8 JSON object, not an array or scalar.
             *
             *     `invalid_labels`: Correct label names, changes, filter groups, or discovery prefix.
             */
            400: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Provide a valid bearer credential. Use [human-approved recovery](https://cherami.to/docs/guides/recovery) if access is lost. */
            401: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: Resource is absent or inaccessible to this account. Reply targets must be in the sending inbox. */
            404: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `body_too_large`: Reduce the JSON request to the endpoint's body limit. */
            413: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unsupported_media_type`: Send `Content-Type: application/json`. */
            415: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: Operation failed; a write may already have happened. Follow the operation-specific recovery below. */
            500: {
                headers: {
                    /** @description Support correlation ID, not an idempotency key. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
}
