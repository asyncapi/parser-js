const ParserError = require('./errors/parser-error');
const { parseUrlVariables, getMissingProps, groupValidationErrors } = require('./utils');

function validateServerVariables(parsedJSON, asyncapiYAMLorJSON, initialFormat) {
  const srvs = parsedJSON.servers;
  if (!srvs) return true;

  const notProvidedVariables = {};

  Object.keys(srvs).forEach((server) => {
    const variables = parseUrlVariables(srvs[server].url);
    if (!variables) return;

    const missingServerVariables = getMissingProps(variables, srvs[server].variables);
    if (missingServerVariables.length) notProvidedVariables[server] = notProvidedVariables[server] ? notProvidedVariables[server].concat(missingServerVariables) : missingServerVariables;
  });

  if (Object.keys(notProvidedVariables).length) {
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

  const notProvidedParams = {};
    
  Object.keys(chnls).forEach((channel) => {
    const variables = parseUrlVariables(channel);
    if (!variables) return;

    const missingChannelParams = getMissingProps(variables, chnls[channel].parameters);
  
    if (missingChannelParams.length) notProvidedParams[channel] = notProvidedParams[channel] ? notProvidedParams[channel].concat(missingChannelParams) : missingChannelParams;
  });

  if (Object.keys(notProvidedParams).length) {
    throw new ParserError({
      type: 'validation-errors',
      title: 'Not all channel parameters are described with parameter object',
      parsedJSON,
      validationErrors: groupValidationErrors('/channels/', 'channel does not have a corresponding parameter object for', notProvidedParams, asyncapiYAMLorJSON, initialFormat)
    });
  }

  return true;
}

module.exports = {
  validateChannelParams,
  validateServerVariables
};