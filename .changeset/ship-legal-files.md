---
"@asyncapi/parser": patch
"@asyncapi/multi-parser": patch
"@asyncapi/openapi-schema-parser": patch
---

Ship LICENSE, NOTICE and README.md inside the published tarballs. All three were already listed in each
package's `files` array, but those entries resolve inside `packages/<pkg>/` where the files do not exist,
so npm packed none of them.
