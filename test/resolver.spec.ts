import { AsyncAPIDocumentV2 } from '../src/models';
import { Parser } from '../src/parser';

describe('custom resolver', function() {
  it('should resolve document references', async function() {
    const parser = new Parser();

    const documentRaw = {
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            operationId: 'publish',
            message: {
              $ref: '#/components/messages/message'
            }
          },
        }
      },
      components: {
        messages: {
          message: {
            payload: {
              type: 'string'
            }
          }
        }
      }
    };
    const { document } = await parser.parse(documentRaw);
    
    expect(document).toBeInstanceOf(AsyncAPIDocumentV2);
    const refMessage = document?.channels().get('channel')?.operations().get('publish')?.messages()[0];
    expect(refMessage?.json()).not.toBeUndefined();
    expect(refMessage?.json() === document?.components().messages().get('message')?.json()).toEqual(true);
  });

  it('should resolve file references', async function() {
    const parser = new Parser();

    const documentRaw = {
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            operationId: 'publish',
            message: {
              $ref: './mocks/simple-message.yaml'
            }
          },
        }
      },
    };
    const { document } = await parser.parse(documentRaw, { source: __filename });
    
    expect(document).toBeInstanceOf(AsyncAPIDocumentV2);
    const refMessage = document?.channels().get('channel')?.operations().get('publish')?.messages()[0];
    expect(refMessage?.json()).not.toBeUndefined();
    expect(refMessage?.json('$ref')).toBeUndefined();
  });

  it('should resolve http references', async function() {
    const parser = new Parser();

    const documentRaw = {
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            operationId: 'publish',
            message: {
              $ref: 'https://raw.githubusercontent.com/asyncapi/spec/v2.0.0/examples/2.0.0/streetlights.yml#/components/messages/lightMeasured'
            }
          },
        }
      },
    };
    const { document } = await parser.parse(documentRaw);
    expect(document).toBeInstanceOf(AsyncAPIDocumentV2); // we should have parsed document
  });

  it('should resolve custom protocols', async function() {
    const parser = new Parser({
      __unstable: {
        resolver: {
          resolvers: [
            {
              schema: 'customProtocol',
              read(uri) {
                if (uri.path() === '/someRef') {
                  return '{"someRef": "value"}';
                }
                return '{"anotherRef": "value"}';
              },
            }
          ]
        }
      }
    });

    const documentRaw = {
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            operationId: 'publish',
            message: {
              payload: {
                $ref: 'customProtocol:///someRef'
              }
            }
          },
          subscribe: {
            operationId: 'subscribe',
            message: {
              payload: {
                $ref: 'customProtocol:///anotherRef'
              }
            }
          },
        }
      },
    };
    const { document } = await parser.parse(documentRaw);
    
    expect(document).toBeInstanceOf(AsyncAPIDocumentV2);
    const someRef = document?.channels().get('channel')?.operations().get('publish')?.messages()[0]?.payload();
    expect(someRef?.json()).toEqual({ someRef: 'value', 'x-parser-schema-id': '<anonymous-schema-1>' });
    expect(someRef?.json('$ref' as any)).toBeUndefined();
    const anotherRef = document?.channels().get('channel')?.operations().get('subscribe')?.messages()[0]?.payload();
    expect(anotherRef?.json()).toEqual({ anotherRef: 'value', 'x-parser-schema-id': '<anonymous-schema-2>' });
    expect(anotherRef?.json('$ref' as any)).toBeUndefined();
  });
});
