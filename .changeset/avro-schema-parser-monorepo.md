---
"@asyncapi/avro-schema-parser": minor
"@asyncapi/parser": patch
---

Move `@asyncapi/avro-schema-parser` into the `parser-js` monorepo. Same public API (`AvroSchemaParser()` and `registerSchemaParser`). Published as 3.1.0 because 3.0.25 and 3.0.26 were already used on npm and cannot be republished. Remove the unused `avsc` dependency from `@asyncapi/parser`. Avro support stays in `@asyncapi/avro-schema-parser`.
