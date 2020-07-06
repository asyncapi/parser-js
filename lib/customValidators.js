const ParserError = require('./errors/parser-error');
const { parseUrlVariables, getMissingProps, groupValidationErrors, tilde } = require('./utils');
const validationError = 'validation-errors';

/**
 * Validates if variables provided in the url have corresponding variable object defined
 * 
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
 * Validates if parameters specified in the channel have corresponding parameters object defined
 * 
 * @param  {Object} parsedJSON parsed AsyncAPI document
 * @param  {String} asyncapiYAMLorJSON AsyncAPI document in string
 * @param  {String} initialFormat information of the document was oryginally JSON or YAML
 * @returns {Boolean} true in case the document is valid, otherwise throws ParserError
 */
function validateChannelParams(parsedJSON, asyncapiYAMLorJSON, initialFormat) {
  const chnls = parsedJSON.channels;
  if (!chnls) return true;

  const chnlsMap = new Map(Object.entries(chnls));
  const notProvidedParams = new Map();
    
  chnlsMap.forEach((val, key) => {
    const variables = parseUrlVariables(key);
    const notProvidedChannelParams = notProvidedParams.get(tilde(key));
    if (!variables) return;

    const missingChannelParams = getMissingProps(variables, val.parameters);
  
    if (!missingChannelParams.length) return;

    notProvidedParams.set(tilde(key), 
      notProvidedChannelParams 
        ? notProvidedChannelParams.concat(missingChannelParams) 
        : missingChannelParams);
  });

  if (notProvidedParams.size) {
    throw new ParserError({
      type: validationError,
      title: 'Not all channel parameters are described with parameter object',
      parsedJSON,
      validationErrors: groupValidationErrors('channels', 'channel does not have a corresponding parameter object for', notProvidedParams, asyncapiYAMLorJSON, initialFormat)
    });
  }

  return true;
}

/**
 * Validates if operationIds are duplicated in the document
 * 
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
    const operationPath = `${ tilde(channelName) }/${ opName }/operationId`;
    const isOperationIdDuplicated = allOperations.filter(v =>  v[0] === operationId);
    if (!isOperationIdDuplicated.length) return allOperations.push([operationId, operationPath]);
    
    //isOperationIdDuplicated always holds one record and it is an array of paths, the one that is a duplicate and the one that is duplicated 
    duplicatedOperations.set(operationPath, isOperationIdDuplicated[0][1]); 
  };

  chnlsMap.forEach((chnlObj,chnlName) => {
    operations.forEach(opName => {
      const op = chnlObj[opName];
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

module.exports = {
  validateChannelParams,
  validateServerVariables,
  validateOperationId
};