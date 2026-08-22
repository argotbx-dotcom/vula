// VULA MEETS — la piazza d'incontro: idee, capitale, persone che cercano un socio.
//
// COSA È, AL LANCIO. Non è una piattaforma: niente login, niente registrazione,
// nessun account, nessun progetto visibile pubblicamente. Sono tre porte e tre
// form. Le candidature arrivano in privato e costruiscono il database di lead.
// Per questo la sezione non mostra nessun contatore e nessuna "trazione":
// è nuova, e fingere il contrario violerebbe le regole di onestà del progetto.
//
// Le frasi albanesi di questo file sono dettate dal committente e vanno
// riportate alla lettera. Italiano e inglese sono traduzioni fedeli.
// Resta valido l'ordine aperto: revisione da madrelingua prima del lancio.

import type { Lang } from './site';

/* ------------------------------------------------------- invio dei form   */

export type DoorKey = 'ide' | 'kapital' | 'ortak';

/**
 * ID Formspree, uno per porta: così le email arrivano già divise per tipo.
 * Si trovano nella dashboard Formspree di ogni form: sono la parte finale
 * dell'endpoint, https://formspree.io/f/<ID>.
 *
 * Finché sono segnaposto il sistema NON finge di funzionare: il pulsante
 * d'invio dichiara che il recapito non è ancora attivo e offre WhatsApp con
 * le risposte già scritte, così il contatto non si perde.
 *
 * Nota di piano: sul piano gratuito Formspree il limite è di 50 invii al mese
 * per ACCOUNT, non per form — tre ID non fanno 150 invii.
 */
export const VULA_MEETS_FORM_IDS: Record<DoorKey, string> = {
  // SOSTITUIRE con l'ID reale
  ide: 'SOSTITUIRE_CON_ID_REALE',
  // SOSTITUIRE con l'ID reale
  kapital: 'SOSTITUIRE_CON_ID_REALE',
  // SOSTITUIRE con l'ID reale
  ortak: 'SOSTITUIRE_CON_ID_REALE',
};

/** Un ID è configurato solo se non è più il segnaposto. */
export const isFormConfigured = (id: string) =>
  id.length > 0 && !id.startsWith('SOSTITUIRE');

export const formEndpoint = (id: string) => `https://formspree.io/f/${id}`;

/* ------------------------------------------------------------- i campi    */

export type FieldKind = 'text' | 'email' | 'tel' | 'select' | 'textarea' | 'checkboxes';

export interface FieldOption {
  /** Valore inviato: sempre l'etichetta albanese, così il database resta uniforme. */
  value: string;
  label: Record<Lang, string>;
}

export interface MeetsField {
  /** Attributo name: stabile fra le lingue, è la colonna del database. */
  name: string;
  kind: FieldKind;
  label: Record<Lang, string>;
  placeholder?: Record<Lang, string>;
  /** Nota sotto al campo. */
  hint?: Record<Lang, string>;
  /** Avviso in evidenza: il form raccoglie il contatto, non il business plan. */
  notice?: Record<Lang, string>;
  required?: boolean;
  maxlength?: number;
  options?: FieldOption[];
  /** Il campo compare solo se un campo precedente ha uno di questi valori. */
  showIf?: { field: string; equals: string[] };
}

/* Settori: una sola lista, usata da due porte. */
const SECTORS: FieldOption[] = [
  { value: 'Gastronomi', label: { sq: 'Gastronomi', it: 'Ristorazione', en: 'Food & drink' } },
  { value: 'Turizëm', label: { sq: 'Turizëm', it: 'Turismo', en: 'Tourism' } },
  { value: 'Retail', label: { sq: 'Retail', it: 'Retail', en: 'Retail' } },
  { value: 'Shërbime', label: { sq: 'Shërbime', it: 'Servizi', en: 'Services' } },
  { value: 'Tech', label: { sq: 'Tech', it: 'Tech', en: 'Tech' } },
  { value: 'Tjetër', label: { sq: 'Tjetër', it: 'Altro', en: 'Other' } },
];

/* Comuni a tutte e tre le porte, sempre in coda: prima si racconta il
   progetto, poi si lascia il contatto. */
const CONTACT_FIELDS: MeetsField[] = [
  {
    name: 'emri',
    kind: 'text',
    required: true,
    label: { sq: 'Emri dhe mbiemri', it: 'Nome e cognome', en: 'Full name' },
  },
  {
    name: 'qyteti',
    kind: 'text',
    required: true,
    label: { sq: 'Qyteti', it: 'Città', en: 'City' },
  },
  {
    name: 'telefoni',
    kind: 'tel',
    required: true,
    label: { sq: 'Telefon / WhatsApp', it: 'Telefono / WhatsApp', en: 'Phone / WhatsApp' },
  },
  {
    name: 'email',
    kind: 'email',
    required: true,
    label: { sq: 'Email', it: 'Email', en: 'Email' },
  },
];

