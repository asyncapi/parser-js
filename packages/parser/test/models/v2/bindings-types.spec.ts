import type { Binding } from '../../../src/spec-types/v2';
import type { Binding as BindingV3 } from '../../../src/spec-types/v3';

/**
 * Type-level coverage for issue #735.
 *
 * The fix for #735 is a change to an *interface* (`Binding` gained an index
 * signature). Jest does not type-check, so the runtime test in
 * `bindings.spec.ts` passes both before and after that change -- it exercises
 * `BindingV2`'s accessors, not the declaration. Only `tsc` can observe the fix.
 *
 * Verified by control experiment: removing the index signature from
 * `spec-types/v2.ts` and type-checking THIS FILE fails with
 *
 *   TS2322: Type '{ bindingVersion: string; groupId: ...; }' is not assignable
 *           to type 'Binding'. Object literal may only specify known
 *           properties, and 'groupId' does not exist in type 'Binding'.
 *   TS2339: Property 'groupId' does not exist on type 'Binding'.
 *
 * IMPORTANT, and the reason for the `type-check:tests` script this PR adds:
 * `build:esm` is plain `tsc`, and `packages/parser/tsconfig.json` sets
 * `"include": ["src"]`. It therefore never compiles `test/`, so on its own this
 * file is inert -- `tsc --listFiles` does not list it, and the mutation above
 * produces no build error. An earlier revision of this comment claimed "the
 * build breaks here"; that was wrong, as was the error code it quoted (TS2353).
 *
 * `npm run type-check:tests` is what makes the guard real: it type-checks the
 * test tree against the same sources, so removing the index signature fails
 * there instead of regressing silently for every user writing a protocol
 * binding.
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
