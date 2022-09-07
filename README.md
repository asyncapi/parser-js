[![AsyncAPI JavaScript Parser](./assets/logo.png)](https://www.asyncapi.com)

Use this package to validate and parse AsyncAPI documents —either YAML or JSON— in your Node.js or browser application. Validation is powered by [Spectral](https://github.com/stoplightio/spectral).

![npm](https://img.shields.io/npm/v/@asyncapi/parser?style=for-the-badge) ![npm](https://img.shields.io/npm/dt/@asyncapi/parser?style=for-the-badge)

> :warning: This package doesn't support AsyncAPI 1.x anymore. We recommend to upgrade to the latest AsyncAPI version using the [AsyncAPI converter](https://github.com/asyncapi/converter-js). If you need to convert documents on the fly, you may use the [Node.js](https://github.com/asyncapi/converter-js) or [Go](https://github.com/asyncapi/converter-go) converters.

<!-- toc is generated with GitHub Actions do not remove toc markers -->

<!-- toc -->

- [Installation](#installation)
- [Examples](#examples)
  * [Example with parsing](#example-with-parsing)
  * [Example with validation](#example-with-validation)
  * [Example using Avro schemas](#example-using-avro-schemas)
  * [Example using OpenAPI schemas](#example-using-openapi-schemas)
  * [Example using RAML data types](#example-using-raml-data-types)
  * [Example with stringify and unstringify parsed document](#example-with-stringify-and-unstringify-parsed-document)
- [API documentation](#api-documentation)
- [Using in the browser](#using-in-the-browser)
- [Custom schema parsers](#custom-schema-parsers)
  * [Official supported custom schema parsers](#official-supported-custom-schema-parsers)
- [Custom extensions](#custom-extensions)
- [Circular references](#circular-references)
- [Stringify](#stringify)
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

Parser-JS API implements a global API definition for all AsyncAPI parser implementations known as the [Parser-API](https://github.com/asyncapi/parser-api). 
This API is designed having in mind developer experience and resiliency to breaking changes. 

The following table shows a compatibility matrix between this parser, and the [Parser-API](https://github.com/asyncapi/parser-api), as well as the AsyncAPI spec version supported by each release of this parser.

Parser-JS | Parser-API                                                           | Spec 2.x | Spec 3.x
----------|----------------------------------------------------------------------|----------|---------
1.x       |                                                                      | ✓        |  
2.x       | [1.x](https://github.com/asyncapi/parser-api/blob/master/docs/v1.md) | ✓        | ✓

- `✓` Fully supported version.
- `-` The AsyncAPI Spec version has features the Parser-JS can't use but the rest are fully supported.
- Empty means not supported version.

Additionally to all the methods declared in the [Parser-API](https://github.com/asyncapi/parser-api), this parser might introduce some helper functions.

Direct access to the parsed JSON document is always available through the `doc.json()` method.

See [API documentation](./docs/api.md) for more examples and full API reference information.

## Using in the browser/SPA apps

The package contains a built-in version of the parser. To use it, you need to import the parser into the HTML file as below:

```html
<script src="https://unpkg.com/@asyncapi/parser@latest/browser/index.js"></script>

<script>
  const parser = new window.AsyncAPIParser();
  const { parsed, diagnostics } = parser.parse(...);
</script>
```

Or, if you want to use the parser in a JS SPA-type application where you have a predefined bundler configuration that is difficult to change (e.g. you use [`create-react-app`](https://github.com/facebook/create-react-app)) then you can import the parser as below:

```js
import Parser from '@asyncapi/parser/browser';

const parser = new Parser();
const { parsed, diagnostics } = parser.parse(...);
```

> **NOTE**: Using the above code, we import the entire bundled parser into application. This may result in duplicate code in the final application bundle, only if the application uses the same dependencies what the parser. If, on the other hand, you want to have the smallest bundle possible, we recommend using the following import and properly configure bundler.

Otherwise, if your application is bundled via bundlers like `webpack` and you can configure it, you can import the parser like a regular package:

```js
import { Parser } from '@asyncapi/parser';

const parser = new Parser();
const { parsed, diagnostics } = parser.parse(...);
```

## Custom schema parsers
<<<<<<< next-major

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
=======
>>>>>>> add tests and docs

2. Before parsing/validating an AsyncAPI document with a parser, register the additional custom schema parser:

    ```ts
    import { Parser } from '@asyncapi/parser';
    import myCustomSchemaParser from './my-custom-schema-parser';

    const parser = new Parser();
    parser.registerSchemaParser(myCustomSchemaParser);
    ```

### Official supported custom schema parsers

In AsyncAPI Initiative we support below custom schema parsers. To install them, run below comamnds:

- Avro schema:

  ```bash
  npm install @asyncapi/avro-schema-parser
  yarn add @asyncapi/avro-schema-parser
  ```

- OpenAPI (3.0.0) Schema Object:

  ```bash
  npm install @asyncapi/openapi-schema-parser
  yarn add @asyncapi/openapi-schema-parser
  ```

- RAML data type:

  ```bash
  npm install @asyncapi/raml-dt-schema-parser
  yarn add @asyncapi/raml-dt-schema-parser
  ```

  > **NOTE**: That custom parser works only in the NodeJS environment. Do not use it in browser applications!

## Custom extensions

TBD

> **NOTE**: All extensions added by the parser (including all properties) should be retrieved using special functions. Names of extensions and their location may change, and their eventual changes will not be announced.

## Circular references

TBD

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

## Develop

1. Write code and tests in the `test` folder.
2. Make sure all tests pass `npm test`.
3. Make sure code is well formatted and secure by `npm run lint` command.

## Contributing

Read [CONTRIBUTING](https://github.com/asyncapi/.github/blob/master/CONTRIBUTING.md) guide.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
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
    <td align="center"><a href="https://github.com/aeworxet"><img src="https://avatars.githubusercontent.com/u/16149591?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Viacheslav Turovskyi</b></sub></a><br /><a href="https://github.com/asyncapi/parser-js/commits?author=aeworxet" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/KhudaDad414"><img src="https://avatars.githubusercontent.com/u/32505158?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Khuda Dad Nomani</b></sub></a><br /><a href="https://github.com/asyncapi/parser-js/commits?author=KhudaDad414" title="Code">💻</a> <a href="https://github.com/asyncapi/parser-js/issues?q=author%3AKhudaDad414" title="Bug reports">🐛</a> <a href="https://github.com/asyncapi/parser-js/commits?author=KhudaDad414" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/aayushmau5"><img src="https://avatars.githubusercontent.com/u/54525741?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Aayush Kumar Sahu</b></sub></a><br /><a href="https://github.com/asyncapi/parser-js/commits?author=aayushmau5" title="Tests">⚠️</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/JQrdan"><img src="https://avatars.githubusercontent.com/u/25624685?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jordan Tucker</b></sub></a><br /><a href="https://github.com/asyncapi/parser-js/commits?author=JQrdan" title="Tests">⚠️</a> <a href="https://github.com/asyncapi/parser-js/commits?author=JQrdan" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/vishesh13byte"><img src="https://avatars.githubusercontent.com/u/66796715?v=4?s=100" width="100px;" alt=""/><br /><sub><b>vishesh13byte</b></sub></a><br /><a href="https://github.com/asyncapi/parser-js/commits?author=vishesh13byte" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://iamdevelopergirl.github.io/Website-With-Animations/"><img src="https://avatars.githubusercontent.com/u/16351809?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Elakya</b></sub></a><br /><a href="https://github.com/asyncapi/parser-js/commits?author=iamdevelopergirl" title="Code">💻</a></td>
    <td align="center"><a href="https://schwank.cc"><img src="https://avatars.githubusercontent.com/u/8232196?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dominik Schwank</b></sub></a><br /><a href="https://github.com/asyncapi/parser-js/issues?q=author%3Adschwank" title="Bug reports">🐛</a> <a href="https://github.com/asyncapi/parser-js/commits?author=dschwank" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
