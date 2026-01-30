import { xParserObjectUniqueId } from '../../src/constants';
import { AsyncAPIDocumentV3 } from '../../src/models';
import { Parser } from '../../src/parser';
import { filterLastVersionDiagnostics } from '../utils';

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
      channels: {
        channel1: {}
      },
      operations: {
        someOperation1: {
          action: 'send',
          channel: {
            $ref: '#/channels/channel1'
          },
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
          action: 'send',
          channel: {
            $ref: '#/channels/channel1'
          },
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
    expect(filterLastVersionDiagnostics(diagnostics)).toHaveLength(0);
    
    const v3Document = document as AsyncAPIDocumentV3;
    expect(v3Document).toBeInstanceOf(AsyncAPIDocumentV3);

    const someOperation1 = v3Document?.json()?.operations?.someOperation1 as v3.OperationObject;
    delete someOperation1?.traits;
    expect(someOperation1).toEqual({ action: 'send', channel: { 'x-parser-unique-object-id': 'channel1' }, description: 'another description', 'x-parser-unique-object-id': 'someOperation1' });

    const someOperation2 = v3Document?.json()?.operations?.someOperation2 as v3.OperationObject;
    delete someOperation2?.traits;
    expect(someOperation2).toEqual({ action: 'send', channel: { 'x-parser-unique-object-id': 'channel1' }, description: 'root description', 'x-parser-unique-object-id': 'someOperation2' });
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
          messages: {
            someMessage: {
              traits: [
                {
                  summary: 'some summary',
                  description: 'some description' 
                },
                {
                  description: 'another description' 
                }
              ]
            }
          }
        },
        someChannel2: {
          messages: {
            someMessage: {
              summary: 'root summary',
              description: 'root description',
              traits: [
                {
                  summary: 'some summary',
                  description: 'some description' 
                },
                {
                  description: 'another description' 
                }
              ]
            }
          }
        }
      }
    };
    const { diagnostics, document } = await parser.parse(documentRaw);
    
    const v3Document = document as AsyncAPIDocumentV3;
    expect(v3Document).toBeInstanceOf(AsyncAPIDocumentV3);

    const message1 = (v3Document?.json()?.channels?.someChannel1 as v3.ChannelObject).messages?.someMessage;
    delete (message1 as v3.MessageObject)?.traits;
    expect(message1).toEqual({ summary: 'some summary', description: 'another description', 'x-parser-message-name': 'someMessage', 'x-parser-unique-object-id': 'someMessage' });

    const message2 = (v3Document?.json()?.channels?.someChannel2 as v3.ChannelObject).messages?.someMessage;
    delete (message2 as v3.MessageObject)?.traits;
    expect(message2).toEqual({ summary: 'root summary', description: 'root description', 'x-parser-message-name': 'someMessage', 'x-parser-unique-object-id': 'someMessage' });
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
                summary: 'some summary',
                description: 'some description' 
              },
              {
                description: 'another description' 
              }
            ]
          },
          someMessage2: {
            summary: 'root summary',
            description: 'root description',
            traits: [
              {
                summary: 'some summary',
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
    expect(message1).toEqual({ summary: 'some summary', description: 'another description', 'x-parser-message-name': 'someMessage1', 'x-parser-unique-object-id': 'someMessage1' });

    const message2 = v3Document?.json()?.components?.messages?.someMessage2;
    delete (message2 as v3.MessageObject)?.traits;
    expect(message2).toEqual({ summary: 'root summary', description: 'root description', 'x-parser-message-name': 'someMessage2', 'x-parser-unique-object-id': 'someMessage2' });
  });

  describe('iterative functions should still work after traits have been applied', function() {
    const documentRaw = {
      asyncapi: '3.0.0',
      info: {
        title: 'Streetlights Kafka API',
        version: '1.0.0',
        description: 'The Smartylighting Streetlights API allows you to remotely manage the city lights.\n\n### Check out its awesome features:\n\n* Turn a specific streetlight on/off 🌃\n* Dim a specific streetlight 😎\n* Receive real-time information about environmental lighting conditions 📈\n',
        license: {
          name: 'Apache 2.0',
          url: 'https://www.apache.org/licenses/LICENSE-2.0'
        }
      },
      defaultContentType: 'application/json',
      channels: {
        'smartylighting.streetlights.1.0.event.{streetlightId}.lighting.measured': {
          address: 'smartylighting.streetlights.1.0.event.{streetlightId}.lighting.measured',
          messages: {
            lightMeasured: {
              $ref: '#/components/messages/lightMeasured'
            }
          },
          description: 'The topic on which measured values may be produced and consumed.',
          parameters: {
            streetlightId: {
              $ref: '#/components/parameters/streetlightId'
            }
          }
        }
      },
      operations: {
        receiveLightMeasurement: {
          action: 'receive',
          channel: {
            $ref: '#/channels/smartylighting.streetlights.1.0.event.{streetlightId}.lighting.measured'
          },
          summary: 'Inform about environmental lighting conditions of a particular streetlight.',
          traits: [
            {
              $ref: '#/components/operationTraits/kafka'
            }
          ],
          messages: [
            {
              $ref: '#/channels/smartylighting.streetlights.1.0.event.{streetlightId}.lighting.measured/messages/lightMeasured'
            }
          ]
        }
      },
      components: {
        messages: {
          lightMeasured: {
            name: 'lightMeasured',
            title: 'Light measured',
            summary: 'Inform about environmental lighting conditions of a particular streetlight.',
            contentType: 'application/json',
            traits: [
              {
                $ref: '#/components/messageTraits/commonHeaders'
              }
            ],
            payload: {
              $ref: '#/components/schemas/lightMeasuredPayload'
            }
          }
        },
        schemas: {
          lightMeasuredPayload: {
            type: 'object',
            properties: {
              lumens: {
                type: 'integer',
                minimum: 0,
                description: 'Light intensity measured in lumens.'
              },
              sentAt: {
                $ref: '#/components/schemas/sentAt'
              }
            }
          },
          sentAt: {
            type: 'string',
            format: 'date-time',
            description: 'Date and time when the message was sent.'
          }
        },
        parameters: {
          streetlightId: {
            description: 'The ID of the streetlight.'
          }
        },
        messageTraits: {
          commonHeaders: {
            headers: {
              type: 'object',
              properties: {
                'my-app-header': {
                  type: 'integer',
                  minimum: 0,
                  maximum: 100
                }
              }
            }
          }
        },
        operationTraits: {
          kafka: {
            bindings: {
              kafka: {
                clientId: {
                  type: 'string',
                  enum: [
                    'my-app-id'
                  ]
                }
              }
            }
          }
        }
      }
    };
    let v3Document: AsyncAPIDocumentV3;
    const expectedOperationId = 'receiveLightMeasurement';
    const expectedChannelId = 'smartylighting.streetlights.1.0.event.{streetlightId}.lighting.measured';
    const expectedMessageId = 'lightMeasured';

    beforeAll(async () => {
      const { document, diagnostics } = await parser.parse(documentRaw);
      
      expect(filterLastVersionDiagnostics(diagnostics).length).toEqual(0);
      v3Document = document as AsyncAPIDocumentV3;
    });

    it('should be able to go from operation -> channel', () => {
      const operations = v3Document.operations().all();
      expect(operations.length).toEqual(1);
      const operation = operations[0];
      expect(operation.id()).toEqual(expectedOperationId);
      const operationChannels = operation.channels().all();
      expect(operationChannels.length).toEqual(1);
      const lightMeasuredChannel = operationChannels[0];
      expect(lightMeasuredChannel.json()[xParserObjectUniqueId]).toEqual(expectedChannelId);
      const messages = lightMeasuredChannel.messages().all();
      expect(messages.length).toEqual(1);
      const message = messages[0];
      expect(message.id()).toEqual(expectedMessageId);
    });

    it('should be able to go from channel -> operation', () => {
      const channels = v3Document.channels().all();
      expect(channels.length).toEqual(1);
      const channel = channels[0];
      expect(channel.json()[xParserObjectUniqueId]).toEqual(expectedChannelId);
      const channelOperations = channel.operations().all();
      expect(channelOperations.length).toEqual(1);
      const operation = channelOperations[0];
      expect(operation.id()).toEqual(expectedOperationId);
      const messages = operation.messages().all();
      expect(messages.length).toEqual(1);
      const message = messages[0];
      expect(message.id()).toEqual(expectedMessageId);
    });

    it('should be able to go in full circle operation -> channel -> operation', () => {
      const operations = v3Document.operations().all();
      expect(operations.length).toEqual(1);
      const operation = operations[0];
      expect(operation.id()).toEqual(expectedOperationId);
      const operationChannels = operation.channels().all();
      expect(operationChannels.length).toEqual(1);
      const lightMeasuredChannel = operationChannels[0];
      expect(lightMeasuredChannel.json()[xParserObjectUniqueId]).toEqual(expectedChannelId);
      const channelOperations = lightMeasuredChannel.operations().all();
      expect(channelOperations.length).toEqual(1);
      const circularOperation = channelOperations[0];
      expect(circularOperation.id()).toEqual(expectedOperationId);
      const messages = circularOperation.messages().all();
      expect(messages.length).toEqual(1);
      const message = messages[0];
      expect(message.id()).toEqual(expectedMessageId);
    });
  });
});
