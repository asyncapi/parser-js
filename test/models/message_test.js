const { expect } = require('chai');
const Message = require('../../lib/models/message');
const js = { headers: { properties: { test1: { type: 'string' }, test2: { type: 'number' } } }, payload: { test: true }, 'x-parser-original-payload': { testing: true }, correlationId: { test: true }, 'x-parser-original-schema-format': 'application/vnd.apache.avro;version=1.9.0', contentType: 'application/json', name: 'test', title: 'Test', summary: 'test', description: 'testing', externalDocs: { test: true }, tags: [ { name: 'tag1' } ], bindings: { amqp: { test: true } }, examples: [{test: true}], 'x-test': 'testing' };

describe('Message', () => {
  describe('#ext()', () => {
    it('should support extensions', () => {
      const doc = { 'x-test': 'testing' };
      const d = new Message(doc);
      expect(d.ext('x-test')).to.be.equal(doc['x-test']);      
      expect(d.extension('x-test')).to.be.equal(doc['x-test']);      
      expect(d.extensions()).to.be.deep.equal({'x-test': 'testing'});
    });
  });

  describe('#uid()', function () {
    it('should return a string with the name', () => {
      const d = new Message(js);
      expect(d.uid()).to.be.equal('test');
    });
    
    it('should return a string with the x-parser-message-name extension when name is not available', () => {
      const msg = { ...js, ...{ 'x-parser-message-name': 'test' } };
      const d = new Message(msg);
      expect(d.uid()).to.be.equal('test');
    });
    
    it('should return a string with the base64 representation of the object when x-parser-message-name extension and name are not available', () => {
      const msg = { ...js, ...{ name: undefined } };
      const d = new Message(msg);
      expect(d.uid()).to.be.equal('eyJoZWFkZXJzIjp7InByb3BlcnRpZXMiOnsidGVzdDEiOnsidHlwZSI6InN0cmluZyJ9LCJ0ZXN0MiI6eyJ0eXBlIjoibnVtYmVyIn19fSwicGF5bG9hZCI6eyJ0ZXN0Ijp0cnVlfSwieC1wYXJzZXItb3JpZ2luYWwtcGF5bG9hZCI6eyJ0ZXN0aW5nIjp0cnVlfSwiY29ycmVsYXRpb25JZCI6eyJ0ZXN0Ijp0cnVlfSwieC1wYXJzZXItb3JpZ2luYWwtc2NoZW1hLWZvcm1hdCI6ImFwcGxpY2F0aW9uL3ZuZC5hcGFjaGUuYXZybzt2ZXJzaW9uPTEuOS4wIiwiY29udGVudFR5cGUiOiJhcHBsaWNhdGlvbi9qc29uIiwidGl0bGUiOiJUZXN0Iiwic3VtbWFyeSI6InRlc3QiLCJkZXNjcmlwdGlvbiI6InRlc3RpbmciLCJleHRlcm5hbERvY3MiOnsidGVzdCI6dHJ1ZX0sInRhZ3MiOlt7Im5hbWUiOiJ0YWcxIn1dLCJiaW5kaW5ncyI6eyJhbXFwIjp7InRlc3QiOnRydWV9fSwiZXhhbXBsZXMiOlt7InRlc3QiOnRydWV9XSwieC10ZXN0IjoidGVzdGluZyJ9');
    });
  });
  
  describe('#headers()', function () {
    it('should return a map of Schema objects', () => {
      const d = new Message(js);
      expect(d.headers().constructor.name).to.be.equal('Schema');
      expect(d.headers().json()).to.equal(js.headers);
    });
  });

  describe('#header()', function () {
    it('should return a specific Schema object', () => {
      const d = new Message(js);
      expect(d.header('test1').constructor.name).to.be.equal('Schema');
      expect(d.header('test1').json()).to.equal(js.headers.properties.test1);
    });
  });

  describe('#payload()', function () {
    it('should return payload as a Schema object', () => {
      const d = new Message(js);
      expect(d.payload().constructor.name).to.be.equal('Schema');
      expect(d.payload().json()).to.equal(js.payload);
    });
  });

  describe('#originalPayload()', function () {
    it('should return the original payload', () => {
      const d = new Message(js);
      expect(d.originalPayload()).to.equal(js['x-parser-original-payload']);
    });
  });

  describe('#correlationId()', function () {
    it('should return a CorrelationId object', () => {
      const d = new Message(js);
      expect(d.correlationId().json()).to.equal(js.correlationId);
    });
  });

  describe('#schemaFormat()', function () {
    it('should return a string', () => {
      const d = new Message(js);
      expect(d.schemaFormat()).to.equal('application/schema+json;version=draft-07');
    });
  });

  describe('#originalSchemaFormat()', function () {
    it('should return a string', () => {
      const d = new Message(js);
      expect(d.originalSchemaFormat()).to.equal(js['x-parser-original-schema-format']);
    });
  });

  describe('#contentType()', function () {
    it('should return a string', () => {
      const d = new Message(js);
      expect(d.contentType()).to.equal(js.contentType);
    });
  });

  describe('#name()', function () {
    it('should return a string', () => {
      const d = new Message(js);
      expect(d.name()).to.equal(js.name);
    });
  });

  describe('#title()', function () {
    it('should return a string', () => {
      const d = new Message(js);
      expect(d.title()).to.equal(js.title);
    });
  });

  describe('#summary()', function () {
    it('should return a string', () => {
      const d = new Message(js);
      expect(d.summary()).to.equal(js.summary);
    });
  });

  describe('#description()', function () {
    it('should return a string', () => {
      const d = new Message(js);
      expect(d.description()).to.equal(js.description);
    });
  });

  describe('#externalDocs()', function () {
    it('should return an ExternalDocs object', () => {
      const d = new Message(js);
      expect(d.externalDocs().constructor.name).to.equal('ExternalDocs');
      expect(d.externalDocs().json()).to.equal(js.externalDocs);
    });
  });

  describe('#tags()', function () {
    it('should return an array of Tag objects', () => {
      const d = new Message(js);
      expect(Array.isArray(d.tags())).to.be.equal(true);
      d.tags().forEach((t, i) => {
        expect(t.constructor.name).to.equal('Tag');
        expect(t.json()).to.equal(js.tags[i]);
      });
    });
  });

  describe('#bindings()', function () {
    it('should return a map of bindings', () => {
      const d = new Message(js);
      expect(d.bindings()).to.be.equal(js.bindings);
    });
  });

  describe('#binding()', function () {
    it('should return a specific binding', () => {
      const d = new Message(js);
      expect(d.binding('amqp')).to.be.equal(js.bindings.amqp);
    });
  });

  describe('#examples()', function () {
    it('should return an array of examples', () => {
      const d = new Message(js);
      expect(Array.isArray(d.examples())).to.be.equal(true);
      expect(d.examples()).to.be.equal(js.examples);
    });
  });
});
