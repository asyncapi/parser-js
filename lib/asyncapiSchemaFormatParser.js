const Ajv = require('ajv');
const ParserError = require('./errors/parser-error');
const asyncapi = require('@asyncapi/specs');
const { improveAjvErrors } = require('./utils');
const cloneDeep = require('lodash.clonedeep');

const ajv = new Ajv({
  jsonPointers: true,
  allErrors: true,
  schemaId: 'auto',
  logger: false,
});
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));

module.exports = {
  parse,
  getMimeTypes
};

/**
 * @private
 */
async function parse({ message, originalAsyncAPIDocument, fileFormat, parsedAsyncAPIDocument, pathToPayload, defaultSchemaFormat }) {
  const payload = message.payload;
  if (!payload) return;

  message['x-parser-original-schema-format'] = message.schemaFormat || defaultSchemaFormat;
  message['x-parser-original-payload'] = cloneDeep(message.payload);

  const validate = getValidator(parsedAsyncAPIDocument.asyncapi);
  const valid = validate(payload);
  const errors = validate.errors && [...validate.errors];

  if (!valid) throw new ParserError({
    type: 'schema-validation-errors',
    title: 'This is not a valid AsyncAPI Schema Object.',
    parsedJSON: parsedAsyncAPIDocument,
    validationErrors: improveAjvErrors(addFullPathToDataPath(errors, pathToPayload), originalAsyncAPIDocument, fileFormat),
  });
}

/**
 * @private
 */
function getMimeTypes() {
  const mimeTypes = [
    'application/schema;version=draft-07',
    'application/schema+json;version=draft-07',
    'application/schema+yaml;version=draft-07',
  ];
  ['2.0.0', '2.1.0', '2.2.0', '2.3.0', '2.4.0', '2.5.0', '2.6.0'].forEach(version => {
    mimeTypes.push(
      `application/vnd.aai.asyncapi;version=${version}`,
      `application/vnd.aai.asyncapi+json;version=${version}`,
      `application/vnd.aai.asyncapi+yaml;version=${version}`,
    );
  });
  return mimeTypes;
}

/**
 * Creates (or reuses) a function that validates an AsyncAPI Schema Object based on the passed AsyncAPI version.
 * 
 * @private
 * @param {Object} version AsyncAPI version.
 * @returns {Function} Function that validates an AsyncAPI Schema Object based on the passed AsyncAPI version.
 */
function getValidator(version) {
  let validate = ajv.getSchema(version);
  if (!validate) {
    const payloadSchema = preparePayloadSchema(asyncapi[String(version)], version);
    ajv.addSchema(payloadSchema, version);
    validate = ajv.getSchema(version);
  }
  return validate;
}

/**
 * To validate schema of the payload we just need a small portion of official AsyncAPI spec JSON Schema, the definition of the schema must be
 * a main part of the JSON Schema
 * 
 * @private
 * @param {Object} asyncapiSchema AsyncAPI specification JSON Schema
 * @param {Object} version AsyncAPI version.
 * @returns {Object} valid JSON Schema document describing format of AsyncAPI-valid schema for message payload
 */
function preparePayloadSchema(asyncapiSchema, version) {
  const payloadSchema = `http://asyncapi.com/definitions/${version}/schema.json`;
  const definitions = asyncapiSchema.definitions;
  // Remove the meta schemas because it is already present within Ajv, and it's not possible to add duplicate schemas.
  delete definitions['http://json-schema.org/draft-07/schema'];
  delete definitions['http://json-schema.org/draft-04/schema'];
  return {
    $ref: payloadSchema,
    definitions
  };
}

/**
 * Errors from Ajv contain dataPath information about parameter relative to parsed payload message. 
 * This function enriches dataPath with additional information on where is the parameter located in AsyncAPI document
 * 
 * @private
 * @param  {Array<Object>} errors Ajv errors
 * @param  {String} path Path to location of the payload schema in AsyncAPI Document
 * @returns {Array<Object>} same object as received in input but with modified datePath property so it contain full path relative to AsyncAPI document
 */
function addFullPathToDataPath(errors, path) {
  return errors.map((err) => ({
    ...err,
    ...{
      dataPath: `${path}${err.dataPath}`
    }
  }));
}

