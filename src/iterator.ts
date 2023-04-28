import type { AsyncAPIDocumentInterface } from './models/asyncapi';
import type { ChannelInterface } from './models/channel';
import type { ChannelParameterInterface } from './models/channel-parameter';
import type { MessageInterface } from './models/message';
import type { MessageTraitInterface } from './models/message-trait';
import type { SchemaInterface } from './models/schema';

/**
 * The different kind of stages when crawling a schema.  
 */
export enum SchemaIteratorCallbackType {
  NEW_SCHEMA = 'NEW_SCHEMA', // The crawler just started crawling a schema.
  END_SCHEMA = 'END_SCHEMA', // The crawler just finished crawling a schema.
}

/**
 * The different types of schemas you can iterate 
 */
export enum SchemaTypesToIterate {
  Parameters = 'parameters', // Crawl all schemas in payloads
  Payloads = 'payloads', // Crawl all schemas in payloads
  Headers = 'headers', // Crawl all schemas in headers
  Components = 'components', // Crawl all schemas in components
  Objects = 'objects', // Crawl all schemas of type object
  Arrays = 'arrays', // Crawl all schemas of type array
  OneOfs = 'oneOfs', // Crawl all schemas in oneOf's
  AllOfs = 'allOfs', // Crawl all schemas in allOf's
  AnyOfs = 'anyOfs', // Crawl all schemas in anyOf's
  Nots = 'nots', // Crawl all schemas in not field
  PropertyNames = 'propertyNames', // Crawl all schemas in propertyNames field
  PatternProperties = 'patternProperties', // Crawl all schemas in patternProperties field
  Contains = 'contains', // Crawl all schemas in contains field
  Ifs = 'ifs', // Crawl all schemas in if field
  Thenes = 'thenes', // Crawl all schemas in then field
  Elses = 'elses', // Crawl all schemas in else field
  Dependencies = 'dependencies', // Crawl all schemas in dependencies field
  Definitions = 'definitions', // Crawl all schemas in definitions field
}

export type TraverseOptions = {
  callback: TraverseCallback
  schemaTypesToIterate: Array<`${SchemaTypesToIterate}`>;
  seenSchemas: Set<any>
}   

export type TraverseCallback = (schema: SchemaInterface, propOrIndex: string | number | null, callbackType: SchemaIteratorCallbackType) => boolean | void;

/**
 * Go through each channel and for each parameter, and message payload and headers recursively call the callback for each schema.
 */
export function traverseAsyncApiDocument(doc: AsyncAPIDocumentInterface, callback: TraverseCallback, schemaTypesToIterate: Array<`${SchemaTypesToIterate}`> = []) {
  if (schemaTypesToIterate.length === 0) {
    schemaTypesToIterate = Object.values(SchemaTypesToIterate);
  }
  const options: TraverseOptions = { callback, schemaTypesToIterate, seenSchemas: new Set() };
        
  if (!doc.channels().isEmpty()) {
    doc.channels().all().forEach(channel => {
      traverseChannel(channel, options);
    });
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.Components) && !doc.components().isEmpty()) {
    const components = doc.components();
    Object.values(components.messages().all() || {}).forEach(message => {
      traverseMessage(message, options);
    });
    Object.values(components.schemas().all() || {}).forEach(schema => {
      traverseSchema(schema, null, options);
    });
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.Parameters)) {
      Object.values(components.channelParameters().filterBy((param: ChannelParameterInterface) => { return param.hasSchema(); })).forEach(parameter => {
        traverseSchema(parameter.schema() as SchemaInterface, null, options);
      });
    }
    Object.values(components.messageTraits().all() || {}).forEach(messageTrait => {
      traverseMessageTrait(messageTrait, options);
    });
  }
}

/* eslint-disable sonarjs/cognitive-complexity */
/**
 * Traverse current schema and all nested schemas.
 */
