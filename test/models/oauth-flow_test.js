const { expect } = require('chai');
const js = { authorizationUrl: 'testing', refreshUrl: 'testing', tokenUrl: 'testing', scopes: { test: 'testing' }, 'x-test': 'testing' };

const OAuthFlow = require('../../lib/models/oauth-flow');

const { assertMixinSpecificationExtensionsInheritance } = require('../mixins/specification-extensions_test');

describe('OAuthFlow', function() {
  describe('#authorizationUrl()', function() {
    it('should return a string', function() {
      const d = new OAuthFlow(js);
      expect(d.authorizationUrl()).to.be.equal(js.authorizationUrl);
    });
  });
  
  describe('#tokenUrl()', function() {
    it('should return a string', function() {
      const d = new OAuthFlow(js);
      expect(d.tokenUrl()).to.be.equal(js.tokenUrl);
    });
  });
  
  describe('#refreshUrl()', function() {
    it('should return a string', function() {
      const d = new OAuthFlow(js);
      expect(d.refreshUrl()).to.be.equal(js.refreshUrl);
    });
  });
  
  describe('#scopes()', function() {
    it('should return a Map of strings', function() {
      const d = new OAuthFlow(js);
      expect(typeof d.scopes()).to.be.equal('object');
      expect(d.scopes()).to.equal(js.scopes);
    });
  });

  describe('#mixins', function() {
    it('model should inherit from mixins', function() {
      assertMixinSpecificationExtensionsInheritance(OAuthFlow);
    });
  });
});
