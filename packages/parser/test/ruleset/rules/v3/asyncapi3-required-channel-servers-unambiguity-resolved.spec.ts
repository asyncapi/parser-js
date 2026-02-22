import { testRule, DiagnosticSeverity } from '../../tester';

testRule('asyncapi3-required-channel-servers-unambiguity-resolved', [
  {
    name: 'valid case - root channel servers resolve to root servers',
    document: {
      asyncapi: '3.0.0',
      info: {
        title: 'Account Service',
        version: '1.0.0'
      },
      servers: {
        prod: {
          host: 'my-api.com',
          protocol: 'ws',
        },
        dev: {
          host: 'localhost',
          protocol: 'ws',
        },
      },
      channels: {
        UserSignedUp: {
          servers: [
            { $ref: '#/servers/prod' },
            { $ref: '#/servers/dev' },
          ]
        }
      },
    },
    errors: [],
  },
  {
    name: 'valid case - channel with no servers field',
    document: {
      asyncapi: '3.0.0',
      info: {
        title: 'Account Service',
        version: '1.0.0'
      },
      channels: {
        UserSignedUp: {
          address: 'user/signedup'
        }
      },
    },
    errors: [],
  },
  {
    name: 'valid case - document with no channels',
    document: {
      asyncapi: '3.0.0',
      info: {
        title: 'Account Service',
        version: '1.0.0'
      },
    },
    errors: [],
  },
  {
    name: 'invalid case - root channel servers resolve to component servers',
    document: {
      asyncapi: '3.0.0',
      info: {
        title: 'Account Service',
        version: '1.0.0'
      },
      channels: {
        UserSignedUp: {
          servers: [
            { $ref: '#/components/servers/prod' },
            { $ref: '#/components/servers/dev' },
          ]
        }
      },
      components: {
        servers: {
          prod: {
            host: 'my-api.com',
            protocol: 'ws',
          },
          dev: {
            host: 'localhost',
            protocol: 'ws',
          },
        }
      }
    },
    errors: [
      {
        message: 'Channel references a server that is not defined in the root "servers" object.',
        path: ['channels', 'UserSignedUp', 'servers', '0'],
        severity: DiagnosticSeverity.Error,
      },
      {
        message: 'Channel references a server that is not defined in the root "servers" object.',
        path: ['channels', 'UserSignedUp', 'servers', '1'],
        severity: DiagnosticSeverity.Error,
      }
    ],
  },
]);
