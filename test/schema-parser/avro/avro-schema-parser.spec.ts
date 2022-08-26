import { ParseSchemaInput } from '../../../src/schema-parser/index';
import { AvroSchemaParser, avroToJsonSchema } from '../../../src/schema-parser/avro-schema-parser';
import { type Schema as AvroSchema} from "avsc";
import * as fs from 'fs';
import * as path from 'path';

const inputWithAvro182 = toParseInput(fs.readFileSync(path.resolve(__dirname, './asyncapi-avro-1.8.2.json'), 'utf8'));
const outputWithAvro182 = '{"payload":{"type":"object","required":["name","favoriteProgrammingLanguage","address"],"properties":{"name":{"type":"string","examples":["Donkey"]},"age":{"oneOf":[{"type":"integer","minimum":-2147483648,"maximum":2147483647},{"type":"null"}],"default":null},"favoriteProgrammingLanguage":{"type":"string","enum":["JS","Java","Go","Rust","C"]},"address":{"type":"object","required":["zipcode"],"properties":{"zipcode":{"type":"integer","minimum":-2147483648,"maximum":2147483647,"examples":[53003]}}}}},"x-parser-original-schema-format":"application/vnd.apache.avro;version=1.8.2","x-parser-original-payload":{"type":"record","fields":[{"name":"name","type":"string","example":"Donkey"},{"name":"age","type":["null","int"],"default":null},{"name":"favoriteProgrammingLanguage","type":{"name":"ProgrammingLanguage","type":"enum","symbols":["JS","Java","Go","Rust","C"]}},{"name":"address","type":{"name":"Address","type":"record","fields":[{"name":"zipcode","type":"int","example":53003}]}}]}}';

const inputWithAvro190 = toParseInput(fs.readFileSync(path.resolve(__dirname, './asyncapi-avro-1.9.0.json'), 'utf8'));
const outputWithAvro190 = '{"payload":{"type":"object","required":["name","favoriteProgrammingLanguage","address","someid"],"properties":{"name":{"type":"string","examples":["Donkey"]},"age":{"oneOf":[{"type":"integer","minimum":-2147483648,"maximum":2147483647,"examples":[123]},{"type":"null"}],"default":null},"favoriteProgrammingLanguage":{"type":"string","enum":["JS","Java","Go","Rust","C"],"default":"JS"},"address":{"type":"object","required":["zipcode"],"properties":{"zipcode":{"type":"integer","minimum":-2147483648,"maximum":2147483647,"examples":[53003]}}},"someid":{"type":"string","format":"uuid"}},"x-parser-schema-id":"Person"},"x-parser-original-schema-format":"application/vnd.apache.avro;version=1.9.0","x-parser-original-payload":{"name":"Person","type":"record","fields":[{"name":"name","type":"string","example":"Donkey"},{"name":"age","type":["null","int"],"default":null,"example":123},{"name":"favoriteProgrammingLanguage","type":{"name":"ProgrammingLanguage","type":"enum","symbols":["JS","Java","Go","Rust","C"],"default":"JS"}},{"name":"address","type":{"name":"Address","type":"record","fields":[{"name":"zipcode","type":"int","example":53003}]}},{"name":"someid","type":"string","logicalType":"uuid"}]}}';

const inputWithAvro190WithNamespace = toParseInput(fs.readFileSync(path.resolve(__dirname, './asyncapi-avro-1.9.0-namespace.json'), 'utf8'));
const outputWithAvro190WithNamespace = '{"payload":{"type":"object","required":["name","favoriteProgrammingLanguage","address","someid"],"properties":{"name":{"type":"string","examples":["Donkey"]},"age":{"oneOf":[{"type":"integer","minimum":-2147483648,"maximum":2147483647,"examples":[123]},{"type":"null"}],"default":null},"favoriteProgrammingLanguage":{"type":"string","enum":["JS","Java","Go","Rust","C"],"default":"JS"},"address":{"type":"object","required":["zipcode"],"properties":{"zipcode":{"type":"integer","minimum":-2147483648,"maximum":2147483647,"examples":[53003]}}},"someid":{"type":"string","format":"uuid"}},"x-parser-schema-id":"com.company.Person"},"x-parser-original-schema-format":"application/vnd.apache.avro;version=1.9.0","x-parser-original-payload":{"name":"Person","namespace":"com.company","type":"record","fields":[{"name":"name","type":"string","example":"Donkey"},{"name":"age","type":["null","int"],"default":null,"example":123},{"name":"favoriteProgrammingLanguage","type":{"name":"ProgrammingLanguage","type":"enum","symbols":["JS","Java","Go","Rust","C"],"default":"JS"}},{"name":"address","type":{"name":"Address","type":"record","fields":[{"name":"zipcode","type":"int","example":53003}]}},{"name":"someid","type":"string","logicalType":"uuid"}]}}';

