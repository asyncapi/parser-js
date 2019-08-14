const { addExtensions } = require('../utils');
const Base = require('./base');
const Schema = require('./schema');

/**
 * Implements functions to deal with a ChannelParameter object.
 * @class
 * @extends Base
 * @returns {ChannelParameter}
 */
class ChannelParameter extends Base {
  /**
   * @returns {string}
   */
  description() {
    return this._json.description;
  }
  
  /**
   * @returns {string}
   */
  location() {
    return this._json.location;
  }
  
  /**
   * @returns {Schema}
   */
  schema() {
    if (!this._json.schema) return null;
    return new Schema(this._json.schema);
  }
}

module.exports = addExtensions(ChannelParameter);
