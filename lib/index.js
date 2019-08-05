const parser = require('./parser');
const openapiSchemaParser = require('./schema-parsers/openapi');

const noop = () => {}; // No operation

parser.registerSchemaParser([
  'application/schema+json;version=draft-07',
  'application/schema+yaml;version=draft-07',
], noop);

parser.registerSchemaParser([
  'application/vnd.oai.openapi;version=3.0.0',
  'application/vnd.oai.openapi+json;version=3.0.0',
  'application/vnd.oai.openapi+yaml;version=3.0.0',
], openapiSchemaParser);

module.exports = parser;