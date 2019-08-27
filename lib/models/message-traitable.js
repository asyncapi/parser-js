const { getMapKeyOfType, addExtensions } = require('../utils');
const Base = require('./base');
const Tag = require('./tag');
const ExternalDocs = require('./external-docs');
const Schema = require('./schema');
const CorrelationId = require('./correlation-id');

/**
 * Implements functions to deal with a the common properties that Message and MessageTrait objects have.
 * @class
 * @extends Base
 * @returns {MessageTraitable}
 */
class MessageTraitable extends Base {
  /**
   * @returns {Schema}
   */
  headers() {
    if (!this._json.headers) return null;
    return new Schema(this._json.headers);
  }

  /**
   * @param {string} name - Name of the header.
   * @returns {Schema}
   */
  header(name) {
    if (!this._json.headers) return null;
    return getMapKeyOfType(this._json.headers.properties, name, Schema);
  }

  /**
   * @returns {CorrelationId}
   */
  correlationId() {
    if (!this._json.correlationId) return null;
    return new CorrelationId(this._json.correlationId);
  }

  /**
   * @returns {string}
   */
  schemaFormat() {
    return 'application/schema+json;version=draft-07';
  }

  /**
   * @returns {string}
   */
  contentType() {
    return this._json.contentType;
  }

  /**
   * @returns {string}
   */
  name() {
    return this._json.name;
  }

  /**
   * @returns {string}
   */
  title() {
    return this._json.title;
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
   * @returns {ExternalDocs}
   */
  externalDocs() {
    if (!this._json.externalDocs) return null;
    return new ExternalDocs(this._json.externalDocs);
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
    return this._json.bindings ? this._json.bindings[name] : null;
  }

  /**
   * @returns {any[]}
   */
  examples() {
    return this._json.examples;
  }
}

module.exports = addExtensions(MessageTraitable);
