const { expect } = require('chai');
const Contact = require('../../lib/models/contact');
const js = { name: 'Fran', url: 'https://www.asyncapi.com', email: 'fmvilas@gmail.com' };

describe('Contact', () => {
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
