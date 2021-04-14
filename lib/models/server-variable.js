const { mix } = require('./utils');

const Base = require('./base');

const MixinDescription = require('../mixins/description');
const MixinSpecificationExtensions = require('../mixins/specification-extensions');

/**
 * Implements functions to deal with a ServerVariable object.
 * @class
 * @alias module:@asyncapi/parser#ServerVariable
 * @extends Base
 * @mixes MixinDescription
 * @mixes MixinSpecificationExtensions
 * @returns {ServerVariable}
 */
class ServerVariable extends Base {
  /**
   * @returns {any[]}
   */
  allowedValues() {
    return this._json.enum;
  }

  /**
   * @param {string} name - Name of the variable.
   * @returns {boolean}
   */
  allows(name) {
    if (this._json.enum === undefined) return true;
    return this._json.enum.includes(name);
  }

  /**
   * @returns {boolean}
   */
  hasAllowedValues() {
    return this._json.enum !== undefined;
  }

  /**
   * @returns {string}
   */
  defaultValue() {
    return this._json.default;
  }

  /**
   * @returns {boolean}
   */
  hasDefaultValue() {
    return this._json.default !== undefined;
  }

  /**
   * @returns {string[]}
   */
  examples() {
    return this._json.examples;
  }
}

module.exports = mix(ServerVariable, MixinDescription, MixinSpecificationExtensions);
