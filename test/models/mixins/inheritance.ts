import { 
  BindingsMixin,
  DescriptionMixin,
  ExternalDocsMixin,
  SpecificationExtensionsMixin,
  TagsMixin,
} from '../../../src/models/mixins';

export function assertBindingsMixinInheritance(model: typeof BindingsMixin) {
  describe('BindingsMixin inheritance', function() {
    it(`check if ${model.name} model has inherited methods from BindingsMixin`, function() {
      expect(model.prototype.hasBindings).not.toEqual(undefined);
      expect(typeof model.prototype.hasBindings).toEqual('function');
      expect(model.prototype.hasBindings === BindingsMixin.prototype.hasBindings).toEqual(true);

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

export function assertExternalDocsMixinInheritance(model: typeof ExternalDocsMixin) {
  describe('ExternalDocsMixin inheritance', function() {
    it(`check if ${model.name} model has inherited methods from ExternalDocsMixin`, function() {
      expect(model.prototype.hasExternalDocs).not.toEqual(undefined);
      expect(typeof model.prototype.hasExternalDocs).toEqual('function');
      expect(model.prototype.hasExternalDocs === ExternalDocsMixin.prototype.hasExternalDocs).toEqual(true);

      expect(model.prototype.externalDocs).not.toEqual(undefined);
      expect(typeof model.prototype.externalDocs).toEqual('function');
      expect(model.prototype.externalDocs === ExternalDocsMixin.prototype.externalDocs).toEqual(true);
    });
  });
}

export function assertSpecificationExtensionsMixinInheritance(model: typeof SpecificationExtensionsMixin) {
  describe('SpecificationExtensionsMixin inheritance', function() {
    it(`check if ${model.name} model has inherited methods from SpecificationExtensionsMixin`, function() {
      expect(model.prototype.hasExtensions).not.toEqual(undefined);
      expect(typeof model.prototype.hasExtensions).toEqual('function');
      expect(model.prototype.hasExtensions === SpecificationExtensionsMixin.prototype.hasExtensions).toEqual(true);

      expect(model.prototype.extensions).not.toEqual(undefined);
      expect(typeof model.prototype.extensions).toEqual('function');
      expect(model.prototype.extensions === SpecificationExtensionsMixin.prototype.extensions).toEqual(true);
    });
  });
}

export function assertTagsMixinInheritance(model: typeof TagsMixin) {
  describe('TagsMixin inheritance', function() {
    it(`check if ${model.name} model has inherited methods from TagsMixin`, function() {
      expect(model.prototype.hasTags).not.toEqual(undefined);
      expect(typeof model.prototype.hasTags).toEqual('function');
      expect(model.prototype.hasTags === TagsMixin.prototype.hasTags).toEqual(true);

      expect(model.prototype.tags).not.toEqual(undefined);
      expect(typeof model.prototype.tags).toEqual('function');
      expect(model.prototype.tags === TagsMixin.prototype.tags).toEqual(true);
    });
  });
}