const inputWithAvro190WithBindings = toParseInput(fs.readFileSync(path.resolve(__dirname, './asyncapi-avro-1.9.0-bindings.json'), 'utf8'));
const outputWithAvro190WithBindings = '{"payload":{"type":"object","required":["name","favoriteProgrammingLanguage","address","someid"],"properties":{"name":{"type":"string","examples":["Donkey"]},"age":{"oneOf":[{"type":"integer","minimum":-2147483648,"maximum":2147483647,"examples":[123]},{"type":"null"}],"default":null},"favoriteProgrammingLanguage":{"type":"string","enum":["JS","Java","Go","Rust","C"],"default":"JS"},"address":{"type":"object","required":["zipcode"],"properties":{"zipcode":{"type":"integer","minimum":-2147483648,"maximum":2147483647,"examples":[53003]}}},"someid":{"type":"string","format":"uuid"}},"x-parser-schema-id":"com.company.Person"},"bindings":{"kafka":{"key":{"type":"object","required":["name","favoriteProgrammingLanguage","address","someid"],"properties":{"name":{"type":"string","examples":["Donkey"]},"age":{"oneOf":[{"type":"integer","minimum":-2147483648,"maximum":2147483647,"examples":[123]},{"type":"null"}],"default":null},"favoriteProgrammingLanguage":{"type":"string","enum":["JS","Java","Go","Rust","C"],"default":"JS"},"address":{"type":"object","required":["zipcode"],"properties":{"zipcode":{"type":"integer","minimum":-2147483648,"maximum":2147483647,"examples":[53003]}}},"someid":{"type":"string","format":"uuid"}},"x-parser-schema-id":"com.company.Person"}},"mqtt":{"x-test":{"type":"string"}}},"x-parser-original-schema-format":"application/vnd.apache.avro;version=1.9.0","x-parser-original-payload":{"name":"Person","namespace":"com.company","type":"record","fields":[{"name":"name","type":"string","example":"Donkey"},{"name":"age","type":["null","int"],"default":null,"example":123},{"name":"favoriteProgrammingLanguage","type":{"name":"ProgrammingLanguage","type":"enum","symbols":["JS","Java","Go","Rust","C"],"default":"JS"}},{"name":"address","type":{"name":"Address","type":"record","fields":[{"name":"zipcode","type":"int","example":53003}]}},{"name":"someid","type":"string","logicalType":"uuid"}]},"x-parser-original-bindings-kafka-key":{"name":"Person","namespace":"com.company","type":"record","fields":[{"name":"name","type":"string","example":"Donkey"},{"name":"age","type":["null","int"],"default":null,"example":123},{"name":"favoriteProgrammingLanguage","type":{"name":"ProgrammingLanguage","type":"enum","symbols":["JS","Java","Go","Rust","C"],"default":"JS"}},{"name":"address","type":{"name":"Address","type":"record","fields":[{"name":"zipcode","type":"int","example":53003}]}},{"name":"someid","type":"string","logicalType":"uuid"}]}}';

