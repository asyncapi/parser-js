const { expect } = require('chai');
const js = { name: 'test', description: 'Testing', externalDocs: { url: 'somewhere' }, 'x-test': 'testing' };

const Tag = require('../../lib/models/tag');

const { assertMixinDescriptionInheritance } = require('../mixins/description_test');
const { assertMixinExternalDocsInheritance } = require('../mixins/external-docs_test');
const { assertMixinSpecificationExtensionsInheritance } = require('../mixins/specification-extensions_test');

describe('Tag', function() {
  describe('#name()', function() {
    it('should return a string', function() {
      const d = new Tag(js);
      expect(d.name()).to.be.equal(js.name);
    });
  });

  describe('#mixins', function() {
    it('model should inherit from mixins', function() {
      assertMixinDescriptionInheritance(Tag);
      assertMixinExternalDocsInheritance(Tag);
      assertMixinSpecificationExtensionsInheritance(Tag);
    });
  });
});
