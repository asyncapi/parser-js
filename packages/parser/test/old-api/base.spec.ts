import { Base } from '../../src/old-api/base';

describe('Base', function() {
  class Model extends Base {}

  describe('json()', function() {
    it('should return the whole JSON object', function() {
      const doc = { test: 'testing' };
      const d = new Model(doc);
      expect(d.json()).toEqual(doc);
    });
    
    it('should return the value of a given key', function() {
      const doc = { test: 'testing' };
      const d = new Model(doc);
      expect(d.json('test')).toEqual(doc.test);
    });
    
    it('should return the value of a given key, even when this is falsy', function() {
      const doc = { 0: 'testing' };
      const d = new Model(doc);
      expect(d.json(0)).toEqual(doc[0]);
    });
  });
});