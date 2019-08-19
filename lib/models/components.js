const { getMapKeyOfType, createMapOfType, addExtensions } = require('../utils');
const Base = require('./base');
const Message = require('./message');
const Schema = require('./schema');
const SecurityScheme = require('./security-scheme');
const ChannelParameter = require('./channel-parameter');
const CorrelationId = require('./correlation-id');
const OperationTrait = require('./operation-trait');
const MessageTrait = require('./message-trait');

/**
 * Implements functions to deal with a Components object.
 * @class
 * @extends Base
 * @returns {Components}
 */
class Components extends Base {
  /**
   * @returns {Object<string, Message>}
   */
  messages() {
    return createMapOfType(this._json.messages, Message);
  }

  /**
   * @returns {Message}
   */
  message(name) {
    return getMapKeyOfType(this._json.messages, name, Message);
  }
  
  /**
   * @returns {Object<string, Schema>}
   */
  schemas() {
    return createMapOfType(this._json.schemas, Schema);
  }

  /**
   * @returns {Schema}
   */
  schema(name) {
    return getMapKeyOfType(this._json.schemas, name, Schema);
  }
  
  /**
   * @returns {Object<string, SecurityScheme>}
   */
  securitySchemes() {
    return createMapOfType(this._json.securitySchemes, SecurityScheme);
  }
  
  /**
   * @returns {SecurityScheme}
   */
  securityScheme(name) {
    return getMapKeyOfType(this._json.securitySchemes, name, SecurityScheme);
  }
  
  /**
   * @returns {Object<string, ChannelParameter>}
   */
  parameters() {
    return createMapOfType(this._json.parameters, ChannelParameter);
  }

  /**
   * @returns {ChannelParameter}
   */
  parameter(name) {
    return getMapKeyOfType(this._json.parameters, name, ChannelParameter);
  }
  
  /**
   * @returns {Object<string, CorrelationId>}
   */
  correlationIds() {
    return createMapOfType(this._json.correlationIds, CorrelationId);
  }

  /**
   * @returns {CorrelationId}
   */
  correlationId(name) {
    return getMapKeyOfType(this._json.correlationIds, name, CorrelationId);
  }
  
  /**
   * @returns {Object<string, OperationTrait>}
   */
  operationTraits() {
    return createMapOfType(this._json.operationTraits, OperationTrait);
  }

  /**
   * @returns {OperationTrait}
   */
  operationTrait(name) {
    return getMapKeyOfType(this._json.operationTraits, name, OperationTrait);
  }
  
  /**
   * @returns {Object<string, MessageTrait>}
   */
  messageTraits() {
    return createMapOfType(this._json.messageTraits, MessageTrait);
  }

  /**
   * @returns {MessageTrait}
   */
  messageTrait(name) {
    return getMapKeyOfType(this._json.messageTraits, name, MessageTrait);
  }
}

module.exports = addExtensions(Components);
