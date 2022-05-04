import { OperationTrait } from '../../../src/models/v2/operation-trait';
import { SecurityRequirements } from '../../../src/models/v2/security-requirements';
import { SecurityRequirement } from '../../../src/models/v2/security-requirement';

import { 
  assertBindingsMixinInheritance,
  assertDescriptionMixinInheritance,
  assertExtensionsMixinInheritance,
  assertExternalDocumentationMixinInheritance,
  assertTagsMixinInheritance,
} from './mixins/inheritance';

describe('OperationTrait model', function() {
  describe('.id()', function() {
    it('should return id of model', function() {
      const doc = {};
      const d = new OperationTrait('trait', doc);
      expect(d.id()).toEqual('trait');
    });

    it('should reuse operationId', function() {
      const doc = { operationId: '...' };
      const d = new OperationTrait('trait', doc);
      expect(d.id()).toEqual(doc.operationId);
    });
  });

  describe('.kind()', function() {
    it('should return kind of operation', function() {
      const doc = {};
      const d = new OperationTrait('trait', doc, { asyncapi: {} as any, pointer: '', kind: 'publish' });
      expect(d.kind()).toEqual('publish');
    });
  });

  describe('.hasOperationId()', function() {
    it('should return true when there is a value', function() {
      const doc = { operationId: '...' };
      const d = new OperationTrait('trait', doc);
      expect(d.hasOperationId()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = {};
      const d = new OperationTrait('trait', doc);
      expect(d.hasOperationId()).toEqual(false);
    });
  });

  describe('.operationId()', function() {
    it('should return the value', function() {
      const doc = { operationId: '...' };
      const d = new OperationTrait('trait', doc);
      expect(d.operationId()).toEqual(doc.operationId);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = {};
      const d = new OperationTrait('trait', doc);
      expect(d.operationId()).toBeUndefined();
    });
  });

  describe('.hasSummary()', function() {
    it('should return true when there is a value', function() {
      const doc = { summary: "..." };
      const d = new OperationTrait('trait', doc);
      expect(d.hasSummary()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = {};
      const d = new OperationTrait('trait', doc);
      expect(d.hasSummary()).toEqual(false);
    });
  });

  describe('.summary()', function() {
    it('should return the value', function() {
      const doc = { summary: "..." };
      const d = new OperationTrait('trait', doc);
      expect(d.summary()).toEqual(doc.summary);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = {};
      const d = new OperationTrait('trait', doc);
      expect(d.summary()).toBeUndefined();
    });
  });

  describe('.security()', function() {
    it('should return collection of security requirements', function() {
      const doc = { security: [ { requirement: '...' } ] };
      const d = new OperationTrait('trait', doc);
      expect(d.security()).toBeInstanceOf(SecurityRequirements);
      expect(d.security().all()).toHaveLength(1);
      expect(d.security().all()[0]).toBeInstanceOf(SecurityRequirement);
    });
    
    it('should return collection of security requirements when value is undefined', function() {
      const doc = {};
      const d = new OperationTrait('trait', doc);
      expect(d.security()).toBeInstanceOf(SecurityRequirements);
      expect(d.security().all()).toHaveLength(0);
    });
  });

  describe('mixins inheritance', function() {
    assertBindingsMixinInheritance(OperationTrait);
    assertDescriptionMixinInheritance(OperationTrait);
    assertExtensionsMixinInheritance(OperationTrait);
    assertExternalDocumentationMixinInheritance(OperationTrait);
    assertTagsMixinInheritance(OperationTrait);
  });
});
