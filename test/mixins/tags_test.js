const { expect } = require('chai');
const { mix } = require('../../lib/utils');

const Base = require('../../lib/models/base');
const Tag = require('../../lib/models/tag');
const MixinTags = require('../../lib/mixins/tags');

const Model = mix(class extends Base {}, MixinTags);

const doc1 = { tags: [{ name: 'test1' }, { name: 'test2' }] };
const doc2 = { tags: [] };
const doc3 = {};
const d1 = new Model(doc1);
const d2 = new Model(doc2);
const d3 = new Model(doc3);

describe('MixinTags', function() {
  describe('#hasTags()', function() {
    it('should return a boolean indicating if the object has tags', function() {
      expect(d1.hasTags()).to.be.equal(true);
      expect(d2.hasTags()).to.be.equal(false);
      expect(d3.hasTags()).to.be.equal(false);
    });
  });

  describe('#tags()', function() {
    it('should return an array of tag objects', function() {
      expect(Array.isArray(d1.tags())).to.be.equal(true);
      d1.tags().forEach((tag, i) => {
        expect(tag instanceof Tag).to.be.equal(true);
        expect(tag.json()).to.deep.equal(doc1.tags[i]);
      });
    });
    it('should return an empty array', function() {
      expect(d2.tags()).to.deep.equal([]);  
      expect(d3.tags()).to.deep.equal([]);  
    });
  });

  describe('#tagNames()', function() {
    it('should return an array of tag names', function() {
      expect(d1.tagNames()).to.deep.equal(['test1', 'test2']);
    });
    it('should return an empty array', function() {
      expect(d2.tagNames()).to.deep.equal([]);  
      expect(d3.tagNames()).to.deep.equal([]);  
    });
  });

  describe('#hasTag()', function() {
    it('should return a boolean indicating if the tags object has appropriate tag by name', function() {
      expect(d1.hasTag('test1')).to.be.equal(true);
      expect(d1.hasTag('test2')).to.be.equal(true);
      expect(d1.hasTag('test3')).to.be.equal(false);
      expect(d2.hasTag('test1')).to.be.equal(false);
      expect(d3.hasTag('test1')).to.be.equal(false);
    });
  });

  describe('#tag()', function() {
    it('should return a tag object', function() {
      expect(d1.tag('test1')).not.to.be.equal(null);
      expect(d1.tag('test1') instanceof Tag).to.be.equal(true);
      expect(d1.tag('test2')).not.to.be.equal(null);
      expect(d1.tag('test2') instanceof Tag).to.be.equal(true);
    });
    it('should return a null', function() {
      expect(d1.tag('test3')).to.be.equal(null);
      expect(d1.tag('test3') instanceof Tag).not.to.be.equal(true);
      expect(d2.tag('test1')).to.be.equal(null);
      expect(d2.tag('test1') instanceof Tag).not.to.be.equal(true);
      expect(d3.tag('test1')).to.be.equal(null);
      expect(d3.tag('test1') instanceof Tag).not.to.be.equal(true);
    });
  });
});

/**
 * @param {any} model Model.
 */
function assertMixinTagsInheritance(model) {
  describe('MixinTagsInheritance', function() {
    it(`check if ${model.name} model has inherited methods from MixinTags`, function() {
      expect(model.prototype.hasTags).not.to.be.equal(undefined);
      expect(model.prototype.hasTags === MixinTags.hasTags).to.be.equal(true);

      expect(model.prototype.tags).not.to.be.equal(undefined);
      expect(model.prototype.tags === MixinTags.tags).to.be.equal(true);

      expect(model.prototype.tagNames).not.to.be.equal(undefined);
      expect(model.prototype.tagNames === MixinTags.tagNames).to.be.equal(true);

      expect(model.prototype.hasTag).not.to.be.equal(undefined);
      expect(model.prototype.hasTag === MixinTags.hasTag).to.be.equal(true);

      expect(model.prototype.tag).not.to.be.equal(undefined);
      expect(model.prototype.tag === MixinTags.tag).to.be.equal(true);
    });
  });
}

module.exports = {
  assertMixinTagsInheritance,
};
