import { ExternalDocumentation } from '../../../src/models/v2/mixins/external-docs';

import { 
  assertDescriptionMixinInheritance,
  assertExtensionsMixinInheritance,
} from './mixins/inheritance';

describe('ExternalDocumentation model', function() {
  describe('.name()', function() {
    it('should return the value', function() {
      const doc = { url: 'somewhere' };
      const d = new ExternalDocumentation(doc);
      expect(d.url()).toEqual(doc.url);
    });
  });

  describe('mixins inheritance', function() {
    assertDescriptionMixinInheritance(ExternalDocumentation);
    assertExtensionsMixinInheritance(ExternalDocumentation);
  });
});
