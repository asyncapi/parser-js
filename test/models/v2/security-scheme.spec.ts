import { SecurityScheme } from '../../../src/models/v2/security-scheme';
import { OAuthFlows } from '../../../src/models/v2/oauth-flows';
import { assertDescription, assertExtensions } from './utils';

import type { v2 } from '../../../src/spec-types';

const doc1: v2.SecuritySchemeObject = {
  type: 'http',
  name: 'api_key',
  in: 'header',
  scheme: 'bearer',
  bearerFormat: 'JWT',
  openIdConnectUrl: 'https://server.com/.well-known/openid-configuration',
  flows: {
    implicit: {
      authorizationUrl: 'https://example.com/api/oauth/dialog',
      scopes: {
        'write:pets': 'modify pets in your account',
        'read:pets': 'read your pets'
      }
    }
  }
};

const sc1 = new SecurityScheme(doc1, { asyncapi: {} as any, pointer: '', id: 'api_key' });
const emptyItem = new SecurityScheme({ type: 'X509' });

describe('Security Scheme', function () {
  describe('.id()', function () {
    it('should return name if present', function () {
      expect(sc1.id()).toEqual('api_key');
    });
  });

  describe('.type()', function () {
    it('should return type when it is present', function () {
      expect(sc1.type()).toEqual(doc1.type);
    });
  });

  describe('.hasName()', function () {
    it('should return true if name is present', function () {
      const data = new SecurityScheme({ type: 'apiKey', name: 'name' }, { asyncapi: {} as any, pointer: '', id: 'security-model' });
      expect(data.hasName()).toEqual(true);
    });

    it('should return false if name is not present', function () {
      const data = new SecurityScheme({ type: 'apiKey' }, { asyncapi: {} as any, pointer: '', id: 'security-model' });
      expect(data.hasName()).toEqual(false);
    });
  });

  describe('.name()', function () {
    it('should return name if present', function () {
      expect(sc1.name()).toEqual(doc1.name);
    });
  });

  describe('.hasIn()', function () {
    it('should return true if in is present', function () {
      const data = new SecurityScheme({ type: 'apiKey', in: 'header' }, { asyncapi: {} as any, pointer: '', id: 'security-model' });
      expect(data.hasIn()).toEqual(true);
    });

    it('should return false if in is not present', function () {
      const data = new SecurityScheme({ type: 'apiKey' }, { asyncapi: {} as any, pointer: '', id: 'security-model' });
      expect(data.hasIn()).toEqual(false);
    });
  });

  describe('.in()', function () {
    it('should return in if present', function () {
      expect(sc1.in()).toEqual(doc1.in);
      expect(emptyItem.in()).toBeUndefined();
    });
  });

  describe('.hasBearerFormat()', function () {
    it('should return true if bearerFormat is present', function () {
      const data = new SecurityScheme({ type: 'apiKey', bearerFormat: 'bearerFormat' }, { asyncapi: {} as any, pointer: '', id: 'security-model' });
      expect(data.hasBearerFormat()).toEqual(true);
    });

    it('should return false if bearerFormat is not present', function () {
      const data = new SecurityScheme({ type: 'apiKey' }, { asyncapi: {} as any, pointer: '', id: 'security-model' });
      expect(data.hasBearerFormat()).toEqual(false);
    });
  });

  describe('.bearerFormat()', function () {
    it('should return bearerFormat if present', function () {
      expect(sc1.bearerFormat()).toEqual(doc1.bearerFormat);
      expect(emptyItem.bearerFormat()).toBeUndefined();
    });
  });

  describe('.hasScheme()', function () {
    it('should return true if bearerFormat is present', function () {
      const data = new SecurityScheme({ type: 'apiKey', scheme: 'scheme' }, { asyncapi: {} as any, pointer: '', id: 'security-model' });
      expect(data.hasScheme()).toEqual(true);
    });

    it('should return false if bearerFormat is not present', function () {
      const data = new SecurityScheme({ type: 'apiKey' }, { asyncapi: {} as any, pointer: '', id: 'security-model' });
      expect(data.hasScheme()).toEqual(false);
    });
  });

  describe('.scheme()', function () {
    it('should return scheme if present', function () {
      expect(sc1.scheme()).toEqual(doc1.scheme);
      expect(emptyItem.scheme()).toBeUndefined();
    });
  });

  describe('.hasFlows()', function () {
    it('should return true if flows is present', function () {
      const data = new SecurityScheme({ type: 'apiKey', flows: {} }, { asyncapi: {} as any, pointer: '', id: 'security-model' });
      expect(data.hasFlows()).toEqual(true);
    });

    it('should return false if flows is not present', function () {
      const data = new SecurityScheme({ type: 'apiKey' }, { asyncapi: {} as any, pointer: '', id: 'security-model' });
      expect(data.hasFlows()).toEqual(false);
    });
  });

  describe('.flows()', function () {
    it('should return undefined if flow object is not present', function () {
      expect(emptyItem.flows()).toBeUndefined();
    });

    it('should return OAuthFlows object', function() {
      expect(sc1.flows() instanceof OAuthFlows).toBeTruthy();
    });
  });

  describe('.hasOpenIdConnectUrl()', function () {
    it('should return true if openIdConnectUrl is present', function () {
      const data = new SecurityScheme({ type: 'apiKey', openIdConnectUrl: 'openIdConnectUrl' }, { asyncapi: {} as any, pointer: '', id: 'security-model' });
      expect(data.hasOpenIdConnectUrl()).toEqual(true);
    });

    it('should return false if openIdConnectUrl is not present', function () {
      const data = new SecurityScheme({ type: 'apiKey' }, { asyncapi: {} as any, pointer: '', id: 'security-model' });
      expect(data.hasOpenIdConnectUrl()).toEqual(false);
    });
  });

  describe('.openIdConnectUrl()', function () {
    it('should return openIdConnectUrl value', function () {
      expect(sc1.openIdConnectUrl()).toMatch(doc1.openIdConnectUrl as string);
    });
  });

  describe('mixins inheritance', function () {
    assertDescription(SecurityScheme);
    assertExtensions(SecurityScheme);
  });
});
