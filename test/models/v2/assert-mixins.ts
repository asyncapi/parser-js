import { BindingsV2, ExtensionsV2, ExternalDocumentationV2, TagsV2 } from '../../../src/models/v2';

import type { Constructor } from '../../../src/models/utils';
import type { BindingsMixinInterface, DescriptionMixinInterface, ExtensionsMixinInterface, ExternalDocumentationMixinInterface, TagsMixinInterface } from '../../../src/models/mixins';

type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

export function serializeInput<T>(data: DeepPartial<T>): T {
  return data as T;
}

export function assertBindings(model: Constructor<BindingsMixinInterface>) {
  describe('.bindings()', function() {
    const doc1 = { bindings: { amqp: { test: 'test1' } } };
    const doc2 = { bindings: {} };
    const doc3 = {};
    const d1 = new model(doc1);
    const d2 = new model(doc2);
    const d3 = new model(doc3);

    it('should return a collection of bindings', function() {
      expect(d1.bindings()).toBeInstanceOf(BindingsV2);
      expect(d1.bindings().length).toEqual(1);
    });

    it('should return an empty object', function() {
      expect(d2.bindings()).toBeInstanceOf(BindingsV2);
      expect(d2.bindings().length).toEqual(0);
      expect(d3.bindings()).toBeInstanceOf(BindingsV2);
      expect(d3.bindings().length).toEqual(0);
    });
  });
}

export function assertDescription(model: Constructor<DescriptionMixinInterface>) {
  describe('.hasDescription()', function() {
    const doc1 = { description: 'Testing' };
    const doc2 = { description: '' };
    const doc3 = {};
    const d1 = new model(doc1);
    const d2 = new model(doc2);
    const d3 = new model(doc3);

    it('should return a boolean indicating if the object has description', function() {
      expect(d1.hasDescription()).toEqual(true);  
      expect(d2.hasDescription()).toEqual(false);  
      expect(d3.hasDescription()).toEqual(false);  
    });
  });

  describe('.description()', function() {
    const doc1 = { description: 'Testing' };
    const doc2 = { description: '' };
    const doc3 = {};
    const d1 = new model(doc1);
    const d2 = new model(doc2);
    const d3 = new model(doc3);

    it('should return a value', function() {
      expect(d1.description()).toEqual(doc1.description);  
      expect(d2.description()).toEqual(''); 
    });

    it('should return an undefined', function() {
      expect(d3.description()).toEqual(undefined);  
    });
  });
}

export function assertExtensions(model: Constructor<ExtensionsMixinInterface>) {
  describe('.extensions()', function() {  
    const doc1 = { 'x-test': 'testing', test: 'testing' };
    const doc2 = { test: 'testing' };
    const doc3 = {};
    const d1 = new model(doc1);
    const d2 = new model(doc2);
    const d3 = new model(doc3);
  
    it('should return a collection with extensions', function() {
      expect(d1.extensions()).toBeInstanceOf(ExtensionsV2);
      expect(d1.extensions().length).toEqual(1);
    });

    it('should return a empty object', function() {
      expect(d2.extensions()).toBeInstanceOf(ExtensionsV2);
      expect(d2.extensions().length).toEqual(0);
      expect(d3.extensions()).toBeInstanceOf(ExtensionsV2);
      expect(d3.extensions().length).toEqual(0);
    });
  });
}

export function assertExternalDocumentation(model: Constructor<ExternalDocumentationMixinInterface>) {
  describe('.hasExternalDocs()', function() {
    const doc1 = { externalDocs: { url: 'test.com' } };
    const doc2 = { externalDocs: {} };
    const doc3 = {};
    const d1 = new model(doc1);
    const d2 = new model(doc2);
    const d3 = new model(doc3);

    it('should return a boolean indicating if the object has externalDocs', function() {
      expect(d1.hasExternalDocs()).toEqual(true);  
      expect(d2.hasExternalDocs()).toEqual(false);  
      expect(d3.hasExternalDocs()).toEqual(false);  
    });
  });

  describe('.externalDocs()', function() {
    const doc1 = { externalDocs: { url: 'test.com' } };
    const doc2 = { externalDocs: {} };
    const doc3 = {};
    const d1 = new model(doc1);
    const d2 = new model(doc2);
    const d3 = new model(doc3);

    it('should return a externalDocs object', function() {
      expect(d1.externalDocs()).toBeInstanceOf(ExternalDocumentationV2);
      expect(d1.externalDocs()!.json()).toEqual(doc1.externalDocs);
    });

    it('should return a undefined', function() {
      expect(d2.externalDocs()).toEqual(undefined);
      expect(d3.externalDocs()).toEqual(undefined);  
    });
  });
}

export function assertTags(model: Constructor<TagsMixinInterface>) {
  describe('tags', function() {
    const doc1 = { tags: [{ name: 'test1' }, { name: 'test2' }] };
    const doc2 = { tags: [] };
    const doc3 = {};
    const d1 = new model(doc1);
    const d2 = new model(doc2);
    const d3 = new model(doc3);

    it('should return an array of tag objects', function() {
      expect(d1.tags()).toBeInstanceOf(TagsV2);
      expect(d1.tags().length).toEqual(2);
    });

    it('should return an empty array', function() {
      expect(d2.tags()).toBeInstanceOf(TagsV2);
      expect(d2.tags().length).toEqual(0);
      expect(d3.tags()).toBeInstanceOf(TagsV2);
      expect(d3.tags().length).toEqual(0);
    });
  });
}