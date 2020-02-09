const yaml = require('js-yaml');
const wap = require('webapi-parser').WebApiParser;
const migrate = require('json-schema-migrate');

module.exports = async ({ message, defaultSchemaFormat }) => {
  try {
    let payload = message.payload;
    if (typeof payload === 'object') {
      payload = '#%RAML 1.0 DataType\n' + yaml.safeDump(payload);
    }
    const dtModel = await wap.raml10.parse(payload);
    let transformed = JSON.parse(dtModel.encodes.toJsonSchema).definitions.type;
    transformed = migrate.draft6(transformed); // Draft 6 is compatible with 7.
    iterateSchema(transformed);

    message['x-parser-original-schema-format'] = message.schemaFormat || defaultSchemaFormat;
    message['x-parser-original-payload'] = payload;
    message.payload = transformed;
    delete message.schemaFormat;
  } catch (e) {
    console.error(e);
  }
};

function iterateSchema(schema) {
  if (schema['x-amf-examples'] !== undefined) {
    const examples = [];
    for (const ex of Object.values(schema['x-amf-examples'])) {
      examples.push(ex);
    }
    schema.examples = examples;
    delete schema['x-amf-examples'];
  }

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
