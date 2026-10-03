// Does not send mail. Run ONCE after approving this reply and its derived recipients.
// Set CHERAMI_INBOX_ID, CHERAMI_MESSAGE_ID, CHERAMI_REPLY_TEXT and an absolute
// CHERAMI_INTENT_PATH in private storage outside your repository.
import { writeFile } from "node:fs/promises";
import { isAbsolute } from "node:path";
import { prepareSend } from "@cherami/sdk";

const { CHERAMI_INBOX_ID: inboxId, CHERAMI_MESSAGE_ID: messageId,
  CHERAMI_REPLY_TEXT: text, CHERAMI_INTENT_PATH: intentPath } = process.env;
if (!inboxId || !messageId || !text || !intentPath || !isAbsolute(intentPath)) {
  throw new Error("Supply inbox ID, source message ID, approved reply text and an absolute private intent path.");
}
const intent = prepareSend("replyMessage", {
  inbox_id: inboxId, body: { message_id: messageId, text },
});
await writeFile(intentPath, JSON.stringify(intent), { mode: 0o600, flag: "wx" });
console.log("Saved reply intent. Submit this original record; do not prepare it again to recover uncertainty.");
