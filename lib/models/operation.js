const OperationTraitable = require('./operation-traitable');
const Message = require('./message');
const OperationTrait = require('./operation-trait');
const OperationSecurityRequirement = require('./operation-security-requirement');

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
    // eslint-disable-next-line sonarjs/prefer-single-boolean-return
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
    if (this._json.message.oneOf && this._json.message.oneOf.length === 1) return new Message(this._json.message.oneOf[0]);
    if (!this._json.message.oneOf) return new Message(this._json.message);
    if (typeof index !== 'number') return null;
    if (index > this._json.message.oneOf.length - 1) return null;
    return new Message(this._json.message.oneOf[+index]);
  }

  /**
   * @returns {OperationSecurityRequirement[]}
  */
  security() {
    if (!this._json.security) return null;
    return this._json.security.map(sec => new OperationSecurityRequirement(sec));
  }
}

module.exports = Operation;
