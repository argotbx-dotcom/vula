// VULA — contenuti del sito.
//
// Fonte della copy: "IL SITO — Piano strategico e ordini di produzione" (cap. 6)
// e "L'ORCHESTRATORE — Concept strategico e roadmap" (cap. 2, 3, 5, 6).
// Le frasi SQ/EN del capitolo 6 sono riportate letteralmente. L'italiano e le
// frasi albanesi non presenti nei documenti sono traduzioni fedeli del testo
// italiano dei documenti stessi.
//
// ORDINE APERTO DAL PIANO (cap. 6): "Le frasi albanesi vanno riviste da un
// madrelingua prima del lancio — ordine esplicito, non opzionale."

export type Lang = 'sq' | 'it' | 'en';
export const LANGS: Lang[] = ['sq', 'it', 'en'];
export const DEFAULT_LANG: Lang = 'sq';

/** Nome dell'azienda, per titoli, meta e firma. */
export const siteName = 'VULA Studio';
/** Marchio breve: il lockup grafico e il marquee restano "VULA". */
export const siteMark = 'VULA';

export const langLabel: Record<Lang, string> = {
  sq: 'Shqip',
  it: 'Italiano',
  en: 'English',
};

/* ------------------------------------------------------------------ rotte */

export const routes = {
  home: { sq: '', it: '', en: '' },
  contact: { sq: 'kontakt', it: 'contatto', en: 'contact' },
  concepts: { sq: 'koncepte', it: 'concept', en: 'concepts' },
} as const;

export type RouteKey = keyof typeof routes;

export function path(lang: Lang, page: RouteKey = 'home'): string {
  const slug = routes[page][lang];
  return slug ? `/${lang}/${slug}/` : `/${lang}/`;
}

export function conceptPath(lang: Lang, slug: string): string {
  return `/${lang}/${routes.concepts[lang]}/${slug}/`;
}

/* --------------------------------------------------------------- sezioni  */
// Ancore della one-page narrativa (cap. 3 del piano).

export const sectionIds = {
  manifesto: 'manifesto',
  problem: 'problemi',
  method: 'metodi',
  vault: 'vault',
  numbers: 'numrat',
  model: 'si-punojme',
  cta: 'kontakt',
} as const;

export const nav: Record<Lang, { label: string; href: string }[]> = {
  sq: [
    { label: 'Metoda', href: `#${sectionIds.method}` },
    { label: 'Puna', href: `#${sectionIds.vault}` },
    { label: 'Si punojmë', href: `#${sectionIds.model}` },
  ],
  it: [
    { label: 'Metodo', href: `#${sectionIds.method}` },
    { label: 'Lavori', href: `#${sectionIds.vault}` },
    { label: 'Come lavoriamo', href: `#${sectionIds.model}` },
  ],
  en: [
    { label: 'Method', href: `#${sectionIds.method}` },
    { label: 'Work', href: `#${sectionIds.vault}` },
    { label: 'How we work', href: `#${sectionIds.model}` },
  ],
};

/* ------------------------------------------------------------------- hero */
// Cap. 6 del piano, riga "Hero" — SQ ed EN letterali.

export const hero: Record<Lang, { line1: string; line2: string }> = {
  sq: { line1: 'Ti ke kapitalin.', line2: 'Ne kemi konceptin.' },
  it: { line1: 'Hai il capitale.', line2: 'Noi abbiamo il concept.' },
  en: { line1: 'You have the capital.', line2: 'We have the concept.' },
};

export const heroKicker: Record<Lang, string> = {
  sq: 'Nga ideja te hapja · Tiranë',
  it: "Dall'idea all'apertura · Tirana",
  en: 'From idea to opening · Tirana',
};

/* -------------------------------------------------------------- manifesto */
// Cap. 6 del piano, riga "Manifesto" — SQ ed EN letterali, spezzati in
// frammenti per l'accensione parola-per-parola in scroll.

export const manifesto: Record<Lang, string[]> = {
  sq: [
    'Nga ideja në çelje —',
    'një derë e vetme.',
    'Ne studiojmë tregun,',
    'krijojmë konceptin,',
    'ndërtojmë lokalin,',
    'hapim biznesin tënd.',
  ],
  it: [
    "Dall'idea all'apertura —",
    'una sola porta.',
    'Studiamo il mercato,',
    'creiamo il concept,',
    'costruiamo il locale,',
    'apriamo la tua attività.',
  ],
  en: [
    'From idea to opening night —',
    'one door.',
    'We study the market,',
    'create the concept,',
    'build the space,',
    'open your business.',
  ],
};

