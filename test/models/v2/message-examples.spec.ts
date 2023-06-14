import { MessageExamples } from '../../../src/models/v2/message-examples';
import { MessageExample } from '../../../src/models/v2/message-example';

const messageExample = {
  name: 'test',
};
const messageExampleItem = new MessageExample(messageExample);

describe('MessageExamples model', function () {
  describe('.isEmpty()', function () {
    it('should return true if collection is empty', function () {
      const servers = new MessageExamples([]);
      expect(servers.isEmpty()).toEqual(true);
    });

    it('should return false if collection is not empty', function () {
      const servers = new MessageExamples([messageExampleItem]);
      expect(servers.isEmpty()).toEqual(false);
    });
  });

  describe('.get(id)', function () {
    it('should return a specific Message Example if it is present', function () {
      const servers = new MessageExamples([messageExampleItem]);
      expect(servers.get('test')).toBeTruthy();
    });

    it('should return undefined if specific Message Example is missing', function () {
      const servers = new MessageExamples([]);
      expect(servers.get('test')).toBeUndefined();
    });
  });

  describe('.has(id)', function () {
    it('should return true if the said name is available', function () {
      const servers = new MessageExamples([messageExampleItem]);
      expect(servers.has('test')).toEqual(true);
    });

    it('should return false if the Message Example name is missing', function () {
      const servers = new MessageExamples([messageExampleItem]);
      expect(servers.has('anotherName')).toEqual(false);
    });
  });
});