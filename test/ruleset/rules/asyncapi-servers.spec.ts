import { testRule, DiagnosticSeverity } from '../tester';

testRule('asyncapi-servers', [
  {
    name: 'valid case',
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
    name: 'servers property is missing',
    document: {
      asyncapi: '2.0.0',
    },
    errors: [
      {
        message: 'AsyncAPI document should have non-empty "servers" object.',
        path: [],
        severity: DiagnosticSeverity.Warning,
      },
    ],
  },

  {
    name: 'servers property is empty',
    document: {
      asyncapi: '2.0.0',
      servers: {},
    },
    errors: [
      {
        message: 'AsyncAPI document should have non-empty "servers" object.',
        path: ['servers'],
        severity: DiagnosticSeverity.Warning,
      },
    ],
  },
]);