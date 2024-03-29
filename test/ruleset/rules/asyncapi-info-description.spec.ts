import { testRule, DiagnosticSeverity } from '../tester';

testRule('asyncapi-info-description', [
  {
    name: 'valid case',
    document: {
      asyncapi: '2.0.0',
      info: {
        description: 'Very descriptive list of self explaining consecutive characters.',
      },
    },
    errors: [],
  },
  
  {
    name: 'description property is missing',
    document: {
      asyncapi: '2.0.0',
      info: {},
    },
    errors: [
      {
        message: 'Info "description" should be present and non-empty string.',
        path: ['info'],
        severity: DiagnosticSeverity.Warning,
      },
    ],
  },
]);
