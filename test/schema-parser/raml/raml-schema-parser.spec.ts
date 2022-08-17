import { ParseSchemaInput, ValidateSchemaInput } from '../../../src/schema-parser/index';
import { RamlSchemaParser } from '../../../src/schema-parser/raml-schema-parser';
import { SchemaValidateResult } from '../../../src/types';
import * as fs from 'fs';
import * as path from 'path';

const inputWithSimpleRAML = toInput(fs.readFileSync(path.resolve(__dirname, './simple.json'), 'utf8'));
const outputWithSimpleRAML = '{"payload":{"type":"object","examples":[{"title":"A book","author":"An author"}],"additionalProperties":true,"required":["title","author"],"properties":{"title":{"type":"string"},"author":{"type":"string","examples":["Eva"]}}},"x-parser-original-schema-format":"application/raml+yaml;version=1.0","x-parser-original-payload":"#%RAML 1.0 Library\\ntypes:\\n  tmpType:\\n    type: object\\n    properties:\\n      title: string\\n      author:\\n        type: string\\n        examples:\\n          anExample: Eva\\n    examples:\\n      exampleOne:\\n        title: A book\\n        author: An author\\n"}';

const inputWithComplexRAML = toInput(fs.readFileSync(path.resolve(__dirname, './complex.json'), 'utf8'));
const outputWithComplexRAML = `{"payload":{"minProperties":1,"maxProperties":50,"additionalProperties":false,"discriminator":"breed","discriminatorValue":"CatOne","type":"object","required":["proscons","name","breed","age","rating","year_of_birth","time_of_birth","addition_date","removal_date","photo","description","character","siblings","parents","ratingHistory","additionalData"],"properties":{"proscons":{"anyOf":[true,true]},"name":true,"breed":true,"age":true,"rating":{"type":"integer","multipleOf":5,"example":{"displayName":"Cat's rating","description":"Rating of cat's awesomeness","strict":false,"value":50}},"year_of_birth":{"type":"string","format":"date"},"time_of_birth":{"type":"string","format":"time"},"dt_of_birth":{"type":"string","format":"date-time-only"},"addition_date":{"type":"string","format":"rfc2616"},"removal_date":{"type":"string","format":"date-time"},"photo":{"type":"string","minLength":1,"maxLength":307200},"description":{"type":"null"},"habits":{"type":"string"},"character":{"anyOf":[{"type":"null"},{"type":"string"}]},"siblings":{"type":"array","items":{"type":"string"}},"parents":{"type":"array","items":true},"ratingHistory":{"type":"array","items":{"anyOf":[{"type":"integer"},{"type":"number"}]}},"additionalData":{"type":"object","additionalProperties":true,"required":["weight"],"properties":{"weight":{"type":"number"}}}}},"x-parser-original-schema-format":"application/raml+yaml;version=1.0","x-parser-original-payload":"#%RAML 1.0 Library\\ntypes:\\n  tmpType:\\n    type:\\n      - CatWithAddress\\n      - CatWithCity\\n    minProperties: 1\\n    maxProperties: 50\\n    additionalProperties: false\\n    discriminator: breed\\n    discriminatorValue: CatOne\\n    properties:\\n      proscons:\\n        type: CatPros | CatCons\\n        required: true\\n      name:\\n        type: CatName\\n        amazing: true\\n      breed:\\n        type: CatBreed\\n      age: CatAge\\n      rating:\\n        type: integer\\n        multipleOf: 5\\n        example:\\n          displayName: Cat's rating\\n          description: Rating of cat's awesomeness\\n          strict: false\\n          value: 50\\n      year_of_birth: date-only\\n      time_of_birth: time-only\\n      dt_of_birth:\\n        type: datetime-only\\n        required: false\\n      addition_date:\\n        type: datetime\\n        format: rfc2616\\n      removal_date:\\n        type: datetime\\n      photo:\\n        type: file\\n        fileTypes:\\n          - image/jpeg\\n          - image/png\\n        minLength: 1\\n        maxLength: 307200\\n      description: nil\\n      habits?: string\\n      character: nil | string\\n      siblings: 'string[]'\\n      parents: 'CatName[]'\\n      ratingHistory: '(integer | number)[]'\\n      additionalData:\\n        type:\\n          type: object\\n          properties:\\n            weight: number\\n"}`;

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
    expect(result).toEqual(JSON.parse(expectedOutput).payload);

    // Check that the message got modified, i.e. adding extensions, setting the payload, etc.
    const message = (input.meta as any).message; 
    expect(JSON.stringify(message)).toEqual(expectedOutput);
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
    expect(result.path).toEqual(inputWithInvalidRAML.path);
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