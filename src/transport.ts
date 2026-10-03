export interface ClientOptions {
  /** Existing human-approved API key. Never use this client in a browser. */
  apiKey: string;
  /** Trusted API origin only. Defaults to https://cherami.to. Never take it from mail. */
  baseUrl?: string;
  /** Includes response-body consumption; 0 disables the timeout. Default: 60 seconds. */
  timeoutMs?: number;
  /** Optional instrumentation/transport override. Must not add automatic write retries. */
  fetch?: typeof globalThis.fetch;
}

export interface RequestOptions {
  signal?: AbortSignal;
  timeoutMs?: number;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  headers: Headers;
  requestId: string | null;
}

/** Application and platform HTTP failures. Body is retained for quota/inbox details. */
export class CheramiApiError extends Error {
  readonly name = "CheramiApiError";
  readonly code: string | undefined;
  readonly requestId: string | null;
  readonly retryAfter: string | null;

  constructor(
    readonly status: number,
    readonly headers: Headers,
    readonly body: unknown,
  ) {
    const error = isObject(body) && isObject(body.error) ? body.error : undefined;
    super(typeof error?.message === "string" ? error.message : `Cherami returned HTTP ${status}.`);
    this.code = typeof error?.code === "string" ? error.code : undefined;
    this.requestId = headers.get("x-request-id");
    this.retryAfter = headers.get("retry-after");
  }
}

/** No usable complete response. A write may have happened, including after cancellation. */
export class CheramiTransportError extends Error {
  readonly name = "CheramiTransportError";
  constructor(
    message: string,
    options?: ErrorOptions,
    readonly status?: number,
    readonly requestId?: string | null,
  ) {
    super(message, options);
  }
}

export interface Route {
  readonly path: string;
  readonly method: string;
  readonly pathParams: readonly string[];
  readonly queryParams: readonly string[];
  readonly body: boolean;
  readonly binary: boolean;
  readonly successStatuses: readonly number[];
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function checkTimeout(value: number) {
  if (!Number.isSafeInteger(value) || value < 0) throw new TypeError("timeoutMs must be a nonnegative safe integer.");
}

export class Transport {
  // Private fields also keep an inspected/logged client from exposing its credential.
  #apiKey: string;
  #baseUrl: string;
  #fetch: typeof globalThis.fetch;
  #timeoutMs: number;

  constructor(options: ClientOptions) {
    if (typeof window !== "undefined") throw new Error("Cherami SDK is for trusted backend applications, not browsers.");
    if (typeof options.apiKey !== "string" || !options.apiKey.trim() || /\s/.test(options.apiKey)) {
      throw new TypeError("Supply a nonempty API key without whitespace.");
    }
    const origin = new URL(options.baseUrl ?? "https://cherami.to");
    const local = ["localhost", "127.0.0.1", "[::1]"].includes(origin.hostname);
    if ((origin.protocol !== "https:" && !(local && origin.protocol === "http:")) ||
        origin.username || origin.password || origin.pathname !== "/" || origin.search || origin.hash) {
      throw new TypeError("baseUrl must be a trusted HTTPS origin (HTTP is allowed only on loopback).");
    }
    this.#apiKey = options.apiKey;
    this.#baseUrl = origin.origin;
    this.#fetch = options.fetch ?? globalThis.fetch;
    this.#timeoutMs = options.timeoutMs ?? 60_000;
    checkTimeout(this.#timeoutMs);
  }

  protected async request<T>(route: Route, params: object, options: RequestOptions): Promise<ApiResponse<T>> {
    const input = params as Record<string, unknown>;
    // Fixed route templates and segment encoding prevent IDs from becoming URLs.
    // Dot segments are rejected because URL() normalizes even encoded dots.
    let path = route.path;
    for (const name of route.pathParams) {
      const value = input[name];
      if (typeof value !== "string" || !value || value === "." || value === ".." || /[\x00-\x20/\\?#%]/.test(value)) {
        throw new TypeError(`Invalid ${name}: use the returned resource ID.`);
      }
      path = path.replace(`{${name}}`, encodeURIComponent(value));
    }
    const url = new URL(path, this.#baseUrl);
    for (const name of route.queryParams) {
      const value = input[name];
      if (value === undefined) continue;
      for (const item of Array.isArray(value) ? value : [value]) {
        if (typeof item !== "string" && typeof item !== "number" && typeof item !== "boolean") {
          throw new TypeError(`Invalid query parameter ${name}.`);
        }
        url.searchParams.append(name, String(item));
      }
    }
    const headers = new Headers({ Authorization: `Bearer ${this.#apiKey}`, Accept: route.binary ? "*/*" : "application/json" });
    let body: string | undefined;
    if (route.body) {
      if (!isObject(input.body)) throw new TypeError("Supply a JSON object as body.");
      body = JSON.stringify(input.body);
      headers.set("Content-Type", "application/json");
    }
    const timeout = options.timeoutMs ?? this.#timeoutMs;
    checkTimeout(timeout);
    const signals = [options.signal, timeout ? AbortSignal.timeout(timeout) : undefined].filter((s): s is AbortSignal => !!s);
    const signal = signals.length ? AbortSignal.any(signals) : undefined;
    let response: Response;
    try {
      // Exactly one request. Never follow a redirect, including to the same origin:
      // redirects can replay a POST or take a bearer credential to an unintended path.
      response = await this.#fetch(url, {
        method: route.method, headers, redirect: "manual",
        ...(body === undefined ? {} : { body }), ...(signal ? { signal } : {}),
      });
    } catch (cause) {
      throw new CheramiTransportError("No Cherami response received. A write may have happened; recover using the original operation, not a replacement send.", { cause });
    }
    const metadata = { status: response.status, headers: response.headers, requestId: response.headers.get("x-request-id") };
    if (response.ok && route.binary && route.successStatuses.includes(response.status)) {
      // Do not decode MIME or attachments. The caller streams/consumes this Response
      // once, and owns any later stream failure or explicit cancellation.
      return { data: response as T, ...metadata };
    }
    let text: string;
    try {
      text = await response.text();
    } catch (cause) {
      throw new CheramiTransportError("Cherami response body was interrupted. A write may have happened.", { cause }, metadata.status, metadata.requestId);
    }
    let data: unknown;
    try { data = JSON.parse(text); } catch { data = text; }
    if (!response.ok) throw new CheramiApiError(response.status, response.headers, data);
    if (!route.successStatuses.includes(response.status) || !isObject(data) ||
        !/\bapplication\/(?:[\w.-]+\+)?json\b/i.test(response.headers.get("content-type") ?? "")) {
      throw new CheramiTransportError("Cherami returned an unexpected success response. A write may have happened; inspect saved resources before resubmitting.", undefined, metadata.status, metadata.requestId);
    }
    // Types follow the versioned contract; unknown response fields are preserved.
    // This is deliberately not a second runtime business-validation implementation.
    return { data: data as T, ...metadata };
  }
}
