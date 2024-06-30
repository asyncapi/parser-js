import { AsyncAPISchemaParser } from '../../src/schema-parser/asyncapi-schema-parser';

import type { ParseSchemaInput, ValidateSchemaInput } from '../../src/schema-parser';
import type { SchemaValidateResult } from '../../src/types';

describe('AsyncAPISchemaParser', function () {
  const validSchema = {
    asyncapi: {
      semver: {
        version: '2.4.0',
      }
    },
    data: {
      type: 'object',
      required: [
        'name'
      ],
      properties: {
        name: {
          type: 'string'
        },
        address: {
          type: 'string'
        },
      }
    },
  };

  const parser = AsyncAPISchemaParser();

  it('should return Mime Types', async function () {
    expect(parser.getMimeTypes()).not.toEqual([]);
  });

  it('should parse valid AsyncAPI Schema', async function () {
    const schema = <ParseSchemaInput<object>>validSchema;
    const parsed = await parser.parse(schema);
    expect(parsed).toEqual(schema.data);
  });

  it('should validate valid AsyncAPI Schema', async function () {
    const schema = <ValidateSchemaInput<object>>validSchema;
    const result = await parser.validate(schema);

    expect(result).toHaveLength(0);
  });

  it('should validate invalid AsyncAPI Schema with invalid schema', async function () {
    const schema = <ValidateSchemaInput<object>>{
      asyncapi: {
        semver: {
          version: '2.4.0',
        }
      },
      path: ['components', 'schemas', 'schema1', 'payload'],
      data: {
        oneOf: 'this should be an array',
        properties: {
          name: {
            if: 'this should be an if'
          }
        }
      }
    };

    const result = await parser.validate(schema);
    const expectedResult: SchemaValidateResult[] = [
      {
        message: 'must be object,boolean',
        path: ['components', 'schemas', 'schema1', 'payload', 'properties', 'name', 'if']
      },
      {
        message: 'must be array',
        path: ['components', 'schemas', 'schema1', 'payload', 'oneOf']
      },
      {
        message: 'must be array',
        path: ['components', 'schemas', 'schema1', 'payload', 'oneOf']
      },
      {
        message: 'must be object,boolean',
        path: ['components', 'schemas', 'schema1', 'payload', 'properties', 'name', 'if']
      }
    ];

    expect(result).toEqual(expectedResult);
  });
});
