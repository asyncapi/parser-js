
import { Parser as ParserV2 } from 'parserv2';
import { Parser as ParserV3 } from 'parserv3';

import { NewParser } from '../src/index';

describe('NewParser()', function() {
  it('Creates a Parser without options compatible with Parser-API v1 and caches it', async function() {
    const parser = NewParser('1.0.0');
    expect(parser).toBeInstanceOf(ParserV2);

    // Test cached parser is the same as the one we previously created.
    expect(NewParser('1.0.0')).toStrictEqual(parser);
  });

  it('Creates a Parser with options compatible with Parser-API v1 and skips cache', async function() {
    const options = { applyTraits: false };
    const parser = NewParser('1.0.0', options);
    expect(parser).toBeInstanceOf(ParserV2);

    // Test no cached parser is returned
    expect(NewParser('1.0.0', options)).not.toStrictEqual(parser);
  });

  it('Creates a Parser without options compatible with Parser-API v2 and caches it', async function() {
    const parser = NewParser('2.0.0');
    expect(parser).toBeInstanceOf(ParserV3);

    // Test cached parser is the same as the one we previously created.
    expect(NewParser('2.0.0')).toStrictEqual(parser);
  });

  it('Creates a Parser with options compatible with Parser-API v2 and skips cache', async function() {
    const options = { applyTraits: false };
    const parser = NewParser('2.0.0', options);
    expect(parser).toBeInstanceOf(ParserV3);

    // Test no cached parser is returned
    expect(NewParser('2.0.0', options)).not.toStrictEqual(parser);
  });

  it('Creates a Parser without options compatible with old Parser API (AKA v0) and caches it', async function() {
    const parser = NewParser(''); // could be '0.0.0' as well
    expect(parser).toBeInstanceOf(ParserV3); // Using Parser v3 (latest atm) by default

    // Test cached parser is the same as the one we previously created.
    expect(NewParser('')).toStrictEqual(parser);
  });

  it('Creates a Parser with options compatible with old Parser API (AKA v0) and skips cache', async function() {
    const options = { applyTraits: false };
    const parser = NewParser('0.0.0', options); // could be empty string as well
    expect(parser).toBeInstanceOf(ParserV3);

    // Test no cached parser is returned
    expect(NewParser('0.0.0', options)).not.toStrictEqual(parser);
  });
});