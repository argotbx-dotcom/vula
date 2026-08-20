/* ==========================================================================
   VULA — sistema di movimento
   Fonte: "IL SITO — Piano strategico", cap. 4.
   Stack: GSAP 3 + ScrollTrigger + Lenis. Nessun WebGL al lancio (cap. 4.1).

   Regole vincolanti applicate qui (cap. 4.2):
   · una sola firma di easing in tutto il sito
   · reveal 0,6-1,2 s, stagger 0,06-0,1 s
   · si animano solo transform e opacity
   · prefers-reduced-motion disattiva tutto e lascia il contenuto visibile
   ========================================================================== */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// Su Firefox Android e nelle WebView l'apertura della tastiera genera un
// window.resize: senza questo, tutti i pin verrebbero ricalcolati e alla
// chiusura del pannello si vedrebbe un salto.
ScrollTrigger.config({ ignoreMobileResize: true });

/** Firma di easing unica del sito (equivalente di cubic-bezier(.16,1,.3,1)). */
const EASE = 'power4.out';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* --------------------------------------------------------------- preloader */
/* Non bloccante: la pagina sotto è già renderizzata. Si vede una volta sola
   per sessione e sparisce comunque entro ~1,3 s (cap. 8). */

function preloader() {
  const el = document.querySelector<HTMLElement>('[data-preloader]');
  if (!el) return;

  const kill = () => el.remove();

  let seen = false;
  try {
    seen = sessionStorage.getItem('vula:seen') === '1';
    sessionStorage.setItem('vula:seen', '1');
  } catch {
    /* storage non disponibile: mostriamo comunque, una volta per pagina */
  }

  if (seen || reduced()) {
    kill();
    return;
  }

  const count = el.querySelector<HTMLElement>('[data-preloader-count]');
  const mark = el.querySelector<HTMLElement>('[data-preloader-mark]');
  const n = { v: 0 };

  const tl = gsap.timeline({ onComplete: kill });
  tl.to(mark, { opacity: 1, scale: 1, duration: 0.5, ease: EASE }, 0)
    .to(n, {
      v: 100,
      duration: 0.9,
      ease: 'none',
      onUpdate: () => {
        if (count) count.textContent = String(Math.round(n.v)).padStart(3, '0');
      },
    }, 0)
    .to(el, { yPercent: -100, duration: 0.7, ease: EASE }, '+=0.05');

  // Rete di sicurezza: qualunque cosa accada, l'overlay se ne va.
  window.setTimeout(kill, 2400);
}

/* ------------------------------------------------------------------- lenis */

function smoothScroll() {
  if (reduced()) return null;

  const lenis = new Lenis({
    duration: 1.05,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Le ancore interne passano da Lenis, così lo scroll resta una cosa sola.
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -20 });
    });
  });

  return lenis;
}

/* ----------------------------------------------------------------- reveals */
/* Comparse: dissolvenza + traslazione verticale, una volta sola. */

