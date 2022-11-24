import { BindingsV2, ExtensionsV2, ExternalDocumentationV2, TagsV2 } from '../../../src/models/v2';

import type { Constructor } from '../../../src/models/utils';
import type { BindingsMixinInterface, CoreMixinInterface, DescriptionMixinInterface, ExtensionsMixinInterface, ExternalDocumentationMixinInterface, SummaryMixinInterface, TagsMixinInterface, TitleMixinInterface } from '../../../src/models/mixins';

type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

export function serializeInput<T>(data: DeepPartial<T>): T {
  return data as T;
}

export function assertBindings(model: Constructor<BindingsMixinInterface>) {
  describe('.bindings()', () => {
    const doc1 = { bindings: { amqp: { test: 'test1' } } };
    const doc2 = { bindings: {} };
    const doc3 = {};
    const d1 = new model(doc1);
    const d2 = new model(doc2);
    const d3 = new model(doc3);

    it('should return a collection of bindings', () => {
      expect(d1.bindings()).toBeInstanceOf(BindingsV2);
      expect(d1.bindings().length).toEqual(1);
    });

    it('should return an empty object', () => {
      expect(d2.bindings()).toBeInstanceOf(BindingsV2);
      expect(d2.bindings().length).toEqual(0);
      expect(d3.bindings()).toBeInstanceOf(BindingsV2);
      expect(d3.bindings().length).toEqual(0);
    });
  });
}

export function assertDescription(model: Constructor<DescriptionMixinInterface>) {
  describe('.hasDescription()', () => {
    const doc1 = { description: 'Testing' };
    const doc2 = { description: '' };
    const doc3 = {};
    const d1 = new model(doc1);
    const d2 = new model(doc2);
    const d3 = new model(doc3);

    it('should return a boolean indicating if the object has description', () => {
      expect(d1.hasDescription()).toEqual(true);  
      expect(d2.hasDescription()).toEqual(false);  
      expect(d3.hasDescription()).toEqual(false);  
    });
  });

  describe('.description()', () => {
    const doc1 = { description: 'Testing' };
    const doc2 = { description: '' };
    const doc3 = {};
    const d1 = new model(doc1);
    const d2 = new model(doc2);
    const d3 = new model(doc3);

    it('should return a value', () => {
      expect(d1.description()).toEqual(doc1.description);  
      expect(d2.description()).toEqual(''); 
    });

    it('should return an undefined', () => {
      expect(d3.description()).toEqual(undefined);  
    });
  });
}

export function assertExtensions(model: Constructor<ExtensionsMixinInterface>) {
  describe('.extensions()', () => {  
    const doc1 = { 'x-test': 'testing', test: 'testing' };
    const doc2 = { test: 'testing' };
    const doc3 = {};
    const d1 = new model(doc1);
    const d2 = new model(doc2);
    const d3 = new model(doc3);
  
    it('should return a collection with extensions', () => {
      expect(d1.extensions()).toBeInstanceOf(ExtensionsV2);
      expect(d1.extensions().length).toEqual(1);
    });

    it('should return a empty object', () => {
      expect(d2.extensions()).toBeInstanceOf(ExtensionsV2);
      expect(d2.extensions().length).toEqual(0);
      expect(d3.extensions()).toBeInstanceOf(ExtensionsV2);
      expect(d3.extensions().length).toEqual(0);
    });
  });
}

