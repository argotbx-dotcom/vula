// Screenshot veri con Chrome, non con il pannello integrato (che non dipinge).
// Uso: node tools/shot.mjs <url> <out-prefix> [selettore] [larghezze separate da virgola]
import puppeteer from '/Users/rh/debut/elitewines/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const [, , url, out, selector = '', widthsArg = '1440,390'] = process.argv;
const widths = widthsArg.split(',').map(Number);

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--force-color-profile=srgb', '--hide-scrollbars'],
});

for (const w of widths) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: w < 700 ? 844 : 900, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
  // Il preloader dura ~1,3 s e i reveal partono con lo scroll.
  await new Promise((r) => setTimeout(r, 1800));

  if (selector) {
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      const l = window.__vula?.lenis;
      if (l) l.scrollTo(el, { immediate: true, offset: -20 });
      else el.scrollIntoView();
      // I reveal usano ScrollTrigger con once:true: uno scroll immediato non
      // emette eventi, quindi si forza il ricalcolo e si sblocca il contenuto.
      window.__vula?.ScrollTrigger?.refresh();
      document.querySelectorAll('[data-reveal], [data-reveal-line] > *').forEach((n) => {
        n.style.opacity = '1';
        n.style.transform = 'none';
      });
    }, selector);
    await new Promise((r) => setTimeout(r, 900));
  }

  const target = selector ? await page.$(selector) : page;
  await target.screenshot({ path: `${out}-${w}.png` });
  console.log(`${out}-${w}.png`);
  await page.close();
}

await browser.close();
