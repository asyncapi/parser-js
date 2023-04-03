import { Channels } from '../../../src/models/channels';
import { Channel } from '../../../src/models/v3/channel';
import { Operation } from '../../../src/models/v3/operation';
import { OperationTraits } from '../../../src/models/operation-traits';
import { OperationTrait } from '../../../src/models/v3/operation-trait';
import { OperationReply } from '../../../src/models/v3/operation-reply';
import { Messages } from '../../../src/models/messages';
import { Message } from '../../../src/models/v3/message';
import { Servers } from '../../../src/models/servers';
import { Server } from '../../../src/models/v3/server';

import { assertCoreModel } from './utils';

describe('Operation model', function() {
  describe('.id()', function() {
    it('should return operationId', function() {
      const d = new Operation({ action: 'send', channel: {} }, { asyncapi: {} as any, pointer: '', id: 'operation' });
      expect(d.id()).toEqual('operation');
    });
  });

  describe('.action()', function() {
    it('should return kind/action of operation', function() {
      const d = new Operation({ action: 'send', channel: {} }, { asyncapi: {} as any, pointer: '', id: 'operation' });
      expect(d.action()).toEqual('send');
    });
  });

  describe('.isSend()', function() {
    it('should return true when operation has send action', function() {
      const d = new Operation({ action: 'send', channel: {} }, { asyncapi: {} as any, pointer: '', id: 'operation' });
      expect(d.isSend()).toBeTruthy();
    });

    it('should return false when operation has receive action', function() {
      const doc = {};
      const d = new Operation({ action: 'receive', channel: {} }, { asyncapi: {} as any, pointer: '', id: 'operation' });
      expect(d.isSend()).toBeFalsy();
    });
  });

  describe('.isReceive()', function() {
    it('should return true when operation has receive action', function() {
      const doc = {};
      const d = new Operation({ action: 'receive', channel: {} }, { asyncapi: {} as any, pointer: '', id: 'operation' });
      expect(d.isReceive()).toBeTruthy();
    });

    it('should return false when operation has send action', function() {
      const doc = {};
      const d = new Operation({ action: 'send', channel: {} }, { asyncapi: {} as any, pointer: '', id: 'operation' });
      expect(d.isReceive()).toBeFalsy();
    });
  });

  describe('.servers()', function() {
    it('should return collection of servers - channel available on all servers', function() {
      const channel = {};
      const d = new Operation({ action: 'send', channel }, { asyncapi: { parsed: { channels: { someChannel: channel }, servers: { production: {}, development: {}, } } } as any, pointer: '', id: 'operation' });
      expect(d.servers()).toBeInstanceOf(Servers);
      expect(d.servers().all()).toHaveLength(2);
      expect(d.servers().all()[0]).toBeInstanceOf(Server);
      expect(d.servers().all()[0].id()).toEqual('production');
      expect(d.servers().all()[1]).toBeInstanceOf(Server);
      expect(d.servers().all()[1].id()).toEqual('development');
    });

    it('should return collection of servers - channel available on selected servers', function() {
      const production = {};
      const channel = { servers: [production as any] };
      const d = new Operation({ action: 'send', channel }, { asyncapi: { parsed: { channels: { someChannel: channel }, servers: { production, development: {}, } } } as any, pointer: '', id: 'operation' });
      expect(d.servers()).toBeInstanceOf(Servers);
      expect(d.servers().all()).toHaveLength(1);
      expect(d.servers().all()[0]).toBeInstanceOf(Server);
      expect(d.servers().all()[0].id()).toEqual('production');
    });
  });

  describe('.channels()', function() {
    it('should return collection of channels - single channel', function() {
      const channel = { address: 'user/signup' };
      const d = new Operation({ action: 'send', channel }, { asyncapi: { parsed: { channels: { someChannel: channel } } } as any, pointer: '', id: 'operation' });
      expect(d.channels()).toBeInstanceOf(Channels);
      expect(d.channels().all()).toHaveLength(1);
      expect(d.channels().all()[0]).toBeInstanceOf(Channel);
      expect(d.channels().all()[0].address()).toEqual('user/signup');
    });
  });

  describe('.messages()', function() {
    it('should return collection of messages - single message', function() {
      const channel = { messages: { someMessage: { messageId: 'messageId' } } };
      const d = new Operation({ action: 'send', channel }, { asyncapi: { parsed: { channels: { someChannel: channel } } } as any, pointer: '', id: 'operation' });
      expect(d.messages()).toBeInstanceOf(Messages);
      expect(d.messages().all()).toHaveLength(1);
      expect(d.messages().all()[0]).toBeInstanceOf(Message);
    });

    it('should return collection of messages - more than one messages', function() {
      const channel = { messages: { someMessage1: { messageId: 'messageId1' }, someMessage2: { messageId: 'messageId2' } } };
      const d = new Operation({ action: 'send', channel }, { asyncapi: { parsed: { channels: { someChannel: channel } } } as any, pointer: '', id: 'operation' });
      expect(d.messages()).toBeInstanceOf(Messages);
      expect(d.messages().all()).toHaveLength(2);
      expect(d.messages().all()[0]).toBeInstanceOf(Message);
      expect(d.messages().all()[0].messageId()).toEqual('messageId1');
      expect(d.messages().all()[1]).toBeInstanceOf(Message);
      expect(d.messages().all()[1].messageId()).toEqual('messageId2');
    });

    it('should return collection of messages - defined message on operation level', function() {
      const channel = { messages: { someMessage1: { messageId: 'messageId1' }, someMessage2: { messageId: 'messageId2' } } };
      const d = new Operation({ action: 'send', channel, messages: [channel.messages.someMessage1] }, { asyncapi: { parsed: { channels: { someChannel: channel } } } as any, pointer: '', id: 'operation' });
      expect(d.messages()).toBeInstanceOf(Messages);
      expect(d.messages().all()).toHaveLength(1);
      expect(d.messages().all()[0]).toBeInstanceOf(Message);
      expect(d.messages().all()[0].messageId()).toEqual('messageId1');
    });
    
    it('should return undefined when there is no value', function() {
      const d = new Operation({ action: 'send', channel: {} });
      expect(d.messages()).toBeInstanceOf(Messages);
      expect(d.messages().all()).toHaveLength(0);
    });
  });

  describe('.reply()', function() {
    it('should return OperationReply model when there is value', function() {
      const d = new Operation({ action: 'send', channel: {}, reply: {} });
      expect(d.reply()).toBeInstanceOf(OperationReply);
    });

    it('should return undefined when there is no value', function() {
      const d = new Operation({ action: 'send', channel: {} });
      expect(d.reply()).toBeUndefined();
    });
  });

  describe('.traits()', function() {
    it('should return collection of traits', function() {
      const d = new Operation({ action: 'send', channel: {}, traits: [{}] });
      expect(d.traits()).toBeInstanceOf(OperationTraits);
      expect(d.traits().all()).toHaveLength(1);
      expect(d.traits().all()[0]).toBeInstanceOf(OperationTrait);
    });
    
    it('should return collection of traits when value is undefined', function() {
      const d = new Operation({ action: 'send', channel: {}, traits: [] });
      expect(d.traits()).toBeInstanceOf(OperationTraits);
      expect(d.traits().all()).toHaveLength(0);
    });
  });

  describe('.reply()', function() {
    it('should return undefined if reply is not defined', function () {
      const d = new Operation({ action: 'send', channel: {}, traits: [] });
      expect(d.hasReply()).toBeFalsy();
      expect(d.reply()).toBeUndefined();
    });

    it('should return a Reply object ', function () {
      const d = new Operation({ action: 'send', channel: {}, reply: { address: { location: '$message.header#/replyTo' }} });
      expect(d.hasReply()).toBeTruthy();
      expect(d.reply()).toBeInstanceOf(OperationReply);
    });
  });

  describe('mixins', function() {
    assertCoreModel(Operation);
  });
});
