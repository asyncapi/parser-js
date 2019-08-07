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

module.exports.createMapOfType = (obj, Type) => {
  const result = {};
  if (!obj) return result;

  Object.keys(obj).forEach(key => {
    result[key] = new Type(obj[key]);
  });

  return result;
};

module.exports.getMapKeyOfType = (obj, key, Type) => {
  if (!obj) return null;
  if (!obj[key]) return null;
  return new Type(obj[key]);
};
