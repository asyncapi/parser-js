const { expect } = require('chai');
const Components = require('../../lib/models/components');

describe('Components', () => {
  describe('#ext()', () => {
    it('should support extensions', () => {
      const doc = { 'x-test': 'testing' };
      const d = new Components(doc);
      expect(d.ext('x-test')).to.be.equal(doc['x-test']);      
      expect(d.extension('x-test')).to.be.equal(doc['x-test']);
      expect(d.extensions()).to.be.deep.equal({'x-test': 'testing'});
    });
  });

  describe('#messages()', function () {
    it('should return a map of Message objects', () => {
      const doc = { messages: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(typeof d.messages()).to.be.equal('object');
      expect(d.messages().test1.constructor.name).to.equal('Message');
      expect(d.messages().test1.json()).to.equal(doc.messages.test1);
      expect(d.messages().test2.constructor.name).to.equal('Message');
      expect(d.messages().test2.json()).to.equal(doc.messages.test2);
    });
  });
  
  describe('#message()', function () {
    it('should return a specific Message object', () => {
      const doc = { messages: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.message('test1').constructor.name).to.equal('Message');
      expect(d.message('test1').json()).to.equal(doc.messages.test1);
    });
    
    it('should return null if a message name is not provided', () => {
      const doc = { messages: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.message()).to.equal(null);
    });
    
    it('should return null if a message name is not found', () => {
      const doc = { messages: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.message('not found')).to.equal(null);
    });
  });
  
  describe('#schemas()', function () {
    it('should return a map of Schema objects', () => {
      const doc = { schemas: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(typeof d.schemas()).to.be.equal('object');
      expect(d.schemas().test1.constructor.name).to.equal('Schema');
      expect(d.schemas().test1.json()).to.equal(doc.schemas.test1);
      expect(d.schemas().test2.constructor.name).to.equal('Schema');
      expect(d.schemas().test2.json()).to.equal(doc.schemas.test2);
    });
  });
  
  describe('#schema()', function () {
    it('should return a specific Schema object', () => {
      const doc = { schemas: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.schema('test1').constructor.name).to.equal('Schema');
      expect(d.schema('test1').json()).to.equal(doc.schemas.test1);
    });
    
    it('should return null if a schema name is not provided', () => {
      const doc = { schemas: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.schema()).to.equal(null);
    });
    
    it('should return null if a schema name is not found', () => {
      const doc = { schemas: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.schema('not found')).to.equal(null);
    });
  });
  
  describe('#securitySchemes()', function () {
    it('should return a map of Security Scheme objects', () => {
      const doc = { securitySchemes: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(typeof d.securitySchemes()).to.be.equal('object');
      expect(d.securitySchemes().test1.constructor.name).to.equal('SecurityScheme');
      expect(d.securitySchemes().test1.json()).to.equal(doc.securitySchemes.test1);
      expect(d.securitySchemes().test2.constructor.name).to.equal('SecurityScheme');
      expect(d.securitySchemes().test2.json()).to.equal(doc.securitySchemes.test2);
    });
  });
  
  describe('#securityScheme()', function () {
    it('should return a specific securityScheme object', () => {
      const doc = { securitySchemes: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.securityScheme('test1').constructor.name).to.equal('SecurityScheme');
      expect(d.securityScheme('test1').json()).to.equal(doc.securitySchemes.test1);
    });
    
    it('should return null if a securityScheme name is not provided', () => {
      const doc = { securitySchemes: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.securityScheme()).to.equal(null);
    });
    
    it('should return null if a securityScheme name is not found', () => {
      const doc = { securitySchemes: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.securityScheme('not found')).to.equal(null);
    });
  });
  
  describe('#parameters()', function () {
    it('should return a map of ChannelParameter objects', () => {
      const doc = { parameters: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(typeof d.parameters()).to.be.equal('object');
      expect(d.parameters().test1.constructor.name).to.equal('ChannelParameter');
      expect(d.parameters().test1.json()).to.equal(doc.parameters.test1);
      expect(d.parameters().test2.constructor.name).to.equal('ChannelParameter');
      expect(d.parameters().test2.json()).to.equal(doc.parameters.test2);
    });
  });
  
  describe('#parameter()', function () {
    it('should return a specific parameter object', () => {
      const doc = { parameters: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.parameter('test1').constructor.name).to.equal('ChannelParameter');
      expect(d.parameter('test1').json()).to.equal(doc.parameters.test1);
    });
    
    it('should return null if a parameter name is not provided', () => {
      const doc = { parameters: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.parameter()).to.equal(null);
    });
    
    it('should return null if a parameter name is not found', () => {
      const doc = { parameters: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.parameter('not found')).to.equal(null);
    });
  });
  
  describe('#correlationIds()', function () {
    it('should return a map of CorrelationId objects', () => {
      const doc = { correlationIds: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(typeof d.correlationIds()).to.be.equal('object');
      expect(d.correlationIds().test1.constructor.name).to.equal('CorrelationId');
      expect(d.correlationIds().test1.json()).to.equal(doc.correlationIds.test1);
      expect(d.correlationIds().test2.constructor.name).to.equal('CorrelationId');
      expect(d.correlationIds().test2.json()).to.equal(doc.correlationIds.test2);
    });
  });
  
  describe('#correlationId()', function () {
    it('should return a specific correlationId object', () => {
      const doc = { correlationIds: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.correlationId('test1').constructor.name).to.equal('CorrelationId');
      expect(d.correlationId('test1').json()).to.equal(doc.correlationIds.test1);
    });
    
    it('should return null if a correlationId name is not provided', () => {
      const doc = { correlationIds: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.correlationId()).to.equal(null);
    });
    
    it('should return null if a correlationId name is not found', () => {
      const doc = { correlationIds: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.correlationId('not found')).to.equal(null);
    });
  });
  
  describe('#operationTraits()', function () {
    it('should return a map of OperationTrait objects', () => {
      const doc = { operationTraits: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(typeof d.operationTraits()).to.be.equal('object');
      expect(d.operationTraits().test1.constructor.name).to.equal('OperationTrait');
      expect(d.operationTraits().test1.json()).to.equal(doc.operationTraits.test1);
      expect(d.operationTraits().test2.constructor.name).to.equal('OperationTrait');
      expect(d.operationTraits().test2.json()).to.equal(doc.operationTraits.test2);
    });
  });
  
  describe('#operationTrait()', function () {
    it('should return a specific operationTrait object', () => {
      const doc = { operationTraits: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.operationTrait('test1').constructor.name).to.equal('OperationTrait');
      expect(d.operationTrait('test1').json()).to.equal(doc.operationTraits.test1);
    });
    
    it('should return null if a operationTrait name is not provided', () => {
      const doc = { operationTraits: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.operationTrait()).to.equal(null);
    });
    
    it('should return null if a operationTrait name is not found', () => {
      const doc = { operationTraits: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.operationTrait('not found')).to.equal(null);
    });
  });
  
  describe('#messageTraits()', function () {
    it('should return a map of MessageTrait objects', () => {
      const doc = { messageTraits: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(typeof d.messageTraits()).to.be.equal('object');
      expect(d.messageTraits().test1.constructor.name).to.equal('MessageTrait');
      expect(d.messageTraits().test1.json()).to.equal(doc.messageTraits.test1);
      expect(d.messageTraits().test2.constructor.name).to.equal('MessageTrait');
      expect(d.messageTraits().test2.json()).to.equal(doc.messageTraits.test2);
    });
  });
  
  describe('#messageTrait()', function () {
    it('should return a specific messageTrait object', () => {
      const doc = { messageTraits: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.messageTrait('test1').constructor.name).to.equal('MessageTrait');
      expect(d.messageTrait('test1').json()).to.equal(doc.messageTraits.test1);
    });
    
    it('should return null if a messageTrait name is not provided', () => {
      const doc = { messageTraits: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.messageTrait()).to.equal(null);
    });
    
    it('should return null if a messageTrait name is not found', () => {
      const doc = { messageTraits: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.messageTrait('not found')).to.equal(null);
    });
  });
});
