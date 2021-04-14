const { expect } = require('chai');

const utils = require('../../lib/models/utils');

describe('utils', function() {
  describe('mix()', function() {
    const Mixin = {
      utilFn() {
        // This is intentional
      },
    };

    it('should create mixed object', function() {
      const Model = utils.mix(class {}, Mixin);

      expect(Model.prototype.utilFn).not.to.be.equal(undefined);
      expect(Model.prototype.utilFn === Mixin.utilFn).to.be.equal(true);
    });
    
    it('should throw error if one of mixins is a model reference', function() {
      class Base {}

      let error = undefined;
      try {
        utils.mix(Base, Mixin, Base);
      } catch (e) {
        error = e;
      }

      expect(error).not.to.be.equal(undefined);
      expect(error.message).to.be.equal(`invalid mix function: cannot use the model ${Base.name} as a mixin`);
    });

    it('should throw error if model has method identically like in one of mixins', function() {
      class Base {
        utilFn() {
          // This is intentional
        }
      }

      let error = undefined;
      try {
        utils.mix(Base, Mixin);
      } catch (e) {
        error = e;
      }

      expect(error).not.to.be.equal(undefined);
      expect(error.message).to.be.equal(`invalid mix function: model ${Base.name} has at least one method that it is trying to replace by mixin`);
    });
  });
});
