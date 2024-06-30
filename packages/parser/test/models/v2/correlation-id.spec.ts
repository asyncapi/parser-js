import { CorrelationId } from '../../../src/models/v2/correlation-id';

import { serializeInput, assertDescription, assertExtensions } from './utils';

import type { v2 } from '../../../src/spec-types';

describe('CorrelationId model', function() {
  describe('.location()', function() {
    it('should return the value', function() {
      const doc = serializeInput<v2.CorrelationIDObject>({ location: '...' });
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
