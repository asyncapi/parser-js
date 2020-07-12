/**
 * Implements functions to deal with the SpecificationExtensions object.
 * @mixin MixinSpecificationExtensions
 */
const MixinSpecificationExtensions = {
  /**
   * @returns {boolean}
   */
  hasExtensions() {
    return !!this.extensionKeys().length;
  },

  /**
   * @returns {Object<string, Any>}
   */
  extensions() {
    const result = {};
    Object.entries(this._json).forEach(([key, value]) => {
      if ((/^x-[\w\d\.\-\_]+$/).test(key)) {
        result[String(key)] = value;
      }
    });
    return result;
  },

  /**
   * @returns {string[]}
   */
  extensionKeys() {
    return Object.keys(this.extensions());
  },

  /**
   * @returns {string[]}
   */
  extKeys() {
    return this.extensionKeys();
  },

  /**
   * @param {string} key - Extension key.
   * @returns {boolean}
   */
  hasExtension(key) {
    if (!key.startsWith('x-')) {
      return false;
    }
    return !!this._json[String(key)];
  },

  /**
   * @param {string} key - Extension key.
   * @returns {Any}
   */
  extension(key) {
    if (!key.startsWith('x-')) {
      return null;
    }
    return this._json[String(key)];
  },

  /**
   * @param {string} key - Extension key.
   * @returns {boolean}
   */ 
  hasExt(key) {
    return this.hasExtension(key);
  },

  /**
   * @param {string} key - Extension key.
   * @returns {Any}
   */
  ext(key) {
    return this.extension(key);
  },
};

module.exports = MixinSpecificationExtensions;
