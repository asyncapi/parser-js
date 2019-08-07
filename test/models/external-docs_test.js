const { expect } = require('chai');
const ExternalDocs = require('../../lib/models/external-docs');
const js = { description: 'Testing', url: 'somewhere' };

describe('ExternalDocs', () => {
  describe('#description()', function () {
    it('should return a string', () => {
      const d = new ExternalDocs(js);
      expect(d.description()).to.be.equal(js.description);
    });
  });
  
  describe('#url()', function () {
    it('should return a string', () => {
      const d = new ExternalDocs(js);
      expect(d.url()).to.be.equal(js.url);
    });
  });
});
