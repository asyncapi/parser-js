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
    iterateSchema(convertedType);

    message['x-parser-original-schema-format'] = message.schemaFormat || defaultSchemaFormat;
    message['x-parser-original-payload'] = payload;
    message.payload = convertedType;
    delete message.schemaFormat;
  } catch (e) {
    console.error(e);
  }
};

function iterateSchema(schema) {
  if (schema.$schema !== undefined) {
    delete schema.$schema;
  }

  aliasProps(schema.properties);
  aliasProps(schema.patternProperties);
  aliasProps(schema.additionalProperties);
  aliasProps(schema.items);
  aliasProps(schema.additionalItems);
  aliasProps(schema.oneOf);
  aliasProps(schema.anyOf);
  aliasProps(schema.allOf);
  aliasProps(schema.not);
}

function aliasProps(obj) {
  for (let key in obj) {
    iterateSchema(obj[key]);
  }
}
