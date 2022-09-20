import { MessageTrait } from '../../src/old-api/message-trait';
import { Schema } from '../../src/old-api/schema';
import { assertDescriptionMixin, assertExternalDocumentationMixin, assertExtensionsMixin, assertBindingsMixin, assertTagsMixin } from './mixins';

describe('MessageTrait', function() {
  const json: any = { messageId: 'someId', schemaFormat: 'mySchema', headers: { properties: { test1: { type: 'string' }, test2: { type: 'number' } } }, correlationId: { test: true }, contentType: 'application/json', name: 'test', title: 'Test', summary: 'test', description: 'testing', externalDocs: { test: true }, tags: [{ name: 'tag1' }], bindings: { amqp: { test: true } }, examples: [{name: 'test', summary: 'test summary', payload: {test: true}}], 'x-test': 'testing' };

  describe('headers()', function() {
    it('should return a map of Schema objects', function() {
      const d = new MessageTrait(json);
      expect(d.headers()).toBeInstanceOf(Schema);
      expect(d.headers()?.json()).toEqual(json.headers);
    });
  });

  describe('header()', function() {
    it('should return a specific Schema object', function() {
      const d = new MessageTrait(json);
      expect(d.header('test1')).toBeInstanceOf(Schema);
      expect(d.header('test1')?.json()).toEqual(json.headers.properties.test1);
    });
  });

  describe('payload()', function() {
    it('should NOT have a payload method', function() {
      const d = new MessageTrait(json);
      expect((d as any).payload).toEqual(undefined);
    });
  });

  describe('originalPayload()', function() {
    it('should NOT have an originalPayload method', function() {
      const d = new MessageTrait(json);
      expect((d as any).originalPayload).toEqual(undefined);
    });
  });

  describe('id()', function() {
    it('should return a string', function() {
      const d = new MessageTrait(json);
      expect(d.id()).toEqual(json.messageId);
    });
  });

  describe('correlationId()', function() {
    it('should return a CorrelationId object', function() {
      const d = new MessageTrait(json);
      expect(d.correlationId()?.json()).toEqual(json.correlationId);
    });
  });

  describe('schemaFormat()', function() {
    it('should return a string', function() {
      const d = new MessageTrait(json);
      expect(d.schemaFormat()).toEqual('mySchema');
    });
  });

  describe('originalSchemaFormat()', function() {
    it('should NOT have an originalSchemaFormat method', function() {
      const d = new MessageTrait(json);
      expect((d as any).originalSchemaFormat).toEqual(undefined);
    });
  });

  describe('contentType()', function() {
    it('should return a string', function() {
      const d = new MessageTrait(json);
      expect(d.contentType()).toEqual(json.contentType);
    });
  });

  describe('name()', function() {
    it('should return a string', function() {
      const d = new MessageTrait(json);
      expect(d.name()).toEqual(json.name);
    });
  });

  describe('title()', function() {
    it('should return a string', function() {
      const d = new MessageTrait(json);
      expect(d.title()).toEqual(json.title);
    });
  });

  describe('summary()', function() {
    it('should return a string', function() {
      const d = new MessageTrait(json);
      expect(d.summary()).toEqual(json.summary);
    });
  });

  describe('examples()', function() {
    it('should return an array of examples', function() {
      const d = new MessageTrait(json);
      expect(Array.isArray(d.examples())).toEqual(true);
      expect(d.examples()).toEqual(json.examples);
    });
  });

  assertDescriptionMixin(MessageTrait);
  assertExternalDocumentationMixin(MessageTrait);
  assertBindingsMixin(MessageTrait);
  assertTagsMixin(MessageTrait);
  assertExtensionsMixin(MessageTrait);
});