/* --------------------------------------------------------------- le porte */

export interface MeetsDoor {
  key: DoorKey;
  /** Numero d'ordine mostrato sulla porta. */
  index: string;
  title: Record<Lang, string>;
  line: Record<Lang, string>;
  fields: MeetsField[];
}

export const doorsMeets: MeetsDoor[] = [
  {
    key: 'ide',
    index: '01',
    title: { sq: 'KAM NJË IDE', it: "HO UN'IDEA", en: 'I HAVE AN IDEA' },
    line: {
      sq: 'Ke një ide biznesi dhe kërkon kapital ose mbështetje.',
      it: 'Hai un’idea di business e cerchi capitale o supporto.',
      en: 'You have a business idea and you are looking for capital or support.',
    },
    fields: [
      {
        name: 'sektori',
        kind: 'select',
        required: true,
        label: { sq: 'Sektori', it: 'Settore', en: 'Sector' },
        options: SECTORS,
      },
      {
        name: 'ideja',
        kind: 'textarea',
        required: true,
        maxlength: 500,
        label: { sq: 'Ideja', it: 'L’idea', en: 'The idea' },
        placeholder: {
          sq: 'Përshkruaje idenë pa detajet sekrete — vetëm thelbin',
          it: 'Descrivi l’idea senza i dettagli segreti — solo il nocciolo',
          en: 'Describe the idea without the secret details — just the core',
        },
        notice: {
          sq: 'Mos dërgo informacion konfidencial ose sekret tregtar në këtë formular. Përshkruaj vetëm thelbin e idesë.',
          it: 'Non inviare informazioni confidenziali o segreti commerciali in questo modulo. Descrivi solo il nocciolo dell’idea.',
          en: 'Do not send confidential information or trade secrets through this form. Describe only the core of the idea.',
        },
      },
      {
        name: 'faza',
        kind: 'select',
        required: true,
        label: { sq: 'Në cilën fazë je?', it: 'A che punto sei?', en: 'How far along are you?' },
        options: [
          { value: 'Vetëm ide', label: { sq: 'Vetëm ide', it: 'Solo un’idea', en: 'Just an idea' } },
          { value: 'Plan i shkruar', label: { sq: 'Plan i shkruar', it: 'Piano scritto', en: 'Written plan' } },
          { value: 'Kam nisur', label: { sq: 'Kam nisur', it: 'Ho già iniziato', en: 'Already started' } },
        ],
      },
      {
        name: 'kerkon',
        kind: 'select',
        required: true,
        label: { sq: 'Çfarë kërkon?', it: 'Cosa cerchi?', en: 'What are you looking for?' },
        options: [
          { value: 'Kapital', label: { sq: 'Kapital', it: 'Capitale', en: 'Capital' } },
          { value: 'Ekspertizë', label: { sq: 'Ekspertizë', it: 'Competenze', en: 'Expertise' } },
          { value: 'Të dyja', label: { sq: 'Të dyja', it: 'Entrambe', en: 'Both' } },
        ],
      },
      ...CONTACT_FIELDS,
    ],
  },
  {
    key: 'kapital',
    index: '02',
    title: { sq: 'KAM KAPITAL', it: 'HO CAPITALE', en: 'I HAVE CAPITAL' },
    line: {
      sq: 'Ke kapital ose një pronë dhe kërkon idenë e duhur.',
      it: 'Hai capitale o un immobile e cerchi l’idea giusta.',
      en: 'You have capital or a property and you are looking for the right idea.',
    },
    fields: [
      {
        name: 'buxheti',
        kind: 'select',
        required: true,
        label: { sq: 'Buxheti orientues', it: 'Budget indicativo', en: 'Indicative budget' },
        hint: {
          sq: 'Vetëm një brez. Nuk është angazhim.',
          it: 'Solo una fascia. Non è un impegno.',
          en: 'A range only. Not a commitment.',
        },
        options: [
          { value: '<50k €', label: { sq: 'Nën 50k €', it: 'Meno di 50k €', en: 'Under €50k' } },
          { value: '50–150k €', label: { sq: '50–150k €', it: '50–150k €', en: '€50–150k' } },
          { value: '150–500k €', label: { sq: '150–500k €', it: '150–500k €', en: '€150–500k' } },
          { value: '500k+ €', label: { sq: '500k+ €', it: '500k+ €', en: '€500k+' } },
        ],
      },
      {
        name: 'prona',
        kind: 'select',
        required: true,
        label: { sq: 'Ke një pronë?', it: 'Hai già un immobile?', en: 'Do you already have a property?' },
        options: [
          { value: 'Po', label: { sq: 'Po', it: 'Sì', en: 'Yes' } },
          { value: 'Jo', label: { sq: 'Jo', it: 'No', en: 'No' } },
        ],
      },
      {
        name: 'qyteti_prones',
        kind: 'text',
        label: { sq: 'Ku ndodhet prona?', it: 'Dove si trova?', en: 'Where is it?' },
        showIf: { field: 'prona', equals: ['Po'] },
      },
      {
        name: 'sektoret',
        kind: 'checkboxes',
        required: true,
        label: {
          sq: 'Sektorët që të interesojnë',
          it: 'Settori che ti interessano',
          en: 'Sectors you are interested in',
        },
        hint: {
          sq: 'Mund të zgjedhësh më shumë se një.',
          it: 'Puoi sceglierne più di uno.',
          en: 'You can pick more than one.',
        },
        options: SECTORS,
      },
      {
        name: 'kerkon',
        kind: 'select',
        required: true,
        label: { sq: 'Çfarë kërkon?', it: 'Cosa cerchi?', en: 'What are you looking for?' },
        options: [
          { value: 'Ide gati', label: { sq: 'Ide gati', it: 'Un’idea pronta', en: 'A ready idea' } },
          { value: 'Ekip', label: { sq: 'Ekip', it: 'Una squadra', en: 'A team' } },
          {
            value: 'Koncept nga vault-i VULA',
            label: {
              sq: 'Koncept nga vault-i VULA',
              it: 'Un concept dal vault VULA',
              en: 'A concept from the VULA vault',
            },
          },
        ],
      },
      ...CONTACT_FIELDS,
    ],
  },
  {
    key: 'ortak',
    index: '03',
    title: { sq: 'KËRKOJ ORTAK', it: 'CERCO UN SOCIO', en: 'I AM LOOKING FOR A PARTNER' },
    line: {
      sq: 'Ke një aktivitet ose një projekt dhe kërkon një ortak.',
      it: 'Hai un’attività o un progetto e cerchi un socio.',
      en: 'You have a business or a project and you are looking for a partner.',
    },
    fields: [
      {
        name: 'aktiviteti',
        kind: 'textarea',
        required: true,
        maxlength: 500,
        label: {
          sq: 'Çfarë aktiviteti ose projekti ke?',
          it: 'Che attività o progetto hai?',
          en: 'What business or project do you have?',
        },
        notice: {
          sq: 'Mos dërgo informacion konfidencial ose sekret tregtar në këtë formular. Përshkruaj vetëm thelbin e idesë.',
          it: 'Non inviare informazioni confidenziali o segreti commerciali in questo modulo. Descrivi solo il nocciolo dell’idea.',
          en: 'Do not send confidential information or trade secrets through this form. Describe only the core of the idea.',
        },
      },
      {
        name: 'lloji_ortakut',
        kind: 'select',
        required: true,
        label: { sq: 'Çfarë ortaku kërkon?', it: 'Che socio cerchi?', en: 'What kind of partner?' },
        options: [
          { value: 'Operativ', label: { sq: 'Operativ', it: 'Operativo', en: 'Operational' } },
          { value: 'Financiar', label: { sq: 'Financiar', it: 'Finanziario', en: 'Financial' } },
          { value: 'Me ekspertizë', label: { sq: 'Me ekspertizë', it: 'Con competenze', en: 'With expertise' } },
        ],
      },
      {
        name: 'bashkepunimi',
        kind: 'textarea',
        maxlength: 500,
        label: {
          sq: 'Si e mendon bashkëpunimin?',
          it: 'Come immagini la collaborazione?',
          en: 'How do you picture the partnership?',
        },
        placeholder: {
          sq: 'Kuota, roli, kohëzgjatja — si e sheh ti',
          it: 'Quota, ruolo, durata — come la vedi tu',
          en: 'Share, role, duration — how you see it',
        },
      },
      ...CONTACT_FIELDS,
    ],
  },
];

