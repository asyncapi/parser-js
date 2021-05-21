const { expect } = require('chai');
const fs = require('fs');
const path = require('path');

const AsyncAPIDocument = require('../../lib/models/asyncapi');

describe('AsyncAPIDocument', function () {
  describe('#traverseAllSchemas()', function () {
    it('Should traverse patternProperties, definitions, dependencies ', function () {
      const doc = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../good/iterator.json'),'utf8'));
      const d = new AsyncAPIDocument(doc);
      const schemas = new Map();
      const cb = (schema) => {
        schemas.set(schema.uid(), schema);
      };
      d.traverseSchemas(cb);

      //Ensure the actual keys are as expected
      const schemaKeys = Array.from(schemas.keys());
      expect(schemaKeys).to.deep.equal([
        'testPayloadSchema',
        'testPayloadPatternPropertiesSchema1',
        'testPayloadPatternPropertiesSchema2',
        'testPayloadDefinitionSchema',
        'testPayloadDefinitionSchemaProp',
        'testPayloadDependencySchema',
        'testPayloadNestedSchemaProp'
      ]);
      for (const t of schemas.values()) {
        expect(t.constructor.name).to.be.equal('Schema');
        expect(t.json().test).to.be.equal(true);
      }
    });
  });
});
