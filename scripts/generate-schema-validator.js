const specs = require('@asyncapi/specs');
const migrate = require('json-schema-migrate');
const fs = require('fs');
const path = require('path');
const Ajv = require('ajv').default;
const standaloneCode = require('ajv/dist/standalone').default;
const addFormats = require('ajv-formats');

const schemas = JSON.parse(JSON.stringify(specs));

let migratedSchemas = Object.entries(schemas).map(([id, schema]) => ({
  ...schema,
  $id: id,
}));
migratedSchemas.forEach((s) => migrate.draft7(s));
migratedSchemas = JSON.parse(
  JSON.stringify(migratedSchemas)
    .replace(/draft-04/g, 'draft-07')
    .replace(/positiveInteger/g, 'nonNegativeInteger')
    .replace(/positiveIntegerDefault0/g, 'nonNegativeIntegerDefault0')
);

const ajv = new Ajv({
  schemas: migratedSchemas,
  code: { source: true },
  strict: false,
  unicodeRegExp: false,
});

addFormats(ajv);

const moduleCode = standaloneCode(ajv);

// Now you can write the module code to file
fs.writeFileSync(
  path.join(__dirname, '../lib/validate-schemas.js'),
  moduleCode
);
