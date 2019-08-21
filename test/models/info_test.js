const { expect } = require('chai');
const Info = require('../../lib/models/info');
const js = { title: 'Test', version: '1.2.3', license: { name: 'Apache 2.0', url: 'https://www.apache.org/licenses/LICENSE-2.0' }, contact: { name: 'Fran', url: 'https://www.asyncapi.com', email: 'fmvilas@gmail.com' }, 'x-test': 'testing' };

describe('Info', () => {
  describe('#ext()', () => {
    it('should support extensions', () => {
      const d = new Info(js);
      expect(d.ext('x-test')).to.be.equal(js['x-test']);      
      expect(d.extension('x-test')).to.be.equal(js['x-test']);      
      expect(d.extensions()).to.be.deep.equal({'x-test': 'testing'});
    });
  });

  describe('#title()', function () {
    it('should return a string', () => {
      const d = new Info(js);
      expect(d.title()).to.be.equal(js.title);
    });
  });
  
  describe('#version()', function () {
    it('should return a string', () => {
      const d = new Info(js);
      expect(d.version()).to.be.equal(js.version);
    });
  });
  
  describe('#description()', function () {
    it('should return a string', () => {
      const d = new Info(js);
      expect(d.description()).to.be.equal(js.description);
    });
  });
  
  describe('#termsOfService()', function () {
    it('should return a string', () => {
      const d = new Info(js);
      expect(d.termsOfService()).to.be.equal(js.termsOfService);
    });
  });
  
  describe('#license()', function () {
    it('should return a license object', () => {
      const d = new Info(js);
      expect(d.license().constructor.name).to.be.equal('License');
      expect(d.license().json()).to.be.equal(js.license);
    });
    
    it('should return null if a license object is not given', () => {
      const d = new Info({});
      expect(d.license()).to.be.equal(null);
    });
  });
  
  describe('#contact()', function () {
    it('should return a license object', () => {
      const d = new Info(js);
      expect(d.contact().constructor.name).to.be.equal('Contact');
      expect(d.contact().json()).to.be.equal(js.contact);
    });


    it('should return null if a contact object is not given', () => {
      const d = new Info({});
      expect(d.contact()).to.be.equal(null);
    });
  });
});
