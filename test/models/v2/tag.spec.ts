import { Tag } from '../../../src/models/v2/mixins/tags';

import { 
  assertDescriptionMixinInheritance,
  assertExtensionsMixinInheritance,
  assertExternalDocumentationMixinInheritance
} from './mixins/inheritance';

describe('Tag model', function() {
  describe('.name()', function() {
    it('should return the value', function() {
      const doc = { name: "LeChuck" };
      const d = new Tag(doc);
      expect(d.name()).toEqual(doc.name);
    });
  });

  describe('mixins inheritance', function() {
    assertDescriptionMixinInheritance(Tag);
    assertExtensionsMixinInheritance(Tag);
    assertExternalDocumentationMixinInheritance(Tag);
  });
});
