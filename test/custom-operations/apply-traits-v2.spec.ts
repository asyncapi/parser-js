import { AsyncAPIDocumentV2 } from '../../src/models';
import { Parser } from '../../src/parser';

import type { v2 } from '../../src/spec-types';

describe('custom operations - apply traits v3', function() {
  const parser = new Parser();

  it('should apply traits to operations', async function() {
    const documentRaw = {
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            operationId: 'publishId',
            traits: [
              {
                operationId: 'anotherPubId',
                description: 'some description' 
              },
              {
                description: 'another description' 
              }
            ]
          },
          subscribe: {
            operationId: 'subscribeId',
            traits: [
              {
                operationId: 'anotherSubId',
                description: 'some description' 
              },
              {
                description: 'another description' 
              }
            ]
          }
        }
      }
    };
    const { document, diagnostics } = await parser.parse(documentRaw);
    
    const v2Document = document as AsyncAPIDocumentV2;
    expect(v2Document).toBeInstanceOf(AsyncAPIDocumentV2);
    expect(diagnostics.length > 0).toEqual(true);

    const publish = v2Document?.json()?.channels?.channel?.publish;
    delete publish?.traits;
    expect(publish).toEqual({ operationId: 'anotherPubId', description: 'another description' });

    const subscribe = v2Document?.json()?.channels?.channel?.subscribe;
    delete subscribe?.traits;
    expect(subscribe).toEqual({ operationId: 'anotherSubId', description: 'another description' });
  });

  it('should apply traits to messages', async function() {
    const documentRaw = {
      asyncapi: '2.4.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            operationId: 'operationId',
            message: {
              messageId: 'messageId',
              traits: [
                {
                  messageId: 'anotherMessageId1',
                  description: 'some description' 
                },
                {
                  description: 'another description' 
                }
              ]
            }
          },
          subscribe: {
            message: {
              oneOf: [
                {
                  messageId: 'messageId',
                  traits: [
                    {
                      messageId: 'anotherMessageId2',
                      description: 'some description' 
                    },
                    {
                      description: 'another description' 
                    }
                  ]
                },
                {
                  messageId: 'messageId',
                  traits: [
                    {
                      messageId: 'anotherId',
                      description: 'some description' 
                    },
                    {
                      description: 'another description' 
                    },
                    {
                      messageId: 'anotherMessageId3',
                      description: 'simple description' 
                    }
                  ]
                }
              ],
            }
          }
        }
      }
    };
    const { document, diagnostics } = await parser.parse(documentRaw);
    
    const v2Document = document as AsyncAPIDocumentV2;
    expect(v2Document).toBeInstanceOf(AsyncAPIDocumentV2);
    expect(diagnostics.length > 0).toEqual(true);

    const message = v2Document?.json()?.channels?.channel?.publish?.message;
    delete (message as v2.MessageObject)?.traits;
    expect(message).toEqual({ messageId: 'anotherMessageId1', description: 'another description', 'x-parser-message-name': 'anotherMessageId1' });

    const messageOneOf1 = (v2Document?.json()?.channels?.channel?.subscribe?.message as { oneOf: Array<v2.MessageObject> }).oneOf[0];
    delete messageOneOf1?.traits;
    expect(messageOneOf1).toEqual({ messageId: 'anotherMessageId2', description: 'another description', 'x-parser-message-name': 'anotherMessageId2' });

    const messageOneOf2 = (v2Document?.json()?.channels?.channel?.subscribe?.message as { oneOf: Array<v2.MessageObject> }).oneOf[1];
    delete messageOneOf2?.traits;
    expect(messageOneOf2).toEqual({ messageId: 'anotherMessageId3', description: 'simple description', 'x-parser-message-name': 'anotherMessageId3' });
  });

  it('should preserve this same references', async function() {
    const documentRaw = {
      asyncapi: '2.4.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            operationId: 'publishId',
            message: {
              $ref: '#/components/messages/message',
            }
          },
        }
      },
      components: {
        messages: {
          message: {
            messageId: 'messageId',
            traits: [
              {
                messageId: 'anotherId',
                description: 'some description' 
              },
              {
                description: 'another description' 
              },
              {
                messageId: 'anotherMessageId3',
                description: 'simple description' 
              }
            ]
          }
        }
      }
    };
    const { document, diagnostics } = await parser.parse(documentRaw);

    const v2Document = document as AsyncAPIDocumentV2;
    expect(v2Document).toBeInstanceOf(AsyncAPIDocumentV2);
    expect(diagnostics.length > 0).toEqual(true);

    const message = v2Document?.json()?.channels?.channel?.publish?.message;
    delete (message as v2.MessageObject)?.traits;
    expect(message).toEqual({ messageId: 'anotherMessageId3', description: 'simple description', 'x-parser-message-name': 'anotherMessageId3' });
    expect(message === v2Document?.json()?.components?.messages?.message).toEqual(true);
  });
});
