import { ExternalDocs } from '../../src/old-api/external-docs';
import { Tag } from '../../src/old-api/tag';

export function assertDescriptionMixin(Model: any) {
  describe('description', function() {
    const doc1 = { description: 'Testing' };
    const doc2 = { description: '' };
    const doc3 = {};
    const d1 = new Model(doc1);
    const d2 = new Model(doc2);
    const d3 = new Model(doc3);

    describe('hasDescription()', function() {
      it('should return a boolean indicating if the object has description', function() {
        expect(d1.hasDescription()).toEqual(true);  
        expect(d2.hasDescription()).toEqual(false);  
        expect(d3.hasDescription()).toEqual(false);  
      });
    });
  
    describe('description()', function() {
      it('should return a value', function() {
        expect(d1.description()).toEqual(doc1.description);  
        expect(d2.description()).toEqual(''); 
      });

      it('should return a null', function() {
        expect(d3.description()).toEqual(null);  
      });
    });
  });
}

export function assertExternalDocumentationMixin(Model: any) {
  describe('externalDocs', function() {
    const doc1 = { externalDocs: { url: 'test.com' } };
    const doc2 = { externalDocs: {} };
    const doc3 = {};
    const d1 = new Model(doc1);
    const d2 = new Model(doc2);
    const d3 = new Model(doc3);

    describe('hasExternalDocs()', function() {
      it('should return a boolean indicating if the object has externalDocs', function() {
        expect(d1.hasExternalDocs()).toEqual(true);  
        expect(d2.hasExternalDocs()).toEqual(false);  
        expect(d3.hasExternalDocs()).toEqual(false);  
      });
    });
  
    describe('externalDocs()', function() {
      it('should return a externalDocs object', function() {
        expect(d1.externalDocs() instanceof ExternalDocs).toEqual(true);
        expect(d1.externalDocs()?.json()).toEqual(doc1.externalDocs);
  
        expect(d2.externalDocs() instanceof ExternalDocs).toEqual(true);
        expect(d2.externalDocs()?.json()).toEqual(doc2.externalDocs);
      });

      it('should return a null', function() {
        expect(d3.externalDocs()).toEqual(null);  
      });
    });
  });
}

export function assertBindingsMixin(Model: any) {
  describe('bindings', function() {
    const doc1 = { bindings: { amqp: { test: 'test1' } } };
    const doc2 = { bindings: {} };
    const doc3 = {};
    const d1 = new Model(doc1);
    const d2 = new Model(doc2);
    const d3 = new Model(doc3);

    describe('hasBindings()', function() {
      it('should return a boolean indicating if the object has bindings', function() {
        expect(d1.hasBindings()).toEqual(true);
        expect(d2.hasBindings()).toEqual(false);
        expect(d3.hasBindings()).toEqual(false);
      });
    });
  
    describe('bindings()', function() {
      it('should return a map of bindings', function() {
        expect(d1.bindings()).toEqual(doc1.bindings);
      });

      it('should return an empty object', function() {
        expect(d2.bindings()).toEqual({});
        expect(d3.bindings()).toEqual({});
      });
    });
  
    describe('bindingProtocols()', function() {
      it('should return an array of protocol names', function() {
        expect(d1.bindingProtocols()).toEqual(['amqp']);
      });

      it('should return an empty array', function() {
        expect(d2.bindingProtocols()).toEqual([]);
        expect(d3.bindingProtocols()).toEqual([]);
      });
    });
  
    describe('hasBinding()', function() {
      it('should return a boolean indicating if the bindings object has appropriate binding by name', function() {
        expect(d1.hasBinding('amqp')).toEqual(true);
        expect(d1.hasBinding('http')).toEqual(false);
        expect(d2.hasBinding('amqp')).toEqual(false);
        expect(d3.hasBinding('amqp')).toEqual(false);
      });
    });
  
    describe('binding()', function() {
      it('should return a binding object', function() {
        expect(d1.binding('amqp')).toEqual(doc1.bindings.amqp);
      });

      it('should return a null', function() {
        expect(d1.binding('http')).toEqual(null);
        expect(d2.binding('amqp')).toEqual(null);
        expect(d3.binding('amqp')).toEqual(null);
      });
    });
  });
}

