import { Spectral } from '@stoplight/spectral-core';
import { Parser } from '../src/parser';
import { AsyncAPISchemaParser } from '../src/schema-parser/asyncapi-schema-parser';

describe('Parser class', function() {
  it('should create Parser instance', async function() {
    const parser = new Parser();
    expect(parser).toBeInstanceOf(Parser);
  });

  it('should have Spectral instance given in constructor', async function() {
    const parser = new Parser();
    expect((parser as any).spectral).toBeInstanceOf(Spectral);
  });

  it('should register schema parser', async function() {
    const parser = new Parser();
    parser.registerSchemaParser(AsyncAPISchemaParser());
    expect((parser as any).parserRegistry.size).toBeGreaterThan(1);
  });
});
