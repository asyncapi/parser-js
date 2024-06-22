import { Components } from '../../src/old-api/components';
import { Channel } from '../../src/old-api/channel';
import { Message } from '../../src/old-api/message';
import { Schema } from '../../src/old-api/schema';
import { SecurityScheme } from '../../src/old-api/security-scheme';
import { Server } from '../../src/old-api/server';
import { ChannelParameter } from '../../src/old-api/channel-parameter';
import { CorrelationId } from '../../src/old-api/correlation-id';
import { OperationTrait } from '../../src/old-api/operation-trait';
import { MessageTrait } from '../../src/old-api/message-trait';
import { ServerVariable } from '../../src/old-api/server-variable';
import { assertExtensionsMixin } from './mixins';

describe('Components', function() {
  describe('channels()', function() {
    it('should return a map of Channel objects', function() {
      const doc = { channels: { test1: { description: 'test1' }, test2: { description: 'test2' } } };
      const d = new Components(doc);
      expect(typeof d.channels()).toEqual('object');
      expect(d.channels().test1).toBeInstanceOf(Channel);
      expect(d.channels().test1.json()).toEqual(doc.channels.test1);
      expect(d.channels().test2).toBeInstanceOf(Channel);
      expect(d.channels().test2.json()).toEqual(doc.channels.test2);
    });

    it('should return an empty object if the components field has no defined channels', function() {
      const doc = {};
      const d = new Components(doc);
      expect(typeof d.channels()).toEqual('object');
      expect(d.channels()).toEqual({});
    });
  });

  describe('hasChannels()', function() {
    it('should return a boolean indicating if the components field has channels', function() {
      const doc = { channels: { test1: { description: 'test1' }, test2: { description: 'test2' } } };
      const docNoChannels = { schemas: {} };
      const d = new Components(doc);
      const d2 = new Components(docNoChannels);
      expect(d.hasChannels()).toEqual(true);
      expect(d2.hasChannels()).toEqual(false);
    });
  });
  
  describe('channel()', function() {
    it('should return a specific Channel object', function() {
      const doc = { channels: { test1: { description: 'test1' }, test2: { description: 'test2' } } };
      const d = new Components(doc);
      expect(d.channel('test1')).toBeInstanceOf(Channel);
      expect(d.channel('test1')?.json()).toEqual(doc.channels.test1);
    });
    
    it('should return null if a channel name is not provided', function() {
      const doc = { channels: { test1: { description: 'test1' }, test2: { description: 'test2' } } };
      const d = new Components(doc);
      expect(d.channel(undefined as any)).toEqual(null);
    });
    
    it('should return null if a channel name is not found', function() {
      const doc = { channels: { test1: { description: 'test1' }, test2: { description: 'test2' } } };
      const d = new Components(doc);
      expect(d.channel('not found')).toEqual(null);
    });
  });

  describe('messages()', function() {
    it('should return a map of Message objects', function() {
      const doc = { messages: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(typeof d.messages()).toEqual('object');
      expect(d.messages().test1).toBeInstanceOf(Message);
      expect(d.messages().test1.json()).toEqual(doc.messages.test1);
      expect(d.messages().test2).toBeInstanceOf(Message);
      expect(d.messages().test2.json()).toEqual(doc.messages.test2);
    });

    it('should return an empty object if the components field has no defined messages', function() {
      const doc = {};
      const d = new Components(doc);
      expect(typeof d.messages()).toEqual('object');
      expect(d.messages()).toEqual({});
    });
  });

  describe('hasMessages()', function() {
    it('should return a boolean indicating if the components field has messages', function() {
      const doc = { messages: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const docNoMessages = { schemas: {} };
      const d = new Components(doc);
      const d2 = new Components(docNoMessages);
      expect(d.hasMessages()).toEqual(true);
      expect(d2.hasMessages()).toEqual(false);
    });
  });
  
  describe('message()', function() {
    it('should return a specific Message object', function() {
      const doc = { messages: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.message('test1')).toBeInstanceOf(Message);
      expect(d.message('test1')?.json()).toEqual(doc.messages.test1);
    });
    
    it('should return null if a message name is not provided', function() {
      const doc = { messages: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.message(undefined as any)).toEqual(null);
    });
    
    it('should return null if a message name is not found', function() {
      const doc = { messages: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.message('not found')).toEqual(null);
    });
  });
  
  describe('schemas()', function() {
    it('should return a map of Schema objects', function() {
      const doc = { schemas: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(typeof d.schemas()).toEqual('object');
      expect(d.schemas().test1).toBeInstanceOf(Schema);
      expect(d.schemas().test1.json()).toEqual(doc.schemas.test1);
      expect(d.schemas().test2).toBeInstanceOf(Schema);
      expect(d.schemas().test2.json()).toEqual(doc.schemas.test2);
    });

    it('should return an empty object if the components field has no defined schemas', function() {
      const doc = {};
      const d = new Components(doc);
      expect(typeof d.schemas()).toEqual('object');
      expect(d.schemas()).toEqual({});
    });
  });

  describe('hasSchemas()', function() {
    it('should return a boolean indicating if the components field has schemas', function() {
      const doc = { schemas: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const docNoSchemas = { messages: {} };
      const d = new Components(doc);
      const d2 = new Components(docNoSchemas);
      expect(d.hasSchemas()).toEqual(true);
      expect(d2.hasSchemas()).toEqual(false);
    });
  });
  
  describe('schema()', function() {
    it('should return a specific Schema object', function() {
      const doc = { schemas: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.schema('test1')).toBeInstanceOf(Schema);
      expect(d.schema('test1')?.json()).toEqual(doc.schemas.test1);
    });
    
    it('should return null if a schema name is not provided', function() {
      const doc = { schemas: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.schema(undefined as any)).toEqual(null);
    });
    
    it('should return null if a schema name is not found', function() {
      const doc = { schemas: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.schema('not found')).toEqual(null);
    });
  });
  
  describe('securitySchemes()', function() {
    it('should return a map of Security Scheme objects', function() {
      const doc: any = { securitySchemes: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(typeof d.securitySchemes()).toEqual('object');
      expect(d.securitySchemes().test1).toBeInstanceOf(SecurityScheme);
      expect(d.securitySchemes().test1.json()).toEqual(doc.securitySchemes.test1);
      expect(d.securitySchemes().test2).toBeInstanceOf(SecurityScheme);
      expect(d.securitySchemes().test2.json()).toEqual(doc.securitySchemes.test2);
    });

    it('should return an empty object if the components field has no defined securitySchemes', function() {
      const doc = {};
      const d = new Components(doc);
      expect(typeof d.securitySchemes()).toEqual('object');
      expect(d.securitySchemes()).toEqual({});
    });
  });

  describe('hasSecuritySchemes()', function() {
    it('should return a boolean indicating if the components field has securitySchemes', function() {
      const doc: any = { securitySchemes: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const docNoSchemas = { messages: {} };
      const d = new Components(doc);
      const d2 = new Components(docNoSchemas);
      expect(d.hasSecuritySchemes()).toEqual(true);
      expect(d2.hasSecuritySchemes()).toEqual(false);
    });
  });
  
  describe('securityScheme()', function() {
    it('should return a specific securityScheme object', function() {
      const doc: any = { securitySchemes: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.securityScheme('test1')).toBeInstanceOf(SecurityScheme);
      expect(d.securityScheme('test1')?.json()).toEqual(doc.securitySchemes.test1);
    });
    
    it('should return null if a securityScheme name is not provided', function() {
      const doc: any = { securitySchemes: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.securityScheme(undefined as any)).toEqual(null);
    });
    
    it('should return null if a securityScheme name is not found', function() {
      const doc: any = { securitySchemes: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.securityScheme('not found')).toEqual(null);
    });
  });

  describe('servers()', function() {
    it('should return a map of Server objects', function() {
      const doc: any = { servers: { test1: { url: 'test1' }, test2: { url: 'test2' } } };
      const d = new Components(doc);
      expect(typeof d.servers()).toEqual('object');
      expect(d.servers().test1).toBeInstanceOf(Server);
      expect(d.servers().test1.json()).toEqual(doc.servers.test1);
      expect(d.servers().test2).toBeInstanceOf(Server);
      expect(d.servers().test2.json()).toEqual(doc.servers.test2);
    });

    it('should return an empty object if the components field has no defined servers', function() {
      const doc = {};
      const d = new Components(doc);
      expect(typeof d.servers()).toEqual('object');
      expect(d.servers()).toEqual({});
    });
  });

  describe('hasServers()', function() {
    it('should return a boolean indicating if the components field has servers', function() {
      const doc: any = { servers: { test1: { url: 'test1' }, test2: { url: 'test2' } } };
      const docNoServers = { schemas: {} };
      const d = new Components(doc);
      const d2 = new Components(docNoServers);
      expect(d.hasServers()).toEqual(true);
      expect(d2.hasServers()).toEqual(false);
    });
  });
  
  describe('server()', function() {
    it('should return a specific Server object', function() {
      const doc: any = { servers: { test1: { url: 'test1' }, test2: { url: 'test2' } } };
      const d = new Components(doc);
      expect(d.server('test1')).toBeInstanceOf(Server);
      expect(d.server('test1')?.json()).toEqual(doc.servers.test1);
    });
    
    it('should return null if a message name is not provided', function() {
      const doc: any = { servers: { test1: { url: 'test1' }, test2: { url: 'test2' } } };
      const d = new Components(doc);
      expect(d.server(undefined as any)).toEqual(null);
    });
    
    it('should return null if a message name is not found', function() {
      const doc: any = { servers: { test1: { url: 'test1' }, test2: { url: 'test2' } } };
      const d = new Components(doc);
      expect(d.server('not found')).toEqual(null);
    });
  });
  
  describe('parameters()', function() {
    it('should return a map of ChannelParameter objects', function() {
      const doc = { parameters: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(typeof d.parameters()).toEqual('object');
      expect(d.parameters().test1).toBeInstanceOf(ChannelParameter);
      expect(d.parameters().test1.json()).toEqual(doc.parameters.test1);
      expect(d.parameters().test2).toBeInstanceOf(ChannelParameter);
      expect(d.parameters().test2.json()).toEqual(doc.parameters.test2);
    });

    it('should return an empty object if the components field has no defined parameters', function() {
      const doc = {};
      const d = new Components(doc);
      expect(typeof d.parameters()).toEqual('object');
      expect(d.parameters()).toEqual({});
    });
  });

  describe('hasParameters()', function() {
    it('should return a boolean indicating if the components field has parameters', function() {
      const doc = { parameters: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const docNoSchemas = { messages: {} };
      const d = new Components(doc);
      const d2 = new Components(docNoSchemas);
      expect(d.hasParameters()).toEqual(true);
      expect(d2.hasParameters()).toEqual(false);
    });
  });
  
  describe('parameter()', function() {
    it('should return a specific parameter object', function() {
      const doc = { parameters: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.parameter('test1')).toBeInstanceOf(ChannelParameter);
      expect(d.parameter('test1')?.json()).toEqual(doc.parameters.test1);
    });
    
    it('should return null if a parameter name is not provided', function() {
      const doc = { parameters: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.parameter(undefined as any)).toEqual(null);
    });
    
    it('should return null if a parameter name is not found', function() {
      const doc = { parameters: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.parameter('not found')).toEqual(null);
    });
  });
  
  describe('correlationIds()', function() {
    it('should return a map of CorrelationId objects', function() {
      const doc: any = { correlationIds: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(typeof d.correlationIds()).toEqual('object');
      expect(d.correlationIds().test1).toBeInstanceOf(CorrelationId);
      expect(d.correlationIds().test1.json()).toEqual(doc.correlationIds.test1);
      expect(d.correlationIds().test2).toBeInstanceOf(CorrelationId);
      expect(d.correlationIds().test2.json()).toEqual(doc.correlationIds.test2);
    });

    it('should return an empty object if the components field has no defined correlationIds', function() {
      const doc = {};
      const d = new Components(doc);
      expect(typeof d.correlationIds()).toEqual('object');
      expect(d.correlationIds()).toEqual({});
    });
  });

  describe('hasCorrelationIds()', function() {
    it('should return a boolean indicating if the components field has correlationIds', function() {
      const doc: any = { correlationIds: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const docNoSchemas = { messages: {} };
      const d = new Components(doc);
      const d2 = new Components(docNoSchemas);
      expect(d.hasCorrelationIds()).toEqual(true);
      expect(d2.hasCorrelationIds()).toEqual(false);
    });
  });
  
  describe('correlationId()', function() {
    it('should return a specific correlationId object', function() {
      const doc: any = { correlationIds: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.correlationId('test1')).toBeInstanceOf(CorrelationId);
      expect(d.correlationId('test1')?.json()).toEqual(doc.correlationIds.test1);
    });
    
    it('should return null if a correlationId name is not provided', function() {
      const doc: any = { correlationIds: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.correlationId(undefined as any)).toEqual(null);
    });
    
    it('should return null if a correlationId name is not found', function() {
      const doc: any = { correlationIds: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.correlationId('not found')).toEqual(null);
    });
  });
  
  describe('operationTraits()', function() {
    it('should return a map of OperationTrait objects', function() {
      const doc = { operationTraits: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(typeof d.operationTraits()).toEqual('object');
      expect(d.operationTraits().test1).toBeInstanceOf(OperationTrait);
      expect(d.operationTraits().test1.json()).toEqual(doc.operationTraits.test1);
      expect(d.operationTraits().test2).toBeInstanceOf(OperationTrait);
      expect(d.operationTraits().test2.json()).toEqual(doc.operationTraits.test2);
    });

    it('should return an empty object if the components field has no defined operationTraits', function() {
      const doc = {};
      const d = new Components(doc);
      expect(typeof d.operationTraits()).toEqual('object');
      expect(d.operationTraits()).toEqual({});
    });
  });

  describe('hasOperationTraits()', function() {
    it('should return a boolean indicating if the components field has operationTraits', function() {
      const doc = { operationTraits: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const docNoSchemas = { messages: {} };
      const d = new Components(doc);
      const d2 = new Components(docNoSchemas);
      expect(d.hasOperationTraits()).toEqual(true);
      expect(d2.hasOperationTraits()).toEqual(false);
    });
  });
  
  describe('operationTrait()', function() {
    it('should return a specific operationTrait object', function() {
      const doc = { operationTraits: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.operationTrait('test1')).toBeInstanceOf(OperationTrait);
      expect(d.operationTrait('test1')?.json()).toEqual(doc.operationTraits.test1);
    });
    
    it('should return null if a operationTrait name is not provided', function() {
      const doc = { operationTraits: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.operationTrait(undefined as any)).toEqual(null);
    });
    
    it('should return null if a operationTrait name is not found', function() {
      const doc = { operationTraits: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.operationTrait('not found')).toEqual(null);
    });
  });
  
  describe('messageTraits()', function() {
    it('should return a map of MessageTrait objects', function() {
      const doc = { messageTraits: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(typeof d.messageTraits()).toEqual('object');
      expect(d.messageTraits().test1).toBeInstanceOf(MessageTrait);
      expect(d.messageTraits().test1.json()).toEqual(doc.messageTraits.test1);
      expect(d.messageTraits().test2).toBeInstanceOf(MessageTrait);
      expect(d.messageTraits().test2.json()).toEqual(doc.messageTraits.test2);
    });

    it('should return an empty object if the components field has no defined messageTraits', function() {
      const doc = {};
      const d = new Components(doc);
      expect(typeof d.messageTraits()).toEqual('object');
      expect(d.messageTraits()).toEqual({});
    });
  });

  describe('hasMessageTraits()', function() {
    it('should return a boolean indicating if the components field has messageTraits', function() {
      const doc = { messageTraits: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const docNoSchemas = { messages: {} };
      const d = new Components(doc);
      const d2 = new Components(docNoSchemas);
      expect(d.hasMessageTraits()).toEqual(true);
      expect(d2.hasMessageTraits()).toEqual(false);
    });
  });
  
  describe('messageTrait()', function() {
    it('should return a specific messageTrait object', function() {
      const doc = { messageTraits: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.messageTrait('test1')).toBeInstanceOf(MessageTrait);
      expect(d.messageTrait('test1').json()).toEqual(doc.messageTraits.test1);
    });
    
    it('should return null if a messageTrait name is not provided', function() {
      const doc = { messageTraits: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.messageTrait(undefined as any)).toEqual(null);
    });
    
    it('should return null if a messageTrait name is not found', function() {
      const doc = { messageTraits: { test1: { test: 'test1' }, test2: { test: 'test2' } } };
      const d = new Components(doc);
      expect(d.messageTrait('not found')).toEqual(null);
    });
  });

  describe('serverVariables()', function() {
    it('should return a map of ServerVariable objects', function() {
      const doc = { serverVariables: { test1: {test: 'test1'}, test2: {test: 'test2'} } };
      const d = new Components(doc);
      expect(typeof d.serverVariables()).toEqual('object');
      expect(d.serverVariables().test1).toBeInstanceOf(ServerVariable);
      expect(d.serverVariables().test1.json()).toEqual(doc.serverVariables.test1);
      expect(d.serverVariables().test2).toBeInstanceOf(ServerVariable);
      expect(d.serverVariables().test2.json()).toEqual(doc.serverVariables.test2);
    });

    it('should return an empty object if the components field has no defined serverVariables', function() {
      const doc = {};
      const d = new Components(doc);
      expect(typeof d.serverVariables()).toEqual('object');
      expect(d.serverVariables()).toEqual({});
    });
  });

  describe('hasServerVariables()', function() {
    it('should return a boolean indicating if the components field has serverVariables', function() {
      const doc = { serverVariables: { test1: {test: 'test1'}, test2: {test: 'test2'} } };
      const docNoSchemas = { servers: {} };
      const d = new Components(doc);
      const d2 = new Components(docNoSchemas);
      expect(d.hasServerVariables()).toEqual(true);
      expect(d2.hasServerVariables()).toEqual(false);
    });
  });

  describe('serverVariable()', function() {
    it('should return a specific serverVariable object', function() {
      const doc = { serverVariables: { test1: {test: 'test1'}, test2: {test: 'test2'} } };
      const d = new Components(doc);
      expect(d.serverVariable('test1')).toBeInstanceOf(ServerVariable);
      expect(d.serverVariable('test1')?.json()).toEqual(doc.serverVariables.test1);
    });

    it('should return null if a serverVariable name is not provided', function() {
      const doc = { serverVariables: { test1: {test: 'test1'}, test2: {test: 'test2'} } };
      const d = new Components(doc);
      expect(d.serverVariable(undefined as any)).toEqual(null);
    });

    it('should return null if a serverVariable name is not found', function() {
      const doc = { serverVariables: { test1: {test: 'test1'}, test2: {test: 'test2'} } };
      const d = new Components(doc);
      expect(d.serverVariable('not found')).toEqual(null);
    });
  });

  assertExtensionsMixin(Components);
});
