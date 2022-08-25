import { ExternalDocumentation } from '../../../src/models/v2/external-docs';

import { assertDescription, assertExtensions } from './assert-mixins';

describe('ExternalDocumentation model', function() {
  describe('.name()', function() {
    it('should return the value', function() {
      const doc = { url: 'somewhere' };
      const d = new ExternalDocumentation(doc);
      expect(d.url()).toEqual(doc.url);
    });
  });

  describe('mixins', function() {
    assertDescription(ExternalDocumentation);
    assertExtensions(ExternalDocumentation);
  });
});
