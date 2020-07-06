const Ajv = require('ajv');
const ParserError = require('./errors/parser-error');
const asyncapi = require('@asyncapi/specs');
const { improveAjvErrors } = require('./utils');

module.exports = {
  parse,
  getMimeTypes
};

async function parse({ message, originalAsyncAPIDocument, fileFormat, parsedAsyncAPIDocument }) {
  const ajv = new Ajv({
    jsonPointers: true,
    allErrors: true,
    schemaId: 'id',
    logger: false,
  });
  const payloadSchema = preparePayloadSchema(asyncapi[parsedAsyncAPIDocument.asyncapi]);
  const validate = ajv.compile(payloadSchema);
  const valid = validate(message.payload);

  if (!valid) throw new ParserError({
    type: 'schema-validation-errors',
    title: 'This is not a valid AsyncAPI Schema Object.',
    parsedJSON: parsedAsyncAPIDocument,
    validationErrors: improveAjvErrors(validate.errors, originalAsyncAPIDocument, fileFormat),
  });
}

function getMimeTypes() {
  return [
    'application/vnd.aai.asyncapi;version=2.0.0',
    'application/vnd.aai.asyncapi+json;version=2.0.0',
    'application/vnd.aai.asyncapi+yaml;version=2.0.0',
    'application/schema;version=draft-07',
    'application/schema+json;version=draft-07',
    'application/schema+yaml;version=draft-07',
  ];
}

function preparePayloadSchema(asyncapiSchema) {
  return {
    $ref: '#/definitions/schema',
    definitions: asyncapiSchema.definitions
  };
}
