const Ajv = require('ajv');
const fetch = require('node-fetch');
const asyncapi = require('asyncapi');
const $RefParser = require('json-schema-ref-parser');
const contentTypeParser = require('content-type-parser');
const mergePatch = require('tiny-merge-patch').apply;
const { ParserError } = require('./errors');
const { normalizeContentType, toJS } = require('./utils');

const DEFAULT_SCHEMA_FORMAT = 'application/schema+json;version=draft-07';
const OPERATIONS = ['publish', 'subscribe'];
const PARSERS = {};

module.exports.parse = parse;
module.exports.parseFromUrl = parseFromUrl;
module.exports.registerSchemaParser = registerSchemaParser;

async function parse(asyncapiYAMLorJSON, options) {
  let js;

  try {
    js = toJS(asyncapiYAMLorJSON);

    if (!js || !js.asyncapi || !asyncapi[js.asyncapi]) {
      throw new ParserError(`AsyncAPI version is missing or unsupported: ${js.asyncapi}.`);
    }
    if (options) {
      js = await $RefParser.dereference(options.path, js, { resolve: { file: options.file } });
    } else {
      js = await $RefParser.dereference(js);
    }
    
  } catch (e) {
    if (e instanceof ParserError) throw e;
    throw new ParserError(e.message);
  }

  const getData = async url => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  };

  const ajv = new Ajv({
    allErrors: true,
    schemaId: 'auto',
  });
  ajv.addMetaSchema(await getData('http://json-schema.org/draft-04/schema'));

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
      let resolvedTrait;

      if (Array.isArray(trait)) {
        let s = JSON.stringify(trait[0]);
        const variables = trait[1] || {};

        for (let varName in variables) {
          s = s.replace(`{{${varName}}}`, variables[varName]);
        }

        resolvedTrait = JSON.parse(s);
      } else {
        resolvedTrait = trait;
      }

      for (let key in resolvedTrait) {
        js[key] = mergePatch(js[key], resolvedTrait[key]);
      }
    }

    js['x-original-traits'] = js.traits;
    delete js.traits;
  }
}
