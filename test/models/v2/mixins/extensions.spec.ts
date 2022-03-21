import { BaseModel } from '../../../../src/models/base';
import { Mixin } from '../../../../src/models/utils';
import { ExtensionsMixin } from '../../../../src/models/v2/mixins/extensions';

describe('Extensions mixin', function() {
  class Model extends Mixin(BaseModel, ExtensionsMixin) {};

  const doc1 = { 'x-test': 'testing', test: 'testing' };
  const doc2 = { test: 'testing' };
  const doc3 = {};
  const d1 = new Model(doc1);
  const d2 = new Model(doc2);
  const d3 = new Model(doc3);

  describe('.extensions()', function() {
    it('should return a collection with extensions', function() {
      expect(d1.extensions().length).toEqual(1);
    });

    it('should return a empty object', function() {
      expect(d2.extensions().length).toEqual(0);
      expect(d3.extensions().length).toEqual(0);
    });
  });
});