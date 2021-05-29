const Tag = require('../models/tag');

/**
 * Implements functions to deal with the Tags object.
 * 
 * @mixin
 */
const MixinTags = {
  /**
   * @returns {boolean} true if it has tags, otherwise false
   */
  hasTags() {
    return !!(Array.isArray(this._json.tags) && this._json.tags.length);
  },

  /**
   * @returns {Tag[]} an array of tags
   */
  tags() {
    return this.hasTags() ? this._json.tags.map(t => new Tag(t)) : [];
  },

  /**
   * @returns {string[]} an array of tag names
   */
  tagNames() {
    return this.hasTags() ? this._json.tags.map(t => t.name) : [];
  },

  /**
   * @param {string} name - Name of the tag.
   * @returns {boolean} true if it has provided name tag, otherwise false
   */
  hasTag(name) {
    return this.hasTags() && this._json.tags.some(t => t.name === name);
  },

  /**
   * @param {string} name - Name of the tag.
   * @returns {(Tag | null)} tag if exists, otherwise null
   */
  tag(name) {
    const tg = this.hasTags() && this._json.tags.find(t => t.name === name);
    return tg ? new Tag(tg) : null;
  },
};

module.exports = MixinTags;
