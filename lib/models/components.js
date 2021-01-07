const { createMapOfType, getMapValueOfType, mix } = require('../utils');

const Base = require('./base');
const Message = require('./message');
const Schema = require('./schema');
const SecurityScheme = require('./security-scheme');
const ChannelParameter = require('./channel-parameter');
const CorrelationId = require('./correlation-id');
const OperationTrait = require('./operation-trait');
const MessageTrait = require('./message-trait');

const MixinSpecificationExtensions = require('../mixins/specification-extensions');

/**
 * Implements functions to deal with a Components object.
 * 
 * @class
 * @alias module:@asyncapi/parser#Components
 * @augments Base
 * @mixes MixinSpecificationExtensions
 * @returns {Components}
 */
class Components extends Base {
  /**
   * @returns {object<string, Message>}
   */
  messages() {
    return createMapOfType(this._json.messages, Message);
  }

  /**
   * @param name
   * @returns {Message}
   */
  message(name) {
    return getMapValueOfType(this._json.messages, name, Message);
  }
  
  /**
   * @returns {object<string, Schema>}
   */
  schemas() {
    return createMapOfType(this._json.schemas, Schema);
  }

  /**
   * @param name
   * @returns {Schema}
   */
  schema(name) {
    return getMapValueOfType(this._json.schemas, name, Schema);
  }
  
  /**
   * @returns {object<string, SecurityScheme>}
   */
  securitySchemes() {
    return createMapOfType(this._json.securitySchemes, SecurityScheme);
  }
  
  /**
   * @param name
   * @returns {SecurityScheme}
   */
  securityScheme(name) {
    return getMapValueOfType(this._json.securitySchemes, name, SecurityScheme);
  }
  
  /**
   * @returns {object<string, ChannelParameter>}
   */
  parameters() {
    return createMapOfType(this._json.parameters, ChannelParameter);
  }

  /**
   * @param name
   * @returns {ChannelParameter}
   */
  parameter(name) {
    return getMapValueOfType(this._json.parameters, name, ChannelParameter);
  }
  
  /**
   * @returns {object<string, CorrelationId>}
   */
  correlationIds() {
    return createMapOfType(this._json.correlationIds, CorrelationId);
  }

  /**
   * @param name
   * @returns {CorrelationId}
   */
  correlationId(name) {
    return getMapValueOfType(this._json.correlationIds, name, CorrelationId);
  }
  
  /**
   * @returns {object<string, OperationTrait>}
   */
  operationTraits() {
    return createMapOfType(this._json.operationTraits, OperationTrait);
  }

  /**
   * @param name
   * @returns {OperationTrait}
   */
  operationTrait(name) {
    return getMapValueOfType(this._json.operationTraits, name, OperationTrait);
  }
  
  /**
   * @returns {object<string, MessageTrait>}
   */
  messageTraits() {
    return createMapOfType(this._json.messageTraits, MessageTrait);
  }

  /**
   * @param name
   * @returns {MessageTrait}
   */
  messageTrait(name) {
    return getMapValueOfType(this._json.messageTraits, name, MessageTrait);
  }
}

module.exports = mix(Components, MixinSpecificationExtensions);
