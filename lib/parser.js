const Ajv = require('ajv');
const fetch = require('node-fetch');
const asyncapi = require('asyncapi');
const $RefParser = require('json-schema-ref-parser');
const contentTypeParser = require('content-type-parser');
const mergePatch = require('tiny-merge-patch').apply;
const { ParserError } = require('./errors');
const { normalizeContentType, toJS } = require('./utils');

const DEFAULT_SCHEMA_FORMAT = 'application/vnd.oai.openapi';
const OPERATIONS = ['publish', 'subscribe'];
const PARSERS = {};

module.exports.parse = parse;
module.exports.parseFromUrl = parseFromUrl;
module.exports.registerSchemaParser = registerSchemaParser;

/**
 * Parses and validate an AsyncAPI document.
 * 
 * @param {String} asyncapiYAMLorJSON An AsyncAPI document in JSON or YAML format.
 * @param {Object} [options] Configuration options.
 * @param {String} [options.path] Path to the AsyncAPI document. It will be used to resolve relative references.
 * @param {Object} [options.parse] Configuration object to pass to `json-schema-ref-parser`.
 * @param {Object} [options.resolve] Configuration object to pass to `json-schema-ref-parser`.
 * @param {Object} [options.dereference] Configuration object to pass to `json-schema-ref-parser`.
 * @returns {Promise<Object>} The parsed AsyncAPI document.
 */
async function parse(asyncapiYAMLorJSON, options = {}) {
  let js;

  try {
    js = toJS(asyncapiYAMLorJSON);

    if (!js || !js.asyncapi || !asyncapi[js.asyncapi]) {
      throw new ParserError(`AsyncAPI version is missing or unsupported: ${js.asyncapi}.`);
    }

    if (options.path) {
      js = await $RefParser.dereference(options.path, js, {
        parse: options.parse,
        resolve: options.resolve,
        dereference: options.dereference,
      });
    } else {
      js = await $RefParser.dereference(js, {
        parse: options.parse,
        resolve: options.resolve,
        dereference: options.dereference,
      });
    }
  } catch (e) {
    if (e instanceof ParserError) throw e;
    throw new ParserError(e.message);
  }

  const ajv = new Ajv({
    allErrors: true,
    schemaId: 'id',
    logger: false,
  });

  ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));

  try {
    const validate = ajv.compile(asyncapi[js.asyncapi]);
    const valid = validate(js);
    if (!valid) throw new ParserError('Invalid AsyncAPI document', validate.errors);

    await iterateDocument(js);
  } catch (e) {
    throw new ParserError(e);
  }

  return js;
}

/**
 * Fetches an AsyncAPI document from the given URL and passes its content to the `parse` method.
 * 
 * @param {String} url URL where the AsyncAPI document is located.
 * @param {Object} fetchOptions Configuration to pass to the `fetch` call.
 * @param {Object} options Configuration to pass to the `parse` method.
 * @returns {Promise<Object>} The parsed AsyncAPI document.
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

async function iterateDocument (js) {
  for (let channelName in js.channels) {
    const channel = js.channels[channelName];
    const convert = OPERATIONS.map(async (opName) => {
      const op = channel[opName];
      if (op) {
        const msg = op.message;
        applyTraits(op);
        applyTraits(op.message);
        if (msg) await validateAndConvertMessage(msg);
      }
    });
    await Promise.all(convert);
  }
}

async function validateAndConvertMessage (msg) {
  const schemaFormat = msg.schemaFormat || DEFAULT_SCHEMA_FORMAT;
  const contentType = normalizeContentType(contentTypeParser(schemaFormat));

  await PARSERS[contentType.toString()]({
    contentType,
    message: msg,
  });
}

function registerSchemaParser(contentTypes, parserFunction) {
  if (!Array.isArray(contentTypes)) throw new ParserError(`contentTypes must be an array of strings but found ${typeof contentTypes}.`);
  if (typeof parserFunction !== 'function') throw new ParserError(`parserFunction must be a function but found ${typeof parserFunction}.`);
  contentTypes.forEach((contentType) => {
    const normalizedContentType = normalizeContentType(contentTypeParser(contentType));
    if (normalizedContentType) {
      PARSERS[normalizedContentType] = parserFunction;
    }
  });
}

function applyTraits(js) {
  if (Array.isArray(js.traits)) {
    for (let trait of js.traits) {
      for (let key in trait) {
        js[key] = mergePatch(js[key], trait[key]);
      }
    }

    js['x-parser-original-traits'] = js.traits;
    delete js.traits;
  }
}