function traverseSchema(schema: SchemaInterface, propOrIndex: string | number | null, options: TraverseOptions) { // NOSONAR
  if (!schema) return;
  
  const { schemaTypesToIterate, callback, seenSchemas } = options;

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
    
  if (!schemaTypesToIterate.includes(SchemaTypesToIterate.Objects) && types.includes('object')) return;
  if (!schemaTypesToIterate.includes(SchemaTypesToIterate.Arrays) && types.includes('array')) return;
  
  // check callback `NEW_SCHEMA` case
  if (callback(schema, propOrIndex, SchemaIteratorCallbackType.NEW_SCHEMA) === false) return;
  
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.Objects) && types.includes('object')) {
    recursiveSchemaObject(schema, options);
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.Arrays) && types.includes('array')) {
    recursiveSchemaArray(schema, options);
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.OneOfs)) {
    (schema.oneOf() || []).forEach((combineSchema, idx) => {
      traverseSchema(combineSchema, idx, options);
    });
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.AnyOfs)) {
    (schema.anyOf() || []).forEach((combineSchema, idx) => {
      traverseSchema(combineSchema, idx, options);
    });
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.AllOfs)) {
    (schema.allOf() || []).forEach((combineSchema, idx) => {
      traverseSchema(combineSchema, idx, options);
    });
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.Nots) && schema.not()) {
    traverseSchema(schema.not() as SchemaInterface, null, options);
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.Ifs) && schema.if()) {
    traverseSchema(schema.if() as SchemaInterface, null, options);
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.Thenes) && schema.then()) {
    traverseSchema(schema.then() as SchemaInterface, null, options);
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.Elses) && schema.else()) {
    traverseSchema(schema.else() as SchemaInterface, null, options);
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.Dependencies)) {
    Object.entries(schema.dependencies() || {}).forEach(([depName, dep]) => {
      // do not iterate dependent required
      if (dep && !Array.isArray(dep)) { 
        traverseSchema(dep, depName, options);
      }
    });
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.Definitions)) {
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
 */
function recursiveSchemaObject(schema: SchemaInterface, options: TraverseOptions) {
  Object.entries(schema.properties() || {}).forEach(([propertyName, property]) => {
    traverseSchema(property, propertyName, options);
  });
   
  const additionalProperties = schema.additionalProperties();
  if (typeof additionalProperties === 'object') {
    traverseSchema(additionalProperties, null, options);
  }
   
  const schemaTypesToIterate = options.schemaTypesToIterate;
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.PropertyNames) && schema.propertyNames()) {
    traverseSchema(schema.propertyNames() as SchemaInterface, null, options);
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.PatternProperties)) {
    Object.entries(schema.patternProperties() || {}).forEach(([propertyName, property]) => {
      traverseSchema(property, propertyName, options);
    });
  }
}

/**
 * Recursively go through schema of array type and execute callback.
 */
function recursiveSchemaArray(schema: SchemaInterface, options: any) {
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
   
  if (options.schemaTypesToIterate.includes('contains') && schema.contains()) {
    traverseSchema(schema.contains() as SchemaInterface, null, options);
  }
}

/**
 * Go through each schema in channel
 */
function traverseChannel(channel: ChannelInterface, options: TraverseOptions) {
  if (!channel) return;
  const { schemaTypesToIterate } = options;
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.Parameters)) {
    Object.values(channel.parameters().filterBy((param: ChannelParameterInterface) => { return param.hasSchema(); }) || {}).forEach(parameter => {
      traverseSchema(parameter.schema() as SchemaInterface, null, options);
    });
  }

  channel.messages().all().forEach(message => {
    traverseMessage(message, options);
  });
}

/**
 * Go through each schema in a message
 */
function traverseMessage(message: MessageInterface, options: TraverseOptions) {
  if (!message) return;
  const { schemaTypesToIterate } = options;
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.Headers) && message.hasHeaders()) {
    traverseSchema(message.headers() as SchemaInterface, null, options);
  }
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.Payloads) && message.hasPayload()) {
    traverseSchema(message.payload() as SchemaInterface, null, options);
  }
}

/**
 * Go through each schema in a messageTrait
 */
function traverseMessageTrait(messageTrait: MessageTraitInterface, options: TraverseOptions) {
  if (!messageTrait) return;
  const { schemaTypesToIterate } = options;
  if (schemaTypesToIterate.includes(SchemaTypesToIterate.Headers) && messageTrait.hasHeaders()) {
    traverseSchema(messageTrait.headers() as SchemaInterface, null, options);
  }
}