/* --------------------------------------------------------------- problema */
// Cap. 6: "8 telefonata për të hapur një lokal. Ose një."
// Le otto etichette sono quelle elencate al cap. 3 del piano.

export const problem: Record<
  Lang,
  { kicker: string; claim: string; resolve: string; labels: string[] }
> = {
  sq: {
    kicker: 'Problemi',
    claim: '8 telefonata për të hapur një lokal.',
    resolve: 'Ose një.',
    labels: ['branding', 'menu', 'koncept', 'arkitekt', 'kontabilist', 'ndërtim', 'web', 'marketing'],
  },
  it: {
    kicker: 'Il problema',
    claim: '8 telefonate per aprire un locale.',
    resolve: 'Oppure una.',
    labels: ['branding', 'menu', 'concept', 'architetto', 'commercialista', 'cantiere', 'web', 'marketing'],
  },
  en: {
    kicker: 'The problem',
    claim: '8 phone calls to open a place.',
    resolve: 'Or one.',
    labels: ['branding', 'menu', 'concept', 'architect', 'accountant', 'construction', 'web', 'marketing'],
  },
};

/* ----------------------------------------------------------------- metodo */
// Le sei fasi: nomi dal cap. 2 del piano, contenuti e output dal cap. 5.2
// del concept strategico. I nomi albanesi sono traduzione dei nomi italiani.

export interface Phase {
  num: string;
  name: string;
  line: string;
  output: string;
}

export const methodTitle: Record<Lang, { kicker: string; title: string }> = {
  sq: { kicker: 'Metoda', title: 'Gjashtë faza, një regji.' },
  it: { kicker: 'Il metodo', title: 'Sei fasi, una sola regia.' },
  en: { kicker: 'The method', title: 'Six phases, one director.' },
};

export const phases: Record<Lang, Phase[]> = {
  sq: [
    {
      num: '01',
      name: 'ZBULO',
      line: 'Analizë e kapitalit, e pronës dhe e zonës: kalimi i njerëzve, konkurrenca, qiratë, demografia, sezonaliteti.',
      output: 'Studim fizibiliteti me skenarë të krahasuar dhe një rekomandim të argumentuar.',
    },
    {
      num: '02',
      name: 'PËRCAKTO',
      line: 'Zgjedhja e konceptit: pozicionimi, klienti tip, oferta, çmimet, dimensionimi i investimit.',
      output: 'Concept book dhe një plan biznesi i bankueshëm.',
    },
    {
      num: '03',
      name: 'PROJEKTO',
      line: 'Identiteti i markës dhe projekti i lokalit lindin bashkë, jo nga furnitorë të ndarë.',
      output: 'Brand book dhe projekt arkitektonik zbatimi.',
    },
    {
      num: '04',
      name: 'NDËRTO',
      line: 'Drejtim i kantierit si përfaqësues të pronarit: tenderë, kontrata, afate, kosto, cilësi.',
      output: 'Lokal i përfunduar, brenda buxhetit dhe afatit; biznes i regjistruar dhe në rregull.',
    },
    {
      num: '05',
      name: 'HAP',
      line: 'Faqe, Google, rrjete sociale, foto dhe video, eventi i hapjes, trajnimi i stafit.',
      output: 'Hapje me klientë që nga dita e parë, jo një lokal bosh që shpreson.',
    },
    {
      num: '06',
      name: 'SHOQËRO',
      line: 'Marketing i vazhdueshëm dhe rishikim mujor i numrave në 12 muajt e parë.',
      output: 'Një drejtor i jashtëm me abonim mujor.',
    },
  ],
  it: [
    {
      num: '01',
      name: 'SCOPRI',
      line: "Analisi del capitale, dell'immobile e della zona: passaggio, concorrenza, affitti, demografia, stagionalità.",
      output: 'Studio di fattibilità con scenari a confronto e una raccomandazione motivata.',
    },
    {
      num: '02',
      name: 'DEFINISCI',
      line: 'Scelta del concept: posizionamento, cliente tipo, offerta, prezzi, dimensionamento investimento.',
      output: 'Concept book e un business plan bancabile.',
    },
    {
      num: '03',
      name: 'DISEGNA',
      line: 'Identità di marca e progetto del locale nascono insieme, non da fornitori separati.',
      output: 'Brand book e progetto architettonico esecutivo.',
    },
    {
      num: '04',
      name: 'COSTRUISCI',
      line: 'Direzione del cantiere come rappresentanti del proprietario: gare, contratti, tempi, costi, qualità.',
      output: 'Locale finito, a budget e nei tempi; azienda registrata e in regola.',
    },
    {
      num: '05',
      name: 'LANCIA',
      line: 'Sito, Google, social, foto e video, evento di apertura, formazione del personale.',
      output: 'Apertura con clienti dal giorno uno, non un locale vuoto che spera.',
    },
    {
      num: '06',
      name: 'ACCOMPAGNA',
      line: 'Marketing continuativo e revisione mensile dei numeri nei primi 12 mesi.',
      output: 'Un direttore esterno in abbonamento mensile.',
    },
  ],
  en: [
    {
      num: '01',
      name: 'DISCOVER',
      line: 'Analysis of the capital, the property and the area: footfall, competition, rents, demographics, seasonality.',
      output: 'A feasibility study with scenarios compared and a reasoned recommendation.',
    },
    {
      num: '02',
      name: 'DEFINE',
      line: 'Choosing the concept: positioning, target customer, offer, pricing, sizing the investment.',
      output: 'A concept book and a bankable business plan.',
    },
    {
      num: '03',
      name: 'DESIGN',
      line: 'Brand identity and the space are designed together, not by separate suppliers.',
      output: 'A brand book and construction-ready architectural drawings.',
    },
    {
      num: '04',
      name: 'BUILD',
      line: "Running the site as the owner's representative: tenders, contracts, schedule, cost, quality.",
      output: 'A finished space, on budget and on time; a registered, compliant company.',
    },
    {
      num: '05',
      name: 'OPEN',
      line: 'Website, Google, social, photo and video, opening event, staff training.',
      output: 'An opening with customers from day one, not an empty room that hopes.',
    },
    {
      num: '06',
      name: 'STAY',
      line: 'Ongoing marketing and a monthly review of the numbers through the first 12 months.',
      output: 'An outside director on a monthly retainer.',
    },
  ],
};

