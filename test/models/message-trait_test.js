const { expect } = require('chai');
const js = { headers: { properties: { test1: { type: 'string' }, test2: { type: 'number' } } }, correlationId: { test: true }, contentType: 'application/json', name: 'test', title: 'Test', summary: 'test', description: 'testing', externalDocs: { test: true }, tags: [{ name: 'tag1' }], bindings: { amqp: { test: true } }, examples: [{name: 'test', summary: 'test summary', payload: {test: true}}], 'x-test': 'testing' };

const MessageTrait = require('../../lib/models/message-trait');
const MessageExample = require('../../lib/models/message-example');

const { assertMixinDescriptionInheritance } = require('../mixins/description_test');
const { assertMixinExternalDocsInheritance } = require('../mixins/external-docs_test');
const { assertMixinTagsInheritance } = require('../mixins/tags_test');
const { assertMixinBindingsInheritance } = require('../mixins/bindings_test');
const { assertMixinSpecificationExtensionsInheritance } = require('../mixins/specification-extensions_test');

describe('MessageTrait', function() {
  describe('#headers()', function() {
    it('should return a map of Schema objects', function() {
      const d = new MessageTrait(js);
      expect(d.headers().constructor.name).to.be.equal('Schema');
      expect(d.headers().json()).to.equal(js.headers);
    });
  });

  describe('#header()', function() {
    it('should return a specific Schema object', function() {
      const d = new MessageTrait(js);
      expect(d.header('test1').constructor.name).to.be.equal('Schema');
      expect(d.header('test1').json()).to.equal(js.headers.properties.test1);
    });
  });

  describe('#payload()', function() {
    it('should NOT have a payload method', function() {
      const d = new MessageTrait(js);
      expect(d.payload).to.be.equal(undefined);
    });
  });

  describe('#originalPayload()', function() {
    it('should NOT have an originalPayload method', function() {
      const d = new MessageTrait(js);
      expect(d.originalPayload).to.be.equal(undefined);
    });
  });

  describe('#correlationId()', function() {
    it('should return a CorrelationId object', function() {
      const d = new MessageTrait(js);
      expect(d.correlationId().json()).to.equal(js.correlationId);
    });
  });

  describe('#schemaFormat()', function() {
    it('should return a string', function() {
      const d = new MessageTrait(js);
      expect(d.schemaFormat()).to.equal('application/schema+json;version=draft-07');
    });
  });

  describe('#originalSchemaFormat()', function() {
    it('should NOT have an originalSchemaFormat method', function() {
      const d = new MessageTrait(js);
      expect(d.originalSchemaFormat).to.be.equal(undefined);
    });
  });

  describe('#contentType()', function() {
    it('should return a string', function() {
      const d = new MessageTrait(js);
      expect(d.contentType()).to.equal(js.contentType);
    });
  });

  describe('#name()', function() {
    it('should return a string', function() {
      const d = new MessageTrait(js);
      expect(d.name()).to.equal(js.name);
    });
  });

  describe('#title()', function() {
    it('should return a string', function() {
      const d = new MessageTrait(js);
      expect(d.title()).to.equal(js.title);
    });
  });

  describe('#summary()', function() {
    it('should return a string', function() {
      const d = new MessageTrait(js);
      expect(d.summary()).to.equal(js.summary);
    });
  });

  describe('#examples()', function() {
    it('should return an array of MesageExample objects', function() {
      const d = new MessageTrait(js);
      expect(Array.isArray(d.examples()));
      expect(d.examples().length).to.equals(js.examples.length);
      expect(d.examples()[0]).to.be.an.instanceOf(MessageExample);
    });
  });

  describe('#mixins', function() {
    it('model should inherit from mixins', function() {
      assertMixinDescriptionInheritance(MessageTrait);
      assertMixinExternalDocsInheritance(MessageTrait);
      assertMixinTagsInheritance(MessageTrait);
      assertMixinBindingsInheritance(MessageTrait);
      assertMixinSpecificationExtensionsInheritance(MessageTrait);
    });
  });
});
