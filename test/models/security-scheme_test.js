const { expect } = require('chai');
const SecurityScheme = require('../../lib/models/security-scheme');
const js = { type: 'testing', description: 'testing', name: 'testing', in: 'testing', scheme: 'testing', bearerFormat: 'testing', openIdConnectUrl: 'testing', flows: { test: { testing: true } }, 'x-test': 'testing' };

describe('SecurityScheme', () => {
  describe('#ext()', () => {
    it('should support extensions', () => {
      const d = new SecurityScheme(js);
      expect(d.ext('x-test')).to.be.equal(js['x-test']);      
      expect(d.extension('x-test')).to.be.equal(js['x-test']);      
      expect(d.extensions()).to.be.deep.equal({'x-test': 'testing'});
    });
  });

  describe('#type()', function () {
    it('should return a string', () => {
      const d = new SecurityScheme(js);
      expect(d.type()).to.be.equal(js.type);
    });
  });
  
  describe('#description()', function () {
    it('should return a string', () => {
      const d = new SecurityScheme(js);
      expect(d.description()).to.be.equal(js.description);
    });
  });
  
  describe('#name()', function () {
    it('should return a string', () => {
      const d = new SecurityScheme(js);
      expect(d.name()).to.be.equal(js.name);
    });
  });
  
  describe('#in()', function () {
    it('should return a string', () => {
      const d = new SecurityScheme(js);
      expect(d.in()).to.be.equal(js.in);
    });
  });
  
  describe('#scheme()', function () {
    it('should return a string', () => {
      const d = new SecurityScheme(js);
      expect(d.scheme()).to.be.equal(js.scheme);
    });
  });
  
  describe('#bearerFormat()', function () {
    it('should return a string', () => {
      const d = new SecurityScheme(js);
      expect(d.bearerFormat()).to.be.equal(js.bearerFormat);
    });
  });
  
  describe('#openIdConnectUrl()', function () {
    it('should return a string', () => {
      const d = new SecurityScheme(js);
      expect(d.openIdConnectUrl()).to.be.equal(js.openIdConnectUrl);
    });
  });
  
  describe('#flows()', function () {
    it('should return a map of OAuthFlow objects', () => {
      const d = new SecurityScheme(js);
      expect(typeof d.flows()).to.be.equal('object');
      expect(d.flows().test.constructor.name).to.equal('OAuthFlow');
      expect(d.flows().test.json()).to.equal(js.flows.test);
    });
  });
});
