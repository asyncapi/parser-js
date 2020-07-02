const parser = require('./parser');
const defaultAsyncAPISchemaParser = require('./asyncapiSchemaParser');

parser.registerSchemaParser(defaultAsyncAPISchemaParser);

module.exports = parser;
