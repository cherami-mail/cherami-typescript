# Contributing

Contributions to the Cherami Node.js SDK are welcome. For a bug report, include a minimal reproduction, Node.js and SDK versions, the operation, and a request ID when available. Leave out API keys, mail bodies, and private attachments. Send security issues or private account questions to hello@cherami.to rather than opening a public issue.

## Local development

Use Node.js 24+ for running consumer examples and Bun for development tooling:

```sh
bun install --frozen-lockfile
bun run build
```

The build generates the client types and methods, then emits JavaScript and declarations to `dist`. `bun run check` checks TypeScript without emitting. See [examples/README.md](examples/README.md) for running the mail examples.

## Making changes

Transport, pagination, attachment handling, and send recovery are handwritten in `src`. The checked-in `src/schema.ts`, `src/models.ts`, and `src/operations.ts` are generated: edit the generator or contract input, then regenerate rather than editing their output alone.

`openapi.json` contains the SDK's selected HTTP contract, and `operations.json` selects its methods. Discuss new operations or contract changes with a maintainer before implementing them. SDK behavior must stay consistent with the service's [HTTP reference](https://cherami.to/docs/api).

Preserve these client guarantees when changing behavior:

- Requests are not automatically retried and redirects are not followed.
- Provider acceptance, rejection, and uncertain sending outcomes remain response data, not HTTP exceptions.
- Recovery reuses the original payload, retry key, and deadline. Restoring a record must not create a new send intent.
- Responses retain the HTTP fields, with status, headers, and request ID available to callers.

In your pull request, explain the problem, the proposed change, and how you checked it. Update examples or documentation when usage changes.

## Checking changes

This project uses proportionate manual verification rather than automated tests. Check the affected behavior and describe what you observed, including anything you could not verify. Use local HTTP fixtures for network failures and recovery expiry, not real outbound mail. Run account examples only with permission for the reads or sends involved.

For packaging or compatibility changes, inspect a packed artifact and try it from an isolated Node.js application. A successful Bun build alone does not establish that the published package works in Node.js.

## Releases

Maintainers publish releases manually. Before publication, verify the repository builds independently, inspect the package contents, and check that source and package metadata agree. The package should contain only `package.json`, `README.md`, `LICENSE`, and compiled JavaScript/declarations in `dist`.

Publish the reviewed tarball rather than repacking an unchecked working tree.
