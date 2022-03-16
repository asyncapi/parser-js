import { BaseModel } from '../../../src/models/base';
import { Mixin, TagsMixin } from '../../../src/models/mixins';

class Model extends Mixin(BaseModel, TagsMixin) {};

const doc1 = { tags: [{ name: 'test1' }, { name: 'test2' }] };
const doc2 = { tags: [] };
const doc3 = {};
const d1 = new Model(doc1);
const d2 = new Model(doc2);
const d3 = new Model(doc3);

describe('Tags mixin', function() {
  describe('#hasTags()', function() {
    it('should return a boolean indicating if the object has tags', function() {
      expect(d1.hasTags()).toEqual(true);
      expect(d2.hasTags()).toEqual(false);
      expect(d3.hasTags()).toEqual(false);
    });

    it('should return a boolean indicating if the tags object has appropriate tag by name', function() {
      expect(d1.hasTags('test1')).toEqual(true);
      expect(d1.hasTags('test2')).toEqual(true);
      expect(d1.hasTags('test3')).toEqual(false);
      expect(d2.hasTags('test1')).toEqual(false);
      expect(d3.hasTags('test1')).toEqual(false);
    });
  });

  describe('#tags()', function() {
    it('should return an array of tag objects', function() {
      expect(Array.isArray(d1.tags())).toEqual(true);
      d1.tags().forEach((tag, i) => {
        expect(tag).toEqual(doc1.tags[i]);
      });
    });

    it('should return an empty array', function() {
      expect(d2.tags()).toEqual([]);  
      expect(d3.tags()).toEqual([]);  
    });

    it('should return a tag object', function() {
      expect(d1.tags('test1')).not.toEqual(undefined);
      expect(d1.tags('test1')).toEqual(doc1.tags[0]);
      expect(d1.tags('test2')).not.toEqual(undefined);
      expect(d1.tags('test2')).toEqual(doc1.tags[1]);
    });
    it('should return a undefined', function() {
      expect(d1.tags('test3')).toEqual(undefined);
      expect(d2.tags('test1')).toEqual(undefined);
      expect(d3.tags('test1')).toEqual(undefined);
    });
  });
});
