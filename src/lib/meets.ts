/* ==========================================================================
   VULA MEETS — comportamento del pannello a passi.

   Tre scelte che reggono tutto il resto:

   1. <dialog> nativo aperto con showModal(). Il browser regala la trappola
      del focus, l'inertizzazione del resto della pagina ed Esc. Il top layer
      passa sopra header (z 100), cursore custom (300) e preloader (400)
      senza doverli conoscere.

   2. Un <form> per porta, non uno solo con tutti i campi: i tre questionari
      condividono nomi di campo (emri, kerkon…) e in un unico form si
      pesterebbero i piedi. FormData legge solo il form attivo.

   3. La geometria del pannello NON si deduce dalle unità CSS: si misura con
      visualViewport e si pubblica come custom property. È l'unico modo per
      tenere il campo attivo e il pulsante sopra la tastiera su iOS.
   ========================================================================== */

type Field = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

interface Strings {
  step: string;
  required: string;
  invalidEmail: string;
  sending: string;
  send: string;
  next: string;
  errorLine: string;
  rateLimited: string;
  notConfigured: string;
  charsLeft: string;
}

const root = document.documentElement;
const vv = window.visualViewport ?? null;

/** Sotto questa soglia è la barra URL che si ritira, non la tastiera. */
const KB_MIN = 120;
const SETTLE_MS = 600;
const CLOSE_MS = 400;

/* ------------------------------------------------------ geometria viewport */

let rafId = 0;

const isTextInput = (el: Element | null): boolean => {
  if (!el) return false;
  if (el.tagName === 'TEXTAREA') return true;
  if (el.tagName !== 'INPUT') return false;
  return !/^(button|submit|reset|checkbox|radio|range|file|image|color)$/i.test(
    (el as HTMLInputElement).type
  );
};

function measure(): void {
  rafId = 0;

  // Pagina pizzicata: visualViewport.height è l'altezza a quello zoom, e
  // riposizionare qui darebbe un pannello alto la metà. Si congela l'ultima
  // misura buona.
  const scale = vv?.scale ?? 1;
  if (Math.abs(scale - 1) > 0.01) {
    root.classList.add('is-vv-zoomed');
    return;
  }
  root.classList.remove('is-vv-zoomed');

  const iv = window.innerHeight;
  // min(): iOS e Chrome ≥108 riducono solo visualViewport.height, Firefox
  // Android riduce invece window.innerHeight.
  const h = Math.min(vv?.height ?? iv, iv);
  const top = vv?.offsetTop ?? 0;
  const kb = Math.max(0, iv - h - top);
  const open = kb > KB_MIN && isTextInput(document.activeElement);

  root.style.setProperty('--vvh', `${Math.round(h)}px`);
  root.style.setProperty('--vvtop', `${Math.round(top)}px`);
  root.style.setProperty('--kb', `${open ? Math.round(kb) : 0}px`);
  root.classList.toggle('is-keyboard', open);
}

const schedule = () => {
  if (!rafId) rafId = requestAnimationFrame(measure);
};

/** Al `focus` la tastiera non esiste ancora: si campiona finché l'altezza non
    è identica per tre frame, con tetto a 600 ms. */
