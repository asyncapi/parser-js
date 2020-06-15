/* eslint-disable sonarjs/no-duplicate-string */
const { expect } = require('chai');
const Schema = require('../../lib/models/schema');

describe('Schema', () => {
  describe('#ext()', () => {
    it('should support extensions', () => {
      const doc = { 'x-test': 'testing' };
      const d = new Schema(doc);
      expect(d.ext('x-test')).to.be.equal(doc['x-test']);      
      expect(d.extension('x-test')).to.be.equal(doc['x-test']);
      expect(d.extensions()).to.be.deep.equal({'x-test': 'testing'});
    });
  });

  describe('#multipleOf()', () => {
    it('should return a number', () => {
      const doc = { type: 'number', multipleOf: 1.0 };
      const d = new Schema(doc);
      expect(typeof d.multipleOf()).to.be.equal('number');
      expect(d.multipleOf()).to.be.equal(doc.multipleOf);
    });
  });
  
  describe('#uid()', () => {
    it('should return a string', () => {
      const doc = { $id: 'test' };
      const d = new Schema(doc);
      expect(typeof d.uid()).to.be.equal('string');
      expect(d.uid()).to.be.equal(doc.$id);
    });
    
    it('should return a string with the value of x-parser-schema-id when $id is not available', () => {
      const doc = { 'x-parser-schema-id': 'test' };
      const d = new Schema(doc);
      expect(typeof d.uid()).to.be.equal('string');
      expect(d.uid()).to.be.equal(doc['x-parser-schema-id']);
    });
  });
  
  describe('#$id()', () => {
    it('should return a string', () => {
      const doc = { $id: 'test' };
      const d = new Schema(doc);
      expect(typeof d.$id()).to.be.equal('string');
      expect(d.$id()).to.be.equal(doc.$id);
    });
  });
  
  describe('#maximum()', () => {
    it('should return a number', () => {
      const doc = { type: 'number', maximum: 10 };
      const d = new Schema(doc);
      expect(typeof d.maximum()).to.be.equal('number');
      expect(d.maximum()).to.be.equal(doc.maximum);
    });
  });
  
  describe('#exclusiveMaximum()', () => {
    it('should return a number', () => {
      const doc = { type: 'number', exclusiveMaximum: 10 };
      const d = new Schema(doc);
      expect(typeof d.exclusiveMaximum()).to.be.equal('number');
      expect(d.exclusiveMaximum()).to.be.equal(doc.exclusiveMaximum);
    });
  });
  
  describe('#minimum()', () => {
    it('should return a number', () => {
      const doc = { type: 'number', minimum: 10 };
      const d = new Schema(doc);
      expect(typeof d.minimum()).to.be.equal('number');
      expect(d.minimum()).to.be.equal(doc.minimum);
    });
  });
  
  describe('#exclusiveMinimum()', () => {
    it('should return a number', () => {
      const doc = { type: 'number', exclusiveMinimum: 10 };
      const d = new Schema(doc);
      expect(typeof d.exclusiveMinimum()).to.be.equal('number');
      expect(d.exclusiveMinimum()).to.be.equal(doc.exclusiveMinimum);
    });
  });
  
  describe('#maxLength()', () => {
    it('should return a number', () => {
      const doc = { type: 'string', maxLength: 10 };
      const d = new Schema(doc);
      expect(typeof d.maxLength()).to.be.equal('number');
      expect(d.maxLength()).to.be.equal(doc.maxLength);
    });
  });
  
  describe('#minLength()', () => {
    it('should return a number', () => {
      const doc = { type: 'string', minLength: 10 };
      const d = new Schema(doc);
      expect(typeof d.minLength()).to.be.equal('number');
      expect(d.minLength()).to.be.equal(doc.minLength);
    });
  });
  
  describe('#pattern()', () => {
    it('should return a string', () => {
      const doc = { type: 'string', pattern: '^test' };
      const d = new Schema(doc);
      expect(typeof d.pattern()).to.be.equal('string');
      expect(d.pattern()).to.be.equal(doc.pattern);
    });
  });
  
  describe('#maxItems()', () => {
    it('should return a number', () => {
      const doc = { type: 'array', maxItems: 10 };
      const d = new Schema(doc);
      expect(typeof d.maxItems()).to.be.equal('number');
      expect(d.maxItems()).to.be.equal(doc.maxItems);
    });
  });
  
  describe('#minItems()', () => {
    it('should return a number', () => {
      const doc = { type: 'array', minItems: 10 };
      const d = new Schema(doc);
      expect(typeof d.minItems()).to.be.equal('number');
      expect(d.minItems()).to.be.equal(doc.minItems);
    });
  });
  
  describe('#uniqueItems()', () => {
    it('should return a boolean', () => {
      const doc = { type: 'array', uniqueItems: true };
      const d = new Schema(doc);
      expect(typeof d.uniqueItems()).to.be.equal('boolean');
      expect(d.uniqueItems()).to.be.equal(doc.uniqueItems);
    });
  });

  describe('#maxProperties()', () => {
    it('should return a number', () => {
      const doc = { type: 'object', maxProperties: 10 };
      const d = new Schema(doc);
      expect(typeof d.maxProperties()).to.be.equal('number');
      expect(d.maxProperties()).to.be.equal(doc.maxProperties);
    });
  });

  describe('#minProperties()', () => {
    it('should return a number', () => {
      const doc = { type: 'object', minProperties: 10 };
      const d = new Schema(doc);
      expect(typeof d.minProperties()).to.be.equal('number');
      expect(d.minProperties()).to.be.equal(doc.minProperties);
    });
  });

  describe('#required()', () => {
    it('should return a number', () => {
      const doc = { type: 'object', required: ['test'] };
      const d = new Schema(doc);
      expect(Array.isArray(d.required())).to.be.equal(true);
      expect(d.required()).to.be.equal(doc.required);
    });
  });

  describe('#enum()', () => {
    it('should return a number', () => {
      const doc = { type: 'string', enum: ['test'] };
      const d = new Schema(doc);
      expect(Array.isArray(d.enum())).to.be.equal(true);
      expect(d.enum()).to.be.equal(doc.enum);
    });
  });

  describe('#type()', () => {
    it('should return a string', () => {
      const doc = { type: 'string' };
      const d = new Schema(doc);
      expect(typeof d.type()).to.be.equal('string');
      expect(d.type()).to.be.equal(doc.type);
    });
    
    it('should return an array of strings', () => {
      const doc = { type: ['number', 'string'] };
      const d = new Schema(doc);
      expect(Array.isArray(d.type())).to.be.equal(true);
      expect(d.type()).to.be.equal(doc.type);
    });
  });

  describe('#allOf()', () => {
    it('should return an array of Schema objects', () => {
      const doc = { allOf: [{ type: 'string' }, { type: 'number' }] };
      const d = new Schema(doc);
      expect(Array.isArray(d.allOf())).to.be.equal(true);
      d.allOf().forEach((s, i) => {
        expect(s.constructor.name).to.be.equal('Schema');
        expect(s.json()).to.be.equal(doc.allOf[i]);
      });
    });
  });

  describe('#oneOf()', () => {
    it('should return an array of Schema objects', () => {
      const doc = { oneOf: [{ type: 'string' }, { type: 'number' }] };
      const d = new Schema(doc);
      expect(Array.isArray(d.oneOf())).to.be.equal(true);
      d.oneOf().forEach((s, i) => {
        expect(s.constructor.name).to.be.equal('Schema');
        expect(s.json()).to.be.equal(doc.oneOf[i]);
      });
    });
  });

  describe('#anyOf()', () => {
    it('should return an array of Schema objects', () => {
      const doc = { anyOf: [{ type: 'string' }, { type: 'number' }] };
      const d = new Schema(doc);
      expect(Array.isArray(d.anyOf())).to.be.equal(true);
      d.anyOf().forEach((s, i) => {
        expect(s.constructor.name).to.be.equal('Schema');
        expect(s.json()).to.be.equal(doc.anyOf[i]);
      });
    });
  });

  describe('#not()', () => {
    it('should return a Schema object', () => {
      const doc = { not: { type: 'string' } };
      const d = new Schema(doc);
      expect(d.not().constructor.name).to.be.equal('Schema');
      expect(d.not().json()).to.be.equal(doc.not);
    });
  });

  describe('#items()', () => {
    it('should return a Schema object', () => {
      const doc = { items: { type: 'string' } };
      const d = new Schema(doc);
      expect(d.items().constructor.name).to.be.equal('Schema');
      expect(d.items().json()).to.be.equal(doc.items);
    });
    
    it('should return an array of Schema objects', () => {
      const doc = { items: [{ type: 'string' }, { type: 'number' }] };
      const d = new Schema(doc);
      expect(Array.isArray(d.items())).to.be.equal(true);
      d.items().forEach((s, i) => {
        expect(s.constructor.name).to.be.equal('Schema');
        expect(s.json()).to.be.equal(doc.items[i]);
      });
    });
  });

  describe('#properties()', () => {
    it('should return a map of Schema objects', () => {
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

  describe('#additionalProperties()', () => {
    it('should return a Schema object', () => {
      const doc = { additionalProperties: { type: 'string' } };
      const d = new Schema(doc);
      expect(d.additionalProperties().constructor.name).to.be.equal('Schema');
      expect(d.additionalProperties().json()).to.be.equal(doc.additionalProperties);
    });
    
    it('should return a boolean', () => {
      const doc = { additionalProperties: true };
      const d = new Schema(doc);
      expect(typeof d.additionalProperties()).to.be.equal('boolean');
      expect(d.additionalProperties()).to.be.equal(doc.additionalProperties);
    });
    
    it('should return undefined when not defined', () => {
      const doc = {};
      const d = new Schema(doc);
      expect(d.additionalProperties()).to.be.equal(undefined);
    });
    
    it('should return undefined when null', () => {
      const doc = { additionalProperties: null };
      const d = new Schema(doc);
      expect(d.additionalProperties()).to.be.equal(undefined);
    });
  });

  describe('#additionalItems()', () => {
    it('should return a Schema object', () => {
      const doc = { additionalItems: { type: 'string' } };
      const d = new Schema(doc);
      expect(d.additionalItems().constructor.name).to.be.equal('Schema');
      expect(d.additionalItems().json()).to.be.equal(doc.additionalItems);
    });
    
    it('should return undefined when not defined', () => {
      const doc = {};
      const d = new Schema(doc);
      expect(d.additionalItems()).to.be.equal(undefined);
    });
    
    it('should return undefined when null', () => {
      const doc = { additionalItems: null };
      const d = new Schema(doc);
      expect(d.additionalItems()).to.be.equal(undefined);
    });
  });

  describe('#patternProperties()', () => {
    it('should return a map of Schema objects', () => {
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

  describe('#const()', () => {
    it('should return a number', () => {
      const doc = { type: 'object', const: 10 };
      const d = new Schema(doc);
      expect(typeof d.const()).to.be.equal('number');
      expect(d.const()).to.be.equal(doc.const);
    });
    
    it('should return null', () => {
      const doc = { type: 'object', const: null };
      const d = new Schema(doc);
      expect(d.const()).to.be.equal(doc.const);
    });
    
    it('should return an object', () => {
      const doc = { type: 'object', const: { test: true } };
      const d = new Schema(doc);
      expect(typeof d.const()).to.be.equal('object');
      expect(d.const()).to.be.equal(doc.const);
    });
    
    it('should return an array', () => {
      const doc = { type: 'object', const: ['test'] };
      const d = new Schema(doc);
      expect(Array.isArray(d.const())).to.be.equal(true);
      expect(d.const()).to.be.equal(doc.const);
    });
  });

  describe('#contains()', () => {
    it('should return a Schema object', () => {
      const doc = { contains: { type: 'string' } };
      const d = new Schema(doc);
      expect(d.contains().constructor.name).to.be.equal('Schema');
      expect(d.contains().json()).to.be.equal(doc.contains);
    });
  });

  describe('#dependencies()', () => {
    it('should return a map with an array value', () => {
      const doc = { properties: { test: { type: 'string' }, test2: { type: 'number' } }, dependencies: { test: ['test2'] } };
      const d = new Schema(doc);
      expect(typeof d.dependencies()).to.be.equal('object');
      Object.keys(d.dependencies()).forEach(key => {
        const v = d.dependencies()[key];
        expect(Array.isArray(v)).to.be.equal(true);
        expect(v).to.be.equal(doc.dependencies[key]);
      });
    });
    
    it('should return a map with a Schema value', () => {
      const doc = { properties: { test: { type: 'string' } }, dependencies: { test: { properties: { test2: { type: 'number' } } } } };
      const d = new Schema(doc);
      expect(typeof d.dependencies()).to.be.equal('object');
      Object.keys(d.dependencies()).forEach(key => {
        const s = d.dependencies()[key];
        expect(s.constructor.name).to.be.equal('Schema');
        expect(s.json()).to.be.equal(doc.dependencies[key]);
      });
    });
  });

  describe('#propertyNames()', () => {
    it('should return a Schema object', () => {
      const doc = { propertyNames: { type: 'string' } };
      const d = new Schema(doc);
      expect(d.propertyNames().constructor.name).to.be.equal('Schema');
      expect(d.propertyNames().json()).to.be.equal(doc.propertyNames);
    });
  });

  describe('#if()', () => {
    it('should return a Schema object', () => {
      const doc = { if: { type: 'string' } };
      const d = new Schema(doc);
      expect(d.if().constructor.name).to.be.equal('Schema');
      expect(d.if().json()).to.be.equal(doc.if);
    });
  });

  describe('#then()', () => {
    it('should return a Schema object', () => {
      const doc = { then: { type: 'string' } };
      const d = new Schema(doc);
      expect(d.then().constructor.name).to.be.equal('Schema');
      expect(d.then().json()).to.be.equal(doc.then);
    });
  });
  
  describe('#else()', () => {
    it('should return a Schema object', () => {
      const doc = { else: { type: 'string' } };
      const d = new Schema(doc);
      expect(d.else().constructor.name).to.be.equal('Schema');
      expect(d.else().json()).to.be.equal(doc.else);
    });
  });

  describe('#format()', () => {
    it('should return a string', () => {
      const doc = { type: 'string', format: 'email' };
      const d = new Schema(doc);
      expect(typeof d.format()).to.be.equal('string');
      expect(d.format()).to.be.equal(doc.format);
    });
  });

  describe('#contentEncoding()', () => {
    it('should return a string', () => {
      const doc = { type: 'string', contentEncoding: 'base64' };
      const d = new Schema(doc);
      expect(typeof d.contentEncoding()).to.be.equal('string');
      expect(d.contentEncoding()).to.be.equal(doc.contentEncoding);
    });
  });

  describe('#contentMediaType()', () => {
    it('should return a string', () => {
      const doc = { type: 'string', contentMediaType: 'text/html' };
      const d = new Schema(doc);
      expect(typeof d.contentMediaType()).to.be.equal('string');
      expect(d.contentMediaType()).to.be.equal(doc.contentMediaType);
    });
  });

  describe('#definitions()', () => {
    it('should return a map of Schema objects', () => {
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

  describe('#title()', () => {
    it('should return a string', () => {
      const doc = { type: 'string', title: 'test' };
      const d = new Schema(doc);
      expect(typeof d.title()).to.be.equal('string');
      expect(d.title()).to.be.equal(doc.title);
    });
  });

  describe('#description()', () => {
    it('should return a string', () => {
      const doc = { type: 'string', description: 'test' };
      const d = new Schema(doc);
      expect(typeof d.description()).to.be.equal('string');
      expect(d.description()).to.be.equal(doc.description);
    });
  });

  describe('#deprecated()', () => {
    it('should return a boolean', () => {
      const doc = { type: 'string', deprecated: true };
      const d = new Schema(doc);
      expect(typeof d.deprecated()).to.be.equal('boolean');
      expect(d.deprecated()).to.be.equal(doc.deprecated);
    });
  });

  describe('#readOnly()', () => {
    it('should return a boolean', () => {
      const doc = { type: 'string', readOnly: true };
      const d = new Schema(doc);
      expect(typeof d.readOnly()).to.be.equal('boolean');
      expect(d.readOnly()).to.be.equal(doc.readOnly);
    });
  });

  describe('#writeOnly()', () => {
    it('should return a boolean', () => {
      const doc = { type: 'string', writeOnly: true };
      const d = new Schema(doc);
      expect(typeof d.writeOnly()).to.be.equal('boolean');
      expect(d.writeOnly()).to.be.equal(doc.writeOnly);
    });
  });

  describe('#examples()', () => {
    it('should return an array', () => {
      const doc = { type: 'string', examples: ['test'] };
      const d = new Schema(doc);
      expect(Array.isArray(d.examples())).to.be.equal(true);
      expect(d.examples()).to.be.equal(doc.examples);
    });
  });
});
