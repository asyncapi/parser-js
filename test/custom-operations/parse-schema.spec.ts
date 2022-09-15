import { AsyncAPIDocumentV2 } from '../../src/models';
import { Parser } from '../../src/parser';
import { parse } from '../../src/parse';
import { xParserOriginalPayload } from '../../src/constants';

import type { v2 } from '../../src/spec-types';

describe('custom operations - parse schemas', function() {
  const parser = new Parser();

  it('should parse valid schema format', async function() {
    const documentRaw = {
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            operationId: 'operationId',
            message: {
              schemaFormat: 'application/vnd.aai.asyncapi;version=2.0.0',
              payload: {
                type: 'object',
              }
            }
          }
        }
      }
    };
    const { document, diagnostics } = await parse(parser, documentRaw);
    
    expect(document).toBeInstanceOf(AsyncAPIDocumentV2);
    expect(diagnostics.length > 0).toEqual(true);

    expect((document?.json()?.channels?.channel?.publish?.message as v2.MessageObject)?.payload).toEqual({ type: 'object', 'x-parser-schema-id': '<anonymous-schema-1>' });
  });

  it('should parse valid default schema format', async function() {
    const documentRaw = {
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            operationId: 'operationId',
            message: {
              payload: {
                type: 'object',
              }
            }
          }
        }
      }
    };
    const { document, diagnostics } = await parse(parser, documentRaw);
    
    expect(document).toBeInstanceOf(AsyncAPIDocumentV2);
    expect(diagnostics.length > 0).toEqual(true);

    expect((document?.json()?.channels?.channel?.publish?.message as v2.MessageObject)?.payload).toEqual({ type: 'object', 'x-parser-schema-id': '<anonymous-schema-1>' });
  });

  it('should parse invalid schema format', async function() {
    const documentRaw = {
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            operationId: 'operationId',
            message: {
              schemaFormat: 'not existing',
              payload: {
                type: 'object',
              }
            }
          }
        }
      }
    };
    const { document, diagnostics } = await parse(parser, documentRaw);
    
    expect(document).toBeUndefined();
    expect(diagnostics.length > 0).toEqual(true);
  });
});
