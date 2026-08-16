# VULA — regole per tutte le sessioni

- Lavora sempre sul branch di produzione collegato a Netlify. Non creare branch nuovi, non aprire Pull Request, non proporre merge.
- Dopo ogni modifica: `astro check` + `astro build`. Se puliti, committa e pusha direttamente senza chiedere conferma. Se il build fallisce, fermati.
- Sito trilingue SQ (default) / IT / EN: ogni modifica ai testi va applicata a tutte e tre, stessa struttura.
- Non inventare contenuti al posto dei `[DA FORNIRE]`: lasciali come commenti HTML visibili nel codice e segnalali nel riepilogo.
- Non cercare foto reali online e non generare immagini che finga siano clienti, locali o persone reali. Le 8 immagini + `hero.mp4` in `public/images/` sono state generate una tantum con Higgsfield (autorizzazione esplicita del committente, budget 50 crediti) come materiale atmosferico/di marca astratto — non rigenerarle senza che venga richiesto di nuovo, e non aggiungerne altre allo stesso modo senza autorizzazione esplicita.
- Nessun `{{...}}` o segnaposto tecnico deve arrivare in produzione.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
