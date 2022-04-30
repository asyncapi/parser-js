const { createMapOfType, getMapValueOfType, mix } = require('./utils');

const Base = require('./base');
const Channel = require('./channel');
const Message = require('./message');
const Schema = require('./schema');
const SecurityScheme = require('./security-scheme');
const Server = require('./server');
const ChannelParameter = require('./channel-parameter');
const CorrelationId = require('./correlation-id');
const OperationTrait = require('./operation-trait');
const MessageTrait = require('./message-trait');
const ServerVariable = require('./server-variable');

const MixinSpecificationExtensions = require('../mixins/specification-extensions');

/**
 * Implements functions to deal with a Components object.
 * @class
 * @alias module:@asyncapi/parser#Components
 * @extends Base
 * @mixes MixinSpecificationExtensions
 * @returns {Components}
 */
class Components extends Base {
  /**
   * @returns {Object<string, Channel>}
   */
  channels() {
    return createMapOfType(this._json.channels, Channel);
  }

  /**
   * @returns {boolean}
   */
  hasChannels() {
    return !!this._json.channels;
  }

  /**
   * @param {string} name - Name of the channel.
   * @returns {Channel}
   */
  channel(name) {
    return getMapValueOfType(this._json.channels, name, Channel);
  }

  /**
   * @returns {Object<string, Message>}
   */
  messages() {
    return createMapOfType(this._json.messages, Message);
  }

  /**
   * @returns {boolean}
   */
  hasMessages() {
    return !!this._json.messages;
  }

  /**
   * @param {string} name - Name of the message.
   * @returns {Message}
   */
  message(name) {
    return getMapValueOfType(this._json.messages, name, Message);
  }
  
  /**
   * @returns {Object<string, Schema>}
   */
  schemas() {
    return createMapOfType(this._json.schemas, Schema);
  }

  /**
   * @returns {boolean}
   */
  hasSchemas() {
    return !!this._json.schemas;
  }

  /**
   * @param {string} name - Name of the schema.
   * @returns {Schema}
   */
  schema(name) {
    return getMapValueOfType(this._json.schemas, name, Schema);
  }
  
  /**
   * @returns {Object<string, SecurityScheme>}
   */
  securitySchemes() {
    return createMapOfType(this._json.securitySchemes, SecurityScheme);
  }

  /**
   * @returns {boolean}
   */
  hasSecuritySchemes() {
    return !!this._json.securitySchemes;
  }
  
  /**
   * @param {string} name - Name of the security schema.
   * @returns {SecurityScheme}
   */
  securityScheme(name) {
    return getMapValueOfType(this._json.securitySchemes, name, SecurityScheme);
  }

  /**
   * @returns {Object<string, Server>}
   */
  servers() {
    return createMapOfType(this._json.servers, Server);
  }

  /**
   * @returns {boolean}
   */
  hasServers() {
    return !!this._json.servers;
  }

  /**
   * @param {string} name - Name of the server.
   * @returns {Server}
   */
  server(name) {
    return getMapValueOfType(this._json.servers, name, Server);
  }
  
  /**
   * @returns {Object<string, ChannelParameter>}
   */
  parameters() {
    return createMapOfType(this._json.parameters, ChannelParameter);
  }

  /**
   * @returns {boolean}
   */
  hasParameters() {
    return !!this._json.parameters;
  }

  /**
   * @param {string} name - Name of the channel parameter.
   * @returns {ChannelParameter}
   */
  parameter(name) {
    return getMapValueOfType(this._json.parameters, name, ChannelParameter);
  }
  
  /**
   * @returns {Object<string, CorrelationId>}
   */
  correlationIds() {
    return createMapOfType(this._json.correlationIds, CorrelationId);
  }

  /**
   * @returns {boolean}
   */
  hasCorrelationIds() {
    return !!this._json.correlationIds;
  }

  /**
   * @param {string} name - Name of the correlationId.
   * @returns {CorrelationId}
   */
  correlationId(name) {
    return getMapValueOfType(this._json.correlationIds, name, CorrelationId);
  }
  
  /**
   * @returns {Object<string, OperationTrait>}
   */
  operationTraits() {
    return createMapOfType(this._json.operationTraits, OperationTrait);
  }

  /**
   * @returns {boolean}
   */
  hasOperationTraits() {
    return !!this._json.operationTraits;
  }

  /**
   * @param {string} name - Name of the operation trait.
   * @returns {OperationTrait}
   */
  operationTrait(name) {
    return getMapValueOfType(this._json.operationTraits, name, OperationTrait);
  }
  
  /**
   * @returns {Object<string, MessageTrait>}
   */
  messageTraits() {
    return createMapOfType(this._json.messageTraits, MessageTrait);
  }

  /**
   * @returns {boolean}
   */
  hasMessageTraits() {
    return !!this._json.messageTraits;
  }

  /**
   * @param {string} name - Name of the message trait.
   * @returns {MessageTrait}
   */
  messageTrait(name) {
    return getMapValueOfType(this._json.messageTraits, name, MessageTrait);
  }

  /**
   * 
   * @returns {Object<string, ServerVariable>}
   */
  serverVariables() {
    return createMapOfType(this._json.serverVariables, ServerVariable);
  }

  /**
   * 
   * @returns {boolean}
   */
  hasServerVariables() {
    return !!this._json.serverVariables;
  }

  /**
   * 
   * @param {string} name - Name of the server variable. 
   * @returns {ServerVariable}
   */
  serverVariable(name) {
    return getMapValueOfType(this._json.serverVariables, name, ServerVariable);
  }
}

module.exports = mix(Components, MixinSpecificationExtensions);
