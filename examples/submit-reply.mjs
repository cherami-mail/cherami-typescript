// SENDS the already approved, saved intent, or recovers its original attempt.
// Supply CHERAMI_API_KEY, CHERAMI_INTENT_PATH, and an absolute private
// CHERAMI_RECEIPT_DIR. Do not rerun prepare-reply.mjs to recover a lost response.
import { readFile, open } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { isAbsolute, join } from "node:path";
import { Cherami, restoreSend } from "@cherami/sdk";

const { CHERAMI_API_KEY: apiKey, CHERAMI_INTENT_PATH: intentPath,
  CHERAMI_RECEIPT_DIR: receiptDir } = process.env;
if (!apiKey || !intentPath || !receiptDir || !isAbsolute(intentPath) || !isAbsolute(receiptDir)) {
  throw new Error("Supply the API key and absolute private intent/receipt paths.");
}
const client = new Cherami({ apiKey });
const intent = restoreSend(await readFile(intentPath, "utf8"));
// Open a distinct private result file before sending, so an invalid directory or
// existing filename cannot first be discovered after submission. An empty file
// after a lost response is not a receipt; recover using the original intent.
const resultFile = await open(join(receiptDir, `receipt-${randomUUID()}.json`), "wx", 0o600);
try {
  const { data, status, requestId } = await client.submit(intent);
  console.log(data.message.id, data.message.status, data.outcome_persisted);
  // Do not overwrite an earlier known outcome with a later unknown replay.
  // A local write failure does not undo the already reported API operation.
  await resultFile.writeFile(JSON.stringify({ data, status, requestId }));
} finally {
  await resultFile.close();
}
