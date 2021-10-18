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
  // check for allOf, oneOf, anyOf
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
    Object.values(doc.components().messages()).forEach(m => {
      traverseMessage(m, callback, schemaTypesToIterate);
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
  if (message === null) return;
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.headers)) {
    traverseSchema(message.headers(), callback, null, schemaTypesToIterate);
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.payloads)) {
    traverseSchema(message.payload(), callback, null, schemaTypesToIterate);
  }
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

/**
 * Traverse current schema and all nested schemas.
 * 
 * @private
 * @param {Schema} schemaContent schema.
 * @param {TraverseSchemas} callback 
 * @param {SchemaTypesToIterate[]} schemaTypesToIterate
 */
function newTraverseSchema(schema, propOrIndex, options) {
  if (!schema) return;
  const { callback, schemaTypesToIterate, seenSchemas } = options;

  // handle circular references
  const jsonSchema = schema.json();
  if (seenSchemas.has(jsonSchema)) return;
  seenSchemas.add(jsonSchema);

  // `type` isn't required so save type as array in the fallback
  let types = schema.type() || [];
  // chnage primitive type to array of types for easier handling
  if (!Array.isArray(types)) {
    types = [types];
  }
  if (!schemaTypesToIterate.includes(SchemaTypesToIterate.objects) && types.includes('object')) return;
  if (!schemaTypesToIterate.includes(SchemaTypesToIterate.arrays) && types.includes('array')) return;

  // check callback `NEW_SCHEMA` case
  if (callback(schema, propOrIndex, SchemaIteratorCallbackType.NEW_SCHEMA) === false) return;

  if (schemaTypesToIterate.includes(SchemaTypesToIterate.objects) && types.includes('object')) {
    newRecursiveSchemaObject(schema, options);
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.arrays) && types.includes('array')) {
    newRecursiveSchemaArray(schema, options);
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.oneOfs)) {
    (schema.oneOf() || []).forEach((combineSchema, idx) => {
      newTraverseSchema(combineSchema, idx, options);
    });
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.anyOfs)) {
    (schema.anyOf() || []).forEach((combineSchema, idx) => {
      newTraverseSchema(combineSchema, idx, options);
    });
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.allOfs)) {
    (schema.allOf() || []).forEach((combineSchema, idx) => {
      newTraverseSchema(combineSchema, idx, options);
    });
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.nots) && schema.not()) {
    newTraverseSchema(schema.not(), null, options);
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.propertyNames) && schema.propertyNames()) {
    newTraverseSchema(schema.propertyNames(), null, options);
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.patternProperties)) {
    Object.entries(schema.patternProperties() || {}).forEach(([propertyName, property]) => {
      newTraverseSchema(property, propertyName, options);
    });
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.contains) && schema.contains()) {
    newTraverseSchema(schema.contains(), null, options);
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.ifs) && schema.if()) {
    newTraverseSchema(schema.if(), null, options);
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.thenes) && schema.then()) {
    newTraverseSchema(schema.then(), null, options);
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.elses) && schema.else()) {
    newTraverseSchema(schema.else(), null, options);
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.dependencies)) {
    Object.entries(schema.dependencies() || {}).forEach(([depName, dep]) => {
      if (dep && !Array.isArray(dep)) { 
        newTraverseSchema(dep, depName, options);
      }
    });
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.definitions)) {
    Object.entries(schema.definitions() || {}).forEach(([defName, def]) => {
      newTraverseSchema(def, defName, options);
    });
  }

  callback(schema, propOrIndex, SchemaIteratorCallbackType.END_SCHEMA);
  seenSchemas.delete(jsonSchema);
}

function newRecursiveSchemaObject(schema, options) {
  Object.entries(schema.properties() || {}).forEach(([propertyName, property]) => {
    newTraverseSchema(property, propertyName, options);
  });

  const additionalProperties = schema.additionalProperties();
  if (typeof additionalProperties === 'object') {
    newTraverseSchema(additionalProperties, null, options);
  }
}

function newRecursiveSchemaArray(schema, options) {
  const items = schema.items();
  if (items) {
    if (Array.isArray(items)) {
      items.forEach((item, idx) => {
        newTraverseSchema(item, idx, options);
      });
    } else {
      newTraverseSchema(items, null, options);
    }
  }

  const additionalItems = schema.additionalItems();
  if (typeof additionalItems === 'object') {
    newTraverseSchema(additionalItems, null, options);
  }
}

function newTraverseAsyncApiDocument(doc, callback, schemaTypesToIterate) {
  if (!schemaTypesToIterate) {
    schemaTypesToIterate = Object.values(SchemaTypesToIterate);
  }
  const options = { callback, schemaTypesToIterate, seenSchemas: new Set() };

  if (doc.hasChannels()) {
    Object.values(doc.channels()).forEach(channel => {
      newTraverseChannel(channel, options);
    });
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.components) && doc.hasComponents()) {
    const components = doc.components();
    Object.values(components.messages() || {}).forEach(message => {
      newTraverseMessage(message, options);
    });
    Object.values(components.schemas() || {}).forEach(schema => {
      newTraverseSchema(schema, null, options);
    });
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.parameters)) {
      Object.values(components.parameters() || {}).forEach(parameter => {
        newTraverseSchema(parameter.schema(), null, options);
      });
    }
    Object.values(components.messageTraits() || {}).forEach(messageTrait => {
      newTraverseMessageTrait(messageTrait, options);
    });
  }
}

function newTraverseChannel(channel, options) {
  if (!channel) return;
  const { schemaTypesToIterate } = options;
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.parameters)) {
    Object.values(channel.parameters() || {}).forEach(parameter => {
      newTraverseSchema(parameter.schema(), null, options);
    });
  }
  if (channel.hasPublish()) {
    channel.publish().messages().forEach(message => {
      newTraverseMessage(message, options);
    });
  }
  if (channel.hasSubscribe()) {
    channel.subscribe().messages().forEach(message => {
      newTraverseMessage(message, options);
    });
  }
}

function newTraverseMessage(message, options) {
  if (!message) return;
  const { schemaTypesToIterate } = options;
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.headers)) {
    newTraverseSchema(message.headers(), null, options);
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.payloads)) {
    newTraverseSchema(message.payload(), null, options);
  }
}

function newTraverseMessageTrait(messageTrait, options) {
  if (!messageTrait) return;
  const { schemaTypesToIterate } = options;
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.headers)) {
    newTraverseSchema(messageTrait.headers(), null, options);
  }
}

module.exports = {
  SchemaIteratorCallbackType,
  SchemaTypesToIterate,
  traverseSchema,
  traverseAsyncApiDocument: newTraverseAsyncApiDocument,
  newTraverseAsyncApiDocument,
  traverseChannel,
  traverseMessage, 
  recursiveSchemaObject,
  recursiveSchemaArray
};
