// robots.txt generato, non scritto a mano: la sitemap deve puntare all'host
// da cui il sito è realmente servito. Con un indirizzo fisso, pubblicando da
// due host diversi uno dei due indicherebbe la sitemap sbagliata.
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site).href;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
