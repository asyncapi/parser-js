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
const outputJSON = '{"asyncapi":"2.0.0","info":{"title":"My API","version":"1.0.0"},"channels":{"mychannel":{"publish":{"externalDocs":{"x-extension":true,"url":"https://company.com/docs"},"message":{"payload":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}},"x-parser-schema-id":"testSchema"},"x-some-extension":"some extension","x-parser-original-traits":[{"x-some-extension":"some extension"}],"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-name":"testMessage"},"x-parser-original-traits":[{"externalDocs":{"url":"https://company.com/docs"}}]}}},"components":{"messages":{"testMessage":{"payload":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}},"x-parser-schema-id":"testSchema"},"x-some-extension":"some extension","x-parser-original-traits":[{"x-some-extension":"some extension"}],"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-name":"testMessage"}},"schemas":{"testSchema":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}},"x-parser-schema-id":"testSchema"}},"messageTraits":{"extension":{"x-some-extension":"some extension"}},"operationTraits":{"docs":{"externalDocs":{"url":"https://company.com/docs"}}}}}';
const outputJsonNoApplyTraits = '{"asyncapi":"2.0.0","info":{"title":"My API","version":"1.0.0"},"channels":{"mychannel":{"publish":{"traits":[{"externalDocs":{"url":"https://company.com/docs"}}],"externalDocs":{"x-extension":true,"url":"https://irrelevant.com"},"message":{"traits":[{"x-some-extension":"some extension"}],"payload":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}},"x-parser-schema-id":"testSchema"},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-name":"testMessage"}}}},"components":{"messages":{"testMessage":{"traits":[{"x-some-extension":"some extension"}],"payload":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}},"x-parser-schema-id":"testSchema"},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-name":"testMessage"}},"schemas":{"testSchema":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}},"x-parser-schema-id":"testSchema"}},"messageTraits":{"extension":{"x-some-extension":"some extension"}},"operationTraits":{"docs":{"externalDocs":{"url":"https://company.com/docs"}}}}}';
const invalidAsyncAPI = { "asyncapi": "2.0.0", "info": {} };
const errorsOfInvalidAsyncAPI = [{ start: { line: 1, column: 28, offset: 27 }, error: '/info should have required property \'version\'', path: '/info' }, { start: { line: 1, column: 1, offset: 0 }, error: ' should have required property \'channels\'', path: '' }];

describe('parse()', function () {
  it('should parse YAML', async function () {
    const result = await parser.parse(inputYAML, { path: __filename });
    await expect(JSON.stringify(result.json())).to.equal(outputJSON);
  });
  
  it('should fail when asyncapi is not valid', async function () {
    try {
      await parser.parse(invalidAsyncAPI);
    } catch(e) {
      await expect(e.type).to.equal('https://github.com/asyncapi/parser-js/validation-errors');
      await expect(e.title).to.equal('There were errors validating the AsyncAPI document.');
      await expect(e.validationErrors).to.deep.equal(errorsOfInvalidAsyncAPI);
      await expect(e.parsedJSON).to.deep.equal(invalidAsyncAPI);
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

  it('should fail when version is not supported', async function () {
    try {
      await parser.parse('bad: true');
    } catch(e) {
      await expect(e.type).to.equal('https://github.com/asyncapi/parser-js/missing-or-unsupported-version');
      await expect(e.title).to.equal('AsyncAPI version is missing or unsupported: undefined.');
      await expect(e.parsedJSON).to.deep.equal({ bad: true });
    }
  });

  it('should fail when no asyncapi is passed', async function () {
    try {
      await parser.parse();
    } catch(e) {
      await expect(e.type).to.equal('https://github.com/asyncapi/parser-js/null-false-or-empty-document');
      await expect(e.title).to.equal('Document can\'t be null, false or empty.');
    }
  });

  it('should fail when asyncapi is not yaml nor json', async function () {
    try {
      await parser.parse('bad:\nbad:');
    } catch(e) {
      await expect(e.type).to.equal('https://github.com/asyncapi/parser-js/document-not-json-nor-yaml');
      await expect(e.title).to.equal('Document has to be either JSON or YAML');
      await expect(e.detail).to.equal('duplicated mapping key at line 2, column -4:\n    bad:\n    ^');
      await expect(e.yamlError).to.deep.equal({ startLine: 2, startColumn: -4 });
    }
  });
  
  it('should not apply traits', async function () {
    const result = await parser.parse(inputYAML, { path: __filename, applyTraits: false });
    await expect(JSON.stringify(result.json())).to.equal(outputJsonNoApplyTraits);
  });
  
  it('should fail to resolve relative files when options.path is not provided', async function () {
    const testFn = async () => await parser.parse(inputYAML);
    await expect(testFn())
      .to.be.rejectedWith(ParserError)
  });
  
  it('should throw error if document is invalid YAML', async function () {
    const testFn = async () => await parser.parse(invalidYAML, { path: __filename });
    await expect(testFn())
      .to.be.rejectedWith(ParserError)
  });

  it('should throw error if document is empty', async function () {
    const testFn = async () => await parser.parse('');
    await expect(testFn())
      .to.be.rejectedWith(ParserError)
  });
});
