const { addExtensions } = require('../utils');
const Base = require('./base');

/**
 * @class
 * @extends Base
 * @returns {ExternalDocs}
 */
class ExternalDocs extends Base {
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
}

module.exports = addExtensions(ExternalDocs);
