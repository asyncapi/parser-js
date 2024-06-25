# Migrating from v2 to v3

The ONLY thing that changes between v3 and v4 has to do with the standalone browser bundle.

## New browser bundle

In the old browser bundle you only had access to the parser.

```js
const parser = new window.AsyncAPIParser();
const spec = '{ ... }';
const { document: parsedDocument, diagnostics } = await parser.parse(spec);
```

With the new browser bundle, you have access a bunch of support functions such as `fromURL`, `convertToOldAPI`, `unstringify`, `stringify`.

```js
const parser = new window.AsyncAPIParser.Parser();
const spec = '{ ... }';
const { document: parsedDocument, diagnostics } = await parser.parse(spec);
...
const result = window.AsyncAPIParser.fromURL(parser, 'http://localhost:8080/asyncapi.json');
const {document: parsedDocument, diagnostics} = await result.parse();
```
