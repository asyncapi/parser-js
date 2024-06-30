import { testRule, DiagnosticSeverity } from '../../tester';

testRule('asyncapi2-channel-no-trailing-slash', [
  {
    name: 'valid case',
    document: {
      asyncapi: '2.0.0',
      channels: {
        'users/{userId}/signedUp': {},
      },
    },
    errors: [],
  },

  {
    name: 'channels.{channel} ends with a trailing slash',
    document: {
      asyncapi: '2.0.0',
      channels: {
        'users/{userId}/signedUp': {},
        'users/{userId}/signedOut/': {},
      },
    },
    errors: [
      {
        message: 'Channel address should not end with slash.',
        path: ['channels', 'users/{userId}/signedOut/'],
        severity: DiagnosticSeverity.Warning,
      },
    ],
  },
]);