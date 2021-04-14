  
const { mix } = require('./utils');

const Base = require('./base');

const MixinSpecificationExtensions = require('../mixins/specification-extensions');

/**
 * Implements functions to deal with the Contact object.
 * @class
 * @alias module:@asyncapi/parser#Contact
 * @extends Base
 * @mixes MixinSpecificationExtensions
 * @returns {Contact}
 */
class Contact extends Base {
  /**
   * @returns {string}
   */
  name() {
    return this._json.name;
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
  email() {
    return this._json.email;
  }
}

module.exports = mix(Contact, MixinSpecificationExtensions);
