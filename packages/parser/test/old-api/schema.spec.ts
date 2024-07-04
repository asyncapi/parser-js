import { Schema } from '../../src/old-api/schema';
import { assertDescriptionMixin, assertExtensionsMixin, assertExternalDocumentationMixin } from './mixins';

describe('Schema', function() {  
  describe('uid()', function() {
    it('should return a string', function() {
      const doc: any = { $id: 'test' };
      const d = new Schema(doc);
      expect(typeof d.uid()).toEqual('string');
      expect(d.uid()).toEqual(doc.$id);
    });
    
    it('should return a string with the value of x-parser-schema-id when $id is not available', function() {
      const doc: any = { 'x-parser-schema-id': 'test' };
      const d = new Schema(doc);
      expect(typeof d.uid()).toEqual('string');
      expect(d.uid()).toEqual(doc['x-parser-schema-id']);
    });
  });
  
  describe('$id()', function() {
    it('should return a string', function() {
      const doc: any = { $id: 'test' };
      const d = new Schema(doc);
      expect(typeof d.$id()).toEqual('string');
      expect(d.$id()).toEqual(doc.$id);
    });
  });
  
  describe('maximum()', function() {
    it('should return a number', function() {
      const doc: any = { type: 'number', maximum: 10 };
      const d = new Schema(doc);
      expect(typeof d.maximum()).toEqual('number');
      expect(d.maximum()).toEqual(doc.maximum);
    });
  });
  
  describe('exclusiveMaximum()', function() {
    it('should return a number', function() {
      const doc: any = { type: 'number', exclusiveMaximum: 10 };
      const d = new Schema(doc);
      expect(typeof d.exclusiveMaximum()).toEqual('number');
      expect(d.exclusiveMaximum()).toEqual(doc.exclusiveMaximum);
    });
  });
  
  describe('minimum()', function() {
    it('should return a number', function() {
      const doc: any = { type: 'number', minimum: 10 };
      const d = new Schema(doc);
      expect(typeof d.minimum()).toEqual('number');
      expect(d.minimum()).toEqual(doc.minimum);
    });
  });
  
  describe('exclusiveMinimum()', function() {
    it('should return a number', function() {
      const doc: any = { type: 'number', exclusiveMinimum: 10 };
      const d = new Schema(doc);
      expect(typeof d.exclusiveMinimum()).toEqual('number');
      expect(d.exclusiveMinimum()).toEqual(doc.exclusiveMinimum);
    });
  });

  describe('multipleOf()', function() {
    it('should return a number', function() {
      const doc: any = { type: 'number', multipleOf: 1.0 };
      const d = new Schema(doc);
      expect(typeof d.multipleOf()).toEqual('number');
      expect(d.multipleOf()).toEqual(doc.multipleOf);
    });
  });
  
  describe('maxLength()', function() {
    it('should return a number', function() {
      const doc: any = { type: 'string', maxLength: 10 };
      const d = new Schema(doc);
      expect(typeof d.maxLength()).toEqual('number');
      expect(d.maxLength()).toEqual(doc.maxLength);
    });
  });
  
  describe('minLength()', function() {
    it('should return a number', function() {
      const doc: any = { type: 'string', minLength: 10 };
      const d = new Schema(doc);
      expect(typeof d.minLength()).toEqual('number');
      expect(d.minLength()).toEqual(doc.minLength);
    });
  });
  
  describe('pattern()', function() {
    it('should return a string', function() {
      const doc: any = { type: 'string', pattern: '^test' };
      const d = new Schema(doc);
      expect(typeof d.pattern()).toEqual('string');
      expect(d.pattern()).toEqual(doc.pattern);
    });
  });
  
  describe('maxItems()', function() {
    it('should return a number', function() {
      const doc: any = { type: 'array', maxItems: 10 };
      const d = new Schema(doc);
      expect(typeof d.maxItems()).toEqual('number');
      expect(d.maxItems()).toEqual(doc.maxItems);
    });
  });
  
  describe('minItems()', function() {
    it('should return a number', function() {
      const doc: any = { type: 'array', minItems: 10 };
      const d = new Schema(doc);
      expect(typeof d.minItems()).toEqual('number');
      expect(d.minItems()).toEqual(doc.minItems);
    });
  });
  
  describe('uniqueItems()', function() {
    it('should return a boolean', function() {
      const doc: any = { type: 'array', uniqueItems: true };
      const d = new Schema(doc);
      expect(typeof d.uniqueItems()).toEqual('boolean');
      expect(d.uniqueItems()).toEqual(doc.uniqueItems);
    });
  });

  describe('maxProperties()', function() {
    it('should return a number', function() {
      const doc: any = { type: 'object', maxProperties: 10 };
      const d = new Schema(doc);
      expect(typeof d.maxProperties()).toEqual('number');
      expect(d.maxProperties()).toEqual(doc.maxProperties);
    });
  });

  describe('minProperties()', function() {
    it('should return a number', function() {
      const doc: any = { type: 'object', minProperties: 10 };
      const d = new Schema(doc);
      expect(typeof d.minProperties()).toEqual('number');
      expect(d.minProperties()).toEqual(doc.minProperties);
    });
  });

  describe('required()', function() {
    it('should return a number', function() {
      const doc: any = { type: 'object', required: ['test'] };
      const d = new Schema(doc);
      expect(Array.isArray(d.required())).toEqual(true);
      expect(d.required()).toEqual(doc.required);
    });
  });

  describe('enum()', function() {
    it('should return a number', function() {
      const doc: any = { type: 'string', enum: ['test'] };
      const d = new Schema(doc);
      expect(Array.isArray(d.enum())).toEqual(true);
      expect(d.enum()).toEqual(doc.enum);
    });
  });

  describe('type()', function() {
    it('should return a string', function() {
      const doc: any = { type: 'string' };
      const d = new Schema(doc);
      expect(typeof d.type()).toEqual('string');
      expect(d.type()).toEqual(doc.type);
    });
    
    it('should return an array of strings', function() {
      const doc: any = { type: ['number', 'string'] };
      const d = new Schema(doc);
      expect(Array.isArray(d.type())).toEqual(true);
      expect(d.type()).toEqual(doc.type);
    });
  });

  describe('allOf()', function() {
    it('should return an array of Schema objects', function() {
      const doc: any = { allOf: [{ type: 'string' }, { type: 'number' }] };
      const d = new Schema(doc);
      expect(Array.isArray(d.allOf())).toEqual(true);
      d.allOf()?.forEach((s, i) => {
        expect(s).toBeInstanceOf(Schema);
        expect(s.json()).toEqual(doc.allOf[i]);
      });
    });
  });

  describe('oneOf()', function() {
    it('should return an array of Schema objects', function() {
      const doc: any = { oneOf: [{ type: 'string' }, { type: 'number' }] };
      const d = new Schema(doc);
      expect(Array.isArray(d.oneOf())).toEqual(true);
      d.oneOf()?.forEach((s, i) => {
        expect(s).toBeInstanceOf(Schema);
        expect(s.json()).toEqual(doc.oneOf[i]);
      });
    });
  });

  describe('anyOf()', function() {
    it('should return an array of Schema objects', function() {
      const doc: any = { anyOf: [{ type: 'string' }, { type: 'number' }] };
      const d = new Schema(doc);
      expect(Array.isArray(d.anyOf())).toEqual(true);
      d.anyOf()?.forEach((s, i) => {
        expect(s).toBeInstanceOf(Schema);
        expect(s.json()).toEqual(doc.anyOf[i]);
      });
    });
  });

  describe('not()', function() {
    it('should return a Schema object', function() {
      const doc: any = { not: { type: 'string' } };
      const d = new Schema(doc);
      expect(d.not()).toBeInstanceOf(Schema);
      expect(d.not()?.json()).toEqual(doc.not);
    });

    it('should return null when not is omitted from the json document', function() {
      const doc: any = {};
      const d = new Schema(doc);
      expect(d.not()).toEqual(null);
    });
  });

  describe('items()', function() {
    it('should return a Schema object', function() {
      const doc: any = { items: { type: 'string' } };
      const d = new Schema(doc);
      expect(d.items()).toBeInstanceOf(Schema);
      expect((d.items() as Schema).json()).toEqual(doc.items);
    });
    
    it('should return an array of Schema objects', function() {
      const doc: any = { items: [{ type: 'string' }, { type: 'number' }] };
      const d = new Schema(doc);
      expect(Array.isArray(d.items())).toEqual(true);
      (d.items() as Schema[]).forEach((s, i) => {
        expect(s).toBeInstanceOf(Schema);
        expect(s.json()).toEqual(doc.items[i]);
      });
    });
  });

  describe('properties()', function() {
    it('should return a map of Schema objects', function() {
      const doc: any = { properties: { test: { type: 'string' } } };
      const d = new Schema(doc);
      expect(typeof d.properties()).toEqual('object');
      Object.keys(d.properties()).forEach(key => {
        const s = d.properties()[key];
        expect(s).toBeInstanceOf(Schema);
        expect(s.json()).toEqual(doc.properties[key]);
      });
    });
  });

  describe('property()', function() {
    it('should return a specific Schema object', function() {
      const doc: any = { properties: { test: { type: 'string' } } };
      const d = new Schema(doc);
      expect(d.property('test')).toBeInstanceOf(Schema);
      expect(d.property('test')?.json()).toEqual(doc.properties.test);
    });
  });

  describe('additionalProperties()', function() {
    it('should return a Schema object', function() {
      const doc: any = { additionalProperties: { type: 'string' } };
      const d = new Schema(doc);
      expect(d.additionalProperties()).toBeInstanceOf(Schema);
      expect((d.additionalProperties() as Schema).json()).toEqual(doc.additionalProperties);
    });
    
    it('should return a boolean', function() {
      const doc: any = { additionalProperties: true };
      const d = new Schema(doc);
      expect(typeof d.additionalProperties()).toEqual('boolean');
      expect(d.additionalProperties()).toEqual(doc.additionalProperties);
    });
    
    it('should return undefined when not defined', function() {
      const doc: any = {};
      const d = new Schema(doc);
      expect(d.additionalProperties()).toEqual(undefined);
    });
    
    it('should return undefined when null', function() {
      const doc: any = { additionalProperties: null };
      const d = new Schema(doc);
      expect(d.additionalProperties()).toEqual(undefined);
    });
  });

  describe('additionalItems()', function() {
    it('should return a Schema object', function() {
      const doc: any = { additionalItems: { type: 'string' } };
      const d = new Schema(doc);
      expect(d.additionalItems()).toBeInstanceOf(Schema);
      expect((d.additionalItems() as Schema).json()).toEqual(doc.additionalItems);
    });
    
    it('should return undefined when not defined', function() {
      const doc: any = {};
      const d = new Schema(doc);
      expect(d.additionalItems()).toEqual(undefined);
    });
    
    it('should return undefined when null', function() {
      const doc: any = { additionalItems: null };
      const d = new Schema(doc);
      expect(d.additionalItems()).toEqual(undefined);
    });
  });

  describe('patternProperties()', function() {
    it('should return a map of Schema objects', function() {
      const doc: any = { patternProperties: { test: { type: 'string' } } };
      const d = new Schema(doc);
      expect(typeof d.patternProperties()).toEqual('object');
      Object.keys(d.patternProperties()).forEach(key => {
        const s = d.patternProperties()[key];
        expect(s).toBeInstanceOf(Schema);
        expect(s.json()).toEqual(doc.patternProperties[key]);
      });
    });
  });

  describe('const()', function() {
    it('should return a number', function() {
      const doc: any = { type: 'object', const: 10 };
      const d = new Schema(doc);
      expect(typeof d.const()).toEqual('number');
      expect(d.const()).toEqual(doc.const);
    });
    
    it('should return null', function() {
      const doc: any = { type: 'object', const: null };
      const d = new Schema(doc);
      expect(d.const()).toEqual(doc.const);
    });
    
    it('should return an object', function() {
      const doc: any = { type: 'object', const: { test: true } };
      const d = new Schema(doc);
      expect(typeof d.const()).toEqual('object');
      expect(d.const()).toEqual(doc.const);
    });
    
    it('should return an array', function() {
      const doc: any = { type: 'object', const: ['test'] };
      const d = new Schema(doc);
      expect(Array.isArray(d.const())).toEqual(true);
      expect(d.const()).toEqual(doc.const);
    });
  });

  describe('contains()', function() {
    it('should return a Schema object', function() {
      const doc: any = { contains: { type: 'string' } };
      const d = new Schema(doc);
      expect(d.contains()).toBeInstanceOf(Schema);
      expect(d.contains()?.json()).toEqual(doc.contains);
    });

    it('should return null when contains is omitted from the json document', function() {
      const doc: any = {};
      const d = new Schema(doc);
      expect(d.contains()).toEqual(null);
    });
  });

  describe('dependencies()', function() {
    it('should return a map with an array value', function() {
      const doc: any = { properties: { test: { type: 'string' }, test2: { type: 'number' } }, dependencies: { test: ['test2'] } };
      const d = new Schema(doc);
      expect(typeof d.dependencies()).toEqual('object');
      Object.keys(d.dependencies() || {}).forEach(key => {
        const v = d.dependencies()![key];
        expect(Array.isArray(v)).toEqual(true);
        expect(v).toEqual(doc.dependencies[key]);
      });
    });
    
    it('should return a map with a Schema value', function() {
      const doc: any = { properties: { test: { type: 'string' } }, dependencies: { test: { properties: { test2: { type: 'number' } } } } };
      const d = new Schema(doc);
      expect(typeof d.dependencies()).toEqual('object');
      Object.keys(d.dependencies() || {}).forEach(key => {
        const s = d.dependencies()![key];
        expect(s).toBeInstanceOf(Schema);
        expect((s as Schema).json()).toEqual(doc.dependencies[key]);
      });
    });

    it('should return null when dependencies are omitted from the json document', function() {
      const doc: any = {};
      const d = new Schema(doc);
      expect(d.dependencies()).toEqual(null);
    });
  });

  describe('propertyNames()', function() {
    it('should return a Schema object', function() {
      const doc: any = { propertyNames: { type: 'string' } };
      const d = new Schema(doc);
      expect(d.propertyNames()).toBeInstanceOf(Schema);
      expect(d.propertyNames()?.json()).toEqual(doc.propertyNames);
    });

    it('should return null when propertyNames are omitted from the json document', function() {
      const doc: any = {};
      const d = new Schema(doc);
      expect(d.propertyNames()).toEqual(null);
    });
  });

  describe('if()', function() {
    it('should return a Schema object', function() {
      const doc: any = { if: { type: 'string' } };
      const d = new Schema(doc);
      expect(d.if()).toBeInstanceOf(Schema);
      expect(d.if()?.json()).toEqual(doc.if);
    });

    it('should return null when if is omitted from the json document', function() {
      const doc: any = {};
      const d = new Schema(doc);
      expect(d.if()).toEqual(null);
    });
  });

  describe('then()', function() {
    it('should return a Schema object', function() {
      const doc: any = { then: { type: 'string' } };
      const d = new Schema(doc);
      expect(d.then()).toBeInstanceOf(Schema);
      expect(d.then()?.json()).toEqual(doc.then);
    });

    it('should return null when then is omitted from the json document', function() {
      const doc: any = {};
      const d = new Schema(doc);
      expect(d.then()).toEqual(null);
    });
  });
  
  describe('else()', function() {
    it('should return a Schema object', function() {
      const doc: any = { else: { type: 'string' } };
      const d = new Schema(doc);
      expect(d.else()).toBeInstanceOf(Schema);
      expect(d.else()?.json()).toEqual(doc.else);
    });

    it('should return null when else is omitted from the json document', function() {
      const doc: any = {};
      const d = new Schema(doc);
      expect(d.else()).toEqual(null);
    });
  });

  describe('format()', function() {
    it('should return a string', function() {
      const doc: any = { type: 'string', format: 'email' };
      const d = new Schema(doc);
      expect(typeof d.format()).toEqual('string');
      expect(d.format()).toEqual(doc.format);
    });
  });

  describe('contentEncoding()', function() {
    it('should return a string', function() {
      const doc: any = { type: 'string', contentEncoding: 'base64' };
      const d = new Schema(doc);
      expect(typeof d.contentEncoding()).toEqual('string');
      expect(d.contentEncoding()).toEqual(doc.contentEncoding);
    });
  });

  describe('contentMediaType()', function() {
    it('should return a string', function() {
      const doc: any = { type: 'string', contentMediaType: 'text/html' };
      const d = new Schema(doc);
      expect(typeof d.contentMediaType()).toEqual('string');
      expect(d.contentMediaType()).toEqual(doc.contentMediaType);
    });
  });

  describe('definitions()', function() {
    it('should return a map of Schema objects', function() {
      const doc: any = { definitions: { test: { type: 'string' } } };
      const d = new Schema(doc);
      expect(typeof d.definitions()).toEqual('object');
      Object.keys(d.definitions()).forEach(key => {
        const s = d.definitions()[key];
        expect(s).toBeInstanceOf(Schema);
        expect(s.json()).toEqual(doc.definitions[key]);
      });
    });
  });

  describe('title()', function() {
    it('should return a string', function() {
      const doc: any = { type: 'string', title: 'test' };
      const d = new Schema(doc);
      expect(typeof d.title()).toEqual('string');
      expect(d.title()).toEqual(doc.title);
    });
  });

  describe('default()', function() {
    it('should return a value', function() {
      const doc: any = { type: 'string', default: 'test' };
      const d = new Schema(doc);
      expect(d.default()).toEqual('test');
    });
  });

  describe('deprecated()', function() {
    it('should return a boolean', function() {
      const doc: any = { type: 'string', deprecated: true };
      const d = new Schema(doc);
      expect(typeof d.deprecated()).toEqual('boolean');
      expect(d.deprecated()).toEqual(doc.deprecated);
    });
  });

  describe('discriminator()', function() {
    it('should return a string', function() {
      const doc: any = { type: 'string', discriminator: 'someType' };
      const d = new Schema(doc);
      expect(typeof d.discriminator()).toEqual('string');
      expect(d.discriminator()).toEqual(doc.discriminator);
    });
  });

  describe('readOnly()', function() {
    it('should return a boolean', function() {
      const doc: any = { type: 'string', readOnly: true };
      const d = new Schema(doc);
      expect(typeof d.readOnly()).toEqual('boolean');
      expect(d.readOnly()).toEqual(doc.readOnly);
    });
  });

  describe('writeOnly()', function() {
    it('should return a boolean', function() {
      const doc: any = { type: 'string', writeOnly: true };
      const d = new Schema(doc);
      expect(typeof d.writeOnly()).toEqual('boolean');
      expect(d.writeOnly()).toEqual(doc.writeOnly);
    });
  });

  describe('examples()', function() {
    it('should return an array', function() {
      const doc: any = { type: 'string', examples: ['test'] };
      const d = new Schema(doc);
      expect(Array.isArray(d.examples())).toEqual(true);
      expect(d.examples()).toEqual(doc.examples);
    });
  });

  describe('isBooleanSchema()', function() {
    it('should return a true when schema is true', function() {
      const d = new Schema(true as any);
      expect(d.isBooleanSchema()).toEqual(true);
    });

    it('_json property should equal to true when schema is true', function() {
      const d = new Schema(true as any);
      expect(d.json()).toEqual(true);
    });

    it('should return a true when schema is false', function() {
      const d = new Schema(false as any);
      expect(d.isBooleanSchema()).toEqual(true);
    });

    it('_json property should equal to false when schema is false', function() {
      const d = new Schema(false as any);
      expect(d.json()).toEqual(false);
    });
  });

  describe('isCircular()', function() {
    it('should return a true when appropriate extension is injected', function() {
      const doc: any = { 'x-parser-circular': true };
      const d = new Schema(doc);
      expect(d.isCircular()).toEqual(true);
    });

    it('should return a true when schema has circular reference', function() {
      const doc: any = {
        properties: {
          nonCircular: {
            type: 'string',
          },
          circular: {},
        }
      };
      doc.properties.circular = doc;
      const d = new Schema(doc);
      expect(d.isCircular()).toEqual(false);
      expect(d.properties()['nonCircular'].isCircular()).toEqual(false);
      expect(d.properties()['circular'].isCircular()).toEqual(true);
    });

    it('should return a true when schema has unresolved $ref', function() {
      const doc: any = {
        properties: {
          nonCircular: {
            type: 'string',
          },
          circular: {
            $ref: '../../',
          },
        }
      };
      doc.properties.circular = doc;
      const d = new Schema(doc);
      expect(d.isCircular()).toEqual(false);
      expect(d.properties()['nonCircular'].isCircular()).toEqual(false);
      expect(d.properties()['circular'].isCircular()).toEqual(true);
    });
  });

  describe('circularSchema()', function() {
    it('should return a circular schema', function() {
      const doc: any = {
        properties: {
          nonCircular: {
            type: 'string',
          },
          circular: {},
        }
      };
      doc.properties.circular = doc;
      const d = new Schema(doc);
      expect(d.isCircular()).toEqual(false);
      expect(d.properties()['nonCircular'].circularSchema()).toEqual(undefined);
      expect(d.properties()['circular'].circularSchema()).toEqual(d);
    });
  });

  describe('circularProps()', function() {
    it('should return values from appropriate extenion', function() {
      const doc: any = {
        properties: {
          nonCircular: {
            type: 'string',
          },
          circular1: {},
          circular2: {},
        },
        'x-parser-circular-props': [
          'circular1',
          'circular2',
        ]
      };
      const d = new Schema(doc);
      expect(d.circularProps()).toEqual([
        'circular1',
        'circular2',
      ]);
    });

    it('should return empty array if circular properties do not exist', function() {
      const doc: any = {
        properties: {
          nonCircular1: {
            type: 'string',
          },
          nonCircular2: {
            type: 'number',
          },
          nonCircular3: {
            type: 'integer',
          },
        }
      };
      const d = new Schema(doc);
      expect(d.circularProps()).toEqual([]);
    });

    it('should return names of circular properties', function() {
      const doc: any = {
        properties: {
          nonCircular: {
            type: 'string',
          },
          circular1: {},
          circular2: {},
        }
      };
      doc.properties.circular1 = doc;
      doc.properties.circular2 = doc;
      const d = new Schema(doc);
      expect(d.circularProps()).toEqual([
        'circular1',
        'circular2',
      ]);
    });
  });

  describe('hasCircularProps()', function() {
    it('should return true when appropriate extenion is injected', function() {
      const doc: any = {
        properties: {
          nonCircular: {
            type: 'string',
          },
          circular1: {},
          circular2: {},
        },
        'x-parser-circular-props': [
          'circular1',
          'circular2',
        ]
      };
      const d = new Schema(doc);
      expect(d.hasCircularProps()).toEqual(true);
    });

    it('should return false when circular properties do not exist', function() {
      const doc: any = {
        properties: {
          nonCircular1: {
            type: 'string',
          },
          nonCircular2: {
            type: 'number',
          },
          nonCircular3: {
            type: 'integer',
          },
        }
      };
      const d = new Schema(doc);
      expect(d.hasCircularProps()).toEqual(false);
    });

    it('should return true when circular properties exist', function() {
      const doc: any = {
        properties: {
          nonCircular: {
            type: 'string',
          },
          circular1: {},
          circular2: {},
        }
      };
      doc.properties.circular1 = doc;
      doc.properties.circular2 = doc;
      const d = new Schema(doc);
      expect(d.hasCircularProps()).toEqual(true);
    });
  });

  assertDescriptionMixin(Schema);
  assertExtensionsMixin(Schema);
  assertExternalDocumentationMixin(Schema);
});