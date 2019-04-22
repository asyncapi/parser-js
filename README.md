<h5 align="center">
  <br>
  <a href="https://asyncapi.org"><img src="https://github.com/asyncapi/parser-nodejs/raw/master/assets/logo.png" alt="AsyncAPI logo" width="200"></a>
  <br>
  Node.js parser
</h5>
<h4 align="center">Parse and validation AsyncAPI documents</h4>

---

Use this package to parse and validate AsyncAPI documents —either YAML or JSON— in your Node.js application.

> This package doesn't support AsyncAPI 1.x.

### Install

```
npm install asyncapi-parser
```

### API

#### `.parse(yamlOrJSONdocument) => AsyncAPIDocument`

The `parse` method will take care of parsing and validating the AsyncAPI document. It returns an AsyncAPIDocument, which is a JSON version of the document with all the message payloads converted to JSON Schema Draft 7 schemas and the traits already resolved and merged into the document.

### Example

```js
const parser = require('asyncapi-parser');

const doc = parser.parse(`
  asyncapi: '2.0.0'
  id: 'urn:com.application.example'
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

### Implementation details

This package offers a wrapper for the compiled version of the original Go parser. [Check out the Go parser for more details](https://github.com/asyncapi/parser).
