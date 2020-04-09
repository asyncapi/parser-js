const { expect } = require('chai');
const AsyncAPIDocument = require('../../lib/models/asyncapi');
const fs = require('fs');
const path = require("path");
describe('AsyncAPIDocument', () => {
  describe('assignUidToParameterSchemas()', () => {
    it('should assign uids to parameters', () => {
      const inputDoc = { "channels": { "smartylighting/{streetlightId}": { "parameters": { "streetlightId": { "schema": { "type": "string" } } } } } };
      const expectedDoc = { "channels": { "smartylighting/{streetlightId}": { "parameters": { "streetlightId": { "schema": { "type": "string", "x-parser-schema-id": "<anonymous-schema-1>" }, "x-parser-schema-id": "streetlightId" } } } } }
      const d = new AsyncAPIDocument(inputDoc);
      expect(d.json()).to.be.deep.equal(expectedDoc);
    });
  });
  describe('#ext()', () => {
    it('should support extensions', () => {
      const doc = { 'x-test': 'testing' };
      const d = new AsyncAPIDocument(doc);
      expect(d.ext('x-test')).to.be.equal(doc['x-test']);
      expect(d.extension('x-test')).to.be.equal(doc['x-test']);
      expect(d.extensions()).to.be.deep.equal({ 'x-test': 'testing' });
    });
  });

  describe('#info()', function () {
    it('should return an info object', () => {
      const doc = { info: { title: 'Test', version: '1.2.3', license: { name: 'Apache 2.0', url: 'https://www.apache.org/licenses/LICENSE-2.0' } } };
      const d = new AsyncAPIDocument(doc);
      expect(d.info().constructor.name).to.be.equal('Info');
      expect(d.info().json()).to.be.equal(doc.info);
    });
  });

  describe('#id()', function () {
    it('should return the id string', () => {
      const doc = { id: 'urn:test' };
      const d = new AsyncAPIDocument(doc);
      expect(d.id()).to.be.equal(doc.id);
    });
  });

  describe('#hasServers()', function () {
    it('should return a boolean indicating if the AsyncAPI document has servers', () => {
      const doc = { servers: { test1: { url: 'test1' }, test2: { url: 'test2' } } };
      const docNoServers = { test: 'testing' };
      const d = new AsyncAPIDocument(doc);
      const d2 = new AsyncAPIDocument(docNoServers);
      expect(d.hasServers()).to.equal(true);
      expect(d2.hasServers()).to.equal(false);
    });
  });

  describe('#servers()', function () {
    it('should return a map of server objects', () => {
      const doc = { servers: { test1: { url: 'test1' }, test2: { url: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(typeof d.servers()).to.be.equal('object');
      expect(d.servers().test1.constructor.name).to.equal('Server');
      expect(d.servers().test1.json()).to.equal(doc.servers.test1);
      expect(d.servers().test2.constructor.name).to.equal('Server');
      expect(d.servers().test2.json()).to.equal(doc.servers.test2);
    });
  });

  describe('#server()', function () {
    it('should return a specific server object', () => {
      const doc = { servers: { test1: { url: 'test1' }, test2: { url: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(d.server('test1').constructor.name).to.equal('Server');
      expect(d.server('test1').json()).to.equal(doc.servers.test1);
    });

    it('should return null if a server name is not provided', () => {
      const doc = { servers: { test1: { url: 'test1' }, test2: { url: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(d.server()).to.equal(null);
    });

    it('should return null if a server name is not found', () => {
      const doc = { servers: { test1: { url: 'test1' }, test2: { url: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(d.server('not found')).to.equal(null);
    });
  });

  describe('#hasChannels()', function () {
    it('should return a boolean indicating if the AsyncAPI document has channels', () => {
      const doc = { channels: { test1: { description: 'test1' }, test2: { description: 'test2' } } };
      const docNoChannels = { test: 'testing' };
      const d = new AsyncAPIDocument(doc);
      const d2 = new AsyncAPIDocument(docNoChannels);
      expect(d.hasChannels()).to.equal(true);
      expect(d2.hasChannels()).to.equal(false);
    });
  });

  describe('#channels()', function () {
    it('should return a map of channel objects', () => {
      const doc = { channels: { test1: { description: 'test1' }, test2: { description: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(typeof d.channels()).to.be.equal('object');
      expect(d.channels().test1.constructor.name).to.equal('Channel');
      expect(d.channels().test1.json()).to.equal(doc.channels.test1);
      expect(d.channels().test2.constructor.name).to.equal('Channel');
      expect(d.channels().test2.json()).to.equal(doc.channels.test2);
    });
  });

  describe('#channelNames()', function () {
    it('should return an array of strings', () => {
      const doc = { channels: { test1: { description: 'test1' }, test2: { description: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(Array.isArray(d.channelNames())).to.be.equal(true);
      expect(d.channelNames()).to.deep.equal(['test1', 'test2']);
    });
  });

  describe('#channel()', function () {
    it('should return a specific channel object', () => {
      const doc = { channels: { test1: { description: 'test1' }, test2: { description: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(d.channel('test1').constructor.name).to.equal('Channel');
      expect(d.channel('test1').json()).to.equal(doc.channels.test1);
    });

    it('should return null if a channel name is not provided', () => {
      const doc = { channels: { test1: { description: 'test1' }, test2: { description: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(d.channel()).to.equal(null);
    });

    it('should return null if a channel name is not found', () => {
      const doc = { channels: { test1: { description: 'test1' }, test2: { description: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(d.channel('not found')).to.equal(null);
    });
  });

  describe('#hasComponents()', function () {
    it('should return a boolean indicating if the AsyncAPI document has components', () => {
      const doc = { components: { test1: { description: 'test1' }, test2: { description: 'test2' } } };
      const docNoComponents = { test: 'testing' };
      const d = new AsyncAPIDocument(doc);
      const d2 = new AsyncAPIDocument(docNoComponents);
      expect(d.hasComponents()).to.equal(true);
      expect(d2.hasComponents()).to.equal(false);
    });
  });

  describe('#components()', function () {
    it('should return the components object', () => {
      const doc = { components: { test: 'testing' } };
      const d = new AsyncAPIDocument(doc);
      expect(d.components().constructor.name).to.equal('Components');
      expect(d.components().json()).to.equal(doc.components);
    });
  });

  describe('#tags()', function () {
    it('should return an array of tags', () => {
      const doc = { tags: [{ name: 'test1' }, { name: 'test2' }] };
      const d = new AsyncAPIDocument(doc);
      d.tags().forEach((t, i) => {
        expect(t.constructor.name).to.be.equal('Tag');
        expect(t.json()).to.be.equal(doc.tags[i]);
      });
    });
  });

  describe('#allMessages()', function () {
    it('should return an array with all the messages used in the document and overwrite the message from channel', () => {
      const doc = { channels: { test: { publish: { message: { name: 'test', test: false, k: 1 } } } }, components: { messages: { test: { test: true, k: 3 } } } };
      const d = new AsyncAPIDocument(doc);
      const allMessages = d.allMessages();
      expect(allMessages.size).to.be.equal(1);
      expect(allMessages.get('test').constructor.name).to.be.equal('Message');
      expect(allMessages.get('test').json().test).to.be.equal(true);
    });
    it('should return an array with all the messages used in the document', () => {
      const doc = { channels: { test: { publish: { message: { test: true, k: 1 } } }, test2: { subscribe: { message: { name: 'test', test: true, k: 2 } } } }, components: { messages: { test: { test: true, k: 3 } } } };
      const d = new AsyncAPIDocument(doc);
      expect(d.allMessages().size).to.be.equal(2);
      d.allMessages().forEach(t => {
        expect(t.constructor.name).to.be.equal('Message');
        expect(t.json().test).to.be.equal(true);
      });
    });
  });

  describe('#allSchemas()', function () {
    it('should return a map with all the schemas used in the document', () => {
      const doc = { channels: { test: { parameters: { testParam1: { schema: { $id: 'testParamSchema', test: true, k: 0 } } }, publish: { message: { headers: { test: true, k: 1 }, payload: { test: true, k: 2 } } } }, test2: { subscribe: { message: { payload: { $id: 'testPayload', test: true, k: 2 } } } } }, components: { schemas: { testSchema: { test: true, k: 3 } } } };
      const d = new AsyncAPIDocument(doc);
      const schemas = d.allSchemas();
      expect(schemas.size).to.be.equal(5);

      //Ensure the actual keys are as expected
      const schemaKeys = Array.from(schemas.keys());
      expect(schemaKeys).to.deep.equal([
        "testParamSchema",
        "<anonymous-schema-1>",
        "<anonymous-schema-2>",
        "testPayload",
        "testSchema"
      ])
      for (const t of schemas.values()) {
        expect(t.constructor.name).to.be.equal('Schema');
        expect(t.json().test).to.be.equal(true);
      }
    });
    it('should return a map with all the nested schemas', () => {
      const doc = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../nested-schemas.json"), 'utf8'));
      const d = new AsyncAPIDocument(doc);
      const schemas = d.allSchemas();

      //Ensure the actual keys are as expected
      const schemaKeys = Array.from(schemas.keys());
      console.log(schemaKeys);
      expect(schemaKeys).to.deep.equal([
        "testParamSchema",
        "testParamNestedSchemaProp",
        "testParamNestedNestedSchemaProp2",
        "testHeaderSchema",
        "testHeaderNestedSchemaProp",
        "testHeaderNestedNestedSchemaProp1",
        "testHeaderNestedSchemaPropArray",
        "testHeaderNestedSchemaPropArrayProp1",
        "testPayloadSchema",
        "testPayloadNestedSchemaProp",
        "testPayloadNestedNestedSchemaProp1",
        "testPayloadNestedSchemaPropArray",
        "testPayloadNestedSchemaPropArrayProp1",
        "testPayload",
        "testComponentSchemaSchema",
        "testComponentSchemaNestedSchemaPropAllOf",
        "testComponentSchemaNestedSchemaPropAllOfSchema1",
        "testComponentSchemaNestedSchemaPropAllOfSchema1Prop1",
        "testComponentSchemaNestedSchemaPropAllOfSchema2",
        "testComponentSchemaNestedSchemaPropAllOfSchema2Prop1",
        "testComponentSchemaNestedSchemaPropArray",
        "testComponentSchemaNestedSchemaPropArrayProp1",
        "testComponentSchemaNestedSchemaPropArrayProp2"
      ])
      for (const t of schemas.values()) {
        expect(t.constructor.name).to.be.equal('Schema');
        expect(t.json().test).to.be.equal(true);
      }
    });
  });
});
