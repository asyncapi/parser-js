const { expect } = require('chai');
const js = { title: 'Test', version: '1.2.3', license: { name: 'Apache 2.0', url: 'https://www.apache.org/licenses/LICENSE-2.0' }, contact: { name: 'Fran', url: 'https://www.asyncapi.com', email: 'fmvilas@gmail.com' }, 'x-test': 'testing' };

const Info = require('../../../lib/version2/models/info');

const { assertMixinDescriptionInheritance } = require('./mixins/description_test');
const { assertMixinSpecificationExtensionsInheritance } = require('./mixins/specification-extensions_test');

describe('Info', function() {
  describe('#title()', function() {
    it('should return a string', function() {
      const d = new Info(js);
      expect(d.title()).to.be.equal(js.title);
    });
  });
  
  describe('#version()', function() {
    it('should return a string', function() {
      const d = new Info(js);
      expect(d.version()).to.be.equal(js.version);
    });
  });
  
  describe('#termsOfService()', function() {
    it('should return a string', function() {
      const d = new Info(js);
      expect(d.termsOfService()).to.be.equal(js.termsOfService);
    });
  });
  
  describe('#license()', function() {
    it('should return a license object', function() {
      const d = new Info(js);
      expect(d.license().constructor.name).to.be.equal('License');
      expect(d.license().json()).to.be.equal(js.license);
    });
    
    it('should return null if a license object is not given', function() {
      const d = new Info({});
      expect(d.license()).to.be.equal(null);
    });
  });
  
  describe('#contact()', function() {
    it('should return a license object', function() {
      const d = new Info(js);
      expect(d.contact().constructor.name).to.be.equal('Contact');
      expect(d.contact().json()).to.be.equal(js.contact);
    });

    it('should return null if a contact object is not given', function() {
      const d = new Info({});
      expect(d.contact()).to.be.equal(null);
    });
  });

  describe('#mixins', function() {
    it('model should inherit from mixins', function() {
      assertMixinDescriptionInheritance(Info);
      assertMixinSpecificationExtensionsInheritance(Info);
    });
  });
});
