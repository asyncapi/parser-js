import { AsyncAPIDocumentV3 } from '../../src/models';
import { Parser } from '../../src/parser';

import type { v3 } from '../../src/spec-types';

describe('custom operations for v3 - parse schemas', function() {
  const parser = new Parser();

  it('should parse valid schema format', async function() {
    const documentRaw = {
      asyncapi: '3.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0'
      },
      channels: {
        channel: {
          address: 'channel',
          messages: {
            message: {
              payload: {
                schemaFormat: 'application/vnd.aai.asyncapi;version=2.0.0',
                schema: {
                  type: 'object'
                }
              }
            }
          }
        }
      }
    };
    const { document, diagnostics } = await parser.parse(documentRaw);

    expect(document).toBeInstanceOf(AsyncAPIDocumentV3);
    expect(diagnostics.length === 0).toEqual(true);

    expect(((document?.json()?.channels?.channel as v3.ChannelObject).messages?.message as v3.MessageObject)?.payload?.schema).toEqual({ type: 'object', 'x-parser-schema-id': '<anonymous-schema-1>' });
  });

  it('should parse valid default schema format', async function() {
    const documentRaw = {
      asyncapi: '3.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0'
      },
      channels: {
        channel: {
          address: 'channel',
          messages: {
            message: {
              payload: {
                type: 'object'
              }
            }
          }
        }
      }
    };
    const { document, diagnostics } = await parser.parse(documentRaw);
    
    expect(document).toBeInstanceOf(AsyncAPIDocumentV3);
    expect(diagnostics.length === 0).toEqual(true);

    expect(((document?.json()?.channels?.channel as v3.ChannelObject).messages?.message as v3.MessageObject)?.payload).toEqual({ type: 'object', 'x-parser-schema-id': '<anonymous-schema-1>' });
  });

  it('should preserve this same references', async function() {
    const documentRaw = {
      asyncapi: '3.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0'
      },
      channels: {
        channel: {
          address: 'channel',
          messages: {
            message: {
              $ref: '#/components/messages/message'
            }
          }
        }
      },
      operations: {
        operationId: {
          action: 'receive',
          channel: {
            $ref: '#/channels/channel'
          },
          messages: [
            {
              $ref: '#/components/messages/message'
            }
          ]
        }
      },
      components: {
        messages: {
          message: {
            payload: {
              type: 'object'
            }
          }
        }
      }
    };
    const { document, diagnostics } = await parser.parse(documentRaw);
    console.log(diagnostics);
    expect(document).toBeInstanceOf(AsyncAPIDocumentV3);
    expect(diagnostics.length === 0).toEqual(true);

    expect(((document?.json()?.channels?.channel as v3.ChannelObject).messages?.message as v3.MessageObject)?.payload).toEqual({ type: 'object', 'x-parser-schema-id': '<anonymous-schema-1>' });
    expect((document?.json().components?.messages?.message as v3.MessageObject)?.payload).toEqual({ type: 'object', 'x-parser-schema-id': '<anonymous-schema-1>' });
    // check if logic preserves references
    expect(((document?.json()?.channels?.channel as v3.ChannelObject).messages?.message as v3.MessageObject)?.payload === (document?.json().components?.messages?.message as v3.MessageObject)?.payload).toEqual(true);
  });

  it('should parse invalid schema format', async function() {
    const documentRaw = {
      asyncapi: '3.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0'
      },
      channels: {
        channel: {
          address: 'channel',
          messages: {
            message: {
              payload: {
                schemaFormat: 'not existing',
                schema: {
                  type: 'object'
                }
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
