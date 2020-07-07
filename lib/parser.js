const path = require('path');
const Ajv = require('ajv');
const fetch = require('node-fetch');
const asyncapi = require('@asyncapi/specs');
const $RefParser = require('@apidevtools/json-schema-ref-parser');
const mergePatch = require('tiny-merge-patch').apply;
const ParserError = require('./errors/parser-error');
const { validateChannelParams, validateServerVariables } = require('./customValidators.js');
const { toJS, findRefs, getLocationOf, improveAjvErrors } = require('./utils');
const AsyncAPIDocument = require('./models/asyncapi');

const DEFAULT_SCHEMA_FORMAT = 'application/vnd.aai.asyncapi;version=2.0.0';
const OPERATIONS = ['publish', 'subscribe'];
const PARSERS = {};

/**
 * @module Parser
 */
module.exports = {
  parse,
  parseFromUrl,
  registerSchemaParser,
  ParserError,
  AsyncAPIDocument,
};

/**
 * Parses and validate an AsyncAPI document from YAML or JSON.
 * 
 * @name module:Parser#parse
 * @param {String} asyncapiYAMLorJSON An AsyncAPI document in JSON or YAML format.
 * @param {Object} [options] Configuration options.
 * @param {String} [options.path] Path to the AsyncAPI document. It will be used to resolve relative references. Defaults to current working dir.
 * @param {Object} [options.parse] Options object to pass to {@link https://apidevtools.org/json-schema-ref-parser/docs/options.html|json-schema-ref-parser}.
 * @param {Object} [options.resolve] Options object to pass to {@link https://apidevtools.org/json-schema-ref-parser/docs/options.html|json-schema-ref-parser}.
 * @param {Object} [options.dereference] Options object to pass to {@link https://apidevtools.org/json-schema-ref-parser/docs/options.html|json-schema-ref-parser}.
 * @param {Object} [options.applyTraits=true] Whether to resolve and apply traits or not.
 * @returns {Promise<AsyncAPIDocument>} The parsed AsyncAPI document.
 */
async function parse(asyncapiYAMLorJSON, options = {}) {
  let parsedJSON;
  let initialFormat;

  options.path = options.path || `${process.cwd()}${path.sep}`;

  try {
    ({ initialFormat, parsedJSON } = toJS(asyncapiYAMLorJSON));

    if (typeof parsedJSON !== 'object') {
      throw new ParserError({
        type: 'impossible-to-convert-to-json',
        title: 'Could not convert AsyncAPI to JSON.',
        detail: 'Most probably the AsyncAPI document contains invalid YAML or YAML features not supported in JSON.'
      });
    }
    
    if (!parsedJSON.asyncapi) {
      throw new ParserError({
        type: 'missing-asyncapi-field',
        title: 'The `asyncapi` field is missing.',
        parsedJSON,
      });
    }
    
    if (parsedJSON.asyncapi.startsWith('1.') || !asyncapi[parsedJSON.asyncapi]) {
      throw new ParserError({
        type: 'unsupported-version',
        title: `Version ${parsedJSON.asyncapi} is not supported.`,
        detail: 'Please use latest version of the specification.',
        parsedJSON,
        validationErrors: [getLocationOf('/asyncapi', asyncapiYAMLorJSON, initialFormat)],
      });
    }

    if (options.applyTraits === undefined) options.applyTraits = true;

    try {
      parsedJSON = await $RefParser.dereference(options.path, parsedJSON, {
        parse: options.parse,
        resolve: options.resolve,
        dereference: options.dereference,
      });
    } catch (err) {
      throw new ParserError({
        type: 'dereference-error',
        title: err.message,
        parsedJSON,
        refs: findRefs(parsedJSON, err.originalPath || err.path, options.path, initialFormat, asyncapiYAMLorJSON),
      });
    }
  } catch (e) {
    if (e instanceof ParserError) throw e;
    throw new ParserError({
      type: 'unexpected-error',
      title: e.message,
      parsedJSON,
    });
  }

  const ajv = new Ajv({
    jsonPointers: true,
    allErrors: true,
    schemaId: 'id',
    logger: false,
  });

  ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));

  try {
    const validate = ajv.compile(asyncapi[parsedJSON.asyncapi]);
    const valid = validate(parsedJSON);
    if (!valid) throw new ParserError({
      type: 'validation-errors',
      title: 'There were errors validating the AsyncAPI document.',
      parsedJSON,
      validationErrors: improveAjvErrors(validate.errors, asyncapiYAMLorJSON, initialFormat),
    });

    await customDocumentOperations(parsedJSON, asyncapiYAMLorJSON, initialFormat, options);
  } catch (e) {
    if (e instanceof ParserError) throw e;
    throw new ParserError({
      type: 'unexpected-error',
      title: e.message,
      parsedJSON,
    });
  }

  return new AsyncAPIDocument(parsedJSON);
}

