// Contenuto strutturato del sito VULA.
// Testi qui presenti sono SOLO quelli già forniti letteralmente dal brief
// (motto, CTA, le quattro fasi, la tesi "il problema", la tesi "chi siamo"),
// tradotti fedelmente nelle tre lingue mantenendo lo stesso significato.
// Tutto il resto è marcato come DA FORNIRE, sia a livello di dato (tbd: true)
// sia come commento HTML nei componenti che lo renderizzano.

export type Lang = 'sq' | 'it' | 'en';
export const LANGS: Lang[] = ['sq', 'it', 'en'];
export const DEFAULT_LANG: Lang = 'sq';

export const langLabel: Record<Lang, string> = {
  sq: 'Shqip',
  it: 'Italiano',
  en: 'English',
};

// Slug delle pagine — dati letteralmente dal brief (sq) + equivalenti it/en.
export const slugs = {
  home: { sq: '', it: '', en: '' },
  services: { sq: 'sherbimet', it: 'servizi', en: 'services' },
  portfolio: { sq: 'puna', it: 'lavori', en: 'work' },
  about: { sq: 'kush-jemi', it: 'chi-siamo', en: 'about' },
  contact: { sq: 'kontakt', it: 'contatto', en: 'contact' },
} as const;

export type PageKey = keyof typeof slugs;

export function path(lang: Lang, page: PageKey): string {
  const slug = slugs[page][lang];
  return slug ? `/${lang}/${slug}/` : `/${lang}/`;
}

export const nav: Record<Lang, { home: string; services: string; portfolio: string; about: string; contact: string }> = {
  sq: { home: 'Ballina', services: 'Shërbimet', portfolio: 'Puna', about: 'Kush jemi', contact: 'Kontakt' },
  it: { home: 'Home', services: 'Servizi', portfolio: 'Lavori', about: 'Chi siamo', contact: 'Contatto' },
  en: { home: 'Home', services: 'Services', portfolio: 'Work', about: 'About', contact: 'Contact' },
};

export const motto: Record<Lang, string> = {
  sq: 'Nga ideja te hapja',
  it: "Dall'idea all'apertura",
  en: 'From idea to opening',
};

export const ctaPrimary: Record<Lang, string> = {
  sq: 'Flasim për projektin tënd',
  it: 'Parliamo del tuo progetto',
  en: "Let's talk about your project",
};

export const ctaSecondary: Record<Lang, string> = {
  sq: 'Shiko fazat',
  it: 'Guarda le fasi',
  en: 'See the phases',
};

// UI minima funzionale (etichette di interfaccia, non copy di marca).
export const ui: Record<Lang, Record<string, string>> = {
  sq: {
    skipToContent: 'Kalo te përmbajtja',
    langSwitcher: 'Gjuha',
    priceFrom: '',
    priceRange: '—',
    priceTbc: 'ÇMIMI PËR T’U KONFIRMUAR',
    priceQuote: 'me preventiv',
    pricePackage: 'me paketë',
    labelConcept: 'Koncept — nuk u realizua',
    labelGroupBrand: 'Markë e grupit',
    labelClient: 'Klient',
    todo: 'DA FORNIRE',
    portfolioAll: 'Shiko të gjitha punimet',
    phasesAll: 'Shiko fazat në detaje',
    formName: 'Emri',
    formEmail: 'Email',
    formMessage: 'Mesazhi',
    formSubmit: 'Dërgo',
    homeLinkAria: 'VULA — kthehu te ballina',
  },
  it: {
    skipToContent: 'Vai al contenuto',
    langSwitcher: 'Lingua',
    priceFrom: '',
    priceRange: '—',
    priceTbc: 'PREZZO DA CONFERMARE',
    priceQuote: 'a preventivo',
    pricePackage: 'a pacchetto',
    labelConcept: 'Concept — non realizzato',
    labelGroupBrand: 'Marchio del gruppo',
    labelClient: 'Cliente',
    todo: 'DA FORNIRE',
    portfolioAll: 'Guarda tutti i lavori',
    phasesAll: 'Guarda le fasi nel dettaglio',
    formName: 'Nome',
    formEmail: 'Email',
    formMessage: 'Messaggio',
    formSubmit: 'Invia',
    homeLinkAria: 'VULA — torna alla home',
  },
  en: {
    skipToContent: 'Skip to content',
    langSwitcher: 'Language',
    priceFrom: '',
    priceRange: '—',
    priceTbc: 'PRICE TO BE CONFIRMED',
    priceQuote: 'on quote',
    pricePackage: 'package price',
    labelConcept: 'Concept — never opened',
    labelGroupBrand: 'Group brand',
    labelClient: 'Client',
    todo: 'DA FORNIRE',
    portfolioAll: 'See all the work',
    phasesAll: 'See the phases in detail',
    formName: 'Name',
    formEmail: 'Email',
    formMessage: 'Message',
    formSubmit: 'Send',
    homeLinkAria: 'VULA — back to home',
  },
};

