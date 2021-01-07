const YAML = require('js-yaml');
const { yamlAST, loc } = require('@fmvilas/pseudo-yaml-ast');
const jsonAST = require('json-to-ast');
const jsonParseBetterErrors = require('../lib/json-parse');
const ParserError = require('./errors/parser-error');

const jsonPointerToArray = jsonPointer => (jsonPointer || '/').split('/').splice(1);

const utils = module.exports;

const getAST = (asyncapiYAMLorJSON, initialFormat) => {
  if (initialFormat === 'yaml') {
    return yamlAST(asyncapiYAMLorJSON);
  } else if (initialFormat === 'json') {
    return jsonAST(asyncapiYAMLorJSON);
  }
};

const findNode = (obj, location) => {
  for (const key of location) {
    obj = obj ? obj[utils.untilde(key)] : null;
  }
  return obj;
};

const findNodeInAST = (ast, location) => {
  let obj = ast;
  for (const key of location) {
    if (!Array.isArray(obj.children)) return;
    let childArray;

    const child = obj.children.find(c => {    
      if (!c) return;

      if (c.type === 'Object') return childArray = c.children.find(a => a.key.value === utils.untilde(key));
      return c.type === 'Property' && c.key && c.key.value === utils.untilde(key);
    });

    if (!child) return;
    obj = childArray ? childArray.value : child.value;
  }
  return obj;
};

const findLocationOf = (keys, ast, initialFormat) => {
  if (initialFormat === 'js') return { jsonPointer: `/${keys.join('/')}` };
  
  let node;
  if (initialFormat === 'yaml') {
    node = findNode(ast, keys);
  } else if (initialFormat === 'json') {
    node = findNodeInAST(ast, keys);
  }

  if (!node) return { jsonPointer: `/${keys.join('/')}` };

  let info;
  if (initialFormat === 'yaml') {
    // disable eslint because loc is a Symbol
    // eslint-disable-next-line security/detect-object-injection
    info = node[loc];
  } else if (initialFormat === 'json') {
    info = node.loc;
  }

  if (!info) return { jsonPointer: `/${keys.join('/')}` };

  return {
    jsonPointer: `/${keys.join('/')}`,
    startLine: info.start.line,
    startColumn: info.start.column + 1,
    startOffset: info.start.offset,
    endLine: info.end ? info.end.line : undefined,
    endColumn: info.end ? info.end.column + 1 : undefined,
    endOffset: info.end ? info.end.offset : undefined,
  };
};

const getMapValue = (obj, key, Type) => {
  if (typeof key !== 'string' || !obj) return null;
  const v = obj[String(key)];
  if (v === undefined) return null;
  return Type ? new Type(v) : v;
};

utils.tilde = (str) => {
  return str.replace(/[~\/]{1}/g, (m) => {
    switch (m) {
    case '/': return '~1';
    case '~': return '~0';
    }
    return m;
  });
};

utils.untilde = (str) => {
  if (!str.includes('~')) return str;
  return str.replace(/~[01]/g, (m) => {
    switch (m) {
    case '~1': return '/';
    case '~0': return '~';
    }
    return m;
  });
};

utils.toJS = (asyncapiYAMLorJSON) => {
  if (!asyncapiYAMLorJSON) {
    throw new ParserError({
      type: 'null-or-falsey-document',
      title: 'Document can\'t be null or falsey.',
    });
  }

  if (asyncapiYAMLorJSON.constructor && asyncapiYAMLorJSON.constructor.name === 'Object') {
    return {
      initialFormat: 'js',
      parsedJSON: asyncapiYAMLorJSON,
    };
  }
  
  if (typeof asyncapiYAMLorJSON !== 'string') {
    throw new ParserError({
      type: 'invalid-document-type',
      title: 'The AsyncAPI document has to be either a string or a JS object.',
    });
  }
  if (asyncapiYAMLorJSON.trimLeft().startsWith('{')) {
    try {
      return {
        initialFormat: 'json',
        parsedJSON: jsonParseBetterErrors(asyncapiYAMLorJSON),
      };
    } catch (e) {
      throw new ParserError({
        type: 'invalid-json',
        title: 'The provided JSON is not valid.',
        detail: e.message,
        location: {
          startOffset: e.offset,
          startLine: e.startLine,
          startColumn: e.startColumn,
        },
      });
    }
  } else {
    try {
      return {
        initialFormat: 'yaml',
        parsedJSON: YAML.safeLoad(asyncapiYAMLorJSON),
      };
    } catch (err) {
      throw new ParserError({
        type: 'invalid-yaml',
        title: 'The provided YAML is not valid.',
        detail: err.message,
        location: {
          startOffset: err.mark.position,
          startLine: err.mark.line + 1,
          startColumn: err.mark.column + 1,
        },
      });
    }
  }
};

utils.createMapOfType = (obj, Type) => {
  const result = {};
  if (!obj) return result;

  Object.entries(obj).forEach(([key, value]) => {
    result[String(key)] = new Type(value);
  });

  return result;
};

