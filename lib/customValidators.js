const ParserError = require('./errors/parser-error');
const { parseUrlVariables, getMissingProps, groupValidationErrors, tilde, parseUrlQueryParameters, setNotProvidedParams } = require('./utils');
const validationError = 'validation-errors';

/**
 * Validates if variables provided in the url have corresponding variable object defined
 * @private
 * @param  {Object} parsedJSON parsed AsyncAPI document
 * @param  {String} asyncapiYAMLorJSON AsyncAPI document in string
 * @param  {String} initialFormat information of the document was oryginally JSON or YAML
 * @returns {Boolean} true in case the document is valid, otherwise throws ParserError
 */
function validateServerVariables(parsedJSON, asyncapiYAMLorJSON, initialFormat) {
  const srvs = parsedJSON.servers;
  if (!srvs) return true;

  const srvsMap = new Map(Object.entries(srvs));
  const notProvidedVariables = new Map();

  srvsMap.forEach((val, key) => {
    const variables = parseUrlVariables(val.url);
    const notProvidedServerVars = notProvidedVariables.get(tilde(key));
    if (!variables) return;

    const missingServerVariables = getMissingProps(variables, val.variables);
    if (!missingServerVariables.length) return;

    notProvidedVariables.set(tilde(key),
      notProvidedServerVars
        ? notProvidedServerVars.concat(missingServerVariables)
        : missingServerVariables);
  });

  if (notProvidedVariables.size) {
    throw new ParserError({
      type: validationError,
      title: 'Not all server variables are described with variable object',
      parsedJSON,
      validationErrors: groupValidationErrors('servers', 'server does not have a corresponding variable object for', notProvidedVariables, asyncapiYAMLorJSON, initialFormat)
    });
  }

  return true;
}

/**
 * Validates if operationIds are duplicated in the document
 * 
 * @private
 * @param  {Object} parsedJSON parsed AsyncAPI document
 * @param  {String} asyncapiYAMLorJSON AsyncAPI document in string
 * @param  {String} initialFormat information of the document was oryginally JSON or YAML
 * @returns {Boolean} true in case the document is valid, otherwise throws ParserError
 */
