const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const fs = require('fs');
const path = require("path");
const parser = require('../lib');
const ParserError = require('../lib/errors/parser-error');

chai.use(chaiAsPromised);
const expect = chai.expect;

const invalidYAML = fs.readFileSync(path.resolve(__dirname, "./malformed-asyncapi.yaml"), 'utf8');
const inputYAML = fs.readFileSync(path.resolve(__dirname, "./asyncapi.yaml"), 'utf8');
const inputJSON = fs.readFileSync(path.resolve(__dirname, "./asyncapi.json"), 'utf8');
const invalidAsyncpiYAML = fs.readFileSync(path.resolve(__dirname, "./invalid-asyncapi.yaml"), 'utf8');
const invalidAsyncpiJSON = fs.readFileSync(path.resolve(__dirname, "./invalid-asyncapi.json"), 'utf8');
const outputJSON = '{"asyncapi":"2.0.0","info":{"title":"My API","version":"1.0.0"},"channels":{"mychannel":{"publish":{"externalDocs":{"x-extension":true,"url":"https://company.com/docs"},"message":{"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"testSchema"},"x-some-extension":"some extension","x-parser-original-traits":[{"x-some-extension":"some extension"}],"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-name":"testMessage"},"x-parser-original-traits":[{"externalDocs":{"url":"https://company.com/docs"}}]}}},"components":{"messages":{"testMessage":{"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"testSchema"},"x-some-extension":"some extension","x-parser-original-traits":[{"x-some-extension":"some extension"}],"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-name":"testMessage"}},"schemas":{"testSchema":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"testSchema"}},"messageTraits":{"extension":{"x-some-extension":"some extension"}},"operationTraits":{"docs":{"externalDocs":{"url":"https://company.com/docs"}}}}}';
const invalidYamlOutput = '{"asyncapi":"2.0.0","info":{"version":"1.0.0"},"channels":{"mychannel":{"publish":{"traits":[{"externalDocs":{"url":"https://company.com/docs"}}],"externalDocs":{"x-extension":true,"url":"https://irrelevant.com"},"message":{"traits":[{"x-some-extension":"some extension"}],"payload":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}}}}}}},"components":{"messages":{"testMessage":{"traits":[{"x-some-extension":"some extension"}],"payload":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}}}}},"schemas":{"testSchema":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}}}},"messageTraits":{"extension":{"x-some-extension":"some extension"}},"operationTraits":{"docs":{"externalDocs":{"url":"https://company.com/docs"}}}}}'
const invalidJsonOutput = '{"asyncapi":"2.0.0","info":{"version":"1.0.0"},"channels":{"mychannel":{"publish":{"message":{"payload":{"type":"object","properties":{"name":{"type":"string"}}}}}}},"components":{"messages":{"testMessage":{"payload":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}}}}},"schemas":{"testSchema":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}}}}}}'
const outputJsonWithRefs = '{"asyncapi":"2.0.0","info":{"title":"My API","version":"1.0.0"},"channels":{"mychannel":{"publish":{"traits":[{"$ref":"#/components/operationTraits/docs"}],"externalDocs":{"x-extension":true,"url":"https://irrelevant.com"},"message":{"$ref":"#/components/messages/testMessage"}}}},"components":{"messages":{"testMessage":{"traits":[{"$ref":"#/components/messageTraits/extension"}],"payload":{"$ref":"#/components/schemas/testSchema"}}},"schemas":{"testSchema":{"type":"object","properties":{"name":{"type":"string"},"test":{"$ref":"refs/refed.yaml"}}}},"messageTraits":{"extension":{"x-some-extension":"some extension"}},"operationTraits":{"docs":{"externalDocs":{"url":"https://company.com/docs"}}}}}';
const outputJsonNoApplyTraits = '{"asyncapi":"2.0.0","info":{"title":"My API","version":"1.0.0"},"channels":{"mychannel":{"publish":{"traits":[{"externalDocs":{"url":"https://company.com/docs"}}],"externalDocs":{"x-extension":true,"url":"https://irrelevant.com"},"message":{"traits":[{"x-some-extension":"some extension"}],"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"testSchema"},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-name":"testMessage"}}}},"components":{"messages":{"testMessage":{"traits":[{"x-some-extension":"some extension"}],"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"testSchema"},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-name":"testMessage"}},"schemas":{"testSchema":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"testSchema"}},"messageTraits":{"extension":{"x-some-extension":"some extension"}},"operationTraits":{"docs":{"externalDocs":{"url":"https://company.com/docs"}}}}}';
const invalidAsyncAPI = { "asyncapi": "2.0.0", "info": {} };

const checkErrorTypeAndMessage = async (fn, type, message) => {
  try {
    await fn();
    throw 'should not be reachable';
  } catch (e) {
    expect(e instanceof ParserError).to.equal(true);
    expect(e).to.have.own.property('type', type);
    expect(e).to.have.own.property('message', message);
  }
}

