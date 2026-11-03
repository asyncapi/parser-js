import { xParserSpecParsed, xParserSpecStringified } from '../src/constants';
import { BaseModel } from '../src/models';
import { stringify, unstringify } from '../src/stringify';
import { createAsyncAPIDocument } from '../src/document';
import { createDetailedAsyncAPI } from '../src/utils';
import { Parser } from '../src/parser';

describe('stringify & unstringify', function() {
  class Model extends BaseModel {}

  describe('stringify()', function() {
    it('should not stringify normal object', function() {
      expect(stringify({})).toEqual(undefined);
    });

    it('should not stringify null object', function() {
      expect(stringify(null)).toEqual(undefined);
    });

    it('should not stringify primitive', function() {
      expect(stringify('AsyncAPI rocks!')).toEqual(undefined);
    });

    it('should not stringify BaseModel instance', function() {
      expect(stringify(new Model({}))).toEqual(undefined);
    });

    it('should stringify parsed document', function() {
      expect(typeof stringify({ [xParserSpecParsed]: true })).toEqual('string');
    });

    it('should stringify (skip) stringified document', function() {
      expect(typeof stringify({ [xParserSpecParsed]: true, [xParserSpecStringified]: true })).toEqual('string');
    });

    it('should stringify AsyncAPIDocument instance', function() {
      const doc = { asyncapi: '2.0.0' };
      const detailed = createDetailedAsyncAPI(doc as any, doc as any);
      expect(typeof stringify(createAsyncAPIDocument(detailed))).toEqual('string');
    });
  });

  describe('unstringify()', function() {
    it.each([
      ['2.6.0', false],
      ['2.6.0', true],
      ['3.0.0', false],
      ['3.0.0', true],
    ])('should restore shared and circular schemas for %s (object input: %s)', async function(version, objectInput) {
      const { document } = await new Parser().parse({
        asyncapi: version,
        info: { title: 'Serialization example', version: '1.0.0' },
        channels: {},
        components: {
          schemas: {
            Node: {
              type: 'object',
              properties: {
                child: { $ref: '#/components/schemas/Node' },
              },
            },
          },
          messages: {
            NodeMessage: { payload: { $ref: '#/components/schemas/Node' } },
          },
        },
      });
      expect(document).toBeDefined();

      const serialized = stringify(document)!;
      const restored = unstringify(objectInput ? JSON.parse(serialized) : serialized)!;
      const schema = restored.components().schemas().get('Node')!;
      const payload = restored.components().messages().get('NodeMessage')!.payload()!;

      expect(payload.json()).toBe(schema.json());
      expect(schema.property('child')!.json()).toBe(schema.json());
      expect(restored.json()[xParserSpecStringified]).toBeUndefined();
    });

    it.each([false, true])('should restore references to the returned root (object input: %s)', function(objectInput) {
      const data = {
        asyncapi: '3.0.0',
        [xParserSpecParsed]: true,
        [xParserSpecStringified]: true,
        'x-root': '$ref:$',
      };
      const restored = unstringify(objectInput ? data : JSON.stringify(data))!;

      expect(restored.json()['x-root']).toBe(restored.json());
      expect(restored.json()[xParserSpecStringified]).toBeUndefined();
    });

    it('should not unstringify normal object', function() {
      expect(unstringify({})).toEqual(undefined);
    });

    it('should not unstringify null object', function() {
      expect(unstringify(null)).toEqual(undefined);
    });

    it('should not stringify primitive', function() {
      expect(unstringify('AsyncAPI rocks!')).toEqual(undefined);
    });

    it('should not stringify BaseModel instance', function() {
      expect(unstringify(new Model({}))).toEqual(undefined);
    });

    it('should not unstringify parsed document', function() {
      expect(unstringify({ [xParserSpecParsed]: true })).toEqual(undefined);
    });

    it('should unstringify stringified document', function() {
      expect(unstringify({ asyncapi: '2.0.0', [xParserSpecParsed]: true, [xParserSpecStringified]: true })).not.toEqual(undefined);
    });
  });
});
