const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const fs = require('fs');
const path = require("path");
const parser = require('../lib');
const { ParserError } = require('../lib/errors');

chai.use(chaiAsPromised);
const expect = chai.expect;

const invalidYAML = fs.readFileSync(path.resolve(__dirname, "./malformed-asyncapi.yaml"), 'utf8');
const inputYAML = fs.readFileSync(path.resolve(__dirname, "./asyncapi.yaml"), 'utf8');
const outputJSON = '{"asyncapi":"unstable","info":{"title":"My API","version":"1.0.0"},"channels":{"mychannel":{"publish":{"externalDocs":{"x-extension":true,"url":"https://company.com/docs"},"message":{"payload":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}}},"x-some-extension":"some extension","x-parser-original-traits":[{"x-some-extension":"some extension"}],"x-parser-original-schema":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}}}},"x-parser-original-traits":[{"externalDocs":{"url":"https://company.com/docs"}}]}}},"components":{"messages":{"testMessage":{"payload":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}}},"x-some-extension":"some extension","x-parser-original-traits":[{"x-some-extension":"some extension"}],"x-parser-original-schema":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}}}}},"schemas":{"testSchema":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}}}},"messageTraits":{"extension":{"x-some-extension":"some extension"}},"operationTraits":{"docs":{"externalDocs":{"url":"https://company.com/docs"}}}}}';
const inputWithOpenAPI = fs.readFileSync(path.resolve(__dirname, "./asyncapi-openapi.yaml"), 'utf8');
const outputWithOpenAPI = '{"asyncapi":"unstable","info":{"title":"My API","version":"1.0.0"},"channels":{"mychannel":{"publish":{"message":{"payload":{"type":["object","null"],"properties":{"name":{"type":"string"},"discriminatorTest":{"oneOf":[{"type":"object","properties":{"objectType":{"type":"string"},"prop1":{"type":"string"}}},{"type":"object","properties":{"objectType":{"type":"string"},"prop2":{"type":"string"}}}],"x-discriminator":"objectType"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}},"examples":[{"name":"Fran"}]},"x-parser-original-schema-format":"application/vnd.oai.openapi;version=3.0.0","x-parser-original-schema":{"type":"object","nullable":true,"example":{"name":"Fran"},"properties":{"name":{"type":"string"},"discriminatorTest":{"discriminator":"objectType","oneOf":[{"type":"object","properties":{"objectType":{"type":"string"},"prop1":{"type":"string"}}},{"type":"object","properties":{"objectType":{"type":"string"},"prop2":{"type":"string"}}}]},"test":{"type":"object","properties":{"testing":{"type":"string"}}}}}}}}},"components":{"messages":{"testMessage":{"payload":{"type":["object","null"],"properties":{"name":{"type":"string"},"discriminatorTest":{"oneOf":[{"type":"object","properties":{"objectType":{"type":"string"},"prop1":{"type":"string"}}},{"type":"object","properties":{"objectType":{"type":"string"},"prop2":{"type":"string"}}}],"x-discriminator":"objectType"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}},"examples":[{"name":"Fran"}]},"x-parser-original-schema-format":"application/vnd.oai.openapi;version=3.0.0","x-parser-original-schema":{"type":"object","nullable":true,"example":{"name":"Fran"},"properties":{"name":{"type":"string"},"discriminatorTest":{"discriminator":"objectType","oneOf":[{"type":"object","properties":{"objectType":{"type":"string"},"prop1":{"type":"string"}}},{"type":"object","properties":{"objectType":{"type":"string"},"prop2":{"type":"string"}}}]},"test":{"type":"object","properties":{"testing":{"type":"string"}}}}}}},"schemas":{"testSchema":{"type":"object","nullable":true,"example":{"name":"Fran"},"properties":{"name":{"type":"string"},"discriminatorTest":{"discriminator":"objectType","oneOf":[{"type":"object","properties":{"objectType":{"type":"string"},"prop1":{"type":"string"}}},{"type":"object","properties":{"objectType":{"type":"string"},"prop2":{"type":"string"}}}]},"test":{"type":"object","properties":{"testing":{"type":"string"}}}}}}}}';

describe('parse()', function () {
  it('should parse YAML', async function () {
    const result = await parser.parse(inputYAML, { path: __filename });
    await expect(JSON.stringify(result)).to.equal(outputJSON);
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
    await expect(JSON.stringify(result)).to.equal(outputWithOpenAPI);
  });
});
