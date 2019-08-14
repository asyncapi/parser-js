const { expect } = require('chai');
const Contact = require('../../lib/models/contact');
const js = { name: 'Fran', url: 'https://www.asyncapi.com', email: 'fmvilas@gmail.com', 'x-test': 'testing' };

describe('Contact', () => {
  describe('#ext()', () => {
    it('should support extensions', () => {
      const d = new Contact(js);
      expect(d.ext('x-test')).to.be.equal(js['x-test']);      
      expect(d.extension('x-test')).to.be.equal(js['x-test']);      
      expect(d.extensions()).to.be.deep.equal({'x-test': 'testing'});
    });
  });

  describe('#name()', function () {
    it('should return a string', () => {
      const d = new Contact(js);
      expect(d.name()).to.be.equal(js.name);
    });
  });
  
  describe('#url()', function () {
    it('should return a string', () => {
      const d = new Contact(js);
      expect(d.url()).to.be.equal(js.url);
    });
  });
  
  describe('#email()', function () {
    it('should return a string', () => {
      const d = new Contact(js);
      expect(d.email()).to.be.equal(js.email);
    });
  });
});
