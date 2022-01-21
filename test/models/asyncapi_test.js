const { expect } = require('chai');
const { IntentAsyncAPIDocument } = require('../../lib/models/asyncapi');
const AsyncAPIVersion2Document = require('../../lib/version2/models/asyncapi');
const utils = require('../../lib/utils');
const sinon = require('sinon');
describe('IntentAsyncAPIDocument', function() {
  describe('#version()', function() {
    describe('for AsyncAPI version 2', function() {
      it('should return the version of the AsyncAPI document', function() {
        const json = { asyncapi: '2.0.0' };
        const doc = new AsyncAPIVersion2Document(json);
        const d = new IntentAsyncAPIDocument(doc);
        expect(d.version()).to.be.equal(json.version);
      });
    });
  });
  describe('#hasContentType()', function() {
    describe('for AsyncAPI version 2', function() {
      // eslint-disable-next-line mocha/no-setup-in-describe
      const stub = sinon.stub(utils, 'isVersion2').returns(true);

      it('should find specific contentType if default for version', function() {
        const json = { defaultContentType: 'application/json' };
        const doc = new AsyncAPIVersion2Document(json);
        const d = new IntentAsyncAPIDocument(doc);
        expect(d.hasContentType('application/json')).to.be.equal(true);
      });
      it('should find specific contentType if in message for version', function() {
        const json = { channels: {test: {publish: {message: {contentType: 'application/json'}}}} };
        const doc = new AsyncAPIVersion2Document(json);
        const d = new IntentAsyncAPIDocument(doc);
        expect(d.hasContentType('application/json')).to.be.equal(true);
      });
      it('should not find non-defined contentType for version', function() {
        const json = { defaultContentType: 'application/json' };
        const doc = new AsyncAPIVersion2Document(json);
        const d = new IntentAsyncAPIDocument(doc);
        expect(d.hasContentType('something')).to.be.equal(false);
      });
    });
  });
});
