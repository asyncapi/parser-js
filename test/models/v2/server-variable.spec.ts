import { ServerVariable } from '../../../src/models/v2/server-variable';
import { assertDescription, assertExtensions } from './utils';

const doc = {
  description: 'Secure connection (TLS) is available through port 8883.',
  default: '1883',
  enum: ['1883', '8883'],
  examples: ['1883', '8883'],
};

const sv = new ServerVariable(doc, { asyncapi: {} as any, pointer: '', id: 'doc' });

describe('Server Variable ', function() {
  describe('.id()', function() {
    expect(sv.id()).toMatch('doc');
  });

  describe('.hasDefaultValue()', function() {
    it('should return true if default value is passed', function() {
      expect(sv.hasDefaultValue()).toBeTruthy();
    });
  });

  describe('.defaultValue()', function() {
    it('should return default value', function() {
      expect(sv.defaultValue()).toMatch(doc.default);
    });
  });

  describe('.hasAllowedValue()', function() {
    it('should return true when enum is passed', function() {
      expect(sv.hasAllowedValues()).toBeTruthy();
    });
  });

  describe('.allowedValue()', function() {
    it('should return enum object', function() {
      expect(sv.allowedValues()).toEqual(doc.enum);
    });
  });

  describe('.examples()', function() {
    it('should return array', function() {
      expect(sv.examples()).toEqual(doc.examples);
    });
  });

  describe('mixins inheritance', function () {
    assertDescription(ServerVariable);
    assertExtensions(ServerVariable);
  });
});
