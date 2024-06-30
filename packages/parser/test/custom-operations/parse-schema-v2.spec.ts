import { AsyncAPIDocumentV2 } from '../../src/models';
import { Parser } from '../../src/parser';

import type { v2 } from '../../src/spec-types';

describe('custom operations for v2 - parse schemas', function() {
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
    const { document, diagnostics } = await parser.parse(documentRaw);
    
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
    const { document, diagnostics } = await parser.parse(documentRaw);
    
    expect(document).toBeInstanceOf(AsyncAPIDocumentV2);
    expect(diagnostics.length > 0).toEqual(true);

    expect((document?.json()?.channels?.channel?.publish?.message as v2.MessageObject)?.payload).toEqual({ type: 'object', 'x-parser-schema-id': '<anonymous-schema-1>' });
  });

  it('should preserve this same references', async function() {
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
              $ref: '#/components/messages/message'
            }
          }
        }
      },
      components: {
        messages: {
          message: {
            payload: {
              type: 'object',
            }
          }
        }
      }
    };
    const { document, diagnostics } = await parser.parse(documentRaw);
    
    expect(document).toBeInstanceOf(AsyncAPIDocumentV2);
    expect(diagnostics.length > 0).toEqual(true);

    expect((document?.json()?.channels?.channel?.publish?.message as v2.MessageObject)?.payload).toEqual({ type: 'object', 'x-parser-schema-id': '<anonymous-schema-1>' });
    expect((document?.json().components?.messages?.message as v2.MessageObject)?.payload).toEqual({ type: 'object', 'x-parser-schema-id': '<anonymous-schema-1>' });
    // check if logic preserves references
    expect((document?.json()?.channels?.channel?.publish?.message as v2.MessageObject)?.payload === (document?.json().components?.messages?.message as v2.MessageObject)?.payload).toEqual(true);
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
    const { document, diagnostics } = await parser.parse(documentRaw);
    
    expect(document).toBeUndefined();
    expect(diagnostics.length > 0).toEqual(true);
  });
});
