import { Parser } from '../../src/parser';
import { xParserMessageName, xParserSchemaId } from '../../src/constants';

describe('custom operations - anonymous naming', function() {
  const parser = new Parser();

  it('should assign x-parser-message-name to anonymous message', async function() {
    const { document } = await parser.parse({
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            operationId: 'operation',
            message: {
              payload: {}
            }
          }
        }
      }
    });

    expect(document?.messages()).toHaveLength(1);
    expect(document?.messages()[0].extensions().get(xParserMessageName)?.value()).toEqual('<anonymous-message-1>');
  });

  it('should assign x-parser-message-name to component messages', async function() {
    const { document } = await parser.parse({
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            operationId: 'operation',
            message: {
              payload: {}
            }
          }
        }
      },
      components: {
        messages: {
          message: {
            payload: {}
          }
        }
      }
    });

    expect(document?.components().messages()).toHaveLength(1);
    expect(document?.components().messages()[0].extensions().get(xParserMessageName)?.value()).toEqual('message');
  });

  it('should try use messageId for x-parser-message-name', async function() {
    const { document } = await parser.parse({
      asyncapi: '2.4.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            operationId: 'operation',
            message: {
              $ref: '#/components/messages/message'
            }
          }
        }
      },
      components: {
        messages: {
          message: {
            messageId: 'someId',
            payload: {}
          }
        }
      }
    });

    expect(document?.messages()).toHaveLength(1);
    expect(document?.messages()[0].extensions().get(xParserMessageName)?.value()).toEqual('someId');
  });

  it('should not override x-parser-message-name if it exists', async function() {
    const { document } = await parser.parse({
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            operationId: 'operation',
            message: {
              $ref: '#/components/messages/message'
            }
          }
        }
      },
      components: {
        messages: {
          message: {
            payload: {}
          }
        }
      }
    });

    expect(document?.messages()).toHaveLength(1);
    expect(document?.messages()[0].extensions().get(xParserMessageName)?.value()).toEqual('message');
  });

  it('should assign x-parser-schema-id to anonymous schema', async function() {
    const { document } = await parser.parse({
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            operationId: 'operation1',
            message: {
              payload: {}
            }
          },
          subscribe: {
            operationId: 'operation2',
            message: {
              payload: {}
            }
          }
        }
      }
    });

    expect(document?.messages()[0].payload()?.extensions().get(xParserSchemaId)?.value()).toEqual('<anonymous-schema-1>');
    expect(document?.messages()[1].payload()?.extensions().get(xParserSchemaId)?.value()).toEqual('<anonymous-schema-2>');
  });

  it('should assign x-parser-schema-id to component schemas', async function() {
    const { document } = await parser.parse({
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            operationId: 'operation',
            message: {
              payload: {}
            }
          }
        }
      },
      components: {
        schemas: {
          schema1: {},
          schema2: {}
        }
      }
    });

    expect(document?.components().schemas()).toHaveLength(2);
    expect(document?.components().schemas()[0].extensions().get(xParserSchemaId)?.value()).toEqual('schema1');
    expect(document?.components().schemas()[1].extensions().get(xParserSchemaId)?.value()).toEqual('schema2');
  });

  it('should not override x-parser-schema-id if it exists', async function() {
    const { document } = await parser.parse({
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            operationId: 'operation',
            message: {
              payload: {
                $ref: '#/components/schemas/schema'
              }
            }
          }
        }
      },
      components: {
        schemas: {
          schema: {},
        }
      }
    });

    expect(document?.messages()[0].payload()?.extensions().get(xParserSchemaId)?.value()).toEqual('schema');
  });

  it('should apply anonymous ids across whole document', async function() {
    const { document, diagnostics } = await parser.parse({ 
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {
        'channel/{streetlightId}': {
          parameters: {
            streetlightId: {
              schema: {
                type: 'string',
              }
            }
          },
          subscribe: {
            message: {
              $ref: '#/components/messages/someMessage',
            },
          },
          publish: {
            message: {
              payload: {}
            }
          }
        }
      },
      components: {
        parameters: {
          someParameter: {
            schema: {
              type: 'string',
            }
          }
        },
        messages: {
          someMessage: {
            payload: {
              $ref: '#/components/schemas/someSchema',
            },
          },
        },
        schemas: {
          someSchema: {},
        }
      }
    });

    expect(document?.json()?.channels?.['channel/{streetlightId}']?.subscribe?.message?.[xParserMessageName]).toEqual('someMessage');
    expect((document?.json()?.channels?.['channel/{streetlightId}']?.subscribe?.message as any)?.payload?.[xParserSchemaId]).toEqual('someSchema');

    expect(document?.json()?.channels?.['channel/{streetlightId}']?.publish?.message?.[xParserMessageName]).toEqual('<anonymous-message-1>');
    expect((document?.json()?.channels?.['channel/{streetlightId}']?.publish?.message as any)?.payload?.[xParserSchemaId]).toEqual('<anonymous-schema-1>');

    expect((document?.json()?.channels?.['channel/{streetlightId}']?.parameters?.streetlightId as any)?.schema?.[xParserSchemaId]).toEqual('streetlightId');

    expect(document?.json()?.components?.messages?.someMessage?.[xParserMessageName]).toEqual('someMessage');
    expect((document?.json()?.channels?.['channel/{streetlightId}']?.subscribe?.message as any)?.payload?.[xParserSchemaId]).toEqual('someSchema');
    expect((document?.json()?.components?.parameters?.someParameter as any)?.schema?.[xParserSchemaId]).toEqual('someParameter');

    expect(document?.json()?.components?.schemas?.someSchema?.[xParserSchemaId]).toEqual('someSchema');
  });
});
