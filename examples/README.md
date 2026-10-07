# SDK examples

These scripts read mail and prepare or submit a reply using Node.js 24+. From this repository, install and build the SDK first:

```sh
bun install --frozen-lockfile
bun run build
```

Obtain an API key through the [quickstart](https://cherami.to/docs/quickstart) and supply it privately as `CHERAMI_API_KEY`. Choose an inbox ID from `client.listInboxes()`; the root README shows that call.

## Read an inbox

Set `CHERAMI_API_KEY` and `CHERAMI_INBOX_ID`, then run:

```sh
node examples/read-inbox.mjs
```

This reads up to 40 messages and prints their IDs, subjects, and plain-text bodies. Messages still processing show their processing status instead. It does not send mail or change labels.

## Prepare a reply

Choose a message ID from the read output and confirm the reply's recipients and text. Set:

| Variable | Value |
| --- | --- |
| `CHERAMI_INBOX_ID` | The inbox containing the message |
| `CHERAMI_MESSAGE_ID` | The message to reply to |
| `CHERAMI_REPLY_TEXT` | Your reply's plain-text body |
| `CHERAMI_INTENT_PATH` | Where to save the send record, a new file for each intended reply |

```sh
node examples/prepare-reply.mjs
```

This saves the message and its retry key without making an API request or sending mail.

## Submit or recover the reply

Set `CHERAMI_API_KEY` and keep the same `CHERAMI_INTENT_PATH`.

**This script sends mail** on the initial submission:

```sh
node examples/submit-reply.mjs
```

It prints the receipt as one JSON line, `{ data, status, requestId }`, with the message ID, sending status and whether the service persisted the outcome. Keep every receipt, including earlier ones when a later recovery returns an unknown outcome.

If the response is lost, rerun **submit**, not prepare, with the original record. The helper allows recovery for 23 hours and 59 minutes from preparation; after expiry, inspect sent mail instead.

`accepted` means provider acceptance, not confirmed delivery. `rejected` means explicit rejection. `unknown` means the message may or may not have been submitted. See [sending and recovery](https://cherami.to/docs/guides/sending) for these outcomes.
