const { expect } = require('chai');
const { IntentAsyncAPIDocument } = require('../../lib/models/asyncapi');
const AsyncAPIVersion2Document = require('../../lib/version2/models/asyncapi');
const utils = require('../../lib/utils');
const sinon = require('sinon');
describe('IntentAsyncAPIDocument', function() {
  afterEach(function() {
    sinon.restore();
  });
  describe('#version()', function() {
    describe('for AsyncAPI version 2', function() {
      it('should return the version of the AsyncAPI document', function() {
        const json = { asyncapi: '2.0.0' };
        const document = new AsyncAPIVersion2Document(json);
        const intent = new IntentAsyncAPIDocument(document);
        const version = intent.version();
        expect(version).to.be.equal(json.asyncapi);
      });
    });
  });
  describe('#hasContentType()', function() {
    describe('for AsyncAPI version 2', function() {
      it('should find specific contentType if default', function() {
        const version2CheckStub = sinon.stub(utils, 'isVersion2').returns(true);
        const json = { defaultContentType: 'application/json' };
        const document = new AsyncAPIVersion2Document(json);
        const intent = new IntentAsyncAPIDocument(document);
        const hasCheck = intent.hasContentType('application/json');
        expect(version2CheckStub.called).to.equal(true);
        expect(hasCheck).to.be.equal(true);
      });
      it('should find specific contentType if in message', function() {
        const version2CheckStub = sinon.stub(utils, 'isVersion2').returns(true);
        const json = { channels: {test: {publish: {message: {contentType: 'application/json'}}}} };
        const document = new AsyncAPIVersion2Document(json);
        const intent = new IntentAsyncAPIDocument(document);
        const hasCheck = intent.hasContentType('application/json');
        expect(version2CheckStub.called).to.equal(true);
        expect(hasCheck).to.be.equal(true);
      });
      it('should not find non-defined contentType', function() {
        const version2CheckStub = sinon.stub(utils, 'isVersion2').returns(true);
        const json = { defaultContentType: 'application/json' };
        const document = new AsyncAPIVersion2Document(json);
        const intent = new IntentAsyncAPIDocument(document);
        const hasCheck = intent.hasContentType('something');
        expect(version2CheckStub.called).to.equal(true);
        expect(hasCheck).to.be.equal(false);
      });
    });
  });

  describe('#hasDefaultContentType()', function() {
    describe('for AsyncAPI version 2', function() {
      it('should find defaultContentType', function() {
        const version2CheckStub = sinon.stub(utils, 'isVersion2').returns(true);
        const json = { defaultContentType: 'application/json' };
        const document = new AsyncAPIVersion2Document(json);
        const intent = new IntentAsyncAPIDocument(document);
        const hasCheck = intent.hasDefaultContentType();
        expect(version2CheckStub.called).to.equal(true);
        expect(hasCheck).to.be.equal(true);
      });
      it('should find no defaultContentType', function() {
        const version2CheckStub = sinon.stub(utils, 'isVersion2').returns(true);
        const json = { };
        const document = new AsyncAPIVersion2Document(json);
        const intent = new IntentAsyncAPIDocument(document);
        const hasCheck = intent.hasDefaultContentType();
        expect(version2CheckStub.called).to.equal(true);
        expect(hasCheck).to.be.equal(false);
      });
    });
  });
  describe('#defaultContentType()', function() {
    describe('for AsyncAPI version 2', function() {
      it('should find defaultContentType', function() {
        const version2CheckStub = sinon.stub(utils, 'isVersion2').returns(true);
        const json = { defaultContentType: 'application/json' };
        const document = new AsyncAPIVersion2Document(json);
        const intent = new IntentAsyncAPIDocument(document);
        const defaultContentType = intent.defaultContentType();
        expect(version2CheckStub.called).to.equal(true);
        expect(defaultContentType).to.be.equal(json.defaultContentType);
      });
      it('should find no defaultContentType', function() {
        const version2CheckStub = sinon.stub(utils, 'isVersion2').returns(true);
        const json = { };
        const document = new AsyncAPIVersion2Document(json);
        const intent = new IntentAsyncAPIDocument(document);
        const defaultContentType = intent.defaultContentType();
        expect(version2CheckStub.called).to.equal(true);
        expect(defaultContentType).to.be.equal(json.defaultContentType);
      });
    });
  });

  describe('#channels()', function() {
    describe('for AsyncAPI version 2', function() {
      it('should find channels', function() {
        const version2CheckStub = sinon.stub(utils, 'isVersion2').returns(true);
        const json = { channels: { test: { } } };
        const document = new AsyncAPIVersion2Document(json);
        const intent = new IntentAsyncAPIDocument(document);
        const channels = intent.channels();
        expect(version2CheckStub.called).to.equal(true);
        expect(channels.constructor.name).to.equal('IntentChannels');
        expect(channels.all().length).to.be.equal(1);
      });
      it('should find no channels', function() {
        const version2CheckStub = sinon.stub(utils, 'isVersion2').returns(true);
        const json = { };
        const document = new AsyncAPIVersion2Document(json);
        const intent = new IntentAsyncAPIDocument(document);
        const channels = intent.channels();
        expect(version2CheckStub.called).to.equal(true);
        expect(channels.constructor.name).to.equal('IntentChannels');
        expect(channels.all().length).to.be.equal(0);
      });
    });
  });

  describe('#messages()', function() {
    describe('for AsyncAPI version 2', function() {
      it('should find messages', function() {
        const version2CheckStub = sinon.stub(utils, 'isVersion2').returns(true);
        const json = { channels: { test: { subscribe: { message: { } }, publish: { message: { } } } } };
        const document = new AsyncAPIVersion2Document(json);
        const intent = new IntentAsyncAPIDocument(document);
        const messages = intent.messages();
        expect(version2CheckStub.called).to.equal(true);
        expect(messages.constructor.name).to.equal('IntentMessages');
        expect(messages.all().length).to.be.equal(2);
      });
      it('should find no messages', function() {
        const version2CheckStub = sinon.stub(utils, 'isVersion2').returns(true);
        const json = { };
        const document = new AsyncAPIVersion2Document(json);
        const intent = new IntentAsyncAPIDocument(document);
        const messages = intent.messages();
        expect(version2CheckStub.called).to.equal(true);
        expect(messages.constructor.name).to.equal('IntentMessages');
        expect(messages.all().length).to.be.equal(0);
      });
    });
  });

  describe('#operations()', function() {
    describe('for AsyncAPI version 2', function() {
      it('should find operations', function() {
        const version2CheckStub = sinon.stub(utils, 'isVersion2').returns(true);
        const json = { channels: { test: { subscribe: { message: { } } } } };
        const document = new AsyncAPIVersion2Document(json);
        const intent = new IntentAsyncAPIDocument(document);
        const operations = intent.operations();
        expect(version2CheckStub.called).to.equal(true);
        expect(operations.constructor.name).to.equal('IntentOperations');
        console.log('OPERATIONS!!!!!!!!!!:', operations.all());
        expect(operations.all().length).to.be.equal(1);
      });
      it('should find no operations', function() {
        const version2CheckStub = sinon.stub(utils, 'isVersion2').returns(true);
        const json = { };
        const document = new AsyncAPIVersion2Document(json);
        const intent = new IntentAsyncAPIDocument(document);
        const operations = intent.operations();
        expect(version2CheckStub.called).to.equal(true);
        expect(operations.constructor.name).to.equal('IntentOperations');
        expect(operations.all().length).to.be.equal(0);
      });
    });
  });

  describe('#hasServers()', function() {
    describe('for AsyncAPI version 2', function() {
      it('should find servers', function() {
        const version2CheckStub = sinon.stub(utils, 'isVersion2').returns(true);
        const json = { servers: { test: { } } };
        const document = new AsyncAPIVersion2Document(json);
        const intent = new IntentAsyncAPIDocument(document);
        const hasCheck = intent.hasServers();
        expect(version2CheckStub.called).to.equal(true);
        expect(hasCheck).to.be.equal(true);
      });
      it('should find no servers', function() {
        const version2CheckStub = sinon.stub(utils, 'isVersion2').returns(true);
        const json = { servers: { } };
        const document = new AsyncAPIVersion2Document(json);
        const intent = new IntentAsyncAPIDocument(document);
        const hasCheck = intent.hasServers();
        expect(version2CheckStub.called).to.equal(true);
        expect(hasCheck).to.be.equal(false);
      });
    });
  });
  describe('#servers', function() {
    describe('for AsyncAPI version 2', function() {
      it('should find servers', function() {
        const version2CheckStub = sinon.stub(utils, 'isVersion2').returns(true);
        const json = { servers: { test: { } } };
        const document = new AsyncAPIVersion2Document(json);
        const intent = new IntentAsyncAPIDocument(document);
        const servers = intent.servers();
        expect(version2CheckStub.called).to.equal(true);
        expect(servers.length).to.equal(1);
      });
      it('should find no server', function() {
        const version2CheckStub = sinon.stub(utils, 'isVersion2').returns(true);
        const json = { servers: { } };
        const document = new AsyncAPIVersion2Document(json);
        const intent = new IntentAsyncAPIDocument(document);
        const servers = intent.servers();
        expect(version2CheckStub.called).to.equal(true);
        expect(servers.length).to.equal(0);
      });
    });
  });
  describe('#server(server_name)', function() {
    describe('for AsyncAPI version 2', function() {
      it('should find server', function() {
        const version2CheckStub = sinon.stub(utils, 'isVersion2').returns(true);
        const json = { servers: { test: { } } };
        const document = new AsyncAPIVersion2Document(json);
        const intent = new IntentAsyncAPIDocument(document);
        const server = intent.server('test');
        expect(version2CheckStub.called).to.equal(true);
        expect(server).to.not.equal(undefined);
      });
      it('should find no server', function() {
        const version2CheckStub = sinon.stub(utils, 'isVersion2').returns(true);
        const json = { servers: { } };
        const document = new AsyncAPIVersion2Document(json);
        const intent = new IntentAsyncAPIDocument(document);
        const server = intent.server('test');
        expect(version2CheckStub.called).to.equal(true);
        expect(server).to.be.equal(undefined);
      });
    });
  });
  describe('#securitySchemes()', function() {
    describe('for AsyncAPI version 2', function() {
      it('should find server', function() {
        const version2CheckStub = sinon.stub(utils, 'isVersion2').returns(true);
        const json = { servers: { test: { security: [] } } };
        const document = new AsyncAPIVersion2Document(json);
        const intent = new IntentAsyncAPIDocument(document);
        const securitySchemes = intent.securitySchemes();
        expect(version2CheckStub.called).to.equal(true);
        expect(securitySchemes.length).to.equal(1);
      });
      it('should find no server', function() {
        const version2CheckStub = sinon.stub(utils, 'isVersion2').returns(true);
        const json = { };
        const document = new AsyncAPIVersion2Document(json);
        const intent = new IntentAsyncAPIDocument(document);
        const securitySchemes = intent.securitySchemes();
        expect(version2CheckStub.called).to.equal(true);
        expect(securitySchemes.length).to.be.equal(0);
      });
    });
  });
});
