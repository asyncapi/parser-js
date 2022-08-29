import { Contact } from '../../../src/models/v2/contact';

import { serializeInput, assertExtensions } from './utils';

import type { v2 } from '../../../src/interfaces';

describe('Contact model', function() {
  describe('.hasName()', function() {
    it('should return true when there is a value', function() {
      const doc = serializeInput<v2.ContactObject>({ name: "LeChuck" });
      const d = new Contact(doc);
      expect(d.hasName()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = serializeInput<v2.ContactObject>({});
      const d = new Contact(doc);
      expect(d.hasName()).toEqual(false);
    });
  });

  describe('.name()', function() {
    it('should return the value', function() {
      const doc = serializeInput<v2.ContactObject>({ name: "LeChuck" });
      const d = new Contact(doc);
      expect(d.name()).toEqual(doc.name);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = serializeInput<v2.ContactObject>({});
      const d = new Contact(doc);
      expect(d.name()).toBeUndefined();
    });
  });

  describe('.hasUrl()', function() {
    it('should return true when there is a value', function() {
      const doc = serializeInput<v2.ContactObject>({ url: "https://example.com" });
      const d = new Contact(doc);
      expect(d.hasUrl()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = serializeInput<v2.ContactObject>({});
      const d = new Contact(doc);
      expect(d.hasUrl()).toEqual(false);
    });
  });

  describe('.url()', function() {
    it('should return the value', function() {
      const doc = serializeInput<v2.ContactObject>({ url: "https://example.com" });
      const d = new Contact(doc);
      expect(d.url()).toEqual(doc.url);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = serializeInput<v2.ContactObject>({});
      const d = new Contact(doc);
      expect(d.url()).toBeUndefined();
    });
  });

  describe('.hasEmail()', function() {
    it('should return true when there is a value', function() {
      const doc = serializeInput<v2.ContactObject>({ email: "lechuck@example.com" });
      const d = new Contact(doc);
      expect(d.hasEmail()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = serializeInput<v2.ContactObject>({});
      const d = new Contact(doc);
      expect(d.hasEmail()).toEqual(false);
    });
  });

  describe('.email()', function() {
    it('should return the value', function() {
      const doc = serializeInput<v2.ContactObject>({ email: "lechuck@example.com" });
      const d = new Contact(doc);
      expect(d.email()).toEqual(doc.email);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = serializeInput<v2.ContactObject>({});
      const d = new Contact(doc);
      expect(d.email()).toBeUndefined();
    });
  });

  describe('mixins', function() {
    assertExtensions(Contact);
  });
});
