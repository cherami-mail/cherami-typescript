// SENDS the already approved, saved intent, or recovers its original attempt.
// Set CHERAMI_API_KEY and CHERAMI_INTENT_PATH. To recover a lost response, run
// this again with the same record; do not rerun prepare-reply.mjs.
import { readFile } from "node:fs/promises";
import { Cherami, restoreSend } from "@cherami/sdk";

const { CHERAMI_API_KEY: apiKey, CHERAMI_INTENT_PATH: intentPath } = process.env;
if (!apiKey || !intentPath) throw new Error("Set CHERAMI_API_KEY and CHERAMI_INTENT_PATH.");
const client = new Cherami({ apiKey });
const intent = restoreSend(await readFile(intentPath, "utf8"));
const { data, status, requestId } = await client.submit(intent);
// This line is the attempt's receipt. Keep it; a later replay must not replace an earlier outcome.
console.log(JSON.stringify({ data, status, requestId }));
