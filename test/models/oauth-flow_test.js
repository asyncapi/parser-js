const { expect } = require('chai');
const OAuthFlow = require('../../lib/models/oauth-flow');
const js = { authorizationUrl: 'testing', refreshUrl: 'testing', tokenUrl: 'testing', scopes: { test: 'testing' }, 'x-test': 'testing' };

describe('OAuthFlow', () => {
  describe('#ext()', () => {
    it('should support extensions', () => {
      const d = new OAuthFlow(js);
      expect(d.ext('x-test')).to.be.equal(js['x-test']);      
      expect(d.extension('x-test')).to.be.equal(js['x-test']);      
      expect(d.extensions()).to.be.deep.equal({'x-test': 'testing'});
    });
  });

  describe('#authorizationUrl()', function () {
    it('should return a string', () => {
      const d = new OAuthFlow(js);
      expect(d.authorizationUrl()).to.be.equal(js.authorizationUrl);
    });
  });
  
  describe('#tokenUrl()', function () {
    it('should return a string', () => {
      const d = new OAuthFlow(js);
      expect(d.tokenUrl()).to.be.equal(js.tokenUrl);
    });
  });
  
  describe('#refreshUrl()', function () {
    it('should return a string', () => {
      const d = new OAuthFlow(js);
      expect(d.refreshUrl()).to.be.equal(js.refreshUrl);
    });
  });
  
  describe('#scopes()', function () {
    it('should return a Map of strings', () => {
      const d = new OAuthFlow(js);
      expect(typeof d.scopes()).to.be.equal('object');
      expect(d.scopes()).to.equal(js.scopes);
    });
  });
});
