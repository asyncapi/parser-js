import { ServerVariable } from '../../src/old-api/server-variable';
import { assertDescriptionMixin, assertExtensionsMixin } from './mixins';

describe('ServerVariable', function() {
  const json = { enum: ['value1', 'value2'], default: 'value1', description: 'test1', examples: ['value2'], 'x-test': 'testing' };

  describe('allowedValues()', function() {
    it('should return an array of strings', function() {
      const d = new ServerVariable(json);
      expect(d.allowedValues()).toEqual(json.enum);
    });
  });
  
  describe('hasAllowedValues()', function() {
    it('should return a true when enum is present', function() {
      const d = new ServerVariable(json);
      expect(d.hasAllowedValues()).toEqual(true);
    });
    
    it('should return a false when enum is not present', function() {
      const d = new ServerVariable({});
      expect(d.hasAllowedValues()).toEqual(false);
    });
  });
  
  describe('allows()', function() {
    it('should return true if the value is in the enum', function() {
      const d = new ServerVariable(json);
      expect(d.allows('value1')).toEqual(true);
    });

    it('should return false if the value is not in the enum', function() {
      const d = new ServerVariable(json);
      expect(d.allows('not found')).toEqual(false);
    });
  });
  
  describe('defaultValue()', function() {
    it('should return a string', function() {
      const d = new ServerVariable(json);
      expect(d.defaultValue()).toEqual(json.default);
    });
  });

  describe('hasDefaultValue()', function() {
    it('should return true if default is present', function() {
      const d = new ServerVariable(json);
      expect(d.hasDefaultValue()).toEqual(true);
    });

    it('should return false if the value is not in the enum', function() {
      const d = new ServerVariable({});
      expect(d.hasDefaultValue()).toEqual(false);
    });
  });
  
  describe('examples()', function() {
    it('should return an array of strings', function() {
      const d = new ServerVariable(json);
      expect(d.examples()).toEqual(json.examples);
    });
  });

  assertDescriptionMixin(ServerVariable);
  assertExtensionsMixin(ServerVariable);
});