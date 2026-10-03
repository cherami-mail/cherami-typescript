import openapiTS, { astToString } from "openapi-typescript";
import { mkdir, writeFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const spec = await Bun.file(new URL("openapi.json", root)).json();
const selected: string[] = await Bun.file(new URL("operations.json", root)).json();
const found = new Map<string, any>();
for (const [path, methods] of Object.entries(spec.paths)) {
  for (const [method, operation] of Object.entries(methods as Record<string, any>)) {
    if (!operation.operationId) continue;
    if (!selected.includes(operation.operationId) || found.has(operation.operationId)) {
      throw new Error(`Unselected or duplicate operation: ${operation.operationId}`);
    }
    found.set(operation.operationId, { ...operation, path, method: method.toUpperCase() });
  }
}
if (found.size !== selected.length) throw new Error("Selected operation missing from contract snapshot.");
await mkdir(new URL("src/", root), { recursive: true });
await writeFile(new URL("src/schema.ts", root), "// Generated from openapi.json. Do not edit.\n" + astToString(await openapiTS(spec)));
const banner = "// Generated from the approved HTTP operations. Run bun run generate; do not edit.\n";
const declarations: string[] = [];
const methods: string[] = [];
const descriptors: Record<string, unknown> = {};
for (const id of selected) {
  const op = found.get(id);
  const path = op.parameters.filter((p: any) => p.in === "path").map((p: any) => p.name);
  const query = op.parameters.filter((p: any) => p.in === "query").map((p: any) => p.name);
  const binary = ["downloadRawMessage", "downloadAttachment"].includes(id);
  const response = binary ? "Response" : `JsonSuccess<operations[${JSON.stringify(id)}]["responses"]>`;
  const parts = [
    ...(path.length ? [`operations["${id}"]["parameters"]["path"]`] : []),
    ...(query.length ? [`NonNullable<operations["${id}"]["parameters"]["query"]>`] : []),
    ...(op.requestBody ? [`{ body: operations["${id}"]["requestBody"]["content"]["application/json"] }`] : []),
  ];
  const params = parts.length ? parts.join(" & ") : "Record<string, never>";
  declarations.push(`  ${id}: { params: ${params}; result: ${response} };`);
  descriptors[id] = { path: op.path, method: op.method, pathParams: path, queryParams: query, body: !!op.requestBody, binary, successStatuses: Object.keys(op.responses).filter(status => /^2\d\d$/.test(status)).map(Number) };
  const args = parts.length ? `params: Params<"${id}">, options: RequestOptions = {}` : "options: RequestOptions = {}";
  methods.push(`  /** ${op.summary.replaceAll("*/", "* /")}. See the HTTP reference for state and recovery semantics. */\n  ${id}(${args}): Promise<ApiResponse<Result<"${id}">>> {\n    return this.request(routes.${id}, ${parts.length ? "params" : "{}"}, options);\n  }`);
}
await writeFile(new URL("src/operations.ts", root), `${banner}import type { operations } from "./schema.js";
import { Transport } from "./transport.js";
import type { ApiResponse, RequestOptions } from "./transport.js";
type JsonSuccess<R> = { [K in keyof R]: K extends number ? \`\${K}\` extends \`2\${string}\` ? R[K] extends { content: { "application/json": infer T } } ? T : never : never : never }[keyof R];
export interface OperationMap {
${declarations.join("\n")}
}
export type Operation = keyof OperationMap;
export type Params<O extends Operation> = OperationMap[O]["params"];
export type Result<O extends Operation> = OperationMap[O]["result"];
export const routes = ${JSON.stringify(descriptors, null, 2)} as const;
export class Operations extends Transport {
${methods.join("\n\n")}
}
`);
const aliases = Object.keys(spec.components.schemas).map(name => `export type ${name} = components["schemas"]["${name}"];`).join("\n");
await writeFile(new URL("src/models.ts", root), `${banner}import type { components } from "./schema.js";\n${aliases}\n`);
console.log(`Generated types and methods for ${selected.length} operations.`);
