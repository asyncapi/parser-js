const {xParserMessageName, xParserSchemaId} = require('./constants');
const {traverseAsyncApiDocument} = require('./iterators');

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
 */
function assignUidToComponentSchemas(doc) {
  if (doc.hasComponents()) {
    for (const [key, s] of Object.entries(doc.components().schemas())) {
      s.json()[String(xParserSchemaId)] = key;
    }
  }
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
