const { createMapOfType, getMapKeyOfType, addExtensions } = require('../utils');
const Base = require('./base');
const Info = require('./info');
const Server = require('./server');
const Channel = require('./channel');
const Components = require('./components');
const Message = require('./message');
const Tag = require('./tag');

/**
 * Implements functions to deal with the AsyncAPI document.
 * @class
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
    return getMapKeyOfType(this._json.servers, name, Server);
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
    return getMapKeyOfType(this._json.channels, name, Channel, this);
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
   * @returns {Map<Message>}
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
   * @returns {Map<Schema>}
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

function assignNameToComponentMessages(doc) {
  if (doc.hasComponents()) {
    for (const [key, m] of Object.entries(doc.components().messages())) {
      if (m.name() === undefined) {
        m.json()['x-parser-message-name'] = key;
      }
    }
  }
}

/**
 * Assign parameter keys as uid for the parameter schema.
 * 
 * @param {AsyncAPIDocument} doc 
 */
function assignUidToParameterSchemas(doc) {
  doc.channelNames().forEach(channelName => {
    const channel = doc.channel(channelName);
    for (const [parameterKey, parameterSchema] of Object.entries(channel.parameters())) {
      parameterSchema.json()['x-parser-schema-id'] = parameterKey;
    }
  });
}

/**
 * Assign uid to component schemas. 
 * 
 * @param {AsyncAPIDocument} doc 
 */
function assignUidToComponentSchemas(doc) {
  if (doc.hasComponents()) {
    for (const [key, s] of Object.entries(doc.components().schemas())) {
      s.json()['x-parser-schema-id'] = key;
    }
  }
}

/**
 * Assign anonymous names to nameless messages.
 * 
 * @param {AsyncAPIDocument} doc 
 */
function assignNameToAnonymousMessages(doc) {
  let anonymousMessageCounter = 0;

  if (doc.hasChannels()) {
    doc.channelNames().forEach(channelName => {
      const channel = doc.channel(channelName);
      if (channel.hasPublish()) {
        channel.publish().messages().forEach(m => {
          if (m.name() === undefined) {
            m.json()['x-parser-message-name'] = `<anonymous-message-${++anonymousMessageCounter}>`;
          }
        });
      }
      if (channel.hasSubscribe()) {
        channel.subscribe().messages().forEach(m => {
          if (m.name() === undefined) {
            m.json()['x-parser-message-name'] = `<anonymous-message-${++anonymousMessageCounter}>`;
          }
        });
      }
    });
  }
}

/**
 * Recursively go through each schema and execute callback.
 * 
 * @param {Schema} schema found.
 * @param {Function} callback(schema)
 *         the function that is called foreach schema found.
 *         schema {Schema}: the found schema.
 */
function recursiveSchema(schema, callback) {
  if (schema === null) return;
  callback(schema);
  
  if (schema.type() !== undefined) {
    switch (schema.type()) {
      case 'object':
        if(schema.additionalProperties() !== undefined && typeof schema.additionalProperties() !== "boolean"){
          const additionalSchema = schema.additionalProperties()
          recursiveSchema(additionalSchema, callback);
        }
        if(schema.properties() !== null){
          const props = schema.properties();
          for (const [, propertySchema] of Object.entries(props)) {
            recursiveSchema(propertySchema, callback);
          }
        }
        break;
      case 'array':
        if(schema.additionalItems() !== undefined){
          const additionalArrayItems = schema.additionalItems()
          recursiveSchema(additionalArrayItems, callback);
        }

        if(schema.items() !== null){
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
          recursiveSchema(combineSchema, callback);;
        });
      }
    }
    checkCombiningSchemas(schema.allOf());
    checkCombiningSchemas(schema.anyOf());
    checkCombiningSchemas(schema.oneOf());
  }
}

/**
 * Go through each channel and for each parameter, and message payload and headers recursively call the callback for each schema.
 * 
 * @param {AsyncAPIDocument} doc 
 * @param {Function} callback(schema)
 *         the function that is called foreach schema found.
 *         schema {Schema}: the found schema.
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
 * 
 * @param {AsyncAPIDocument} doc 
 */
function assignIdToAnonymousSchemas(doc) {
  let anonymousSchemaCounter = 0;
  const callback = (schema) => {
    if (!schema.uid()) {
      schema.json()['x-parser-schema-id'] = `<anonymous-schema-${++anonymousSchemaCounter}>`;
    }
  };
  schemaDocument(doc, callback);
}

module.exports = addExtensions(AsyncAPIDocument);
