const ParserError = require('./errors/parser-error');
// eslint-disable-next-line no-unused-vars
const Operation = require('./models/operation');
const {
  parseUrlVariables,
  getMissingProps,
  groupValidationErrors,
  tilde,
  parseUrlQueryParameters,
  setNotProvidedParams,
  getUnknownServers
} = require('./utils');
const validationError = 'validation-errors';

/**
 * Validates if variables provided in the url have corresponding variable object defined and if example is correct
 * @private
 * @param  {Object} parsedJSON parsed AsyncAPI document
 * @param  {String} asyncapiYAMLorJSON AsyncAPI document in string
 * @param  {String} initialFormat information of the document was originally JSON or YAML
 * @returns {Boolean} true in case the document is valid, otherwise throws {@link ParserError}
 */
function validateServerVariables(
  parsedJSON,
  asyncapiYAMLorJSON,
  initialFormat
) {
  const srvs = parsedJSON.servers;
  if (!srvs) return true;

  const srvsMap = new Map(Object.entries(srvs));
  const notProvidedVariables = new Map();
  const notProvidedExamplesInEnum = new Map();

  srvsMap.forEach((srvr, srvrName) => {
    const variables = parseUrlVariables(srvr.url);
    const variablesObj = srvr.variables;
    const notProvidedServerVars = notProvidedVariables.get(tilde(srvrName));
    if (!variables) return;

    const missingServerVariables = getMissingProps(variables, variablesObj);
    if (missingServerVariables.length) {
      notProvidedVariables.set(
        tilde(srvrName),
        notProvidedServerVars
          ? notProvidedServerVars.concat(missingServerVariables)
          : missingServerVariables
      );
    }

    if (variablesObj) {
      setNotValidExamples(variablesObj, srvrName, notProvidedExamplesInEnum);
    }
  });

  if (notProvidedVariables.size) {
    throw new ParserError({
      type: validationError,
      title: 'Not all server variables are described with variable object',
      parsedJSON,
      validationErrors: groupValidationErrors(
        'servers',
        'server does not have a corresponding variable object for',
        notProvidedVariables,
        asyncapiYAMLorJSON,
        initialFormat
      ),
    });
  }

  if (notProvidedExamplesInEnum.size) {
    throw new ParserError({
      type: validationError,
      title:
        'Check your server variables. The example does not match the enum list',
      parsedJSON,
      validationErrors: groupValidationErrors(
        'servers',
        'server variable provides an example that does not match the enum list',
        notProvidedExamplesInEnum,
        asyncapiYAMLorJSON,
        initialFormat
      ),
    });
  }

  return true;
}

/**
 * extend map with info about examples that are not part of the enum
 *
 * @function setNotValidExamples
 * @private
 * @param  {Array<Object>} variables server variables object
 * @param  {String} srvrName name of the server where variables object is located
 * @param  {Map} notProvidedExamplesInEnum result map of all wrong examples and what variable they belong to
 */
function setNotValidExamples(variables, srvrName, notProvidedExamplesInEnum) {
  const variablesMap = new Map(Object.entries(variables));
  variablesMap.forEach((variable, variableName) => {
    if (variable.enum && variable.examples) {
      const wrongExamples = variable.examples.filter(r => !variable.enum.includes(r));
      if (wrongExamples.length) {
        notProvidedExamplesInEnum.set(
          `${tilde(srvrName)}/variables/${tilde(variableName)}`,
          wrongExamples
        );
      }
    }
  });
}

/**
 * Validates if operationIds are duplicated in the document
 *
 * @private
 * @param  {Object} parsedJSON parsed AsyncAPI document
 * @param  {String} asyncapiYAMLorJSON AsyncAPI document in string
 * @param  {String} initialFormat information of the document was originally JSON or YAML
 * @returns {Boolean} true in case the document is valid, otherwise throws {@link ParserError}
 */
