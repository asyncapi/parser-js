import { SecurityScheme } from '../../src/old-api/security-scheme';
import { OAuthFlow } from '../../src/old-api/oauth-flow';
import { assertDescriptionMixin, assertExtensionsMixin } from './mixins';

import type { v2 } from '../../src/spec-types';

describe('SecurityScheme', function() {
  const json: v2.SecuritySchemeObject = { type: 'apiKey', description: 'testing', name: 'testing', in: 'cookie', scheme: 'testing', bearerFormat: 'testing', openIdConnectUrl: 'testing', flows: { authorizationCode: { authorizationUrl: '', tokenUrl: '', scopes: {}, } }, 'x-test': 'testing' };

  describe('type()', function() {
    it('should return a string', function() {
      const d = new SecurityScheme(json);
      expect(d.type()).toEqual(json.type);
    });
  });
  
  describe('name()', function() {
    it('should return a string', function() {
      const d = new SecurityScheme(json);
      expect(d.name()).toEqual(json.name);
    });
  });
  
  describe('in()', function() {
    it('should return a string', function() {
      const d = new SecurityScheme(json);
      expect(d.in()).toEqual(json.in);
    });
  });
  
  describe('scheme()', function() {
    it('should return a string', function() {
      const d = new SecurityScheme(json);
      expect(d.scheme()).toEqual(json.scheme);
    });
  });
  
  describe('bearerFormat()', function() {
    it('should return a string', function() {
      const d = new SecurityScheme(json);
      expect(d.bearerFormat()).toEqual(json.bearerFormat);
    });
  });
  
  describe('openIdConnectUrl()', function() {
    it('should return a string', function() {
      const d = new SecurityScheme(json);
      expect(d.openIdConnectUrl()).toEqual(json.openIdConnectUrl);
    });
  });
  
  describe('flows()', function() {
    it('should return a map of OAuthFlow objects', function() {
      const d = new SecurityScheme(json);
      expect(typeof d.flows()).toEqual('object');
      expect(d.flows().authorizationCode).toBeInstanceOf(OAuthFlow);
      expect(d.flows().authorizationCode.json()).toEqual(json.flows?.authorizationCode);
    });
  });

  assertDescriptionMixin(SecurityScheme);
  assertExtensionsMixin(SecurityScheme);
});