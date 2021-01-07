const MessageTraitable = require('./message-traitable');
const Schema = require('./schema');

// eslint-disable-next-line valid-jsdoc 
/**
 * Implements functions to deal with a Message object.
 * 
 * @class
 * @alias module:"@asyncapi/parser#Message"
 * @augments MessageTraitable
 * @returns {Message}
 */
class Message extends MessageTraitable {
  /**
   * @returns {string} UID.
   */
  uid() {
    return this.name() || this.ext('x-parser-message-name') || Buffer.from(JSON.stringify(this._json)).toString('base64');
  }

  /**
   * @returns {Schema} Payload
   */
  payload() {
    if (!this._json.payload) return null;
    return new Schema(this._json.payload);
  }

  /**
   * @returns {any} Original payload.
   */
  originalPayload() {
    return this._json['x-parser-original-payload'] || this.payload();
  }

  /**
   * @returns {string} Original schema format.
   */
  originalSchemaFormat() {
    return this._json['x-parser-original-schema-format'] || this.schemaFormat();
  }
}

module.exports = Message;