function validateOperationId(
  parsedJSON,
  asyncapiYAMLorJSON,
  initialFormat,
  operations
) {
  const chnls = parsedJSON.channels;
  if (!chnls) return true;
  const chnlsMap = new Map(Object.entries(chnls));
  //it is a map of paths, the one that is a duplicate and the one that is duplicated
  const duplicatedOperations = new Map();
  //is is a 2-dimensional array that holds information with operationId value and its path
  const allOperations = [];

  const addDuplicateToMap = (op, channelName, opName) => {
    const operationId = op.operationId;
    if (!operationId) return;

    const operationPath = `${tilde(channelName)}/${opName}/operationId`;
    const isOperationIdDuplicated = allOperations.filter(
      (v) => v[0] === operationId
    );
    if (!isOperationIdDuplicated.length)
      return allOperations.push([operationId, operationPath]);

    //isOperationIdDuplicated always holds one record and it is an array of paths, the one that is a duplicate and the one that is duplicated
    duplicatedOperations.set(operationPath, isOperationIdDuplicated[0][1]);
  };

  chnlsMap.forEach((chnlObj, chnlName) => {
    operations.forEach((opName) => {
      const op = chnlObj[String(opName)];
      if (op) addDuplicateToMap(op, chnlName, opName);
    });
  });

  if (duplicatedOperations.size) {
    throw new ParserError({
      type: validationError,
      title: 'operationId must be unique across all the operations.',
      parsedJSON,
      validationErrors: groupValidationErrors(
        'channels',
        'is a duplicate of',
        duplicatedOperations,
        asyncapiYAMLorJSON,
        initialFormat
      ),
    });
  }

  return true;
}

/**
 * Validates if messageIds are duplicated in the document
 *
 * @private
 * @param  {Object} parsedJSON parsed AsyncAPI document
 * @param  {String} asyncapiYAMLorJSON AsyncAPI document in string
 * @param  {String} initialFormat information of the document was originally JSON or YAML
 * @returns {Boolean} true in case the document is valid, otherwise throws {@link ParserError}
 */
function validateMessageId(
  parsedJSON,
  asyncapiYAMLorJSON,
  initialFormat,
  operations
) {
  const chnls = parsedJSON.channels;
  if (!chnls) return true;
  const chnlsMap = new Map(Object.entries(chnls));
  //it is a map of paths, the one that is a duplicate and the one that is duplicated
  const duplicatedMessages = new Map();
  //is is a 2-dimensional array that holds information with messageId value and its path
  const allMessages = [];

  const addDuplicateToMap = (msg, channelName, opName, oneOf = '') => {
    const messageId = msg.messageId;
    if (!messageId) return;

    const messagePath = `${tilde(channelName)}/${opName}/message${oneOf}/messageId`;
    const isMessageIdDuplicated = allMessages.find(v => v[0] === messageId);
    if (!isMessageIdDuplicated)
      return allMessages.push([messageId, messagePath]);

    //isMessageIdDuplicated always holds one record and it is an array of paths, the one that is a duplicate and the one that is duplicated
    duplicatedMessages.set(messagePath, isMessageIdDuplicated[1]);
  };

  chnlsMap.forEach((chnlObj, chnlName) => {
    operations.forEach((opName) => {
      const op = chnlObj[String(opName)];
      if (op && op.message) {
        if (op.message.oneOf) op.message.oneOf.forEach((msg, index) => addDuplicateToMap(msg, chnlName, opName , `/oneOf/${index}`));
        else addDuplicateToMap(op.message, chnlName, opName);
      }
    });
  });

  if (duplicatedMessages.size) {
    throw new ParserError({
      type: validationError,
      title: 'messageId must be unique across all the messages.',
      parsedJSON,
      validationErrors: groupValidationErrors(
        'channels',
        'is a duplicate of',
        duplicatedMessages,
        asyncapiYAMLorJSON,
        initialFormat
      ),
    });
  }

  return true;
}

/**
 * Validates if server security is declared properly and the name has a corresponding security schema definition in components with the same name
 *
 * @private
 * @param  {Object} parsedJSON parsed AsyncAPI document
 * @param  {String} asyncapiYAMLorJSON AsyncAPI document in string
 * @param  {String} initialFormat information of the document was originally JSON or YAML
 * @param  {String[]} specialSecTypes list of security types that can have data in array
 * @returns {Boolean} true in case the document is valid, otherwise throws {@link ParserError}
 */
