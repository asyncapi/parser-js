import { testRule, DiagnosticSeverity } from '../../tester';

testRule('asyncapi3-channel-servers', [
  {
    name: 'valid case',
    document: {
      asyncapi: '3.0.0',
      servers: {
        development: {},
        production: {},
      },
      channels: {
        channel: {
          servers: [{ $ref: '#/servers/development' }],
        },
      },
    },
    errors: [],
  },

  {
    name: 'valid case - multiple servers',
    document: {
      asyncapi: '3.0.0',
      servers: {
        development: {},
        production: {},
        staging: {},
      },
      channels: {
        channel: {
          servers: [
            { $ref: '#/servers/development' },
            { $ref: '#/servers/production' },
          ],
        },
      },
    },
    errors: [],
  },

  {
    name: 'valid case - without defined servers',
    document: {
      asyncapi: '3.0.0',
      servers: {
        development: {},
        production: {},
      },
      channels: {
        channel: {},
      },
    },
    errors: [],
  },

  {
    name: 'valid case - without defined servers in the root',
    document: {
      asyncapi: '3.0.0',
      channels: {
        channel: {},
      },
    },
    errors: [],
  },

  {
    name: 'valid case - without defined channels in the root',
    document: {
      asyncapi: '3.0.0',
      servers: {
        development: {},
        production: {},
      },
    },
    errors: [],
  },

  {
    name: 'valid case - with empty array',
    document: {
      asyncapi: '3.0.0',
      servers: {
        development: {},
        production: {},
      },
      channels: {
        channel: {
          servers: [],
        },
      },
    },
    errors: [],
  },

  {
    name: 'invalid case - incorrect $ref',
    document: {
      asyncapi: '3.0.0',
      servers: {
        development: {},
        production: {},
      },
      channels: {
        channel: {
          servers: [{ $ref: '#/components/servers/another-server' }],
        },
      },
    },
    errors: [
      {
        message: 'Channel server must reference a server defined in the root "servers" object.',
        path: ['channels', 'channel', 'servers', '0', '$ref'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: 'invalid case - one server is correct, another one is incorrect',
    document: {
      asyncapi: '3.0.0',
      servers: {
        development: {},
        production: {},
      },
      channels: {
        channel: {
          servers: [
            { $ref: '#/servers/production' },
            { $ref: '#/components/servers/another-server' },
          ],
        },
      },
    },
    errors: [
      {
        message: 'Channel server must reference a server defined in the root "servers" object.',
        path: ['channels', 'channel', 'servers', '1', '$ref'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: 'invalid case - without defined servers',
    document: {
      asyncapi: '3.0.0',
      channels: {
        channel: {
          servers: [{ $ref: '#/servers/production' }],
        },
      },
    },
    errors: [
      {
        message: 'Channel server must reference a server defined in the root "servers" object.',
        path: ['channels', 'channel', 'servers', '0', '$ref'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: 'invalid case - incorrect $ref format',
    document: {
      asyncapi: '3.0.0',
      servers: {
        development: {},
        production: {},
      },
      channels: {
        channel: {
          servers: [{ $ref: 'production' }],
        },
      },
    },
    errors: [
      {
        message: 'Channel server must reference a server defined in the root "servers" object.',
        path: ['channels', 'channel', 'servers', '0', '$ref'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: 'invalid case - servers is not an array',
    document: {
      asyncapi: '3.0.0',
      servers: {
        development: {},
        production: {},
      },
      channels: {
        channel: {
          servers: { $ref: '#/servers/production' },
        },
      },
    },
    errors: [
      {
        message: 'Channel servers must be an array of references to servers.',
        path: ['channels', 'channel', 'servers'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
]);