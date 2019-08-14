const { addExtensions } = require('../utils');
const Base = require('./base');
const ExternalDocs = require('./external-docs');

/**
 * Implements functions to deal with a Tag object.
 * @class
 * @extends Base
 * @returns {Tag}
 */
class Tag extends Base {
  /**
   * @returns {string}
   */
  name() {
    return this._json.name;
  }
  
  /**
   * @returns {string}
   */
  description() {
    return this._json.description;
  }
  
  /**
   * @returns {ExternalDocs}
   */
  externalDocs() {
    if (!this._json.externalDocs) return null;
    return new ExternalDocs(this._json.externalDocs);
  }
}

module.exports = addExtensions(Tag);
