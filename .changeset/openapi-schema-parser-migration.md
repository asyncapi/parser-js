---
"@asyncapi/openapi-schema-parser": patch
---

Migrate `@asyncapi/openapi-schema-parser` into the `parser-js` monorepo under `packages/openapi-schema-parser`. This is a source-location change only: the package is still published as `@asyncapi/openapi-schema-parser` with the same public API (`OpenAPISchemaParser()` + `registerSchemaParser`). No changes are required for consumers.
