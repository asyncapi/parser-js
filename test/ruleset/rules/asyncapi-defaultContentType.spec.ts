import { testRule, DiagnosticSeverity } from '../tester';

testRule('asyncapi-defaultContentType', [
  {
    name: 'valid case',
    document: {
      asyncapi: '2.0.0',
      defaultContentType: 'application/json',
      info: {
        title: 'Valid AsyncAPI document',
        version: '1.0',
      },
      channels: {},
    },
    errors: [],
  },

  {
    name: 'invalid case',
    document: {
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncAPI document',
        version: '1.0',
      },
    },
    errors: [
      { 
        message: 'AsyncAPI document should have "defaultContentType" field.',
        severity: DiagnosticSeverity.Warning 
      }
    ],
  },
]);
