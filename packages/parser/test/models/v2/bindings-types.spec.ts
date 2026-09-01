import type { Binding } from '../../../src/spec-types/v2';
import type { Binding as BindingV3 } from '../../../src/spec-types/v3';

/**
 * Type-level coverage for issue #735.
 *
 * The fix for #735 is a change to an *interface* (`Binding` gained an index
 * signature). Jest does not type-check, so the runtime test in
 * `bindings.spec.ts` passes both before and after that change -- it exercises
 * `BindingV2`'s accessors, not the declaration. The only tool that can observe
 * the fix is `tsc`, which this repository already runs via `build:esm`.
 *
 * Verified by control experiment on the unfixed tree: the assignment below is
 * rejected with
 *
 *   TS2353: Object literal may only specify known properties, and 'groupId'
 *           does not exist in type 'Binding'.
 *
 * so if the index signature is ever removed, the build breaks here rather than
 * silently regressing for every user writing a protocol binding.
 */
describe('Binding excess properties (issue #735) - type level', function () {
  it('accepts protocol-specific fields on v2 Binding', function () {
    // Kafka operation binding: groupId/clientId are not declared members.
    const kafka: Binding = {
      bindingVersion: '0.4.0',
      groupId: { type: 'string', enum: ['myGroupId'] },
      clientId: { type: 'string', enum: ['myClientId'] },
    };
    expect(kafka.bindingVersion).toEqual('0.4.0');
    expect(kafka.groupId).toBeDefined();
  });

  it('accepts protocol-specific fields on v3 Binding', function () {
    // AMQP channel binding shape.
    const amqp: BindingV3 = {
      bindingVersion: '0.3.0',
      is: 'routingKey',
      exchange: { name: 'myExchange', type: 'topic', durable: true },
    };
    expect(amqp.is).toEqual('routingKey');
  });

  it('still type-checks the declared member', function () {
    // @ts-expect-error bindingVersion is declared as string | undefined, so a
    // number must remain an error even though excess properties are now open.
    // If the index signature were ever widened to swallow this too, the
    // directive becomes unused and tsc fails -- which is the intent.
    const bad: Binding = { bindingVersion: 42 };
    expect(bad).toBeDefined();
  });
});
