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
 * The different kind of stages when crawling a schema.  
 * 
 * @typedef SchemaIteratorCallbackType
 * @property {string} NEW_SCHEMA The crawler just started crawling a schema.
 * @property {string} END_SCHEMA The crawler just finished crawling a schema.
 */

/**
 * @readonly
 * @enum {SchemaIteratorCallbackType}
 */
const SchemaIteratorCallbackType = Object.freeze({
  NEW_SCHEMA: 'NEW_SCHEMA',
  END_SCHEMA: 'END_SCHEMA'
});

/**
 * The different types of schemas you can iterate 
 * 
 * @typedef SchemaTypesToIterate
 * @property {string} parameters Crawl all schemas in parameters
 * @property {string} payloads Crawl all schemas in payloads
 * @property {string} headers Crawl all schemas in headers
 * @property {string} components Crawl all schemas in components
 * @property {string} objects Crawl all schemas of type object
 * @property {string} arrays Crawl all schemas of type array
 * @property {string} oneOfs Crawl all schemas in oneOf's
 * @property {string} allOfs Crawl all schemas in allOf's
 * @property {string} anyOfs Crawl all schemas in anyOf's
 */

/**
 * 
 * @readonly 
 * @enum {SchemaTypesToIterate}
 */
const SchemaTypesToIterate = Object.freeze({
  parameters: 'parameters',
  payloads: 'payloads',
  headers: 'headers',
  components: 'components',
  objects: 'objects',
  arrays: 'arrays',
  oneOfs: 'oneOfs',
  allOfs: 'allOfs',
  anyOfs: 'anyOfs'
});

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

    markCircularSchemas(this);
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
    const allSchemasCallback = (schema) => {
      if (schema.uid()) {
        schemas.set(schema.uid(), schema);
      }
    };
    traverseAsyncApiDocument(this, allSchemasCallback);
    return schemas;
  }

  /**
   * @returns {boolean}
   */
  hasCircular() {
    return !!this._json[String(xParserCircle)];
  }

  /**
   * Callback used when crawling a schema.
   * @callback TraverseSchemas
   * @param {Schema} schema which is being crawled 
   * @param {SchemaIteratorCallbackType} callbackType is the schema a new one or is the crawler finishing one.
   * @param {String} propName if the schema is from a property get the name of such
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
 * Traverse current schema and all nested schemas.
 * 
 * @private
 * @param {Schema} schemaContent schema.
 * @param {TraverseSchemas} callback 
 * @param {SchemaTypesToIterate[]} schemaTypesToIterate
 */
function traverseSchema(schema, callback, prop, schemaTypesToIterate) {
  if (schema === null) return;
  if (!schemaTypesToIterate.includes(SchemaTypesToIterate.arrays) && schema.type() === 'array') return;
  if (!schemaTypesToIterate.includes(SchemaTypesToIterate.objects) && schema.type() === 'object') return;
  if (schema.isCircular()) return;
  if (callback(schema, prop, SchemaIteratorCallbackType.NEW_SCHEMA) === false) return;

  if (schema.type() !== undefined) {
    switch (schema.type()) {
      case 'object':
        recursiveSchemaObject(schema, callback, schemaTypesToIterate);
        break;
      case 'array':
        recursiveSchemaArray(schema, callback, schemaTypesToIterate);
        break;
    }
  } else {
    traverseCombinedSchemas(schema, callback, schemaTypesToIterate);
  }
  callback(schema, prop, SchemaIteratorCallbackType.END_SCHEMA);
}

/**
 * Traverse combined notions
 * 
 * @private
 * @param {Schema} schemaContent schema.
 * @param {TraverseSchemas} callback 
 * @param {SchemaTypesToIterate[]} schemaTypesToIterate
 */
function traverseCombinedSchemas(schema, callback, schemaTypesToIterate) {
  //check for allOf, oneOf, anyOf
  const checkCombiningSchemas = (combineArray) => {
    (combineArray || []).forEach(combineSchema => {
      traverseSchema(combineSchema, callback, null, schemaTypesToIterate);
    });
  };
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.allOfs)) {
    checkCombiningSchemas(schema.allOf());
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.anyOfs)) {
    checkCombiningSchemas(schema.anyOf());
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.oneOfs)) {
    checkCombiningSchemas(schema.oneOf());
  }
}