export function assertExternalDocumentation(model: Constructor<ExternalDocumentationMixinInterface>) {
  describe('.hasExternalDocs()', () => {
    const doc1 = { externalDocs: { url: 'test.com' } };
    const doc2 = { externalDocs: {} };
    const doc3 = {};
    const d1 = new model(doc1);
    const d2 = new model(doc2);
    const d3 = new model(doc3);

    it('should return a boolean indicating if the object has externalDocs', () => {
      expect(d1.hasExternalDocs()).toEqual(true);  
      expect(d2.hasExternalDocs()).toEqual(false);  
      expect(d3.hasExternalDocs()).toEqual(false);  
    });
  });

  describe('.externalDocs()', () => {
    const doc1 = { externalDocs: { url: 'test.com' } };
    const doc2 = { externalDocs: {} };
    const doc3 = {};
    const d1 = new model(doc1);
    const d2 = new model(doc2);
    const d3 = new model(doc3);

    it('should return a externalDocs object', () => {
      expect(d1.externalDocs()).toBeInstanceOf(ExternalDocumentationV2);
      expect(d1.externalDocs()!.json()).toEqual(doc1.externalDocs);
    });

    it('should return a undefined', () => {
      expect(d2.externalDocs()).toEqual(undefined);
      expect(d3.externalDocs()).toEqual(undefined);  
    });
  });
}

export function assertSummary(model: Constructor<SummaryMixinInterface>) {
  describe('.hasSummary()', () => {
    const doc1 = { summary: 'Testing' };
    const doc2 = { summary: '' };
    const doc3 = {};
    const d1 = new model(doc1);
    const d2 = new model(doc2);
    const d3 = new model(doc3);

    it('should return a boolean indicating if the object has summary', () => {
      expect(d1.hasSummary()).toEqual(true);  
      expect(d2.hasSummary()).toEqual(false);  
      expect(d3.hasSummary()).toEqual(false);  
    });
  });

  describe('.summary()', () => {
    const doc1 = { summary: 'Testing' };
    const doc2 = { summary: '' };
    const doc3 = {};
    const d1 = new model(doc1);
    const d2 = new model(doc2);
    const d3 = new model(doc3);

    it('should return a value', () => {
      expect(d1.summary()).toEqual(doc1.summary);  
      expect(d2.summary()).toEqual(''); 
    });

    it('should return an undefined', () => {
      expect(d3.summary()).toEqual(undefined);  
    });
  });
}

export function assertTags(model: Constructor<TagsMixinInterface>) {
  describe('tags', () => {
    const doc1 = { tags: [{ name: 'test1' }, { name: 'test2' }] };
    const doc2 = { tags: [] };
    const doc3 = {};
    const d1 = new model(doc1);
    const d2 = new model(doc2);
    const d3 = new model(doc3);

    it('should return an array of tag objects', () => {
      expect(d1.tags()).toBeInstanceOf(TagsV2);
      expect(d1.tags().length).toEqual(2);
    });

    it('should return an empty array', () => {
      expect(d2.tags()).toBeInstanceOf(TagsV2);
      expect(d2.tags().length).toEqual(0);
      expect(d3.tags()).toBeInstanceOf(TagsV2);
      expect(d3.tags().length).toEqual(0);
    });
  });
}

export function assertTitle(model: Constructor<TitleMixinInterface>) {
  describe('.hasTitle()', () => {
    const doc1 = { title: 'Testing' };
    const doc2 = { title: '' };
    const doc3 = {};
    const d1 = new model(doc1);
    const d2 = new model(doc2);
    const d3 = new model(doc3);

    it('should return a boolean indicating if the object has title', () => {
      expect(d1.hasTitle()).toEqual(true);  
      expect(d2.hasTitle()).toEqual(false);  
      expect(d3.hasTitle()).toEqual(false);  
    });
  });

  describe('.title()', () => {
    const doc1 = { title: 'Testing' };
    const doc2 = { title: '' };
    const doc3 = {};
    const d1 = new model(doc1);
    const d2 = new model(doc2);
    const d3 = new model(doc3);

    it('should return a value', () => {
      expect(d1.title()).toEqual(doc1.title);  
      expect(d2.title()).toEqual(''); 
    });

    it('should return an undefined', () => {
      expect(d3.title()).toEqual(undefined);  
    });
  });
}

export function assertCoreModel(model: Constructor<CoreMixinInterface>) {
  assertBindings(model);
  assertDescription(model);
  assertExtensions(model);
  assertExternalDocumentation(model);
  assertSummary(model);
  assertTags(model);
  assertTitle(model);
}
