import { Channel } from '../../../src/models/v3/channel';
import { ChannelParameters } from '../../../src/models/v3/channel-parameters';
import { ChannelParameter } from '../../../src/models/v3/channel-parameter';
import { Operations } from '../../../src/models/v3/operations';
import { Operation } from '../../../src/models/v3/operation';
import { Messages } from '../../../src/models/v3/messages';
import { Message } from '../../../src/models/v3/message';
import { Servers } from '../../../src/models/v3/servers';
import { Server } from '../../../src/models/v3/server';

import { serializeInput, assertCoreModel } from './utils';

import type { v3 } from '../../../src/spec-types';

describe('Channel model', function() {
  describe('.id()', function() {
    it('should return id of model', function() {
      const doc = serializeInput<v3.ChannelObject>({});
      const d = new Channel(doc, { asyncapi: {} as any, pointer: '', id: 'channel' });
      expect(d.id()).toEqual('channel');
    });
  });

  describe('.address()', function() {
    it('should return the value', function() {
      const doc = serializeInput<v3.ChannelObject>({ address: 'user/signup' });
      const d = new Channel(doc, { asyncapi: {} as any, pointer: '', id: 'channel' });
      expect(d.address()).toEqual('user/signup');
    });
  });

  describe('.servers()', function() {
    it('should return collection of servers - available on all servers', function() {
      const doc = serializeInput<v3.ChannelObject>({});
      const d = new Channel(doc, { asyncapi: { parsed: { servers: { someServer1: {}, someServer2: {}, } } } as any, pointer: '', id: 'channel' });
      expect(d.servers()).toBeInstanceOf(Servers);
      expect(d.servers().all()).toHaveLength(2);
      expect(d.servers().all()[0]).toBeInstanceOf(Server);
      expect(d.servers().all()[0].id()).toEqual('someServer1');
      expect(d.servers().all()[1]).toBeInstanceOf(Server);
      expect(d.servers().all()[1].id()).toEqual('someServer2');
    });

    it('should return collection of servers - available on all servers (empty servers array)', function() {
      const doc = serializeInput<v3.ChannelObject>({ servers: [] });
      const d = new Channel(doc, { asyncapi: { parsed: { servers: { someServer1: {}, someServer2: {}, } } } as any, pointer: '', id: 'channel' });
      expect(d.servers()).toBeInstanceOf(Servers);
      expect(d.servers().all()).toHaveLength(2);
      expect(d.servers().all()[0]).toBeInstanceOf(Server);
      expect(d.servers().all()[0].id()).toEqual('someServer1');
      expect(d.servers().all()[1]).toBeInstanceOf(Server);
      expect(d.servers().all()[1].id()).toEqual('someServer2');
    });

    it('should return collection of servers - available only on particular ones', function() {
      const someServer2 = {};
      const doc = serializeInput<v3.ChannelObject>({ servers: [someServer2] });
      const d = new Channel(doc, { asyncapi: { parsed: { servers: { someServer1: {}, someServer2, } } } as any, pointer: '', id: 'channel' });
      expect(d.servers()).toBeInstanceOf(Servers);
      expect(d.servers().all()).toHaveLength(1);
      expect(d.servers().all()[0]).toBeInstanceOf(Server);
      expect(d.servers().all()[0].id()).toEqual('someServer2');
    });
  });

  describe('.operations()', function() {
    it('should return collection of operations - send operation', function() {
      const channel = {};
      const d = new Channel(channel, { asyncapi: { parsed: { operations: { someOperation: { action: 'send', channel } } } } } as any);
      expect(d.operations()).toBeInstanceOf(Operations);
      expect(d.operations().all()).toHaveLength(1);
      expect(d.operations().all()[0]).toBeInstanceOf(Operation);
      expect(d.operations().all()[0].action()).toEqual('send');
    });
    
    it('should return collection of operations - receive operation', function() {
      const channel = {};
      const d = new Channel(channel, { asyncapi: { parsed: { operations: { someOperation: { action: 'receive', channel } } } } } as any);
      expect(d.operations()).toBeInstanceOf(Operations);
      expect(d.operations().all()).toHaveLength(1);
      expect(d.operations().all()[0]).toBeInstanceOf(Operation);
      expect(d.operations().all()[0].action()).toEqual('receive');
    });

    it('should return collection of operations - more than one operations', function() {
      const channel = {};
      const d = new Channel(channel, { asyncapi: { parsed: { operations: { someOperation1: { action: 'send', channel }, someOperation2: { action: 'receive', channel }, someOperation3: { action: 'send', channel } } } } } as any);
      expect(d.operations()).toBeInstanceOf(Operations);
      expect(d.operations().all()).toHaveLength(3);
      expect(d.operations().all()[0]).toBeInstanceOf(Operation);
      expect(d.operations().all()[0].action()).toEqual('send');
      expect(d.operations().all()[1]).toBeInstanceOf(Operation);
      expect(d.operations().all()[1].action()).toEqual('receive');
      expect(d.operations().all()[2]).toBeInstanceOf(Operation);
      expect(d.operations().all()[2].action()).toEqual('send');
    });
  });

  describe('.messages()', function() {
    it('should return collection of messages - single message', function() {
      const doc = serializeInput<v3.ChannelObject>({ messages: { someMessage: {} } });
      const d = new Channel(doc);
      const msg = doc.messages?.['someMessage'] as v3.MessageObject;
      expect(d.messages()).toBeInstanceOf(Messages);
      expect(d.messages().all()).toHaveLength(1);
      expect(d.messages().all()[0]).toBeInstanceOf(Message);
      expect(d.messages().all()[0].id()).toEqual('someMessage');
    });
    
    it('should return collection of messages - more than one messages', function() {
      const doc = serializeInput<v3.ChannelObject>({ messages: { someMessage1: {}, someMessage2: {} } });
      const d = new Channel(doc);
      const msg1 = doc.messages?.['someMessage1'] as v3.MessageObject;
      const msg2 = doc.messages?.['someMessage2'] as v3.MessageObject;
      expect(d.messages()).toBeInstanceOf(Messages);
      expect(d.messages().all()).toHaveLength(2);
      expect(d.messages().all()[0]).toBeInstanceOf(Message);
      expect(d.messages().all()[0].id()).toEqual('someMessage1');
      expect(d.messages().all()[1]).toBeInstanceOf(Message);
      expect(d.messages().all()[1].id()).toEqual('someMessage2');
    });
  });

  describe('.parameters()', function() {
    it('should return collection of channel parameters', function() {
      const doc = serializeInput<v3.ChannelObject>({ parameters: { parameter1: {}, parameter2: {} } });
      const d = new Channel(doc);
      expect(d.parameters()).toBeInstanceOf(ChannelParameters);
      expect(d.parameters().all()).toHaveLength(2);
      expect(d.parameters().all()[0]).toBeInstanceOf(ChannelParameter);
      expect(d.parameters().all()[0].id()).toEqual('parameter1');
      expect(d.parameters().all()[1]).toBeInstanceOf(ChannelParameter);
      expect(d.parameters().all()[1].id()).toEqual('parameter2');
    });
  });

  describe('mixins', function() {
    assertCoreModel(Channel);
  });
});
