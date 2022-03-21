import { BaseModel } from '../../../../src/models/base';
import { Mixin } from '../../../../src/models/utils';
import { BindingsMixin } from '../../../../src/models/v2/mixins/bindings';

describe('Bindings mixin', function() {
  class Model extends Mixin(BaseModel, BindingsMixin) {};

  const doc1 = { bindings: { amqp: { test: 'test1' } } };
  const doc2 = { bindings: {} };
  const doc3 = {};
  const d1 = new Model(doc1);
  const d2 = new Model(doc2);
  const d3 = new Model(doc3);

  describe('.bindings()', function() {
    it('should return a collection of bindings', function() {
      expect(d1.bindings().length).toEqual(1);
    });

    it('should return an empty object', function() {
      expect(d2.bindings().length).toEqual(0);
      expect(d3.bindings().length).toEqual(0);
    });
  });
});