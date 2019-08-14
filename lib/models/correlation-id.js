const { addExtensions } = require('../utils');
const Base = require('./base');

/**
 * Implements functions to deal with a CorrelationId object.
 * @class
 * @extends Base
 * @returns {CorrelationId}
 */
class CorrelationId extends Base {
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
}

module.exports = addExtensions(CorrelationId);
