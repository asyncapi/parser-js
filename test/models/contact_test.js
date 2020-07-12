const { expect } = require('chai');
const js = { name: 'Fran', url: 'https://www.asyncapi.com', email: 'fmvilas@gmail.com', 'x-test': 'testing' };

const Contact = require('../../lib/models/contact');

const { assertMixinSpecificationExtensionsInheritance } = require('../mixins/specification-extensions_test');

describe('Contact', function() {
  describe('#name()', function() {
    it('should return a string', function() {
      const d = new Contact(js);
      expect(d.name()).to.be.equal(js.name);
    });
  });
  
  describe('#url()', function() {
    it('should return a string', function() {
      const d = new Contact(js);
      expect(d.url()).to.be.equal(js.url);
    });
  });
  
  describe('#email()', function() {
    it('should return a string', function() {
      const d = new Contact(js);
      expect(d.email()).to.be.equal(js.email);
    });
  });

  describe('#mixins', function() {
    it('model should inherit from mixins', function() {
      assertMixinSpecificationExtensionsInheritance(Contact);
    });
  });
});
