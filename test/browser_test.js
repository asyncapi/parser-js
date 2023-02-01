const chai = require('chai');
const puppeteer = require('puppeteer');

const expect = chai.expect;
let browser;
let page;

describe('Check Parser in the browser', function() {
  before(async function() {
    try {
      //use this in case you want to troubleshoot in a real chrome window => browser = await puppeteer.launch({headless: false});
      console.info('starting browser');
      browser = await puppeteer.launch();
      console.info('opening new page');
      page = await browser.newPage();
      page.on('console', msg => {
        for (let i = 0; i < msg.args().length; ++i)
          console.error(`Browser console content ${i}: ${JSON.stringify(msg.args()[i]._remoteObject, null, 2)}`);
      });
      console.info('navigating to localhost');
      await page.goto('http://localhost:8080', { waitUntil: 'networkidle0' });
    } catch (e) {
      throw new Error(e);
    }
  });
      
  it('parsing spec as string should complete successfully', async function() {
    try {
      console.info('getting fromString element');
      const specString = await page.$('#fromString');
      
      const content = await page.evaluate(element => element.textContent, specString);
      expect(content).to.be.equal('{"asyncapi":"2.4.0","info":{"title":"Account Service","version":"1.0.0","description":"This service is in charge of processing user signups"},"channels":{"user/signedup":{"subscribe":{"message":{"payload":{"type":"object","properties":{"displayName":{"type":"string","description":"Name of the user","x-parser-schema-id":"<anonymous-schema-2>"},"email":{"type":"string","format":"email","description":"Email of the user","test":{"type":"object","properties":{"testing1":{"type":"string"},"testing2":{"type":"string"}}},"x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-1>"},"x-parser-original-schema-format":"application/vnd.aai.asyncapi;version=2.4.0","x-parser-original-payload":{"type":"object","properties":{"displayName":{"type":"string","description":"Name of the user"},"email":{"type":"string","format":"email","description":"Email of the user","test":{"type":"object","properties":{"testing1":{"type":"string"},"testing2":{"type":"string"}}}}}},"schemaFormat":"application/vnd.aai.asyncapi;version=2.4.0","x-parser-message-parsed":true,"x-parser-message-name":"UserSignedUp"}}}},"components":{"messages":{"UserSignedUp":{"payload":{"type":"object","properties":{"displayName":{"type":"string","description":"Name of the user","x-parser-schema-id":"<anonymous-schema-2>"},"email":{"type":"string","format":"email","description":"Email of the user","test":{"type":"object","properties":{"testing1":{"type":"string"},"testing2":{"type":"string"}}},"x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-1>"},"x-parser-original-schema-format":"application/vnd.aai.asyncapi;version=2.4.0","x-parser-original-payload":{"type":"object","properties":{"displayName":{"type":"string","description":"Name of the user"},"email":{"type":"string","format":"email","description":"Email of the user","test":{"type":"object","properties":{"testing1":{"type":"string"},"testing2":{"type":"string"}}}}}},"schemaFormat":"application/vnd.aai.asyncapi;version=2.4.0","x-parser-message-parsed":true,"x-parser-message-name":"UserSignedUp"}}},"x-parser-spec-parsed":true}');
    } catch (e) {
      throw new Error(e);
    }
  }).timeout(5000);

  it('parsing spec from remote should complete successfully', async function() {
    try {
      //making sure the div element is visible as this is how test script works, that it shows element only when fetching and parsing is done
      //this way we are 100% sure test will not go faster than the script in the browser
      console.info('waiting for fromUrl element that shows up after spec fetch');
      await page.waitForSelector('#fromUrl', {
        visible: true,
      });
      console.info('getting fromUrl element');
      const specUrl = await page.$('#fromUrl');
      const content = await page.evaluate(element => element.textContent, specUrl);

      expect(content).to.be.equal('{"asyncapi":"2.6.0","info":{"title":"Account Service","version":"1.0.0","description":"This service is in charge of processing user signups"},"channels":{"user/signedup":{"subscribe":{"message":{"payload":{"type":"object","properties":{"displayName":{"type":"string","description":"Name of the user","x-parser-schema-id":"<anonymous-schema-2>"},"email":{"type":"string","format":"email","description":"Email of the user","test":{"type":"object","properties":{"testing1":{"type":"string"},"testing2":{"type":"string"}}},"x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-1>"},"x-parser-original-schema-format":"application/vnd.aai.asyncapi;version=2.6.0","x-parser-original-payload":{"type":"object","properties":{"displayName":{"type":"string","description":"Name of the user"},"email":{"type":"string","format":"email","description":"Email of the user","test":{"type":"object","properties":{"testing1":{"type":"string"},"testing2":{"type":"string"}}}}}},"schemaFormat":"application/vnd.aai.asyncapi;version=2.6.0","x-parser-message-parsed":true,"x-parser-message-name":"UserSignedUp"}}}},"components":{"messages":{"UserSignedUp":{"payload":{"type":"object","properties":{"displayName":{"type":"string","description":"Name of the user","x-parser-schema-id":"<anonymous-schema-2>"},"email":{"type":"string","format":"email","description":"Email of the user","test":{"type":"object","properties":{"testing1":{"type":"string"},"testing2":{"type":"string"}}},"x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-1>"},"x-parser-original-schema-format":"application/vnd.aai.asyncapi;version=2.6.0","x-parser-original-payload":{"type":"object","properties":{"displayName":{"type":"string","description":"Name of the user"},"email":{"type":"string","format":"email","description":"Email of the user","test":{"type":"object","properties":{"testing1":{"type":"string"},"testing2":{"type":"string"}}}}}},"schemaFormat":"application/vnd.aai.asyncapi;version=2.6.0","x-parser-message-parsed":true,"x-parser-message-name":"UserSignedUp"}}},"x-parser-spec-parsed":true}');
    } catch (e) {
      throw new Error(e);
    }
  }).timeout(5000);

  after(async function() {
    try {
      await browser.close();
    } catch (e) {
      throw new Error(e);
    }
  });
});
