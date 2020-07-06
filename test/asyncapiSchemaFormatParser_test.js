const parser = require('../lib');
const chai = require('chai');
const fs = require('fs');
const path = require('path');
const expect = chai.expect;

describe('asyncapiSchemaFormatParser', function() {
  it('should throw an error because of invalid schema', async function() {
    const invalidAsyncapi = fs.readFileSync(path.resolve(__dirname, './wrong/invalid-payload-asyncapi-format.json'), 'utf8');
    try {
      await parser.parse(invalidAsyncapi);
    } catch (e) {
      console.log('papapapapa', e.validationErrors);
      expect(e.type).to.equal('https://github.com/asyncapi/parser-js/schema-validation-errors');
      expect(e.title).to.equal('This is not a valid AsyncAPI Schema Object.');
      expect(e.parsedJSON).to.deep.equal(JSON.parse(invalidAsyncapi));
      expect(e.validationErrors).to.deep.equal([
        {
          title: '/additionalProperties should be object,boolean',
          location: { jsonPointer: '/additionalProperties' }
        },
        {
          title: '/additionalProperties should be object,boolean',
          location: { jsonPointer: '/additionalProperties' }
        },
        {
          title: '/additionalProperties should be object',
          location: { jsonPointer: '/additionalProperties' }
        },
        {
          title: '/additionalProperties should be boolean',
          location: { jsonPointer: '/additionalProperties' }
        },
        {
          title: '/additionalProperties should match some schema in anyOf',
          location: { jsonPointer: '/additionalProperties' }
        }
      ]);
    }
  });
});