import { Tags } from '../../../src/models/v2/tags';
import { Tag } from '../../../src/models/v2/tag';

const tag = {
  name: 'test',
};
const tagItem = new Tag(tag);

describe('Tags model', function () {
  describe('.isEmpty()', function () {
    it('should return true if collection is empty', function () {
      const servers = new Tags([]);
      expect(servers.isEmpty()).toBeTruthy();
    });

    it('should return false if collection is not empty', function () {
      const servers = new Tags([tagItem]);
      expect(servers.isEmpty()).toBeFalsy();
    });
  });

  describe('.get(id)', function () {
    it('should return a specific Tag Object if it is present', function () {
      const servers = new Tags([tagItem]);
      expect(servers.get('test')).toBeTruthy();
    });

    it('should return undefined if specific Tag Object is missing', function () {
      const servers = new Tags([]);
      expect(servers.get('test')).toBeUndefined();
    });
  });

  describe('.has(id)', function () {
    it('should return true if the said name is available', function () {
      const servers = new Tags([tagItem]);
      expect(servers.has('test')).toBeTruthy();
    });

    it('should return false if the Tag name is missing', function () {
      const servers = new Tags([tagItem]);
      expect(servers.has('anotherName')).toBeFalsy();
    });
  });
});