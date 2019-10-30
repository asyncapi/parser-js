const MessageTraitable = require('./message-traitable');
const Schema = require('./schema');

/**
 * Implements functions to deal with a Message object.
 * @class
 * @extends MessageTraitable
 * @returns {Message}
 */
class Message extends MessageTraitable {
  /**
   * @returns {string}
   */
  uid() {
    return this.name() || this.ext('x-parser-message-name') || Buffer.from(JSON.stringify(this._json)).toString('base64');
  }

  /**
   * @returns {Schema}
   */
  payload() {
    if (!this._json.payload) return null;
    return new Schema(this._json.payload);
  }

  /**
   * @returns {any}
   */
  originalPayload() {
    return this._json['x-parser-original-payload'] || this.payload();
  }

  /**
   * @returns {string}
   */
  originalSchemaFormat() {
    return this._json['x-parser-original-schema-format'] || this.schemaFormat();
  }
}

module.exports = Message;
