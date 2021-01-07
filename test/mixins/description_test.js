const { expect } = require('chai');
const { mix } = require('../../lib/utils');

const Base = require('../../lib/models/base');
const MixinDescription = require('../../lib/mixins/description');

const Model = mix(class extends Base {}, MixinDescription);

const doc1 = { description: 'Testing' };
const doc2 = { description: '' };
const doc3 = {};
const d1 = new Model(doc1);
const d2 = new Model(doc2);
const d3 = new Model(doc3);

describe('MixinDescription', function() {
  describe('#hasDescription()', function() {
    it('should return a boolean indicating if the object has description', function() {
      expect(d1.hasDescription()).to.be.equal(true);  
      expect(d2.hasDescription()).to.be.equal(false);  
      expect(d3.hasDescription()).to.be.equal(false);  
    });
  });

  describe('#description()', function() {
    it('should return a value', function() {
      expect(d1.description()).to.be.equal(doc1.description);  
      expect(d2.description()).to.be.equal(''); 
    });
    it('should return a null', function() {
      expect(d3.description()).to.be.equal(null);  
    });
  });
});

/**
 * @param {any} model Model.
 */
function assertMixinDescriptionInheritance(model) {
  describe('MixinDescriptionInheritance', function() {
    it(`check if ${model.name} model has inherited methods from MixinDescription`, function() {
      expect(model.prototype.hasDescription).not.to.be.equal(undefined);
      expect(model.prototype.hasDescription === MixinDescription.hasDescription).to.be.equal(true);

      expect(model.prototype.description).not.to.be.equal(undefined);
      expect(model.prototype.description === MixinDescription.description).to.be.equal(true);
    });
  });
}

module.exports = {
  assertMixinDescriptionInheritance,
};