function reveals() {
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: EASE,
      delay: Number(el.dataset.revealDelay || 0),
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  // Titoli riga per riga: le righe sono già figli separati nel markup.
  gsap.utils.toArray<HTMLElement>('[data-reveal-line]').forEach((el) => {
    gsap.to(el.children, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: EASE,
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });
}

/* ------------------------------------------------------------- manifesto   */
/* Cap. 3: il testo si accende parola per parola con lo scroll. */

function manifesto() {
  const el = document.querySelector<HTMLElement>('[data-manifesto]');
  if (!el) return;

  const words = el.querySelectorAll<HTMLElement>('[data-word]');
  if (!words.length) return;

  gsap.set(words, { opacity: 0.16 });
  gsap.to(words, {
    opacity: 1,
    ease: 'none',
    stagger: 0.5,
    scrollTrigger: {
      trigger: el,
      start: 'top 72%',
      end: 'bottom 62%',
      scrub: 0.6,
    },
  });
}

/* -------------------------------------------------------------- il problema */
/* Otto etichette in deriva casuale che si allineano di scatto su una riga. */

function chaos() {
  const el = document.querySelector<HTMLElement>('[data-chaos]');
  if (!el) return;

  const chips = gsap.utils.toArray<HTMLElement>('[data-chip]', el);
  if (!chips.length) return;

  if (reduced()) {
    gsap.set(chips, { x: 0, y: 0, rotate: 0, opacity: 1 });
    return;
  }

  // Posizioni di partenza deterministiche (niente Math.random: stesso
  // disordine a ogni caricamento, così il montaggio resta ripetibile).
  const drift = [
    { x: -34, y: -46, r: -9 },
    { x: 30, y: -30, r: 7 },
    { x: -18, y: 34, r: 5 },
    { x: 42, y: 22, r: -6 },
    { x: -46, y: 6, r: 10 },
    { x: 16, y: 44, r: -4 },
    { x: 36, y: -12, r: 8 },
    { x: -28, y: 26, r: -7 },
  ];

  chips.forEach((chip, i) => {
    const d = drift[i % drift.length];
    gsap.set(chip, { xPercent: d.x, yPercent: d.y, rotate: d.r, opacity: 0.55 });
  });

  gsap.to(chips, {
    xPercent: 0,
    yPercent: 0,
    rotate: 0,
    opacity: 1,
    duration: 1.1,
    ease: EASE,
    stagger: 0.045,
    scrollTrigger: { trigger: el, start: 'top 62%', once: true },
  });
}

/* ------------------------------------------------------------- il metodo    */
/* Sei pannelli a scorrimento orizzontale (pin + translate) su desktop.
   Su mobile restano pannelli verticali: nessun pin, nessun scroll-jacking. */

function methodTrack() {
  const section = document.querySelector<HTMLElement>('[data-method]');
  const track = document.querySelector<HTMLElement>('[data-method-track]');
  if (!section || !track) return;

  const mm = gsap.matchMedia();

  mm.add('(min-width: 900px)', () => {
    const distance = () => track.scrollWidth - window.innerWidth + 80;

    gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    return () => {
      gsap.set(track, { x: 0 });
    };
  });
}

/* ----------------------------------------------------------------- numeri   */
/* I contatori salgono all'entrata in viewport, una volta sola. */

function counters() {
  gsap.utils.toArray<HTMLElement>('[data-count-to]').forEach((el) => {
    const to = Number(el.dataset.countTo || 0);
    const decimals = Number(el.dataset.countDecimals || 0);
    const suffix = el.dataset.countSuffix || '';

    const format = (v: number) =>
      v.toLocaleString('it-IT', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;

    if (reduced()) {
      el.textContent = format(to);
      return;
    }

    const n = { v: 0 };
    gsap.to(n, {
      v: to,
      duration: 1.5,
      ease: EASE,
      onUpdate: () => {
        el.textContent = format(n.v);
      },
      scrollTrigger: { trigger: el, start: 'top 86%', once: true },
    });
  });
}

/* --------------------------------------------------------------- parallasse */
/* Cap. 1: velocità diverse per piani diversi. Solo transform. */

function parallax() {
  if (reduced()) return;
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const amount = Number(el.dataset.parallax || 12);
    gsap.to(el, {
      yPercent: amount,
      ease: 'none',
      scrollTrigger: { trigger: el.parentElement || el, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });
}

/* ------------------------------------------------------------------ cursore */
/* Cursore custom con stati + bottoni magnetici (cap. 4.2). */

function cursor() {
  if (reduced() || !finePointer()) return;

  const el = document.querySelector<HTMLElement>('[data-cursor]');
  const ring = el?.querySelector<HTMLElement>('[data-cursor-ring]');
  const dot = el?.querySelector<HTMLElement>('[data-cursor-dot]');
  const label = el?.querySelector<HTMLElement>('[data-cursor-label]');
  if (!el || !ring || !dot) return;

  // Due inerzie diverse, perché fanno due mestieri diversi: il punto è la
  // mira e non deve mai restare indietro, l'anello insegue ed è quello che
  // l'occhio segue.
  const ringX = gsap.quickTo(ring, 'x', { duration: 0.34, ease: EASE });
  const ringY = gsap.quickTo(ring, 'y', { duration: 0.34, ease: EASE });
  const dotX = gsap.quickTo(dot, 'x', { duration: 0.07, ease: 'none' });
  const dotY = gsap.quickTo(dot, 'y', { duration: 0.07, ease: 'none' });

  // La freccia di sistema si nasconde solo al primo movimento del mouse:
  // fino a quel momento il cursore custom sarebbe fermo a 0,0 e non ci
  // sarebbe nessun puntatore da nessuna parte.
  let armed = false;

  window.addEventListener(
    'mousemove',
    (e) => {
      if (!armed) {
        armed = true;
        gsap.set([ring, dot], { x: e.clientX, y: e.clientY });
        document.documentElement.classList.add('has-cursor');
        return;
      }
      ringX(e.clientX);
      ringY(e.clientY);
      dotX(e.clientX);
      dotY(e.clientY);
    },
    { passive: true }
  );

  // Fuori dalla finestra sparisce, altrimenti resta un anello appiccicato
  // al bordo mentre il mouse è altrove.
  document.documentElement.addEventListener('mouseleave', () => el.classList.add('is-out'));
  document.documentElement.addEventListener('mouseenter', () => el.classList.remove('is-out'));

  // Conferma del clic: senza freccia di sistema serve un riscontro visivo
  // che il tasto è stato premuto davvero.
  window.addEventListener('mousedown', () => el.classList.add('is-down'), { passive: true });
  window.addEventListener('mouseup', () => el.classList.remove('is-down'), { passive: true });

  // Hover con intento: parte dopo 80 ms, non al passaggio accidentale.
  let timer: number | undefined;
  const enter = (state: string, text?: string) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      el.classList.remove('is-link', 'is-view');
      el.classList.add(state);
      if (label && text) label.textContent = text;
    }, 80);
  };
  const leave = () => {
    window.clearTimeout(timer);
    el.classList.remove('is-link', 'is-view');
  };

  document.querySelectorAll<HTMLElement>('a, button, summary').forEach((node) => {
    const text = node.dataset.cursorLabel;
    node.addEventListener('mouseenter', () => enter(text ? 'is-view' : 'is-link', text));
    node.addEventListener('mouseleave', leave);
  });

  // Sui campi compilabili il cursore custom si toglie di mezzo: l'I-beam di
  // sistema dice dove cadrà la lettera, un anello no.
  document.querySelectorAll<HTMLElement>('input, textarea, select').forEach((node) => {
    node.addEventListener('mouseenter', () => el.classList.add('is-text'));
    node.addEventListener('mouseleave', () => el.classList.remove('is-text'));
  });

  // Bottoni magnetici: il bottone segue il mouse di pochi pixel.
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((node) => {
    const strength = Number(node.dataset.magnetic || 8);
    const qx = gsap.quickTo(node, 'x', { duration: 0.4, ease: EASE });
    const qy = gsap.quickTo(node, 'y', { duration: 0.4, ease: EASE });

    node.addEventListener('mousemove', (e) => {
      const r = node.getBoundingClientRect();
      qx(((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * strength);
      qy(((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * strength);
    });
    node.addEventListener('mouseleave', () => {
      qx(0);
      qy(0);
    });
  });
}

/* -------------------------------------------------------------- video lazy  */
/* I video partono solo quando entrano in viewport e mai su connessione
   dichiarata lenta o con save-data attivo (cap. 3, riga Hero). */

function lazyVideo() {
  const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  const slow = !!conn && (conn.saveData === true || ['slow-2g', '2g'].includes(conn.effectiveType || ''));

  // Su connessione lenta o con movimento ridotto resta il poster: nessun byte
  // di video viene scaricato, perché i <video> sono in preload="none".
  if (slow || reduced()) return;

  const videos = document.querySelectorAll<HTMLVideoElement>('video[data-lazy]');
  if (!videos.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const v = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) {
          v.play().catch(() => {
            /* autoplay rifiutato: resta il poster */
          });
        } else {
          v.pause();
        }
      });
    },
    { rootMargin: '250px 0px' }
  );

  videos.forEach((v) => io.observe(v));
}

