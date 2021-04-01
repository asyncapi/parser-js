const { getMapValueByKey } = require('../utils');

/**
 * Implements functions to deal with the description field.
 * @mixin
 */
const MixinDescription = {
  /**
   * @returns {boolean}
   */
  hasDescription() {
    return !!this.description;
  },

  /**
   * @returns {(string | null)}
   */
  description() {
    return getMapValueByKey(this, 'description');
  },
};

module.exports = MixinDescription;
