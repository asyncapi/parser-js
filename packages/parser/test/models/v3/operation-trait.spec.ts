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
    it('should return collection of security requirements', function() {
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
    
    it('should return collection of security requirements when value is undefined', function() {
      const doc = {};
      const d = new OperationTrait(doc);
      expect(Array.isArray(d.security())).toEqual(true);
      expect(d.security()).toHaveLength(0);
    });
  });

  describe('mixins', function() {
    assertCoreModel(OperationTrait);
  });
});