const inputWithAvroAdditionalAttributes = toParseInput(fs.readFileSync(path.resolve(__dirname, './asyncapi-avro-1.9.0-additional-attributes.json'), 'utf8'));
const outputWithAvroAdditionalAttributes = '{"payload":{"type":"object","required":["name","serialNo","favoriteProgrammingLanguage","certifications","address","weight","height","someid"],"properties":{"name":{"type":"string","examples":["Donkey"],"minLength":0},"serialNo":{"type":"string","minLength":0,"maxLength":50},"email":{"oneOf":[{"type":"string","examples":["donkey@asyncapi.com"],"pattern":"^[\\\\w-\\\\.]+@([\\\\w-]+\\\\.)+[\\\\w-]{2,4}$"},{"type":"null"}]},"age":{"oneOf":[{"type":"integer","minimum":-2147483648,"maximum":2147483647,"examples":[123],"exclusiveMinimum":0,"exclusiveMaximum":200},{"type":"null"}],"default":null},"favoriteProgrammingLanguage":{"type":"string","enum":["JS","Java","Go","Rust","C"],"default":"JS"},"certifications":{"type":"array","items":{"type":"string"},"minItems":1,"maxItems":500,"uniqueItems":true},"address":{"type":"object","required":["zipcode"],"properties":{"zipcode":{"type":"integer","minimum":-2147483648,"maximum":2147483647,"examples":[53003]},"country":{"oneOf":[{"type":"string"},{"type":"null"}]}}},"weight":{"type":"number","format":"float","examples":[65.1],"minimum":0,"maximum":500},"height":{"type":"number","format":"double","examples":[1.85],"minimum":0,"maximum":3},"someid":{"type":"string","format":"uuid"}},"x-parser-schema-id":"com.company.Person"},"x-parser-original-schema-format":"application/vnd.apache.avro;version=1.9.0","x-parser-original-payload":{"name":"Person","namespace":"com.company","type":"record","fields":[{"name":"name","type":"string","example":"Donkey","minLength":0},{"name":"serialNo","type":"string","minLength":0,"maxLength":50},{"name":"email","type":["null","string"],"example":"donkey@asyncapi.com","pattern":"^[\\\\w-\\\\.]+@([\\\\w-]+\\\\.)+[\\\\w-]{2,4}$"},{"name":"age","type":["null","int"],"default":null,"example":123,"exclusiveMinimum":0,"exclusiveMaximum":200},{"name":"favoriteProgrammingLanguage","type":{"name":"ProgrammingLanguage","type":"enum","symbols":["JS","Java","Go","Rust","C"],"default":"JS"}},{"name":"certifications","type":{"type":"array","items":"string","minItems":1,"maxItems":500,"uniqueItems":true}},{"name":"address","type":{"name":"Address","type":"record","fields":[{"name":"zipcode","type":"int","example":53003},{"name":"country","type":["null","string"]}]}},{"name":"weight","type":"float","example":65.1,"minimum":0,"maximum":500},{"name":"height","type":"double","example":1.85,"minimum":0,"maximum":3},{"name":"someid","type":"string","logicalType":"uuid"}]}}';

const inputWithInvalidAvro = toParseInput(fs.readFileSync(path.resolve(__dirname, './asyncapi-avro-invalid.json'), 'utf8'));
const inputWithBrokenAvro = toParseInput(fs.readFileSync(path.resolve(__dirname, './asyncapi-avro-broken.json'), 'utf8'));