const checkErrorParsedJSON = async (fn, parsedJSON) => {
  try {
    await fn();
    throw 'should not be reachable';
  } catch (e) {
    expect(JSON.stringify(e.parsedJSON)).to.equal(parsedJSON);
  }
}

describe.only('parse()', function () {
  it('should parse YAML', async function () {
    const result = await parser.parse(inputYAML, { path: __filename });
    await expect(JSON.stringify(result.json())).to.equal(outputJSON);
  });

  it('should not apply traits', async function () {
    const result = await parser.parse(inputYAML, { path: __filename, applyTraits: false });
    await expect(JSON.stringify(result.json())).to.equal(outputJsonNoApplyTraits);
  });
  
  it('should fail when asyncapi is not valid', async function () {
    try {
      await parser.parse(invalidAsyncAPI);
    } catch(e) {
      await expect(e.type).to.equal('https://github.com/asyncapi/parser-js/validation-errors');
      await expect(e.title).to.equal('There were errors validating the AsyncAPI document.');
      await expect(e.validationErrors).to.deep.equal([{
        title: '/info should have required property \'title\'',
        location: { jsonPointer: '/info' }
      },
      {
        title: '/info should have required property \'version\'',
        location: { jsonPointer: '/info' }
      },
      {
        title: '/ should have required property \'channels\'',
        location: { jsonPointer: '/' }
      }]);
      await expect(e.parsedJSON).to.deep.equal(invalidAsyncAPI);
    }
  });
  
  it('should fail when asyncapi is not valid (yaml)', async function () {
    try {
      await parser.parse(invalidAsyncpiYAML, { path: __filename });
    } catch(e) {
      await expect(e.type).to.equal('https://github.com/asyncapi/parser-js/validation-errors');
      await expect(e.title).to.equal('There were errors validating the AsyncAPI document.');
      await expect(e.validationErrors).to.deep.equal([{
        title: '/info should have required property \'title\'',
        location: {
          jsonPointer: '/info',
          startLine: 2,
          startColumn: 1,
          startOffset: 16,
          endLine: 3,
          endColumn: 19,
          endOffset: 40,
        }
      }]);
      await expect(JSON.stringify(e.parsedJSON)).to.equal(invalidYamlOutput);
    }
  });
  
  it('should fail when asyncapi is not valid (json)', async function () {
    try {
      await parser.parse(invalidAsyncpiJSON, { path: __filename });
    } catch(e) {
      await expect(e.type).to.equal('https://github.com/asyncapi/parser-js/validation-errors');
      await expect(e.title).to.equal('There were errors validating the AsyncAPI document.');
      await expect(e.validationErrors).to.deep.equal([{
        title: '/info should have required property \'title\'',
        location: {
          jsonPointer: '/info',
          startLine: 3,
          startColumn: 11,
          startOffset: 33,
          endLine: 5,
          endColumn: 4,
          endOffset: 58,
        }
      }]);
      await expect(JSON.stringify(e.parsedJSON)).to.equal(invalidJsonOutput);
    }
  });
  
  it('should fail when it is not possible to convert asyncapi to json', async function () {
    try {
      await parser.parse('bad');
    } catch(e) {
      await expect(e.type).to.equal('https://github.com/asyncapi/parser-js/impossible-to-convert-to-json');
      await expect(e.title).to.equal('Could not convert AsyncAPI to JSON.');
      await expect(e.detail).to.equal('Most probably the AsyncAPI document contains invalid YAML or YAML features not supported in JSON.');
    }
  });

  it('should fail when asyncapi is not present', async function () {
    try {
      await parser.parse('bad: true');
    } catch(e) {
      await expect(e.type).to.equal('https://github.com/asyncapi/parser-js/missing-asyncapi-field');
      await expect(e.title).to.equal('The `asyncapi` field is missing.');
      await expect(e.parsedJSON).to.deep.equal({ bad: true });
    }
  });

  it('should fail when asyncapi version is not supported', async function () {
    try {
      await parser.parse('asyncapi: 1.2.0');
    } catch (e) {
      await expect(e.type).to.equal('https://github.com/asyncapi/parser-js/unsupported-version');
      await expect(e.title).to.equal('Version 1.2.0 is not supported.');
      await expect(e.detail).to.equal('Please upgrade to the latest version.');
      await expect(e.parsedJSON).to.deep.equal({ asyncapi: '1.2.0' });
      await expect(e.validationErrors).to.deep.equal([{
        jsonPointer: '/asyncapi',
        startLine: 1,
        startColumn: 1,
        startOffset: 0,
        endLine: 1,
        endColumn: 16,
        endOffset: 15,
      }]);
    }
  });

  it('should fail when asyncapi is not yaml nor json', async function () {
    try {
      await parser.parse('bad:\nbad:');
    } catch(e) {
      await expect(e.type).to.equal('https://github.com/asyncapi/parser-js/invalid-yaml');
      await expect(e.title).to.equal('The provided YAML is not valid.');
      await expect(e.detail).to.equal('duplicated mapping key at line 2, column -4:\n    bad:\n    ^');
      await expect(e.location).to.deep.equal({ startOffset: 5, startLine: 2, startColumn: -4 });
    }
  });

  it('should fail to resolve relative files when options.path is not provided', async function () {
    const type = 'https://github.com/asyncapi/parser-js/dereference-error';
    const message = `Error opening file "${path.resolve(process.cwd(), 'refs/refed.yaml')}" \nENOENT: no such file or directory, open '${path.resolve(process.cwd(), 'refs/refed.yaml')}'`;
    const testFn = async () => { await parser.parse(inputYAML) };
    await checkErrorTypeAndMessage(testFn, type, message);
    await checkErrorParsedJSON(testFn, outputJsonWithRefs);
  });

  it('should offer information about YAML line and column where $ref errors are located', async function () {
    try {
      await parser.parse(inputYAML)
    } catch (e) {
      expect(e.refs).to.deep.equal([{
        jsonPointer: '/components/schemas/testSchema/properties/test/$ref',
        startLine: 30,
        startColumn: 11,
        startOffset: 615,
        endLine: 30,
        endColumn: 34,
        endOffset: 638,
      }]);
    }
  });
  
  it('should offer information about JSON line and column where $ref errors are located', async function () {
    try {
      await parser.parse(inputJSON)
    } catch (e) {
      expect(e.refs).to.deep.equal([{
        jsonPointer: '/components/schemas/testSchema/properties/test/$ref',
        startLine: 38,
        startColumn: 21,
        startOffset: 599,
        endLine: 38,
        endColumn: 38,
        endOffset: 616,
      }]);
    }
  });
  
  it('should not offer information about JS line and column where $ref errors are located if format is JS', async function () {
    try {
      await parser.parse(JSON.parse(inputJSON))
    } catch (e) {
      expect(e.refs).to.deep.equal([{
        jsonPointer: '/components/schemas/testSchema/properties/test/$ref',
      }]);
    }
  });

  it('should throw error if document is invalid YAML', async function () {
    try {
      await parser.parse(invalidYAML, { path: __filename })
    } catch (e) {
      expect(e.type).to.equal('https://github.com/asyncapi/parser-js/invalid-yaml');
      expect(e.title).to.equal('The provided YAML is not valid.');
      expect(e.detail).to.equal(`bad indentation of a mapping entry at line 19, column 11:\n              $ref: "#/components/schemas/sentAt"\n              ^`);
      expect(e.location).to.deep.equal({ startOffset: 460, startLine: 19, startColumn: 11 });
    }
  });
  
  it('should throw error if document is invalid JSON', async function () {
    try {
      await parser.parse(' {"invalid "json" }');
    } catch (e) {
      expect(e.type).to.equal('https://github.com/asyncapi/parser-js/invalid-json');
      expect(e.title).to.equal('The provided JSON is not valid.');
      expect(e.detail).to.equal(`Unexpected token j in JSON at position 12 while parsing near ' {"invalid "json" }'`);
      expect(e.location).to.deep.equal({ startOffset: 12, startLine: 1, startColumn: 12 });
    }
  });

  it('should throw error if document is null or falsey', async function () {
    const type = 'https://github.com/asyncapi/parser-js/null-or-falsey-document';
    const message = `Document can't be null or falsey.`;
    await checkErrorTypeAndMessage(async () => {
      await parser.parse('');
    }, type, message);
    await checkErrorTypeAndMessage(async () => {
      await parser.parse(false);
    }, type, message);
    await checkErrorTypeAndMessage(async () => {
      await parser.parse(null);
    }, type, message);
    await checkErrorTypeAndMessage(async () => {
      await parser.parse(undefined);
    }, type, message);
    await checkErrorTypeAndMessage(async () => {
      await parser.parse(NaN);
    }, type, message);
  });

  it('should throw error if document is not string nor object', async function () {
    const type = 'https://github.com/asyncapi/parser-js/invalid-document-type';
    const message = 'The AsyncAPI document has to be either a string or a JS object.';

    await checkErrorTypeAndMessage(async () => {
      await parser.parse(true);
    }, type, message);
    await checkErrorTypeAndMessage(async () => {
      await parser.parse([]);
    }, type, message);
    await checkErrorTypeAndMessage(async () => {
      await parser.parse(new Map());
    }, type, message);
    await checkErrorTypeAndMessage(async () => {
      await parser.parse(new Set());
    }, type, message);
    await checkErrorTypeAndMessage(async () => {
      await parser.parse(new WeakMap());
    }, type, message);
    await checkErrorTypeAndMessage(async () => {
      await parser.parse(new WeakSet());
    }, type, message);
    await checkErrorTypeAndMessage(async () => {
      await parser.parse(1);
    }, type, message);
    await checkErrorTypeAndMessage(async () => {
      await parser.parse(Symbol('test'));
    }, type, message);
    await checkErrorTypeAndMessage(async () => {
      await parser.parse(() => {});
    }, type, message);
  });
});
