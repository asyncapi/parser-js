import { AsyncAPIDocumentV3 } from '../../src/models';
import { Parser } from '../../src/parser';
import { ValidateSchemaInput, ParseSchemaInput } from '../../src/schema-parser';

import type { v3 } from '../../src/spec-types';
import { SchemaValidateResult, AsyncAPISchema } from '../../src/types';

describe('custom operations for v3 - parse schemas', function() {
  const parser = new Parser();

  it('should parse valid schema format and preserve reference', async function() {
    const documentRaw = {
      asyncapi: '3.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0'
      },
      channels: {
        channel: {
          $ref: '#/components/channels/channel'
        }
      },
      operations: {
        operation: {
          action: 'receive',
          channel: {
            $ref: '#/channels/channel'
          },
          messages: [
            {
              $ref: '#/channels/channel/messages/message'
            }
          ]
        }
      },
      components: {
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
        messages: {
          message: {
            headers: {
              $ref: '#/components/schemas/schema'
            },
            payload: {
              $ref: '#/components/schemas/schema'
            }
          }
        },
        schemas: {
          schema: {
            schemaFormat: 'application/vnd.aai.asyncapi;version=2.0.0',
            schema: {
              type: 'object'
            }
          }
        }
      }
    };
    const { document, diagnostics } = await parser.parse(documentRaw);
    // Ignore asyncapi-latest-version diagnostic - not relevant to this test and would require updating version each release
    const filteredDiagnostics = diagnostics.filter(d => d.code !== 'asyncapi-latest-version');

    expect(document).toBeInstanceOf(AsyncAPIDocumentV3);
    expect(filteredDiagnostics.length === 0).toEqual(true);

    expect(((document?.json()?.channels?.channel as v3.ChannelObject).messages?.message as v3.MessageObject)?.payload?.schema).toEqual({ type: 'object', 'x-parser-schema-id': '<anonymous-schema-1>' });
    expect(((((document?.json() as any).operations?.operation as v3.OperationObject).channel as v3.ChannelObject)?.messages?.message as v3.MessageObject)?.payload?.schema).toEqual({ type: 'object', 'x-parser-schema-id': '<anonymous-schema-1>' });
    expect((((document?.json() as any).operations?.operation as v3.OperationObject).messages?.[0] as v3.MessageObject)?.payload?.schema).toEqual({ type: 'object', 'x-parser-schema-id': '<anonymous-schema-1>' });
    expect(((document?.json()?.components?.channels?.channel as v3.ChannelObject).messages?.message as v3.MessageObject)?.payload?.schema).toEqual({ type: 'object', 'x-parser-schema-id': '<anonymous-schema-1>' });
    expect((document?.json()?.components?.messages?.message as v3.MessageObject)?.payload?.schema).toEqual({ type: 'object', 'x-parser-schema-id': '<anonymous-schema-1>' });
    expect((((document?.json() as any).components?.messages?.message as v3.MessageObject)?.headers as v3.MultiFormatObject).schema).toEqual({ type: 'object', 'x-parser-schema-id': '<anonymous-schema-1>' });
    expect((document?.json() as any).components?.schemas?.schema?.schema).toEqual({ type: 'object', 'x-parser-schema-id': '<anonymous-schema-1>' });
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
    // Ignore asyncapi-latest-version diagnostic - not relevant to this test and would require updating version each release
    const filteredDiagnostics = diagnostics.filter(d => d.code !== 'asyncapi-latest-version');

    expect(document).toBeInstanceOf(AsyncAPIDocumentV3);
    expect(filteredDiagnostics.length === 0).toEqual(true);

    expect(((document?.json()?.channels?.channel as v3.ChannelObject).messages?.message as v3.MessageObject)?.payload).toEqual({ type: 'object', 'x-parser-schema-id': '<anonymous-schema-1>' });
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

describe('custom parsers are executed for v3 - parse schemas', function() {
  const parser = new Parser();
  parser.registerSchemaParser({
    getMimeTypes (): string[] {
      return ['testFormat'];
    },
    validate (input: ValidateSchemaInput<unknown, unknown>): void | SchemaValidateResult[] | Promise<void | SchemaValidateResult[]> {
      return [];
    },
    parse (input: ParseSchemaInput<unknown, unknown>): AsyncAPISchema | Promise<AsyncAPISchema> {
      return {title: 'parsedFormat'};
    }
  });

  it('should parse schemas only defined through an operations channel', async function () {
    const documentRaw = {
      asyncapi: '3.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0'
      },
      operations: {
        operation: {
          action: 'receive',
          channel: {
            address: 'channel',
            messages: {
              message: {
                payload: {
                  schemaFormat: 'testFormat',
                  schema: {
                    type: 'object'
                  }
                }
              }
            }
          },
        }
      },
    };

    const { document, diagnostics } = await parser.parse(documentRaw);

    expect(document).toBeInstanceOf(AsyncAPIDocumentV3);
    expect(diagnostics.length === 0).toEqual(true);

    expect(((((document?.json() as any).operations?.operation as v3.OperationObject).channel as v3.ChannelObject)?.messages?.message as v3.MessageObject)?.payload?.schema).toEqual({ title: 'parsedFormat'});
  });
});