const inputWithSubAvro190 = toParseInput(fs.readFileSync(path.resolve(__dirname, './asyncapi-avro-111-1.9.0.json'), 'utf8'));
const outputWithSubAvro190 = '{"payload":{"type":"object","required":["metadata","auth_code","triggered_by"],"properties":{"metadata":{"type":"object","required":["id","timestamp"],"properties":{"id":{"type":"string","format":"uuid","description":"Unique identifier for this specific event"},"timestamp":{"type":"integer","minimum":-9223372036854776000,"maximum":9223372036854776000,"description":"Instant the event took place (not necessary when it was published)"},"correlation_id":{"oneOf":[{"type":"string","format":"uuid"},{"type":"null"}],"description":"id of the event that resulted in this\\nevent being published (optional)","default":null},"publisher_context":{"oneOf":[{"type":"object","additionalProperties":{"type":"string"}},{"type":"null"}],"description":"optional set of key-value pairs of context to be echoed back\\nin any resulting message (like a richer\\ncorrelationId.\\n\\nThese values are likely only meaningful to the publisher\\nof the correlated event","default":null}},"description":"Metadata to be associated with every published event"},"auth_code":{"type":"object","required":["value","nonce","key"],"properties":{"value":{"type":"string","description":"A sequence of bytes that has been AES encrypted in CTR mode."},"nonce":{"type":"string","description":"A nonce, used by the CTR encryption mode for our encrypted value. Not encrypted, not a secret."},"key":{"type":"string","description":"An AES key, used to encrypt the value field, that has itself been encrypted using RSA."}},"description":"Encrypted auth_code received when user authorizes the app."},"refresh_token":{"type":"object","required":["value","nonce","key"],"properties":{"value":{"type":"string","description":"A sequence of bytes that has been AES encrypted in CTR mode."},"nonce":{"type":"string","description":"A nonce, used by the CTR encryption mode for our encrypted value. Not encrypted, not a secret."},"key":{"type":"string","description":"An AES key, used to encrypt the value field, that has itself been encrypted using RSA."}},"description":"Encrypted auth_code received when user authorizes the app."},"triggered_by":{"type":"string","format":"uuid","description":"ID of the user who triggered this event."}},"description":"An example schema to illustrate the issue","x-parser-schema-id":"com.foo.connections.ConnectionRequested"},"x-parser-original-schema-format":"application/vnd.apache.avro;version=1.9.0","x-parser-original-payload":{"type":"record","name":"ConnectionRequested","namespace":"com.foo.connections","doc":"An example schema to illustrate the issue","fields":[{"name":"metadata","type":{"type":"record","name":"EventMetadata","namespace":"com.foo","doc":"Metadata to be associated with every published event","fields":[{"name":"id","type":{"type":"string","logicalType":"uuid"},"doc":"Unique identifier for this specific event"},{"name":"timestamp","type":{"type":"long","logicalType":"timestamp-millis"},"doc":"Instant the event took place (not necessary when it was published)"},{"name":"correlation_id","type":["null",{"type":"string","logicalType":"uuid"}],"doc":"id of the event that resulted in this\\nevent being published (optional)","default":null},{"name":"publisher_context","type":["null",{"type":"map","values":{"type":"string","avro.java.string":"String"},"avro.java.string":"String"}],"doc":"optional set of key-value pairs of context to be echoed back\\nin any resulting message (like a richer\\ncorrelationId.\\n\\nThese values are likely only meaningful to the publisher\\nof the correlated event","default":null}]}},{"name":"auth_code","type":{"type":"record","name":"EncryptedString","namespace":"com.foo","doc":"A string that was encrypted with AES (using CTR mode), its key encrypted with RSA, and the nonce used for the encryption.","fields":[{"name":"value","type":"string","doc":"A sequence of bytes that has been AES encrypted in CTR mode."},{"name":"nonce","type":"string","doc":"A nonce, used by the CTR encryption mode for our encrypted value. Not encrypted, not a secret."},{"name":"key","type":"string","doc":"An AES key, used to encrypt the value field, that has itself been encrypted using RSA."}]},"doc":"Encrypted auth_code received when user authorizes the app."},{"name":"refresh_token","type":"com.foo.EncryptedString","doc":"Encrypted refresh_token generated by using clientId and clientSecret."},{"name":"triggered_by","type":{"type":"string","logicalType":"uuid"},"doc":"ID of the user who triggered this event."}]}}';

const inputWithOneOfReferenceAvro190 = toParseInput(fs.readFileSync(path.resolve(__dirname, './asyncapi-avro-113-1.9.0.json'), 'utf8'));
const outputWithOneOfReferenceAvro190 = '{"payload":{"oneOf":[{"type":"object","required":["streetaddress","city"],"properties":{"streetaddress":{"type":"string"},"city":{"type":"string"}},"x-parser-schema-id":"com.example.Address"},{"type":"object","required":["firstname","lastname"],"properties":{"firstname":{"type":"string"},"lastname":{"type":"string"},"address":{"type":"object","required":["streetaddress","city"],"properties":{"streetaddress":{"type":"string"},"city":{"type":"string"}},"x-parser-schema-id":"com.example.Address"}},"x-parser-schema-id":"com.example.Person"}]},"x-parser-original-schema-format":"application/vnd.apache.avro;version=1.9.0","x-parser-original-payload":[{"type":"record","name":"Address","namespace":"com.example","fields":[{"name":"streetaddress","type":"string"},{"name":"city","type":"string"}]},{"type":"record","name":"Person","namespace":"com.example","fields":[{"name":"firstname","type":"string"},{"name":"lastname","type":"string"},{"name":"address","type":"com.example.Address"}]}]}';

