---
'@asyncapi/openapi-schema-parser': patch
---

Clone the input schema before applying transformations so that documents referencing the same OpenAPI 3.0 schema from multiple messages parse without a spurious `InvalidTypeError` (fixes #1249)
