import { Parser } from '../../src/parser';
import { parseSchema, validateSchema } from '../../src/schema-parser';

import type { ParseSchemaInput, ValidateSchemaInput } from '../../src/schema-parser';
import type { DetailedAsyncAPI } from '../../src/types';

describe('schema-parser index', function() {
  const parser = new Parser();
  const asyncapi = {
    parsed: { asyncapi: '3.0.0' },
    semver: { version: '3.0.0', major: 3, minor: 0, patch: 0 },
  } as DetailedAsyncAPI;

  it('should warn for unknown custom schema formats during validation', async function() {
    const input = {
      asyncapi,
      data: true,
      meta: {},
      path: ['channels', 'channel', 'messages', 'message', 'payload', 'schema'],
      schemaFormat: 'application/octet-stream',
      defaultSchemaFormat: 'application/vnd.aai.asyncapi;version=3.0.0',
    } as ValidateSchemaInput;

    await expect(validateSchema(parser, input)).resolves.toEqual([
      {
        message: 'No schema parser registered for "application/octet-stream"',
        path: ['channels', 'channel', 'messages', 'message', 'payload', 'schemaFormat'],
      },
    ]);
  });

  it('should return schema as-is when parsing unknown custom schema formats', async function() {
    const schema = { type: 'record', name: 'CostingRequest', fields: [] };
    const input = {
      asyncapi,
      data: schema,
      meta: {},
      path: ['channels', 'channel', 'messages', 'message', 'payload', 'schema'],
      schemaFormat: 'application/vnd.apache.avro;version=1.9.0',
      defaultSchemaFormat: 'application/vnd.aai.asyncapi;version=3.0.0',
    } as ParseSchemaInput;

    await expect(parseSchema(parser, input)).resolves.toEqual(schema);
  });
});
