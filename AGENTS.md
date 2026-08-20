# VULA — regole per tutte le sessioni

Il sito è la koncept agency: non la descrive, la dimostra. Chi arriva deve
pensare «se hanno fatto questo per sé, immagina cosa fanno per me».

Fonte di verità: `docs/piano-sito.md` e `docs/concept-strategico.md`.
Questi documenti **sostituiscono** il brief precedente (quello con le quattro
fasi, l'assenza di librerie di animazione e i blocchi `[DA FORNIRE]` a schermo).

## Vincoli di lavoro

- Branch di produzione collegato a Netlify. Niente branch nuovi, niente PR.
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
