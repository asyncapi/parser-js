const { createMapOfType, getMapValueOfType, mix } = require('./utils');

const Base = require('./base');
const Info = require('./info');
const Server = require('./server');
const Channel = require('./channel');
const Components = require('./components');
const MixinExternalDocs = require('../mixins/external-docs');
const MixinTags = require('../mixins/tags');
const MixinSpecificationExtensions = require('../mixins/specification-extensions');
const {xParserSpecParsed, xParserSpecStringified, xParserCircle} = require('../constants');
const {assignNameToAnonymousMessages, assignNameToComponentMessages, assignUidToComponentSchemas, assignUidToParameterSchemas, assignIdToAnonymousSchemas, assignUidToComponentParameterSchemas} = require('../anonymousNaming');
const {traverseAsyncApiDocument} = require('../iterators');

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
  /**
   * @constructor
   */
  constructor(...args) {
    super(...args);

    if (this.ext(xParserSpecParsed) === true) {
      return;
    }

    assignNameToComponentMessages(this);
    assignNameToAnonymousMessages(this);

    assignUidToComponentSchemas(this);
    assignUidToComponentParameterSchemas(this);
    assignUidToParameterSchemas(this);
    assignIdToAnonymousSchemas(this);

    // We add `x-parser-spec-parsed=true` extension to determine that the specification is parsed and validated 
    // and when the specification is re-passed to the AsyncAPIDocument constructor,
    // there is no need to perform the same operations.
    this.json()[String(xParserSpecParsed)] = true;
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

  /**
   * Converts a valid AsyncAPI document to a JavaScript Object Notation (JSON) string.
   * A stringified AsyncAPI document using this function should be parsed via the AsyncAPIDocument.parse() function - the JSON.parse() function is not compatible.
   * 
   * @param {AsyncAPIDocument} doc A valid AsyncAPIDocument instance.
   * @param {(number | string)=} space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
   * @returns {string}
   */
  static stringify(doc, space) {
    const rawDoc = doc.json();
    const copiedDoc = { ...rawDoc };
    copiedDoc[String(xParserSpecStringified)] = true;
    return JSON.stringify(copiedDoc, refReplacer(), space);
  }

  /**
   * Converts a valid stringified AsyncAPIDocument instance into an AsyncAPIDocument instance.
   * 
   * @param {string} doc A valid stringified AsyncAPIDocument instance.
   * @returns {AsyncAPIDocument}
   */
  static parse(doc) {
    let parsedJSON = doc;
    if (typeof doc === 'string') {
      parsedJSON = JSON.parse(doc);
    } else if (typeof doc === 'object') {
      // shall copy
      parsedJSON = { ...parsedJSON };
    }

    // the `doc` must be an AsyncAPI parsed document
    if (typeof parsedJSON !== 'object' || !parsedJSON[String(xParserSpecParsed)]) {
      throw new Error('Cannot parse invalid AsyncAPI document');
    }
    // if the `doc` is not stringified via the `stringify` static method then immediately return a model.
    if (!parsedJSON[String(xParserSpecStringified)]) {
      return new AsyncAPIDocument(parsedJSON);
    }
    // remove `x-parser-spec-stringified` extension
    delete parsedJSON[String(xParserSpecStringified)];
  
    const objToPath = new Map();
    const pathToObj = new Map();
    traverseStringifiedDoc(parsedJSON, undefined, parsedJSON, objToPath, pathToObj);

    return new AsyncAPIDocument(parsedJSON);
  }
}

/**
 * Replacer function (that transforms the result) for AsyncAPI.stringify() function.
 * Handles circular references by replacing it by JSONPath notation. 
 * 
 * @private
 */
function refReplacer() {
  const modelPaths = new Map();
  const paths = new Map();
  let init = null;

  return function(field, value) {
    // `this` points to parent object of given value - some object or array
    const pathPart = modelPaths.get(this) + (Array.isArray(this) ? `[${field}]` : `.${  field}`);

    // check if `objOrPath` has "reference"
    const isComplex = value === Object(value);
    if (isComplex) {
      modelPaths.set(value, pathPart);
    }
    
    const savedPath = paths.get(value) || '';
    if (!savedPath && isComplex) {
      const valuePath = pathPart.replace(/undefined\.\.?/,'');
      paths.set(value, valuePath);
    }

    const prefixPath = savedPath[0] === '[' ? '$' : '$.';
    let val = savedPath ? `$ref:${prefixPath}${savedPath}` : value;
    if (init === null) {
      init = value;
    } else if (val === init) {
      val = '$ref:$';
    }
    return val;
  };
}

/**
 * Traverses stringified AsyncAPIDocument and replaces all JSON Pointer instance with real object reference.
 * 
 * @private
 * @param {Object} parent object
 * @param {string} field of parent object
 * @param {Object} root reference to the original object
 * @param {Map} objToPath
 * @param {Map} pathToObj
 */
function traverseStringifiedDoc(parent, field, root, objToPath, pathToObj) {
  let objOrPath = parent;
  let path = '$ref:$';

  if (field !== undefined) {
    // here can be string with `$ref` prefix or normal value 
    objOrPath = parent[String(field)];
    const concatenatedPath = field ? `.${field}` : '';
    path = objToPath.get(parent) + (Array.isArray(parent) ? `[${field}]` : concatenatedPath);
  }

  objToPath.set(objOrPath, path);
  pathToObj.set(path, objOrPath);
  
  const ref = pathToObj.get(objOrPath);
  if (ref) {
    parent[String(field)] = ref;
  }
  if (objOrPath === '$ref:$' || ref === '$ref:$') { // NOSONAR
    parent[String(field)] = root;
  }

  // traverse all keys, only if object is array/object
  if (objOrPath === Object(objOrPath)) {
    for (const f in objOrPath) {
      traverseStringifiedDoc(objOrPath, f, root, objToPath, pathToObj);
    }
  }
}

module.exports = mix(AsyncAPIDocument, MixinTags, MixinExternalDocs, MixinSpecificationExtensions);
