# Parser v1 to v2 Migration Guide

## General

1. The document's AsyncAPI API has been rewritten from old to new supporting the [Intent API](https://github.com/asyncapi/parser-api) - there is a function that converts the new API to the old one for backward compatibility. 
2. Package source code has been rewritten to the TypeScript alongside with rewritten from CJS (CommonJS) to ESM (EcmaScript) modules.
3. The functionality of the Parser was wrapped with the class. This means that from now on it's possible to have a dozen other Parser instances with different configurations.
4. Validation is powered by [Spectral](https://github.com/stoplightio/spectral). This allows better validation, checking not only syntax errors, but also informing about good practices, such as defining `operationID` field etc.
5. AsyncAPI document validation (without parsing) is available via a separate method - `.validate()`.
6. The function `.parse()` returns parsed AsyncAPi `document` and possible `diagnostics` based on validation configuration.  
7. The function `parseFromUrl()` has been deprecated in favour of `fromURL` standalone function.
8. The Custom Schema Parser interface has been changed with an additional function `validate()`.
9. Stringify and unstringify the parsed document is now a separate functionality.
10. Package is fully [tree-shakable](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking).

### New Intent API

The old Document API based 1:1 on AsyncAPI Specification has been rewritten to support the new so-called [Intent API](https://github.com/asyncapi/parser-api), which makes it easier to operate on the document and retrieve collections of needed objects from the document. Due to the fact that the new API does not stick firmly to AsyncAPI Specification, it allows for better integration with future versions of AsyncAPI. User does not need to know the new API against the new version of AsyncAPI - all methods will remain the same with the inclusion of new/deprecated fields. Also new API has been enhanced with some additional functionality like retrieving the JSON Path of the object using the `.jsonPath()` method etc.

### EcmaScript Modules

The source code of the package was rewritten from CJS (CommonJS) to ESM (EcmaScript) modules. This allows the fully [tree-shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) and much better integration in browser-type environments like SPA applications. In addition, the package is published with:

- `esm` (ESM modules) folder mainly for browser applications and newer versions of NodeJS, to support fully [tree-shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) 
- `cjs` (CJS modules) folder for old versions of NodeJS

Both versions have support for Typescript types.

### Parser class

The v1 version of package had only one instance of the Parser which was global. The new version exposes the Parser class, so now it's possible to have several different instances of Parser with different configurations.

```ts
import { Parser } from '@asyncapi/parser';

const parser = new Parser();

const { document } = await parser.parse(`...AsyncAPI document`, ...?options);
```

### Powered by [Spectral](https://github.com/stoplightio/spectral)

[Spectral](https://github.com/stoplightio/spectral) is an open-source API linting tool by [Stoplight](https://stoplight.io/) that allows users to create custom style guides to enforce validations on API design automatically. This allows for better validation and showing all errors in one validation process - the old parser had a huge problem with this. In addition, there is the ability to show good practices though like defining `operationId` for each operation, or enforcing things that are optional but required for a project or company (API governance). Together with [Stoplight](https://stoplight.io/), we have an official partnership and will be improving integration as well as [Spectral](https://github.com/stoplightio/spectral) itself for better quality validation of AsyncAPI documents.

### `.parse()` method

The function `.parse()` returns not only parsed AsyncAPi `document` but also possible `diagnostics` array based on validation configuration:

```ts
import { Parser } from '@asyncapi/parser';

const parser = new Parser();

const { document, diagnostics } = await parser.parse(`
  asyncapi: '2.4.0'
  info:
    title: Example AsyncAPI specification
    version: '0.1.0'
  channels:
    example-channel:
      subscribe:
        message:
          payload:
            type: object
            properties:
              exampleField:
                type: string
              exampleNumber:
                type: number
              exampleDate:
                type: string
                format: date-time
`);

if (document) {
  // => Example AsyncAPI specification
  console.log(document.info().title());
}
```

### `.validate()` method

New version of Parser brings new `.validate()` method (exposed by Parser class) which only validates the AsyncAPI document based on [Spectral](https://github.com/stoplightio/spectral) configuration. This is a useful feature for cases when we only need to know if given AsyncAPI document is valid or not.

```ts
import { Parser } from '@asyncapi/parser';

const parser = new Parser();

// One of the diagnostics will contain an error regarding an unsupported version of AsyncAPI (2.1.37)
const diagnostics = await parser.validate(`
  asyncapi: '2.1.37'
  info:
    title: Example AsyncAPI specification
    version: '0.1.0'
  channels:
    example-channel:
      subscribe:
        message:
          payload:
            type: object
            properties:
              exampleField:
                type: string
              exampleNumber:
                type: number
              exampleDate:
                type: string
                format: date-time
`);
```

### Deprecation of the `parseFromUrl()` function

The `parseFromUrl()` function has been deprecated in favour of the new `fromURL` function:

```ts
import { Parser, fromURL } from '@asyncapi/parser';

const parser = new Parser();

const { document } = fromURL(parser, 'https://my.server.com/example-asyncapi.yaml', ...?fetching options).parse();
// `validate` function is also available:
// fromURL(parser, ...).validate();
```

> **Note**
> Parser exposes similar function to handle file system sources - `fromFile`.

### New Custom Schema Parser interface

The custom parser interface has been changed to shape including methods:

- `validate` (**NEW FUNCTION**) - function that validates (its syntax) used schema.
- `parse` - function that parses the given schema to the [AsyncAPI Schema Format](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#schemaObject).
- `getMimeTypes` - function that returns the list of mime types that will be used as the `schemaFormat` property to determine the mime type of a given schema.

Example:
    
```ts
export default {
  validate(input) { ... },
  parse(input) { ... },
  getMimeTypes() {
    return [
      'application/vnd.custom.type;version=1.0.0',
      'application/vnd.custom.type+json;version=1.0.0',
    ]
  }
}
```

Before parsing/validating an AsyncAPI document with a parser, register the additional custom schema parser like in old parser:

```ts
import { Parser } from '@asyncapi/parser';
import myCustomSchemaParser from './my-custom-schema-parser';

const parser = new Parser();
parser.registerSchemaParser(myCustomSchemaParser);
```

### Standalone stringify and unstringify functionality

The ability to stringify and unstringify (parsing of stringified AsyncAPI document) was possible as methods in the old `AsyncAPiDocument` instance. Currently, both functions are standalone:

```ts
import { Parser, stringify, unstringify } from '@asyncapi/parser';

const parser = new Parser();

const { document } = await parser.parse(`
  asyncapi: '2.4.0'
  info:
    title: Example AsyncAPI specification
    version: '0.1.0'
  channels:
    example-channel:
      subscribe:
        message:
          payload:
            type: object
            properties:
              exampleField:
                type: string
              exampleNumber:
                type: number
              exampleDate:
                type: string
                format: date-time
`);

if (document) {
  // stringify function returns string type
  const stringifiedDocument = stringify(document);
  // unstringify function returns new AsyncAPIDocument instance
  const unstringifiedDocument = unstringify(stringifiedDocument);
}
```

### Convert new API to the old one

Due to the fact that a large part of the AsyncAPI tooling ecosystem uses a Parser with the old API and rewriting the tool for the new one can be time-consuming and difficult, the package exposes the `migrateToOldAPI()` function to convert new API to old one:

```js
import { Parser, migrateToOldAPI } from '@asyncapi/parser';

const parser = new Parser();
const { document } = parser.parse(...);
const oldAsyncAPIDocument = migrateToOldAPI(document);
```

> **Warning**
> The old api will be supported only for a certain period of time. The target date for turning off support of the old API is around the end of January 2023.
