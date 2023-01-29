import { testRule, DiagnosticSeverity } from '../tester';

testRule('asyncapi-is-asyncapi', [
  {
    name: 'valid case',
    document: {
      asyncapi: '2.0.0',
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
      openapi: '2.0.0',
      info: {
        title: 'Valid OpenAPI document',
        version: '1.0',
      },
    },
    errors: [
      { 
        message: 'This is not an AsyncAPI document. The "asyncapi" field as string is missing.',
        severity: DiagnosticSeverity.Error 
      }
    ],
  },
]);
