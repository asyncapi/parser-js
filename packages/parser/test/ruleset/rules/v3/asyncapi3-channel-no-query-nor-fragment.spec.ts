import { testRule, DiagnosticSeverity } from '../../tester';

testRule('asyncapi3-channel-no-query-nor-fragment', [
  {
    name: 'valid case',
    document: {
      asyncapi: '3.0.0',
      channels: {
        'users/{userId}/signedUp': {},
      },
    },
    errors: [],
  },

  {
    name: 'channels.{channel} contains a query delimiter',
    document: {
      asyncapi: '3.0.0',
      channels: {
        'users/{userId}/signedUp': {},
        'users/{userId}/signedOut?byMistake={didFatFingerTheSignOutButton}': {},
      },
    },
    errors: [
      {
        message: 'Channel address should not include query ("?") or fragment ("#") delimiter.',
        path: ['channels', 'users/{userId}/signedOut?byMistake={didFatFingerTheSignOutButton}'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: 'channels.{channel} contains a fragment delimiter',
    document: {
      asyncapi: '3.0.0',
      channels: {
        'users/{userId}/signedUp': {},
        'users/{userId}/signedOut#onPurpose': {},
      },
    },
    errors: [
      {
        message: 'Channel address should not include query ("?") or fragment ("#") delimiter.',
        path: ['channels', 'users/{userId}/signedOut#onPurpose'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
]);
