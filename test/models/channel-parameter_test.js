const { expect } = require('chai');
const js = { description: 'param1', location: '$message.headers#/x-param1', schema: { type: 'string' }, 'x-test': 'testing' };

const ChannelParameter = require('../../lib/models/channel-parameter');

const { assertMixinDescriptionInheritance } = require('../mixins/description_test');
const { assertMixinSpecificationExtensionsInheritance } = require('../mixins/specification-extensions_test');

describe('ChannelParameter', function() {
  describe('#location()', function() {
    it('should return a string', function() {
      const d = new ChannelParameter(js);
      expect(d.location()).to.be.equal(js.location);
    });
  });
   
  describe('#schema()', function() {
    it('should return a Schema object', function() {
      const d = new ChannelParameter(js);
      expect(d.schema().constructor.name).to.be.equal('Schema');
      expect(d.schema().json()).to.equal(js.schema);
    });
  });

  describe('#mixins', function() {
    it('model should inherit from mixins', function() {
      assertMixinDescriptionInheritance(ChannelParameter);
      assertMixinSpecificationExtensionsInheritance(ChannelParameter);
    });
  });
});
