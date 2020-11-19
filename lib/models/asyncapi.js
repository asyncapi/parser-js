const { createMapOfType, getMapValueOfType, mix } = require('../utils');

const Base = require('./base');
const Info = require('./info');
const Server = require('./server');
const Channel = require('./channel');
const Components = require('./components');

const MixinExternalDocs = require('../mixins/external-docs');
const MixinTags = require('../mixins/tags');
const MixinSpecificationExtensions = require('../mixins/specification-extensions');

const xParserMessageName = 'x-parser-message-name';
const xParserSchemaId = 'x-parser-schema-id';
const xParserCircle = 'x-parser-circular';
const xParserCircleProps = 'x-parser-circular-props';

/**
 * Implements functions to deal with the AsyncAPI document. 
 * @class
 * @alias module:@asyncapi/parser#AsyncAPIDocument
 * @extends Base
 * @mixes MixinTags
 * @mixes MixinExternalDocs
 * @mixes MixinSpecificationExtensions
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
   * @returns {string[]}
   */
  serverNames() {
    if (!this._json.servers) return [];
    return Object.keys(this._json.servers);
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
  hasDefaultContentType() {
    return !!this._json.defaultContentType;
  }

  /**
   * @returns {string|null}
   */
  defaultContentType() {
    return this._json.defaultContentType || null;
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

  /**
   * @returns {boolean}
   */
  hasCircular() {
    return !!this._json[String(xParserCircle)];
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
 * Function that indicates that a circular reference was detected.
 * @private
 * @param {Schema} schema schema that is currently accessed and need to be checked if it is a first time
 * @param {Array} seenObjects list of objects that were already seen during recursion 
 */
function isCircular(schema, seenObjects) {
  return seenObjects.includes(schema.json());
}

/**
 * Mark schema as being a circular ref
 * 
 * @private
 * @param {Schema} schema schema that should be marked as circular
 */
function markCircular(schema, prop) {
  if (schema.type() === 'array') return schema.json()[String(xParserCircle)] = true;

  const circPropsList = schema.json()[String(xParserCircleProps)] || [];
  circPropsList.push(prop);
  schema.json()[String(xParserCircleProps)] = circPropsList;
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
function recursiveSchema(schemaContent, callback) {
  if (schemaContent === null) return;
  const seenObj = [];

  return crawl(schemaContent, seenObj, callback);
}

/**
 * Schema crawler
 * 
 * @private
 * @param {Schema} schemaContent schema.
 * @param {Array} seenObj schema elements that crowler went through already.
 * @param {Function} callback(schema)
 *         the function that is called foreach schema found.
 *         schema {Schema}: the found schema.
 */
function crawl(schema, seenObj, callback) {
  if (isCircular(schema, seenObj)) return true;

  seenObj.push(schema.json());
  callback(schema);
  if (schema.type() !== undefined) {
    switch (schema.type()) {
    case 'object':
      recursiveSchemaObject(schema, seenObj, callback);
      break;
    case 'array':
      recursiveSchemaArray(schema, seenObj, callback);
      break;
    }
  } else {
  //check for allOf, oneOf, anyOf
    const checkCombiningSchemas = (combineArray) => {
      if (combineArray !== null && combineArray.length > 0) {
        combineArray.forEach(combineSchema => {
          if (crawl(combineSchema, seenObj, callback)) markCircular(schema);
        });
      }
    };
    checkCombiningSchemas(schema.allOf());
    checkCombiningSchemas(schema.anyOf());
    checkCombiningSchemas(schema.oneOf());
  }

  seenObj.pop();
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
 * 
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

/**
 * Recursively go through schema of object type and execute callback.
 * 
 * @private
 * @param {Schema} schema Object type.
 * @param {Array} seenObj schema elements that crawler went through already.
 * @param {Function} callback(schema)
 *         the function that is called foreach schema found.
 *         schema {Schema}: the found schema.
 */
function recursiveSchemaObject(schema, seenObj, callback) {
  if (schema.additionalProperties() !== undefined && typeof schema.additionalProperties() !== 'boolean') {
    const additionalSchema = schema.additionalProperties();
    if (crawl(additionalSchema, seenObj, callback))  markCircular(schema);
  }
  if (schema.properties() !== null) {
    const props = schema.properties();
    for (const [prop, propertySchema] of Object.entries(props)) {
      if (crawl(propertySchema, seenObj, callback)) markCircular(schema, prop);
    }
  }
}

/**
 * Recursively go through schema of array type and execute callback.
 * 
 * @private
 * @param {Schema} schema Array type.
 * @param {Array} seenObj schema elements that crowler went through already.
 * @param {Function} callback(schema)
 *         the function that is called foreach schema found.
 *         schema {Schema}: the found schema.
 */
function recursiveSchemaArray(schema, seenObj, callback) {
  if (schema.additionalItems() !== undefined) {
    const additionalArrayItems = schema.additionalItems();
    if (crawl(additionalArrayItems, seenObj, callback))  markCircular(schema);
  }

  if (schema.items() !== null) {
    if (Array.isArray(schema.items())) {
      schema.items().forEach(arraySchema => {
        if (crawl(arraySchema, seenObj, callback))  markCircular(schema);
      });
    } else if (crawl(schema.items(), seenObj, callback)) markCircular(schema);
  }
}

module.exports = mix(AsyncAPIDocument, MixinTags, MixinExternalDocs, MixinSpecificationExtensions);
