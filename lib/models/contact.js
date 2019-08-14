const { addExtensions } = require('../utils');
const Base = require('./base');

/**
 * @class
 * @extends Base
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

module.exports = addExtensions(Contact);
