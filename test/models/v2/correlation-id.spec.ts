import { CorrelationId } from '../../../src/models/v2/correlation-id';

import { 
  assertDescriptionMixinInheritance,
  assertExtensionsMixinInheritance,
} from './mixins/inheritance';

describe('CorrelationId model', function() {
  describe('.hasLocation()', function() {
    it('should return true when there is a value', function() {
      const doc = { location: "..." };
      const d = new CorrelationId(doc);
      expect(d.hasLocation()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = {};
      const d = new CorrelationId(doc);
      expect(d.hasLocation()).toEqual(false);
    });
  });

  describe('.location()', function() {
    it('should return the value', function() {
      const doc = { location: "..." };
      const d = new CorrelationId(doc);
      expect(d.location()).toEqual(doc.location);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = {};
      const d = new CorrelationId(doc);
      expect(d.location()).toBeUndefined();
    });
  });

  describe('mixins inheritance', function() {
    assertDescriptionMixinInheritance(CorrelationId);
    assertExtensionsMixinInheritance(CorrelationId);
  });
});
