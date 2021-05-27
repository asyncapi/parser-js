const Base = require('./base');

/**
 * Implements functions to deal with a MessageExample object.
 * @class
 * @alias module:@asyncapi/parser#MessageExample
 * @extends Base
 * @returns {MessageExample}
 */
class MessageExample extends Base {
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
   * @returns {boolean}
   */
  hasHeaders() {
    return !!this._json.headers;
  }

  /**
   * @returns {any[]}
   */
  headers() {
    if (!this._json.headers) return null;
    return this._json.headers;
  }

  /**
   * @returns {boolean}
   */
  hasPayload() {
    return !!this._json.payload;
  }

  /**
   * @returns {any[]}
   */
  payload() {
    if (!this._json.payload) return null;
    return this._json.payload;
  }
}

module.exports = MessageExample;