/* ------------------------------------------------------------------ vault */
// Cap. 6 del piano — SQ ed EN letterali.

export const vault: Record<Lang, { kicker: string; title: string; note: string }> = {
  sq: {
    kicker: 'Puna jonë',
    title: 'Çfarë kemi ndërtuar deri sot.',
    note: 'Dy gjëra të ndryshme, të ndara qartë: projektet që kemi zhvilluar për klientë, dhe konceptet tona që presin dikë që i hap.',
  },
  it: {
    kicker: 'Il nostro lavoro',
    title: 'Cosa abbiamo costruito finora.',
    note: 'Due cose diverse, tenute separate: i progetti sviluppati per clienti e i nostri concept, che aspettano qualcuno che li apra.',
  },
  en: {
    kicker: 'Our work',
    title: 'What we have built so far.',
    note: 'Two different things, kept apart: projects we developed for clients, and our own concepts, waiting for someone to open them.',
  },
};

/** Etichetta sempre visibile su ogni scheda: dichiara cosa è, non cosa sembra. */
export const kindLabels: Record<Lang, { client: string; concept: string }> = {
  sq: { client: 'Klient', concept: 'Koncept ©' },
  it: { client: 'Cliente', concept: 'Concept ©' },
  en: { client: 'Client', concept: 'Concept ©' },
};

export const vaultGroups: Record<Lang, Record<'client' | 'concept', { title: string; note: string }>> = {
  sq: {
    client: {
      title: 'Projekte për klientë',
      note: 'Aktivitete reale, të zhvilluara nga ne për klientët tanë. Poshtë secilës shkruajmë saktësisht se çfarë kemi bërë.',
    },
    concept: {
      title: 'Konceptet tona',
      note: 'Të studiuara dhe të projektuara nga ne, ende të pahapura. Të disponueshme në licencë.',
    },
  },
  it: {
    client: {
      title: 'Progetti per clienti',
      note: 'Attività reali, sviluppate da noi per i nostri clienti. Sotto ciascuna diciamo esattamente cosa abbiamo fatto.',
    },
    concept: {
      title: 'I nostri concept',
      note: 'Studiati e progettati da noi, non ancora aperti. Disponibili in licenza.',
    },
  },
  en: {
    client: {
      title: 'Client projects',
      note: 'Real businesses, developed by us for our clients. Under each one we state exactly what we did.',
    },
    concept: {
      title: 'Our concepts',
      note: 'Studied and designed by us, not yet opened. Available for licensing.',
    },
  },
};

/** Riga che accompagna lo scope di lavoro su una scheda cliente. */
export const scopeLabel: Record<Lang, string> = {
  sq: 'Çfarë kemi bërë',
  it: 'Cosa abbiamo fatto',
  en: 'What we did',
};

