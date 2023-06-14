import { CorrelationId } from '../../src/old-api/correlation-id';
import { assertDescriptionMixin, assertExtensionsMixin } from './mixins';

describe('CorrelationId', function() {
  const json = { location: '$message.header#/correlationId' };

  describe('location()', function() {
    it('should return a string', function() {
      const c = new CorrelationId(json);
      expect(c.location()).toEqual(json.location);
    });
  });

  assertDescriptionMixin(CorrelationId);
  assertExtensionsMixin(CorrelationId);
});