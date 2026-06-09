---
"@asyncapi/parser": minor
---

Add `throwOnError` option to `parse()` to surface validation errors as thrown exceptions instead of returning them in the result. Defaults to `false` to preserve backward compatibility. When set to `true`, validation errors are thrown synchronously from `parse()`, and `parseAndValidate()` rethrows the same error rather than just attaching it to the result.