function validateServerSecurity(
  parsedJSON,
  asyncapiYAMLorJSON,
  initialFormat,
  specialSecTypes
) {
  const srvs = parsedJSON.servers;
  if (!srvs) return true;

  const root = 'servers';
  const srvsMap = new Map(Object.entries(srvs));

  const missingSecSchema = new Map(),
    invalidSecurityValues = new Map();

  //we need to validate every server specified in the document
  srvsMap.forEach((server, serverName) => {
    const serverSecInfo = server.security;

    if (!serverSecInfo) return true;

    //server security info is an array of many possible values
    serverSecInfo.forEach((secObj) => {
      Object.keys(secObj).forEach((secName) => {
        //security schema is located in components object, we need to find if there is security schema with the same name as the server security info object
        const schema = findSecuritySchema(secName, parsedJSON.components);
        const srvrSecurityPath = `${serverName}/security/${secName}`;

        if (!schema.length) return missingSecSchema.set(srvrSecurityPath);

        //findSecuritySchema returns type always on index 1. Type is needed further to validate if server security info can be or not an empty array
        const schemaType = schema[1];
        if (!isSrvrSecProperArray(schemaType, specialSecTypes, secObj, secName))
          invalidSecurityValues.set(srvrSecurityPath, schemaType);
      });
    });
  });

  if (missingSecSchema.size) {
    throw new ParserError({
      type: validationError,
      title:
        'Server security name must correspond to a security scheme which is declared in the security schemes under the components object.',
      parsedJSON,
      validationErrors: groupValidationErrors(
        root,
        'doesn\'t have a corresponding security schema under the components object',
        missingSecSchema,
        asyncapiYAMLorJSON,
        initialFormat
      ),
    });
  }

  if (invalidSecurityValues.size) {
    throw new ParserError({
      type: validationError,
      title:
        'Server security value must be an empty array if corresponding security schema type is not oauth2 or openIdConnect.',
      parsedJSON,
      validationErrors: groupValidationErrors(
        root,
        'security info must have an empty array because its corresponding security schema type is',
        invalidSecurityValues,
        asyncapiYAMLorJSON,
        initialFormat
      ),
    });
  }

  return true;
}

/**
 * Searches for server security corresponding object in security schema object
 * @private
 * @param  {String} securityName name of the server security element that you want to localize in the security schema object
 * @param  {Object} components components object from the AsyncAPI document
 * @returns {String[]} there are 2 elements in array, index 0 is the name of the security schema object and index 1 is it's type
 */
function findSecuritySchema(securityName, components) {
  const secSchemes = components && components.securitySchemes;
  const secSchemesMap = secSchemes
    ? new Map(Object.entries(secSchemes))
    : new Map();
  const schemaInfo = [];

  //using for loop here as there is no point to iterate over all entries as it is enough to find first matching element
  for (const [schemaName, schema] of secSchemesMap.entries()) {
    if (schemaName === securityName) {
      schemaInfo.push(schemaName, schema.type);
      return schemaInfo;
    }
  }
  return schemaInfo;
}

/**
 * Validates if given server security is a proper empty array when security type requires it
 * @private
 * @param  {String} schemaType security type, like httpApiKey or userPassword
 * @param  {String[]} specialSecTypes list of special types that do not have to be an empty array
 * @param  {Object} secObj server security object
 * @param  {String} secName name os server security object
 * @returns {String[]} there are 2 elements in array, index 0 is the name of the security schema object and index 1 is it's type
 */
function isSrvrSecProperArray(schemaType, specialSecTypes, secObj, secName) {
  if (!specialSecTypes.includes(schemaType)) {
    const securityObjValue = secObj[String(secName)];

    return !securityObjValue.length;
  }

  return true;
}

/**
 * Validates if parameters specified in the channel have corresponding parameters object defined and if name does not contain url parameters.
 * Also validates that all servers listed for this channel are declared in the top-level servers object.
 *
 * @private
 * @param  {Object} parsedJSON parsed AsyncAPI document
 * @param  {String} asyncapiYAMLorJSON AsyncAPI document in string
 * @param  {String} initialFormat information of the document was originally JSON or YAML
 * @returns {Boolean} true in case the document is valid, otherwise throws {@link ParserError}
 */
