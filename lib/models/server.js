const { createMapOfType, getMapValueOfType, mix } = require('./utils');

const Base = require('./base');
const ServerVariable = require('./server-variable');
const ServerSecurityRequirement = require('./server-security-requirement');

const MixinDescription = require('../mixins/description');
const MixinBindings = require('../mixins/bindings');
const MixinSpecificationExtensions = require('../mixins/specification-extensions');
const MixinTags = require('../mixins/tags');

/**
 * Implements functions to deal with a Server object.
 * @class
 * @alias module:@asyncapi/parser#Server
 * @extends Base
 * @mixes MixinDescription
 * @mixes MixinBindings
 * @mixes MixinSpecificationExtensions
 * @mixes MixinTags
 * @returns {Server}
 */
class Server extends Base {
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
    return getMapValueOfType(this._json.variables, name, ServerVariable);
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
}

module.exports = mix(Server, MixinDescription, MixinBindings, MixinSpecificationExtensions, MixinTags);
