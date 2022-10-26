import { MessageTraits } from '../../../src/models/message-traits';
import { MessageTrait } from '../../../src/models/v2/message-trait';

const messageTrait = {
  messageId: 'test',
};
const messageTraitItem = new MessageTrait(messageTrait, { asyncapi: {} as any, pointer: '', id: 'test' });

describe('MessageTraits model', function () {
  describe('.isEmpty()', function () {
    it('should return true if collection is empty', function () {
      const servers = new MessageTraits([]);
      expect(servers.isEmpty()).toEqual(true);
    });

    it('should return false if collection is not empty', function () {
      const servers = new MessageTraits([messageTraitItem]);
      expect(servers.isEmpty()).toEqual(false);
    });
  });

  describe('.get(id)', function () {
    it('should return a specific Message Trait if it is present', function () {
      const servers = new MessageTraits([messageTraitItem]);
      expect(servers.get('test')).toBeTruthy();
    });

    it('should return undefined if specific Message Trait is missing', function () {
      const servers = new MessageTraits([]);
      expect(servers.get('test')).toBeUndefined();
    });
  });

  describe('.has(id)', function () {
    it('should return true if the said id is available', function () {
      const servers = new MessageTraits([messageTraitItem]);
      expect(servers.has('test')).toEqual(true);
    });

    it('should return false if the Message Trait id is missing', function () {
      const servers = new MessageTraits([messageTraitItem]);
      expect(servers.has('anotherId')).toEqual(false);
    });
  });
});