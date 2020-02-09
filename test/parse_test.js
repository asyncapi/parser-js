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
const inputWithOpenAPI = fs.readFileSync(path.resolve(__dirname, "./asyncapi-openapi.yaml"), 'utf8');
const outputWithOpenAPI = '{"asyncapi":"2.0.0","info":{"title":"My API","version":"1.0.0"},"channels":{"mychannel":{"publish":{"message":{"payload":{"type":["object","null"],"properties":{"name":{"type":"string"},"discriminatorTest":{"discriminator":"objectType","oneOf":[{"type":"object","properties":{"objectType":{"type":"string"},"prop1":{"type":"string"}}},{"type":"object","properties":{"objectType":{"type":"string"},"prop2":{"type":"string"}}}]},"test":{"type":"object","properties":{"testing":{"type":"string"}}}},"examples":[{"name":"Fran"}],"x-parser-schema-id":"<anonymous-schema-1>"},"x-parser-original-schema-format":"application/vnd.oai.openapi;version=3.0.0","x-parser-original-payload":{"type":"object","nullable":true,"example":{"name":"Fran"},"properties":{"name":{"type":"string"},"discriminatorTest":{"discriminator":"objectType","oneOf":[{"type":"object","properties":{"objectType":{"type":"string"},"prop1":{"type":"string"}}},{"type":"object","properties":{"objectType":{"type":"string"},"prop2":{"type":"string"}}}]},"test":{"type":"object","properties":{"testing":{"type":"string"}}}},"x-parser-schema-id":"testSchema"},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-name":"testMessage"}}}},"components":{"messages":{"testMessage":{"payload":{"type":["object","null"],"properties":{"name":{"type":"string"},"discriminatorTest":{"discriminator":"objectType","oneOf":[{"type":"object","properties":{"objectType":{"type":"string"},"prop1":{"type":"string"}}},{"type":"object","properties":{"objectType":{"type":"string"},"prop2":{"type":"string"}}}]},"test":{"type":"object","properties":{"testing":{"type":"string"}}}},"examples":[{"name":"Fran"}],"x-parser-schema-id":"<anonymous-schema-1>"},"x-parser-original-schema-format":"application/vnd.oai.openapi;version=3.0.0","x-parser-original-payload":{"type":"object","nullable":true,"example":{"name":"Fran"},"properties":{"name":{"type":"string"},"discriminatorTest":{"discriminator":"objectType","oneOf":[{"type":"object","properties":{"objectType":{"type":"string"},"prop1":{"type":"string"}}},{"type":"object","properties":{"objectType":{"type":"string"},"prop2":{"type":"string"}}}]},"test":{"type":"object","properties":{"testing":{"type":"string"}}}},"x-parser-schema-id":"testSchema"},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-name":"testMessage"}},"schemas":{"testSchema":{"type":"object","nullable":true,"example":{"name":"Fran"},"properties":{"name":{"type":"string"},"discriminatorTest":{"discriminator":"objectType","oneOf":[{"type":"object","properties":{"objectType":{"type":"string"},"prop1":{"type":"string"}}},{"type":"object","properties":{"objectType":{"type":"string"},"prop2":{"type":"string"}}}]},"test":{"type":"object","properties":{"testing":{"type":"string"}}}},"x-parser-schema-id":"testSchema"}}}}';
const inputWithRAML = fs.readFileSync(path.resolve(__dirname, "./asyncapi-raml.yaml"), 'utf8');
const outputWithRAML = '{"asyncapi":"2.0.0","info":{"title":"Example using RAML data types","version":"1.0.0"},"channels":{"mychannel":{"publish":{"message":{"payload":{"type":"object","required":["title","author"],"properties":{"title":{"type":"string"},"author":{"type":"string","examples":["Eva"]}},"examples":[{"title":"A book","author":"An author"}],"x-parser-schema-id":"<anonymous-schema-1>"},"x-parser-original-schema-format":"application/raml+yaml;version=1.0","x-parser-original-payload":"#%RAML 1.0 DataType\\ntype: object\\nproperties:\\n  title: string\\n  author:\\n    type: string\\n    examples:\\n      anExample: Eva\\nexamples:\\n  exampleOne:\\n    title: A book\\n    author: An author\\n","schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-name":"testMessage"}}},"otherchannel":{"subscribe":{"message":{"payload":{"type":"object","x-amf-merge":[{},{}],"minProperties":1,"maxProperties":50,"additionalProperties":false,"discriminator":"breed","x-amf-discriminatorValue":"CatOne","required":["proscons","name","breed","age","rating","year_of_birth","time_of_birth","addition_date","removal_date","photo","description","character","siblings","parents","ratingHistory","additionalData"],"properties":{"proscons":true,"name":true,"breed":true,"age":{"$ref":"CatAge"},"rating":{"type":"integer","multipleOf":5,"example":{"displayName":"Cat\'s rating","description":"Rating of cat\'s awesomeness","strict":false,"value":50}},"year_of_birth":{"type":"string","format":"date"},"time_of_birth":{"type":"string","format":"time"},"dt_of_birth":{"type":"string","format":"date-time-only"},"addition_date":{"type":"string","format":"rfc2616"},"removal_date":{"type":"string","format":"date-time"},"photo":{"type":"string","minLength":1,"maxLength":307200},"description":{"type":"null"},"habits":{"type":"string"},"character":{"anyOf":[{"type":"null"},{"type":"string"}]},"siblings":{"type":"array","items":{"type":"string"}},"parents":{"type":"array","items":true},"ratingHistory":{"type":"array","items":{"anyOf":[{"type":"integer"},{"type":"number"}]}},"additionalData":{"type":"object","x-amf-merge":[{"type":"object","required":["weight"],"properties":{"weight":{"type":"number"}}}]}},"x-parser-schema-id":"<anonymous-schema-2>"},"x-parser-original-schema-format":"application/raml+yaml;version=1.0","x-parser-original-payload":"#%RAML 1.0 DataType\\ntype:\\n  - CatWithAddress\\n  - CatWithCity\\nminProperties: 1\\nmaxProperties: 50\\nadditionalProperties: false\\ndiscriminator: breed\\ndiscriminatorValue: CatOne\\nproperties:\\n  proscons:\\n    type: CatPros | CatCons\\n    required: true\\n  name:\\n    type: CatName\\n    amazing: true\\n  breed:\\n    type: CatBreed\\n  age: CatAge\\n  rating:\\n    type: integer\\n    multipleOf: 5\\n    example:\\n      displayName: Cat\'s rating\\n      description: Rating of cat\'s awesomeness\\n      strict: false\\n      value: 50\\n  year_of_birth: date-only\\n  time_of_birth: time-only\\n  dt_of_birth:\\n    type: datetime-only\\n    required: false\\n  addition_date:\\n    type: datetime\\n    format: rfc2616\\n  removal_date:\\n    type: datetime\\n  photo:\\n    type: file\\n    fileTypes:\\n      - image/jpeg\\n      - image/png\\n    minLength: 1\\n    maxLength: 307200\\n  description: nil\\n  habits?: string\\n  character: nil | string\\n  siblings: \'string[]\'\\n  parents: \'CatName[]\'\\n  ratingHistory: \'(integer | number)[]\'\\n  additionalData:\\n    type:\\n      type: object\\n      properties:\\n        weight: number\\n","schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-name":"<anonymous-message-2>"}}}},"components":{"messages":{"testMessage":{"payload":{"type":"object","required":["title","author"],"properties":{"title":{"type":"string"},"author":{"type":"string","examples":["Eva"]}},"examples":[{"title":"A book","author":"An author"}],"x-parser-schema-id":"<anonymous-schema-1>"},"x-parser-original-schema-format":"application/raml+yaml;version=1.0","x-parser-original-payload":"#%RAML 1.0 DataType\\ntype: object\\nproperties:\\n  title: string\\n  author:\\n    type: string\\n    examples:\\n      anExample: Eva\\nexamples:\\n  exampleOne:\\n    title: A book\\n    author: An author\\n","schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-name":"testMessage"}}}}';
const invalidAsyncAPI = { "asyncapi": "2.0.0", "info": {} };
const errorsOfInvalidAsyncAPI = [{keyword: 'required',dataPath: '.info',schemaPath: '#/required',params: { missingProperty: 'title' },message: 'should have required property \'title\''},{keyword: 'required',dataPath: '.info',schemaPath: '#/required',params: { missingProperty: 'version' },message: 'should have required property \'version\''},{keyword: 'required',dataPath: '',schemaPath: '#/required',params: { missingProperty: 'channels' },message: 'should have required property \'channels\''}];

