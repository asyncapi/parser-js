import { BaseModel } from '../../../src/models/base';
import { DescriptionMixin, Mixin } from '../../../src/models/mixins';

class Model extends Mixin(BaseModel, DescriptionMixin) {};

const doc1 = { description: 'Testing' };
const doc2 = { description: '' };
const doc3 = {};
const d1 = new Model(doc1);
const d2 = new Model(doc2);
const d3 = new Model(doc3);

describe('Description mixin', function() {
  describe('.hasDescription()', function() {
    it('should return a boolean indicating if the object has description', function() {
      expect(d1.hasDescription()).toEqual(true);  
      expect(d2.hasDescription()).toEqual(false);  
      expect(d3.hasDescription()).toEqual(false);  
    });
  });

  describe('.description()', function() {
    it('should return a value', function() {
      expect(d1.description()).toEqual(doc1.description);  
      expect(d2.description()).toEqual(''); 
    });

    it('should return an undefined', function() {
      expect(d3.description()).toEqual(undefined);  
    });
  });
});
