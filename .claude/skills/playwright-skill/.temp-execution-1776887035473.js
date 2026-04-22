const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:3000';
const ROUTES = ['/', '/about'];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  for (const route of ROUTES) {
    const url = `${TARGET_URL}${route}`;
    console.log(`\n=== ${route} ===`);
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    } catch (e) {
      console.log('  navigation error:', e.message);
      continue;
    }
    await page.waitForTimeout(1500);

    const imgs = await page.$$eval('img', (arr) =>
      arr.map((i) => ({
        src: (i.currentSrc || i.src).slice(0, 200),
        alt: i.alt,
        complete: i.complete,
        naturalWidth: i.naturalWidth,
        naturalHeight: i.naturalHeight,
      }))
    );
    console.log(JSON.stringify(imgs, null, 2));

    const ssName = `verify-${route.replace(/\//g, '_') || 'home'}.png`;
    await page.screenshot({ path: ssName, fullPage: false });
    console.log(`  screenshot: ${ssName}`);
  }

  await browser.close();
})();
