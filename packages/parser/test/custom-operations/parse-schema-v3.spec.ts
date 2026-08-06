import { AsyncAPIDocumentV3 } from '../../src/models';
import { Parser } from '../../src/parser';
import { filterLastVersionDiagnostics } from '../utils';

import type { v3 } from '../../src/spec-types';

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

    expect(document).toBeInstanceOf(AsyncAPIDocumentV3);
    expect(filterLastVersionDiagnostics(diagnostics).length === 0).toEqual(true);

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

    expect(document).toBeInstanceOf(AsyncAPIDocumentV3);
    expect(filterLastVersionDiagnostics(diagnostics).length === 0).toEqual(true);

    expect(((document?.json()?.channels?.channel as v3.ChannelObject).messages?.message as v3.MessageObject)?.payload).toEqual({ type: 'object', 'x-parser-schema-id': '<anonymous-schema-1>' });
  });

  it('should skip parsing unknown schema format and still return document', async function() {
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
    
    expect(document).toBeInstanceOf(AsyncAPIDocumentV3);
    expect(diagnostics.some(d => d.message?.includes('Unknown schema format'))).toEqual(false);
    expect(((document?.json()?.channels?.channel as v3.ChannelObject).messages?.message as v3.MessageObject)?.payload?.schema).toEqual({
      type: 'object',
      'x-parser-schema-id': '<anonymous-schema-1>',
    });
  });

  it('should allow custom schemaFormat application/octet-stream without invalidating the document', async function() {
    const documentRaw = {
      asyncapi: '3.0.0',
      info: {
        title: 'Test custom schema format',
        version: '0.1.0',
      },
      channels: {
        channel: {
          address: 'channel',
          messages: {
            message: {
              payload: {
                schemaFormat: 'application/octet-stream',
                schema: true,
              },
            },
          },
        },
      },
    };
    const { document, diagnostics } = await parser.parse(documentRaw);

    expect(document).toBeInstanceOf(AsyncAPIDocumentV3);
    expect(document?.info().title()).toEqual('Test custom schema format');
    expect(diagnostics.some(d => d.message?.includes('Unknown schema format'))).toEqual(false);
  });

  it('should parse avro schema format without registering AvroSchemaParser', async function() {
    const documentRaw = {
      asyncapi: '3.1.0',
      info: {
        title: 'Adeo AsyncAPI Case Study',
        version: '1.0.0',
      },
      channels: {
        costingRequestChannel: {
          address: 'adeo-{env}-case-study-COSTING-REQUEST-{version}',
          bindings: {
            kafka: {
              replicas: 3,
              partitions: 3,
            },
          },
          messages: {
            CostingRequest: {
              payload: {
                schemaFormat: 'application/vnd.apache.avro;version=1.9.0',
                schema: {
                  type: 'record',
                  name: 'CostingRequest',
                  fields: [],
                },
              },
            },
          },
        },
      },
      operations: {
        receiveACostingRequest: {
          action: 'receive',
          channel: {
            $ref: '#/channels/costingRequestChannel',
          },
          bindings: {
            kafka: {
              groupId: {
                type: 'string',
              },
            },
          },
        },
      },
    };
    const { document, diagnostics } = await parser.parse(documentRaw);

    expect(document).toBeInstanceOf(AsyncAPIDocumentV3);
    expect(filterLastVersionDiagnostics(diagnostics).length === 0).toEqual(true);
    expect(document!.allChannels().get('costingRequestChannel')?.bindings().get('kafka')?.json()).toEqual({
      replicas: 3,
      partitions: 3,
    });
    expect(document!.allOperations().get('receiveACostingRequest')?.bindings().get('kafka')?.json()?.groupId).toEqual({
      type: 'string',
    });
  });
});
