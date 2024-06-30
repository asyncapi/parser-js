import { OperationReplyAddress } from '../../../src/models/v3/operation-reply-address';

import { assertDescription, assertExtensions } from './utils';

describe('OperationReplyAddress model', function() {
  describe('.location()', function() {
    it('should return location', function() {
      const d = new OperationReplyAddress({ location: 'location' }, { asyncapi: {} as any, pointer: '' });
      expect(d.location()).toEqual('location');
    });
  });

  describe('mixins', function() {
    assertDescription(OperationReplyAddress);
    assertExtensions(OperationReplyAddress);
  });
});
