const { expect } = require('chai');
const License = require('../../lib/models/license');
const js = { name: 'Apache 2.0', url: 'https://www.apache.org/licenses/LICENSE-2.0', 'x-test': 'testing' };

describe('License', () => {
  describe('#ext()', () => {
    it('should support extensions', () => {
      const d = new License(js);
      expect(d.ext('x-test')).to.be.equal(js['x-test']);      
      expect(d.extension('x-test')).to.be.equal(js['x-test']);      
      expect(d.extensions()).to.be.deep.equal({'x-test': 'testing'});
    });
  });

  describe('#name()', function () {
    it('should return a string', () => {
      const d = new License(js);
      expect(d.name()).to.be.equal(js.name);
    });
  });
  
  describe('#url()', function () {
    it('should return a string', () => {
      const d = new License(js);
      expect(d.url()).to.be.equal(js.url);
    });
  });
});