/* ------------------------------------------------------------ scroll lock */
/* Un overlay a schermo pieno deve fermare lo scroll della pagina sotto.
   Lo scroll qui è pilotato da Lenis, quindi `overflow: hidden` da solo non
   basta: va fermato Lenis. Ma con prefers-reduced-motion Lenis non esiste,
   e il blocco deve funzionare lo stesso — da qui le due strade.

   Si passa da eventi invece che da un import diretto così i componenti non
   dipendono da questo modulo: se il JS di motion non parte, l'overlay resta
   comunque usabile, solo senza blocco dello sfondo.

   Il contatore serve perché più cose possono chiedere il blocco insieme
   (overlay + menu): l'ultimo che chiude è quello che sblocca. */

function scrollLock(lenis: Lenis | null) {
  const html = document.documentElement;
  let held = 0;

  const apply = () => {
    if (held > 0) {
      lenis?.stop();
      html.classList.add('is-locked');
    } else {
      lenis?.start();
      html.classList.remove('is-locked');
    }
  };

  window.addEventListener('vula:lock', () => {
    held += 1;
    apply();
  });

  window.addEventListener('vula:unlock', (e) => {
    held = Math.max(0, held - 1);
    apply();
    if (held > 0) return;
    // Chi ha bloccato ha riportato la pagina alla sua Y con scrollTo, ma Lenis
    // tiene una posizione propria: senza risincronizzarlo, alla ripresa
    // scivolerebbe indietro da solo.
    const y = (e as CustomEvent<{ y?: number }>).detail?.y;
    lenis?.scrollTo(typeof y === 'number' ? y : window.scrollY, { immediate: true });
    ScrollTrigger.refresh();
  });
}

/* -------------------------------------------------------------------- boot */

export function initMotion() {
  preloader();

  if (reduced()) {
    // Tutto visibile, nessun movimento.
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    counters();
    lazyVideo();
    scrollLock(null);
    return;
  }

  const lenis = smoothScroll();

  if (import.meta.env.DEV) {
    // Solo in sviluppo: handle per ispezionare e pilotare lo scroll.
    (window as unknown as Record<string, unknown>).__vula = { lenis, ScrollTrigger, gsap };
  }

  reveals();
  manifesto();
  chaos();
  methodTrack();
  counters();
  parallax();
  cursor();
  lazyVideo();
  scrollLock(lenis);

  // Dopo il caricamento di font e immagini le misure cambiano.
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
