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
      expect(content).to.be.equal('2.0.0');
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

      expect(content).to.be.equal('2.0.0');
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
