const Tag = require('../models/tag');

/**
 * Implements functions to deal with the Tags object.
 * @mixin
 */
const MixinTags = {
  /**
   * @returns {boolean}
   */
  hasTags() {
    return !!(Array.isArray(this._json.tags) && this._json.tags.length);
  },

  /**
   * @returns {Tag[]}
   */
  tags() {
    return this.hasTags() ? this._json.tags.map(t => new Tag(t)) : [];
  },

  /**
   * @returns {string[]}
   */
  tagNames() {
    return this.hasTags() ? this._json.tags.map(t => t.name) : [];
  },

  /**
   * @param {string} name - Name of the tag.
   * @returns {boolean}
   */
  hasTag(name) {
    return this.hasTags() && this._json.tags.some(t => t.name === name);
  },

  /**
   * @param {string} name - Name of the tag.
   * @returns {(Tag | null)}
   */
  tag(name) {
    const tg = this.hasTags() && this._json.tags.find(t => t.name === name);
    return tg ? new Tag(tg) : null;
  },
};

module.exports = MixinTags;
