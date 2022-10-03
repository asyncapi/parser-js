import { Channel } from '../../../src/models/v2/channel';
import { ChannelParameters } from '../../../src/models/v2/channel-parameters';
import { ChannelParameter } from '../../../src/models/v2/channel-parameter';
import { Operations } from '../../../src/models/v2/operations';
import { Operation } from '../../../src/models/v2/operation';
import { Messages } from '../../../src/models/v2/messages';
import { Message } from '../../../src/models/v2/message';
import { Servers } from '../../../src/models/v2/servers';
import { Server } from '../../../src/models/v2/server';

import { serializeInput, assertBindings, assertDescription, assertExtensions } from './utils';

import type { v2 } from '../../../src/spec-types';

describe('Channel model', function() {
  describe('.id()', function() {
    it('should return id of model', function() {
      const doc = serializeInput<v2.ChannelObject>({});
      const d = new Channel(doc, { asyncapi: {} as any, pointer: '', id: 'channel', address: '' });
      expect(d.id()).toEqual('channel');
    });
  });

  describe('.address()', function() {
    it('should return the value', function() {
      const doc = serializeInput<v2.ChannelObject>({});
      const d = new Channel(doc, { asyncapi: {} as any, pointer: '', id: 'channel', address: 'user/signup' });
      expect(d.address()).toEqual('user/signup');
    });
  });

  describe('.servers()', function() {
    it('should return collection of servers - available on all servers', function() {
      const doc = serializeInput<v2.ChannelObject>({});
      const d = new Channel(doc, { asyncapi: { parsed: { servers: { someServer1: {}, someServer2: {}, } } } as any, pointer: '', id: 'channel', address: 'user/signup' });
      expect(d.servers()).toBeInstanceOf(Servers);
      expect(d.servers().all()).toHaveLength(2);
      expect(d.servers().all()[0]).toBeInstanceOf(Server);
      expect(d.servers().all()[0].id()).toEqual('someServer1');
      expect(d.servers().all()[1]).toBeInstanceOf(Server);
      expect(d.servers().all()[1].id()).toEqual('someServer2');
    });

    it('should return collection of servers - available on all servers (empty servers array)', function() {
      const doc = serializeInput<v2.ChannelObject>({ servers: [] });
      const d = new Channel(doc, { asyncapi: { parsed: { servers: { someServer1: {}, someServer2: {}, } } } as any, pointer: '', id: 'channel', address: 'user/signup' });
      expect(d.servers()).toBeInstanceOf(Servers);
      expect(d.servers().all()).toHaveLength(2);
      expect(d.servers().all()[0]).toBeInstanceOf(Server);
      expect(d.servers().all()[0].id()).toEqual('someServer1');
      expect(d.servers().all()[1]).toBeInstanceOf(Server);
      expect(d.servers().all()[1].id()).toEqual('someServer2');
    });

    it('should return collection of servers - available only on particular ones', function() {
      const doc = serializeInput<v2.ChannelObject>({ servers: ['someServer2'] });
      const d = new Channel(doc, { asyncapi: { parsed: { servers: { someServer1: {}, someServer2: {}, } } } as any, pointer: '', id: 'channel', address: 'user/signup' });
      expect(d.servers()).toBeInstanceOf(Servers);
      expect(d.servers().all()).toHaveLength(1);
      expect(d.servers().all()[0]).toBeInstanceOf(Server);
      expect(d.servers().all()[0].id()).toEqual('someServer2');
    });
  });

  describe('.operations()', function() {
    it('should return collection of operations - publish operation', function() {
      const doc = serializeInput<v2.ChannelObject>({ publish: {} });
      const d = new Channel(doc);
      expect(d.operations()).toBeInstanceOf(Operations);
      expect(d.operations().all()).toHaveLength(1);
      expect(d.operations().all()[0]).toBeInstanceOf(Operation);
      expect(d.operations().all()[0].action()).toEqual('publish');
    });
    
    it('should return collection of operations - subscribe operation', function() {
      const doc = serializeInput<v2.ChannelObject>({ subscribe: {} });
      const d = new Channel(doc);
      expect(d.operations()).toBeInstanceOf(Operations);
      expect(d.operations().all()).toHaveLength(1);
      expect(d.operations().all()[0]).toBeInstanceOf(Operation);
      expect(d.operations().all()[0].action()).toEqual('subscribe');
    });

    it('should return collection of operations - both operations', function() {
      const doc = serializeInput<v2.ChannelObject>({ publish: {}, subscribe: {} });
      const d = new Channel(doc);
      expect(d.operations()).toBeInstanceOf(Operations);
      expect(d.operations().all()).toHaveLength(2);
      expect(d.operations().all()[0]).toBeInstanceOf(Operation);
      expect(d.operations().all()[0].action()).toEqual('publish');
      expect(d.operations().all()[1]).toBeInstanceOf(Operation);
      expect(d.operations().all()[1].action()).toEqual('subscribe');
    });
  });

  describe('.messages()', function() {
    it('should return collection of messages - single message', function() {
      const doc = serializeInput<v2.ChannelObject>({ publish: { message: { messageId: '...' } } });
      const d = new Channel(doc);
      expect(d.messages()).toBeInstanceOf(Messages);
      expect(d.messages().all()).toHaveLength(1);
      expect(d.messages().all()[0]).toBeInstanceOf(Message);
      expect(d.messages().all()[0].messageId()).toEqual((doc as any).publish.message.messageId);
    });
    
    it('should return collection of messages - oneOf message', function() {
      const doc = serializeInput<v2.ChannelObject>({ subscribe: { message: { oneOf: [{ messageId: '1' }, { messageId: '2' }] } } });
      const d = new Channel(doc);
      expect(d.messages()).toBeInstanceOf(Messages);
      expect(d.messages().all()).toHaveLength(2);
      expect(d.messages().all()[0]).toBeInstanceOf(Message);
      expect(d.messages().all()[0].messageId()).toEqual((doc as any).subscribe.message.oneOf[0].messageId);
      expect(d.messages().all()[1]).toBeInstanceOf(Message);
      expect(d.messages().all()[1].messageId()).toEqual((doc as any).subscribe.message.oneOf[1].messageId);
    });

    it('should return collection of messages - single message and oneOf', function() {
      const doc = serializeInput<v2.ChannelObject>({ publish: { message: {} }, subscribe: { message: { oneOf: [{ messageId: '1' }, { messageId: '2' }] } } });
      const d = new Channel(doc);
      expect(d.messages()).toBeInstanceOf(Messages);
      expect(d.messages().all()).toHaveLength(3);
    });
  });

  describe('.parameters()', function() {
    it('should return collection of channel parameters', function() {
      const doc = serializeInput<v2.ChannelObject>({ parameters: { parameter1: {}, parameter2: {} } });
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
    assertBindings(Channel);
    assertDescription(Channel);
    assertExtensions(Channel);
  });
});
