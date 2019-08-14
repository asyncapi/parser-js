const { addExtensions } = require('../utils');
const Base = require('./base');

/**
 * @class
 * @extends Base
 * @returns {License}
 */
class License extends Base {
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
}

module.exports = addExtensions(License);
