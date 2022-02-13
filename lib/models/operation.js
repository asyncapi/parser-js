const OperationTraitable = require('./operation-traitable');
const Message = require('./message');
const OperationTrait = require('./operation-trait');

/**
 * Implements functions to deal with an Operation object.
 * @class
 * @alias module:@asyncapi/parser#Operation
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
   * @returns {OperationTrait[]}
   */
  traits() {
    const traits = this._json['x-parser-original-traits'] || this._json.traits;
    if (!traits) return [];
    return traits.map(t => new OperationTrait(t));
  }
  
  /**
   * @returns {boolean}
   */
  hasTraits() {
    return !!this._json['x-parser-original-traits'] || !!this._json.traits;
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
    if (!this._json.message) return null;
    if (!this._json.message.oneOf) return new Message(this._json.message);
    if (typeof index !== 'number') return null;
    if (index > this._json.message.oneOf.length - 1) return null;
    return new Message(this._json.message.oneOf[+index]);
  }
}

module.exports = Operation;
