import { Channel } from '../../../src/models/v3/channel';
import { Channels } from '../../../src/models/v3/channels';
import { Message } from '../../../src/models/v3/message';
import { MessageTraits } from '../../../src/models/v3/message-traits';
import { MessageTrait } from '../../../src/models/v3/message-trait';
import { Schema } from '../../../src/models/v3/schema';
import { Servers } from '../../../src/models/v3/servers';
import { Server } from '../../../src/models/v3/server';
import { Operations } from '../../../src/models/v3/operations';
import { Operation } from '../../../src/models/v3/operation';

import { assertCoreModel } from './utils';
import { ChannelsV3 } from '../../../src/models';

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

  describe('.schemaFormat() + .hasSchemaFormat()', function() {
    it('should return defined schemaFormat, and true for hasSchemaFormat()', function() {
      const doc = { payload: {schemaFormat: 'customSchemaFormat', schema: {} }};
      const d = new Message(doc, { asyncapi: {} as any, pointer: '', id: 'message' });
      expect(d.hasSchemaFormat()).toBeTruthy();
      expect(d.schemaFormat()).toEqual('customSchemaFormat');
    });

    it('should return default schemaFormat if schemaFormat field is absent', function() {
      const doc = {payload: {}};
      const d = new Message(doc, { asyncapi: { semver: { version: '2.0.0' } } as any, pointer: '', id: 'message' });
      expect(d.hasSchemaFormat()).toBeTruthy();
      expect(d.schemaFormat()).toEqual('application/vnd.aai.asyncapi;version=2.0.0');
    });

    it('should return undefined schemaFormat, and false for hasSchemaFormat() if there is no payload', function() {
      const doc = {};
      const d = new Message(doc, { asyncapi: { semver: { version: '2.0.0' } } as any, pointer: '', id: 'message' });
      expect(d.hasSchemaFormat()).toBeFalsy();
      expect(d.schemaFormat()).toBeUndefined();
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
      const serverProduction = {host: 'mqtt://myhost.io', protocol: 'mqtt'};
      const serverDevelopment = {host: 'mqtt://dev.myhost.io', protocol: 'mqtt'};
      const channel = { }; // no channels assigned, means all channels are related
      const d = new Message(doc, { asyncapi: { parsed: { servers: { production: serverProduction, development: serverDevelopment, demo: {} }, channels: { userSignedUp: channel }, operations: { userSignUp: { action: 'send', messages: [doc], channel } } } } as any, pointer: '', id: 'message' });

      expect(d.servers()).toBeInstanceOf(Servers);
      expect(d.servers().all()).toHaveLength(3);
      expect(d.servers().all()[0]).toBeInstanceOf(Server);
      expect(d.servers().all()[0].id()).toEqual('production');
      expect(d.servers().all()[1]).toBeInstanceOf(Server);
      expect(d.servers().all()[1].id()).toEqual('development');
      expect(d.servers().all()[2]).toBeInstanceOf(Server);
      expect(d.servers().all()[2].id()).toEqual('demo');
    });

    it('should return collection of servers - available on selected servers', function() {
      const doc = {};
      const serverProduction = {host: 'mqtt://myhost.io', protocol: 'mqtt'};
      const serverDevelopment = {host: 'mqtt://dev.myhost.io', protocol: 'mqtt'};
      const channel = { servers: [serverProduction, serverDevelopment]}; // selecting 2 of the 3 servers
      const d = new Message(doc, { asyncapi: { parsed: { servers: { production: serverProduction, development: serverDevelopment, demo: {} }, channels: { userSignedUp: channel }, operations: { userSignUp: { action: 'send', messages: [doc], channel } } } } as any, pointer: '', id: 'message' });

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
      const channel = {address: 'user/signup', messages: { messageOne: doc }};
      const d = new Message(doc, { asyncapi: { parsed: {channels: { userSignUp: channel } } } as any, pointer: '', id: 'message' });
      expect(d.channels()).toBeInstanceOf(Channels);
      expect(d.channels().all()).toHaveLength(1);
      expect(d.channels().all()[0]).toBeInstanceOf(Channel);
      expect(d.channels().all()[0].address()).toEqual('user/signup');
    });

    it('should return collection of channels - multiple channels', function() {
      const doc = {};
      const channelOne = {address: 'user/signup', messages: { messageOne: doc }};
      const channelTwo = {address: 'user/logout', messages: { messageOne: doc }};
      const d = new Message(doc, { asyncapi: { parsed: {channels: { userSignUp: channelOne, userLogOut: channelTwo } } } as any, pointer: '', id: 'message' });
      expect(d.channels()).toBeInstanceOf(Channels);
      expect(d.channels().all()).toHaveLength(2);
      expect(d.channels().all()[0]).toBeInstanceOf(Channel);
      expect(d.channels().all()[0].address()).toEqual('user/signup');
      expect(d.channels().all()[1]).toBeInstanceOf(Channel);
      expect(d.channels().all()[1].address()).toEqual('user/logout');
    });

    it('should return collection of channels - do not duplicate channels', function() {
      const doc = {};
      const channel = {address: 'user/signup', messages: { messageOne: doc }};
      const d = new Message(doc, { asyncapi: { parsed: {channels: { userSignUp: channel }, operations: { userSignUp: { action: 'send', messages: [doc], channel } } } } as any, pointer: '', id: 'message' });
      expect(d.channels()).toBeInstanceOf(Channels);
      expect(d.channels().all()).toHaveLength(1);
      expect(d.channels().all()[0]).toBeInstanceOf(Channel);
      expect(d.channels().all()[0].address()).toEqual('user/signup');
    });
  });

  describe('.operations()', function() {
    it('should return collection of operations - single operation', function() {
      const doc = {};
      const d = new Message(doc, { asyncapi: { parsed: { operations: { userSignUp: { action: 'send', messages: [doc] } } } } as any, pointer: '', id: 'message' });
      expect(d.operations()).toBeInstanceOf(Operations);
      expect(d.operations().all()).toHaveLength(1);
      expect(d.operations().all()[0]).toBeInstanceOf(Operation);
      expect(d.operations().all()[0].id()).toEqual('userSignUp');
    });

    it('should return collection of operations - multiple operations', function() {
      const doc = {};
      const d = new Message(doc, { asyncapi: { parsed: { operations: { userSignUp: { action: 'send', messages: [doc] }, userLogOut: { action: 'send', messages: [doc] } } } } as any, pointer: '', id: 'message' });
      expect(d.operations()).toBeInstanceOf(Operations);
      expect(d.operations().all()).toHaveLength(2);
      expect(d.operations().all()[0]).toBeInstanceOf(Operation);
      expect(d.operations().all()[0].id()).toEqual('userSignUp');
      expect(d.operations().all()[1]).toBeInstanceOf(Operation);
      expect(d.operations().all()[1].id()).toEqual('userLogOut');
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
    assertCoreModel(Message);
  });
});
