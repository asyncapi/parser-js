import { testRule, DiagnosticSeverity } from '../../tester';

testRule('asyncapi2-tags', [
  {
    name: 'valid case',
    document: {
      asyncapi: '2.0.0',
      tags: [{ name: 'one' }, { name: 'another' }],
    },
    errors: [],
  },

  {
    name: 'tags property is missing',
    document: {
      asyncapi: '2.0.0',
    },
    errors: [
      {
        message: 'AsyncAPI object should have non-empty "tags" array.',
        path: [],
        severity: DiagnosticSeverity.Warning,
      },
    ],
  },
]);