---
"@asyncapi/parser": patch
---

feat(ruleset): add v3 channel-parameters validation rule that flags channels defining a `parameters` object while the `address` either has no placeholders or is `null`/empty, mirroring the existing v2 rule.
