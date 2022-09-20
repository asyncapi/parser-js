import { Base } from '../../src/old-api/base';
import { SpecificationExtensionsModel, hasDescription, description, hasExternalDocs, externalDocs, bindingsMixins, tagsMixins } from '../../src/old-api/mixins';

import { assertDescriptionMixin, assertExternalDocumentationMixin, assertBindingsMixin, assertExtensionsMixin, assertTagsMixin } from './mixins';

describe('mixins', function() {
  describe('description', function() {
    class Model extends Base {
      hasDescription() {
        return hasDescription(this);
      }

      description() {
        return description(this);
      }
    }

    assertDescriptionMixin(Model);
  });

  describe('externalDocs', function() {
    class Model extends Base {
      hasExternalDocs() {
        return hasExternalDocs(this);
      }

      externalDocs() {
        return externalDocs(this);
      }
    }

    assertExternalDocumentationMixin(Model);
  });

  describe('bindings', function() {
    class Model extends Base {
      hasBindings() {
        return bindingsMixins.hasBindings(this as any);
      }
    
      bindings() {
        return bindingsMixins.bindings(this as any);
      }
    
      bindingProtocols() {
        return bindingsMixins.bindingProtocols(this as any);
      }
    
      hasBinding(name: string): boolean {
        return bindingsMixins.hasBinding(this as any, name);
      }
    
      binding(name: string) {
        return bindingsMixins.binding(this as any, name);
      }
    }

    assertBindingsMixin(Model);
  });

  describe('extensions', function() {
    class Model extends SpecificationExtensionsModel {}

    assertExtensionsMixin(Model);
  });

  describe('tags', function() {
    class Model extends Base {
      hasTags() {
        return tagsMixins.hasTags(this);
      }
    
      tags() {
        return tagsMixins.tags(this);
      }
    
      tagNames() {
        return tagsMixins.tagNames(this);
      }
    
      hasTag(name: string) {
        return tagsMixins.hasTag(this, name);
      }
    
      tag(name: string) {
        return tagsMixins.tag(this, name);
      }
    }

    assertTagsMixin(Model);
  });
});
