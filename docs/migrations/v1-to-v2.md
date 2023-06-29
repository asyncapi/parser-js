# Migrating from v1 to v2

## TL;DR

- The parser API has been rewritten from the ground up. It's now based on user intents instead of a 1:1 map to the spec. [Read more](#new-intent-api).
- Source code has been rewritten in TypeScript and ESM. This makes the package fully [tree-shakable](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking). [Read more](#typescript-and-esm).
- The parser is now exposed as a class, making it possible to have multiple parser instances with different configurations. [Read more](#parser-class).
- It validates AsyncAPI documents using [Spectral](https://github.com/stoplightio/spectral). This enables better validation and introduces linting capabilities. [Read more](#Powered-by-Spectral).
- API Changes
  - Introduces validation without parsing via the `.validate()` method. [Read more](#validate-method).
  - The `.parse()` method now also returns diagnostics (errors, warnings, and bits of advice). [Read more](#parse-method).
  - The `parseFromUrl()` method has been deprecated in favor of the `fromURL` standalone function. [Read more](#parseFromUrl-is-now-deprecated).
  - Custom parsers now have a `validate()` method. [Read more](#new-custom-schema-parser-interface).
  - The way to pass custom `$ref` resolvers has changed. [Read more](#custom-reference-resolvers).
  - Stringify and unstringify the parsed document is now a separate functionality. [Read more](#standalone-stringify-and-unstringify-functionality).
  - If there is a need to use an old version of the API, the Parser provides the `convertToOldAPI` functionality. [Read more](#convert-new-api-to-the-old-one).

## New Intent API

The old Document API based 1:1 on AsyncAPI Specification has been rewritten to support the new so-called [Parser API](https://github.com/asyncapi/parser-api), which makes it easier to operate on the document and retrieve collections of needed objects from it. Due to the fact that the new API does not stick firmly to the AsyncAPI Specification file structure, it allows for better integration with future versions of AsyncAPI. The user does not need to know the new API against the new version of AsyncAPI - all methods will remain the same with the inclusion of new/deprecated fields. Also new API has been enhanced with some additional functionality like retrieving the JSON Path of the object using the `.jsonPath()` method etc.

## TypeScript and ESM

The source code of the package has been rewritten to ESM (EcmaScript modules). This enables [tree-shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) and much better integration in browser-based environments. In addition, the package exposes a `cjs` directory containing the CommonJS version of the parser, for compatibility with older environments. Both versions have support for Typescript types.

## Powered by Spectral

[Spectral](https://github.com/stoplightio/spectral) is an open-source API linting tool by [Stoplight](https://stoplight.io/) that allows users to create custom style guides to enforce validations on API design automatically. This allows for better validation and shows all errors in one validation process - the old parser had a huge problem with this. In addition, there is the ability to show good practices though like defining `operationId` for each operation or enforcing things that are optional but required for a project or company (API governance). Together with [Stoplight](https://stoplight.io/), we have an official partnership and will be improving integration as well as [Spectral](https://github.com/stoplightio/spectral) itself for better quality validation of AsyncAPI documents.

## Custom reference resolvers

In v1, there was an option to pass a custom resolver to the reference resolver ([json-schema-ref-parser](https://github.com/APIDevTools/json-schema-ref-parser)), which allowed custom logic for retrieving reference data - e.g. for mapping data located on the external resources to local data (used by `--map-base-url` flag for [Generator](https://github.com/asyncapi/generator#cli-usage)'s CLI). The current logic is similar, but differs in a few things:

- custom resolver has to be passed in the `Parser`'s constructor, in the `__unstable.resolver.resolvers` array.
- must define what schema it supports, such as `https`, or `file`.

```ts
import { Parser } from '@asyncapi/parser';

const parser = new Parser({
  __unstable: {
    resolver: {
      resolvers: [
        {
          schema: 'customProtocol',
          read(uri) {
            if (uri.path() === '/someRef') {
              return '{"someRef": "value"}';
            }
            return '{"anotherRef": "value"}';
          },
        }
      ]
    }
  }
});

const asyncApiDocument = {
  asyncapi: '2.5.0',
  info: {
    title: 'Example AsyncApi document',
    version: '1.0',
  },
  channels: {
    someChannel: {
      publish: {
        operationId: 'publish',
        message: {
          payload: {
            $ref: 'customProtocol:///someRef'
          }
        }
      },
      subscribe: {
        operationId: 'subscribe',
        message: {
          payload: {
            $ref: 'customProtocol:///anotherRef'
          }
        }
      },
    }
  },
};
const { document } = await parser.parse(asyncApiDocument);
// document.json().channels.someChannel.publish.message.payload == { "someRef": "value" };
// document.json().channels.someChannel.subscribe.message.payload == { "anotherRef": "value" };
```

> **Note**
> As [Spectral](https://github.com/stoplightio/spectral) natively does not support multiple custom resolvers, `Parser` implements a wrapper for existing logic in [Spectral](https://github.com/stoplightio/spectral), and due to that fact, custom resolvers need to be passed with `__unstable.resolver.resolvers` array. If [Spectral](https://github.com/stoplightio/spectral) will support out-in-the-box multiple custom resolvers we will include this logic permanently in the `Parser`, currently it is in the "unstable" phase.

### New Custom Schema Parser interface

The custom parser interface has been changed to shape including methods:

- `validate` (**NEW FUNCTION**) - the function that validates (its syntax) used schema.
- `parse` - the function that parses the given schema to the [AsyncAPI Schema Format](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#schemaObject).
- `getMimeTypes` - the function that returns the list of mime types that will be used as the `schemaFormat` property to determine the mime type of a given schema.

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

Before parsing/validating an AsyncAPI document with a parser, register the additional custom schema parser like in the old parser:

```ts
import { Parser } from '@asyncapi/parser';
import myCustomSchemaParser from './my-custom-schema-parser';

const parser = new Parser();
parser.registerSchemaParser(myCustomSchemaParser);
```

## Convert new API to the old one

Because a large part of the AsyncAPI tooling ecosystem uses a Parser with the old API and rewriting the tool for the new one can be time-consuming and difficult, the package exposes the `convertToOldAPI()` function to convert the new API to the old one:

```js
import { Parser, convertToOldAPI } from '@asyncapi/parser';

const parser = new Parser();
const { document } = parser.parse(...);
const oldAsyncAPIDocument = convertToOldAPI(document);
```

> **Warning**
> The old API will be supported only for a certain period. The target date for turning off support of the old API is around the end of March 2024.

If there is a need to convert an existing instance of the old API to the new one, the library provides the `convertToNewAPI` function:

```js
import { Parser, convertToNewAPI } from '@asyncapi/parser';

const newAsyncAPIDocument = convertToNewAPI(oldDocument);
```

> **Warning**
> Due to the fact that the new Parser validates the document more restrictively, it may be that a parsed document in the old way will not work 100% in accordance with the new API.

## Important API changes

These are all the exposed API changes and how you interact with the parser. For how to interact with the AsyncAPI document, checkout [the intent API](#new-intent-api).

### Parser class
In v1 we had only one instance of the Parser because it was global. The new version exposes the Parser class, so now it's possible to have several different instances of Parser with different configurations.

```ts
import { Parser } from '@asyncapi/parser';

const parser = new Parser();

const { document } = await parser.parse(`...AsyncAPI document`, ...?options);
```

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

In v2 it brings a new `.validate()` method (exposed by Parser class) which only validates the AsyncAPI document based on [Spectral](https://github.com/stoplightio/spectral) configuration. This is a useful feature for cases when we only need to know if a given AsyncAPI document is valid or not.

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

### `parseFromUrl()` is now deprecated

The `parseFromUrl()` function has been deprecated in favor of the new `fromURL` function:

```ts
import { Parser, fromURL } from '@asyncapi/parser';

const parser = new Parser();

const { document } = fromURL(parser, 'https://my.server.com/example-asyncapi.yaml', ...?fetching options).parse();
// `validate` function is also available:
// fromURL(parser, ...).validate();
```

> **Note**
> Parser exposes a similar function to handle file system sources - `fromFile`.

### Standalone stringify and un-stringify functionality

The ability to stringify and un-stringify (parsing of stringified AsyncAPI document) was possible as methods in the old `AsyncAPiDocument` instance. Currently, both functions are standalone:

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
