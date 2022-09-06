import { BaseModel } from '../../src/models/base';
import { Collection } from '../../src/models/collection';

describe('Collection model', function() {
  class ItemModel extends BaseModel {
    name(): string | undefined {
      return this._json.name;
    }
  };

  class Model extends Collection<ItemModel> {
    override get(name: string): ItemModel | undefined {
      return this.collections.find(item => item.name() === name);
    };
  
    override has(name: string): boolean {
      return this.collections.some(item => item.name() === name);
    };
  };

  describe('.isEmpty()', function() {
    it('should return true if collection is empty', function() {
      const d = new Model([]);
      expect(d.isEmpty()).toEqual(true);
    });

    it('should return false if collection is not empty', function() {
      const doc = { name: 'name' };
      const item = new ItemModel(doc);
      const d = new Model([item]);
      expect(d.isEmpty()).toEqual(false);
    });
  });

  describe('.all()', function() {
    it('should return the whole collections', function() {
      const doc1 = { name: 'name1' };
      const doc2 = { name: 'name1' };
      const item1 = new ItemModel(doc1);
      const item2 = new ItemModel(doc2);
      const d = new Model([item1, item2]);
      expect(d.all().length).toEqual(2);
      expect(d.all()).toEqual([item1, item2]);
    });
  });

  describe('.has()', function() {
    it('should return true if collection has given item', function() {
      const doc = { name: 'name' };
      const item = new ItemModel(doc);
      const d = new Model([item]);
      expect(d.has('name')).toEqual(true);
    });

    it('should return false if collection has not given item', function() {
      const doc = { name: 'name' };
      const item = new ItemModel(doc);
      const d = new Model([item]);
      expect(d.has('name1')).toEqual(false);
    });
  });

  describe('.get()', function() {
    it('should return instance of ItemModel if collection has given item', function() {
      const doc = { name: 'name' };
      const item = new ItemModel(doc);
      const d = new Model([item]);
      expect(d.get('name')).toBeInstanceOf(ItemModel);
      expect(d.get('name')).toEqual(item);
    });

    it('should return undefined if collection has not given item', function() {
      const doc = { name: 'name' };
      const item = new ItemModel(doc);
      const d = new Model([item]);
      expect(d.get('name1')).toEqual(undefined);
    });
  });

  describe('.filterBy()', function() {
    it('should return array of ItemModel if filter function matches', function() {
      const doc = { name: 'name' };
      const item = new ItemModel(doc);
      const d = new Model([item]);

      const filter = function (_: ItemModel): boolean {
        return true;
      }
      expect(d.filterBy(filter)).toEqual([item]);
    });

    it('should return empty array of ItemModel if filter function does not match', function() {
      const doc = { name: 'name' };
      const item = new ItemModel(doc);
      const d = new Model([item]);

      const filter = function (_: ItemModel): boolean {
        return false;
      }
      expect(d.filterBy(filter)).toEqual([]);
    });
  });
});
