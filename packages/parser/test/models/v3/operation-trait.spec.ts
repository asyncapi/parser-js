import { OperationTrait } from '../../../src/models/v3/operation-trait';
import { SecurityRequirement } from '../../../src/models/v3/security-requirement';
import { SecurityRequirements } from '../../../src/models/v3/security-requirements';
import { SecurityScheme } from '../../../src/models/v3/security-scheme';

import { assertCoreModel } from './utils';

describe('OperationTrait model', function() {
  describe('.id()', function() {
    it('should return the value', function() {
      const d = new OperationTrait({}, { id: '...' } as any);
      expect(d.id()).toEqual('...');
    });
    
    it('should return undefined when there is no value', function() {
      const doc = {};
      const d = new OperationTrait(doc);
      expect(d.id()).toBeUndefined();
    });
  });

  describe('.hasId()', function() {
    it('should return true when there is a value', function() {
      const d = new OperationTrait({}, { id: '...' } as any);
      expect(d.hasOperationId()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = {};
      const d = new OperationTrait(doc);
      expect(d.hasOperationId()).toEqual(false);
    });
  });

  describe('.security()', function() {
    it('should return collection of security requirements - old format (direct SecuritySchemeObject)', function() {
      const d = new OperationTrait({ security: [{ type: 'apiKey' }] });

      const security = d.security();
      expect(Array.isArray(security)).toEqual(true);
      expect(security).toHaveLength(1);
      expect(security[0]).toBeInstanceOf(SecurityRequirements);
      
      const requirement = security[0].all()[0] as SecurityRequirement;
      expect(requirement).toBeInstanceOf(SecurityRequirement);
      expect(requirement.scheme()).toBeInstanceOf(SecurityScheme);
      expect(requirement.scopes()).toEqual([]);
    });

    it('should return collection of security requirements - new format (SecurityRequirementObject)', function() {
      const securitySchemes = {
        apiKey: { type: 'apiKey', in: 'user' },
        oauth2: { type: 'oauth2', flows: {}, scopes: ['read', 'write'] }
      };
      const d = new OperationTrait(
        {
          security: [
            {
              apiKey: [{ type: 'apiKey', in: 'user' }],
              oauth2: [{ type: 'oauth2', flows: {}, scopes: ['read', 'write'] }]
            }
          ]
        },
        {
          asyncapi: {
            parsed: {
              components: {
                securitySchemes
              }
            }
          }
        } as any
      );

      const security = d.security();
      expect(Array.isArray(security)).toEqual(true);
      expect(security).toHaveLength(1);
      expect(security[0]).toBeInstanceOf(SecurityRequirements);
      
      const requirements = security[0].all();
      expect(requirements).toHaveLength(2);
      
      // First requirement (apiKey)
      const requirement1 = requirements[0] as SecurityRequirement;
      expect(requirement1).toBeInstanceOf(SecurityRequirement);
      expect(requirement1.scheme()).toBeInstanceOf(SecurityScheme);
      expect(requirement1.scheme().type()).toEqual('apiKey');
      expect(requirement1.scopes()).toEqual([]);
      
      // Second requirement (oauth2)
      const requirement2 = requirements[1] as SecurityRequirement;
      expect(requirement2).toBeInstanceOf(SecurityRequirement);
      expect(requirement2.scheme()).toBeInstanceOf(SecurityScheme);
      expect(requirement2.scheme().type()).toEqual('oauth2');
      expect(requirement2.scopes()).toEqual(['read', 'write']);
    });

    it('should return collection of security requirements - new format with multiple schemes in array', function() {
      const securitySchemes = {
        apiKey: { type: 'apiKey', in: 'user' }
      };
      const d = new OperationTrait(
        {
          security: [
            {
              apiKey: [
                { type: 'apiKey', in: 'user' },
                { type: 'apiKey', in: 'password' }
              ]
            }
          ]
        },
        {
          asyncapi: {
            parsed: {
              components: {
                securitySchemes
              }
            }
          }
        } as any
      );

      const security = d.security();
      expect(Array.isArray(security)).toEqual(true);
      expect(security).toHaveLength(1);
      
      const requirements = security[0].all();
      expect(requirements).toHaveLength(2);
      
      requirements.forEach((req) => {
        expect(req).toBeInstanceOf(SecurityRequirement);
        expect(req.scheme()).toBeInstanceOf(SecurityScheme);
        expect(req.scheme().type()).toEqual('apiKey');
      });
    });

    it('should return collection of security requirements - old format with reference', function() {
      const d = new OperationTrait({
        security: [{ $ref: '#/components/securitySchemes/apiKey' }]
      });

      const security = d.security();
      expect(Array.isArray(security)).toEqual(true);
      expect(security).toHaveLength(1);
      expect(security[0]).toBeInstanceOf(SecurityRequirements);
    });
    
    it('should return collection of security requirements when value is undefined', function() {
      const doc = {};
      const d = new OperationTrait(doc);
      expect(Array.isArray(d.security())).toEqual(true);
      expect(d.security()).toHaveLength(0);
    });

    it('should handle mixed security requirements', function() {
      const securitySchemes = {
        apiKey: { type: 'apiKey', in: 'user' }
      };
      const d = new OperationTrait(
        {
          security: [
            { type: 'http', scheme: 'bearer' }, // Old format
            { apiKey: [{ type: 'apiKey', in: 'user' }] } // New format
          ]
        },
        {
          asyncapi: {
            parsed: {
              components: {
                securitySchemes
              }
            }
          }
        } as any
      );

      const security = d.security();
      expect(Array.isArray(security)).toEqual(true);
      expect(security).toHaveLength(2);
      
      // First requirement (old format)
      expect(security[0]).toBeInstanceOf(SecurityRequirements);
      const req1 = security[0].all()[0] as SecurityRequirement;
      expect(req1.scheme().type()).toEqual('http');
      
      // Second requirement (new format)
      expect(security[1]).toBeInstanceOf(SecurityRequirements);
      const req2 = security[1].all()[0] as SecurityRequirement;
      expect(req2.scheme().type()).toEqual('apiKey');
    });
  });

  describe('mixins', function() {
    assertCoreModel(OperationTrait);
  });
});
