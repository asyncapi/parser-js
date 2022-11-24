import { Channels } from '../../../src/models/channels';
import { Channel } from '../../../src/models/v2/channel';
import { Messages } from '../../../src/models/messages';
import { Message } from '../../../src/models/v2/message';
import { Operations } from '../../../src/models/operations';
import { Operation } from '../../../src/models/v2/operation';
import { Server } from '../../../src/models/v2/server';
import { ServerVariables } from '../../../src/models/server-variables';
import { SecurityScheme } from '../../../src/models/v2/security-scheme';
import { SecurityRequirements } from '../../../src/models/security-requirements';
import { SecurityRequirement } from '../../../src/models/v2/security-requirement';

import { serializeInput, assertCoreModel } from './utils';

import type { v2 } from '../../../src/spec-types';

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
const emptyItem = new Server(serializeInput<v2.ServerObject>({}), { asyncapi: {} as any, pointer: '', id: '' });

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
      const doc = serializeInput<v2.ServerObject>({});
      const d = new Server(doc, { asyncapi: { parsed: { channels: { 'user/signup': {} } } } as any, pointer: '', id: 'production' });
      expect(d.channels()).toBeInstanceOf(Channels);
      expect(d.channels().all()).toHaveLength(1);
      expect(d.channels().all()[0]).toBeInstanceOf(Channel);
      expect(d.channels().all()[0].address()).toEqual('user/signup');
    });

    it('should return collection of channels - multiple channels', function() {
      const doc = serializeInput<v2.ServerObject>({});
      const d = new Server(doc, { asyncapi: { parsed: { channels: { 'user/signup': {}, 'user/logout': {} } } } as any, pointer: '', id: 'production' });
      expect(d.channels()).toBeInstanceOf(Channels);
      expect(d.channels().all()).toHaveLength(2);
      expect(d.channels().all()[0]).toBeInstanceOf(Channel);
      expect(d.channels().all()[0].address()).toEqual('user/signup');
      expect(d.channels().all()[1]).toBeInstanceOf(Channel);
      expect(d.channels().all()[1].address()).toEqual('user/logout');
    });

    it('should return collection of channels - server available only in particular channel', function() {
      const doc = serializeInput<v2.ServerObject>({});
      const d = new Server(doc, { asyncapi: { parsed: { channels: { 'user/signup': { servers: ['production'] }, 'user/logout': { servers: ['development'] }, 'user/create': {} } } } as any, pointer: '', id: 'production', });
      expect(d.channels()).toBeInstanceOf(Channels);
      expect(d.channels().all()).toHaveLength(2);
      expect(d.channels().all()[0]).toBeInstanceOf(Channel);
      expect(d.channels().all()[0].address()).toEqual('user/signup');
      expect(d.channels().all()[1]).toBeInstanceOf(Channel);
      expect(d.channels().all()[1].address()).toEqual('user/create');
    });
  });

  describe('.operations()', function() {
    it('should return collection of operations - single channel', function() {
      const doc = serializeInput<v2.ServerObject>({});
      const d = new Server(doc, { asyncapi: { parsed: { channels: { 'user/signup': { publish: { operationId: '1' } } } } } as any, pointer: '', id: 'production' });
      expect(d.operations()).toBeInstanceOf(Operations);
      expect(d.operations().all()).toHaveLength(1);
      expect(d.operations().all()[0]).toBeInstanceOf(Operation);
      expect(d.operations().all()[0].id()).toEqual('1');
    });

    it('should return collection of channels - multiple channels', function() {
      const doc = serializeInput<v2.ServerObject>({});
      const d = new Server(doc, { asyncapi: { parsed: { channels: { 'user/signup': { publish: { operationId: '1' } }, 'user/logout': { subscribe: { operationId: '2' } } } } } as any, pointer: '', id: 'production' });
      expect(d.operations()).toBeInstanceOf(Operations);
      expect(d.operations().all()).toHaveLength(2);
      expect(d.operations().all()[0]).toBeInstanceOf(Operation);
      expect(d.operations().all()[0].id()).toEqual('1');
      expect(d.operations().all()[1]).toBeInstanceOf(Operation);
      expect(d.operations().all()[1].id()).toEqual('2');
    });

    it('should return collection of channels - server available only in particular channel', function() {
      const doc = serializeInput<v2.ServerObject>({});
      const d = new Server(doc, { asyncapi: { parsed: { channels: { 'user/signup': { servers: ['production'], publish: { operationId: '1' } }, 'user/logout': { servers: ['development'] }, 'user/create': { subscribe: { operationId: '3' }, publish: { operationId: '2' } } } } } as any, pointer: '', id: 'production', });
      expect(d.operations()).toBeInstanceOf(Operations);
      expect(d.operations().all()).toHaveLength(3);
      expect(d.operations().all()[0]).toBeInstanceOf(Operation);
      expect(d.operations().all()[0].id()).toEqual('1');
      expect(d.operations().all()[1]).toBeInstanceOf(Operation);
      expect(d.operations().all()[1].id()).toEqual('2');
      expect(d.operations().all()[2]).toBeInstanceOf(Operation);
      expect(d.operations().all()[2].id()).toEqual('3');
    });
  });

  describe('.messages()', function() {
    it('should return collection of messages - single channel', function() {
      const doc = serializeInput<v2.ServerObject>({});
      const d = new Server(doc, { asyncapi: { parsed: { channels: { 'user/signup': { publish: { message: { messageId: '1' } } } } } } as any, pointer: '', id: 'production' });
      expect(d.messages()).toBeInstanceOf(Messages);
      expect(d.messages().all()).toHaveLength(1);
      expect(d.messages().all()[0]).toBeInstanceOf(Message);
      expect(d.messages().all()[0].messageId()).toEqual('1');
    });

    it('should return collection of messages - multiple channels', function() {
      const doc = serializeInput<v2.ServerObject>({});
      const d = new Server(doc, { asyncapi: { parsed: { channels: { 'user/signup': { publish: { message: { messageId: '1' } } }, 'user/logout': { subscribe: { message: { oneOf: [{ messageId: '2' }, { messageId: '3' }] } } } } } } as any, pointer: '', id: 'production' });
      expect(d.messages()).toBeInstanceOf(Messages);
      expect(d.messages().all()).toHaveLength(3);
      expect(d.messages().all()[0]).toBeInstanceOf(Message);
      expect(d.messages().all()[0].messageId()).toEqual('1');
      expect(d.messages().all()[1]).toBeInstanceOf(Message);
      expect(d.messages().all()[1].messageId()).toEqual('2');
      expect(d.messages().all()[2]).toBeInstanceOf(Message);
      expect(d.messages().all()[2].messageId()).toEqual('3');
    });

    it('should return collection of messages - server available only in particular channel', function() {
      const doc = serializeInput<v2.ServerObject>({});
      const d = new Server(doc, { asyncapi: { parsed: { channels: { 'user/signup': { servers: ['production'], publish: { message: { messageId: '1' } } }, 'user/logout': { servers: ['development'] }, 'user/create': { subscribe: { message: { messageId: '3' } }, publish: { message: { messageId: '2' } } } } } } as any, pointer: '', id: 'production', });
      expect(d.messages()).toBeInstanceOf(Messages);
      expect(d.messages().all()).toHaveLength(3);
      expect(d.messages().all()[0]).toBeInstanceOf(Message);
      expect(d.messages().all()[0].messageId()).toEqual('1');
      expect(d.messages().all()[1]).toBeInstanceOf(Message);
      expect(d.messages().all()[1].messageId()).toEqual('2');
      expect(d.messages().all()[2]).toBeInstanceOf(Message);
      expect(d.messages().all()[2].messageId()).toEqual('3');
    });
  });

  describe('.variables()', function () {
    it('should return ServerVariables object', function () {
      expect(docItem.variables()).toBeInstanceOf(ServerVariables);
    });
  });

  describe('.security()', function() {
    it('should return SecurityRequirements', function() {
      const doc = serializeInput<v2.ServerObject>({ security: [{ requirement: [] }] });
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
      const doc = serializeInput<v2.ServerObject>({});
      const d = new Server(doc);
      expect(Array.isArray(d.security())).toEqual(true);
      expect(d.security()).toHaveLength(0);
    });
  });

  describe('mixins', function () {
    assertCoreModel(Server);
  });
});
