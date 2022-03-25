import { 
  newAsyncAPIDocument, 
  AsyncAPIDocumentV2, 
  InfoV2, 
  ServersV2, 
  AsyncAPIDocumentV3
} from '../../../src/models';
import { createDetailedAsyncAPI } from '../../../src/utils';

import { 
  assertExtensionsMixinInheritance,
} from './mixins/inheritance';

describe('AsyncAPIDocument model', function() {
  describe('.version()', function() {
    it('should return the value', function() {
      const doc = { asyncapi: "3.0.0" };
      const d = new AsyncAPIDocumentV2(doc);
      expect(d.version()).toEqual(doc.asyncapi);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = { };
      const d = new AsyncAPIDocumentV2(doc);
      expect(d.version()).toBeUndefined();
    });
  });

  describe('.info()', function() {
    it('should return an Info object', function() {
      const doc = { info: { name: "LeChuck" } };
      const d = new AsyncAPIDocumentV2(doc);
      expect(d.info()).toBeInstanceOf(InfoV2);
    });
  });

  describe('.servers()', function(){
    it('should return an servers object', function(){
      const doc = { servers: { development: {} } };
      const d = new AsyncAPIDocumentV2(doc);
      expect(d.servers()).toBeInstanceOf(ServersV2);
    })
  })

  describe('mixins inheritance', function() {
    assertExtensionsMixinInheritance(AsyncAPIDocumentV2);
  });
});

describe('AsyncAPIDocument factory', function() {
  it('should create a valid document from v2.0.0', function() {
    const doc = { asyncapi: "2.0.0" };
    const detailed = createDetailedAsyncAPI(doc, doc);
    const d = newAsyncAPIDocument(detailed)
    expect(d.version()).toEqual(doc.asyncapi);
    expect(d).toBeInstanceOf(AsyncAPIDocumentV2);
  });

  it('should create a valid document from v3.0.0', function() {
    const doc = { asyncapi: "3.0.0" };
    const detailed = createDetailedAsyncAPI(doc, doc);
    const d = newAsyncAPIDocument(detailed)
    expect(d.version()).toEqual(doc.asyncapi);
    expect(d).toBeInstanceOf(AsyncAPIDocumentV3);
  });

  it('should fail trying to create a document from a non supported spec version', function() {
    const doc = { asyncapi: "99.99.99" };
    const detailed = createDetailedAsyncAPI(doc, doc);
    expect(() => newAsyncAPIDocument(detailed)).toThrow("Unsupported AsyncAPI version: 99.99.99");
  });
});
