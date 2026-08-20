// Koncept Vault — il lavoro di VULA, diviso per quello che è davvero.
//
// REGOLA DI ONESTÀ VINCOLANTE (piano cap. 0.1, brief §6):
// un visitatore non deve mai poter confondere un concept mai aperto con
// un'attività che esiste. Per questo ogni scheda dichiara la propria natura
// con un'etichetta sempre visibile, e le due categorie non si mescolano:
//
//   client  — progetti sviluppati per clienti: attività di altri, reali.
//             Sotto ognuno diciamo esattamente cosa abbiamo fatto noi.
//   concept — sviluppati da noi, mai aperti, disponibili in licenza.
//
// Nessun cliente inventato, nessuna testimonianza, nessun numero non verificato.

import type { Lang } from './site';

export type ConceptKind = 'client' | 'concept';

export interface Concept {
  slug: string;
  name: string;
  kind: ConceptKind;
  /** Colore di marca: la pagina del concept "vira" su questo colore. */
  tint: string;
  /** Testo leggibile sopra `tint`. */
  onTint: string;
  sector: Record<Lang, string>;
  tagline: Record<Lang, string>;
  /** Solo per `client`: cosa abbiamo fatto noi, dichiarato senza ambiguità. */
  scope?: Record<Lang, string>;
  /** Progetto ancora in corso: si dichiara, non si lascia intendere finito. */
  wip?: boolean;
  /** Sito pubblico, quando esiste. Il link cliccabile è la prova più forte. */
  url?: string;
  /** Cinemagraph in /public/videos, se prodotto. */
  video?: string;
  /** Prima immagine = copertina della scheda e hero della pagina. */
  images: string[];
}

export const concepts: Concept[] = [
  /* ------------------------------------------------------------- clienti */
  {
    slug: 'elite-wines',
    name: 'Elite Wines',
    kind: 'client',
    tint: '#2C6049',
    onTint: '#F4F1EA',
    sector: {
      sq: 'Shpërndarje verërash premium',
      it: 'Distribuzione vini premium',
      en: 'Premium wine distribution',
    },
    tagline: {
      sq: 'Importues dhe distributor verërash premium në Tiranë.',
      it: 'Importatore e distributore di vini premium a Tirana.',
      en: 'Premium wine importer and distributor in Tirana.',
    },
    scope: {
      sq: 'Strategji, pozicionim, identitet dhe ekosistem dixhital B2B/B2C: shop, klub, dhurata, storytelling i prodhuesve, kartë dixhitale dhe porosi online.',
      it: 'Strategia, posizionamento, identità ed ecosistema digitale B2B/B2C: shop, club, regali, storytelling dei produttori, carta digitale e ordini online.',
      en: 'Strategy, positioning, identity and a B2B/B2C digital ecosystem: shop, club, gifting, producer storytelling, digital list and online ordering.',
    },
    url: 'https://elitewinesal.netlify.app/sq/',
    images: ['01-hero.webp', '02-club.webp', '03-shop.webp', '04-set.webp'],
  },

  {
    slug: 'management-albania',
    name: 'Management Albania',
    kind: 'client',
    tint: '#8A7B4F',
    onTint: '#0A0A0B',
    sector: {
      sq: 'Përfaqësim i pavarur blerësish',
      it: 'Rappresentanza acquirenti',
      en: 'Independent buyer representation',
    },
    tagline: {
      sq: 'Nuk shesim prona. I verifikojmë.',
      it: 'Non vendiamo immobili. Li verifichiamo.',
      en: "We don't sell property. We vet it.",
    },
    scope: {
      sq: 'Pozicionim, model shërbimi, strukturë komerciale, identitet dhe ekosistem dixhital trigjuhësh.',
      it: 'Posizionamento, modello di servizio, struttura commerciale, identità ed ecosistema digitale trilingue.',
      en: 'Positioning, service model, commercial structure, identity and a trilingual digital ecosystem.',
    },
    url: 'https://managmentalbania.netlify.app/de/',
    images: ['01-hero.webp', '02-notary.webp'],
  },
  {
    slug: 'zenon',
    name: "ZEN'ON",
    kind: 'client',
    tint: '#A9C8DA',
    onTint: '#0A0A0B',
    sector: { sq: 'Ushqim i shëndetshëm', it: 'Healthy food', en: 'Healthy food' },
    tagline: {
      sq: 'Bars, energy balls dhe granola artizanale.',
      it: 'Barrette, energy ball e granola artigianale.',
      en: 'Bars, energy balls and artisanal granola.',
    },
    scope: {
      sq: 'Identitet, paketim, drejtim produkti, koncept B2B/B2C dhe platformë dixhitale me porosi online.',
      it: 'Identità, packaging, direzione prodotto, concept B2B/B2C e piattaforma digitale con ordini online.',
      en: 'Identity, packaging, product direction, B2B/B2C concept and a digital platform with online ordering.',
    },
    wip: true,
    video: '/videos/vault-zenon.mp4',
    images: ['01-hero.png', '03-pouches.png', '02-keto-box.png', '04-logo.png'],
  },

  /* ------------------------------------------------------------- concept */
  {
    slug: 'pasta-de-casa',
    name: 'La Pasta de Casa',
    kind: 'concept',
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
    kind: 'concept',
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
    kind: 'concept',
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
    kind: 'concept',
    tint: '#C9A227',
    onTint: '#0A0A0B',
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
    kind: 'concept',
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
    kind: 'concept',
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
    kind: 'concept',
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
    kind: 'client',
    tint: '#F2B705',
    onTint: '#0A0A0B',
    sector: { sq: 'Markë për fëmijë', it: 'Marchio per bambini', en: "Children's brand" },
    tagline: {
      sq: 'Markë dhe personazhe për përmbajtje fëmijësh.',
      it: 'Marchio e personaggi per contenuti per bambini.',
      en: "Brand and characters for children's content.",
    },
    scope: {
      sq: 'Identitet, personazhe dhe key visual.',
      it: 'Identità, personaggi e key visual.',
      en: 'Identity, characters and key visuals.',
    },
    images: ['01-hero.png', '02-banner.png'],
  },
];

export const conceptBySlug = (slug: string) => concepts.find((c) => c.slug === slug);

export const byKind = (kind: ConceptKind) => concepts.filter((c) => c.kind === kind);

export const clients = byKind('client');
export const conceptProjects = byKind('concept');
