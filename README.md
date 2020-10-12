<h5 align="center">
  <br>
  <a href="https://www.asyncapi.org"><img src="https://github.com/asyncapi/parser-nodejs/raw/master/assets/logo.png" alt="AsyncAPI logo" width="200"></a>
  <br>
  JavaScript Parser
</h5>
<p align="center">
  <em>Use this package to parse and validate AsyncAPI documents —either YAML or JSON— in your Node.js or browser application. Updated bundle for the browser is always attached to the GitHub Release.</em>
</p>

![npm](https://img.shields.io/npm/v/@asyncapi/parser?style=for-the-badge) ![npm](https://img.shields.io/npm/dt/@asyncapi/parser?style=for-the-badge)

> :warning: This package doesn't support AsyncAPI 1.x anymore. We recommend to upgrade to the latest AsyncAPI version using the [AsyncAPI converter](https://github.com/asyncapi/converter-js). If you need to convert documents on the fly, you may use the [Node.js](https://github.com/asyncapi/converter-js) or [Go](https://github.com/asyncapi/converter-go) converters.

<!-- toc is generated with GitHub Actions do not remove toc markers -->

<!-- toc -->

- [Install](#install)
- [Examples](#examples)
  * [Example passing inline AsyncAPI](#example-passing-inline-asyncapi)
  * [Example passing a URL](#example-passing-a-url)
  * [Example using Avro schemas](#example-using-avro-schemas)
  * [Example using OpenAPI schemas](#example-using-openapi-schemas)
  * [Example using RAML data types](#example-using-raml-data-types)
- [API documentation](#api-documentation)
- [Custom message parsers](#custom-message-parsers)
- [Error types](#error-types)
- [Circular references](#circular-references)
- [Develop](#develop)
- [Contributing](#contributing)
- [Contributors](#contributors)

<!-- tocstop -->

## Install

```
npm install @asyncapi/parser
```

## Examples 

### Example passing inline AsyncAPI

```js
const parser = require('@asyncapi/parser');

const doc = await parser.parse(`
  asyncapi: '2.0.0'
  info:
    title: Example
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

console.log(doc.info().title());
// => Example
```

### Example passing a URL

```js
const parser = require('@asyncapi/parser');

const doc = await parser.parseUrl('https://my.server.com/example-asyncapi.yaml');

console.log(doc.info().title());
// => Example
```

### Example using Avro schemas

Head over to [asyncapi/avro-schema-parser](https://www.github.com/asyncapi/avro-schema-parser) for more information.

### Example using OpenAPI schemas

Head over to [asyncapi/openapi-schema-parser](https://www.github.com/asyncapi/openapi-schema-parser) for more information.

### Example using RAML data types

Head over to [asyncapi/raml-dt-schema-parser](https://www.github.com/asyncapi/raml-dt-schema-parser) for more information.

## API documentation

See [API documentation](/API.md) for more example and full API reference information.

## Custom message parsers

AsyncAPI doesn't enforce one schema format for messages. You can have payload of your messages described with OpenAPI, Avro, etc. This parser by default parses only AsyncAPI schema format. You can extend it by creating a custom parser and registering it withing the parser:

1. Create custom parser module that exports two functions:
    ```js
    module.exports = {
      /*
       * message {Object} is the object containing AsyncAPI Message property
       * defaultSchemaFormat {String} information about the default schema format mime type
       * schemaFormat {String} information about custom schemaFormat mime type provided in AsyncAPI Document
       * fileFormat {String} information if provided AsyncAPI Document was JSON or YAML
       * parsedAsyncAPIDocument {Object} Full AsyncAPI Document parsed into Object
       * pathToPayload {String} path of the message passed to the parser, relative to the root of AsyncAPI Document
      */
      parse: ({ message, defaultSchemaFormat, originalAsyncAPIDocument, schemaFormat, fileFormat, parsedAsyncAPIDocument, pathToPayload }) => { /* custom parsing logic */ },
      getMimeTypes: () => [
        '//mime types that will be used as the `schemaFormat` property of the message to specify its mime type',
        'application/vnd.custom.type;version=1.0.0',
        'application/vnd.custom.type+json;version=1.0.0',
      ]
    }
    ```
2. Before parsing an AsyncAPI document with a parser, register the additional custom schema parser:
    ```js
    const myCustomParser = require('mycustomParser');

    parser.registerSchemaParser(myCustomParser);
    ```

## Error types

This package throws a bunch of different error types. All errors contain a `type` (prefixed by this repo URL) and a `title` field. The following table describes all the errors and the extra fields they include:

|Type|Extra Fields|Description|
|---|---|---|
|`null-or-falsey-document`| None | The AsyncAPI document is null or a JS "falsey" value.
|`invalid-document-type`| None | The AsyncAPI document is not a string nor a JS object.
|`invalid-json`| `detail`, `location` | The AsyncAPI document is not valid JSON.
|`invalid-yaml`| `detail`, `location` | The AsyncAPI document is not valid YAML.
|`impossible-to-convert-to-json`|`detail`|Internally, this parser only handles JSON so it tries to immediately convert the YAML to JSON. This error means this process failed.
|`missing-asyncapi-field`|`parsedJSON`|The AsyncAPI document doesn't have the mandatory `asyncapi` field.
|`unsupported-version`|`detail`, `parsedJSON`, `validationErrors`|The version of the `asyncapi` field is not supported. Typically, this means that you're using a version below 2.0.0.
|`dereference-error`|`parsedJSON`, `refs`|This means the parser tried to resolve and dereference $ref's and the process failed. Typically, this means the $ref it's pointing to doesn't exist.
|`unexpected-error`|`parsedJSON`|We have our code covered with try/catch blocks and you should never see this error. If you see it, please open an issue to let us know.
|`validation-errors`|`parsedJSON`, `validationErrors`|The AsyncAPI document contains errors. See `validationErrors` for more information.
|`impossible-to-register-parser`| None | Registration of custom message parser failed.
|`schema-validation-errors`| `parsedJSON`, `validationErrors` | Schema of the payload provided in the AsyncAPI document is not valid with AsyncAPI schema format.

For more information about the `ParserError` class, [check out the documentation](./API.md#new_ParserError_new).

## Circular references

Parser dereferences all circular references by default. In addition, to simplify interactions with the parser, the following is added:
- `x-parser-circular` property is added to the root of the AsyncAPI document to indicate that the document contains circular references. Tooling developer that doesn't want to support circular references can use the `hasCircular()` function to check the document and provide a proper message to the user.
- `x-parser-circular` property is added to every schema of array type that is circular. To check if schema is circular or not, you should use `isCircular()` function on a Schema model like `document.components().schema('RecursiveSelf').properties()['selfChildren'].isCircular()`.
- `x-parser-circular-props` property is added to every schema of object type with a list of properties that are circular. To check if a schema has properties with circular references, you should use `hasCircularProps()` function. To get a list of properties with circular references, you should use `circularProps()` function.

## Develop

1. Write code and tests.
1. Make sure all tests pass `npm test`
1. Make sure code is well formatted and secure `npm run lint`

Release regenerates API documentation and browser bundle, so you do not have to regenerate it manually with `npm run docs` and `npm run prepublishOnly`.

## Contributing

Read [CONTRIBUTING](https://github.com/asyncapi/.github/blob/master/CONTRIBUTING.md) guide.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://www.fmvilas.com/"><img src="https://avatars3.githubusercontent.com/u/242119?v=4" width="100px;" alt=""/><br /><sub><b>Fran Méndez</b></sub></a><br /><a href="#question-fmvilas" title="Answering Questions">💬</a> <a href="https://github.com/asyncapi/parser-js/issues?q=author%3Afmvilas" title="Bug reports">🐛</a> <a href="https://github.com/asyncapi/parser-js/commits?author=fmvilas" title="Code">💻</a> <a href="https://github.com/asyncapi/parser-js/commits?author=fmvilas" title="Documentation">📖</a> <a href="#ideas-fmvilas" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-fmvilas" title="Maintenance">🚧</a> <a href="#plugin-fmvilas" title="Plugin/utility libraries">🔌</a> <a href="https://github.com/asyncapi/parser-js/pulls?q=is%3Apr+reviewed-by%3Afmvilas" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/asyncapi/parser-js/commits?author=fmvilas" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://resume.github.io/?derberg"><img src="https://avatars1.githubusercontent.com/u/6995927?v=4" width="100px;" alt=""/><br /><sub><b>Lukasz Gornicki</b></sub></a><br /><a href="#question-derberg" title="Answering Questions">💬</a> <a href="https://github.com/asyncapi/parser-js/issues?q=author%3Aderberg" title="Bug reports">🐛</a> <a href="https://github.com/asyncapi/parser-js/commits?author=derberg" title="Code">💻</a> <a href="https://github.com/asyncapi/parser-js/commits?author=derberg" title="Documentation">📖</a> <a href="#ideas-derberg" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-derberg" title="Maintenance">🚧</a> <a href="https://github.com/asyncapi/parser-js/pulls?q=is%3Apr+reviewed-by%3Aderberg" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/asyncapi/parser-js/commits?author=derberg" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/jonaslagoni"><img src="https://avatars1.githubusercontent.com/u/13396189?v=4" width="100px;" alt=""/><br /><sub><b>Jonas Lagoni</b></sub></a><br /><a href="#question-jonaslagoni" title="Answering Questions">💬</a> <a href="https://github.com/asyncapi/parser-js/issues?q=author%3Ajonaslagoni" title="Bug reports">🐛</a> <a href="https://github.com/asyncapi/parser-js/commits?author=jonaslagoni" title="Code">💻</a> <a href="#ideas-jonaslagoni" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/asyncapi/parser-js/pulls?q=is%3Apr+reviewed-by%3Ajonaslagoni" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/magicmatatjahu"><img src="https://avatars2.githubusercontent.com/u/20404945?v=4" width="100px;" alt=""/><br /><sub><b>Maciej Urbańczyk</b></sub></a><br /><a href="https://github.com/asyncapi/parser-js/issues?q=author%3Amagicmatatjahu" title="Bug reports">🐛</a> <a href="https://github.com/asyncapi/parser-js/commits?author=magicmatatjahu" title="Code">💻</a> <a href="https://github.com/asyncapi/parser-js/pulls?q=is%3Apr+reviewed-by%3Amagicmatatjahu" title="Reviewed Pull Requests">👀</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://www.inmensia.com/"><img src="https://avatars2.githubusercontent.com/u/6494060?v=4" width="100px;" alt=""/><br /><sub><b>Juan Mellado</b></sub></a><br /><a href="https://github.com/asyncapi/parser-js/commits?author=jcmellado" title="Code">💻</a></td>
    <td align="center"><a href="https://www.jamescrowley.net/"><img src="https://avatars1.githubusercontent.com/u/509533?v=4" width="100px;" alt=""/><br /><sub><b>James Crowley</b></sub></a><br /><a href="https://github.com/asyncapi/parser-js/commits?author=jamescrowley" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/rmelian"><img src="https://avatars3.githubusercontent.com/u/4565267?v=4" width="100px;" alt=""/><br /><sub><b>raisel melian</b></sub></a><br /><a href="https://github.com/asyncapi/parser-js/commits?author=rmelian" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/DanielChuDC"><img src="https://avatars3.githubusercontent.com/u/52316624?v=4" width="100px;" alt=""/><br /><sub><b>danielchu</b></sub></a><br /><a href="#infra-DanielChuDC" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!