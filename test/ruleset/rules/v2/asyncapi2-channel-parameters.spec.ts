import { testRule, DiagnosticSeverity } from '../../tester';

testRule('asyncapi2-channel-parameters', [
  {
    name: 'valid case',
    document: {
      asyncapi: '2.0.0',
      channels: {
        'users/{userId}/signedUp': {
          parameters: {
            userId: {},
          },
        },
      },
    },
    errors: [],
  },

  {
    name: 'address has no parameters but parameters are defined',
    document: {
      asyncapi: '2.0.0',
      channels: {
        'users/signedUp': {
          parameters: {
            test: {},
          },
        },
      },
    },
    errors: [{
      message: 'Channel has parameters defined, but the address is null or does not contain any parameters',
      path: ['channels', 'users/signedUp'],
      severity: DiagnosticSeverity.Error,
    },],
  },

  {
    name: 'channel has not defined definition for one of the parameters',
    document: {
      asyncapi: '2.0.0',
      channels: {
        'users/{userId}/{anotherParam}/signedUp': {
          parameters: {
            userId: {},
          },
        },
      },
    },
    errors: [
      {
        message: 'Not all channel\'s parameters are described with "parameters" object. Missed: anotherParam.',
        path: ['channels', 'users/{userId}/{anotherParam}/signedUp', 'parameters'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: 'channel has not defined definition for two+ of the parameters',
    document: {
      asyncapi: '2.0.0',
      channels: {
        'users/{userId}/{anotherParam1}/{anotherParam2}/signedUp': {
          parameters: {
            userId: {},
          },
        },
      },
    },
    errors: [
      {
        message:
          'Not all channel\'s parameters are described with "parameters" object. Missed: anotherParam1, anotherParam2.',
        path: ['channels', 'users/{userId}/{anotherParam1}/{anotherParam2}/signedUp', 'parameters'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: 'channel has redundant paramaters',
    document: {
      asyncapi: '2.0.0',
      channels: {
        'users/{userId}/signedUp': {
          parameters: {
            userId: {},
            anotherParam1: {},
            anotherParam2: {},
          },
        },
      },
    },
    errors: [
      {
        message: 'Channel\'s "parameters" object has redundant defined "anotherParam1" parameter.',
        path: ['channels', 'users/{userId}/signedUp', 'parameters', 'anotherParam1'],
        severity: DiagnosticSeverity.Error,
      },
      {
        message: 'Channel\'s "parameters" object has redundant defined "anotherParam2" parameter.',
        path: ['channels', 'users/{userId}/signedUp', 'parameters', 'anotherParam2'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
]);
