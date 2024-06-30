import { Info } from '../../src/old-api/info';
import { Contact } from '../../src/old-api/contact';
import { License } from '../../src/old-api/license';
import { assertDescriptionMixin, assertExtensionsMixin } from './mixins';

describe('Info', function() {
  const json = { title: 'Test', version: '1.2.3', termsOfService: '...', license: { name: 'Apache 2.0', url: 'https://www.apache.org/licenses/LICENSE-2.0' }, contact: { name: 'Fran', url: 'https://www.asyncapi.com', email: 'fmvilas@gmail.com' }, 'x-test': 'testing' };

  describe('title()', function() {
    it('should return a string', function() {
      const d = new Info(json);
      expect(d.title()).toEqual(json.title);
    });
  });
  
  describe('version()', function() {
    it('should return a string', function() {
      const d = new Info(json);
      expect(d.version()).toEqual(json.version);
    });
  });
  
  describe('termsOfService()', function() {
    it('should return a string', function() {
      const d = new Info(json);
      expect(d.termsOfService()).toEqual(json.termsOfService);
    });
  });
  
  describe('license()', function() {
    it('should return a license object', function() {
      const d = new Info(json);
      expect(d.license()).toBeInstanceOf(License);
      expect(d.license()?.json()).toEqual(json.license);
    });
    
    it('should return null if a license object is not given', function() {
      const d = new Info({ ...json, license: undefined });
      expect(d.license()).toEqual(null);
    });
  });
  
  describe('contact()', function() {
    it('should return a license object', function() {
      const d = new Info(json);
      expect(d.contact()).toBeInstanceOf(Contact);
      expect(d.contact()?.json()).toEqual(json.contact);
    });

    it('should return null if a contact object is not given', function() {
      const d = new Info({ ...json, contact: undefined });
      expect(d.contact()).toEqual(null);
    });
  });

  assertDescriptionMixin(Info);
  assertExtensionsMixin(Info);
});