
import { Parser as ParserV2 } from 'parserv2';
import { Parser as ParserV3 } from 'parserv3';

import { AvroSchemaParser } from '@asyncapi/avro-schema-parser';
import { OpenAPISchemaParser } from '@asyncapi/openapi-schema-parser';
import { RamlDTSchemaParser } from '@asyncapi/raml-dt-schema-parser';
import { ProtoBuffSchemaParser } from '@asyncapi/protobuf-schema-parser';

import { NewParser } from '../src/index';
import type { Options } from '../src/parse';

const fakeSchemaParser = {
  validate: jest.fn().mockReturnValue(Promise.resolve(null)),
  parse: jest.fn().mockReturnValue(Promise.resolve({})),
  getMimeTypes: jest.fn().mockReturnValue(['fake-format']),
};

describe('NewParser()', function() {
  it('Creates a Parser without options compatible with Parser-API v1 and caches it', async function() {
    const parser = NewParser('1.0.0');
    expect(parser).toBeInstanceOf(ParserV2);
  });

  it('Creates a Parser with options compatible with Parser-API v1', async function() {
    const options: Options = { parserOptions: { schemaParsers: [fakeSchemaParser]} };
    const parser = NewParser('1.0.0', options);
    
    expect(parser).toBeInstanceOf(ParserV2);
    expect(parser.parserRegistry.get('fake-format')).not.toBeUndefined();
  });

  it('Creates a Parser with options including known Schema Parsers and do not overwrite those with Parser-API v1', async function() {
    const knownSchemaParser = AvroSchemaParser();
    const options: Options = { parserOptions: { schemaParsers: [knownSchemaParser]}, includeSchemaParsers: true };
    const parser = NewParser('1.0.0', options);
    
    expect(parser).toBeInstanceOf(ParserV2);
    expect(parser.parserRegistry.get(knownSchemaParser.getMimeTypes()[0])).toStrictEqual(knownSchemaParser);
    expect(parser.parserRegistry.get(OpenAPISchemaParser().getMimeTypes()[0])).toEqual(OpenAPISchemaParser());
    expect(parser.parserRegistry.get(RamlDTSchemaParser().getMimeTypes()[0])).toEqual(RamlDTSchemaParser());
    expect(parser.parserRegistry.get(ProtoBuffSchemaParser().getMimeTypes()[0])).toEqual(ProtoBuffSchemaParser());
  });

  it('Creates a Parser without options compatible with Parser-API v2', async function() {
    const parser = NewParser('2.0.0');
    expect(parser).toBeInstanceOf(ParserV3);
  });

  it('Creates a Parser with options compatible with Parser-API v2', async function() {
    const options: Options = { parserOptions: { schemaParsers: [fakeSchemaParser]} };
    const parser = NewParser('2.0.0', options);
    expect(parser).toBeInstanceOf(ParserV3);
    expect(parser.parserRegistry.get('fake-format')).not.toBeUndefined();
  });

  it('Creates a Parser with options including known Schema Parsers and do not overwrite those with Parser-API v2', async function() {
    const knownSchemaParser = AvroSchemaParser();
    const options: Options = { parserOptions: { schemaParsers: [knownSchemaParser]}, includeSchemaParsers: true };
    const parser = NewParser('2.0.0', options);
    
    expect(parser).toBeInstanceOf(ParserV3);
    expect(parser.parserRegistry.get(knownSchemaParser.getMimeTypes()[0])).toStrictEqual(knownSchemaParser);
    expect(parser.parserRegistry.get(OpenAPISchemaParser().getMimeTypes()[0])).toEqual(OpenAPISchemaParser());
    expect(parser.parserRegistry.get(RamlDTSchemaParser().getMimeTypes()[0])).toEqual(RamlDTSchemaParser());
    expect(parser.parserRegistry.get(ProtoBuffSchemaParser().getMimeTypes()[0])).toEqual(ProtoBuffSchemaParser());
  });

  it('Creates a Parser without options compatible with old Parser API (AKA v0)', async function() {
    const parser = NewParser(''); // could be '0.0.0' as well
    expect(parser).toBeInstanceOf(ParserV3); // Using Parser v3 (latest atm) by default
  });

  it('Creates a Parser with options compatible with old Parser API (AKA v0)', async function() {
    const options: Options = { parserOptions: { schemaParsers: [fakeSchemaParser]} };
    const parser = NewParser('0.0.0', options); // could be empty string as well
    expect(parser).toBeInstanceOf(ParserV3);
    expect(parser.parserRegistry.get('fake-format')).not.toBeUndefined();
  });

  it('Creates a Parser with options including known Schema Parsers and do not overwrite those with Parser-API v2', async function() {
    const knownSchemaParser = AvroSchemaParser();
    const options: Options = { parserOptions: { schemaParsers: [knownSchemaParser]}, includeSchemaParsers: true };
    const parser = NewParser('0.0.0', options);
    
    expect(parser).toBeInstanceOf(ParserV3);
    expect(parser.parserRegistry.get(knownSchemaParser.getMimeTypes()[0])).toStrictEqual(knownSchemaParser);
    expect(parser.parserRegistry.get(OpenAPISchemaParser().getMimeTypes()[0])).toEqual(OpenAPISchemaParser());
    expect(parser.parserRegistry.get(RamlDTSchemaParser().getMimeTypes()[0])).toEqual(RamlDTSchemaParser());
    expect(parser.parserRegistry.get(ProtoBuffSchemaParser().getMimeTypes()[0])).toEqual(ProtoBuffSchemaParser());
  });
});