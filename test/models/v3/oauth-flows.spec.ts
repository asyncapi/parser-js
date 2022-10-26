import { OAuthFlows } from '../../../src/models/v3/oauth-flows';
import { OAuthFlow } from '../../../src/models/v3/oauth-flow';

import { assertExtensions } from './utils';

const oAuthFlowsObject = {
  implicit: {
    authorizationUrl: 'https://example.com/api/oauth/dialog',
    scopes: {
      'write:pets': 'modify pets in your account',
      'read:pets': 'read your pets'
    }
  },
  authorizationCode: {
    authorizationUrl: 'https://example.com/api/oauth/dialog',
    tokenUrl: 'https://example.com/api/oauth/token',
    scopes: {
      'write:pets': 'modify pets in your account',
      'read:pets': 'read your pets'
    }
  }
};

const flows = new OAuthFlows(oAuthFlowsObject);

describe('OAuth Flows', function() {
  describe('.hasImplicit()', function() {
    it('should return true', function() {
      expect(flows.hasImplicit()).toBeTruthy();
    });
  });

  describe('.implicit()', function() {
    it('should return OAuthflow object', function() {
      expect(flows.implicit() instanceof OAuthFlow).toBeTruthy();
    });
  });

  describe('mixins', function() {
    assertExtensions(OAuthFlows);
  });
});