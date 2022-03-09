import { newAsyncAPIDocument, V2AsyncAPIDocument, V2Info, V3AsyncAPIDocument } from '../../../src/models';

describe('AsyncAPIDocument model', function() {
  describe('.version()', function() {
    it('should return the value', function() {
      const doc = { asyncapi: "3.0.0" };
      const d = new V2AsyncAPIDocument(doc);
      expect(d.version()).toEqual(doc.asyncapi);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = { };
      const d = new V2AsyncAPIDocument(doc);
      expect(d.version()).toBeUndefined();
    });
  });

  describe('.info()', function() {
    it('should return an Info object', function() {
      const doc = { info: { name: "LeChuck" } };
      const d = new V2AsyncAPIDocument(doc);
      expect(d.info() instanceof V2Info).toBeTruthy();
    });
  });
});

describe('AsyncAPIDocument factory', function() {
  it('should create a valid document from v2.0.0', function() {
    const doc = { asyncapi: "2.0.0" };
    const d = newAsyncAPIDocument(doc)
    expect(d.version()).toEqual(doc.asyncapi);
    expect(d).toBeInstanceOf(V2AsyncAPIDocument);
  });
  it('should create a valid document from v3.0.0', function() {
    const doc = { asyncapi: "3.0.0" };
    const d = newAsyncAPIDocument(doc)
    expect(d.version()).toEqual(doc.asyncapi);
    expect(d).toBeInstanceOf(V3AsyncAPIDocument);
  });
  it('should fail trying to create a document from a non supported spec version', function() {
    const doc = { asyncapi: "99.99.99" };
    expect(() => newAsyncAPIDocument(doc)).toThrow("Unsupported version: 99.99.99");
  });
});
