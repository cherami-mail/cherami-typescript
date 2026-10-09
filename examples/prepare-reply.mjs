// Saves a reply's send record to CHERAMI_INTENT_PATH without sending it. Run once per reply.
// Set CHERAMI_INBOX_ID, CHERAMI_MESSAGE_ID, CHERAMI_REPLY_TEXT and CHERAMI_INTENT_PATH.
// See examples/README.md.
import { writeFile } from "node:fs/promises";
import { prepareSend } from "@cherami/sdk";

const { CHERAMI_INBOX_ID: inboxId, CHERAMI_MESSAGE_ID: messageId,
  CHERAMI_REPLY_TEXT: text, CHERAMI_INTENT_PATH: intentPath } = process.env;
if (!inboxId || !messageId || !text || !intentPath) {
  throw new Error("Set CHERAMI_INBOX_ID, CHERAMI_MESSAGE_ID, CHERAMI_REPLY_TEXT and CHERAMI_INTENT_PATH.");
}
const intent = prepareSend("replyMessage", {
  inbox_id: inboxId, body: { message_id: messageId, text },
});
await writeFile(intentPath, JSON.stringify(intent));
console.log("Saved reply. Run submit-reply.mjs with this record to send it or recover a lost response.");
