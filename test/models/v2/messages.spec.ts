import { Messages } from '../../../src/models/v2/messages';
import { Message } from '../../../src/models/v2/message';

const message = {
  messageId: 'test',
};
const messageItem = new Message(message, { asyncapi: {} as any, pointer: '', id: 'test' });

describe('Messages model', function () {
  describe('.isEmpty()', function () {
    it('should return true if collection is empty', function () {
      const servers = new Messages([]);
      expect(servers.isEmpty()).toEqual(true);
    });

    it('should return false if collection is not empty', function () {
      const servers = new Messages([messageItem]);
      expect(servers.isEmpty()).toEqual(false);
    });
  });

  describe('.get(id)', function () {
    it('should return a specific Message if it is present', function () {
      const servers = new Messages([messageItem]);
      expect(servers.get('test')).toBeTruthy();
    });

    it('should return undefined if specific Message is missing', function () {
      const servers = new Messages([]);
      expect(servers.get('test')).toBeUndefined();
    });
  });

  describe('.has(id)', function () {
    it('should return true if the said id is available', function () {
      const servers = new Messages([messageItem]);
      expect(servers.has('test')).toEqual(true);
    })

    it('should return false if the Message id is missing', function () {
      const servers = new Messages([messageItem]);
      expect(servers.has('anotherId')).toEqual(false);
    })
  })
})