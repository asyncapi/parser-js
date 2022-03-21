import { BaseModel } from '../../../../src/models/base';
import { Mixin } from '../../../../src/models/utils';
import { TagsMixin } from '../../../../src/models/v2/mixins/tags';

describe('Tags mixin', function() {
  class Model extends Mixin(BaseModel, TagsMixin) {};

  const doc1 = { tags: [{ name: 'test1' }, { name: 'test2' }] };
  const doc2 = { tags: [] };
  const doc3 = {};
  const d1 = new Model(doc1);
  const d2 = new Model(doc2);
  const d3 = new Model(doc3);

  describe('#tags()', function() {
    it('should return an array of tag objects', function() {
      expect(d1.tags().length).toEqual(2);
    });

    it('should return an empty array', function() {
      expect(d2.tags().length).toEqual(0);
      expect(d3.tags().length).toEqual(0);
    });
  });
});