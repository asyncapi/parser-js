const { addExtensions } = require('../utils');
const Base = require('./base');
const License = require('./license');
const Contact = require('./contact');

/**
 * @class Info
 * @extends Base
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
   * @returns {License}
   */
  license() {
    return new License(this._json.license);
  }

  /**
   * @returns {Contact}
   */
  contact() {
    return new Contact(this._json.contact);
  }
}

module.exports = addExtensions(Info);