export const visitLabel: Record<Lang, string> = {
  sq: 'Vizito faqen',
  it: 'Vai al sito',
  en: 'Visit the site',
};

export const licenceLine: Record<Lang, string> = {
  sq: 'Ky koncept është i disponueshëm në licencë.',
  it: 'Questo concept è disponibile in licenza.',
  en: 'This concept is available for licensing.',
};

/* ---------------------------------------------------------------- i numeri */
// Cap. 3 del piano + appendice fonti del concept strategico.

export interface StatItem {
  value: number;
  display: string;
  suffix?: string;
  decimals?: number;
  label: Record<Lang, string>;
  source: string;
  accent?: boolean;
}

export const numbersTitle: Record<Lang, { kicker: string; title: string }> = {
  sq: { kicker: 'Shqipëria, sot', title: 'Pse tani.' },
  it: { kicker: 'Albania, oggi', title: 'Perché adesso.' },
  en: { kicker: 'Albania, today', title: 'Why now.' },
};

export const stats: StatItem[] = [
  {
    value: 15348,
    display: '15.348',
    label: {
      sq: 'bar-kafe aktive — një çdo 154 banorë',
      it: 'bar-caffè attivi — uno ogni 154 abitanti',
      en: 'active cafés — one for every 154 people',
    },
    source: 'Drejtoria e Përgjithshme e Tatimeve · INSTAT',
  },
  {
    value: 12.4,
    display: '12,4',
    decimals: 1,
    suffix: ' mln',
    label: {
      sq: 'turistë të huaj në 2025',
      it: 'turisti stranieri nel 2025',
      en: 'foreign visitors in 2025',
    },
    source: 'INSTAT',
  },
  {
    value: 1.05,
    display: '1,05',
    decimals: 2,
    suffix: ' mld €',
    label: {
      sq: 'remitanca në 2024',
      it: 'rimesse nel 2024',
      en: 'remittances in 2024',
    },
    source: 'Banka e Shqipërisë',
  },
  {
    value: 0,
    display: '0',
    accent: true,
    label: {
      sq: 'agjenci në Tiranë që e bëjnë të gjithë rrugën, nga ideja te hapja',
      it: 'agenzie a Tirana che fanno tutto il percorso, dall\'idea all\'apertura',
      en: 'agencies in Tirana that walk the whole path, from idea to opening',
    },
    source: 'VULA · 2026',
  },
];

export const numbersThesis: Record<Lang, string> = {
  sq: 'Kapitali është këtu. Turizmi po rritet. Konsumi në Tiranë po rritet. Ajo që mungon janë strukturat që e kthejnë kapitalin në biznese të ndërtuara mirë.',
  it: 'Il capitale c\'è. Il turismo cresce. I consumi a Tirana crescono. Quello che manca sono le strutture che trasformano quel capitale in attività costruite bene.',
  en: 'The capital is here. Tourism is growing. Spending in Tirana is growing. What is missing are the structures that turn that capital into well-built businesses.',
};

/* ------------------------------------------------------- porte d'ingresso */
// Non tutti comprano il percorso intero: si entra da tre porte diverse.

export const doors: Record<Lang, { kicker: string; title: string; items: { title: string; line: string }[] }> = {
  sq: {
    kicker: 'Si nisim',
    title: 'Tri dyer hyrëse.',
    items: [
      { title: 'Sill idenë tënde', line: 'E analizojmë, e projektojmë dhe e çojmë deri te hapja.' },
      { title: 'Merr një koncept tonin', line: 'Është gati: markë, menu, projekt hapësire. Hapet me licencë.' },
      { title: 'Të mungon vetëm një pjesë', line: 'Kërkim, plan biznesi, markë, food cost, drejtim kantieri: shiten edhe veç.' },
    ],
  },
  it: {
    kicker: 'Come si parte',
    title: "Tre porte d'ingresso.",
    items: [
      { title: 'Porta la tua idea', line: 'La analizziamo, la progettiamo e la portiamo fino all\'apertura.' },
      { title: 'Prendi un nostro concept', line: 'È già pronto: marca, menu, progetto dello spazio. Si apre in licenza.' },
      { title: 'Ti manca solo un pezzo', line: 'Ricerca, business plan, marca, food cost, direzione lavori: si comprano anche singolarmente.' },
    ],
  },
  en: {
    kicker: 'How it starts',
    title: 'Three ways in.',
    items: [
      { title: 'Bring your own idea', line: 'We analyse it, design it and take it through to opening.' },
      { title: 'Take one of our concepts', line: 'It is ready: brand, menu, space design. It opens under licence.' },
      { title: 'You only need one piece', line: 'Research, business plan, brand, food cost, site direction: each is sold on its own.' },
    ],
  },
};

