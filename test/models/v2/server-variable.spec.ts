import { ServerVariable } from '../../../src/models/v2/server-variable';

import { assertDescription, assertExtensions } from './utils';

const doc = {
  description: 'Secure connection (TLS) is available through port 8883.',
  default: '1883',
  enum: ['1883', '8883']
};

const sv = new ServerVariable(doc, { asyncapi: {} as any, pointer: '', id: 'doc' });

describe('Server Variable ', function() {
  describe('.id()', function() {
    expect(sv.id()).toMatch('doc');
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

  describe('mixins', function() {
    assertDescription(ServerVariable);
    assertExtensions(ServerVariable);
  });
});
