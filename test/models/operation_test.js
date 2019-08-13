const { expect } = require('chai');
const Operation = require('../../lib/models/operation');
const js = { summary: 't', description: 'test', operationId: 'test', tags: [{name: 'tag1'}], externalDocs: { url: 'somewhere' }, protocolInfo: { amqp: { test: true } }, message: { test: true }, 'x-test': 'testing' };

describe('Operation', () => {
  describe('#ext()', () => {
    it('should support extensions', () => {
      const d = new Operation(js);
      expect(d.ext('x-test')).to.be.equal(js['x-test']);
    });
  });

  describe('#description()', function () {
    it('should return a string', () => {
      const d = new Operation(js);
      expect(d.description()).to.be.equal(js.description);
    });
  });
   
  describe('#summary()', function () {
    it('should return a string', () => {
      const d = new Operation(js);
      expect(d.summary()).to.be.equal(js.summary);
    });
  });
   
  describe('#id()', function () {
    it('should return a string', () => {
      const d = new Operation(js);
      expect(d.id()).to.be.equal(js.operationId);
    });
  });
   
  describe('#tags()', function () {
    it('should return an array of tags', () => {
      const d = new Operation(js);
      d.tags().forEach((t, i) => {
        expect(t.constructor.name).to.be.equal('Tag');
        expect(t.json()).to.be.equal(js.tags[i]);
      });
    });
  });
  
  describe('#externalDocs()', function () {
    it('should return an ExternalDocs object', () => {
      const d = new Operation(js);
      expect(d.externalDocs().constructor.name).to.be.equal('ExternalDocs');
      expect(d.externalDocs().json()).to.be.equal(js.externalDocs);
    });
  });
  
  describe('#bindings()', function () {
    it('should return a map of bindings', () => {
      const d = new Operation(js);
      expect(d.bindings()).to.be.equal(js.protocolInfo);
    });
  });
  
  describe('#binding()', function () {
    it('should return a specific binding', () => {
      const d = new Operation(js);
      expect(d.binding('amqp')).to.be.equal(js.protocolInfo.amqp);
    });
  });
  
  describe('#messages()', function () {
    it('should return an array of Message objects', () => {
      const d = new Operation(js);
      expect(Array.isArray(d.messages())).to.be.equal(true);
      d.messages().forEach(m => {
        expect(m.constructor.name).to.be.equal('Message');
        expect(m.json()).to.be.equal(js.message);
      });
    });
    
    it('should return an array of Message objects when using oneOf', () => {
      const doc = { message: { oneOf: [ {test: true }, {test: false}] } };
      const d = new Operation(doc);
      expect(Array.isArray(d.messages())).to.be.equal(true);
      d.messages().forEach((m, i) => {
        expect(m.constructor.name).to.be.equal('Message');
        expect(m.json()).to.be.equal(doc.message.oneOf[i]);
      });
    });
  });
});
