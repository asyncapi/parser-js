import { testRule, DiagnosticSeverity } from '../tester';

testRule('asyncapi-document-unresolved', [
  {
    name: 'valid case for 2.X.X',
    document: {
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {
        someChannel: {
          publish: {
            message: {
              $ref: '#/components/messages/someMessage',
            },
          },
        },
      },
      components: {
        messages: {
          someMessage: {},
        },
      },
    },
    errors: [],
  },

  {
    name: 'invalid case for 2.X.X (reference for operation object is not allowed)',
    document: {
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {
        someChannel: {
          publish: {
            $ref: '#/components/x-operations/someOperation',
          },
        },
      },
      components: {
        'x-operations': {
          someOperation: {},
        },
      },
    },
    errors: [
      {
        message: 'Referencing in this place is not allowed',
        path: ['channels', 'someChannel', 'publish'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: 'valid case for 3.X.X',
    document: {
      asyncapi: '3.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {
        userSignedup: {
          address: 'user/signedup',
          messages: {
            'subscribe.message': {
              $ref: '#/components/messages/testMessage'
            }
          }
        }
      },
      components: {
        messages: {
          someMessage: {},
        },
      },
    },
    errors: [],
  },

  {
    name: 'valid case for 3.X.X with square brackets in channel key and $ref path',
    document: {
      asyncapi: '3.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {
        'test-queue:_:[Handle,DefaultHandler]': {
          address: 'test-queue',
          messages: {
            SubscribeMessage: {
              $ref: '#/components/messages/test-queue:_:[Handle,DefaultHandler]:SubscribeMessage',
            },
          },
        },
      },
      operations: {
        'test-queue:_:[Handle,DefaultHandler]Subscribe': {
          action: 'receive',
          channel: {
            $ref: '#/channels/test-queue:_:[Handle,DefaultHandler]',
          },
          messages: [
            {
              $ref: '#/channels/test-queue:_:[Handle,DefaultHandler]/messages/SubscribeMessage',
            },
          ],
        },
      },
      components: {
        messages: {
          'test-queue:_:[Handle,DefaultHandler]:SubscribeMessage': {},
        },
      },
    },
    errors: [],
  },

  {
    name: 'invalid case for 3.X.X (reference for info object is not allowed)',
    document: {
      asyncapi: '3.0.0',
      info: {
        $ref: '#/components/x-titles/someTitle'
      },
      components: {
        'x-titles': {
          someTitle: 'some-title',
        },
      },
    },
    errors: [
      {
        message: 'Referencing in this place is not allowed',
        path: ['info'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
]);
