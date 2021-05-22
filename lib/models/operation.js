const OperationTraitable = require('./operation-traitable');
const Message = require('./message');

/**
 * Implements functions to deal with an Operation object.
 * 
 * @class
 * @alias module:@asyncapi/parser#Operation
 * @augments OperationTraitable
 * @returns {Operation}
 */
class Operation extends OperationTraitable {
  /**
   * @returns {boolean} true if has multiple messages otherwise, false
   */
  hasMultipleMessages() {
    if (this._json.message && this._json.message.oneOf && this._json.message.oneOf.length > 1) return true;
    if (!this._json.message) return false;
    return false;
  }
  
  /**
   * @returns {Message[]} messages
   */
  messages() {
    if (!this._json.message) return [];
    if (this._json.message.oneOf) return this._json.message.oneOf.map(m => new Message(m));
    return [new Message(this._json.message)];
  }
  
  /**
   * @returns {Message} message 
   * @param {number} index index of a message
   */
  message(index) {
    if (!this._json.message) return null;
    if (!this._json.message.oneOf) return new Message(this._json.message);
    if (typeof index !== 'number') return null;
    if (index > this._json.message.oneOf.length - 1) return null;
    return new Message(this._json.message.oneOf[+index]);
  }
}

module.exports = Operation;
