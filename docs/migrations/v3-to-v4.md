# Migrating from v3 to v4

This guide will help you migrate your code from parser-js v3.x to v4.x.

## Breaking Changes

### File System Operations

The only change in v4 is the separation of file system operations into a dedicated module. This change was made to improve compatibility with browser environments where file system operations are not available.

#### Before (v3)

```typescript
import { Parser, fromFile, fromURL } from '@asyncapi/parser';

// Read from file
const { document } = await fromFile(parser, './asyncapi.yaml').parse();
```

#### After (v4)

```typescript
import { Parser, fromURL } from '@asyncapi/parser';
import { fromFile } from '@asyncapi/parser/from-file';

// Read from file
const { document } = await fromFile(parser, './asyncapi.yaml').parse();
```

In v4, the `fromFile` function has been moved to its own module to avoid including Node.js file system dependencies in browser bundles. This change prevents errors related to missing Node.js modules.

### File System Implementation

The implementation of `fromFile` has been updated to use the modern Node.js file system promises API:

- v3: Used `fs.readFile` with `util.promisify`
- v4: Uses `fs/promises` with native promise support via `node:fs/promises`

## Recommended Migration Steps

1. Update your imports to use the new module path for `fromFile`:
   ```typescript
   // Change this
   import { fromFile } from '@asyncapi/parser';
   
   // To this
   import { fromFile } from '@asyncapi/parser/from-file';
   ```

2. Keep using `fromURL` as before, as it remains in the main bundle:
   ```typescript
   import { fromURL } from '@asyncapi/parser';
   ```

3. If you've created custom source providers based on the internal implementation of `fromFile` or `fromURL`, review the new implementation to ensure compatibility.

4. Review your bundling configuration for browser applications to ensure it correctly handles the new module structure.

## Browser Usage

For browser environments, the separation of file system operations means no compatibility issues where you have to mock Node.js modules. No changes are required for browser-specific imports since file system operations weren't available in the browser anyway.

## Benefits of This Migration

- **Better browser compatibility**: No unnecessary Node.js dependencies
- **Modern Node.js API usage**: Leveraging the native promise-based file system API
- **Clearer separation of concerns**: Browser-specific functionality is kept separate from Node.js-specific functionality

If you encounter any issues during migration, please [open an issue](https://github.com/asyncapi/parser-js/issues/new) on the parser-js repository.
