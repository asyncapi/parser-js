/**
 * Compile-time regression checks for https://github.com/asyncapi/parser-js/issues/735
 *
 * These assertions are enforced by `tsc` (jest does not type-check).
 * Run: npx tsc --noEmit -p packages/parser/test/types/tsconfig.json
 */
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

void mqttServerBinding.clientId;
void kafkaBinding.groupId;
void amqpChannelBinding.is;
