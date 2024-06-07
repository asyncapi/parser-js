import { Info } from '../../../src/models/v3/info';
import { Contact } from '../../../src/models/v3/contact';
import { License } from '../../../src/models/v3/license';
import { createDetailedAsyncAPI } from '../../../src/utils';

import { serializeInput, assertDescription, assertExtensions, assertExternalDocumentation, assertTags } from './utils';

import type { v3 } from '../../../src/spec-types';

describe('Info model', function() {
  describe('.title()', function() {
    it('should return the value', function() {
      const doc = serializeInput<v3.InfoObject>({ title: 'Example API' });
      const d = new Info(doc);
      expect(d.title()).toEqual(doc.title);
    });
  });

  describe('.version()', function() {
    it('should return the value', function() {
      const doc = serializeInput<v3.InfoObject>({ version: '1.0.0' });
      const d = new Info(doc);
      expect(d.version()).toEqual(doc.version);
    });
  });

  describe('.hasId()', function() {
    it('should return true when there is a value', function() {
      const doc = { asyncapi: '2.0.0', info: { title: 'test', version: 'test' }, id: 'someId' };
      const asyncapi = createDetailedAsyncAPI(doc, doc as any);
      const d = new Info(serializeInput<v3.InfoObject>({}), { asyncapi, pointer: '/info' });
      expect(d.hasId()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = { asyncapi: '2.0.0', info: { title: 'test', version: 'test' } };
      const asyncapi = createDetailedAsyncAPI(doc, doc as any);
      const d = new Info(serializeInput<v3.InfoObject>({}), { asyncapi, pointer: '/info' });
      expect(d.hasId()).toEqual(false);
    });
  });

  describe('.id()', function() {
    it('should return the value', function() {
      const doc = { asyncapi: '2.0.0', info: { title: 'test', version: 'test' }, id: 'someId' };
      const asyncapi = createDetailedAsyncAPI(doc, doc as any);
      const d = new Info(serializeInput<v3.InfoObject>({}), { asyncapi, pointer: '/info' });
      expect(d.id()).toEqual(doc.id);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = { asyncapi: '2.0.0', info: { title: 'test', version: 'test' } };
      const asyncapi = createDetailedAsyncAPI(doc, doc as any);
      const d = new Info(serializeInput<v3.InfoObject>({}), { asyncapi, pointer: '/info' });
      expect(d.id()).toEqual(undefined);
    });
  });

  describe('.hasTermsOfService()', function() {
    it('should return true when there is a value', function() {
      const doc = serializeInput<v3.InfoObject>({ termsOfService: 'These are the terms of service' });
      const d = new Info(doc);
      expect(d.hasTermsOfService()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = serializeInput<v3.InfoObject>({});
      const d = new Info(doc);
      expect(d.hasTermsOfService()).toEqual(false);
    });
  });

  describe('.termsOfService()', function() {
    it('should return the value', function() {
      const doc = serializeInput<v3.InfoObject>({ termsOfService: 'These are the terms of service' });
      const d = new Info(doc);
      expect(d.termsOfService()).toEqual(doc.termsOfService);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = serializeInput<v3.InfoObject>({});
      const d = new Info(doc);
      expect(d.termsOfService()).toBeUndefined();
    });
  });
  
  describe('.hasContact()', function() {
    it('should return true when there is a value', function() {
      const doc = serializeInput<v3.InfoObject>({ contact: { name: 'LeChuck' } });
      const d = new Info(doc);
      expect(d.hasContact()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = serializeInput<v3.InfoObject>({});
      const d = new Info(doc);
      expect(d.hasContact()).toEqual(false);
    });
  });

  describe('.contact()', function() {
    it('should return a Contact object', function() {
      const doc = serializeInput<v3.InfoObject>({ contact: { name: 'LeChuck' } });
      const d = new Info(doc);
      expect(d.contact()).toBeInstanceOf(Contact);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = serializeInput<v3.InfoObject>({});
      const d = new Info(doc);
      expect(d.contact()).toBeUndefined();
    });
  });

  describe('.hasLicense()', function() {
    it('should return true when there is a value', function() {
      const doc = serializeInput<v3.InfoObject>({ license: { name: 'Apache 2.0' } });
      const d = new Info(doc);
      expect(d.hasLicense()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = serializeInput<v3.InfoObject>({});
      const d = new Info(doc);
      expect(d.hasLicense()).toEqual(false);
    });
  });

  describe('.license()', function() {
    it('should return a License object', function() {
      const doc = serializeInput<v3.InfoObject>({ license: { name: 'Apache 2.0' } });
      const d = new Info(doc);
      expect(d.license()).toBeInstanceOf(License);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = serializeInput<v3.InfoObject>({});
      const d = new Info(doc);
      expect(d.license()).toBeUndefined();
    });
  });

  describe('mixins', function() {
    assertDescription(Info);
    assertExtensions(Info);
    assertExternalDocumentation(Info);
    assertTags(Info);
  });
});
