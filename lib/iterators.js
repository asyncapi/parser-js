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
  anyOfs: 'anyOfs'
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

module.exports = {
  SchemaIteratorCallbackType,
  SchemaTypesToIterate,
  traverseSchema,
  traverseAsyncApiDocument,
  traverseChannel,
  traverseMessage, 
  recursiveSchemaObject,
  recursiveSchemaArray
};
