import { Channels } from '../../../src/models/v3/channels';
import { Channel } from '../../../src/models/v3/channel';
import { Messages } from '../../../src/models/v3/messages';
import { Message } from '../../../src/models/v3/message';
import { Operations } from '../../../src/models/v3/operations';
import { Operation } from '../../../src/models/v3/operation';
import { Server } from '../../../src/models/v3/server';
import { ServerVariables } from '../../../src/models/v3/server-variables';
import { SecurityScheme } from '../../../src/models/v3/security-scheme';
import { SecurityRequirements } from '../../../src/models/v3/security-requirements';
import { SecurityRequirement } from '../../../src/models/v3/security-requirement';

import { serializeInput, assertCoreModel } from './utils';

import type { v3 } from '../../../src/spec-types';

const doc = {
  production: {
    host: 'rabbitmq.in.mycompany.com:5672',
    pathname: '/production',
    protocol: 'amqp',
    protocolVersion: '1.0.0',
    variables: {
      username: {
        default: 'demo',
        description: 'This value is assigned by the service provider, in this example `gigantic-server.com`'
      }
    }
  }
};
const docItem = new Server(doc.production, { asyncapi: {} as any, pointer: '', id: 'production' });
const emptyItem = new Server(serializeInput<v3.ServerObject>({}), { asyncapi: {} as any, pointer: '', id: '' });

