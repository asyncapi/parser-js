import { testRule, DiagnosticSeverity } from '../../tester';

testRule('asyncapi2-server-no-trailing-slash', [
  {
    name: 'valid',
    document: {
      asyncapi: '2.0.0',
      servers: {
        production: {
          url: 'stoplight.io',
          protocol: 'https',
        },
      },
    },
    errors: [],
  },

  {
    name: '{server}.url property ends with a trailing slash',
    document: {
      asyncapi: '2.0.0',
      servers: {
        production: {
          url: 'stoplight.io/',
          protocol: 'https',
        },
      },
    },
    errors: [
      {
        message: 'Server URL should not end with slash.',
        path: ['servers', 'production', 'url'],
        severity: DiagnosticSeverity.Warning,
      },
    ],
  },
]);