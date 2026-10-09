import { Operations, routes } from "./operations.js";
import type { Params, Result } from "./operations.js";
import type { ApiResponse, RequestOptions } from "./transport.js";
import { checkSendWindow, restoreSend } from "./recovery.js";
import type { PreparedSend, SendOperation } from "./recovery.js";
import type { SendReceipt } from "./models.js";

export type { Operation, Params, Result } from "./operations.js";
export type { ClientOptions, RequestOptions, ApiResponse } from "./transport.js";
export { CheramiApiError, CheramiTransportError } from "./transport.js";
export { prepareSend, restoreSend, SendRecoveryExpiredError } from "./recovery.js";
export type { PreparedSend, SendOperation } from "./recovery.js";
export { attachment, attachmentBytes } from "./attachments.js";
export type * from "./models.js";

const pageFields = {
  listMessages: "messages",
  listSentMessages: "messages",
  listDrafts: "drafts",
  listLabels: "labels",
  listThreads: "threads",
  getThread: "messages",
  listTrash: "messages",
} as const;
export type PaginatedOperation = keyof typeof pageFields;
export type PageItem<O extends PaginatedOperation> = Result<O> extends Record<typeof pageFields[O], (infer Item)[]> ? Item : never;
export interface PaginationOptions extends RequestOptions {
  /** Optional request bound. Each yielded page retains its next_cursor for resumption. */
  maxPages?: number;
}

/** Official Node.js client. All operations make one request and never retry automatically. */
export class Cherami extends Operations {
  /** Lazy pages using a snapshot of the original resource and filters. */
  pages<O extends PaginatedOperation>(operation: O, params: Params<O>, options: PaginationOptions = {}): AsyncIterable<ApiResponse<Result<O>>> {
    if (!Object.hasOwn(pageFields, operation)) throw new TypeError("Operation is not paginated.");
    const input = structuredClone(params);
    const requestOptions = { ...options };
    const maxPages = requestOptions.maxPages ?? Infinity;
    if (maxPages !== Infinity && (!Number.isSafeInteger(maxPages) || maxPages < 1)) {
      throw new TypeError("maxPages must be a positive integer.");
    }
    const client = this;
    return (async function* () {
      let cursor = input.cursor;
      const seen = new Set<string>();
      if (cursor) seen.add(cursor);
      for (let page = 0; page < maxPages; page++) {
        const result = await client.request<Result<O>>(routes[operation], { ...input, ...(cursor === undefined ? {} : { cursor }) }, requestOptions);
        const next = result.data.next_cursor;
        if (next !== null && (typeof next !== "string" || !next || seen.has(next))) {
          throw new Error("Invalid or repeated pagination cursor; inspect the response before restarting the listing.");
        }
        yield result;
        if (next === null) return;
        seen.add(next);
        cursor = next;
      }
    })();
  }

  /** Lazy items in server page order, not a snapshot or a globally chronological thread. */
  iterate<O extends PaginatedOperation>(operation: O, params: Params<O>, options: PaginationOptions = {}): AsyncIterable<PageItem<O>> {
    const pages = this.pages(operation, params, options);
    return (async function* () {
      for await (const { data } of pages) {
        // The mapping above is operation-specific; TS cannot correlate an indexed
        // union's collection key with its result. Keep the assertion at this boundary.
        const items = (data as unknown as Record<string, PageItem<O>[]>)[pageFields[operation]];
        if (!Array.isArray(items)) throw new Error("Invalid paginated collection in Cherami response.");
        for (const item of items) yield item;
      }
    })();
  }

  /** Submit/recover a privately persisted send intent without renewing its protection. */
  async submit<O extends SendOperation>(prepared: PreparedSend<O>, options: RequestOptions = {}): Promise<ApiResponse<SendReceipt>> {
    // Validate and snapshot even when a JavaScript caller bypassed restoreSend or
    // reconstructed a mutable object. No await occurs before this snapshot.
    const record = restoreSend(JSON.stringify(prepared));
    checkSendWindow(record);
    return this.request<SendReceipt>(routes[record.operation], record.params, options);
  }
}
