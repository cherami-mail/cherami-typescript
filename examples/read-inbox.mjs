// Read-only. Prints recent messages with their subjects and plain-text bodies.
// Set CHERAMI_API_KEY and CHERAMI_INBOX_ID. See examples/README.md.
import { Cherami } from "@cherami/sdk";

const { CHERAMI_API_KEY: apiKey, CHERAMI_INBOX_ID: inboxId } = process.env;
if (!apiKey || !inboxId) throw new Error("Set CHERAMI_API_KEY and CHERAMI_INBOX_ID.");
const client = new Cherami({ apiKey });
for await (const message of client.iterate("listMessages", { inbox_id: inboxId, limit: 20 }, { maxPages: 2 })) {
  const { data: detail } = await client.getMessage({ message_id: message.id });
  console.log(`\nMessage: ${detail.id}`);
  if (detail.processing_status !== "ready") {
    console.log(`Processing: ${detail.processing_status}`);
    continue;
  }
  console.log(`Subject: ${detail.subject ?? "(no subject)"}`);
  console.log(detail.content.text ?? "(no plain-text body)");
}
