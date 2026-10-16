import { Bindings } from '../../../src/models/v2/bindings';
import { Binding } from '../../../src/models/v2/binding';
import { Extensions } from '../../../src/models/v2/extensions';
import { Extension } from '../../../src/models/v2/extension';

const binding = {
  http: {}
};
const bindingItem = new Binding(binding, { asyncapi: {} as any, pointer: '', protocol: 'http' });

describe('Bindings model', function () {
  describe('.isEmpty()', function () {
    it('should return true if collection is empty', function () {
      const bindings = new Bindings([]);
      expect(bindings.isEmpty()).toEqual(true);
    });

    it('should return false if collection is not empty', function () {
      const bindings = new Bindings([bindingItem]);
      expect(bindings.isEmpty()).toEqual(false);
    });
  });

  describe('.get(id)', function () {
    it('should return a specific Message Trait if it is present', function () {
      const bindings = new Bindings([bindingItem]);
      expect(bindings.get('http')).toBeTruthy();
    });

    it('should return undefined if specific Message Trait is missing', function () {
      const bindings = new Bindings([]);
      expect(bindings.get('anotherProtocol')).toBeUndefined();
    });
  });

  describe('.has(id)', function () {
    it('should return true if the said id is available', function () {
      const bindings = new Bindings([bindingItem]);
      expect(bindings.has('http')).toEqual(true);
    });

    it('should return false if the Message Trait id is missing', function () {
      const bindings = new Bindings([bindingItem]);
      expect(bindings.has('anotherProtocol')).toEqual(false);
    });
  });

  describe('.extensions()', function () {
    it('should return empty collection of extensions', function () {
      const bindings = new Bindings([], {});
      expect(bindings.extensions()).toBeInstanceOf(Extensions);
      expect(bindings.extensions().isEmpty()).toEqual(true);
    });

    it('should return collection of extensions', function () {
      const bindings = new Bindings([], { asyncapi: {} as any, originalData: { 'x-someExtension': { someKey: 'someValue' } as any, 'x-anotherOne': { someKey: 123 } as any } });
      expect(bindings.extensions()).toBeInstanceOf(Extensions);
      expect(bindings.extensions().get('x-someExtension')).toBeInstanceOf(Extension);
      expect(bindings.extensions().get('x-someExtension')?.value()).toEqual({ someKey: 'someValue' });
      expect(bindings.extensions().get('x-anotherOne')).toBeInstanceOf(Extension);
      expect(bindings.extensions().get('x-anotherOne')?.value()).toEqual({ someKey: 123 });
    });
  });
});
