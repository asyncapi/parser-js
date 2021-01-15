const { createMapOfType, getMapValueOfType, mix } = require('../utils');

const Base = require('./base');
const Info = require('./info');
const Server = require('./server');
const Channel = require('./channel');
const Components = require('./components');

const MixinExternalDocs = require('../mixins/external-docs');
const MixinTags = require('../mixins/tags');
const MixinSpecificationExtensions = require('../mixins/specification-extensions');
const {xParserMessageName, xParserSchemaId, xParserCircle, xParserCircleProps} = require('../constants');
const {traverseAsyncApiDocument, SchemaIteratorCallbackType} = require('../iterators');

/**
 * Implements functions to deal with the AsyncAPI document.
 * 
 * @class
 * @alias module:@asyncapi/parser#AsyncAPIDocument
 * @augments Base
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

    markCircularSchemas(this);
    assignUidToComponentSchemas(this);
    assignUidToParameterSchemas(this);
    assignIdToAnonymousSchemas(this);
  }

  /**
   * @returns {string} version
   */
  version() {
    return this._json.asyncapi;
  }

  /**
   * @returns {Info} info
   */
  info() {
    return new Info(this._json.info);
  }

  /**
   * @returns {string} id
   */
  id() {
    return this._json.id;
  }

  /**
   * @returns {boolean} true if it has servers, otherwise false
   */
  hasServers() {
    return !!this._json.servers;
  }

  /**
   * @returns {object<string, Server>} servers
   */
  servers() {
    return createMapOfType(this._json.servers, Server);
  }

  /**
   * @returns {string[]} server names
   */
  serverNames() {
    if (!this._json.servers) return [];
    return Object.keys(this._json.servers);
  }

  /**
   * @param {string} name - Name of the server.
   * @returns {Server} the server for provided name
   */
  server(name) {
    return getMapValueOfType(this._json.servers, name, Server);
  }

  /**
   * @returns {boolean}  true if it has default content type, otherwise false
   */
  hasDefaultContentType() {
    return !!this._json.defaultContentType;
  }

  /**
   * @returns {string|null} default content type, otherwise false
   */
  defaultContentType() {
    return this._json.defaultContentType || null;
  }

  /**
   * @returns {boolean} true if it has channels, otherwise false
   */
  hasChannels() {
    return !!this._json.channels;
  }

  /**
   * @returns {object<string, Channel>} channels
   */
  channels() {
    return createMapOfType(this._json.channels, Channel, this);
  }

  /**
   * @returns {string[]} channel names
   */
  channelNames() {
    if (!this._json.channels) return [];
    return Object.keys(this._json.channels);
  }

  /**
   * @param {string} name - Name of the channel.
   * @returns {Channel} the channel for the provided name
   */
  channel(name) {
    return getMapValueOfType(this._json.channels, name, Channel, this);
  }

  /**
   * @returns {boolean} true if it has components, otherwise false
   */
  hasComponents() {
    return !!this._json.components;
  }

  /**
   * @returns {Components} components
   */
  components() {
    if (!this._json.components) return null;
    return new Components(this._json.components);
  }

  /**
   * @returns {boolean} true if it has messages, otherwise false
   */
  hasMessages() {
    return !!this.allMessages().size;
  }

  /**
   * @returns {Map<string, Message>} all messages
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
   * @returns {Map<string, Schema>} all schemas
   */
  allSchemas() {
    const schemas = new Map();
    const allSchemasCallback = (schema) => {
      if (schema.uid()) {
        schemas.set(schema.uid(), schema);
      }
    };
    traverseAsyncApiDocument(this, allSchemasCallback);
    return schemas;
  }

  /**
   * @returns {boolean}  true if it has circular, otherwise false
   */
  hasCircular() {
    return !!this._json[String(xParserCircle)];
  }

  /**
   * Callback used when crawling a schema.
   * 
   * @callback TraverseSchemas
   * @param {Schema} schema which is being crawled 
   * @param {string} propName if the schema is from a property get the name of such
   * @param {SchemaIteratorCallbackType} callbackType is the schema a new one or is the crawler finishing one.
   * @returns {boolean} should the crawler continue crawling the schema?
   * 
   */

  /**
   * Traverse schemas in the document and select which types of schemas to include.
   * By default all schemas are iterated
   * 
   * @param {TraverseSchemas} callback 
   * @param {SchemaTypesToIterate[]} schemaTypesToIterate
   */
  traverseSchemas(callback, schemaTypesToIterate) {
    traverseAsyncApiDocument(this, callback, schemaTypesToIterate);
  }
}

/**
 * Marks all recursive schemas as recursive.
 * 
 * @private
 * @param {AsyncAPIDocument} doc 
 */
function markCircularSchemas(doc) {
  const seenObj = [];
  const lastSchema = [];

  //Mark the schema as recursive
  const markCircular = (schema, prop) => {
    if (schema.type() === 'array') return schema.json()[String(xParserCircle)] = true;
    const circPropsList = schema.json()[String(xParserCircleProps)] || [];
    if (prop !== undefined) {
      circPropsList.push(prop);
    }
    schema.json()[String(xParserCircleProps)] = circPropsList;
  };

  //callback to use for iterating through the schemas
  const circularCheckCallback = (schema, propName, type) => {
    switch (type) {
    case SchemaIteratorCallbackType.END_SCHEMA:
      lastSchema.pop();
      seenObj.pop();
      break;
    case SchemaIteratorCallbackType.NEW_SCHEMA:
      const schemaJson = schema.json();
      if (seenObj.includes(schemaJson)) {
        const schemaToUse = lastSchema.length > 0 ? lastSchema[lastSchema.length - 1] : schema;
        markCircular(schemaToUse, propName);
        return false;
      }
      //Save a list of seen objects and last schema which should be marked if its recursive
      seenObj.push(schemaJson);
      lastSchema.push(schema);
      return true;
    }
  };
  traverseAsyncApiDocument(doc, circularCheckCallback);
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
      if (channel.hasPublish()) addNameToKey(channel.publish().messages(), ++anonymousMessageCounter);
      if (channel.hasSubscribe()) addNameToKey(channel.subscribe().messages(), ++anonymousMessageCounter);
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
  traverseAsyncApiDocument(doc, callback);
}

module.exports = mix(AsyncAPIDocument, MixinTags, MixinExternalDocs, MixinSpecificationExtensions);
