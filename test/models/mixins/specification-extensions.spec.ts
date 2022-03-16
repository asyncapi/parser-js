import { BaseModel } from '../../../src/models/base';
import { Mixin, SpecificationExtensionsMixin } from '../../../src/models/mixins';

class Model extends Mixin(BaseModel, SpecificationExtensionsMixin) {};

const doc1 = { 'x-test': 'testing', test: 'testing' };
const doc2 = { test: 'testing' };
const doc3 = {};
const d1 = new Model(doc1);
const d2 = new Model(doc2);
const d3 = new Model(doc3);

describe('SpecificationExtensions mixin', function() {
  describe('.hasExtensions()', function() {
    it('should return a boolean indicating if the object has extensions', function() {
      expect(d1.hasExtensions()).toEqual(true);
      expect(d2.hasExtensions()).toEqual(false);
      expect(d3.hasExtensions()).toEqual(false);
    });

    it('should return a boolean indicating if the object has appropriate extension by key', function() {
      expect(d1.hasExtensions('x-test')).toEqual(true);
      expect(d1.hasExtensions('x-test2')).toEqual(false);
      expect(d2.hasExtensions('x-test')).toEqual(false);
      expect(d3.hasExtensions('x-test')).toEqual(false);
    });

    it('should return a boolean indicating if the object has appropriate extension by key (without x- prefix)', function() {
      expect(d1.hasExtensions('test')).toEqual(true);
      expect(d1.hasExtensions('test2')).toEqual(false);
      expect(d2.hasExtensions('test')).toEqual(false);
      expect(d3.hasExtensions('test')).toEqual(false);
    });
  });

  describe('.extensions()', function() {
    it('should return a object with extensions', function() {
      expect(d1.extensions()).toEqual({ 'x-test': 'testing' });
    });

    it('should return a empty object', function() {
      expect(d2.extensions()).toEqual({});
      expect(d3.extensions()).toEqual({});
    });

    it('should return a value by key', function() {
      expect(d1.extensions('x-test')).toEqual('testing');
    });

    it('should return a value by key (without x- prefix)', function() {
      expect(d1.extensions('test')).toEqual('testing');
    });

    it('should return an undefined', function() {
      expect(d1.extensions('x-test2')).toEqual(undefined);
      expect(d2.extensions('x-test')).toEqual(undefined);
      expect(d3.extensions('x-test')).toEqual(undefined);
    });
  });
});
