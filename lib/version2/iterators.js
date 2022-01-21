/**
 * @readonly
 * @enum {SchemaIteratorCallbackType}
 */

/**
 * The different kind of stages when crawling a schema.  
 * 
 * @typedef SchemaIteratorCallbackType
 * @property {string} NEW_SCHEMA The crawler just started crawling a schema.
 * @property {string} END_SCHEMA The crawler just finished crawling a schema.
 */
const SchemaIteratorCallbackType = Object.freeze({
  NEW_SCHEMA: 'NEW_SCHEMA',
  END_SCHEMA: 'END_SCHEMA'
});

/**
 *
 * @readonly
 * @enum {SchemaTypesToIterate}
 */

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
 * @property {string} nots Crawl all schemas in not field
 * @property {string} propertyNames Crawl all schemas in propertyNames field
 * @property {string} patternProperties Crawl all schemas in patternProperties field
 * @property {string} contains Crawl all schemas in contains field
 * @property {string} ifs Crawl all schemas in if field
 * @property {string} thenes Crawl all schemas in then field
 * @property {string} elses Crawl all schemas in else field
 * @property {string} dependencies Crawl all schemas in dependencies field
 * @property {string} definitions Crawl all schemas in definitions field
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
  anyOfs: 'anyOfs',
  nots: 'nots',
  propertyNames: 'propertyNames',
  patternProperties: 'patternProperties',
  contains: 'contains',
  ifs: 'ifs',
  thenes: 'thenes',
  elses: 'elses',
  dependencies: 'dependencies',
  definitions: 'definitions',
});

/* eslint-disable sonarjs/cognitive-complexity */
/**
 * Traverse current schema and all nested schemas.
 * 
 * @private
 * @param {Schema} schema which is being crawled.
 * @param {(String | Number)} propOrIndex if the schema is from a property/index get the name/number of such.
 * @param {Object} options
 * @param {SchemaIteratorCallbackType} [options.callback] callback used when crawling a schema.
 * @param {SchemaTypesToIterate[]} [options.schemaTypesToIterate] list of schema types to crawl.
 * @param {Set<Object>} [options.seenSchemas] Set which holds all defined schemas in the tree - it is mainly used to check circular references
 */
function traverseSchema(schema, propOrIndex, options) { // NOSONAR
  if (!schema) return;
  const { callback, schemaTypesToIterate, seenSchemas } = options;

  // handle circular references
  const jsonSchema = schema.json();
  if (seenSchemas.has(jsonSchema)) return;
  seenSchemas.add(jsonSchema);

  // `type` isn't required so save type as array in the fallback
  let types = schema.type() || [];
  // change primitive type to array of types for easier handling
  if (!Array.isArray(types)) {
    types = [types];
  }
  if (!schemaTypesToIterate.includes(SchemaTypesToIterate.objects) && types.includes('object')) return;
  if (!schemaTypesToIterate.includes(SchemaTypesToIterate.arrays) && types.includes('array')) return;

  // check callback `NEW_SCHEMA` case
  if (callback(schema, propOrIndex, SchemaIteratorCallbackType.NEW_SCHEMA) === false) return;

  if (schemaTypesToIterate.includes(SchemaTypesToIterate.objects) && types.includes('object')) {
    recursiveSchemaObject(schema, options);
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.arrays) && types.includes('array')) {
    recursiveSchemaArray(schema, options);
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.oneOfs)) {
    (schema.oneOf() || []).forEach((combineSchema, idx) => {
      traverseSchema(combineSchema, idx, options);
    });
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.anyOfs)) {
    (schema.anyOf() || []).forEach((combineSchema, idx) => {
      traverseSchema(combineSchema, idx, options);
    });
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.allOfs)) {
    (schema.allOf() || []).forEach((combineSchema, idx) => {
      traverseSchema(combineSchema, idx, options);
    });
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.nots) && schema.not()) {
    traverseSchema(schema.not(), null, options);
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.ifs) && schema.if()) {
    traverseSchema(schema.if(), null, options);
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.thenes) && schema.then()) {
    traverseSchema(schema.then(), null, options);
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.elses) && schema.else()) {
    traverseSchema(schema.else(), null, options);
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.dependencies)) {
    Object.entries(schema.dependencies() || {}).forEach(([depName, dep]) => {
      // do not iterate dependent required
      if (dep && !Array.isArray(dep)) { 
        traverseSchema(dep, depName, options);
      }
    });
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.definitions)) {
    Object.entries(schema.definitions() || {}).forEach(([defName, def]) => {
      traverseSchema(def, defName, options);
    });
  }

  callback(schema, propOrIndex, SchemaIteratorCallbackType.END_SCHEMA);
  seenSchemas.delete(jsonSchema);
}
/* eslint-enable sonarjs/cognitive-complexity */

/**
 * Recursively go through schema of object type and execute callback.
 * 
 * @private
 * @param {Object} options
 * @param {SchemaIteratorCallbackType} [options.callback] callback used when crawling a schema.
 * @param {SchemaTypesToIterate[]} [options.schemaTypesToIterate] list of schema types to crawl.
 * @param {Set<Object>} [options.seenSchemas] Set which holds all defined schemas in the tree - it is mainly used to check circular references
 */
