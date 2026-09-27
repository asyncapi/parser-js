# @asyncapi/parser

## 3.6.3

### Patch Changes

- 76eaf49: fix: allow unknown custom schema formats with a warning instead of an error

## 3.6.2

### Patch Changes

- 03d869c: fix: support native array methods on collections

## 3.6.1

### Patch Changes

- 47adf7f: fix: filter out $ref keys in bindings() to prevent undefined parser output
- 03462ae: fix: validate v3 channel parameters against address placeholders
- 45859d6: feat: add support for title and summary for the v3 spec

## 3.6.0

### Minor Changes

- d90ab14: Release AsyncAPI 3.1 support that adds ROS 2 binding.

## 3.5.0

### Minor Changes

- 6d06dd4: - update `@asyncapi/specs` to latest version with new ROS 2 binding
  - create the rule `asyncapi3-channel-servers` for the v3 rule core ruleset

## 3.4.0

### Minor Changes

- e18f865: Updating jsonpath-plus dependency to mitigate CVE-2024-21534

## 3.3.0

### Minor Changes

- bebbd39: feat: create rule `asyncapi3-channel-no-query-nor-fragment` for v3 core ruleset

## 3.2.2

### Patch Changes

- b700a65: fix: remove forceful normalization of YAML to JSON

## 3.2.1

### Patch Changes

- b032f3a: fix: upgrade `ajv` to version `8.17.1` to lay the foundation for fixing https://github.com/asyncapi/parser-js/issues/980 in `Studio`

## 3.2.0

### Minor Changes

- 44331ee: Adding the parser into monorepo (Turborepo). No new features or bugfixes were introduced.

## 3.1.0

### Minor Changes

- b2a0f54: Turning Parser-JS into monorepo by integrating Turborepo. No new features or bugfixes were introduced.
