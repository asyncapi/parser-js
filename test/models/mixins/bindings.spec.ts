import { BaseModel } from '../../../src/models/base';
import { BindingsMixin, Mixin } from '../../../src/models/mixins';

class Model extends Mixin(BaseModel, BindingsMixin) {};

const doc1 = { bindings: { amqp: { test: 'test1' } } };
const doc2 = { bindings: {} };
const doc3 = {};
const d1 = new Model(doc1);
const d2 = new Model(doc2);
const d3 = new Model(doc3);

describe('Bindings mixin', function() {
  describe('.hasBindings()', function() {
    it('should return a boolean indicating if the object has bindings', function() {
      expect(d1.hasBindings()).toEqual(true);
      expect(d2.hasBindings()).toEqual(false);
      expect(d3.hasBindings()).toEqual(false);
    });

    it('should return a boolean indicating if the bindings object has appropriate binding by name', function() {
      expect(d1.hasBindings('amqp')).toEqual(true);
      expect(d1.hasBindings('http')).toEqual(false);
      expect(d2.hasBindings('amqp')).toEqual(false);
      expect(d3.hasBindings('amqp')).toEqual(false);
    });
  });

  describe('.bindings()', function() {
    it('should return a map of bindings', function() {
      expect(d1.bindings()).toEqual(doc1.bindings);
    });

    it('should return an empty object', function() {
      expect(d2.bindings()).toEqual({});
      expect(d3.bindings()).toEqual({});
    });

    it('should return a binding object', function() {
      expect(d1.bindings('amqp')).toEqual(doc1.bindings.amqp);
    });

    it('should return a undefined', function() {
      expect(d1.bindings('http')).toEqual(undefined);
      expect(d2.bindings('amqp')).toEqual(undefined);
      expect(d3.bindings('amqp')).toEqual(undefined);
    });
  });
});