/* ------------------------------------------------------------------ rete  */
// Cap. 5.3 del concept strategico: in casa la regia, fuori l'esecuzione.

export const network: Record<Lang, { kicker: string; title: string; line: string; areas: string[] }> = {
  sq: {
    kicker: 'Rrjeti',
    title: 'Nuk japim vetëm shërbime. Japim akses.',
    line: 'Ne drejtojmë. Një rrjet i verifikuar profesionistësh dhe kompanish ekzekuton. Ti nënshkruan një kontratë të vetme.',
    areas: ['Arkitekturë', 'Ligj', 'Kontabilitet', 'Ndërtim', 'Impiante', 'Burime njerëzore', 'Food & beverage', 'Foto dhe video', 'Dixhital', 'Marketing', 'Furnitorë'],
  },
  it: {
    kicker: 'La rete',
    title: 'Non diamo solo servizi. Diamo accesso.',
    line: 'Noi dirigiamo. Una rete verificata di professionisti e imprese esegue. Tu firmi un solo contratto.',
    areas: ['Architettura', 'Legale', 'Contabilità', 'Costruzione', 'Impianti', 'Risorse umane', 'Food & beverage', 'Foto e video', 'Digitale', 'Marketing', 'Fornitori'],
  },
  en: {
    kicker: 'The network',
    title: 'We do not just give services. We give access.',
    line: 'We direct. A vetted network of professionals and firms executes. You sign a single contract.',
    areas: ['Architecture', 'Legal', 'Accounting', 'Construction', 'Building services', 'People', 'Food & beverage', 'Photo & video', 'Digital', 'Marketing', 'Suppliers'],
  },
};


/* --------------------------------------------------------------- pse VULA */
// Concept strategico §8: non siamo nessuno degli otto interlocutori che il
// cliente oggi deve coordinare da solo. Siamo quello che li dirige.

export const whyVula: Record<Lang, { kicker: string; nots: string[]; claim: string; line: string }> = {
  sq: {
    kicker: 'Pse VULA',
    nots: [
      'Nuk jemi studio arkitekture.',
      'Nuk jemi agjenci marketingu.',
      'Nuk jemi kontabilistë.',
      'Nuk jemi kompani ndërtimi.',
    ],
    claim: 'Jemi regjia.',
    line: 'Punojmë me specialistë të përzgjedhur për çdo fazë të projektit. Ti nuk ke nevojë të gjesh dhjetë profesionistë: ne i koordinojmë.',
  },
  it: {
    kicker: 'Perché VULA',
    nots: [
      'Non siamo uno studio di architettura.',
      "Non siamo un'agenzia di marketing.",
      'Non siamo commercialisti.',
      'Non siamo un\'impresa edile.',
    ],
    claim: 'Siamo la regia.',
    line: 'Lavoriamo con specialisti selezionati per ogni fase del progetto. Tu non devi trovare dieci professionisti: li coordiniamo noi.',
  },
  en: {
    kicker: 'Why VULA',
    nots: [
      'We are not an architecture studio.',
      'We are not a marketing agency.',
      'We are not accountants.',
      'We are not a construction firm.',
    ],
    claim: 'We are the direction.',
    line: 'We work with selected specialists for every phase of the project. You do not have to find ten professionals: we coordinate them.',
  },
};

/* ------------------------------------------------------------- i servizi  */
// Espansione della terza porta: ogni pezzo si compra anche da solo.
// Cap. 6.1 del concept strategico — le fasi brevi sono prodotti di cassa.

