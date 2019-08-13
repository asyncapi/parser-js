const { expect } = require('chai');
const ServerVariable = require('../../lib/models/server-variable');
const js = { enum: ['value1', 'value2'], default: 'value1', description: 'test1', examples: ['value2'], 'x-test': 'testing' };

describe('ServerVariable', () => {
  describe('#ext()', () => {
    it('should support extensions', () => {
      const d = new ServerVariable(js);
      expect(d.ext('x-test')).to.be.equal(js['x-test']);      
      expect(d.extension('x-test')).to.be.equal(js['x-test']);      
      expect(d.extensions()).to.be.deep.equal({'x-test': 'testing'});
    });
  });

  describe('#allowedValues()', function () {
    it('should return an array of strings', () => {
      const d = new ServerVariable(js);
      expect(d.allowedValues()).to.be.equal(js.enum);
    });
  });
  
  describe('#hasAllowedValues()', function () {
    it('should return a true when enum is present', () => {
      const d = new ServerVariable(js);
      expect(d.hasAllowedValues()).to.be.equal(true);
    });
    
    it('should return a false when enum is not present', () => {
      const d = new ServerVariable({});
      expect(d.hasAllowedValues()).to.be.equal(false);
    });
  });
  
  describe('#allows()', function () {
    it('should return true if the value is in the enum', () => {
      const d = new ServerVariable(js);
      expect(d.allows('value1')).to.be.equal(true);
    });

    it('should return false if the value is not in the enum', () => {
      const d = new ServerVariable(js);
      expect(d.allows('not found')).to.be.equal(false);
    });
  });
  
  describe('#defaultValue()', function () {
    it('should return a string', () => {
      const d = new ServerVariable(js);
      expect(d.defaultValue()).to.be.equal(js.default);
    });
  });

  describe('#hasDefaultValue()', function () {
    it('should return true if default is present', () => {
      const d = new ServerVariable(js);
      expect(d.hasDefaultValue()).to.be.equal(true);
    });

    it('should return false if the value is not in the enum', () => {
      const d = new ServerVariable({});
      expect(d.hasDefaultValue()).to.be.equal(false);
    });
  });
  
  describe('#description()', function () {
    it('should return a string', () => {
      const d = new ServerVariable(js);
      expect(d.description()).to.be.equal(js.description);
    });
  });
  
  describe('#examples()', function () {
    it('should return an array of strings', () => {
      const d = new ServerVariable(js);
      expect(d.examples()).to.be.equal(js.examples);
    });
  });
});
