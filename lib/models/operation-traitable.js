const { getMapValueByKey, addExtensions } = require('../utils');
const Base = require('./base');
const Tag = require('./tag');
const ExternalDocs = require('./external-docs');

/**
 * Implements functions to deal with the common properties Operation and OperationTrait object have.
 * @class
 * @extends Base
 * @returns {OperationTraitable}
 */
class OperationTraitable extends Base {
  /**
   * @returns {string}
   */
  id() {
    return this._json.operationId;
  }
  
  /**
   * @returns {string}
   */
  summary() {
    return this._json.summary;
  }
  
  /**
   * @returns {string}
   */
  description() {
    return this._json.description;
  }

  /**
   * @returns {boolean}
   */
  hasTags() {
    return !!(this._json.tags && this._json.tags.length);
  }
  
  /**
   * @returns {Tag[]}
   */
  tags() {
    if (!this._json.tags) return [];
    return this._json.tags.map(t => new Tag(t));
  }

  /**
   * @returns {ExternalDocs}
   */
  externalDocs() {
    if (!this._json.externalDocs) return null;
    return new ExternalDocs(this._json.externalDocs);
  }

  /**
   * @returns {Object}
   */
  bindings() {
    return this._json.bindings || null;
  }

  /**
   * @param {string} name - Name of the binding.
   * @returns {Object}
   */
  binding(name) {
    return getMapValueByKey(this._json.bindings, name);
  }
}

module.exports = addExtensions(OperationTraitable);
