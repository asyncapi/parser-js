import { ModelMetadata } from '../../../src/models/base';
import { SecuritySchemeInterface } from '../../../src/models/security-scheme';
import { SecurityRequirement } from '../../../src/models/v2/security-requirement'
import { SecurityScheme } from '../../../src/models/v2/security-scheme';

describe('SecurityRequirement model', function() {
  describe('.scheme()', function() {
    it('should return scheme', function() {
      const doc = {};
      const expectedScheme = new SecurityScheme({type: "oauth2"}, {id: "test"} as any);
      const d = new SecurityRequirement(doc, ({ id: "test", scheme: expectedScheme } as any)); // TODO Pointer

      expect(d.scheme()).toBeInstanceOf(SecurityScheme);
      expect(d.scheme()).toEqual(expectedScheme);   
    });

  })
  describe('.scopes()', function() {
    it('should return scopes', function() {
      const doc = ["scope_one"];
      const d = new SecurityRequirement(doc); // TODO Pointer

      expect(d.scopes()).toEqual(doc);     
    });
  });
});
