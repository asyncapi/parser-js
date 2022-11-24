import { Channels } from '../../../src/models/channels';
import { Channel } from '../../../src/models/v3/channel';
import { Messages } from '../../../src/models/messages';
import { Message } from '../../../src/models/v3/message';
import { Operations } from '../../../src/models/operations';
import { Operation } from '../../../src/models/v3/operation';
import { Server } from '../../../src/models/v3/server';
import { ServerVariables } from '../../../src/models/server-variables';
import { SecurityScheme } from '../../../src/models/v3/security-scheme';
import { SecurityRequirements } from '../../../src/models/security-requirements';
import { SecurityRequirement } from '../../../src/models/v3/security-requirement';

import { serializeInput, assertCoreModel } from './utils';

import type { v3 } from '../../../src/spec-types';

const doc = {
  development: {
    protocol: 'mqtt',
    protocolVersion: '1.0.0',
    url: 'development.gigantic-server.com',
    variables: {
      username: {
        default: 'demo',
        description: 'This value is assigned by the service provider, in this example `gigantic-server.com`'
      }
    }
  }
};
const docItem = new Server(doc.development, { asyncapi: {} as any, pointer: '', id: 'development' });
const emptyItem = new Server(serializeInput<v3.ServerObject>({}), { asyncapi: {} as any, pointer: '', id: '' });

