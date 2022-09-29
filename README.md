[![AsyncAPI JavaScript Parser](./assets/logo.png)](https://www.asyncapi.com)

Use this package to parse and validate AsyncAPI documents —either YAML or JSON— in your Node.js or browser application. Updated bundle for the browser is always attached to the GitHub Release.

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
- [Using in the browser](#using-in-the-browser)
- [Custom message parsers](#custom-message-parsers)
- [Error types](#error-types)
- [Custom extensions](#custom-extensions)
- [Circular references](#circular-references)
- [Stringify](#stringify)
- [Develop](#develop)
- [Contributing](#contributing)
- [Contributors](#contributors)

<!-- tocstop -->

## Install

```
npm install @asyncapi/parser
```
The parser by default supports AsyncAPI Schema Format and JSON Schema Format. For additional formats, you need to install additional plugins. For example:
- Avro schema
  ```
  npm install @asyncapi/avro-schema-parser
  ```
- OpenAPI Schema Object
  ```
  npm install @asyncapi/openapi-schema-parser
  ```
- RAML data type
  ```
  npm install @asyncapi/raml-dt-schema-parser
  ```

## Examples 

### Example passing inline AsyncAPI

```js
const parser = require('@asyncapi/parser');

const doc = await parser.parse(`
  asyncapi: '2.1.0'
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

const doc = await parser.parseFromUrl('https://my.server.com/example-asyncapi.yaml');

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

The parser API is generally structured the same way as the AsyncAPI specification, with additional support functions such as `has<Something>()`. The parser uses wrapped functions to get the properties stored in JSON. This means in order to get the info object you would use the function `doc.info()` and to get the title inside the info object you call `doc.info().title()`.

See [API documentation](./API.md) for more example and full API reference information.

## Using in the browser

The package contains a built-in version of the parser, which is created via [`browserify`](https://github.com/browserify/browserify). To use it, you need to import the parser into the HTML file as below:

```html
<script src="https://unpkg.com/@asyncapi/parser@latest/dist/bundle.js"></script>

<script>
  const parser = window['AsyncAPIParser'];
  ...
</script>
```

Or, if you want to use a parser in a JS application of the SPA kind, import the parser as shown below:

```js
import '@asyncapi/parser/dist/bundle';

const parser = window['AsyncAPIParser'];
...
```

Otherwise, if your application is bundled via bundlers like `webpack`, you can import the parser like a regular package:

```js
import parser from '@asyncapi/parser';
```

In case you just want to check out the latest `bundle.js` without installing the package, we publish one on each GitHub release. You can find it under [this link to the latest release](https://github.com/asyncapi/parser-js/releases/latest/download/bundle.js).

## Custom message parsers

AsyncAPI doesn't enforce one schema format for messages. You can have payload of your messages described with OpenAPI, Avro, etc. This parser by default parses only AsyncAPI schema format. You can extend it by creating a custom parser and registering it within the parser:

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
|`fetch-url-error`| None | The URL provided for fetching AsynAPI document is invalid.

For more information about the `ParserError` class, [check out the documentation](./API.md#new_ParserError_new).

## Custom extensions

The parser uses custom extensions to define additional information about the spec. Each has a different purpose but all of them are there to make it much easier to work with the AsyncAPI document. These extensions are prefixed with `x-parser-`. The following extensions are used :
- `x-parser-spec-parsed` is used to specify if the AsyncAPI document is already parsed by the parser. Property `x-parser-spec-parsed` is added to the root of the document with the `true` value.
- `x-parser-message-parsed` is used to specify if the message is already parsed by the message parser. Property `x-parser-message-parsed` is added to the root of the document with the `true` value.
- `x-parser-message-name` is used to specify the name of the message if it is not provided. For messages without names, the parser generates anonymous names. Property `x-parser-message-name` is added to a message object with a value that follows this pattern: `<anonymous-message-${number}>`. This value is returned by `message.uid()` when regular `name` property is not present.
- `x-parser-schema-id` is used to specify the ID of the schema if it is not provided. For schemas without IDs, the parser generates anonymous names. Property `x-parser-schema-id` is added to every object of a schema with a value that follows this pattern: `<anonymous-schema-${number}>`. This value is returned by `schema.uid()` when regular `$id` property is not present.
- `x-parser-original-traits` is where traits are stored after they are applied on the AsyncAPI document. The reason is because the original `traits` property is removed.
- `x-parser-original-schema-format` holds information about the original schema format of the payload. You can use different schema formats with the AsyncAPI documents and the parser converts them to AsyncAPI schema. This is why different schema format is set, and the original one is preserved in the extension.
- `x-parser-original-payload` holds the original payload of the message. You can use different formats for payloads with the AsyncAPI documents and the parser converts them to. For example, it converts payload described with Avro schema to AsyncAPI schema. The original payload is preserved in the extension.
- [`x-parser-circular`](#circular-references)

> **NOTE**: All extensions added by the parser (including all properties) should be retrieved using special functions. Names of extensions and their location may change, and their eventual changes will not be announced.

## Circular references

Parser dereferences all circular references by default. In addition, to simplify interactions with the parser, the following is added:
- `x-parser-circular` property is added to the root of the AsyncAPI document to indicate that the document contains circular references. Tooling developer that doesn't want to support circular references can use the `hasCircular()` function to check the document and provide a proper message to the user.
- `isCircular()` function is added to the [Schema Model](./lib/models/schema.js) to determine if a given schema is circular with respect to previously occurring schemas in the tree.

## Stringify

Converting a parsed document to a string may be necessary when saving the parsed document to a database, or similar situations where you need to parse the document just once and then reuse it.

For that, the Parser supports the ability to stringify a parsed AsyncAPI document through the static `AsyncAPIDocument.stringify(...parsedDoc)` method. This method differs from the native `JSON.stringify(...json)` implementation, in that every reference that occurs (at least twice throughout the document) is converted into a [JSON Pointer](https://datatracker.ietf.org/doc/html/rfc6901) path with a `$ref:` prefix:

```json
{
  "foo": "$ref:$.some.path.to.the.bar"
}
```
		
To parse a stringified document into an AsyncAPIDocument instance, you must use the static `AsyncAPIDocument.parse(...stringifiedDoc)` method. It isn't compatible with the native `JSON.parse()` method. It replaces the given references pointed by the [JSON Pointer](https://datatracker.ietf.org/doc/html/rfc6901) path, with an `$ref:` prefix to the original objects.

A few advantages of this solution:
- The string remains as small as possible due to the use of [JSON Pointers](https://datatracker.ietf.org/doc/html/rfc6901).
- All circular references are preserved.

## Develop

1. Make sure you are using Node.js 14 or higher and npm 7 or higher
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
  <tbody>
    <tr>
      <td align="center"><a href="http://www.fmvilas.com/"><img src="https://avatars3.githubusercontent.com/u/242119?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Fran Méndez</b></sub></a><br /><a href="#question-fmvilas" title="Answering Questions">💬</a> <a href="https://github.com/asyncapi/parser-js/issues?q=author%3Afmvilas" title="Bug reports">🐛</a> <a href="https://github.com/asyncapi/parser-js/commits?author=fmvilas" title="Code">💻</a> <a href="https://github.com/asyncapi/parser-js/commits?author=fmvilas" title="Documentation">📖</a> <a href="#ideas-fmvilas" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-fmvilas" title="Maintenance">🚧</a> <a href="#plugin-fmvilas" title="Plugin/utility libraries">🔌</a> <a href="https://github.com/asyncapi/parser-js/pulls?q=is%3Apr+reviewed-by%3Afmvilas" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/asyncapi/parser-js/commits?author=fmvilas" title="Tests">⚠️</a></td>
      <td align="center"><a href="https://resume.github.io/?derberg"><img src="https://avatars1.githubusercontent.com/u/6995927?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Lukasz Gornicki</b></sub></a><br /><a href="#question-derberg" title="Answering Questions">💬</a> <a href="https://github.com/asyncapi/parser-js/issues?q=author%3Aderberg" title="Bug reports">🐛</a> <a href="https://github.com/asyncapi/parser-js/commits?author=derberg" title="Code">💻</a> <a href="https://github.com/asyncapi/parser-js/commits?author=derberg" title="Documentation">📖</a> <a href="#ideas-derberg" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-derberg" title="Maintenance">🚧</a> <a href="https://github.com/asyncapi/parser-js/pulls?q=is%3Apr+reviewed-by%3Aderberg" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/asyncapi/parser-js/commits?author=derberg" title="Tests">⚠️</a></td>
      <td align="center"><a href="https://github.com/jonaslagoni"><img src="https://avatars1.githubusercontent.com/u/13396189?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jonas Lagoni</b></sub></a><br /><a href="#question-jonaslagoni" title="Answering Questions">💬</a> <a href="https://github.com/asyncapi/parser-js/issues?q=author%3Ajonaslagoni" title="Bug reports">🐛</a> <a href="https://github.com/asyncapi/parser-js/commits?author=jonaslagoni" title="Code">💻</a> <a href="#ideas-jonaslagoni" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/asyncapi/parser-js/pulls?q=is%3Apr+reviewed-by%3Ajonaslagoni" title="Reviewed Pull Requests">👀</a></td>
      <td align="center"><a href="https://github.com/magicmatatjahu"><img src="https://avatars2.githubusercontent.com/u/20404945?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Maciej Urbańczyk</b></sub></a><br /><a href="https://github.com/asyncapi/parser-js/issues?q=author%3Amagicmatatjahu" title="Bug reports">🐛</a> <a href="https://github.com/asyncapi/parser-js/commits?author=magicmatatjahu" title="Code">💻</a> <a href="https://github.com/asyncapi/parser-js/pulls?q=is%3Apr+reviewed-by%3Amagicmatatjahu" title="Reviewed Pull Requests">👀</a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://www.inmensia.com/"><img src="https://avatars2.githubusercontent.com/u/6494060?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Juan Mellado</b></sub></a><br /><a href="https://github.com/asyncapi/parser-js/commits?author=jcmellado" title="Code">💻</a></td>
      <td align="center"><a href="https://www.jamescrowley.net/"><img src="https://avatars1.githubusercontent.com/u/509533?v=4?s=100" width="100px;" alt=""/><br /><sub><b>James Crowley</b></sub></a><br /><a href="https://github.com/asyncapi/parser-js/commits?author=jamescrowley" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/rmelian"><img src="https://avatars3.githubusercontent.com/u/4565267?v=4?s=100" width="100px;" alt=""/><br /><sub><b>raisel melian</b></sub></a><br /><a href="https://github.com/asyncapi/parser-js/commits?author=rmelian" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/DanielChuDC"><img src="https://avatars3.githubusercontent.com/u/52316624?v=4?s=100" width="100px;" alt=""/><br /><sub><b>danielchu</b></sub></a><br /><a href="#infra-DanielChuDC" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/asyncapi/parser-js/commits?author=DanielChuDC" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://www.linkedin.com/in/jbreitenbaumer/"><img src="https://avatars3.githubusercontent.com/u/683438?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jürgen B.</b></sub></a><br /><a href="https://github.com/asyncapi/parser-js/commits?author=juergenbr" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/aeworxet"><img src="https://avatars.githubusercontent.com/u/16149591?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Viacheslav Turovskyi</b></sub></a><br /><a href="https://github.com/asyncapi/parser-js/commits?author=aeworxet" title="Tests">⚠️</a> <a href="https://github.com/asyncapi/parser-js/commits?author=aeworxet" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/KhudaDad414"><img src="https://avatars.githubusercontent.com/u/32505158?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Khuda Dad Nomani</b></sub></a><br /><a href="https://github.com/asyncapi/parser-js/commits?author=KhudaDad414" title="Code">💻</a> <a href="https://github.com/asyncapi/parser-js/issues?q=author%3AKhudaDad414" title="Bug reports">🐛</a> <a href="https://github.com/asyncapi/parser-js/commits?author=KhudaDad414" title="Tests">⚠️</a></td>
      <td align="center"><a href="https://github.com/aayushmau5"><img src="https://avatars.githubusercontent.com/u/54525741?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Aayush Kumar Sahu</b></sub></a><br /><a href="https://github.com/asyncapi/parser-js/commits?author=aayushmau5" title="Tests">⚠️</a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/JQrdan"><img src="https://avatars.githubusercontent.com/u/25624685?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jordan Tucker</b></sub></a><br /><a href="https://github.com/asyncapi/parser-js/commits?author=JQrdan" title="Tests">⚠️</a> <a href="https://github.com/asyncapi/parser-js/commits?author=JQrdan" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/vishesh13byte"><img src="https://avatars.githubusercontent.com/u/66796715?v=4?s=100" width="100px;" alt=""/><br /><sub><b>vishesh13byte</b></sub></a><br /><a href="https://github.com/asyncapi/parser-js/commits?author=vishesh13byte" title="Tests">⚠️</a></td>
      <td align="center"><a href="https://iamdevelopergirl.github.io/Website-With-Animations/"><img src="https://avatars.githubusercontent.com/u/16351809?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Elakya</b></sub></a><br /><a href="https://github.com/asyncapi/parser-js/commits?author=iamdevelopergirl" title="Code">💻</a></td>
      <td align="center"><a href="https://schwank.cc"><img src="https://avatars.githubusercontent.com/u/8232196?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dominik Schwank</b></sub></a><br /><a href="https://github.com/asyncapi/parser-js/issues?q=author%3Adschwank" title="Bug reports">🐛</a> <a href="https://github.com/asyncapi/parser-js/commits?author=dschwank" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
