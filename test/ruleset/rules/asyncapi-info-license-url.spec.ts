import { testRule, DiagnosticSeverity } from '../tester';

testRule('asyncapi-info-license-url', [
  {
    name: 'valid case',
    document: {
      asyncapi: '2.0.0',
      info: {
        license: {
          url: 'https://example.com/LICENSE',
        },
      },
    },
    errors: [],
  },

  {
    name: 'license\'s url property is missing',
    document: {
      asyncapi: '2.0.0',
      info: {
        license: {},
      },
    },
    errors: [
      {
        message: 'License object should have "url" field.',
        path: ['info', 'license'],
        severity: DiagnosticSeverity.Warning,
      },
    ],
  },
]);