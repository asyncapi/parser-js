import { AsyncAPIDocumentV2 } from '../../src/models';
import { Parser } from '../../src/parser';
import { parse } from '../../src/parse';
import { xParserOriginalPayload } from '../../src/constants';

import type { v2 } from '../../src/spec-types';

describe('custom operations - parse schemas', function() {
  const parser = new Parser();

  it('should parse valid schema format', async function() {
    const document = {
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
    const { parsed, diagnostics } = await parse(parser, document);
    
    expect(parsed).toBeInstanceOf(AsyncAPIDocumentV2);
    expect(diagnostics.length > 0).toEqual(true);

    expect((parsed?.json()?.channels?.channel?.publish?.message as v2.MessageObject)?.payload).toEqual({ type: 'object' });
    expect((parsed?.json()?.channels?.channel?.publish?.message as v2.MessageObject)?.[xParserOriginalPayload]).toEqual({ type: 'object' });
    expect((parsed?.json()?.channels?.channel?.publish?.message as v2.MessageObject)?.payload).toEqual((parsed?.json()?.channels?.channel?.publish?.message as v2.MessageObject)?.[xParserOriginalPayload]);
  });

  it('should parse valid default schema format', async function() {
    const document = {
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
    const { parsed, diagnostics } = await parse(parser, document);
    
    expect(parsed).toBeInstanceOf(AsyncAPIDocumentV2);
    expect(diagnostics.length > 0).toEqual(true);

    expect((parsed?.json()?.channels?.channel?.publish?.message as v2.MessageObject)?.payload).toEqual({ type: 'object' });
    expect((parsed?.json()?.channels?.channel?.publish?.message as v2.MessageObject)?.[xParserOriginalPayload]).toEqual({ type: 'object' });
    expect((parsed?.json()?.channels?.channel?.publish?.message as v2.MessageObject)?.payload).toEqual((parsed?.json()?.channels?.channel?.publish?.message as v2.MessageObject)?.[xParserOriginalPayload]);
  });

  it('should parse invalid schema format', async function() {
    const document = {
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
    const { parsed, diagnostics } = await parse(parser, document);
    
    expect(parsed).toBeUndefined();
    expect(diagnostics.length > 0).toEqual(true);
  });
});
