/* eslint-disable sonarjs/no-duplicate-string */
const { expect } = require('chai');
const OperationTrait = require('../../lib/models/operation-trait');
const js = { summary: 't', description: 'test', operationId: 'test', tags: [{name: 'tag1'}], externalDocs: { url: 'somewhere' }, bindings: { amqp: { test: true } }, 'x-test': 'testing' };

describe('OperationTrait', () => {
  describe('#ext()', () => {
    it('should support extensions', () => {
      const d = new OperationTrait(js);
      expect(d.ext('x-test')).to.be.equal(js['x-test']);      
      expect(d.extension('x-test')).to.be.equal(js['x-test']);      
      expect(d.extensions()).to.be.deep.equal({'x-test': 'testing'});
    });
  });

  describe('#description()', () => {
    it('should return a string', () => {
      const d = new OperationTrait(js);
      expect(d.description()).to.be.equal(js.description);
    });
  });
   
  describe('#summary()', () => {
    it('should return a string', () => {
      const d = new OperationTrait(js);
      expect(d.summary()).to.be.equal(js.summary);
    });
  });
   
  describe('#id()', () => {
    it('should return a string', () => {
      const d = new OperationTrait(js);
      expect(d.id()).to.be.equal(js.operationId);
    });
  });
   
  describe('#tags()', () => {
    it('should return an array of tags', () => {
      const d = new OperationTrait(js);
      d.tags().forEach((t, i) => {
        expect(t.constructor.name).to.be.equal('Tag');
        expect(t.json()).to.be.equal(js.tags[i]);
      });
    });
  });
  
  describe('#externalDocs()', () => {
    it('should return an ExternalDocs object', () => {
      const d = new OperationTrait(js);
      expect(d.externalDocs().constructor.name).to.be.equal('ExternalDocs');
      expect(d.externalDocs().json()).to.be.equal(js.externalDocs);
    });
  });
  
  describe('#bindings()', () => {
    it('should return a map of bindings', () => {
      const d = new OperationTrait(js);
      expect(d.bindings()).to.be.equal(js.bindings);
    });
  });
  
  describe('#binding()', () => {
    it('should return a specific binding', () => {
      const d = new OperationTrait(js);
      expect(d.binding('amqp')).to.be.equal(js.bindings.amqp);
    });
  });
  
  describe('#messages()', () => {
    it('should NOT have a messages method', () => {
      const d = new OperationTrait(js);
      expect(d.messages).to.be.equal(undefined);
    });
  });
  
  describe('#message()', () => {
    it('should NOT have a message method', () => {
      const d = new OperationTrait(js);
      expect(d.message).to.be.equal(undefined);
    });
  });
});
