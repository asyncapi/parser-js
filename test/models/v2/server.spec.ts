import { Server } from '../../../src/models/v2/server';
import { ServerVariables } from '../../../src/models/v2/server-variables';
import { SecurityScheme } from '../../../src/models/v2/security-scheme';

import {
  assertBindingsMixinInheritance,
  assertDescriptionMixinInheritance,
  assertExtensionsMixinInheritance,
} from './mixins/inheritance';

const doc = {
  'development': {
    protocol: 'mqtt',
    protocolVersion: '1.0.0',
    url: 'development.gigantic-server.com',
    variables: {
      username: {
        default: 'demo',
        description: 'This value is assigned by the service provider, in this example `gigantic-server.com`'
      }
    }
  }
};
const docItem = new Server(doc.development, { asyncapi: {} as any, pointer: '', id: 'development' });
const emptyItem = new Server({}, { asyncapi: {} as any, pointer: '', id: '' });

describe('Server Model', function () {
  describe('.id()', function () {
    it('should return name if present', function () {
      expect(docItem.id()).toMatch('development');
    });
  });

  describe('protocol()', function () {
    it('should return protocol ', function () {
      expect(docItem.protocol()).toMatch(doc.development.protocol);
    });
  });

  describe('.hasProtocolVersion()', function () {
    it('should return true if protocolVersion is not missing', function () {
      expect(docItem.hasProtocolVersion()).toBeTruthy();
    });

    it('should be false when protocolVersion is missing', function () {
      expect(emptyItem.hasProtocolVersion()).toBeFalsy();
    });
  })

  describe('.protocolVersion()', function () {
    it('should return value', function () {
      expect(docItem.protocolVersion()).toMatch(doc.development.protocolVersion);
    });

    it('should return undefined when protocolVersion is missing', function () {
      expect(emptyItem.protocolVersion()).toBeUndefined();
    })
  })

  describe('.url()', function () {
    it('should return value', function () {
      expect(docItem.url()).toMatch(doc.development.url);
    });
  });

  describe('.variables()', function () {
    it('should return ServerVariables object', function () {
      expect(docItem.variables()).toBeInstanceOf(ServerVariables);
    })
  })

  describe('.security()', function() {
    it('should return collection of security requirements', function() {
      const doc = { security: [ { requirement: [] } ] };
      const d = new Server(doc);
      expect(Array.isArray(d.security())).toEqual(true);
      expect(d.security()).toHaveLength(1);
      expect(typeof d.security()[0]).toEqual('object');
      expect(d.security()[0]['requirement'].schema).toBeInstanceOf(SecurityScheme);
      expect(d.security()[0]['requirement'].scopes).toEqual([]);
    });
    
    it('should return collection of security requirements when value is undefined', function() {
      const doc = {};
      const d = new Server(doc);
      expect(Array.isArray(d.security())).toEqual(true);
      expect(d.security()).toHaveLength(0);
    });
  });

  describe('mixins inheritance', function () {
    assertBindingsMixinInheritance(Server);
    assertDescriptionMixinInheritance(Server);
    assertExtensionsMixinInheritance(Server);
  });
})