export function assertExtensionsMixin(Model: any) {
  describe('extensions', function() {
    const doc1 = { 'x-test': 'testing', test: 'testing' };
    const doc2 = { test: 'testing' };
    const doc3 = {};
    const d1 = new Model(doc1);
    const d2 = new Model(doc2);
    const d3 = new Model(doc3);

    describe('hasExtensions()', function() {
      it('should return a boolean indicating if the object has extensions', function() {
        expect(d1.hasExtensions()).toEqual(true);
        expect(d2.hasExtensions()).toEqual(false);
        expect(d3.hasExtensions()).toEqual(false);
      });
    });
  
    describe('extensions()', function() {
      it('should return a object with extensions', function() {
        expect(d1.extensions()).toEqual({ 'x-test': 'testing'});
      });

      it('should return a empty object', function() {
        expect(d2.extensions()).toEqual({});
        expect(d3.extensions()).toEqual({});
      });
    });
  
    describe('extensionKeys()', function() {
      it('should return an array of extension keys', function() {
        expect(d1.extensionKeys()).toEqual(['x-test']);
      });

      it('should return an empty array', function() {
        expect(d2.extensionKeys()).toEqual([]);
        expect(d3.extensionKeys()).toEqual([]);
      });
    });
  
    describe('extKeys()', function() {
      it('should return an array of extension keys', function() {
        expect(d1.extKeys()).toEqual(['x-test']);
      });

      it('should return a null', function() {
        expect(d2.extKeys()).toEqual([]);
        expect(d3.extKeys()).toEqual([]);
      });
    });
  
    describe('hasExtension()', function() {
      it('should return a boolean indicating if the object has appropriate extension by key', function() {
        expect(d1.hasExtension('x-test')).toEqual(true);
        expect(d1.hasExtension('x-test2')).toEqual(false);
        expect(d2.hasExtension('x-test')).toEqual(false);
        expect(d3.hasExtension('x-test')).toEqual(false);
      });

      it('should return false key is not prefixed by `x-`', function() {
        expect(d1.hasExtension('test')).toEqual(false);
      });
    });
  
    describe('extension()', function() {
      it('should return a value', function() {
        expect(d1.extension('x-test')).toEqual('testing');
      });

      it('should return an undefined', function() {
        expect(d1.extension('x-test2')).toEqual(undefined);
        expect(d2.extension('x-test')).toEqual(undefined);
        expect(d3.extension('x-test')).toEqual(undefined);
      });

      it('should return null if key is not prefixed by `x-`', function() {
        expect(d1.extension('test')).toEqual(null);
      });
    });
  
    describe('hasExt()', function() {
      it('should return a boolean indicating if the object has appropriate extension by key', function() {
        expect(d1.hasExt('x-test')).toEqual(true);
        expect(d1.hasExt('x-test2')).toEqual(false);
        expect(d2.hasExt('x-test')).toEqual(false);
        expect(d3.hasExt('x-test')).toEqual(false);
      });

      it('should return false key is not prefixed by `x-`', function() {
        expect(d1.hasExt('test')).toEqual(false);
      });
    });
  
    describe('ext()', function() {
      it('should return a value', function() {
        expect(d1.ext('x-test')).toEqual('testing');
      });

      it('should return an undefined', function() {
        expect(d1.ext('x-test2')).toEqual(undefined);
        expect(d2.ext('x-test')).toEqual(undefined);
        expect(d3.ext('x-test')).toEqual(undefined);
      });

      it('should return null if key is not prefixed by `x-`', function() {
        expect(d1.ext('test')).toEqual(null);
      });
    });
  });
}

export function assertTagsMixin(Model: any) {
  describe('tags', function() {
    const doc1 = { tags: [{ name: 'test1' }, { name: 'test2' }] };
    const doc2 = { tags: [] };
    const doc3 = {};
    const d1 = new Model(doc1);
    const d2 = new Model(doc2);
    const d3 = new Model(doc3);

    describe('hasTags()', function() {
      it('should return a boolean indicating if the object has tags', function() {
        expect(d1.hasTags()).toEqual(true);
        expect(d2.hasTags()).toEqual(false);
        expect(d3.hasTags()).toEqual(false);
      });
    });
  
    describe('tags()', function() {
      it('should return an array of tag objects', function() {
        expect(Array.isArray(d1.tags())).toEqual(true);
        d1.tags().forEach((tag, i) => {
          expect(tag instanceof Tag).toEqual(true);
          expect(tag.json()).toEqual(doc1.tags[i]);
        });
      });

      it('should return an empty array', function() {
        expect(d2.tags()).toEqual([]);  
        expect(d3.tags()).toEqual([]);  
      });
    });
  
    describe('tagNames()', function() {
      it('should return an array of tag names', function() {
        expect(d1.tagNames()).toEqual(['test1', 'test2']);
      });

      it('should return an empty array', function() {
        expect(d2.tagNames()).toEqual([]);  
        expect(d3.tagNames()).toEqual([]);  
      });
    });
  
    describe('hasTag()', function() {
      it('should return a boolean indicating if the tags object has appropriate tag by name', function() {
        expect(d1.hasTag('test1')).toEqual(true);
        expect(d1.hasTag('test2')).toEqual(true);
        expect(d1.hasTag('test3')).toEqual(false);
        expect(d2.hasTag('test1')).toEqual(false);
        expect(d3.hasTag('test1')).toEqual(false);
      });
    });
  
    describe('tag()', function() {
      it('should return a tag object', function() {
        expect(d1.tag('test1')).not.toEqual(null);
        expect(d1.tag('test1') instanceof Tag).toEqual(true);
        expect(d1.tag('test2')).not.toEqual(null);
        expect(d1.tag('test2') instanceof Tag).toEqual(true);
      });

      it('should return a null', function() {
        expect(d1.tag('test3')).toEqual(null);
        expect(d1.tag('test3') instanceof Tag).not.toEqual(true);
        expect(d2.tag('test1')).toEqual(null);
        expect(d2.tag('test1') instanceof Tag).not.toEqual(true);
        expect(d3.tag('test1')).toEqual(null);
        expect(d3.tag('test1') instanceof Tag).not.toEqual(true);
      });
    });
  });
}