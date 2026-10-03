import { randomUUID } from "node:crypto";
import type { Params } from "./operations.js";

export const sendOperations = ["sendMessage", "replyMessage", "replyAllMessage", "forwardMessage"] as const;
export type SendOperation = typeof sendOperations[number];
type DeepReadonly<T> = T extends object ? { readonly [K in keyof T]: DeepReadonly<T[K]> } : T;

/** Sensitive, JSON-serializable recovery record. Persist privately before submission. */
export type PreparedSend<O extends SendOperation = SendOperation> = O extends SendOperation ? {
  readonly version: 1;
  readonly operation: O;
  /** Measured before the first possible request, never renewed on replay. */
  readonly firstRequestAt: string;
  readonly params: DeepReadonly<Params<O> & { body: { idempotency_key: string } }>;
} : never;

export class SendRecoveryExpiredError extends Error {
  readonly name = "SendRecoveryExpiredError";
  constructor() {
    super("The conservative send-recovery window has expired. Inspect sent resources; do not replace the key or prepare this uncertain send again.");
  }
}

function freeze<T>(value: T): T {
  if (value && typeof value === "object") {
    for (const child of Object.values(value)) freeze(child);
    Object.freeze(value);
  }
  return value;
}

/** Snapshot one intended send, generating a key only if the caller did not supply one. */
export function prepareSend<O extends SendOperation>(operation: O, params: Params<O>): PreparedSend<O> {
  if (!sendOperations.includes(operation)) throw new TypeError("Unsupported send operation.");
  const record = {
    version: 1,
    operation,
    firstRequestAt: new Date().toISOString(),
    params: { ...params, body: { ...params.body, idempotency_key: params.body.idempotency_key ?? randomUUID() } },
  };
  return restoreSend(JSON.stringify(record)) as PreparedSend<O>;
}

/** Restore the original record; never reconstruct its timestamp or generate another key. */
export function restoreSend(json: string): PreparedSend {
  const record = JSON.parse(json);
  if (!record || record.version !== 1 || !sendOperations.includes(record.operation) ||
      typeof record.firstRequestAt !== "string" ||
      !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(record.firstRequestAt) ||
      !Number.isFinite(Date.parse(record.firstRequestAt)) ||
      new Date(record.firstRequestAt).toISOString() !== record.firstRequestAt ||
      !record.params || typeof record.params.inbox_id !== "string" || !record.params.inbox_id ||
      !record.params.body || typeof record.params.body !== "object" || Array.isArray(record.params.body) ||
      typeof record.params.body.idempotency_key !== "string" || !/^[A-Za-z0-9_-]{1,128}$/.test(record.params.body.idempotency_key)) {
    throw new TypeError("Invalid send recovery record. Load the unchanged original record, not reconstructed input.");
  }
  return freeze(record) as PreparedSend;
}

export function checkSendWindow(record: PreparedSend): void {
  const age = Date.now() - Date.parse(record.firstRequestAt);
  if (age < 0) throw new TypeError("Send recovery timestamp is in the future. Check the system clock; do not reset the record.");
  // Stop one minute before 24 hours, measured from preparation rather than server
  // reservation. Preparation delays shorten protection; replays never extend it.
  if (age >= 24 * 60 * 60 * 1000 - 60_000) throw new SendRecoveryExpiredError();
}