describe('AvroSchemaParser', function () {
  const parser = AvroSchemaParser();

  it('should return Mime Types', async function () {
    expect(parser.getMimeTypes()).not.toEqual([]);
  });
  it('should parse Avro schema 1.8.2', async function() {
    await doTest(inputWithAvro182, outputWithAvro182);
  });
  it('should parse Avro schema 1.9.0', async function() {
    await doTest(inputWithAvro190, outputWithAvro190);
  });

  it('should parse Avro schema 1.9.0 with a namespace', async function() {
    await doTest(inputWithAvro190WithNamespace, outputWithAvro190WithNamespace);
  });
  it('should parse Avro schema in kafka bindings', async function() {
    await doTest(inputWithAvro190WithBindings, outputWithAvro190WithBindings);
  });
  it('should handle additional Avro attributes like', async function() {
    await doTest(inputWithAvroAdditionalAttributes, outputWithAvroAdditionalAttributes);
  });
  it('should validate invalid Avro schemas as invalid', async function() {
    const result = await parser.validate(inputWithInvalidAvro);
    expect(result).toEqual([{"message": "unknown type: undefined", "path": []}]);
  });
  it('should validate valid Avro schemas', async function() {
    const result = await parser.validate(inputWithAvro182);
    expect(result).toHaveLength(0);
  });
  it('should identify bugs in Avro schemas', async function() {
    const result = await parser.validate(inputWithBrokenAvro);
    expect(result).toEqual([{"message": "undefined type name: notAValidAvroType", "path": []}]);
  });
  it('Issue #111 should handle pre defined records in schemas', async function() {
    await doTest(inputWithSubAvro190, outputWithSubAvro190);
  });
  it('Issue #113 should handle pre defined records in top level oneOf schema', async function() {
    await doTest(inputWithOneOfReferenceAvro190, outputWithOneOfReferenceAvro190);
  });

  async function doTest(originalInput: ParseSchemaInput, expectedOutput: any) {
    const input = {...originalInput};
    const result = await parser.parse(input);

    // Check that the return value of parse() is the expected JSON Schema.
    expect(result).toEqual(JSON.parse(expectedOutput).payload);

    // Check that the message got modified, i.e. adding extensions, setting the payload, etc.
    const message = (input.meta as any).message; 
    expect(JSON.stringify(message)).toEqual(expectedOutput);
  }
});

const BYTES_PATTERN = '^[\u0000-\u00ff]*$';
const INT_MIN = Math.pow(-2, 31);
const INT_MAX = Math.pow(2, 31) - 1;
const LONG_MIN = Math.pow(-2, 63);
const LONG_MAX = Math.pow(2, 63) - 1;

