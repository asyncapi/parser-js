const YAML = require('js-yaml');

module.exports.normalizeContentType = (contentType) => {
  if (contentType && contentType.parameterList) {
    contentType.parameterList.forEach((param) => {
      param.separator = param.separator.trim();
    });
  }

  return contentType;
};

module.exports.toJS = (asyncapiYAMLorJSON) => {
  if (!asyncapiYAMLorJSON) {
    throw new Error(`Document can't be null, false or empty.`);
  }

  if (typeof asyncapiYAMLorJSON === 'object') {
    return asyncapiYAMLorJSON;
  }

  try {
    return JSON.parse(asyncapiYAMLorJSON);
  } catch (e) {
    try {
      return YAML.safeLoad(asyncapiYAMLorJSON);
    } catch (err) {
      throw new Error('Document has to be either JSON or YAML.');
    }
  }
};