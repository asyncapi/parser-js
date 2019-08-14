const { addExtensions } = require('../utils');
const Base = require('./base');
const Tag = require('./tag');
const ExternalDocs = require('./external-docs');
const Message = require('./message');

/**
 * @class
 * @extends Base
 * @returns {Operation}
 */
class Operation extends Base {
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
   * @returns {string}
   */
  id() {
    return this._json.operationId;
  }
  
  /**
   * @returns {ExternalDocs}
   */
  externalDocs() {
    if (!this._json.externalDocs) return null;
    return new ExternalDocs(this._json.externalDocs);
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
    return this._json.protocolInfo || null;
  }
  
  /**
   * @param {string} name - Name of the binding.
   * @returns {Object}
   */
  binding(name) {
    return this._json.protocolInfo ? this._json.protocolInfo[name] : null;
  }
  
  /**
   * @returns {Message[]}
   */
  messages() {
    if (!this._json.message) return [];
    if (this._json.message.oneOf) return this._json.message.oneOf.map(m => new Message(m));
    return [new Message(this._json.message)];
  }
}

module.exports = addExtensions(Operation);
