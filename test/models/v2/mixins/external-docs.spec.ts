import { BaseModel } from '../../../../src/models/base';
import { Mixin } from '../../../../src/models/utils';
import { ExternalDocumentationV2 } from '../../../../src/models/v2';
import { ExternalDocumentationMixin } from '../../../../src/models/v2/mixins/external-docs';

describe('ExternalDocs mixin', function() {
  class Model extends Mixin(BaseModel, ExternalDocumentationMixin) {};

  const doc1 = { externalDocs: { url: 'test.com' } };
  const doc2 = { externalDocs: {} };
  const doc3 = {};
  const d1 = new Model(doc1);
  const d2 = new Model(doc2);
  const d3 = new Model(doc3);

  describe('.hasExternalDocs()', function() {
    it('should return a boolean indicating if the object has externalDocs', function() {
      expect(d1.hasExternalDocs()).toEqual(true);  
      expect(d2.hasExternalDocs()).toEqual(false);  
      expect(d3.hasExternalDocs()).toEqual(false);  
    });
  });

  // TODO: implement it when the ExternalDocs class will be implemented 
  describe('.externalDocs()', function() {
    it('should return a externalDocs object', function() {
      expect(d1.externalDocs()).toBeInstanceOf(ExternalDocumentationV2);
      expect(d1.externalDocs()!.json()).toEqual(doc1.externalDocs);
    });

    it('should return a undefined', function() {
      expect(d2.externalDocs()).toEqual(undefined);
      expect(d3.externalDocs()).toEqual(undefined);  
    });
  });
});