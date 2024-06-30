import { OperationTrait } from '../../src/old-api/operation-trait';
import { assertDescriptionMixin, assertExternalDocumentationMixin, assertExtensionsMixin, assertBindingsMixin, assertTagsMixin } from './mixins';

describe('OperationTrait', function() {   
  const json: any = { summary: 't', description: 'test', operationId: 'test', tags: [{name: 'tag1'}], externalDocs: { url: 'somewhere' }, bindings: { amqp: { test: true } }, 'x-test': 'testing' };

  describe('summary()', function() {
    it('should return a string', function() {
      const d = new OperationTrait(json);
      expect(d.summary()).toEqual(json.summary);
    });
  });
   
  describe('id()', function() {
    it('should return a string', function() {
      const d = new OperationTrait(json);
      expect(d.id()).toEqual(json.operationId);
    });
  });
  
  describe('messages()', function() {
    it('should NOT have a messages method', function() {
      const d = new OperationTrait(json);
      expect((d as any).messages).toEqual(undefined);
    });
  });
  
  describe('message()', function() {
    it('should NOT have a message method', function() {
      const d = new OperationTrait(json);
      expect((d as any).message).toEqual(undefined);
    });
  });

  assertDescriptionMixin(OperationTrait);
  assertExternalDocumentationMixin(OperationTrait);
  assertBindingsMixin(OperationTrait);
  assertTagsMixin(OperationTrait);
  assertExtensionsMixin(OperationTrait);
});