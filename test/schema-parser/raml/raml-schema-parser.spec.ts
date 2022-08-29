import { RamlSchemaParser } from '../../../src/schema-parser/raml-schema-parser';
import * as fs from 'fs';
import * as path from 'path';

import type { ParseSchemaInput, ValidateSchemaInput } from '../../../src/schema-parser';
import type { SchemaValidateResult } from '../../../src/types';

const inputWithSimpleRAML = toInput(fs.readFileSync(path.resolve(__dirname, './simple.json'), 'utf8'));
const outputWithSimpleRAML = '{"type":"object","examples":[{"title":"A book","author":"An author"}],"additionalProperties":true,"required":["title","author"],"properties":{"title":{"type":"string"},"author":{"type":"string","examples":["Eva"]}}}';

const inputWithComplexRAML = toInput(fs.readFileSync(path.resolve(__dirname, './complex.json'), 'utf8'));
const outputWithComplexRAML = `{"minProperties":1,"maxProperties":50,"additionalProperties":false,"discriminator":"breed","discriminatorValue":"CatOne","type":"object","required":["proscons","name","breed","age","rating","year_of_birth","time_of_birth","addition_date","removal_date","photo","description","character","siblings","parents","ratingHistory","additionalData"],"properties":{"proscons":{"anyOf":[true,true]},"name":true,"breed":true,"age":true,"rating":{"type":"integer","multipleOf":5,"example":{"displayName":"Cat's rating","description":"Rating of cat's awesomeness","strict":false,"value":50}},"year_of_birth":{"type":"string","format":"date"},"time_of_birth":{"type":"string","format":"time"},"dt_of_birth":{"type":"string","format":"date-time-only"},"addition_date":{"type":"string","format":"rfc2616"},"removal_date":{"type":"string","format":"date-time"},"photo":{"type":"string","minLength":1,"maxLength":307200},"description":{"type":"null"},"habits":{"type":"string"},"character":{"anyOf":[{"type":"null"},{"type":"string"}]},"siblings":{"type":"array","items":{"type":"string"}},"parents":{"type":"array","items":true},"ratingHistory":{"type":"array","items":{"anyOf":[{"type":"integer"},{"type":"number"}]}},"additionalData":{"type":"object","additionalProperties":true,"required":["weight"],"properties":{"weight":{"type":"number"}}}}}`;

const inputWithInvalidRAML = toInput(fs.readFileSync(path.resolve(__dirname, './invalid.json'), 'utf8'));

describe('parse()', function() {
  const parser = RamlSchemaParser();

  it('should parse simple RAML data types', async function() {
    await doTest(inputWithSimpleRAML, outputWithSimpleRAML);
  });

  it('should parse complex RAML data types', async function() {
    await doTest(inputWithComplexRAML, outputWithComplexRAML);
  });

  async function doTest(originalInput: ParseSchemaInput, expectedOutput: string) {
    const input = {...originalInput};
    const result = await parser.parse(input);

    // Check that the return value of parse() is the expected JSON Schema.
    expect(result).toEqual(JSON.parse(expectedOutput));
  }
});

describe('validate()', function() {
  const parser = RamlSchemaParser();

  it('should validate valid RAML', async function() {
    const result = await parser.validate(inputWithSimpleRAML);
    expect(result).toHaveLength(0);
  });
  it('should validate invalid RAML', async function() {
    const results = await parser.validate(inputWithInvalidRAML);
    expect(results).toHaveLength(1);
    
    const result = (results as SchemaValidateResult[])[0];
    expect(result.message).toEqual("Property 'examples' should be a map");
    expect(result.path).toEqual([]); // Validator doesn't provide info about the error path
  });
});

function toInput(raw: string): ParseSchemaInput | ValidateSchemaInput {
  const message = JSON.parse(raw);
  const schemaInput = {
    asyncapi: {
      semver: {
        version: "2.4.0",
        major: 2,
        minor: 4,
        patch: 0
      }, 
      source: "",
      parsed: {},
    },
    path: ["otherchannel", "subscribe", "message", "payload"],
    data: message.payload,
    meta: {
      message: message,
    },
    schemaFormat: message.schemaFormat,
    defaultSchemaFormat: "application/vnd.aai.asyncapi;version=2.4.0",
  };

  return schemaInput;
}