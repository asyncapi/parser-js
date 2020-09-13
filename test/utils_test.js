const { expect } = require('chai');

const utils = require('../lib/utils');

describe('utils', function() {
  describe('mix()', function() {
    const Mixin = {
      utilFn: function() {},
    };
    class Base {}
    const Model = utils.mix(Base, Mixin);

    it('should create mixed object', function() {
      expect(Model.prototype.utilFn).not.to.be.equal(undefined);
      expect(Model.prototype.utilFn === Mixin.utilFn).to.be.equal(true);
    });
    
    it('should throw error if one of mixes is model reference', function() {
      try {
        utils.mix(Base, Mixin, Base);
      } catch(e) {
        expect(e).not.to.be.equal(undefined);
        expect(e.message).to.be.equal(`invalid mix function: cannot use the model ${Base} as a mixin`);
      }
    });
  });
});
