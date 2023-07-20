import { AsyncAPIDocumentV3 } from '../../src/models';
import { Parser } from '../../src/parser';

import type { v3 } from '../../src/spec-types';

describe('custom operations - apply traits v3', function() {
  const parser = new Parser();

  it('should apply traits to operations', async function() {
    const documentRaw = {
      asyncapi: '3.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      operations: {
        someOperation1: {
          traits: [
            {
              description: 'some description' 
            },
            {
              description: 'another description' 
            }
          ]
        },
        someOperation2: {
          description: 'root description',
          traits: [
            {
              description: 'some description' 
            },
            {
              description: 'another description' 
            }
          ]
        }
      }
    };
    const { document, diagnostics } = await parser.parse(documentRaw);
    const v3Document = document as AsyncAPIDocumentV3;
    expect(v3Document).toBeInstanceOf(AsyncAPIDocumentV3);
    // expect(diagnostics.length > 0).toEqual(true);

    const someOperation1 = v3Document?.json()?.operations?.someOperation1;
    delete someOperation1?.traits;
    expect(someOperation1).toEqual({ description: 'another description' });

    const someOperation2 = v3Document?.json()?.operations?.someOperation2;
    delete someOperation2?.traits;
    expect(someOperation2).toEqual({ description: 'root description' });
  });

  it('should apply traits to messages (channels)', async function() {
    const documentRaw = {
      asyncapi: '3.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {
        someChannel1: {
          messages: [
            {
              traits: [
                {
                  messageId: 'traitMessageId',
                  description: 'some description' 
                },
                {
                  description: 'another description' 
                }
              ]
            }
          ]
        },
        someChannel2: {
          messages: [
            {
              messageId: 'rootMessageId',
              description: 'root description',
              traits: [
                {
                  messageId: 'traitMessageId',
                  description: 'some description' 
                },
                {
                  description: 'another description' 
                }
              ]
            }
          ]
        }
      }
    };
    const { document } = await parser.parse(documentRaw);
    
    const v3Document = document as AsyncAPIDocumentV3;
    expect(v3Document).toBeInstanceOf(AsyncAPIDocumentV3);

    const message1 = v3Document?.json()?.channels?.someChannel1?.messages?.[0];
    delete (message1 as v3.MessageObject)?.traits;
    expect(message1).toEqual({ messageId: 'traitMessageId', description: 'another description', 'x-parser-message-name': 'traitMessageId' });

    const message2 = v3Document?.json()?.channels?.someChannel2?.messages?.[0];
    delete (message2 as v3.MessageObject)?.traits;
    expect(message2).toEqual({ messageId: 'rootMessageId', description: 'root description', 'x-parser-message-name': 'rootMessageId' });
  });

  it('should apply traits to messages (components)', async function() {
    const documentRaw = {
      asyncapi: '3.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      components: {
        messages: {
          someMessage1: {
            traits: [
              {
                messageId: 'traitMessageId',
                description: 'some description' 
              },
              {
                description: 'another description' 
              }
            ]
          },
          someMessage2: {
            messageId: 'rootMessageId',
            description: 'root description',
            traits: [
              {
                messageId: 'traitMessageId',
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
    const { document } = await parser.parse(documentRaw);
    
    const v3Document = document as AsyncAPIDocumentV3;
    expect(v3Document).toBeInstanceOf(AsyncAPIDocumentV3);

    const message1 = v3Document?.json()?.components?.messages?.someMessage1;
    delete (message1 as v3.MessageObject)?.traits;
    expect(message1).toEqual({ messageId: 'traitMessageId', description: 'another description', 'x-parser-message-name': 'traitMessageId' });

    const message2 = v3Document?.json()?.components?.messages?.someMessage2;
    delete (message2 as v3.MessageObject)?.traits;
    expect(message2).toEqual({ messageId: 'rootMessageId', description: 'root description', 'x-parser-message-name': 'rootMessageId' });
  });
});
