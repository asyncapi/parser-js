const OperationTraitable = require('./operation-traitable');
const Message = require('./message');

/**
 * Implements functions to deal with an Operation object.
 * @class
 * @extends OperationTraitable
 * @returns {Operation}
 */
class Operation extends OperationTraitable {
  /**
   * @returns {boolean}
   */
  hasMultipleMessages() {
    if (this._json.message && this._json.message.oneOf && this._json.message.oneOf.length > 1) return true;
    if (!this._json.message) return false;
    return false;
  }
  
  /**
   * @returns {Message[]}
   */
  messages() {
    if (!this._json.message) return [];
    if (this._json.message.oneOf) return this._json.message.oneOf.map(m => new Message(m));
    return [new Message(this._json.message)];
  }
  
  /**
   * @returns {Message}
   */
  message(index) {
    if (typeof index !== 'number' || !this._json.message) return null;
    if (!this._json.message.oneOf) return new Message(this._json.message);
    if (index > this._json.message.oneOf.length - 1) return null;
    return new Message(this._json.message.oneOf[+index]);
  }
}

module.exports = Operation;
