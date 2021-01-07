const { expect } = require('chai');
const { mix } = require('../../lib/utils');

const Base = require('../../lib/models/base');
const MixinBindings = require('../../lib/mixins/bindings');

const Model = mix(class extends Base {}, MixinBindings);

const doc1 = { bindings: { amqp: { test: 'test1' } } };
const doc2 = { bindings: {} };
const doc3 = {};
const d1 = new Model(doc1);
const d2 = new Model(doc2);
const d3 = new Model(doc3);

describe('MixinBindings', function() {
  describe('#hasBindings()', function() {
    it('should return a boolean indicating if the object has bindings', function() {
      expect(d1.hasBindings()).to.be.equal(true);
      expect(d2.hasBindings()).to.be.equal(false);
      expect(d3.hasBindings()).to.be.equal(false);
    });
  });

  describe('#bindings()', function() {
    it('should return a map of bindings', function() {
      expect(d1.bindings()).to.deep.equal(doc1.bindings);
    });
    it('should return an empty object', function() {
      expect(d2.bindings()).to.deep.equal({});
      expect(d3.bindings()).to.deep.equal({});
    });
  });

  describe('#bindingProtocols()', function() {
    it('should return an array of protocol names', function() {
      expect(d1.bindingProtocols()).to.deep.equal(['amqp']);
    });
    it('should return an empty array', function() {
      expect(d2.bindingProtocols()).to.deep.equal([]);
      expect(d3.bindingProtocols()).to.deep.equal([]);
    });
  });

  describe('#hasBinding()', function() {
    it('should return a boolean indicating if the bindings object has appropriate binding by name', function() {
      expect(d1.hasBinding('amqp')).to.be.equal(true);
      expect(d1.hasBinding('http')).to.be.equal(false);
      expect(d2.hasBinding('amqp')).to.be.equal(false);
      expect(d3.hasBinding('amqp')).to.be.equal(false);
    });
  });

  describe('#binding()', function() {
    it('should return a binding object', function() {
      expect(d1.binding('amqp')).to.deep.equal(doc1.bindings.amqp);
    });
    it('should return a null', function() {
      expect(d1.binding('http')).to.be.equal(null);
      expect(d2.binding('amqp')).to.be.equal(null);
      expect(d3.binding('amqp')).to.be.equal(null);
    });
  });
});

/**
 * @param {any} model Model.
 */
function assertMixinBindingsInheritance(model) {
  describe('MixinBindingsInheritance', function() {
    it(`check if ${model.name} model has inherited methods from MixinBindings`, function() {
      expect(model.prototype.hasBindings).not.to.be.equal(undefined);
      expect(model.prototype.hasBindings === MixinBindings.hasBindings).to.be.equal(true);

      expect(model.prototype.bindings).not.to.be.equal(undefined);
      expect(model.prototype.bindings === MixinBindings.bindings).to.be.equal(true);

      expect(model.prototype.bindingProtocols).not.to.be.equal(undefined);
      expect(model.prototype.bindingProtocols === MixinBindings.bindingProtocols).to.be.equal(true);

      expect(model.prototype.hasBinding).not.to.be.equal(undefined);
      expect(model.prototype.hasBinding === MixinBindings.hasBinding).to.be.equal(true);

      expect(model.prototype.binding).not.to.be.equal(undefined);
      expect(model.prototype.binding === MixinBindings.binding).to.be.equal(true);
    });
  });
}

module.exports = {
  assertMixinBindingsInheritance,
};
