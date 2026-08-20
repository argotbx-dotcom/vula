// Koncept Vault — i concept sviluppati dall'agenzia.
//
// REGOLA DI ONESTÀ (piano, cap. 0.1): questi sono marchi NOSTRI, sviluppati da
// noi e disponibili in licenza. Ogni scheda porta l'etichetta "Koncept ©".
// Non sono clienti e non devono mai poter essere letti come tali.
//
// Le descrizioni sono descrizioni fattuali del concept stesso, ricavate dai
// materiali di marca prodotti per ognuno. Nessun numero, nessun cliente,
// nessuna testimonianza.

import type { Lang } from './site';

export interface Concept {
  slug: string;
  name: string;
  /** Colore di marca: la pagina del concept "vira" su questo colore. */
  tint: string;
  /** Testo leggibile sopra `tint`. */
  onTint: string;
  /** Se true il tint è chiaro e va trattato come fondo chiaro. */
  lightTint?: boolean;
  sector: Record<Lang, string>;
  tagline: Record<Lang, string>;
  /** Cinemagraph in /public/videos, se prodotto. */
  video?: string;
  /** Prima immagine = copertina della scheda e hero della pagina. */
  images: string[];
}

export const concepts: Concept[] = [
  {
    slug: 'zenon',
    name: "ZEN'ON",
    tint: '#A9C8DA',
    onTint: '#0A0A0B',
    lightTint: true,
    sector: { sq: 'Ushqim i shëndetshëm', it: 'Healthy food', en: 'Healthy food' },
    tagline: {
      sq: 'Bars, energy balls dhe granola artizanale.',
      it: 'Barrette, energy ball e granola artigianale.',
      en: 'Bars, energy balls and artisanal granola.',
    },
    video: '/videos/vault-zenon.mp4',
    images: ['01-hero.png', '03-pouches.png', '02-keto-box.png', '04-logo.png'],
  },
  {
    slug: 'pasta-de-casa',
    name: 'La Pasta de Casa',
    tint: '#C0271F',
    onTint: '#F4F1EA',
    sector: { sq: 'Pastë për të marrë me vete', it: 'Pasta da asporto', en: 'Pasta takeaway' },
    tagline: {
      sq: 'Pastë e freskët për të marrë me vete.',
      it: 'Pasta fresca da asporto.',
      en: 'Fresh pasta to take away.',
    },
    video: '/videos/vault-pasta.mp4',
    images: ['01-hero.png', '02-takeout.png', '03-packaging.png', '04-logo.png'],
  },
  {
    slug: 'rubik-cube-burger',
    name: 'Rubik Cube Burger',
    tint: '#1E6FD9',
    onTint: '#F4F1EA',
    sector: { sq: 'Burger', it: 'Burger', en: 'Burger' },
    tagline: {
      sq: 'Burger në formë kubi. Sallë në ngjyrat e kubit.',
      it: 'Burger a forma di cubo. Sala nei colori del cubo.',
      en: 'Cube-shaped burgers. A room in the colours of the cube.',
    },
    video: '/videos/vault-rubik.mp4',
    images: ['01-hero.png', '02-cubes.png', '03-interior.png', '04-logo.png'],
  },
  {
    slug: 'gyoza-lab',
    name: 'Gyoza Lab',
    tint: '#5B48C6',
    onTint: '#F4F1EA',
    sector: { sq: 'Kuzhinë japoneze', it: 'Cucina giapponese', en: 'Japanese kitchen' },
    tagline: {
      sq: 'Gyoza të punuara me dorë, shije të guximshme.',
      it: 'Gyoza fatti a mano, sapori decisi.',
      en: 'Handcrafted gyoza, bold flavours.',
    },
    video: '/videos/vault-gyoza.mp4',
    images: ['01-hero.png', '02-logo.png'],
  },
  {
    slug: 'laza',
    name: 'LAZA',
    tint: '#C9A227',
    onTint: '#0A0A0B',
    lightTint: true,
    sector: { sq: 'Lazanjeri', it: 'Lasagneria', en: 'Lasagneria' },
    tagline: {
      sq: 'Lasanje të pjekura, për të marrë me vete.',
      it: 'Lasagne al forno, da asporto.',
      en: 'Baked lasagna, to take away.',
    },
    video: '/videos/vault-laza.mp4',
    images: ['01-hero.png', '02-interior.png', '03-kiosk.png', '04-logo.png'],
  },
  {
    slug: 'marchigiano',
    name: 'Il Marchigiano',
    tint: '#8A1F2B',
    onTint: '#F4F1EA',
    sector: { sq: 'Rosticeri dhe panine', it: 'Rosticceria e panini', en: 'Rosticceria and sandwiches' },
    tagline: {
      sq: 'Panine artizanale nga Marke, në Tiranë.',
      it: 'Panini artigianali marchigiani, a Tirana.',
      en: 'Marche-style artisan sandwiches, in Tirana.',
    },
    video: '/videos/vault-marchigiano.mp4',
    images: ['01-hero.png', '02-interior.png', '04-panino.png', '03-sign.png'],
  },
  {
    slug: 'polariko',
    name: 'Polariko',
    tint: '#1D4E79',
    onTint: '#F4F1EA',
    sector: { sq: 'Ushqim i ngrirë', it: 'Surgelati', en: 'Frozen food' },
    tagline: {
      sq: 'Përzgjedhje gourmet e ngrirë.',
      it: 'Selezione gourmet surgelata.',
      en: 'A frozen gourmet selection.',
    },
    images: ['01-hero.png', '02-packaging.png'],
  },
  {
    slug: 'nderto',
    name: 'Ndërto.al',
    tint: '#E0301E',
    onTint: '#F4F1EA',
    sector: { sq: 'Platformë dixhitale', it: 'Piattaforma digitale', en: 'Digital platform' },
    tagline: {
      sq: 'Materiale ndërtimi online dhe njoftime mjeshtrash: lyerje, pllakosje, riparime.',
      it: 'Materiali edili online e annunci di professionisti: tinteggiature, piastrelle, ristrutturazioni.',
      en: 'Building materials online and a marketplace of tradespeople: painting, tiling, refurbishment.',
    },
    images: ['01-hero.png'],
  },
  {
    slug: 'lala-kids',
    name: 'LALA Kids',
    tint: '#F2B705',
    onTint: '#0A0A0B',
    lightTint: true,
    sector: { sq: 'Markë për fëmijë', it: 'Marchio per bambini', en: "Children's brand" },
    tagline: {
      sq: 'Përtej ushqimit: e njëjta metodë, sektor tjetër.',
      it: 'Oltre il food: stesso metodo, altro settore.',
      en: 'Beyond food: same method, another sector.',
    },
    images: ['01-hero.png', '02-banner.png'],
  },
];

export const conceptBySlug = (slug: string) => concepts.find((c) => c.slug === slug);

/** I sei del lancio aprono il vault; gli altri seguono. */
export const featuredConcepts = concepts.slice(0, 6);
