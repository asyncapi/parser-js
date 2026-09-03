import { Parser } from '../src/parser';

/**
 * Regression test for issue #863: a payload property literally named `message`
 * with a null example value crashed document validation.
 *
 * The v2 ruleset selected messages with JSONPath expressions of the form
 *
 *     $.channels.*.[publish,subscribe][?(@property === 'message' && @.schemaFormat === void 0)]
 *
 * `@property === 'message'` also matches a *schema property* named `message`,
 * not just a message object. When that property's example value is `null`,
 * `@.schemaFormat` dereferences null and Spectral aborts the whole validation:
 *
 *     jsonPath: Cannot read properties of null (reading 'schemaFormat')
 *
 * Adding `!@null` to those expressions skips null values before the member
 * access. This test drives the public `parser.validate()` path with the exact
 * document shape from the issue, so it fails on master with the thrown error and
 * passes once the guards are in place.
 */
describe('issue #863: payload property named "message" with a null example', function () {
  const parser = new Parser();

  const documentRaw = {
    asyncapi: '2.6.0',
    info: { title: 'Nullable message property', version: '1.0.0' },
    channels: {
      'user/signup': {
        publish: {
          message: {
            payload: {
              type: 'object',
              properties: {
                // A schema property that happens to be named `message`.
                message: { type: ['string', 'null'], maxLength: 50 },
              },
              required: ['message'],
            },
            examples: [{ name: 'return', payload: { message: null } }],
          },
        },
      },
    },
  };

  it('validates without throwing on the null example value', async function () {
    // The bug surfaced as a thrown Error, not as a diagnostic, so the assertion
    // is that validate() resolves at all. Asserting only "no diagnostics" would
    // not catch it: on master this rejects before diagnostics are produced.
    await expect(parser.validate(documentRaw)).resolves.toBeDefined();
  });

  it('does not report the jsonPath null-dereference as a diagnostic either', async function () {
    const diagnostics = await parser.validate(documentRaw);
    const nullDeref = diagnostics.filter((d: { message: string }) =>
      /Cannot read properties of null/.test(d.message),
    );
    expect(nullDeref).toEqual([]);
  });

  it('still parses the document into a model', async function () {
    const { document } = await parser.parse(documentRaw);
    expect(document).toBeDefined();
  });
});
