const { expect } = require('chai');
const fs = require('fs');
const path = require('path');

const AsyncAPIDocument = require('../../lib/models/asyncapi');
const { xParserMessageName, xParserSchemaId } = require('../../lib/constants');

const { assertMixinTagsInheritance } = require('../mixins/tags_test');
const { assertMixinExternalDocsInheritance } = require('../mixins/external-docs_test');
const { assertMixinSpecificationExtensionsInheritance } = require('../mixins/specification-extensions_test');

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

      let d = new AsyncAPIDocument(inputDoc);
      d = new AsyncAPIDocument(JSON.parse(JSON.stringify(d.json())));

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
      const expectedDoc = { channels: { 'smartylighting/{streetlightId}': { parameters: { streetlightId: { schema: { type: 'string', 'x-parser-schema-id': '<anonymous-schema-1>' }, 'x-parser-schema-id': 'streetlightId' } } } }, 'x-parser-spec-parsed': true };
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
        'testComponentSchemaNestedSchemaPropArrayProp2'
      ]);
      for (const t of schemas.values()) {
        expect(t.constructor.name).to.be.equal('Schema');
        expect(t.json().test).to.be.equal(true);
      }
    });
  });

  describe('#traverseSchemas()', function() {
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
    it('Should not include parameter schemas if defined', function() {
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
        'headers'
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
        ...componentArraySchemas
      ]);
      for (const t of schemas.values()) {
        expect(t.constructor.name).to.be.equal('Schema');
        expect(t.json().test).to.be.equal(true);
      }
    });
    it('Should not include payload schemas if defined', function() {
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
        'headers'
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
        ...componentArraySchemas
      ]);
      for (const t of schemas.values()) {
        expect(t.constructor.name).to.be.equal('Schema');
        expect(t.json().test).to.be.equal(true);
      }
    });
    it('Should not include header schemas if defined', function() {
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
        'payloads'
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
        ...componentArraySchemas
      ]);
      for (const t of schemas.values()) {
        expect(t.constructor.name).to.be.equal('Schema');
        expect(t.json().test).to.be.equal(true);
      }
    });
    it('Should not include arrays if defined', function() {
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
        'headers'
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
        ...componentObjectAllOfSchemas
      ]);
      for (const t of schemas.values()) {
        expect(t.constructor.name).to.be.equal('Schema');
        expect(t.json().test).to.be.equal(true);
      }
    });
    it('Should include all schemas', function() {
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
        ...componentArraySchemas
      ]);
      for (const t of schemas.values()) {
        expect(t.constructor.name).to.be.equal('Schema');
        expect(t.json().test).to.be.equal(true);
      }
    });
    it('Should not include components if defined', function() {
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
        'headers'
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
        ...payloadSchemas
      ]);
      for (const t of schemas.values()) {
        expect(t.constructor.name).to.be.equal('Schema');
        expect(t.json().test).to.be.equal(true);
      }
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
