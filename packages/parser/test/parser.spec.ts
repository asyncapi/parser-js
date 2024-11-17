import path from 'path';
import fs from 'fs';
import { Spectral } from '@stoplight/spectral-core';
import { Parser } from '../src/parser';
import { AsyncAPISchemaParser } from '../src/schema-parser/asyncapi-schema-parser';
import { AsyncAPIDocumentInterface } from "../src";

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

  it('should give correct names to external references', async function() {
    const parser = new Parser();
    const source = path.resolve(__dirname, './mocks/simple-with-external-refs.yaml');
    const nestedSchemas = fs.readFileSync(source, 'utf8');

    const { document } = await parser.parse(nestedSchemas, { source });

    const channels = (document as AsyncAPIDocumentInterface).channels().all();
    const onUserRegisteredChannel = channels[0]
    const onUserLoggedChannel = channels[1]
    const userRegisteredMessagePayload = onUserRegisteredChannel.messages().all()[0].payload()?.json() as any;
    const userLoggedMessagePayload = onUserLoggedChannel.messages().all()[0].payload()?.json() as any;
    expect(userRegisteredMessagePayload?.["x-parser-schema-id"]).toBe("UserRegistered");
    expect(userLoggedMessagePayload?.["x-parser-schema-id"]).toBe("UserLogged");
  });
});
