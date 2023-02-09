import { testRule, DiagnosticSeverity } from '../tester';

testRule('asyncapi-document-unresolved', [
  {
    name: 'valid case',
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
    name: 'invalid case (reference for operation object is not allowed)',
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
    name: 'invalid case (case when other errors should also occur but we filter them out - required info field is omitted)',
    document: {
      asyncapi: '2.0.0',
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
]);
