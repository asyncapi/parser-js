import { Channels } from '../../../src/models/channels';
import { Channel } from '../../../src/models/v2/channel';
import { Operation } from '../../../src/models/v2/operation';
import { OperationTraits } from '../../../src/models/operation-traits';
import { OperationTrait } from '../../../src/models/v2/operation-trait';
import { Messages } from '../../../src/models/messages';
import { Message } from '../../../src/models/v2/message';
import { Servers } from '../../../src/models/servers';
import { Server } from '../../../src/models/v2/server';

import { assertCoreModel } from './utils';

describe('Operation model', function() {
  describe('.id()', function() {
    it('should return operationId', function() {
      const doc = { operationId: '...' };
      const d = new Operation(doc);
      expect(d.id()).toEqual(doc.operationId);
    });
  });

  describe('.action()', function() {
    it('should return kind/action of operation', function() {
      const doc = {};
      const d = new Operation(doc, { asyncapi: {} as any, pointer: '', id: 'trait', action: 'publish' });
      expect(d.action()).toEqual('publish');
    });
  });

  describe('.isSend()', function() {
    it('should return true when operation is subscribe', function() {
      const doc = {};
      const d = new Operation(doc, { asyncapi: {} as any, pointer: '', id: 'trait', action: 'subscribe' });
      expect(d.isSend()).toBeTruthy();
    });

    it('should return false when operation is publish', function() {
      const doc = {};
      const d = new Operation(doc, { asyncapi: {} as any, pointer: '', id: 'trait', action: 'publish' });
      expect(d.isSend()).toBeFalsy();
    });
  });

  describe('.isReceive()', function() {
    it('should return true when operation is publish', function() {
      const doc = {};
      const d = new Operation(doc, { asyncapi: {} as any, pointer: '', id: 'trait', action: 'publish' });
      expect(d.isReceive()).toBeTruthy();
    });

    it('should return false when operation is subscribe', function() {
      const doc = {};
      const d = new Operation(doc, { asyncapi: {} as any, pointer: '', id: 'trait', action: 'subscribe' });
      expect(d.isReceive()).toBeFalsy();
    });
  });

  describe('.servers()', function() {
    it('should return collection of servers - channel available on all servers', function() {
      const doc = {};
      const d = new Operation(doc, { asyncapi: { parsed: { servers: { production: {}, development: {} }, channels: { 'user/signup': { publish: doc } } } } as any, pointer: '', id: 'operation', action: 'publish' });
      expect(d.servers()).toBeInstanceOf(Servers);
      expect(d.servers().all()).toHaveLength(2);
      expect(d.servers().all()[0]).toBeInstanceOf(Server);
      expect(d.servers().all()[0].id()).toEqual('production');
      expect(d.servers().all()[1]).toBeInstanceOf(Server);
      expect(d.servers().all()[1].id()).toEqual('development');
    });

    it('should return collection of servers - channel available on selected servers', function() {
      const doc = {};
      const d = new Operation(doc, { asyncapi: { parsed: { servers: { production: {}, development: {} }, channels: { 'user/signup': { publish: doc, servers: ['production'] } } } } as any, pointer: '', id: 'operation', action: 'publish' });
      expect(d.servers()).toBeInstanceOf(Servers);
      expect(d.servers().all()).toHaveLength(1);
      expect(d.servers().all()[0]).toBeInstanceOf(Server);
      expect(d.servers().all()[0].id()).toEqual('production');
    });

    it('should return collection of servers - do not duplicate servers', function() {
      const doc = {};
      const d = new Operation(doc, { asyncapi: { parsed: { servers: { production: {}, development: {} }, channels: { 'user/signup': { publish: doc, servers: ['production'] }, 'user/logout': { subscribe: doc } } } } as any, pointer: '', id: 'operation', action: 'publish' });
      expect(d.servers()).toBeInstanceOf(Servers);
      expect(d.servers().all()).toHaveLength(2);
      expect(d.servers().all()[0]).toBeInstanceOf(Server);
      expect(d.servers().all()[0].id()).toEqual('production');
      expect(d.servers().all()[1]).toBeInstanceOf(Server);
      expect(d.servers().all()[1].id()).toEqual('development');
    });
  });

  describe('.channels()', function() {
    it('should return collection of channels - single channel', function() {
      const doc = {};
      const d = new Operation(doc, { asyncapi: { parsed: { channels: { 'user/signup': { publish: doc } } } } as any, pointer: '', id: 'operation', action: 'publish' });
      expect(d.channels()).toBeInstanceOf(Channels);
      expect(d.channels().all()).toHaveLength(1);
      expect(d.channels().all()[0]).toBeInstanceOf(Channel);
      expect(d.channels().all()[0].address()).toEqual('user/signup');
    });

    it('should return collection of channels - multiple channels', function() {
      const doc = {};
      const d = new Operation(doc, { asyncapi: { parsed: { channels: { 'user/signup': { publish: doc }, 'user/logout': { subscribe: doc } } } } as any, pointer: '', id: 'operation', action: 'publish' });
      expect(d.channels()).toBeInstanceOf(Channels);
      expect(d.channels().all()).toHaveLength(2);
      expect(d.channels().all()[0]).toBeInstanceOf(Channel);
      expect(d.channels().all()[0].address()).toEqual('user/signup');
      expect(d.channels().all()[1]).toBeInstanceOf(Channel);
      expect(d.channels().all()[1].address()).toEqual('user/logout');
    });

    it('should return collection of channels - do not duplicate channels', function() {
      const doc = {};
      const d = new Operation(doc, { asyncapi: { parsed: { channels: { 'user/signup': { publish: doc, subscribe: doc } } } } as any, pointer: '', id: 'operation', action: 'publish' });
      expect(d.channels()).toBeInstanceOf(Channels);
      expect(d.channels().all()).toHaveLength(1);
      expect(d.channels().all()[0]).toBeInstanceOf(Channel);
      expect(d.channels().all()[0].address()).toEqual('user/signup');
    });
  });

  describe('.messages()', function() {
    it('should return collection of messages - single message', function() {
      const doc = { message: { messageId: '...' } };
      const d = new Operation(doc);
      expect(d.messages()).toBeInstanceOf(Messages);
      expect(d.messages().all()).toHaveLength(1);
      expect(d.messages().all()[0]).toBeInstanceOf(Message);
    });

    it('should return collection of messages - oneOf messages', function() {
      const doc = { message: { oneOf: [{ messageId: '...' }, { messageId: '...' }] } };
      const d = new Operation(doc);
      expect(d.messages()).toBeInstanceOf(Messages);
      expect(d.messages().all()).toHaveLength(2);
      expect(d.messages().all()[0]).toBeInstanceOf(Message);
      expect(d.messages().all()[1]).toBeInstanceOf(Message);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = {};
      const d = new Operation(doc);
      expect(d.messages()).toBeInstanceOf(Messages);
      expect(d.messages().all()).toHaveLength(0);
    });
  });

  describe('.reply()', function() {
    it('should return undefined', function() {
      const doc = {};
      const d = new Operation(doc);
      expect(d.reply()).toBeUndefined();
    });
  });

  describe('.traits()', function() {
    it('should return collection of traits', function() {
      const doc = { traits: [{ operationId: '...' }] };
      const d = new Operation(doc);
      expect(d.traits()).toBeInstanceOf(OperationTraits);
      expect(d.traits().all()).toHaveLength(1);
      expect(d.traits().all()[0]).toBeInstanceOf(OperationTrait);
    });
    
    it('should return collection of traits when value is undefined', function() {
      const doc = {};
      const d = new Operation(doc);
      expect(d.traits()).toBeInstanceOf(OperationTraits);
      expect(d.traits().all()).toHaveLength(0);
    });
  });

  describe('mixins', function() {
    assertCoreModel(Operation);
  });
});
