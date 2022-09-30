import { SchemaIteratorCallbackType, SchemaTypesToIterate, traverseAsyncApiDocument } from '../src/iterator';
import { Parser } from '../src/parser';
import { AsyncAPIDocumentInterface, AsyncAPIDocumentV2, SchemaV2 } from '../src/models';
import { SchemaInterface } from '../src/models/schema';

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
  schema: SchemaInterface,
  propOrIndex: string | number | null,
  callbackType: SchemaIteratorCallbackType,
}

describe('Traverse AsyncAPI document', function() {
  const parser = new Parser();

  describe('traverseAsyncApiDocument()', function() {
    it('should traverse all possible schemas from a valid document', async function() {
      const { document } = await parser.parse(documentRaw);
      expect(document).toBeInstanceOf(AsyncAPIDocumentV2);

      const payload = document?.messages().all()[0].payload() as SchemaV2;
      const componentsSchema = document?.components().schemas().all()[0] as SchemaV2;
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

      testCallback(expectedCalls, document as AsyncAPIDocumentInterface, []);
    });

    it('should traverse few schemas from a valid document', async function() {
      const { document } = await parser.parse(documentRaw);
      expect(document).toBeInstanceOf(AsyncAPIDocumentV2);

      const componentsSchema = document?.components().schemas().all()[0] as SchemaV2;
      const expectedCalls = [
        // Schema from components
        call(componentsSchema, SchemaIteratorCallbackType.NEW_SCHEMA),
        call(componentsSchema, SchemaIteratorCallbackType.NEW_SCHEMA, 'anotherExampleField'),
        call(componentsSchema, SchemaIteratorCallbackType.END_SCHEMA, 'anotherExampleField'),
        call(componentsSchema, SchemaIteratorCallbackType.NEW_SCHEMA, 'anotherExampleNumber'),
        call(componentsSchema, SchemaIteratorCallbackType.END_SCHEMA, 'anotherExampleNumber'),
        call(componentsSchema, SchemaIteratorCallbackType.END_SCHEMA)
      ];

      testCallback(expectedCalls, document as AsyncAPIDocumentInterface, [SchemaTypesToIterate.Components, SchemaTypesToIterate.Objects]);
    });
  });
});

function testCallback(expectedCalls: ExpectedCallback[], document: AsyncAPIDocumentInterface, schemaTypesToIterate: SchemaTypesToIterate[]) {
  let callsLeft = expectedCalls.length;
  const callback = function(schema: SchemaInterface, propOrIndex: string | number | null, callbackType: SchemaIteratorCallbackType): void {
    callsLeft--;
    const expected = expectedCalls.shift();
    expect(schema).toEqual(expected?.schema);
    expect(propOrIndex).toEqual(expected?.propOrIndex);
    expect(callbackType).toEqual(expected?.callbackType);
  };

  traverseAsyncApiDocument(document, callback, schemaTypesToIterate);
  expect(callsLeft).toEqual(0);
}

function call(schema: SchemaInterface, callbackType: SchemaIteratorCallbackType, propOrIndex: string | number | null = null): ExpectedCallback {
  let schemaProperties = schema;
  if (propOrIndex) {
    schemaProperties = (schema.properties() as Record<string, SchemaInterface>)[propOrIndex as string];
  }

  return {
    schema: schemaProperties,
    propOrIndex,
    callbackType,
  };
}