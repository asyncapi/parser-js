const { createMapOfType, getMapValueOfType, addExtensions } = require('../utils');
const Base = require('./base');
const Info = require('./info');
const Server = require('./server');
const Channel = require('./channel');
const Components = require('./components');
const Tag = require('./tag');

const xParserMessageName = 'x-parser-message-name';
const xParserSchemaId = 'x-parser-schema-id';

/**
 * Implements functions to deal with the AsyncAPI document.
 * @class 
 * @alias module:@asyncapi/parser#AsyncAPIDocument
 * @extends Base
 * @returns {AsyncAPIDocument}
 */
class AsyncAPIDocument extends Base {
  constructor(...args) {
    super(...args);

    assignNameToAnonymousMessages(this);
    assignNameToComponentMessages(this);

    assignUidToComponentSchemas(this);
    assignUidToParameterSchemas(this);
    assignIdToAnonymousSchemas(this);
  }

  /**
   * @returns {string}
   */
  version() {
    return this._json.asyncapi;
  }

  /**
   * @returns {Info}
   */
  info() {
    return new Info(this._json.info);
  }

  /**
   * @returns {string}
   */
  id() {
    return this._json.id;
  }

  /**
   * @returns {boolean}
   */
  hasServers() {
    return !!this._json.servers;
  }

  /**
   * @returns {Object<string, Server>}
   */
  servers() {
    return createMapOfType(this._json.servers, Server);
  }

  /**
   * @param {string} name - Name of the server.
   * @returns {Server}
   */
  server(name) {
    return getMapValueOfType(this._json.servers, name, Server);
  }

  /**
   * @returns {boolean}
   */
  hasChannels() {
    return !!this._json.channels;
  }

  /**
   * @returns {Object<string, Channel>}
   */
  channels() {
    return createMapOfType(this._json.channels, Channel, this);
  }

  /**
   * @returns {string[]}
   */
  channelNames() {
    if (!this._json.channels) return [];
    return Object.keys(this._json.channels);
  }

  /**
   * @param {string} name - Name of the channel.
   * @returns {Channel}
   */
  channel(name) {
    return getMapValueOfType(this._json.channels, name, Channel, this);
  }

  /**
   * @returns {string}
   */
  defaultContentType() {
    return this._json.defaultContentType || null;
  }

  /**
   * @returns {boolean}
   */
  hasComponents() {
    return !!this._json.components;
  }

  /**
   * @returns {Components}
   */
  components() {
    if (!this._json.components) return null;
    return new Components(this._json.components);
  }

  /**
   * @returns {boolean}
   */
  hasTags() {
    return !!(this._json.tags && this._json.tags.length);
  }

  /**
   * @returns {Tag[]}
   */
  tags() {
    if (!this._json.tags) return [];
    return this._json.tags.map(t => new Tag(t));
  }

  /**
   * @returns {boolean}
   */
  hasMessages() {
    return !!this.allMessages().size;
  }

  /**
   * @returns {Map<string, Message>}
   */
  allMessages() {
    const messages = new Map();
    
    if (this.hasChannels()) {
      this.channelNames().forEach(channelName => {
        const channel = this.channel(channelName);
        if (channel.hasPublish()) {
          channel.publish().messages().forEach(m => {
            messages.set(m.uid(), m);
          });
        }
        if (channel.hasSubscribe()) {
          channel.subscribe().messages().forEach(m => {
            messages.set(m.uid(), m);
          });
        }
      });
    }
    
    if (this.hasComponents()) {
      Object.values(this.components().messages()).forEach(m => {
        messages.set(m.uid(), m);
      });
    }
    
    return messages;
  }

  /**
   * @returns {Map<string, Schema>}
   */
  allSchemas() {
    const schemas = new Map();
    const callback = (schema) => {
      if (schema.uid()) {
        schemas.set(schema.uid(), schema);
      }
    };
    schemaDocument(this, callback);
    if (this.hasComponents()) {
      Object.values(this.components().schemas()).forEach(s => {
        recursiveSchema(s, callback);
      });
    }

    return schemas;
  }
}

/**
 * Assign message keys as message name to all the component messages.
 * 
 * @private
 * @param {AsyncAPIDocument} doc 
 */
function assignNameToComponentMessages(doc) {
  if (doc.hasComponents()) {
    for (const [key, m] of Object.entries(doc.components().messages())) {
      if (m.name() === undefined) {
        m.json()[String(xParserMessageName)] = key;
      }
    }
  }
}

/**
 * Assign parameter keys as uid for the parameter schema.
 * 
 * @private
 * @param {AsyncAPIDocument} doc 
 */
