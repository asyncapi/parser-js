const wap = require('webapi-parser').WebApiParser;
const yaml = require('js-yaml');

module.exports = async ({ message }) => {
  try {
    const ramlLibrary = `
    #%RAML 1.0 Library
    types:
      Schema:
${yaml.safeDump(message.payload).replace(/^(?=.)/gm, '        ')}
  `;

    const model = await wap.raml10.parse(ramlLibrary);
    const json = JSON.parse(model.getDeclarationByName('Schema').toJsonSchema);
    const transformed = json.definitions.Schema;
    message['x-original-schema-format'] = message.schemaFormat;
    message['x-original-schema'] = message.payload;
    message.payload = transformed;
    delete message.schemaFormat;
  } catch (e) {
    throw e;
  }
};