function settle(done?: () => void): void {
  const t0 = performance.now();
  let prev = -1;
  let same = 0;
  const step = () => {
    const h = Math.min(vv?.height ?? window.innerHeight, window.innerHeight);
    same = h === prev ? same + 1 : 0;
    prev = h;
    measure();
    if (same >= 3 || performance.now() - t0 > SETTLE_MS) {
      done?.();
      return;
    }
    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function reveal(el: HTMLElement): void {
  if (root.classList.contains('is-vv-zoomed')) return;
  el.scrollIntoView({ block: 'nearest', inline: 'nearest' });
}

function bindViewport(): void {
  vv?.addEventListener('resize', schedule);
  vv?.addEventListener('scroll', schedule); // iOS: offsetTop cambia senza resize
  window.addEventListener('resize', schedule);
  window.addEventListener('orientationchange', () => settle());
  measure();
}

/* ----------------------------------------------------- blocco della pagina */
/* overflow:hidden da solo non ferma lo scroll su iOS: serve il body fisso con
   l'offset salvato. Lenis lo ferma `motion.ts`, in ascolto sugli eventi. */

let savedY = 0;

function lockPage(): void {
  savedY = window.scrollY;
  const s = document.body.style;
  s.position = 'fixed';
  s.top = `-${savedY}px`;
  s.left = '0';
  s.right = '0';
  s.width = '100%';
  root.classList.add('is-modal');
  window.dispatchEvent(new CustomEvent('vula:lock'));
}

function unlockPage(): void {
  const s = document.body.style;
  s.position = '';
  s.top = '';
  s.left = '';
  s.right = '';
  s.width = '';
  root.classList.remove('is-modal');
  window.scrollTo(0, savedY);
  window.dispatchEvent(new CustomEvent('vula:unlock', { detail: { y: savedY } }));
}

/* ------------------------------------------------------------------ invio */

type SendOutcome = { ok: true } | { ok: false; message: string; field?: string };

async function postToFormspree(
  endpoint: string,
  form: HTMLFormElement,
  t: Strings,
  signal: AbortSignal
): Promise<SendOutcome> {
  let res: Response;
  try {
    res = await fetch(endpoint, {
      method: 'POST',
      body: new FormData(form),
      signal,
      // L'unico header necessario. Senza, Formspree risponde 302 verso la
      // propria pagina "thanks" e al posto del JSON arriva dell'HTML.
      // Niente Content-Type: lo scrive il browser col boundary multipart.
      headers: { Accept: 'application/json' },
      // Tripwire: se qualcuno toglie l'header, il 302 fa fallire la fetch in
      // modo rumoroso invece di restituire in silenzio l'HTML del "grazie".
      redirect: 'error',
    });
  } catch {
    return { ok: false, message: t.errorLine };
  }

  // 429 copre sia il rate limit per form sia la quota mensile dell'account.
  if (res.status === 429) return { ok: false, message: t.rateLimited };

  let data: unknown = null;
  try {
    data = await res.json();
  } catch {
    // Su un 5xx dell'edge il body può essere HTML: json() lancia.
    return { ok: false, message: t.errorLine };
  }

  const body = data as { next?: string; error?: string; errors?: { message: string; field?: string }[] };

  // L'esito si legge dalla FORMA del body, non dallo status: è quello che fa
  // anche il client ufficiale di Formspree.
  if (Array.isArray(body.errors) && body.errors.length) {
    const first = body.errors[0];
    return { ok: false, message: t.errorLine, field: first.field };
  }
  if (typeof body.error === 'string') return { ok: false, message: t.errorLine };
  if (res.ok && typeof body.next === 'string') return { ok: true };

  return { ok: false, message: t.errorLine };
}

/* ------------------------------------------------------------- il pannello */

export function initMeets(): void {
  const section = document.querySelector<HTMLElement>('[data-meets]');
  const found = document.querySelector<HTMLDialogElement>('[data-meets-dialog]');
  if (!section || !found) return;
  // Const non nullabile: le funzioni qui sotto sono dichiarazioni, e la
  // restrizione di tipo della guardia non le raggiungerebbe.
  const dialog: HTMLDialogElement = found;

  // Senza <dialog> nativo le porte restano i link veri che sono già:
  // portano alla pagina contatto invece di aprire un pannello rotto.
  if (typeof dialog.showModal !== 'function') return;

  const cfg = dialog.querySelector<HTMLScriptElement>('[data-vm-i18n]');
  if (!cfg?.textContent) return;
  const t = JSON.parse(cfg.textContent) as Strings;

  const titleEl = dialog.querySelector<HTMLElement>('[data-vm-title]');
  const countEl = dialog.querySelector<HTMLElement>('[data-vm-count]');
  const barEl = dialog.querySelector<HTMLElement>('[data-vm-bar]');
  const liveEl = dialog.querySelector<HTMLElement>('[data-vm-live]');
  const backBtn = dialog.querySelector<HTMLButtonElement>('[data-vm-back]');
  const nextBtn = dialog.querySelector<HTMLButtonElement>('[data-vm-next]');
  const hintEl = dialog.querySelector<HTMLElement>('[data-vm-hint]');
  const footEl = dialog.querySelector<HTMLElement>('[data-vm-foot]');
  const doneEl = dialog.querySelector<HTMLElement>('[data-vm-done]');
  const doneTitle = dialog.querySelector<HTMLElement>('[data-vm-done-title]');
  const statusEl = dialog.querySelector<HTMLElement>('[data-vm-status]');
  const fallbackEl = dialog.querySelector<HTMLAnchorElement>('[data-vm-fallback]');

  const forms = Array.from(dialog.querySelectorAll<HTMLFormElement>('[data-vm-form]'));

  let form: HTMLFormElement | null = null;
  let steps: HTMLElement[] = [];
  let idx = 0;
  let opener: HTMLElement | null = null;
  let sending = false;
  let liveTimer: number | undefined;
  let inFlight: AbortController | null = null;

  const controlOf = (step: HTMLElement): Field | null =>
    step.querySelector<Field>('input:not([type="checkbox"]), select, textarea') ??
    step.querySelector<HTMLInputElement>('input[type="checkbox"]');

  /** I passi con showIf compaiono solo se il campo citato ha uno dei valori. */
  const isApplicable = (step: HTMLElement): boolean => {
    const dep = step.dataset.showIfField;
    if (!dep || !form) return true;
    const want = (step.dataset.showIfValues || '').split('|');
    const el = form.querySelector<Field>(`[name="${dep}"]`);
    return !!el && want.includes(el.value);
  };

  const applicable = (): HTMLElement[] => steps.filter(isApplicable);

  function paint(): void {
    const list = applicable();
    const pos = list.indexOf(steps[idx]);
    const n = pos + 1;
    const total = list.length;
    if (countEl) countEl.textContent = t.step.replace('{n}', String(n)).replace('{total}', String(total));
    // Solo transform: mai width, che costerebbe un reflow per frame.
    if (barEl) barEl.style.transform = `scaleX(${total ? n / total : 0})`;
    // `disabled` toglierebbe il fuoco al pulsante e lo lascerebbe cadere su
    // <body>: chi naviga da tastiera ripartirebbe dall'inizio della pagina.
    if (backBtn) backBtn.setAttribute('aria-disabled', pos <= 0 ? 'true' : 'false');
    const last = pos === total - 1;
    if (nextBtn) nextBtn.textContent = last ? t.send : t.next;
    // Dentro una textarea Invio va a capo: l'invito a premere Invio mentirebbe.
    const ctl = controlOf(steps[idx]);
    if (hintEl) hintEl.hidden = !ctl || ctl.tagName === 'TEXTAREA';
  }

  function announce(text: string): void {
    if (!liveEl) return;
    window.clearTimeout(liveTimer);
    // Dopo lo spostamento del fuoco, altrimenti i due annunci si accavallano.
    liveTimer = window.setTimeout(() => {
      liveEl.textContent = text;
    }, 140);
  }

  function clearError(step: HTMLElement): void {
    const ctl = controlOf(step);
    const err = step.querySelector<HTMLElement>('[data-vm-err]');
    ctl?.removeAttribute('aria-invalid');
    if (err) {
      err.textContent = '';
      err.hidden = true;
    }
  }

  function showError(step: HTMLElement, message: string, focused: boolean): void {
    const ctl = controlOf(step);
    const err = step.querySelector<HTMLElement>('[data-vm-err]');
    if (err) {
      err.textContent = message;
      err.hidden = false;
    }
    ctl?.setAttribute('aria-invalid', 'true');
    // Un solo canale: se il campo è già a fuoco lo dice la live region,
    // altrimenti lo legge aria-describedby quando ci porto il fuoco.
    if (focused) announce(message);
    else ctl?.focus({ preventScroll: true });
  }

  function validate(step: HTMLElement): string | null {
    if (step.dataset.required !== 'true') return null;
    const boxes = step.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
    if (boxes.length) {
      return Array.from(boxes).some((b) => b.checked) ? null : t.required;
    }
    const ctl = controlOf(step);
    if (!ctl) return null;
    if (!ctl.value.trim()) return t.required;
    if (ctl instanceof HTMLInputElement && ctl.type === 'email' && !ctl.checkValidity()) {
      return t.invalidEmail;
    }
    return null;
  }

  /** Sincrono dentro il gesto utente: fuori, iOS assegna il fuoco ma non apre
      la tastiera. */
  function go(target: number, announceStep = true): void {
    idx = target;
    steps.forEach((s, i) => {
      s.hidden = i !== target;
    });
    paint();
    const ctl = controlOf(steps[target]);
    ctl?.focus({ preventScroll: true });
    settle(() => {
      if (ctl) reveal(ctl);
    });
    if (announceStep && countEl) announce(countEl.textContent || '');
  }

  function step(delta: number): void {
    const list = applicable();
    const pos = list.indexOf(steps[idx]);
    const nextStep = list[pos + delta];
    if (!nextStep) return;
    go(steps.indexOf(nextStep));
  }

  function setStatus(message: string, showFallback: boolean): void {
    if (statusEl) {
      statusEl.textContent = message;
      statusEl.hidden = !message;
    }
    if (fallbackEl) fallbackEl.hidden = !showFallback;
    if (message) announce(message);
  }

  /** Se il recapito email non è configurato non si finge che funzioni: si
      dichiara, e si offre WhatsApp con le risposte già scritte. */
  function whatsappHref(): string | null {
    if (!form) return null;
    const number = dialog.dataset.wa;
    if (!number) return null;
    const parts = [dialog.dataset.waIntro || ''];
    const title = titleEl?.textContent?.trim();
    if (title) parts.push(`— ${title} —`);
    steps.forEach((s) => {
      if (!isApplicable(s)) return;
      const label = s.dataset.label || '';
      const boxes = s.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:checked');
      if (boxes.length) {
        parts.push(`${label}: ${Array.from(boxes).map((b) => b.value).join(', ')}`);
        return;
      }
      const ctl = controlOf(s);
      const value = ctl?.value.trim();
      if (value) parts.push(`${label}: ${value}`);
    });
    return `https://wa.me/${number}?text=${encodeURIComponent(parts.join('\n'))}`;
  }

  function succeed(): void {
    if (!doneEl || !form) return;
    // Prima si mostra la conferma e ci si porta il fuoco, poi si nasconde il
    // form: al contrario il fuoco cadrebbe su <body>.
    doneEl.hidden = false;
    if (footEl) footEl.hidden = true;
    doneTitle?.focus({ preventScroll: true });
    form.hidden = true;
    // Lo annuncia il fuoco sul titolo: ripeterlo lo farebbe sentire due volte.
    if (liveEl) liveEl.textContent = '';
  }

  async function send(): Promise<void> {
    if (!form || sending) return;
    const endpoint = form.dataset.endpoint || '';

    if (!endpoint) {
      setStatus(t.notConfigured, true);
      if (fallbackEl) {
        const href = whatsappHref();
        if (href) fallbackEl.href = href;
        else fallbackEl.hidden = true;
      }
      return;
    }

    sending = true;
    inFlight = new AbortController();
    const controller = inFlight;
    if (nextBtn) {
      nextBtn.setAttribute('aria-disabled', 'true');
      nextBtn.textContent = t.sending;
    }
    form.setAttribute('aria-busy', 'true');
    setStatus('', false);
    announce(t.sending);

    const outcome = await postToFormspree(endpoint, form, t, controller.signal);

    // Il pannello può essere stato chiuso mentre la richiesta era in volo: in
    // quel caso `close` ha già rimesso tutto a posto e qui non si tocca nulla,
    // altrimenti alla riapertura si troverebbe «Po dërgohet…» per sempre.
    if (controller.signal.aborted) return;

    inFlight = null;
    sending = false;
    form.removeAttribute('aria-busy');
    if (nextBtn) nextBtn.setAttribute('aria-disabled', 'false');
    paint();

    if (outcome.ok) {
      succeed();
      return;
    }

    // Errore su un campo preciso: si riporta l'utente lì.
    if (outcome.field) {
      const owner = steps.find((s) => s.dataset.name === outcome.field);
      if (owner) {
        go(steps.indexOf(owner), false);
        showError(owner, outcome.message, true);
        return;
      }
    }
    setStatus(outcome.message, true);
    if (fallbackEl) {
      const href = whatsappHref();
      if (href) fallbackEl.href = href;
      else fallbackEl.hidden = true;
    }
  }

  /* ------------------------------------------------------------- apertura */

  function open(key: string, from: HTMLElement, title: string): void {
    form = forms.find((f) => f.dataset.vmForm === key) ?? null;
    if (!form) return;

    opener = from;
    // Stato pulito a ogni apertura: un invio interrotto non deve lasciare il
    // pannello bloccato sul suo pulsante.
    sending = false;
    inFlight = null;
    if (nextBtn) nextBtn.setAttribute('aria-disabled', 'false');
    form.removeAttribute('aria-busy');
    forms.forEach((f) => {
      f.hidden = f !== form;
    });
    steps = Array.from(form.querySelectorAll<HTMLElement>('[data-vm-step]'));
    steps.forEach(clearError);
    if (titleEl) titleEl.textContent = title;
    if (doneEl) doneEl.hidden = true;
    if (footEl) footEl.hidden = false;
    if (nextBtn) nextBtn.setAttribute('form', form.id);
    setStatus('', false);
    if (liveEl) liveEl.textContent = '';

    // Il menu mobile resterebbe aperto dietro al velo: incoerente.
    document.querySelectorAll<HTMLDetailsElement>('details[open]').forEach((d) => {
      d.open = false;
    });

    // Lenis va fermato prima del blocco, il blocco prima del fuoco.
    lockPage();
    dialog.showModal();
    go(0);
  }

  // Tutta la pulizia sta sull'evento `close`, non sul pulsante X: Esc chiude
  // scavalcando il pulsante e passa comunque da qui.
  dialog.addEventListener('close', () => {
    // Una richiesta ancora in volo va fermata: il suo esito arriverebbe su un
    // pannello chiuso e mostrerebbe una conferma che nessuno sta guardando.
    inFlight?.abort();
    inFlight = null;
    sending = false;

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      unlockPage();
      // Il ripristino nativo non è affidabile se l'apritore non era mai stato
      // a fuoco: rifarlo sullo stesso elemento è innocuo.
      opener?.focus({ preventScroll: true });
      opener = null;
    };

    // Senza tastiera aperta non c'è niente da aspettare.
    if (!root.classList.contains('is-keyboard')) {
      finish();
      return;
    }

    // Sbloccare con la tastiera ancora aperta riporterebbe la pagina alla Y
    // sbagliata: si aspetta che si sia richiusa.
    const t0 = performance.now();
    const wait = () => {
      if (done) return;
      if (!root.classList.contains('is-keyboard') || performance.now() - t0 > CLOSE_MS) {
        finish();
        return;
      }
      requestAnimationFrame(wait);
    };
    requestAnimationFrame(wait);
    // In una scheda in secondo piano requestAnimationFrame non scatta: senza
    // questa rete la pagina resterebbe bloccata.
    window.setTimeout(finish, CLOSE_MS + 50);
  });

  /* -------------------------------------------------------------- ascolti */

  section.querySelectorAll<HTMLAnchorElement>('[data-meets-open]').forEach((node) => {
    node.setAttribute('aria-haspopup', 'dialog');
    node.addEventListener('click', (e) => {
      e.preventDefault();
      open(node.dataset.door || '', e.currentTarget as HTMLElement, node.dataset.doorTitle || '');
    });
  });

  dialog.querySelectorAll<HTMLElement>('[data-vm-close]').forEach((node) => {
    node.addEventListener('click', () => dialog.close());
  });

  backBtn?.addEventListener('click', () => {
    if (backBtn.getAttribute('aria-disabled') === 'true') return;
    step(-1);
  });

  // L'href non può essere fissato quando compare l'errore: i campi restano
  // modificabili, e chi corregge il telefono e poi clicca qui manderebbe la
  // versione vecchia. Si ricalcola al click — l'azione predefinita del link
  // legge l'attributo dopo che i gestori hanno girato.
  fallbackEl?.addEventListener('click', (e) => {
    const href = whatsappHref();
    if (href) fallbackEl.href = href;
    else e.preventDefault();
  });

  forms.forEach((f) => {
    f.addEventListener('submit', (e) => {
      // Mai lasciar passare il submit nativo: al primo campo partirebbe
      // l'invio con il questionario a metà.
      e.preventDefault();
      if (sending) return;
      const current = steps[idx];
      const problem = validate(current);
      if (problem) {
        const ctl = controlOf(current);
        showError(current, problem, document.activeElement === ctl);
        return;
      }
      clearError(current);
      const list = applicable();
      if (list.indexOf(current) === list.length - 1) void send();
      else step(1);
    });

    // Un campo che torna valido si ripulisce da solo.
    f.addEventListener('input', (e) => {
      const el = e.target as HTMLElement;
      const s = el.closest<HTMLElement>('[data-vm-step]');
      if (s && !validate(s)) clearError(s);

      // Il limite di caratteri va mostrato mentre si scrive: troncare in
      // silenzio a fine campo è peggio che dirlo prima.
      if (s && el instanceof HTMLTextAreaElement && el.maxLength > 0) {
        const out = s.querySelector<HTMLElement>('[data-vm-chars]');
        if (out) {
          out.textContent = t.charsLeft.replace('{n}', String(el.maxLength - el.value.length));
          out.hidden = false;
        }
      }
    });

    // Un select che pilota un passo condizionale cambia il totale.
    f.addEventListener('change', () => paint());
  });

  bindViewport();
  document.addEventListener(
    'focusin',
    (e) => {
      if (!dialog.open || !isTextInput(e.target as Element)) return;
      settle(() => reveal(e.target as HTMLElement));
    },
    true
  );
  document.addEventListener(
    'focusout',
    () => {
      if (!dialog.open) return;
      settle();
      window.setTimeout(measure, 350);
    },
    true
  );
}
