import { OpenAPISchemaParser } from '../../../src/schema-parser/openapi-schema-parser';
import * as fs from 'fs';
import * as path from 'path';

import type { ParseSchemaInput, ValidateSchemaInput } from '../../../src/schema-parser';

const inputWithValidOpenApi3 = toParseInput(fs.readFileSync(path.resolve(__dirname, './valid.json'), 'utf8'));
const outputWithValidOpenApi3 = '{"type":["object","null"],"properties":{"name":{"type":"string"},"discriminatorTest":{"discriminator":{"propertyName":"objectType"},"oneOf":[{"type":"object","properties":{"objectType":{"type":"string"},"prop1":{"type":"string"}}},{"type":"object","properties":{"objectType":{"type":"string"},"prop2":{"type":"string"}}}]},"test":{"type":"object","properties":{"testing":{"type":"string"}}}},"examples":[{"name":"Fran"}]}';

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
    expect(result).toHaveLength(6);
    expect(result).toEqual([
      {
        message: 'must be equal to one of the allowed values',
        path: ['channels', 'myChannel', 'publish', 'message', 'payload', 'properties', 'name', 'type']
      },
      {
        message: 'must have required property \'$ref\'',
        path: ['channels', 'myChannel', 'publish', 'message', 'payload', 'properties', 'name']
      },
      {
        message: 'must match exactly one schema in oneOf',
        path: ['channels', 'myChannel', 'publish', 'message', 'payload', 'properties','name']
      },
      {
        message: 'must be string',
        path: ['channels', 'myChannel', 'publish', 'message', 'payload', 'properties','surname','format']
      },
      {
        message: 'must have required property \'$ref\'',
        path: ['channels', 'myChannel', 'publish', 'message', 'payload', 'properties','surname']
      },
      {
        message: 'must match exactly one schema in oneOf',
        path: ['channels', 'myChannel', 'publish', 'message', 'payload', 'properties','surname']
      }
    ]);
  });

  async function doParseTest(originalInput: ParseSchemaInput, expectedOutput: any) {
    const input = {...originalInput};
    const result = await parser.parse(input);

    // Check that the return value of parse() is the expected JSON Schema.
    expect(result).toEqual(JSON.parse(expectedOutput));
  }
});

function toParseInput(raw: string): ParseSchemaInput | ValidateSchemaInput {
  const message = JSON.parse(raw);
  return {
    asyncapi: {
      semver: {
        version: '2.4.0',
        major: 2,
        minor: 4,
        patch: 0
      }, 
      source: '',
      parsed: {} as any,
    },
    data: message.payload,
    meta: {
      message,
    },
    path: ['channels', 'myChannel', 'publish', 'message', 'payload'],
    schemaFormat: message.schemaFormat,
    defaultSchemaFormat: 'application/vnd.aai.asyncapi;version=2.4.0',
  };
}