function validateChannels(parsedJSON, asyncapiYAMLorJSON, initialFormat) {
  const chnls = parsedJSON.channels;
  if (!chnls) return true;

  const chnlsMap = new Map(Object.entries(chnls));
  const notProvidedParams = new Map(); //return object for missing parameters
  const invalidChannelName = new Map(); //return object for invalid channel names with query parameters
  const unknownServers = new Map(); //return object for server names not declared in top-level servers object

  chnlsMap.forEach((val, key) => {
    const variables = parseUrlVariables(key);
    const notProvidedChannelParams = notProvidedParams.get(tilde(key));
    const queryParameters = parseUrlQueryParameters(key);
    const unknownServerNames = getUnknownServers(parsedJSON, val);

    //channel variable validation: fill return object with missing parameters
    if (variables) {
      setNotProvidedParams(
        variables,
        val,
        key,
        notProvidedChannelParams,
        notProvidedParams
      );
    }

    //channel name validation: fill return object with channels containing query parameters
    if (queryParameters) {
      invalidChannelName.set(tilde(key), queryParameters);
    }

    //server validation: fill return object with unknown server names
    if (unknownServerNames.length > 0) {
      unknownServers.set(tilde(key), unknownServerNames);
    }
  });

  //combine validation errors of both checks and output them as one array
  const parameterValidationErrors = groupValidationErrors(
    'channels',
    'channel does not have a corresponding parameter object for',
    notProvidedParams,
    asyncapiYAMLorJSON,
    initialFormat
  );
  const nameValidationErrors = groupValidationErrors(
    'channels',
    'channel contains invalid name with url query parameters',
    invalidChannelName,
    asyncapiYAMLorJSON,
    initialFormat
  );
  const serverValidationErrors = groupValidationErrors(
    'channels',
    'channel contains servers that are not on the servers list in the root of the document',
    unknownServers,
    asyncapiYAMLorJSON,
    initialFormat
  );
  const allValidationErrors = parameterValidationErrors.concat(nameValidationErrors).concat(serverValidationErrors);

  //channel variable validation: throw exception if channel validation fails
  if (notProvidedParams.size || invalidChannelName.size || unknownServers.size) {
    throw new ParserError({
      type: validationError,
      title: 'Channel validation failed',
      parsedJSON,
      validationErrors: allValidationErrors,
    });
  }

  return true;
}

/**
 * Validates if tags specified in the following objects have no duplicates: root, operations, operation traits, channels,
 * messages and message traits.
 *
 * @private
 * @param {Object} parsedJSON parsed AsyncAPI document
 * @param {String} asyncapiYAMLorJSON AsyncAPI document in string
 * @param {String} initialFormat information of the document was originally JSON or YAML
 * @returns {Boolean} true in case the document is valid, otherwise throws {@link ParserError}
 */
function validateTags(parsedJSON, asyncapiYAMLorJSON, initialFormat) {
  const invalidRoot = validateRootTags(parsedJSON);
  const invalidChannels = validateAllChannelsTags(parsedJSON);
  const invalidOperationTraits = validateOperationTraitTags(parsedJSON);
  const invalidMessages = validateMessageTags(parsedJSON);
  const invalidMessageTraits = validateMessageTraitsTags(parsedJSON);
  const errorMessage = 'contains duplicate tag names';

  let invalidRootValidationErrors = [];
  let invalidChannelsValidationErrors = [];
  let invalidOperationTraitsValidationErrors = [];
  let invalidMessagesValidationErrors = [];
  let invalidMessageTraitsValidationErrors = [];

  if (invalidRoot.size) {
    invalidRootValidationErrors = groupValidationErrors(
      null,
      errorMessage,
      invalidRoot,
      asyncapiYAMLorJSON,
      initialFormat
    );
  }

  if (invalidChannels.size) {
    invalidChannelsValidationErrors = groupValidationErrors(
      'channels',
      errorMessage,
      invalidChannels,
      asyncapiYAMLorJSON,
      initialFormat
    );
  }

  if (invalidOperationTraits.size) {
    invalidOperationTraitsValidationErrors = groupValidationErrors(
      'components',
      errorMessage,
      invalidOperationTraits,
      asyncapiYAMLorJSON,
      initialFormat
    );
  }

  if (invalidMessages.size) {
    invalidMessagesValidationErrors = groupValidationErrors(
      'components',
      errorMessage,
      invalidMessages,
      asyncapiYAMLorJSON,
      initialFormat
    );
  }

  if (invalidMessageTraits.size) {
    invalidMessageTraitsValidationErrors = groupValidationErrors(
      'components',
      errorMessage,
      invalidMessageTraits,
      asyncapiYAMLorJSON,
      initialFormat
    );
  }

  const allValidationErrors = invalidRootValidationErrors
    .concat(invalidChannelsValidationErrors)
    .concat(invalidOperationTraitsValidationErrors)
    .concat(invalidMessagesValidationErrors)
    .concat(invalidMessageTraitsValidationErrors);

  if (allValidationErrors.length) {
    throw new ParserError({
      type: validationError,
      title: 'Tags validation failed',
      parsedJSON,
      validationErrors: allValidationErrors,
    });
  }

  return true;
}

function validateRootTags(parsedJSON) {
  const invalidRoot = new Map();
  const duplicateNames = parsedJSON.tags && getDuplicateTagNames(parsedJSON.tags);

  if (duplicateNames && duplicateNames.length) {
    invalidRoot.set('tags', duplicateNames.toString());
  }

  return invalidRoot;
}