export const services: Record<Lang, { title: string; note: string; groups: { title: string; items: string[] }[] }> = {
  sq: {
    title: 'Ose vetëm një pjesë.',
    note: 'Çdo shërbim mund të blihet veçmas.',
    groups: [
      { title: 'Strategji', items: ['Kërkim tregu', 'Studim fizibiliteti', 'Model biznesi', 'Plan biznesi', 'Analizë lokacioni', 'Politika e çmimeve', 'Food cost'] },
      { title: 'Markë', items: ['Emërtim', 'Strategji marke', 'Identitet vizual', 'Brand book', 'Paketim'] },
      { title: 'Dixhital', items: ['Faqe interneti', 'Tregti online', 'Rezervime', 'CRM', 'Përmbajtje'] },
      { title: 'Biznes', items: ['Zhvillim koncepti', 'Menu engineering', 'Operacione', 'Struktura e stafit', 'Strategji lansimi'] },
      { title: 'Ekzekutim', items: ['Arkitekturë', 'Ndërtim', 'Furnitorë', 'Rekrutim', 'Kontabilitet', 'Koordinim ligjor'] },
    ],
  },
  it: {
    title: 'Oppure solo un pezzo.',
    note: 'Ogni servizio si compra separatamente.',
    groups: [
      { title: 'Strategia', items: ['Ricerca di mercato', 'Studio di fattibilità', 'Modello di business', 'Business plan', 'Analisi della location', 'Politica di prezzo', 'Food cost'] },
      { title: 'Marca', items: ['Naming', 'Strategia di marca', 'Identità visiva', 'Brand book', 'Packaging'] },
      { title: 'Digitale', items: ['Sito', 'E-commerce', 'Prenotazioni', 'CRM', 'Contenuti'] },
      { title: 'Business', items: ['Sviluppo concept', 'Menu engineering', 'Operations', 'Struttura del personale', 'Strategia di lancio'] },
      { title: 'Esecuzione', items: ['Architettura', 'Costruzione', 'Fornitori', 'Recruiting', 'Contabilità', 'Coordinamento legale'] },
    ],
  },
  en: {
    title: 'Or just one piece.',
    note: 'Every service can be bought on its own.',
    groups: [
      { title: 'Strategy', items: ['Market research', 'Feasibility study', 'Business model', 'Business plan', 'Location analysis', 'Pricing', 'Food cost'] },
      { title: 'Brand', items: ['Naming', 'Brand strategy', 'Visual identity', 'Brand book', 'Packaging'] },
      { title: 'Digital', items: ['Website', 'E-commerce', 'Bookings', 'CRM', 'Content'] },
      { title: 'Business', items: ['Concept development', 'Menu engineering', 'Operations', 'Staff structure', 'Launch strategy'] },
      { title: 'Execution', items: ['Architecture', 'Construction', 'Suppliers', 'Recruiting', 'Accounting', 'Legal coordination'] },
    ],
  },
};

/* ------------------------------------------------------------ project brief */

export const brief: Record<Lang, {
  kicker: string; title: string; line: string;
  what: string; where: string; hasSpace: string; hasSpaceOptions: string[];
  capital: string; capitalHint: string; hasBrand: string; hasBrandOptions: string[];
  needs: string; needsOptions: string[];
  name: string; email: string; phone: string; notes: string; submit: string;
}> = {
  sq: {
    kicker: 'Tregomë çfarë ke në mendje',
    title: 'Nis nga këtu.',
    line: 'Sa më shumë na tregon, aq më konkrete është përgjigjja jonë. Asnjë fushë nuk është e detyrueshme përveç kontaktit.',
    what: 'Çfarë do të hapësh?',
    where: 'Ku?',
    hasSpace: 'Ke një lokal?',
    hasSpaceOptions: ['Po, e kam', 'Jo, ende jo', 'Po e kërkoj'],
    capital: 'Kapitali i planifikuar',
    capitalHint: 'Opsionale. Na ndihmon të kuptojmë shkallën e projektit.',
    hasBrand: 'Ke tashmë një markë?',
    hasBrandOptions: ['Jo, nis nga zero', 'Po, por duhet rishikuar', 'Po, është gati'],
    needs: 'Çfarë të duhet?',
    needsOptions: ['Zhvillim ideje', 'Kërkim tregu', 'Plan biznesi', 'Markë', 'Food cost', 'Faqe interneti', 'Arkitekturë', 'Ndërtim', 'Staf', 'Projekt i plotë'],
    name: 'Emri',
    email: 'Email',
    phone: 'Telefon ose WhatsApp',
    notes: 'Diçka tjetër që duhet të dimë?',
    submit: 'Dërgo briefin',
  },
  it: {
    kicker: 'Raccontaci cosa hai in mente',
    title: 'Si parte da qui.',
    line: 'Più cose ci racconti, più concreta è la nostra risposta. Nessun campo è obbligatorio tranne il contatto.',
    what: 'Cosa vuoi aprire?',
    where: 'Dove?',
    hasSpace: 'Hai già un locale?',
    hasSpaceOptions: ['Sì, ce l\'ho', 'No, non ancora', 'Lo sto cercando'],
    capital: 'Capitale previsto',
    capitalHint: 'Facoltativo. Ci aiuta a capire la scala del progetto.',
    hasBrand: 'Hai già una marca?',
    hasBrandOptions: ['No, si parte da zero', 'Sì, ma va rivista', 'Sì, è pronta'],
    needs: 'Di cosa hai bisogno?',
    needsOptions: ['Sviluppo idea', 'Ricerca di mercato', 'Business plan', 'Marca', 'Food cost', 'Sito', 'Architettura', 'Costruzione', 'Personale', 'Progetto completo'],
    name: 'Nome',
    email: 'Email',
    phone: 'Telefono o WhatsApp',
    notes: "Altro che dovremmo sapere?",
    submit: 'Invia il brief',
  },
  en: {
    kicker: 'Tell us what you have in mind',
    title: 'Start here.',
    line: 'The more you tell us, the more concrete our answer. No field is required except the contact.',
    what: 'What do you want to open?',
    where: 'Where?',
    hasSpace: 'Do you have a space?',
    hasSpaceOptions: ['Yes, I have one', 'Not yet', 'I am looking'],
    capital: 'Planned capital',
    capitalHint: 'Optional. It helps us understand the scale of the project.',
    hasBrand: 'Do you already have a brand?',
    hasBrandOptions: ['No, starting from zero', 'Yes, but it needs rework', 'Yes, it is ready'],
    needs: 'What do you need?',
    needsOptions: ['Idea development', 'Market research', 'Business plan', 'Brand', 'Food cost', 'Website', 'Architecture', 'Construction', 'Staff', 'Full project'],
    name: 'Name',
    email: 'Email',
    phone: 'Phone or WhatsApp',
    notes: 'Anything else we should know?',
    submit: 'Send the brief',
  },
};

