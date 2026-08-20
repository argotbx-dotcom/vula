# VULA — regole per tutte le sessioni

Il sito è la koncept agency: non la descrive, la dimostra. Chi arriva deve
pensare «se hanno fatto questo per sé, immagina cosa fanno per me».

Fonte di verità: `docs/piano-sito.md` e `docs/concept-strategico.md`.
Questi documenti **sostituiscono** il brief precedente (quello con le quattro
fasi, l'assenza di librerie di animazione e i blocchi `[DA FORNIRE]` a schermo).

## Pubblicazione

Il sito vive su **Cloudflare Pages**, progetto `vula-studio`, **collegato a
GitHub**: <https://vula-studio.pages.dev>

**Non serve nessun comando di deploy.** Ogni push su `main` fa partire da solo
build e pubblicazione. Basta committare e pushare.

Configurazione del progetto (già impostata, si tocca solo se cambia il dominio):

| variabile | valore | perché |
|---|---|---|
| `NODE_VERSION` | `22` | il progetto richiede Node ≥22.12, il default di Pages è più vecchio |
| `SITE_URL` | `https://vula-studio.pages.dev` | canonical, hreflang, og:image e sitemap devono essere assoluti e stabili |

`SITE_URL` è indispensabile: senza, Astro ripiega su `CF_PAGES_URL`, che è
l'indirizzo del singolo deploy (`1d93a2cd.vula-studio.pages.dev`) e cambia a
ogni build — il canonical si sposterebbe di continuo. Quando arriva il dominio
definitivo si cambia solo questa variabile, nelle impostazioni del progetto.

Per pubblicare a mano, senza passare da git:

```
SITE_URL="https://vula-studio.pages.dev" npx astro build
npx wrangler pages deploy dist --project-name vula-studio --branch main
```

Netlify resta collegato al repository ma **il suo account ha i crediti
esauriti** e rifiuta i deploy: il vecchio indirizzo serve ancora una copia
datata. Va spento, altrimenti restano due copie indicizzabili dello stesso sito.

## VULA Meets — da completare

La sezione `#vula-meets` (fra "Si punojmë" e la CTA finale) è pubblicata e
funzionante, ma **il recapito email non è ancora attivo**: i tre ID Formspree
in `src/content/meets.ts` sono i segnaposto `SOSTITUIRE_CON_ID_REALE`.

Finché restano tali il pannello non finge: alla fine del questionario dichiara
che l'invio via email non è attivo e offre WhatsApp con tutte le risposte già
composte, così il contatto non si perde. Appena arrivano gli ID veri basta
sostituirli: non serve toccare altro.

Sul piano gratuito Formspree il limite è di **50 invii al mese per account**,
non per form: tre ID non fanno 150 invii.

Quando gli ID diventano reali, ricontrollare due cose che oggi sono
irraggiungibili perché nessuna richiesta parte:
- un passo condizionale non pertinente resta compilato nel DOM e finirebbe in
  `FormData` (esempio: si risponde "Po" alla proprietà, si scrive la città, si
  torna indietro e si cambia in "Jo");
- dopo un invio riuscito il form non viene azzerato.

## Vincoli di lavoro

- Branch di produzione `main`. Niente branch nuovi, niente PR.
- Dopo ogni modifica: `astro check` + `astro build`. Se puliti, committa e
  pusha senza chiedere. Se il build fallisce, fermati.
- Trilingue SQ (default) / IT / EN: ogni modifica ai testi va su tutte e tre.
- **Niente segnaposto a schermo.** Se un contenuto manca, la sezione non si
  pubblica o non mostra nulla: mai `[DA FORNIRE]` visibile all'utente.

## Le tre regole di onestà (non negoziabili)

1. Ogni scheda del vault dichiara cosa è, con etichetta sempre visibile.
   Due categorie, mai mescolate: `Klient` = progetti sviluppati per clienti,
   attività reali di altri (Elite Wines, Zen'on, Management Albania, LALA Kids),
   con sotto la riga di cosa abbiamo fatto noi; `Koncept ©` = concept nostri,
   mai aperti, disponibili in licenza. Senza etichetta la scheda non si pubblica.
2. Zero testimonianze inventate, zero team inventato, zero volti generati
   spacciati per persone reali.
3. I numeri citati sono quelli veri, con la fonte accanto (vedi
   `src/content/site.ts`, `stats`). Mai un numero gonfiato.

## Movimento

Stack: GSAP 3 + ScrollTrigger + Lenis (`src/lib/motion.ts`). Regole:

- una sola firma di easing in tutto il sito (`power4.out` / `--ease`)
- un solo "wow" per schermata
- si animano solo `transform` e `opacity`
- `prefers-reduced-motion` disattiva tutto e lascia il contenuto visibile
- il contenuto resta leggibile con JavaScript disattivato
- niente scroll-jacking su mobile: la sezione metodo diventa verticale

Budget: LCP < 2,5 s su 4G, hero ≤ 6 MB, ogni card ≤ 3 MB, Lighthouse mobile
≥ 85 / ≥ 95. Se un'animazione costa più di 5 punti Lighthouse, si semplifica
l'animazione, non il budget.

## Media

I video in `public/videos/` sono cinemagraph generati con Higgsfield a partire
dalle immagini di marca esistenti, più HERO-01. Sono stati prodotti una tantum
con autorizzazione esplicita e budget concordato: **non rigenerarli e non
aggiungerne altri senza autorizzazione esplicita.**

Dopo aver aggiunto un video: `node scripts/media.mjs` estrae i poster e
produce mp4 + webm dentro il budget.

## Development

```
astro dev --background
```

Gestione: `astro dev stop`, `astro dev status`, `astro dev logs`.

Documentazione Astro: https://docs.astro.build
