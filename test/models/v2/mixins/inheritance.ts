import { BindingsMixin } from '../../../../src/models/v2/mixins/bindings';
import { DescriptionMixin } from '../../../../src/models/v2/mixins/description';
import { ExtensionsMixin } from '../../../../src/models/v2/mixins/extensions';
import { ExternalDocumentationMixin } from '../../../../src/models/v2/mixins/external-docs';
import { TagsMixin } from '../../../../src/models/v2/mixins/tags';

export function assertBindingsMixinInheritance(model: typeof BindingsMixin) {
  describe('BindingsMixin inheritance', function() {
    it(`check if ${model.name} model has inherited methods from BindingsMixin`, function() {
      expect(model.prototype.bindings).not.toEqual(undefined);
      expect(typeof model.prototype.bindings).toEqual('function');
      expect(model.prototype.bindings === BindingsMixin.prototype.bindings).toEqual(true);
    });
  });
}

export function assertDescriptionMixinInheritance(model: typeof DescriptionMixin) {
  describe('DescriptionMixin inheritance', function() {
    it(`check if ${model.name} model has inherited methods from DescriptionMixin`, function() {
      expect(model.prototype.hasDescription).not.toEqual(undefined);
      expect(typeof model.prototype.hasDescription).toEqual('function');
      expect(model.prototype.hasDescription === DescriptionMixin.prototype.hasDescription).toEqual(true);

      expect(model.prototype.description).not.toEqual(undefined);
      expect(typeof model.prototype.description).toEqual('function');
      expect(model.prototype.description === DescriptionMixin.prototype.description).toEqual(true);
    });
  });
}

export function assertExtensionsMixinInheritance(model: typeof ExtensionsMixin) {
  describe('SpecificationExtensionsMixin inheritance', function() {
    it(`check if ${model.name} model has inherited methods from ExtensionsMixin`, function() {
      expect(model.prototype.extensions).not.toEqual(undefined);
      expect(typeof model.prototype.extensions).toEqual('function');
      expect(model.prototype.extensions === ExtensionsMixin.prototype.extensions).toEqual(true);
    });
  });
}

export function assertExternalDocumentationMixinInheritance(model: typeof ExternalDocumentationMixin) {
  describe('ExternalDocsMixin inheritance', function() {
    it(`check if ${model.name} model has inherited methods from ExternalDocumentationMixin`, function() {
      expect(model.prototype.hasExternalDocs).not.toEqual(undefined);
      expect(typeof model.prototype.hasExternalDocs).toEqual('function');
      expect(model.prototype.hasExternalDocs === ExternalDocumentationMixin.prototype.hasExternalDocs).toEqual(true);

      expect(model.prototype.externalDocs).not.toEqual(undefined);
      expect(typeof model.prototype.externalDocs).toEqual('function');
      expect(model.prototype.externalDocs === ExternalDocumentationMixin.prototype.externalDocs).toEqual(true);
    });
  });
}

export function assertTagsMixinInheritance(model: typeof TagsMixin) {
  describe('TagsMixin inheritance', function() {
    it(`check if ${model.name} model has inherited methods from TagsMixin`, function() {
      expect(model.prototype.tags).not.toEqual(undefined);
      expect(typeof model.prototype.tags).toEqual('function');
      expect(model.prototype.tags === TagsMixin.prototype.tags).toEqual(true);
    });
  });
}