const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const parser = require('../lib');
const { checkErrorWrapper } = require('./testsUtils');

chai.use(chaiAsPromised);
const expect = chai.expect;

const validOutputJSON = '{"asyncapi":"2.0.0","info":{"title":"My API","version":"1.0.0"},"channels":{"/test/tester":{"subscribe":{"message":{"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-parsed":true,"x-parser-message-name":"<anonymous-message-1>"}}}}}';

describe('parseFromUrl()', function() {
  it('should parse YAML correctly from URL', async function() {
    const result = await parser.parseFromUrl('http://localhost:8080/asyncapi.yaml');
    expect(JSON.stringify(result.json())).to.equal(validOutputJSON);
  });

  it('should parse 2 AsyncAPI specs in Promise.all() from URL', async function() {
    const input = [
      parser.parseFromUrl('http://localhost:8080/asyncapi.yaml'), 
      parser.parseFromUrl('http://localhost:8080/asyncapi.yaml')
    ];
    const result = await Promise.all(input);
    expect(JSON.stringify(result[0].json())).to.equal(validOutputJSON);
    expect(JSON.stringify(result[1].json())).to.equal(validOutputJSON);
  });

  it('should fail when url is not absolute and not valid', async function() {
    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/fetch-url-error',
      message: 'Only absolute URLs are supported',
    };

    await checkErrorWrapper(async () => {
      await parser.parseFromUrl('invalidURL');
    }, expectedErrorObject);
    await checkErrorWrapper(async () => {
      await parser.parseFromUrl('');
    }, expectedErrorObject);
    await checkErrorWrapper(async () => {
      await parser.parseFromUrl(false);
    }, expectedErrorObject);
    await checkErrorWrapper(async () => {
      await parser.parseFromUrl(undefined);
    }, expectedErrorObject);
    await checkErrorWrapper(async () => {
      await parser.parseFromUrl(NaN);
    }, expectedErrorObject);
    await checkErrorWrapper(async () => {
      await parser.parseFromUrl(true);
    }, expectedErrorObject);
    await checkErrorWrapper(async () => {
      await parser.parseFromUrl([]);
    }, expectedErrorObject);
    await checkErrorWrapper(async () => {
      await parser.parseFromUrl(new Map());
    }, expectedErrorObject);
    await checkErrorWrapper(async () => {
      await parser.parseFromUrl(new Set());
    }, expectedErrorObject);
    await checkErrorWrapper(async () => {
      await parser.parseFromUrl(new WeakMap());
    }, expectedErrorObject);
    await checkErrorWrapper(async () => {
      await parser.parseFromUrl(new WeakSet());
    }, expectedErrorObject);
    await checkErrorWrapper(async () => {
      await parser.parseFromUrl(1);
    }, expectedErrorObject);
    await checkErrorWrapper(async () => {
      await parser.parseFromUrl(() => {});
    }, expectedErrorObject);
    await checkErrorWrapper(async () => {
      await parser.parseFromUrl('asynapi.org');
    }, expectedErrorObject);
  });
});
