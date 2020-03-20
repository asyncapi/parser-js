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

### Develop

1. Run tests with `npm test`
1. Write code and tests.
1. Make sure all tests pass `npm test`
1. Generate new API docs `npm run docs`
1. Update bundle for client-side parser `npm run bundle`

## Contributing

Read [CONTRIBUTING](CONTRIBUTING.md) guide.