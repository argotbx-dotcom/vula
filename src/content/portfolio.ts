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
  descriptionTbd: boolean;
  imageTbd: boolean;
}

// A — Marchi del gruppo (attivi, reali). Nomi dati letteralmente dal brief.
export const groupBrands: PortfolioItem[] = [
  {
    id: 'elite-wines',
    category: 'group',
    name: { sq: 'Elite Wines', it: 'Elite Wines', en: 'Elite Wines' },
    year: null,
    descriptionTbd: true,
    imageTbd: true,
  },
  {
    id: 'management-albania',
    category: 'group',
    name: { sq: 'Management Albania', it: 'Management Albania', en: 'Management Albania' },
    year: null,
    descriptionTbd: true,
    imageTbd: true,
  },
  {
    id: 'zenon',
    category: 'group',
    name: { sq: "Zen'on", it: "Zen'on", en: "Zen'on" },
    year: null,
    descriptionTbd: true,
    imageTbd: true,
  },
];

// B — Concept (studiati, mai aperti). ~7 progetti: [DA FORNIRE] nomi, anno, cosa prodotto.
// Slot strutturali vuoti, nessun nome placeholder plausibile.
export const conceptProjects: PortfolioItem[] = Array.from({ length: 7 }, (_, i) => ({
  id: `concept-${i + 1}`,
  category: 'concept' as const,
  name: null,
  year: null,
  descriptionTbd: true,
  imageTbd: true,
}));

// C — Clienti: vuota al lancio, per design (brief §6/7).
export const clients: PortfolioItem[] = [];
