---
'@asyncapi/openapi-schema-parser': patch
---

Clone the input schema before applying transformations so that documents referencing the same OpenAPI 3.0 schema from more than one place — across messages, or twice inside a single message — parse without a spurious `InvalidTypeError` (fixes #1249)