/* --------------------------------------------------------- come lavoriamo */
// Cap. 5.3 e 6.1 del concept strategico.

export const modelTitle: Record<Lang, { kicker: string; title: string; line: string }> = {
  sq: {
    kicker: 'Si punojmë',
    title: 'Një kontratë e vetme.',
    line: 'Ne drejtojmë. Rrjeti ynë i përzgjedhur dhe i verifikuar ekzekuton. Ti nënshkruan një kontratë të vetme — me ne.',
  },
  it: {
    kicker: 'Come lavoriamo',
    title: 'Un solo contratto.',
    line: 'Noi dirigiamo. La nostra rete selezionata e verificata esegue. Tu firmi un solo contratto — con noi.',
  },
  en: {
    kicker: 'How we work',
    title: 'One contract.',
    line: 'We direct. Our selected and vetted network executes. You sign a single contract — with us.',
  },
};

export const modelBlocks: Record<Lang, { title: string; line: string }[]> = {
  sq: [
    {
      title: 'Faza me çmim fiks',
      line: 'Çdo fazë ka një çmim të caktuar, një produkt të prekshëm dhe paguhet me faza. Çdo fazë shitet edhe veç.',
    },
    {
      title: 'Regji kantieri',
      line: 'Drejtojmë punimet si përfaqësuesit e tu: tenderë, kontrata, afate, kosto, cilësi.',
    },
    {
      title: 'Abonim pas hapjes',
      line: 'Marketing, rishikim mujor i numrave dhe korrigjime në 12 muajt e parë, me kanon fiks.',
    },
  ],
  it: [
    {
      title: 'Fasi a prezzo fisso',
      line: 'Ogni fase ha un prezzo definito, un output tangibile e si paga a milestone. Ogni fase è vendibile anche da sola.',
    },
    {
      title: 'Regia del cantiere',
      line: 'Dirigiamo i lavori come tuoi rappresentanti: gare, contratti, tempi, costi, qualità.',
    },
    {
      title: 'Abbonamento post-apertura',
      line: 'Marketing, revisione mensile dei numeri e correzioni nei primi 12 mesi, a canone fisso.',
    },
  ],
  en: [
    {
      title: 'Fixed-price phases',
      line: 'Every phase has a set price, a tangible output and is paid at milestones. Each phase can be bought on its own.',
    },
    {
      title: 'Construction direction',
      line: 'We run the works as your representative: tenders, contracts, schedule, cost, quality.',
    },
    {
      title: 'Post-opening retainer',
      line: 'Marketing, a monthly review of the numbers and course corrections through the first 12 months, at a fixed fee.',
    },
  ],
};

/* -------------------------------------------------------------- CTA finale */
// Cap. 6 del piano — SQ ed EN letterali.

export const ctaFinal: Record<Lang, { line1: string; line2: string; button: string }> = {
  sq: { line1: 'Ke një lokal? Ke kapital?', line2: 'Fol me regjinë.', button: 'Fol me regjinë' },
  it: { line1: 'Hai un locale? Hai capitale?', line2: 'Parla con la regia.', button: 'Parla con la regia' },
  en: { line1: 'Got a space? Got capital?', line2: 'Talk to the director.', button: 'Talk to the director' },
};

