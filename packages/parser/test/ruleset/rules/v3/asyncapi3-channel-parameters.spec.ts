import { testRule, DiagnosticSeverity } from '../../tester';

testRule('asyncapi3-channel-parameters', [
  {
    name: 'valid case',
    document: {
      asyncapi: '3.0.0',
      channels: {
        userChannel: {
          address: 'users/{userId}/signedUp',
          parameters: {
            userId: {},
          },
        },
      },
    },
    errors: [],
  },

  {
    name: 'valid case - without parameters',
    document: {
      asyncapi: '3.0.0',
      channels: {
        userChannel: {
          address: 'users/{userId}/signedUp',
        },
      },
    },
    errors: [],
  },

  {
    name: 'invalid case - empty parameters object with address placeholders',
    document: {
      asyncapi: '3.0.0',
      channels: {
        userChannel: {
          address: 'users/{userId}/signedUp',
          parameters: {},
        },
      },
    },
    errors: [
      {
        message: 'Not all channel\'s parameters are described with "parameters" object. Missed: userId.',
        path: ['channels', 'userChannel', 'parameters'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: 'invalid case - parameters defined but address has no placeholders',
    document: {
      asyncapi: '3.0.0',
      channels: {
        userSignedup: {
          address: 'user/signedup',
          parameters: {
            test: {
              description: 'I should get an error that I provide a parameter but there are no parameters in the address',
            },
          },
        },
      },
    },
    errors: [
      {
        message: 'Channel\'s "parameters" object has redundant defined "test" parameter.',
        path: ['channels', 'userSignedup', 'parameters', 'test'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: 'invalid case - parameters defined but address is null',
    document: {
      asyncapi: '3.0.0',
      channels: {
        userSignedup: {
          address: null,
          parameters: {
            test: {},
          },
        },
      },
    },
    errors: [
      {
        message: 'Channel\'s "parameters" object has redundant defined "test" parameter.',
        path: ['channels', 'userSignedup', 'parameters', 'test'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: 'invalid case - parameters defined but address is absent',
    document: {
      asyncapi: '3.0.0',
      channels: {
        userSignedup: {
          parameters: {
            test: {},
          },
        },
      },
    },
    errors: [
      {
        message: 'Channel\'s "parameters" object has redundant defined "test" parameter.',
        path: ['channels', 'userSignedup', 'parameters', 'test'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: 'channel has not defined definition for one of the parameters',
    document: {
      asyncapi: '3.0.0',
      channels: {
        userChannel: {
          address: 'users/{userId}/{anotherParam}/signedUp',
          parameters: {
            userId: {},
          },
        },
      },
    },
    errors: [
      {
        message: 'Not all channel\'s parameters are described with "parameters" object. Missed: anotherParam.',
        path: ['channels', 'userChannel', 'parameters'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: 'channel has not defined definition for two+ of the parameters',
    document: {
      asyncapi: '3.0.0',
      channels: {
        userChannel: {
          address: 'users/{userId}/{anotherParam1}/{anotherParam2}/signedUp',
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
        path: ['channels', 'userChannel', 'parameters'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: 'channel has redundant parameters',
    document: {
      asyncapi: '3.0.0',
      channels: {
        userChannel: {
          address: 'users/{userId}/signedUp',
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
        path: ['channels', 'userChannel', 'parameters', 'anotherParam1'],
        severity: DiagnosticSeverity.Error,
      },
      {
        message: 'Channel\'s "parameters" object has redundant defined "anotherParam2" parameter.',
        path: ['channels', 'userChannel', 'parameters', 'anotherParam2'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: 'invalid case - parameters in components.channels',
    document: {
      asyncapi: '3.0.0',
      components: {
        channels: {
          userSignedup: {
            address: 'user/signedup',
            parameters: {
              test: {},
            },
          },
        },
      },
    },
    errors: [
      {
        message: 'Channel\'s "parameters" object has redundant defined "test" parameter.',
        path: ['components', 'channels', 'userSignedup', 'parameters', 'test'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
]);
