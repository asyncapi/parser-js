const path = require('path');
const Ajv = require('ajv');
const fetch = require('node-fetch');
const asyncapi = require('@asyncapi/specs');
const $RefParser = require('@apidevtools/json-schema-ref-parser');
const mergePatch = require('tiny-merge-patch').apply;
const ParserError = require('./errors/parser-error');
const { validateChannelParams, validateServerVariables, validateOperationId, validateServerSecurity } = require('./customValidators.js');
const { toJS, findRefs, getLocationOf, improveAjvErrors } = require('./utils');
const AsyncAPIDocument = require('./models/asyncapi');

const DEFAULT_SCHEMA_FORMAT = 'application/vnd.aai.asyncapi;version=2.0.0';
const OPERATIONS = ['publish', 'subscribe'];
//the only security types that can have a non empty array in the server security item
const SPECIAL_SECURITY_TYPES = ['oauth2', 'openIdConnect'];
const PARSERS = {};
const xParserCircle = 'x-parser-circular';

/**
 * @module @asyncapi/parser
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
 * @param {String} asyncapiYAMLorJSON An AsyncAPI document in JSON or YAML format.
 * @param {Object} [options] Configuration options.
 * @param {String} [options.path] Path to the AsyncAPI document. It will be used to resolve relative references. Defaults to current working dir.
 * @param {Object} [options.parse] Options object to pass to {@link https://apidevtools.org/json-schema-ref-parser/docs/options.html|json-schema-ref-parser}.
 * @param {Object} [options.resolve] Options object to pass to {@link https://apidevtools.org/json-schema-ref-parser/docs/options.html|json-schema-ref-parser}.
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

    const refParser = new $RefParser;
    //because of Ajv lacks support for circular refs, parser should not resolve them before Ajv validation and first needs to ignore them and leave circular $refs to successfully validate the document
    //this is done pair to advice from Ajv creator https://github.com/ajv-validator/ajv/issues/1122#issuecomment-559378449
    //later we perform full dereference of circular refs if they occure
    await dereference(refParser, parsedJSON, initialFormat, asyncapiYAMLorJSON, { ...options, dereference: { circular: 'ignore' } });

    const ajv = new Ajv({
      jsonPointers: true,
      allErrors: true,
      schemaId: 'id',
      logger: false,
    });
  
    ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));
  
    const validate = ajv.compile(asyncapi[parsedJSON.asyncapi]);
    const valid = validate(parsedJSON);
    if (!valid) throw new ParserError({
      type: 'validation-errors',
      title: 'There were errors validating the AsyncAPI document.',
      parsedJSON,
      validationErrors: improveAjvErrors(validate.errors, asyncapiYAMLorJSON, initialFormat),
    });

    await customDocumentOperations(parsedJSON, asyncapiYAMLorJSON, initialFormat, options);
    if (refParser.$refs.circular) await handleCircularRefs(refParser, parsedJSON, initialFormat, asyncapiYAMLorJSON, options);
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
 * @param {String} url URL where the AsyncAPI document is located.
 * @param {Object} [fetchOptions] Configuration to pass to the {@link https://developer.mozilla.org/en-US/docs/Web/API/Request|fetch} call.
 * @param {Object} [options] Configuration to pass to the {@link module:Parser#parse} method.
 * @returns {Promise<AsyncAPIDocument>} The parsed AsyncAPI document.
 */
function parseFromUrl(url, fetchOptions, options) {
  //Why not just addinga default to the arguments list?
  //All function parameters with default values should be declared after the function parameters without default values. Otherwise, it makes it impossible for callers to take advantage of defaults; they must re-specify the defaulted values or pass undefined in order to "get to" the non-default parameters.
  //To not break the API by changing argument position and to silet the linter it is just better to move adding
  if (!fetchOptions) fetchOptions = {};

  return new Promise((resolve, reject) => {
    fetch(url, fetchOptions)
      .then(res => res.text())
      .then(doc => parse(doc, options))
      .then(result => resolve(result))
      .catch(reject);
  });
}

