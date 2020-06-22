const ParserError = require('./errors/parser-error');
const { getCurlyBracesEl, groupExistingElements, groupValidationErrors } = require('./utils');

function validateServerVariables(parsedJSON, asyncapiYAMLorJSON, initialFormat) {
  const srvs = parsedJSON.servers;
  if (!srvs) return true;

  let providedVariables = [];
  const notProvidedVariables = {};

  Object.keys(srvs).forEach((server) => {
    const urlCurlyBraces = getCurlyBracesEl(srvs[server].url);
    if (!urlCurlyBraces) return;

    const declaredServerVariables = groupExistingElements(urlCurlyBraces, srvs[server].variables);
    
    if (declaredServerVariables.existEl.length) providedVariables = providedVariables.concat(declaredServerVariables.existEl); 
    if (declaredServerVariables.noEl.length) notProvidedVariables[server] = notProvidedVariables[server] ? notProvidedVariables[server].concat(declaredServerVariables.noEl) : declaredServerVariables.noEl;
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

  let providedParams = [];
  const notProvidedParams = {};
    
  Object.keys(chnls).forEach((channel) => {
    const urlCurlyBraces = getCurlyBracesEl(channel);
    if (!urlCurlyBraces) return;

    const declaredChannelParams = groupExistingElements(urlCurlyBraces, chnls[channel].parameters);
  
    if (declaredChannelParams.existEl.length) providedParams = providedParams.concat(declaredChannelParams.existEl); 
    if (declaredChannelParams.noEl.length) notProvidedParams[channel] = notProvidedParams[channel] ? notProvidedParams[channel].concat(declaredChannelParams.noEl) : declaredChannelParams.noEl;
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