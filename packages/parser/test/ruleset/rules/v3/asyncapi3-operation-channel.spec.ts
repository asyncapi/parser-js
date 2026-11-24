import path from 'path';
import { testRule, DiagnosticSeverity } from '../../tester';

const source = path.resolve(__dirname, 'mocks/asyncapi.yaml');

testRule('asyncapi3-operation-channel', [
  {
    name: 'valid case',
    document: {
      asyncapi: '3.0.0',
      info: { title: 'Valid', version: '1.0.0' },
      channels: {
        channel: { address: 'channel' },
      },
      operations: {
        operation: {
          action: 'send',
          channel: { $ref: '#/channels/channel' },
        },
      },
    },
    errors: [],
  },

  {
    name: 'valid case - root channel comes from another file',
    source,
    document: {
      asyncapi: '3.0.0',
      info: { title: 'Valid', version: '1.0.0' },
      channels: {
        channel: { $ref: './external-channels.yaml#/channels/rootChannel' },
      },
      operations: {
        operation: {
          action: 'send',
          channel: { $ref: '#/channels/channel' },
        },
      },
    },
    errors: [],
  },

  {
    name: 'valid case - operation under components may point to any channel',
    document: {
      asyncapi: '3.0.0',
      info: { title: 'Valid', version: '1.0.0' },
      components: {
        channels: {
          channel: { address: 'channel' },
        },
        operations: {
          operation: {
            action: 'send',
            channel: { $ref: '#/components/channels/channel' },
          },
        },
      },
    },
    errors: [],
  },

  {
    name: 'valid case - same-file reference to a component channel is left to asyncapi3-required-operation-channel-unambiguity',
    document: {
      asyncapi: '3.0.0',
      info: { title: 'Valid', version: '1.0.0' },
      operations: {
        operation: {
          action: 'send',
          channel: { $ref: '#/components/channels/channel' },
        },
      },
      components: {
        channels: {
          channel: { address: 'channel' },
        },
      },
    },
    errors: [],
  },

  {
    name: 'invalid case - operation points to a root channel of another file',
    source,
    document: {
      asyncapi: '3.0.0',
      info: { title: 'Invalid', version: '1.0.0' },
      operations: {
        operation: {
          action: 'send',
          channel: { $ref: './external-channels.yaml#/channels/rootChannel' },
        },
      },
    },
    errors: [
      {
        message: 'Operation channel is not defined on the "channels" object.',
        path: ['channels', 'rootChannel'],
        source: path.resolve(__dirname, 'mocks/external-channels.yaml'),
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: 'invalid case - root operation from another file points to a component channel',
    source,
    document: {
      asyncapi: '3.0.0',
      info: { title: 'Invalid', version: '1.0.0' },
      channels: {
        channel: { address: 'channel' },
      },
      operations: {
        operation: { $ref: './external-operations.yaml#/operations/operation' },
      },
    },
    errors: [
      {
        message: 'Operation channel is not defined on the "channels" object.',
        path: ['components', 'channels', 'componentChannel'],
        source: path.resolve(__dirname, 'mocks/external-operations.yaml'),
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
]);
