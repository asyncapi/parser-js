const { expect } = require('chai');
const js = { name: 'Apache 2.0', url: 'https://www.apache.org/licenses/LICENSE-2.0', 'x-test': 'testing' };

const License = require('../../../lib/version2/models/license');

const { assertMixinSpecificationExtensionsInheritance } = require('./mixins/specification-extensions_test');

describe('License', function() {
  describe('#name()', function() {
    it('should return a string', function() {
      const d = new License(js);
      expect(d.name()).to.be.equal(js.name);
    });
  });
  
  describe('#url()', function() {
    it('should return a string', function() {
      const d = new License(js);
      expect(d.url()).to.be.equal(js.url);
    });
  });

  describe('#mixins', function() {
    it('model should inherit from mixins', function() {
      assertMixinSpecificationExtensionsInheritance(License);
    });
  });
});
