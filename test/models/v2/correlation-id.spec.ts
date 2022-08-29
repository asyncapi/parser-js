import { CorrelationId } from '../../../src/models/v2/correlation-id';

import { serializeInput, assertDescription, assertExtensions } from './utils';

import type { v2 } from '../../../src/interfaces';

describe('CorrelationId model', function() {
  describe('.hasLocation()', function() {
    it('should return true when there is a value', function() {
      const doc = serializeInput<v2.CorrelationIDObject>({ location: "..." });
      const d = new CorrelationId(doc);
      expect(d.hasLocation()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = serializeInput<v2.CorrelationIDObject>({});
      const d = new CorrelationId(doc);
      expect(d.hasLocation()).toEqual(false);
    });
  });

  describe('.location()', function() {
    it('should return the value', function() {
      const doc = serializeInput<v2.CorrelationIDObject>({ location: "..." });
      const d = new CorrelationId(doc);
      expect(d.location()).toEqual(doc.location);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = serializeInput<v2.CorrelationIDObject>({});
      const d = new CorrelationId(doc);
      expect(d.location()).toBeUndefined();
    });
  });

  describe('mixins', function() {
    assertDescription(CorrelationId);
    assertExtensions(CorrelationId);
  });
});
