import { SchemaIteratorCallbackType, traverseAsyncApiDocument } from '../src/iterator';
import { Parser } from '../src/parser';
import { parse } from '../src/parse';
import { AsyncAPIDocumentV2, SchemaV2 } from '../src/models';
import { SchemaInterface } from '../src/models/schema';

const document = {
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
  }
};

describe('Traverse AsyncAPI document', function() {
  const parser = new Parser();
  describe('traverseAsyncApiDocument()', function() {
    it('should traverse valid document', async function() {
      const { parsed } = await parse(parser, document);
      expect(parsed).toBeInstanceOf(AsyncAPIDocumentV2);

      const payload = parsed?.messages().all()[0].payload() as SchemaV2;
      expect(payload).toBeInstanceOf(SchemaV2);

      const expectedCalls = [
        {
          schema: payload,
          propOrIndex: null,
          callbackType: SchemaIteratorCallbackType.NEW_SCHEMA,
        },
        {
          schema: (payload.properties() as Record<string, SchemaInterface>)['exampleField'],
          propOrIndex: 'exampleField',
          callbackType: SchemaIteratorCallbackType.NEW_SCHEMA,
        },
        {
          schema: (payload.properties() as Record<string, SchemaInterface>)['exampleField'],
          propOrIndex: 'exampleField',
          callbackType: SchemaIteratorCallbackType.END_SCHEMA,
        },
        {
          schema: (payload.properties() as Record<string, SchemaInterface>)['exampleNumber'],
          propOrIndex: 'exampleNumber',
          callbackType: SchemaIteratorCallbackType.NEW_SCHEMA,
        },
        {
          schema: (payload.properties() as Record<string, SchemaInterface>)['exampleNumber'],
          propOrIndex: 'exampleNumber',
          callbackType: SchemaIteratorCallbackType.END_SCHEMA,
        },
        {
          schema: payload,
          propOrIndex: null,
          callbackType: SchemaIteratorCallbackType.END_SCHEMA,
        },
      ];

      let callsLeft = expectedCalls.length;
      const calback = function(schema: SchemaInterface, propOrIndex: String | Number | null, callbackType: SchemaIteratorCallbackType): void {
        callsLeft--;
        const expected = expectedCalls.shift();
        expect(schema).toEqual(expected?.schema);
        expect(propOrIndex).toEqual(expected?.propOrIndex);
        expect(callbackType).toEqual(expected?.callbackType);
      };
      traverseAsyncApiDocument(parsed, calback, []);
      expect(callsLeft).toEqual(0);
    });
  });
});