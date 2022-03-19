import { Info } from '../../../src/models/v2/info';
import { Contact } from '../../../src/models/v2/contact';
import { License } from '../../../src/models/v2/license';

import { 
  assertDescriptionMixinInheritance,
  assertExtensionsMixinInheritance,
  assertExternalDocumentationMixinInheritance,
  assertTagsMixinInheritance
} from './mixins/inheritance';

describe('Info model', function() {
  describe('.title()', function() {
    it('should return the value', function() {
      const doc = { title: "Example API" };
      const d = new Info(doc);
      expect(d.title()).toEqual(doc.title);
    });
  });

  describe('.version()', function() {
    it('should return the value', function() {
      const doc = { version: "1.0.0" };
      const d = new Info(doc);
      expect(d.version()).toEqual(doc.version);
    });
  });

  describe('.hasTermsOfService()', function() {
    it('should return true when there is a value', function() {
      const doc = { termsOfService: "These are the terms of service" };
      const d = new Info(doc);
      expect(d.hasTermsOfService()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = {};
      const d = new Info(doc);
      expect(d.hasTermsOfService()).toEqual(false);
    });
  });

  describe('.termsOfService()', function() {
    it('should return the value', function() {
      const doc = { termsOfService: "These are the terms of service" };
      const d = new Info(doc);
      expect(d.termsOfService()).toEqual(doc.termsOfService);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = {};
      const d = new Info(doc);
      expect(d.termsOfService()).toBeUndefined();
    });
  });
  
  describe('.hasContact()', function() {
    it('should return true when there is a value', function() {
      const doc = { contact: { name: "LeChuck" } };
      const d = new Info(doc);
      expect(d.hasContact()).toEqual(true);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = {};
      const d = new Info(doc);
      expect(d.hasContact()).toEqual(false);
    });
  });

  describe('.contact()', function() {
    it('should return a Contact object', function() {
      const doc = { contact: { name: "LeChuck" } };
      const d = new Info(doc);
      expect(d.contact()).toBeInstanceOf(Contact);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = {};
      const d = new Info(doc);
      expect(d.contact()).toBeUndefined();
    });
  });

  describe('.hasLicense()', function() {
    it('should return true when there is a value', function() {
      const doc = { license: { name: "Apache 2.0" } };
      const d = new Info(doc);
      expect(d.hasLicense()).toEqual(true);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = {};
      const d = new Info(doc);
      expect(d.hasLicense()).toEqual(false);
    });
  });

  describe('.license()', function() {
    it('should return a License object', function() {
      const doc = { license: { name: "Apache 2.0" } };
      const d = new Info(doc);
      expect(d.license()).toBeInstanceOf(License);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = {};
      const d = new Info(doc);
      expect(d.license()).toBeUndefined();
    });
  });

  describe('mixins inheritance', function() {
    assertDescriptionMixinInheritance(Info);
    assertExtensionsMixinInheritance(Info);
    assertExternalDocumentationMixinInheritance(Info);
    assertTagsMixinInheritance(Info);
  });
});
