import { AsyncAPIDocumentV2 } from '../src/models';
import { Parser } from '../src/parser';
import { parse } from '../src/parse';

describe('parse()', function() {
  const parser = new Parser();

  it('should parse valid document', async function() {
    const document = {
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {}
    }
    const { parsed, diagnostics } = await parse(parser, document);
    
    expect(parsed).toBeInstanceOf(AsyncAPIDocumentV2);
    expect(diagnostics.length > 0).toEqual(true);
  });

  it('should parse invalid document', async function() {
    const document = {
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
    }
    const { parsed, diagnostics } = await parse(parser, document);
    
    expect(parsed).toEqual(undefined);
    expect(diagnostics.length > 0).toEqual(true);
  });
});
