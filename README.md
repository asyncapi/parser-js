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

TBD

## Examples 

### Example passing inline AsyncAPI

```js
// TBD
```

### Example passing a URL

```js
// TBD
```

### Example using Avro schemas

Head over to [asyncapi/avro-schema-parser](https://www.github.com/asyncapi/avro-schema-parser) for more information.

### Example using OpenAPI schemas

Head over to [asyncapi/openapi-schema-parser](https://www.github.com/asyncapi/openapi-schema-parser) for more information.

### Example using RAML data types

Head over to [asyncapi/raml-dt-schema-parser](https://www.github.com/asyncapi/raml-dt-schema-parser) for more information.

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

Direct access to the parsed JSON document is always available through the `doc.raw()` method.

See [API documentation](/docs/api.md) for more example and full API reference information.

## Using in the browser

The package contains a built-in version of the parser, which is created via [`browserify`](https://github.com/browserify/browserify). To use it, you need to import the parser into the HTML file as below:

```html
<! –– TBD ––> 
```

Or, if you want to use a parser in a JS application of the SPA kind, import the parser as shown below:

```js
// TBD
```

Otherwise, if your application is bundled via bundlers like `webpack`, you can import the parser like a regular package:

```js
// TBD
```

## Custom message parsers

AsyncAPI doesn't enforce one schema format for messages. You can have payload of your messages described with OpenAPI, Avro, etc. This parser by default parses only AsyncAPI schema format. You can extend it by creating a custom parser and registering it within the parser:

1. Create custom parser module that exports two functions:

    ```js
    // TBD
    ```

2. Before parsing an AsyncAPI document with a parser, register the additional custom schema parser:

    ```js
    // TBD
    ```

## Error types

TBD

## Custom extensions

TBD

> **NOTE**: All extensions added by the parser (including all properties) should be retrieved using special functions. Names of extensions and their location may change, and their eventual changes will not be announced.

## Circular references

TBD

## Stringify

TBD

## Develop

TBD

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
