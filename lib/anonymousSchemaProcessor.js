
function schemaIdNamingRules(rootSchemaUid) {
  let cumulativeSchemaUid = rootSchemaUid;
  return (schema, propName, callbackType) => {
    let pureSchemaUid = '';
    if (propName) {
      pureSchemaUid += `${propName}Property`;
    }
    if (schema.type()) {
      pureSchemaUid += schema.type();
    }
    if (schema.allOf()) {
      pureSchemaUid += 'AllOf';
    }
    if (schema.anyOf()) {
      pureSchemaUid += 'AnyOf';
    }
    if (schema.oneOf()) {
      pureSchemaUid += 'OneOf';
    }
    if (callbackType === SchemaIteratorCallbackType.END_SCHEMA) {
      cumulativeSchemaUid = cumulativeSchemaUid.replace(pureSchemaUid, '');
    }
    if (!schema.uid()) {
      cumulativeSchemaUid += pureSchemaUid;
      schema.json()[String(xParserSchemaId)] = cumulativeSchemaUid;
    } else {
      //Should we use that uid as the root schema uid instead? 
      cumulativeSchemaUid = schema.uid();
    }
  };
};
  
/**
   * Gives anonymous message payload and header schemas id
   * 
   * @private
   * @param {AsyncAPIDocument} doc 
   */
function assignIdToAnonymousMessageSchemas(doc) {
  // Traverse all root schemas in message payloads and headers and generate ids.
  const messages = doc.allMessages();
  for (const [messageName, message] of messages.entries()) {
    const messagePayloadSchema = message.payload();
    const messageUid = `${messageName}Payload`;
    if (messagePayloadSchema !== undefined && !messagePayloadSchema.uid()) {
      messagePayloadSchema.json()[String(xParserSchemaId)] = messageUid;
    }
    //Iterate nested schemas
    traverseSchema(messagePayloadSchema, schemaIdNamingRules(messageUid));
  
    //Assign root header schemas with correct uids
    const messageHeaderSchema = message.headers();
    if (messageHeaderSchema === null) {
      continue;
    }
    let messageHeaderUid = `${messageName}Header`;
    if (messageHeaderSchema.uid()) {
      messageHeaderUid = messageHeaderSchema.uid();
    }
    messageHeaderSchema.json()[String(xParserSchemaId)] = messageHeaderUid;
    traverseSchema(messageHeaderSchema, schemaIdNamingRules(messageHeaderUid));
  }
}
  
/**
   * Gives schemas id to all anonymous schemas.
   * 
   * @private
   * @param {AsyncAPIDocument} doc 
   */
function assignIdToAnonymousSchemas(doc) {
  assignIdToAnonymousMessageSchemas(doc);
  doc.channelNames().forEach((channelName) => {
    const channel = doc.channel(channelName);
    //Assign root parameter schemas with correct uids.
    for (const [parameterName, parameter] of Object.entries(channel.parameters())) {
      const parameterSchema = parameter.schema();
      let rootSchemaUid = `${channelName}Channel${parameterName}Parameter`;
      if (parameterSchema.uid()) {
        rootSchemaUid = parameterSchema.uid();
      } else {
        parameterSchema.json()[String(xParserSchemaId)] = rootSchemaUid;
      }
      traverseSchema(parameterSchema, schemaIdNamingRules(rootSchemaUid));
    }
  });
  
  //Traverse component schemas
  if (doc.hasComponents()) {
    const componentSchemas = doc.components().schemas();
    for (const [schemaName, schema] of Object.entries(componentSchemas)) {
      traverseSchema(schema, schemaIdNamingRules(`${schemaName}ComponentSchema`));
    }
  }
}
  