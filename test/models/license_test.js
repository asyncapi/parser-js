const { expect } = require('chai');
const License = require('../../lib/models/license');
const js = { name: 'Apache 2.0', url: 'https://www.apache.org/licenses/LICENSE-2.0' };

describe('License', () => {
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
