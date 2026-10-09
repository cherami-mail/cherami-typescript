// Sends the reply saved at CHERAMI_INTENT_PATH. If it fails with CheramiTransportError,
// run this again with the same file, not prepare-reply.mjs: the saved retry key returns
// the original attempt instead of sending twice. Set CHERAMI_API_KEY and CHERAMI_INTENT_PATH.
import { readFile } from "node:fs/promises";
import { Cherami, restoreSend } from "@cherami/sdk";

const { CHERAMI_API_KEY: apiKey, CHERAMI_INTENT_PATH: intentPath } = process.env;
if (!apiKey || !intentPath) throw new Error("Set CHERAMI_API_KEY and CHERAMI_INTENT_PATH.");
const client = new Cherami({ apiKey });
const intent = restoreSend(await readFile(intentPath, "utf8"));
const { data, status, requestId } = await client.submit(intent);
// The receipt. If data.outcome_persisted is false, keep it: later reads may not show its outcome.
console.log(JSON.stringify({ data, status, requestId }));
