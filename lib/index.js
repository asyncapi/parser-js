const parser = require('./parser');

const noop = {
  parse: () => {}, // No operation
  getMimeTypes: () => [
    'application/vnd.aai.asyncapi;version=2.0.0',
    'application/vnd.aai.asyncapi+json;version=2.0.0',
    'application/vnd.aai.asyncapi+yaml;version=2.0.0',
    'application/schema;version=draft-07',
    'application/schema+json;version=draft-07',
    'application/schema+yaml;version=draft-07',
  ]
};

parser.registerSchemaParser(noop);

module.exports = parser;
