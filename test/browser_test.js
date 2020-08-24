const chai = require('chai');
const puppeteer = require('puppeteer');

const expect = chai.expect;
let browser;
let page;

describe('Check Parser in the browser', function() {
  before(async function() {
    //use this in case you want to troubleshoot in a real chrome window => browser = await puppeteer.launch({headless: false});
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:8080', { waitUntil: 'networkidle0' });
  });
      
  it('parsing spec as string should complete successfully', async function() {
    const specString = await page.$('#fromString');
    const content = await page.evaluate(element => element.textContent, specString);

    expect(content).to.be.equal('2.0.0');
  }).timeout(1000);

  it('parsing spec from remote should complete successfully', async function() {
    //making sure the div element is visible as this is how test script works, that it shows element only when fetching and parsing is done
    //this way we are 100% sure test will not go faster than the script in the browser
    await page.waitForSelector('#fromUrl', {
      visible: true,
    });
    const specUrl = await page.$('#fromUrl');
    const content = await page.evaluate(element => element.textContent, specUrl);

    expect(content).to.be.equal('2.0.0');
  }).timeout(5000);

  after(async function() {
    await browser.close();
  });
});

