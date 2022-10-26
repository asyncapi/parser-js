import { OperationTrait } from '../../../src/models/v3/operation-trait';
import { SecurityRequirement } from '../../../src/models/v3/security-requirement';
import { SecurityRequirements } from '../../../src/models/security-requirements';
import { SecurityScheme } from '../../../src/models/v3/security-scheme';

import { assertBindings, assertDescription, assertExtensions, assertExternalDocumentation, assertTags } from './utils';

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
      expect(d.hasId()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = {};
      const d = new OperationTrait(doc);
      expect(d.hasId()).toEqual(false);
    });
  });

  describe('.action()', function() {
    it('should return kind/action of operation', function() {
      const d = new OperationTrait({ action: 'send', channel: {} }, { asyncapi: {} as any, pointer: '', id: 'trait' });
      expect(d.action()).toEqual('send');
    });
  });

  describe('.isSend()', function() {
    it('should return true when operation has send action', function() {
      const d = new OperationTrait({ action: 'send', channel: {} }, { asyncapi: {} as any, pointer: '', id: 'trait' });
      expect(d.isSend()).toBeTruthy();
    });

    it('should return false when operation has receive action', function() {
      const doc = {};
      const d = new OperationTrait({ action: 'receive', channel: {} }, { asyncapi: {} as any, pointer: '', id: 'trait' });
      expect(d.isSend()).toBeFalsy();
    });
  });

  describe('.isReceive()', function() {
    it('should return true when operation has receive action', function() {
      const doc = {};
      const d = new OperationTrait({ action: 'receive', channel: {} }, { asyncapi: {} as any, pointer: '', id: 'trait' });
      expect(d.isReceive()).toBeTruthy();
    });

    it('should return false when operation has send action', function() {
      const doc = {};
      const d = new OperationTrait({ action: 'send', channel: {} }, { asyncapi: {} as any, pointer: '', id: 'trait' });
      expect(d.isReceive()).toBeFalsy();
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
