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
         * @description Lists every inbox on the account in one response, without pagination. `inbox_allowance.remaining` is how many more you can create.
         */
        get: operations["listInboxes"];
        put?: never;
        /**
         * Create an inbox
         * @description `local_part` becomes the address `local_part@cherami.to`. The address is permanent: it can't be renamed or moved to another domain. To move an agent to a new address, see [Change your agent's email address](https://cherami.to/docs/guides/change-email-address).
         *
         *     `name` identifies the inbox within the account and isn't shown to recipients; `sender_name` is the display name recipients see on its mail. Both are optional, can be [edited later](https://cherami.to/docs/api/inboxes/update-inbox) and need not be unique.
         *
         *     ### Recover creation
         *
         *     Include an `idempotency_key` to make a retry safe. If the response is lost or you get a `5xx`, repeat the request with the same key and the original payload within 24 hours of your first attempt: a match returns `200` with `replayed: true` and the inbox as it is now, and creates nothing new.
         *
         *     A request refused with `400`, `address_unavailable` or `inbox_limit_reached` leaves its key unused. Use each key for one inbox, and don't switch to a new key or another address to get past an uncertain result.
         *
         *     After 24 hours, or without a key, [list inboxes](https://cherami.to/docs/api/inboxes/list-inboxes) and look for the address before creating again: an unkeyed repeat of a creation that succeeded returns `409 address_unavailable`.
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
         * @description Returns the inbox's address and current names.
         */
        get: operations["getInbox"];
        put?: never;
        post?: never;
        /**
         * Delete an inbox
         * @description Deletes the inbox with all its received and sent mail, drafts, attachments and conversations. Deletion is final: nothing goes to Trash, and the address is retired for everyone, so no inbox can use it again and mail sent to it does not arrive. Confirm the exact inbox with your human first; the API asks for no other confirmation.
         *
         *     The slot is freed at once. A repeated request returns `202` or `404`.
         *
         *     [Deletion guide](https://cherami.to/docs/guides/deletion)
         */
        delete: operations["deleteInbox"];
        options?: never;
        head?: never;
        /**
         * Edit inbox names
         * @description Changes `name`, `sender_name` or both. An omitted field stays as it is; `null` or a blank string clears it. The address can't be changed.
         *
         *     A new `sender_name` applies to mail sent afterwards.
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
         * @description Shows the inbox's recipient restrictions. They apply to every way of sending: send, reply, reply-all, forward and drafts.
         *
         *     With `enabled: false` the inbox can send to anyone, even if addresses or domains are saved. With `enabled: true`, every To, Cc and Bcc recipient must match an entry in `addresses` or `domains`, or the send is refused with `403 recipient_not_allowed`; with both lists empty, the inbox can't send.
         *
         *     An address entry matches exactly: the local part is case-sensitive, and plus tags and dots count. A domain matches without regard to case and only itself, not its subdomains; international domains are listed in punycode.
         *
         *     These rules can be changed only in [Account → Sending rules](https://cherami.to/account/sending-rules), not through the API. [Sending rules guide](https://cherami.to/docs/guides/sending-rules)
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
         * @description Shows the inbox's blocked senders. With `enabled: true`, mail whose From address matches an entry in `addresses` or `domains` does not arrive, and no copy is kept. With `enabled: false` nothing is blocked, and the saved lists stay. Mail already received isn't affected by a change.
         *
         *     Entries match as in [sending rules](https://cherami.to/docs/api/inboxes/get-sending-policy).
         *
         *     The From address is written by the sender and isn't authenticated, so these rules stop unwanted mail from a sender, not a sender who forges another address. They can be changed only in [Account → Receiving rules](https://cherami.to/account/receiving-rules), not through the API. [Receiving rules guide](https://cherami.to/docs/guides/receiving-rules)
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
         * @description Lists received mail in the inbox, newest first. Narrow it with `query` and the sender, recipient, subject, date and label filters, or order by `oldest` or `relevance`: see [Find mail](https://cherami.to/docs/guides/search) and [labels](https://cherami.to/docs/guides/labels). Follow `next_cursor` with the same filters and order for the next page ([pagination](https://cherami.to/docs/api/errors#pagination)).
         *
         *     A message is listed as soon as it arrives. Only entries with `processing_status: "ready"` have `from` and a `preview`, and `thread_id` stays null until then. Identify the sender by `from`, a parsed mailbox such as `{"name":"Sender","address":"sender@example.com"}` or a group such as `{"name":"Team","group":[...]}`; `envelope_from` is the SMTP sender and can be a bounce address.
         *
         *     ### Previews
         *
         *     Received and sent listings include `preview`, an excerpt of up to 300 characters, null until the message's content is ready. It starts from the new reply text when that can be extracted, so even an untruncated preview can leave out the rest of the body: [read the message](https://cherami.to/docs/api/messages/get-message) before acting on it.
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
         * @description Counts received messages matching the same `query` and filters as [List received messages](https://cherami.to/docs/api/messages/list-messages), including messages that aren't ready to read yet.
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
         * @description Returns one received message. Check `processing_status` first:
         *
         *     - `ready`: `content` holds the parsed headers, the text and HTML bodies, `reply_text` and attachment metadata. The sender is `content.from`.
         *     - `pending` or `processing`: the content isn't ready yet; read the message again shortly.
         *     - `failed`: the content couldn't be prepared. The [raw MIME](https://cherami.to/docs/api/messages/download-raw-message) is still available.
         *
         *     For answers written between quoted lines, read `text` or `html` rather than `reply_text`.
         *
         *     Download an attachment by its `id` in `content.attachments`, with the [attachment endpoint](https://cherami.to/docs/api/messages/download-attachment).
         */
        get: operations["getMessage"];
        put?: never;
        post?: never;
        /**
         * Delete a received message
         * @description Moves the message and its attachments to the inbox's [Trash](https://cherami.to/docs/api/trash/list-trash). It leaves listings, search and its conversation at once, and can't be read or replied to while there. [Restore it](https://cherami.to/docs/api/trash/restore-message) within seven days; after that it is permanently deleted. A repeated request returns `202` or `404`.
         *
         *     [Deletion guide](https://cherami.to/docs/guides/deletion)
         */
        delete: operations["deleteMessage"];
        options?: never;
        head?: never;
        /**
         * Label a received message
         * @description Adds and removes labels on one received message, leaving its other labels as they are. Names are case-sensitive: `Receipts` and `receipts` are different labels. The response lists the message's labels after the change, and repeating a change is harmless.
         *
         *     To track read and starred mail with labels, see [Track read, unread and starred mail](https://cherami.to/docs/guides/read-unread).
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
         * @description Returns the message exactly as received, as `message/rfc822` bytes. It works in every processing state, including `failed`.
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
         * @description Returns one received attachment's bytes, always as `application/octet-stream`; the type the sender declared is `mime_type` in the message's attachment metadata. Take `attachment_id` from `content.attachments` of a `ready` message.
         *
         *     The bytes are the sender's file: save them or pass them to a file tool.
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
         * @description Returns a sent message's outcome (`status`, `error_code`) and, in `submission`, what was sent, attachments included as base64. Names are as they were at sending, not the inbox's current settings.
         */
        get: operations["getSentMessage"];
        put?: never;
        post?: never;
        /**
         * Delete a sent copy
         * @description Moves the sent copy and its attachments to the inbox's [Trash](https://cherami.to/docs/api/trash/list-trash). [Restore it](https://cherami.to/docs/api/trash/restore-sent-message) within seven days; after that it is permanently deleted. A repeated request returns `202` or `404`.
         */
        delete: operations["deleteSentMessage"];
        options?: never;
        head?: never;
        /**
         * Label a sent copy
         * @description Adds and removes labels on one sent copy, with the same rules as [labelling a received message](https://cherami.to/docs/api/labels/update-message-labels).
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
         * @description Applies one label change to up to 100 received messages, which may be in any of the account's inboxes. The [label rules](https://cherami.to/docs/api/labels/update-message-labels) apply; sent copies have [their own endpoint](https://cherami.to/docs/api/labels/bulk-update-sent-labels).
         *
         *     The change is all or nothing: if any ID is missing, deleted or not on this account, the request returns `404` and no message changes. On success the response has one entry per distinct ID, in request order. For more than 100 messages, send several requests.
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
         * @description Applies one label change to up to 100 sent copies, which may be in any of the account's inboxes. The [label rules](https://cherami.to/docs/api/labels/update-message-labels) apply; received messages have [their own endpoint](https://cherami.to/docs/api/labels/bulk-update-message-labels).
         *
         *     The change is all or nothing: if any ID is missing, deleted or not on this account, the request returns `404` and no copy changes. On success the response has one entry per distinct ID, in request order. For more than 100 copies, send several requests.
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
         * @description Lists the label names in use on the inbox's received and sent mail, with how many messages carry each in `received_count` and `sent_count`. `prefix` narrows the list to names starting with it, case-sensitive.
         *
         *     A name disappears once no message carries it. There is no separate step to create, rename or delete a label: add or remove it on messages.
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
         * @description Lists the inbox's sent messages of every status, newest first, with the same `query`, filters, ordering and [previews](https://cherami.to/docs/api/messages/list-messages#previews) as received mail. Entries carry the outcome and a preview but no subject or recipients: [read a message](https://cherami.to/docs/api/sending/get-sent-message) for those.
         */
        get: operations["listSentMessages"];
        put?: never;
        /**
         * Send a message
         * @description Sends an email from the inbox. Send only [permitted mail](https://cherami.to/docs/guides/safety#permitted-sending): to recipients who asked to hear from this inbox. To save a message for review or to send later, [create a draft](https://cherami.to/docs/api/drafts/create-draft) instead.
         *
         *     ### Request fields
         *
         *     Recipients are objects with an `address` and an optional `name`, never strings such as `Alex <alex@example.com>`. Mail goes out from the inbox's address with its [`sender_name`](https://cherami.to/docs/api/inboxes/update-inbox). Your sent copy keeps Bcc recipients.
         *
         *     Cherami adds a "Sent via Cherami" line at the end of the text and HTML bodies; don't add one yourself. Sent copies you read back include it.
         *
         *     ### Reply targets
         *
         *     To answer a message while choosing recipients and subject yourself, set `in_reply_to` to its ID: a ready received message or an accepted sent message in the same inbox that has a Message-ID header. It is a Cherami resource ID, not an RFC Message-ID or a thread ID. Cherami sets the reply headers so the email joins that conversation. To have recipients and subject derived for you, use [reply](https://cherami.to/docs/api/sending/reply-message) or [reply-all](https://cherami.to/docs/api/sending/reply-all-message).
         *
         *     ### Response and outcomes
         *
         *     `201` means the attempt was recorded, not that the email went out. Check `message.status`:
         *
         *     - `accepted`: the provider took the message. This is not delivery: Cherami doesn't report delivery or bounces.
         *     - `rejected`: the provider refused it before accepting, so nothing was sent and the recipients aren't charged. `error_code` says why: with `E_RECIPIENT_SUPPRESSED`, a suppressed recipient refused the whole message, so send again without that address; with `E_RATE_LIMIT_EXCEEDED` or `E_DAILY_LIMIT_EXCEEDED`, send again later. A new attempt needs a new key.
         *     - `unknown`: acceptance couldn't be confirmed, so the email may have gone out, and the status stays `unknown`. Treat it as possibly sent rather than sending it again: a resend can deliver a duplicate.
         *
         *     Accepted and unknown attempts are charged one unit per recipient.
         *
         *     When `outcome_persisted` is `false`, later reads may still say `unknown`: keep this response as the record of the outcome, and don't resend because a later read disagrees.
         *
         *     ### Retry a send with an idempotency key
         *
         *     Include an `idempotency_key`, a value you choose once per email, and save it with the exact request before sending. If the response is lost or you get a `5xx` such as `503 outbound_unavailable`, repeat the exact request with the same key within 24 hours of your first attempt.
         *
         *     A match returns `200` with `replayed: true` and the original `message`; check `message.status` as above. It never sends or charges again. Keys are unique across the account: reusing one for a different request, on any inbox or endpoint, returns `409 idempotency_conflict`.
         *
         *     A request refused before sending (an invalid field, a blocked recipient, no allowance) leaves its key unused, so you can correct it and send with the same key. Use a new key only for a new email, never to get past an uncertain result.
         *
         *     After 24 hours, or if you sent without a key, look for the email in [sent messages](https://cherami.to/docs/api/sending/list-sent-messages) before sending again: an unprotected repeat sends a second email.
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
         * @description Replies to `message_id`: a ready received message or an accepted sent message in the sending inbox that has a Message-ID header. Write the reply in `text`, optionally with `html`, new `attachments` and `labels`. Quoted history and the original's attachments aren't included.
         *
         *     Cherami derives the rest:
         *
         *     - To: the received message's Reply-To, or its From when there is none. A reply to your own sent message goes to its original To.
         *     - Subject: the original with `Re: ` added, unless it already starts with `Re:`.
         *     - Conversation: the reply joins the original's.
         *
         *     For a received message, these recipients come from headers the sender wrote: check its `content.reply_to` and `content.from` against your assignment before calling, or [create a reply draft](https://cherami.to/docs/api/drafts/create-draft#prepare-a-reply-or-forward) to review them first. To choose recipients or subject yourself, use [send](https://cherami.to/docs/api/sending/send-message) with `in_reply_to`; this endpoint refuses those fields. [Reply-all](https://cherami.to/docs/api/sending/reply-all-message) also includes the other participants.
         *
         *     Outcomes are those of [send](https://cherami.to/docs/api/sending/send-message#response-and-outcomes).
         *
         *     ### Retry a reply or forward
         *
         *     Retry as for [send](https://cherami.to/docs/api/sending/send-message#retry-a-send-with-an-idempotency-key): repeat the exact request to the same endpoint with the same key.
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
         * Reply to all
         * @description Replies to everyone visible on `message_id`. The source, fields, subject, outcomes and recovery are those of [reply](https://cherami.to/docs/api/sending/reply-message), which refuses recipient and subject fields; only the recipients differ:
         *
         *     - From received mail: To is the Reply-To (or From) plus the original To; Cc is the original Cc.
         *     - From your sent mail: the original To and Cc.
         *     - Groups are expanded and duplicates removed without regard to case. The sending inbox is left out; the account's other inboxes are kept. If only Cc recipients remain, the first moves to To. If none remain, the request returns `409 reply_recipients_unavailable`.
         *
         *     Original Bcc recipients are never included. If your inbox received the message as a Bcc recipient, replying to all shows everyone that it did.
         *
         *     For a received message, these recipients come from headers the sender wrote: check its `content.reply_to`, `content.from`, `content.to` and `content.cc` against your assignment before calling, or [create a reply-all draft](https://cherami.to/docs/api/drafts/create-draft#prepare-a-reply-or-forward) to review them first.
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
         * @description Forwards `message_id`, a ready received message or an accepted sent message in the sending inbox, to the recipients in `to`, `cc` and `bcc`. Recipients are used exactly as given, with the limits of [send](https://cherami.to/docs/api/sending/send-message). An optional `note` goes above the forwarded message.
         *
         *     The forward carries a header block with the original From, Date, Subject, To and Cc (never Bcc), then the original text and HTML as they are, quoted history included: check them for anything the new recipients shouldn't see. The subject gets `Fwd: ` unless it already starts with `Fw:` or `Fwd:`. A forward starts a new conversation.
         *
         *     The original attachments, embedded images included, are attached unless `include_attachments` is `false`, which leaves out every file, so images in the HTML may not display.
         *
         *     Outcomes are those of [send](https://cherami.to/docs/api/sending/send-message#response-and-outcomes), and retries those of [reply](https://cherami.to/docs/api/sending/reply-message#retry-a-reply-or-forward).
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
         * @description Returns the account's sending allowance: how many recipients all its inboxes together can send to in a rolling 24 hours.
         *
         *     Every To, Cc and Bcc entry uses one unit, repeats included. Accepted and `unknown` sends count; `rejected` ones don't. Bounces and deleting mail or inboxes don't give units back. Units return 24 hours after the send that used them; `next_capacity_at` and `next_capacity_amount` say when the next ones return and how many.
         *
         *     A send that needs more than `remaining` returns `429 outbound_limit_reached`, and nothing is sent or charged. Its `reason` says what to do:
         *
         *     - `temporary_exhaustion`: wait until `sufficient_capacity_at`, which `Retry-After` also gives.
         *     - `message_exceeds_allowance`: the message has more recipients than the whole allowance, so waiting won't help. Send to fewer recipients, or [request a larger allowance](https://cherami.to/docs/guides/support).
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
         * @description Lists the inbox's drafts, newest first, filtered by `state`. Drafts don't appear in mail listings, search or conversations until sent.
         */
        get: operations["listDrafts"];
        put?: never;
        /**
         * Create a draft
         * @description Saves a message in the inbox to finish, review or [send](https://cherami.to/docs/api/drafts/send-draft) later. Saving uses no sending allowance. Every field is optional (`{}` saves an empty draft) and takes the formats and limits of [send](https://cherami.to/docs/api/sending/send-message); recipients, subject and text are checked when you send. Creation returns metadata only: [retrieve the draft](https://cherami.to/docs/api/drafts/get-draft) for its content.
         *
         *     ### Prepare a reply or forward
         *
         *     Set `source` to an `action` (`reply`, `reply-all` or `forward`) and a `message_id`, a ready received message or an accepted sent message in this inbox, to have Cherami fill in the draft once, at creation:
         *
         *     - `reply` and `reply-all` save the recipients, subject and `in_reply_to` derived as for [reply](https://cherami.to/docs/api/sending/reply-message) and [reply-all](https://cherami.to/docs/api/sending/reply-all-message). Fields you supply override them, including an empty array or a null `in_reply_to`. Your `text` and `attachments` make up the reply; no history or original files are copied. The message you reply to must still exist when you send, and changing `in_reply_to` later doesn't re-derive recipients or subject.
         *     - `forward` saves the full forward as text and HTML, with your `text` as the note, plus the original attachments unless `source.include_attachments` is `false`. Add recipients now or later. `attachments` can't be supplied with a forward source; edit the draft afterwards to change its files.
         *
         *     ### Recover creation
         *
         *     Include an `idempotency_key` to make a retry safe. If creation is uncertain, repeat the exact request with the same key within 24 hours of your first attempt: a match returns `200` with `replayed: true` and the draft's current metadata, without applying the payload again.
         *
         *     After 24 hours, or without a key, [list drafts](https://cherami.to/docs/api/drafts/list-drafts) with `state=all` before creating again: a blind repeat makes a duplicate.
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
         * @description Returns the draft's metadata, `from` (the inbox's current address and sender name) and its full saved `content`, attachments included as base64. The content is what you saved: Cherami adds its "Sent via Cherami" line and uses the inbox's sender name at the time you send. For a submitted draft, [read the sent message](https://cherami.to/docs/api/sending/get-sent-message) named by `sent_message_id` for what was sent and its outcome.
         */
        get: operations["getDraft"];
        put?: never;
        post?: never;
        /**
         * Delete a draft
         * @description Deletes the draft and its attachments. This is final: drafts don't go to Trash. A submitted draft's sent message is separate, and deleting one doesn't delete the other. A repeated request returns `202` or `404`.
         */
        delete: operations["deleteDraft"];
        options?: never;
        head?: never;
        /**
         * Edit a draft
         * @description Changes only the fields you supply; a list you supply (recipients, attachments, labels) replaces the whole list. `text` and `html` are separate bodies: when you change one, update the other or clear it with `html: null`. `source` and `idempotency_key` can't be edited.
         *
         *     Supply attachments with only `filename`, `type` and `content`, even when reusing files read from the draft.
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
         * @description Sends the draft's current saved content. Send `{}`.
         *
         *     The first send attempt freezes the draft as `submitted`, with `sent_message_id` naming the sent message, whatever the outcome: `rejected` and `unknown` included. A submitted draft can't be edited or sent again. Create a new draft for a deliberate new attempt, not to resolve an `unknown` outcome. A refusal before sending (invalid content, a blocked recipient, no allowance) leaves the draft editable.
         *
         *     The response is an ordinary [send receipt](https://cherami.to/docs/api/sending/send-message#response-and-outcomes). If it is lost or uncertain, repeat this request at any time: it returns the original attempt with `replayed: true` and never sends again.
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
         * @description Lists the inbox's conversations, most recent activity first. A conversation holds ready received messages and every send attempt, `rejected` and `unknown` included, and its counts include them.
         *
         *     The [search, filters and ordering](https://cherami.to/docs/guides/search) of message listings apply; a conversation matches when one of its messages meets every condition. Filtered results add `matching_message_ids` (up to 100, newest first) and `matching_message_count`.
         *
         *     `subject` is the earliest message's. `latest_message` is the newest message, whichever messages matched: its `id`, `direction`, `counterpart` (the From of received mail, or the first To of sent mail) and [`preview`](https://cherami.to/docs/api/messages/list-messages#previews).
         *
         *     Labels belong to messages, not conversations. Reply using a message's `id`, not the thread ID.
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
         * @description Returns the conversation's metadata and its messages, with bodies and attachment metadata. Each message has `direction` (`received` or `sent`), `timestamp`, and the fields of [received](https://cherami.to/docs/api/messages/get-message) or [sent](https://cherami.to/docs/api/sending/get-sent-message) detail.
         *
         *     The first page holds the newest messages, oldest first within the page; `next_cursor` fetches older ones. Order follows Cherami's receipt and send times, not the senders' Date headers. Counts describe the whole conversation.
         *
         *     Attachment bytes aren't included: [download](https://cherami.to/docs/api/messages/download-attachment) a received file, or read [sent detail](https://cherami.to/docs/api/sending/get-sent-message) for a sent file's base64 content.
         *
         *     Received messages that aren't ready, or failed, aren't part of a conversation; read them through the message endpoints.
         */
        get: operations["getThread"];
        put?: never;
        post?: never;
        /**
         * Delete a conversation
         * @description Moves every message currently in the conversation, with attachments, to the inbox's [Trash](https://cherami.to/docs/api/trash/list-trash). Trash lists them one by one: [restore](https://cherami.to/docs/api/trash) each within seven days to bring the conversation back; after that they are permanently deleted.
         *
         *     The counts say how many messages moved. A repeated request returns `202` or `404`.
         */
        delete: operations["deleteThread"];
        options?: never;
        head?: never;
        /**
         * Label a conversation
         * @description Adds and removes labels on every message currently in the conversation, received and sent, leaving their other labels as they are. The [label rules](https://cherami.to/docs/api/labels/update-message-labels) apply. Messages that arrive later don't get the labels.
         *
         *     The counts cover every message updated, including those that already matched, and `add_labels` and `remove_labels` echo the change rather than each message's labels.
         */
        patch: operations["updateThreadLabels"];
        trace?: never;
    };
    "/v1/inboxes/{inbox_id}/trash": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List Trash
         * @description Lists the inbox's deleted messages that can still be restored, most recently deleted first. `kind` (`received` or `sent`) picks the restore endpoint: [received](https://cherami.to/docs/api/trash/restore-message) or [sent](https://cherami.to/docs/api/trash/restore-sent-message). `restorable_until` is seven days after `deleted_at`; after it the message is gone for good. A deleted conversation appears as its separate messages. Mail deleted with its inbox never appears here.
         */
        get: operations["listTrash"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/messages/{message_id}/restore": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Restore a received message
         * @description Brings a received message back from [Trash](https://cherami.to/docs/api/trash/list-trash). Send no request body. It returns to listings, search and its conversation, with its labels and attachments, and repeating a restore is safe.
         *
         *     Restoring every message of a deleted conversation brings the conversation back. After `restorable_until` the message can't be restored and the request returns `404`.
         */
        post: operations["restoreMessage"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/sent/{message_id}/restore": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Restore a sent copy
         * @description Brings a sent copy back from [Trash](https://cherami.to/docs/api/trash/list-trash) to sent listings, search and its conversation, with its labels. Send no request body. Results and `404` cases are those of [restoring a received message](https://cherami.to/docs/api/trash/restore-message).
         */
        post: operations["restoreSentMessage"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        InboxList: {
            inboxes: components["schemas"]["Inbox"][];
            /** @description Most inboxes the account can have; the same as inbox_allowance.allowance. */
            inbox_limit: number;
            inbox_allowance: components["schemas"]["InboxAllowance"];
        };
        Inbox: {
            /** @description Cherami resource ID. */
            id: string;
            local_part: string;
            address: string;
            name: string | null;
            sender_name: string | null;
            /**
             * Format: date-time
             * @description UTC timestamp with milliseconds.
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
                /** @description Code to handle. Handle a code you don't recognize by its HTTP status. */
                code: string;
                /** @description Explanation of this case; its wording can change. */
                message: string;
            };
        };
        CreatedInbox: {
            /** @description Cherami resource ID. */
            id: string;
            local_part: string;
            address: string;
            name: string | null;
            sender_name: string | null;
            /**
             * Format: date-time
             * @description UTC timestamp with milliseconds.
             */
            created_at: string;
            /** @description true when a retry matched an earlier request: the result is that request's, and nothing new was created or sent. */
            replayed?: boolean;
            /**
             * Format: date-time
             * @description When the key stops protecting retries.
             */
            idempotency_expires_at?: string;
        };
        InboxError: {
            error: {
                /** @description Code to handle. Handle a code you don't recognize by its HTTP status. */
                code: string;
                /** @description Explanation of this case; its wording can change. */
                message: string;
                details?: {
                    allowance: components["schemas"]["InboxAllowance"];
                    increase_request: string;
                    policy_url: string;
                };
            };
        };
        CreateInbox: {
            /** @description The part before @cherami.to, lowercased: 1–64 letters, digits, hyphens or underscores, starting and ending with a letter or digit. Taken, reserved and retired addresses are unavailable. */
            local_part: string;
            /** @description Identifies the inbox within the account; not shown to recipients. At most 256 UTF-8 bytes; null or blank means none. */
            name?: string | null;
            /** @description Display name recipients see on the inbox's mail. At most 256 UTF-8 bytes; null or blank means none. */
            sender_name?: string | null;
            /** @description Your unique value for this one operation. Save it with the exact request before sending; repeating that request with the same key within 24 hours returns what the first one did instead of acting again. */
            idempotency_key?: string;
        };
        UpdateInbox: {
            /** @description Identifies the inbox within the account; not shown to recipients. At most 256 UTF-8 bytes; null or blank means none. */
            name?: string | null;
            /** @description Display name recipients see on the inbox's mail. At most 256 UTF-8 bytes; null or blank means none. */
            sender_name?: string | null;
        };
        Deleted: {
            /** @description Cherami resource ID. */
            id: string;
            /** @constant */
            status: "deletion_pending";
            message: string;
        };
        Policy: {
            /** @description Cherami resource ID. */
            inbox_id: string;
            enabled: boolean;
            addresses: string[];
            domains: string[];
            /** @description Saved policy version; zero when unconfigured. */
            revision: number;
        };
        /** @description 1–128 UTF-8 bytes after trimming, without control characters; case-sensitive. */
        Label: string;
        ReceivedSummary: {
            /** @description Cherami resource ID. */
            id: string;
            /** @description Cherami resource ID. */
            inbox_id: string;
            thread_id: string | null;
            envelope_from: string;
            envelope_to: string;
            subject: string | null;
            /**
             * Format: date-time
             * @description UTC timestamp with milliseconds.
             */
            received_at: string;
            /** @constant */
            processing_status: "ready";
            labels: string[];
            preview: components["schemas"]["Preview"] | null;
            from: components["schemas"]["ParsedAddress"] | null;
        } | {
            /** @description Cherami resource ID. */
            id: string;
            /** @description Cherami resource ID. */
            inbox_id: string;
            thread_id: string | null;
            envelope_from: string;
            envelope_to: string;
            subject: string | null;
            /**
             * Format: date-time
             * @description UTC timestamp with milliseconds.
             */
            received_at: string;
            /** @enum {string} */
            processing_status: "pending" | "processing" | "failed";
            labels: string[];
            preview: null;
        };
        Preview: {
            /** @description Start of the chosen text, whitespace collapsed; empty when the message added no new text. */
            text: string;
            /** @description true when the chosen text was longer than the excerpt. */
            truncated: boolean;
            /**
             * @description Which text the excerpt comes from.
             * @enum {string}
             */
            source: "reply_text" | "text" | "html";
        };
        /** @description Mailbox or group from the message headers, written by the sender and not verified. */
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
            /** @description Cherami resource ID. */
            id: string;
            /** @description Cherami resource ID. */
            inbox_id: string;
            thread_id: string | null;
            envelope_from: string;
            envelope_to: string;
            subject: string | null;
            /**
             * Format: date-time
             * @description UTC timestamp with milliseconds.
             */
            received_at: string;
            /** @constant */
            processing_status: "ready";
            labels: string[];
            /** @description The message's Message-ID header, not a Cherami ID: reply and forward take id. */
            message_id: string | null;
            raw_size: number;
            processed_at: string | null;
            content: components["schemas"]["ReceivedContent"];
        } | {
            /** @description Cherami resource ID. */
            id: string;
            /** @description Cherami resource ID. */
            inbox_id: string;
            thread_id: string | null;
            envelope_from: string;
            envelope_to: string;
            subject: string | null;
            /**
             * Format: date-time
             * @description UTC timestamp with milliseconds.
             */
            received_at: string;
            /** @enum {string} */
            processing_status: "pending" | "processing" | "failed";
            labels: string[];
            /** @description The message's Message-ID header, not a Cherami ID: reply and forward take id. */
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
            /** @description Message-ID header as the sender wrote it. */
            message_id: string | null;
            in_reply_to: string | null;
            references: string | null;
            /** @description The sender's Date header: ISO when it parses, otherwise as written. Use received_at for ordering. */
            date: string | null;
            /** @description New text without quoted history. Empty: there is none. Null: it couldn't be extracted. */
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
            /** @description Cherami resource ID. */
            id: string;
            labels: string[];
        };
        /** @description At least one array must contain a label, and a name can't be in both. */
        LabelChange: {
            /** @description Label names, case-sensitive; order and duplicates don't matter. */
            add_labels?: components["schemas"]["Label"][];
            /** @description Label names, case-sensitive; order and duplicates don't matter. */
            remove_labels?: components["schemas"]["Label"][];
        };
        SentDetail: {
            /** @description Cherami resource ID. */
            id: string;
            /** @description Cherami resource ID. */
            inbox_id: string;
            /**
             * Format: date-time
             * @description UTC timestamp with milliseconds.
             */
            created_at: string;
            recipient_count: number;
            /** @enum {string} */
            status: "accepted" | "rejected" | "unknown";
            /** @description Message-ID the provider assigned when it accepted the message. */
            provider_message_id: string | null;
            /** @description Reason code for a rejected or unknown outcome, such as E_RECIPIENT_SUPPRESSED or acceptance_unknown. */
            error_code: string | null;
            thread_id: string | null;
            in_reply_to: string | null;
            labels: string[];
            /** @description New text without quoted history. Empty: there is none. Null: it couldn't be extracted; read submission. */
            reply_text: string | null;
            submission: components["schemas"]["Submission"];
        };
        /** @description What was sent, including the Sent via Cherami line. */
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
            /** @description Bare address such as alex@example.com: ASCII, at most 254 characters and 64 before the @. */
            address: string;
            /** @description Optional name; blank means none. At most 256 UTF-8 bytes after trimming, without control characters. */
            name?: string;
        };
        StoredAttachment: {
            /** @description At most 255 UTF-8 bytes, without control characters, slashes or backslashes. */
            filename: string;
            /** @description MIME type without parameters. */
            type: string;
            /** @description The file's bytes as padded base64, without line breaks. */
            content: string;
            /** @enum {string} */
            disposition: "attachment" | "inline";
            /** @description Content-ID of an inline file carried over from a forwarded message. */
            contentId?: string;
        };
        /** @description At least one nonempty change array, and no name in both. Duplicate IDs are updated once. */
        BulkLabelChange: {
            message_ids: string[];
            /** @description Label names, case-sensitive; order and duplicates don't matter. */
            add_labels?: components["schemas"]["Label"][];
            /** @description Label names, case-sensitive; order and duplicates don't matter. */
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
        /** @description accepted in message.status means the provider took the message, not that it was delivered. */
        SendReceipt: {
            /** @constant */
            limited: false;
            message: components["schemas"]["SentMetadata"];
            /** @description false: this response is the only record of the outcome; keep it rather than resending. */
            outcome_persisted: boolean;
            /** @description true when a retry matched an earlier request: the result is that request's, and nothing new was created or sent. */
            replayed?: boolean;
            /**
             * Format: date-time
             * @description When the key stops protecting retries.
             */
            idempotency_expires_at?: string;
        };
        SentMetadata: {
            /** @description Cherami resource ID. */
            id: string;
            /** @description Cherami resource ID. */
            inbox_id: string;
            /**
             * Format: date-time
             * @description UTC timestamp with milliseconds.
             */
            created_at: string;
            recipient_count: number;
            /** @enum {string} */
            status: "accepted" | "rejected" | "unknown";
            /** @description Message-ID the provider assigned when it accepted the message. */
            provider_message_id: string | null;
            /** @description Reason code for a rejected or unknown outcome, such as E_RECIPIENT_SUPPRESSED or acceptance_unknown. */
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
            /** @description Recipients this message needs, one per To, Cc and Bcc entry. */
            requested_recipients: number;
            /**
             * @description temporary_exhaustion: enough capacity returns at sufficient_capacity_at. message_exceeds_allowance: the message needs more than the whole allowance, so waiting won't help.
             * @enum {string}
             */
            reason: "temporary_exhaustion" | "message_exceeds_allowance";
            /** @description When this message will fit; null with message_exceeds_allowance. */
            sufficient_capacity_at: string | null;
            /** @description What keeps working while sending is limited. */
            guidance: string;
        };
        Quota: {
            /** @description Recipients the account can send to in any 24 hours. */
            allowance: number;
            /** @description Recipients charged in the last 24 hours. */
            used: number;
            /** @description Recipients you can send to now. */
            remaining: number;
            /** @description When the next units return; null when nothing is charged. */
            next_capacity_at: string | null;
            /** @description Recipients that become available at next_capacity_at. */
            next_capacity_amount: number;
            /** @constant */
            window_hours: 24;
            /**
             * @description One unit per To, Cc or Bcc recipient.
             * @constant
             */
            unit: "recipient_deliveries";
            /** @description How to ask for a larger allowance. */
            increase_request: string;
            policy_url: string;
        };
        /** @description At most 50 To, Cc and Bcc recipients in total and 32 attachments. The whole email, counting text, HTML and base64 attachments, must fit in 5 MiB. Cherami sets From and the other headers. */
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
            /** @description Omitted, null or [] means no attachments. */
            attachments?: components["schemas"]["AttachmentInput"][] | null;
            /** @description ID of a ready received message or an accepted sent message in this inbox that has a Message-ID header. */
            in_reply_to?: string;
            /** @description Label names, case-sensitive; order and duplicates don't matter. */
            labels?: components["schemas"]["Label"][];
            /** @description Your unique value for this one operation. Save it with the exact request before sending; repeating that request with the same key within 24 hours returns what the first one did instead of acting again. */
            idempotency_key?: string;
        };
        AttachmentInput: {
            /** @description At most 255 UTF-8 bytes, without control characters, slashes or backslashes. */
            filename: string;
            /** @description MIME type without parameters. */
            type: string;
            /** @description The file's bytes as padded base64, without line breaks. */
            content: string;
        };
        SentSummary: {
            /** @description Cherami resource ID. */
            id: string;
            /** @description Cherami resource ID. */
            inbox_id: string;
            /**
             * Format: date-time
             * @description UTC timestamp with milliseconds.
             */
            created_at: string;
            recipient_count: number;
            /** @enum {string} */
            status: "accepted" | "rejected" | "unknown";
            /** @description Message-ID the provider assigned when it accepted the message. */
            provider_message_id: string | null;
            /** @description Reason code for a rejected or unknown outcome, such as E_RECIPIENT_SUPPRESSED or acceptance_unknown. */
            error_code: string | null;
            thread_id: string | null;
            in_reply_to: string | null;
            labels: string[];
            preview: components["schemas"]["Preview"] | null;
        };
        ReplyInput: {
            /** @description ID of a ready received message or an accepted sent message in this inbox that has a Message-ID header. */
            message_id: string;
            /** @description Nonblank reply text; quoted history isn't added. */
            text: string;
            /** @description HTML alternative, sent as supplied. */
            html?: string;
            /** @description Omitted, null or [] means no attachments. */
            attachments?: components["schemas"]["AttachmentInput"][] | null;
            /** @description Label names, case-sensitive; order and duplicates don't matter. */
            labels?: components["schemas"]["Label"][];
            /** @description Your unique value for this one operation. Save it with the exact request before sending; repeating that request with the same key within 24 hours returns what the first one did instead of acting again. */
            idempotency_key?: string;
        };
        ForwardInput: {
            /** @description ID of a ready received message or an accepted sent message in this inbox. */
            message_id: string;
            to: components["schemas"]["Mailbox"][];
            cc?: components["schemas"]["Mailbox"][];
            bcc?: components["schemas"]["Mailbox"][];
            /** @description Optional plain-text introduction above the forwarded message. */
            note?: string;
            /**
             * @description false leaves out every original file, embedded images included.
             * @default true
             */
            include_attachments: boolean;
            /** @description Label names, case-sensitive; order and duplicates don't matter. */
            labels?: components["schemas"]["Label"][];
            /** @description Your unique value for this one operation. Save it with the exact request before sending; repeating that request with the same key within 24 hours returns what the first one did instead of acting again. */
            idempotency_key?: string;
        };
        CreatedDraft: {
            /** @description Cherami resource ID. */
            id: string;
            /** @description Cherami resource ID. */
            inbox_id: string;
            /** @enum {string} */
            state: "draft" | "submitted";
            subject: string;
            /**
             * Format: date-time
             * @description UTC timestamp with milliseconds.
             */
            created_at: string;
            /**
             * Format: date-time
             * @description UTC timestamp with milliseconds.
             */
            updated_at: string;
            sent_message_id: string | null;
            /** @description true when a retry matched an earlier request: the result is that request's, and nothing new was created or sent. */
            replayed?: boolean;
            /**
             * Format: date-time
             * @description When the key stops protecting retries.
             */
            idempotency_expires_at?: string;
        };
        CreateDraft: {
            to?: components["schemas"]["Mailbox"][];
            cc?: components["schemas"]["Mailbox"][];
            bcc?: components["schemas"]["Mailbox"][];
            /** @description No control characters; at most 998 UTF-8 bytes. */
            subject?: string;
            /** @description Plain-text body. */
            text?: string;
            /** @description HTML alternative, sent as supplied; null means none. */
            html?: string | null;
            /** @description Omitted, null or [] means no attachments. */
            attachments?: components["schemas"]["AttachmentInput"][] | null;
            /** @description ID of a ready received message or an accepted sent message in this inbox that has a Message-ID header; null means none. */
            in_reply_to?: string | null;
            /** @description Label names, case-sensitive; order and duplicates don't matter. */
            labels?: components["schemas"]["Label"][];
            /** @description Your unique value for this one operation. Save it with the exact request before sending; repeating that request with the same key within 24 hours returns what the first one did instead of acting again. */
            idempotency_key?: string;
            /** @description Fills in the draft once, at creation, as a reply, reply-all or forward of message_id. */
            source?: {
                /** @enum {string} */
                action: "reply" | "reply-all";
                /** @description ID of a ready received message or an accepted sent message in this inbox. */
                message_id: string;
            } | {
                /** @constant */
                action: "forward";
                /** @description ID of a ready received message or an accepted sent message in this inbox. */
                message_id: string;
                /**
                 * @description false leaves out every original file, embedded images included.
                 * @default true
                 */
                include_attachments: boolean;
            };
        };
        DraftMetadata: {
            /** @description Cherami resource ID. */
            id: string;
            /** @description Cherami resource ID. */
            inbox_id: string;
            /** @enum {string} */
            state: "draft" | "submitted";
            subject: string;
            /**
             * Format: date-time
             * @description UTC timestamp with milliseconds.
             */
            created_at: string;
            /**
             * Format: date-time
             * @description UTC timestamp with milliseconds.
             */
            updated_at: string;
            sent_message_id: string | null;
        };
        DraftDetail: {
            /** @description Cherami resource ID. */
            id: string;
            /** @description Cherami resource ID. */
            inbox_id: string;
            /** @enum {string} */
            state: "draft" | "submitted";
            subject: string;
            /**
             * Format: date-time
             * @description UTC timestamp with milliseconds.
             */
            created_at: string;
            /**
             * Format: date-time
             * @description UTC timestamp with milliseconds.
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
            /** @description Cherami resource ID. */
            in_reply_to?: string;
            labels?: string[];
            attachments: components["schemas"]["StoredAttachment"][];
        };
        UpdateDraft: {
            to?: components["schemas"]["Mailbox"][];
            cc?: components["schemas"]["Mailbox"][];
            bcc?: components["schemas"]["Mailbox"][];
            /** @description No control characters; at most 998 UTF-8 bytes. */
            subject?: string;
            /** @description Plain-text body. */
            text?: string;
            /** @description HTML alternative, sent as supplied; null means none. */
            html?: string | null;
            /** @description A supplied array replaces the draft's files; [] or null removes them. Omit it to keep them. */
            attachments?: components["schemas"]["AttachmentInput"][] | null;
            /** @description ID of a ready received message or an accepted sent message in this inbox that has a Message-ID header; null means none. */
            in_reply_to?: string | null;
            /** @description Label names, case-sensitive; order and duplicates don't matter. */
            labels?: components["schemas"]["Label"][];
        };
        DeletedDraft: {
            /** @description Cherami resource ID. */
            id: string;
            /** @constant */
            status: "deletion_pending";
            message: string;
        };
        SendDraft: {
            /** @description Not needed: the draft ID already makes a repeat safe, at any time. */
            idempotency_key?: string;
        };
        ThreadSummary: {
            /** @description Cherami resource ID. */
            id: string;
            /** @description Cherami resource ID. */
            inbox_id: string;
            subject: string | null;
            /**
             * Format: date-time
             * @description UTC timestamp with milliseconds.
             */
            last_activity_at: string;
            message_count: number;
            received_count: number;
            accepted_count: number;
            rejected_count: number;
            unknown_count: number;
            latest_message: components["schemas"]["ThreadLatestMessage"];
            matching_message_ids?: string[];
            matching_message_count?: number;
        };
        /** @description The conversation's newest message, whichever messages the filters matched. id is a received or sent message ID, according to direction. */
        ThreadLatestMessage: {
            /** @description Cherami resource ID. */
            id: string;
            /** @constant */
            direction: "received";
            /** @description The message's From; null when absent. */
            counterpart: components["schemas"]["ParsedAddress"] | null;
            preview: components["schemas"]["Preview"] | null;
        } | {
            /** @description Cherami resource ID. */
            id: string;
            /** @constant */
            direction: "sent";
            /** @description First To recipient, as a lowercase address without a name; null when unavailable. Sent detail has every recipient. */
            counterpart: components["schemas"]["Mailbox"] | null;
            preview: components["schemas"]["Preview"] | null;
        };
        ThreadDetail: {
            /** @description Cherami resource ID. */
            id: string;
            /** @description Cherami resource ID. */
            inbox_id: string;
            subject: string | null;
            /**
             * Format: date-time
             * @description UTC timestamp with milliseconds.
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
             * @description UTC timestamp with milliseconds.
             */
            timestamp: string;
        };
        ThreadSentDetail: {
            /** @description Cherami resource ID. */
            id: string;
            /** @description Cherami resource ID. */
            inbox_id: string;
            /**
             * Format: date-time
             * @description UTC timestamp with milliseconds.
             */
            created_at: string;
            recipient_count: number;
            /** @enum {string} */
            status: "accepted" | "rejected" | "unknown";
            /** @description Message-ID the provider assigned when it accepted the message. */
            provider_message_id: string | null;
            /** @description Reason code for a rejected or unknown outcome, such as E_RECIPIENT_SUPPRESSED or acceptance_unknown. */
            error_code: string | null;
            thread_id: string | null;
            in_reply_to: string | null;
            labels: string[];
            /** @constant */
            direction: "sent";
            /**
             * Format: date-time
             * @description UTC timestamp with milliseconds.
             */
            timestamp: string;
            /** @description New text without quoted history. Empty: there is none. Null: it couldn't be extracted; read submission. */
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
            /** @description Cherami resource ID. */
            id: string;
            /** @description Cherami resource ID. */
            inbox_id: string;
            message_count: number;
            received_count: number;
            sent_count: number;
            add_labels: string[];
            remove_labels: string[];
        };
        DeletedThread: {
            /** @description Cherami resource ID. */
            id: string;
            /** @description Cherami resource ID. */
            inbox_id: string;
            message_count: number;
            received_count: number;
            sent_count: number;
            /** @constant */
            status: "deletion_pending";
            message: string;
        };
        /** @description A deleted message that can still be restored; kind picks the restore endpoint. from is null for a received message that never became ready. */
        TrashEntry: {
            /** @description Cherami resource ID. */
            id: string;
            /** @constant */
            kind: "received";
            /** @description Cherami resource ID. */
            inbox_id: string;
            subject: string | null;
            from: components["schemas"]["ParsedAddress"] | null;
            /** @description SMTP sender; can be a bounce address. */
            envelope_from: string;
            /**
             * Format: date-time
             * @description UTC timestamp with milliseconds.
             */
            deleted_at: string;
            /**
             * Format: date-time
             * @description Seven days after deleted_at; the message can't be restored after it.
             */
            restorable_until: string;
        } | {
            /** @description Cherami resource ID. */
            id: string;
            /** @constant */
            kind: "sent";
            /** @description Cherami resource ID. */
            inbox_id: string;
            subject: string | null;
            to: components["schemas"]["Mailbox"][];
            /**
             * Format: date-time
             * @description UTC timestamp with milliseconds.
             */
            deleted_at: string;
            /**
             * Format: date-time
             * @description Seven days after deleted_at; the message can't be restored after it.
             */
            restorable_until: string;
        };
        /** @description restored: this request brought the message back. already_live: it wasn't in Trash and nothing changed. thread_id is its conversation now; null for a received message that isn't ready. */
        Restored: {
            /** @description Cherami resource ID. */
            id: string;
            /** @description Cherami resource ID. */
            inbox_id: string;
            thread_id: string | null;
            /** @enum {string} */
            status: "restored" | "already_live";
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
            /** @description Success. */
            200: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: The operation failed. Retry a read; after a write the change may have happened, so recover as [retry by operation](https://cherami.to/docs/api/errors#retry-by-operation) describes. */
            500: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
        /** @description JSON object, at most 4 KiB in total. */
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
            /** @description A retry matched an earlier request: this is that request's result as it is now. Nothing new was created or sent. */
            200: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                         * @description When the key stops protecting retries.
                         */
                        idempotency_expires_at: string;
                    };
                };
            };
            /** @description Created. */
            201: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
             *     `invalid_inbox`: Creation takes only `local_part`, `name`, `sender_name` and `idempotency_key`; an edit takes at least one of `name` and `sender_name`, and nothing else.
             *
             *     `invalid_local_part`: Use 1–64 letters, digits, hyphens or underscores for `local_part`, starting and ending with a letter or digit.
             *
             *     `invalid_name`: Use plain text without control characters, at most 256 UTF-8 bytes after trimming. The message names the field.
             *
             *     `invalid_idempotency_key`: Use 1–128 ASCII letters, digits, hyphens or underscores.
             */
            400: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `address_unavailable`: The address is in use, reserved or retired. Choose another `local_part`.
             *
             *     `inbox_limit_reached`: All inbox slots are in use; `error.details.allowance` has the counts. Use an existing inbox, or [request more slots](https://cherami.to/docs/guides/support) rather than deleting an inbox still in use.
             *
             *     `idempotency_conflict`: The key was first used with different input. To recover that request, repeat it with its original inbox and payload; a different request needs its own key.
             *
             *     `idempotency_result_unavailable`: The key already created an inbox, draft or send whose result has since been deleted. Nothing new was created or sent; do not repeat the request under a new key. If a sent message is still in Trash, restore it to read the outcome.
             */
            409: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InboxError"];
                };
            };
            /** @description `body_too_large`: Reduce the JSON request to the operation's body limit. */
            413: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: The operation failed. Retry a read; after a write the change may have happened, so recover as [retry by operation](https://cherami.to/docs/api/errors#retry-by-operation) describes. */
            500: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                /** @description Cherami resource ID returned by the API. */
                inbox_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success. */
            200: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: The operation failed. Retry a read; after a write the change may have happened, so recover as [retry by operation](https://cherami.to/docs/api/errors#retry-by-operation) describes. */
            500: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                /** @description Cherami resource ID returned by the API. */
                inbox_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Accepted. */
            202: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `operation_not_allowed`: Sending, or deletion and restore, is turned off for this account; the message says which. Contact hello@cherami.to. */
            403: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: The operation failed. Retry a read; after a write the change may have happened, so recover as [retry by operation](https://cherami.to/docs/api/errors#retry-by-operation) describes. */
            500: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                /** @description Cherami resource ID returned by the API. */
                inbox_id: string;
            };
            cookie?: never;
        };
        /** @description JSON object, at most 4 KiB in total. */
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
            /** @description Success. */
            200: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
             *     `invalid_inbox`: Creation takes only `local_part`, `name`, `sender_name` and `idempotency_key`; an edit takes at least one of `name` and `sender_name`, and nothing else.
             *
             *     `invalid_name`: Use plain text without control characters, at most 256 UTF-8 bytes after trimming. The message names the field.
             */
            400: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `body_too_large`: Reduce the JSON request to the operation's body limit. */
            413: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: The operation failed. Retry a read; after a write the change may have happened, so recover as [retry by operation](https://cherami.to/docs/api/errors#retry-by-operation) describes. */
            500: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                /** @description Cherami resource ID returned by the API. */
                inbox_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success. */
            200: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: The operation failed. Retry a read; after a write the change may have happened, so recover as [retry by operation](https://cherami.to/docs/api/errors#retry-by-operation) describes. */
            500: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                /** @description Cherami resource ID returned by the API. */
                inbox_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success. */
            200: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: The operation failed. Retry a read; after a write the change may have happened, so recover as [retry by operation](https://cherami.to/docs/api/errors#retry-by-operation) describes. */
            500: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                /** @description Results per page. */
                limit?: number;
                /** @description next_cursor from the previous page. Keep the URL, filters and order unchanged. */
                cursor?: string;
                /** @description Words or "quoted phrases" to find in the subject and body; every term must match. At most 16 terms and 512 UTF-16 code units. OR, NOT and wildcards have no special meaning, and attachments aren't searched. See [Find mail](https://cherami.to/docs/guides/search). */
                query?: string;
                /** @description Bare sender address from the message headers, matched exactly without regard to case; not the SMTP envelope. At most 320 UTF-16 code units. */
                from?: string;
                /** @description Bare recipient address from the message headers, matched exactly without regard to case; not the SMTP envelope. At most 320 UTF-16 code units. */
                recipient?: string;
                /** @description Text the subject contains, matched literally without regard to case. At most 998 UTF-16 code units. */
                subject?: string;
                /** @description Earliest (inclusive) receipt or send time, as an ISO 8601 instant with a timezone, such as 2026-10-01T00:00:00Z. after must be earlier than before. URL-encode it, including any + in an offset. */
                after?: string;
                /** @description Latest (exclusive) receipt or send time, as an ISO 8601 instant with a timezone, such as 2026-10-01T00:00:00Z. after must be earlier than before. URL-encode it, including any + in an offset. */
                before?: string;
                /** @description Messages carrying every listed label. Repeat the parameter for each label rather than separating with commas. The three label groups combine with AND. */
                labels_all?: components["schemas"]["Label"][];
                /** @description Messages carrying at least one listed label. Repeat the parameter for each label rather than separating with commas. The three label groups combine with AND. */
                labels_any?: components["schemas"]["Label"][];
                /** @description Messages carrying none of the listed labels, unlabeled ones included. Repeat the parameter for each label rather than separating with commas. The three label groups combine with AND. */
                labels_none?: components["schemas"]["Label"][];
                /** @description relevance requires query. */
                order?: "newest" | "oldest" | "relevance";
            };
            header?: never;
            path: {
                /** @description Cherami resource ID returned by the API. */
                inbox_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success. */
            200: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
             *     `invalid_cursor`: Send a cursor only to the listing, filters and order that returned it, or restart from the first page.
             *
             *     `invalid_search`: Correct the search terms, filters, timestamps or ordering the message names. See [search](https://cherami.to/docs/guides/search).
             *
             *     `invalid_labels`: Correct the label name, label change, filter group or discovery prefix the message names.
             */
            400: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: The operation failed. Retry a read; after a write the change may have happened, so recover as [retry by operation](https://cherami.to/docs/api/errors#retry-by-operation) describes. */
            500: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                /** @description Words or "quoted phrases" to find in the subject and body; every term must match. At most 16 terms and 512 UTF-16 code units. OR, NOT and wildcards have no special meaning, and attachments aren't searched. See [Find mail](https://cherami.to/docs/guides/search). */
                query?: string;
                /** @description Bare sender address from the message headers, matched exactly without regard to case; not the SMTP envelope. At most 320 UTF-16 code units. */
                from?: string;
                /** @description Bare recipient address from the message headers, matched exactly without regard to case; not the SMTP envelope. At most 320 UTF-16 code units. */
                recipient?: string;
                /** @description Text the subject contains, matched literally without regard to case. At most 998 UTF-16 code units. */
                subject?: string;
                /** @description Earliest (inclusive) receipt or send time, as an ISO 8601 instant with a timezone, such as 2026-10-01T00:00:00Z. after must be earlier than before. URL-encode it, including any + in an offset. */
                after?: string;
                /** @description Latest (exclusive) receipt or send time, as an ISO 8601 instant with a timezone, such as 2026-10-01T00:00:00Z. after must be earlier than before. URL-encode it, including any + in an offset. */
                before?: string;
                /** @description Messages carrying every listed label. Repeat the parameter for each label rather than separating with commas. The three label groups combine with AND. */
                labels_all?: components["schemas"]["Label"][];
                /** @description Messages carrying at least one listed label. Repeat the parameter for each label rather than separating with commas. The three label groups combine with AND. */
                labels_any?: components["schemas"]["Label"][];
                /** @description Messages carrying none of the listed labels, unlabeled ones included. Repeat the parameter for each label rather than separating with commas. The three label groups combine with AND. */
                labels_none?: components["schemas"]["Label"][];
            };
            header?: never;
            path: {
                /** @description Cherami resource ID returned by the API. */
                inbox_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success. */
            200: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
             * @description `invalid_search`: Correct the search terms, filters, timestamps or ordering the message names. See [search](https://cherami.to/docs/guides/search).
             *
             *     `invalid_labels`: Correct the label name, label change, filter group or discovery prefix the message names.
             */
            400: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: The operation failed. Retry a read; after a write the change may have happened, so recover as [retry by operation](https://cherami.to/docs/api/errors#retry-by-operation) describes. */
            500: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                /** @description Cherami resource ID returned by the API. */
                message_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success. */
            200: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: The operation failed. Retry a read; after a write the change may have happened, so recover as [retry by operation](https://cherami.to/docs/api/errors#retry-by-operation) describes. */
            500: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `content_unavailable`: Stored content could not be read. Retry later. */
            503: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                /** @description Cherami resource ID returned by the API. */
                message_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Accepted. */
            202: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `operation_not_allowed`: Sending, or deletion and restore, is turned off for this account; the message says which. Contact hello@cherami.to. */
            403: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: The operation failed. Retry a read; after a write the change may have happened, so recover as [retry by operation](https://cherami.to/docs/api/errors#retry-by-operation) describes. */
            500: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                /** @description Cherami resource ID returned by the API. */
                message_id: string;
            };
            cookie?: never;
        };
        /** @description JSON object, at most 20 KiB in total. */
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
            /** @description Success. */
            200: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
             *     `invalid_labels`: Correct the label name, label change, filter group or discovery prefix the message names.
             */
            400: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `body_too_large`: Reduce the JSON request to the operation's body limit. */
            413: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: The operation failed. Retry a read; after a write the change may have happened, so recover as [retry by operation](https://cherami.to/docs/api/errors#retry-by-operation) describes. */
            500: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                /** @description Cherami resource ID returned by the API. */
                message_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The original bytes, as a download. */
            200: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: The operation failed. Retry a read; after a write the change may have happened, so recover as [retry by operation](https://cherami.to/docs/api/errors#retry-by-operation) describes. */
            500: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `content_unavailable`: Stored content could not be read. Retry later. */
            503: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                /** @description Cherami resource ID returned by the API. */
                message_id: string;
                /** @description id from the message's content.attachments, not a filename. */
                attachment_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The original bytes, as a download. */
            200: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: The operation failed. Retry a read; after a write the change may have happened, so recover as [retry by operation](https://cherami.to/docs/api/errors#retry-by-operation) describes. */
            500: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `content_unavailable`: Stored content could not be read. Retry later. */
            503: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                /** @description Cherami resource ID returned by the API. */
                message_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success. */
            200: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `content_unavailable`: Stored content could not be read. Retry later.
             *
             *     `outbound_unavailable`: The request failed. If it was a send, reply or forward, its outcome is unknown: repeat it with the same idempotency key and unchanged payload within 24 hours of the first request; without a key, check sent messages before sending again. Retry a read.
             */
            503: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                /** @description Cherami resource ID returned by the API. */
                message_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Accepted. */
            202: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `operation_not_allowed`: Sending, or deletion and restore, is turned off for this account; the message says which. Contact hello@cherami.to. */
            403: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: The operation failed. Retry a read; after a write the change may have happened, so recover as [retry by operation](https://cherami.to/docs/api/errors#retry-by-operation) describes. */
            500: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                /** @description Cherami resource ID returned by the API. */
                message_id: string;
            };
            cookie?: never;
        };
        /** @description JSON object, at most 20 KiB in total. */
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
            /** @description Success. */
            200: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
             *     `invalid_labels`: Correct the label name, label change, filter group or discovery prefix the message names.
             */
            400: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `body_too_large`: Reduce the JSON request to the operation's body limit. */
            413: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: The operation failed. Retry a read; after a write the change may have happened, so recover as [retry by operation](https://cherami.to/docs/api/errors#retry-by-operation) describes. */
            500: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
        /** @description JSON object, at most 32 KiB in total. */
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
            /** @description Success. */
            200: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
             *     `invalid_labels`: Correct the label name, label change, filter group or discovery prefix the message names.
             *
             *     `invalid_message_ids`: Supply 1–100 valid message IDs for a bulk label update.
             */
            400: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `body_too_large`: Reduce the JSON request to the operation's body limit. */
            413: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: The operation failed. Retry a read; after a write the change may have happened, so recover as [retry by operation](https://cherami.to/docs/api/errors#retry-by-operation) describes. */
            500: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
        /** @description JSON object, at most 32 KiB in total. */
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
            /** @description Success. */
            200: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
             *     `invalid_labels`: Correct the label name, label change, filter group or discovery prefix the message names.
             *
             *     `invalid_message_ids`: Supply 1–100 valid message IDs for a bulk label update.
             */
            400: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `body_too_large`: Reduce the JSON request to the operation's body limit. */
            413: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: The operation failed. Retry a read; after a write the change may have happened, so recover as [retry by operation](https://cherami.to/docs/api/errors#retry-by-operation) describes. */
            500: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                /** @description Results per page. */
                limit?: number;
                /** @description next_cursor from the previous page. Keep the URL, filters and order unchanged. */
                cursor?: string;
                /** @description Only names starting with this text, case-sensitive; empty means all. At most 128 UTF-8 bytes, supplied once. */
                prefix?: string;
            };
            header?: never;
            path: {
                /** @description Cherami resource ID returned by the API. */
                inbox_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success. */
            200: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
             *     `invalid_cursor`: Send a cursor only to the listing, filters and order that returned it, or restart from the first page.
             *
             *     `invalid_labels`: Correct the label name, label change, filter group or discovery prefix the message names.
             */
            400: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: The operation failed. Retry a read; after a write the change may have happened, so recover as [retry by operation](https://cherami.to/docs/api/errors#retry-by-operation) describes. */
            500: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                /** @description Results per page. */
                limit?: number;
                /** @description next_cursor from the previous page. Keep the URL, filters and order unchanged. */
                cursor?: string;
                /** @description Words or "quoted phrases" to find in the subject and body; every term must match. At most 16 terms and 512 UTF-16 code units. OR, NOT and wildcards have no special meaning, and attachments aren't searched. See [Find mail](https://cherami.to/docs/guides/search). */
                query?: string;
                /** @description Bare sender address from the message headers, matched exactly without regard to case; not the SMTP envelope. At most 320 UTF-16 code units. */
                from?: string;
                /** @description Bare recipient address from the message headers, matched exactly without regard to case; not the SMTP envelope. At most 320 UTF-16 code units. */
                recipient?: string;
                /** @description Text the subject contains, matched literally without regard to case. At most 998 UTF-16 code units. */
                subject?: string;
                /** @description Earliest (inclusive) receipt or send time, as an ISO 8601 instant with a timezone, such as 2026-10-01T00:00:00Z. after must be earlier than before. URL-encode it, including any + in an offset. */
                after?: string;
                /** @description Latest (exclusive) receipt or send time, as an ISO 8601 instant with a timezone, such as 2026-10-01T00:00:00Z. after must be earlier than before. URL-encode it, including any + in an offset. */
                before?: string;
                /** @description Messages carrying every listed label. Repeat the parameter for each label rather than separating with commas. The three label groups combine with AND. */
                labels_all?: components["schemas"]["Label"][];
                /** @description Messages carrying at least one listed label. Repeat the parameter for each label rather than separating with commas. The three label groups combine with AND. */
                labels_any?: components["schemas"]["Label"][];
                /** @description Messages carrying none of the listed labels, unlabeled ones included. Repeat the parameter for each label rather than separating with commas. The three label groups combine with AND. */
                labels_none?: components["schemas"]["Label"][];
                /** @description relevance requires query. */
                order?: "newest" | "oldest" | "relevance";
            };
            header?: never;
            path: {
                /** @description Cherami resource ID returned by the API. */
                inbox_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success. */
            200: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
             *     `invalid_cursor`: Send a cursor only to the listing, filters and order that returned it, or restart from the first page.
             *
             *     `invalid_search`: Correct the search terms, filters, timestamps or ordering the message names. See [search](https://cherami.to/docs/guides/search).
             *
             *     `invalid_labels`: Correct the label name, label change, filter group or discovery prefix the message names.
             */
            400: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `outbound_unavailable`: The request failed. If it was a send, reply or forward, its outcome is unknown: repeat it with the same idempotency key and unchanged payload within 24 hours of the first request; without a key, check sent messages before sending again. Retry a read. */
            503: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                /** @description Cherami resource ID returned by the API. */
                inbox_id: string;
            };
            cookie?: never;
        };
        /** @description JSON object, at most 8 MiB in total. */
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
            /** @description A retry matched an earlier request: this is that request's result as it is now. Nothing new was created or sent. */
            200: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                         * @description When the key stops protecting retries.
                         */
                        idempotency_expires_at: string;
                    };
                };
            };
            /** @description Attempt recorded; check message.status. */
            201: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
             *     `invalid_message`: Correct the recipients, subject, body, `in_reply_to`, attachments or reply and forward fields as the message describes.
             *
             *     `invalid_name`: Use plain text without control characters, at most 256 UTF-8 bytes after trimming. The message names the field.
             *
             *     `invalid_labels`: Correct the label name, label change, filter group or discovery prefix the message names.
             *
             *     `invalid_idempotency_key`: Use 1–128 ASCII letters, digits, hyphens or underscores.
             */
            400: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `operation_not_allowed`: Sending, or deletion and restore, is turned off for this account; the message says which. Contact hello@cherami.to.
             *
             *     `recipient_not_allowed`: Nothing was sent: the inbox's [sending rules](https://cherami.to/account/sending-rules) block one or more recipients, which the message lists. Use allowed recipients, or ask the account owner to allow them; do not send through another inbox to get around the rules.
             */
            403: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `reply_not_ready`: The source cannot be replied to or forwarded yet. A received message must have `processing_status` `ready`; a sent message must have `status` `accepted`.
             *
             *     `reply_headers_unavailable`: The target has no usable Message-ID to reply to. Send a new message without `in_reply_to`.
             *
             *     `idempotency_conflict`: The key was first used with different input. To recover that request, repeat it with its original inbox and payload; a different request needs its own key.
             *
             *     `idempotency_result_unavailable`: The key already created an inbox, draft or send whose result has since been deleted. Nothing new was created or sent; do not repeat the request under a new key. If a sent message is still in Trash, restore it to read the outcome.
             */
            409: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `body_too_large`: Reduce the JSON request to the operation's body limit.
             *
             *     `message_too_large`: The message exceeds 5 MiB counting text, HTML and base64 attachment content, or a forwarded original has more than 32 attachments. Reduce the content or attachments; for a forward, set `include_attachments` to false or attach selected files to a new message.
             */
            413: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `outbound_limit_reached`: The rolling 24-hour sending allowance cannot cover this message, at one charge per recipient. With `reason` `temporary_exhaustion`, retry at `sufficient_capacity_at`; with `message_exceeds_allowance`, the message needs more than the whole allowance: reduce its recipients or [request a higher allowance](https://cherami.to/docs/guides/support). See [sending allowance](https://cherami.to/docs/api/sending/get-outbound-quota). */
            429: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    /** @description Seconds to wait before retrying. For sending allowance it matches sufficient_capacity_at. */
                    "Retry-After"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["QuotaError"];
                };
            };
            /**
             * @description `content_unavailable`: Stored content could not be read. Retry later.
             *
             *     `outbound_unavailable`: The request failed. If it was a send, reply or forward, its outcome is unknown: repeat it with the same idempotency key and unchanged payload within 24 hours of the first request; without a key, check sent messages before sending again. Retry a read.
             */
            503: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                /** @description Cherami resource ID returned by the API. */
                inbox_id: string;
            };
            cookie?: never;
        };
        /** @description JSON object, at most 8 MiB in total. */
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
            /** @description A retry matched an earlier request: this is that request's result as it is now. Nothing new was created or sent. */
            200: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                         * @description When the key stops protecting retries.
                         */
                        idempotency_expires_at: string;
                    };
                };
            };
            /** @description Attempt recorded; check message.status. */
            201: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
             *     `invalid_message`: Correct the recipients, subject, body, `in_reply_to`, attachments or reply and forward fields as the message describes.
             *
             *     `invalid_name`: Use plain text without control characters, at most 256 UTF-8 bytes after trimming. The message names the field.
             *
             *     `invalid_labels`: Correct the label name, label change, filter group or discovery prefix the message names.
             *
             *     `invalid_idempotency_key`: Use 1–128 ASCII letters, digits, hyphens or underscores.
             */
            400: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `operation_not_allowed`: Sending, or deletion and restore, is turned off for this account; the message says which. Contact hello@cherami.to.
             *
             *     `recipient_not_allowed`: Nothing was sent: the inbox's [sending rules](https://cherami.to/account/sending-rules) block one or more recipients, which the message lists. Use allowed recipients, or ask the account owner to allow them; do not send through another inbox to get around the rules.
             */
            403: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `reply_not_ready`: The source cannot be replied to or forwarded yet. A received message must have `processing_status` `ready`; a sent message must have `status` `accepted`.
             *
             *     `reply_headers_unavailable`: The target has no usable Message-ID to reply to. Send a new message without `in_reply_to`.
             *
             *     `idempotency_conflict`: The key was first used with different input. To recover that request, repeat it with its original inbox and payload; a different request needs its own key.
             *
             *     `idempotency_result_unavailable`: The key already created an inbox, draft or send whose result has since been deleted. Nothing new was created or sent; do not repeat the request under a new key. If a sent message is still in Trash, restore it to read the outcome.
             *
             *     `reply_recipients_unavailable`: No recipients remain once the sending inbox is excluded. Send a new message to recipients the task authorizes.
             */
            409: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `body_too_large`: Reduce the JSON request to the operation's body limit.
             *
             *     `message_too_large`: The message exceeds 5 MiB counting text, HTML and base64 attachment content, or a forwarded original has more than 32 attachments. Reduce the content or attachments; for a forward, set `include_attachments` to false or attach selected files to a new message.
             */
            413: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `outbound_limit_reached`: The rolling 24-hour sending allowance cannot cover this message, at one charge per recipient. With `reason` `temporary_exhaustion`, retry at `sufficient_capacity_at`; with `message_exceeds_allowance`, the message needs more than the whole allowance: reduce its recipients or [request a higher allowance](https://cherami.to/docs/guides/support). See [sending allowance](https://cherami.to/docs/api/sending/get-outbound-quota). */
            429: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    /** @description Seconds to wait before retrying. For sending allowance it matches sufficient_capacity_at. */
                    "Retry-After"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["QuotaError"];
                };
            };
            /**
             * @description `content_unavailable`: Stored content could not be read. Retry later.
             *
             *     `outbound_unavailable`: The request failed. If it was a send, reply or forward, its outcome is unknown: repeat it with the same idempotency key and unchanged payload within 24 hours of the first request; without a key, check sent messages before sending again. Retry a read.
             */
            503: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                /** @description Cherami resource ID returned by the API. */
                inbox_id: string;
            };
            cookie?: never;
        };
        /** @description JSON object, at most 8 MiB in total. */
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
            /** @description A retry matched an earlier request: this is that request's result as it is now. Nothing new was created or sent. */
            200: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                         * @description When the key stops protecting retries.
                         */
                        idempotency_expires_at: string;
                    };
                };
            };
            /** @description Attempt recorded; check message.status. */
            201: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
             *     `invalid_message`: Correct the recipients, subject, body, `in_reply_to`, attachments or reply and forward fields as the message describes.
             *
             *     `invalid_name`: Use plain text without control characters, at most 256 UTF-8 bytes after trimming. The message names the field.
             *
             *     `invalid_labels`: Correct the label name, label change, filter group or discovery prefix the message names.
             *
             *     `invalid_idempotency_key`: Use 1–128 ASCII letters, digits, hyphens or underscores.
             */
            400: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `operation_not_allowed`: Sending, or deletion and restore, is turned off for this account; the message says which. Contact hello@cherami.to.
             *
             *     `recipient_not_allowed`: Nothing was sent: the inbox's [sending rules](https://cherami.to/account/sending-rules) block one or more recipients, which the message lists. Use allowed recipients, or ask the account owner to allow them; do not send through another inbox to get around the rules.
             */
            403: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `reply_not_ready`: The source cannot be replied to or forwarded yet. A received message must have `processing_status` `ready`; a sent message must have `status` `accepted`.
             *
             *     `reply_headers_unavailable`: The target has no usable Message-ID to reply to. Send a new message without `in_reply_to`.
             *
             *     `idempotency_conflict`: The key was first used with different input. To recover that request, repeat it with its original inbox and payload; a different request needs its own key.
             *
             *     `idempotency_result_unavailable`: The key already created an inbox, draft or send whose result has since been deleted. Nothing new was created or sent; do not repeat the request under a new key. If a sent message is still in Trash, restore it to read the outcome.
             *
             *     `reply_recipients_unavailable`: No recipients remain once the sending inbox is excluded. Send a new message to recipients the task authorizes.
             */
            409: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `body_too_large`: Reduce the JSON request to the operation's body limit.
             *
             *     `message_too_large`: The message exceeds 5 MiB counting text, HTML and base64 attachment content, or a forwarded original has more than 32 attachments. Reduce the content or attachments; for a forward, set `include_attachments` to false or attach selected files to a new message.
             */
            413: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `outbound_limit_reached`: The rolling 24-hour sending allowance cannot cover this message, at one charge per recipient. With `reason` `temporary_exhaustion`, retry at `sufficient_capacity_at`; with `message_exceeds_allowance`, the message needs more than the whole allowance: reduce its recipients or [request a higher allowance](https://cherami.to/docs/guides/support). See [sending allowance](https://cherami.to/docs/api/sending/get-outbound-quota). */
            429: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    /** @description Seconds to wait before retrying. For sending allowance it matches sufficient_capacity_at. */
                    "Retry-After"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["QuotaError"];
                };
            };
            /**
             * @description `content_unavailable`: Stored content could not be read. Retry later.
             *
             *     `outbound_unavailable`: The request failed. If it was a send, reply or forward, its outcome is unknown: repeat it with the same idempotency key and unchanged payload within 24 hours of the first request; without a key, check sent messages before sending again. Retry a read.
             */
            503: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                /** @description Cherami resource ID returned by the API. */
                inbox_id: string;
            };
            cookie?: never;
        };
        /** @description JSON object, at most 8 MiB in total. */
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
            /** @description A retry matched an earlier request: this is that request's result as it is now. Nothing new was created or sent. */
            200: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                         * @description When the key stops protecting retries.
                         */
                        idempotency_expires_at: string;
                    };
                };
            };
            /** @description Attempt recorded; check message.status. */
            201: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
             *     `invalid_message`: Correct the recipients, subject, body, `in_reply_to`, attachments or reply and forward fields as the message describes.
             *
             *     `invalid_name`: Use plain text without control characters, at most 256 UTF-8 bytes after trimming. The message names the field.
             *
             *     `invalid_labels`: Correct the label name, label change, filter group or discovery prefix the message names.
             *
             *     `invalid_idempotency_key`: Use 1–128 ASCII letters, digits, hyphens or underscores.
             */
            400: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `operation_not_allowed`: Sending, or deletion and restore, is turned off for this account; the message says which. Contact hello@cherami.to.
             *
             *     `recipient_not_allowed`: Nothing was sent: the inbox's [sending rules](https://cherami.to/account/sending-rules) block one or more recipients, which the message lists. Use allowed recipients, or ask the account owner to allow them; do not send through another inbox to get around the rules.
             */
            403: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `reply_not_ready`: The source cannot be replied to or forwarded yet. A received message must have `processing_status` `ready`; a sent message must have `status` `accepted`.
             *
             *     `idempotency_conflict`: The key was first used with different input. To recover that request, repeat it with its original inbox and payload; a different request needs its own key.
             *
             *     `idempotency_result_unavailable`: The key already created an inbox, draft or send whose result has since been deleted. Nothing new was created or sent; do not repeat the request under a new key. If a sent message is still in Trash, restore it to read the outcome.
             */
            409: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `body_too_large`: Reduce the JSON request to the operation's body limit.
             *
             *     `message_too_large`: The message exceeds 5 MiB counting text, HTML and base64 attachment content, or a forwarded original has more than 32 attachments. Reduce the content or attachments; for a forward, set `include_attachments` to false or attach selected files to a new message.
             */
            413: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `outbound_limit_reached`: The rolling 24-hour sending allowance cannot cover this message, at one charge per recipient. With `reason` `temporary_exhaustion`, retry at `sufficient_capacity_at`; with `message_exceeds_allowance`, the message needs more than the whole allowance: reduce its recipients or [request a higher allowance](https://cherami.to/docs/guides/support). See [sending allowance](https://cherami.to/docs/api/sending/get-outbound-quota). */
            429: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    /** @description Seconds to wait before retrying. For sending allowance it matches sufficient_capacity_at. */
                    "Retry-After"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["QuotaError"];
                };
            };
            /**
             * @description `content_unavailable`: Stored content could not be read. Retry later.
             *
             *     `outbound_unavailable`: The request failed. If it was a send, reply or forward, its outcome is unknown: repeat it with the same idempotency key and unchanged payload within 24 hours of the first request; without a key, check sent messages before sending again. Retry a read.
             */
            503: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
            /** @description Success. */
            200: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                     *       "increase_request": "Send feedback describing the workflow and the inbox or sending capacity it needs, or email hello@cherami.to. Feedback works with no free inbox slot or sending allowance, and replies go to the account owner's email.",
                     *       "policy_url": "https://cherami.to/pricing"
                     *     }
                     */
                    "application/json": components["schemas"]["Quota"];
                };
            };
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `outbound_unavailable`: The request failed. If it was a send, reply or forward, its outcome is unknown: repeat it with the same idempotency key and unchanged payload within 24 hours of the first request; without a key, check sent messages before sending again. Retry a read. */
            503: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                /** @description Results per page. */
                limit?: number;
                /** @description next_cursor from the previous page. Keep the URL, filters and order unchanged. */
                cursor?: string;
                /** @description draft: unsent drafts. submitted: drafts with a send attempt. all: both, for checking whether an uncertain creation happened. Only limit, cursor and state are accepted, each at most once. */
                state?: "draft" | "submitted" | "all";
            };
            header?: never;
            path: {
                /** @description Cherami resource ID returned by the API. */
                inbox_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success. */
            200: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
             *     `invalid_draft`: Correct the draft field, `source` or listing parameter the message names. On a draft listing this code also covers a malformed cursor or one from another inbox or `state`: restart from the first page.
             */
            400: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `draft_unavailable`: The draft request failed. Repeat a draft send with the same draft ID: it never sends twice. Repeat a creation with its original idempotency key and payload; without a key, list drafts first. Read the draft before repeating an edit. Retry a read or a deletion. */
            503: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                /** @description Cherami resource ID returned by the API. */
                inbox_id: string;
            };
            cookie?: never;
        };
        /** @description JSON object, at most 8 MiB in total. */
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
            /** @description A retry matched an earlier request: this is that request's result as it is now. Nothing new was created or sent. */
            200: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                         * @description When the key stops protecting retries.
                         */
                        idempotency_expires_at: string;
                    };
                };
            };
            /** @description Created. */
            201: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
             *     `invalid_draft`: Correct the draft field, `source` or listing parameter the message names. On a draft listing this code also covers a malformed cursor or one from another inbox or `state`: restart from the first page.
             *
             *     `invalid_message`: Correct the recipients, subject, body, `in_reply_to`, attachments or reply and forward fields as the message describes.
             *
             *     `invalid_name`: Use plain text without control characters, at most 256 UTF-8 bytes after trimming. The message names the field.
             *
             *     `invalid_labels`: Correct the label name, label change, filter group or discovery prefix the message names.
             *
             *     `invalid_idempotency_key`: Use 1–128 ASCII letters, digits, hyphens or underscores.
             */
            400: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `idempotency_conflict`: The key was first used with different input. To recover that request, repeat it with its original inbox and payload; a different request needs its own key.
             *
             *     `idempotency_result_unavailable`: The key already created an inbox, draft or send whose result has since been deleted. Nothing new was created or sent; do not repeat the request under a new key. If a sent message is still in Trash, restore it to read the outcome.
             *
             *     `reply_not_ready`: The source cannot be replied to or forwarded yet. A received message must have `processing_status` `ready`; a sent message must have `status` `accepted`.
             *
             *     `reply_recipients_unavailable`: No recipients remain once the sending inbox is excluded. Send a new message to recipients the task authorizes.
             */
            409: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `body_too_large`: Reduce the JSON request to the operation's body limit.
             *
             *     `message_too_large`: The message exceeds 5 MiB counting text, HTML and base64 attachment content, or a forwarded original has more than 32 attachments. Reduce the content or attachments; for a forward, set `include_attachments` to false or attach selected files to a new message.
             */
            413: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `content_unavailable`: Stored content could not be read. Retry later.
             *
             *     `draft_unavailable`: The draft request failed. Repeat a draft send with the same draft ID: it never sends twice. Repeat a creation with its original idempotency key and payload; without a key, list drafts first. Read the draft before repeating an edit. Retry a read or a deletion.
             */
            503: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                /** @description Cherami resource ID returned by the API. */
                draft_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success. */
            200: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `content_unavailable`: Stored content could not be read. Retry later.
             *
             *     `draft_unavailable`: The draft request failed. Repeat a draft send with the same draft ID: it never sends twice. Repeat a creation with its original idempotency key and payload; without a key, list drafts first. Read the draft before repeating an edit. Retry a read or a deletion.
             */
            503: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                /** @description Cherami resource ID returned by the API. */
                draft_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Accepted. */
            202: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `operation_not_allowed`: Sending, or deletion and restore, is turned off for this account; the message says which. Contact hello@cherami.to. */
            403: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `draft_unavailable`: The draft request failed. Repeat a draft send with the same draft ID: it never sends twice. Repeat a creation with its original idempotency key and payload; without a key, list drafts first. Read the draft before repeating an edit. Retry a read or a deletion. */
            503: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                /** @description Cherami resource ID returned by the API. */
                draft_id: string;
            };
            cookie?: never;
        };
        /** @description JSON object, at most 8 MiB in total. */
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
            /** @description Success. */
            200: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
             *     `invalid_draft`: Correct the draft field, `source` or listing parameter the message names. On a draft listing this code also covers a malformed cursor or one from another inbox or `state`: restart from the first page.
             *
             *     `invalid_message`: Correct the recipients, subject, body, `in_reply_to`, attachments or reply and forward fields as the message describes.
             *
             *     `invalid_name`: Use plain text without control characters, at most 256 UTF-8 bytes after trimming. The message names the field.
             *
             *     `invalid_labels`: Correct the label name, label change, filter group or discovery prefix the message names.
             */
            400: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `draft_busy`: Another change to this draft landed first. Read the draft, then repeat the edit or send if it still applies.
             *
             *     `draft_submitted`: The draft's content froze on its first send attempt, so it cannot be edited. Read the sent message named by the draft's `sent_message_id` for the outcome; to send different content, create a new draft.
             */
            409: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `body_too_large`: Reduce the JSON request to the operation's body limit.
             *
             *     `message_too_large`: The message exceeds 5 MiB counting text, HTML and base64 attachment content, or a forwarded original has more than 32 attachments. Reduce the content or attachments; for a forward, set `include_attachments` to false or attach selected files to a new message.
             */
            413: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `content_unavailable`: Stored content could not be read. Retry later.
             *
             *     `draft_unavailable`: The draft request failed. Repeat a draft send with the same draft ID: it never sends twice. Repeat a creation with its original idempotency key and payload; without a key, list drafts first. Read the draft before repeating an edit. Retry a read or a deletion.
             */
            503: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                /** @description Cherami resource ID returned by the API. */
                draft_id: string;
            };
            cookie?: never;
        };
        /** @description JSON object, at most 4 KiB in total. */
        requestBody: {
            content: {
                /** @example {} */
                "application/json": components["schemas"]["SendDraft"];
            };
        };
        responses: {
            /** @description A retry matched an earlier request: this is that request's result as it is now. Nothing new was created or sent. */
            200: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
            /** @description Attempt recorded; check message.status. */
            201: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
             *     `invalid_message`: Correct the recipients, subject, body, `in_reply_to`, attachments or reply and forward fields as the message describes.
             *
             *     `invalid_name`: Use plain text without control characters, at most 256 UTF-8 bytes after trimming. The message names the field.
             *
             *     `invalid_labels`: Correct the label name, label change, filter group or discovery prefix the message names.
             *
             *     `invalid_idempotency_key`: Use 1–128 ASCII letters, digits, hyphens or underscores.
             *
             *     `invalid_draft`: Correct the draft field, `source` or listing parameter the message names. On a draft listing this code also covers a malformed cursor or one from another inbox or `state`: restart from the first page.
             */
            400: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `operation_not_allowed`: Sending, or deletion and restore, is turned off for this account; the message says which. Contact hello@cherami.to.
             *
             *     `recipient_not_allowed`: Nothing was sent: the inbox's [sending rules](https://cherami.to/account/sending-rules) block one or more recipients, which the message lists. Use allowed recipients, or ask the account owner to allow them; do not send through another inbox to get around the rules.
             */
            403: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `reply_not_ready`: The source cannot be replied to or forwarded yet. A received message must have `processing_status` `ready`; a sent message must have `status` `accepted`.
             *
             *     `reply_headers_unavailable`: The target has no usable Message-ID to reply to. Send a new message without `in_reply_to`.
             *
             *     `idempotency_conflict`: The key was first used with different input. To recover that request, repeat it with its original inbox and payload; a different request needs its own key.
             *
             *     `idempotency_result_unavailable`: The key already created an inbox, draft or send whose result has since been deleted. Nothing new was created or sent; do not repeat the request under a new key. If a sent message is still in Trash, restore it to read the outcome.
             *
             *     `draft_busy`: Another change to this draft landed first. Read the draft, then repeat the edit or send if it still applies.
             *
             *     `draft_result_unavailable`: The draft was already submitted and its sent message has since been deleted; nothing was sent again. If that message is still in Trash, restore it with the draft's `sent_message_id` to read the outcome.
             */
            409: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /**
             * @description `body_too_large`: Reduce the JSON request to the operation's body limit.
             *
             *     `message_too_large`: The message exceeds 5 MiB counting text, HTML and base64 attachment content, or a forwarded original has more than 32 attachments. Reduce the content or attachments; for a forward, set `include_attachments` to false or attach selected files to a new message.
             */
            413: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `outbound_limit_reached`: The rolling 24-hour sending allowance cannot cover this message, at one charge per recipient. With `reason` `temporary_exhaustion`, retry at `sufficient_capacity_at`; with `message_exceeds_allowance`, the message needs more than the whole allowance: reduce its recipients or [request a higher allowance](https://cherami.to/docs/guides/support). See [sending allowance](https://cherami.to/docs/api/sending/get-outbound-quota). */
            429: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    /** @description Seconds to wait before retrying. For sending allowance it matches sufficient_capacity_at. */
                    "Retry-After"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["QuotaError"];
                };
            };
            /**
             * @description `content_unavailable`: Stored content could not be read. Retry later.
             *
             *     `draft_unavailable`: The draft request failed. Repeat a draft send with the same draft ID: it never sends twice. Repeat a creation with its original idempotency key and payload; without a key, list drafts first. Read the draft before repeating an edit. Retry a read or a deletion.
             */
            503: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                /** @description Results per page. */
                limit?: number;
                /** @description next_cursor from the previous page. Keep the URL, filters and order unchanged. */
                cursor?: string;
                /** @description Words or "quoted phrases" to find in the subject and body; every term must match. At most 16 terms and 512 UTF-16 code units. OR, NOT and wildcards have no special meaning, and attachments aren't searched. See [Find mail](https://cherami.to/docs/guides/search). */
                query?: string;
                /** @description Bare sender address from the message headers, matched exactly without regard to case; not the SMTP envelope. At most 320 UTF-16 code units. */
                from?: string;
                /** @description Bare recipient address from the message headers, matched exactly without regard to case; not the SMTP envelope. At most 320 UTF-16 code units. */
                recipient?: string;
                /** @description Text the subject contains, matched literally without regard to case. At most 998 UTF-16 code units. */
                subject?: string;
                /** @description Earliest (inclusive) receipt or send time, as an ISO 8601 instant with a timezone, such as 2026-10-01T00:00:00Z. after must be earlier than before. URL-encode it, including any + in an offset. */
                after?: string;
                /** @description Latest (exclusive) receipt or send time, as an ISO 8601 instant with a timezone, such as 2026-10-01T00:00:00Z. after must be earlier than before. URL-encode it, including any + in an offset. */
                before?: string;
                /** @description Messages carrying every listed label. Repeat the parameter for each label rather than separating with commas. The three label groups combine with AND. */
                labels_all?: components["schemas"]["Label"][];
                /** @description Messages carrying at least one listed label. Repeat the parameter for each label rather than separating with commas. The three label groups combine with AND. */
                labels_any?: components["schemas"]["Label"][];
                /** @description Messages carrying none of the listed labels, unlabeled ones included. Repeat the parameter for each label rather than separating with commas. The three label groups combine with AND. */
                labels_none?: components["schemas"]["Label"][];
                /** @description relevance requires query. */
                order?: "newest" | "oldest" | "relevance";
            };
            header?: never;
            path: {
                /** @description Cherami resource ID returned by the API. */
                inbox_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success. */
            200: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
             *     `invalid_cursor`: Send a cursor only to the listing, filters and order that returned it, or restart from the first page.
             *
             *     `invalid_search`: Correct the search terms, filters, timestamps or ordering the message names. See [search](https://cherami.to/docs/guides/search).
             *
             *     `invalid_labels`: Correct the label name, label change, filter group or discovery prefix the message names.
             */
            400: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: The operation failed. Retry a read; after a write the change may have happened, so recover as [retry by operation](https://cherami.to/docs/api/errors#retry-by-operation) describes. */
            500: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                /** @description Results per page. */
                limit?: number;
                /** @description next_cursor from the previous page. Keep the URL, filters and order unchanged. */
                cursor?: string;
            };
            header?: never;
            path: {
                /** @description Cherami resource ID returned by the API. */
                thread_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success. */
            200: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
             *     `invalid_cursor`: Send a cursor only to the listing, filters and order that returned it, or restart from the first page.
             */
            400: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: The operation failed. Retry a read; after a write the change may have happened, so recover as [retry by operation](https://cherami.to/docs/api/errors#retry-by-operation) describes. */
            500: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `content_unavailable`: Stored content could not be read. Retry later. */
            503: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                /** @description Cherami resource ID returned by the API. */
                thread_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Accepted. */
            202: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `operation_not_allowed`: Sending, or deletion and restore, is turned off for this account; the message says which. Contact hello@cherami.to. */
            403: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: The operation failed. Retry a read; after a write the change may have happened, so recover as [retry by operation](https://cherami.to/docs/api/errors#retry-by-operation) describes. */
            500: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                /** @description Cherami resource ID returned by the API. */
                thread_id: string;
            };
            cookie?: never;
        };
        /** @description JSON object, at most 20 KiB in total. */
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
            /** @description Success. */
            200: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
             *     `invalid_labels`: Correct the label name, label change, filter group or discovery prefix the message names.
             */
            400: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `body_too_large`: Reduce the JSON request to the operation's body limit. */
            413: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: The operation failed. Retry a read; after a write the change may have happened, so recover as [retry by operation](https://cherami.to/docs/api/errors#retry-by-operation) describes. */
            500: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    listTrash: {
        parameters: {
            query?: {
                /** @description Results per page. */
                limit?: number;
                /** @description next_cursor from the previous page. Keep the URL, filters and order unchanged. */
                cursor?: string;
            };
            header?: never;
            path: {
                /** @description Cherami resource ID returned by the API. */
                inbox_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success. */
            200: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
                        messages: components["schemas"]["TrashEntry"][];
                        next_cursor: string | null;
                    };
                };
            };
            /**
             * @description `invalid_limit`: Use an integer from 1 to 100.
             *
             *     `invalid_cursor`: Send a cursor only to the listing, filters and order that returned it, or restart from the first page.
             */
            400: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: The operation failed. Retry a read; after a write the change may have happened, so recover as [retry by operation](https://cherami.to/docs/api/errors#retry-by-operation) describes. */
            500: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `content_unavailable`: Stored content could not be read. Retry later. */
            503: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    restoreMessage: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Cherami resource ID returned by the API. */
                message_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success. */
            200: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "id": "11111111-1111-4111-8111-111111111111",
                     *       "inbox_id": "11111111-1111-4111-8111-111111111111",
                     *       "thread_id": null,
                     *       "status": "restored",
                     *       "message": "Example"
                     *     }
                     */
                    "application/json": components["schemas"]["Restored"];
                };
            };
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `operation_not_allowed`: Sending, or deletion and restore, is turned off for this account; the message says which. Contact hello@cherami.to. */
            403: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: The operation failed. Retry a read; after a write the change may have happened, so recover as [retry by operation](https://cherami.to/docs/api/errors#retry-by-operation) describes. */
            500: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `content_unavailable`: Stored content could not be read. Retry later. */
            503: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    restoreSentMessage: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Cherami resource ID returned by the API. */
                message_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success. */
            200: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "id": "11111111-1111-4111-8111-111111111111",
                     *       "inbox_id": "11111111-1111-4111-8111-111111111111",
                     *       "thread_id": null,
                     *       "status": "restored",
                     *       "message": "Example"
                     *     }
                     */
                    "application/json": components["schemas"]["Restored"];
                };
            };
            /** @description `unauthorized`: Send a valid API key as `Authorization: Bearer <key>`. If the key stopped working, get a new one through [recovery](https://cherami.to/docs/guides/recovery). */
            401: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    "WWW-Authenticate"?: "Bearer";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `operation_not_allowed`: Sending, or deletion and restore, is turned off for this account; the message says which. Contact hello@cherami.to. */
            403: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `not_found`: The resource does not exist or does not belong to this account. A reply or forward source must also be in the sending inbox. */
            404: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `internal_error`: The operation failed. Retry a read; after a write the change may have happened, so recover as [retry by operation](https://cherami.to/docs/api/errors#retry-by-operation) describes. */
            500: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
                    "X-Request-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description `content_unavailable`: Stored content could not be read. Retry later. */
            503: {
                headers: {
                    /** @description Identifies this request; include it when reporting a problem. */
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
