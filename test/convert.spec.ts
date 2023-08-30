
import { Parser as ParserV2 } from 'parserv2';
import { Parser as ParserV3 } from 'parserv3';

import { AsyncAPIDocument, ConvertDocumentParserAPIVersion } from '../src/convert';

describe('ConvertDocumentParserAPIVersion()', function() {
  it('Converts from Parser-API v1 to Parser-API v2', async function() {
    const doc = { asyncapi: '2.6.0', info: { title: '', description: '', version: ''}, channels: {} };
    const parsedDocParserV2 = (await new ParserV2().parse(doc)).document as AsyncAPIDocument;

    // Even though the value here is '1' for Parser V3, we force to be '2.0.0' for this test to do the equality check later.
    parsedDocParserV2['_json']['x-parser-api-version'] = '2.0.0';

    const parsedDocParserV3 = await new ParserV3().parse(doc);
    const convertedDoc = ConvertDocumentParserAPIVersion(parsedDocParserV2, '2.0.0');
    expect(convertedDoc).toEqual(parsedDocParserV3.document);
  });

  it('Converts from Parser-API v2 to Parser-API v1', async function() {
    const doc = { asyncapi: '2.6.0', info: { title: '', description: '', version: ''}, channels: {} };
    const parsedDocParserV3 = (await new ParserV3().parse(doc)).document as AsyncAPIDocument;

    // Even though the value here is '2.0.0' for Parser V3, we force to be 1 for this test to do the equality check later.
    parsedDocParserV3['_json']['x-parser-api-version'] = 1;

    const parsedDocParserV2 = (await new ParserV2().parse(doc)).document;
    const convertedDoc = ConvertDocumentParserAPIVersion(parsedDocParserV3, '1.0.0');
    expect(convertedDoc).toEqual(parsedDocParserV2);
  });
  
  it('Skips converting if no document is passed', async function() {
    const doc = { } as AsyncAPIDocument;
    const convertedDoc = ConvertDocumentParserAPIVersion(doc, '1.0.0');
    expect(convertedDoc).toEqual(doc);
  });
});