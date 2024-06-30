import { OAuthFlow } from '../../src/old-api/oauth-flow';
import { assertExtensionsMixin } from './mixins';

describe('OAuthFlow', function() {
  const json = { authorizationUrl: 'testing', refreshUrl: 'testing', tokenUrl: 'testing', scopes: { test: 'testing' }, 'x-test': 'testing' };

  describe('authorizationUrl()', function() {
    it('should return a string', function() {
      const d = new OAuthFlow(json);
      expect(d.authorizationUrl()).toEqual(json.authorizationUrl);
    });
  });
  
  describe('tokenUrl()', function() {
    it('should return a string', function() {
      const d = new OAuthFlow(json);
      expect(d.tokenUrl()).toEqual(json.tokenUrl);
    });
  });
  
  describe('refreshUrl()', function() {
    it('should return a string', function() {
      const d = new OAuthFlow(json);
      expect(d.refreshUrl()).toEqual(json.refreshUrl);
    });
  });
  
  describe('scopes()', function() {
    it('should return a Map of strings', function() {
      const d = new OAuthFlow(json);
      expect(typeof d.scopes()).toEqual('object');
      expect(d.scopes()).toEqual(json.scopes);
    });
  });

  assertExtensionsMixin(OAuthFlow);
});