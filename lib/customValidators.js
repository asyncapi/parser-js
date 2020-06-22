const ParserError = require('./errors/parser-error');
const { getCurlyBracesEl, groupExistingElements } = require('./utils');

function validateServerVariables(parsedJSON) {
  const srvs = parsedJSON.servers;
  if (!srvs) return true;

  let providedVariables = [];
  let notProvidedVariables = [];

  Object.keys(srvs).forEach((server) => {
    console.log('srvs[server].url', srvs[server].url);
    const urlCurlyBraces = getCurlyBracesEl(srvs[server].url);
    console.log('urlCurlyBraces', urlCurlyBraces);
    if (!urlCurlyBraces) return;

    const declaredServerVariables = groupExistingElements(urlCurlyBraces, srvs[server].variables);
    
    if (declaredServerVariables.existEl.length) providedVariables = providedVariables.concat(declaredServerVariables.existEl); 
    if (declaredServerVariables.noEl.length) notProvidedVariables = notProvidedVariables.concat(declaredServerVariables.noEl);
    console.log('declaredServerVariables',declaredServerVariables);
  });
  
  if (notProvidedVariables.length) {
    throw new ParserError({
      type: 'validation-errors',
      title: `Server url has variables that are not described under variable object: ${notProvidedVariables}`,
      parsedJSON,
    });
  }

  return true;
}
  
function validateChannelParams(parsedJSON) {
  const chnls = parsedJSON.channels;
  if (!chnls) return true;
  
  let providedParams = [];
  let notProvidedParams = [];
    
  Object.keys(chnls).forEach((channel) => {
    const urlCurlyBraces = getCurlyBracesEl(channel);
    if (!urlCurlyBraces) return;
  
    const declaredChannelParams = groupExistingElements(urlCurlyBraces, chnls[channel].parameters);
  
    if (declaredChannelParams.existEl.length) providedParams = providedParams.concat(declaredChannelParams.existEl); 
    if (declaredChannelParams.noEl.length) notProvidedParams = notProvidedParams.concat(declaredChannelParams.noEl);
  });
    
  if (notProvidedParams.length) {
    throw new ParserError({
      type: 'validation-errors',
      title: `Channels key has parameters specified that are not described with parameter object: ${notProvidedParams}`,
      parsedJSON,
    });
  }

  return true;
}

module.exports = {
  validateChannelParams,
  validateServerVariables
};