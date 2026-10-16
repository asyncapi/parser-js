---
"@asyncapi/parser": patch
"@asyncapi/multi-parser": patch
"@asyncapi/openapi-schema-parser": patch
---

Ship the Apache-2.0 `LICENSE` and the `NOTICE` file inside the published tarballs, and add the repository
README to the two packages that had none. `LICENSE` and `README.md` were already listed in each package's
`files` array, but those entries resolve inside `packages/<pkg>/`, where neither file exists.
