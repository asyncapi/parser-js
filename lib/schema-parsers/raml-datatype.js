const yaml = require('js-yaml');
const r2j = require('ramldt2jsonschema');

module.exports = async ({ message, defaultSchemaFormat }) => {
  try {
    let payload = message.payload;
    if (typeof payload === 'object') {
      payload = '#%RAML 1.0 Library\n' +
        yaml.safeDump({types: {tmpType: payload}});
    }

    // Draft 6 is compatible with 7.
    const jsonModel = await r2j.dt2js(payload, 'tmpType', {draft: '06'});
    const convertedType = jsonModel.definitions.tmpType;

    message['x-parser-original-schema-format'] = message.schemaFormat || defaultSchemaFormat;
    message['x-parser-original-payload'] = payload;
    message.payload = convertedType;
    delete message.schemaFormat;
  } catch (e) {
    console.error(e);
  }
};
