/**
 * Implements functions to deal with the SpecificationExtensions object.
 * 
 * @mixin
 */
const MixinSpecificationExtensions = {
  /**
   * @returns {boolean} true if contains extensions, otherwise false
   */
  hasExtensions() {
    return !!this.extensionKeys().length;
  },

  /**
   * @returns {object<string, any>}  extensions
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
   * @returns {string[]} extensionKeys
   */
  extensionKeys() {
    return Object.keys(this.extensions());
  },

  /**
   * @returns {string[]} exitKeys
   */
  extKeys() {
    return this.extensionKeys();
  },

  /**
   * @param {string} key - Extension key.
   * @returns {boolean} true if it has extension, otherwise false
   */
  hasExtension(key) {
    if (!key.startsWith('x-')) {
      return false;
    }
    return !!this._json[String(key)];
  },

  /**
   * @param {string} key - Extension key.
   * @returns {any} extension 
   */
  extension(key) {
    if (!key.startsWith('x-')) {
      return null;
    }
    return this._json[String(key)];
  },

  /**
   * @param {string} key - Extension key.
   * @returns {boolean} true if it has extension, otherwise false
   */ 
  hasExt(key) {
    return this.hasExtension(key);
  },

  /**
   * @param {string} key - Extension key.
   * @returns {any} ext
   */
  ext(key) {
    return this.extension(key);
  },
};

module.exports = MixinSpecificationExtensions;
