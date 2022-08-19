import { ParseSchemaInput, ValidateSchemaInput } from '../../../src/schema-parser/index';
import { OpenAPISchemaParser } from '../../../src/schema-parser/openapi-schema-parser';
import * as fs from 'fs';
import * as path from 'path';

const inputWithValidOpenApi3 = toParseInput(fs.readFileSync(path.resolve(__dirname, './valid.json'), 'utf8'));
const outputWithValidOpenApi3 = '{"payload":{"type":["object","null"],"properties":{"name":{"type":"string"},"discriminatorTest":{"discriminator":{"propertyName":"objectType"},"oneOf":[{"type":"object","properties":{"objectType":{"type":"string"},"prop1":{"type":"string"}}},{"type":"object","properties":{"objectType":{"type":"string"},"prop2":{"type":"string"}}}]},"test":{"type":"object","properties":{"testing":{"type":"string"}}}},"examples":[{"name":"Fran"}]},"x-parser-original-schema-format":"application/vnd.oai.openapi;version=3.0.0","x-parser-original-payload":{"type":"object","nullable":true,"example":{"name":"Fran"},"properties":{"name":{"type":"string"},"discriminatorTest":{"discriminator":{"propertyName":"objectType"},"oneOf":[{"type":"object","properties":{"objectType":{"type":"string"},"prop1":{"type":"string"}}},{"type":"object","properties":{"objectType":{"type":"string"},"prop2":{"type":"string"}}}]},"test":{"type":"object","properties":{"testing":{"type":"string"}}}}}}';

const inputWithInvalidOpenApi3 = toParseInput(fs.readFileSync(path.resolve(__dirname, './invalid.json'), 'utf8'));

describe('OpenAPISchemaParser', function () {
  const parser = OpenAPISchemaParser();

  it('should return Mime Types', async function () {
    expect(parser.getMimeTypes()).not.toEqual([]);
  });
  it('should parse OpenAPI 3', async function() {
    await doParseTest(inputWithValidOpenApi3, outputWithValidOpenApi3);
  });
  it('should validate valid OpenAPI 3', async function() {
    const result = await parser.validate(inputWithValidOpenApi3);
    expect(result).toHaveLength(0);
  });

  it('should validate invalid OpenAPI 3', async function() {
    const result = await parser.validate(inputWithInvalidOpenApi3);
    expect(result).toHaveLength(2);
    expect(result).toEqual([
        {message: "\"oneOf\" property type must be array.", path: inputWithInvalidOpenApi3.path.concat(["oneOf"])}, 
        {message: "Property \"if\" is not expected to be here.", path: inputWithInvalidOpenApi3.path.concat(["properties", "name", "if"])},
    ]);
  });

  async function doParseTest(originalInput: ParseSchemaInput, expectedOutput: any) {
    const input = {...originalInput};
    const result = await parser.parse(input);

    // Check that the return value of parse() is the expected JSON Schema.
    expect(result).toEqual(JSON.parse(expectedOutput).payload);

    // Check that the message got modified, i.e. adding extensions, setting the payload, etc.
    const message = (input.meta as any).message; 
    expect(JSON.stringify(message)).toEqual(expectedOutput);
  }
});

function toParseInput(raw: string): ParseSchemaInput | ValidateSchemaInput {
  const message = JSON.parse(raw);
  const schemaInput = {
    asyncapi: {
      semver: {
        version: "2.4.0",
        major: 2,
        minor: 4,
        patch: 0
      }, 
      source: "",
      parsed: {},
    },
    data: message.payload,
    meta: {
      message: message,
    },
    path: ["channels", "myChannel", "publish", "message", "payload"],
    schemaFormat: message.schemaFormat,
    defaultSchemaFormat: "application/vnd.aai.asyncapi;version=2.4.0",
  };

  return schemaInput;
}
