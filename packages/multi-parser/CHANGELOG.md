# @asyncapi/multi-parser

## 2.4.0

### Minor Changes

- 009aedc: Move `@asyncapi/raml-dt-schema-parser` from a required dependency to an optional peer dependency. The upstream parser was archived on 2025-08-04 and its transitive chain pulled in unmaintained packages with several CVEs.

  Consumers who do not need RAML schema parsing get a smaller install footprint with the archived chain removed. Consumers who do need it must declare `@asyncapi/raml-dt-schema-parser` themselves; the runtime registration in `NewParser(..., { includeSchemaParsers: true })` then behaves exactly as before.

### Patch Changes

- Updated dependencies [47adf7f]
- Updated dependencies [03462ae]
- Updated dependencies [45859d6]
  - @asyncapi/parser@3.6.1

## 2.3.0

### Minor Changes

- d90ab14: Release AsyncAPI 3.1 support that adds ROS 2 binding.

### Patch Changes

- Updated dependencies [d90ab14]
  - @asyncapi/parser@3.6.0

## 2.2.0

### Minor Changes

- e18f865: Updating jsonpath-plus dependency to mitigate CVE-2024-21534

### Patch Changes

- Updated dependencies [e18f865]
  - @asyncapi/parser@3.4.0

## 2.1.1

### Patch Changes

- 657fa8e: Updated the method of importing the parser in the Nunjucks filter. Standardized the import of different parser functions.

## 2.1.0

### Minor Changes

- 4556aec: Adding the Multiparser into monorepo (Turborepo). No new features or bugfixes were introduced.
