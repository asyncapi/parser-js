const Ajv = require('ajv');
const ParserError = require('./errors/parser-error');
const asyncapi = require('@asyncapi/specs');

module.exports = {
  parse,
  getMimeTypes
};

async function parse({ message,  }) {
  const ajv = new Ajv({
    jsonPointers: true,
    allErrors: true,
    schemaId: 'id',
    logger: false,
  });

  //TODO so far it is a problem that schema has refs, and dereferencing is not possible because they are circular
  const validate = ajv.compile(asyncapi['2.0.0'].definitions.schema);
  const valid = validate(message.payload);

  //TODO oryginal asyncapi file should be passed to custom parsers so we can throw good errors with error position in file
  if (!valid) throw new ParserError({
    type: 'validation-errors',
    title: 'There were errors validating the AsyncAPI document.',
    //parsedJSON,
    //validationErrors: improveAjvErrors(validate.errors, asyncapiYAMLorJSON, initialFormat),
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