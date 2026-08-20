// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Dominio pubblico del sito.
 *
 * Serve ad Astro per generare URL ASSOLUTI in canonical, hreflang, og:image e
 * sitemap: quelli relativi non sono validi e Google ignora gli hreflang
 * relativi. Ma il dominio non può restare scritto a mano, perché lo stesso
 * repository viene pubblicato da più host: un canonical che punta all'host
 * sbagliato è peggio di nessun canonical, perché dice a Google che la copia
 * buona sta altrove e divide il punteggio fra due domini.
 *
 * Ordine di precedenza:
 *   1. SITE_URL      — da impostare quando arriva il dominio definitivo
 *   2. CF_PAGES_URL  — lo passa Cloudflare Pages a ogni build
 *   3. il fallback   — l'indirizzo Cloudflare Pages stabile
 *
 * Il vecchio fallback era il dominio Netlify: quel progetto è spento, e un
 * canonical che punta lì direbbe a Google che la copia buona sta altrove.
 */
export const SITE =
  process.env.SITE_URL ||
  process.env.CF_PAGES_URL ||
  'https://vula-studio.pages.dev';

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
      // La radice è solo lo stub di reindirizzamento verso /sq/: porta
      // `noindex`, quindi in sitemap sarebbe una contraddizione. Peggio: viene
      // contata come alternate `sq-AL` insieme a /sq/, e due URL diversi per
      // lo stesso hreflang fanno scartare a Google l'intero gruppo.
      filter: (page) => page !== `${SITE}/`,
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
