const { getMapValueOfType } = require('../models/utils');

const ExternalDocs = require('../models/external-docs');

/**
 * Implements functions to deal with the ExternalDocs object.
 * @mixin
 */
const MixinExternalDocs = {
  /**
   * @returns {boolean}
   */
  hasExternalDocs() {
    return !!(this._json.externalDocs && Object.keys(this._json.externalDocs).length);
  },

  /**
   * @returns {(ExternalDocs | null)}
   */
  externalDocs() {
    return getMapValueOfType(this._json, 'externalDocs', ExternalDocs);
  },
};

module.exports = MixinExternalDocs;
