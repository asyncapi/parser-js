import { Channel } from '../../../src/models/v2/channel';
import { ChannelParameters } from '../../../src/models/v2/channel-parameters';
import { ChannelParameter } from '../../../src/models/v2/channel-parameter';
import { Operations } from '../../../src/models/v2/operations';
import { Operation } from '../../../src/models/v2/operation';
import { Servers } from '../../../src/models/v2/servers';
import { Server } from '../../../src/models/v2/server';

import { 
  assertBindingsMixinInheritance,
  assertDescriptionMixinInheritance,
  assertExtensionsMixinInheritance,
} from './mixins/inheritance';

describe('Channel model', function() {
  describe('.id()', function() {
    it('should return id of model', function() {
      const doc = {};
      const d = new Channel(doc, { asyncapi: {} as any, pointer: '', id: 'channel', address: '' });
      expect(d.id()).toEqual('channel');
    });
  });

  describe('.address()', function() {
    it('should return the value', function() {
      const doc = {};
      const d = new Channel(doc, { asyncapi: {} as any, pointer: '', id: 'channel', address: 'user/signup' });
      expect(d.address()).toEqual('user/signup');
    });
  });

  describe('.servers()', function() {
    it('should return collection of servers - available on all servers', function() {
      const doc = {};
      const d = new Channel(doc, { asyncapi: { parsed: { servers: { someServer1: {}, someServer2: {}, } } } as any, pointer: '', id: 'channel', address: 'user/signup' });
      expect(d.servers()).toBeInstanceOf(Servers);
      expect(d.servers().all()).toHaveLength(2);
      expect(d.servers().all()[0]).toBeInstanceOf(Server);
      expect(d.servers().all()[0].id()).toEqual('someServer1');
      expect(d.servers().all()[1]).toBeInstanceOf(Server);
      expect(d.servers().all()[1].id()).toEqual('someServer2');
    });

    it('should return collection of servers - available on all servers (empty servers array)', function() {
      const doc = { servers: [] };
      const d = new Channel(doc, { asyncapi: { parsed: { servers: { someServer1: {}, someServer2: {}, } } } as any, pointer: '', id: 'channel', address: 'user/signup' });
      expect(d.servers()).toBeInstanceOf(Servers);
      expect(d.servers().all()).toHaveLength(2);
      expect(d.servers().all()[0]).toBeInstanceOf(Server);
      expect(d.servers().all()[0].id()).toEqual('someServer1');
      expect(d.servers().all()[1]).toBeInstanceOf(Server);
      expect(d.servers().all()[1].id()).toEqual('someServer2');
    });

    it('should return collection of servers - available only on particular ones', function() {
      const doc = { servers: ['someServer2'] };
      const d = new Channel(doc, { asyncapi: { parsed: { servers: { someServer1: {}, someServer2: {}, } } } as any, pointer: '', id: 'channel', address: 'user/signup' });
      expect(d.servers()).toBeInstanceOf(Servers);
      expect(d.servers().all()).toHaveLength(1);
      expect(d.servers().all()[0]).toBeInstanceOf(Server);
      expect(d.servers().all()[0].id()).toEqual('someServer2');
    });
  });

  describe('.operations()', function() {
    it('should return collection of operations - publish operation', function() {
      const doc = { publish: {} };
      const d = new Channel(doc);
      expect(d.operations()).toBeInstanceOf(Operations);
      expect(d.operations().all()).toHaveLength(1);
      expect(d.operations().all()[0]).toBeInstanceOf(Operation);
      expect(d.operations().all()[0].action()).toEqual('publish');
    });
    
    it('should return collection of operations - subscribe operation', function() {
      const doc = { subscribe: {} };
      const d = new Channel(doc);
      expect(d.operations()).toBeInstanceOf(Operations);
      expect(d.operations().all()).toHaveLength(1);
      expect(d.operations().all()[0]).toBeInstanceOf(Operation);
      expect(d.operations().all()[0].action()).toEqual('subscribe');
    });

    it('should return collection of operations - both operations', function() {
      const doc = { publish: {}, subscribe: {} };
      const d = new Channel(doc);
      expect(d.operations()).toBeInstanceOf(Operations);
      expect(d.operations().all()).toHaveLength(2);
      expect(d.operations().all()[0]).toBeInstanceOf(Operation);
      expect(d.operations().all()[0].action()).toEqual('publish');
      expect(d.operations().all()[1]).toBeInstanceOf(Operation);
      expect(d.operations().all()[1].action()).toEqual('subscribe');
    });
  });

  describe('.parameters()', function() {
    it('should return collection of channel parameters', function() {
      const doc = { parameters: { parameter1: {}, parameter2: {} } };
      const d = new Channel(doc);
      expect(d.parameters()).toBeInstanceOf(ChannelParameters);
      expect(d.parameters().all()).toHaveLength(2);
      expect(d.parameters().all()[0]).toBeInstanceOf(ChannelParameter);
      expect(d.parameters().all()[0].id()).toEqual('parameter1');
      expect(d.parameters().all()[1]).toBeInstanceOf(ChannelParameter);
      expect(d.parameters().all()[1].id()).toEqual('parameter2');
    });
  });

  describe('mixins inheritance', function() {
    assertBindingsMixinInheritance(Channel);
    assertDescriptionMixinInheritance(Channel);
    assertExtensionsMixinInheritance(Channel);
  });
});
