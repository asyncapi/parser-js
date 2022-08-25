import { BaseModel } from '../../../src/models/base';
import { bindings, hasDescription, description, extensions, hasExternalDocs, externalDocs, tags } from '../../../src/models/v2/mixins';
import { BindingsV2, ExtensionsV2, ExternalDocumentationV2, TagsV2 } from '../../../src/models/v2';


describe('mixins', function() {
  describe('bindings', function() {
    class Model extends BaseModel {};

    const doc1 = { bindings: { amqp: { test: 'test1' } } };
    const doc2 = { bindings: {} };
    const doc3 = {};
    const d1 = new Model(doc1);
    const d2 = new Model(doc2);
    const d3 = new Model(doc3);

    it('should return a collection of bindings', function() {
      expect(bindings(d1)).toBeInstanceOf(BindingsV2);
      expect(bindings(d1).length).toEqual(1);
    });

    it('should return an empty object', function() {
      expect(bindings(d2)).toBeInstanceOf(BindingsV2);
      expect(bindings(d2).length).toEqual(0);
      expect(bindings(d3)).toBeInstanceOf(BindingsV2);
      expect(bindings(d3).length).toEqual(0);
    });
  });

  describe('hasDescription', function() {
    class Model extends BaseModel {};

    const doc1 = { description: 'Testing' };
    const doc2 = { description: '' };
    const doc3 = {};
    const d1 = new Model(doc1);
    const d2 = new Model(doc2);
    const d3 = new Model(doc3);

    it('should return a boolean indicating if the object has description', function() {
      expect(hasDescription(d1)).toEqual(true);  
      expect(hasDescription(d2)).toEqual(false);  
      expect(hasDescription(d3)).toEqual(false);  
    });
  });

  describe('description', function() {
    class Model extends BaseModel {};

    const doc1 = { description: 'Testing' };
    const doc2 = { description: '' };
    const doc3 = {};
    const d1 = new Model(doc1);
    const d2 = new Model(doc2);
    const d3 = new Model(doc3);

    it('should return a value', function() {
      expect(description(d1)).toEqual(doc1.description);  
      expect(description(d2)).toEqual(''); 
    });

    it('should return an undefined', function() {
      expect(description(d3)).toEqual(undefined);  
    });
  });

  describe('extensions', function() {
    class Model extends BaseModel {};
  
    const doc1 = { 'x-test': 'testing', test: 'testing' };
    const doc2 = { test: 'testing' };
    const doc3 = {};
    const d1 = new Model(doc1);
    const d2 = new Model(doc2);
    const d3 = new Model(doc3);
  
    it('should return a collection with extensions', function() {
      expect(extensions(d1)).toBeInstanceOf(ExtensionsV2);
      expect(extensions(d1).length).toEqual(1);
    });

    it('should return a empty object', function() {
      expect(extensions(d2)).toBeInstanceOf(ExtensionsV2);
      expect(extensions(d2).length).toEqual(0);
      expect(extensions(d3)).toBeInstanceOf(ExtensionsV2);
      expect(extensions(d3).length).toEqual(0);
    });
  });

  describe('hasExternalDocs', function() {
    class Model extends BaseModel {};

    const doc1 = { externalDocs: { url: 'test.com' } };
    const doc2 = { externalDocs: {} };
    const doc3 = {};
    const d1 = new Model(doc1);
    const d2 = new Model(doc2);
    const d3 = new Model(doc3);

    it('should return a boolean indicating if the object has externalDocs', function() {
      expect(hasExternalDocs(d1)).toEqual(true);  
      expect(hasExternalDocs(d2)).toEqual(false);  
      expect(hasExternalDocs(d3)).toEqual(false);  
    });
  });

  describe('externalDocs', function() {
    class Model extends BaseModel {};

    const doc1 = { externalDocs: { url: 'test.com' } };
    const doc2 = { externalDocs: {} };
    const doc3 = {};
    const d1 = new Model(doc1);
    const d2 = new Model(doc2);
    const d3 = new Model(doc3);

    it('should return a externalDocs object', function() {
      expect(externalDocs(d1)).toBeInstanceOf(ExternalDocumentationV2);
      expect(externalDocs(d1)!.json()).toEqual(doc1.externalDocs);
    });

    it('should return a undefined', function() {
      expect(externalDocs(d2)).toEqual(undefined);
      expect(externalDocs(d3)).toEqual(undefined);  
    });
  });

  describe('tags', function() {
    class Model extends BaseModel {};

    const doc1 = { tags: [{ name: 'test1' }, { name: 'test2' }] };
    const doc2 = { tags: [] };
    const doc3 = {};
    const d1 = new Model(doc1);
    const d2 = new Model(doc2);
    const d3 = new Model(doc3);

    it('should return an array of tag objects', function() {
      expect(tags(d1)).toBeInstanceOf(TagsV2);
      expect(tags(d1).length).toEqual(2);
    });

    it('should return an empty array', function() {
      expect(tags(d2)).toBeInstanceOf(TagsV2);
      expect(tags(d2).length).toEqual(0);
      expect(tags(d3)).toBeInstanceOf(TagsV2);
      expect(tags(d3).length).toEqual(0);
    });
  });
});
