# Cherami TypeScript SDK

The official TypeScript and JavaScript client for [Cherami](https://cherami.to), email infrastructure for AI agents. Create inboxes for your agents, read the mail that arrives and send from their addresses.

Requires **Node.js 24+**. ESM, with TypeScript declarations and no runtime dependencies.

## Get started

```sh
npm install @cherami/sdk
# or
bun add @cherami/sdk
```

[Create an API key](https://cherami.to/docs/quickstart#create-an-api-key) and supply it privately as `CHERAMI_API_KEY`. Then list your inboxes:

```ts
import { Cherami } from "@cherami/sdk";

const apiKey = process.env.CHERAMI_API_KEY;
if (!apiKey) throw new Error("Set CHERAMI_API_KEY.");

const client = new Cherami({ apiKey });
const { data } = await client.listInboxes();
console.table(data.inboxes.map(({ id, address }) => ({ id, address })));
```

This prints every inbox on your account. Set `CHERAMI_INBOX_ID` to the one you want to work with; the examples below use it and reuse `client`. If the list is empty, [create an inbox](https://cherami.to/docs/api/inboxes/create-inbox) with `createInbox`.

Every method returns `{ data, status, headers, requestId }`. Parameters use the HTTP field names: path and query fields go at the top level, and the JSON body goes in `body`. Timestamps are strings.

## Read mail

List recent messages, then fetch each one. Its content is available once `processing_status` is `ready`:

```ts
const inboxId = process.env.CHERAMI_INBOX_ID;
if (!inboxId) throw new Error("Set CHERAMI_INBOX_ID.");

const { data: page } = await client.listMessages({
  inbox_id: inboxId,
  limit: 20,
});

for (const message of page.messages) {
  const { data: detail } = await client.getMessage({ message_id: message.id });
  if (detail.processing_status === "ready") {
    console.log(detail.content.text);
  }
}
```

To read past the first page, `iterate` takes the same parameters as `listMessages`, here a search that skips anything labeled `handled`, and fetches pages as you consume messages:

```ts
for await (const message of client.iterate("listMessages", {
  inbox_id: inboxId,
  query: 'invoice "repair workshop"',
  labels_none: ["handled"],
}, { maxPages: 5 })) {
  console.log(message.id);
}
```

`pages` yields whole responses instead, with the `next_cursor` you need to resume later.

To act on mail as it arrives, [add a webhook](https://cherami.to/docs/guides/webhooks), or poll as [Receive and poll for mail](https://cherami.to/docs/guides/receiving) describes.

## Send mail

Prepare each email once and save the record before you submit it.

### Prepare and save

```ts
import { prepareSend } from "@cherami/sdk";

const intent = prepareSend("sendMessage", {
  inbox_id: inboxId,
  body: {
    to: [{ address: "recipient@example.com", name: "Alex" }],
    subject: "Review ready",
    text: "The change is ready for review.",
  },
});
const record = JSON.stringify(intent);
// Save `record` here.
```

### Submit or recover

Submit the saved record:

```ts
import { restoreSend } from "@cherami/sdk";

const saved = restoreSend(record); // the record you saved
const { data: receipt } = await client.submit(saved);
console.log(receipt.message.id, receipt.message.status, receipt.outcome_persisted);
```

If `submit` throws `CheramiTransportError`, the response was lost: submit the same saved record again. It carries the original retry key, so we return the first attempt instead of sending a second email.

`receipt.message.status` tells you what happened:

- `accepted`: the email provider accepted the message. This does not confirm delivery.
- `rejected`: the provider refused it, and `receipt.message.error_code` says why. Fix that and prepare a new record to send it again.
- `unknown`: we couldn't confirm whether it went out. Preparing it again could send a duplicate.

All three arrive as data, not exceptions. If `outcome_persisted` is false, keep this receipt: later reads may not show its outcome.

`submit` accepts a record for **23 hours and 59 minutes after preparation**, then throws `SendRecoveryExpiredError`. After that, check `listSentMessages`: if the email isn't there, prepare it again.

`prepareSend` also takes `replyMessage`, `replyAllMessage` and `forwardMessage`. If you call those methods or `sendMessage` directly, supply your own `idempotency_key` and save the request before sending: resending it unchanged within 24 hours returns the first attempt instead of sending again. Drafts send with `sendDraft` and recover by sending the same draft ID again. See [sending and recovery](https://cherami.to/docs/guides/sending) for the full workflow.

The [examples](https://github.com/cherami-mail/cherami-typescript/blob/main/examples/README.md) read an inbox, prepare a reply and submit it, using the same environment variables.

## Handle errors

```ts
import { CheramiApiError } from "@cherami/sdk";

try {
  const { data } = await client.getOutboundQuota();
  console.log(data);
} catch (error) {
  if (error instanceof CheramiApiError) {
    console.error(error.status, error.code, error.requestId);
  } else {
    throw error;
  }
}
```

`CheramiApiError` is an HTTP error response; its `body` holds the error details. `CheramiTransportError` means no usable response arrived; for a send, submit the same saved record again.

Requests time out after 60 seconds by default, including reading the response body. Pass `{ signal, timeoutMs }` as a method's second argument, or its first for methods without parameters; `timeoutMs: 0` disables the timeout. The client never retries a request or follows a redirect.

## API coverage

| Workflow | Methods |
| --- | --- |
| Inboxes and policies | `listInboxes`, `createInbox`, `getInbox`, `updateInbox`, `deleteInbox`, `getSendingPolicy`, `getReceivingPolicy` |
| Received mail | `listMessages`, `countMessages`, `getMessage`, `deleteMessage`, `downloadRawMessage`, `downloadAttachment` |
| Sending and sent mail | `sendMessage`, `replyMessage`, `replyAllMessage`, `forwardMessage`, `getOutboundQuota`, `listSentMessages`, `getSentMessage`, `deleteSentMessage` |
| Labels | `updateMessageLabels`, `updateSentMessageLabels`, `bulkUpdateMessageLabels`, `bulkUpdateSentLabels`, `listLabels` |
| Drafts | `createDraft`, `listDrafts`, `getDraft`, `updateDraft`, `deleteDraft`, `sendDraft` |
| Conversations | `listThreads`, `getThread`, `updateThreadLabels`, `deleteThread` |
| Trash | `listTrash`, `restoreMessage`, `restoreSentMessage` |

`Params<"sendMessage">` and `Result<"getMessage">` give each operation's types. Named models such as `SendInput`, `SendReceipt` and `ReceivedDetail` are exported too.

To attach a file, `await attachment(filename, bytes, contentType)` creates a value for `body.attachments`; `attachmentBytes` decodes an attachment from a sent message or draft. Download methods return a native `Response` in `data`, which you stream or read with `arrayBuffer()`.

See the [TypeScript guide](https://cherami.to/docs/typescript) for more usage and the [HTTP reference](https://cherami.to/docs/api) for every operation's parameters and responses. For help, [contact support](https://cherami.to/support).

## Development

To work on the SDK itself, see [CONTRIBUTING.md](https://github.com/cherami-mail/cherami-typescript/blob/main/CONTRIBUTING.md). You don't need Bun to use the package.

MIT licensed.
