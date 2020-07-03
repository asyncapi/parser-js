const ParserError = require('./errors/parser-error');
const { parseUrlVariables, getMissingProps, groupValidationErrors } = require('./utils');

function validateServerVariables(parsedJSON, asyncapiYAMLorJSON, initialFormat) {
  const srvs = parsedJSON.servers;
  if (!srvs) return true;

  const srvsMap = new Map(Object.entries(srvs));
  const notProvidedVariables = new Map();

  srvsMap.forEach((val, key) => {
    const variables = parseUrlVariables(val.url);
    const notProvidedServerVars = notProvidedVariables.get(key);
    if (!variables) return;

    const missingServerVariables = getMissingProps(variables, val.variables);
    if (!missingServerVariables.length) return;

    notProvidedVariables.set(key, 
      notProvidedServerVars 
        ? notProvidedServerVars.concat(missingServerVariables) 
        : missingServerVariables);
  });

  if (notProvidedVariables.size > 0) {
    throw new ParserError({
      type: 'validation-errors',
      title: 'Not all server variables are described with variable object',
      parsedJSON,
      validationErrors: groupValidationErrors('/servers/', 'server does not have a corresponding variable object for', notProvidedVariables, asyncapiYAMLorJSON, initialFormat)
    });
  }

  return true;
}
  
function validateChannelParams(parsedJSON, asyncapiYAMLorJSON, initialFormat) {
  const chnls = parsedJSON.channels;
  if (!chnls) return true;

  const chnlsMap = new Map(Object.entries(chnls));
  const notProvidedParams = new Map();
    
  chnlsMap.forEach((val, key) => {
    const variables = parseUrlVariables(key);
    const notProvidedChannelParams = notProvidedParams.get(key);
    if (!variables) return;

    const missingChannelParams = getMissingProps(variables, val.parameters);
  
    if (!missingChannelParams.length) return;

    notProvidedParams.set(key, 
      notProvidedChannelParams 
        ? notProvidedChannelParams.concat(missingChannelParams) 
        : missingChannelParams);
  });

  if (notProvidedParams.size > 0) {
    throw new ParserError({
      type: 'validation-errors',
      title: 'Not all channel parameters are described with parameter object',
      parsedJSON,
      validationErrors: groupValidationErrors('/channels/', 'channel does not have a corresponding parameter object for', notProvidedParams, asyncapiYAMLorJSON, initialFormat)
    });
  }

  return true;
}

function validateOperationId(parsedJSON) {
  const chnls = parsedJSON.channels;
  if (!chnls) return true;

  const allOperations = [];

  const chnlsMap = new Map(Object.entries(chnls));

  chnlsMap.forEach((val,key) => {
    const sub = val.subscribe;
    const pub = val.publish;
    if (sub) allOperations.push(sub.operationId);
    if (pub) allOperations.push(pub.operationId);
  });

  const noDuplicates = new Set(allOperations);

  if (noDuplicates.size < allOperations.length) {
    throw new ParserError({
      type: 'validation-errors',
      title: 'operationId must be unique across all the operations.',
      parsedJSON,
      //validationErrors: groupValidationErrors('/channels/', 'channel does not have a corresponding parameter object for', notProvidedParams, asyncapiYAMLorJSON, initialFormat)
    });
  }

  return true;
}

module.exports = {
  validateChannelParams,
  validateServerVariables,
  validateOperationId
};