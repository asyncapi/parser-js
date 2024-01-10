import fs from 'fs';
import http from 'http';
import path from 'path';
import url from 'url';
import puppeteer from 'puppeteer';

describe('Test browser Parser in the node env', function() {
  let server: http.Server;
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;

  beforeAll(async function() {
    const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
    const htmlPath = path.resolve(__dirname, 'sample-page.html');
    const parserScript = path.resolve(__dirname, '../../browser_new/index.js');

    console.info('start server');
    server = http.createServer((req, res) => {
      if (req.url === '/') {
        res.writeHead(200, { 'content-type': 'text/html' });
        return fs.createReadStream(htmlPath).pipe(res);
      } else if (req.url === '/parser.js') {
        res.writeHead(200, { 'content-type': 'text/html' });
        return fs.createReadStream(parserScript).pipe(res);
      } else if (req.url === '/asyncapi.json') {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.write(JSON.stringify({ asyncapi: '2.0.0', info: { title: 'My API', version: '1.0.0' }, channels: { '/test/tester': { subscribe: { operationId: 'subscribeOperation', message: { } } } } }));
        res.end();
      }
    });
    server.listen(8080);

    //use this in case you want to troubleshoot in a real chrome window => browser = await puppeteer.launch({headless: false});
    console.info('starting browser');
    browser = await puppeteer.launch();

    console.info('opening new page');
    page = await browser.newPage();

    page.on('console', msg => {
      msg.args().forEach((arg, index) => {
        console.error(`Browser console content ${index}: ${JSON.stringify(arg.remoteObject().value, null, 2)}`);
      });
    });

    console.info('navigating to localhost');
    await page.goto('http://localhost:8080', { waitUntil: 'networkidle0' });
  }, 5000);

  afterAll(async function() {
    await browser.close();
    server.close();
  });

  it('should parse spec in the browser', async function() {
    console.info('getting content element');
    const contentDiv = await page.$('#content');
    const content = await page.evaluate(element => element && element.textContent, contentDiv);
    expect(content).toEqual('2.0.0');

    console.info('getting number of warnings');
    const diagnosticsDiv = await page.$('#diagnostics');
    const diagnostics = await page.evaluate(element => element && element.textContent, diagnosticsDiv);
    expect(Number(diagnostics)).toBeGreaterThanOrEqual(0);
  }, 5000);
});
