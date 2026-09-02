---
"@asyncapi/multi-parser": major
---

Drop support for Parser API v1 and v2.

Both were implemented via aliased dependencies on unmaintained, frozen releases (`@asyncapi/parser@2.1.0` for v1, `@asyncapi/parser@3.0.0-next-major-spec.8` for v2), both of which depend on the vulnerable `jsonpath-plus@^7.2.0` and will never receive a security patch (see #1065). `NewParser()` and `ConvertDocumentParserAPIVersion()` now throw a clear error when v1 or v2 is requested, directing callers to migrate to Parser API v3, which already depends on the patched `jsonpath-plus@^10.0.7`.

This supersedes #1086, which attempted to fix the same vulnerability by forcing `jsonpath-plus` to a newer version inside the old v1/v2 dependency trees via npm `overrides`. That approach left those unmaintained codebases running against a jsonpath-plus major version they were never tested against, which caused CI to hang.
