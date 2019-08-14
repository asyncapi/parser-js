const { addExtensions } = require('../utils');
const Base = require('./base');

/**
 * Implements functions to deal with an ExternalDocs object.
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
