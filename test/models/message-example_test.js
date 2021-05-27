const { expect } = require('chai');
const js = { name: 'test', summary: 'test summary', payload: {test: true} };

const MessageExample = require('../../lib/models/message-example');

describe('MessageExample', function () {
  describe('#name()', function () {
    it('should return a string', function () {
      const e = new MessageExample(js);
      expect(e.name()).to.be.equal(js.name);
    });
  });

  describe('#summary()', function () {
    it('should return a string', function () {
      const e = new MessageExample(js);
      expect(e.summary()).to.be.equal(js.summary);
    });
  });

  describe('#hasHeaders()', function () {
    it('should return false', function () {
      const e = new MessageExample(js);
      expect(e.hasHeaders()).to.be.equal(false);
    });
  });

  describe('#headers()', function () {
    it('should return null', function () {
      const e = new MessageExample(js);
      expect(e.headers()).to.be.equal(null);
    });
  });

  describe('#hasPayload()', function () {
    it('should return true', function () {
      const e = new MessageExample(js);
      expect(e.hasPayload()).to.be.equal(true);
    });
  });

  describe('#payload()', function () {
    it('should return JSON', function () {
      const e = new MessageExample(js);
      expect(e.payload()).to.be.equal(js.payload);
    });
  });
});