describe('avroToJsonSchema()', function () {
  it('transforms null values', async function () {
    const result = await avroToJsonSchema({type: 'null'});
    expect(result).toEqual({type: 'null'});
  });

  it('transforms boolean values', async function () {
    const result = await avroToJsonSchema({type: 'boolean'});
    expect(result).toEqual({type: 'boolean'});
  });

  it('transforms int values', async function () {
    const result = await avroToJsonSchema({type: 'int'});
    expect(result).toEqual({type: 'integer', minimum: INT_MIN, maximum: INT_MAX});
  });

  it('transforms long values', async function () {
    const result = await avroToJsonSchema({type: 'long'});
    expect(result).toEqual({type: 'integer', minimum: LONG_MIN, maximum: LONG_MAX});
  });

  it('transforms float values', async function () {
    const result = await avroToJsonSchema({type: 'float'});
    expect(result).toEqual({type: 'number', format: 'float'});
  });

  it('transforms double values', async function () {
    const result = await avroToJsonSchema({type: 'double'});
    expect(result).toEqual({type: 'number', format: 'double'});
  });

  it('transforms bytes values', async function () {
    const result = await avroToJsonSchema({type: 'bytes'});
    expect(result).toEqual({type: 'string', pattern: BYTES_PATTERN});
  });

  it('transforms string values', async function () {
    const result = await avroToJsonSchema({type: 'string'});
    expect(result).toEqual({type: 'string'});
  });

  it('transforms fixed values', async function () {
    const schema = {type: 'fixed', size: 5};
    const result = await avroToJsonSchema(schema as AvroSchema);
    expect(result).toEqual({type: 'string', pattern: BYTES_PATTERN, minLength: 5, maxLength: 5});
  });

  it('transforms union values', async function () {
    const result = await avroToJsonSchema(['null', 'int']);
    expect(result).toEqual({oneOf: [{type: 'integer', minimum: INT_MIN, maximum: INT_MAX}, {type: 'null'}]});
  });

  it('transforms map values', async function () {
    const result = await avroToJsonSchema({type: 'map', values: 'long'});
    expect(result).toEqual({
      type: 'object',
      additionalProperties: {type: 'integer', minimum: LONG_MIN, maximum: LONG_MAX}
    });
  });

  it('transforms array values', async function () {
    const result = await avroToJsonSchema({type: 'array', items: 'long'});
    expect(result).toEqual({type: 'array', items: {type: 'integer', minimum: LONG_MIN, maximum: LONG_MAX}});
  });

  it('transforms enum values', async function () {
    const schema = {
      type: 'enum',
      doc: 'My test enum',
      symbols: ['one', 'two', 'three'],
      default: 'one'
    };

    const result = await avroToJsonSchema(schema as AvroSchema);
    expect(result).toEqual({
      type: 'string',
      enum: ['one', 'two', 'three'],
      default: 'one',
      description: 'My test enum'
    });
  });

  it('transforms record values', async function () {
    const result = await avroToJsonSchema({
      type: 'record',
      doc: 'My test record',
      name: 'MyName',
      fields: [
        {name: 'key1', type: 'long', doc: 'Key1 docs'},
        {name: 'key2', type: 'string', default: 'value2', doc: 'Key2 docs'},
      ]
    });
    expect(result).toEqual({
      type: 'object',
      'x-parser-schema-id': 'MyName',
      description: 'My test record',
      required: ['key1'],
      properties: {
        key1: {
          type: 'integer',
          minimum: LONG_MIN,
          maximum: LONG_MAX,
          description: 'Key1 docs',
        },
        key2: {
          type: 'string',
          default: 'value2',
          description: 'Key2 docs',
        },
      }
    });
  });

  it('assigns default values correctly in types and fields', async function () {
    expect(
      await avroToJsonSchema({type: 'int', default: 1})
    ).toEqual({type: 'integer', minimum: INT_MIN, maximum: INT_MAX, default: 1});

    const schema = {type: 'record', fields: [{name: 'field1', type: 'string', default: 'AsyncAPI rocks!'}]};
    expect(
      await avroToJsonSchema(schema as AvroSchema)
    ).toEqual({
      type: 'object',
      properties: {field1: {type: 'string', default: 'AsyncAPI rocks!'}}
    });
  });

  it('treats array Avro documents as unions', async function () {
    expect(
      await avroToJsonSchema([{type: 'int', default: 1}, 'string'])
    ).toEqual({
      oneOf: [
        {type: 'integer', minimum: INT_MIN, maximum: INT_MAX, default: 1},
        {type: 'string'},
      ]
    });
  });
});

function toParseInput(raw: string): ParseSchemaInput {
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
    data: message.payload,
    meta: {
      message: message,
    },
    path: [],
    schemaFormat: message.schemaFormat,
    defaultSchemaFormat: "application/vnd.aai.asyncapi;version=2.4.0",
  };

  return schemaInput;
}

describe('supportExampleAttribute', function () {
  it('transforms example on union values', async function () {
    const schema = {
      type: 'record',
      name: 'MyName',
      fields: [
        {name: 'example', type: ['null', 'int'], example: 3}
      ]
    };
    const result = await avroToJsonSchema(schema as AvroSchema);
    expect(result).toEqual({
      type: 'object',
      'x-parser-schema-id': 'MyName',
      properties: {
        example: {
          oneOf: [{
            type: 'integer',
            minimum: INT_MIN,
            maximum: INT_MAX,
            examples: [3]
          }, {
            type: 'null'
          }
          ]
        }
      }
    });
  });
});

