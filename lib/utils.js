const YAML = require('js-yaml');
const { yamlAST, loc } = require('@fmvilas/pseudo-yaml-ast');
const jsonAST = require('json-to-ast');
const jsonParseBetterErrors = require('../lib/json-parse');
const ParserError = require('./errors/parser-error');

const utils = module.exports;

utils.toJS = (asyncapiYAMLorJSON) => {
  if (!asyncapiYAMLorJSON) {
    throw new ParserError({
      type: 'null-or-falsey-document',
      title: `Document can't be null or falsey.`,
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

  Object.keys(obj).forEach(key => {
    result[key] = new Type(obj[key]);
  });

  return result;
};

utils.getMapKeyOfType = (obj, key, Type) => {
  if (!obj) return null;
  if (!obj[key]) return null;
  return new Type(obj[key]);
};

utils.addExtensions = (obj) => {
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

utils.findRefs = (json, absolutePath, relativePath, initialFormat, asyncapiYAMLorJSON) => {
  let possibleRefUrls = [absolutePath];
  if (absolutePath.startsWith(relativePath)) possibleRefUrls.push(absolutePath.substr(relativePath.length));
  let refs = [];
  
  traverse(json, (key, value, scope) => {
    if (key === '$ref' && possibleRefUrls.includes(value)) {
      refs.push({ location: [...scope.map(tilde), '$ref'] });
    }
  });

  if (!refs.length) return refs;
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
}

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

const jsonPointerToArray = jsonPointer => (jsonPointer || '/').split('/').splice(1);

const getAST = (asyncapiYAMLorJSON, initialFormat) => {
  if (initialFormat === 'yaml') {
    return yamlAST(asyncapiYAMLorJSON);
  } else if (initialFormat === 'json') {
    return jsonAST(asyncapiYAMLorJSON);
  }
};

const findLocationOf = (keys, ast, initialFormat) => {
  let node;
  let info;

  if (initialFormat === 'js') return { jsonPointer: `/${keys.join('/')}` };

  if (initialFormat === 'yaml') {
    node = findNode(ast, keys);
    if (!node) return { jsonPointer: `/${keys.join('/')}` };
    info = node[loc];
  } else if (initialFormat === 'json') {
    node = findNodeInAST(ast, keys);
    if (!node) return { jsonPointer: `/${keys.join('/')}` };
    info = node.loc;
  }

  return {
    jsonPointer: `/${keys.join('/')}`,
    startLine: info.start.line,
    startColumn: info.start.column + 1,
    startOffset: info.start.offset,
    endLine: info.end ? info.end.line : undefined,
    endColumn: info.end ? info.end.column + 1 : undefined,
    endOffset: info.end ? info.end.offset : undefined,
  };
}

const findNode = (obj, location) => {
  for (let key of location) {
    obj = obj[untilde(key)];
  }
  return obj;
};

const findNodeInAST = (ast, location) => {
  let obj = ast;
  for (let key of location) {
    if (!Array.isArray(obj.children)) return;
    const child = obj.children.find(c => c && c.type === 'Property' && c.key && c.key.value === untilde(key));
    if (!child) return;
    obj = child.value;
  }
  return obj;
};

const traverse = function (o, fn, scope = []) {
  for (let i in o) {
    fn.apply(this, [i, o[i], scope]);
    if (o[i] !== null && typeof o[i] === "object") {
      traverse(o[i], fn, scope.concat(i));
    }
  }
}

const tilde = (str) => {
  return str.replace(/[~\/]{1}/g, (m) => {
    switch (m) {
      case '/': return '~1'
      case '~': return '~0'
    }
    return m;
  });
};

const untilde = (str) => {
  if (!str.includes('~')) return str;
  return str.replace(/~[01]/g, (m) => {
    switch (m) {
      case '~1': return '/'
      case '~0': return '~'
    }
    return m;
  });
};
