const { expect } = require('chai');
const js = { enum: ['value1', 'value2'], default: 'value1', description: 'test1', examples: ['value2'], 'x-test': 'testing' };

const ServerVariable = require('../../lib/models/server-variable');

const { assertMixinDescriptionInheritance } = require('../mixins/description_test');
const { assertMixinSpecificationExtensionsInheritance } = require('../mixins/specification-extensions_test');

describe('ServerVariable', function() {
  describe('#allowedValues()', function() {
    it('should return an array of strings', function() {
      const d = new ServerVariable(js);
      expect(d.allowedValues()).to.be.equal(js.enum);
    });
  });
  
  describe('#hasAllowedValues()', function() {
    it('should return a true when enum is present', function() {
      const d = new ServerVariable(js);
      expect(d.hasAllowedValues()).to.be.equal(true);
    });
    
    it('should return a false when enum is not present', function() {
      const d = new ServerVariable({});
      expect(d.hasAllowedValues()).to.be.equal(false);
    });
  });
  
  describe('#allows()', function() {
    it('should return true if the value is in the enum', function() {
      const d = new ServerVariable(js);
      expect(d.allows('value1')).to.be.equal(true);
    });

    it('should return false if the value is not in the enum', function() {
      const d = new ServerVariable(js);
      expect(d.allows('not found')).to.be.equal(false);
    });
  });
  
  describe('#defaultValue()', function() {
    it('should return a string', function() {
      const d = new ServerVariable(js);
      expect(d.defaultValue()).to.be.equal(js.default);
    });
  });

  describe('#hasDefaultValue()', function() {
    it('should return true if default is present', function() {
      const d = new ServerVariable(js);
      expect(d.hasDefaultValue()).to.be.equal(true);
    });

    it('should return false if the value is not in the enum', function() {
      const d = new ServerVariable({});
      expect(d.hasDefaultValue()).to.be.equal(false);
    });
  });
  
  describe('#examples()', function() {
    it('should return an array of strings', function() {
      const d = new ServerVariable(js);
      expect(d.examples()).to.be.equal(js.examples);
    });
  });

  describe('#mixins', function() {
    it('model should inherit from mixins', function() {
      assertMixinDescriptionInheritance(ServerVariable);
      assertMixinSpecificationExtensionsInheritance(ServerVariable);
    });
  });
});
