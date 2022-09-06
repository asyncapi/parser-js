import { Operations } from '../../../src/models/v2/operations';
import { Operation } from '../../../src/models/v2/operation';

const operation = {
  operationId: 'test',
};
const operationItem = new Operation(operation, { asyncapi: {} as any, pointer: '', id: 'test', action: 'publish' });
const operationItems = [
  new Operation({operationId: 'test1'}, { asyncapi: {} as any, pointer: '', id: 'test1', action: 'publish' }),
  new Operation({operationId: 'test2'}, { asyncapi: {} as any, pointer: '', id: 'test2', action: 'publish' }),
  new Operation({operationId: 'test3'}, { asyncapi: {} as any, pointer: '', id: 'test3', action: 'subscribe' }),
  new Operation({operationId: 'test4'}, { asyncapi: {} as any, pointer: '', id: 'test4', action: 'subscribe' }),
];

describe('Operations model', function () {
  describe('.isEmpty()', function () {
    it('should return true if collection is empty', function () {
      const operations = new Operations([]);
      expect(operations.isEmpty()).toEqual(true);
    });

    it('should return false if collection is not empty', function () {
      const operations = new Operations([operationItem]);
      expect(operations.isEmpty()).toEqual(false);
    });
  });

  describe('.get(id)', function () {
    it('should return a specific Operation if it is present', function () {
      const operations = new Operations([operationItem]);
      expect(operations.get('test')).toBeTruthy();
    });

    it('should return undefined if specific Operation is missing', function () {
      const operations = new Operations([]);
      expect(operations.get('test')).toBeUndefined();
    });
  });

  describe('.has(id)', function () {
    it('should return true if the said id is available', function () {
      const operations = new Operations([operationItem]);
      expect(operations.has('test')).toEqual(true);
    })

    it('should return false if the Operation id is missing', function () {
      const operations = new Operations([operationItem]);
      expect(operations.has('anotherId')).toEqual(false);
    })
  })

  describe('.filterBySend()', function () {
    it('should return all operations with subscribe action', function () {
      const operations = new Operations(operationItems);
      expect(operations.filterBySend()).toEqual([operationItems[2], operationItems[3]]);
    })

    it('should return empty if there are no operations with subscribe action', function () {
      const operations = new Operations([operationItems[0], operationItems[1]]);
      expect(operations.filterBySend()).toEqual([]);
    })
  })

  describe('.filterByReceive()', function () {
    it('should return all operations with publish action', function () {
      const operations = new Operations(operationItems);
      expect(operations.filterByReceive()).toEqual([operationItems[0], operationItems[1]]);
    })

    it('should return empty if there are no operations with publish action', function () {
      const operations = new Operations([operationItems[2], operationItems[3]]);
      expect(operations.filterByReceive()).toEqual([]);
    })
  })
})