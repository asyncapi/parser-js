const parser = require('./parser');
const openapiSchemaParser = require('./schema-parsers/openapi');
// const ramlSchemaParser = require('./schema-parsers/raml');

const noop = () => {}; // No operation

parser.registerSchemaParser([
  'application/schema+json;version=draft-07',
], noop);

parser.registerSchemaParser([
  'application/vnd.oai.openapi',
  'application/vnd.oai.openapi+json',
  'application/vnd.oai.openapi;version=3.0.0',
  'application/vnd.oai.openapi;version=3.0.1',
  'application/vnd.oai.openapi+json;version=3.0.0',
  'application/vnd.oai.openapi+json;version=3.0.1',
], openapiSchemaParser);

// parser.registerSchemaParser([
//   'application/raml',
//   'application/raml+yaml',
// ], ramlSchemaParser);

module.exports = parser;