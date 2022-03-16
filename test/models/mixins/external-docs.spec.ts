import { BaseModel } from '../../../src/models/base';
import { ExternalDocsMixin, Mixin } from '../../../src/models/mixins';

class Model extends Mixin(BaseModel, ExternalDocsMixin) {};

const doc1 = { externalDocs: { url: 'test.com' } };
const doc2 = { externalDocs: {} };
const doc3 = {};
const d1 = new Model(doc1);
const d2 = new Model(doc2);
const d3 = new Model(doc3);

describe('ExternalDocs mixin', function() {
  describe('.hasExternalDocs()', function() {
    it('should return a boolean indicating if the object has externalDocs', function() {
      expect(d1.hasExternalDocs()).toEqual(true);  
      expect(d2.hasExternalDocs()).toEqual(false);  
      expect(d3.hasExternalDocs()).toEqual(false);  
    });
  });

  // TODO: implement it when the ExternalDocs class will be implemented 
  describe('.externalDocs()', function() {
    // it('should return a externalDocs object', function() {
    //   expect(d1.externalDocs() instanceof ExternalDocs).toEqual(true);
    //   expect(d1.externalDocs().json()).toEqual(doc1.externalDocs);

    //   expect(d2.externalDocs() instanceof ExternalDocs).toEqual(true);
    //   expect(d2.externalDocs().json()).toEqual(doc2.externalDocs);
    // });

    it('should return a undefined', function() {
      expect(d3.externalDocs()).toEqual(undefined);  
    });
  });
});
