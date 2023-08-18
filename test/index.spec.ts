
import { Parse, ParseOutputPerVersion } from '../src/index';

import type { ParseOutput as ParseOutputV2 } from 'parserv2';
import type { ParseOutput as ParseOutputV3 } from 'parserv3';
import { AsyncAPIDocument } from 'parserv3/esm/old-api/asyncapi';

describe('Parse()', function() {
  it('Parses documents and outputs an AsyncAPIDocument compatible with Parser-API v1', async function() {
    const doc = { asyncapi: '2.0.0', info: { title: '', version: '' }, channels: {} };
    const output = await Parse(doc, { ParserAPIMajorVersion: 1 }) as ParseOutputV2;

    expect(output).toBeDefined();
    expect(output.document).toBeDefined();
    expect(output.document?.extensions().get('x-parser-api-version')?.value()).toBe(1);
  });

  it('Parses documents and outputs an AsyncAPIDocument compatible with Parser-API v2', async function() {
    const doc = { asyncapi: '3.0.0', info: { title: '', version: '' } };
    const output = await Parse(doc, { ParserAPIMajorVersion: 2 }) as ParseOutputV3;

    expect(output).toBeDefined();
    expect(output.document).toBeDefined();
    expect((output.document?.extensions().get('x-parser-api-version')?.value() as string).split('.')[0]).toBe('2');
  });

  it('Parses documents and outputs an AsyncAPIDocument compatible with old API prior to parser-api existence', async function() {
    const doc = { asyncapi: '3.0.0', info: { title: '', version: '' } };
    const output = await Parse(doc) as ParseOutputV3;

    expect(output).toBeDefined();
    expect(output.document).toBeDefined();
    const output2 = output as ParseOutputPerVersion;
    expect((output2?.document as AsyncAPIDocument).extension('x-parser-api-version')).toEqual(0);
  });
});