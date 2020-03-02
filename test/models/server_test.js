const { expect } = require('chai');
const Server = require('../../lib/models/server');
const js = { url: 'test.com', protocol: 'amqp', protocolVersion: '0-9-1', description: 'test', variables: { test1: { enum: ['value1', 'value2'], default: 'value1', description: 'test1', examples: ['value2'] } }, security: [{ oauth2: ['user:read'] }], bindings: { amqp: 'test' }, 'x-test': 'testing' };

describe('Server', () => {
  describe('#ext()', () => {
    it('should support extensions', () => {
      const d = new Server(js);
      expect(d.ext('x-test')).to.be.equal(js['x-test']);      
      expect(d.extension('x-test')).to.be.equal(js['x-test']);      
      expect(d.extensions()).to.be.deep.equal({'x-test': 'testing'});
    });
  });

  describe('#url()', function () {
    it('should return a string', () => {
      const d = new Server(js);
      expect(d.url()).to.be.equal(js.url);
    });
  });
  
  describe('#protocol()', function () {
    it('should return a string', () => {
      const d = new Server(js);
      expect(d.protocol()).to.be.equal(js.protocol);
    });
  });
  
  describe('#protocolVersion()', function () {
    it('should return a string', () => {
      const d = new Server(js);
      expect(d.protocolVersion()).to.be.equal(js.protocolVersion);
    });
  });
  
  describe('#description()', function () {
    it('should return a string', () => {
      const d = new Server(js);
      expect(d.description()).to.be.equal(js.description);
    });
  });

  describe('#hasVariables()', function () {
    it('should return a boolean indicating if a server URL has variables', () => {
      const doc = { url: 'test1:{port}', variables: { port: { desc: 'test1' } } };
      const docNoServerVariables = { url: 'test' };
      const d = new Server(doc);
      const d2 = new Server(docNoServerVariables);
      expect(d.hasVariables()).to.equal(true);
      expect(d2.hasVariables()).to.equal(false);
    });
  });

  describe('#variables()', function () {
    it('should return a map of ServerVariable objects', () => {
      const d = new Server(js);
      expect(typeof d.variables()).to.be.equal('object');
      expect(d.variables().test1.constructor.name).to.equal('ServerVariable');
      expect(d.variables().test1.json()).to.equal(js.variables.test1);
    });
  });
  
  describe('#variable()', function () {
    it('should return a specific ServerVariable object', () => {
      const d = new Server(js);
      expect(d.variable('test1').constructor.name).to.equal('ServerVariable');
      expect(d.variable('test1').json()).to.equal(js.variables.test1);
    });
  });
  
  describe('#security()', function () {
    it('should return an array of security requirements objects', () => {
      const d = new Server(js);
      expect(Array.isArray(d.security())).to.equal(true);
      d.security().forEach((s, i) => {
        expect(s.constructor.name).to.equal('ServerSecurityRequirement');
        expect(s.json()).to.equal(js.security[i]);
      });
    });
  });

  describe('#bindings()', function () {
    it('should return a map of bindings', () => {
      const d = new Server(js);
      expect(d.bindings()).to.be.equal(js.bindings);
    });
  });

  describe('#binding()', function () {
    it('should return a specific binding', () => {
      const d = new Server(js);
      expect(d.binding('amqp')).to.be.equal(js.bindings.amqp);
    });
  });
});
