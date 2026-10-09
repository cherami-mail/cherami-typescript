# Run the examples

These scripts read an inbox, then prepare and send a reply, using Node.js 24+. From this repository, install and build the SDK first:

```sh
bun install --frozen-lockfile
bun run build
```

[Create an API key](https://cherami.to/docs/quickstart#create-an-api-key) and supply it privately as `CHERAMI_API_KEY`. Pick an inbox ID with `client.listInboxes()`, as the [README](../README.md) shows.

## Read an inbox

With `CHERAMI_INBOX_ID` set, run:

```sh
node examples/read-inbox.mjs
```

It prints up to 40 messages with their IDs, subjects and plain-text bodies, or the processing status of any not ready yet. It only reads.

## Prepare a reply

Pick a message ID from the read output. The reply goes to that message's Reply-To address, or its From when there is none; to choose recipients yourself, prepare with `sendMessage` instead, as the [README](../README.md#send-mail) shows. Set:

| Variable | Value |
| --- | --- |
| `CHERAMI_INBOX_ID` | The inbox containing the message |
| `CHERAMI_MESSAGE_ID` | The message to reply to |
| `CHERAMI_REPLY_TEXT` | Your reply's plain-text body |
| `CHERAMI_INTENT_PATH` | The file to save the reply's send record to |

```sh
node examples/prepare-reply.mjs
```

This saves the reply and its retry key to that file. It sends nothing and needs no API key.

## Submit or recover the reply

With the same `CHERAMI_INTENT_PATH`, run the script below. **It sends the reply.**

```sh
node examples/submit-reply.mjs
```

It prints the receipt as one JSON line, `{ data, status, requestId }`. If it fails with `CheramiTransportError`, run **submit** again with the same file, not prepare: we return the original attempt instead of sending twice. After 23 hours and 59 minutes from preparation, submit refuses the record; check sent mail, and if the reply isn't there, prepare it again.

Read the outcome in `data.message.status` and `data.outcome_persisted` as the [README](../README.md#submit-or-recover) explains.
