import { Components } from '../../../src/models/v2/components';
import { Bindings } from '../../../src/models/v2/bindings';
import { Channel } from '../../../src/models/v2/channel';
import { ChannelParameter } from '../../../src/models/v2/channel-parameter';
import { CorrelationId } from '../../../src/models/v2/correlation-id';
import { OperationTrait } from '../../../src/models/v2/operation-trait';
import { Message } from '../../../src/models/v2/message';
import { MessageTrait } from '../../../src/models/v2/message-trait';
import { Schema } from '../../../src/models/v2/schema';
import { Server } from '../../../src/models/v2/server';
import { ServerVariable } from '../../../src/models/v2/server-variable';
import { SecurityScheme } from '../../../src/models/v2/security-scheme';

import { assertExtensions } from './assert-mixins';

describe('Components model', function() {
  describe('.servers()', function() {
    it('should return map of servers', function() {
      const doc = { servers: { server: {} } };
      const d = new Components(doc);
      expect(typeof d.servers()).toEqual('object');
      expect(Object.keys(d.servers())).toHaveLength(1);
      expect(d.servers()['server']).toBeInstanceOf(Server);
    });

    it('should return empty map when servers are not defined', function() {
      const doc = {};
      const d = new Components(doc);
      expect(typeof d.servers()).toEqual('object');
      expect(Object.keys(d.servers())).toHaveLength(0);
    });
  });

  describe('.channels()', function() {
    it('should return map of channels', function() {
      const doc = { channels: { channel: {} } };
      const d = new Components(doc);
      expect(typeof d.channels()).toEqual('object');
      expect(Object.keys(d.channels())).toHaveLength(1);
      expect(d.channels()['channel']).toBeInstanceOf(Channel);
    });

    it('should return empty map when channels are not defined', function() {
      const doc = {};
      const d = new Components(doc);
      expect(typeof d.channels()).toEqual('object');
      expect(Object.keys(d.channels())).toHaveLength(0);
    });
  });

  describe('.messages()', function() {
    it('should return map of messages', function() {
      const doc = { messages: { message: {} } };
      const d = new Components(doc);
      expect(typeof d.messages()).toEqual('object');
      expect(Object.keys(d.messages())).toHaveLength(1);
      expect(d.messages()['message']).toBeInstanceOf(Message);
    });

    it('should return empty map when messages are not defined', function() {
      const doc = {};
      const d = new Components(doc);
      expect(typeof d.messages()).toEqual('object');
      expect(Object.keys(d.messages())).toHaveLength(0);
    });
  });

  describe('.schemas()', function() {
    it('should return map of schemas', function() {
      const doc = { schemas: { schema: {} } };
      const d = new Components(doc);
      expect(typeof d.schemas()).toEqual('object');
      expect(Object.keys(d.schemas())).toHaveLength(1);
      expect(d.schemas()['schema']).toBeInstanceOf(Schema);
    });

    it('should return empty map when schemas are not defined', function() {
      const doc = {};
      const d = new Components(doc);
      expect(typeof d.schemas()).toEqual('object');
      expect(Object.keys(d.schemas())).toHaveLength(0);
    });
  });

  describe('.channelParameters()', function() {
    it('should return map of channelParameters', function() {
      const doc = { parameters: { parameter: {} } };
      const d = new Components(doc);
      expect(typeof d.channelParameters()).toEqual('object');
      expect(Object.keys(d.channelParameters())).toHaveLength(1);
      expect(d.channelParameters()['parameter']).toBeInstanceOf(ChannelParameter);
    });

    it('should return empty map when channelParameters are not defined', function() {
      const doc = {};
      const d = new Components(doc);
      expect(typeof d.channelParameters()).toEqual('object');
      expect(Object.keys(d.channelParameters())).toHaveLength(0);
    });
  });

  describe('.serverVariables()', function() {
    it('should return map of serverVariables', function() {
      const doc = { serverVariables: { variable: {} } };
      const d = new Components(doc);
      expect(typeof d.serverVariables()).toEqual('object');
      expect(Object.keys(d.serverVariables())).toHaveLength(1);
      expect(d.serverVariables()['variable']).toBeInstanceOf(ServerVariable);
    });

    it('should return empty map when serverVariables are not defined', function() {
      const doc = {};
      const d = new Components(doc);
      expect(typeof d.serverVariables()).toEqual('object');
      expect(Object.keys(d.serverVariables())).toHaveLength(0);
    });
  });

  describe('.operationTraits()', function() {
    it('should return map of operationTraits', function() {
      const doc = { operationTraits: { trait: {} } };
      const d = new Components(doc);
      expect(typeof d.operationTraits()).toEqual('object');
      expect(Object.keys(d.operationTraits())).toHaveLength(1);
      expect(d.operationTraits()['trait']).toBeInstanceOf(OperationTrait);
    });

    it('should return empty map when operationTraits are not defined', function() {
      const doc = {};
      const d = new Components(doc);
      expect(typeof d.operationTraits()).toEqual('object');
      expect(Object.keys(d.operationTraits())).toHaveLength(0);
    });
  });

  describe('.messageTraits()', function() {
    it('should return map of messageTraits', function() {
      const doc = { messageTraits: { trait: {} } };
      const d = new Components(doc);
      expect(typeof d.messageTraits()).toEqual('object');
      expect(Object.keys(d.messageTraits())).toHaveLength(1);
      expect(d.messageTraits()['trait']).toBeInstanceOf(MessageTrait);
    });

    it('should return empty map when messageTraits are not defined', function() {
      const doc = {};
      const d = new Components(doc);
      expect(typeof d.messageTraits()).toEqual('object');
      expect(Object.keys(d.messageTraits())).toHaveLength(0);
    });
  });

  describe('.correlationIds()', function() {
    it('should return map of correlationIds', function() {
      const doc = { correlationIds: { id: {} } };
      const d = new Components(doc);
      expect(typeof d.correlationIds()).toEqual('object');
      expect(Object.keys(d.correlationIds())).toHaveLength(1);
      expect(d.correlationIds()['id']).toBeInstanceOf(CorrelationId);
    });

    it('should return empty map when correlationIds are not defined', function() {
      const doc = {};
      const d = new Components(doc);
      expect(typeof d.correlationIds()).toEqual('object');
      expect(Object.keys(d.correlationIds())).toHaveLength(0);
    });
  });

  describe('.securitySchemes()', function() {
    it('should return map of securitySchemes', function() {
      const doc = { securitySchemes: { scheme: {} } };
      const d = new Components(doc);
      expect(typeof d.securitySchemes()).toEqual('object');
      expect(Object.keys(d.securitySchemes())).toHaveLength(1);
      expect(d.securitySchemes()['scheme']).toBeInstanceOf(SecurityScheme);
    });

    it('should return empty map when securitySchemes are not defined', function() {
      const doc = {};
      const d = new Components(doc);
      expect(typeof d.securitySchemes()).toEqual('object');
      expect(Object.keys(d.securitySchemes())).toHaveLength(0);
    });
  });

  describe('.serverBindings()', function() {
    it('should return map of serverBindings', function() {
      const doc = { serverBindings: { bidning: {} } };
      const d = new Components(doc);
      expect(typeof d.serverBindings()).toEqual('object');
      expect(Object.keys(d.serverBindings())).toHaveLength(1);
      expect(d.serverBindings()['bidning']).toBeInstanceOf(Bindings);
    });

    it('should return empty map when serverBindings are not defined', function() {
      const doc = {};
      const d = new Components(doc);
      expect(typeof d.serverBindings()).toEqual('object');
      expect(Object.keys(d.serverBindings())).toHaveLength(0);
    });
  });

  describe('.channelBindings()', function() {
    it('should return map of channelBindings', function() {
      const doc = { channelBindings: { bidning: {} } };
      const d = new Components(doc);
      expect(typeof d.channelBindings()).toEqual('object');
      expect(Object.keys(d.channelBindings())).toHaveLength(1);
      expect(d.channelBindings()['bidning']).toBeInstanceOf(Bindings);
    });

    it('should return empty map when channelBindings are not defined', function() {
      const doc = {};
      const d = new Components(doc);
      expect(typeof d.channelBindings()).toEqual('object');
      expect(Object.keys(d.channelBindings())).toHaveLength(0);
    });
  });

  describe('.operationBindings()', function() {
    it('should return map of operationBindings', function() {
      const doc = { operationBindings: { bidning: {} } };
      const d = new Components(doc);
      expect(typeof d.operationBindings()).toEqual('object');
      expect(Object.keys(d.operationBindings())).toHaveLength(1);
      expect(d.operationBindings()['bidning']).toBeInstanceOf(Bindings);
    });

    it('should return empty map when operationBindings are not defined', function() {
      const doc = {};
      const d = new Components(doc);
      expect(typeof d.operationBindings()).toEqual('object');
      expect(Object.keys(d.operationBindings())).toHaveLength(0);
    });
  });

  describe('.messageBindings()', function() {
    it('should return map of messageBindings', function() {
      const doc = { messageBindings: { bidning: {} } };
      const d = new Components(doc);
      expect(typeof d.messageBindings()).toEqual('object');
      expect(Object.keys(d.messageBindings())).toHaveLength(1);
      expect(d.messageBindings()['bidning']).toBeInstanceOf(Bindings);
    });

    it('should return empty map when messageBindings are not defined', function() {
      const doc = {};
      const d = new Components(doc);
      expect(typeof d.messageBindings()).toEqual('object');
      expect(Object.keys(d.messageBindings())).toHaveLength(0);
    });
  });

  describe('mixins', function() {
    assertExtensions(Components);
  });
});
