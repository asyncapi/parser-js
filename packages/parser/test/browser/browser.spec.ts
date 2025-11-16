import fs from 'fs';
import http from 'http';
import path from 'path';
import url from 'url';
import { chromium, Browser, Page, ConsoleMessage } from 'playwright';

describe('Test browser Parser in the node env', function () {
  let server: http.Server;
  let browser: Browser;
  let page: Page;

  beforeAll(async function() {
    const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
    const htmlPath = path.resolve(__dirname, 'sample-page.html');
    const parserScript = path.resolve(__dirname, '../../browser/index.js');

    console.info('start server');
    server = http.createServer((req, res) => {
      res.writeHead(200, { 'content-type': 'text/html' });
      if (req.url === '/') {
        return fs.createReadStream(htmlPath).pipe(res);
      } else if (req.url === '/parser.js') {
        return fs.createReadStream(parserScript).pipe(res);
      }
    });
    server.listen(8080);

    console.info('starting browser');
    // Use { headless: false } for debugging if needed
    browser = await chromium.launch();

    console.info('opening new page');
    page = await browser.newPage();

    page.on('console', (msg: ConsoleMessage) => {
      console.error(`Browser console [${msg.type()}]: ${msg.text()}`);
    });

    console.info('navigating to localhost');
    await page.goto('http://localhost:8080');
    await page.waitForLoadState('networkidle');
  });

  afterAll(async function() {
    await browser.close();
    await new Promise<void>((resolve, reject) => {
      server.close(err => (err ? reject(err) : resolve()));
    });
  });

  it('should parse spec in the browser', async function() {
    console.info('getting content element');
    await page.waitForSelector('#content');
    const contentDiv = await page.$('#content');
    const content = await page.evaluate(element => element && element.textContent, contentDiv);
    expect(content).toEqual('2.0.0');

    console.info('getting number of warnings');
    await page.waitForSelector('#diagnostics');
    const diagnosticsDiv = await page.$('#diagnostics');
    const diagnostics = await page.evaluate(element => element && element.textContent, diagnosticsDiv);
    expect(Number(diagnostics)).toBeGreaterThanOrEqual(0);
  }, 5000);
});