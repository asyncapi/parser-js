const { getMapValueByKey } = require('../utils');

/**
 * Implements functions to deal with the description field.
 * 
 * @mixin
 */
const MixinDescription = {
  /**
   * @returns {boolean} Boolean
   */
  hasDescription() {
    return !!this._json.description;
  },

  /**
   * @returns {(string | null)} (string | null)
   */
  description() {
    return getMapValueByKey(this._json, 'description');
  },
};

module.exports = MixinDescription;
