const { expect } = require('chai');
const js = { type: 'testing', description: 'testing', name: 'testing', in: 'testing', scheme: 'testing', bearerFormat: 'testing', openIdConnectUrl: 'testing', flows: { test: { testing: true } }, 'x-test': 'testing' };

const SecurityScheme = require('../../../lib/version2/models/security-scheme');

const { assertMixinDescriptionInheritance } = require('./mixins/description_test');
const { assertMixinSpecificationExtensionsInheritance } = require('./mixins/specification-extensions_test');

describe('SecurityScheme', function() {
  describe('#type()', function() {
    it('should return a string', function() {
      const d = new SecurityScheme(js);
      expect(d.type()).to.be.equal(js.type);
    });
  });
  
  describe('#name()', function() {
    it('should return a string', function() {
      const d = new SecurityScheme(js);
      expect(d.name()).to.be.equal(js.name);
    });
  });
  
  describe('#in()', function() {
    it('should return a string', function() {
      const d = new SecurityScheme(js);
      expect(d.in()).to.be.equal(js.in);
    });
  });
  
  describe('#scheme()', function() {
    it('should return a string', function() {
      const d = new SecurityScheme(js);
      expect(d.scheme()).to.be.equal(js.scheme);
    });
  });
  
  describe('#bearerFormat()', function() {
    it('should return a string', function() {
      const d = new SecurityScheme(js);
      expect(d.bearerFormat()).to.be.equal(js.bearerFormat);
    });
  });
  
  describe('#openIdConnectUrl()', function() {
    it('should return a string', function() {
      const d = new SecurityScheme(js);
      expect(d.openIdConnectUrl()).to.be.equal(js.openIdConnectUrl);
    });
  });
  
  describe('#flows()', function() {
    it('should return a map of OAuthFlow objects', function() {
      const d = new SecurityScheme(js);
      expect(typeof d.flows()).to.be.equal('object');
      expect(d.flows().test.constructor.name).to.equal('OAuthFlow');
      expect(d.flows().test.json()).to.equal(js.flows.test);
    });
  });

  describe('#mixins', function() {
    it('model should inherit from mixins', function() {
      assertMixinDescriptionInheritance(SecurityScheme);
      assertMixinSpecificationExtensionsInheritance(SecurityScheme);
    });
  });
});
