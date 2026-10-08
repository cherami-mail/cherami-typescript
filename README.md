# Cherami TypeScript SDK

The official TypeScript and JavaScript client for [Cherami](https://cherami.to), email infrastructure for AI agents. Create inboxes for ongoing work, read incoming mail, and send messages from your application.

For **Node.js 24+**. ESM, TypeScript declarations included, no runtime dependencies. Keep this client on your backend, not in browser code.

## Get started

```sh
npm install @cherami/sdk
# or
bun add @cherami/sdk
```

[Connect your account and obtain an API key](https://cherami.to/docs/quickstart), then supply it privately as `CHERAMI_API_KEY` in your backend environment. The key grants access to every inbox on the account.

```ts
import { Cherami } from "@cherami/sdk";

const apiKey = process.env.CHERAMI_API_KEY;
if (!apiKey) throw new Error("Set CHERAMI_API_KEY.");

const client = new Cherami({ apiKey });
const { data } = await client.listInboxes();
console.table(data.inboxes.map(({ id, address }) => ({ id, address })));
```

This prints the inboxes available to your application. The examples below reuse `client`. Set `CHERAMI_INBOX_ID` to the ID of the inbox you want to work with.

## Read mail

For repeated checks, see [webhooks and polling](https://cherami.to/docs/troubleshooting#does-cherami-provide-webhooks) and the [receiving guide](https://cherami.to/docs/guides/receiving). They cover bounded runs, pagination, unfinished content and handled-message tracking.

Fetch recent messages and read their text once processing is complete.

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

For larger inboxes, `iterate` fetches pages as needed and yields individual messages:

```ts
for await (const message of client.iterate("listMessages", {
  inbox_id: inboxId,
  query: 'invoice "repair workshop"',
  labels_none: ["handled"],
}, { maxPages: 5 })) {
  console.log(message.id);
}
```

Use `pages` instead when you need page responses and their `next_cursor` for resuming later. Both helpers preserve server ordering and stop fetching when you stop iterating.

## Send mail

The SDK makes no automatic retries. Its send helper lets you save an intended message before submission and reuse that record if the response is lost, so recovery reuses the original retry key instead of sending twice.

The following examples reuse `client` and `inboxId` above. Set `CHERAMI_INTENT_PATH` to where you will save the send record, one file per intended email.

### Prepare and save

Run this once, after confirming the recipient and content. Replace the example recipient before sending.

```ts
import { writeFile } from "node:fs/promises";
import { prepareSend } from "@cherami/sdk";

const intentPath = process.env.CHERAMI_INTENT_PATH;
if (!intentPath) throw new Error("Set CHERAMI_INTENT_PATH.");

const intent = prepareSend("sendMessage", {
  inbox_id: inboxId,
  body: {
    to: [{ address: "recipient@example.com", name: "Alex" }],
    subject: "Review ready",
    text: "The change is ready for review.",
  },
});

await writeFile(intentPath, JSON.stringify(intent));
```

The record includes the message and its retry key.

### Submit or recover

For both the initial submission and recovery, load the saved record rather than preparing again:

```ts
import { readFile } from "node:fs/promises";
import { restoreSend } from "@cherami/sdk";

const intentPath = process.env.CHERAMI_INTENT_PATH;
if (!intentPath) throw new Error("Set CHERAMI_INTENT_PATH.");

const saved = restoreSend(await readFile(intentPath, "utf8"));
const { data: receipt, status, requestId } = await client.submit(saved);
console.log(receipt.message.id, receipt.message.status, receipt.outcome_persisted);
// Keep { data: receipt, status, requestId } as this attempt's receipt.
```

Read `receipt.message.status` to interpret the result:

- `accepted`: the email provider accepted the message. This is not delivery confirmation.
- `rejected`: the provider explicitly rejected the message.
- `unknown`: submission may or may not have succeeded. Recover using the original record.

These outcomes are returned as data, not exceptions. Keep every receipt: if `outcome_persisted` is false, it may contain an outcome that later reads cannot show.

The helper permits recovery for **23 hours and 59 minutes from preparation**. After expiry, inspect sent mail instead.

The same helper supports `replyMessage`, `replyAllMessage`, and `forwardMessage`. If your application already manages retry keys and recovery deadlines, you can use those methods or `sendMessage` directly. Draft sending uses `sendDraft` and recovers through the same draft ID instead. See [sending and recovery](https://cherami.to/docs/guides/sending) for the full workflow.

## Responses and errors

Methods return `{ data, status, headers, requestId }`. Parameters use the HTTP field names: path and query fields go at the top level, and JSON input goes in `body`. Timestamps are strings.

```ts
import { CheramiApiError, CheramiTransportError } from "@cherami/sdk";

try {
  const { data } = await client.getOutboundQuota();
  console.log(data);
} catch (error) {
  if (error instanceof CheramiApiError) {
    console.error(error.status, error.code, error.requestId);
  } else if (error instanceof CheramiTransportError) {
    // No usable response. For a send, recover with the saved record above.
    throw error;
  } else {
    throw error;
  }
}
```

`CheramiApiError` represents an HTTP failure. Its `body` retains the server's error details. `CheramiTransportError` represents a network failure or unusable response; for a write, the request may still have completed.

Pass `{ signal, timeoutMs }` as a method's second argument, or its first argument for parameterless methods. The default timeout is 60 seconds, including response-body consumption; `timeoutMs: 0` disables it.

## API coverage

| Workflow | Methods |
| --- | --- |
| Inboxes and policies | `listInboxes`, `createInbox`, `getInbox`, `updateInbox`, `deleteInbox`, `getSendingPolicy`, `getReceivingPolicy` |
| Received mail | `listMessages`, `countMessages`, `getMessage`, `deleteMessage`, `downloadRawMessage`, `downloadAttachment` |
| Sending and sent mail | `sendMessage`, `replyMessage`, `replyAllMessage`, `forwardMessage`, `getOutboundQuota`, `listSentMessages`, `getSentMessage`, `deleteSentMessage` |
| Labels | `updateMessageLabels`, `updateSentMessageLabels`, `bulkUpdateMessageLabels`, `bulkUpdateSentLabels`, `listLabels` |
| Drafts | `createDraft`, `listDrafts`, `getDraft`, `updateDraft`, `deleteDraft`, `sendDraft` |
| Conversations | `listThreads`, `getThread`, `updateThreadLabels`, `deleteThread` |

`Params<"sendMessage">` and `Result<"getMessage">` expose operation-specific types. Named models such as `SendInput`, `SendReceipt`, and `ReceivedDetail` are also exported.

For attachments, `await attachment(filename, bytes, contentType)` creates an upload value for `body.attachments`; `attachmentBytes` decodes an attachment retrieved from a sent message or draft. Download methods return a native `Response` in `data`, which you can stream or consume with `arrayBuffer()`. Handle errors during body consumption as well as the initial request.

See the [TypeScript guide](https://cherami.to/docs/typescript) for more usage and the [HTTP reference](https://cherami.to/docs/api) for operation parameters and responses. For help, visit [support](https://cherami.to/support).

## Development

Use Bun for SDK development:

```sh
bun install
bun run build
```

The build generates types and methods from the bundled `openapi.json` and emits JavaScript and declarations to `dist`. `bun run check` checks TypeScript without emitting. Consumers do not need Bun.

The [examples guide](https://github.com/cherami-mail/cherami-typescript/blob/main/examples/README.md) explains how to run the inbox-reading, reply-preparation, and submission scripts with these same environment variables. See [CONTRIBUTING.md](https://github.com/cherami-mail/cherami-typescript/blob/main/CONTRIBUTING.md) for development and release guidance.

MIT licensed.
