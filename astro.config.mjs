// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Dominio pubblico del sito.
 * Serve ad Astro per generare URL ASSOLUTI in canonical, hreflang, og:image e
 * sitemap: relativi non sono validi e Google ignora gli hreflang relativi.
 * Quando il dominio definitivo viene comprato, si cambia SOLO questa riga.
 */
export const SITE = 'https://vula-nga-ideja-te-hapja.netlify.app';

export default defineConfig({
  site: SITE,
  i18n: {
    defaultLocale: 'sq',
    locales: ['sq', 'it', 'en'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'sq',
        locales: { sq: 'sq-AL', it: 'it-IT', en: 'en' },
      },
    }),
  ],
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});
