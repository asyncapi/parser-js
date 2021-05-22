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
   * @returns {object<string, Message>} messages
   */
  messages() {
    return createMapOfType(this._json.messages, Message);
  }

  /**
   * @returns {boolean} true if it has messages, otherwise false
   */
  hasMessages() {
    return !!this._json.messages;
  }

  /**
   * @param {string} name - Name of the message.
   * @returns {Message} message for the provided name
   */
  message(name) {
    return getMapValueOfType(this._json.messages, name, Message);
  }
  
  /**
   * @returns {object<string, Schema>} schemas
   */
  schemas() {
    return createMapOfType(this._json.schemas, Schema);
  }

  /**
   * @returns {boolean} true if it has schemas, otherwise false
   */
  hasSchemas() {
    return !!this._json.schemas;
  }

  /**
   * @param {string} name - Name of the schema.
   * @returns {Schema} schema for the provided name
   */
  schema(name) {
    return getMapValueOfType(this._json.schemas, name, Schema);
  }
  
  /**
   * @returns {object<string, SecurityScheme>} security Schemes
   */
  securitySchemes() {
    return createMapOfType(this._json.securitySchemes, SecurityScheme);
  }

  /**
   * @returns {boolean} true if it has security schemes, otherwise false
   */
  hasSecuritySchemes() {
    return !!this._json.securitySchemes;
  }
  
  /**
   * @param {string} name - Name of the security schema.
   * @returns {SecurityScheme} security scheme for the provided name
   */
  securityScheme(name) {
    return getMapValueOfType(this._json.securitySchemes, name, SecurityScheme);
  }
  
  /**
   * @returns {object<string, ChannelParameter>} parameters
   */
  parameters() {
    return createMapOfType(this._json.parameters, ChannelParameter);
  }

  /**
   * @returns {boolean} true if it has parameters, otherwise false
   */
  hasParameters() {
    return !!this._json.parameters;
  }

  /**
   * @param {string} name - Name of the channel parameter.
   * @returns {ChannelParameter} channel parameter for the provided name
   */
  parameter(name) {
    return getMapValueOfType(this._json.parameters, name, ChannelParameter);
  }
  
  /**
   * @returns {object<string, CorrelationId>}  correlation ids
   */
  correlationIds() {
    return createMapOfType(this._json.correlationIds, CorrelationId);
  }

  /**
   * @returns {boolean} true if it has correlation ids, otherwise false
   */
  hasCorrelationIds() { 
    return !!this._json.correlationIds;
  }

  /**
   * @param {string} name - Name of the correlationId.
   * @returns {CorrelationId}  correlation id for the given name
   */
  correlationId(name) {
    return getMapValueOfType(this._json.correlationIds, name, CorrelationId);
  }
  
  /**
   * @returns {object<string, OperationTrait>} operation traits
   */
  operationTraits() {
    return createMapOfType(this._json.operationTraits, OperationTrait);
  }

  /**
   * @returns {boolean} true if it has operation traits, otherwise false
   */
  hasOperationTraits() {
    return !!this._json.operationTraits;
  }

  /**
   * @param {string} name - Name of the operation trait.
   * @returns {OperationTrait} operation trait for the provided name
   */
  operationTrait(name) {
    return getMapValueOfType(this._json.operationTraits, name, OperationTrait);
  }
  
  /**
   * @returns {object<string, MessageTrait>} message traits
   */
  messageTraits() {
    return createMapOfType(this._json.messageTraits, MessageTrait);
  }

  /**
   * @returns {boolean} true if it has message traits, otherwise false
   */
  hasMessageTraits() {
    return !!this._json.messageTraits;
  }

  /**
   * @param {string} name - Name of the message trait.
   * @returns {MessageTrait} message trait for the provided name
   */
  messageTrait(name) {
    return getMapValueOfType(this._json.messageTraits, name, MessageTrait);
  }
}

module.exports = mix(Components, MixinSpecificationExtensions);
