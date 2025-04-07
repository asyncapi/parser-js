import { Parser } from '../src/parser';
import { fromURL } from '../src/from';
import { hasErrorDiagnostic, hasWarningDiagnostic } from '../src/utils';

describe('fromURL()', function() {
  const parser = new Parser();

  it('should operate on existing HTTP source', async function() {
    const { document, diagnostics } = await fromURL(parser, 'https://raw.githubusercontent.com/asyncapi/spec/v2.0.0/examples/2.0.0/gitter-streaming.yml').parse();
    expect(document).not.toBeUndefined();
    expect(diagnostics.length > 0).toEqual(true);
    expect(hasWarningDiagnostic(diagnostics)).toEqual(true);
  });

  it('should throw error on nonexisting HTTP source', async function() {
    const { document, diagnostics } = await fromURL(parser, 'https://raw.githubusercontent.com/asyncapi/spec/master/examples/non-existing-spec.yml').parse();
    expect(document).toBeUndefined();
    expect(diagnostics.length > 0).toEqual(true);
    expect(hasErrorDiagnostic(diagnostics)).toEqual(true);
  });
});
