import { AsyncAPIDocumentV2, newAsyncAPIDocument } from '../../src/models';

import { createDetailedAsyncAPI } from '../../src/utils';

describe('AsyncAPIDocument factory', function() {
  it('should create a valid document from v2.0.0', function() {
    const doc = { asyncapi: "2.0.0" };
    const detailed = createDetailedAsyncAPI(doc, doc);
    const d = newAsyncAPIDocument(detailed)
    expect(d.version()).toEqual(doc.asyncapi);
    expect(d).toBeInstanceOf(AsyncAPIDocumentV2);
  });

  it('should fail trying to create a document from a non supported spec version', function() {
    const doc = { asyncapi: "99.99.99" };
    const detailed = createDetailedAsyncAPI(doc, doc);
    expect(() => newAsyncAPIDocument(detailed)).toThrow("Unsupported AsyncAPI version: 99.99.99");
  });
});
