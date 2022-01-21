const { expect } = require('chai');
const js = { url: 'somewhere' };

const ExternalDocs = require('../../../lib/version2/models/external-docs');

const { assertMixinDescriptionInheritance } = require('./mixins/description_test');
const { assertMixinSpecificationExtensionsInheritance } = require('./mixins/specification-extensions_test');

describe('ExternalDocs', function() {  
  describe('#url()', function() {
    it('should return a string', function() {
      const d = new ExternalDocs(js);
      expect(d.url()).to.be.equal(js.url);
    });
  });

  describe('#mixins', function() {
    it('model should inherit from mixins', function() {
      assertMixinDescriptionInheritance(ExternalDocs);
      assertMixinSpecificationExtensionsInheritance(ExternalDocs);
    });
  });
});
