import { testRule, DiagnosticSeverity } from '../../tester';

testRule('asyncapi2-operation-operationId', [
  {
    name: 'valid case',
    document: {
      asyncapi: '2.4.0',
      channels: {
        one: {
          publish: {
            operationId: 'firstId',
          },
          subscribe: {
            operationId: 'secondId',
          },
        },
      },
    },
    errors: [],
  },

  {
    name: 'valid case (with traits)',
    document: {
      asyncapi: '2.4.0',
      channels: {
        one: {
          publish: {
            traits: [
              {},
              {
                operationId: 'firstId',
              },
            ],
          },
          subscribe: {
            operationId: 'secondId',
          },
        },
      },
    },
    errors: [],
  },

  {
    name: 'invalid case',
    document: {
      asyncapi: '2.4.0',
      channels: {
        one: {
          publish: {},
          subscribe: {},
        },
      },
    },
    errors: [
      {
        message: 'Operation should have an "operationId" field defined.',
        path: ['channels', 'one', 'publish'],
        severity: DiagnosticSeverity.Warning,
      },
      {
        message: 'Operation should have an "operationId" field defined.',
        path: ['channels', 'one', 'subscribe'],
        severity: DiagnosticSeverity.Warning,
      },
    ],
  },

  {
    name: 'invalid case (with traits)',
    document: {
      asyncapi: '2.4.0',
      channels: {
        one: {
          publish: {
            traits: [{}, {}],
          },
          subscribe: {
            operationId: 'secondId',
          },
        },
      },
    },
    errors: [
      {
        message: 'Operation should have an "operationId" field defined.',
        path: ['channels', 'one', 'publish'],
        severity: DiagnosticSeverity.Warning,
      },
    ],
  },
]);