import { Components } from '../../../src/models/v3/components';
import { Bindings } from '../../../src/models/v3/bindings';
import { Channel } from '../../../src/models/v3/channel';
import { ChannelParameter } from '../../../src/models/v3/channel-parameter';
import { CorrelationId } from '../../../src/models/v3/correlation-id';
import { OperationTrait } from '../../../src/models/v3/operation-trait';
import { Message } from '../../../src/models/v3/message';
import { MessageTrait } from '../../../src/models/v3/message-trait';
import { Schema } from '../../../src/models/v3/schema';
import { Server } from '../../../src/models/v3/server';
import { ServerVariable } from '../../../src/models/v3/server-variable';
import { SecurityScheme } from '../../../src/models/v3/security-scheme';
import { BaseModel, ModelMetadata } from '../../../src/models';
import { Servers } from '../../../src/models/servers';
import { Channels } from '../../../src/models/channels';
import { Messages } from '../../../src/models/messages';
import { Collection } from '../../../src/models/collection';
import { Constructor } from '../../../src/models/utils';
import { Schemas } from '../../../src/models/schemas';
import { ChannelParameters } from '../../../src/models/channel-parameters';
import { ServerVariables } from '../../../src/models/server-variables';
import { OperationTraits } from '../../../src/models/operation-traits';
import { MessageTraits } from '../../../src/models/message-traits';
import { CorrelationIds } from '../../../src/models/correlation-ids';
import { SecuritySchemes } from '../../../src/models/security-schemes';
import { Operation } from '../../../src/models/v3/operation';
import { Operations } from '../../../src/models/operations';
import { Tags } from '../../../src/models/tags';
import { Tag } from '../../../src/models/v3/tag';
import { ExternalDocumentations } from '../../../src/models/external-documentations';
import { ExternalDocumentation } from '../../../src/models/v3/external-documentation';
import { serializeInput, assertExtensions } from './utils';

import type { v3 } from '../../../src/spec-types';

