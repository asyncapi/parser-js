const { mix } = require('./utils');

const Base = require('./base');
const License = require('./license');
const Contact = require('./contact');

const MixinDescription = require('../mixins/description');
const MixinSpecificationExtensions = require('../mixins/specification-extensions');

/**
 * Implements functions to deal with the Info object.
 * @class
 * @alias module:@asyncapi/parser#Info
 * @extends Base
 * @mixes MixinDescription
 * @mixes MixinSpecificationExtensions
 * @returns {Info}
 */
class Info extends Base {
  /**
   * @returns {string}
   */
  title() {
    return this._json.title;
  }
  
  /**
   * @returns {string}
   */
  version() {
    return this._json.version;
  }

  /**
   * @returns {(string | undefined)}
   */
  termsOfService() {
    return this._json.termsOfService;
  }

  /**
   * @returns {License}
   */
  license() {
    if (!this._json.license) return null;
    return new License(this._json.license);
  }

  /**
   * @returns {Contact}
   */
  contact() {
    if (!this._json.contact) return null;
    return new Contact(this._json.contact);
  }
}

module.exports = mix(Info, MixinDescription, MixinSpecificationExtensions);
