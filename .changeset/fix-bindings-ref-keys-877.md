---
"@asyncapi/parser": patch
---

fix(parser): filter out `$ref` keys in `bindings()` to prevent undefined parser output

When a v2 or v3 AsyncAPI message/server/channel/operation has a `bindings`
field containing a `$ref` (e.g. `{"$ref": "#/components/messageBindings/kafka"}`),
the parser would iterate over `bindings` and treat `$ref` as a protocol name,
causing the `bindings()` method on the corresponding model to throw or
return `undefined`, and the whole document parse to fail.

This was reported in #877 (also part of the [MICROGRANT 2026-06 #1167](https://github.com/asyncapi/parser-js/issues/1167)
aggregated issue). The fix filters out any key starting with `$` before
processing binding entries.

Fixes #877