utils.getMapValueOfType = (obj, key, Type) => {
  return getMapValue(obj, key, Type);
};

utils.getMapValueByKey = (obj, key) => {
  return getMapValue(obj, key);
};

/**
 * Extends a given model with additional methods related to frequently recurring models
 * 
 * @function mix
 * @private
 * @param {object} model model to extend
 * @param {Array<object>} mixins array with mixins to extend the model with
 */
utils.mix = (model, ...mixins) => {
  let duplicatedMethods = false;
  /**
   * @param mixin
   */
  function checkDuplication(mixin) {
    // check duplication of model in mixins array
    if (model === mixin) return true;
    // check duplication of model's methods
    duplicatedMethods = Object.keys(mixin).some(mixinMethod => model.prototype.hasOwnProperty(mixinMethod));
    return duplicatedMethods;
  }
  
  if (mixins.some(checkDuplication)) {
    if (duplicatedMethods) {
      throw new Error(`invalid mix function: model ${model.name} has at least one method that it is trying to replace by mixin`);
    } else {
      throw new Error(`invalid mix function: cannot use the model ${model.name} as a mixin`);
    }
  }
  mixins.forEach(mixin => Object.assign(model.prototype, mixin));
  return model;
};

utils.findRefs = (errors, initialFormat, asyncapiYAMLorJSON) => {
  let refs = [];

  errors.map(({ path }) => refs.push({ location: [...path.map(utils.tilde), '$ref'] }));

  if (initialFormat === 'js') {
    return refs.map(ref => ({ jsonPointer: `/${ref.location.join('/')}` }));
  }

  if (initialFormat === 'yaml') {
    const pseudoAST = yamlAST(asyncapiYAMLorJSON);
    refs = refs.map(ref => findLocationOf(ref.location, pseudoAST, initialFormat));
  } else if (initialFormat === 'json') {
    const ast = jsonAST(asyncapiYAMLorJSON);
    refs = refs.map(ref => findLocationOf(ref.location, ast, initialFormat));
  }

  return refs;
};

utils.getLocationOf = (jsonPointer, asyncapiYAMLorJSON, initialFormat) => {
  const ast = getAST(asyncapiYAMLorJSON, initialFormat);
  if (!ast) return { jsonPointer };

  return findLocationOf(jsonPointerToArray(jsonPointer), ast, initialFormat);
};

utils.improveAjvErrors = (errors, asyncapiYAMLorJSON, initialFormat) => {
  const ast = getAST(asyncapiYAMLorJSON, initialFormat);
  return errors.map(error => {
    const defaultLocation = { jsonPointer: error.dataPath || '/' };

    return {
      title: `${error.dataPath || '/'} ${error.message}`,
      location: ast ? findLocationOf(jsonPointerToArray(error.dataPath), ast, initialFormat) : defaultLocation,
    };
  });
};

/**
 * It parses the string and returns an array with all values that are between curly braces, including braces
 *
 * @param str
 * @function parseUrlVariables
 * @private
 */
utils.parseUrlVariables = str => {
  if (typeof str !== 'string') return;

  return str.match(/{(.+?)}/g); 
};

/**
 * Returns an array of not existing properties in provided object with names specified in provided array
 *
 * @param arr
 * @param obj
 * @function getMissingProps
 * @private
 */
utils.getMissingProps = (arr, obj) => {
  arr = arr.map(val => val.replace(/[{}]/g, ''));

  if (!obj) return arr;
  
  return arr.filter(val => {
    return !obj.hasOwnProperty(val);
  });
};

/**
 * Returns array of errors messages compatible with validationErrors parameter from ParserError
 *
 * @function groupValidationErrors
 * @private
 * @param {string} root name of the root element in the AsyncAPI document, for example channels
 * @param {string} errorMessage the text of the custom error message that will follow the path that points the error
 * @param {Map} errorElements map of error elements cause the validation error might happen in many places in the document. 
 * The key should have a path information where the error was found, the value holds information about error element but it is not mandatory
 * @param {string} asyncapiYAMLorJSON AsyncAPI document in string
 * @param {string} initialFormat information of the document was oryginally JSON or YAML
 * @returns {Array<object>} Object has always 2 keys, title and location. Title is a combination of errorElement key + errorMessage + errorElement value. 
 * Location is the object with information about location of the issue in the file and json Pointer
 */
utils.groupValidationErrors = (root, errorMessage, errorElements, asyncapiYAMLorJSON, initialFormat) => {
  const errors = [];

  errorElements.forEach((val, key) => {
    if (typeof val === 'string') val = utils.untilde(val);

    errors.push({
      title: val ? `${ utils.untilde(key) } ${errorMessage}: ${val}` : `${ utils.untilde(key) } ${errorMessage}`,
      location: utils.getLocationOf(`/${root}/${key}`, asyncapiYAMLorJSON, initialFormat)
    });
  });

  return errors;
};
