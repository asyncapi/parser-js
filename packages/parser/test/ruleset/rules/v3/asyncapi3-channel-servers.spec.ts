import path from 'path';
import { testRule, DiagnosticSeverity } from '../../tester';

const source = path.resolve(__dirname, 'mocks/asyncapi.yaml');

testRule('asyncapi3-channel-servers', [
  {
    name: 'valid case',
    document: {
      asyncapi: '3.0.0',
      info: { title: 'Valid', version: '1.0.0' },
      servers: {
        development: { host: 'localhost', protocol: 'ws' },
        production: { host: 'example.com', protocol: 'ws' },
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
    name: 'valid case - without defined servers',
    document: {
      asyncapi: '3.0.0',
      info: { title: 'Valid', version: '1.0.0' },
      servers: {
        development: { host: 'localhost', protocol: 'ws' },
      },
      channels: {
        channel: {},
      },
    },
    errors: [],
  },

  {
    name: 'valid case - with empty array',
    document: {
      asyncapi: '3.0.0',
      info: { title: 'Valid', version: '1.0.0' },
      servers: {
        development: { host: 'localhost', protocol: 'ws' },
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
    name: 'valid case - without defined channels in the root',
    document: {
      asyncapi: '3.0.0',
      info: { title: 'Valid', version: '1.0.0' },
      servers: {
        development: { host: 'localhost', protocol: 'ws' },
      },
    },
    errors: [],
  },

  {
    name: 'valid case - channel under components may point to any server',
    document: {
      asyncapi: '3.0.0',
      info: { title: 'Valid', version: '1.0.0' },
      components: {
        channels: {
          channel: {
            servers: [{ $ref: '#/components/servers/development' }],
          },
        },
        servers: {
          development: { host: 'localhost', protocol: 'ws' },
        },
      },
    },
    errors: [],
  },

  {
    name: 'valid case - root server comes from another file',
    source,
    document: {
      asyncapi: '3.0.0',
      info: { title: 'Valid', version: '1.0.0' },
      servers: {
        development: { $ref: './external-channels.yaml#/servers/rootServer' },
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
    name: 'valid case - same-file reference to a component server is left to asyncapi3-required-channel-servers-unambiguity',
    document: {
      asyncapi: '3.0.0',
      info: { title: 'Valid', version: '1.0.0' },
      channels: {
        channel: {
          servers: [{ $ref: '#/components/servers/development' }],
        },
      },
      components: {
        servers: {
          development: { host: 'localhost', protocol: 'ws' },
        },
      },
    },
    errors: [],
  },

  {
    name: 'invalid case - root channel from another file points to a component server of that file',
    source,
    document: {
      asyncapi: '3.0.0',
      info: { title: 'Invalid', version: '1.0.0' },
      channels: {
        channel: { $ref: './external-channels.yaml#/channels/channelWithComponentServer' },
      },
    },
    errors: [
      {
        message: 'Channel contains server that are not defined on the "servers" object.',
        path: ['components', 'servers', 'componentServer'],
        source: path.resolve(__dirname, 'mocks/external-channels.yaml'),
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: 'invalid case - root channel points to a server that is not in the root servers of this document',
    source,
    document: {
      asyncapi: '3.0.0',
      info: { title: 'Invalid', version: '1.0.0' },
      channels: {
        channel: {
          servers: [{ $ref: './external-channels.yaml#/servers/rootServer' }],
        },
      },
    },
    errors: [
      {
        message: 'Channel contains server that are not defined on the "servers" object.',
        path: ['servers', 'rootServer'],
        source: path.resolve(__dirname, 'mocks/external-channels.yaml'),
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: 'invalid case - root channel referenced from components points to a component server',
    document: {
      asyncapi: '3.0.0',
      info: { title: 'Invalid', version: '1.0.0' },
      channels: {
        channel: { $ref: '#/components/channels/channel' },
      },
      components: {
        channels: {
          channel: {
            servers: [{ $ref: '#/components/servers/development' }],
          },
        },
        servers: {
          development: { host: 'localhost', protocol: 'ws' },
        },
      },
    },
    errors: [
      {
        message: 'Channel contains server that are not defined on the "servers" object.',
        path: ['channels', 'channel', 'servers', '0'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
]);
