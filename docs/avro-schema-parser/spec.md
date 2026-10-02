# Spec: `@asyncapi/avro-schema-parser`

> npm: [`@asyncapi/avro-schema-parser`](https://www.npmjs.com/package/@asyncapi/avro-schema-parser)  
> Written: 2026-09-27

This document describes what the package is, what problem it solves, how it works, and how to develop and release it. Install and usage examples are in [`packages/avro-schema-parser/README.md`](../../packages/avro-schema-parser/README.md).

---

## 1. Purpose

`@asyncapi/avro-schema-parser` is an **optional schema-format plugin** for `@asyncapi/parser`. It validates Apache Avro 1.x schemas used as AsyncAPI message payloads (and similar schema slots) and converts them to the JSON Schema shape the parser uses internally.

It is not an AsyncAPI document parser and not a general Avro binary decoder. It handles schema objects when `schemaFormat` is one of the Avro MIME types in §4.

### Compatibility

- Package version `>= 2.0.0` requires `@asyncapi/parser` `>= 2.0.0` (documented in the package README).
- In the monorepo it declares `@asyncapi/parser` as a **peerDependency** `^3.6.2`.
- The first release from `parser-js` is **3.1.0**. Versions `3.0.25` and `3.0.26` were published and then removed, so they cannot be published again. `3.0.24` is the last installable release from the standalone repository.

---

## 2. Problem it solves

AsyncAPI documents often describe Kafka and other event payloads with Avro schemas. `@asyncapi/parser` works internally with JSON Schema and a pluggable schema-parser registry keyed by MIME type. Without this package, an Avro `schemaFormat` is left as authored data. The core parser does not interpret it.

```
AsyncAPI YAML/JSON
  message.schemaFormat = application/vnd.apache.avro;version=1.9.0
  message.payload      = Avro schema
        │
        ▼
  @asyncapi/parser  →  looks up SchemaParser by MIME type
        │
        ▼
  @asyncapi/avro-schema-parser
        ├── validate()  → avsc.Type.forSchema
        └── parse()     → Avro schema → JSON Schema
        │
        ▼
  Rest of @asyncapi/parser (model / diagnostics)
```

Registration is explicit. `parser.registerSchemaParser(AvroSchemaParser())`, or `@asyncapi/multi-parser` with `includeSchemaParsers: true`.

---

## 3. Public API (stable for consumers)

**Guarantees:** Same npm package name and the same registration pattern as before the monorepo move.

### Factory

```ts
import { AvroSchemaParser, avroToJsonSchema } from '@asyncapi/avro-schema-parser';
// also: export default AvroSchemaParser

const schemaParser = AvroSchemaParser();
```

Returns a `SchemaParser` from `@asyncapi/parser`:

| Method | Role |
|--------|------|
| `getMimeTypes()` | MIME types this plugin handles (six strings, §4) |
| `validate(input)` | Validate Avro schema data; return `SchemaValidateResult[]` (empty if valid) |
| `parse(input)` | Convert Avro schema data to a JSON Schema object |

`avroToJsonSchema(avroDefinition)` is a named export used by the unit tests. It is part of the public surface. Do not remove it.

### Typical registration

```ts
import { Parser } from '@asyncapi/parser';
import { AvroSchemaParser } from '@asyncapi/avro-schema-parser';

const parser = new Parser();
parser.registerSchemaParser(AvroSchemaParser());
```

The core parser browser bundle does not embed this package. Avro support stays opt-in.

### Via `@asyncapi/multi-parser`

When `includeSchemaParsers: true`, `multi-parser` registers Avro next to OpenAPI, Protobuf, and optional RAML. See `packages/multi-parser/src/parse.ts`. Inside the monorepo, `multi-parser` depends on this package via workspace `"*"`.

---

## 4. MIME types

From `getMimeTypes()` in `src/index.ts`:

- `application/vnd.apache.avro;version=1.9.0`
- `application/vnd.apache.avro+json;version=1.9.0`
- `application/vnd.apache.avro+yaml;version=1.9.0`
- `application/vnd.apache.avro;version=1.8.2`
- `application/vnd.apache.avro+json;version=1.8.2`
- `application/vnd.apache.avro+yaml;version=1.8.2`

Avro 1.8.2 and 1.9.0 share one converter. The version lives in the MIME type.

---

## 5. How it works (implementation)

Source is a single file, `src/index.ts`.

| Piece | Role |
|-------|------|
| `validate` | `avsc.Type.forSchema`. On throw, one `SchemaValidateResult` with `error.message` and `input.path`. `avsc` does not attach a useful path. |
| `parse` | `avroToJsonSchema`, then the Kafka key side effect below |
| `avroToJsonSchema` / `convertAvroToJsonSchema` | Recursive Avro → JSON Schema conversion |

Every import from `@asyncapi/parser` is `import type`. There is no runtime import of the parser.

### Conversion

| Avro | JSON Schema |
|------|-------------|
| `null`, `boolean`, `string` | the same JSON Schema type |
| `int`, `long` | `integer`, with 32-bit or 64-bit `minimum` / `maximum` |
| `float`, `double` | `number`, plus `format` |
| `bytes`, `fixed` | `string` with a byte pattern. `fixed` also sets length to `size` |
| `enum` | `string` + `enum` from `symbols` |
| `array`, `map` | `array`/`items`, or `object`/`additionalProperties` |
| `record` | `object` + `properties`. Name and namespace become `x-parser-schema-id` |
| union | `oneOf`, with `null` placed last |
| field with no default and a type that is not a union containing `null` | parent `required` |
| `doc`, `default` | `description`, `default` |
| string `logicalType` | `format` |
| extra attributes | `example` → `examples[]`; numeric bounds and `multipleOf`; string `pattern` / lengths; array `minItems` / `maxItems` / `uniqueItems` |

Named records are cached by fully qualified name. Two records with the same fully qualified name: the last one wins.

### Kafka key side effect

If `input.meta.message.bindings.kafka.key` is set, `parse()`:

1. Converts that key from Avro to JSON Schema.
2. Stores the original on `message['x-parser-original-bindings-kafka-key']`.
3. Replaces `message.bindings.kafka.key` with the converted schema.

This mutates the message object passed in. The tests cover this mutation.

### Conversion limits

- `long` bounds use `Math.pow(2, 63)`. JavaScript numbers cannot represent every int64 exactly, so the converted bounds are `-9223372036854776000` and `9223372036854776000`.
- A named record reused inside a union can convert to an empty schema (`{}`) inside `oneOf`. The fixture from issue 148 covers this case.

### Runtime dependencies

| Package | Role |
|---------|------|
| `avsc` | Validation via `Type.forSchema`, and the `Schema` type |
| `@types/json-schema` | Compile-time `JSONSchema7TypeName` only |
| `@asyncapi/parser` | **peer** — `SchemaParser` types and host registration |

`@asyncapi/parser` does not depend on this package at runtime, and it does not depend on `avsc`. Parser tests depend on this package as a devDependency.

---

## 6. Package layout in the monorepo

```
packages/avro-schema-parser/
├── src/index.ts
├── test/
│   ├── avro-schema-parser.spec.ts   # 45 tests
│   └── documents/                   # Avro and AsyncAPI fixtures
├── package.json
├── tsconfig.json                    # ESM → esm/
├── tsconfig.cjs.json                # CJS → cjs/
├── jest.config.ts
├── README.md
└── CHANGELOG.md
```

Published npm files: `/esm`, `/cjs`, `LICENSE`, `README.md`.

---

## 7. Build, test, lint (local)

From the **parser-js repo root** (Node `>= 18`):

```bash
npm install
npm run avro-parser:build   # builds @asyncapi/parser first, then this package
npm run avro-parser:test    # 45 tests
npm run multi-parser:test   # workspace link from multi-parser
npm run lint                # includes this package on the shared ESLint config
```

`npm test` at the root is `turbo run build && turbo run test`. That is what pull-request CI runs. This package is included because its `package.json` defines `test` and `lint`. The workflow file does not list package names.

### Turbo ordering

- This package builds after `@asyncapi/parser` (TypeScript needs parser `.d.ts`).
- `@asyncapi/multi-parser` builds and tests after this package (it imports it).
- `@asyncapi/parser` tests run after this package's build, because ruleset tests import the CJS entry.

### Jest notes

Dependencies are hoisted to the monorepo root. `jest.config.ts` maps `nimma` and the Spectral bundler under `<rootDir>/../../node_modules/...`. Tests load `@asyncapi/parser` from the built workspace package. Turbo builds the parser before these tests.

---

## 8. Releases and publishing (Changesets)

Published from **`asyncapi/parser-js`** by `.github/workflows/release-with-changesets.yml`. npm trusted publishing for this package is configured for that repository and workflow.

| Before (standalone) | After (monorepo) |
|---------------------|------------------|
| semantic-release on conventional commits | Changesets |
| One package per repo | Independent version bumps per workspace package |

Contributor flow: add a `.changeset/*.md` file, merge, then merge the Version Packages pull request. `prepublishOnly` runs `generate:assets` (build + README table of contents).

`multi-parser` uses workspace `"*"` for this package. `updateInternalDependencies` is `"patch"`.

---

## 9. What this package does not do

- Does not parse Avro binary data. It parses Avro **schemas**.
- Does not register itself when using `@asyncapi/parser` alone.
- Does not change `@asyncapi/parser`'s browser UMD bundle.
- Does not auto-register on documents whose `schemaFormat` has no matching plugin.

---

## 10. History and migration

| When | What |
|------|------|
| Pre-migration | Maintained at [`asyncapi/avro-schema-parser`](https://github.com/asyncapi/avro-schema-parser). Latest installable release `3.0.24` (2024-06-12). |
| Related issues | [avro-schema-parser#315](https://github.com/asyncapi/avro-schema-parser/issues/315), [parser-js#1194](https://github.com/asyncapi/parser-js/issues/1194), [parser-js#1248](https://github.com/asyncapi/parser-js/issues/1248) |
| Consumer impact | Same package name, same `AvroSchemaParser()` + `registerSchemaParser` usage. |
| CODEOWNERS | `@M3lkior` and `@dalelane` own `packages/avro-schema-parser/` only, together with the current parser-js owners. |

### Intentional monorepo adjustments

- `@asyncapi/parser`: dependency → **peerDependency** `^3.6.2`.
- `repository` / `bugs` / `homepage` → `parser-js`.
- Lint uses the shared root ESLint config.
- Jest paths adjusted for hoisted `node_modules` and the workspace parser.
- `multi-parser` and parser tests: npm range → workspace `"*"`.
- Unused `avsc` production dependency removed from `@asyncapi/parser`.
- README: CommonJS samples required the wrong package; validation samples called `validate(doc)` with `doc` undefined; two missing screenshot lines were removed.

---

## 11. Glossary

| Term | Meaning |
|------|---------|
| Schema parser | Plugin implementing `validate` / `parse` / `getMimeTypes` for one schema format |
| schemaFormat | AsyncAPI field naming the MIME type of a schema |
| Monorepo | Single git repo with multiple publishable packages (`packages/*`) |
| Turborepo | Task runner that orders build and test across workspace packages |
| npm workspaces | Symlinks local packages so siblings resolve without publishing first |
| peerDependency | Host library the consumer provides (here: `@asyncapi/parser`) |
| Changesets | Versioning, changelog, and publish workflow used by `parser-js` |

---

## 12. Quick links

| Resource | Path / URL |
|----------|------------|
| Source | `packages/avro-schema-parser/src/index.ts` |
| Tests | `packages/avro-schema-parser/test/` |
| npm README | `packages/avro-schema-parser/README.md` |
| Changesets config | `.changeset/config.json` |
| Release workflow | `.github/workflows/release-with-changesets.yml` |
| PR test workflow | `.github/workflows/if-nodejs-pr-testing.yml` (`npm test`, all workspace packages) |
| Previous repository | https://github.com/asyncapi/avro-schema-parser |
