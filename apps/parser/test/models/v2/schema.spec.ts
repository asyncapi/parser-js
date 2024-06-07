import { Schema } from '../../../src/models/v2/schema';

import { assertExtensions, assertExternalDocumentation } from './utils';
import { xParserSchemaId } from '../../../src/constants';

import { getDefaultSchemaFormat } from '../../../src/schema-parser';

import type { v2 } from '../../../src/spec-types';

describe('Channel model', function() {
  describe('.id()', function() {
    it('should return $id of schema', function() {
      const doc = { $id: '$id', [xParserSchemaId]: xParserSchemaId };
      const d = new Schema(doc, { asyncapi: {} as any, pointer: '', id: 'id' });
      expect(d.id()).toEqual('$id');
    });

    it('should return meta id of schema as fallback', function() {
      const doc = { [xParserSchemaId]: xParserSchemaId };
      const d = new Schema(doc, { asyncapi: {} as any, pointer: '', id: 'id' });
      expect(d.id()).toEqual('id');
    });

    it(`should return ${xParserSchemaId} of schema as fallback`, function() {
      const doc = { [xParserSchemaId]: xParserSchemaId };
      const d = new Schema(doc, { asyncapi: {} as any, pointer: '' });
      expect(d.id()).toEqual(xParserSchemaId);
    });
  });

  describe('.$comment()', function() {
    it('should return the value', function() {
      const doc = { $comment: '...' };
      const d = new Schema(doc);
      expect(d.$comment()).toEqual(doc.$comment);
    });

    it('should return undefined when there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.$comment()).toBeUndefined();
    });
  });

  describe('.$id()', function() {
    it('should return the value', function() {
      const doc = { $id: '...' };
      const d = new Schema(doc);
      expect(d.$id()).toEqual(doc.$id);
    });

    it('should return undefined when there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.$id()).toBeUndefined();
    });
  });

  describe('.$schema()', function() {
    it('should return the value', function() {
      const doc = { $schema: '...' };
      const d = new Schema(doc);
      expect(d.$schema()).toEqual(doc.$schema);
    });

    it('should return fallback value when there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.$schema()).toEqual('http://json-schema.org/draft-07/schema#');
    });
  });

  describe('.additionalItems()', function() {
    it('should return the value schema object', function() {
      const doc = { additionalItems: {} };
      const d = new Schema(doc);
      expect(d.additionalItems()).toBeInstanceOf(Schema);
    });

    it('should return the true when there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.additionalItems()).toEqual(true);
    });

    it('should return the false where there is false value', function() {
      const doc = { additionalItems: false };
      const d = new Schema(doc);
      expect(d.additionalItems()).toEqual(false);
    });

    it('should return the false where there is true value', function() {
      const doc = { additionalItems: true };
      const d = new Schema(doc);
      expect(d.additionalItems()).toEqual(true);
    });

    it('should return true when not defined', function() {
      const doc: any = {};
      const d = new Schema(doc);
      expect(d.additionalItems()).toEqual(true);
    });
    
    it('should return false when null', function() {
      const doc: any = { additionalItems: null };
      const d = new Schema(doc);
      expect(d.additionalItems()).toEqual(false);
    });
  });

  describe('additionalProperties()', function() {
    it('should return a Schema object', function() {
      const doc: any = { additionalProperties: { type: 'string' } };
      const d = new Schema(doc);
      expect(d.additionalProperties()).toBeInstanceOf(Schema);
      expect((d.additionalProperties() as Schema).json()).toEqual(doc.additionalProperties);
    });
    
    it('should return the true when there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.additionalProperties()).toEqual(true);
    });

    it('should return the false where there is false value', function() {
      const doc = { additionalProperties: false };
      const d = new Schema(doc);
      expect(d.additionalProperties()).toEqual(false);
    });
    
    it('should return true when not defined', function() {
      const doc: any = {};
      const d = new Schema(doc);
      expect(d.additionalProperties()).toEqual(true);
    });
    
    it('should return false when null', function() {
      const doc: any = { additionalProperties: null };
      const d = new Schema(doc);
      expect(d.additionalProperties()).toEqual(false);
    });
  });

  describe('.allOf()', function() {
    it('should return collection of schemas', function() {
      const doc = { allOf: [{}, {}] };
      const d = new Schema(doc);
      expect(Array.isArray(d.allOf())).toEqual(true);
      expect(d.allOf()).toHaveLength(2);
      expect((d.allOf() as any)[0]).toBeInstanceOf(Schema);
      expect((d.allOf() as any)[1]).toBeInstanceOf(Schema);
    });

    it('should return undefined where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.allOf()).toBeUndefined();
    });
  });

  describe('.anyOf()', function() {
    it('should return collection of schemas', function() {
      const doc = { anyOf: [{}, {}] };
      const d = new Schema(doc);
      expect(Array.isArray(d.anyOf())).toEqual(true);
      expect(d.anyOf()).toHaveLength(2);
      expect((d.anyOf() as any)[0]).toBeInstanceOf(Schema);
      expect((d.anyOf() as any)[1]).toBeInstanceOf(Schema);
    });

    it('should return undefined where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.anyOf()).toBeUndefined();
    });
  });

  describe('.const()', function() {
    it('should return value', function() {
      const doc = { const: '...' };
      const d = new Schema(doc);
      expect(d.const()).toEqual(doc.const);
    });

    it('should return undefined where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.const()).toBeUndefined();
    });
  });

  describe('.contains()', function() {
    it('should return value', function() {
      const doc = { contains: {} };
      const d = new Schema(doc);
      expect(d.contains()).toBeInstanceOf(Schema);
    });

    it('should return undefined where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.contains()).toBeUndefined();
    });
  });

  describe('.contentEncoding()', function() {
    it('should return value', function() {
      const doc = { contentEncoding: '...' };
      const d = new Schema(doc);
      expect(d.contentEncoding()).toEqual(doc.contentEncoding);
    });

    it('should return undefined where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.contentEncoding()).toBeUndefined();
    });
  });

  describe('.contentMediaType()', function() {
    it('should return value', function() {
      const doc = { contentMediaType: '...' };
      const d = new Schema(doc);
      expect(d.contentMediaType()).toEqual(doc.contentMediaType);
    });

    it('should return undefined where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.contentMediaType()).toBeUndefined();
    });
  });

  describe('.default()', function() {
    it('should return value', function() {
      const doc = { default: '...' };
      const d = new Schema(doc);
      expect(d.default()).toEqual(doc.default);
    });

    it('should return undefined where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.default()).toBeUndefined();
    });
  });

  describe('.definitions()', function() {
    it('should return map of definitions', function() {
      const doc = { definitions: { def: {} } };
      const d = new Schema(doc);
      expect(typeof d.definitions() === 'object').toEqual(true);
      expect((d.definitions() as any)['def']).toBeInstanceOf(Schema);
    });

    it('should return undefined where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.default()).toBeUndefined();
    });
  });

  describe('.description()', function() {
    it('should return value', function() {
      const doc = { description: '...' };
      const d = new Schema(doc);
      expect(d.description()).toEqual(doc.description);
    });

    it('should return undefined where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.description()).toBeUndefined();
    });
  });

  describe('.dependencies()', function() {
    it('should return map of dependencies (schema case)', function() {
      const doc = { dependencies: { dep: {} } };
      const d = new Schema(doc);
      expect(typeof d.dependencies() === 'object').toEqual(true);
      expect((d.dependencies() as any)['dep']).toBeInstanceOf(Schema);
    });

    it('should return map of dependencies (array case)', function() {
      const doc = { dependencies: { array: [] } };
      const d = new Schema(doc);
      expect(typeof d.dependencies() === 'object').toEqual(true);
      expect(Array.isArray((d.dependencies() as any)['array'])).toEqual(true);
    });

    it('should return map of dependencies (schema and array case)', function() {
      const doc = { dependencies: { dep: {}, array: [] } };
      const d = new Schema(doc);
      expect(typeof d.dependencies() === 'object').toEqual(true);
      expect((d.dependencies() as any)['dep']).toBeInstanceOf(Schema);
      expect(Array.isArray((d.dependencies() as any)['array'])).toEqual(true);
    });

    it('should return undefined where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.dependencies()).toBeUndefined();
    });
  });

  describe('.deprecated()', function() {
    it('should return value', function() {
      const doc = { deprecated: true };
      const d = new Schema(doc);
      expect(d.deprecated()).toEqual(doc.deprecated);
    });

    it('should return false where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.deprecated()).toEqual(false);
    });
  });

  describe('.discriminator()', function() {
    it('should return value', function() {
      const doc = { discriminator: '...' };
      const d = new Schema(doc);
      expect(d.discriminator()).toEqual(doc.discriminator);
    });

    it('should return undefined where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.discriminator()).toBeUndefined();
    });
  });

  describe('.else()', function() {
    it('should return value', function() {
      const doc = { else: {} };
      const d = new Schema(doc);
      expect(d.else()).toBeInstanceOf(Schema);
    });

    it('should return undefined where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.else()).toBeUndefined();
    });
  });

  describe('.enum()', function() {
    it('should return value', function() {
      const doc = { enum: ['example'] };
      const d = new Schema(doc);
      expect(Array.isArray(d.enum())).toEqual(true);
      expect((d.enum() as any)[0]).toEqual('example');
    });

    it('should return undefined where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.else()).toBeUndefined();
    });
  });

  describe('.examples()', function() {
    it('should return value', function() {
      const doc = { examples: ['example'] };
      const d = new Schema(doc);
      expect(Array.isArray(d.examples())).toEqual(true);
      expect((d.examples() as any)[0]).toEqual('example');
    });

    it('should return undefined where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.examples()).toBeUndefined();
    });
  });

  describe('.exclusiveMaximum()', function() {
    it('should return value', function() {
      const doc = { exclusiveMaximum: 2137 };
      const d = new Schema(doc);
      expect(d.exclusiveMaximum()).toEqual(doc.exclusiveMaximum);
    });

    it('should return undefined where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.exclusiveMaximum()).toBeUndefined();
    });
  });

  describe('.exclusiveMinimum()', function() {
    it('should return value', function() {
      const doc = { exclusiveMinimum: 2137 };
      const d = new Schema(doc);
      expect(d.exclusiveMinimum()).toEqual(doc.exclusiveMinimum);
    });

    it('should return undefined where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.exclusiveMinimum()).toBeUndefined();
    });
  });

  describe('.format()', function() {
    it('should return value', function() {
      const doc = { format: '...' };
      const d = new Schema(doc);
      expect(d.format()).toEqual(doc.format);
    });

    it('should return undefined where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.format()).toBeUndefined();
    });
  });

  describe('.isBooleanSchema()', function() {
    it('should return true where value is true boolean', function() {
      const d = new Schema(true as any);
      expect(d.isBooleanSchema()).toEqual(true);
    });

    it('should return true where value is false boolean', function() {
      const d = new Schema(false as any);
      expect(d.isBooleanSchema()).toEqual(true);
    });

    it('should return false where value is object', function() {
      const d = new Schema({});
      expect(d.isBooleanSchema()).toEqual(false);
    });
  });

  describe('.if()', function() {
    it('should return value', function() {
      const doc = { if: {} };
      const d = new Schema(doc);
      expect(d.if()).toBeInstanceOf(Schema);
    });

    it('should return undefined where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.if()).toBeUndefined();
    });
  });

  describe('.isCircular()', function() {
    it('should return a true when schema has circular reference', function() {
      const doc: v2.AsyncAPISchemaObject = {
        properties: {
          nonCircular: {
            type: 'string',
          },
          circular: {},
        }
      };
      doc.properties!.circular = doc;
      const d = new Schema(doc);
      expect(d.isCircular()).toEqual(false);
      expect((d.properties() as any)['nonCircular'].isCircular()).toEqual(false);
      expect((d.properties() as any)['circular'].isCircular()).toEqual(true);
    });
  });

  describe('.items()', function() {
    it('should return schema instance', function() {
      const doc = { items: {} };
      const d = new Schema(doc);
      expect(d.items()).toBeInstanceOf(Schema);
    });

    it('should return collection of schemas', function() {
      const doc = { items: [{}, {}] };
      const d = new Schema(doc);
      expect(Array.isArray(d.items())).toEqual(true);
      expect(d.items()).toHaveLength(2);
      expect((d.items() as any)[0]).toBeInstanceOf(Schema);
      expect((d.items() as any)[1]).toBeInstanceOf(Schema);
    });

    it('should return undefined where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.items()).toBeUndefined();
    });
  });

  describe('.maximum()', function() {
    it('should return value', function() {
      const doc = { maximum: 2137 };
      const d = new Schema(doc);
      expect(d.maximum()).toEqual(doc.maximum);
    });

    it('should return undefined where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.maximum()).toBeUndefined();
    });
  });

  describe('.maxItems()', function() {
    it('should return value', function() {
      const doc = { maxItems: 2137 };
      const d = new Schema(doc);
      expect(d.maxItems()).toEqual(doc.maxItems);
    });

    it('should return undefined where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.maxItems()).toBeUndefined();
    });
  });

  describe('.maxLength()', function() {
    it('should return value', function() {
      const doc = { maxLength: 2137 };
      const d = new Schema(doc);
      expect(d.maxLength()).toEqual(doc.maxLength);
    });

    it('should return undefined where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.maxLength()).toBeUndefined();
    });
  });

  describe('.maxProperties()', function() {
    it('should return value', function() {
      const doc = { maxProperties: 2137 };
      const d = new Schema(doc);
      expect(d.maxProperties()).toEqual(doc.maxProperties);
    });

    it('should return undefined where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.maxProperties()).toBeUndefined();
    });
  });

  describe('.minimum()', function() {
    it('should return value', function() {
      const doc = { minimum: 2137 };
      const d = new Schema(doc);
      expect(d.minimum()).toEqual(doc.minimum);
    });

    it('should return undefined where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.minimum()).toBeUndefined();
    });
  });

  describe('.minItems()', function() {
    it('should return value', function() {
      const doc = { minItems: 2137 };
      const d = new Schema(doc);
      expect(d.minItems()).toEqual(doc.minItems);
    });

    it('should return undefined where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.minItems()).toBeUndefined();
    });
  });

  describe('.minLength()', function() {
    it('should return value', function() {
      const doc = { minLength: 2137 };
      const d = new Schema(doc);
      expect(d.minLength()).toEqual(doc.minLength);
    });

    it('should return undefined where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.minLength()).toBeUndefined();
    });
  });

  describe('.minProperties()', function() {
    it('should return value', function() {
      const doc = { minProperties: 2137 };
      const d = new Schema(doc);
      expect(d.minProperties()).toEqual(doc.minProperties);
    });

    it('should return undefined where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.minProperties()).toBeUndefined();
    });
  });

  describe('.multipleOf()', function() {
    it('should return value', function() {
      const doc = { multipleOf: 2137 };
      const d = new Schema(doc);
      expect(d.multipleOf()).toEqual(doc.multipleOf);
    });

    it('should return undefined where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.multipleOf()).toBeUndefined();
    });
  });

  describe('.not()', function() {
    it('should return value', function() {
      const doc = { not: {} };
      const d = new Schema(doc);
      expect(d.not()).toBeInstanceOf(Schema);
    });

    it('should return undefined where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.not()).toBeUndefined();
    });
  });

  describe('.oneOf()', function() {
    it('should return collection of schemas', function() {
      const doc = { oneOf: [{}, {}] };
      const d = new Schema(doc);
      expect(Array.isArray(d.oneOf())).toEqual(true);
      expect(d.oneOf()).toHaveLength(2);
      expect((d.oneOf() as any)[0]).toBeInstanceOf(Schema);
      expect((d.oneOf() as any)[1]).toBeInstanceOf(Schema);
    });

    it('should return undefined where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.oneOf()).toBeUndefined();
    });
  });

  describe('.pattern()', function() {
    it('should return value', function() {
      const doc = { pattern: '...' };
      const d = new Schema(doc);
      expect(d.pattern()).toEqual(doc.pattern);
    });

    it('should return undefined where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.pattern()).toBeUndefined();
    });
  });

  describe('.patternProperties()', function() {
    it('should return map of patternProperties', function() {
      const doc = { patternProperties: { prop: {} } };
      const d = new Schema(doc);
      expect(typeof d.patternProperties() === 'object').toEqual(true);
      expect((d.patternProperties() as any)['prop']).toBeInstanceOf(Schema);
    });

    it('should return undefined where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.patternProperties()).toBeUndefined();
    });
  });

  describe('.properties()', function() {
    it('should return map of properties', function() {
      const doc = { properties: { prop: {} } };
      const d = new Schema(doc);
      expect(typeof d.properties() === 'object').toEqual(true);
      expect((d.properties() as any)['prop']).toBeInstanceOf(Schema);
    });

    it('should return undefined where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.properties()).toBeUndefined();
    });
  });

  describe('.property()', function() {
    it('should return property', function() {
      const doc = { properties: { prop: {} } };
      const d = new Schema(doc);
      expect(d.property('prop')).toBeInstanceOf(Schema);
    });

    it('should return undefined where there is no property', function() {
      const doc = { properties: { another: {} } };
      const d = new Schema(doc);
      expect(d.property('prop')).toBeUndefined();
    });

    it('should return undefined where there is no properties', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.property('prop')).toBeUndefined();
    });
  });

  describe('.propertyNames()', function() {
    it('should return value', function() {
      const doc = { propertyNames: {} };
      const d = new Schema(doc);
      expect(d.propertyNames()).toBeInstanceOf(Schema);
    });

    it('should return undefined where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.propertyNames()).toBeUndefined();
    });
  });

  describe('.readOnly()', function() {
    it('should return value', function() {
      const doc = { readOnly: true };
      const d = new Schema(doc);
      expect(d.readOnly()).toEqual(doc.readOnly);
    });

    it('should return false where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.readOnly()).toEqual(false);
    });
  });

  describe('.required()', function() {
    it('should return array of required properties', function() {
      const doc = { required: ['prop1', 'prop2'] };
      const d = new Schema(doc);
      expect(d.required()).toEqual(doc.required);
    });

    it('should return false where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.required()).toBeUndefined();
    });
  });

  describe('.schemaFormat()', function() {
    it('should return the format of the schema', function() {
      const actualSchemaFormat = 'application/vnd.apache.avro;version=1.9.0';
      const d = new Schema({}, {asyncapi: {} as any, pointer: '', schemaFormat: actualSchemaFormat});
      expect(d.schemaFormat()).toEqual(actualSchemaFormat);
    });

    it('should return the default schema format where there is no value', function() {
      const doc = {asyncapi: '2.6.0' };
      const d = new Schema(doc, {asyncapi: { semver: { version: doc.asyncapi } }});
      expect(d.schemaFormat()).toEqual(getDefaultSchemaFormat(doc.asyncapi));
    });
  });

  describe('.then()', function() {
    it('should return value', function() {
      const doc = { then: {} };
      const d = new Schema(doc);
      expect(d.then()).toBeInstanceOf(Schema);
    });

    it('should return undefined where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.then()).toBeUndefined();
    });
  });

  describe('.title()', function() {
    it('should return value', function() {
      const doc = { title: '...' };
      const d = new Schema(doc);
      expect(d.title()).toEqual(doc.title);
    });

    it('should return undefined where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.title()).toBeUndefined();
    });
  });

  describe('.type()', function() {
    it('should return single type', function() {
      const doc: v2.AsyncAPISchemaObject = { type: 'object' };
      const d = new Schema(doc);
      expect(d.type()).toEqual(doc.type);
    });

    it('should return array of type', function() {
      const doc: v2.AsyncAPISchemaObject = { type: ['object', 'array'] };
      const d = new Schema(doc);
      expect(d.type()).toEqual(doc.type);
    });

    it('should return false where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.type()).toBeUndefined();
    });
  });

  describe('.uniqueItems()', function() {
    it('should return value', function() {
      const doc = { uniqueItems: true };
      const d = new Schema(doc);
      expect(d.uniqueItems()).toEqual(doc.uniqueItems);
    });

    it('should return false where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.uniqueItems()).toEqual(false);
    });
  });

  describe('.writeOnly()', function() {
    it('should return value', function() {
      const doc = { writeOnly: true };
      const d = new Schema(doc);
      expect(d.writeOnly()).toEqual(doc.writeOnly);
    });

    it('should return false where there is no value', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.writeOnly()).toEqual(false);
    });
  });

  describe('mixins', function() {
    assertExtensions(Schema);
    assertExternalDocumentation(Schema);
  });
});
