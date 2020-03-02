const { createMapOfType, getMapKeyOfType, addExtensions } = require('../utils');
const Base = require('./base');
const ServerVariable = require('./server-variable');
const ServerSecurityRequirement = require('./server-security-requirement');

/**
 * Implements functions to deal with a Server object.
 * @class
 * @extends Base
 * @returns {Server}
 */
class Server extends Base {
  /**
   * @returns {string}
   */
  description() {
    return this._json.description;
  }

  /**
   * @returns {string}
   */
  url() {
    return this._json.url;
  }

  /**
   * @returns {string}
   */
  protocol() {
    return this._json.protocol;
  }

  /**
   * @returns {string}
   */
  protocolVersion() {
    return this._json.protocolVersion;
  }

  /**
   * @returns {Object<string, ServerVariable>}
   */
  variables() {
    return createMapOfType(this._json.variables, ServerVariable);
  }

  /**
   * @param {string} name - Name of the server variable.
   * @returns {ServerVariable}
   */
  variable(name) {
    return getMapKeyOfType(this._json.variables, name, ServerVariable);
  }

  /**
   * @returns {boolean}
   */
  hasVariables() {
    return !!this._json.variables;
  }

  /**
   * @returns {ServerSecurityRequirement[]}
   */
  security() {
    if (!this._json.security) return null;
    return this._json.security.map(sec => new ServerSecurityRequirement(sec));
  }

  /**
   * @returns {Object}
   */
  bindings() {
    return this._json.bindings || null;
  }

  /**
   * @param {string} name - Name of the binding.
   * @returns {Object}
   */
  binding(name) {
    return this._json.bindings ? this._json.bindings[name] : null;
  }
}

module.exports = addExtensions(Server);
