import { AsyncAPIDocument } from '../../src/models/v2/asyncapi';
import { Info } from '../../src/models/v2/info';

describe('AsyncAPIDocument model', function() {
  describe('.version()', function() {
    it('should return the value', function() {
      const doc = { asyncapi: "3.0.0" };
      const d = new AsyncAPIDocument(doc);
      expect(d.version()).toEqual(doc.asyncapi);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = { };
      const d = new AsyncAPIDocument(doc);
      expect(d.version()).toBeUndefined();
    });
  });

  describe('.info()', function() {
    it('should return an Info object', function() {
      const doc = { info: { name: "LeChuck" } };
      const d = new AsyncAPIDocument(doc);
      expect(d.info() instanceof Info).toBeTruthy();
    });
  });
});
