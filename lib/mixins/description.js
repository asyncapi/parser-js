const { getMapValueByKey } = require('../utils');

/**
 * Implements functions to deal with the description field.
 * 
 * @mixin
 */
const MixinDescription = {
  /**
   * @returns {boolean} true if it has description, otherwise false
   */
  hasDescription() {
    return !!this._json.description;
  },

  /**
   * @returns {(string | null)} description if exists, otherwise null
   */
  description() {
    return getMapValueByKey(this._json, 'description');
  },
};

module.exports = MixinDescription;
