const { expect } = require('chai');
const ChannelParameter = require('../../lib/models/channel-parameter');
const js = { description: 'param1', location: '$message.headers#/x-param1', schema: { type: 'string' }, 'x-test': 'testing' };

describe('ChannelParameter', function() {
  describe('#ext()', function() {
    it('should support extensions', function() {
      const d = new ChannelParameter(js);
      expect(d.ext('x-test')).to.be.equal(js['x-test']);      
      expect(d.extension('x-test')).to.be.equal(js['x-test']);      
      expect(d.extensions()).to.be.deep.equal({'x-test': 'testing'});
    });
  });

  describe('#description()', function() {
    it('should return a string', function() {
      const d = new ChannelParameter(js);
      expect(d.description()).to.be.equal(js.description);
    });
  });

  describe('#location()', function() {
    it('should return a string', function() {
      const d = new ChannelParameter(js);
      expect(d.location()).to.be.equal(js.location);
    });
  });
   
  describe('#schema()', function() {
    it('should return a Schema object', function() {
      const d = new ChannelParameter(js);
      expect(d.schema().constructor.name).to.be.equal('Schema');
      expect(d.schema().json()).to.equal(js.schema);
    });
  });
});