describe('parse()', function () {
  it('should parse YAML', async function () {
    const result = await parser.parse(inputYAML, { path: __filename });
    await expect(JSON.stringify(result.json())).to.equal(outputJSON);
  });
  
  it('should forward ajv errors and AsyncAPI json', async function () {
    try {
      await parser.parse(invalidAsyncAPI);
    } catch(e) {
      await expect(e.errors).to.deep.equal(errorsOfInvalidAsyncAPI);
      await expect(e.parsedJSON).to.deep.equal(invalidAsyncAPI);
    }
  });
  
  it('should not forward AsyncAPI json when it is not possible to convert it', async function () {
    try {
      await parser.parse('bad');
    } catch(e) {
      await expect(e.constructor.name).to.equal('ParserErrorNoJS');
      await expect(e.parsedJSON).to.equal(undefined);
    }
  });

  it('should forward AsyncAPI json when version is not supported', async function () {
    try {
      await parser.parse('bad: true');
    } catch(e) {
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

  it('should parse OpenAPI schemas', async function () {
    const result = await parser.parse(inputWithOpenAPI, { path: __filename });
    await expect(JSON.stringify(result.json())).to.equal(outputWithOpenAPI);
  });
  
  it('should parse RAML data types', async function () {
    const result = await parser.parse(inputWithRAML, { path: __filename });
    await expect(JSON.stringify(result.json())).to.equal(outputWithRAML);
  });
});
