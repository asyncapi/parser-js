import { ParseSchemaInput, ValidateSchemaInput } from '../../src/schema-parser/index';
import { AsyncAPISchemaParser } from '../../src/schema-parser/asyncapi-schema-parser';
import { SchemaValidateError } from '../../src/types';

describe('AsyncAPISchemaParser', function () {

  const validSchema = {
    asyncapi: {
      semver: {
        major: 2
      }
    },
    data: {
      type: "object",
      required: [
        "name"
      ],
      properties: {
        name: {
          type: "string"
        },
        address: {
          type: "string"
        },
      }
    },
  };

  const parser = AsyncAPISchemaParser();

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
          major: 2
        }
      },
      data: {
        oneOf: "this should be an array",
        properties: {
          name: {
            if: "this should be an if"
          }
        }
      }
    };

    const result = await parser.validate(schema);
    const expectedResult: SchemaValidateError[] = [
      { "message": "must be object,boolean", "path": ["data", "properties", "name", "if"] },
      { "message": "must be array", "path": ["data", "oneOf"] }
    ];

    expect(result).toEqual(expectedResult);
  });

  it('should validate invalid AsyncAPI Schema with invalid meta schema', async function () {
    const schema = <ValidateSchemaInput<object>>{
      asyncapi: {
        semver: {
          major: 2
        }
      },
      data: {
        $schema: "non-existent-meta-schema",
      }
    };

    const result = await parser.validate(schema);
    const expectedResult: SchemaValidateError[] = [
      { "message": "no schema with key or ref \"non-existent-meta-schema\"" },
    ];

    expect(result).toEqual(expectedResult);
  });
});
