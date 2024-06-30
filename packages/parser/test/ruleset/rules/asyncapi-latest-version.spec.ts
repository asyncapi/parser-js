import { testRule, DiagnosticSeverity } from '../tester';
import { lastVersion } from '../../../src/constants';

testRule('asyncapi-latest-version', [
  {
    name: 'valid case',
    document: {
      asyncapi: lastVersion,
    },
    errors: [],
  },

  {
    name: 'invalid case',
    document: {
      asyncapi: '2.0.0',
    },
    errors: [
      {
        message: `The latest version of AsyncAPi is not used. It is recommended update to the "${lastVersion}" version.`,
        path: ['asyncapi'],
        severity: DiagnosticSeverity.Information,
      },
    ],
  },
]);
