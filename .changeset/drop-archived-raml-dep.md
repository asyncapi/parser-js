---
"@asyncapi/multi-parser": minor
---

Move `@asyncapi/raml-dt-schema-parser` from a required dependency to an optional peer dependency. The upstream parser was archived on 2025-08-04 and its transitive chain pulled in unmaintained packages with several CVEs.

Consumers who do not need RAML schema parsing get a smaller install footprint with the archived chain removed. Consumers who do need it must declare `@asyncapi/raml-dt-schema-parser` themselves; the runtime registration in `NewParser(..., { includeSchemaParsers: true })` then behaves exactly as before.
