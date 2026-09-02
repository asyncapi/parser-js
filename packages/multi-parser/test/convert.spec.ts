
import { Parser as ParserV3 } from '@asyncapi/parser';

import { AsyncAPIDocument, ConvertDocumentParserAPIVersion } from '../src/convert';

describe('ConvertDocumentParserAPIVersion()', function() {
  it('Throws when converting to Parser-API v1, which is no longer supported', async function() {
    const doc = { asyncapi: '2.6.0', info: { title: '', description: '', version: ''}, channels: {} };
    const parsedDocParserV3 = (await new ParserV3().parse(doc)).document as AsyncAPIDocument;
    parsedDocParserV3['_json']['x-parser-api-version'] = 2;

    expect(() => ConvertDocumentParserAPIVersion(parsedDocParserV3, 1)).toThrow(/Parser API v1 is no longer supported/);
  });

  it('Throws when converting to Parser-API v2, which is no longer supported', async function() {
    const doc = { asyncapi: '2.6.0', info: { title: '', description: '', version: ''}, channels: {} };
    const parsedDocParserV3 = (await new ParserV3().parse(doc)).document as AsyncAPIDocument;
    parsedDocParserV3['_json']['x-parser-api-version'] = 1;

    expect(() => ConvertDocumentParserAPIVersion(parsedDocParserV3, 2)).toThrow(/Parser API v2 is no longer supported/);
  });

  it('Skips converting if no document is passed', async function() {
    const doc = { } as AsyncAPIDocument;
    const convertedDoc = ConvertDocumentParserAPIVersion(doc, 3);
    expect(convertedDoc).toEqual(doc);
  });
});
