import { Contact } from '../../src/models/contact';
import { Info } from '../../src/models/info';
import { License } from '../../src/models/license';

describe('Info model', function() {
  describe('.title()', function() {
    it('should return the value', function() {
      const doc = { title: "Example API" };
      const d = new Info(doc);
      expect(d.title()).toEqual(doc.title);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = { };
      const d = new Info(doc);
      expect(d.title()).toBeUndefined();
    });
  });

  describe('.version()', function() {
    it('should return the value', function() {
      const doc = { version: "1.0.0" };
      const d = new Info(doc);
      expect(d.version()).toEqual(doc.version);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = { };
      const d = new Info(doc);
      expect(d.version()).toBeUndefined();
    });
  });

  describe('.description()', function() {
    it('should return the value', function() {
      const doc = { description: "This is the API of Example" };
      const d = new Info(doc);
      expect(d.description()).toEqual(doc.description);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = { };
      const d = new Info(doc);
      expect(d.description()).toBeUndefined();
    });
  });

  describe('.termsOfService()', function() {
    it('should return the value', function() {
      const doc = { termsOfService: "These are the terms of service" };
      const d = new Info(doc);
      expect(d.termsOfService()).toEqual(doc.termsOfService);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = { };
      const d = new Info(doc);
      expect(d.termsOfService()).toBeUndefined();
    });
  });

  describe('.contact()', function() {
    it('should return a Contact object', function() {
      const doc = { contact: { name: "LeChuck" } };
      const d = new Info(doc);
      expect(d.contact() instanceof Contact).toBeTruthy();
    });
    
    it('should return undefined when there is no value', function() {
      const doc = { };
      const d = new Info(doc);
      expect(d.contact()).toBeUndefined();
    });
  });

  describe('.license()', function() {
    it('should return a License object', function() {
      const doc = { license: { name: "Apache 2.0" } };
      const d = new Info(doc);
      expect(d.license() instanceof License).toBeTruthy();
    });
    
    it('should return undefined when there is no value', function() {
      const doc = { };
      const d = new Info(doc);
      expect(d.license()).toBeUndefined();
    });
  });
});
