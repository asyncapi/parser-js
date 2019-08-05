<h5 align="center">
  <br>
  <a href="https://www.asyncapi.org"><img src="https://github.com/asyncapi/parser-nodejs/raw/master/assets/logo.png" alt="AsyncAPI logo" width="200"></a>
  <br>
  JS Parser
</h5>
<h4 align="center">Parse and validate AsyncAPI documents</h4>

---

## :loudspeaker: ATTENTION:

This package is under development and it has not reached version 1.0.0, what means that its API might change without prior notice. Once it reaches its first stable version, we'll follow semantic versioning.

---

Use this package to parse and validate AsyncAPI documents —either YAML or JSON— in your Node.js or browser application.

> This package doesn't support AsyncAPI 1.x.

### Install

```
npm install asyncapi-parser
```

### API

#### `.parse(yamlOrJSONdocument, options) => JSONDocument`

The `parse` method will take care of parsing and validating the AsyncAPI document. It returns an AsyncAPIDocument, which is a JSON version of the document with all the message payloads converted to JSON Schema Draft 7 schemas and the traits already resolved and merged into the document.

#### `.parseUrl(url, options) => JSONDocument`

The `parseUrl` method fetches a YAML or JSON document on the given URL and passes its content to the `parse` method.

### Example

```js
const parser = require('asyncapi-parser');

const doc = parser.parse(`
  asyncapi: '2.0.0-rc1'
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

console.log(doc.info.title);
// => Example
```
