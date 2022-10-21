import { Channels } from '../../../src/models/channels';
import { Channel } from '../../../src/models/v3/channel';
import { Operation } from '../../../src/models/v3/operation';
import { OperationTraits } from '../../../src/models/operation-traits';
import { OperationTrait } from '../../../src/models/v3/operation-trait';
import { Messages } from '../../../src/models/messages';
import { Message } from '../../../src/models/v3/message';
import { Servers } from '../../../src/models/servers';
import { Server } from '../../../src/models/v3/server';

import { assertBindings, assertDescription, assertExtensions, assertExternalDocumentation, assertTags } from './utils';

describe('Operation model', function() {
  describe('.action()', function() {
    it('should return kind/action of operation', function() {
      const d = new Operation({ action: 'send', channel: {} }, { asyncapi: {} as any, pointer: '', id: 'trait' });
      expect(d.action()).toEqual('send');
    });
  });

  describe('.servers()', function() {
    it('should return collection of servers - channel available on all servers', function() {
      const d = new Operation({ action: 'send', channel: {} }, { asyncapi: { parsed: { servers: { production: {}, development: {}, } } } as any, pointer: '', id: 'operation' });
      expect(d.servers()).toBeInstanceOf(Servers);
      expect(d.servers().all()).toHaveLength(2);
      expect(d.servers().all()[0]).toBeInstanceOf(Server);
      expect(d.servers().all()[0].id()).toEqual('production');
      expect(d.servers().all()[1]).toBeInstanceOf(Server);
      expect(d.servers().all()[1].id()).toEqual('development');
    });

    it('should return collection of servers - channel available on selected servers', function() {
      const production = {};
      const d = new Operation({ action: 'send', channel: { servers: [production as any] } }, { asyncapi: { parsed: { servers: { production, development: {}, } } } as any, pointer: '', id: 'operation' });
      expect(d.servers()).toBeInstanceOf(Servers);
      expect(d.servers().all()).toHaveLength(1);
      expect(d.servers().all()[0]).toBeInstanceOf(Server);
      expect(d.servers().all()[0].id()).toEqual('production');
    });
  });

  describe('.channels()', function() {
    it('should return collection of channels - single channel', function() {
      const d = new Operation({ action: 'send', channel: { address: 'user/signup' } });
      expect(d.channels()).toBeInstanceOf(Channels);
      expect(d.channels().all()).toHaveLength(1);
      expect(d.channels().all()[0]).toBeInstanceOf(Channel);
      expect(d.channels().all()[0].address()).toEqual('user/signup');
    });
  });

  describe('.messages()', function() {
    it('should return collection of messages - single message', function() {
      const d = new Operation({ action: 'send', channel: { messages: { someMessage: { messageId: 'messageId' } } } });
      expect(d.messages()).toBeInstanceOf(Messages);
      expect(d.messages().all()).toHaveLength(1);
      expect(d.messages().all()[0]).toBeInstanceOf(Message);
    });

    it('should return collection of messages - more than one messages', function() {
      const d = new Operation({ action: 'send', channel: { messages: { someMessage1: { messageId: 'messageId1' }, someMessage2: { messageId: 'messageId2' } } } });
      expect(d.messages()).toBeInstanceOf(Messages);
      expect(d.messages().all()).toHaveLength(2);
      expect(d.messages().all()[0]).toBeInstanceOf(Message);
      expect(d.messages().all()[0].messageId()).toEqual('messageId1');
      expect(d.messages().all()[1]).toBeInstanceOf(Message);
      expect(d.messages().all()[1].messageId()).toEqual('messageId2');
    });
    
    it('should return undefined when there is no value', function() {
      const d = new Operation({ action: 'send', channel: {} });
      expect(d.messages()).toBeInstanceOf(Messages);
      expect(d.messages().all()).toHaveLength(0);
    });
  });

  describe('.traits()', function() {
    it('should return collection of traits', function() {
      const d = new Operation({ action: 'send', channel: {}, traits: [{ action: 'receive' }] });
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

  describe('mixins', function() {
    assertBindings(Operation);
    assertDescription(Operation);
    assertExtensions(Operation);
    assertExternalDocumentation(Operation);
    assertTags(Operation);
  });
});
