// Renders share image + icons for the Bryce site using the shared puppeteer install.
import { createRequire } from 'node:module';
const require = createRequire('C:/Users/Jesse/web-screenshot-tools/');
const puppeteer = require('puppeteer');
import { pathToFileURL } from 'node:url';

const DIR = 'C:/Users/Jesse/OneDrive/Documents/CalebSite';
const b = await puppeteer.launch({ headless: 'new' });

async function shot(htmlPath, w, h, out, type='png') {
  const p = await b.newPage();
  await p.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  await p.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 1200)); // let webfonts settle
  const opts = { path: out };
  if (type === 'jpeg') { opts.type = 'jpeg'; opts.quality = 88; }
  await p.screenshot(opts);
  await p.close();
  console.log('wrote', out);
}

// Share image (Open Graph / Twitter) 1200x630
await shot(`${DIR}/client-info/share-card.html`, 1200, 630, `${DIR}/share.jpg`, 'jpeg');
// Icons
await shot(`${DIR}/client-info/icon-card.html`, 512, 512, `${DIR}/icon-512.png`);
await shot(`${DIR}/client-info/icon-card.html`, 180, 180, `${DIR}/apple-touch-icon.png`);
await shot(`${DIR}/client-info/icon-card.html`, 32, 32, `${DIR}/favicon.png`);

await b.close();
console.log('assets done');
