const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { getBaseUrl } = require('../lib/utils');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('getBaseUrl()', function () {
  it('should accept totally valid absolute URL of an AsyncAPI document', async function () {
    await expect(
      getBaseUrl('https://asyncapi.com/good/asyncapi.yaml')
    ).to.equal('https://asyncapi.com/good/');
  });
});
