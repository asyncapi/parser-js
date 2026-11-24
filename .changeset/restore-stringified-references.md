---
"@asyncapi/parser": patch
---

Restore shared and circular references in the parsed document when unstringifying JSON strings, and resolve root references to the returned document.
