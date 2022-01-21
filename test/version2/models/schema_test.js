const { expect } = require('chai');

const Schema = require('../../../lib/version2/models/schema');

const { assertMixinDescriptionInheritance } = require('./mixins/description_test');
const { assertMixinExternalDocsInheritance } = require('./mixins/external-docs_test');
const { assertMixinSpecificationExtensionsInheritance } = require('./mixins/specification-extensions_test');

describe('Schema', function() {
  describe('#multipleOf()', function() {
    it('should return a number', function() {
      const doc = { type: 'number', multipleOf: 1.0 };
      const d = new Schema(doc);
      expect(typeof d.multipleOf()).to.be.equal('number');
      expect(d.multipleOf()).to.be.equal(doc.multipleOf);
    });
  });
  
  describe('#uid()', function() {
    it('should return a string', function() {
      const doc = { $id: 'test' };
      const d = new Schema(doc);
      expect(typeof d.uid()).to.be.equal('string');
      expect(d.uid()).to.be.equal(doc.$id);
    });
    
    it('should return a string with the value of x-parser-schema-id when $id is not available', function() {
      const doc = { 'x-parser-schema-id': 'test' };
      const d = new Schema(doc);
      expect(typeof d.uid()).to.be.equal('string');
      expect(d.uid()).to.be.equal(doc['x-parser-schema-id']);
    });
  });
  
  describe('#$id()', function() {
    it('should return a string', function() {
      const doc = { $id: 'test' };
      const d = new Schema(doc);
      expect(typeof d.$id()).to.be.equal('string');
      expect(d.$id()).to.be.equal(doc.$id);
    });
  });
  
  describe('#maximum()', function() {
    it('should return a number', function() {
      const doc = { type: 'number', maximum: 10 };
      const d = new Schema(doc);
      expect(typeof d.maximum()).to.be.equal('number');
      expect(d.maximum()).to.be.equal(doc.maximum);
    });
  });
  
  describe('#exclusiveMaximum()', function() {
    it('should return a number', function() {
      const doc = { type: 'number', exclusiveMaximum: 10 };
      const d = new Schema(doc);
      expect(typeof d.exclusiveMaximum()).to.be.equal('number');
      expect(d.exclusiveMaximum()).to.be.equal(doc.exclusiveMaximum);
    });
  });
  
  describe('#minimum()', function() {
    it('should return a number', function() {
      const doc = { type: 'number', minimum: 10 };
      const d = new Schema(doc);
      expect(typeof d.minimum()).to.be.equal('number');
      expect(d.minimum()).to.be.equal(doc.minimum);
    });
  });
  
  describe('#exclusiveMinimum()', function() {
    it('should return a number', function() {
      const doc = { type: 'number', exclusiveMinimum: 10 };
      const d = new Schema(doc);
      expect(typeof d.exclusiveMinimum()).to.be.equal('number');
      expect(d.exclusiveMinimum()).to.be.equal(doc.exclusiveMinimum);
    });
  });
  
  describe('#maxLength()', function() {
    it('should return a number', function() {
      const doc = { type: 'string', maxLength: 10 };
      const d = new Schema(doc);
      expect(typeof d.maxLength()).to.be.equal('number');
      expect(d.maxLength()).to.be.equal(doc.maxLength);
    });
  });
  
  describe('#minLength()', function() {
    it('should return a number', function() {
      const doc = { type: 'string', minLength: 10 };
      const d = new Schema(doc);
      expect(typeof d.minLength()).to.be.equal('number');
      expect(d.minLength()).to.be.equal(doc.minLength);
    });
  });
  
  describe('#pattern()', function() {
    it('should return a string', function() {
      const doc = { type: 'string', pattern: '^test' };
      const d = new Schema(doc);
      expect(typeof d.pattern()).to.be.equal('string');
      expect(d.pattern()).to.be.equal(doc.pattern);
    });
  });
  
  describe('#maxItems()', function() {
    it('should return a number', function() {
      const doc = { type: 'array', maxItems: 10 };
      const d = new Schema(doc);
      expect(typeof d.maxItems()).to.be.equal('number');
      expect(d.maxItems()).to.be.equal(doc.maxItems);
    });
  });
  
  describe('#minItems()', function() {
    it('should return a number', function() {
      const doc = { type: 'array', minItems: 10 };
      const d = new Schema(doc);
      expect(typeof d.minItems()).to.be.equal('number');
      expect(d.minItems()).to.be.equal(doc.minItems);
    });
  });
  
  describe('#uniqueItems()', function() {
    it('should return a boolean', function() {
      const doc = { type: 'array', uniqueItems: true };
      const d = new Schema(doc);
      expect(typeof d.uniqueItems()).to.be.equal('boolean');
      expect(d.uniqueItems()).to.be.equal(doc.uniqueItems);
    });
  });

  describe('#maxProperties()', function() {
    it('should return a number', function() {
      const doc = { type: 'object', maxProperties: 10 };
      const d = new Schema(doc);
      expect(typeof d.maxProperties()).to.be.equal('number');
      expect(d.maxProperties()).to.be.equal(doc.maxProperties);
    });
  });

  describe('#minProperties()', function() {
    it('should return a number', function() {
      const doc = { type: 'object', minProperties: 10 };
      const d = new Schema(doc);
      expect(typeof d.minProperties()).to.be.equal('number');
      expect(d.minProperties()).to.be.equal(doc.minProperties);
    });
  });

  describe('#required()', function() {
    it('should return a number', function() {
      const doc = { type: 'object', required: ['test'] };
      const d = new Schema(doc);
      expect(Array.isArray(d.required())).to.be.equal(true);
      expect(d.required()).to.be.equal(doc.required);
    });
  });

  describe('#enum()', function() {
    it('should return a number', function() {
      const doc = { type: 'string', enum: ['test'] };
      const d = new Schema(doc);
      expect(Array.isArray(d.enum())).to.be.equal(true);
      expect(d.enum()).to.be.equal(doc.enum);
    });
  });

  describe('#type()', function() {
    it('should return a string', function() {
      const doc = { type: 'string' };
      const d = new Schema(doc);
      expect(typeof d.type()).to.be.equal('string');
      expect(d.type()).to.be.equal(doc.type);
    });
    
    it('should return an array of strings', function() {
      const doc = { type: ['number', 'string'] };
      const d = new Schema(doc);
      expect(Array.isArray(d.type())).to.be.equal(true);
      expect(d.type()).to.be.equal(doc.type);
    });
  });

  describe('#allOf()', function() {
    it('should return an array of Schema objects', function() {
      const doc = { allOf: [{ type: 'string' }, { type: 'number' }] };
      const d = new Schema(doc);
      expect(Array.isArray(d.allOf())).to.be.equal(true);
      d.allOf().forEach((s, i) => {
        expect(s.constructor.name).to.be.equal('Schema');
        expect(s.json()).to.be.equal(doc.allOf[i]);
      });
    });
  });

  describe('#oneOf()', function() {
    it('should return an array of Schema objects', function() {
      const doc = { oneOf: [{ type: 'string' }, { type: 'number' }] };
      const d = new Schema(doc);
      expect(Array.isArray(d.oneOf())).to.be.equal(true);
      d.oneOf().forEach((s, i) => {
        expect(s.constructor.name).to.be.equal('Schema');
        expect(s.json()).to.be.equal(doc.oneOf[i]);
      });
    });
  });

  describe('#anyOf()', function() {
    it('should return an array of Schema objects', function() {
      const doc = { anyOf: [{ type: 'string' }, { type: 'number' }] };
      const d = new Schema(doc);
      expect(Array.isArray(d.anyOf())).to.be.equal(true);
      d.anyOf().forEach((s, i) => {
        expect(s.constructor.name).to.be.equal('Schema');
        expect(s.json()).to.be.equal(doc.anyOf[i]);
      });
    });
  });

  describe('#not()', function() {
    it('should return a Schema object', function() {
      const doc = { not: { type: 'string' } };
      const d = new Schema(doc);
      expect(d.not().constructor.name).to.be.equal('Schema');
      expect(d.not().json()).to.be.equal(doc.not);
    });

    it('should return null when not is omitted from the json document', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.not()).to.be.equal(null);
    });
  });

  describe('#items()', function() {
    it('should return a Schema object', function() {
      const doc = { items: { type: 'string' } };
      const d = new Schema(doc);
      expect(d.items().constructor.name).to.be.equal('Schema');
      expect(d.items().json()).to.be.equal(doc.items);
    });
    
    it('should return an array of Schema objects', function() {
      const doc = { items: [{ type: 'string' }, { type: 'number' }] };
      const d = new Schema(doc);
      expect(Array.isArray(d.items())).to.be.equal(true);
      d.items().forEach((s, i) => {
        expect(s.constructor.name).to.be.equal('Schema');
        expect(s.json()).to.be.equal(doc.items[i]);
      });
    });
  });

  describe('#properties()', function() {
    it('should return a map of Schema objects', function() {
      const doc = { properties: { test: { type: 'string' } } };
      const d = new Schema(doc);
      expect(typeof d.properties()).to.be.equal('object');
      Object.keys(d.properties()).forEach(key => {
        const s = d.properties()[key];
        expect(s.constructor.name).to.be.equal('Schema');
        expect(s.json()).to.be.equal(doc.properties[key]);
      });
    });
  });

  describe('#property()', function() {
    it('should return a specific Schema object', function() {
      const doc = { properties: { test: { type: 'string' } } };
      const d = new Schema(doc);
      expect(d.property('test').constructor.name).to.be.equal('Schema');
      expect(d.property('test').json()).to.equal(doc.properties.test);
    });
  });

  describe('#additionalProperties()', function() {
    it('should return a Schema object', function() {
      const doc = { additionalProperties: { type: 'string' } };
      const d = new Schema(doc);
      expect(d.additionalProperties().constructor.name).to.be.equal('Schema');
      expect(d.additionalProperties().json()).to.be.equal(doc.additionalProperties);
    });
    
    it('should return a boolean', function() {
      const doc = { additionalProperties: true };
      const d = new Schema(doc);
      expect(typeof d.additionalProperties()).to.be.equal('boolean');
      expect(d.additionalProperties()).to.be.equal(doc.additionalProperties);
    });
    
    it('should return undefined when not defined', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.additionalProperties()).to.be.equal(undefined);
    });
    
    it('should return undefined when null', function() {
      const doc = { additionalProperties: null };
      const d = new Schema(doc);
      expect(d.additionalProperties()).to.be.equal(undefined);
    });
  });

  describe('#additionalItems()', function() {
    it('should return a Schema object', function() {
      const doc = { additionalItems: { type: 'string' } };
      const d = new Schema(doc);
      expect(d.additionalItems().constructor.name).to.be.equal('Schema');
      expect(d.additionalItems().json()).to.be.equal(doc.additionalItems);
    });
    
    it('should return undefined when not defined', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.additionalItems()).to.be.equal(undefined);
    });
    
    it('should return undefined when null', function() {
      const doc = { additionalItems: null };
      const d = new Schema(doc);
      expect(d.additionalItems()).to.be.equal(undefined);
    });
  });

  describe('#patternProperties()', function() {
    it('should return a map of Schema objects', function() {
      const doc = { patternProperties: { test: { type: 'string' } } };
      const d = new Schema(doc);
      expect(typeof d.patternProperties()).to.be.equal('object');
      Object.keys(d.patternProperties()).forEach(key => {
        const s = d.patternProperties()[key];
        expect(s.constructor.name).to.be.equal('Schema');
        expect(s.json()).to.be.equal(doc.patternProperties[key]);
      });
    });
  });

  describe('#const()', function() {
    it('should return a number', function() {
      const doc = { type: 'object', const: 10 };
      const d = new Schema(doc);
      expect(typeof d.const()).to.be.equal('number');
      expect(d.const()).to.be.equal(doc.const);
    });
    
    it('should return null', function() {
      const doc = { type: 'object', const: null };
      const d = new Schema(doc);
      expect(d.const()).to.be.equal(doc.const);
    });
    
    it('should return an object', function() {
      const doc = { type: 'object', const: { test: true } };
      const d = new Schema(doc);
      expect(typeof d.const()).to.be.equal('object');
      expect(d.const()).to.be.equal(doc.const);
    });
    
    it('should return an array', function() {
      const doc = { type: 'object', const: ['test'] };
      const d = new Schema(doc);
      expect(Array.isArray(d.const())).to.be.equal(true);
      expect(d.const()).to.be.equal(doc.const);
    });
  });

  describe('#contains()', function() {
    it('should return a Schema object', function() {
      const doc = { contains: { type: 'string' } };
      const d = new Schema(doc);
      expect(d.contains().constructor.name).to.be.equal('Schema');
      expect(d.contains().json()).to.be.equal(doc.contains);
    });

    it('should return null when contains is omitted from the json document', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.contains()).to.be.equal(null);
    });
  });

  describe('#dependencies()', function() {
    it('should return a map with an array value', function() {
      const doc = { properties: { test: { type: 'string' }, test2: { type: 'number' } }, dependencies: { test: ['test2'] } };
      const d = new Schema(doc);
      expect(typeof d.dependencies()).to.be.equal('object');
      Object.keys(d.dependencies()).forEach(key => {
        const v = d.dependencies()[key];
        expect(Array.isArray(v)).to.be.equal(true);
        expect(v).to.be.equal(doc.dependencies[key]);
      });
    });
    
    it('should return a map with a Schema value', function() {
      const doc = { properties: { test: { type: 'string' } }, dependencies: { test: { properties: { test2: { type: 'number' } } } } };
      const d = new Schema(doc);
      expect(typeof d.dependencies()).to.be.equal('object');
      Object.keys(d.dependencies()).forEach(key => {
        const s = d.dependencies()[key];
        expect(s.constructor.name).to.be.equal('Schema');
        expect(s.json()).to.be.equal(doc.dependencies[key]);
      });
    });

    it('should return null when dependencies are omitted from the json document', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.dependencies()).to.be.equal(null);
    });
  });

  describe('#propertyNames()', function() {
    it('should return a Schema object', function() {
      const doc = { propertyNames: { type: 'string' } };
      const d = new Schema(doc);
      expect(d.propertyNames().constructor.name).to.be.equal('Schema');
      expect(d.propertyNames().json()).to.be.equal(doc.propertyNames);
    });

    it('should return null when propertyNames are omitted from the json document', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.propertyNames()).to.be.equal(null);
    });
  });

  describe('#if()', function() {
    it('should return a Schema object', function() {
      const doc = { if: { type: 'string' } };
      const d = new Schema(doc);
      expect(d.if().constructor.name).to.be.equal('Schema');
      expect(d.if().json()).to.be.equal(doc.if);
    });

    it('should return null when if is omitted from the json document', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.if()).to.be.equal(null);
    });
  });

  describe('#then()', function() {
    it('should return a Schema object', function() {
      const doc = { then: { type: 'string' } };
      const d = new Schema(doc);
      expect(d.then().constructor.name).to.be.equal('Schema');
      expect(d.then().json()).to.be.equal(doc.then);
    });

    it('should return null when then is omitted from the json document', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.then()).to.be.equal(null);
    });
  });
  
  describe('#else()', function() {
    it('should return a Schema object', function() {
      const doc = { else: { type: 'string' } };
      const d = new Schema(doc);
      expect(d.else().constructor.name).to.be.equal('Schema');
      expect(d.else().json()).to.be.equal(doc.else);
    });

    it('should return null when else is omitted from the json document', function() {
      const doc = {};
      const d = new Schema(doc);
      expect(d.else()).to.be.equal(null);
    });
  });

  describe('#format()', function() {
    it('should return a string', function() {
      const doc = { type: 'string', format: 'email' };
      const d = new Schema(doc);
      expect(typeof d.format()).to.be.equal('string');
      expect(d.format()).to.be.equal(doc.format);
    });
  });

  describe('#contentEncoding()', function() {
    it('should return a string', function() {
      const doc = { type: 'string', contentEncoding: 'base64' };
      const d = new Schema(doc);
      expect(typeof d.contentEncoding()).to.be.equal('string');
      expect(d.contentEncoding()).to.be.equal(doc.contentEncoding);
    });
  });

  describe('#contentMediaType()', function() {
    it('should return a string', function() {
      const doc = { type: 'string', contentMediaType: 'text/html' };
      const d = new Schema(doc);
      expect(typeof d.contentMediaType()).to.be.equal('string');
      expect(d.contentMediaType()).to.be.equal(doc.contentMediaType);
    });
  });

  describe('#definitions()', function() {
    it('should return a map of Schema objects', function() {
      const doc = { definitions: { test: { type: 'string' } } };
      const d = new Schema(doc);
      expect(typeof d.definitions()).to.be.equal('object');
      Object.keys(d.definitions()).forEach(key => {
        const s = d.definitions()[key];
        expect(s.constructor.name).to.be.equal('Schema');
        expect(s.json()).to.be.equal(doc.definitions[key]);
      });
    });
  });

  describe('#title()', function() {
    it('should return a string', function() {
      const doc = { type: 'string', title: 'test' };
      const d = new Schema(doc);
      expect(typeof d.title()).to.be.equal('string');
      expect(d.title()).to.be.equal(doc.title);
    });
  });

  describe('#default()', function() {
    it('should return a value', function() {
      const doc = { type: 'string', default: 'test' };
      const d = new Schema(doc);
      expect(d.default()).to.be.equal('test');
    });
  });

  describe('#deprecated()', function() {
    it('should return a boolean', function() {
      const doc = { type: 'string', deprecated: true };
      const d = new Schema(doc);
      expect(typeof d.deprecated()).to.be.equal('boolean');
      expect(d.deprecated()).to.be.equal(doc.deprecated);
    });
  });

  describe('#discriminator()', function() {
    it('should return a string', function() {
      const doc = { type: 'string', discriminator: 'someType' };
      const d = new Schema(doc);
      expect(typeof d.discriminator()).to.be.equal('string');
      expect(d.discriminator()).to.be.equal(doc.discriminator);
    });
  });

  describe('#readOnly()', function() {
    it('should return a boolean', function() {
      const doc = { type: 'string', readOnly: true };
      const d = new Schema(doc);
      expect(typeof d.readOnly()).to.be.equal('boolean');
      expect(d.readOnly()).to.be.equal(doc.readOnly);
    });
  });

  describe('#writeOnly()', function() {
    it('should return a boolean', function() {
      const doc = { type: 'string', writeOnly: true };
      const d = new Schema(doc);
      expect(typeof d.writeOnly()).to.be.equal('boolean');
      expect(d.writeOnly()).to.be.equal(doc.writeOnly);
    });
  });

  describe('#examples()', function() {
    it('should return an array', function() {
      const doc = { type: 'string', examples: ['test'] };
      const d = new Schema(doc);
      expect(Array.isArray(d.examples())).to.be.equal(true);
      expect(d.examples()).to.be.equal(doc.examples);
    });
  });

  describe('#isBooleanSchema()', function() {
    it('should return a true when schema is true', function() {
      const d = new Schema(true);
      expect(d.isBooleanSchema()).to.be.equal(true);
    });

    it('_json property should equal to true when schema is true', function() {
      const d = new Schema(true);
      expect(d.json()).to.be.equal(true);
    });

    it('should return a true when schema is false', function() {
      const d = new Schema(false);
      expect(d.isBooleanSchema()).to.be.equal(true);
    });

    it('_json property should equal to false when schema is false', function() {
      const d = new Schema(false);
      expect(d.json()).to.be.equal(false);
    });
  });

  describe('#isCircular()', function() {
    it('should return a true when appropriate extension is injected', function() {
      const doc = { 'x-parser-circular': true };
      const d = new Schema(doc);
      expect(d.isCircular()).to.be.equal(true);
    });

    it('should return a true when schema has circular reference', function() {
      const doc = {
        properties: {
          nonCircular: {
            type: 'string',
          },
          circular: {},
        }
      };
      doc.properties.circular = doc;
      const d = new Schema(doc);
      expect(d.isCircular()).to.be.equal(false);
      expect(d.properties()['nonCircular'].isCircular()).to.be.equal(false);
      expect(d.properties()['circular'].isCircular()).to.be.equal(true);
    });
  });

  describe('#circularSchema()', function() {
    it('should return a circular schema', function() {
      const doc = {
        properties: {
          nonCircular: {
            type: 'string',
          },
          circular: {},
        }
      };
      doc.properties.circular = doc;
      const d = new Schema(doc);
      expect(d.isCircular()).to.be.equal(false);
      expect(d.properties()['nonCircular'].circularSchema()).to.be.equal(undefined);
      expect(d.properties()['circular'].circularSchema()).to.be.equal(d);
    });
  });

  describe('#circularProps()', function() {
    it('should return values from appropriate extenion', function() {
      const doc = {
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
      expect(d.circularProps()).to.deep.equal([
        'circular1',
        'circular2',
      ]);
    });

    it('should return empty array if circular properties do not exist', function() {
      const doc = {
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
      expect(d.circularProps()).to.deep.equal([]);
    });

    it('should return names of circular properties', function() {
      const doc = {
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
      expect(d.circularProps()).to.deep.equal([
        'circular1',
        'circular2',
      ]);
    });
  });

  describe('#hasCircularProps()', function() {
    it('should return true when appropriate extenion is injected', function() {
      const doc = {
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
      expect(d.hasCircularProps()).to.be.equal(true);
    });

    it('should return false when circular properties do not exist', function() {
      const doc = {
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
      expect(d.hasCircularProps()).to.be.equal(false);
    });

    it('should return true when circular properties exist', function() {
      const doc = {
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
      expect(d.hasCircularProps()).to.be.equal(true);
    });
  });

  describe('#mixins', function() {
    it('model should inherit from mixins', function() {
      assertMixinDescriptionInheritance(Schema);
      assertMixinExternalDocsInheritance(Schema);
      assertMixinSpecificationExtensionsInheritance(Schema);
    });
  });
});
