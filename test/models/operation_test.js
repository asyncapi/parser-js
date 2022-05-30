const { expect } = require('chai');
const js = { summary: 't', description: 'test', traits: [{bindings: {kafka: {clientId: 'my-app-id'}}}], operationId: 'test', tags: [{name: 'tag1'}], externalDocs: { url: 'somewhere' }, bindings: { amqp: { test: true } }, message: { test: true }, 'x-test': 'testing', security: [{ oauth2: ['user:read'] }]};

const Operation = require('../../lib/models/operation');

const { assertMixinDescriptionInheritance } = require('../mixins/description_test');
const { assertMixinExternalDocsInheritance } = require('../mixins/external-docs_test');
const { assertMixinTagsInheritance } = require('../mixins/tags_test');
const { assertMixinBindingsInheritance } = require('../mixins/bindings_test');
const { assertMixinSpecificationExtensionsInheritance } = require('../mixins/specification-extensions_test');

describe('Operation', function() {   
  describe('#summary()', function() {
    it('should return a string', function() {
      const d = new Operation(js);
      expect(d.summary()).to.be.equal(js.summary);
    });
  });

  describe('#traits()', function() {
    it('should return a list of traits', function() {
      const d = new Operation(js);
      expect(d.traits()[0].json()).to.equal(js.traits[0]);
    });

    it('should return a list of traits from x-parser-original-traits', function() {
      const { traits, ...newJs } = js;
      newJs['x-parser-original-traits'] = traits;
      const d = new Operation(newJs);
      expect(d.traits()[0].json()).to.be.equal(newJs['x-parser-original-traits'][0]);
    });
  });

  describe('#hasTraits()', function() {
    it('should return true', function() {
      const d = new Operation(js);
      expect(d.hasTraits()).to.equal(true);
    });

    it('should return true if in x-parser-original-traits', function() {
      const { traits, ...newJs } = js;
      newJs['x-parser-original-traits'] = traits;
      const d = new Operation(newJs);
      expect(d.hasTraits()).to.equal(true);
    });

    it('should return false', function() {
      // eslint-disable-next-line no-unused-vars
      const { traits, ...newJs } = js;
      const d = new Operation(newJs);
      expect(d.hasTraits()).to.equal(false);
    });
  });
  
  describe('#id()', function() {
    it('should return a string', function() {
      const d = new Operation(js);
      expect(d.id()).to.be.equal(js.operationId);
    });
  });
  
  describe('#messages()', function() {
    it('should return an array of Message objects', function() {
      const d = new Operation(js);
      expect(Array.isArray(d.messages())).to.be.equal(true);
      d.messages().forEach(m => {
        expect(m.constructor.name).to.be.equal('Message');
        expect(m.json()).to.be.equal(js.message);
      });
    });
    
    it('should return an array of Message objects when using oneOf', function() {
      const doc = { message: { oneOf: [{test: true }, {test: false}] } };
      const d = new Operation(doc);
      expect(Array.isArray(d.messages())).to.be.equal(true);
      d.messages().forEach((m, i) => {
        expect(m.constructor.name).to.be.equal('Message');
        expect(m.json()).to.be.equal(doc.message.oneOf[i]);
      });
    });
  });
  
  describe('#message()', function() {
    it('should return null if channel doesn\'t have a message', function() {
      const doc = { };
      const d = new Operation(doc);
      expect(d.message()).to.be.equal(null);
    });
    
    it('should return a specific Message object', function() {
      const doc = { message: { oneOf: [{ test: true }, { test: false }] } };
      const d = new Operation(doc);
      expect(d.message(0).json()).to.be.deep.equal(doc.message.oneOf[0]);
      expect(d.message(1).json()).to.be.deep.equal(doc.message.oneOf[1]);
    });

    it('should return a Message object if no index is provided and message is oneOf from one element', function() {
      const doc = { message: { oneOf: [{ test: true }] } };
      const d = new Operation(doc);
      expect(d.message().json()).to.be.deep.equal(doc.message.oneOf[0]);
    });
    
    it('should return null when index is out of bounds', function() {
      const doc = { message: { oneOf: [{ test: true }, { test: false }] } };
      const d = new Operation(doc);
      expect(d.message(100)).to.be.equal(null);
    });

    it('should return null if index is not a number', function() {
      const doc = { message: { oneOf: [{ test: true }, { test: false }] } };
      const d = new Operation(doc);
      expect(d.message('0')).to.be.equal(null);
    });

    it('should return message object if no index is provided and message is not oneOf', function() {
      const doc = { message: { test: true } };
      const d = new Operation(doc);
      expect(d.message().json()).to.be.deep.equal(doc.message);
    });
  });

  describe('#mixins', function() {
    it('model should inherit from mixins', function() {
      assertMixinDescriptionInheritance(Operation);
      assertMixinExternalDocsInheritance(Operation);
      assertMixinTagsInheritance(Operation);
      assertMixinBindingsInheritance(Operation);
      assertMixinSpecificationExtensionsInheritance(Operation);
    });
  });

  describe('#security()', function() {
    it('should return an array of security requirements objects', function() {
      const d = new Operation(js);
      expect(Array.isArray(d.security())).to.equal(true);
      expect(d.security()).to.have.lengthOf(1);
      d.security().forEach((s, i) => {
        expect(s.constructor.name).to.equal('OperationSecurityRequirement');
        expect(s.json()).to.equal(js.security[i]);
      });
    });
  });
});
