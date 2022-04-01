const { getMapValueOfType, mix } = require('./utils');

const Base = require('./base');
const Schema = require('./schema');
const CorrelationId = require('./correlation-id');

const MixinDescription = require('../mixins/description');
const MixinExternalDocs = require('../mixins/external-docs');
const MixinTags = require('../mixins/tags');
const MixinBindings = require('../mixins/bindings');
const MixinSpecificationExtensions = require('../mixins/specification-extensions');

/**
 * Implements functions to deal with a the common properties that Message and MessageTrait objects have.
 * @class
 * @alias module:@asyncapi/parser#MessageTraitable
 * @extends Base
 * @mixes MixinDescription
 * @mixes MixinTags
 * @mixes MixinExternalDocs
 * @mixes MixinBindings
 * @mixes MixinSpecificationExtensions
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
    return getMapValueOfType(this._json.headers.properties, name, Schema);
  }

  /**
   * @returns {string}
   */
  id() {
    return this._json.messageId;
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
    return this._json.schemaFormat;
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
   * @returns {any[]}
   */
  examples() {
    return this._json.examples;
  }
}

module.exports = mix(MessageTraitable, MixinDescription, MixinTags, MixinExternalDocs, MixinBindings, MixinSpecificationExtensions);
