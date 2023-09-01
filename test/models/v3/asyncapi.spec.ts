import { AsyncAPIDocument } from '../../../src/models/v3/asyncapi';
import { Channels } from '../../../src/models/v3/channels';
import { Components } from '../../../src/models/v3/components';
import { Info } from '../../../src/models/v3/info';
import { Messages } from '../../../src/models/v3/messages';
import { Operations } from '../../../src/models/v3/operations';
import { Schemas } from '../../../src/models/v3/schemas';
import { SecuritySchemes } from '../../../src/models/v3/security-schemes';
import { Servers } from '../../../src/models/v3/servers';

import { serializeInput, assertExtensions } from './utils';

import type { v3 } from '../../../src/spec-types';
import { Collection } from '../../../src/models';

describe('AsyncAPIDocument model', function() {
  describe('.version()', function() {
    it('should return the value', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({ asyncapi: '2.0.0' });
      const d = new AsyncAPIDocument(doc);
      expect(d.version()).toEqual(doc.asyncapi);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({});
      const d = new AsyncAPIDocument(doc);
      expect(d.version()).toBeUndefined();
    });
  });

  describe('.hasDefaultContentType()', function() {
    it('should return true when there is a value', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({ defaultContentType: '...' });
      const d = new AsyncAPIDocument(doc);
      expect(d.hasDefaultContentType()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({});
      const d = new AsyncAPIDocument(doc);
      expect(d.hasDefaultContentType()).toEqual(false);
    });
  });

  describe('.defaultContentType()', function() {
    it('should return the value', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({ defaultContentType: '...' });
      const d = new AsyncAPIDocument(doc);
      expect(d.defaultContentType()).toEqual(doc.defaultContentType);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({});
      const d = new AsyncAPIDocument(doc);
      expect(d.defaultContentType()).toBeUndefined();
    });
  });

  describe('.info()', function() {
    it('should return an Info object', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({ info: {} });
      const d = new AsyncAPIDocument(doc);
      expect(d.info()).toBeInstanceOf(Info);
    });
  });

  describe('.servers()', function() {
    it('should return a collection of servers', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({ servers: { development: {} } });
      const d = new AsyncAPIDocument(doc);
      expect(d.servers()).toBeInstanceOf(Servers);
      expect(d.servers()).toHaveLength(1);
      expect(d.servers().all()[0].id()).toEqual('development');
    });

    it('should return a collection of servers even if servers are not defined', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({});
      const d = new AsyncAPIDocument(doc);
      expect(d.servers()).toBeInstanceOf(Servers);
    });
  });

  describe('.channels()', function() {
    it('should return a collection of channels', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({ channels: { userSignup: { address: 'user/signup' }, userLogout: { address: 'user/logout' } } });
      const d = new AsyncAPIDocument(doc);
      expect(d.channels()).toBeInstanceOf(Channels);
      expect(d.channels()).toHaveLength(2);
      expect(d.channels().all()[0].address()).toEqual('user/signup');
      expect(d.channels().all()[1].address()).toEqual('user/logout');
    });

    it('should return a collection of channels even if channels are not defined', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({});
      const d = new AsyncAPIDocument(doc);
      expect(d.channels()).toBeInstanceOf(Channels);
    });
  });

  describe('.operations()', function() {
    it('should return a collection of operations', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({ operations: { userSignup: {}, userLogout: {} } });
      const d = new AsyncAPIDocument(doc);
      expect(d.operations()).toBeInstanceOf(Operations);
      expect(d.operations()).toHaveLength(2);
    });

    it('should return a collection of operations even if operations are not defined', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({});
      const d = new AsyncAPIDocument(doc);
      expect(d.operations()).toBeInstanceOf(Operations);
    });
  });

  describe('.messages()', function() {
    it('should return a collection of messages', function() {
      const duplicatedMessage = {};
      const doc = serializeInput<v3.AsyncAPIObject>({ channels: { userSignup: { address: 'user/signup', messages: { someMessage1: {}, someMessage2: duplicatedMessage } }, userLogout: { address: 'user/logout', messages: { someMessage3: duplicatedMessage } } } });
      const d = new AsyncAPIDocument(doc);
      expect(d.messages()).toBeInstanceOf(Messages);
      expect(d.messages()).toHaveLength(2);
    });

    it('should return a collection of messages even if messages are not defined', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({});
      const d = new AsyncAPIDocument(doc);
      expect(d.messages()).toBeInstanceOf(Messages);
    });
  });

  describe('.schemas()', function() {
    it('should return a collection of schemas', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({ channels: { userSignup: { address: 'user/signup', messages: { someMessage1: { payload: {}}, someMessage2: { payload: {} } } }, userLogout: { address: 'user/logout', messages: { someMessage3WithoutPayload: {} } } } });
      const d = new AsyncAPIDocument(doc);
      expect(d.schemas()).toBeInstanceOf(Schemas);
      expect(d.schemas()).toHaveLength(2);
    });

    it('should return only an "used" schemas (without schemas from components)', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({ channels: { userSignup: { address: 'user/signup', messages: { someMessage1: { payload: {}}, someMessage2: { payload: {} } } } }, components: { schemas: { schemaOne: {}, schemaTwo: {} } } });
      const d = new AsyncAPIDocument(doc);
      expect(d.schemas()).toBeInstanceOf(Schemas);
      expect(d.schemas()).toHaveLength(2);
    });

    it('should return a collection of schemas even if collection is empty', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({});
      const d = new AsyncAPIDocument(doc);
      expect(d.schemas()).toBeInstanceOf(Schemas);
    });
  });

  describe('.securitySchemes()', function() {
    it('should return a collection of securitySchemes', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({ components: { securitySchemes: { security1: { type: 'X509' }, security2: { type: 'apiKey' } } } });
      const d = new AsyncAPIDocument(doc);
      expect(d.securitySchemes()).toBeInstanceOf(SecuritySchemes);
      expect(d.securitySchemes()).toHaveLength(2);
    });

    it('should return a collection of securitySchemes even if securitySchemes are not defined', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({});
      const d = new AsyncAPIDocument(doc);
      expect(d.securitySchemes()).toBeInstanceOf(SecuritySchemes);
    });
  });

  describe('.allMessages()', function() {
    it('should return a collection of messages', function() {
      const duplicatedMessage = {};
      const doc = serializeInput<v3.AsyncAPIObject>({ channels: { userSignup: { address: 'user/signup', messages: { someMessage1: {}, someMessage2: duplicatedMessage } }, userLogout: { address: 'user/logout', messages: { someMessage3: duplicatedMessage } } } });
      const d = new AsyncAPIDocument(doc);
      expect(d.allMessages().all()).toBeInstanceOf(Array);
      expect(d.allMessages().all()).not.toBeInstanceOf(Collection);
      expect(d.allMessages()).toBeInstanceOf(Messages);
      expect(d.allMessages()).toHaveLength(2);
    });

    it('should return all messages (with messages from components)', function() {
      const duplicatedMessage = {};
      const doc = serializeInput<v3.AsyncAPIObject>({ channels: { userSignup: { address: 'user/signup', messages: { someMessage1: {}, someMessage2: duplicatedMessage } }, userLogout: { address: 'user/logout', messages: { someMessage3: duplicatedMessage } } }, components: { messages: { someMessage4: {}, someMessage5: {} } }});
      const d = new AsyncAPIDocument(doc);
      expect(d.allMessages()).toBeInstanceOf(Messages);
      expect(d.allMessages()).toHaveLength(4);
    });

    it('should return a collection of messages even if messages are not defined', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({});
      const d = new AsyncAPIDocument(doc);
      expect(d.allMessages()).toBeInstanceOf(Messages);
    });
  });

  describe('.allSchemas()', function() {
    it('should return a collection of schemas', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({ channels: { userSignup: { address: 'user/signup', messages: { someMessage1: { payload: {}}, someMessage2: { payload: {} } } }, userLogout: { address: 'user/logout', messages: { someMessage3WithoutPayload: {} } } } });
      const d = new AsyncAPIDocument(doc);
      expect(d.allSchemas()).toBeInstanceOf(Schemas);
      expect(d.allSchemas().all()).toBeInstanceOf(Array);
      expect(d.allSchemas().all()).not.toBeInstanceOf(Collection);
      expect(d.allSchemas()).toHaveLength(2);
    });

    it('should return all schemas (with schemas from components)', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({ channels: { userSignup: { address: 'user/signup', messages: { someMessage1: { payload: {}}, someMessage2: { payload: {} } } } }, components: { schemas: { schemaOne: {}, schemaTwo: {} } } });
      const d = new AsyncAPIDocument(doc);
      expect(d.allSchemas()).toBeInstanceOf(Schemas);
      expect(d.allSchemas()).toHaveLength(4);
    });

    it('should return a collection of schemas even if collection is empty', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({});
      const d = new AsyncAPIDocument(doc);
      expect(d.allSchemas()).toBeInstanceOf(Schemas);
    });
  });

  describe('.allServers()', function() {
    it('should return a collection of servers', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({ servers: { development: {} } });
      const d = new AsyncAPIDocument(doc);
      expect(d.allServers()).toBeInstanceOf(Servers);
      expect(d.allServers().all()).toBeInstanceOf(Array);
      expect(d.allServers().all()).not.toBeInstanceOf(Collection);
      expect(d.allServers()).toHaveLength(1);
      expect(d.allServers().all()[0].id()).toEqual('development');
    });

    it('should return all servers (with servers from components)', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({ servers: { production: {} }, components: { servers: { development: {} } } });
      const d = new AsyncAPIDocument(doc);
      expect(d.allServers()).toBeInstanceOf(Servers);
      expect(d.allServers()).toHaveLength(2);
    });

    it('should return a collection of servers even if servers are not defined', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({});
      const d = new AsyncAPIDocument(doc);
      expect(d.allServers()).toBeInstanceOf(Servers);
    });
  });

  describe('.allChannels()', function() {
    it('should return a collection of channels', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({ channels: { 'user/signup': {} } });
      const d = new AsyncAPIDocument(doc);
      expect(d.allChannels()).toBeInstanceOf(Channels);
      expect(d.allChannels().all()).not.toBeInstanceOf(Collection);
      expect(d.allChannels().all()).toBeInstanceOf(Array);
      expect(d.allChannels()).toHaveLength(1);
    });

    it('should return all channels (with channels from components)', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({ channels: { 'user/signup': {} }, components: { channels: { someChannel1: {}, someChannel2: {} } } });
      const d = new AsyncAPIDocument(doc);
      expect(d.allChannels()).toBeInstanceOf(Channels);
      expect(d.allChannels()).toHaveLength(3);
    });

    it('should return a collection of channels even if channels are not defined', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({});
      const d = new AsyncAPIDocument(doc);
      expect(d.allChannels()).toBeInstanceOf(Channels);
    });
  });

  describe('.allOperations()', function() {
    it('should return a collection of operations', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({ operations: { userSignup: {}, userLogout: {} } });
      const d = new AsyncAPIDocument(doc);
      expect(d.allOperations()).toBeInstanceOf(Operations);
      expect(d.allOperations().all()).toBeInstanceOf(Array);
      expect(d.allOperations().all()).not.toBeInstanceOf(Collection);
      expect(d.allOperations()).toHaveLength(2);
    });

    it('should return all operations (with operations from components)', function() {
      const duplicatedOperation = { };
      const doc = serializeInput<v3.AsyncAPIObject>({ operations: { userSignup: duplicatedOperation, userLogout: {} }, components: { operations: { someOperation1: duplicatedOperation, someOperation2: {} } } });
      const d = new AsyncAPIDocument(doc);
      expect(d.allOperations()).toBeInstanceOf(Operations);
      expect(d.allOperations()).toHaveLength(3);
    });

    it('should return a collection of operations even if operations are not defined', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({});
      const d = new AsyncAPIDocument(doc);
      expect(d.allOperations()).toBeInstanceOf(Operations);
    });
  });
  
  describe('.components()', function() {
    it('should return a components model', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({ components: {} });
      const d = new AsyncAPIDocument(doc);
      expect(d.components()).toBeInstanceOf(Components);
    });

    it('should return a components model even if components are not defined', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({});
      const d = new AsyncAPIDocument(doc);
      expect(d.components()).toBeInstanceOf(Components);
    });
  });

  describe('mixins', function() {
    assertExtensions(AsyncAPIDocument);
  });
});
