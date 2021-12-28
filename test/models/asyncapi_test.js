const { expect } = require('chai');
const fs = require('fs');
const path = require('path');

const parser = require('../../lib');
const AsyncAPIDocument = require('../../lib/models/asyncapi');
const { xParserMessageName, xParserSchemaId } = require('../../lib/constants');

const { assertMixinTagsInheritance } = require('../mixins/tags_test');
const { assertMixinExternalDocsInheritance } = require('../mixins/external-docs_test');
const { assertMixinSpecificationExtensionsInheritance } = require('../mixins/specification-extensions_test');

const simpleInputJSON = fs.readFileSync(path.resolve(__dirname, '../good/asyncapi.json'), 'utf8');
const simpleOutputJSON = '{"asyncapi":"2.0.0","info":{"title":"My API","version":"1.0.0"},"channels":{"mychannel":{"publish":{"message":{"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"<anonymous-schema-1>"},"x-parser-original-schema-format":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-original-payload":{"type":"object","properties":{"name":{"type":"string"}}},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-parsed":true,"x-parser-message-name":"<anonymous-message-1>"}}}},"components":{"messages":{"testMessage":{"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-5>"}},"x-parser-schema-id":"<anonymous-schema-4>"}},"x-parser-schema-id":"testSchema"},"x-parser-original-schema-format":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-original-payload":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}}},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-parsed":true,"x-parser-message-name":"testMessage"}},"schemas":{"testSchema":"$ref:$.components.messages.testMessage.payload"}},"x-parser-spec-parsed":true,"x-parser-spec-stringified":true}';
const circularYAML = fs.readFileSync(path.resolve(__dirname, '../good/circular-refs.yaml'), 'utf8');
const circularOutputYAML = '{"asyncapi":"2.0.0","info":{"title":"My Circular API","version":"1.0.0"},"channels":{"recursive":{"subscribe":{"message":{"payload":{"type":"object","properties":{"selfChildren":{"type":"array","items":"$ref:$.channels.recursive.subscribe.message.payload","x-parser-schema-id":"<anonymous-schema-1>"},"selfObjectChildren":{"type":"object","properties":{"test":"$ref:$.channels.recursive.subscribe.message.payload","nonRecursive":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"},"selfSomething":{"type":"object","properties":{"test":{"type":"object","properties":{"ancestorChildren":{"type":"array","items":"$ref:$.channels.recursive.subscribe.message.payload","x-parser-schema-id":"<anonymous-schema-5>"},"ancestorSomething":{"type":"string","x-parser-schema-id":"<anonymous-schema-6>"}},"x-parser-schema-id":"RecursiveAncestor"}},"x-parser-schema-id":"<anonymous-schema-4>"}},"x-parser-schema-id":"RecursiveSelf"},"x-parser-original-schema-format":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-original-payload":"$ref:$.channels.recursive.subscribe.message.payload","schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-parsed":true,"x-parser-message-name":"<anonymous-message-1>"}}},"external/file":{"publish":{"message":{"payload":{"type":"object","properties":{"testExt":{"type":"object","properties":{"children":{"type":"array","items":"$ref:$.channels.external/file.publish.message.payload","x-parser-schema-id":"<anonymous-schema-9>"}},"x-parser-schema-id":"<anonymous-schema-8>"}},"x-parser-schema-id":"<anonymous-schema-7>"},"x-parser-original-schema-format":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-original-payload":"$ref:$.channels.external/file.publish.message.payload","schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-parsed":true,"x-parser-message-name":"<anonymous-message-2>"}}},"nonRecursive":{"subscribe":{"message":{"payload":{"type":"object","properties":{"child":{"type":"object","properties":{"value":{"type":"string","x-parser-schema-id":"<anonymous-schema-10>"}},"x-parser-schema-id":"NonRecursiveChild"}},"x-parser-schema-id":"NonRecursive"},"x-parser-original-schema-format":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-original-payload":{"type":"object","properties":{"child":{"type":"object","properties":{"value":{"type":"string"}}}}},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-parsed":true,"x-parser-message-name":"<anonymous-message-3>"}}},"testChannel":{"subscribe":{"message":{"oneOf":[{"contentType":"application/json","payload":{"type":"object","properties":{"schemaBReference":{"type":"string","enum":["ENUM_A","ENUM_B","ENUM_C","ENUM_D"],"x-parser-schema-id":"NormalSchemaB"},"schemaCReference":{"allOf":["$ref:$.channels.testChannel.subscribe.message.oneOf[0].payload.properties.schemaBReference",{"type":"string","enum":["ENUM_E"],"x-parser-schema-id":"<anonymous-schema-11>"}],"x-parser-schema-id":"NormalSchemaC"},"commonEnumName":{"type":"string","enum":["ENUM_1","ENUM_2"],"x-parser-schema-id":"<anonymous-schema-12>"}},"x-parser-schema-id":"NormalSchemaA"},"x-parser-original-schema-format":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-original-payload":{"type":"object","properties":{"schemaBReference":{"type":"string","enum":["ENUM_A","ENUM_B","ENUM_C","ENUM_D"]},"schemaCReference":{"allOf":["$ref:$.channels.testChannel.subscribe.message.oneOf[0].x-parser-original-payload.properties.schemaBReference",{"type":"string","enum":["ENUM_E"]}]},"commonEnumName":{"type":"string","enum":["ENUM_1","ENUM_2"]}}},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-parsed":true,"x-parser-message-name":"testMessage"}]}}}},"components":{"messages":{"testMessage":"$ref:$.channels.testChannel.subscribe.message.oneOf[0]"},"schemas":{"NonRecursive":"$ref:$.channels.nonRecursive.subscribe.message.payload","NonRecursiveChild":"$ref:$.channels.nonRecursive.subscribe.message.payload.properties.child","RecursiveSelf":"$ref:$.channels.recursive.subscribe.message.payload","RecursiveAncestor":"$ref:$.channels.recursive.subscribe.message.payload.properties.selfSomething.properties.test","NormalSchemaA":"$ref:$.channels.testChannel.subscribe.message.oneOf[0].payload","NormalSchemaB":"$ref:$.channels.testChannel.subscribe.message.oneOf[0].payload.properties.schemaBReference","NormalSchemaC":"$ref:$.channels.testChannel.subscribe.message.oneOf[0].payload.properties.schemaCReference","NestedAllOfSchema":{"allOf":["$ref:$.channels.testChannel.subscribe.message.oneOf[0].payload",{"type":"object","properties":{"parent":{"allOf":["$ref:$.components.schemas.NestedAllOfSchema","$ref:$.channels.testChannel.subscribe.message.oneOf[0].payload"],"x-parser-schema-id":"<anonymous-schema-14>"},"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-15>"}},"required":["name"],"x-parser-schema-id":"<anonymous-schema-13>"}],"x-parser-schema-id":"NestedAllOfSchema"},"OneOf":{"type":"object","properties":{"kind":{"oneOf":["$ref:$.components.schemas.OneOf",{"type":"string","x-parser-schema-id":"<anonymous-schema-17>"},{"enum":["boolean","string"],"x-parser-schema-id":"<anonymous-schema-18>"}],"x-parser-schema-id":"<anonymous-schema-16>"}},"x-parser-schema-id":"OneOf"},"AnyOf":{"anyOf":[{"type":"integer","x-parser-schema-id":"<anonymous-schema-19>"},{"type":"number","x-parser-schema-id":"<anonymous-schema-20>"},{"type":"string","x-parser-schema-id":"<anonymous-schema-21>"},{"type":"boolean","x-parser-schema-id":"<anonymous-schema-22>"},{"type":"object","x-parser-schema-id":"<anonymous-schema-23>"},{"type":"array","items":"$ref:$.components.schemas.AnyOf","x-parser-schema-id":"<anonymous-schema-24>"}],"x-parser-schema-id":"AnyOf"},"RecursiveComplex":{"type":["object","array"],"patternProperties":{"^foo":"$ref:$.channels.recursive.subscribe.message.payload","^bar":{"type":"string","x-parser-schema-id":"<anonymous-schema-25>"}},"contains":"$ref:$.components.schemas.RecursiveComplex","items":[{"type":"string","x-parser-schema-id":"<anonymous-schema-26>"},"$ref:$.components.schemas.RecursiveComplex"],"if":"$ref:$.channels.recursive.subscribe.message.payload.properties.selfSomething.properties.test","then":"$ref:$.components.schemas.RecursiveComplex","x-parser-schema-id":"RecursiveComplex"}}},"x-parser-circular":true,"x-parser-spec-parsed":true,"x-parser-spec-stringified":true}';

