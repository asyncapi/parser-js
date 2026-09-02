---
"@asyncapi/parser": patch
---

fix(parser): trigger custom parsers on operation.channel.messages.*.payload and headers

When a v3 AsyncAPI operation references its channel via `$ref` to an external file,
the messages and their payload/headers reach the parser through the path
`$.operations.*.channel.messages.*.payload` (or `headers`). This path was missing
from `customSchemasPathsV3`, so non-default schema parsers were silently skipped for
these schemas, causing downstream tools such as `@asyncapi/react-component` to fail
to render them.
