const { getMapValueByKey } = require('../utils');

/**
 * Implements functions to deal with the common Bindings object.
 * 
 * @mixin
 */
const MixinBindings = {
  /**
   * @returns {boolean} true if contains bindings, otherwise false
   */
  hasBindings() {
    return !!(this._json.bindings && Object.keys(this._json.bindings).length);
  },

  /**
   * @returns {object} The object bidings.
   */
  bindings() {
    return this.hasBindings() ? this._json.bindings : {};
  },

  /**
   * @returns {string[]} An array of protocols
   */
  bindingProtocols() {
    return Object.keys(this.bindings());
  },

  /**
   * @param {string} name - Name of the binding.
   * @returns {boolean} true if contains the binding name, otherwise false
   */
  hasBinding(name) {
    return this.hasBindings() && !!this._json.bindings[String(name)];
  },

  /**
   * @param {string} name - Name of the binding.
   * @returns {(object | null)} The bindings object if it exists, otherwise null
   */
  binding(name) {
    return getMapValueByKey(this._json.bindings, name);
  },
};

module.exports = MixinBindings;