describe('AsyncAPIDocument', function() {
  describe('constructor', function() {
    it('should not change assigned uids', function() {
      const schema = {};
      const message = {
        payload: schema,
      };

      const inputDoc = { 
        channels: {
          channel: {
            subscribe: {
              message,
            },
            publish: {
              message: {
                payload: {}
              }
            }
          }
        },
        components: {
          messages: {
            someMessage: message,
          },
          schemas: {
            someSchema: schema,
          }
        } 
      };

      let d = new AsyncAPIDocument(inputDoc); // NOSONAR
      d = new AsyncAPIDocument(JSON.parse(JSON.stringify(d.json()))); // NOSONAR

      expect(d.json().channels.channel.subscribe.message[xParserMessageName]).to.be.equal('someMessage');
      expect(d.json().channels.channel.subscribe.message.payload[xParserSchemaId]).to.be.equal('someSchema');

      expect(d.json().channels.channel.publish.message[xParserMessageName]).to.be.equal('<anonymous-message-1>');
      expect(d.json().channels.channel.publish.message.payload[xParserSchemaId]).to.be.equal('<anonymous-schema-1>');

      expect(d.json().components.messages.someMessage[xParserMessageName]).to.be.equal('someMessage');
      expect(d.json().components.messages.someMessage.payload[xParserSchemaId]).to.be.equal('someSchema');

      expect(d.json().components.schemas.someSchema[xParserSchemaId]).to.be.equal('someSchema');
    });
  });

  describe('assignUidToParameterSchemas()', function() {
    it('should assign uids to parameters', function() {
      const inputDoc = { channels: { 'smartylighting/{streetlightId}': { parameters: { streetlightId: { schema: { type: 'string' } } } } } };
      const expectedDoc = { channels: { 'smartylighting/{streetlightId}': { parameters: { streetlightId: { schema: { type: 'string', 'x-parser-schema-id': 'streetlightId' } } } } }, 'x-parser-spec-parsed': true };
      const d = new AsyncAPIDocument(inputDoc);
      expect(d.json()).to.be.deep.equal(expectedDoc);
    });
  });

  describe('assignUidToComponentParameterSchemas()', function() {
    it('should assign uids to component parameters', function() {
      const inputDoc = { channels: { 'smartylighting/{streetlightId}': {}, components: { parameters: { streetlightId: { schema: { type: 'string' } } } } } };
      const expectedDoc = { channels: { 'smartylighting/{streetlightId}': {}, components: { parameters: {streetlightId: { schema: { type: 'string', 'x-parser-schema-id': 'streetlightId' } } } } }, 'x-parser-spec-parsed': true };
      const d = new AsyncAPIDocument(inputDoc);
      expect(d.json()).to.be.deep.equal(expectedDoc);
    });
  });

  describe('#info()', function() {
    it('should return an info object', function() {
      const doc = { info: { title: 'Test', version: '1.2.3', license: { name: 'Apache 2.0', url: 'https://www.apache.org/licenses/LICENSE-2.0' } } };
      const d = new AsyncAPIDocument(doc);
      expect(d.info().constructor.name).to.be.equal('Info');
      expect(d.info().json()).to.be.equal(doc.info);
    });
  });

  describe('#id()', function() {
    it('should return the id string', function() {
      const doc = { id: 'urn:test' };
      const d = new AsyncAPIDocument(doc);
      expect(d.id()).to.be.equal(doc.id);
    });
  });

  describe('#hasServers()', function() {
    it('should return a boolean indicating if the AsyncAPI document has servers', function() {
      const doc = { servers: { test1: { url: 'test1' }, test2: { url: 'test2' } } };
      const docNoServers = { test: 'testing' };
      const d = new AsyncAPIDocument(doc);
      const d2 = new AsyncAPIDocument(docNoServers);
      expect(d.hasServers()).to.equal(true);
      expect(d2.hasServers()).to.equal(false);
    });
  });

  describe('#servers()', function() {
    it('should return a map of server objects', function() {
      const doc = { servers: { test1: { url: 'test1' }, test2: { url: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(typeof d.servers()).to.be.equal('object');
      expect(d.servers().test1.constructor.name).to.equal('Server');
      expect(d.servers().test1.json()).to.equal(doc.servers.test1);
      expect(d.servers().test2.constructor.name).to.equal('Server');
      expect(d.servers().test2.json()).to.equal(doc.servers.test2);
    });

    it('should return an empty object if the AsyncAPI document has no defined servers', function() {
      const doc = {};
      const d = new AsyncAPIDocument(doc);
      expect(typeof d.servers()).to.be.equal('object');
      expect(d.servers()).to.deep.equal({});
    });
  });

  describe('#serverNames()', function() {
    it('should return an array of strings', function() {
      const doc = { servers: { test1: { url: 'test1' }, test2: { url: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(Array.isArray(d.serverNames())).to.be.equal(true);
      expect(d.serverNames()).to.deep.equal(['test1', 'test2']);
    });

    it('should return an empty array if the AsyncAPI document has no defined servers', function() {
      const doc = {};
      const d = new AsyncAPIDocument(doc);
      expect(Array.isArray(d.serverNames())).to.be.equal(true);
      expect(d.serverNames()).to.deep.equal([]);
    });
  });

  describe('#server()', function() {
    it('should return a specific server object', function() {
      const doc = { servers: { test1: { url: 'test1' }, test2: { url: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(d.server('test1').constructor.name).to.equal('Server');
      expect(d.server('test1').json()).to.equal(doc.servers.test1);
    });

    it('should return null if a server name is not provided', function() {
      const doc = { servers: { test1: { url: 'test1' }, test2: { url: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(d.server()).to.equal(null);
    });

    it('should return null if a server name is not found', function() {
      const doc = { servers: { test1: { url: 'test1' }, test2: { url: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(d.server('not found')).to.equal(null);
    });
  });

  describe('#hasDefaultContentType()', function() {
    it('should return true if field exists', function() {
      const doc = { defaultContentType: 'application/json' };
      const d = new AsyncAPIDocument(doc);
      expect(d.hasDefaultContentType()).to.be.equal(true);
    });

    it('should return false if field does not exist', function() {
      const doc = {};
      const d = new AsyncAPIDocument(doc);
      expect(d.hasDefaultContentType()).to.be.equal(false);
    });
  });

  describe('#defaultContentType()', function() {
    it('should return string if field exists', function() {
      const doc = { defaultContentType: 'application/json' };
      const d = new AsyncAPIDocument(doc);
      expect(d.defaultContentType()).to.be.equal('application/json');
    });

    it('should return null if field does not exist', function() {
      const doc = {};
      const d = new AsyncAPIDocument(doc);
      expect(d.defaultContentType()).to.be.equal(null);
    });
  });

  describe('#hasChannels()', function() {
    it('should return a boolean indicating if the AsyncAPI document has channels', function() {
      const doc = { channels: { test1: { description: 'test1' }, test2: { description: 'test2' } } };
      const docNoChannels = { test: 'testing' };
      const d = new AsyncAPIDocument(doc);
      const d2 = new AsyncAPIDocument(docNoChannels);
      expect(d.hasChannels()).to.equal(true);
      expect(d2.hasChannels()).to.equal(false);
    });
  });

  describe('#channels()', function() {
    it('should return a map of channel objects', function() {
      const doc = { channels: { test1: { description: 'test1' }, test2: { description: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(typeof d.channels()).to.be.equal('object');
      expect(d.channels().test1.constructor.name).to.equal('Channel');
      expect(d.channels().test1.json()).to.equal(doc.channels.test1);
      expect(d.channels().test2.constructor.name).to.equal('Channel');
      expect(d.channels().test2.json()).to.equal(doc.channels.test2);
    });

    it('should return an empty object if the AsyncAPI document has no defined channels', function() {
      const doc = {};
      const d = new AsyncAPIDocument(doc);
      expect(typeof d.channels()).to.be.equal('object');
      expect(d.servers()).to.deep.equal({});
    });
  });

  describe('#channelNames()', function() {
    it('should return an array of strings', function() {
      const doc = { channels: { test1: { description: 'test1' }, test2: { description: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(Array.isArray(d.channelNames())).to.be.equal(true);
      expect(d.channelNames()).to.deep.equal(['test1', 'test2']);
    });

    it('should return an empty array if the AsyncAPI document has no defined channels', function() {
      const doc = {};
      const d = new AsyncAPIDocument(doc);
      expect(Array.isArray(d.channelNames())).to.be.equal(true);
      expect(d.channelNames()).to.deep.equal([]);
    });
  });

  describe('#channel()', function() {
    it('should return a specific channel object', function() {
      const doc = { channels: { test1: { description: 'test1' }, test2: { description: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(d.channel('test1').constructor.name).to.equal('Channel');
      expect(d.channel('test1').json()).to.equal(doc.channels.test1);
    });

    it('should return null if a channel name is not provided', function() {
      const doc = { channels: { test1: { description: 'test1' }, test2: { description: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(d.channel()).to.equal(null);
    });

    it('should return null if a channel name is not found', function() {
      const doc = { channels: { test1: { description: 'test1' }, test2: { description: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(d.channel('not found')).to.equal(null);
    });
  });

  describe('#hasComponents()', function() {
    it('should return a boolean indicating if the AsyncAPI document has components', function() {
      const doc = { components: { test1: { description: 'test1' }, test2: { description: 'test2' } } };
      const docNoComponents = { test: 'testing' };
      const d = new AsyncAPIDocument(doc);
      const d2 = new AsyncAPIDocument(docNoComponents);
      expect(d.hasComponents()).to.equal(true);
      expect(d2.hasComponents()).to.equal(false);
    });
  });

  describe('#components()', function() {
    it('should return the components object', function() {
      const doc = { components: { test: 'testing' } };
      const d = new AsyncAPIDocument(doc);
      expect(d.components().constructor.name).to.equal('Components');
      expect(d.components().json()).to.equal(doc.components);
    });
  });

  describe('#hasMessages()', function() {
    it('should return true if there is a message in components but not in channels', function() {
      const doc = { components: { messages: { test: { test: true, k: 3 } } } };
      const d = new AsyncAPIDocument(doc);
      expect(d.hasMessages()).to.equal(true);
    });
    it('should return true if there is a message in channels operations but not in components', function() {
      const doc = { channels: { test: { publish: { message: { name: 'test', test: false, k: 1 } } } } };
      const d = new AsyncAPIDocument(doc);
      expect(d.hasMessages()).to.equal(true);
    });
    it('should return false if there are no messages neither in components nor in channels operations', function() {
      const doc = { channels: { test: { publish: { } } }, components: { } };
      const d = new AsyncAPIDocument(doc);
      expect(d.hasMessages()).to.equal(false);
    });
  });

  describe('#allChannels()', function() {
    it('should return a map with all the channels used in the document and overwrite the channel from channels', function() {
      const doc = { channels: { test1: { description: 'test1' }, test2: { description: 'test2' } }, components: { channels: { test2: { description: 'test2-overwrite' } } }};
      const d = new AsyncAPIDocument(doc);
      const allChannels = d.allChannels();
      expect(allChannels.size).to.be.equal(2);
      expect(allChannels.get('test2').constructor.name).to.be.equal('Channel');
      expect(allChannels.get('test2').json().description).to.be.equal('test2-overwrite');
    });
    it('should return an array with all the channels used in the document', function() {
      const doc = { channels: { test1: { description: 'test1' }, test2: { description: 'test2' } }, components: { channels: { test3: { description: 'test3' } } }};
      const d = new AsyncAPIDocument(doc);
      const allChannels = d.allChannels();
      expect(allChannels.size).to.be.equal(3);
      expect(allChannels.get('test1').constructor.name).to.be.equal('Channel');
      expect(allChannels.get('test1').json().description).to.be.equal('test1');
    });
  });

  describe('#allMessages()', function() {
    it('should return an array with all the messages used in the document and overwrite the message from channel', function() {
      const doc = { channels: { test: { publish: { message: { name: 'test', test: false, k: 1 } } } }, components: { messages: { test: { test: true, k: 3 } } } };
      const d = new AsyncAPIDocument(doc);
      const allMessages = d.allMessages();
      expect(allMessages.size).to.be.equal(1);
      expect(allMessages.get('test').constructor.name).to.be.equal('Message');
      expect(allMessages.get('test').json().test).to.be.equal(true);
    });
    it('should return an array with all the messages used in the document', function() {
      const doc = { channels: { test: { publish: { message: { test: true, k: 1 } } }, test2: { subscribe: { message: { name: 'test', test: true, k: 2 } } } }, components: { messages: { test: { test: true, k: 3 } } } };
      const d = new AsyncAPIDocument(doc);
      expect(d.allMessages().size).to.be.equal(2);
      d.allMessages().forEach(t => {
        expect(t.constructor.name).to.be.equal('Message');
        expect(t.json().test).to.be.equal(true);
      });
    });
  });

  describe('#allServers()', function() {
    it('should return a map with all the servers used in the document and skip the server from components when they are equal', function() {
      const doc = { servers: { test1: { url: 'test1' }, test2: { url: 'test2' } }, components: { servers: { test2: { url: 'test2' } } }};
      const d = new AsyncAPIDocument(doc);
      const allServers = d.allServers();
      expect(allServers.size).to.be.equal(2);
      expect(allServers.get('test2').constructor.name).to.be.equal('Server');
    });
    it('should return a map with all the servers used in the document and add as new servers all those from components with the same name but with different values', function() {
      const doc = { servers: { test1: { url: 'test1' }, test2: { url: 'test2' } }, components: { servers: { test2: { url: 'different-url' } } }};
      const base64Hash = 'eyJ1cmwiOiJkaWZmZXJlbnQtdXJsIn0='; // This is the base64 of test2 server in components
      const d = new AsyncAPIDocument(doc);
      const allServers = d.allServers();
      expect(allServers.size).to.be.equal(3);
      expect(allServers.get(base64Hash).constructor.name).to.be.equal('Server');
      expect(allServers.get(base64Hash).json().url).to.be.equal('different-url');
    });
    it('should return an array with all the servers used in the document', function() {
      const doc = { servers: { test1: { url: 'test1' }, test2: { url: 'test2' } }, components: { servers: { test3: { url: 'test3' } } }};
      const d = new AsyncAPIDocument(doc);
      const allServers = d.allServers();
      expect(allServers.size).to.be.equal(3);
      expect(allServers.get('test1').constructor.name).to.be.equal('Server');
      expect(allServers.get('test1').json().url).to.be.equal('test1');
    });
  });

  describe('#allSchemas()', function() {
    it('should return additional items schemas when no items specified', function() {
      const doc = {
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
      const d = new AsyncAPIDocument(doc);
      const schemas = d.allSchemas();
      expect(schemas.size).to.be.equal(2);
      //Ensure the actual keys are as expected
      const schemaKeys = Array.from(schemas.keys());
      expect(schemaKeys).to.deep.equal([
        'payloadSchema',
        'additionalItemSchema'
      ]);
      for (const t of schemas.values()) {
        expect(t.constructor.name).to.be.equal('Schema');
        expect(t.json().test).to.be.equal(true);
      }
    });
    it('should return additional property schemas when no properties are specified', function() {
      const doc = {
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
      const d = new AsyncAPIDocument(doc);
      const schemas = d.allSchemas();
      expect(schemas.size).to.be.equal(2);
      //Ensure the actual keys are as expected
      const schemaKeys = Array.from(schemas.keys());
      expect(schemaKeys).to.deep.equal([
        'payloadSchema',
        'additionalPropSchema'
      ]);
      for (const t of schemas.values()) {
        expect(t.constructor.name).to.be.equal('Schema');
        expect(t.json().test).to.be.equal(true);
      }
    });
    it('should return a map with all the schemas used in the document', function() {
      const doc = { channels: { test: { parameters: { testParam1: { schema: { $id: 'testParamSchema', test: true, k: 0 } } }, publish: { message: { headers: { test: true, k: 1 }, payload: { test: true, k: 2 } } } }, test2: { subscribe: { message: { payload: { $id: 'testPayload', test: true, k: 2 } } } } }, components: { schemas: { testSchema: { test: true, k: 3 } } } };
      const d = new AsyncAPIDocument(doc);
      const schemas = d.allSchemas();
      expect(schemas.size).to.be.equal(5);

      //Ensure the actual keys are as expected
      const schemaKeys = Array.from(schemas.keys());
      expect(schemaKeys).to.deep.equal([
        'testParamSchema',
        '<anonymous-schema-1>',
        '<anonymous-schema-2>',
        'testPayload',
        'testSchema'
      ]);
      for (const t of schemas.values()) {
        expect(t.constructor.name).to.be.equal('Schema');
        expect(t.json().test).to.be.equal(true);
      }
    });
    it('should return a map with all the nested schemas', function() {
      const doc = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../good/nested-schemas.json'), 'utf8'));
      const d = new AsyncAPIDocument(doc);
      const schemas = d.allSchemas();

      //Ensure the actual keys are as expected
      const schemaKeys = Array.from(schemas.keys());
      expect(schemaKeys).to.deep.equal([
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
        expect(t.constructor.name).to.be.equal('Schema');
        expect(t.json().test).to.be.equal(true);
      }
    });
  });

  /* eslint-disable sonarjs/cognitive-complexity */
  describe('#traverseSchemas()', function() { // NOSONAR
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
      const doc = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../good/nested-schemas.json'), 'utf8'));
      const d = new AsyncAPIDocument(doc);
      const schemas = new Map();
      const cb = (schema) => {
        schemas.set(schema.uid(), schema);
      };
      const typesToTraverse = [
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
      ];
      d.traverseSchemas(cb, typesToTraverse);

      //Ensure the actual keys are as expected
      const schemaKeys = Array.from(schemas.keys());
      expect(schemaKeys).to.deep.equal([
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
        expect(t.constructor.name).to.be.equal('Schema');
        expect(t.json().test).to.be.equal(true);
      }
    });
    it('should not include payload schemas if defined', function() {
      const doc = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../good/nested-schemas.json'), 'utf8'));
      const d = new AsyncAPIDocument(doc);
      const schemas = new Map();
      const cb = (schema) => {
        schemas.set(schema.uid(), schema);
      };
      const typesToTraverse = [
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
      ];
      d.traverseSchemas(cb, typesToTraverse);

      //Ensure the actual keys are as expected
      const schemaKeys = Array.from(schemas.keys());
      expect(schemaKeys).to.deep.equal([
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
        expect(t.constructor.name).to.be.equal('Schema');
        expect(t.json().test).to.be.equal(true);
      }
    });
    it('should not include header schemas if defined', function() {
      const doc = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../good/nested-schemas.json'), 'utf8'));
      const d = new AsyncAPIDocument(doc);
      const schemas = new Map();
      const cb = (schema) => {
        schemas.set(schema.uid(), schema);
      };
      const typesToTraverse = [
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
      ];
      d.traverseSchemas(cb, typesToTraverse);

      //Ensure the actual keys are as expected
      const schemaKeys = Array.from(schemas.keys());
      expect(schemaKeys).to.deep.equal([
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
        expect(t.constructor.name).to.be.equal('Schema');
        expect(t.json().test).to.be.equal(true);
      }
    });
    it('should not include arrays if defined', function() {
      const doc = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../good/nested-schemas.json'), 'utf8'));
      const d = new AsyncAPIDocument(doc);
      const schemas = new Map();
      const cb = (schema) => {
        schemas.set(schema.uid(), schema);
      };
      const typesToTraverse = [
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
      ];
      d.traverseSchemas(cb, typesToTraverse);

      //Ensure the actual keys are as expected
      const schemaKeys = Array.from(schemas.keys());
      expect(schemaKeys).to.deep.equal([
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
        expect(t.constructor.name).to.be.equal('Schema');
        expect(t.json().test).to.be.equal(true);
      }
    });
    it('should not include components if defined', function() {
      const doc = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../good/nested-schemas.json'), 'utf8'));
      const d = new AsyncAPIDocument(doc);
      const schemas = new Map();
      const cb = (schema) => {
        schemas.set(schema.uid(), schema);
      };
      const typesToTraverse = [
        'objects',
        'arrays',
        'oneOfs', 
        'allOfs',
        'anyOfs',
        'parameters',
        'payloads',
        'headers',
      ];
      d.traverseSchemas(cb, typesToTraverse);

      //Ensure the actual keys are as expected
      const schemaKeys = Array.from(schemas.keys());
      expect(schemaKeys).to.deep.equal([
        ...parameterSchemas,
        ...headerObjectSchemas,
        ...headerArraySchemas,
        ...payloadObjectSchemas,
        ...payloadArraySchemas,
        ...payloadSchemas,
      ]);
      for (const t of schemas.values()) {
        expect(t.constructor.name).to.be.equal('Schema');
        expect(t.json().test).to.be.equal(true);
      }
    });
    it('should not include combined schemas if defined', function() {
      const doc = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../good/nested-schemas.json'), 'utf8'));
      const d = new AsyncAPIDocument(doc);
      const schemas = new Map();
      const cb = (schema) => {
        schemas.set(schema.uid(), schema);
      };
      const typesToTraverse = [
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
      ];
      d.traverseSchemas(cb, typesToTraverse);

      //Ensure the actual keys are as expected
      const schemaKeys = Array.from(schemas.keys());
      expect(schemaKeys).to.deep.equal([
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
        expect(t.constructor.name).to.be.equal('Schema');
        expect(t.json().test).to.be.equal(true);
      }
    });
    it('should not include conditional schemas if defined', function() {
      const doc = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../good/nested-schemas.json'), 'utf8'));
      const d = new AsyncAPIDocument(doc);
      const schemas = new Map();
      const cb = (schema) => {
        schemas.set(schema.uid(), schema);
      };
      const typesToTraverse = [
        'objects',
        'arrays',
        'parameters',
        'payloads',
        'headers',
        'components',
        'patternProperties',
        'dependencies',
        'definitions',
      ];
      d.traverseSchemas(cb, typesToTraverse);

      //Ensure the actual keys are as expected
      const schemaKeys = Array.from(schemas.keys());
      expect(schemaKeys).to.deep.equal([
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
        expect(t.constructor.name).to.be.equal('Schema');
        expect(t.json().test).to.be.equal(true);
      }
    });
    it('should not include dependencies schemas if defined', function() {
      const doc = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../good/nested-schemas.json'), 'utf8'));
      const d = new AsyncAPIDocument(doc);
      const schemas = new Map();
      const cb = (schema) => {
        schemas.set(schema.uid(), schema);
      };
      const typesToTraverse = [
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
      ];
      d.traverseSchemas(cb, typesToTraverse);

      //Ensure the actual keys are as expected
      const schemaKeys = Array.from(schemas.keys());
      expect(schemaKeys).to.deep.equal([
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
        expect(t.constructor.name).to.be.equal('Schema');
        expect(t.json().test).to.be.equal(true);
      }
    });
    it('should not include definitions schemas if defined', function() {
      const doc = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../good/nested-schemas.json'), 'utf8'));
      const d = new AsyncAPIDocument(doc);
      const schemas = new Map();
      const cb = (schema) => {
        schemas.set(schema.uid(), schema);
      };
      const typesToTraverse = [
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
      ];
      d.traverseSchemas(cb, typesToTraverse);

      //Ensure the actual keys are as expected
      const schemaKeys = Array.from(schemas.keys());
      expect(schemaKeys).to.deep.equal([
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
        expect(t.constructor.name).to.be.equal('Schema');
        expect(t.json().test).to.be.equal(true);
      }
    });
    it('should include all schemas', function() {
      const doc = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../good/nested-schemas.json'), 'utf8'));
      const d = new AsyncAPIDocument(doc);
      const schemas = new Map();
      const cb = (schema) => {
        schemas.set(schema.uid(), schema);
      };
      d.traverseSchemas(cb);

      //Ensure the actual keys are as expected
      const schemaKeys = Array.from(schemas.keys());
      expect(schemaKeys).to.deep.equal([
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
        expect(t.constructor.name).to.be.equal('Schema');
        expect(t.json().test).to.be.equal(true);
      }
    });
  });
  /* eslint-enable sonarjs/cognitive-complexity */

  describe('#stringify()', function() {
    it('should stringify simple document', async function() {
      const doc = await parser.parse(simpleInputJSON, { path: path.join(__filename, '../../') });
      const stringified = AsyncAPIDocument.stringify(doc);
      expect(stringified).to.be.equal(simpleOutputJSON);
    });

    it('should stringify document with circular references', async function() {
      const doc = await parser.parse(circularYAML, { path: path.join(__filename, '../../') });
      const stringified = AsyncAPIDocument.stringify(doc);
      expect(stringified).to.be.equal(circularOutputYAML);
    });

    it('should copy object', async function() {
      const doc = await parser.parse(simpleInputJSON, { path: path.join(__filename, '../../') });
      const stringified = AsyncAPIDocument.stringify(doc);
      expect(doc.json()['x-parser-spec-stringified']).to.be.equal(undefined);
      expect(JSON.parse(stringified)['x-parser-spec-stringified']).to.be.equal(true);
    });
  });

  describe('#parse()', function() {
    it('should parse stringified simple document', async function() {
      const parsedDoc = await parser.parse(simpleInputJSON, { path: path.join(__filename, '../../') });
      const doc = AsyncAPIDocument.parse(simpleOutputJSON);
      expect(JSON.stringify(doc.json())).to.be.equal(JSON.stringify(parsedDoc.json()));
    });

    it('should not parse invalid document', async function() {
      const parsedDoc = await parser.parse(simpleInputJSON, { path: path.join(__filename, '../../') });
      delete parsedDoc.json()['x-parser-spec-parsed'];

      let error;
      try {
        AsyncAPIDocument.parse(parsedDoc);
      } catch (err) {
        error = err;
      }
      expect(error.message).to.be.equal('Cannot parse invalid AsyncAPI document');
    });

    it('should parse stringified document with circular references', async function() {
      // Test circular references to ensure that every circular reference has this same reference after parsing
      const result = AsyncAPIDocument.parse(circularOutputYAML);

      // not testing on a model level as required xParserCircle value is added before model construction so we need to test through calling parser function
      expect(result.hasCircular()).to.equal(true);

      // we want false here, even though this schema has some circular refs in some props, it is not circular, but just specific items
      expect(result.components().schema('RecursiveSelf').isCircular()).to.equal(false);
      expect(result.components().schema('NonRecursive').isCircular()).to.equal(false);
      expect(result.components().schema('RecursiveSelf').properties()['selfChildren'].isCircular()).to.equal(false);
      expect(result.components().schema('RecursiveSelf').properties()['selfChildren'].items().isCircular()).to.equal(true);
      expect(result.components().schema('RecursiveSelf').properties()['selfObjectChildren'].isCircular()).to.equal(false);
      expect(result.components().schema('RecursiveSelf').properties()['selfObjectChildren'].properties()['test'].isCircular()).to.equal(true);
      expect(result.components().schema('NonRecursive').properties()['child'].isCircular()).to.equal(false);

      // NormalSchemaB is referred twice, from NormalSchemaA and NormalSchemaC. 
      // If seenObjects array is not handled properly, once NormalSchemaB is seen for a second time while traversing NormalSchemaC, then NormalSchemaC is marked as object holding circular refs
      // This is why it is important to check that NormalSchemaC is or sure not marked as circular
      expect(result.components().schema('NormalSchemaC').isCircular()).to.equal(false);

      // NestedAllOfSchema has circular reference
      expect(result.components().schema('NestedAllOfSchema').allOf()[0].isCircular()).to.equal(false);
      expect(result.components().schema('NestedAllOfSchema').allOf()[1].properties()['parent'].allOf()[0].isCircular()).to.equal(true);
      expect(result.components().schema('NestedAllOfSchema').allOf()[1].properties()['parent'].allOf()[1].isCircular()).to.equal(false);

      // OneOf has circular reference
      expect(result.components().schema('OneOf').properties()['kind'].isCircular()).to.equal(false);
      expect(result.components().schema('OneOf').properties()['kind'].oneOf()[0].isCircular()).to.equal(true);
    
      // AnyOf has circular reference
      expect(result.components().schema('AnyOf').anyOf()[5].isCircular()).to.equal(false);
      expect(result.components().schema('AnyOf').anyOf()[5].items().isCircular()).to.equal(true);

      // external/file channel has deep circular reference
      expect(result.channel('external/file').publish().messages()[0].payload().properties()['testExt'].properties()['children'].isCircular()).to.equal(false);
      expect(result.channel('external/file').publish().messages()[0].payload().properties()['testExt'].properties()['children'].items().isCircular()).to.equal(true);

      // RecursiveSelf and RecursiveAncestor have deep circular references
      expect(result.components().schema('RecursiveSelf').properties()['selfSomething'].properties()['test'].properties()['ancestorChildren'].isCircular()).to.equal(false);
      expect(result.components().schema('RecursiveSelf').properties()['selfSomething'].properties()['test'].properties()['ancestorChildren'].items().isCircular()).to.equal(true);
      expect(result.components().schema('RecursiveAncestor').properties()['ancestorChildren'].isCircular()).to.equal(false);
      expect(result.components().schema('RecursiveAncestor').properties()['ancestorChildren'].items().properties()['selfSomething'].properties()['test'].isCircular()).to.equal(true);

      // RecursiveComplex has complex deep circular references
      expect(result.components().schema('RecursiveComplex').contains().isCircular()).to.equal(true);
      expect(result.components().schema('RecursiveComplex').items()[0].isCircular()).to.equal(false);
      expect(result.components().schema('RecursiveComplex').items()[1].isCircular()).to.equal(true);
      expect(result.components().schema('RecursiveComplex').then().isCircular()).to.equal(true);
      expect(result.components().schema('RecursiveComplex').if().properties()['ancestorChildren'].isCircular()).to.equal(false);
      expect(result.components().schema('RecursiveComplex').if().properties()['ancestorChildren'].items().properties()['selfSomething'].properties()['test'].isCircular()).to.equal(true);
      expect(result.components().schema('RecursiveComplex').patternProperties()['^bar'].isCircular()).to.equal(false);
      expect(result.components().schema('RecursiveComplex').patternProperties()['^foo'].properties()['selfChildren'].isCircular()).to.equal(false);
      expect(result.components().schema('RecursiveComplex').patternProperties()['^foo'].properties()['selfChildren'].items().isCircular()).to.equal(true);
      expect(result.components().schema('RecursiveComplex').patternProperties()['^foo'].properties()['selfObjectChildren'].isCircular()).to.equal(false);
      expect(result.components().schema('RecursiveComplex').patternProperties()['^foo'].properties()['selfObjectChildren'].properties()['test'].isCircular()).to.equal(true);
      expect(result.components().schema('RecursiveComplex').patternProperties()['^foo'].properties()['selfSomething'].properties()['test'].properties()['ancestorChildren'].isCircular()).to.equal(false);
      expect(result.components().schema('RecursiveComplex').patternProperties()['^foo'].properties()['selfSomething'].properties()['test'].properties()['ancestorChildren'].items().isCircular()).to.equal(true);
    });
  });

  describe('mixins', function() {
    it('model should inherit from mixins', function() {
      assertMixinTagsInheritance(AsyncAPIDocument);
      assertMixinExternalDocsInheritance(AsyncAPIDocument);
      assertMixinSpecificationExtensionsInheritance(AsyncAPIDocument);
    });
  });
});
