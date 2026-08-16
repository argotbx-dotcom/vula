// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // [DA FORNIRE] dominio definitivo: valorizzare "site" quando è noto
  // (serve per sitemap/canonical/OG assoluti). Per ora si usa l'URL Netlify.
  i18n: {
    defaultLocale: 'sq',
    locales: ['sq', 'it', 'en'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});
