import { SecurityRequirement } from '../../../src/models/v2/security-requirement';
import { SecurityScheme } from '../../../src/models/v2/security-scheme';

describe('SecurityRequirement model', function() {
  describe('.scheme()', function() {
    it('should return scheme', function() {
      const expectedScheme = new SecurityScheme({ type: 'oauth2' });
      const d = new SecurityRequirement({ scheme: expectedScheme }, { id: 'test' } as any);

      expect(d.meta('id')).toEqual('test');
      expect(d.scheme()).toBeInstanceOf(SecurityScheme);
      expect(d.scheme()).toEqual(expectedScheme);   
    });
  });
  
  describe('.scopes()', function() {
    it('should return scopes', function() {
      const scopes = ['scope_one'];
      const scheme = new SecurityScheme({ type: 'oauth2' });
      const d = new SecurityRequirement({ scheme, scopes });
      expect(d.scopes()).toEqual(scopes);     
    });

    it('should return empty array when scopes are omit', function() {
      const scheme = new SecurityScheme({ type: 'oauth2' });
      const d = new SecurityRequirement({ scheme });
      expect(d.scopes()).toEqual([]);     
    });
  });
});