export const ctaNote: Record<Lang, string> = {
  sq: '30 minuta. Pa angazhim. Na trego kapitalin, lokalin ose idenë.',
  it: '30 minuti. Senza impegno. Raccontaci il capitale, il locale o l\'idea.',
  en: '30 minutes. No commitment. Tell us about the capital, the space or the idea.',
};

export const ctaSecondary: Record<Lang, string> = {
  sq: 'Shiko metodën',
  it: 'Guarda il metodo',
  en: 'See the method',
};

/* ---------------------------------------------------------------- UI varia */

/* -------------------------------------------------------------- contatto */
// Il brief compilato diventa un messaggio WhatsApp già scritto: in Albania si
// converte lì, non nei form (concept strategico, cap. 9). Nessun backend,
// nessun servizio esterno, nessun dato che passa da terzi.
//
// Formato: prefisso internazionale senza + e senza spazi. Es. 3556XXXXXXX.
// Finché è vuoto, il pulsante WhatsApp non viene mostrato da nessuna parte.
export const whatsappNumber = '355697787889';

export const whatsappIntro: Record<Lang, string> = {
  sq: 'Përshëndetje! Ju shkruaj nga faqja e VULA Studio.',
  it: 'Salve! Vi scrivo dal sito di VULA Studio.',
  en: 'Hello! I am writing from the VULA Studio site.',
};

export const whatsappCta: Record<Lang, string> = {
  sq: 'Shkruaj në WhatsApp',
  it: 'Scrivi su WhatsApp',
  en: 'Message on WhatsApp',
};

export const location: Record<Lang, string> = {
  sq: 'Tiranë, Shqipëri',
  it: 'Tirana, Albania',
  en: 'Tirana, Albania',
};

export const ui: Record<Lang, Record<string, string>> = {
  sq: {
    skipToContent: 'Kalo te përmbajtja',
    langSwitcher: 'Gjuha',
    menu: 'Menu',
    close: 'Mbyll',
    scroll: 'Rrëshqit',
    allConcepts: 'Të gjitha konceptet',
    otherProjects: 'Projekte të tjera',
    backToConcepts: 'Kthehu te konceptet',
    seeConcept: 'Shiko',
    formName: 'Emri',
    formEmail: 'Email',
    formMessage: 'Për çfarë lokali bëhet fjalë?',
    formSubmit: 'Dërgo',
    orWhatsApp: 'Ose shkruaj direkt në WhatsApp',
    homeAria: 'VULA — kthehu te ballina',
  },
  it: {
    skipToContent: 'Vai al contenuto',
    langSwitcher: 'Lingua',
    menu: 'Menu',
    close: 'Chiudi',
    scroll: 'Scorri',
    allConcepts: 'Tutti i concept',
    otherProjects: 'Altri progetti',
    backToConcepts: 'Torna ai concept',
    seeConcept: 'Guarda',
    formName: 'Nome',
    formEmail: 'Email',
    formMessage: 'Di che locale si tratta?',
    formSubmit: 'Invia',
    orWhatsApp: 'Oppure scrivi direttamente su WhatsApp',
    homeAria: 'VULA — torna alla home',
  },
  en: {
    skipToContent: 'Skip to content',
    langSwitcher: 'Language',
    menu: 'Menu',
    close: 'Close',
    scroll: 'Scroll',
    allConcepts: 'All concepts',
    otherProjects: 'Other projects',
    backToConcepts: 'Back to concepts',
    seeConcept: 'View',
    formName: 'Name',
    formEmail: 'Email',
    formMessage: 'What kind of space is it?',
    formSubmit: 'Send',
    orWhatsApp: 'Or message us directly on WhatsApp',
    homeAria: 'VULA — back to home',
  },
};

export const contactPage: Record<Lang, { kicker: string; title: string; line: string }> = {
  sq: {
    kicker: 'Kontakt',
    title: 'Fol me regjinë.',
    line: 'Na trego çfarë ke: një lokal, një kapital, ose vetëm një ide. Përgjigjemi me hapin e parë konkret.',
  },
  it: {
    kicker: 'Contatto',
    title: 'Parla con la regia.',
    line: 'Raccontaci cosa hai: un locale, un capitale, o solo un’idea. Rispondiamo con il primo passo concreto.',
  },
  en: {
    kicker: 'Contact',
    title: 'Talk to the director.',
    line: 'Tell us what you have: a space, capital, or just an idea. We answer with the first concrete step.',
  },
};
