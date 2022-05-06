import { Operations } from '../../../src/models/v2/operations';
import { Operation } from '../../../src/models/v2/operation';

const operation = {
  messageId: 'test',
};
const operationItem = new Operation('test', operation);

describe('Operations model', function () {
  describe('.isEmpty()', function () {
    it('should return true if collection is empty', function () {
      const servers = new Operations([]);
      expect(servers.isEmpty()).toEqual(true);
    });

    it('should return false if collection is not empty', function () {
      const servers = new Operations([operationItem]);
      expect(servers.isEmpty()).toEqual(false);
    });
  });

  describe('.get(id)', function () {
    it('should return a specific Operation if it is present', function () {
      const servers = new Operations([operationItem]);
      expect(servers.get('test')).toBeTruthy();
    });

    it('should return undefined if specific Operation is missing', function () {
      const servers = new Operations([]);
      expect(servers.get('test')).toBeUndefined();
    });
  });

  describe('.has(id)', function () {
    it('should return true if the said id is available', function () {
      const servers = new Operations([operationItem]);
      expect(servers.has('test')).toEqual(true);
    })

    it('should return false if the Operation id is missing', function () {
      const servers = new Operations([operationItem]);
      expect(servers.has('anotherId')).toEqual(false);
    })
  })
})