import { AsyncAPIDocumentV2 } from '../src/models';
import { Parser } from '../src/parser';
import { parse } from '../src/parse';

describe('parse()', function() {
  const parser = new Parser();

  it('should parse valid document', async function() {
    const documentRaw = {
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {}
    };
    const { document, diagnostics } = await parse(parser, documentRaw);
    
    expect(document).toBeInstanceOf(AsyncAPIDocumentV2);
    expect(diagnostics.length > 0).toEqual(true);
  });

  it('should parse invalid document', async function() {
    const documentRaw = {
      asyncapi: '2.0.0',
      info: {
        title: 'Invalid AsyncApi document',
        version: '1.0',
      },
    };
    const { document, diagnostics } = await parse(parser, documentRaw);
    
    expect(document).toEqual(undefined);
    expect(diagnostics.length > 0).toEqual(true);
  });

  it('should preserve references', async function() {
    const documentRaw = {
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            operationId: 'publishOperation',
            message: {
              $ref: '#/components/messages/message'
            }
          },
          subscribe: {
            operationId: 'subscribeOperation',
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
    const { document } = await parse(parser, documentRaw);
    
    const publishMessage = document?.channels().get('channel')?.operations().get('publishOperation')?.messages()[0];
    const subscribeMessage = document?.channels().get('channel')?.operations().get('subscribeOperation')?.messages()[0];
    const componentsMessage = document?.components()?.messages()?.get('message');
    expect(publishMessage?.json() !== undefined).toEqual(true);
    expect(subscribeMessage?.json() !== undefined).toEqual(true);
    expect(componentsMessage?.json() !== undefined).toEqual(true);
    expect(componentsMessage?.json() === publishMessage?.json()).toEqual(true);
    expect(componentsMessage?.json() === subscribeMessage?.json()).toEqual(true);
    expect(publishMessage?.json() === subscribeMessage?.json()).toEqual(true);
  });

  it('should parse circular references (in this same document)', async function() {
    const documentRaw = {
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            operationId: 'someId',
            message: {
              payload: {
                properties: {
                  nonCircular: {
                    type: 'string',
                  },
                  circular: {
                    $ref: '#/channels/channel/publish/message/payload'
                  }
                }
              }
            }
          }
        }
      }
    };
    const { document } = await parse(parser, documentRaw);

    const messagePayload = document?.channels().get('channel')?.operations().get('someId')?.messages()[0].payload();
    expect(messagePayload?.json() !== undefined).toEqual(true);
    expect(messagePayload?.properties()?.['circular'].json() !== undefined).toEqual(true);
    expect(messagePayload?.properties()?.['circular'].json() === messagePayload?.json()).toEqual(true); // expect that same reference
  });

  it('should parse circular references (in external file)', async function() {
    const documentRaw = {
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            operationId: 'someId',
            message: {
              payload: {
                properties: {
                  nonCircular: {
                    type: 'string',
                  },
                  circular: {
                    $ref: './mocks/parse/circular-ref.yaml'
                  }
                }
              }
            }
          }
        }
      }
    };
    const { document } = await parse(parser, documentRaw, { validateOptions: { path: __filename } });

    const messagePayload = document?.channels().get('channel')?.operations().get('someId')?.messages()[0].payload();
    const circular = messagePayload?.properties()?.['circular'];
    const deepProperty = circular?.properties()?.['deepProperty'];
    const deepCircular = deepProperty?.properties()?.['circular'];
    expect(deepProperty?.json() !== undefined).toEqual(true);
    expect(deepCircular?.json() !== undefined).toEqual(true);
    expect(deepProperty?.json() === deepCircular?.json()).toEqual(true); // expect that same reference
  });
});
