const { expect } = require('chai');
const js = { location: "$message.header#/correlationId" };

const CorrelationId = require('../../lib/models/correlation-id');

const { assertMixinDescriptionInheritance } = require('../mixins/description_test');
const { assertMixinSpecificationExtensionsInheritance } = require('../mixins/specification-extensions_test');

describe('CorrelationId', function() {
  describe('#location()', function() {
    it('should return a string', function() {
      const c = new CorrelationId(js);
      expect(c.location()).to.be.equal(js.location);
    });
  });

  describe('#mixins', function() {
    it('model should inherit from mixins', function() {
      assertMixinDescriptionInheritance(CorrelationId)
      assertMixinSpecificationExtensionsInheritance(CorrelationId);
    });
  });
});
