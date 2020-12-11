const parser = require('./parser');
const defaultAsyncAPISchemaParser = require('./asyncapiSchemaFormatParser');

parser.registerSchemaParser(defaultAsyncAPISchemaParser);

module.exports = parser;
