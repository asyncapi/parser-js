const YAML = require('js-yaml');

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
      err.message = `Document has to be either JSON or YAML: ${err.message}`;
      throw err;
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

module.exports.addExtensions = (obj) => {
  obj.prototype.extensions = function () {
    const result = {};
    Object.keys(this._json).forEach(key => {
      if (/^x-[\w\d\.\-\_]+$/.test(key)) {
        result[key] = this._json[key];
      }
    });
    return result;
  };
  
  obj.prototype.ext = function (name) {
    return this._json[name];
  };
  
  obj.prototype.extension = obj.prototype.ext;

  return obj;
};
