# Contributing

This repository contains the Node.js SDK, not the Cherami service. Report a reproducible SDK issue without API keys, mail bodies, or private attachments. Include the Node version, package version, operation, and request ID when available. For security issues or private account support, email hello@cherami.to rather than opening a public issue.

## Source and generation

Use Bun for dependency/tooling work. Install with `bun install --frozen-lockfile` and build with `bun run build`. Generated `src/schema.ts`, `src/models.ts`, and `src/operations.ts` are checked in for review; change their generator or contract input, not the generated files alone.

`openapi.json` is a selected snapshot of the service's public HTTP contract. `operations.json` explicitly fixes SDK coverage; a new service operation is not automatically SDK scope. Update the snapshot from an approved service contract revision, regenerate, and review changes together. Keep service documentation canonical on cherami.to, with package-specific setup and examples here.

Transport, pagination, binary handling and send recovery are handwritten. Do not add automatic retries, redirect following, credential issuance, provider-outcome exceptions, or key replacement during recovery. Preserve raw response fields and accepted/rejected/unknown outcomes. Type generation does not establish runtime semantics.

Use proportionate manual checks, including an isolated Node consumer of the packed artifact. Do not introduce automated tests. Exercise network uncertainty and expiry with local fixtures rather than real outbound mail. Node consumer-runtime checks are separate from Bun tooling. Never exercise examples against an account without authorization for the actual reads or writes.

## Release

Publication requires maintainer authorization. Build, inspect `bun pm pack --dry-run`, and inspect the real tarball before release. It should contain only `package.json`, README, LICENSE and `dist` JavaScript/declarations, with no secrets, private service source, or workspace dependencies. Verify the exported repository builds independently with its own lockfile.

Publish a reviewed tarball only after the public source repository and package metadata agree. No release workflow publishes automatically. Scoped npm publication requires public access and an authorized organization account; follow npm's current authentication requirements. Publishing the package does not deploy the website examples.