function assignUidToParameterSchemas(doc) {
  doc.channelNames().forEach(channelName => {
    const channel = doc.channel(channelName);
    for (const [parameterKey, parameterSchema] of Object.entries(channel.parameters())) {
      parameterSchema.json()[String(xParserSchemaId)] = parameterKey;
    }
  });
}

/**
 * Assign uid to component schemas. 
 * 
 * @private
 * @param {AsyncAPIDocument} doc 
 */
function assignUidToComponentSchemas(doc) {
  if (doc.hasComponents()) {
    for (const [key, s] of Object.entries(doc.components().schemas())) {
      s.json()[String(xParserSchemaId)] = key;
    }
  }
}

/**
 * Assign anonymous names to nameless messages.
 * 
 * @private
 * @param {AsyncAPIDocument} doc 
 */
function assignNameToAnonymousMessages(doc) {
  let anonymousMessageCounter = 0;

  if (doc.hasChannels()) {
    doc.channelNames().forEach(channelName => {
      const channel = doc.channel(channelName);
      if (channel.hasPublish()) addNameToKey(channel.publish().messages(),++anonymousMessageCounter);
      if (channel.hasSubscribe()) addNameToKey(channel.subscribe().messages(),++anonymousMessageCounter);
    });
  }
}

/**
 * Add anonymous name to key if no name provided.
 * 
 * @private
 * @param {Message} map of messages 
 */
function addNameToKey(messages, number) {
  messages.forEach(m => {
    if (m.name() === undefined) {
      m.json()[String(xParserMessageName)] = `<anonymous-message-${number}>`;
    }
  });
}

/**
 * Callback that is called foreach schema found
 * @private
 * @callback FoundSchemaCallback
 * @param {Schema} schema found.
*/
/**
 * Recursively go through each schema and execute callback.
 * 
 * @private
 * @param {Schema} schema found.
 * @param {FoundSchemaCallback} callback
 */
function recursiveSchema(schema, callback) {
  if (schema === null) return;
  callback(schema);
  
  if (schema.type() !== undefined) {
    switch (schema.type()) {
    case 'object':
      if (schema.additionalProperties() !== undefined && typeof schema.additionalProperties() !== 'boolean') {
        const additionalSchema = schema.additionalProperties();
        recursiveSchema(additionalSchema, callback);
      }
      if (schema.properties() !== null) {
        const props = schema.properties();
        for (const [, propertySchema] of Object.entries(props)) {
          recursiveSchema(propertySchema, callback);
        }
      }
      break;
    case 'array':
      if (schema.additionalItems() !== undefined) {
        const additionalArrayItems = schema.additionalItems();
        recursiveSchema(additionalArrayItems, callback);
      }

      if (schema.items() !== null) {
        if (Array.isArray(schema.items())) {
          schema.items().forEach(arraySchema => {
            recursiveSchema(arraySchema, callback);
          });
        } else {
          recursiveSchema(schema.items(), callback);
        }
      }
      break;
    }
  } else {
    //check for allOf, oneOf, anyOf
    const checkCombiningSchemas = (combineArray) => {
      if (combineArray !== null && combineArray.length > 0) {
        combineArray.forEach(combineSchema => {
          recursiveSchema(combineSchema, callback); ;
        });
      }
    };
    checkCombiningSchemas(schema.allOf());
    checkCombiningSchemas(schema.anyOf());
    checkCombiningSchemas(schema.oneOf());
  }
}

/**
 * Go through each channel and for each parameter, and message payload and headers recursively call the callback for each schema.
 * 
 * @private
 * @param {AsyncAPIDocument} doc 
 * @param {FoundSchemaCallback} callback
 */
function schemaDocument(doc, callback) {
  if (doc.hasChannels()) {
    doc.channelNames().forEach(channelName => {
      const channel = doc.channel(channelName);

      Object.values(channel.parameters()).forEach(p => {
        recursiveSchema(p.schema(), callback);
      });

      if (channel.hasPublish()) {
        channel.publish().messages().forEach(m => {
          recursiveSchema(m.headers(), callback);
          recursiveSchema(m.payload(), callback);
        });
      }
      if (channel.hasSubscribe()) {
        channel.subscribe().messages().forEach(m => {
          recursiveSchema(m.headers(), callback);
          recursiveSchema(m.payload(), callback);
        });
      }
    });
  }
}

/**
 * Gives schemas id to all anonymous schemas.
 * @private
 * @param {AsyncAPIDocument} doc 
 */
function assignIdToAnonymousSchemas(doc) {
  let anonymousSchemaCounter = 0;
  const callback = (schema) => {
    if (!schema.uid()) {
      schema.json()[String(xParserSchemaId)] = `<anonymous-schema-${++anonymousSchemaCounter}>`;
    }
  };
  schemaDocument(doc, callback);
}

module.exports = addExtensions(AsyncAPIDocument);
