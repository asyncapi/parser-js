import { Contact } from '../../../src/models/v2/contact';

describe('Contact model', function() {
  describe('.name()', function() {
    it('should return the value', function() {
      const doc = { name: "LeChuck" };
      const d = new Contact(doc);
      expect(d.name()).toEqual(doc.name);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = { };
      const d = new Contact(doc);
      expect(d.name()).toBeUndefined();
    });
  });

  describe('.url()', function() {
    it('should return the value', function() {
      const doc = { url: "https://example.com" };
      const d = new Contact(doc);
      expect(d.url()).toEqual(doc.url);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = { };
      const d = new Contact(doc);
      expect(d.url()).toBeUndefined();
    });
  });

  describe('.email()', function() {
    it('should return the value', function() {
      const doc = { email: "lechuck@example.com" };
      const d = new Contact(doc);
      expect(d.email()).toEqual(doc.email);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = { };
      const d = new Contact(doc);
      expect(d.email()).toBeUndefined();
    });
  });
});