function validateOperationTraitTags(parsedJSON) {
  const invalidOperationTraits = new Map();

  if (parsedJSON && parsedJSON.components && parsedJSON.components.operationTraits) {
    Object.keys(parsedJSON.components.operationTraits).forEach((operationTrait) => {
      // eslint-disable-next-line security/detect-object-injection
      const duplicateNames = getDuplicateTagNames(parsedJSON.components.operationTraits[operationTrait].tags);

      if (duplicateNames && duplicateNames.length) {
        const operationTraitsPath = `operationTraits/${operationTrait}/tags`;
        invalidOperationTraits.set(
          operationTraitsPath,
          duplicateNames.toString()
        );
      }
    });
  }

  return invalidOperationTraits;
}

function validateAllChannelsTags(parsedJSON) {
  const chnls = parsedJSON.channels;
  if (!chnls) return true;

  const chnlsMap = new Map(Object.entries(chnls));
  const invalidChannels = new Map();
  chnlsMap.forEach((channel, channelName) => validateChannelTags(invalidChannels, channel, channelName));

  return invalidChannels;
}

function validateChannelTags(invalidChannels, channel, channelName) {
  if (channel.publish) {
    validateOperationTags(invalidChannels, channel.publish, `${tilde(channelName)}/publish`);
  }

  if (channel.subscribe) {
    validateOperationTags(invalidChannels, channel.subscribe, `${tilde(channelName)}/subscribe`);
  }
}

/**
 * Check tags in operation and in message.
 *
 * @private
 * @param {Map} invalidChannels map with invalid channel entries
 * @param {Operation} operation operation object
 * @param {String} operationPath operation path
 */
function validateOperationTags(invalidChannels, operation, operationPath) {
  if (!operation) return;

  tryAddInvalidEntries(invalidChannels, `${operationPath}/tags`, operation.tags);

  if (operation.message) {
    if (operation.message.oneOf) {
      operation.message.oneOf.forEach((message, idx) => {
        tryAddInvalidEntries(invalidChannels, `${operationPath}/message/oneOf/${idx}/tags`, message.tags);
      });
    } else {
      tryAddInvalidEntries(invalidChannels, `${operationPath}/message/tags`, operation.message.tags);
    }
  }
}

function tryAddInvalidEntries(invalidChannels, key, tags) {
  const duplicateNames = tags && getDuplicateTagNames(tags);
  if (duplicateNames && duplicateNames.length) {
    invalidChannels.set(key, duplicateNames.toString());
  }
}

function validateMessageTraitsTags(parsedJSON) {
  const invalidMessageTraits = new Map();

  if (parsedJSON && parsedJSON.components && parsedJSON.components.messageTraits) {
    Object.keys(parsedJSON.components.messageTraits).forEach((messageTrait) => {
      // eslint-disable-next-line security/detect-object-injection
      const duplicateNames = getDuplicateTagNames(parsedJSON.components.messageTraits[messageTrait].tags);

      if (duplicateNames && duplicateNames.length) {
        const messageTraitsPath = `messageTraits/${messageTrait}/tags`;
        invalidMessageTraits.set(messageTraitsPath, duplicateNames.toString());
      }
    });
  }

  return invalidMessageTraits;
}

function validateMessageTags(parsedJSON) {
  const invalidMessages = new Map();

  if (parsedJSON && parsedJSON.components && parsedJSON.components.messages) {
    Object.keys(parsedJSON.components.messages).forEach((message) => {
      // eslint-disable-next-line security/detect-object-injection
      const duplicateNames = getDuplicateTagNames(parsedJSON.components.messages[message].tags);

      if (duplicateNames && duplicateNames.length) {
        const messagePath = `messages/${message}/tags`;
        invalidMessages.set(messagePath, duplicateNames.toString());
      }
    });
  }

  return invalidMessages;
}

function getDuplicateTagNames(tags) {
  if (!tags) return null;

  const tagNames = tags.map((item) => item.name);
  return tagNames.reduce((acc, item, idx, arr) => {
    if (arr.indexOf(item) !== idx && acc.indexOf(item) < 0) {
      acc.push(item);
    }
    return acc;
  }, []);
}

module.exports = {
  validateServerVariables,
  validateOperationId,
  validateMessageId,
  validateServerSecurity,
  validateChannels,
  validateTags,
};
