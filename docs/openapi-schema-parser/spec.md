# Spec: `@asyncapi/openapi-schema-parser`

> npm: [`@asyncapi/openapi-schema-parser`](https://www.npmjs.com/package/@asyncapi/openapi-schema-parser)  
> Written: 2026-08-02

This document describes what the package is, what problem it solves, how it works, how to develop and release it inside `parser-js`, and a short history of the monorepo migration. Consumer-facing install/usage examples live in [`packages/openapi-schema-parser/README.md`](../../packages/openapi-schema-parser/README.md). A full beginner-oriented migration walkthrough lives in [`docs/openapi-schema-parser-migration.md`](../openapi-schema-parser-migration.md).

---

## 1. Purpose

`@asyncapi/openapi-schema-parser` is an **optional schema-format plugin** for `@asyncapi/parser`. It teaches the AsyncAPI parser how to **validate** and **convert** message payloads that are written in **OpenAPI 3.0 Schema Object** syntax into the JSON Schema shape the parser uses internally.

It is **not** a general OpenAPI document parser (paths, servers, etc.). It only handles schema objects used as AsyncAPI message payloads (and similar schema slots) when `schemaFormat` is an OpenAPI MIME type.

### Compatibility

- Package version `>= 3.0.0` requires `@asyncapi/parser` `>= 2.0.0` (documented in the package README). In the monorepo it declares `@asyncapi/parser` as a **peerDependency** `^3.0.0`.
- README also mentions Swagger 2.x in the package description; the registered MIME types today are **OpenAPI 3.0** only (see §4).

---

## 2. Problem it solves

AsyncAPI documents often reuse existing OpenAPI schemas for event payloads. OpenAPI Schema Objects differ from plain JSON Schema in places (for example `nullable: true` vs `type: ["string", "null"]`, singular `example`, `xml`, `discriminator`).

`@asyncapi/parser` works internally with JSON Schema and a pluggable **schema parser registry** keyed by MIME type / `schemaFormat`. Without this package, payloads marked as OpenAPI are not validated or converted correctly.

```
AsyncAPI YAML/JSON
  message.schemaFormat = application/vnd.oai.openapi;version=3.0.0
  message.payload      = OpenAPI Schema Object
        │
        ▼
  @asyncapi/parser  →  looks up SchemaParser by MIME type
        │
        ▼
  @asyncapi/openapi-schema-parser
        ├── validate()  → structural checks (Ajv + OpenAPI 3.0 meta-schema)
        └── parse()     → OpenAPI Schema → JSON Schema (+ post-processing)
        │
        ▼
  Rest of @asyncapi/parser (model / diagnostics)
```

---

## 3. Public API (stable for consumers)

**Guarantees:** Same npm package name and the same registration pattern as before the monorepo move. Nothing required from consumers beyond installing and registering (or using `multi-parser` with `includeSchemaParsers: true`).

### Factory

```ts
import { OpenAPISchemaParser } from '@asyncapi/openapi-schema-parser';
// also: export default OpenAPISchemaParser

const schemaParser = OpenAPISchemaParser();
```

Returns a `SchemaParser` from `@asyncapi/parser` with:

| Method | Role |
|--------|------|
| `getMimeTypes()` | MIME types this plugin handles |
| `validate(input)` | Validate OpenAPI schema data; return `SchemaValidateResult[]` (empty if valid) |
| `parse(input)` | Convert OpenAPI schema data to a JSON Schema object |

### Typical registration

```ts
import { Parser } from '@asyncapi/parser';
import { OpenAPISchemaParser } from '@asyncapi/openapi-schema-parser';

const parser = new Parser();
parser.registerSchemaParser(OpenAPISchemaParser());
```

This matches the Custom Schema Parsers documentation for `@asyncapi/parser`. The core parser browser bundle does **not** embed this package; OpenAPI support stays opt-in.

### Via `@asyncapi/multi-parser`

When `NewParser` / parse options include `includeSchemaParsers: true`, `multi-parser` registers OpenAPI (along with Avro, Protobuf, and optional RAML). See `packages/multi-parser/src/parse.ts`. Inside the monorepo, `multi-parser` depends on this package via workspace `"*"`.

---

## 4. MIME types

From `getMimeTypes()` in `src/index.ts`:

- `application/vnd.oai.openapi;version=3.0.0`
- `application/vnd.oai.openapi+json;version=3.0.0`
- `application/vnd.oai.openapi+yaml;version=3.0.0`

These are the values authors put in AsyncAPI `schemaFormat` (or equivalent) so the registry selects this plugin.

---

## 5. How it works (implementation)

Source is small and intentional:

| File | Role |
|------|------|
| `src/index.ts` | Factory, `validate`, `parse`, MIME list, Ajv setup, post-processing |
| `src/json-schema-v3.ts` | Embedded OpenAPI 3.0 Schema Object meta-schema (from OAI), used by Ajv |

### Validate

1. Lazy-init a shared Ajv instance (`allErrors`, formats via `ajv-formats`, messages via `ajv-errors`).
2. Register `jsonSchemaV3` under the name `'openapi'`.
3. Run the validator on `input.data`.
4. Map Ajv errors to Spectral-friendly `SchemaValidateResult` objects (message + path prefixed with `input.path`).

### Parse / convert

1. Call `@openapi-contrib/openapi-schema-to-json-schema` with `cloneSchema: true` and `keepNotSupported` for: `discriminator`, `readOnly`, `writeOnly`, `deprecated`, `xml`, `example`.
2. Walk the result (`iterateSchema` / `aliasProps`):
   - Move singular `example` into `examples[]` and delete `example`.
   - Strip `$schema` if present.
   - Rename nested `xml` → `x-xml`.

No Node-only APIs (`fs`, `path`, etc.) in the runtime source; dual ESM/CJS builds are for Node and bundlers. Browser usage is via consumer bundling + `registerSchemaParser`, not via the parser’s UMD browser bundle.

### Runtime dependencies

| Package | Role |
|---------|------|
| `ajv`, `ajv-formats`, `ajv-errors` | Validation |
| `@openapi-contrib/openapi-schema-to-json-schema` | OpenAPI → JSON Schema conversion |
| `@asyncapi/parser` | **peer** — provides `SchemaParser` types and host registration |

---

## 6. Package layout in the monorepo

```
packages/openapi-schema-parser/
├── src/                 # TypeScript source (published as compiled esm/ + cjs/)
├── test/
│   ├── parser.spec.ts   # unit + integration with @asyncapi/parser
│   └── documents/       # fixtures (valid/invalid JSON + AsyncAPI YAML)
├── package.json
├── tsconfig.json        # ESM → esm/
├── tsconfig.cjs.json    # CJS → cjs/
├── jest.config.ts
├── README.md            # npm-facing install/usage
└── CHANGELOG.md         # managed with Changesets releases
```

Published npm files: `/esm`, `/cjs`, `LICENSE`, `README.md` (`main` / `module` / `types` point at those builds).

---

## 7. Build, test, lint (local)

From the **parser-js repo root** (Node `>= 18`, npm workspaces + Turborepo):

```bash
npm install
npm run openapi-parser:build   # builds @asyncapi/parser first, then this package (ESM + CJS)
npm run openapi-parser:test    # 7 tests in test/parser.spec.ts
npm run multi-parser:test      # confirms workspace link from multi-parser
```

Or inside the package: `npm run build`, `npm test`, `npm run lint` (shared root `.eslintrc`).

### Turbo ordering (important)

`turbo.json` must build `@asyncapi/openapi-schema-parser` before `@asyncapi/multi-parser`, because `multi-parser`’s TypeScript compile needs this package’s emitted `.d.ts`. Use Turbo’s `@scope/name#task` selectors (not colon keys). See the migration guide § turbo.json for the CI race that this prevents.

### Jest notes

Dependencies are hoisted to the monorepo root. `jest.config.ts` maps:

- `nimma` / Spectral bundler paths under `<rootDir>/../../node_modules/...`
- `@asyncapi/parser` → `packages/parser` (same pattern as `multi-parser`)

---

## 8. Releases and publishing (Changesets)

This package is published from **`asyncapi/parser-js`**, not from the old standalone repo.

| Before (standalone) | After (monorepo) |
|---------------------|------------------|
| semantic-release on conventional commits to `master` | [Changesets](https://github.com/changesets/changesets) via `.github/workflows/release-with-changesets.yml` |
| One package per repo | Independent version bumps per workspace package |

### Contributor release flow

1. Change code under `packages/openapi-schema-parser/` (and/or other packages).
2. Run `npx changeset`, select `@asyncapi/openapi-schema-parser`, choose patch/minor/major, write a summary. Commit the `.changeset/*.md` file with the PR.
3. After merge, the Changesets action opens or updates a **Version Packages** PR (version + changelog).
4. Merging that PR runs `changeset publish` → npm publish for changed packages only.

Package metadata: `private: false`, `publishConfig.access: public`. `prepublishOnly` runs `generate:assets` (build + README TOC).

Versioning is independent of `@asyncapi/parser` unless a PR intentionally bumps both. `multi-parser` uses workspace `"*"` for this package so local development always links the sibling; Changesets may patch dependent packages per `updateInternalDependencies`.

Known monorepo gap (pre-existing): org-managed `bump.yml` may not align with Changesets commit messages; dependent-repo bumps may need a manual follow-up until fixed in `asyncapi/.github`.

---

## 9. What this package does *not* do

- Does not parse full OpenAPI/Swagger API documents (only schema objects used as AsyncAPI schemas).
- Does not change `@asyncapi/parser`’s browser UMD bundle.
- Does not auto-register itself when using `@asyncapi/parser` alone — registration (or `multi-parser`’s `includeSchemaParsers`) is required.

---

## 10. History and migration (backtracking)

| When | What |
|------|------|
| Pre-migration | Maintained at [`asyncapi/openapi-schema-parser`](https://github.com/asyncapi/openapi-schema-parser); releases via semantic-release. |
| Related issues | [#322](https://github.com/asyncapi/openapi-schema-parser/issues/322), [parser-js#1194](https://github.com/asyncapi/parser-js/issues/1194), [#326](https://github.com/asyncapi/openapi-schema-parser/issues/326) |
| Consumer impact | **None intended** — same package name, same `OpenAPISchemaParser()` + `registerSchemaParser` usage. |
| Maintainers | Development continues in `parser-js`. Standalone README points readers to the monorepo. |

### Intentional monorepo adjustments (not business-logic changes)

- `@asyncapi/parser`: dependency → **peerDependency** (plugin/host pattern; avoids duplicate installs).
- `repository` / `bugs` / `homepage` → `parser-js`.
- Lint uses shared root ESLint config.
- Jest paths adjusted for hoisted `node_modules` + workspace parser.
- Drop semantic-release package config; use Changesets.
- `multi-parser` dependency: `"^3.0.4"` → `"*"` (workspace link; avoids version-drift when this package majors).

Detailed rationale (monorepo, Turborepo, peer vs dependency, `"*"` analysis, release PR scenarios): [`docs/openapi-schema-parser-migration.md`](../openapi-schema-parser-migration.md).

---

## 11. Glossary

| Term | Meaning |
|------|---------|
| Schema parser | Plugin implementing `SchemaParser` (`validate` / `parse` / `getMimeTypes`) for one schema format |
| schemaFormat | AsyncAPI field naming the MIME type of a message payload schema |
| Monorepo | Single git repo with multiple publishable packages (`packages/*`) |
| Turborepo | Task runner that orders build/test across workspace packages |
| npm workspaces | Links local packages (symlinks) so siblings resolve without publishing first |
| peerDependency | Host library the consumer must provide (here: `@asyncapi/parser`) |
| Changesets | Monorepo versioning + changelog + publish workflow used by `parser-js` |

---

## 12. Quick links

| Resource | Path / URL |
|----------|------------|
| Source | `packages/openapi-schema-parser/src/` |
| Tests | `packages/openapi-schema-parser/test/` |
| npm README | `packages/openapi-schema-parser/README.md` |
| Migration guide | `docs/openapi-schema-parser-migration.md` |
| Changesets config | `.changeset/config.json` |
| Release workflow | `.github/workflows/release-with-changesets.yml` |
| Tracking issue | https://github.com/asyncapi/openapi-schema-parser/issues/326 |
| Previous repository | https://github.com/asyncapi/openapi-schema-parser |
