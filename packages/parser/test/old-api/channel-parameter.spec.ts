import { ChannelParameter } from '../../src/old-api/channel-parameter';
import { Schema } from '../../src/old-api/schema';
import { assertDescriptionMixin, assertExtensionsMixin } from './mixins';

import type { v2 } from '../../src/spec-types';

describe('ChannelParameter', function() {
  const json: v2.ParameterObject = { description: 'param1', location: '$message.headers#/x-param1', schema: { type: 'string' }, 'x-test': 'testing' };

  describe('location()', function() {
    it('should return a string', function() {
      const d = new ChannelParameter(json);
      expect(d.location()).toEqual(json.location);
    });
  });
   
  describe('schema()', function() {
    it('should return a Schema object', function() {
      const d = new ChannelParameter(json);
      expect(d.schema()).toBeInstanceOf(Schema);
      expect(d.schema()?.json()).toEqual(json.schema);
    });
  });

  assertDescriptionMixin(ChannelParameter);
  assertExtensionsMixin(ChannelParameter);
});