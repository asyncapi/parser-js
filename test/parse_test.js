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
const outputJSON = '{"asyncapi":"2.0.0","info":{"title":"My API","version":"1.0.0"},"channels":{"mychannel":{"publish":{"externalDocs":{"x-extension":true,"url":"https://company.com/docs"},"message":{"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"testSchema"},"x-some-extension":"some extension","x-parser-original-traits":[{"x-some-extension":"some extension"}],"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-name":"testMessage"},"x-parser-original-traits":[{"externalDocs":{"url":"https://company.com/docs"}}]}}},"components":{"messages":{"testMessage":{"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"testSchema"},"x-some-extension":"some extension","x-parser-original-traits":[{"x-some-extension":"some extension"}],"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-name":"testMessage"}},"schemas":{"testSchema":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"testSchema"}},"messageTraits":{"extension":{"x-some-extension":"some extension"}},"operationTraits":{"docs":{"externalDocs":{"url":"https://company.com/docs"}}}}}';
const outputJsonNoApplyTraits = '{"asyncapi":"2.0.0","info":{"title":"My API","version":"1.0.0"},"channels":{"mychannel":{"publish":{"traits":[{"externalDocs":{"url":"https://company.com/docs"}}],"externalDocs":{"x-extension":true,"url":"https://irrelevant.com"},"message":{"traits":[{"x-some-extension":"some extension"}],"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"testSchema"},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-name":"testMessage"}}}},"components":{"messages":{"testMessage":{"traits":[{"x-some-extension":"some extension"}],"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"testSchema"},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-name":"testMessage"}},"schemas":{"testSchema":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"testSchema"}},"messageTraits":{"extension":{"x-some-extension":"some extension"}},"operationTraits":{"docs":{"externalDocs":{"url":"https://company.com/docs"}}}}}';
const invalidAsyncAPI = { "asyncapi": "2.0.0", "info": {} };
const errorsOfInvalidAsyncAPI = [{ keyword: 'required', dataPath: '.info', schemaPath: '#/required', params: { missingProperty: 'title' }, message: 'should have required property \'title\'' }, { keyword: 'required', dataPath: '.info', schemaPath: '#/required', params: { missingProperty: 'version' }, message: 'should have required property \'version\'' }, { keyword: 'required', dataPath: '', schemaPath: '#/required', params: { missingProperty: 'channels' }, message: 'should have required property \'channels\'' }];

describe('parse()', function () {
  it('should parse YAML', async function () {
    const result = await parser.parse(inputYAML, { path: __filename });
    await expect(JSON.stringify(result.json())).to.equal(outputJSON);
  });

  it('should forward ajv errors and AsyncAPI json', async function () {
    try {
      await parser.parse(invalidAsyncAPI);
    } catch (e) {
      await expect(e.errors).to.deep.equal(errorsOfInvalidAsyncAPI);
      await expect(e.parsedJSON).to.deep.equal(invalidAsyncAPI);
    }
  });

  it('should not forward AsyncAPI json when it is not possible to convert it', async function () {
    try {
      await parser.parse('bad');
    } catch (e) {
      await expect(e.constructor.name).to.equal('ParserErrorNoJS');
      await expect(e.parsedJSON).to.equal(undefined);
    }
  });

  it('should forward AsyncAPI json when version is not supported', async function () {
    try {
      await parser.parse('bad: true');
    } catch (e) {
      await expect(e.constructor.name).to.equal('ParserErrorUnsupportedVersion');
      await expect(e.parsedJSON).to.deep.equal({ bad: true });
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
