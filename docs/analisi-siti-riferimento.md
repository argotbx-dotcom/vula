# Analisi comparativa siti di riferimento
Fonte: estrazione diretta da browser (contenuto testuale completo + screenshot di stile) — 16/08/2026

---

## 1. Concept Marketing Albania — https://conceptmarketing.al/

### Chi sono / Posizionamento
- **Settore**: Agenzia di digital marketing "creativa" (branding, social, web design, produzione video, eventi).
- **Sede**: Tirana, Albania (Artan Lenja Street, Tirana 1032).
- **Contatti**: info@conceptmarketing.al · +355 68 871 8217.
- **Tagline hero**: "BOLD CONCEPT — Digital Marketing Agency in Albania".
- **Claim di autorità**: "Partner with +150 brands", muro loghi clienti (Meliá, Green Coast Hotel, Mövenpick, Villa Pashuqi, Lufra, Era, Tona, Fole, UNOPS, Shpresa Al Energy…) — punta su clienti hospitality/resort/ristorazione di fascia alta.
- **Tono**: emotivo, "bold", da agenzia creativa boutique — storytelling forte, poco tecnico.
- **Team esposto**: foto + nome + ruolo (CEO/Co-founder, Graphic Designer, Content Writer, Content Creator, Photographer) → umanizza il brand, comunica struttura "piccolo studio creativo".
- **Social proof**: testimonianze dirette in citazione, carosello.

### Struttura del sito
Home · Services · About · Blog · Contact — selettore lingua (SQ = albanese) — CTA primaria "Visit Portfolio".

### Servizi (con sotto-voci)
1. **Branding**: Brand Identity, Logo Design, Brand Strategy, Art Direction
2. **Social Media**: Content Creation, Audience Engagement, Campaign Management, Social Analytics
3. **Web Design**: Responsive Design, UX/UI Development, Website Optimization, Custom Coding
4. **Production**: Podcast, Promotional, Reels, Studio
+ voci in footer: Design, Events Marketing

### Stile visivo
- **Tema**: scuro (nero/antracite quasi puro come sfondo).
- **Colore accento**: ambra/arancione caldo (usato su bottoni, badge, overlay hero).
- **Tipografia**: titoli in maiuscolo, font condensed/bold ad alto impatto ("BOLD CONCEPT" enorme in hero).
- **Hero**: split-image con foto ambiente ufficio/reali, overlay scuro, headline gigante sovrapposta.
- **Portfolio**: card full-bleed a tutto schermo, immagine di sfondo progetto + nome cliente in font bold + tag categoria (pillole in alto a destra tipo "Production / Social Media").
- **Popup on-load**: modale "Brands That Trust Us" con griglia loghi clienti — cattura subito la fiducia ma è invasivo al primo accesso.
- **Bottoni**: pillola arrotondata, alto contrasto.
- **Animazioni**: scroll-jacking pesante (sezioni a schermo intero con transizioni), ha causato più volte timeout/schermate nere durante il test automatico — segnale di **peso JS elevato / possibile jank su device meno potenti o connessioni lente**.

---

## 2. SoftCrafter — https://softcrafter.net/

### Chi sono / Posizionamento
- **Settore**: Software house / digital solutions a 360° (sviluppo web, e-commerce, app mobile, corporate solutions, branding, marketing) — più "tech/dev" che pura agenzia creativa.
- **Ragione sociale**: SoftCrafter Sh.P.K, NIPT: M41819018B (Rr. Ndreko Rino, Nd. 1, NJ 1/3, Tiranë, Albania) — footer con dati fiscali, taglio più "corporate/istituzionale".
- **Contatti**: info@softcrafter.net
- **Hero claim**: "Powering the Champion's Next Chapter" + "Official Partner of MotoGP™ Rider Toprak Razgatlıoğlu" → leva sponsorizzazione sportiva/celebrity per credibilità e prestigio internazionale (differenziante forte rispetto a Concept Marketing).
- **"Why us" (4 pilastri)**:
  1. Ascolto prima di costruire (discovery-first)
  2. UI belle e intuitive
  3. Codice che scala (architettura pulita)
  4. Supporto continuo post-lancio
- **Marketplace interno**: sezione "Your Digital Hub" che vende pacchetti/soluzioni digitali pronte all'uso (prodotto scalabile oltre il servizio custom) — modello ibrido agenzia+prodotto.
- **Tech Partners**: sezione loghi partner tecnologici (credibilità tecnica).
- **Newsletter** in footer.