describe('Server Model', function () {
  describe('.id()', function () {
    it('should return name if present', function () {
      expect(docItem.id()).toMatch('development');
    });
  });

  describe('protocol()', function () {
    it('should return protocol ', function () {
      expect(docItem.protocol()).toMatch(doc.development.protocol);
    });
  });

  describe('.hasProtocolVersion()', function () {
    it('should return true if protocolVersion is not missing', function () {
      expect(docItem.hasProtocolVersion()).toBeTruthy();
    });

    it('should be false when protocolVersion is missing', function () {
      expect(emptyItem.hasProtocolVersion()).toBeFalsy();
    });
  });

  describe('.protocolVersion()', function () {
    it('should return value', function () {
      expect(docItem.protocolVersion()).toMatch(doc.development.protocolVersion);
    });

    it('should return undefined when protocolVersion is missing', function () {
      expect(emptyItem.protocolVersion()).toBeUndefined();
    });
  });

  describe('.url()', function () {
    it('should return value', function () {
      expect(docItem.url()).toMatch(doc.development.url);
    });
  });

  describe('.channels()', function() {
    it('should return collection of channels - single channel', function() {
      const doc = serializeInput<v3.ServerObject>({});
      const d = new Server(doc, { asyncapi: { parsed: { channels: { userSignup: { address: 'user/signup' } } } } as any, pointer: '', id: 'production' });
      expect(d.channels()).toBeInstanceOf(Channels);
      expect(d.channels().all()).toHaveLength(1);
      expect(d.channels().all()[0]).toBeInstanceOf(Channel);
      expect(d.channels().all()[0].address()).toEqual('user/signup');
    });

    it('should return collection of channels - multiple channels', function() {
      const doc = serializeInput<v3.ServerObject>({});
      const d = new Server(doc, { asyncapi: { parsed: { channels: { userSignup: { address: 'user/signup' }, userLogout: { address: 'user/logout' } } } } as any, pointer: '', id: 'production' });
      expect(d.channels()).toBeInstanceOf(Channels);
      expect(d.channels().all()).toHaveLength(2);
      expect(d.channels().all()[0]).toBeInstanceOf(Channel);
      expect(d.channels().all()[0].address()).toEqual('user/signup');
      expect(d.channels().all()[1]).toBeInstanceOf(Channel);
      expect(d.channels().all()[1].address()).toEqual('user/logout');
    });

    it('should return collection of channels - server available only in particular channel', function() {
      const doc = serializeInput<v3.ServerObject>({});
      const d = new Server(doc, { asyncapi: { parsed: { channels: { userSignup: { address: 'user/signup', servers: [doc] }, userLogout: { address: 'user/logout', servers: [{}] }, userCreate: { address: 'user/create' } } } } as any, pointer: '', id: 'production', });
      expect(d.channels()).toBeInstanceOf(Channels);
      expect(d.channels().all()).toHaveLength(2);
      expect(d.channels().all()[0]).toBeInstanceOf(Channel);
      expect(d.channels().all()[0].address()).toEqual('user/signup');
      expect(d.channels().all()[1]).toBeInstanceOf(Channel);
      expect(d.channels().all()[1].address()).toEqual('user/create');
    });
  });

  describe('.operations()', function() {
    it('should return collection of operations - one operation', function() {
      const doc = serializeInput<v3.ServerObject>({});
      const d = new Server(doc, { asyncapi: { parsed: { operations: { someOperation: { channel: {} } } } } as any, pointer: '', id: 'production' });
      expect(d.operations()).toBeInstanceOf(Operations);
      expect(d.operations().all()).toHaveLength(1);
      expect(d.operations().all()[0]).toBeInstanceOf(Operation);
      expect(d.operations().all()[0].id()).toEqual('someOperation');
    });

    it('should return collection of channels - multiple operations', function() {
      const doc = serializeInput<v3.ServerObject>({});
      const d = new Server(doc, { asyncapi: { parsed: { operations: { someOperation1: { channel: {} }, someOperation2: { channel: {} } } } } as any, pointer: '', id: 'production' });
      expect(d.operations()).toBeInstanceOf(Operations);
      expect(d.operations().all()).toHaveLength(2);
      expect(d.operations().all()[0]).toBeInstanceOf(Operation);
      expect(d.operations().all()[0].id()).toEqual('someOperation1');
      expect(d.operations().all()[1]).toBeInstanceOf(Operation);
      expect(d.operations().all()[1].id()).toEqual('someOperation2');
    });

    it('should return collection of operations - server available only in particular channel', function() {
      const doc = serializeInput<v3.ServerObject>({});
      const d = new Server(doc, { asyncapi: { parsed: { operations: { someOperation1: { channel: { servers: [doc] } }, someOperation2: { channel: { servers: [{}] } } } } } as any, pointer: '', id: 'production' });
      expect(d.operations()).toBeInstanceOf(Operations);
      expect(d.operations().all()).toHaveLength(1);
      expect(d.operations().all()[0]).toBeInstanceOf(Operation);
      expect(d.operations().all()[0].id()).toEqual('someOperation1');
    });
  });

  describe('.messages()', function() {
    it('should return collection of messages - one message', function() {
      const doc = serializeInput<v3.ServerObject>({});
      const d = new Server(doc, { asyncapi: { parsed: { channels: { someChannel: { messages: { someMessage: { messageId: 'messageId' } } } } } } as any, pointer: '', id: 'production' });
      expect(d.messages()).toBeInstanceOf(Messages);
      expect(d.messages().all()).toHaveLength(1);
      expect(d.messages().all()[0]).toBeInstanceOf(Message);
      expect(d.messages().all()[0].messageId()).toEqual('messageId');
    });

    it('should return collection of messages - more than one messages', function() {
      const doc = serializeInput<v3.ServerObject>({});
      const d = new Server(doc, { asyncapi: { parsed: { channels: { someChannel1: { messages: { someMessage1: { messageId: 'messageId1' } } }, someChannel2: { messages: { someMessage2: { messageId: 'messageId2' }, someMessage3: { messageId: 'messageId3' } } } } } } as any, pointer: '', id: 'production' });
      expect(d.messages()).toBeInstanceOf(Messages);
      expect(d.messages().all()).toHaveLength(3);
      expect(d.messages().all()[0]).toBeInstanceOf(Message);
      expect(d.messages().all()[0].messageId()).toEqual('messageId1');
      expect(d.messages().all()[1]).toBeInstanceOf(Message);
      expect(d.messages().all()[1].messageId()).toEqual('messageId2');
      expect(d.messages().all()[2]).toBeInstanceOf(Message);
      expect(d.messages().all()[2].messageId()).toEqual('messageId3');
    });

    it('should return collection of messages - server available only in particular channel', function() {
      const doc = serializeInput<v3.ServerObject>({});
      const d = new Server(doc, { asyncapi: { parsed: { channels: { someChannel1: { servers: [doc], messages: { someMessage1: { messageId: 'messageId1' } } }, someChannel2: { servers: [{}], messages: { someMessage2: { messageId: 'messageId2' }, someMessage3: { messageId: 'messageId3' } } } } } } as any, pointer: '', id: 'production' });
      expect(d.messages()).toBeInstanceOf(Messages);
      expect(d.messages().all()).toHaveLength(1);
      expect(d.messages().all()[0]).toBeInstanceOf(Message);
      expect(d.messages().all()[0].messageId()).toEqual('messageId1');
    });
  });

  describe('.variables()', function () {
    it('should return ServerVariables object', function () {
      expect(docItem.variables()).toBeInstanceOf(ServerVariables);
    });
  });

  describe('.security()', function() {
    it('should return SecurityRequirements', function() {
      const doc = serializeInput<v3.ServerObject>({ security: [{ requirement: [] }] });
      const d = new Server(doc, {pointer: '/servers/test'} as any);

      const security = d.security();
      expect(Array.isArray(security)).toEqual(true);
      expect(security).toHaveLength(1);
      expect(security[0]).toBeInstanceOf(SecurityRequirements);
      
      const requirement = security[0].get('requirement') as SecurityRequirement;
      expect(requirement).toBeInstanceOf(SecurityRequirement);
      expect(requirement.scheme()).toBeInstanceOf(SecurityScheme);
      expect(requirement.scopes()).toEqual([]);
      expect(requirement.meta().id).toEqual('requirement');
      expect(requirement.meta().pointer).toEqual('/servers/test/security/0/requirement');
    });
    
    it('should return SecurityRequirements when value is undefined', function() {
      const doc = serializeInput<v3.ServerObject>({});
      const d = new Server(doc);
      expect(Array.isArray(d.security())).toEqual(true);
      expect(d.security()).toHaveLength(0);
    });
  });

  describe('mixins', function () {
    assertCoreModel(Server);
  });
});
