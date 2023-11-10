import { AsyncAPIDocumentV2, AsyncAPIDocumentV3 } from '../src/models';
import { Parser } from '../src/parser';

describe('custom resolver', function() {
  it('Reply channel + messages[] Ids come from JSON Pointer', async function() {
    const parser = new Parser();

    const documentRaw = `{
      "asyncapi": "3.0.0",
      "info": {
        "title": "Account Service",
        "version": "1.0.0",
        "description": "This service is in charge of processing user signups"
      },
      "channels": {
        "user/signedup": {
          "address": "user/signedup",
          "messages": {
            "subscribe.message": {
              "$ref": "#/components/messages/UserSignedUp"
            }
          }
        }
      },
      "operations": {
        "user/signedup.subscribe": {
          "action": "send",
          "channel": {
            "$ref": "#/channels/user~1signedup"
          },
          "messages": [
            {
              "$ref": "#/components/messages/UserSignedUp"
            }
          ],
          "reply": {
            "channel": {
              "$ref": "#/channels/user~1signedup"
            },
            "messages": [
              {
                "$ref": "#/components/messages/UserSignedUp"
              }
            ]
          }
        }
      },
      "components": {
        "messages": {
          "UserSignedUp": {
            "payload": {
              "type": "object",
              "properties": {
                "displayName": {
                  "type": "string",
                  "description": "Name of the user"
                },
                "email": {
                  "type": "string",
                  "format": "email",
                  "description": "Email of the user"
                }
              }
            }
          }
        }
      }
    }`;
    const { document } = await parser.parse(documentRaw);
    
    expect(document).toBeInstanceOf(AsyncAPIDocumentV3);
   
    const operation = document?.operations().get('user/signedup.subscribe');
    const replyObj = operation?.reply();
    expect(replyObj?.channel()?.id()).toEqual('user/signedup');
    
    const message = replyObj?.messages()?.get('UserSignedUp');
    expect(message).toBeDefined();
    expect(message?.id()).toEqual('UserSignedUp');
  });

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
                } else if (uri.valueOf() === 'customProtocol:///anotherRef.txt' && uri.suffix() === 'txt') {
                  return '{"anotherRef": "value"}';
                }
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
                $ref: 'customProtocol:///anotherRef.txt'
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

  it('should resolve custom protocols (using custom options in parse function)', async function() {
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
              payload: {
                $ref: 'customProtocol:///someRef'
              }
            }
          },
          subscribe: {
            operationId: 'subscribe',
            message: {
              payload: {
                $ref: 'customProtocol:///anotherRef.txt'
              }
            }
          },
        }
      },
    };
    const { document } = await parser.parse(documentRaw, {
      __unstable: {
        resolver: {
          resolvers: [
            {
              schema: 'customProtocol',
              read(uri) {
                if (uri.path() === '/someRef') {
                  return '{"someRef": "value"}';
                } else if (uri.valueOf() === 'customProtocol:///anotherRef.txt' && uri.suffix() === 'txt') {
                  return '{"anotherRef": "value"}';
                }
              },
            }
          ]
        }
      }
    });
    
    expect(document).toBeInstanceOf(AsyncAPIDocumentV2);
    const someRef = document?.channels().get('channel')?.operations().get('publish')?.messages()[0]?.payload();
    expect(someRef?.json()).toEqual({ someRef: 'value', 'x-parser-schema-id': '<anonymous-schema-1>' });
    expect(someRef?.json('$ref' as any)).toBeUndefined();
    const anotherRef = document?.channels().get('channel')?.operations().get('subscribe')?.messages()[0]?.payload();
    expect(anotherRef?.json()).toEqual({ anotherRef: 'value', 'x-parser-schema-id': '<anonymous-schema-2>' });
    expect(anotherRef?.json('$ref' as any)).toBeUndefined();
  });
});
