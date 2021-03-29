const { createMapOfType, getMapValueOfType, mix } = require('../utils');

const Base = require('./base');
const Info = require('./info');
const Server = require('./server');
const Channel = require('./channel');
const Components = require('./components');
const MixinExternalDocs = require('../mixins/external-docs');
const MixinTags = require('../mixins/tags');
const MixinSpecificationExtensions = require('../mixins/specification-extensions');
const {xParserCircle, xParserCircleProps} = require('../constants');
const {assignNameToAnonymousMessages, assignNameToComponentMessages, assignUidToComponentSchemas, assignUidToParameterSchemas, assignIdToAnonymousSchemas} = require('../anonymousNaming');
const {traverseAsyncApiDocument, SchemaIteratorCallbackType} = require('../iterators');

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
   * @callback module:@asyncapi/parser.TraverseSchemas
   * @param {Schema} schema which is being crawled
   * @param {String} propName if the schema is from a property get the name of such
   * @param {SchemaIteratorCallbackType} callbackType is the schema a new one or is the crawler finishing one.
   * @returns {boolean} should the crawler continue crawling the schema?
   */

  /**
   * Traverse schemas in the document and select which types of schemas to include.
   * By default all schemas are iterated
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

module.exports = mix(AsyncAPIDocument, MixinTags, MixinExternalDocs, MixinSpecificationExtensions);
