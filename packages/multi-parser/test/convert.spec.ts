
import { Parser as ParserV1 } from 'parserapiv1';
import { Parser as ParserV2 } from 'parserapiv2';
import { Parser as ParserV3 } from 'parserapiv3/esm/index';

import { AsyncAPIDocument, ConvertDocumentParserAPIVersion } from '../src/convert';

describe('ConvertDocumentParserAPIVersion()', function() {
  it('Converts from Parser-API v1 to Parser-API v2', async function() {
    const doc = { asyncapi: '2.6.0', info: { title: '', description: '', version: ''}, channels: {} };
    const parsedDocParserV1 = (await new ParserV1().parse(doc)).document as AsyncAPIDocument;

    // Even though the value here is 1 for Parser V1, we force to be 2 for this test to do the equality check later.
    parsedDocParserV1['_json']['x-parser-api-version'] = 2;

    const parsedDocParserV2 = await new ParserV2().parse(doc);
    const convertedDoc = ConvertDocumentParserAPIVersion(parsedDocParserV1, 2);

    expect(convertedDoc).toEqual(parsedDocParserV2.document);
  });

  it('Converts from Parser-API v2 to Parser-API v1', async function() {
    const doc = { asyncapi: '2.6.0', info: { title: '', description: '', version: ''}, channels: {} };
    const parsedDocParserV2 = (await new ParserV2().parse(doc)).document as AsyncAPIDocument;

    // Even though the value here is 2 for Parser V2, we force to be 1 for this test to do the equality check later.
    parsedDocParserV2['_json']['x-parser-api-version'] = 1;

    const parsedDocParserV1 = (await new ParserV1().parse(doc)).document;
    const convertedDoc = ConvertDocumentParserAPIVersion(parsedDocParserV2, 1);
    expect(convertedDoc).toEqual(parsedDocParserV1);
  });

  it('Converts from Parser-API v3 to Parser-API v2', async function() {
    const doc = { asyncapi: '2.6.0', info: { title: '', description: '', version: ''}, channels: {} };
    const parsedDocParserV3 = (await new ParserV3().parse(doc)).document as AsyncAPIDocument;

    // Even though the value here is 3 for Parser V3, we force to be 2 for this test to do the equality check later.
    parsedDocParserV3['_json']['x-parser-api-version'] = 2;

    const parsedDocParserV2 = (await new ParserV2().parse(doc)).document;
    const convertedDoc = ConvertDocumentParserAPIVersion(parsedDocParserV3, 2);
    expect(convertedDoc).toEqual(parsedDocParserV2);
  });

  it('Converts from Parser-API v3 to Parser-API v1', async function() {
    const doc = { asyncapi: '2.6.0', info: { title: '', description: '', version: ''}, channels: {} };
    const parsedDocParserV3 = (await new ParserV3().parse(doc)).document as AsyncAPIDocument;

    // Even though the value here is 3 for Parser V3, we force to be 1 for this test to do the equality check later.
    parsedDocParserV3['_json']['x-parser-api-version'] = 1;

    const parsedDocParserV1 = (await new ParserV1().parse(doc)).document;
    const convertedDoc = ConvertDocumentParserAPIVersion(parsedDocParserV3, 1);
    expect(convertedDoc).toEqual(parsedDocParserV1);
  });
  
  it('Skips converting if no document is passed', async function() {
    const doc = { } as AsyncAPIDocument;
    const convertedDoc = ConvertDocumentParserAPIVersion(doc, 1);
    expect(convertedDoc).toEqual(doc);
  });
});
