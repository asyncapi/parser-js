const toJsonSchema = require('@openapi-contrib/openapi-schema-to-json-schema');

module.exports = async ({ message, defaultSchemaFormat }) => {
  const transformed = toJsonSchema(message.payload, {
    cloneSchema: true,
    keepNotSupported: [
      'discriminator',
      'readOnly',
      'writeOnly',
      'deprecated',
      'xml',
      'example',
    ],
  });

  iterateSchema(transformed);

  message['x-parser-original-schema-format'] = message.schemaFormat || defaultSchemaFormat;
  message['x-parser-original-payload'] = message.payload;
  message.payload = transformed;
  delete message.schemaFormat;
};

function iterateSchema(schema) {
  if (schema.example !== undefined) {
    const examples = schema.examples || [];
    examples.push(schema.example);
    schema.examples = examples;
    delete schema.example;
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
    const prop = obj[key];

    if (prop.xml !== undefined) {
      prop['x-xml'] = prop.xml;
      delete prop.xml;
    }

    iterateSchema(obj[key]);
  }
}
