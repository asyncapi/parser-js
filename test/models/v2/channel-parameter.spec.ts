import { ChannelParameter } from '../../../src/models/v2/channel-parameter';
import { Schema } from '../../../src/models/v2/schema';

import { 
  assertDescriptionMixinInheritance,
  assertExtensionsMixinInheritance,
} from './mixins/inheritance';

describe('ChannelParameter model', function() {
  describe('.hasLocation()', function() {
    it('should return true when there is a value', function() {
      const doc = { location: "..." };
      const d = new ChannelParameter('parameter', doc);
      expect(d.hasLocation()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = {};
      const d = new ChannelParameter('parameter', doc);
      expect(d.hasLocation()).toEqual(false);
    });
  });

  describe('.location()', function() {
    it('should return the value', function() {
      const doc = { location: "..." };
      const d = new ChannelParameter('parameter', doc);
      expect(d.location()).toEqual(doc.location);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = {};
      const d = new ChannelParameter('parameter', doc);
      expect(d.location()).toBeUndefined();
    });
  });

  describe('.hasSchema()', function() {
    it('should return true when there is a value', function() {
      const doc = { schema: {} };
      const d = new ChannelParameter('parameter', doc);
      expect(d.hasSchema()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = {};
      const d = new ChannelParameter('parameter', doc);
      expect(d.hasSchema()).toEqual(false);
    });
  });

  describe('.schema()', function() {
    it('should return the value', function() {
      const doc = { schema: {} };
      const d = new ChannelParameter('parameter', doc);
      expect(d.schema()).toBeInstanceOf(Schema);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = {};
      const d = new ChannelParameter('parameter', doc);
      expect(d.schema()).toBeUndefined();
    });
  });

  describe('mixins inheritance', function() {
    assertDescriptionMixinInheritance(ChannelParameter);
    assertExtensionsMixinInheritance(ChannelParameter);
  });
});
