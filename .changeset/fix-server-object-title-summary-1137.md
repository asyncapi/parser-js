---
"@asyncapi/parser": patch
---

fix(parser): add missing `title` and `summary` fields to v3 ServerObject type

AsyncAPI 3.0 spec allows `title` and `summary` on the Server Object (see
https://www.asyncapi.com/docs/reference/specification/v3.0.0#serverObject),
but the parser's TypeScript types omitted them. This meant users could not
type-safely access `server.title` / `server.summary` even though the
runtime model methods (`server.title()`, `server.hasTitle()`, etc.,
provided by `CoreModel`) already supported them.

Fixes #1137
