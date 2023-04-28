import { testRule, DiagnosticSeverity } from '../tester';

testRule('asyncapi-info-license', [
  {
    name: 'valid case',
    document: {
      asyncapi: '2.0.0',
      info: {
        license: {
          name: 'MIT',
        },
      },
    },
    errors: [],
  },

  {
    name: 'license property is missing',
    document: {
      asyncapi: '2.0.0',
      info: {},
    },
    errors: [
      {
        message: 'Info object should have "license" object.',
        path: ['info'],
        severity: DiagnosticSeverity.Warning,
      },
    ],
  },
]);