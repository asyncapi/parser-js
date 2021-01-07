const { expect } = require('chai');
const { mix } = require('../../lib/utils');

const Base = require('../../lib/models/base');
const ExternalDocs = require('../../lib/models/external-docs');
const MixinExternalDocs = require('../../lib/mixins/external-docs');

const Model = mix(class extends Base {}, MixinExternalDocs);

const doc1 = { externalDocs: { url: 'test.com' } };
const doc2 = { externalDocs: {} };
const doc3 = {};
const d1 = new Model(doc1);
const d2 = new Model(doc2);
const d3 = new Model(doc3);

describe('MixinExternalDocs', function() {
  describe('#hasExternalDocs()', function() {
    it('should return a boolean indicating if the object has externalDocs', function() {
      expect(d1.hasExternalDocs()).to.be.equal(true);  
      expect(d2.hasExternalDocs()).to.be.equal(false);  
      expect(d3.hasExternalDocs()).to.be.equal(false);  
    });
  });

  describe('#externalDocs()', function() {
    it('should return a externalDocs object', function() {
      expect(d1.externalDocs() instanceof ExternalDocs).to.be.equal(true);
      expect(d1.externalDocs().json()).to.deep.equal(doc1.externalDocs);

      expect(d2.externalDocs() instanceof ExternalDocs).to.be.equal(true);
      expect(d2.externalDocs().json()).to.deep.equal(doc2.externalDocs);
    });
    it('should return a null', function() {
      expect(d3.externalDocs()).to.be.equal(null);  
    });
  });
});

/**
 * @param {any} model Model.
 */
function assertMixinExternalDocsInheritance(model) {
  describe('MixinExternalDocsInheritance', function() {
    it(`check if ${model.name} model has inherited methods from MixinExternalDocs`, function() {
      expect(model.prototype.hasExternalDocs).not.to.be.equal(undefined);
      expect(model.prototype.hasExternalDocs === MixinExternalDocs.hasExternalDocs).to.be.equal(true);

      expect(model.prototype.externalDocs).not.to.be.equal(undefined);
      expect(model.prototype.externalDocs === MixinExternalDocs.externalDocs).to.be.equal(true);
    });
  });
}

module.exports = {
  assertMixinExternalDocsInheritance,
};
