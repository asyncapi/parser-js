import { migrateToOldAPI } from '../../src/old-api/migrator';
import { SchemaIteratorCallbackType, SchemaTypesToIterate, traverseAsyncApiDocument } from '../../src/old-api/iterator';
import { Parser } from '../../src/parser';
import { AsyncAPIDocument } from '../../src/old-api/asyncapi';
import { Schema } from '../../src/old-api/schema';

const documentRaw = {
  asyncapi: '2.0.0',
  info: {
    title: 'Valid AsyncApi document',
    version: '1.0',
  },
  channels: {
    myChannel: {
      publish: {
        operationId: 'MyOperation',
        message: {
          payload: {
            type: 'object',
            properties: {
              exampleField: {
                type: 'string'
              },
              exampleNumber: {
                type: 'number'
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      anotherSchema: {
        type: 'object',
        properties: {
          anotherExampleField: {
            type: 'string'
          },
          anotherExampleNumber: {
            type: 'number'
          }
        }
      }
    }
  }
};

type ExpectedCallback = {
  schema: Schema,
  propOrIndex: string | number | null,
  callbackType: SchemaIteratorCallbackType,
}

describe('Traverse AsyncAPI document - old API', function() {
  const parser = new Parser();

  describe('traverseAsyncApiDocument()', function() {
    it('should traverse all possible schemas from a valid document', async function() {
      const { document } = await parser.parse(documentRaw);
      const oldDocument = migrateToOldAPI(document!);

      expect(oldDocument).toBeInstanceOf(AsyncAPIDocument);

      const payload = oldDocument?.channel('myChannel')?.publish()?.message()?.payload() as Schema;
      const componentsSchema = oldDocument?.components()?.schemas()['anotherSchema'] as Schema;
      const expectedCalls = [
        // Schema from channels
        call(payload, SchemaIteratorCallbackType.NEW_SCHEMA),
        call(payload, SchemaIteratorCallbackType.NEW_SCHEMA, 'exampleField'),
        call(payload, SchemaIteratorCallbackType.END_SCHEMA, 'exampleField'),
        call(payload, SchemaIteratorCallbackType.NEW_SCHEMA, 'exampleNumber'),
        call(payload, SchemaIteratorCallbackType.END_SCHEMA, 'exampleNumber'),
        call(payload, SchemaIteratorCallbackType.END_SCHEMA),
        // Schema from components
        call(componentsSchema, SchemaIteratorCallbackType.NEW_SCHEMA),
        call(componentsSchema, SchemaIteratorCallbackType.NEW_SCHEMA, 'anotherExampleField'),
        call(componentsSchema, SchemaIteratorCallbackType.END_SCHEMA, 'anotherExampleField'),
        call(componentsSchema, SchemaIteratorCallbackType.NEW_SCHEMA, 'anotherExampleNumber'),
        call(componentsSchema, SchemaIteratorCallbackType.END_SCHEMA, 'anotherExampleNumber'),
        call(componentsSchema, SchemaIteratorCallbackType.END_SCHEMA)
      ];

      testCallback(expectedCalls, oldDocument, []);
    });

    it('should traverse few schemas from a valid document', async function() {
      const { document } = await parser.parse(documentRaw);
      const oldDocument = migrateToOldAPI(document!);

      expect(oldDocument).toBeInstanceOf(AsyncAPIDocument);

      const componentsSchema = oldDocument?.components()?.schemas()['anotherSchema'] as Schema;
      const expectedCalls = [
        // Schema from components
        call(componentsSchema, SchemaIteratorCallbackType.NEW_SCHEMA),
        call(componentsSchema, SchemaIteratorCallbackType.NEW_SCHEMA, 'anotherExampleField'),
        call(componentsSchema, SchemaIteratorCallbackType.END_SCHEMA, 'anotherExampleField'),
        call(componentsSchema, SchemaIteratorCallbackType.NEW_SCHEMA, 'anotherExampleNumber'),
        call(componentsSchema, SchemaIteratorCallbackType.END_SCHEMA, 'anotherExampleNumber'),
        call(componentsSchema, SchemaIteratorCallbackType.END_SCHEMA)
      ];

      testCallback(expectedCalls, oldDocument, [SchemaTypesToIterate.components, SchemaTypesToIterate.objects]);
    });
  });
});

function testCallback(expectedCalls: ExpectedCallback[], document: AsyncAPIDocument, schemaTypesToIterate: SchemaTypesToIterate[]) {
  let callsLeft = expectedCalls.length;
  const callback = function(schema: Schema, propOrIndex: string | number | null, callbackType: SchemaIteratorCallbackType): void {
    callsLeft--;
    const expected = expectedCalls.shift();
    expect(schema).toEqual(expected?.schema);
    expect(propOrIndex).toEqual(expected?.propOrIndex);
    expect(callbackType).toEqual(expected?.callbackType);
  };

  traverseAsyncApiDocument(document, callback, schemaTypesToIterate);
  expect(callsLeft).toEqual(0);
}

function call(schema: Schema, callbackType: SchemaIteratorCallbackType, propOrIndex: string | number | null = null): ExpectedCallback {
  let schemaProperties = schema;
  if (propOrIndex) {
    schemaProperties = schema.properties()[propOrIndex as string];
  }

  return {
    schema: schemaProperties,
    propOrIndex,
    callbackType,
  };
}