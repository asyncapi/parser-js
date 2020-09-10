const { getMapValueByKey } = require('../utils');

/**
 * Implements functions to deal with the description field.
 * @mixin
 * @private
 */
const MixinDescription = {
  /**
   * @returns {boolean}
   */
  hasDescription() {
    return !!this._json.description;
  },

  /**
   * @returns {(string | null)}
   */
  description() {
    return getMapValueByKey(this._json, 'description');
  },
};

module.exports = MixinDescription;