describe('Server Model', function () {
  describe('.id()', function () {
    it('should return name if present', function () {
      expect(docItem.id()).toEqual('production');
    });
  });

  describe('.url()', function () {
    it('should return value', function () {
      expect(docItem.url()).toEqual(`${doc.production.protocol}://${doc.production.host}${doc.production.pathname}`);
    });
  });

  describe('.host()', function () {
    it('should return value', function () {
      expect(docItem.host()).toEqual(doc.production.host);
    });
  });

  describe('protocol()', function () {
    it('should return protocol ', function () {
      expect(docItem.protocol()).toEqual(doc.production.protocol);
    });
  });

  describe('.hasPathname()', function () {
    it('should return true if pathname is not missing', function () {
      expect(docItem.hasPathname()).toEqual(true);
    });

    it('should be false when protocolVersion is missing', function () {
      const docItem = new Server({ ...doc.production, pathname: undefined }, { asyncapi: {} as any, pointer: '', id: 'development' });
      expect(docItem.hasPathname()).toEqual(false);
    });
  });

  describe('.pathname()', function () {
    it('should return value', function () {
      expect(docItem.pathname()).toEqual(doc.production.pathname);
    });

    it('should return undefined if value is not set', function () {
      const docItem = new Server({ ...doc.production, pathname: undefined }, { asyncapi: {} as any, pointer: '', id: 'development' });
      expect(docItem.pathname()).toBeUndefined();
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
      expect(docItem.protocolVersion()).toMatch(doc.production.protocolVersion);
    });

    it('should return undefined when protocolVersion is missing', function () {
      expect(emptyItem.protocolVersion()).toBeUndefined();
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
      const channel = {};
      const d = new Server(doc, { asyncapi: { parsed: { channels: { someChannel: channel }, operations: { someOperation: { channel } } } } as any, pointer: '', id: 'production' });
      expect(d.operations()).toBeInstanceOf(Operations);
      expect(d.operations().all()).toHaveLength(1);
      expect(d.operations().all()[0]).toBeInstanceOf(Operation);
      expect(d.operations().all()[0].id()).toEqual('someOperation');
    });

    it('should return collection of channels - multiple operations', function() {
      const doc = serializeInput<v3.ServerObject>({});
      const channel = {};
      const d = new Server(doc, { asyncapi: { parsed: { channels: { someChannel: channel }, operations: { someOperation1: { channel }, someOperation2: { channel} } } } as any, pointer: '', id: 'production' });
      expect(d.operations()).toBeInstanceOf(Operations);
      expect(d.operations().all()).toHaveLength(2);
      expect(d.operations().all()[0]).toBeInstanceOf(Operation);
      expect(d.operations().all()[0].id()).toEqual('someOperation1');
      expect(d.operations().all()[1]).toBeInstanceOf(Operation);
      expect(d.operations().all()[1].id()).toEqual('someOperation2');
    });

    it('should return collection of operations - server available only in particular channel', function() {
      const doc = serializeInput<v3.ServerObject>({});
      const channel = { servers: [doc] };
      const d = new Server(doc, { asyncapi: { parsed: { channels: { someChannel: channel }, operations: { someOperation1: { channel }, someOperation2: { channel: { servers: [{}] } } } } } as any, pointer: '', id: 'production' });
      expect(d.operations()).toBeInstanceOf(Operations);
      expect(d.operations().all()).toHaveLength(1);
      expect(d.operations().all()[0]).toBeInstanceOf(Operation);
      expect(d.operations().all()[0].id()).toEqual('someOperation1');
    });
  });

  describe('.messages()', function() {
    it('should return collection of messages - one message', function() {
      const doc = serializeInput<v3.ServerObject>({});
      const d = new Server(doc, { asyncapi: { parsed: { channels: { someChannel: { messages: { someMessage: { summary: 'summary' } } } } } } as any, pointer: '', id: 'production' });
      expect(d.messages()).toBeInstanceOf(Messages);
      expect(d.messages().all()).toHaveLength(1);
      expect(d.messages().all()[0]).toBeInstanceOf(Message);
      expect(d.messages().all()[0].summary()).toEqual('summary');
    });

    it('should return collection of messages - more than one messages', function() {
      const doc = serializeInput<v3.ServerObject>({});
      const d = new Server(doc, { asyncapi: { parsed: { channels: { someChannel1: { messages: { someMessage1: { summary: 'summary1' } } }, someChannel2: { messages: { someMessage2: { summary: 'summary2' }, someMessage3: { summary: 'summary3' } } } } } } as any, pointer: '', id: 'production' });
      expect(d.messages()).toBeInstanceOf(Messages);
      expect(d.messages().all()).toHaveLength(3);
      expect(d.messages().all()[0]).toBeInstanceOf(Message);
      expect(d.messages().all()[0].summary()).toEqual('summary1');
      expect(d.messages().all()[1]).toBeInstanceOf(Message);
      expect(d.messages().all()[1].summary()).toEqual('summary2');
      expect(d.messages().all()[2]).toBeInstanceOf(Message);
      expect(d.messages().all()[2].summary()).toEqual('summary3');
    });

    it('should return collection of messages - server available only in particular channel', function() {
      const doc = serializeInput<v3.ServerObject>({});
      const d = new Server(doc, { asyncapi: { parsed: { channels: { someChannel1: { servers: [doc], messages: { someMessage1: { summary: 'summary1' } } }, someChannel2: { servers: [{}], messages: { someMessage2: { summary: 'summary2' }, someMessage3: { summary: 'summary3' } } } } } } as any, pointer: '', id: 'production' });
      expect(d.messages()).toBeInstanceOf(Messages);
      expect(d.messages().all()).toHaveLength(1);
      expect(d.messages().all()[0]).toBeInstanceOf(Message);
      expect(d.messages().all()[0].summary()).toEqual('summary1');
    });
  });

  describe('.variables()', function () {
    it('should return ServerVariables object', function () {
      expect(docItem.variables()).toBeInstanceOf(ServerVariables);
    });
  });

  describe('.security()', function() {
    it('should return SecurityRequirements', function() {
      const doc = serializeInput<v3.ServerObject>({ security: [{ type: 'apiKey' }] });
      const d = new Server(doc, {pointer: '/servers/test'} as any);

      const security = d.security();
      expect(Array.isArray(security)).toEqual(true);
      expect(security).toHaveLength(1);
      expect(security[0]).toBeInstanceOf(SecurityRequirements);
      
      const requirement = security[0].all()[0] as SecurityRequirement;
      expect(requirement).toBeInstanceOf(SecurityRequirement);
      expect(requirement.scheme()).toBeInstanceOf(SecurityScheme);
      expect(requirement.scopes()).toEqual([]);
      expect(requirement.meta().pointer).toEqual('/servers/test/security/0');
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