describe('Components model', function() {
  describe('.servers()', function() {
    it('should return Servers with Server Object', function() {
      const doc = serializeInput<v3.ComponentsObject>({ servers: { server: {} } });

      const d = new Components(doc);
      testCollection(doc, d.servers(), 'servers', Servers, Server);
    });

    it('should return Servers with empty server objects when servers are not defined', function() {
      const doc = serializeInput<v3.ComponentsObject>({});
      const d = new Components(doc);
      const items = d.servers();
      expect(items).toBeInstanceOf(Servers);
      expect(items.all()).toHaveLength(0);
    });
  });

  describe('.channels()', function() {
    it('should return Channels with Channel Object', function() {
      const doc = serializeInput<v3.ComponentsObject>({ channels: { channel: {} } });
      const d = new Components(doc);
      const items = d.channels();
      expect(items).toBeInstanceOf(Channels);
      expect(items.all()).toEqual([
        new Channel(doc.channels?.channel as v3.ChannelObject, {id: 'channel', pointer: '/components/channels/channel'} as ModelMetadata & { id: string, address: string } | undefined)
      ]);
    });

    it('should return Channels with empty channel objects when channels are not defined', function() {
      const doc = serializeInput<v3.ComponentsObject>({});
      const d = new Components(doc);
      const items = d.channels();
      expect(items).toBeInstanceOf(Channels);
      expect(items.all()).toHaveLength(0);
    });
  });

  describe('.operations()', function() {
    it('should return Operations with Operation Object', function() {
      const doc = serializeInput<v3.ComponentsObject>({ operations: { someOperation: {} } });
      const d = new Components(doc);
      testCollection(doc, d.operations(), 'operations', Operations, Operation);
    });

    it('should return Operations with empty operations objects when operations are not defined', function() {
      const doc = serializeInput<v3.ComponentsObject>({});
      const d = new Components(doc);
      const items = d.operations();
      expect(items).toBeInstanceOf(Operations);
      expect(items.all()).toHaveLength(0);
    });
  });

  describe('.messages()', function() {
    it('should return Messages with Message Object', function() {
      const doc = serializeInput<v3.ComponentsObject>({ messages: { message: {} } });
      const d = new Components(doc);
      testCollection(doc, d.messages(), 'messages', Messages, Message);
    });

    it('should return Messages with empty message objects when messages are not defined', function() {
      const doc = serializeInput<v3.ComponentsObject>({});
      const d = new Components(doc);
      const items = d.messages();
      expect(items).toBeInstanceOf(Messages);
      expect(items.all()).toHaveLength(0);
    });
  });

  describe('.schemas()', function() {
    it('should return Schemas with Schema Object', function() {
      const doc = serializeInput<v3.ComponentsObject>({ schemas: { schema: {} } });
      const d = new Components(doc);
      testCollection(doc, d.schemas(), 'schemas', Schemas, Schema);
    });

    it('should return Schemas with empty schema objects when schemas are not defined', function() {
      const doc = serializeInput<v3.ComponentsObject>({});
      const d = new Components(doc);
      const items = d.schemas();
      expect(items).toBeInstanceOf(Schemas);
      expect(items.all()).toHaveLength(0);
    });
  });

  describe('.channelParameters()', function() {
    it('should return ChannelParameters with ChannelParameter Object', function() {
      const doc = serializeInput<v3.ComponentsObject>({ parameters: { parameter: {} } });
      const d = new Components(doc);
      testCollection(doc, d.channelParameters(), 'parameters', ChannelParameters, ChannelParameter);
    });

    it('should return Schemas with empty schema objects when schemas are not defined', function() {
      const doc = serializeInput<v3.ComponentsObject>({});
      const d = new Components(doc);
      const items = d.channelParameters();
      expect(items).toBeInstanceOf(ChannelParameters);
      expect(items.all()).toHaveLength(0);
    });
  });

  describe('.serverVariables()', function() {
    it('should return ServerVariables with ServerVariable Object', function() {
      const doc = serializeInput<v3.ComponentsObject>({ serverVariables: { variable: {} } });
      const d = new Components(doc);
      testCollection(doc, d.serverVariables(), 'serverVariables', ServerVariables, ServerVariable);
    });

    it('should return ServerVariables with empty serverVariable objects when serverVariables are not defined', function() {
      const doc = serializeInput<v3.ComponentsObject>({});
      const d = new Components(doc);
      const items = d.serverVariables();
      expect(items).toBeInstanceOf(ServerVariables);
      expect(items.all()).toHaveLength(0);
    });
  });

  describe('.operationTraits()', function() {
    it('should return OperationTraits with OperationTrait Object', function() {
      const doc = serializeInput<v3.ComponentsObject>({ operationTraits: { trait: {} } });
      const d = new Components(doc);
      testCollection(doc, d.operationTraits(), 'operationTraits', OperationTraits, OperationTrait);
    });

    it('should return OperationTraits with empty operationTrait objects when operationTraits are not defined', function() {
      const doc = serializeInput<v3.ComponentsObject>({});
      const d = new Components(doc);
      const items = d.operationTraits();
      expect(items).toBeInstanceOf(OperationTraits);
      expect(items.all()).toHaveLength(0);
    });
  });

  describe('.messageTraits()', function() {
    it('should return MessageTraits with MessageTrait Object', function() {
      const doc = serializeInput<v3.ComponentsObject>({ messageTraits: { trait: {} } });
      const d = new Components(doc);
      testCollection(doc, d.messageTraits(), 'messageTraits', MessageTraits, MessageTrait);
    });

    it('should return MessageTraits with empty messageTrait objects when messageTraits are not defined', function() {
      const doc = serializeInput<v3.ComponentsObject>({});
      const d = new Components(doc);
      const items = d.messageTraits();
      expect(items).toBeInstanceOf(MessageTraits);
      expect(items.all()).toHaveLength(0);
    });
  });

  describe('.correlationIds()', function() {
    it('should return CorrelationIds with CorrelationId Object', function() {
      const doc = serializeInput<v3.ComponentsObject>({ correlationIds: { id: {} } });
      const d = new Components(doc);
      testCollection(doc, d.correlationIds(), 'correlationIds', CorrelationIds, CorrelationId);
    });

    it('should return CorrelationIds with empty correlationId objects when correlationIds are not defined', function() {
      const doc = serializeInput<v3.ComponentsObject>({});
      const d = new Components(doc);
      const items = d.correlationIds();
      expect(items).toBeInstanceOf(CorrelationIds);
      expect(items.all()).toHaveLength(0);
    });
  });

  describe('.securitySchemes()', function() {
    it('should return SecuritySchemes with SecurityScheme Object', function() {
      const doc = serializeInput<v3.ComponentsObject>({ securitySchemes: { scheme: {} } });
      const d = new Components(doc);
      testCollection(doc, d.securitySchemes(), 'securitySchemes', SecuritySchemes, SecurityScheme);
    });

    it('should return SecuritySchemes with empty securityScheme objects when securitySchemes are not defined', function() {
      const doc = serializeInput<v3.ComponentsObject>({});
      const d = new Components(doc);
      const items = d.securitySchemes();
      expect(items).toBeInstanceOf(SecuritySchemes);
      expect(items.all()).toHaveLength(0);
    });
  });

  describe('.tags()', function() {
    it('should return Tags with Tag Object', function() {
      const doc = serializeInput<v3.ComponentsObject>({ tags: { tag: { name: 'tag' } } });
      const d = new Components(doc);
      testCollection(doc, d.tags(), 'tags', Tags, Tag);
    });

    it('should return Tags with empty tag objects when tags are not defined', function() {
      const doc = {};
      const d = new Components(doc);
      const tags = d.tags();
      expect(tags).toBeInstanceOf(Tags);
      expect(tags.all()).toHaveLength(0);
    });
  });

  describe('.externalDocs()', function() {
    it('should return ExternalDocumentations with ExternalDocumentation Object', function() {
      const doc = serializeInput<v3.ComponentsObject>({ externalDocs: { someDoc: {} } });
      const d = new Components(doc);
      testCollection(doc, d.externalDocs(), 'externalDocs', ExternalDocumentations, ExternalDocumentation);
    });

    it('should return ExternalDocumentations with empty externalDocs objects when externalDocs are not defined', function() {
      const doc = {};
      const d = new Components(doc);
      const externalDocs = d.externalDocs();
      expect(externalDocs).toBeInstanceOf(ExternalDocumentations);
      expect(externalDocs.all()).toHaveLength(0);
    });
  });

  describe('.serverBindings()', function() {
    it('should return map of serverBindings', function() {
      const doc = serializeInput<v3.ComponentsObject>({ serverBindings: { binding: {} } });
      const d = new Components(doc);
      expect(typeof d.serverBindings()).toEqual('object');
      expect(Object.keys(d.serverBindings())).toHaveLength(1);
      expect(d.serverBindings()['binding']).toBeInstanceOf(Bindings);
    });

    it('should return empty map when serverBindings are not defined', function() {
      const doc = serializeInput<v3.ComponentsObject>({});
      const d = new Components(doc);
      expect(typeof d.serverBindings()).toEqual('object');
      expect(Object.keys(d.serverBindings())).toHaveLength(0);
    });
  });

  describe('.channelBindings()', function() {
    it('should return map of channelBindings', function() {
      const doc = serializeInput<v3.ComponentsObject>({ channelBindings: { binding: {} } });
      const d = new Components(doc);
      expect(typeof d.channelBindings()).toEqual('object');
      expect(Object.keys(d.channelBindings())).toHaveLength(1);
      expect(d.channelBindings()['binding']).toBeInstanceOf(Bindings);
    });

    it('should return empty map when channelBindings are not defined', function() {
      const doc = serializeInput<v3.ComponentsObject>({});
      const d = new Components(doc);
      expect(typeof d.channelBindings()).toEqual('object');
      expect(Object.keys(d.channelBindings())).toHaveLength(0);
    });
  });

  describe('.operationBindings()', function() {
    it('should return map of operationBindings', function() {
      const doc = serializeInput<v3.ComponentsObject>({ operationBindings: { binding: {} } });
      const d = new Components(doc);
      expect(typeof d.operationBindings()).toEqual('object');
      expect(Object.keys(d.operationBindings())).toHaveLength(1);
      expect(d.operationBindings()['binding']).toBeInstanceOf(Bindings);
    });

    it('should return empty map when operationBindings are not defined', function() {
      const doc = serializeInput<v3.ComponentsObject>({});
      const d = new Components(doc);
      expect(typeof d.operationBindings()).toEqual('object');
      expect(Object.keys(d.operationBindings())).toHaveLength(0);
    });
  });

  describe('.messageBindings()', function() {
    it('should return map of messageBindings', function() {
      const doc = serializeInput<v3.ComponentsObject>({ messageBindings: { binding: {} } });
      const d = new Components(doc);
      expect(typeof d.messageBindings()).toEqual('object');
      expect(Object.keys(d.messageBindings())).toHaveLength(1);
      expect(d.messageBindings()['binding']).toBeInstanceOf(Bindings);
    });

    it('should return empty map when messageBindings are not defined', function() {
      const doc = serializeInput<v3.ComponentsObject>({});
      const d = new Components(doc);
      expect(typeof d.messageBindings()).toEqual('object');
      expect(Object.keys(d.messageBindings())).toHaveLength(0);
    });
  });

  describe('.isEmpty()', function() {
    it('should return true if _json is empty', function() {
      const d = new Components({});
      expect(d.isEmpty()).toBeTruthy();
    });

    it('should return false if _json is not empty', function() {
      const d = new Components({ schemas: { test: {} } });
      expect(d.isEmpty()).toBeFalsy();
    });
  });

  describe('mixins', function() {
    assertExtensions(Components);
  });
});

function testCollection<M extends Collection<any>, T extends BaseModel>(doc: any, items: M, componentName: string, collectionModel: Constructor<M>, itemModel: Constructor<T>) {
  expect(items).toBeInstanceOf(collectionModel);
  const expectedItems: T[] = [];
  Object.entries((doc[componentName] as M)).forEach(([itemName, item]) => {
    expectedItems.push(new itemModel(item, {id: itemName, pointer: `/components/${componentName}/${itemName}`}));
  });

  expect(items.all()).toEqual(expectedItems);
}