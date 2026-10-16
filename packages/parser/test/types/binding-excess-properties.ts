/**
 * Compile-time regression checks for https://github.com/asyncapi/parser-js/issues/735
 *
 * These assertions are enforced by `tsc` (jest does not type-check).
 * Run via: npm run test:types
 */
import { OldServer } from '../../src/old-api';

import type { v2, v3 } from '../../src/spec-types';

// Excess protocol-specific fields must be assignable to Binding.
const mqttServerBinding: v2.Binding = {
  bindingVersion: '0.1.0',
  clientId: 'my-client',
  cleanSession: true,
};

const kafkaBinding: v2.Binding = {
  groupId: 'my-group',
  clientId: 'my-client',
};

const amqpChannelBinding: v3.Binding = {
  bindingVersion: '0.3.0',
  is: 'routingKey',
  exchange: { name: 'myExchange', type: 'topic' },
};

const server = new OldServer({
  url: 'mqtt://test.com',
  protocol: 'mqtt',
  bindings: {
    mqtt: mqttServerBinding,
  },
});

// Exact regression from issue #735: Property 'clientId' does not exist on type 'Binding'.
export const mqttClientIdFromServer = server.binding('mqtt')?.clientId;
export const mqttCleanSessionFromServer = server.binding('mqtt')?.cleanSession;

export const mqttClientId = mqttServerBinding.clientId;
export const kafkaGroupId = kafkaBinding.groupId;
export const amqpChannelIs = amqpChannelBinding.is;
