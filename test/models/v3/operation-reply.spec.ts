import { Channel } from '../../../src/models/v3/channel';
import { OperationReply } from '../../../src/models/v3/operation-reply';
import { OperationReplyAddress } from '../../../src/models/v3/operation-reply-address';

import { assertExtensions } from './utils';

describe('OperationReply model', function() {
  describe('.id()', function() {
    it('should return id', function() {
      const d = new OperationReply({}, { asyncapi: {} as any, pointer: '', id: 'reply' });
      expect(d.id()).toEqual('reply');
    });
  });

  describe('.hasAddress()', function() {
    it('should return true if address is present', function() {
      const d = new OperationReply({ address: { location: 'location' } }, { asyncapi: {} as any, pointer: '' });
      expect(d.hasAddress()).toEqual(true);
    });

    it('should return false if address is not present', function() {
      const d = new OperationReply({}, { asyncapi: {} as any, pointer: '' });
      expect(d.hasAddress()).toEqual(false);
    });
  });

  describe('.address()', function() {
    it('should return OperationReplyAdress Model if address is present', function() {
      const d = new OperationReply({ address: { location: 'location' } }, { asyncapi: {} as any, pointer: '' });
      expect(d.address()).toBeInstanceOf(OperationReplyAddress);
    });

    it('should return undefined if address is not present', function() {
      const d = new OperationReply({}, { asyncapi: {} as any, pointer: '' });
      expect(d.address()).toBeUndefined();
    });
  });

  describe('.hasChannel()', function() {
    it('should return true if channel is present', function() {
      const d = new OperationReply({ channel: {} }, { asyncapi: {} as any, pointer: '' });
      expect(d.hasChannel()).toEqual(true);
    });

    it('should return false if channel is not present', function() {
      const d = new OperationReply({}, { asyncapi: {} as any, pointer: '' });
      expect(d.hasChannel()).toEqual(false);
    });
  });

  describe('.channel()', function() {
    it('should return Channel Model if address is present', function() {
      const d = new OperationReply({ channel: {} }, { asyncapi: {} as any, pointer: '' });
      expect(d.channel()).toBeInstanceOf(Channel);
    });

    it('should return undefined if address is not present', function() {
      const d = new OperationReply({}, { asyncapi: {} as any, pointer: '' });
      expect(d.channel()).toBeUndefined();
    });
  });

  describe('mixins', function() {
    assertExtensions(OperationReply);
  });
});