/**
 * Fetches an AsyncAPI document from the given URL and passes its content to the `parse` method.
 * 
 * @name module:Parser#parseFromUrl
 * @param {String} url URL where the AsyncAPI document is located.
 * @param {Object} [fetchOptions] Configuration to pass to the {@link https://developer.mozilla.org/en-US/docs/Web/API/Request|fetch} call.
 * @param {Object} [options] Configuration to pass to the {@link module:Parser#parse} method.
 * @returns {Promise<AsyncAPIDocument>} The parsed AsyncAPI document.
 */
function parseFromUrl(url, fetchOptions = {}, options) {
  return new Promise((resolve, reject) => {
    fetch(url, fetchOptions)
      .then(res => res.text())
      .then(doc => parse(doc, options))
      .then(result => resolve(result))
      .catch(reject);
  });
}

async function customDocumentOperations(js, asyncapiYAMLorJSON, initialFormat, options) {
  if (js.servers) validateServerVariables(js, asyncapiYAMLorJSON, initialFormat);
  if (!js.channels) return;
  
  validateChannelParams(js, asyncapiYAMLorJSON, initialFormat);

  for (const channelName in js.channels) {
    const channel = js.channels[channelName];
    const convert = OPERATIONS.map(async (opName) => {
      const op = channel[opName];
      if (op) {
        const messages = op.message ? (op.message.oneOf || [op.message]) : [];
        if (options.applyTraits) {  
          applyTraits(op);
          messages.forEach(m => applyTraits(m));
        }
        for (const m of messages) {
          await validateAndConvertMessage(m);
        }
      }
    });
    await Promise.all(convert);
  }
}

async function validateAndConvertMessage(msg) {
  const schemaFormat = msg.schemaFormat || DEFAULT_SCHEMA_FORMAT;

  await PARSERS[schemaFormat]({
    schemaFormat,
    message: msg,
    defaultSchemaFormat: DEFAULT_SCHEMA_FORMAT,
  });

  msg.schemaFormat = DEFAULT_SCHEMA_FORMAT;
}

/**
 * Registers a new schema parser. Schema parsers are in charge of parsing and transforming payloads to AsyncAPI Schema format.
 * 
 * @name module:Parser#registerSchemaParser
 * @param {string[]} schemaFormats An array of schema formats the given schema parser is able to recognize and transform.
 * @param {Object} parserModule The schema parser module containing parse() and getMimeTypes() functions.
 */
function registerSchemaParser(parserModule) {
  if (typeof parserModule !== 'object' 
      || typeof parserModule.parse !== 'function' 
      || typeof parserModule.getMimeTypes !== 'function')
    throw new ParserError({
      type: 'impossible-to-register-parser',
      title: 'parserModule must have parse() and getMimeTypes() functions.'
    });

  parserModule.getMimeTypes().forEach((schemaFormat) => {
    PARSERS[schemaFormat] = parserModule.parse;
  });
}

function applyTraits(js) {
  if (Array.isArray(js.traits)) {
    for (const trait of js.traits) {
      for (const key in trait) {
        js[key] = mergePatch(js[key], trait[key]);
      }
    }

    js['x-parser-original-traits'] = js.traits;
    delete js.traits;
  }
}
