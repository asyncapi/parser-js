const { createMapOfType, getMapValueOfType, mix } = require('../utils');

const Base = require('./base');
const ServerVariable = require('./server-variable');
const ServerSecurityRequirement = require('./server-security-requirement');

const MixinDescription = require('../mixins/description');
const MixinBindings = require('../mixins/bindings');
const MixinSpecificationExtensions = require('../mixins/specification-extensions');

/**
 * Implements functions to deal with a Server object.
 * 
 * @class
 * @alias module:@asyncapi/parser#Server
 * @augments Base
 * @mixes MixinDescription
 * @mixes MixinBindings
 * @mixes MixinSpecificationExtensions
 * @returns {Server}
 */
class Server extends Base {
  /**
   * @returns {string} url
   */
  url() {
    return this._json.url;
  }

  /**
   * @returns {string} protocol
   */
  protocol() {
    return this._json.protocol;
  }

  /**
   * @returns {string} protocolVersion
   */
  protocolVersion() {
    return this._json.protocolVersion;
  }

  /**
   * @returns {object<string, ServerVariable>} variables
   */
  variables() {
    return createMapOfType(this._json.variables, ServerVariable);
  }

  /**
   * @param {string} name - Name of the server variable.
   * @returns {ServerVariable} variable for the provided name
   */
  variable(name) {
    return getMapValueOfType(this._json.variables, name, ServerVariable);
  }

  /**
   * @returns {boolean} true if it has Variables, otherwise false
   */
  hasVariables() {
    return !!this._json.variables;
  }

  /**
   * @returns {ServerSecurityRequirement[]} security
   */
  security() {
    if (!this._json.security) return null;
    return this._json.security.map(sec => new ServerSecurityRequirement(sec));
  }
}

module.exports = mix(Server, MixinDescription, MixinBindings, MixinSpecificationExtensions);
