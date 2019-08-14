const { expect } = require('chai');
const ExternalDocs = require('../../lib/models/external-docs');
const js = { description: 'Testing', url: 'somewhere', 'x-test': 'testing' };

describe('ExternalDocs', () => {
  describe('#ext()', () => {
    it('should support extensions', () => {
      const d = new ExternalDocs(js);
      expect(d.ext('x-test')).to.be.equal(js['x-test']);      
      expect(d.extension('x-test')).to.be.equal(js['x-test']);      
      expect(d.extensions()).to.be.deep.equal({'x-test': 'testing'});
    });
  });

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
