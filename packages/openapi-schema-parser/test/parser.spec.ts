import * as fs from 'fs';
import * as path from 'path';
import { Parser } from '@asyncapi/parser';
import { OpenAPISchemaParser } from '../src';

import type { ParseSchemaInput, ValidateSchemaInput, SchemaValidateResult, Diagnostic } from '@asyncapi/parser';

const inputWithValidOpenApi3 = toParseInput(fs.readFileSync(path.resolve(__dirname, './documents/valid.json'), 'utf8'));
const outputWithValidOpenApi3 = '{"type":["object","null"],"properties":{"name":{"type":"string"},"discriminatorTest":{"discriminator":{"propertyName":"objectType"},"oneOf":[{"type":"object","properties":{"objectType":{"type":"string"},"prop1":{"type":"string"}}},{"type":"object","properties":{"objectType":{"type":"string"},"prop2":{"type":"string"}}}]},"test":{"type":"object","properties":{"testing":{"type":"string"}}}},"examples":[{"name":"Fran"}]}';

const inputWithInvalidOpenApi3 = toParseInput(fs.readFileSync(path.resolve(__dirname, './documents/invalid.json'), 'utf8'));

const inputWithValidAsyncAPI = fs.readFileSync(path.resolve(__dirname, './documents/valid-asyncapi.yaml'), 'utf8');

const inputWithInvalidAsyncAPI = fs.readFileSync(path.resolve(__dirname, './documents/invalid-asyncapi.yaml'), 'utf8');

describe('OpenAPISchemaParser', function () {
  const parser = OpenAPISchemaParser();
  const coreParser = new Parser(); 
  coreParser.registerSchemaParser(parser); 

  it('should return Mime Types', async function () {
    expect(parser.getMimeTypes()).not.toEqual([]);
  });

  it('should parse OpenAPI 3', async function() {
    await doParseTest(inputWithValidOpenApi3, outputWithValidOpenApi3);
  });

  it('should validate valid OpenAPI 3', async function() {
    const diagnostics = await parser.validate(inputWithValidOpenApi3);
    expect(diagnostics).toHaveLength(0);
  });

  it('should validate invalid OpenAPI 3', async function() {
    const diagnostics = await parser.validate(inputWithInvalidOpenApi3);
    expect(diagnostics).toHaveLength(6);
    expect(diagnostics).toEqual([
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

  it('should parse valid AsyncAPI', async function() {
    const { document, diagnostics } = await coreParser.parse(inputWithValidAsyncAPI);
    expect(filterDiagnostics(diagnostics, 'asyncapi2-schemas')).toHaveLength(0);
    doParseCoreTest((document?.json()?.channels?.myChannel?.publish?.message as any)?.payload, outputWithValidOpenApi3);
    doParseCoreTest((document?.json()?.components?.messages?.testMessage as any)?.payload, outputWithValidOpenApi3);
  });

  it('should validate valid AsyncAPI', async function() {
    const diagnostics = await coreParser.validate(inputWithValidAsyncAPI);
    expect(filterDiagnostics(diagnostics, 'asyncapi2-schemas')).toHaveLength(0);
  });

  it('should validate invalid AsyncAPI', async function() {
    const diagnostics = await coreParser.validate(inputWithInvalidAsyncAPI);
    expect(filterDiagnostics(diagnostics, 'asyncapi2-schemas')).toHaveLength(12);
    expectDiagnostics(diagnostics, 'asyncapi2-schemas', [
      // in channels
      {
        message: 'must have required property \'$ref\'',
        path: ['channels', 'myChannel', 'publish', 'message', 'payload', 'properties', 'name']
      },
      {
        message: 'must match exactly one schema in oneOf',
        path: ['channels', 'myChannel', 'publish', 'message', 'payload', 'properties', 'name']
      },
      {
        message: 'must be equal to one of the allowed values',
        path: ['channels', 'myChannel', 'publish', 'message', 'payload', 'properties', 'name', 'type']
      },
      {
        message: 'must have required property \'$ref\'',
        path: ['channels', 'myChannel', 'publish', 'message', 'payload', 'properties', 'surname']
      },
      {
        message: 'must match exactly one schema in oneOf',
        path: ['channels', 'myChannel', 'publish', 'message', 'payload', 'properties', 'surname']
      },
      {
        message: 'must be string',
        path: ['channels', 'myChannel', 'publish', 'message', 'payload', 'properties', 'surname', 'format']
      },
      
      // in components.messages
      {
        message: 'must have required property \'$ref\'',
        path: ['components', 'messages', 'testMessage', 'payload', 'properties', 'name']
      },
      {
        message: 'must match exactly one schema in oneOf',
        path: ['components', 'messages', 'testMessage', 'payload', 'properties','name']
      },
      {
        message: 'must be equal to one of the allowed values',
        path: ['components', 'messages', 'testMessage', 'payload', 'properties', 'name', 'type']
      },
      {
        message: 'must have required property \'$ref\'',
        path: ['components', 'messages', 'testMessage', 'payload', 'properties', 'surname']
      },
      {
        message: 'must match exactly one schema in oneOf',
        path: ['components', 'messages', 'testMessage', 'payload', 'properties', 'surname']
      },
      {
        message: 'must be string',
        path: ['components', 'messages', 'testMessage', 'payload', 'properties', 'surname', 'format']
      },
    ]);
  });

  async function doParseTest(originalInput: ParseSchemaInput, expectedOutput: string) {
    const input = { ...originalInput };
    const result = await parser.parse(input);

    // Check that the return value of parse() is the expected JSON Schema.
    expect(result).toEqual(JSON.parse(expectedOutput));
  }

  async function doParseCoreTest(parsedSchema: any, expectedOutput: string) {
    const result = JSON.parse(JSON.stringify(parsedSchema, (field: string, value: unknown) => {
      if (field === 'x-parser-schema-id') return;
      return value;
    }));

    // Check that the return value of parse() is the expected JSON Schema.
    expect(result).toEqual(JSON.parse(expectedOutput));
  }
});

function toParseInput(raw: string): ParseSchemaInput | ValidateSchemaInput {
  const message = JSON.parse(raw);
  return {
    asyncapi: {
      semver: {
        version: '2.5.0',
        major: 2,
        minor: 5,
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
    defaultSchemaFormat: 'application/vnd.aai.asyncapi;version=2.5.0',
  };
}

function filterDiagnostics(diagnostics: Diagnostic[], code: string) {
  return diagnostics.filter(d => d.code === code);
}

function expectDiagnostics(diagnostics: Diagnostic[], code: string, results: SchemaValidateResult[]) {
  expect(filterDiagnostics(diagnostics, code)).toEqual(results.map(e => expect.objectContaining(e)));
}
