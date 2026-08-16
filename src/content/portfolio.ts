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

// B — Concept (studiati, mai aperti). Nomi confermati dal committente.
// Il brief ne stima ~7 in totale; qui si pubblicano solo le schede con un
// nome reale confermato — niente schede vuote in attesa di dati.
const conceptEntries: { name: Record<Lang, string>; description: Record<Lang, string> | null }[] = [
  { name: { sq: 'La Pasta de Casa', it: 'La Pasta de Casa', en: 'La Pasta de Casa' }, description: null },
  { name: { sq: "Rubik's Cube Burger", it: "Rubik's Cube Burger", en: "Rubik's Cube Burger" }, description: null },
  { name: { sq: 'Polariko', it: 'Polariko', en: 'Polariko' }, description: null },
  { name: { sq: 'Gyoza Lab', it: 'Gyoza Lab', en: 'Gyoza Lab' }, description: null },
  { name: { sq: 'Laza', it: 'Laza', en: 'Laza' }, description: null },
  {
    name: { sq: 'Ndërto.al', it: 'Ndërto.al', en: 'Ndërto.al' },
    description: {
      sq: 'Platformë e-commerce për materiale ndërtimi dhe njoftime profesionistësh — gjej mjeshtrin e duhur për punë si lyerja e shtëpisë apo vendosja e pllakave.',
      it: 'Piattaforma e-commerce per materiali edili e annunci di professionisti — trova il maestro giusto per lavori come tinteggiare casa o posare piastrelle.',
      en: 'E-commerce platform for building materials and professional listings — find the right tradesperson for jobs like painting a house or laying tiles.',
    },
  },
];

export const conceptProjects: PortfolioItem[] = conceptEntries.map((entry, i) => ({
  id: `concept-${i + 1}`,
  category: 'concept' as const,
  name: entry.name,
  year: null,
  description: entry.description,
  descriptionTbd: entry.description === null,
  imageTbd: true,
}));

// C — Clienti: vuota al lancio, per design (brief §6/7).
export const clients: PortfolioItem[] = [];
