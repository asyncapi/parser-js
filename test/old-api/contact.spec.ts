import { Contact } from '../../src/old-api/contact';
import { assertExtensionsMixin } from './mixins';

describe('Contact', function() {
  const json = { name: 'Fran', url: 'https://www.asyncapi.com', email: 'fmvilas@gmail.com', 'x-test': 'testing' };

  describe('name()', function() {
    it('should return a string', function() {
      const d = new Contact(json);
      expect(d.name()).toEqual(json.name);
    });
  });
  
  describe('url()', function() {
    it('should return a string', function() {
      const d = new Contact(json);
      expect(d.url()).toEqual(json.url);
    });
  });
  
  describe('email()', function() {
    it('should return a string', function() {
      const d = new Contact(json);
      expect(d.email()).toEqual(json.email);
    });
  });

  assertExtensionsMixin(Contact);
});