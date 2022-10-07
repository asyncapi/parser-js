import { Server } from '../../src/old-api/server';
import { ServerVariable } from '../../src/old-api/server-variable';
import { SecurityRequirement } from '../../src/old-api/security-requirement';
import { assertDescriptionMixin, assertExtensionsMixin, assertBindingsMixin, assertTagsMixin } from './mixins';

import type { v2 } from '../../src/spec-types';

describe('Server', function() {
  const json: v2.ServerObject = { url: 'test.com', protocol: 'amqp', protocolVersion: '0-9-1', description: 'test', variables: { test1: { enum: ['value1', 'value2'], default: 'value1', description: 'test1', examples: ['value2'] } }, security: [{ oauth2: ['user:read'] }], bindings: { amqp: {} }, 'x-test': 'testing' };

  describe('url()', function() {
    it('should return a string', function() {
      const d = new Server(json);
      expect(d.url()).toEqual(json.url);
    });
  });
  
  describe('protocol()', function() {
    it('should return a string', function() {
      const d = new Server(json);
      expect(d.protocol()).toEqual(json.protocol);
    });
  });
  
  describe('protocolVersion()', function() {
    it('should return a string', function() {
      const d = new Server(json);
      expect(d.protocolVersion()).toEqual(json.protocolVersion);
    });
  });

  describe('hasVariables()', function() {
    it('should return a boolean indicating if a server URL has variables', function() {
      const doc = { url: 'test1:{port}', variables: { port: { desc: 'test1' } } } as any;
      const docNoServerVariables = { url: 'test' } as any;
      const d = new Server(doc);
      const d2 = new Server(docNoServerVariables);
      expect(d.hasVariables()).toEqual(true);
      expect(d2.hasVariables()).toEqual(false);
    });
  });

  describe('variables()', function() {
    it('should return a map of ServerVariable objects', function() {
      const d = new Server(json);
      expect(typeof d.variables()).toEqual('object');
      expect(d.variables().test1).toBeInstanceOf(ServerVariable);
      expect(d.variables().test1.json()).toEqual(json?.variables?.test1);
    });
  });
  
  describe('variable()', function() {
    it('should return a specific ServerVariable object', function() {
      const d = new Server(json);
      expect(d.variable('test1')).toBeInstanceOf(ServerVariable);
      expect(d.variable('test1')?.json()).toEqual(json?.variables?.test1);
    });
  });
  
  describe('security()', function() {
    it('should return an array of security requirements objects', function() {
      const d = new Server(json);
      expect(Array.isArray(d.security())).toEqual(true);
      d.security()?.forEach((s, i) => {
        expect(s).toBeInstanceOf(SecurityRequirement);
        expect(s.json()).toEqual(json?.security?.[i]);
      });
    });
  });

  assertDescriptionMixin(Server);
  assertTagsMixin(Server);
  assertExtensionsMixin(Server);
  assertBindingsMixin(Server);
});