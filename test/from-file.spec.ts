import path from 'path';
import { Parser } from '../src/parser';
import { fromFile } from '../src/from-file';
import { hasWarningDiagnostic } from '../src/utils';

describe('fromFile()', function() {
  const parser = new Parser();

  it('should operate on existing file source', async function() {
    const { document, diagnostics } = await fromFile(parser, path.resolve(__dirname, './mocks/simple.yaml')).parse();
    expect(document).not.toBeUndefined();
    expect(diagnostics.length > 0).toEqual(true);
    expect(hasWarningDiagnostic(diagnostics)).toEqual(true);
  });

  it('should throw error on nonexisting file source', async function() {
    expect(() => fromFile(parser, path.resolve(__dirname, './mocks/non-existing-spec.yaml')).parse()).rejects.toThrow();
  });
});
