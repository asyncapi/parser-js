import { OperationTrait } from '../../../src/models/v2/operation-trait';
import { SecurityRequirement } from '../../../src/models/v2/security-requirement';
import { SecurityRequirements } from '../../../src/models/v2/security-requirements';
import { SecurityScheme } from '../../../src/models/v2/security-scheme';

import { assertBindings, assertDescription, assertExtensions, assertExternalDocumentation, assertTags } from './utils';

describe('OperationTrait model', function() {
  describe('.id()', function() {
    it('should return id of model', function() {
      const doc = {};
      const d = new OperationTrait(doc, { asyncapi: {} as any, pointer: '', id: 'trait', action: 'publish' });
      expect(d.id()).toEqual('trait');
    });

    it('should reuse operationId', function() {
      const doc = { operationId: '...' };
      const d = new OperationTrait(doc);
      expect(d.id()).toEqual(doc.operationId);
    });
  });

  describe('.hasOperationId()', function() {
    it('should return true when there is a value', function() {
      const doc = { operationId: '...' };
      const d = new OperationTrait(doc);
      expect(d.hasOperationId()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = {};
      const d = new OperationTrait(doc);
      expect(d.hasOperationId()).toEqual(false);
    });
  });

  describe('.operationId()', function() {
    it('should return the value', function() {
      const doc = { operationId: '...' };
      const d = new OperationTrait(doc);
      expect(d.operationId()).toEqual(doc.operationId);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = {};
      const d = new OperationTrait(doc);
      expect(d.operationId()).toBeUndefined();
    });
  });

  describe('.hasSummary()', function() {
    it('should return true when there is a value', function() {
      const doc = { summary: '...' };
      const d = new OperationTrait(doc);
      expect(d.hasSummary()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = {};
      const d = new OperationTrait(doc);
      expect(d.hasSummary()).toEqual(false);
    });
  });

  describe('.summary()', function() {
    it('should return the value', function() {
      const doc = { summary: '...' };
      const d = new OperationTrait(doc);
      expect(d.summary()).toEqual(doc.summary);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = {};
      const d = new OperationTrait(doc);
      expect(d.summary()).toBeUndefined();
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
    assertBindings(OperationTrait);
    assertDescription(OperationTrait);
    assertExtensions(OperationTrait);
    assertExternalDocumentation(OperationTrait);
    assertTags(OperationTrait);
  });
});
