# @asyncapi/openapi-schema-parser

## 3.1.0

### Minor Changes

- 02f2228: Publish a new release from the `parser-js` monorepo. Version `3.0.25` / `3.0.26` cannot be republished on npm (previously used), so this bumps to the next minor (`3.1.0`).

## 3.0.25

### Patch Changes

- ed5a42b: Migrate `@asyncapi/openapi-schema-parser` into the `parser-js` monorepo under `packages/openapi-schema-parser`. This is a source-location change only: the package is still published as `@asyncapi/openapi-schema-parser` with the same public API (`OpenAPISchemaParser()` + `registerSchemaParser`). No changes are required for consumers.
- Updated dependencies [03d869c]
  - @asyncapi/parser@3.6.2