async function dereference(refParser, parsedJSON, initialFormat, asyncapiYAMLorJSON, options) {
  try {
    return await refParser.dereference(options.path, parsedJSON, {
      continueOnError: true,
      parse: options.parse,
      resolve: options.resolve,
      dereference: options.dereference,
    });
  } catch (err) {
    throw new ParserError({
      type: 'dereference-error',
      title: err.errors[0].message,
      parsedJSON,
      refs: findRefs(err.errors, initialFormat, asyncapiYAMLorJSON),
    });
  }
}

/*
 * In case of circular refs, this function dereferences the spec again to dereference circular dependencies
 * Special property is added to the document that indicates it contains circular refs
*/
async function handleCircularRefs(refParser, parsedJSON, initialFormat, asyncapiYAMLorJSON, options) {
  await dereference(refParser, parsedJSON, initialFormat, asyncapiYAMLorJSON, { ...options, dereference: { circular: true } });
  //mark entire document as containing circular references
  parsedJSON[String(xParserCircle)] = true;
}

async function customDocumentOperations(parsedJSON, asyncapiYAMLorJSON, initialFormat, options) {
  validateServerVariables(parsedJSON, asyncapiYAMLorJSON, initialFormat);
  validateServerSecurity(parsedJSON, asyncapiYAMLorJSON, initialFormat, SPECIAL_SECURITY_TYPES);

  if (!parsedJSON.channels) return;
  
  validateChannelParams(parsedJSON, asyncapiYAMLorJSON, initialFormat);
  validateOperationId(parsedJSON, asyncapiYAMLorJSON, initialFormat, OPERATIONS);

  await customChannelsOperations(parsedJSON, asyncapiYAMLorJSON, initialFormat, options);
}

async function validateAndConvertMessage(msg, originalAsyncAPIDocument, fileFormat, parsedAsyncAPIDocument, pathToPayload) {
  const schemaFormat = msg.schemaFormat || DEFAULT_SCHEMA_FORMAT;

  await PARSERS[String(schemaFormat)]({
    schemaFormat,
    message: msg,
    defaultSchemaFormat: DEFAULT_SCHEMA_FORMAT,
    originalAsyncAPIDocument,
    parsedAsyncAPIDocument,
    fileFormat, 
    pathToPayload
  });

  msg.schemaFormat = DEFAULT_SCHEMA_FORMAT;
}

/**
 * Registers a new schema parser. Schema parsers are in charge of parsing and transforming payloads to AsyncAPI Schema format.
 * 
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
    PARSERS[String(schemaFormat)] = parserModule.parse;
  });
}

function applyTraits(js) {
  if (Array.isArray(js.traits)) {
    for (const trait of js.traits) {
      for (const key in trait) {
        js[String(key)] = mergePatch(js[String(key)], trait[String(key)]);
      }
    }

    js['x-parser-original-traits'] = js.traits;
    delete js.traits;
  }
}

/**
 * Triggers additional operations on the AsyncAPI channels like traits application or message validation and conversion
 *
 * @private
 * 
 * @param  {Object} parsedJSON parsed AsyncAPI document
 * @param  {String} asyncapiYAMLorJSON AsyncAPI document in string
 * @param  {String} initialFormat information of the document was oryginally JSON or YAML
 * @param  {Object} options Configuration options.
 */
async function customChannelsOperations(parsedJSON, asyncapiYAMLorJSON, initialFormat, options) {
  const promisesArray = [];
  Object.entries(parsedJSON.channels).forEach(([channelName, channel]) => {
    promisesArray.push(...OPERATIONS.map(async (opName) => {
      const op = channel[String(opName)];
      if (!op) return;

      const messages = op.message ? (op.message.oneOf || [op.message]) : [];
      if (options.applyTraits) {  
        applyTraits(op);
        messages.forEach(m => applyTraits(m));
      }
      const pathToPayload = `/channels/${channelName}/${opName}/message/payload`;
      for (const m of messages) {
        await validateAndConvertMessage(m, asyncapiYAMLorJSON, initialFormat, parsedJSON, pathToPayload);
      }
    }));
  });
  await Promise.all(promisesArray);
}