// "Il problema" — tesi data letteralmente dal brief, scomposta in tre frasi brevi.
export const problem: Record<Lang, { kicker: string; points: string[] }> = {
  sq: {
    kicker: 'Problemi',
    points: [
      'Nënshkruhet kontrata e qirasë para se të dihet nëse lokali mban.',
      'Hapet pa ditur kujt i drejtohesh.',
      'Paguhet muratori dhe shpresohet.',
    ],
  },
  it: {
    kicker: 'Il problema',
    points: [
      "Si firma il contratto d'affitto prima di sapere se il locale regge.",
      'Si apre senza sapere a chi si parla.',
      'Si paga il muratore e si spera.',
    ],
  },
  en: {
    kicker: 'The problem',
    points: [
      'The lease gets signed before knowing if the premises can carry it.',
      'Doors open without knowing who you are talking to.',
      'The builder gets paid, and you hope.',
    ],
  },
};

// "Chi siamo" — tesi data letteralmente dal brief.
export const aboutThesis: Record<Lang, { kicker: string; line: string }> = {
  sq: { kicker: 'Kush jemi', line: 'Nuk japim vetëm këshilla. Ndërtojmë markat tona.' },
  it: { kicker: 'Chi siamo', line: 'Non diamo solo consigli. Costruiamo i nostri marchi.' },
  en: { kicker: 'About us', line: "We don't just advise. We build our own brands." },
};

export type PriceKind = 'range' | 'package' | 'quote';

export interface Phase {
  num: string;
  code: string;
  desc: string;
  priceKind: PriceKind;
  priceValue?: string; // solo per priceKind 'range'
  priceConfirmed: boolean;
  highlight?: string;
}

export const phases: Record<Lang, Phase[]> = {
  sq: [
    {
      num: '01',
      code: 'VERIFIKIM',
      desc: 'Verifikim i vendndodhjes dhe lokalit: zona, kalimi i njerëzve, konkurrenca, impiantet, shkarkimet, qëndrueshmëria e qirasë në raport me marzhet.',
      priceKind: 'range',
      priceValue: '€200–400',
      priceConfirmed: false,
      highlight: 'Paguhet njësoj edhe nëse përgjigjja është jo.',
    },
    {
      num: '02',
      code: 'IDENTITET',
      desc: 'Pozicionimi, oferta dhe çmimet, emri, identiteti vizual, menuja ose lista e çmimeve, dizajni i hapësirës.',
      priceKind: 'range',
      priceValue: '€1.500–3.000',
      priceConfirmed: false,
    },
    {
      num: '03',
      code: 'NDËRTIM',
      desc: 'Faqja e internetit, Google Business, rrjetet sociale fillestare, tabela, materiale të shtypura, foto dhe video.',
      priceKind: 'package',
      priceConfirmed: false,
    },
    {
      num: '04',
      code: 'VULA',
      desc: 'Koordinimi i punimeve, kolaudimi me listën e defekteve, garancia me shkrim, hapja. Në dorëzim lokali merr vulën.',
      priceKind: 'quote',
      priceConfirmed: false,
    },
  ],
  it: [
    {
      num: '01',
      code: 'VERIFIKIM',
      desc: 'Verifica di location e locale: zona, passaggio, concorrenza, impianti, scarichi, sostenibilità del canone rispetto ai margini.',
      priceKind: 'range',
      priceValue: '€200–400',
      priceConfirmed: false,
      highlight: 'Si paga uguale se la risposta è no.',
    },
    {
      num: '02',
      code: 'IDENTITET',
      desc: 'Posizionamento, offerta e prezzi, nome, identità visiva, menu o listino, layout dello spazio.',
      priceKind: 'range',
      priceValue: '€1.500–3.000',
      priceConfirmed: false,
    },
    {
      num: '03',
      code: 'NDËRTIM',
      desc: 'Sito, Google Business, social di partenza, insegne, stampati, foto e video.',
      priceKind: 'package',
      priceConfirmed: false,
    },
    {
      num: '04',
      code: 'VULA',
      desc: 'Coordinamento lavori, collaudo con lista difetti, garanzia scritta, apertura. Alla consegna il locale riceve la vula.',
      priceKind: 'quote',
      priceConfirmed: false,
    },
  ],
  en: [
    {
      num: '01',
      code: 'VERIFIKIM',
      desc: 'Location and premises verification: area, foot traffic, competition, utilities, drainage, whether the rent holds up against margins.',
      priceKind: 'range',
      priceValue: '€200–400',
      priceConfirmed: false,
      highlight: 'You pay the same if the answer is no.',
    },
    {
      num: '02',
      code: 'IDENTITET',
      desc: 'Positioning, offer and pricing, name, visual identity, menu or price list, space layout.',
      priceKind: 'range',
      priceValue: '€1.500–3.000',
      priceConfirmed: false,
    },
    {
      num: '03',
      code: 'NDËRTIM',
      desc: 'Website, Google Business, starter social media, signage, printed materials, photo and video.',
      priceKind: 'package',
      priceConfirmed: false,
    },
    {
      num: '04',
      code: 'VULA',
      desc: 'Works coordination, snag-list inspection, written warranty, opening. On handover, the premises receives the vula.',
      priceKind: 'quote',
      priceConfirmed: false,
    },
  ],
};

// Sede — solo il dato di città è nel brief ("Agenzia con sede a Tirana").
// Indirizzo completo, telefono, email: [DA FORNIRE].
export const location: Record<Lang, string> = {
  sq: 'Tiranë, Shqipëri',
  it: 'Tirana, Albania',
  en: 'Tirana, Albania',
};

export const siteName = 'VULA';
