const { expect } = require('chai');
const MessageTrait = require('../../lib/models/message-trait');
const js = { headers: { properties: { test1: { type: 'string' }, test2: { type: 'number' } } }, correlationId: { test: true }, contentType: 'application/json', name: 'test', title: 'Test', summary: 'test', description: 'testing', externalDocs: { test: true }, tags: [{ name: 'tag1' }], bindings: { amqp: { test: true } }, examples: [{ test: true }], 'x-test': 'testing' };

describe('MessageTrait', function() {
  describe('#ext()', function() {
    it('should support extensions', function() {
      const doc = { 'x-test': 'testing' };
      const d = new MessageTrait(doc);
      expect(d.ext('x-test')).to.be.equal(doc['x-test']);
      expect(d.extension('x-test')).to.be.equal(doc['x-test']);
      expect(d.extensions()).to.be.deep.equal({ 'x-test': 'testing' });
    });
  });

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

  describe('#description()', function() {
    it('should return a string', function() {
      const d = new MessageTrait(js);
      expect(d.description()).to.equal(js.description);
    });
  });

  describe('#externalDocs()', function() {
    it('should return an ExternalDocs object', function() {
      const d = new MessageTrait(js);
      expect(d.externalDocs().constructor.name).to.equal('ExternalDocs');
      expect(d.externalDocs().json()).to.equal(js.externalDocs);
    });
  });

  describe('#tags()', function() {
    it('should return an array of Tag objects', function() {
      const d = new MessageTrait(js);
      expect(Array.isArray(d.tags())).to.be.equal(true);
      d.tags().forEach((t, i) => {
        expect(t.constructor.name).to.equal('Tag');
        expect(t.json()).to.equal(js.tags[i]);
      });
    });
  });

  describe('#bindings()', function() {
    it('should return a map of bindings', function() {
      const d = new MessageTrait(js);
      expect(d.bindings()).to.be.equal(js.bindings);
    });
  });

  describe('#binding()', function() {
    it('should return a specific binding', function() {
      const d = new MessageTrait(js);
      expect(d.binding('amqp')).to.be.equal(js.bindings.amqp);
    });
  });

  describe('#examples()', function() {
    it('should return an array of examples', function() {
      const d = new MessageTrait(js);
      expect(Array.isArray(d.examples())).to.be.equal(true);
      expect(d.examples()).to.be.equal(js.examples);
    });
  });
});
