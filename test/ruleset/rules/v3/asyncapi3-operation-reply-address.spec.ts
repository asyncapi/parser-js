import { testRule, DiagnosticSeverity } from '../../tester';

const baseDocument = {
  asyncapi: '3.0.0',
  info: {
    title: 'Account Service',
    version: '1.0.0',
  },
};

function operation(channel: string, withDynamicAddress = true) {
  return {
    action: 'send',
    channel: { $ref: '#/channels/request' },
    reply: {
      channel: { $ref: channel },
      ...(withDynamicAddress && {
        address: { location: '$message.header#/REPLY_TOPIC' },
      }),
    },
  };
}

const error = {
  message: 'A channel referenced by a reply with a dynamic address must have a null or undefined "address".',
  severity: DiagnosticSeverity.Error,
};

testRule('asyncapi3-operation-reply-address', [
  {
    name: 'rejects a concrete address on a root reply channel',
    document: {
      ...baseDocument,
      channels: {
        request: { address: 'requests' },
        reply: { address: 'replies' },
      },
      operations: {
        sendRequest: operation('#/channels/reply'),
      },
    },
    errors: [{
      ...error,
      path: ['operations', 'sendRequest', 'reply', 'channel'],
    }],
  },
  {
    name: 'allows a null address on a root reply channel',
    document: {
      ...baseDocument,
      channels: {
        request: { address: 'requests' },
        reply: { address: null },
      },
      operations: {
        sendRequest: operation('#/channels/reply'),
      },
    },
    errors: [],
  },
  {
    name: 'allows an omitted address on a root reply channel',
    document: {
      ...baseDocument,
      channels: {
        request: { address: 'requests' },
        reply: {},
      },
      operations: {
        sendRequest: operation('#/channels/reply'),
      },
    },
    errors: [],
  },
  {
    name: 'allows a concrete channel address when the reply address is omitted',
    document: {
      ...baseDocument,
      channels: {
        request: { address: 'requests' },
        reply: { address: 'replies' },
      },
      operations: {
        sendRequest: operation('#/channels/reply', false),
      },
    },
    errors: [],
  },
  {
    name: 'rejects a concrete address reached through component references',
    document: {
      ...baseDocument,
      channels: {
        request: { address: 'requests' },
      },
      components: {
        channels: {
          replyAlias: { $ref: '#/components/channels/reply' },
          reply: { address: 'replies' },
        },
        operations: {
          sendRequest: operation('#/components/channels/replyAlias'),
        },
      },
    },
    errors: [{
      ...error,
      path: ['components', 'operations', 'sendRequest', 'reply', 'channel'],
    }],
  },
]);
