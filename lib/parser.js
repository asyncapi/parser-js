const path = require('path');
const fetch = require('node-fetch');
const Ajv = require('ajv');
const asyncapi = require('@asyncapi/specs');
const $RefParser = require('@apidevtools/json-schema-ref-parser');
const mergePatch = require('tiny-merge-patch').apply;
const ParserError = require('./errors/parser-error');
const { validateChannels, validateTags, validateServerVariables, validateOperationId, validateServerSecurity, validateMessageId } = require('./customValidators.js');
const {
  toJS,
  findRefs,
  getLocationOf,
  improveAjvErrors,
  getDefaultSchemaFormat,
  getBaseUrl,
} = require('./utils');
const AsyncAPIDocument = require('./models/asyncapi');

const OPERATIONS = ['publish', 'subscribe'];
//the only security types that can have a non empty array in the server security item
const SPECIAL_SECURITY_TYPES = ['oauth2', 'openIdConnect'];
const PARSERS = {};
const xParserCircle = 'x-parser-circular';
const xParserMessageParsed = 'x-parser-message-parsed';

const ajv = new Ajv({
  jsonPointers: true,
  allErrors: true,
  schemaId: 'auto',
  logger: false,
  validateSchema: true,
});
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));

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
 * The complete list of parse configuration options used to parse the given data.
 * @typedef {Object} ParserOptions
 * @property {String=} path - Path to the AsyncAPI document. It will be used to resolve relative references. Defaults to current working dir.
 * @property {Object=} parse - Options object to pass to {@link https://apitools.dev/json-schema-ref-parser/docs/options.html|json-schema-ref-parser}.
 * @property {Object=} resolve - Options object to pass to {@link https://apitools.dev/json-schema-ref-parser/docs/options.html|json-schema-ref-parser}.
 * @property {Boolean=} applyTraits - Whether to resolve and apply traits or not. Defaults to true.
 */

/**
 * Parses and validate an AsyncAPI document from YAML or JSON.
 * 
 * @param {(String | Object)} asyncapiYAMLorJSON An AsyncAPI document in JSON or YAML format.
 * @param {ParserOptions=} options Configuration options object {@link #asyncapiparserparseroptions--object|ParserOptions}
 * @returns {Promise<AsyncAPIDocument>} The parsed AsyncAPI document.
 */
async function parse(asyncapiYAMLorJSON, options = {}) {
  let parsedJSON;
  let initialFormat;

  if (typeof window !== 'undefined' && !options.hasOwnProperty('path')) {
    options.path = getBaseUrl(window.location.href);
  } else {
    options.path = options.path || `${process.cwd()}${path.sep}`;
  }

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

    const validate = getValidator(parsedJSON.asyncapi);
    const valid = validate(parsedJSON);
    const errors = validate.errors && [...validate.errors];

    if (!valid) throw new ParserError({
      type: 'validation-errors',
      title: 'There were errors validating the AsyncAPI document.',
      parsedJSON,
      validationErrors: improveAjvErrors(errors, asyncapiYAMLorJSON, initialFormat),
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
 * @param {Object=} [fetchOptions] Configuration to pass to the {@link https://developer.mozilla.org/en-US/docs/Web/API/Request|fetch} call.
 * @param {ParserOptions=} [options] Configuration to pass to the {@link #asyncapiparserparseroptions--object|ParserOptions} method.
 * @returns {Promise<AsyncAPIDocument>} The parsed AsyncAPI document.
 */
function parseFromUrl(url, fetchOptions, options = {}) {
  //Why not just addinga default to the arguments list?
  //All function parameters with default values should be declared after the function parameters without default values. Otherwise, it makes it impossible for callers to take advantage of defaults; they must re-specify the defaulted values or pass undefined in order to "get to" the non-default parameters.
  //To not break the API by changing argument position and to silet the linter it is just better to move adding
  if (!fetchOptions) fetchOptions = {};

  if (!options.hasOwnProperty('path')) {
    options = { ...options, path: getBaseUrl(url) };
  }

  return new Promise((resolve, reject) => {
    fetch(url, fetchOptions)
      .then(res => res.text())
      .then(doc => parse(doc, options))
      .then(result => resolve(result))
      .catch(e => {
        if (e instanceof ParserError) return reject(e);
        return reject(new ParserError({
          type: 'fetch-url-error',
          title: e.message,
        }));
      });
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

/**
 * Creates (or reuses) a function that validates an AsyncAPI document based on the passed AsyncAPI version.
 * 
 * @private
 * @param {Object} version AsyncAPI version.
 * @returns {Function} Function that validates an AsyncAPI document based on the passed AsyncAPI version.
 */
function getValidator(version) {
  let validate = ajv.getSchema(version);
  if (!validate) {
    const asyncapiSchema = asyncapi[String(version)];
    // Remove the meta schemas because it is already present within Ajv, and it's not possible to add duplicate schemas.
    delete asyncapiSchema.definitions['http://json-schema.org/draft-07/schema'];
    delete asyncapiSchema.definitions['http://json-schema.org/draft-04/schema'];
    ajv.addSchema(asyncapiSchema, version);
    validate = ajv.getSchema(version);
  }
  return validate;
}

async function customDocumentOperations(parsedJSON, asyncapiYAMLorJSON, initialFormat, options) {
  validateServerVariables(parsedJSON, asyncapiYAMLorJSON, initialFormat);
  validateServerSecurity(parsedJSON, asyncapiYAMLorJSON, initialFormat, SPECIAL_SECURITY_TYPES);

  if (!parsedJSON.channels) return;

  validateTags(parsedJSON, asyncapiYAMLorJSON, initialFormat);
  validateChannels(parsedJSON, asyncapiYAMLorJSON, initialFormat);
  validateOperationId(parsedJSON, asyncapiYAMLorJSON, initialFormat, OPERATIONS);
  validateMessageId(parsedJSON, asyncapiYAMLorJSON, initialFormat, OPERATIONS);

  await customComponentsMsgOperations(parsedJSON, asyncapiYAMLorJSON, initialFormat, options);
  await customChannelsOperations(parsedJSON, asyncapiYAMLorJSON, initialFormat, options);
}

async function validateAndConvertMessage(msg, originalAsyncAPIDocument, fileFormat, parsedAsyncAPIDocument, pathToPayload) {
  //check if the message has been parsed before
  if (xParserMessageParsed in msg && msg[String(xParserMessageParsed)] === true) return;
  const defaultSchemaFormat = getDefaultSchemaFormat(parsedAsyncAPIDocument.asyncapi);
  const schemaFormat = msg.schemaFormat || defaultSchemaFormat;

  await PARSERS[String(schemaFormat)]({
    schemaFormat,
    message: msg,
    defaultSchemaFormat,
    originalAsyncAPIDocument,
    parsedAsyncAPIDocument,
    fileFormat, 
    pathToPayload
  });

  msg.schemaFormat = defaultSchemaFormat;
  msg[String(xParserMessageParsed)] = true;
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
 * @param  {String} initialFormat information of the document was originally JSON or YAML
 * @param  {ParserOptions} options Configuration options. {@link ParserOptions}
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

/**
 * Triggers additional operations on the AsyncAPI messages located in the components section of the document. It triggers operations like traits application, validation and conversion
 *
 * @private
 * 
 * @param  {Object} parsedJSON parsed AsyncAPI document
 * @param  {String} asyncapiYAMLorJSON AsyncAPI document in string
 * @param  {String} initialFormat information of the document was originally JSON or YAML
 * @param  {ParserOptions} options Configuration options. {@link ParserOptions}
 */
async function customComponentsMsgOperations(parsedJSON, asyncapiYAMLorJSON, initialFormat, options) {
  if (!parsedJSON.components || !parsedJSON.components.messages) return;

  const promisesArray = [];

  Object.entries(parsedJSON.components.messages).forEach(([messageName, message]) => {
    if (options.applyTraits) {
      applyTraits(message);
    }
    const pathToPayload = `/components/messages/${messageName}/payload`;
    promisesArray.push(validateAndConvertMessage(message, asyncapiYAMLorJSON, initialFormat, parsedJSON, pathToPayload));
  });

  await Promise.all(promisesArray);
}
