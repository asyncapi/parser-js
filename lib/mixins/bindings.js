const { getMapValueByKey } = require('../models/utils');

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
   * @returns {object} bindings object
   */
  bindings() {
    return this.hasBindings() ? this._json.bindings : {};
  },

  /**
   * @returns {string[]} an array of protocols
   */
  bindingProtocols() {
    return Object.keys(this.bindings());
  },

  /**
   * @param {string} name - Name of the binding.
   * @returns {boolean} true if contains binding name, otherwise false
   */
  hasBinding(name) {
    return this.hasBindings() && !!this._json.bindings[String(name)];
  },

  /**
   * @param {string} name - Name of the binding.
   * @returns {(object | null)} bindings object if exists, otherwise null
   */
  binding(name) {
    return getMapValueByKey(this._json.bindings, name);
  },
};

module.exports = MixinBindings;
