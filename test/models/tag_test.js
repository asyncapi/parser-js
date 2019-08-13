const { expect } = require('chai');
const Tag = require('../../lib/models/tag');
const js = { name: 'test', description: 'Testing', externalDocs: { url: 'somewhere' }, 'x-test': 'testing' };

describe('Tag', () => {
  describe('#ext()', () => {
    it('should support extensions', () => {
      const d = new Tag(js);
      expect(d.ext('x-test')).to.be.equal(js['x-test']);      
      expect(d.extension('x-test')).to.be.equal(js['x-test']);      
      expect(d.extensions()).to.be.deep.equal({'x-test': 'testing'});
    });
  });

  describe('#name()', function () {
    it('should return a string', () => {
      const d = new Tag(js);
      expect(d.name()).to.be.equal(js.name);
    });
  });
  
  describe('#description()', function () {
    it('should return a string', () => {
      const d = new Tag(js);
      expect(d.description()).to.be.equal(js.description);
    });
  });
  
  describe('#externalDocs()', function () {
    it('should return a string', () => {
      const d = new Tag(js);
      expect(d.externalDocs().constructor.name).to.be.equal('ExternalDocs');
      expect(d.externalDocs().json()).to.be.equal(js.externalDocs);
    });
  });
});
