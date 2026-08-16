// Portfolio — struttura a tre categorie con etichetta obbligatoria (brief §6/7).
// Nessun nome di concept o cliente è inventato: dove il brief non fornisce
// il dato, la scheda resta con tbd:true e viene segnalata.

import type { Lang } from './site';

export type PortfolioCategory = 'group' | 'concept' | 'client';

export interface PortfolioItem {
  id: string;
  category: PortfolioCategory;
  name: Record<Lang, string> | null; // null = nome non fornito
  year: string | null;
  // Riga descrittiva SOLO quando tradotta fedelmente da un testo reale già
  // pubblicato dal marchio stesso (non è copy scritto da zero per VULA).
  description: Record<Lang, string> | null;
  descriptionTbd: boolean;
  imageTbd: boolean;
}

// A — Marchi del gruppo (attivi, reali). Nomi dati letteralmente dal brief.
// Descrizioni tradotte fedelmente dai siti reali dei tre marchi (non testo
// scritto da zero per VULA) — anno e immagine restano DA FORNIRE.
export const groupBrands: PortfolioItem[] = [
  {
    id: 'elite-wines',
    category: 'group',
    name: { sq: 'Elite Wines', it: 'Elite Wines', en: 'Elite Wines' },
    year: null,
    description: {
      sq: 'Importues dhe distributor verërash premium në Tiranë — hotele luksoze, fine dining, beach club, koleksionistë privatë.',
      it: 'Importatore e distributore di vini premium a Tirana — hotel di lusso, fine dining, beach club, collezionisti privati.',
      en: 'Premium wine importer and distributor in Tirana — luxury hotels, fine dining, beach clubs, private collectors.',
    },
    descriptionTbd: false,
    imageTbd: true,
  },
  {
    id: 'management-albania',
    category: 'group',
    name: { sq: 'Management Albania', it: 'Management Albania', en: 'Management Albania' },
    year: null,
    description: {
      sq: 'Përfaqësim i pavarur për blerësit e pronave në Tiranë — nuk shesim prona, i verifikojmë, me një rrjet avokatësh dhe noterësh të kontrolluar.',
      it: 'Rappresentanza indipendente per acquirenti immobiliari a Tirana — non vendiamo immobili, li verifichiamo, con una rete di avvocati e notai selezionati.',
      en: "Independent buyer representation for property in Tirana — we don't sell real estate, we vet it, backed by a network of vetted lawyers and notaries.",
    },
    descriptionTbd: false,
    imageTbd: true,
  },
  {
    id: 'zenon',
    category: 'group',
    name: { sq: "Zen'on", it: "Zen'on", en: "Zen'on" },
    year: null,
    description: {
      sq: 'Bars, energy balls dhe granola artizanale — përbërës që i njeh. Dorëzim në Tiranë.',
      it: 'Barrette, energy ball e granola artigianale — ingredienti che riconosci. Consegna a Tirana.',
      en: 'Bars, energy balls and artisanal granola — ingredients you recognize. Delivery in Tirana.',
    },
    descriptionTbd: false,
    imageTbd: true,
  },
];

// B — Concept (studiati, mai aperti). ~7 progetti.
// Nomi confermati dal committente per 5 di questi; descrizione, anno e
// immagine restano [DA FORNIRE] — il brief vieta di scrivere la riga
// descrittiva al posto del committente.
const conceptNames: (Record<Lang, string> | null)[] = [
  { sq: 'La Pasta de Casa', it: 'La Pasta de Casa', en: 'La Pasta de Casa' },
  { sq: "Rubik's Cube Burger", it: "Rubik's Cube Burger", en: "Rubik's Cube Burger" },
  { sq: 'Polariko', it: 'Polariko', en: 'Polariko' },
  { sq: 'Gyoza Lab', it: 'Gyoza Lab', en: 'Gyoza Lab' },
  { sq: 'Laza', it: 'Laza', en: 'Laza' },
  null,
  null,
];

export const conceptProjects: PortfolioItem[] = conceptNames.map((name, i) => ({
  id: `concept-${i + 1}`,
  category: 'concept' as const,
  name,
  year: null,
  description: null,
  descriptionTbd: true,
  imageTbd: true,
}));

// C — Clienti: vuota al lancio, per design (brief §6/7).
export const clients: PortfolioItem[] = [];
