const { expect } = require('chai');

const Components = require('../../lib/models/components');

const { assertMixinSpecificationExtensionsInheritance } = require('../mixins/specification-extensions_test');

describe('Components', function() {
  describe('#channels()', function() {
    it('should return a map of Channel objects', function() {
      const doc = { channels: { test1: { description: 'test1' }, test2: { description: 'test2' } } };
      const d = new Components(doc);
      expect(typeof d.channels()).to.be.equal('object');
      expect(d.channels().test1.constructor.name).to.equal('Channel');
      expect(d.channels().test1.json()).to.equal(doc.channels.test1);
      expect(d.channels().test2.constructor.name).to.equal('Channel');
      expect(d.channels().test2.json()).to.equal(doc.channels.test2);
    });

    it('should return an empty object if the components field has no defined channels', function() {
      const doc = {};
      const d = new Components(doc);
      expect(typeof d.channels()).to.be.equal('object');
      expect(d.channels()).to.deep.equal({});
    });
  });

  describe('#hasChannels()', function() {
    it('should return a boolean indicating if the components field has channels', function() {
      const doc = { channels: { test1: { description: 'test1' }, test2: { description: 'test2' } } };
      const docNoChannels = { schemas: {} };
      const d = new Components(doc);
      const d2 = new Components(docNoChannels);
      expect(d.hasChannels()).to.equal(true);
      expect(d2.hasChannels()).to.equal(false);
    });
  });
  
  describe('#channel()', function() {
    it('should return a specific Channel object', function() {
      const doc = { channels: { test1: { description: 'test1' }, test2: { description: 'test2' } } };
      const d = new Components(doc);
      expect(d.channel('test1').constructor.name).to.equal('Channel');
      expect(d.channel('test1').json()).to.equal(doc.channels.test1);
    });
    
    it('should return null if a channel name is not provided', function() {
      const doc = { channels: { test1: { description: 'test1' }, test2: { description: 'test2' } } };
      const d = new Components(doc);
      expect(d.channel()).to.equal(null);
    });
    
    it('should return null if a channel name is not found', function() {
      const doc = { channels: { test1: { description: 'test1' }, test2: { description: 'test2' } } };
      const d = new Components(doc);
      expect(d.channel('not found')).to.equal(null);
    });
  });

  describe('#messages()', function() {
    it('should return a map of Message objects', function() {
      const doc = { messages: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(typeof d.messages()).to.be.equal('object');
      expect(d.messages().test1.constructor.name).to.equal('Message');
      expect(d.messages().test1.json()).to.equal(doc.messages.test1);
      expect(d.messages().test2.constructor.name).to.equal('Message');
      expect(d.messages().test2.json()).to.equal(doc.messages.test2);
    });

    it('should return an empty object if the components field has no defined messages', function() {
      const doc = {};
      const d = new Components(doc);
      expect(typeof d.messages()).to.be.equal('object');
      expect(d.messages()).to.deep.equal({});
    });
  });

  describe('#hasMessages()', function() {
    it('should return a boolean indicating if the components field has messages', function() {
      const doc = { messages: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const docNoMessages = { schemas: {} };
      const d = new Components(doc);
      const d2 = new Components(docNoMessages);
      expect(d.hasMessages()).to.equal(true);
      expect(d2.hasMessages()).to.equal(false);
    });
  });
  
  describe('#message()', function() {
    it('should return a specific Message object', function() {
      const doc = { messages: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.message('test1').constructor.name).to.equal('Message');
      expect(d.message('test1').json()).to.equal(doc.messages.test1);
    });
    
    it('should return null if a message name is not provided', function() {
      const doc = { messages: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.message()).to.equal(null);
    });
    
    it('should return null if a message name is not found', function() {
      const doc = { messages: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.message('not found')).to.equal(null);
    });
  });
  
  describe('#schemas()', function() {
    it('should return a map of Schema objects', function() {
      const doc = { schemas: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(typeof d.schemas()).to.be.equal('object');
      expect(d.schemas().test1.constructor.name).to.equal('Schema');
      expect(d.schemas().test1.json()).to.equal(doc.schemas.test1);
      expect(d.schemas().test2.constructor.name).to.equal('Schema');
      expect(d.schemas().test2.json()).to.equal(doc.schemas.test2);
    });

    it('should return an empty object if the components field has no defined schemas', function() {
      const doc = {};
      const d = new Components(doc);
      expect(typeof d.schemas()).to.be.equal('object');
      expect(d.schemas()).to.deep.equal({});
    });
  });

  describe('#hasSchemas()', function() {
    it('should return a boolean indicating if the components field has schemas', function() {
      const doc = { schemas: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const docNoSchemas = { messages: {} };
      const d = new Components(doc);
      const d2 = new Components(docNoSchemas);
      expect(d.hasSchemas()).to.equal(true);
      expect(d2.hasSchemas()).to.equal(false);
    });
  });
  
  describe('#schema()', function() {
    it('should return a specific Schema object', function() {
      const doc = { schemas: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.schema('test1').constructor.name).to.equal('Schema');
      expect(d.schema('test1').json()).to.equal(doc.schemas.test1);
    });
    
    it('should return null if a schema name is not provided', function() {
      const doc = { schemas: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.schema()).to.equal(null);
    });
    
    it('should return null if a schema name is not found', function() {
      const doc = { schemas: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.schema('not found')).to.equal(null);
    });
  });
  
  describe('#securitySchemes()', function() {
    it('should return a map of Security Scheme objects', function() {
      const doc = { securitySchemes: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(typeof d.securitySchemes()).to.be.equal('object');
      expect(d.securitySchemes().test1.constructor.name).to.equal('SecurityScheme');
      expect(d.securitySchemes().test1.json()).to.equal(doc.securitySchemes.test1);
      expect(d.securitySchemes().test2.constructor.name).to.equal('SecurityScheme');
      expect(d.securitySchemes().test2.json()).to.equal(doc.securitySchemes.test2);
    });

    it('should return an empty object if the components field has no defined securitySchemes', function() {
      const doc = {};
      const d = new Components(doc);
      expect(typeof d.securitySchemes()).to.be.equal('object');
      expect(d.securitySchemes()).to.deep.equal({});
    });
  });

  describe('#hasSecuritySchemes()', function() {
    it('should return a boolean indicating if the components field has securitySchemes', function() {
      const doc = { securitySchemes: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const docNoSchemas = { messages: {} };
      const d = new Components(doc);
      const d2 = new Components(docNoSchemas);
      expect(d.hasSecuritySchemes()).to.equal(true);
      expect(d2.hasSecuritySchemes()).to.equal(false);
    });
  });
  
  describe('#securityScheme()', function() {
    it('should return a specific securityScheme object', function() {
      const doc = { securitySchemes: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.securityScheme('test1').constructor.name).to.equal('SecurityScheme');
      expect(d.securityScheme('test1').json()).to.equal(doc.securitySchemes.test1);
    });
    
    it('should return null if a securityScheme name is not provided', function() {
      const doc = { securitySchemes: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.securityScheme()).to.equal(null);
    });
    
    it('should return null if a securityScheme name is not found', function() {
      const doc = { securitySchemes: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.securityScheme('not found')).to.equal(null);
    });
  });

  describe('#servers()', function() {
    it('should return a map of Server objects', function() {
      const doc = { servers: { test1: { url: 'test1' }, test2: { url: 'test2' } } };
      const d = new Components(doc);
      expect(typeof d.servers()).to.be.equal('object');
      expect(d.servers().test1.constructor.name).to.equal('Server');
      expect(d.servers().test1.json()).to.equal(doc.servers.test1);
      expect(d.servers().test2.constructor.name).to.equal('Server');
      expect(d.servers().test2.json()).to.equal(doc.servers.test2);
    });

    it('should return an empty object if the components field has no defined servers', function() {
      const doc = {};
      const d = new Components(doc);
      expect(typeof d.servers()).to.be.equal('object');
      expect(d.servers()).to.deep.equal({});
    });
  });

  describe('#hasServers()', function() {
    it('should return a boolean indicating if the components field has servers', function() {
      const doc = { servers: { test1: { url: 'test1' }, test2: { url: 'test2' } } };
      const docNoServers = { schemas: {} };
      const d = new Components(doc);
      const d2 = new Components(docNoServers);
      expect(d.hasServers()).to.equal(true);
      expect(d2.hasServers()).to.equal(false);
    });
  });
  
  describe('#server()', function() {
    it('should return a specific Server object', function() {
      const doc = { servers: { test1: { url: 'test1' }, test2: { url: 'test2' } } };
      const d = new Components(doc);
      expect(d.server('test1').constructor.name).to.equal('Server');
      expect(d.server('test1').json()).to.equal(doc.servers.test1);
    });
    
    it('should return null if a message name is not provided', function() {
      const doc = { servers: { test1: { url: 'test1' }, test2: { url: 'test2' } } };
      const d = new Components(doc);
      expect(d.server()).to.equal(null);
    });
    
    it('should return null if a message name is not found', function() {
      const doc = { servers: { test1: { url: 'test1' }, test2: { url: 'test2' } } };
      const d = new Components(doc);
      expect(d.server('not found')).to.equal(null);
    });
  });
  
  describe('#parameters()', function() {
    it('should return a map of ChannelParameter objects', function() {
      const doc = { parameters: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(typeof d.parameters()).to.be.equal('object');
      expect(d.parameters().test1.constructor.name).to.equal('ChannelParameter');
      expect(d.parameters().test1.json()).to.equal(doc.parameters.test1);
      expect(d.parameters().test2.constructor.name).to.equal('ChannelParameter');
      expect(d.parameters().test2.json()).to.equal(doc.parameters.test2);
    });

    it('should return an empty object if the components field has no defined parameters', function() {
      const doc = {};
      const d = new Components(doc);
      expect(typeof d.parameters()).to.be.equal('object');
      expect(d.parameters()).to.deep.equal({});
    });
  });

  describe('#hasParameters()', function() {
    it('should return a boolean indicating if the components field has parameters', function() {
      const doc = { parameters: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const docNoSchemas = { messages: {} };
      const d = new Components(doc);
      const d2 = new Components(docNoSchemas);
      expect(d.hasParameters()).to.equal(true);
      expect(d2.hasParameters()).to.equal(false);
    });
  });
  
  describe('#parameter()', function() {
    it('should return a specific parameter object', function() {
      const doc = { parameters: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.parameter('test1').constructor.name).to.equal('ChannelParameter');
      expect(d.parameter('test1').json()).to.equal(doc.parameters.test1);
    });
    
    it('should return null if a parameter name is not provided', function() {
      const doc = { parameters: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.parameter()).to.equal(null);
    });
    
    it('should return null if a parameter name is not found', function() {
      const doc = { parameters: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.parameter('not found')).to.equal(null);
    });
  });
  
  describe('#correlationIds()', function() {
    it('should return a map of CorrelationId objects', function() {
      const doc = { correlationIds: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(typeof d.correlationIds()).to.be.equal('object');
      expect(d.correlationIds().test1.constructor.name).to.equal('CorrelationId');
      expect(d.correlationIds().test1.json()).to.equal(doc.correlationIds.test1);
      expect(d.correlationIds().test2.constructor.name).to.equal('CorrelationId');
      expect(d.correlationIds().test2.json()).to.equal(doc.correlationIds.test2);
    });

    it('should return an empty object if the components field has no defined correlationIds', function() {
      const doc = {};
      const d = new Components(doc);
      expect(typeof d.correlationIds()).to.be.equal('object');
      expect(d.correlationIds()).to.deep.equal({});
    });
  });

  describe('#hasCorrelationIds()', function() {
    it('should return a boolean indicating if the components field has correlationIds', function() {
      const doc = { correlationIds: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const docNoSchemas = { messages: {} };
      const d = new Components(doc);
      const d2 = new Components(docNoSchemas);
      expect(d.hasCorrelationIds()).to.equal(true);
      expect(d2.hasCorrelationIds()).to.equal(false);
    });
  });
  
  describe('#correlationId()', function() {
    it('should return a specific correlationId object', function() {
      const doc = { correlationIds: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.correlationId('test1').constructor.name).to.equal('CorrelationId');
      expect(d.correlationId('test1').json()).to.equal(doc.correlationIds.test1);
    });
    
    it('should return null if a correlationId name is not provided', function() {
      const doc = { correlationIds: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.correlationId()).to.equal(null);
    });
    
    it('should return null if a correlationId name is not found', function() {
      const doc = { correlationIds: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.correlationId('not found')).to.equal(null);
    });
  });
  
  describe('#operationTraits()', function() {
    it('should return a map of OperationTrait objects', function() {
      const doc = { operationTraits: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(typeof d.operationTraits()).to.be.equal('object');
      expect(d.operationTraits().test1.constructor.name).to.equal('OperationTrait');
      expect(d.operationTraits().test1.json()).to.equal(doc.operationTraits.test1);
      expect(d.operationTraits().test2.constructor.name).to.equal('OperationTrait');
      expect(d.operationTraits().test2.json()).to.equal(doc.operationTraits.test2);
    });

    it('should return an empty object if the components field has no defined operationTraits', function() {
      const doc = {};
      const d = new Components(doc);
      expect(typeof d.operationTraits()).to.be.equal('object');
      expect(d.operationTraits()).to.deep.equal({});
    });
  });

  describe('#hasOperationTraits()', function() {
    it('should return a boolean indicating if the components field has operationTraits', function() {
      const doc = { operationTraits: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const docNoSchemas = { messages: {} };
      const d = new Components(doc);
      const d2 = new Components(docNoSchemas);
      expect(d.hasOperationTraits()).to.equal(true);
      expect(d2.hasOperationTraits()).to.equal(false);
    });
  });
  
  describe('#operationTrait()', function() {
    it('should return a specific operationTrait object', function() {
      const doc = { operationTraits: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.operationTrait('test1').constructor.name).to.equal('OperationTrait');
      expect(d.operationTrait('test1').json()).to.equal(doc.operationTraits.test1);
    });
    
    it('should return null if a operationTrait name is not provided', function() {
      const doc = { operationTraits: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.operationTrait()).to.equal(null);
    });
    
    it('should return null if a operationTrait name is not found', function() {
      const doc = { operationTraits: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.operationTrait('not found')).to.equal(null);
    });
  });
  
  describe('#messageTraits()', function() {
    it('should return a map of MessageTrait objects', function() {
      const doc = { messageTraits: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(typeof d.messageTraits()).to.be.equal('object');
      expect(d.messageTraits().test1.constructor.name).to.equal('MessageTrait');
      expect(d.messageTraits().test1.json()).to.equal(doc.messageTraits.test1);
      expect(d.messageTraits().test2.constructor.name).to.equal('MessageTrait');
      expect(d.messageTraits().test2.json()).to.equal(doc.messageTraits.test2);
    });

    it('should return an empty object if the components field has no defined messageTraits', function() {
      const doc = {};
      const d = new Components(doc);
      expect(typeof d.messageTraits()).to.be.equal('object');
      expect(d.messageTraits()).to.deep.equal({});
    });
  });

  describe('#hasMessageTraits()', function() {
    it('should return a boolean indicating if the components field has messageTraits', function() {
      const doc = { messageTraits: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const docNoSchemas = { messages: {} };
      const d = new Components(doc);
      const d2 = new Components(docNoSchemas);
      expect(d.hasMessageTraits()).to.equal(true);
      expect(d2.hasMessageTraits()).to.equal(false);
    });
  });
  
  describe('#messageTrait()', function() {
    it('should return a specific messageTrait object', function() {
      const doc = { messageTraits: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.messageTrait('test1').constructor.name).to.equal('MessageTrait');
      expect(d.messageTrait('test1').json()).to.equal(doc.messageTraits.test1);
    });
    
    it('should return null if a messageTrait name is not provided', function() {
      const doc = { messageTraits: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.messageTrait()).to.equal(null);
    });
    
    it('should return null if a messageTrait name is not found', function() {
      const doc = { messageTraits: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.messageTrait('not found')).to.equal(null);
    });
  });

  describe('#mixins', function() {
    it('model should inherit from mixins', function() {
      assertMixinSpecificationExtensionsInheritance(Components);
    });
  });
});
