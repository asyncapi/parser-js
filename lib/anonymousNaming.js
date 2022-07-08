const { xParserMessageName, xParserSchemaId, xParserSchemaIdLevel } = require('./constants');
const { traverseAsyncApiDocument, traverseSchema, SchemaIteratorCallbackType } = require('./iterators');
const { upperFirst } = require('./utils');

/**
 * Assign message keys as message name to all the component messages.
 * 
 * @private
 * @param {AsyncAPIDocument} doc
 * @param {boolean} traversIds Walk recursive through schema and try to find reasonable uid where no uids was given.
 */
function assignNameToComponentMessages(doc, traversIds = false) {
  if (doc.hasComponents()) {
    for (const [key, m] of Object.entries(doc.components().messages())) {
      if (m.name() === undefined) {
        m.json()[String(xParserMessageName)] = key;

        if (traversIds) {
          assignUidToComponentSchemasRecursive(m.payload(), key);
        }
      }
    }
  }
}

/**
 * Assign ids based on parameter keys.
 * 
 * @private
 * @param {Record<string,Schema>} parameterObject 
 */
function assignIdToParameters(parameterObject) {
  for (const [parameterKey, parameter] of Object.entries(parameterObject)) {
    if (parameter.schema()) {
      parameter.schema().json()[String(xParserSchemaId)] = parameterKey;
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
    assignIdToParameters(channel.parameters());
  });
}

/**
 * Assign uid to component schemas. 
 * 
 * @private
 * @param {AsyncAPIDocument} doc 
 * @param {boolean} traversIds Walk recursive through schema and try to find reasonamble uid where no uids was given.
 */
function assignUidToComponentSchemas(doc, traversIds = false) {
  if (doc.hasComponents()) {
    for (const [key, schema] of Object.entries(doc.components().schemas())) {
      if (traversIds) {
        assignUidToComponentSchemasRecursive(schema, key);
      } else {
        schema.json()[String(xParserSchemaId)] = key;
      }
    }
  }
}

/**
 * Assign uid to component schemas. By walking recursive through schema.
 * 
 * @param {Schema} schema which is going to be processed. 
 * @param {String} key The name of the schema to be processed.
 */
function assignUidToComponentSchemasRecursive(schema, key) {
  traverseSchema(
    schema,
    key,
    {
      parentId: '',
      level: 0,
      propOrIndexModifier: (propertyName, _subSchema, options) => {
        if (typeof propertyName === 'number') {
          // It is not save to generate ids with arrays containing multiple types
          // This is the case when be called from iterators.js:recursiveSchemaArray

          // This example is working because `Car` and `Airplane` are root level schemas and gots its own ids:
          //   properties:
          //     vehicle:
          //       type: array
          //       x-parser-schema-id: mySchemaVehicleArray
          //       items:
          //         - $ref: "#/components/schemas/Car"
          //         - $ref: "#/components/schemas/Airplane"

          // but if the items are anonymous
          //   properties:
          //     vehicle:
          //       type: array
          //       x-parser-schema-id: mySchemaVehicleArray <-- collision
          //       items:
          //         - type: object
          //           x-parser-schema-id: mySchemaVehicle
          //           properties:
          //             maxSpeed: 
          //               type: string
          //         - type: object
          //           x-parser-schema-id: mySchemaVehicle <-- collision
          //           properties:
          //             maxAltitude: 
          //               type: string
          //
          // would not work so we can not give code generator firendly id when `items`is an array.
          return null;
        }

        return options.parentId + upperFirst(propertyName);
      },
      callback: (subSchema, propOrIndex, callbackType, options) => {
        if (callbackType === SchemaIteratorCallbackType.END_SCHEMA) {
          return;
        }

        if (propOrIndex === null &&
          options.parentType === 'array' // Special edge case, here we need to inheritance the id to the childs.
        ) {
          propOrIndex = options.parentId;
        }

        if (propOrIndex === null) {
          return false;
        }

        if (!(subSchema.type() === 'object' ||
          subSchema.type() === 'array' ||
          (subSchema.type() === 'string' && subSchema.enum()) ||
          !subSchema.type() // oneOf, anyOf, allOf dont have a type.
        )) {
          // Simple types dont need generated ids.
          return false;
        }

        options.parentId = propOrIndex;
        options.parentType = subSchema.type();
        options.level++;

        if (!subSchema.$id()) {
          if (subSchema.json()[String(xParserSchemaIdLevel)] && subSchema.json()[String(xParserSchemaIdLevel)] < options.level) {
            // After deref we get a tree, always prefer names of parent root schema definitions.

            // The usage of $ref will lead to having the same schema multiple times in the tree caused by deref.
            // By walking through the tree, each level deper in the tree gets a higher xParserSchemaIdLevel
            // So if we find a generated id with a higher xParserSchemaIdLevel the the current, this id was generated because the current schema was used via $ref as subelement in another schema.
            // and we prefer the generated id that is clother to a rood node in tree.
            return false;
          }

          if (subSchema.type() === 'array') {
            // You want the shorter on the child, this is used by the code generator to define the class name.
            // Example:
            //   properties:
            //     pet:
            //       x-parser-schema-id: mySchemaPetArray <-- this is just a field of class "MySchema", so no need to get a great name
            //       x-parser-schema-id-level: 1 
            //       type: array
            //       items:
            //         x-parser-schema-id: mySchemaPet <-- This will be generated as a class "MySchemaPet"
            //         x-parser-schema-id-level: 2
            //         type: object
            //         properties:
            //           name: 
            //             type: string
            //           kind: 
            //             type: string
            subSchema.json()[String(xParserSchemaId)] = propOrIndex + 'Array';
          } else {
            subSchema.json()[String(xParserSchemaId)] = propOrIndex;
          }
          subSchema.json()[String(xParserSchemaIdLevel)] = options.level;
        }
      },
      schemaTypesToIterate: [
        'objects',
        'arrays',
        'allOf' // Will inherit the parent id, because it is a joined object.
      ],
      seenSchemas: new Set()
    }
  );
}

/**
* Assign uid to component parameters schemas
* 
* @private
* @param {AsyncAPIDocument} doc 
*/
function assignUidToComponentParameterSchemas(doc) {
  if (doc.hasComponents()) {
    assignIdToParameters(doc.components().parameters());
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
    if (m.name() === undefined && m.ext(xParserMessageName) === undefined) {
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

module.exports = {
  assignNameToComponentMessages,
  assignUidToParameterSchemas,
  assignUidToComponentSchemas,
  assignUidToComponentParameterSchemas,
  assignNameToAnonymousMessages,
  assignIdToAnonymousSchemas
};