/**
 * Go through each channel and for each parameter, and message payload and headers recursively call the callback for each schema.
 * 
 * @private
 * @param {AsyncAPIDocument} doc 
 * @param {FoundSchemaCallback} callback
 * @param {SchemaTypesToIterate[]} schemaTypesToIterate
 */
function traverseAsyncApiDocument(doc, callback, schemaTypesToIterate) {
  if (!schemaTypesToIterate) {
    schemaTypesToIterate = Object.values(SchemaTypesToIterate);
  }
  if (doc.hasChannels()) {
    doc.channelNames().forEach(channelName => {
      const channel = doc.channel(channelName);
      traverseChannel(channel, callback, schemaTypesToIterate);
    });
  }
  if (doc.hasComponents() && schemaTypesToIterate.includes(SchemaTypesToIterate.components)) {
    Object.values(doc.components().schemas()).forEach(s => {
      traverseSchema(s, callback, null, schemaTypesToIterate);
    });
  }
}

/**
 * Go through each schema in channel
 * 
 * @private
 * @param {Channel} channel 
 * @param {FoundSchemaCallback} callback
 * @param {SchemaTypesToIterate[]} schemaTypesToIterate
 */
function traverseChannel(channel, callback, schemaTypesToIterate) {
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.parameters)) {
    Object.values(channel.parameters()).forEach(p => {
      traverseSchema(p.schema(), callback, null, schemaTypesToIterate);
    });
  }
  if (channel.hasPublish()) {
    channel.publish().messages().forEach(m => {
      traverseMessage(m, callback, schemaTypesToIterate);
    });
  }
  if (channel.hasSubscribe()) {
    channel.subscribe().messages().forEach(m => {
      traverseMessage(m, callback, schemaTypesToIterate);
    });
  }
}
/**
 * Go through each schema in a message
 * 
 * @private
 * @param {Message} message 
 * @param {FoundSchemaCallback} callback
 * @param {SchemaTypesToIterate[]} schemaTypesToIterate
 */
function traverseMessage(message, callback, schemaTypesToIterate) {
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.headers)) {
    traverseSchema(message.headers(), callback, null, schemaTypesToIterate);
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.payloads)) {
    traverseSchema(message.payload(), callback, null, schemaTypesToIterate);
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
  traverseAsyncApiDocument(doc, callback);
}

/**
 * Recursively go through schema of object type and execute callback.
 * 
 * @private
 * @param {Schema} schema Object type.
 * @param {TraverseSchemas} callback 
 * @param {SchemaTypesToIterate[]} schemaTypesToIterate
 */
function recursiveSchemaObject(schema, callback, schemaTypesToIterate) {
  if (schema.additionalProperties() !== undefined && typeof schema.additionalProperties() !== 'boolean') {
    const additionalSchema = schema.additionalProperties();
    traverseSchema(additionalSchema, callback, null, schemaTypesToIterate);
  }
  if (schema.properties() !== null) {
    const props = schema.properties();
    for (const [prop, propertySchema] of Object.entries(props)) {
      const circularProps = schema.circularProps();
      if (circularProps !== undefined && circularProps.includes(prop)) continue;
      traverseSchema(propertySchema, callback, prop, schemaTypesToIterate);
    }
  }
}

/**
 * Recursively go through schema of array type and execute callback.
 * 
 * @private
 * @param {Schema} schema Array type.
 * @param {TraverseSchemas} callback 
 * @param {SchemaTypesToIterate[]} schemaTypesToIterate
 */
function recursiveSchemaArray(schema, callback, schemaTypesToIterate) {
  if (schema.additionalItems() !== undefined) {
    const additionalArrayItems = schema.additionalItems();
    traverseSchema(additionalArrayItems, callback, null, schemaTypesToIterate);
  }

  if (schema.items() !== null) {
    if (Array.isArray(schema.items())) {
      schema.items().forEach(arraySchema => {
        traverseSchema(arraySchema, callback, null, schemaTypesToIterate);
      });
    } else {
      traverseSchema(schema.items(), callback, null, schemaTypesToIterate);
    }
  }
}

module.exports = mix(AsyncAPIDocument, MixinTags, MixinExternalDocs, MixinSpecificationExtensions);
