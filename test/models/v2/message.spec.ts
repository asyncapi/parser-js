import { Channels } from '../../../src/models/channels';
import { Channel } from '../../../src/models/v2/channel';
import { Message } from '../../../src/models/v2/message';
import { MessageTraits } from '../../../src/models/message-traits';
import { MessageTrait } from '../../../src/models/v2/message-trait';
import { Operations } from '../../../src/models/operations';
import { Operation } from '../../../src/models/v2/operation';
import { Schema } from '../../../src/models/v2/schema';
import { Servers } from '../../../src/models/servers';
import { Server } from '../../../src/models/v2/server';

import { assertBindings, assertDescription, assertExtensions, assertExternalDocumentation, assertTags } from './utils';

describe('Message model', function() {
  describe('.id()', function() {
    it('should return id of model', function() {
      const doc = {};
      const d = new Message(doc, { asyncapi: {} as any, pointer: '', id: 'message' });
      expect(d.id()).toEqual('message');
    });

    it('should reuse messageId', function() {
      const doc = { messageId: '...' };
      const d = new Message(doc);
      expect(d.id()).toEqual(doc.messageId);
    });
  });

  describe('.schemaFormat()', function() {
    it('should return defined schemaFormat', function() {
      const doc = { schemaFormat: 'customSchemaFormat' };
      const d = new Message(doc, { asyncapi: {} as any, pointer: '', id: 'message' });
      expect(d.schemaFormat()).toEqual('customSchemaFormat');
    });

    it('should return default schemaFormat if schemaFormat field is absent', function() {
      const doc = {};
      const d = new Message(doc, { asyncapi: { semver: { version: '2.0.0' } } as any, pointer: '', id: 'message' });
      expect(d.schemaFormat()).toEqual('application/vnd.aai.asyncapi;version=2.0.0');
    });
  });

  describe('.hasPayload()', function() {
    it('should return true when there is a value', function() {
      const doc = { payload: {} };
      const d = new Message(doc);
      expect(d.hasPayload()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = {};
      const d = new Message(doc);
      expect(d.hasPayload()).toEqual(false);
    });
  });

  describe('.payload()', function() {
    it('should return the value', function() {
      const doc = { payload: {} };
      const d = new Message(doc);
      expect(d.payload()).toBeInstanceOf(Schema);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = {};
      const d = new Message(doc);
      expect(d.payload()).toBeUndefined();
    });
  });

  describe('.servers()', function() {
    it('should return collection of servers - available on all servers', function() {
      const doc = {};
      const d = new Message(doc, { asyncapi: { parsed: { servers: { production: {}, development: {} }, channels: { 'user/signup': { publish: { message: doc } } } } } as any, pointer: '', id: 'message' });
      expect(d.servers()).toBeInstanceOf(Servers);
      expect(d.servers().all()).toHaveLength(2);
      expect(d.servers().all()[0]).toBeInstanceOf(Server);
      expect(d.servers().all()[0].id()).toEqual('production');
      expect(d.servers().all()[1]).toBeInstanceOf(Server);
      expect(d.servers().all()[1].id()).toEqual('development');
    });

    it('should return collection of servers - available on selected servers', function() {
      const doc = {};
      const d = new Message(doc, { asyncapi: { parsed: { servers: { production: {}, development: {} }, channels: { 'user/signup': { publish: { message: doc }, servers: ['production'] } } } } as any, pointer: '', id: 'message' });
      expect(d.servers()).toBeInstanceOf(Servers);
      expect(d.servers().all()).toHaveLength(1);
      expect(d.servers().all()[0]).toBeInstanceOf(Server);
      expect(d.servers().all()[0].id()).toEqual('production');
    });

    it('should return collection of servers - do not duplicate servers', function() {
      const doc = {};
      const d = new Message(doc, { asyncapi: { parsed: { servers: { production: {}, development: {} }, channels: { 'user/signup': { publish: { message: doc }, subscribe: { message: doc }, servers: ['production'] } } } } as any, pointer: '', id: 'message' });
      expect(d.servers()).toBeInstanceOf(Servers);
      expect(d.servers().all()).toHaveLength(1);
      expect(d.servers().all()[0]).toBeInstanceOf(Server);
      expect(d.servers().all()[0].id()).toEqual('production');
    });
  });

  describe('.channels()', function() {
    it('should return collection of channels - single channel', function() {
      const doc = {};
      const d = new Message(doc, { asyncapi: { parsed: { channels: { 'user/signup': { publish: { message: doc } } } } } as any, pointer: '', id: 'message' });
      expect(d.channels()).toBeInstanceOf(Channels);
      expect(d.channels().all()).toHaveLength(1);
      expect(d.channels().all()[0]).toBeInstanceOf(Channel);
      expect(d.channels().all()[0].address()).toEqual('user/signup');
    });

    it('should return collection of channels - multiple channels', function() {
      const doc = {};
      const d = new Message(doc, { asyncapi: { parsed: { channels: { 'user/signup': { publish: { message: doc } }, 'user/logout': { subscribe: { message: doc } } } } } as any, pointer: '', id: 'message' });
      expect(d.channels()).toBeInstanceOf(Channels);
      expect(d.channels().all()).toHaveLength(2);
      expect(d.channels().all()[0]).toBeInstanceOf(Channel);
      expect(d.channels().all()[0].address()).toEqual('user/signup');
      expect(d.channels().all()[1]).toBeInstanceOf(Channel);
      expect(d.channels().all()[1].address()).toEqual('user/logout');
    });

    it('should return collection of channels - do not duplicate channels', function() {
      const doc = {};
      const d = new Message(doc, { asyncapi: { parsed: { channels: { 'user/signup': { publish: { message: doc }, subscribe: { message: doc } } } } } as any, pointer: '', id: 'message' });
      expect(d.channels()).toBeInstanceOf(Channels);
      expect(d.channels().all()).toHaveLength(1);
      expect(d.channels().all()[0]).toBeInstanceOf(Channel);
      expect(d.channels().all()[0].address()).toEqual('user/signup');
    });
  });

  describe('.operations()', function() {
    it('should return collection of operations - single operation', function() {
      const doc = {};
      const d = new Message(doc, { asyncapi: { parsed: { channels: { 'user/signup': { publish: { message: doc } } } } } as any, pointer: '', id: 'message' });
      expect(d.operations()).toBeInstanceOf(Operations);
      expect(d.operations().all()).toHaveLength(1);
      expect(d.operations().all()[0]).toBeInstanceOf(Operation);
      expect(d.operations().all()[0].action()).toEqual('publish');
    });

    it('should return collection of operations - multiple operations', function() {
      const doc = {};
      const d = new Message(doc, { asyncapi: { parsed: { channels: { 'user/signup': { publish: { message: doc }, subscribe: { message: doc } } } } } as any, pointer: '', id: 'message' });
      expect(d.operations()).toBeInstanceOf(Operations);
      expect(d.operations().all()).toHaveLength(2);
      expect(d.operations().all()[0]).toBeInstanceOf(Operation);
      expect(d.operations().all()[0].action()).toEqual('subscribe');
      expect(d.operations().all()[1]).toBeInstanceOf(Operation);
      expect(d.operations().all()[1].action()).toEqual('publish');
    });

    it('should return collection of operations - multiple operations on different channels', function() {
      const doc = {};
      const d = new Message(doc, { asyncapi: { parsed: { channels: { 'user/signup': { publish: { message: doc } }, 'user/logout': { subscribe: { message: doc } } } } } as any, pointer: '', id: 'message' });
      expect(d.operations()).toBeInstanceOf(Operations);
      expect(d.operations().all()).toHaveLength(2);
      expect(d.operations().all()[0]).toBeInstanceOf(Operation);
      expect(d.operations().all()[0].action()).toEqual('publish');
      expect(d.operations().all()[1]).toBeInstanceOf(Operation);
      expect(d.operations().all()[1].action()).toEqual('subscribe');
    });
  });

  describe('.traits()', function() {
    it('should return collection of traits', function() {
      const doc = { traits: [{ messageId: '...' }] };
      const d = new Message(doc);
      expect(d.traits()).toBeInstanceOf(MessageTraits);
      expect(d.traits().all()).toHaveLength(1);
      expect(d.traits().all()[0]).toBeInstanceOf(MessageTrait);
    });
    
    it('should return collection of traits when value is undefined', function() {
      const doc = {};
      const d = new Message(doc);
      expect(d.traits()).toBeInstanceOf(MessageTraits);
      expect(d.traits().all()).toHaveLength(0);
    });
  });

  describe('mixins', function() {
    assertBindings(MessageTrait);
    assertDescription(MessageTrait);
    assertExtensions(MessageTrait);
    assertExternalDocumentation(MessageTrait);
    assertTags(MessageTrait);
  });
});
