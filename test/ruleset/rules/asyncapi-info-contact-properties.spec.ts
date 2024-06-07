import { testRule, DiagnosticSeverity } from '../tester';

testRule('asyncapi-info-contact-properties', [
  {
    name: 'valid case',
    document: {
      asyncapi: '2.0.0',
      info: {
        contact: {
          name: 'stoplight',
          url: 'stoplight.io',
          email: 'support@stoplight.io',
        },
      },
    },
    errors: [],
  },

  {
    name: 'contact properties are missing',
    document: {
      asyncapi: '2.0.0',
      info: {
        contact: {},
      },
    },
    errors: [
      {
        message: 'Contact object should have "name", "url" and "email" fields.',
        path: ['info', 'contact'],
        severity: DiagnosticSeverity.Warning,
      },
    ],
  },
]);