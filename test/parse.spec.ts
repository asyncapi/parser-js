import { Document } from '@stoplight/spectral-core';

import { AsyncAPIDocumentV2, AsyncAPIDocumentV3 } from '../src/models';
import { Parser } from '../src/parser';
import { xParserApiVersion } from '../src/constants';

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
    const { document, diagnostics } = await parser.parse(documentRaw);
    
    expect(document).toBeInstanceOf(AsyncAPIDocumentV2);
    expect(diagnostics.length > 0).toEqual(true);
  });

  it('should not parse valid v3 document', async function() { 
    const documentRaw = {
      asyncapi: '3.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {}
    };
    const { document, diagnostics } = await parser.parse(documentRaw);
    expect(document).toBeInstanceOf(AsyncAPIDocumentV3);
    expect(diagnostics.length === 0).toEqual(true);
  });

  it('should parse invalid document', async function() {
    const documentRaw = {
      asyncapi: '2.0.0',
      info: {
        title: 'Invalid AsyncApi document',
        version: '1.0',
      },
    };
    const { document, diagnostics } = await parser.parse(documentRaw);
    
    expect(document).toEqual(undefined);
    expect(diagnostics.length > 0).toEqual(true);
  });

  it('should parse invalid v3 document', async function() {
    const documentRaw = {
      asyncapi: '3.0.0',
      not_a_valid_info_object: {
        title: 'Invalid AsyncApi document',
        version: '1.0',
      },
    };
    const { document, diagnostics } = await parser.parse(documentRaw);
    
    expect(document).toBeInstanceOf(AsyncAPIDocumentV3);
    expect(diagnostics.length === 0).toEqual(true); // Validation in v3 is still not enabled. This test will intentionally fail once that changes.
  });

  it('should return extras', async function() {
    const documentRaw = {
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {}
    };
    const { document, diagnostics, extras } = await parser.parse(documentRaw);
    
    expect(document).toBeInstanceOf(AsyncAPIDocumentV2);
    expect(extras?.document).toBeInstanceOf(Document);
    expect(diagnostics.length > 0).toEqual(true);
  });

  it('should assign x-parser-api-version extension to the 1 value', async function() {
    const documentRaw = {
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {}
    };
    const { document } = await parser.parse(documentRaw);
    
    expect(document).toBeInstanceOf(AsyncAPIDocumentV2);
    expect(document?.extensions().get(xParserApiVersion)?.value()).toEqual(1);
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
    const { document } = await parser.parse(documentRaw);
    
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
    const { document } = await parser.parse(documentRaw);

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
    const { document } = await parser.parse(documentRaw, { source: __filename });

    const messagePayload = document?.channels().get('channel')?.operations().get('someId')?.messages()[0].payload();
    const circular = messagePayload?.properties()?.['circular'];
    const deepProperty = circular?.properties()?.['deepProperty'];
    const deepCircular = deepProperty?.properties()?.['circular'];
    expect(deepProperty?.json() !== undefined).toEqual(true);
    expect(deepCircular?.json() !== undefined).toEqual(true);
    expect(deepProperty?.json() === deepCircular?.json()).toEqual(true); // expect that same reference
  });

  it('should throw errors when references url does not exist (#224 issue)', async function() {
    const documentRaw = {
      asyncapi: '2.0.0',
      info: {
        title: 'Invalid AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            operationId: 'someId',
            message: {
              payload: {
                $ref: 'http://hopefullu-it-does-not-exist.com/some-file.yaml#/components/schemas/schema'
              }
            }
          }
        }
      }
    };
    const { document, diagnostics } = await parser.parse(documentRaw);
    const filteredDiagnostics = diagnostics.filter(d => d.code === 'invalid-ref');
    
    expect(document).toBeUndefined();
    expect(diagnostics.length > 0).toEqual(true);
    expect(filteredDiagnostics.length).toEqual(1);
    expect(filteredDiagnostics[0].message).toEqual('FetchError: request to http://hopefullu-it-does-not-exist.com/some-file.yaml failed, reason: getaddrinfo ENOTFOUND hopefullu-it-does-not-exist.com');
  });

  it('should throw errors when local reference does not exist (#360 issue)', async function() {
    const documentRaw = {
      asyncapi: '2.0.0',
      info: {
        title: 'Invalid AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            operationId: 'someId',
            message: {
              $ref: '#components/messages/message1',
            }
          }
        }
      },
      components: {
        messages: {
          message1: {
            name: 'unusedMessage',
            title: 'This is most definityly a message.',
          }
        }
      }
    };
    const { document, diagnostics } = await parser.parse(documentRaw);
    const filteredDiagnostics = diagnostics.filter(d => d.code === 'invalid-ref');
    
    expect(document).toBeUndefined();
    expect(diagnostics.length > 0).toEqual(true);
    expect(filteredDiagnostics.length).toEqual(1);
    expect(filteredDiagnostics[0].message).toEqual('\'#components/messages/message1\' JSON pointer is invalid');
  });
});
