const MessageTrait = require('./message-trait');
const MessageTraitable = require('./message-traitable');
const Schema = require('./schema');

/**
 * Implements functions to deal with a Message object.
 * @class
 * @alias module:@asyncapi/parser#Message
 * @extends MessageTraitable
 * @returns {Message}
 */
class Message extends MessageTraitable {
  /**
   * @returns {string}
   */
  uid() {
    return this.id() || this.name() || this.ext('x-parser-message-name') || Buffer.from(JSON.stringify(this._json)).toString('base64');
  }

  /**
   * @returns {Schema}
   */
  payload() {
    if (!this._json.payload) return null;
    return new Schema(this._json.payload);
  }

  /**
   * @returns {MessageTrait[]}
   */
  traits() {
    const traits = this._json['x-parser-original-traits'] || this._json.traits;
    if (!traits) return [];
    return traits.map(t => new MessageTrait(t));
  }

  /**
   * @returns {boolean}
   */
  hasTraits() {
    return !!this._json['x-parser-original-traits'] || !!this._json.traits;
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
