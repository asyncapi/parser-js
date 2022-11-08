import fs from 'fs';
import path from 'path';

import { Parser, convertToOldAPI } from '../../src';
import { xParserSpecParsed, xParserSpecStringified } from '../../src/constants';
import { AsyncAPIDocument } from '../../src/old-api/asyncapi';
import { Info } from '../../src/old-api/info';
import { Server } from '../../src/old-api/server';
import { Channel } from '../../src/old-api/channel';
import { Components } from '../../src/old-api/components';
import { Message } from '../../src/old-api/message';
import { Schema } from '../../src/old-api/schema';
import { assertExternalDocumentationMixin, assertExtensionsMixin, assertTagsMixin } from './mixins';

/*
const simpleInputJSON = fs.readFileSync(path.resolve(__dirname, '../good/asyncapi.json'), 'utf8');
const simpleOutputJSON = '{"asyncapi":"2.0.0","info":{"title":"My API","version":"1.0.0"},"channels":{"mychannel":{"publish":{"message":{"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"<anonymous-schema-1>"},"x-parser-original-schema-format":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-original-payload":{"type":"object","properties":{"name":{"type":"string"}}},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-parsed":true,"x-parser-message-name":"<anonymous-message-1>"}}}},"components":{"messages":{"testMessage":{"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-5>"}},"x-parser-schema-id":"<anonymous-schema-4>"}},"x-parser-schema-id":"testSchema"},"x-parser-original-schema-format":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-original-payload":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}}},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-parsed":true,"x-parser-message-name":"testMessage"}},"schemas":{"testSchema":"$ref:$.components.messages.testMessage.payload"}},"x-parser-spec-parsed":true,"x-parser-spec-stringified":true}';
const circularYAML = fs.readFileSync(path.resolve(__dirname, '../good/circular-refs.yaml'), 'utf8');
const circularOutputYAML = '{"asyncapi":"2.0.0","info":{"title":"My Circular API","version":"1.0.0"},"channels":{"recursive":{"subscribe":{"message":{"payload":{"type":"object","properties":{"selfChildren":{"type":"array","items":"$ref:$.channels.recursive.subscribe.message.payload","x-parser-schema-id":"<anonymous-schema-1>"},"selfObjectChildren":{"type":"object","properties":{"test":"$ref:$.channels.recursive.subscribe.message.payload","nonRecursive":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"},"selfSomething":{"type":"object","properties":{"test":{"type":"object","properties":{"ancestorChildren":{"type":"array","items":"$ref:$.channels.recursive.subscribe.message.payload","x-parser-schema-id":"<anonymous-schema-5>"},"ancestorSomething":{"type":"string","x-parser-schema-id":"<anonymous-schema-6>"}},"x-parser-schema-id":"RecursiveAncestor"}},"x-parser-schema-id":"<anonymous-schema-4>"}},"x-parser-schema-id":"RecursiveSelf"},"x-parser-original-schema-format":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-original-payload":"$ref:$.channels.recursive.subscribe.message.payload","schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-parsed":true,"x-parser-message-name":"<anonymous-message-1>"}}},"external/file":{"publish":{"message":{"payload":{"type":"object","properties":{"testExt":{"type":"object","properties":{"children":{"type":"array","items":"$ref:$.channels.external/file.publish.message.payload","x-parser-schema-id":"<anonymous-schema-9>"}},"x-parser-schema-id":"<anonymous-schema-8>"}},"x-parser-schema-id":"<anonymous-schema-7>"},"x-parser-original-schema-format":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-original-payload":"$ref:$.channels.external/file.publish.message.payload","schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-parsed":true,"x-parser-message-name":"<anonymous-message-2>"}}},"nonRecursive":{"subscribe":{"message":{"payload":{"type":"object","properties":{"child":{"type":"object","properties":{"value":{"type":"string","x-parser-schema-id":"<anonymous-schema-10>"}},"x-parser-schema-id":"NonRecursiveChild"}},"x-parser-schema-id":"NonRecursive"},"x-parser-original-schema-format":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-original-payload":{"type":"object","properties":{"child":{"type":"object","properties":{"value":{"type":"string"}}}}},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-parsed":true,"x-parser-message-name":"<anonymous-message-3>"}}},"testChannel":{"subscribe":{"message":{"oneOf":[{"contentType":"application/json","payload":{"type":"object","properties":{"schemaBReference":{"type":"string","enum":["ENUM_A","ENUM_B","ENUM_C","ENUM_D"],"x-parser-schema-id":"NormalSchemaB"},"schemaCReference":{"allOf":["$ref:$.channels.testChannel.subscribe.message.oneOf[0].payload.properties.schemaBReference",{"type":"string","enum":["ENUM_E"],"x-parser-schema-id":"<anonymous-schema-11>"}],"x-parser-schema-id":"NormalSchemaC"},"commonEnumName":{"type":"string","enum":["ENUM_1","ENUM_2"],"x-parser-schema-id":"<anonymous-schema-12>"}},"x-parser-schema-id":"NormalSchemaA"},"x-parser-original-schema-format":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-original-payload":{"type":"object","properties":{"schemaBReference":{"type":"string","enum":["ENUM_A","ENUM_B","ENUM_C","ENUM_D"]},"schemaCReference":{"allOf":["$ref:$.channels.testChannel.subscribe.message.oneOf[0].x-parser-original-payload.properties.schemaBReference",{"type":"string","enum":["ENUM_E"]}]},"commonEnumName":{"type":"string","enum":["ENUM_1","ENUM_2"]}}},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-parsed":true,"x-parser-message-name":"testMessage"}]}}}},"components":{"messages":{"testMessage":"$ref:$.channels.testChannel.subscribe.message.oneOf[0]"},"schemas":{"NonRecursive":"$ref:$.channels.nonRecursive.subscribe.message.payload","NonRecursiveChild":"$ref:$.channels.nonRecursive.subscribe.message.payload.properties.child","RecursiveSelf":"$ref:$.channels.recursive.subscribe.message.payload","RecursiveAncestor":"$ref:$.channels.recursive.subscribe.message.payload.properties.selfSomething.properties.test","NormalSchemaA":"$ref:$.channels.testChannel.subscribe.message.oneOf[0].payload","NormalSchemaB":"$ref:$.channels.testChannel.subscribe.message.oneOf[0].payload.properties.schemaBReference","NormalSchemaC":"$ref:$.channels.testChannel.subscribe.message.oneOf[0].payload.properties.schemaCReference","NestedAllOfSchema":{"allOf":["$ref:$.channels.testChannel.subscribe.message.oneOf[0].payload",{"type":"object","properties":{"parent":{"allOf":["$ref:$.components.schemas.NestedAllOfSchema","$ref:$.channels.testChannel.subscribe.message.oneOf[0].payload"],"x-parser-schema-id":"<anonymous-schema-14>"},"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-15>"}},"required":["name"],"x-parser-schema-id":"<anonymous-schema-13>"}],"x-parser-schema-id":"NestedAllOfSchema"},"OneOf":{"type":"object","properties":{"kind":{"oneOf":["$ref:$.components.schemas.OneOf",{"type":"string","x-parser-schema-id":"<anonymous-schema-17>"},{"enum":["boolean","string"],"x-parser-schema-id":"<anonymous-schema-18>"}],"x-parser-schema-id":"<anonymous-schema-16>"}},"x-parser-schema-id":"OneOf"},"AnyOf":{"anyOf":[{"type":"integer","x-parser-schema-id":"<anonymous-schema-19>"},{"type":"number","x-parser-schema-id":"<anonymous-schema-20>"},{"type":"string","x-parser-schema-id":"<anonymous-schema-21>"},{"type":"boolean","x-parser-schema-id":"<anonymous-schema-22>"},{"type":"object","x-parser-schema-id":"<anonymous-schema-23>"},{"type":"array","items":"$ref:$.components.schemas.AnyOf","x-parser-schema-id":"<anonymous-schema-24>"}],"x-parser-schema-id":"AnyOf"},"RecursiveComplex":{"type":["object","array"],"patternProperties":{"^foo":"$ref:$.channels.recursive.subscribe.message.payload","^bar":{"type":"string","x-parser-schema-id":"<anonymous-schema-25>"}},"contains":"$ref:$.components.schemas.RecursiveComplex","items":[{"type":"string","x-parser-schema-id":"<anonymous-schema-26>"},"$ref:$.components.schemas.RecursiveComplex"],"if":"$ref:$.channels.recursive.subscribe.message.payload.properties.selfSomething.properties.test","then":"$ref:$.components.schemas.RecursiveComplex","x-parser-schema-id":"RecursiveComplex"}}},"x-parser-circular":true,"x-parser-spec-parsed":true,"x-parser-spec-stringified":true}';
*/