function validateOperationId(parsedJSON, asyncapiYAMLorJSON, initialFormat, operations) {
  const chnls = parsedJSON.channels;
  if (!chnls) return true;
  const chnlsMap = new Map(Object.entries(chnls));
  //it is a map of paths, the one that is a duplicate and the one that is duplicated
  const duplicatedOperations = new Map();
  //is is a 2-dimentional array that holds information with operationId value and its path
  const allOperations = [];

  const addDuplicateToMap = (op, channelName, opName) => {
    const operationId = op.operationId;
    if (!operationId) return;

    const operationPath = `${tilde(channelName)}/${opName}/operationId`;
    const isOperationIdDuplicated = allOperations.filter(v => v[0] === operationId);
    if (!isOperationIdDuplicated.length) return allOperations.push([operationId, operationPath]);

    //isOperationIdDuplicated always holds one record and it is an array of paths, the one that is a duplicate and the one that is duplicated 
    duplicatedOperations.set(operationPath, isOperationIdDuplicated[0][1]);
  };

  chnlsMap.forEach((chnlObj, chnlName) => {
    operations.forEach(opName => {
      const op = chnlObj[String(opName)];
      if (op) addDuplicateToMap(op, chnlName, opName);
    });
  });

  if (duplicatedOperations.size) {
    throw new ParserError({
      type: validationError,
      title: 'operationId must be unique across all the operations.',
      parsedJSON,
      validationErrors: groupValidationErrors('channels', 'is a duplicate of', duplicatedOperations, asyncapiYAMLorJSON, initialFormat)
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
 * @param  {String} initialFormat information of the document was oryginally JSON or YAML
 * @param  {String[]} specialSecTypes list of security types that can have data in array
 * @returns {Boolean} true in case the document is valid, otherwise throws ParserError
 */
function validateServerSecurity(parsedJSON, asyncapiYAMLorJSON, initialFormat, specialSecTypes) {
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
    serverSecInfo.forEach(secObj => {
      Object.keys(secObj).forEach(secName => {
        //security schema is located in components object, we need to find if there is security schema with the same name as the server security info object
        const schema = findSecuritySchema(secName, parsedJSON.components);
        const srvrSecurityPath = `${serverName}/security/${secName}`;

        if (!schema.length) return missingSecSchema.set(srvrSecurityPath);

        //findSecuritySchema returns type always on index 1. Type is needed further to validate if server security info can be or not an empty array
        const schemaType = schema[1];
        if (!isSrvrSecProperArray(schemaType, specialSecTypes, secObj, secName)) invalidSecurityValues.set(srvrSecurityPath, schemaType);
      });
    });
  });

  if (missingSecSchema.size) {
    throw new ParserError({
      type: validationError,
      title: 'Server security name must correspond to a security scheme which is declared in the security schemes under the components object.',
      parsedJSON,
      validationErrors: groupValidationErrors(root, 'doesn\'t have a corresponding security schema under the components object', missingSecSchema, asyncapiYAMLorJSON, initialFormat)
    });
  }

  if (invalidSecurityValues.size) {
    throw new ParserError({
      type: validationError,
      title: 'Server security value must be an empty array if corresponding security schema type is not oauth2 or openIdConnect.',
      parsedJSON,
      validationErrors: groupValidationErrors(root, 'security info must have an empty array because its corresponding security schema type is', invalidSecurityValues, asyncapiYAMLorJSON, initialFormat)
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
  const secSchemesMap = secSchemes ? new Map(Object.entries(secSchemes)) : new Map();
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
 * Validates if parameters specified in the channel have corresponding parameters object defined and if name does not contain url parameters
 * 
 * @private
 * @param  {Object} parsedJSON parsed AsyncAPI document
 * @param  {String} asyncapiYAMLorJSON AsyncAPI document in string
 * @param  {String} initialFormat information of the document was oryginally JSON or YAML
 * @returns {Boolean} true in case the document is valid, otherwise throws ParserError
 */
function validateChannels(parsedJSON, asyncapiYAMLorJSON, initialFormat) {
  const chnls = parsedJSON.channels;
  if (!chnls) return true;

  const chnlsMap = new Map(Object.entries(chnls));
  const notProvidedParams = new Map(); //return object for missing parameters
  const invalidChannelName = new Map(); //return object for invalid channel names with query parameters

  chnlsMap.forEach((val, key) => {
    const variables = parseUrlVariables(key);
    const notProvidedChannelParams = notProvidedParams.get(tilde(key));
    const queryParameters = parseUrlQueryParameters(key);
    
    //channel variable validation: fill return obeject with missing parameters
    if (variables) {
      setNotProvidedParams(variables, val, key, notProvidedChannelParams, notProvidedParams);
    }

    //channel name validation: fill return object with channels containing query parameters
    if (queryParameters) {
      invalidChannelName.set(tilde(key),
        queryParameters);
    }
  });

  //combine validation errors of both checks and output them as one array
  const parameterValidationErrors = groupValidationErrors('channels', 'channel does not have a corresponding parameter object for', notProvidedParams, asyncapiYAMLorJSON, initialFormat);
  const nameValidationErrors = groupValidationErrors('channels', 'channel contains invalid name with url query parameters', invalidChannelName, asyncapiYAMLorJSON, initialFormat);
  const allValidationErrors = parameterValidationErrors.concat(nameValidationErrors);

  //channel variable validation: throw exception if channel validation failes
  if (notProvidedParams.size || invalidChannelName.size) {
    throw new ParserError({
      type: validationError,
      title: 'Channel validation failed',
      parsedJSON,
      validationErrors: allValidationErrors 
    });
  }

  return true;
}

module.exports = {
  validateServerVariables,
  validateOperationId,
  validateServerSecurity,
  validateChannels
};