function recursiveSchemaObject(schema, options) {
  Object.entries(schema.properties() || {}).forEach(([propertyName, property]) => {
    traverseSchema(property, propertyName, options);
  });

  const additionalProperties = schema.additionalProperties();
  if (typeof additionalProperties === 'object') {
    traverseSchema(additionalProperties, null, options);
  }

  const schemaTypesToIterate = options.schemaTypesToIterate;
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.propertyNames) && schema.propertyNames()) {
    traverseSchema(schema.propertyNames(), null, options);
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.patternProperties)) {
    Object.entries(schema.patternProperties() || {}).forEach(([propertyName, property]) => {
      traverseSchema(property, propertyName, options);
    });
  }
}

/**
 * Recursively go through schema of array type and execute callback.
 * 
 * @private
 * @param {Object} options
 * @param {SchemaIteratorCallbackType} [options.callback] callback used when crawling a schema.
 * @param {SchemaTypesToIterate[]} [options.schemaTypesToIterate] list of schema types to crawl.
 * @param {Set<Object>} [options.seenSchemas] Set which holds all defined schemas in the tree - it is mainly used to check circular references
 */
function recursiveSchemaArray(schema, options) {
  const items = schema.items();
  if (items) {
    if (Array.isArray(items)) {
      items.forEach((item, idx) => {
        traverseSchema(item, idx, options);
      });
    } else {
      traverseSchema(items, null, options);
    }
  }

  const additionalItems = schema.additionalItems();
  if (typeof additionalItems === 'object') {
    traverseSchema(additionalItems, null, options);
  }

  if (options.schemaTypesToIterate.includes(SchemaTypesToIterate.contains) && schema.contains()) {
    traverseSchema(schema.contains(), null, options);
  }
}

/**
 * Go through each channel and for each parameter, and message payload and headers recursively call the callback for each schema.
 * 
 * @private
 * @param {AsyncAPIDocument} doc parsed AsyncAPI Document
 * @param {FoundSchemaCallback} callback callback used when crawling a schema.
 * @param {SchemaTypesToIterate[]} schemaTypesToIterate list of schema types to crawl.
 */
function traverseAsyncApiDocument(doc, callback, schemaTypesToIterate) {
  if (!schemaTypesToIterate) {
    schemaTypesToIterate = Object.values(SchemaTypesToIterate);
  }
  const options = { callback, schemaTypesToIterate, seenSchemas: new Set() };

  if (doc.hasChannels()) {
    Object.values(doc.channels()).forEach(channel => {
      traverseChannel(channel, options);
    });
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.components) && doc.hasComponents()) {
    const components = doc.components();
    Object.values(components.messages() || {}).forEach(message => {
      traverseMessage(message, options);
    });
    Object.values(components.schemas() || {}).forEach(schema => {
      traverseSchema(schema, null, options);
    });
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.parameters)) {
      Object.values(components.parameters() || {}).forEach(parameter => {
        traverseSchema(parameter.schema(), null, options);
      });
    }
    Object.values(components.messageTraits() || {}).forEach(messageTrait => {
      traverseMessageTrait(messageTrait, options);
    });
  }
}

/**
 * Go through each schema in channel
 * 
 * @private
 * @param {Channel} channel 
 * @param {Object} options
 * @param {SchemaIteratorCallbackType} [options.callback] callback used when crawling a schema.
 * @param {SchemaTypesToIterate[]} [options.schemaTypesToIterate] list of schema types to crawl.
 * @param {Set<Object>} [options.seenSchemas] Set which holds all defined schemas in the tree - it is mainly used to check circular references
 */
function traverseChannel(channel, options) {
  if (!channel) return;
  const { schemaTypesToIterate } = options;
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.parameters)) {
    Object.values(channel.parameters() || {}).forEach(parameter => {
      traverseSchema(parameter.schema(), null, options);
    });
  }
  if (channel.hasPublish()) {
    channel.publish().messages().forEach(message => {
      traverseMessage(message, options);
    });
  }
  if (channel.hasSubscribe()) {
    channel.subscribe().messages().forEach(message => {
      traverseMessage(message, options);
    });
  }
}

/**
 * Go through each schema in a message
 * 
 * @private
 * @param {Message} message 
 * @param {Object} options
 * @param {SchemaIteratorCallbackType} [options.callback] callback used when crawling a schema.
 * @param {SchemaTypesToIterate[]} [options.schemaTypesToIterate] list of schema types to crawl.
 * @param {Set<Object>} [options.seenSchemas] Set which holds all defined schemas in the tree - it is mainly used to check circular references
 */
function traverseMessage(message, options) {
  if (!message) return;
  const { schemaTypesToIterate } = options;
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.headers)) {
    traverseSchema(message.headers(), null, options);
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.payloads)) {
    traverseSchema(message.payload(), null, options);
  }
}

/**
 * Go through each schema in a messageTrait
 * 
 * @private
 * @param {MessageTrait} messageTrait 
 * @param {Object} options
 * @param {SchemaIteratorCallbackType} [options.callback] callback used when crawling a schema.
 * @param {SchemaTypesToIterate[]} [options.schemaTypesToIterate] list of schema types to crawl.
 * @param {Set<Object>} [options.seenSchemas] Set which holds all defined schemas in the tree - it is mainly used to check circular references
 */
function traverseMessageTrait(messageTrait, options) {
  if (!messageTrait) return;
  const { schemaTypesToIterate } = options;
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.headers)) {
    traverseSchema(messageTrait.headers(), null, options);
  }
}

module.exports = {
  SchemaIteratorCallbackType,
  SchemaTypesToIterate,
  traverseAsyncApiDocument,
};