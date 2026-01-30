import { testRule, DiagnosticSeverity } from '../../tester';

testRule('channel-parameters-require-address', [
  {
    name: 'valid case - no parameters',
    document: {
      asyncapi: '3.0.0',
      channels: {
        channel: {
          address: null,
        },
      },
    },
    errors: [],
  },

  {
    name: 'valid case - parameters with address',
    document: {
      asyncapi: '3.0.0',
      channels: {
        channel: {
          address: 'some/address',
          parameters: {
            param: {
              description: 'test',
            },
          },
        },
      },
    },
    errors: [],
  },

  {
    name: 'invalid case - parameters but address null',
    document: {
      asyncapi: '3.0.0',
      info: {
        title: 'Test',
        version: '1.0.0',
      },
      channels: {
        userSignedup: {
          address: null,
          parameters: {
            test: {
              description: 'This should fail validation',
            },
          },
        },
      },
    },
    errors: [
  {
    message: 'Channel address must not be null when parameters are defined.',
    path: ['channels', 'userSignedup', 'address'],
    severity: DiagnosticSeverity.Error,
  },
],
  },
]);