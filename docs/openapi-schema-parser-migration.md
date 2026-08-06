# Migrating openapi-schema-parser into parser-js: A Complete Beginner's Guide

This document explains everything you need to understand about the migration of `@asyncapi/openapi-schema-parser` into the `parser-js` repository. It starts from zero — covering what a monorepo is, what `peerDependency` means, and why we made each specific decision — and works up to a full explanation of every file we changed and how to test the result locally.

> **Status: DONE and verified locally.** The package now lives at `packages/openapi-schema-parser/`, is wired into npm workspaces + Turborepo, and `multi-parser` consumes the workspace copy. Verified on this branch:
> - `npm run openapi-parser:build` — parser builds first, then this package's ESM + CJS. Success.
> - `npm run openapi-parser:test` — **7/7 tests pass** (94% statement coverage).
> - `npm run multi-parser:test` — **16/16 tests pass** against the workspace copy of this package.
> - `npm run build` — all 3 packages build together. `npm run lint` (this package) — clean.
> - `npx changeset status` — detects `@asyncapi/openapi-schema-parser` for a patch bump.
>
> This document doubles as the package **spec** (source of truth + AI context) requested in [issue #326](https://github.com/asyncapi/openapi-schema-parser/issues/326).

---

## Table of Contents

1. [What Problem Are We Solving?](#1-what-problem-are-we-solving)
2. [What Is a Monorepo?](#2-what-is-a-monorepo)
3. [How npm Workspaces Power the Monorepo](#3-how-npm-workspaces-power-the-monorepo)
4. [What Is Turborepo and Why Is It Here?](#4-what-is-turborepo-and-why-is-it-here)
5. [Understanding Multiple package.json Files](#5-understanding-multiple-packagejson-files)
6. [What Is a peerDependency (and Why We Used It)](#6-what-is-a-peerdependency-and-why-we-used-it)
7. [Overview of the Two Repositories Before Migration](#7-overview-of-the-two-repositories-before-migration)
8. [Every File We Changed or Created](#8-every-file-we-changed-or-created)
9. [How Releases Work After Migration](#9-how-releases-work-after-migration)
10. [How to Test the Changes Locally](#10-how-to-test-the-changes-locally)
11. [Known Gap: bump.yml and Changesets](#11-known-gap-bumpyml-and-changesets)
12. [Quick Reference Cheat Sheet](#12-quick-reference-cheat-sheet)

---

## 1. What Problem Are We Solving?

The AsyncAPI project has two related packages:

- **`@asyncapi/parser`** — the main library that reads and validates AsyncAPI documents. Lives in the `parser-js` repository.
- **`@asyncapi/openapi-schema-parser`** — a plugin that teaches the parser how to understand OpenAPI schemas inside AsyncAPI documents. Used to live in its own separate `openapi-schema-parser` repository.

The problem: the `openapi-schema-parser` repository had **no active maintainer**. Nobody was reviewing pull requests, fixing bugs, or cutting new releases. Keeping it as a separate repository made it:

- Harder to fix bugs that span both packages (you had to open two separate PRs in two separate repos)
- Harder to keep in sync with the main parser's API changes
- Harder for the community to contribute (they had to find and navigate two different repos)

**The solution:** move `openapi-schema-parser` inside `parser-js` as a new package within the existing monorepo. One repo, one CI, one place to contribute.

---

## 2. What Is a Monorepo?

A **monorepo** (short for "monolithic repository") is a single Git repository that contains the source code for **multiple distinct packages or projects**.

Think of it like a company office building. Instead of every team having their own separate building across the city, everyone works in the same building. They still have their own floors (packages), their own desks (source code), and their own rules (each package's own config), but they share the lobby, elevator, cafeteria, and security (shared tooling, CI, scripts).

### Single-repo vs Monorepo — a comparison

| Aspect | Single Package Repo | Monorepo |
|---|---|---|
| Number of repos | One repo per package | One repo, many packages |
| Cross-package changes | Requires PRs in multiple repos | One PR touches all related packages |
| Shared tooling | Each repo configures its own tools | Tools configured once at root |
| Release coordination | Manual coordination | Tooling handles it automatically |
| Discoverability | Contributors must find each repo | Everything is in one place |

### What parser-js's monorepo looks like

```
parser-js/                          ← the single Git repository
├── packages/
│   ├── parser/                     ← @asyncapi/parser  (package 1)
│   ├── multi-parser/               ← @asyncapi/multi-parser  (package 2)
│   └── openapi-schema-parser/      ← @asyncapi/openapi-schema-parser  (package 3 — NEW)
├── package.json                    ← root config (NOT published to npm)
├── turbo.json                      ← Turborepo pipeline config
└── .github/workflows/              ← shared CI for all packages
```

Each package under `packages/` is independently publishable to npm with its own name and version. But they all share the same Git history, CI pipelines, and root tooling.

---

## 3. How npm Workspaces Power the Monorepo

### The problem npm workspaces solves

Imagine you have two packages in the same repo, and package B depends on package A. Without workspaces:

- You would have to publish package A to npm first
- Then `npm install @asyncapi/package-a` in package B
- Then test package B
- If you changed package A, repeat from step 1

This is painfully slow. **npm workspaces** solve this by letting package B point directly to the local copy of package A on your computer, skipping npm entirely during development.

### How it is configured

The root `package.json` declares which folders are workspaces:

```json
// parser-js/package.json
{
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
```

This tells npm: "Any folder inside `packages/` is a workspace package. Link them all together."

When you run `npm install` at the root, npm:

1. Reads every `packages/*/package.json` to discover all workspace packages
2. Installs all their dependencies into a single shared `node_modules/` folder at the root (this is called **hoisting**)
3. Creates symlinks so that when `multi-parser` imports `@asyncapi/openapi-schema-parser`, Node.js follows the symlink to `packages/openapi-schema-parser/` on disk instead of downloading from npm

You can verify this happened after running `npm install`:

```bash
ls -la node_modules/@asyncapi/openapi-schema-parser
# → this is a symlink pointing to ../../packages/openapi-schema-parser
```

### Why hoisting matters for our jest.config.ts

Because all dependencies land in the **root** `node_modules/`, when a package inside `packages/openapi-schema-parser/` runs its tests, and those tests need a library like `nimma`, Node.js looks for it two levels up:

```
packages/openapi-schema-parser/  ← <rootDir> in Jest
  ../..                          ← go up 2 levels
    node_modules/nimma/          ← found here (hoisted to root)
```

That is why the `jest.config.ts` for the new package uses `<rootDir>/../../node_modules/...` instead of `<rootDir>/node_modules/...` (which was correct in the old standalone repo where `node_modules` was right next to the source).

---

## 4. What Is Turborepo and Why Is It Here?

### The problem Turborepo solves

When you have three packages and run `npm test` at the root, you want to test all three. But there is a catch: `@asyncapi/openapi-schema-parser` **imports** `@asyncapi/parser`. If you run the tests before building `@asyncapi/parser`, the test will fail because there is nothing to import.

You need to run tasks in the right **order**, respecting dependencies. For three packages this sounds easy. For a large monorepo with dozens of packages it becomes a complex graph problem.

**Turborepo** is a task runner designed specifically for this. It reads a `turbo.json` config that describes which tasks depend on other tasks, then runs them in the correct order — and in parallel where possible.

### The turbo.json file explained

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "@asyncapi/parser#build": { "cache": false },

    "build": {
      "cache": false,
      "dependsOn": ["@asyncapi/parser#build"]
    },

    "test": {
      "cache": false,
      "dependsOn": ["@asyncapi/parser#build"]
    },

    "openapi-schema-parser:build": {
      "cache": false,
      "dependsOn": ["@asyncapi/parser#build"]
    }
  }
}
```

Reading this in plain English:

- **`@asyncapi/parser#build`** — this is a special named task: "build just the parser package". Run it with no prerequisites.
- **`build`** (the generic task for all packages) — before running `build` in any package, first make sure `@asyncapi/parser` is built. This prevents `openapi-schema-parser` from being compiled before `@asyncapi/parser` is ready.
- **`test`** — same rule: always build `@asyncapi/parser` first, then run tests across all packages.
- **`openapi-schema-parser:build`** — a named shortcut task specifically for building only `openapi-schema-parser`.

### The `cache: false` setting

Turborepo can cache task results and skip re-running them if inputs haven't changed. This is set to `false` everywhere in this project, meaning it always re-runs. This is a deliberate choice — the AsyncAPI team wants to guarantee fresh results and avoid stale cache confusion.

---

## 5. Understanding Multiple package.json Files

This is often the most confusing part of a monorepo for newcomers. There are **four** `package.json` files in this repo now. Here is what each one does:

### 5.1 Root `package.json` — the monorepo orchestrator

```
parser-js/package.json
```

This is **not published to npm**. It is the control center for the whole monorepo. Notice:

```json
{
  "name": "parser-js",
  "private": true,         ← "private: true" means npm will NEVER publish this
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "test": "turbo run build && turbo run test",
    "build": "turbo run build",
    "openapi-parser:build": "turbo run build --filter=@asyncapi/openapi-schema-parser",
    "openapi-parser:test":  "turbo run test  --filter=@asyncapi/openapi-schema-parser"
  },
  "devDependencies": {
    "turbo": "1.13.3"       ← only Turborepo itself lives here
  }
}
```

When you run `npm test` here, Turborepo runs tests in all packages in the correct order. When you run `npm run openapi-parser:test`, Turborepo runs tests only in the `openapi-schema-parser` package (and its prerequisite, `@asyncapi/parser#build`).

The `--filter=@asyncapi/openapi-schema-parser` flag tells Turborepo: "Only run this task for this one package."

### 5.2 `packages/parser/package.json` — the main parser

```
packages/parser/package.json
```

This **is published** to npm as `@asyncapi/parser`. It defines the package name, version, dependencies, and build/test scripts specific to the main parser. It does not know or care about `openapi-schema-parser`.

### 5.3 `packages/multi-parser/package.json` — the multi-version parser

```
packages/multi-parser/package.json
```

This **is published** to npm as `@asyncapi/multi-parser`. Its job is to support multiple Parser-API versions. It depends on (and bundles) all four external schema parsers including `@asyncapi/openapi-schema-parser`. After our migration, this dependency was updated from pointing to npm (`"^3.0.4"`) to pointing to the workspace (`"*"`):

```json
// Before migration
"@asyncapi/openapi-schema-parser": "^3.0.4"

// After migration
"@asyncapi/openapi-schema-parser": "*"
```

The `"*"` version range in a workspace environment is special: npm knows this package lives locally as a workspace member and resolves it to `packages/openapi-schema-parser/` on disk.

### 5.4 `packages/openapi-schema-parser/package.json` — the new package (NEW)

```
packages/openapi-schema-parser/package.json
```

This **is published** to npm as `@asyncapi/openapi-schema-parser`. This is the new file we created during migration. Key points explained in the next section.

---

## 6. What Is a peerDependency (and Why We Used It)

This is one of the most important concepts to understand. npm has three types of dependency declarations in a `package.json`. Let us go through all three.

### 6.1 `dependencies` — "I need this to work; install it for me"

```json
"dependencies": {
  "ajv": "^8.11.0"
}
```

When someone installs your package (`npm install @asyncapi/openapi-schema-parser`), npm **automatically installs** `ajv` as well. Your package controls which version of `ajv` it gets. The consumer does not need to think about it.

**Good for:** Libraries that you fully own and that only you use. In our case `ajv`, `ajv-formats`, `ajv-errors`, and `@openapi-contrib/openapi-schema-to-json-schema` stay as regular dependencies because they are internal implementation details — consumers do not need to know about them.

### 6.2 `devDependencies` — "I need this only to build/test myself"

```json
"devDependencies": {
  "jest": "^29.2.1",
  "typescript": "^4.8.4"
}
```

These are tools you use during development. When someone installs your package, npm does **not** install devDependencies. For example, consumers of `@asyncapi/openapi-schema-parser` do not need Jest — that is only needed to run the package's own tests.

### 6.3 `peerDependencies` — "I need this, but you must provide it"

```json
"peerDependencies": {
  "@asyncapi/parser": "^3.0.0"
}
```

This is a promise to the consumer: "My package works together with `@asyncapi/parser`. You must have it installed. I will not install my own copy — I will use yours."

### Why the original `openapi-schema-parser` used a regular `dependency`

When `openapi-schema-parser` lived in its own separate repository, it made sense to declare `@asyncapi/parser` as a regular dependency. The package was installed by consumers who might not already have `@asyncapi/parser` installed. NPM would automatically pull it in.

### Why we changed it to a `peerDependency` in the monorepo

There are two strong reasons:

**Reason 1: No duplicate installs in the monorepo**

In the monorepo, `@asyncapi/parser` is already a workspace sibling. If `openapi-schema-parser` declared it as a regular dependency, npm could potentially install **two separate copies** of `@asyncapi/parser` — one from npm for `openapi-schema-parser`, and one as the workspace package. Two copies of a library that registers parsers globally can cause silent, hard-to-debug bugs.

A `peerDependency` says "I do not install my own copy; I rely on the one the consumer has." Since all workspace packages share the root `node_modules`, there is always exactly one copy.

**Reason 2: Plugin/host architecture**

`openapi-schema-parser` is a **plugin** for `@asyncapi/parser`. It extends the parser's capabilities. In the npm ecosystem, the conventional pattern for plugins is:

- The **host** (`@asyncapi/parser`) is a `peerDependency` of the **plugin** (`openapi-schema-parser`)
- Consumers install both manually
- The plugin uses whatever version of the host the consumer has installed

Examples of this pattern everywhere: `eslint-plugin-*` packages list `eslint` as a peer. React component libraries list `react` as a peer. This pattern guarantees that there is only ever one instance of the host library at runtime.

### What are the trade-offs?

| | `dependency` | `peerDependency` |
|---|---|---|
| Who installs it? | npm installs it automatically | Consumer must install it |
| Risk of duplicates? | Yes, two copies possible | No, always one copy |
| Semantic meaning | "I own this dependency" | "I plug into this host" |
| Good for? | Internal implementation libraries | Plugins, extensions, adapters |
| Consumer experience | Automatic, zero config | Must install both packages |

For `openapi-schema-parser` specifically: every single consumer who uses it **already has** `@asyncapi/parser` installed — you cannot use the schema parser without the main parser. So changing to `peerDependency` costs the consumer nothing extra and eliminates the duplicate-copy risk.

---

## 7. Overview of the Two Repositories Before Migration

### `openapi-schema-parser` (old standalone repo)

```
openapi-schema-parser/
├── src/
│   ├── index.ts           ← the parser plugin implementation
│   └── json-schema-v3.ts  ← embedded OpenAPI 3.0 JSON Schema (used by AJV for validation)
├── test/
│   ├── parser.spec.ts     ← all tests
│   └── documents/         ← 4 fixture files (valid/invalid JSON and YAML)
├── package.json           ← single package config
├── tsconfig.json          ← TypeScript config for ESM output
├── tsconfig.cjs.json      ← TypeScript config for CJS output
├── jest.config.ts         ← Jest test config
└── .github/workflows/     ← its own CI workflows
    ├── if-nodejs-pr-testing.yml   ← runs tests on every PR
    └── if-nodejs-release.yml     ← publishes to npm on merge to master (semantic-release)
```

**How it published releases:** semantic-release. When you merged a commit with the message `feat:` or `fix:`, semantic-release automatically determined the new version, updated `package.json`, published to npm, and created a GitHub release. Fully automatic, zero manual steps.

### `parser-js` (monorepo)

```
parser-js/
├── packages/
│   ├── parser/             ← @asyncapi/parser
│   └── multi-parser/       ← @asyncapi/multi-parser
├── package.json            ← root monorepo config
├── turbo.json              ← Turborepo pipelines
├── .changeset/             ← Changesets config
└── .github/workflows/
    ├── if-nodejs-pr-testing.yml      ← tests on PRs
    └── release-with-changesets.yml   ← releases via Changesets
```

**How it publishes releases:** Changesets. This is fundamentally different from semantic-release. Instead of analyzing commit messages automatically, contributors manually create a small "changeset" file describing what changed and whether it is a patch/minor/major bump. A bot then opens a "Version Packages" PR that, when merged, publishes to npm.

---

## 8. Every File We Changed or Created

### 8.1 NEW: `packages/openapi-schema-parser/` (entire directory)

This entire directory is new. Here is what each file does:

#### `src/index.ts` — the plugin implementation

This file was copied unchanged from the old repo. It exports one function:

```typescript
export function OpenAPISchemaParser(): SchemaParser {
  return { validate, parse, getMimeTypes };
}
```

- **`getMimeTypes()`** — returns the list of MIME types this parser handles, e.g. `application/vnd.oai.openapi;version=3.0.0`. When a user marks a payload with this MIME type in their AsyncAPI document, the main parser knows to call this plugin.
- **`validate()`** — uses AJV (a JSON Schema validator) to check that the OpenAPI schema is structurally valid before trying to parse it.
- **`parse()`** — converts an OpenAPI schema to a JSON Schema (which the main parser understands internally). OpenAPI schemas are similar to JSON Schema but have some differences (e.g. `nullable: true` instead of `type: ["string", "null"]`).

#### `src/json-schema-v3.ts` — the OpenAPI 3 meta-schema

This is a large TypeScript object that describes what a valid OpenAPI 3.0 schema looks like (its "meta-schema"). It is used by AJV in `validate()` to check incoming schemas. This file was copied unchanged.

#### `test/parser.spec.ts` — all 7 tests

Copied unchanged from the old repo. The tests cover:
- That `getMimeTypes()` returns a non-empty array
- That a valid OpenAPI schema is parsed correctly into JSON Schema format
- That a valid OpenAPI schema passes AJV validation
- That an invalid OpenAPI schema returns the correct AJV validation errors
- Integration tests through the full `@asyncapi/parser` pipeline (parse + validate a complete AsyncAPI document)

#### `test/documents/` — 4 fixture files

These are example documents used in tests:
- `valid.json` — a valid OpenAPI 3 schema payload
- `invalid.json` — an invalid OpenAPI 3 schema payload (wrong types, missing fields)
- `valid-asyncapi.yaml` — a complete AsyncAPI document using a valid OpenAPI payload
- `invalid-asyncapi.yaml` — a complete AsyncAPI document using an invalid OpenAPI payload

#### `package.json` — the new package manifest

Key sections explained:

```json
{
  "name": "@asyncapi/openapi-schema-parser",
  "version": "3.0.24",
  "private": false,
  "bugs": {
    "url": "https://github.com/asyncapi/parser-js/issues"
  },
  "repository": {
    "url": "git://github.com/asyncapi/parser-js.git"
  }
}
```
The `bugs` and `repository` URLs now point to `parser-js` instead of the old repo. If a user finds a bug and clicks "Report a bug" on npm, they land in the right place.

```json
  "main": "cjs/index.js",
  "module": "esm/index.js",
  "types": "esm/index.d.ts",
  "files": ["/esm", "/cjs", "LICENSE", "README.md"]
```
The package ships two builds: `cjs/` (CommonJS, for Node.js `require()`) and `esm/` (ES Modules, for `import`). TypeScript types come from the ESM build. The `files` field ensures only these output folders are included in the npm tarball — not source code, tests, or configs.

```json
  "scripts": {
    "build": "npm run build:esm && npm run build:cjs",
    "build:esm": "tsc",
    "build:cjs": "tsc --project ./tsconfig.cjs.json",
    "test": "npm run test:unit",
    "test:unit": "cross-env CI=true jest --coverage",
    "lint": "eslint --max-warnings 0 --config ../../.eslintrc --ignore-path ../../.eslintignore .",
    "generate:assets": "npm run build && npm run generate:readme:toc",
    "prepublishOnly": "npm run generate:assets"
  }
```
- `build:esm` — runs `tsc` which compiles TypeScript → JavaScript with ES Module format (output goes to `esm/`)
- `build:cjs` — runs `tsc` again but using `tsconfig.cjs.json` which overrides the module format to CommonJS (output goes to `cjs/`)
- `lint` — the linter config now points to `../../.eslintrc` (the root-level ESLint config, two folders up from `packages/openapi-schema-parser/`) instead of the local `.eslintrc` that existed in the old repo
- `prepublishOnly` — npm runs this automatically before publishing. It builds the package and regenerates the README table of contents.

```json
  "dependencies": {
    "@openapi-contrib/openapi-schema-to-json-schema": "~3.2.0",
    "ajv": "^8.11.0",
    "ajv-errors": "^3.0.0",
    "ajv-formats": "^2.1.1"
  },
  "peerDependencies": {
    "@asyncapi/parser": "^3.0.0"
  }
```
`@asyncapi/parser` moved from `dependencies` to `peerDependencies` (see Section 6 for the full explanation). The four other libraries stay as regular dependencies because they are internal implementation details consumers never interact with directly.

#### `tsconfig.json` — ESM TypeScript build config

```json
{
  "compilerOptions": {
    "outDir": "./esm",
    "target": "es6",
    "module": "esnext",
    "declaration": true,
    "moduleResolution": "node",
    "strict": true
  },
  "include": ["src"]
}
```
Tells TypeScript: compile everything in `src/` into `esm/` using ES Module format. `declaration: true` generates `.d.ts` type definition files alongside the JavaScript output.

#### `tsconfig.cjs.json` — CJS TypeScript build config

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "commonjs",
    "outDir": "./cjs"
  }
}
```
Inherits everything from `tsconfig.json` but overrides two things: use CommonJS module format, output to `cjs/`. The `extends` keyword means we do not repeat the 15 other options.

#### `jest.config.ts` — adjusted test configuration

This is where the most important monorepo adjustment happened:

```typescript
// OLD (standalone repo)
moduleNameMapper: {
  '^nimma/legacy$': '<rootDir>/node_modules/nimma/dist/legacy/cjs/index.js',
  '^nimma/(.*)':    '<rootDir>/node_modules/nimma/dist/cjs/$1',
  ...
}

// NEW (inside monorepo — dependencies are hoisted to root)
moduleNameMapper: {
  '^nimma/legacy$': '<rootDir>/../../node_modules/nimma/dist/legacy/cjs/index.js',
  '^nimma/(.*)':    '<rootDir>/../../node_modules/nimma/dist/cjs/$1',
  '^@asyncapi/parser$': path.resolve(__dirname, '../parser'),
}
```

**Why `../../`?** In the standalone repo, `<rootDir>` (the package root) was right next to `node_modules`. In the monorepo, the package root is `packages/openapi-schema-parser/` and `node_modules` are hoisted to the monorepo root, two folders up.

**Why the new `@asyncapi/parser` mapper?** When Jest runs the tests and they `import { Parser } from '@asyncapi/parser'`, Jest needs to know where to find it. Without the mapper, it would look in `node_modules/@asyncapi/parser` — which is a symlink to `packages/parser/` but Jest would find only compiled output there. By mapping it to `path.resolve(__dirname, '../parser')`, Jest resolves it to `packages/parser/` (the TypeScript source) directly, matching how `packages/multi-parser/` does it.

#### `CHANGELOG.md` — release history

Seeded with an initial entry documenting the migration. From this point forward, Changesets manages this file automatically — every time a "Version Packages" PR is merged, Changesets appends the new version's changes here.

#### `README.md` — user-facing documentation

Updated with a note that this package is now maintained inside `parser-js`. The npm page for `@asyncapi/openapi-schema-parser` will show this README, so users landing there know where to file issues.

---

### 8.2 CHANGED: `turbo.json`

```json
// Added package-scoped build/test ordering:
"@asyncapi/parser#build": { "cache": false },
"@asyncapi/openapi-schema-parser#build": {
  "cache": false,
  "dependsOn": ["@asyncapi/parser#build"]
},
"@asyncapi/multi-parser#build": {
  "cache": false,
  "dependsOn": ["@asyncapi/parser#build", "@asyncapi/openapi-schema-parser#build"]
},
"@asyncapi/multi-parser#test": {
  "cache": false,
  "dependsOn": ["@asyncapi/parser#build", "@asyncapi/openapi-schema-parser#build"]
}
```

This declares the real build order using Turbo's `@scope/name#task` selector syntax:

- `openapi-schema-parser` builds after `parser` (it imports the parser's types during compilation).
- `multi-parser` builds/tests after **both** `parser` and `openapi-schema-parser`, because `multi-parser`'s `tsc` needs the `.d.ts` declarations that `openapi-schema-parser`'s build emits.

**Why this matters (a real bug we hit):** the generic `build` task only declared `dependsOn: ["@asyncapi/parser#build"]`, so Turbo was free to build `multi-parser` and `openapi-schema-parser` **in parallel**. On a clean machine (like CI), `multi-parser`'s `tsc` could start before `openapi-schema-parser` had emitted its declarations, failing with:

```
src/parse.ts: error TS2307: Cannot find module '@asyncapi/openapi-schema-parser' or its corresponding type declarations.
```

It only "worked" locally when the declarations happened to be left over from a previous build. Also note: keys like `"openapi-schema-parser:build"` (with a colon) are **not** valid Turbo task selectors — Turbo uses `@scope/name#task` (with a `#`), so colon-style keys are silently ignored. The fix above uses the correct `#` syntax and makes the ordering explicit.

---

### 8.3 CHANGED: Root `package.json`

```json
// Added three shortcut scripts:
"openapi-parser:build":     "turbo run build     --filter=@asyncapi/openapi-schema-parser",
"openapi-parser:test":      "turbo run test      --filter=@asyncapi/openapi-schema-parser",
"openapi-parser:test:unit": "turbo run test:unit --filter=@asyncapi/openapi-schema-parser"
```

These are convenience commands you can run from the monorepo root without having to `cd` into the package directory. The `--filter` flag tells Turborepo to only run the task for one specific package.

---

### 8.4 CHANGED: `packages/multi-parser/package.json`

```json
// Before:
"@asyncapi/openapi-schema-parser": "^3.0.4"

// After:
"@asyncapi/openapi-schema-parser": "*"
```

The `"*"` version range in a workspace context means "use whatever version lives in the workspace". npm resolves this to the local `packages/openapi-schema-parser/` folder. This means `multi-parser` now depends on the local source instead of downloading a version from npm. They are always in sync.

---

### 8.5 FOLLOW-UP (not done here): `openapi-schema-parser/README.md` (old repo)

Archiving the standalone repo is explicitly **out of scope** for this migration (per the issue). As an optional follow-up, a "this package has moved" notice can be added to the old repository's README, for example:

> **This repository has moved.** `@asyncapi/openapi-schema-parser` is now maintained inside `asyncapi/parser-js` as a monorepo package. Please open new issues and PRs there. This repository will remain open for a transition period and will then be archived (read-only).

This change lives in the *other* repository and was intentionally not made as part of this monorepo migration.

---

## 8.6 What is `@asyncapi/multi-parser` and why it depends on this package

`parser-js` publishes two npm packages: `@asyncapi/parser` (the real, main parser) and `@asyncapi/multi-parser` (a small wrapper). Over time the shape of the parsed-document object — the "Parser-API" — changed across versions (v1 → v2 → v3). Some downstream tools were built against older versions. `multi-parser` lets a tool parse a document and receive it in whichever Parser-API version it wants. It also **bundles all the schema parsers** (Avro, OpenAPI, Protobuf, RAML) and registers them automatically when called with `includeSchemaParsers: true` (see `packages/multi-parser/src/parse.ts`).

`multi-parser` is the **only in-repo package that depends on `@asyncapi/openapi-schema-parser`**, which is why its dependency line is the one the issue specifically calls out.

### The `"*"` dependency decision (analysis, not just "because the issue said so")

Look at `multi-parser`'s dependencies and notice the pattern that already existed:

- `@asyncapi/parser` → `"*"` — because it lives **in this repo** (`packages/parser`).
- `avro`, `openapi`, `protobuf` → `"^x.y.z"` — because they live in **separate repos** and come from npm.

The unwritten rule is: **in-repo package → link to the local copy (`"*"`); out-of-repo package → pull a version range from npm.** The migration moves `openapi-schema-parser` from the "out-of-repo" group into the "in-repo" group, so its line changes from `"^3.0.4"` to `"*"` to match how `parser` is already treated. `avro` and `protobuf` correctly stay on npm ranges.

**Why `"*"` and not keep `"^3.0.4"`?** npm workspaces link a local package only when its version *satisfies* the declared range. `"^3.0.4"` is satisfied by the current local `3.0.24`, so it would link today — but the day someone bumps this package to `4.0.0` in the monorepo, `4.0.0` no longer satisfies `^3.0.4`, and npm would silently fetch the **old 3.x from npm** instead of the sibling source. `"*"` always matches the local copy regardless of version, which is exactly why `parser` uses it. This avoids a quiet, hard-to-debug version-drift trap.

**Benefits of the workspace link:**
1. Local edits to `openapi-schema-parser` are immediately visible to `multi-parser` — no publish-to-test loop.
2. A single PR can change both packages and be tested together (atomic cross-package changes).
3. No chicken-and-egg on the first monorepo release (no need for a published version to satisfy a range before the repo can build).
4. Consistency: in-repo packages are all handled the same way.

**The one honest tradeoff:** when `multi-parser` is published, its `package.json` carries `"@asyncapi/openapi-schema-parser": "*"`, telling consumers' npm to grab the latest. This is acceptable here because (a) `multi-parser` already does this for `@asyncapi/parser`, and (b) these packages are a coordinated family released together. A stricter alternative (caret ranges + Changesets `updateInternalDependencies`) exists but adds machinery and diverges from the current `"*"` convention, so it was **considered and not adopted** for this migration.

---

## 9. How Releases Work After Migration

### The old way (semantic-release)

In the standalone repo:

```
Developer merges a commit with message "feat: add support for nullable arrays"
         ↓
GitHub Actions CI detects the commit message starts with "feat:"
         ↓
semantic-release automatically determines new version: 3.0.24 → 3.1.0
         ↓
npm publish runs → 3.1.0 appears on npm
         ↓
GitHub release created automatically
```

Fully automatic. The commit message format (`feat:`, `fix:`, `feat!:` for breaking) determined the version bump.

### The new way (Changesets)

In the parser-js monorepo:

```
Step 1: Developer makes code changes in packages/openapi-schema-parser/
         ↓
Step 2: Developer runs: npx changeset
        → Answers: "Which packages changed?" → openapi-schema-parser
        → "What kind of change?" → patch / minor / major
        → "Describe what changed" → "Added support for nullable arrays"
        → A file like .changeset/green-dogs-dance.md is created and committed with the PR
         ↓
Step 3: PR is reviewed and merged to master
         ↓
Step 4: The Changesets GitHub Action reads all pending .changeset/*.md files
        → Opens a "Version Packages" PR with updated CHANGELOG.md and package.json versions
         ↓
Step 5: Maintainer reviews and merges the "Version Packages" PR
         ↓
Step 6: changeset publish runs automatically
        → npm publish for @asyncapi/openapi-schema-parser 3.1.0
        → GitHub release created
```

### Three PR scenarios (how a contribution turns into an npm release)

All three of these now happen inside the single `parser-js` repo:

- **PR touches only `@asyncapi/parser`:** contributor adds a changeset selecting `@asyncapi/parser`. On merge, the "Version Packages" PR bumps *only* `@asyncapi/parser`; publish sends *only* it to npm. `openapi-schema-parser` is untouched.
- **PR touches only `@asyncapi/openapi-schema-parser`:** contributor adds a changeset selecting it (e.g. patch `3.0.24 → 3.0.25`). On merge → only this package bumps and publishes.
- **PR touches BOTH:** this is the whole point of the merger. It is now **one PR** (previously it required two coordinated PRs across two repos). The contributor adds one changeset selecting **both** packages with the right bump for each; on merge, both bump and publish **together, in sync**.

Note: because `multi-parser` depends on `openapi-schema-parser` via `"*"` and the Changesets config sets `updateInternalDependencies: "patch"`, a release of `openapi-schema-parser` can also patch-bump `multi-parser` as a dependent. That is expected.

### Why did we switch? Advantages and disadvantages

| | semantic-release | Changesets |
|---|---|---|
| How version is determined | Automatically from commit messages | Manually chosen by contributor |
| Human oversight | None — fully automatic | Maintainer reviews "Version Packages" PR |
| Works across multiple packages? | Needs complex config | Built for monorepos |
| Contributor discipline needed? | Must follow conventional commit format | Must remember to run `npx changeset` |
| Release timing | Every merged commit | Batched — one release can bundle many PRs |

Changesets was chosen for `parser-js` because it naturally handles multiple packages with different version bumps in one release cycle. Semantic-release would require complex per-package configuration to avoid releasing all packages every time any one changes.

---

## 10. How to Test the Changes Locally

Here is a step-by-step test plan you can follow to verify the migration is working correctly.

### Step 1: Install dependencies

Run this from the monorepo root:

```bash
cd /path/to/parser-js
npm install
```

Expected: no errors. npm should print something like "added X packages, audited Y packages". 

**Verify the workspace link was created:**

```bash
ls node_modules/@asyncapi/openapi-schema-parser
```

Expected: you should see the contents of `packages/openapi-schema-parser/` listed (files like `package.json`, `src/`, `test/`, etc.), confirming npm linked the local package.

### Step 2: Build only the openapi-schema-parser

```bash
npm run openapi-parser:build
```

Expected output (from Turborepo):
```
@asyncapi/parser:build: ...  (parser builds first)
@asyncapi/openapi-schema-parser:build: > tsc
@asyncapi/openapi-schema-parser:build: > tsc --project ./tsconfig.cjs.json
Tasks: 2 successful, 2 total
```

**Verify the build output exists:**

```bash
ls packages/openapi-schema-parser/esm/
# → index.js  index.d.ts  json-schema-v3.js  json-schema-v3.d.ts

ls packages/openapi-schema-parser/cjs/
# → index.js  index.d.ts  json-schema-v3.js  json-schema-v3.d.ts
```

### Step 3: Run only the openapi-schema-parser tests

```bash
npm run openapi-parser:test
```

Expected output:
```
PASS test/parser.spec.ts
  OpenAPISchemaParser
    ✓ should return Mime Types
    ✓ should parse OpenAPI 3
    ✓ should validate valid OpenAPI 3
    ✓ should validate invalid OpenAPI 3
    ✓ should parse valid AsyncAPI
    ✓ should validate valid AsyncAPI
    ✓ should validate invalid AsyncAPI

Tests: 7 passed, 7 total
```

If any test fails, check the error message carefully. Common issues:
- **Cannot find module '@asyncapi/parser'** → the jest.config.ts moduleNameMapper is not resolving correctly
- **Cannot find module 'nimma/legacy'** → the `../../node_modules/` path in jest.config.ts is wrong

### Step 4: Run from inside the package directory

You can also test without going through Turborepo by navigating into the package:

```bash
cd packages/openapi-schema-parser
npm test
```

This runs `cross-env CI=true jest --coverage` directly. The output should be identical to Step 3.

### Step 5: Build all packages together

Back at the monorepo root:

```bash
npm run build
```

Expected: parser builds, then multi-parser and openapi-schema-parser build in parallel (Turborepo handles the ordering). All 3 should succeed.

### Step 6: Verify multi-parser still works

```bash
npm run multi-parser:test
```

The `multi-parser` package now depends on the workspace version of `openapi-schema-parser`. This test confirms the workspace link is working correctly end-to-end.

### Step 7: Run the full test suite

```bash
npm test
```

This runs tests for all packages. You will see some network-related failures in `@asyncapi/parser`'s tests (`fromURL` tests that try to reach `raw.githubusercontent.com`). These failures are **pre-existing** — they only fail because your local environment has no internet access for those specific tests. They are not related to the migration.

All `openapi-schema-parser` tests should pass.

### Step 8: Try a Changesets dry run (optional, to understand the release flow)

```bash
npx changeset
```

This interactive tool will ask you:
1. Which packages changed? (use arrow keys and space to select `@asyncapi/openapi-schema-parser`)
2. Is this a major / minor / patch change?
3. Write a summary of the change.

It creates a file like `.changeset/random-words.md`. This file is what gets committed with a PR. You can delete it afterward since this was just a test:

```bash
git checkout -- .changeset/
```

---

## 11. Known Gap: bump.yml and Changesets

The `parser-js` repository has a `bump.yml` GitHub Actions workflow. Its purpose is: after a package is released, automatically open PRs in other AsyncAPI repositories that depend on the released package to update their version numbers. Think of it as a custom Dependabot for AsyncAPI's own packages.

**The gap:** This workflow triggers on commits that start with `chore(release):` — which is the format that `semantic-release` uses when it commits a version bump. Changesets uses a different commit format. As a result, the automatic dependent-repo bumping may not fire after Changesets releases.

**Why we did not fix it:** The `bump.yml` file has a comment at the top: "This action is centrally managed in `asyncapi/.github` — don't make changes here as they will be overwritten." Any local edits would be overwritten by the next sync from the central repo. The fix needs to happen in the central `asyncapi/.github` repository, not here.

**Impact:** After a release of `@asyncapi/openapi-schema-parser` from `parser-js`, maintainers may need to manually open PRs in dependent repos to update the version, until the central workflow is updated.

This is a pre-existing issue that affects all packages in the `parser-js` monorepo, not just `openapi-schema-parser`.

---

## 12. Quick Reference Cheat Sheet

### Commands

| What you want to do | Command (run from monorepo root) |
|---|---|
| Install everything | `npm install` |
| Build all packages | `npm run build` |
| Test all packages | `npm test` |
| Build only openapi-schema-parser | `npm run openapi-parser:build` |
| Test only openapi-schema-parser | `npm run openapi-parser:test` |
| Build only parser | `npm run parser:build` |
| Test only parser | `npm run parser:test` |
| Build only multi-parser | `npm run multi-parser:build` |
| Test only multi-parser | `npm run multi-parser:test` |
| Create a changeset for a release | `npx changeset` |

### File locations

| File | Purpose |
|---|---|
| `package.json` (root) | Monorepo orchestration, workspace declaration |
| `turbo.json` | Task ordering and dependency graph |
| `packages/parser/` | `@asyncapi/parser` — the main parser |
| `packages/multi-parser/` | `@asyncapi/multi-parser` — multi-version API |
| `packages/openapi-schema-parser/` | `@asyncapi/openapi-schema-parser` — NEW |
| `.changeset/config.json` | Changesets release configuration |
| `.github/workflows/release-with-changesets.yml` | CI that runs `changeset publish` |
| `.github/workflows/if-nodejs-pr-testing.yml` | CI that tests every PR |

### Dependency types at a glance

| Type | Who installs it? | Use case |
|---|---|---|
| `dependencies` | npm installs automatically for consumers | Runtime libraries you own |
| `devDependencies` | Only installed during development | Build tools, test frameworks |
| `peerDependencies` | Consumer must install it themselves | Host libraries (plugin pattern) |

### What changed and why

| What changed | Why |
|---|---|
| `openapi-schema-parser` moved to `packages/` | No active maintainer in old repo; monorepo consolidates maintenance |
| `@asyncapi/parser` changed to `peerDependency` | Plugin pattern; prevents duplicate installs; consumer always has it |
| `jest.config.ts` paths changed to `../../node_modules/` | Dependencies are hoisted to monorepo root in npm workspaces |
| `@asyncapi/parser` added to jest `moduleNameMapper` | Lets Jest resolve the workspace sibling without going through npm |
| `multi-parser` dep changed from `^3.0.4` to `"*"` | Uses workspace local version instead of npm registry version |
| `turbo.json` got new pipeline entry | Turborepo must know to build `parser` before building this package |
| Root `package.json` got shortcut scripts | Convenience: `npm run openapi-parser:test` from root without `cd` |
