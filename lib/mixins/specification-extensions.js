/**
 * Implements functions to deal with the SpecificationExtensions object.
 * 
 * @mixin
 */
const MixinSpecificationExtensions = {
  /**
   * @returns {boolean} Boolean
   */
  hasExtensions() {
    return !!this.extensionKeys().length;
  },

  /**
   * @returns {object<string, any>} Object<string, any>
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
   * @returns {string[]} String[]
   */
  extensionKeys() {
    return Object.keys(this.extensions());
  },

  /**
   * @returns {string[]} String[]
   */
  extKeys() {
    return this.extensionKeys();
  },

  /**
   * @param {string} key - Extension key.
   * @returns {boolean} Boolean
   */
  hasExtension(key) {
    if (!key.startsWith('x-')) {
      return false;
    }
    return !!this._json[String(key)];
  },

  /**
   * @param {string} key - Extension key.
   * @returns {any} any
   */
  extension(key) {
    if (!key.startsWith('x-')) {
      return null;
    }
    return this._json[String(key)];
  },

  /**
   * @param {string} key - Extension key.
   * @returns {boolean} Boolean
   */ 
  hasExt(key) {
    return this.hasExtension(key);
  },

  /**
   * @param {string} key - Extension key.
   * @returns {any} any
   */
  ext(key) {
    return this.extension(key);
  },
};

module.exports = MixinSpecificationExtensions;