describe('requiredAttributesMapping()', function () {
  it('support required fields', async function () {
    const result = await avroToJsonSchema({
      type: 'record',
      doc: 'My test record',
      name: 'MyName',
      fields: [
        {name: 'required1', type: ['int', 'long']},
        {name: 'required2', type: ['long']},
        {name: 'notRequiredBecauseDefault', type: 'string', default: 'value2'},
        {name: 'notRequiredBecauseUnionWithNull', type: ['null', 'string']},
      ]
    });
    expect(result).toMatchObject({
      type: 'object',
      'x-parser-schema-id': 'MyName',
      description: 'My test record',
      required: ['required1', 'required2']
    });
  });
});

describe('additionalAttributesMapping()', function () {
  it('support minimum and maximum for float', async function () {
    const result = await avroToJsonSchema({type: 'float', minimum: 0, maximum: 10});
    expect(result).toEqual({type: 'number', format: 'float', minimum: 0, maximum: 10});
  });

  it('support exclusiveMinimum and exclusiveMaximum for float', async function () {
    const result = await avroToJsonSchema({type: 'float', exclusiveMinimum: 0, exclusiveMaximum: 10});
    expect(result).toEqual({type: 'number', format: 'float', exclusiveMinimum: 0, exclusiveMaximum: 10});
  });

  it('support minimum and maximum for double', async function () {
    const result = await avroToJsonSchema({type: 'double', minimum: 0, maximum: 10});
    expect(result).toEqual({type: 'number', format: 'double', minimum: 0, maximum: 10});
  });

  it('support exclusiveMinimum and exclusiveMaximum for double', async function () {
    const result = await avroToJsonSchema({type: 'double', exclusiveMinimum: 0, exclusiveMaximum: 10});
    expect(result).toMatchObject({type: 'number', format: 'double', exclusiveMinimum: 0, exclusiveMaximum: 10});
  });

  it('support minimum and maximum for long and int', async function () {
    let result = await avroToJsonSchema({type: 'long', minimum: 0, maximum: 10});
    expect(result).toEqual({type: 'integer', minimum: 0, maximum: 10});

    result = await avroToJsonSchema({type: 'int', minimum: 0, maximum: 10});
    expect(result).toEqual({type: 'integer', minimum: 0, maximum: 10});
  });

  it('long and int type support exclusiveMinimum and exclusiveMaximum', async function () {
    let result = await avroToJsonSchema({type: 'long', exclusiveMinimum: 0, exclusiveMaximum: 10});
    expect(result).toMatchObject({type: 'integer', exclusiveMinimum: 0, exclusiveMaximum: 10});

    result = await avroToJsonSchema({type: 'int', exclusiveMinimum: 0, exclusiveMaximum: 10});
    expect(result).toMatchObject({type: 'integer', exclusiveMinimum: 0, exclusiveMaximum: 10});
  });

  it('support pattern, minLength and maxLength for string', async function () {
    const result = await avroToJsonSchema({type: 'string', pattern: '$pattern^', minLength: 1, maxLength: 10});
    expect(result).toEqual({type: 'string', pattern: '$pattern^', minLength: 1, maxLength: 10});
  });

  it('handle non-negative integer value for minLength and maxLength', async function () {
    const result = await avroToJsonSchema({type: 'string', minLength: -1, maxLength: -110});
    expect(result).toEqual({type: 'string'});
  });

  it('support minItems and maxItems for array', async function () {
    const result = await avroToJsonSchema({type: 'array', items: 'long', minItems: 0, maxItems: 10});
    expect(result).toMatchObject({type: 'array', items: {type: 'integer'}, minItems: 0, maxItems: 10});
  });

  it('support uniqueItems for array', async function () {
    const result = await avroToJsonSchema({type: 'array', items: 'long', uniqueItems: true});
    expect(result).toMatchObject({type: 'array', items: {type: 'integer'}, uniqueItems: true});
  });
});