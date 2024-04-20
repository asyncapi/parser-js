import { OAuthFlow } from '../../../src/models/v2/oauth-flow';

import type { v2 } from '../../../src/spec-types';

const flowObject = {
  authorizationUrl: 'https://example.com/api/oauth/dialog',
  tokenUrl: '...',
  refreshUrl: '...',
  scopes: {
    'write:pets': 'modify pets in your account',
    'read:pets': 'read your pets'
  }
};

const flow = new OAuthFlow(flowObject);
const emptyObject = new OAuthFlow({} as v2.OAuthFlowObject);

describe('OAuth Flow', function() {
  describe('.hasAuthorizationUrl()', function() {
    it('should return true if authorizationUrl is present', function() {
      expect(flow.hasAuthorizationUrl()).toEqual(true);
    });
        
    it('should return false if authorizationUrl is not present', function() {
      expect(emptyObject.hasAuthorizationUrl()).toEqual(false);
    });
  });

  describe('.authorizationUrl()', function() {
    it('should return authrozationUrl if present', function() {
      expect(flow.authorizationUrl()).toEqual(flowObject.authorizationUrl);
    });
    
    it('should return undefined if authorizationUrl is not present', function() {
      expect(emptyObject.authorizationUrl()).toBeUndefined();
    });
  });

  describe('.hasTokenUrl()', function() {
    it('should return true if tokenUrl is present', function() {
      expect(flow.hasTokenUrl()).toEqual(true);
    });
        
    it('should return false if tokenUrl is not present', function() {
      expect(emptyObject.hasTokenUrl()).toEqual(false);
    });
  });

  describe('.tokenUrl()', function() {
    it('should return tokenUrl if present', function() {
      expect(flow.tokenUrl()).toEqual(flowObject.tokenUrl);
    });
    
    it('should return undefined if tokenUrl is not present', function() {
      expect(emptyObject.tokenUrl()).toBeUndefined();
    });
  });

  describe('.hasRefreshUrl()', function() {
    it('should return true if refreshUrl is present', function() {
      expect(flow.hasRefreshUrl()).toEqual(true);
    });
        
    it('should return false if refreshUrl is not present', function() {
      expect(emptyObject.hasRefreshUrl()).toEqual(false);
    });
  });

  describe('.refreshUrl()', function() {
    it('should return refreshUrl if present', function() {
      expect(flow.refreshUrl()).toEqual(flowObject.refreshUrl);
    });
    
    it('should return undefined if refreshUrl is not present', function() {
      expect(emptyObject.refreshUrl()).toBeUndefined();
    });
  });

  describe('.scopes()', function() {
    it('should return scopes if present', function() {
      expect(emptyObject.scopes()).toBeUndefined();
      expect(flow.scopes()!['write:pets']).toMatch(flowObject.scopes['write:pets']);
    });
  });
});