### Struttura del sito
Company · Services · Projects · Partners — doppia CTA in navbar: "Let's Talk" (outline, secondaria) + "Get Started" (piena, primaria).

### Servizi
Branding & Identity · Website Development · Corporate Solutions · E-commerce Solutions · Mobile Apps · Digital Marketing

### Stile visivo
- **Tema**: chiaro, sfondo lavanda/azzurro chiarissimo con pattern a griglia puntinata (estetica "blueprint/tech").
- **Colore accento**: blu indaco vivo (brand color primario, usato su logo, CTA, link).
- **Tipografia**: elementi nav/CTA scritti tra parentesi angolari stile codice (`<COMPANY>`, `<LET'S TALK>`, `<GET STARTED>`) — identità visiva "da sviluppatori". Hero con testo animato a effetto macchina da scrivere/pixel font.
- **Logo**: simbolo a spirale/infinito stilizzato + wordmark "SOFTCRAFTER" in font pixel-style.
- **Bottoni**: pillola, uno outline uno pieno — gerarchia CTA chiara.
- **Widget chat** flottante in basso a destra sempre visibile.
- **Preloader/progress bar** all'apertura del sito prima di mostrare i contenuti — impatto su first impression e performance percepita.
- **Animazioni**: come Concept Marketing, scroll-jacking e transizioni pesanti, con timeout ripetuti nel test automatico → stesso rischio di peso JS eccessivo.

---

## 3. Confronto diretto

| Aspetto | Concept Marketing | SoftCrafter |
|---|---|---|
| Settore | Agenzia marketing creativa | Software house / digital solutions |
| Tema colore | Scuro, ambra/arancio | Chiaro, blu indaco |
| Tono | Emotivo, "bold", storytelling | Tecnico, "developer-branded", performance |
| Leva di fiducia | Loghi clienti hospitality/hotel, testimonianze | Sponsorship MotoGP, tech partner, dati societari (NIPT) |
| Team | Volti/nomi esposti | Non esposto in home |
| Offerta | Solo servizi (agency) | Servizi + Marketplace prodotti pronti |
| CTA | Singola ("Visit Portfolio") | Doppia gerarchica (Let's Talk / Get Started) |
| Prima impressione | Modale loghi al caricamento | Preloader/progress bar al caricamento |
| Rischio UX/performance | Scroll-jacking pesante, animazioni bloccanti | Scroll-jacking pesante, preloader lento |

---

## 4. Spunti per il sito ibrido (da affinare con le info che darai tu)

**Da prendere da Concept Marketing:**
- Uso di un colore accento caldo e distintivo su sfondo scuro per un effetto premium/bold.
- Portfolio a card full-bleed con tag categoria — ottimo per mostrare progetti in modo visivamente d'impatto.
- Esposizione del team con foto/ruolo per costruire fiducia "umana".
- Struttura servizi a 4 macro-categorie con sotto-voci elencate (chiarezza dell'offerta).

**Da prendere da SoftCrafter:**
- Identità visiva distintiva legata al mondo "tech" (dettagli tipografici a tema codice, se pertinente al posizionamento).
- Gerarchia CTA doppia (azione soft + azione hard) invece di un solo bottone.
- Leva di credibilità "esterna" forte (sponsorship, partner, dati societari) se applicabile al nostro caso.
- Modello ibrido servizi + prodotto/marketplace, se in futuro vorremo vendere pacchetti standard oltre al lavoro custom.

**Attenzione (da NON replicare):**
- Entrambi i siti abusano di scroll-jacking/animazioni pesanti: nel test hanno causato più volte schermate nere/blocchi. Per il sito ibrido conviene puntare su animazioni più leggere (reveal-on-scroll semplici, no smooth-scroll custom invasivo) per garantire velocità e affidabilità su tutti i device.
- Il preloader di SoftCrafter rallenta la prima impressione: meglio contenuto visibile subito, con animazioni progressive non bloccanti.
- Il modale a comparsa immediata di Concept Marketing è invasivo: se si vuole mostrare social proof, meglio farlo in una sezione dedicata piuttosto che con un popup al primo secondo.

---

*Prossimo passo: in attesa delle info specifiche (nome, settore, target, servizi, tone of voice, riferimenti aggiuntivi) per definire l'ibrido definitivo.*
