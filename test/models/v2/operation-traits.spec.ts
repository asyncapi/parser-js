import { OperationTraits } from '../../../src/models/operation-traits';
import { OperationTrait } from '../../../src/models/v2/operation-trait';

const operationTrait = {
  operationId: 'test',
};
const operationTraitItem = new OperationTrait(operationTrait, { asyncapi: {} as any, pointer: '', id: 'test', action: 'publish' });

describe('OperationTraits model', function () {
  describe('.isEmpty()', function () {
    it('should return true if collection is empty', function () {
      const servers = new OperationTraits([]);
      expect(servers.isEmpty()).toEqual(true);
    });

    it('should return false if collection is not empty', function () {
      const servers = new OperationTraits([operationTraitItem]);
      expect(servers.isEmpty()).toEqual(false);
    });
  });

  describe('.get(id)', function () {
    it('should return a specific Operation Trait if it is present', function () {
      const servers = new OperationTraits([operationTraitItem]);
      expect(servers.get('test')).toBeTruthy();
    });

    it('should return undefined if specific Operation Trait is missing', function () {
      const servers = new OperationTraits([]);
      expect(servers.get('test')).toBeUndefined();
    });
  });

  describe('.has(id)', function () {
    it('should return true if the said id is available', function () {
      const servers = new OperationTraits([operationTraitItem]);
      expect(servers.has('test')).toEqual(true);
    });

    it('should return false if the Operation Trait id is missing', function () {
      const servers = new OperationTraits([operationTraitItem]);
      expect(servers.has('anotherId')).toEqual(false);
    });
  });
});