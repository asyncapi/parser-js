const { expect } = require('chai');
const Base = require('../../lib/models/base');

describe('Base', () => {
  describe('#json()', () => {
    it('should return the whole JSON object', () => {
      const doc = { 'test': 'testing' };
      const d = new Base(doc);
      expect(d.json()).to.be.deep.equal(doc);
    });
    
    it('should return the value of a given key', () => {
      const doc = { 'test': 'testing' };
      const d = new Base(doc);
      expect(d.json('test')).to.be.equal(doc.test);
    });
    
    it('should return the value of a given key, even when this is falsy', () => {
      const doc = { 0: 'testing' };
      const d = new Base(doc);
      expect(d.json(0)).to.be.equal(doc[0]);
    });
  });
});
