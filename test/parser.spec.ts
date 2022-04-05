import { Spectral } from "@stoplight/spectral-core";
import { Parser } from '../src/parser';
import { AsyncAPISchemaParser } from '../src/schema-parser/asyncapi-schema-parser';

describe('Parser class', function() {
  it('should create Parser instance', async function() {
    const parser = new Parser();
    expect(parser).toBeInstanceOf(Parser);
  });

  it('should have default Spectral instance if no instance is specified in the constructor', async function() {
    const parser = new Parser();
    expect(parser.spectral).toBeInstanceOf(Spectral);
  });

  it('should have Spectral instance given in constructor', async function() {
    const spectral = new Spectral();
    const parser = new Parser({ spectral });
    expect(parser.spectral).toBeInstanceOf(Spectral);
    expect(parser.spectral).toEqual(spectral);
  });

  it('should register schema parser', async function() {
    const parser = new Parser();
    const schemaParser = AsyncAPISchemaParser();
    parser.registerSchemaParser(schemaParser);
    expect(parser.parserRegistry.size).toBeGreaterThan(1);
  });
});
