import { Info } from '../../../src/models/v2/info';
import { Contact } from '../../../src/models/v2/contact';
import { License } from '../../../src/models/v2/license';
import { ExternalDocumentation } from '../../../src/models/v2/external-docs';
import { Tags } from '../../../src/models/v2/tags';
import { Tag } from '../../../src/models/v2/tag';
import { createDetailedAsyncAPI } from '../../../src/utils';

import { serializeInput, assertDescription, assertExtensions } from './utils';

import type { v2 } from '../../../src/spec-types';

describe('Info model', function() {
  describe('.title()', function() {
    it('should return the value', function() {
      const doc = serializeInput<v2.InfoObject>({ title: "Example API" });
      const d = new Info(doc);
      expect(d.title()).toEqual(doc.title);
    });
  });

  describe('.version()', function() {
    it('should return the value', function() {
      const doc = serializeInput<v2.InfoObject>({ version: "1.0.0" });
      const d = new Info(doc);
      expect(d.version()).toEqual(doc.version);
    });
  });

  describe('.hasId()', function() {
    it('should return true when there is a value', function() {
      const doc = { asyncapi: '2.0.0', id: 'someId' };
      const asyncapi = createDetailedAsyncAPI(doc, doc as any);
      const d = new Info(serializeInput<v2.InfoObject>({}), { asyncapi, pointer: '/info' });
      expect(d.hasId()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = { asyncapi: '2.0.0' };
      const asyncapi = createDetailedAsyncAPI(doc, doc as any);
      const d = new Info(serializeInput<v2.InfoObject>({}), { asyncapi, pointer: '/info' });
      expect(d.hasId()).toEqual(false);
    });
  });

  describe('.id()', function() {
    it('should return the value', function() {
      const doc = { asyncapi: '2.0.0', id: 'someId' };
      const asyncapi = createDetailedAsyncAPI(doc, doc as any);
      const d = new Info(serializeInput<v2.InfoObject>({}), { asyncapi, pointer: '/info' });
      expect(d.id()).toEqual(doc.id);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = { asyncapi: '2.0.0' };
      const asyncapi = createDetailedAsyncAPI(doc, doc as any);
      const d = new Info(serializeInput<v2.InfoObject>({}), { asyncapi, pointer: '/info' });
      expect(d.id()).toEqual(undefined);
    });
  });

  describe('.hasTermsOfService()', function() {
    it('should return true when there is a value', function() {
      const doc = serializeInput<v2.InfoObject>({ termsOfService: "These are the terms of service" });
      const d = new Info(doc);
      expect(d.hasTermsOfService()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = serializeInput<v2.InfoObject>({});
      const d = new Info(doc);
      expect(d.hasTermsOfService()).toEqual(false);
    });
  });

  describe('.termsOfService()', function() {
    it('should return the value', function() {
      const doc = serializeInput<v2.InfoObject>({ termsOfService: "These are the terms of service" });
      const d = new Info(doc);
      expect(d.termsOfService()).toEqual(doc.termsOfService);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = serializeInput<v2.InfoObject>({});
      const d = new Info(doc);
      expect(d.termsOfService()).toBeUndefined();
    });
  });
  
  describe('.hasContact()', function() {
    it('should return true when there is a value', function() {
      const doc = serializeInput<v2.InfoObject>({ contact: { name: "LeChuck" } });
      const d = new Info(doc);
      expect(d.hasContact()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = serializeInput<v2.InfoObject>({});
      const d = new Info(doc);
      expect(d.hasContact()).toEqual(false);
    });
  });

  describe('.contact()', function() {
    it('should return a Contact object', function() {
      const doc = serializeInput<v2.InfoObject>({ contact: { name: "LeChuck" } });
      const d = new Info(doc);
      expect(d.contact()).toBeInstanceOf(Contact);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = serializeInput<v2.InfoObject>({});
      const d = new Info(doc);
      expect(d.contact()).toBeUndefined();
    });
  });

  describe('.hasLicense()', function() {
    it('should return true when there is a value', function() {
      const doc = serializeInput<v2.InfoObject>({ license: { name: "Apache 2.0" } });
      const d = new Info(doc);
      expect(d.hasLicense()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = serializeInput<v2.InfoObject>({});
      const d = new Info(doc);
      expect(d.hasLicense()).toEqual(false);
    });
  });

  describe('.license()', function() {
    it('should return a License object', function() {
      const doc = serializeInput<v2.InfoObject>({ license: { name: "Apache 2.0" } });
      const d = new Info(doc);
      expect(d.license()).toBeInstanceOf(License);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = serializeInput<v2.InfoObject>({});
      const d = new Info(doc);
      expect(d.license()).toBeUndefined();
    });
  });

  describe('.hasExternalDocs()', function() {
    it('should return true when there is a value', function() {
      const doc = { asyncapi: '2.0.0', externalDocs: { url: 'https://example.com' } };
      const asyncapi = createDetailedAsyncAPI(doc, doc as any);
      const d = new Info(serializeInput<v2.InfoObject>({}), { asyncapi, pointer: '/info' });
      expect(d.hasExternalDocs()).toEqual(true);
    });
    
    it('should return false when there is an empty object', function() {
      const doc = { asyncapi: '2.0.0', externalDocs: {} };
      const asyncapi = createDetailedAsyncAPI(doc, doc as any);
      const d = new Info(serializeInput<v2.InfoObject>({}), { asyncapi, pointer: '/info' });
      expect(d.hasExternalDocs()).toEqual(false);
    });

    it('should return false when there is no value', function() {
      const doc = { asyncapi: '2.0.0' };
      const asyncapi = createDetailedAsyncAPI(doc, doc as any);
      const d = new Info(serializeInput<v2.InfoObject>({}), { asyncapi, pointer: '/info' });
      expect(d.hasExternalDocs()).toEqual(false);
    });
  });

  describe('.externalDocs()', function() {
    it('should return the value', function() {
      const doc = { asyncapi: '2.0.0', externalDocs: { url: 'https://example.com' } };
      const asyncapi = createDetailedAsyncAPI(doc, doc as any);
      const d = new Info(serializeInput<v2.InfoObject>({}), { asyncapi, pointer: '/info' });
      expect(d.externalDocs()).toBeInstanceOf(ExternalDocumentation);
      expect(d.externalDocs()!.json()).toEqual(doc.externalDocs);
    });

    it('should return undefined when there is an empty object', function() {
      const doc = { asyncapi: '2.0.0', externalDocs: {} };
      const asyncapi = createDetailedAsyncAPI(doc, doc as any);
      const d = new Info(serializeInput<v2.InfoObject>({}), { asyncapi, pointer: '/info' });
      expect(d.externalDocs()).toEqual(undefined);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = { asyncapi: '2.0.0' };
      const asyncapi = createDetailedAsyncAPI(doc, doc as any);
      const d = new Info(serializeInput<v2.InfoObject>({}), { asyncapi, pointer: '/info' });
      expect(d.externalDocs()).toEqual(undefined);
    });
  });

  describe('.tags()', function() {
    it('should return the collection of tags', function() {
      const tags = [{ name: 'one' }, { name: 'two' }];
      const doc = { asyncapi: '2.0.0', tags };
      const asyncapi = createDetailedAsyncAPI(doc, doc as any);
      const d = new Info(serializeInput<v2.InfoObject>({}), { asyncapi, pointer: '/info' });
      expect(d.tags()).toBeInstanceOf(Tags);
      expect(d.tags().length).toEqual(2);
      expect(d.tags().all()[0]).toBeInstanceOf(Tag);
      expect(d.tags().all()[1]).toBeInstanceOf(Tag);
    });

    it('should return empty array when there is an empty collection', function() {
      const doc = { asyncapi: '2.0.0' };
      const asyncapi = createDetailedAsyncAPI(doc, doc as any);
      const d = new Info(serializeInput<v2.InfoObject>({}), { asyncapi, pointer: '/info' });
      expect(d.tags()).toBeInstanceOf(Tags);
      expect(d.tags().all()).toEqual([]);
    });
  });

  describe('mixins', function() {
    assertDescription(Info);
    assertExtensions(Info);
  });
});