/* ------------------------------------------------------- testi di sezione */

export const meets: Record<
  Lang,
  {
    kicker: string;
    title: string;
    subtitle: string;
    lede: string;
    privacy: string;
    disclaimer: string;
    /** Coda della meta description della home: la sezione va detta anche lì. */
    metaLine: string;
  }
> = {
  sq: {
    kicker: 'Sheshi i takimeve',
    title: 'VULA MEETS',
    subtitle: 'Idetë takojnë kapitalin.',
    lede: 'Një adresë për tri situata të ndryshme. Zgjidh atë që të përket dhe na trego çfarë ke në dorë.',
    privacy: 'Idetë që na dërgon i sheh vetëm ekipi i VULA-s. Asgjë nuk publikohet.',
    disclaimer:
      'VULA Meets nuk ofron këshillim financiar dhe nuk është palë në marrëveshjet mes personave. VULA nuk menaxhon fonde.',
    metaLine: 'VULA Meets: idetë takojnë kapitalin.',
  },
  it: {
    kicker: 'La piazza degli incontri',
    title: 'VULA MEETS',
    subtitle: 'Le idee incontrano il capitale.',
    lede: 'Un solo indirizzo per tre situazioni diverse. Scegli quella che ti riguarda e dicci cosa hai in mano.',
    privacy: 'Le idee che ci mandi le vede solo il team di VULA. Niente viene pubblicato.',
    disclaimer:
      'VULA Meets non fornisce consulenza finanziaria e non è parte negli accordi tra le persone. VULA non gestisce fondi.',
    metaLine: 'VULA Meets: idee e capitale.',
  },
  en: {
    kicker: 'The meeting place',
    title: 'VULA MEETS',
    subtitle: 'Ideas meet capital.',
    lede: 'One address for three different situations. Pick the one that fits and tell us what you bring.',
    privacy: 'Ideas you send are seen only by the VULA team. Nothing is published.',
    disclaimer:
      'VULA Meets does not provide financial advice and is not a party to agreements between individuals. VULA does not manage funds.',
    metaLine: 'VULA Meets: ideas meet capital.',
  },
};

