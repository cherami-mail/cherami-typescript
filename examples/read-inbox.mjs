// Read-only. Supply CHERAMI_API_KEY privately and the assigned CHERAMI_INBOX_ID.
// Run with Node 24+ after installing @cherami/sdk.
import { Cherami } from "@cherami/sdk";

const { CHERAMI_API_KEY: apiKey, CHERAMI_INBOX_ID: inboxId } = process.env;
if (!apiKey || !inboxId) throw new Error("Supply CHERAMI_API_KEY and CHERAMI_INBOX_ID privately.");
const client = new Cherami({ apiKey });
for await (const message of client.iterate("listMessages", { inbox_id: inboxId, limit: 20 }, { maxPages: 2 })) {
  // Print metadata only. Retrieve and process bodies in your private workflow.
  console.log(message.id, message.processing_status);
}
