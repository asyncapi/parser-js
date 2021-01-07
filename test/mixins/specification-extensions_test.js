const { expect } = require('chai');
const { mix } = require('../../lib/utils');

const Base = require('../../lib/models/base');
const MixinSpecificationExtensions = require('../../lib/mixins/specification-extensions');

const Model = mix(class extends Base {}, MixinSpecificationExtensions);

const doc1 = { 'x-test': 'testing', test: 'testing' };
const doc2 = { test: 'testing' };
const doc3 = {};
const d1 = new Model(doc1);
const d2 = new Model(doc2);
const d3 = new Model(doc3);

describe('MixinSpecificationExtensions', function() {
  describe('#hasExtensions()', function() {
    it('should return a boolean indicating if the object has extensions', function() {
      expect(d1.hasExtensions()).to.be.equal(true);
      expect(d2.hasExtensions()).to.be.equal(false);
      expect(d3.hasExtensions()).to.be.equal(false);
    });
  });

  describe('#extensions()', function() {
    it('should return a object with extensions', function() {
      expect(d1.extensions()).to.deep.equal({ 'x-test': 'testing'});
    });
    it('should return a empty object', function() {
      expect(d2.extensions()).to.deep.equal({});
      expect(d3.extensions()).to.deep.equal({});
    });
  });

  describe('#extensionKeys()', function() {
    it('should return an array of extension keys', function() {
      expect(d1.extensionKeys()).to.deep.equal(['x-test']);
    });
    it('should return an empty array', function() {
      expect(d2.extensionKeys()).to.deep.equal([]);
      expect(d3.extensionKeys()).to.deep.equal([]);
    });
  });

  describe('#extKeys()', function() {
    it('should return an array of extension keys', function() {
      expect(d1.extKeys()).to.deep.equal(['x-test']);
    });
    it('should return a null', function() {
      expect(d2.extKeys()).to.deep.equal([]);
      expect(d3.extKeys()).to.deep.equal([]);
    });
  });

  describe('#hasExtension()', function() {
    it('should return a boolean indicating if the object has appropriate extension by key', function() {
      expect(d1.hasExtension('x-test')).to.be.equal(true);
      expect(d1.hasExtension('x-test2')).to.be.equal(false);
      expect(d2.hasExtension('x-test')).to.be.equal(false);
      expect(d3.hasExtension('x-test')).to.be.equal(false);
    });
    it('should return false key is not prefixed by `x-`', function() {
      expect(d1.hasExtension('test')).to.be.equal(false);
    });
  });

  describe('#extension()', function() {
    it('should return a value', function() {
      expect(d1.extension('x-test')).to.be.equal('testing');
    });
    it('should return an undefined', function() {
      expect(d1.extension('x-test2')).to.be.equal(undefined);
      expect(d2.extension('x-test')).to.be.equal(undefined);
      expect(d3.extension('x-test')).to.be.equal(undefined);
    });
    it('should return null if key is not prefixed by `x-`', function() {
      expect(d1.extension('test')).to.be.equal(null);
    });
  });

  describe('#hasExt()', function() {
    it('should return a boolean indicating if the object has appropriate extension by key', function() {
      expect(d1.hasExt('x-test')).to.be.equal(true);
      expect(d1.hasExt('x-test2')).to.be.equal(false);
      expect(d2.hasExt('x-test')).to.be.equal(false);
      expect(d3.hasExt('x-test')).to.be.equal(false);
    });
    it('should return false key is not prefixed by `x-`', function() {
      expect(d1.hasExt('test')).to.be.equal(false);
    });
  });

  describe('#ext()', function() {
    it('should return a value', function() {
      expect(d1.ext('x-test')).to.be.equal('testing');
    });
    it('should return an undefined', function() {
      expect(d1.ext('x-test2')).to.be.equal(undefined);
      expect(d2.ext('x-test')).to.be.equal(undefined);
      expect(d3.ext('x-test')).to.be.equal(undefined);
    });
    it('should return null if key is not prefixed by `x-`', function() {
      expect(d1.ext('test')).to.be.equal(null);
    });
  });
});

/**
 * @param {any} model Model.
 */
function assertMixinSpecificationExtensionsInheritance(model) {
  describe('MixinSpecificationExtensionsInheritance', function() {
    it(`check if ${model.name} model has inherited methods from MixinSpecificationExtensions`, function() {
      expect(model.prototype.hasExtensions).not.to.be.equal(undefined);
      expect(model.prototype.hasExtensions === MixinSpecificationExtensions.hasExtensions).to.be.equal(true);

      expect(model.prototype.extensions).not.to.be.equal(undefined);
      expect(model.prototype.extensions === MixinSpecificationExtensions.extensions).to.be.equal(true);

      expect(model.prototype.extensionKeys).not.to.be.equal(undefined);
      expect(model.prototype.extensionKeys === MixinSpecificationExtensions.extensionKeys).to.be.equal(true);

      expect(model.prototype.extKeys).not.to.be.equal(undefined);
      expect(model.prototype.extKeys === MixinSpecificationExtensions.extKeys).to.be.equal(true);

      expect(model.prototype.extension).not.to.be.equal(undefined);
      expect(model.prototype.extension === MixinSpecificationExtensions.extension).to.be.equal(true);

      expect(model.prototype.hasExtension).not.to.be.equal(undefined);
      expect(model.prototype.hasExtension === MixinSpecificationExtensions.hasExtension).to.be.equal(true);

      expect(model.prototype.extension).not.to.be.equal(undefined);
      expect(model.prototype.extension === MixinSpecificationExtensions.extension).to.be.equal(true);

      expect(model.prototype.hasExt).not.to.be.equal(undefined);
      expect(model.prototype.hasExt === MixinSpecificationExtensions.hasExt).to.be.equal(true);

      expect(model.prototype.ext).not.to.be.equal(undefined);
      expect(model.prototype.ext === MixinSpecificationExtensions.ext).to.be.equal(true);
    });
  });
}

module.exports = {
  assertMixinSpecificationExtensionsInheritance,
};
