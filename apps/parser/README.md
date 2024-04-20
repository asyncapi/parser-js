[![AsyncAPI JavaScript Parser](./assets/logo.png)](https://www.asyncapi.com)

Use this package to validate and parse AsyncAPI documents —either YAML or JSON— in your Node.js or browser application.  
Validation is powered by [Spectral](https://github.com/stoplightio/spectral).  
Updated bundle for the browser is always attached to the GitHub Release.

![npm](https://img.shields.io/npm/v/@asyncapi/parser?style=for-the-badge) ![npm](https://img.shields.io/npm/dt/@asyncapi/parser?style=for-the-badge)

> **Warning**
> This package doesn't support AsyncAPI 1.x anymore. We recommend to upgrade to the latest AsyncAPI version using the [AsyncAPI converter](https://github.com/asyncapi/converter-js). If you need to convert documents on the fly, you may use the [Node.js](https://github.com/asyncapi/converter-js) or [Go](https://github.com/asyncapi/converter-go) converters.

> **Warning**
> This package has rewrote the Model API (old one) to [Intent API](https://github.com/asyncapi/parser-api). If you still need to use the old API, read the [Convert to the old API](#convert-to-the-old-api) section.

> **Note**
> Read the [migration guide from v2 to v3](./docs/migrations/v2-to-v3.md).


<!-- toc is generated with GitHub Actions do not remove toc markers -->

<!-- toc -->

- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
  * [Example with parsing](#example-with-parsing)
  * [Example with validation](#example-with-validation)
  * [Example using Avro schemas](#example-using-avro-schemas)
  * [Example using OpenAPI schemas](#example-using-openapi-schemas)
  * [Example using RAML data types](#example-using-raml-data-types)
  * [Example with performing actions on HTTP source](#example-with-performing-actions-on-http-source)
  * [Example with performing actions on file source](#example-with-performing-actions-on-file-source)
  * [Example with stringify and unstringify parsed document](#example-with-stringify-and-unstringify-parsed-document)
- [API documentation](#api-documentation)
- [Spectral rulesets](#spectral-rulesets)
- [Using in the browser/SPA applications](#using-in-the-browserspa-applications)
- [Custom schema parsers](#custom-schema-parsers)
  * [Official supported custom schema parsers](#official-supported-custom-schema-parsers)
- [Custom extensions](#custom-extensions)
- [Circular references](#circular-references)
- [Stringify](#stringify)
- [Convert to the old API](#convert-to-the-old-api)
- [Notes](#notes)
  * [Using with Webpack](#using-with-webpack)
  * [Testing with [Jest](https://jestjs.io/)](#testing-with-jesthttpsjestjsio)
- [Develop](#develop)
- [Contributing](#contributing)
- [Contributors](#contributors)

<!-- tocstop -->

## Installation

```bash
npm install @asyncapi/parser
yarn add @asyncapi/parser
```

The parser by default supports AsyncAPI Schema Format and JSON Schema Format for schemas. For additional formats, check [Custom schema parsers](#custom-schema-parsers) section.

## Usage

The package exposes the main class `Parser`, which has two main functions:

- `validate()` - function that validates the passed AsyncAPI document. Returns array of all possible errors against the validation conditions.
- `parse()` - function that validates the passed AsyncAPI document, and then if it's valid, parses the input. It returns an object that contains:
  - `document` object, which is an parsed AsyncAPI document with [`AsyncAPIDocumentInterface`](./src/models/asyncapi.ts) API. If the schema is invalid against the validation conditions, the field has `undefined` value.
  - `diagnostics` array that contains all possible errors against the validation conditions.
- `registerSchemaParser()` - function that registers custom schema parsers. For more info, please check [Custom schema parsers](#custom-schema-parsers) section.

Natively `Parser` class does not contain methods that operate on the source (AsyncAPI document) from a file or URL. However, the package exposes utils that make this possible:

```ts
import { fromURL, fromFile } from '@asyncapi/parser';
```

Check out the [examples](#examples) of using the above mentioned functionalities.

## Examples 

### Example with parsing

```ts
import { Parser } from '@asyncapi/parser';
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
  // => Example AsyncAPI specification
  console.log(document.info().title());
}
```

### Example with validation

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

### [Example using Avro schemas](#custom-schema-parsers)

Head over to [asyncapi/avro-schema-parser](https://www.github.com/asyncapi/avro-schema-parser) for more information.

### [Example using OpenAPI schemas](#custom-schema-parsers)

Head over to [asyncapi/openapi-schema-parser](https://www.github.com/asyncapi/openapi-schema-parser) for more information.

### [Example using RAML data types](#custom-schema-parsers)

Head over to [asyncapi/raml-dt-schema-parser](https://www.github.com/asyncapi/raml-dt-schema-parser) for more information.

### Example with performing actions on HTTP source

```ts
import { Parser, fromURL } from '@asyncapi/parser';

const parser = new Parser();

const { document, diagnostics } = await fromURL(parser, 'https://example.com/').parse();
```

### Example with performing actions on file source

```ts
import { Parser, fromFile } from '@asyncapi/parser';

const parser = new Parser();

const { document, diagnostics } = await fromFile(parser, './asyncapi.yaml').parse();
```

### [Example with stringify and unstringify parsed document](#stringify)

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

## API documentation

Parser-JS API implements a global API definition for all AsyncAPI parser implementations known as the [Parser-API](https://github.com/asyncapi/parser-api). This API is designed having in mind developer experience and resiliency to breaking changes.

The following table shows a compatibility matrix between this parser, and the [Parser-API](https://github.com/asyncapi/parser-api), as well as the AsyncAPI spec version supported by each release of this parser.

| Parser-JS | Parser-API                                                            | Spec 2.x | Spec 3.x |
|-----------|-----------------------------------------------------------------------|----------|----------|
| 2.x       | [1.x](https://github.com/asyncapi/parser-api/blob/v1.0.0/docs/v1.md)  | ✓        |          |
| 3.x       | [3.x](https://github.com/asyncapi/parser-api/blob/v3.0.0/docs/api.md) | ✓        | ✓        |

- `✓` Fully supported version.
- `-` The AsyncAPI Spec version has features the Parser-JS can't use but the rest are fully supported.
- Empty means not supported version.

Additionally to all the methods declared in the [Parser-API](https://github.com/asyncapi/parser-api), this parser might introduce some helper functions like:

- `json()` which returns the JSON object of the given object. It is possible to pass as an argument the name of a field in an object and retrieve corresponding value.
- `jsonPath()` which returns the JSON Path of the given object.
- `meta()` which returns the metadata of a given object, like a parsed AsyncAPI Document.

## Spectral rulesets

[Spectral](https://github.com/stoplightio/spectral) powers the validation of AsyncAPI documents within ParserJS. For this reason, it is possible to use your rulesets/rules or overwrite existing ones, passing the `ruleset` option to the Parser instance: 

```ts
import { Parser, stringify, unstringify } from '@asyncapi/parser';
const parser = new Parser({
  ruleset: {
    extends: [],
    rules: {
      'asyncapi-defaultContentType': 'off',
      'asyncapi-termsOfService': {
        description: 'Info "termsOfService" should be present and non-empty string.',
        recommended: true,
        given: '$',
        then: {
          field: 'info.termsOfService',
          function: 'truthy',
        },
      },
    }
  }
});
// The returned diagnostics object will include `asyncapi-termsOfService` diagnostic with `warning` (`recommended: true`) severity because `$.info.termsOfService` is not defined in the following AsyncAPI document.
// On the other hand, since we turned it off, we won't see the diagnostics related to the `defaultContentType` field.
const diagnostics = await parser.validate(`
  asyncapi: '2.0.0'
  info:
    title: Example AsyncAPI specification
    version: '0.1.0'
  channels: {}
`);
```

[ParserJS has some built-in Spectral rulesets](./docs/ruleset) that validate AsyncAPI documents and inform on good practices. 


## Using in the browser/SPA applications

The package contains a built-in version of the parser. To use it, you need to import the parser into the HTML file as below:

```html
<script src="https://unpkg.com/@asyncapi/parser@latest/browser/index.js"></script>

<script>
  const parser = new window.AsyncAPIParser();
  const { document, diagnostics } = parser.parse(...);
</script>
```

Or, if you want to use the parser in a JS SPA-type application where you have a predefined bundler configuration that is difficult to change (e.g. you use [`create-react-app`](https://github.com/facebook/create-react-app)) then you can import the parser as below:

```js
import Parser from '@asyncapi/parser/browser';

const parser = new Parser();
const { document, diagnostics } = parser.parse(...);
```

> **Note**
> Using the above code, we import the entire bundled parser into application. This may result in a duplicate code in the final application bundle, only if the application uses the same dependencies what the parser. If, on the other hand, you want to have the smallest bundle as possible, we recommend using the following import and properly configure bundler.

Otherwise, if your application is bundled via bundlers like `webpack` and you can configure it, you can import the parser like a regular package:

```js
import { Parser } from '@asyncapi/parser';

const parser = new Parser();
const { document, diagnostics } = parser.parse(...);
```

> **Note**
> The package uses some native NodeJS modules underneath. If you are building a front-end application you can find more information about the correct configuration for Webpack [here](#webpack).

In case you just want to check out the latest `bundle.js` without installing the package, we publish one on each GitHub release. You can find it under [this link to the latest release](https://github.com/asyncapi/parser-js/releases/latest/download/bundle.js).

## Custom schema parsers

AsyncAPI doesn't enforce one schema format. The payload of the messages can be described with OpenAPI (3.0.0), Avro, etc. This parser by default parses only [AsyncAPI Schema Format](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#schemaObject) (superset of JSON Schema Format). We can extend it by creating a custom parser and registering it within the parser:

1. Create custom parser module that exports three functions:

    - `validate` - function that validates (its syntax) used schema.
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

2. Before parsing/validating an AsyncAPI document with a parser, register the additional custom schema parser:

    ```ts
    import { Parser } from '@asyncapi/parser';
    import myCustomSchemaParser from './my-custom-schema-parser';

    const parser = new Parser();
    parser.registerSchemaParser(myCustomSchemaParser);
    ```

### Official supported custom schema parsers

In AsyncAPI Initiative we support below custom schema parsers. To install them, run below comamnds:

- [Avro schema](https://www.github.com/asyncapi/avro-schema-parser):

  ```bash
  npm install @asyncapi/avro-schema-parser
  yarn add @asyncapi/avro-schema-parser
  ```

- [OpenAPI (3.0.0) Schema Object](https://www.github.com/asyncapi/openapi-schema-parser):

  ```bash
  npm install @asyncapi/openapi-schema-parser
  yarn add @asyncapi/openapi-schema-parser
  ```

- [RAML data type](https://www.github.com/asyncapi/raml-dt-schema-parser):

  ```bash
  npm install @asyncapi/raml-dt-schema-parser
  yarn add @asyncapi/raml-dt-schema-parser
  ```

  > **Note**
  > That custom parser works only in the NodeJS environment. Do not use it in browser applications!

## Custom extensions

The parser uses custom extensions to define additional information about the spec. Each has a different purpose but all of them are there to make it much easier to work with the AsyncAPI document. These extensions are prefixed with `x-parser-`. The following extensions are used:

- `x-parser-spec-parsed` is used to specify if the AsyncAPI document is already parsed by the parser. Property `x-parser-spec-parsed` is added to the root of the document with the `true` value.
- `x-parser-api-version` is used to specify which version of the [Parser-API](https://github.com/asyncapi/parser-api) the parsed AsyncAPI document uses. Property `x-parser-api-version` is added to the root of the document with the `1` value if the parsed document uses [Parser-API](https://github.com/asyncapi/parser-api) in the `v1` version or `0` if document uses old `parser-js` API.
- `x-parser-message-name` is used to specify the name of the message if it is not provided. For messages without names, the parser generates anonymous names. Property `x-parser-message-name` is added to a message object with a value that follows this pattern: `<anonymous-message-${number}>`. This value is returned by `message.id()` (`message.uid()` in the [old API](#convert-to-the-old-api)) when regular `name` property is not present.
- `x-parser-original-payload` holds the original payload of the message. You can use different formats for payloads with the AsyncAPI documents and the parser converts them to. For example, it converts payload described with Avro schema to AsyncAPI schema. The original payload is preserved in the extension.
- [`x-parser-circular`](#circular-references).

In addition, the [`convertToOldAPI()` function](#convert-to-the-old-api) which converts new API to an old one adds additional extensions:

- `x-parser-message-parsed` is used to specify if the message is already parsed by the message parser. Property `x-parser-message-parsed` is added to the message object with the `true` value.
- `x-parser-schema-id` is used to specify the ID of the schema if it is not provided. For schemas without IDs, the parser generates anonymous names. Property `x-parser-schema-id` is added to every object of a schema with a value that follows this pattern: `<anonymous-schema-${number}>`. This value is returned by `schema.uid()` when regular `$id` property is not present.
- `x-parser-original-traits` is where traits are stored after they are applied on the AsyncAPI document. The reason is because the original `traits` property is removed.
- `x-parser-original-schema-format` holds information about the original schema format of the payload. You can use different schema formats with the AsyncAPI documents and the parser converts them to AsyncAPI schema. This is why different schema format is set, and the original one is preserved in the extension.

> **Warning**
> All extensions added by the parser (including all properties) should be retrieved using special functions. Names of extensions and their location may change, and their eventual changes will not be announced.

## Circular references

Parser dereferences all circular references by default. In addition, to simplify interactions with the parser, the following is added:

- `x-parser-circular` property is added to the root of the AsyncAPI document to indicate that the document contains circular references. In old API the Parser exposes `hasCircular()` function to check if given AsyncAPI document has circular references.
- `isCircular()` function is added to the [Schema Model](./src/models/schema.ts) to determine if a given schema is circular with respect to previously occurring schemas in the JSON tree.

## Stringify

Converting a parsed document to a string may be necessary when saving the parsed document to a database, or similar situations where you need to parse the document just once and then reuse it, for optimisation cases.

For that, the Parser supports the ability to stringify a parsed AsyncAPI document through the `stringify` function exposed by package. This method differs from the native `JSON.stringify(...json)` implementation, in that every reference that occurs (at least twice throughout the document) is converted into a [JSON Pointer](https://datatracker.ietf.org/doc/html/rfc6901) path with a `$ref:` prefix:

```json
{
  "foo": "$ref:$.some.path.to.the.bar"
}
```
		
To parse a stringified document into an AsyncAPIDocument instance, you must use the `unstringify` function (also exposed by package). It isn't compatible with the native `JSON.parse()` method. It replaces the given references pointed by the [JSON Pointer](https://datatracker.ietf.org/doc/html/rfc6901) path, with an `$ref:` prefix to the original objects.

A few advantages of this solution:

- The string remains as small as possible due to the use of [JSON Pointers](https://datatracker.ietf.org/doc/html/rfc6901).
- All references (also circular) are preserved.

Check [example](#example-with-stringify-and-unstringify-parsed-documentstringify).

## Convert to the old API

Version `2.0.0` of package introduced a lot of breaking changes, including changing the API of the returned parsed document (parser uses [New API](https://github.com/asyncapi/parser-api)). Due to the fact that a large part of the AsyncAPI tooling ecosystem uses a Parser with the old API and rewriting the tool for the new one can be time-consuming and difficult, the package exposes the `convertToOldAPI()` function to convert new API to old one:

```js
import { Parser, convertToOldAPI } from '@asyncapi/parser';

const parser = new Parser();
const { document } = parser.parse(...);
const oldAsyncAPIDocument = convertToOldAPI(document);
```

> **Warning**
> The old api will be supported only for a certain period of time. The target date for turning off support of the old API is around the end of January 2023.

## Notes

### Using with Webpack
Versions `<5` of Webpack should handle bundling without problems. Due to the fact that Webpack 5 no longer does fallbacks to native NodeJS modules by default we need to install `buffer` package and add fallbacks:

```js
{
  resolve: {
    fallback: {
      "fs": false,
      "path": false,
      "util": false,
      "buffer": require.resolve("buffer/"),
    }
  }
}
```

### Testing with [Jest](https://jestjs.io/)

Using a Parser in an application that is tested using [Jest](https://jestjs.io/), there will probably an error like: 

```bash
Cannot find module 'nimma/legacy' from 'node_modules/@stoplight/spectral-core/dist/runner/runner.js
```

It's a problem with Jest, which cannot understand [NodeJS's package exports](https://nodejs.org/api/packages.html). To fix that, should be [enabled ESM support in Jest](https://jestjs.io/docs/ecmascript-modules) or set an appropriate Jest's `moduleNameMapper` config:

```js
moduleNameMapper: {
  '^nimma/legacy$': '<rootDir>/node_modules/nimma/dist/legacy/cjs/index.js',
  '^nimma/(.*)': '<rootDir>/node_modules/nimma/dist/cjs/$1',
},
```

## Develop

1. Make sure you are using Node.js 16 or higher and npm 8 or higher
2. Write code and tests.
3. Make sure all tests pass `npm test`

For Windows environments, some tests might still fail randomly during local development even when you made no changes to the tests. The reason for this from file endings are different than expected and this comes from Git defaulting to an unexpected file ending. If you encounter this issue you can run the following commands to set Git to use the expected one:
```
git config --global core.autocrlf false
git config --global core.eol lf
```

4. Make sure code is well formatted and secure `npm run lint`


## Contributing

Read [CONTRIBUTING](https://github.com/asyncapi/.github/blob/master/CONTRIBUTING.md) guide.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="25%"><a href="http://www.fmvilas.com/"><img src="https://avatars3.githubusercontent.com/u/242119?v=4?s=100" width="100px;" alt="Fran Méndez"/><br /><sub><b>Fran Méndez</b></sub></a><br /><a href="#question-fmvilas" title="Answering Questions">💬</a> <a href="https://github.com/asyncapi/parser-js/issues?q=author%3Afmvilas" title="Bug reports">🐛</a> <a href="https://github.com/asyncapi/parser-js/commits?author=fmvilas" title="Code">💻</a> <a href="https://github.com/asyncapi/parser-js/commits?author=fmvilas" title="Documentation">📖</a> <a href="#ideas-fmvilas" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-fmvilas" title="Maintenance">🚧</a> <a href="#plugin-fmvilas" title="Plugin/utility libraries">🔌</a> <a href="https://github.com/asyncapi/parser-js/pulls?q=is%3Apr+reviewed-by%3Afmvilas" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/asyncapi/parser-js/commits?author=fmvilas" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="25%"><a href="https://resume.github.io/?derberg"><img src="https://avatars1.githubusercontent.com/u/6995927?v=4?s=100" width="100px;" alt="Lukasz Gornicki"/><br /><sub><b>Lukasz Gornicki</b></sub></a><br /><a href="#question-derberg" title="Answering Questions">💬</a> <a href="https://github.com/asyncapi/parser-js/issues?q=author%3Aderberg" title="Bug reports">🐛</a> <a href="https://github.com/asyncapi/parser-js/commits?author=derberg" title="Code">💻</a> <a href="https://github.com/asyncapi/parser-js/commits?author=derberg" title="Documentation">📖</a> <a href="#ideas-derberg" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-derberg" title="Maintenance">🚧</a> <a href="https://github.com/asyncapi/parser-js/pulls?q=is%3Apr+reviewed-by%3Aderberg" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/asyncapi/parser-js/commits?author=derberg" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="25%"><a href="https://github.com/jonaslagoni"><img src="https://avatars1.githubusercontent.com/u/13396189?v=4?s=100" width="100px;" alt="Jonas Lagoni"/><br /><sub><b>Jonas Lagoni</b></sub></a><br /><a href="#question-jonaslagoni" title="Answering Questions">💬</a> <a href="https://github.com/asyncapi/parser-js/issues?q=author%3Ajonaslagoni" title="Bug reports">🐛</a> <a href="https://github.com/asyncapi/parser-js/commits?author=jonaslagoni" title="Code">💻</a> <a href="#ideas-jonaslagoni" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/asyncapi/parser-js/pulls?q=is%3Apr+reviewed-by%3Ajonaslagoni" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="25%"><a href="https://github.com/magicmatatjahu"><img src="https://avatars2.githubusercontent.com/u/20404945?v=4?s=100" width="100px;" alt="Maciej Urbańczyk"/><br /><sub><b>Maciej Urbańczyk</b></sub></a><br /><a href="https://github.com/asyncapi/parser-js/issues?q=author%3Amagicmatatjahu" title="Bug reports">🐛</a> <a href="https://github.com/asyncapi/parser-js/commits?author=magicmatatjahu" title="Code">💻</a> <a href="https://github.com/asyncapi/parser-js/pulls?q=is%3Apr+reviewed-by%3Amagicmatatjahu" title="Reviewed Pull Requests">👀</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="25%"><a href="https://www.inmensia.com/"><img src="https://avatars2.githubusercontent.com/u/6494060?v=4?s=100" width="100px;" alt="Juan Mellado"/><br /><sub><b>Juan Mellado</b></sub></a><br /><a href="https://github.com/asyncapi/parser-js/commits?author=jcmellado" title="Code">💻</a></td>
      <td align="center" valign="top" width="25%"><a href="https://www.jamescrowley.net/"><img src="https://avatars1.githubusercontent.com/u/509533?v=4?s=100" width="100px;" alt="James Crowley"/><br /><sub><b>James Crowley</b></sub></a><br /><a href="https://github.com/asyncapi/parser-js/commits?author=jamescrowley" title="Code">💻</a></td>
      <td align="center" valign="top" width="25%"><a href="https://github.com/rmelian"><img src="https://avatars3.githubusercontent.com/u/4565267?v=4?s=100" width="100px;" alt="raisel melian"/><br /><sub><b>raisel melian</b></sub></a><br /><a href="https://github.com/asyncapi/parser-js/commits?author=rmelian" title="Code">💻</a></td>
      <td align="center" valign="top" width="25%"><a href="https://github.com/DanielChuDC"><img src="https://avatars3.githubusercontent.com/u/52316624?v=4?s=100" width="100px;" alt="danielchu"/><br /><sub><b>danielchu</b></sub></a><br /><a href="#infra-DanielChuDC" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/asyncapi/parser-js/commits?author=DanielChuDC" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="25%"><a href="https://www.linkedin.com/in/jbreitenbaumer/"><img src="https://avatars3.githubusercontent.com/u/683438?v=4?s=100" width="100px;" alt="Jürgen B."/><br /><sub><b>Jürgen B.</b></sub></a><br /><a href="https://github.com/asyncapi/parser-js/commits?author=juergenbr" title="Code">💻</a></td>
      <td align="center" valign="top" width="25%"><a href="https://github.com/aeworxet"><img src="https://avatars.githubusercontent.com/u/16149591?v=4?s=100" width="100px;" alt="Viacheslav Turovskyi"/><br /><sub><b>Viacheslav Turovskyi</b></sub></a><br /><a href="https://github.com/asyncapi/parser-js/commits?author=aeworxet" title="Tests">⚠️</a> <a href="https://github.com/asyncapi/parser-js/commits?author=aeworxet" title="Code">💻</a></td>
      <td align="center" valign="top" width="25%"><a href="https://github.com/KhudaDad414"><img src="https://avatars.githubusercontent.com/u/32505158?v=4?s=100" width="100px;" alt="Khuda Dad Nomani"/><br /><sub><b>Khuda Dad Nomani</b></sub></a><br /><a href="https://github.com/asyncapi/parser-js/commits?author=KhudaDad414" title="Code">💻</a> <a href="https://github.com/asyncapi/parser-js/issues?q=author%3AKhudaDad414" title="Bug reports">🐛</a> <a href="https://github.com/asyncapi/parser-js/commits?author=KhudaDad414" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="25%"><a href="https://github.com/aayushmau5"><img src="https://avatars.githubusercontent.com/u/54525741?v=4?s=100" width="100px;" alt="Aayush Kumar Sahu"/><br /><sub><b>Aayush Kumar Sahu</b></sub></a><br /><a href="https://github.com/asyncapi/parser-js/commits?author=aayushmau5" title="Tests">⚠️</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="25%"><a href="https://github.com/JQrdan"><img src="https://avatars.githubusercontent.com/u/25624685?v=4?s=100" width="100px;" alt="Jordan Tucker"/><br /><sub><b>Jordan Tucker</b></sub></a><br /><a href="https://github.com/asyncapi/parser-js/commits?author=JQrdan" title="Tests">⚠️</a> <a href="https://github.com/asyncapi/parser-js/commits?author=JQrdan" title="Code">💻</a></td>
      <td align="center" valign="top" width="25%"><a href="https://github.com/vishesh13byte"><img src="https://avatars.githubusercontent.com/u/66796715?v=4?s=100" width="100px;" alt="vishesh13byte"/><br /><sub><b>vishesh13byte</b></sub></a><br /><a href="https://github.com/asyncapi/parser-js/commits?author=vishesh13byte" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="25%"><a href="https://iamdevelopergirl.github.io/Website-With-Animations/"><img src="https://avatars.githubusercontent.com/u/16351809?v=4?s=100" width="100px;" alt="Elakya"/><br /><sub><b>Elakya</b></sub></a><br /><a href="https://github.com/asyncapi/parser-js/commits?author=iamdevelopergirl" title="Code">💻</a></td>
      <td align="center" valign="top" width="25%"><a href="https://schwank.cc"><img src="https://avatars.githubusercontent.com/u/8232196?v=4?s=100" width="100px;" alt="Dominik Schwank"/><br /><sub><b>Dominik Schwank</b></sub></a><br /><a href="https://github.com/asyncapi/parser-js/issues?q=author%3Adschwank" title="Bug reports">🐛</a> <a href="https://github.com/asyncapi/parser-js/commits?author=dschwank" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="25%"><a href="https://github.com/Ruchip16"><img src="https://avatars.githubusercontent.com/u/72685035?v=4?s=100" width="100px;" alt="Ruchi Pakhle"/><br /><sub><b>Ruchi Pakhle</b></sub></a><br /><a href="https://github.com/asyncapi/parser-js/commits?author=Ruchip16" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="25%"><a href="https://github.com/hainenber"><img src="https://avatars.githubusercontent.com/u/41283691?v=4?s=100" width="100px;" alt="Đỗ Trọng Hải"/><br /><sub><b>Đỗ Trọng Hải</b></sub></a><br /><a href="#security-hainenber" title="Security">🛡️</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