/* ------------------------------------------------- interfaccia del form   */

export const meetsUi: Record<
  Lang,
  {
    open: string;
    next: string;
    back: string;
    send: string;
    sending: string;
    close: string;
    enterHint: string;
    optional: string;
    /** {n} e {total} vengono sostituiti a runtime. */
    step: string;
    progressLabel: string;
    required: string;
    invalidEmail: string;
    charsLeft: string;
    doneTitle: string;
    doneLine: string;
    errorLine: string;
    errorWhatsapp: string;
    rateLimited: string;
    notConfigured: string;
  }
> = {
  sq: {
    open: 'Hap formularin',
    next: 'Vazhdo',
    back: 'Kthehu',
    send: 'Dërgo',
    sending: 'Po dërgohet…',
    close: 'Mbyll',
    enterHint: 'Shtyp Enter',
    optional: 'jo e detyrueshme',
    step: 'Hapi {n} nga {total}',
    progressLabel: 'Ecuria e formularit',
    required: 'Kjo fushë është e detyrueshme.',
    invalidEmail: 'Kontrollo adresën e email-it.',
    charsLeft: '{n} karaktere të mbetura',
    doneTitle: 'Faleminderit.',
    doneLine: 'Do të të kontaktojmë personalisht brenda 48 orëve.',
    errorLine: 'Nuk u dërgua. Provo përsëri.',
    errorWhatsapp: 'Ose na i dërgo në WhatsApp',
    rateLimited: 'Shumë kërkesa. Prit pak dhe provo sërish.',
    notConfigured: 'Dërgimi me email nuk është aktivizuar ende.',
  },
  it: {
    open: 'Apri il modulo',
    next: 'Avanti',
    back: 'Indietro',
    send: 'Invia',
    sending: 'Invio…',
    close: 'Chiudi',
    enterHint: 'Premi Invio',
    optional: 'facoltativo',
    step: 'Passo {n} di {total}',
    progressLabel: 'Avanzamento del modulo',
    required: 'Questo campo è obbligatorio.',
    invalidEmail: 'Controlla l’indirizzo email.',
    charsLeft: '{n} caratteri rimasti',
    doneTitle: 'Grazie.',
    doneLine: 'Ti contatteremo personalmente entro 48 ore.',
    errorLine: 'Invio non riuscito. Riprova.',
    errorWhatsapp: 'Oppure mandacele su WhatsApp',
    rateLimited: 'Troppe richieste. Aspetta un momento e riprova.',
    notConfigured: 'L’invio via email non è ancora attivo.',
  },
  en: {
    open: 'Open the form',
    next: 'Next',
    back: 'Back',
    send: 'Send',
    sending: 'Sending…',
    close: 'Close',
    enterHint: 'Press Enter',
    optional: 'optional',
    step: 'Step {n} of {total}',
    progressLabel: 'Form progress',
    required: 'This field is required.',
    invalidEmail: 'Check the email address.',
    charsLeft: '{n} characters left',
    doneTitle: 'Thank you.',
    doneLine: 'We will contact you personally within 48 hours.',
    errorLine: 'Could not send. Try again.',
    errorWhatsapp: 'Or send it to us on WhatsApp',
    rateLimited: 'Too many requests. Wait a moment and try again.',
    notConfigured: 'Email delivery is not switched on yet.',
  },
};
