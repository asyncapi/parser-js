const { expect } = require('chai');
const js = { url: 'test.com', protocol: 'amqp', protocolVersion: '0-9-1', description: 'test', variables: { test1: { enum: ['value1', 'value2'], default: 'value1', description: 'test1', examples: ['value2'] } }, security: [{ oauth2: ['user:read'] }], bindings: { amqp: 'test' }, 'x-test': 'testing', tags: [{ name: 'env:development' }] };

const Server = require('../../lib/models/server');

const { assertMixinDescriptionInheritance } = require('../mixins/description_test');
const { assertMixinBindingsInheritance } = require('../mixins/bindings_test');
const { assertMixinSpecificationExtensionsInheritance } = require('../mixins/specification-extensions_test');
const { assertMixinTagsInheritance } = require('../mixins/tags_test');

describe('Server', function() {
  describe('#url()', function() {
    it('should return a string', function() {
      const d = new Server(js);
      expect(d.url()).to.be.equal(js.url);
    });
  });
  
  describe('#protocol()', function() {
    it('should return a string', function() {
      const d = new Server(js);
      expect(d.protocol()).to.be.equal(js.protocol);
    });
  });
  
  describe('#protocolVersion()', function() {
    it('should return a string', function() {
      const d = new Server(js);
      expect(d.protocolVersion()).to.be.equal(js.protocolVersion);
    });
  });

  describe('#hasVariables()', function() {
    it('should return a boolean indicating if a server URL has variables', function() {
      const doc = { url: 'test1:{port}', variables: { port: { desc: 'test1' } } };
      const docNoServerVariables = { url: 'test' };
      const d = new Server(doc);
      const d2 = new Server(docNoServerVariables);
      expect(d.hasVariables()).to.equal(true);
      expect(d2.hasVariables()).to.equal(false);
    });
  });

  describe('#variables()', function() {
    it('should return a map of ServerVariable objects', function() {
      const d = new Server(js);
      expect(typeof d.variables()).to.be.equal('object');
      expect(d.variables().test1.constructor.name).to.equal('ServerVariable');
      expect(d.variables().test1.json()).to.equal(js.variables.test1);
    });
  });
  
  describe('#variable()', function() {
    it('should return a specific ServerVariable object', function() {
      const d = new Server(js);
      expect(d.variable('test1').constructor.name).to.equal('ServerVariable');
      expect(d.variable('test1').json()).to.equal(js.variables.test1);
    });
  });
  
  describe('#security()', function() {
    it('should return an array of security requirements objects', function() {
      const d = new Server(js);
      expect(Array.isArray(d.security())).to.equal(true);
      d.security().forEach((s, i) => {
        expect(s.constructor.name).to.equal('ServerSecurityRequirement');
        expect(s.json()).to.equal(js.security[i]);
      });
    });
  });

  describe('#mixins', function() {
    it('model should inherit from mixins', function() {
      assertMixinDescriptionInheritance(Server);
      assertMixinBindingsInheritance(Server);
      assertMixinSpecificationExtensionsInheritance(Server);
      assertMixinTagsInheritance(Server);
    });
  });
});
