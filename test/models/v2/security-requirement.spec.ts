import { SecurityRequirement } from '../../../src/models/v2/security-requirement';
import { SecurityScheme } from '../../../src/models/v2/security-scheme';

describe('SecurityRequirement model', function() {
  const asyncapi = { parsed: { components: { securitySchemes: { security1: {}, security2: {} } } } };

  describe('.requirements()', function() {
    it('should return map of requirements - empty requirements', function() {
      const doc = {};
      const d = new SecurityRequirement(doc);
      expect(d.requirements()).toEqual({});
    });

    it('should return map of requirements - single requirement', function() {
      const doc = { security1: ['write:item'] };
      const d = new SecurityRequirement(doc, { asyncapi: asyncapi as any, pointer: '' });
      expect(d.requirements()['security1'].schema).toBeInstanceOf(SecurityScheme);
      expect(d.requirements()['security1'].scopes).toEqual(['write:item']);
    });

    it('should return map of requirements - empty scopes', function() {
      const doc = { security1: [] };
      const d = new SecurityRequirement(doc, { asyncapi: asyncapi as any, pointer: '' });
      expect(d.requirements()['security1'].schema).toBeInstanceOf(SecurityScheme);
      expect(d.requirements()['security1'].scopes).toEqual([]);
    });

    it('should return map of requirements - two requirements', function() {
      const doc = { security1: [], security2: ['write:item'] };
      const d = new SecurityRequirement(doc, { asyncapi: asyncapi as any, pointer: '' });
      expect(d.requirements()['security1'].schema).toBeInstanceOf(SecurityScheme);
      expect(d.requirements()['security1'].scopes).toEqual([]);
      expect(d.requirements()['security2'].schema).toBeInstanceOf(SecurityScheme);
      expect(d.requirements()['security2'].scopes).toEqual(['write:item']);
    });
  });
});
