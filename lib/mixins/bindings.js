const { getMapValueByKey } = require('../models/utils');

/**
 * Implements functions to deal with the common Bindings object.
 * @mixin
 */
const MixinBindings = {
  /**
   * @returns {boolean}
   */
  hasBindings() {
    return !!(this._json.bindings && Object.keys(this._json.bindings).length);
  },

  /**
   * @returns {Object}
   */
  bindings() {
    return this.hasBindings() ? this._json.bindings : {};
  },

  /**
   * @returns {string[]}
   */
  bindingProtocols() {
    return Object.keys(this.bindings());
  },

  /**
   * @param {string} name - Name of the binding.
   * @returns {boolean}
   */
  hasBinding(name) {
    return this.hasBindings() && !!this._json.bindings[String(name)];
  },

  /**
   * @param {string} name - Name of the binding.
   * @returns {(Object | null)}
   */
  binding(name) {
    return getMapValueByKey(this._json.bindings, name);
  },
};

module.exports = MixinBindings;
