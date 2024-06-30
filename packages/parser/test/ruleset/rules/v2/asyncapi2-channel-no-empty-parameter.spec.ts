import { testRule, DiagnosticSeverity } from '../../tester';

testRule('asyncapi2-channel-no-empty-parameter', [
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
    name: 'channels.{channel} contains empty parameter substitution pattern',
    document: {
      asyncapi: '2.0.0',
      channels: {
        'users/{userId}/signedUp': {},
        'users/{}/signedOut': {},
      },
    },
    errors: [
      {
        message: 'Channel address should not have empty parameter substitution pattern.',
        path: ['channels', 'users/{}/signedOut'],
        severity: DiagnosticSeverity.Warning,
      },
    ],
  },
]);
