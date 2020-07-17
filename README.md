<h5 align="center">
  <br>
  <a href="https://www.asyncapi.org"><img src="https://github.com/asyncapi/parser-nodejs/raw/master/assets/logo.png" alt="AsyncAPI logo" width="200"></a>
  <br>
  JS Parser
</h5>
<h4 align="center">Parse and validate AsyncAPI documents</h4>

---

## :loudspeaker: ATTENTION:

This package is under development and it has not reached version 1.0.0 yet, what means its API might change without prior notice. Once it reaches its first stable version, we'll follow semantic versioning.

---

Use this package to parse and validate AsyncAPI documents —either YAML or JSON— in your Node.js or browser application. Updated bundle for the browser is always attached to the GitHub Release.

> This package doesn't support AsyncAPI 1.x.

### Install

```
npm install @asyncapi/parser
```

### API

[Check out the API page](./API.md).

### Examples

##### Example passing inline AsyncAPI

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

##### Example passing a URL

```js
const parser = require('@asyncapi/parser');

const doc = await parser.parseUrl('https://my.server.com/example-asyncapi.yaml');

console.log(doc.info().title());
// => Example
```

##### Example using OpenAPI schemas

Head over to [asyncapi/openapi-schema-parser](https://www.github.com/asyncapi/openapi-schema-parser) for more information.

##### Example using RAML data types

Head over to [asyncapi/raml-dt-schema-parser](https://www.github.com/asyncapi/raml-dt-schema-parser) for more information.

### Custom message parsers

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
    ```
    const myCustomParser = require('mycustomParser');

    parser.registerSchemaParser(myCustomParser);
    ```

### Error types

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

### Circular references

Parser dereferences all circular references by default. In addition, to simplify interactions with the parser, the following is added:
- `x-parser-circular` property is added to the root of the AsyncAPI document to indicate that the document contains circular references. Tooling developer that doesn't want to support circular references can use the `hasCircular` method to check the document and provide a proper message to the user.
- `x-parser-circular` property is added to every schema where circular reference starts. You should use `isCircular` method on a Schema model like `document.components().schema('RecursiveSelf').properties()['selfChildren'].isCircular()`.

### Develop

1. Run tests with `npm test`
1. Write code and tests.
1. Make sure all tests pass `npm test`

Release regenerates API documentation and browser bundle, so you do not have to regenerate it manually with `npm run docs` and `npm run prepublishOnly`.

## Contributing

Read [CONTRIBUTING](CONTRIBUTING.md) guide.
