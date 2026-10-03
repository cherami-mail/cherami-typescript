import { Buffer } from "node:buffer";
import type { AttachmentInput } from "./models.js";

/** Encode original bytes for a send or draft. Text must be encoded by the caller. */
export async function attachment(
  filename: string,
  bytes: Uint8Array | ArrayBuffer | Blob,
  type = "application/octet-stream",
): Promise<AttachmentInput> {
  const value = bytes instanceof Blob ? new Uint8Array(await bytes.arrayBuffer()) : bytes;
  // Buffer.from(Uint8Array) respects byteOffset/byteLength, including sliced Buffers.
  return { filename, type, content: Buffer.from(value instanceof ArrayBuffer ? new Uint8Array(value) : value).toString("base64") };
}

/** Decode a saved draft/sent attachment without treating its bytes as text. */
export function attachmentBytes(file: Pick<AttachmentInput, "content">): Uint8Array {
  if (typeof file.content !== "string" || !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(file.content)) {
    throw new TypeError("Attachment content must be padded base64 without whitespace.");
  }
  return new Uint8Array(Buffer.from(file.content, "base64"));
}