describe('AsyncAPIDocument', function() {
  const parser = new Parser();

  describe('info()', function() {
    it('should return an info object', function() {
      const doc: any = { info: { title: 'Test', version: '1.2.3', license: { name: 'Apache 2.0', url: 'https://www.apache.org/licenses/LICENSE-2.0' } } };
      const d = new AsyncAPIDocument(doc);
      expect(d.info()).toBeInstanceOf(Info);
      expect(d.info().json()).toEqual(doc.info);
    });
  });

  describe('id()', function() {
    it('should return the id string', function() {
      const doc: any = { id: 'urn:test' };
      const d = new AsyncAPIDocument(doc);
      expect(d.id()).toEqual(doc.id);
    });
  });

  describe('hasServers()', function() {
    it('should return a boolean indicating if the AsyncAPI document has servers', function() {
      const doc: any = { servers: { test1: { url: 'test1' }, test2: { url: 'test2' } } };
      const docNoServers: any = { test: 'testing' };
      const d = new AsyncAPIDocument(doc);
      const d2 = new AsyncAPIDocument(docNoServers);
      expect(d.hasServers()).toEqual(true);
      expect(d2.hasServers()).toEqual(false);
    });
  });

  describe('servers()', function() {
    it('should return a map of server objects', function() {
      const doc: any = { servers: { test1: { url: 'test1' }, test2: { url: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(typeof d.servers()).toEqual('object');
      expect(d.servers().test1).toBeInstanceOf(Server);
      expect(d.servers().test1.json()).toEqual(doc.servers.test1);
      expect(d.servers().test2).toBeInstanceOf(Server);
      expect(d.servers().test2.json()).toEqual(doc.servers.test2);
    });

    it('should return an empty object if the AsyncAPI document has no defined servers', function() {
      const doc: any = {};
      const d = new AsyncAPIDocument(doc);
      expect(typeof d.servers()).toEqual('object');
      expect(d.servers()).toEqual({});
    });
  });

  describe('serverNames()', function() {
    it('should return an array of strings', function() {
      const doc: any = { servers: { test1: { url: 'test1' }, test2: { url: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(Array.isArray(d.serverNames())).toEqual(true);
      expect(d.serverNames()).toEqual(['test1', 'test2']);
    });

    it('should return an empty array if the AsyncAPI document has no defined servers', function() {
      const doc: any = {};
      const d = new AsyncAPIDocument(doc);
      expect(Array.isArray(d.serverNames())).toEqual(true);
      expect(d.serverNames()).toEqual([]);
    });
  });

  describe('server()', function() {
    it('should return a specific server object', function() {
      const doc: any = { servers: { test1: { url: 'test1' }, test2: { url: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(d.server('test1')).toBeInstanceOf(Server);
      expect(d.server('test1')?.json()).toEqual(doc.servers.test1);
    });

    it('should return null if a server name is not provided', function() {
      const doc: any = { servers: { test1: { url: 'test1' }, test2: { url: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(d.server(undefined as any)).toEqual(null);
    });

    it('should return null if a server name is not found', function() {
      const doc: any = { servers: { test1: { url: 'test1' }, test2: { url: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(d.server('not found')).toEqual(null);
    });
  });

  describe('hasDefaultContentType()', function() {
    it('should return true if field exists', function() {
      const doc: any = { defaultContentType: 'application/json' };
      const d = new AsyncAPIDocument(doc);
      expect(d.hasDefaultContentType()).toEqual(true);
    });

    it('should return false if field does not exist', function() {
      const doc: any = {};
      const d = new AsyncAPIDocument(doc);
      expect(d.hasDefaultContentType()).toEqual(false);
    });
  });

  describe('defaultContentType()', function() {
    it('should return string if field exists', function() {
      const doc: any = { defaultContentType: 'application/json' };
      const d = new AsyncAPIDocument(doc);
      expect(d.defaultContentType()).toEqual('application/json');
    });

    it('should return null if field does not exist', function() {
      const doc: any = {};
      const d = new AsyncAPIDocument(doc);
      expect(d.defaultContentType()).toEqual(null);
    });
  });

  describe('hasChannels()', function() {
    it('should return a boolean indicating if the AsyncAPI document has channels', function() {
      const doc: any = { channels: { test1: { description: 'test1' }, test2: { description: 'test2' } } };
      const docNoChannels: any = { test: 'testing' };
      const d = new AsyncAPIDocument(doc);
      const d2 = new AsyncAPIDocument(docNoChannels);
      expect(d.hasChannels()).toEqual(true);
      expect(d2.hasChannels()).toEqual(false);
    });
  });

  describe('channels()', function() {
    it('should return a map of channel objects', function() {
      const doc: any = { channels: { test1: { description: 'test1' }, test2: { description: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(typeof d.channels()).toEqual('object');
      expect(d.channels().test1).toBeInstanceOf(Channel);
      expect(d.channels().test1.json()).toEqual(doc.channels.test1);
      expect(d.channels().test2).toBeInstanceOf(Channel);
      expect(d.channels().test2.json()).toEqual(doc.channels.test2);
    });

    it('should return an empty object if the AsyncAPI document has no defined channels', function() {
      const doc: any = {};
      const d = new AsyncAPIDocument(doc);
      expect(typeof d.channels()).toEqual('object');
      expect(d.servers()).toEqual({});
    });
  });

  describe('channelNames()', function() {
    it('should return an array of strings', function() {
      const doc: any = { channels: { test1: { description: 'test1' }, test2: { description: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(Array.isArray(d.channelNames())).toEqual(true);
      expect(d.channelNames()).toEqual(['test1', 'test2']);
    });

    it('should return an empty array if the AsyncAPI document has no defined channels', function() {
      const doc: any = {};
      const d = new AsyncAPIDocument(doc);
      expect(Array.isArray(d.channelNames())).toEqual(true);
      expect(d.channelNames()).toEqual([]);
    });
  });

  describe('channel()', function() {
    it('should return a specific channel object', function() {
      const doc: any = { channels: { test1: { description: 'test1' }, test2: { description: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(d.channel('test1')).toBeInstanceOf(Channel);
      expect(d.channel('test1')?.json()).toEqual(doc.channels.test1);
    });

    it('should return null if a channel name is not provided', function() {
      const doc: any = { channels: { test1: { description: 'test1' }, test2: { description: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(d.channel(undefined as any)).toEqual(null);
    });

    it('should return null if a channel name is not found', function() {
      const doc: any = { channels: { test1: { description: 'test1' }, test2: { description: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(d.channel('not found')).toEqual(null);
    });
  });

  describe('hasComponents()', function() {
    it('should return a boolean indicating if the AsyncAPI document has components', function() {
      const doc: any = { components: { test1: { description: 'test1' }, test2: { description: 'test2' } } };
      const docNoComponents: any = { test: 'testing' };
      const d = new AsyncAPIDocument(doc);
      const d2 = new AsyncAPIDocument(docNoComponents);
      expect(d.hasComponents()).toEqual(true);
      expect(d2.hasComponents()).toEqual(false);
    });
  });

  describe('components()', function() {
    it('should return the components object', function() {
      const doc: any = { components: { test: 'testing' } };
      const d = new AsyncAPIDocument(doc);
      expect(d.components()).toBeInstanceOf(Components);
      expect(d.components()?.json()).toEqual(doc.components);
    });
  });

  describe('hasMessages()', function() {
    it('should return true if there is a message in components but not in channels', function() {
      const doc: any = { components: { messages: { test: { test: true, k: 3 } } } };
      const d = new AsyncAPIDocument(doc);
      expect(d.hasMessages()).toEqual(true);
    });
    it('should return true if there is a message in channels operations but not in components', function() {
      const doc: any = { channels: { test: { publish: { message: { name: 'test', test: false, k: 1 } } } } };
      const d = new AsyncAPIDocument(doc);
      expect(d.hasMessages()).toEqual(true);
    });
    it('should return false if there are no messages neither in components nor in channels operations', function() {
      const doc: any = { channels: { test: { publish: { } } }, components: { } };
      const d = new AsyncAPIDocument(doc);
      expect(d.hasMessages()).toEqual(false);
    });
  });

  describe('allMessages()', function() {
    it('should return an array with all the messages used in the document and overwrite the message from channel', async function() {
      const doc: any = { asyncapi: '2.0.0', info: { title: 'AsyncAPI Test', version: '0.1.0' }, channels: { test: { publish: { message: { name: 'test' } } } }, components: { messages: { test: {} } } };
      const { document } = await parser.parse(doc);
      const d = convertToOldAPI(document!);
      const allMessages = d.allMessages();
      expect(allMessages.size).toEqual(1);
      expect(allMessages.get('test')).toBeInstanceOf(Message);
    });

    it('should return an array with all the messages used in the document', async function() {
      const doc: any = { asyncapi: '2.0.0', info: { title: 'AsyncAPI Test', version: '0.1.0' }, channels: { test: { publish: { message: {} } }, test2: { subscribe: { message: { name: 'test' } } } }, components: { messages: { test: {} } } };
      const { document } = await parser.parse(doc);
      const d = convertToOldAPI(document!);
      expect(d.allMessages().size).toEqual(2);
      d.allMessages().forEach(t => {
        expect(t).toBeInstanceOf(Message);
      });
    });
  });

  describe('allSchemas()', function() {
    it('should return additional items schemas when no items specified', async function() {
      const doc: any = {
        asyncapi: '2.0.0',
        info: {
          title: 'AsyncAPI Test',
          version: '0.1.0',
        },
        channels: {
          some_channel: {
            subscribe: {
              message: {
                name: 'some_map',
                payload: {
                  type: 'array',
                  $id: 'payloadSchema',
                  test: true,
                  additionalItems: {
                    type: 'string',
                    $id: 'additionalItemSchema', 
                    test: true
                  }
                }
              }
            }
          }
        }
      };
      const { document } = await parser.parse(doc);
      const d = convertToOldAPI(document!);
      const schemas = d.allSchemas();
      expect(schemas.size).toEqual(2);
      //Ensure the actual keys are as expected
      const schemaKeys = Array.from(schemas.keys());
      expect(schemaKeys).toEqual([
        'payloadSchema',
        'additionalItemSchema'
      ]);
      for (const t of schemas.values()) {
        expect(t).toBeInstanceOf(Schema);
        expect((t.json() as any).test).toEqual(true);
      }
    });

    it('should return additional property schemas when no properties are specified', async function() {
      const doc: any = {
        asyncapi: '2.0.0',
        info: {
          title: 'AsyncAPI Test',
          version: '0.1.0',
        },
        channels: {
          some_channel: {
            subscribe: {
              message: {
                name: 'some_map',
                payload: {
                  type: 'object',
                  $id: 'payloadSchema',
                  test: true,
                  additionalProperties: {
                    type: 'string',
                    $id: 'additionalPropSchema', 
                    test: true
                  }
                }
              }
            }
          }
        }
      };
      const { document } = await parser.parse(doc);
      const d = convertToOldAPI(document!);
      const schemas = d.allSchemas();
      expect(schemas.size).toEqual(2);
      //Ensure the actual keys are as expected
      const schemaKeys = Array.from(schemas.keys());
      expect(schemaKeys).toEqual([
        'payloadSchema',
        'additionalPropSchema'
      ]);
      for (const t of schemas.values()) {
        expect(t).toBeInstanceOf(Schema);
        expect((t.json() as any).test).toEqual(true);
      }
    });

    it('should return a map with all the schemas used in the document', async function() {
      const doc: any = { asyncapi: '2.0.0', info: { title: 'AsyncAPI Test', version: '0.1.0' }, channels: { test: { parameters: { testParam1: { schema: { $id: 'testParamSchema', test: true, k: 0 } } }, publish: { message: { headers: { type: 'object', test: true, k: 1 }, payload: { test: true, k: 2 } } } }, test2: { subscribe: { message: { payload: { $id: 'testPayload', test: true, k: 2 } } } } }, components: { schemas: { testSchema: { test: true, k: 3 } } } };
      const { document } = await parser.parse(doc);
      const d = convertToOldAPI(document!);
      const schemas = d.allSchemas();
      expect(schemas.size).toEqual(5);

      //Ensure the actual keys are as expected
      const schemaKeys = Array.from(schemas.keys());
      expect(schemaKeys).toEqual([
        'testParamSchema',
        '<anonymous-schema-1>',
        '<anonymous-schema-2>',
        'testPayload',
        'testSchema'
      ]);
      for (const t of schemas.values()) {
        expect(t).toBeInstanceOf(Schema);
        expect((t.json() as any).test).toEqual(true);
      }
    });

    it('should return a map with all the nested schemas', async function() {
      const nestedSchemas = fs.readFileSync(path.resolve(__dirname, '../mocks/nested-schemas.yaml'), 'utf8');
      const { document } = await parser.parse(nestedSchemas);
      const d = convertToOldAPI(document!);
      const schemas = d.allSchemas();

      // const doc = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../mocks/nested-schemas.json'), 'utf8'));
      // const d = new AsyncAPIDocument(doc);

      //Ensure the actual keys are as expected
      const schemaKeys = Array.from(schemas.keys());
      expect(schemaKeys).toEqual([
        'testParamSchema',
        'testParamNestedSchemaProp',
        'testParamNestedNestedSchemaProp2',
        'testHeaderSchema',
        'testHeaderNestedSchemaProp',
        'testHeaderNestedNestedSchemaProp1',
        'testHeaderNestedSchemaPropArray',
        'testHeaderNestedSchemaPropArrayProp1',
        'testPayloadSchema',
        'testPayloadNestedSchemaProp',
        'testPayloadNestedNestedSchemaProp1',
        'testPayloadNestedSchemaPropArray',
        'testPayloadNestedSchemaPropArrayProp1',
        'testPayload',
        'testComponentSchemaSchema',
        'testComponentSchemaNestedSchemaPropAllOf',
        'testComponentSchemaNestedSchemaPropAllOfSchema1',
        'testComponentSchemaNestedSchemaPropAllOfSchema1Prop1',
        'testComponentSchemaNestedSchemaPropAllOfSchema2',
        'testComponentSchemaNestedSchemaPropAllOfSchema2Prop1',
        'testComponentSchemaNestedSchemaPropArray',
        'testComponentSchemaNestedSchemaPropArrayProp1',
        'testComponentSchemaNestedSchemaPropArrayProp2',
        'testComponentSchemaNestedSchemaPropPatternProperties',
        'testComponentSchemaNestedSchemaPropPatternPropertiesProp1',
        'testComponentSchemaNestedSchemaPropPatternPropertiesProp2',
        'testComponentSchemaNestedSchemaPropConditional',
        'testComponentSchemaNestedSchemaPropConditionalIf',
        'testComponentSchemaNestedSchemaPropConditionalThen',
        'testComponentSchemaNestedSchemaPropConditionalElse',
        'testComponentSchemaNestedSchemaPropDependencies',
        'testComponentSchemaNestedSchemaPropDependenciesDep1',
        'testComponentSchemaNestedSchemaPropDependenciesDep3',
        'testComponentSchemaNestedSchemaPropDefinitions',
        'testComponentSchemaNestedSchemaPropDefinitionsDef1',
        'testComponentSchemaNestedSchemaPropDefinitionsDef2',
        'testComponentSchemaNestedSchemaPropMisc',
        'testComponentSchemaNestedSchemaPropMiscPropertyNames',
        'testComponentSchemaNestedSchemaPropMiscContains',
        'testComponentSchemaNestedSchemaPropMiscNot',
      ]);
      for (const t of schemas.values()) {
        expect(t).toBeInstanceOf(Schema);
        expect((t.json() as any).test).toEqual(true);
      }
    });
  });

  /* eslint-disable sonarjs/cognitive-complexity */
  describe('traverseSchemas()', function() { // NOSONAR
    let d: AsyncAPIDocument;
    beforeEach(async () => {
      const nestedSchemas = fs.readFileSync(path.resolve(__dirname, '../mocks/nested-schemas.yaml'), 'utf8');
      const { document } = await parser.parse(nestedSchemas);
      d = convertToOldAPI(document!);
    });

    const parameterSchemas = [
      'testParamSchema',
      'testParamNestedSchemaProp',
      'testParamNestedNestedSchemaProp2'
    ];
    const headerObjectSchemas = [
      'testHeaderSchema',
      'testHeaderNestedSchemaProp',
      'testHeaderNestedNestedSchemaProp1',
    ];
    const headerArraySchemas = [
      'testHeaderNestedSchemaPropArray',
      'testHeaderNestedSchemaPropArrayProp1'
    ];
    const payloadObjectSchemas = [
      'testPayloadSchema',
      'testPayloadNestedSchemaProp',
      'testPayloadNestedNestedSchemaProp1'
    ];
    const payloadArraySchemas = [
      'testPayloadNestedSchemaPropArray',
      'testPayloadNestedSchemaPropArrayProp1'
    ];
    const payloadSchemas = [
      'testPayload'
    ];
    const componentObjectAllOfSchema = [
      'testComponentSchemaNestedSchemaPropAllOf',
    ];
    const componentObjectAllOfSchemas = [
      'testComponentSchemaNestedSchemaPropAllOf',
      'testComponentSchemaNestedSchemaPropAllOfSchema1',
      'testComponentSchemaNestedSchemaPropAllOfSchema1Prop1',
      'testComponentSchemaNestedSchemaPropAllOfSchema2',
      'testComponentSchemaNestedSchemaPropAllOfSchema2Prop1',
    ];
    const componentObjectSchemas = [
      'testComponentSchemaSchema'
    ];
    const componentArraySchemas = [
      'testComponentSchemaNestedSchemaPropArray',
      'testComponentSchemaNestedSchemaPropArrayProp1',
      'testComponentSchemaNestedSchemaPropArrayProp2'
    ];
    const componentPatternPropertiesSchema = [
      'testComponentSchemaNestedSchemaPropPatternProperties',
    ];
    const componentPatternPropertiesSchemas = [
      ...componentPatternPropertiesSchema,
      'testComponentSchemaNestedSchemaPropPatternPropertiesProp1',
      'testComponentSchemaNestedSchemaPropPatternPropertiesProp2',
    ];
    const componentConditionalSchema = [
      'testComponentSchemaNestedSchemaPropConditional',
    ];
    const componentConditionalSchemas = [
      ...componentConditionalSchema,
      'testComponentSchemaNestedSchemaPropConditionalIf',
      'testComponentSchemaNestedSchemaPropConditionalThen',
      'testComponentSchemaNestedSchemaPropConditionalElse',
    ];
    const componentDependenciesSchema = [
      'testComponentSchemaNestedSchemaPropDependencies',
    ];
    const componentDependenciesSchemas = [
      ...componentDependenciesSchema,
      'testComponentSchemaNestedSchemaPropDependenciesDep1',
      'testComponentSchemaNestedSchemaPropDependenciesDep3',
    ];
    const componentDefinitionsSchema = [
      'testComponentSchemaNestedSchemaPropDefinitions',
    ];
    const componentDefinitionsSchemas = [
      ...componentDefinitionsSchema,
      'testComponentSchemaNestedSchemaPropDefinitionsDef1',
      'testComponentSchemaNestedSchemaPropDefinitionsDef2',
    ];
    const componentMiscSchema = [
      'testComponentSchemaNestedSchemaPropMisc',
    ];
    const componentMiscSchemas = [
      ...componentMiscSchema,
      'testComponentSchemaNestedSchemaPropMiscPropertyNames',
      'testComponentSchemaNestedSchemaPropMiscContains',
      'testComponentSchemaNestedSchemaPropMiscNot',
    ];

    it('should not include parameter schemas if defined', function() {
      const schemas = new Map();
      const cb = (schema) => {
        schemas.set(schema.uid(), schema);
      };
      d.traverseSchemas(cb, [
        'objects',
        'arrays',
        'components',
        'oneOfs', 
        'allOfs',
        'anyOfs',
        'payloads',
        'headers',
        'patternProperties',
        'ifs',
        'thenes',
        'elses',
        'dependencies',
        'definitions',
      ]);

      //Ensure the actual keys are as expected
      const schemaKeys = Array.from(schemas.keys());
      expect(schemaKeys).toEqual([
        ...headerObjectSchemas,
        ...headerArraySchemas,
        ...payloadObjectSchemas,
        ...payloadArraySchemas,
        ...payloadSchemas,
        ...componentObjectSchemas,
        ...componentObjectAllOfSchemas,
        ...componentArraySchemas,
        ...componentPatternPropertiesSchemas,
        ...componentConditionalSchemas,
        ...componentDependenciesSchemas,
        ...componentDefinitionsSchemas,
        ...componentMiscSchema,
      ]);
      for (const t of schemas.values()) {
        expect(t).toBeInstanceOf(Schema);
        expect(t.json().test).toEqual(true);
      }
    });

    it('should not include payload schemas if defined', function() {
      const schemas = new Map();
      const cb = (schema) => {
        schemas.set(schema.uid(), schema);
      };
      d.traverseSchemas(cb, [
        'objects',
        'arrays',
        'components',
        'oneOfs', 
        'allOfs',
        'anyOfs',
        'parameters',
        'headers',
        'patternProperties',
        'ifs',
        'thenes',
        'elses',
        'dependencies',
        'definitions',
      ]);

      //Ensure the actual keys are as expected
      const schemaKeys = Array.from(schemas.keys());
      expect(schemaKeys).toEqual([
        ...parameterSchemas,
        ...headerObjectSchemas,
        ...headerArraySchemas,
        ...componentObjectSchemas,
        ...componentObjectAllOfSchemas,
        ...componentArraySchemas,
        ...componentPatternPropertiesSchemas,
        ...componentConditionalSchemas,
        ...componentDependenciesSchemas,
        ...componentDefinitionsSchemas,
        ...componentMiscSchema,
      ]);
      for (const t of schemas.values()) {
        expect(t).toBeInstanceOf(Schema);
        expect(t.json().test).toEqual(true);
      }
    });

    it('should not include header schemas if defined', function() {
      const schemas = new Map();
      const cb = (schema) => {
        schemas.set(schema.uid(), schema);
      };
      d.traverseSchemas(cb, [
        'objects',
        'arrays',
        'components',
        'oneOfs', 
        'allOfs',
        'anyOfs',
        'parameters',
        'payloads',
        'patternProperties',
        'ifs',
        'thenes',
        'elses',
        'dependencies',
        'definitions',
      ]);

      //Ensure the actual keys are as expected
      const schemaKeys = Array.from(schemas.keys());
      expect(schemaKeys).toEqual([
        ...parameterSchemas,
        ...payloadObjectSchemas,
        ...payloadArraySchemas,
        ...payloadSchemas,
        ...componentObjectSchemas,
        ...componentObjectAllOfSchemas,
        ...componentArraySchemas,
        ...componentPatternPropertiesSchemas,
        ...componentConditionalSchemas,
        ...componentDependenciesSchemas,
        ...componentDefinitionsSchemas,
        ...componentMiscSchema,
      ]);
      for (const t of schemas.values()) {
        expect(t).toBeInstanceOf(Schema);
        expect(t.json().test).toEqual(true);
      }
    });

    it('should not include arrays if defined', function() {
      const schemas = new Map();
      const cb = (schema) => {
        schemas.set(schema.uid(), schema);
      };
      d.traverseSchemas(cb, [
        'objects',
        'components',
        'oneOfs', 
        'allOfs',
        'anyOfs',
        'parameters',
        'payloads',
        'headers',
        'patternProperties',
        'ifs',
        'thenes',
        'elses',
        'dependencies',
        'definitions',
      ]);

      //Ensure the actual keys are as expected
      const schemaKeys = Array.from(schemas.keys());
      expect(schemaKeys).toEqual([
        ...parameterSchemas,
        ...headerObjectSchemas,
        ...payloadObjectSchemas,
        ...payloadSchemas,
        ...componentObjectSchemas,
        ...componentObjectAllOfSchemas,
        ...componentPatternPropertiesSchemas,
        ...componentConditionalSchemas,
        ...componentDependenciesSchemas,
        ...componentDefinitionsSchemas,
      ]);
      for (const t of schemas.values()) {
        expect(t).toBeInstanceOf(Schema);
        expect(t.json().test).toEqual(true);
      }
    });

    it('should not include components if defined', function() {
      const schemas = new Map();
      const cb = (schema) => {
        schemas.set(schema.uid(), schema);
      };
      d.traverseSchemas(cb, [
        'objects',
        'arrays',
        'oneOfs', 
        'allOfs',
        'anyOfs',
        'parameters',
        'payloads',
        'headers',
      ]);

      //Ensure the actual keys are as expected
      const schemaKeys = Array.from(schemas.keys());
      expect(schemaKeys).toEqual([
        ...parameterSchemas,
        ...headerObjectSchemas,
        ...headerArraySchemas,
        ...payloadObjectSchemas,
        ...payloadArraySchemas,
        ...payloadSchemas,
      ]);
      for (const t of schemas.values()) {
        expect(t).toBeInstanceOf(Schema);
        expect(t.json().test).toEqual(true);
      }
    });

    it('should not include combined schemas if defined', function() {
      const schemas = new Map();
      const cb = (schema) => {
        schemas.set(schema.uid(), schema);
      };
      d.traverseSchemas(cb, [
        'objects',
        'arrays',
        'parameters',
        'payloads',
        'headers',
        'components',
        'patternProperties',
        'ifs',
        'thenes',
        'elses',
        'dependencies',
        'definitions',
      ]);

      //Ensure the actual keys are as expected
      const schemaKeys = Array.from(schemas.keys());
      expect(schemaKeys).toEqual([
        ...parameterSchemas,
        ...headerObjectSchemas,
        ...headerArraySchemas,
        ...payloadObjectSchemas,
        ...payloadArraySchemas,
        ...payloadSchemas,
        ...componentObjectSchemas,
        ...componentObjectAllOfSchema,
        ...componentArraySchemas,
        ...componentPatternPropertiesSchemas,
        ...componentConditionalSchemas,
        ...componentDependenciesSchemas,
        ...componentDefinitionsSchemas,
        ...componentMiscSchema,
      ]);
      for (const t of schemas.values()) {
        expect(t).toBeInstanceOf(Schema);
        expect(t.json().test).toEqual(true);
      }
    });

    it('should not include conditional schemas if defined', function() {
      const schemas = new Map();
      const cb = (schema) => {
        schemas.set(schema.uid(), schema);
      };
      d.traverseSchemas(cb, [
        'objects',
        'arrays',
        'parameters',
        'payloads',
        'headers',
        'components',
        'patternProperties',
        'dependencies',
        'definitions',
      ]);

      //Ensure the actual keys are as expected
      const schemaKeys = Array.from(schemas.keys());
      expect(schemaKeys).toEqual([
        ...parameterSchemas,
        ...headerObjectSchemas,
        ...headerArraySchemas,
        ...payloadObjectSchemas,
        ...payloadArraySchemas,
        ...payloadSchemas,
        ...componentObjectSchemas,
        ...componentObjectAllOfSchema,
        ...componentArraySchemas,
        ...componentPatternPropertiesSchemas,
        ...componentConditionalSchema,
        ...componentDependenciesSchemas,
        ...componentDefinitionsSchemas,
        ...componentMiscSchema,
      ]);
      for (const t of schemas.values()) {
        expect(t).toBeInstanceOf(Schema);
        expect(t.json().test).toEqual(true);
      }
    });

    it('should not include dependencies schemas if defined', function() {
      const schemas = new Map();
      const cb = (schema) => {
        schemas.set(schema.uid(), schema);
      };
      d.traverseSchemas(cb, [
        'objects',
        'arrays',
        'parameters',
        'payloads',
        'headers',
        'components',
        'patternProperties',
        'ifs',
        'thenes',
        'elses',
        'definitions',
      ]);

      //Ensure the actual keys are as expected
      const schemaKeys = Array.from(schemas.keys());
      expect(schemaKeys).toEqual([
        ...parameterSchemas,
        ...headerObjectSchemas,
        ...headerArraySchemas,
        ...payloadObjectSchemas,
        ...payloadArraySchemas,
        ...payloadSchemas,
        ...componentObjectSchemas,
        ...componentObjectAllOfSchema,
        ...componentArraySchemas,
        ...componentPatternPropertiesSchemas,
        ...componentConditionalSchemas,
        ...componentDependenciesSchema,
        ...componentDefinitionsSchemas,
        ...componentMiscSchema,
      ]);
      for (const t of schemas.values()) {
        expect(t).toBeInstanceOf(Schema);
        expect(t.json().test).toEqual(true);
      }
    });

    it('should not include definitions schemas if defined', function() {
      const schemas = new Map();
      const cb = (schema) => {
        schemas.set(schema.uid(), schema);
      };
      d.traverseSchemas(cb, [
        'objects',
        'arrays',
        'parameters',
        'payloads',
        'headers',
        'components',
        'patternProperties',
        'ifs',
        'thenes',
        'elses',
        'dependencies',
      ]);

      //Ensure the actual keys are as expected
      const schemaKeys = Array.from(schemas.keys());
      expect(schemaKeys).toEqual([
        ...parameterSchemas,
        ...headerObjectSchemas,
        ...headerArraySchemas,
        ...payloadObjectSchemas,
        ...payloadArraySchemas,
        ...payloadSchemas,
        ...componentObjectSchemas,
        ...componentObjectAllOfSchema,
        ...componentArraySchemas,
        ...componentPatternPropertiesSchemas,
        ...componentConditionalSchemas,
        ...componentDependenciesSchemas,
        ...componentDefinitionsSchema,
        ...componentMiscSchema,
      ]);
      for (const t of schemas.values()) {
        expect(t).toBeInstanceOf(Schema);
        expect(t.json().test).toEqual(true);
      }
    });
    it('should include all schemas', function() {
      const schemas = new Map();
      const cb = (schema) => {
        schemas.set(schema.uid(), schema);
      };
      d.traverseSchemas(cb);

      //Ensure the actual keys are as expected
      const schemaKeys = Array.from(schemas.keys());
      expect(schemaKeys).toEqual([
        ...parameterSchemas,
        ...headerObjectSchemas,
        ...headerArraySchemas,
        ...payloadObjectSchemas,
        ...payloadArraySchemas,
        ...payloadSchemas,
        ...componentObjectSchemas,
        ...componentObjectAllOfSchemas,
        ...componentArraySchemas,
        ...componentPatternPropertiesSchemas,
        ...componentConditionalSchemas,
        ...componentDependenciesSchemas,
        ...componentDefinitionsSchemas,
        ...componentMiscSchemas,
      ]);
      for (const t of schemas.values()) {
        expect(t).toBeInstanceOf(Schema);
        expect(t.json().test).toEqual(true);
      }
    });
  });
  /* eslint-enable sonarjs/cognitive-complexity */

  describe('stringify()', function() {
    it('should stringify simple document', async function() {
      const source = path.resolve(__dirname, '../mocks/simple-with-refs.yaml');
      const nestedSchemas = fs.readFileSync(source, 'utf8');
      const { document } = await parser.parse(nestedSchemas, { source });
      const doc = convertToOldAPI(document!);
      const output = {asyncapi: '2.0.0',info: {title: 'Test API',version: '1.0.0'},channels: {mychannel: {publish: {message: {payload: {type: 'object',properties: {name: {type: 'string','x-parser-schema-id': '<anonymous-schema-2>'}},'x-parser-schema-id': '<anonymous-schema-1>'},'x-parser-message-name': '<anonymous-message-1>','x-parser-original-schema-format': 'application/vnd.aai.asyncapi;version=2.0.0',schemaFormat: 'application/vnd.aai.asyncapi;version=2.0.0','x-parser-original-payload': '$ref:$.channels.mychannel.publish.message.payload','x-parser-message-parsed': true}}}},components: {messages: {testMessage: {payload: {type: 'object',properties: {name: {type: 'string','x-parser-schema-id': '<anonymous-schema-3>'},test: {type: 'object',properties: {testing: {type: 'string','x-parser-schema-id': '<anonymous-schema-5>'}},'x-parser-schema-id': '<anonymous-schema-4>'}},'x-parser-schema-id': 'testSchema'},'x-parser-message-name': 'testMessage','x-parser-original-schema-format': 'application/vnd.aai.asyncapi;version=2.0.0',schemaFormat: 'application/vnd.aai.asyncapi;version=2.0.0','x-parser-original-payload': '$ref:$.components.messages.testMessage.payload','x-parser-message-parsed': true}},schemas: {testSchema: '$ref:$.components.messages.testMessage.payload'}},'x-parser-spec-parsed': true,'x-parser-spec-stringified': true};

      const stringified = AsyncAPIDocument.stringify(doc);
      expect(stringified).toEqual(JSON.stringify(output));
    });

    it('should stringify document with circular references', async function() {
      const source = path.resolve(__dirname, '../mocks/circular-refs.yaml');
      const nestedSchemas = fs.readFileSync(source, 'utf8');
      const { document } = await parser.parse(nestedSchemas, { source });
      const doc = convertToOldAPI(document!);
      const output = {asyncapi: '2.0.0',info: {title: 'Test API',version: '1.0.0'},channels: {mychannel: {publish: {message: {payload: {type: 'object',properties: {name: {type: 'string','x-parser-schema-id': '<anonymous-schema-2>'}},'x-parser-schema-id': '<anonymous-schema-1>'},'x-parser-message-name': '<anonymous-message-1>','x-parser-original-schema-format': 'application/vnd.aai.asyncapi;version=2.0.0',schemaFormat: 'application/vnd.aai.asyncapi;version=2.0.0','x-parser-original-payload': '$ref:$.channels.mychannel.publish.message.payload','x-parser-message-parsed': true}}}},components: {messages: {testMessage: {payload: {type: 'object',properties: {name: {type: 'string','x-parser-schema-id': '<anonymous-schema-3>'},deep: {type: 'object',properties: {circular: '$ref:$.components.messages.testMessage.payload'},'x-parser-schema-id': '<anonymous-schema-4>'}},'x-parser-schema-id': 'testSchema'},'x-parser-message-name': 'testMessage','x-parser-original-schema-format': 'application/vnd.aai.asyncapi;version=2.0.0',schemaFormat: 'application/vnd.aai.asyncapi;version=2.0.0','x-parser-original-payload': '$ref:$.components.messages.testMessage.payload','x-parser-message-parsed': true}},schemas: {testSchema: '$ref:$.components.messages.testMessage.payload'}},'x-parser-spec-parsed': true,'x-parser-circular': true,'x-parser-spec-stringified': true};

      const stringified = AsyncAPIDocument.stringify(doc);
      expect(stringified).toEqual(JSON.stringify(output));
    });

    it('should copy object', async function() {
      const source = path.resolve(__dirname, '../mocks/simple-with-refs.yaml');
      const nestedSchemas = fs.readFileSync(source, 'utf8');
      const { document } = await parser.parse(nestedSchemas, { source });
      const doc = convertToOldAPI(document!);
      const stringified = AsyncAPIDocument.stringify(doc) as string;

      expect(doc.json()[xParserSpecStringified]).toEqual(undefined);
      expect(JSON.parse(stringified)[xParserSpecStringified]).toEqual(true);
    });
  });

  describe('parse()', function() {
    it('should parse stringified simple document', async function() {
      const source = path.resolve(__dirname, '../mocks/simple-with-refs.yaml');
      const nestedSchemas = fs.readFileSync(source, 'utf8');
      const { document } = await parser.parse(nestedSchemas, { source });
      const oldDoc = convertToOldAPI(document!);
      const output = {asyncapi: '2.0.0',info: {title: 'Test API',version: '1.0.0'},channels: {mychannel: {publish: {message: {payload: {type: 'object',properties: {name: {type: 'string','x-parser-schema-id': '<anonymous-schema-2>'}},'x-parser-schema-id': '<anonymous-schema-1>'},'x-parser-message-name': '<anonymous-message-1>','x-parser-original-schema-format': 'application/vnd.aai.asyncapi;version=2.0.0',schemaFormat: 'application/vnd.aai.asyncapi;version=2.0.0','x-parser-original-payload': '$ref:$.channels.mychannel.publish.message.payload','x-parser-message-parsed': true}}}},components: {messages: {testMessage: {payload: {type: 'object',properties: {name: {type: 'string','x-parser-schema-id': '<anonymous-schema-3>'},test: {type: 'object',properties: {testing: {type: 'string','x-parser-schema-id': '<anonymous-schema-5>'}},'x-parser-schema-id': '<anonymous-schema-4>'}},'x-parser-schema-id': 'testSchema'},'x-parser-message-name': 'testMessage','x-parser-original-schema-format': 'application/vnd.aai.asyncapi;version=2.0.0',schemaFormat: 'application/vnd.aai.asyncapi;version=2.0.0','x-parser-original-payload': '$ref:$.components.messages.testMessage.payload','x-parser-message-parsed': true}},schemas: {testSchema: '$ref:$.components.messages.testMessage.payload'}},'x-parser-spec-parsed': true,'x-parser-spec-stringified': true};
      const doc = AsyncAPIDocument.parse(output) as AsyncAPIDocument;
      expect(JSON.stringify(doc.json())).toEqual(JSON.stringify(oldDoc.json()));
    }); 

    it('should not parse invalid document', async function() {
      const source = path.resolve(__dirname, '../mocks/simple-with-refs.yaml');
      const nestedSchemas = fs.readFileSync(source, 'utf8');
      const { document } = await parser.parse(nestedSchemas, { source });
      const doc = convertToOldAPI(document!);
      delete doc.json()[xParserSpecParsed];

      let error;
      try {
        AsyncAPIDocument.parse(doc);
      } catch (err) {
        error = err;
      }
      expect(error.message).toEqual('Cannot parse invalid AsyncAPI document');
    });

    it('should parse stringified document with circular references', async function() {
      const circularOutput = {asyncapi: '2.0.0',info: {title: 'Test API',version: '1.0.0'},channels: {mychannel: {publish: {message: {payload: {type: 'object',properties: {name: {type: 'string','x-parser-schema-id': '<anonymous-schema-2>'}},'x-parser-schema-id': '<anonymous-schema-1>'},'x-parser-message-name': '<anonymous-message-1>','x-parser-original-schema-format': 'application/vnd.aai.asyncapi;version=2.0.0',schemaFormat: 'application/vnd.aai.asyncapi;version=2.0.0','x-parser-original-payload': '$ref:$.channels.mychannel.publish.message.payload','x-parser-message-parsed': true}}}},components: {messages: {testMessage: {payload: {type: 'object',properties: {name: {type: 'string','x-parser-schema-id': '<anonymous-schema-3>'},deep: {type: 'object',properties: {circular: '$ref:$.components.messages.testMessage.payload'},'x-parser-schema-id': '<anonymous-schema-4>'}},'x-parser-schema-id': 'testSchema'},'x-parser-message-name': 'testMessage','x-parser-original-schema-format': 'application/vnd.aai.asyncapi;version=2.0.0',schemaFormat: 'application/vnd.aai.asyncapi;version=2.0.0','x-parser-original-payload': '$ref:$.components.messages.testMessage.payload','x-parser-message-parsed': true}},schemas: {testSchema: '$ref:$.components.messages.testMessage.payload'}},'x-parser-spec-parsed': true,'x-parser-circular': true,'x-parser-spec-stringified': true};
      const result = AsyncAPIDocument.parse(circularOutput) as AsyncAPIDocument;

      expect(result.hasCircular()).toEqual(true);
      expect(result.components()?.schema('testSchema')?.isCircular()).toEqual(false);
      expect(result.components()?.schema('testSchema')?.properties()['name']?.isCircular()).toEqual(false);
      expect(result.components()?.schema('testSchema')?.properties()['deep']?.isCircular()).toEqual(false);
      expect(result.components()?.schema('testSchema')?.properties()['deep']?.properties()['circular']?.isCircular()).toEqual(true);
    });
  });

  assertTagsMixin(AsyncAPIDocument);
  assertExtensionsMixin(AsyncAPIDocument);
  assertExternalDocumentationMixin(AsyncAPIDocument);
});