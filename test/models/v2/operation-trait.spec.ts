import { OperationTrait } from '../../../src/models/v2/operation-trait';
import { SecurityRequirement } from '../../../src/models/v2/security-requirement';
import { SecurityRequirements } from '../../../src/models/security-requirements';
import { SecurityScheme } from '../../../src/models/v2/security-scheme';

import { assertCoreModel } from './utils';

describe('OperationTrait model', function() {
  describe('.id()', function() {
    it('should return the value', function() {
      const doc = { operationId: '...' };
      const d = new OperationTrait(doc);
      expect(d.id()).toEqual(doc.operationId);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = {};
      const d = new OperationTrait(doc);
      expect(d.id()).toBeUndefined();
    });
  });

  describe('.hasId()', function() {
    it('should return true when there is a value', function() {
      const doc = { operationId: '...' };
      const d = new OperationTrait(doc);
      expect(d.hasId()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = {};
      const d = new OperationTrait(doc);
      expect(d.hasId()).toEqual(false);
    });
  });

  describe('.security()', function() {
    it('should return collection of security requirements', function() {
      const doc = { security: [{ requirement: [] }] };
      const d = new OperationTrait(doc);

      const security = d.security();
      expect(Array.isArray(security)).toEqual(true);
      expect(security).toHaveLength(1);
      expect(security[0]).toBeInstanceOf(SecurityRequirements);
      
      const requirement = security[0].get('requirement') as SecurityRequirement;
      expect(requirement).toBeInstanceOf(SecurityRequirement);
      expect(requirement.meta().id).toEqual('requirement');
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
