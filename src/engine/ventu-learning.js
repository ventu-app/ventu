/*! ventu-learning.js v1.0 — camada pedagógica do Ventu
 *  Carregar ANTES do game.js:  <script src="ventu-learning.js"></script>
 *  Expõe window.VentuLearn. Funciona sem backend (usa VentuStorage ou localStorage).
 *  Também é testável em Node (module.exports no final do arquivo).
 */
(function (root) {
  'use strict';
  const hasDOM = typeof document !== 'undefined';
  const DAY = 86400000;

  const config = {
    fuzzyMin: 0.82,        // similaridade mínima para aceitar erro de digitação
    maxErrors: 200,        // tamanho máximo do caderno de erros
    legacyIndexFallback: false
  };

  /* ================= storage (camada de abstração: troque por backend aqui) ================= */
  const mem = {};
  const store = {
    get(k) {
      try {
        if (root.VentuStorage) return root.VentuStorage.get('learn_' + k);
        const raw = root.localStorage.getItem('ventu_learn_' + k);
        return raw ? JSON.parse(raw) : null;
      } catch (e) { return mem[k] === undefined ? null : mem[k]; }
    },
    set(k, v) {
      try {
        if (root.VentuStorage) return root.VentuStorage.set('learn_' + k, v);
        root.localStorage.setItem('ventu_learn_' + k, JSON.stringify(v));
      } catch (e) { mem[k] = v; }
    }
  };

  /* ================= utilidades de texto ================= */
  function normalize(s) {
    return String(s == null ? '' : s).toLowerCase()
      .replace(/[\u2018\u2019\u02bc`´]/g, "'")
      .replace(/[^\p{L}\p{N}'\s]/gu, ' ')
      .replace(/\s+/g, ' ').trim();
  }
  const squash = s => normalize(s).replace(/'/g, '');
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const stripTags = s => String(s == null ? '' : s).replace(/<[^>]*>/g, '');
  const escapeRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pct = (a, b) => (b ? Math.round((100 * a) / b) : 0);

  function levenshtein(a, b) {
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      const cur = [i];
      for (let j = 1; j <= b.length; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
      prev = cur;
    }
    return prev[b.length];
  }
  function similarity(a, b) {
    a = squash(a); b = squash(b);
    if (!a && !b) return 1;
    return 1 - levenshtein(a, b) / Math.max(a.length, b.length);
  }
  function testRe(re, text) {
    if (typeof re === 'string') re = new RegExp(re, 'i');
    if (!(re instanceof RegExp)) return false;
    re.lastIndex = 0;              // evita bug de regex com flag g
    const r = re.test(text);
    re.lastIndex = 0;
    return r;
  }

  /* ================= matching de intents (corrige o bug do qrIndex) ================= */
  const replyMapCache = new WeakMap();
  const replyText = q => (typeof q === 'string' ? q : q.text);

  // Para cada botão: a qual intent ele pertence. Prioridade: q.intent (id explícito) > regex.
  function buildReplyMap(scene) {
    if (replyMapCache.has(scene)) return replyMapCache.get(scene);
    const intents = scene.intents || [];
    const map = (scene.quickReplies || []).map((q, qi) => {
      const text = replyText(q);
      const matches = [];
      intents.forEach((it, i) => { if (it.match && (testRe(it.match, text) || testRe(it.match, normalize(text)))) matches.push(i); });
      let intentIndex = -1, explicit = false;
      if (typeof q === 'object' && q.intent != null) {
        const k = intents.findIndex(it => it.id === q.intent);
        if (k >= 0) { intentIndex = k; explicit = true; }
      }
      if (intentIndex < 0 && matches.length) intentIndex = matches[0];
      return { text, label: typeof q === 'string' ? q : q.label, qi, intentIndex, explicit, matches };
    });
    replyMapCache.set(scene, map);
    return map;
  }

  function qualityOf(intent) {
    if (!intent) return 'ok';
    if (intent.quality) return intent.quality;                 // 'ideal' | 'ok' | 'awkward' | 'bad'
    const fx = intent.fx || {};
    const score = (fx.trust || 0) + (fx.rizz || 0);
    return score > 0 ? 'ideal' : score < 0 ? 'awkward' : 'ok';
  }
  const QSCORE = { ideal: 2, ok: 1, awkward: 0, bad: -1 };

  function matchIntent(scene, text) {
    const intents = (scene && scene.intents) || [];
    const none = { intent: null, index: -1, kind: null, similarity: 0, suggestion: null };
    if (!intents.length) return none;
    const nt = normalize(text);
    const map = buildReplyMap(scene);
    const hit = (index, kind, extra) => Object.assign({ intent: intents[index], index, kind, similarity: 1, suggestion: null }, extra);

    // 1) botão com intent explícito
    const btn = map.find(r => r.explicit && normalize(r.text) === nt);
    if (btn) return hit(btn.intentIndex, 'button');
    // 2) regex (a regra de negócio é sempre o texto)
    for (let i = 0; i < intents.length; i++) {
      const m = intents[i].match;
      if (m && (testRe(m, text) || testRe(m, nt))) return hit(i, 'regex');
    }
    // 3) tolerância a erro de digitação
    const cands = [];
    map.forEach(r => { if (r.intentIndex >= 0) cands.push({ idx: r.intentIndex, phrase: r.text }); });
    intents.forEach((it, i) => (it.examples || []).forEach(p => cands.push({ idx: i, phrase: p })));
    let best = null;
    cands.forEach(c => { const s = similarity(text, c.phrase); if (!best || s > best.s) best = { s, ...c }; });
    if (best && best.s >= config.fuzzyMin) return hit(best.idx, 'fuzzy', { similarity: best.s, suggestion: best.phrase });
    return none;
  }

  // Melhor resposta da cena (para dicas, caderno de erros e cartas de produção)
  function bestAnswer(scene) {
    const intents = (scene && scene.intents) || [];
    if (!intents.length) return { intentIndex: -1, phrase: null };
    const map = buildReplyMap(scene);
    const phraseOf = i => {
      const r = map.find(x => x.intentIndex === i);
      return r ? r.text : (intents[i].examples && intents[i].examples[0]) || null;
    };
    // prioridade: tem frase utilizável > qualidade > soma de efeitos (trust + rizz)
    let bi = 0, bs = -Infinity;
    intents.forEach((it, i) => {
      const fx = it.fx || {};
      const s = (phraseOf(i) ? 1000 : 0) + QSCORE[qualityOf(it)] * 100 + (fx.trust || 0) + (fx.rizz || 0);
      if (s > bs) { bs = s; bi = i; }
    });
    return { intentIndex: bi, phrase: phraseOf(bi) };
  }

  /* ================= dicas progressivas ================= */
  const HINT_COSTS = [5, 10, 20];
  const TAG_LABELS = { grammar: 'Gramática', vocab: 'Vocabulário', register: 'Registro e tom', politeness: 'Educação e cortesia', pronunciation: 'Pronúncia', geral: 'Geral' };
  const tagLabel = t => TAG_LABELS[t] || t || 'Geral';

  function hintFor(scene, level) {
    if (scene.hints && scene.hints[level - 1]) return scene.hints[level - 1];
    const best = bestAnswer(scene).phrase;
    if (level === 1) return scene.tag ? `Foque em: ${tagLabel(scene.tag)}. O que o NPC quer saber ou espera de você?` : 'Releia a última fala do NPC: o que ele quer saber ou espera de você?';
    if (level === 2) return best ? `Comece com: “${best.split(/\s+/).slice(0, 2).join(' ')} …”` : 'Use uma frase curta, educada e que reaproveite palavras da fala do NPC.';
    return best ? `Resposta modelo: “${best}”` : 'Responda com uma frase curta, direta e educada.';
  }

  /* ================= validador de conteúdo (rode com ?debug=1) ================= */
  function validate(gameData, opts) {
    const out = [];
    const add = (level, sceneId, msg) => out.push({ level, sceneId, msg });
    const scenes = gameData.scenes || {};
    const refs = new Set([gameData.startScene]);
    Object.keys(scenes).forEach(id => {
      const sc = scenes[id];
      if (sc.nextScene) { refs.add(sc.nextScene); if (!scenes[sc.nextScene]) add('erro', id, `nextScene "${sc.nextScene}" não existe`); }
      if (sc.offensiveScene) { refs.add(sc.offensiveScene); if (!scenes[sc.offensiveScene]) add('erro', id, `offensiveScene "${sc.offensiveScene}" não existe`); }
      const intents = sc.intents || [];
      if (intents.length && !sc.fallback) add('aviso', id, 'tem intents mas não tem fallback');
      intents.forEach((it, i) => {
        if (!it.match) add('aviso', id, `intent #${i} (${it.id || 'sem id'}) sem regex "match"`);
        if (it.nextScene) { refs.add(it.nextScene); if (!scenes[it.nextScene]) add('erro', id, `intent #${i} aponta para cena inexistente "${it.nextScene}"`); }
        if (!it.fx && !it.nextScene && !it.response) add('aviso', id, `intent #${i} não tem efeito, resposta nem próxima cena`);
        if (!it.lens && !it.explanation) add('info', id, `intent #${i} sem "lens"/"explanation" (perde feedback pedagógico)`);
      });
      buildReplyMap(sc).forEach(r => {
        if (r.intentIndex < 0) add('erro', id, `botão “${r.text}” não casa com NENHUMA intent (ajuste a regex ou use "intent": "id")`);
        else {
          if (r.matches.length > 1 && !r.explicit) add('aviso', id, `botão “${r.text}” casa com ${r.matches.length} intents [${r.matches.join(',')}]; vence a #${r.intentIndex}`);
          if (r.qi !== r.intentIndex) add('info', id, `botão #${r.qi} “${r.text}” pertence à intent #${r.intentIndex} (o motor antigo usaria a #${r.qi}: esse era o bug)`);
        }
      });
    });
    Object.keys(scenes).forEach(id => { if (!refs.has(id)) add('aviso', id, 'cena inalcançável (nenhuma intent aponta para ela)'); });
    if (opts && opts.print && typeof console !== 'undefined') {
      console.groupCollapsed(`[Ventu] validação: ${out.filter(o => o.level === 'erro').length} erros, ${out.filter(o => o.level === 'aviso').length} avisos`);
      console.table(out);
      console.groupEnd();
    }
    return out;
  }

  /* ================= deck + repetição espaçada (SM-2 simplificado) ================= */
  const cardsAll = () => store.get('cards') || {};
  const slug = s => normalize(s).replace(/\s+/g, '-').slice(0, 80);

  function sm2(card, q, now) {
    now = now || Date.now();
    const c = Object.assign({}, card);
    if (q < 3) {                                  // errou: volta em 10 min
      c.reps = 0; c.interval = 0; c.lapses = (c.lapses || 0) + 1;
      c.due = now + 10 * 60 * 1000;
    } else {
      c.reps = (c.reps || 0) + 1;
      c.interval = c.reps === 1 ? 1 : c.reps === 2 ? 6 : Math.round(Math.max(1, c.interval) * c.ease);
      c.ease = Math.max(1.3, c.ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
      const d = new Date(now); d.setHours(0, 0, 0, 0);
      c.due = d.getTime() + c.interval * DAY;
    }
    c.last = now;
    return c;
  }
  function addCard({ type = 'vocab', front, back, ctx = '', source = '' }) {
    if (!front || !back) return null;
    const all = cardsAll();
    const id = type + ':' + slug(front + '|' + back);
    if (all[id]) return all[id];
    const c = { id, type, front, back, ctx, source, ease: 2.5, interval: 0, reps: 0, lapses: 0, due: Date.now(), added: Date.now() };
    all[id] = c; store.set('cards', all); refreshBadge();
    return Object.assign({ isNew: true }, c);
  }
  function getDue(now, limit) {
    now = now || Date.now();
    return Object.values(cardsAll()).filter(c => c.due <= now).sort((a, b) => a.due - b.due).slice(0, limit || 20);
  }
  function reviewCard(id, q) {
    const all = cardsAll();
    if (!all[id]) return null;
    all[id] = sm2(all[id], q); store.set('cards', all); refreshBadge();
    return all[id];
  }
  function cardStats() {
    const list = Object.values(cardsAll());
    return { total: list.length, due: list.filter(c => c.due <= Date.now()).length, mature: list.filter(c => c.interval >= 21).length };
  }

  /* ================= caderno de erros + habilidades ================= */
  function logError(e) {
    const list = store.get('errors') || [];
    list.push(Object.assign({}, e, { t: Date.now() }));
    store.set('errors', list.slice(-config.maxErrors));
  }
  function topTags(n) {
    const c = {};
    (store.get('errors') || []).forEach(e => { const t = e.tag || 'geral'; c[t] = (c[t] || 0) + 1; });
    return Object.keys(c).map(tag => ({ tag, count: c[tag] })).sort((a, b) => b.count - a.count).slice(0, n || 5);
  }
  const recentErrors = n => (store.get('errors') || []).slice(-(n || 8)).reverse();

  function recordResult(r) {
    const s = store.get('skills') || { scenes: 0, firstTry: 0, matched: 0, ideal: 0, assisted: 0, hints: 0 };
    s.scenes++; s.matched++;
    if (r.firstTry) s.firstTry++;
    if (r.quality === 'ideal') s.ideal++;
    if (r.assisted) s.assisted++;
    s.hints += r.hintLevel || 0;
    store.set('skills', s);
  }
  function skillReport(src) {
    const s = src || store.get('skills');
    if (!s || !s.scenes) return null;
    return { accuracy: pct(s.firstTry, s.scenes), naturalness: pct(s.ideal, s.matched || s.scenes), autonomy: 100 - pct(s.assisted, s.scenes), scenes: s.scenes };
  }

  /* ================= configurações ================= */
  const DEFAULTS = { sound: true, tts: false, accent: 'en-US', rate: 0.95, typewriter: true, reduceMotion: false, soft: false, autoCapture: true, voiceAutoSend: false };
  let settingsCache = null;
  const settings = {
    all() { if (!settingsCache) settingsCache = Object.assign({}, DEFAULTS, store.get('settings') || {}); return settingsCache; },
    get(k) { return settings.all()[k]; },
    set(k, v) { const s = settings.all(); s[k] = v; store.set('settings', s); }
  };
  function reducedMotion() {
    if (settings.get('reduceMotion')) return true;
    try { return !!(root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) { return false; }
  }

  /* ================= voz: TTS, STT e pronúncia ================= */
  const speechSupport = () => ({
    tts: !!(root.speechSynthesis && root.SpeechSynthesisUtterance),
    stt: !!(root.SpeechRecognition || root.webkitSpeechRecognition)
  });
  function pickVoice(lang) {
    const vs = root.speechSynthesis.getVoices() || [];
    return vs.find(v => v.lang.replace('_', '-') === lang) || vs.find(v => v.lang.slice(0, 2) === lang.slice(0, 2)) || null;
  }
  function speak(text, o) {
    if (!speechSupport().tts || !text) return;
    o = o || {};
    const clean = stripTags(text).replace(/\s+/g, ' ').trim();
    if (!clean) return;
    root.speechSynthesis.cancel();
    const u = new root.SpeechSynthesisUtterance(clean);
    u.lang = o.accent || settings.get('accent');
    u.rate = o.rate || settings.get('rate');
    const v = pickVoice(u.lang); if (v) u.voice = v;
    root.speechSynthesis.speak(u);
  }
  function listen(o) {
    o = o || {};
    return new Promise((resolve, reject) => {
      const SR = root.SpeechRecognition || root.webkitSpeechRecognition;
      if (!SR) return reject(new Error('reconhecimento de voz não suportado neste navegador'));
      const r = new SR();
      r.lang = o.lang || 'en-US'; r.maxAlternatives = 3; r.interimResults = false;
      r.onresult = e => {
        const alts = Array.from(e.results[0]).map(a => a.transcript);
        resolve({ transcript: alts[0], confidence: e.results[0][0].confidence, alternatives: alts });
      };
      r.onerror = e => reject(new Error(e.error || 'erro'));
      r.onnomatch = () => reject(new Error('não entendi'));
      r.start();
    });
  }
  // Compara palavra a palavra (ignora ordem) — simples, mas suficiente para shadowing
  function pronunciationScore(target, said) {
    const tw = normalize(target).split(' ').filter(Boolean);
    const sw = normalize(said).split(' ').filter(Boolean);
    const words = tw.map(w => ({ w, ok: sw.some(x => x === w || similarity(x, w) >= 0.8) }));
    return { score: pct(words.filter(x => x.ok).length, words.length), words };
  }

  /* ================= vocabulário clicável nas falas ================= */
  function decorate(el, glossary) {
    if (!hasDOM || !el || !glossary || !glossary.length) return;
    const entries = glossary.filter(g => g && g.word);
    if (!entries.length) return;
    el._vocab = new Map(entries.map(g => [normalize(g.word), g]));
    const alt = entries.map(g => g.word).sort((a, b) => b.length - a.length).map(escapeRe).join('|');
    const re = new RegExp('(^|[^\\p{L}\\p{N}])(' + alt + ')(?![\\p{L}\\p{N}])', 'giu');
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const txt = node.nodeValue; let last = 0, found = false;
      const frag = document.createDocumentFragment();
      for (const m of txt.matchAll(re)) {
        const start = m.index + m[1].length; found = true;
        frag.append(txt.slice(last, start));
        const s = document.createElement('span');
        s.className = 'vocab-word'; s.tabIndex = 0; s.setAttribute('role', 'button');
        s.title = 'Toque para ver o significado'; s.textContent = m[2];
        frag.append(s); last = start + m[2].length;
      }
      if (found) { frag.append(txt.slice(last)); node.replaceWith(frag); }
    });
  }
  let popover = null;
  function closePopover() { if (popover) { popover.remove(); popover = null; } }
  function openVocabPopover(span) {
    const bubble = span.closest('.msg-bubble');
    const entry = bubble && bubble._vocab && bubble._vocab.get(normalize(span.textContent));
    if (!entry) return;
    closePopover();
    popover = el('div', 'vl-pop');
    popover.innerHTML = `<strong>${esc(entry.word)}</strong><div>${entry.meaning}</div>
      <div class="vl-pop-actions"><button data-a="say">🔊 Ouvir</button><button data-a="save">➕ Salvar no deck</button></div>`;
    document.body.append(popover);
    const r = span.getBoundingClientRect();
    popover.style.left = Math.max(8, Math.min(r.left, innerWidth - 240)) + 'px';
    popover.style.top = Math.min(innerHeight - 120, r.bottom + 6) + 'px';
    popover.addEventListener('click', ev => {
      const a = ev.target.dataset.a;
      if (a === 'say') speak(entry.word, { accent: settings.get('accent') });
      if (a === 'save') {
        const c = addCard({ type: 'vocab', front: entry.word, back: stripTags(entry.meaning), ctx: bubble.textContent, source: 'tap' });
        ev.target.textContent = c && c.isNew ? '✔ Salvo' : '✔ Já está no deck'; ev.target.disabled = true;
      }
    });
  }
  if (hasDOM) {
    document.addEventListener('click', e => {
      const w = e.target.closest && e.target.closest('.vocab-word');
      if (w) { e.stopPropagation(); openVocabPopover(w); } else if (popover && !e.target.closest('.vl-pop')) closePopover();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closePopover();
      if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('vocab-word')) { e.preventDefault(); openVocabPopover(e.target); }
    });
  }

  /* ================= UI: helpers, modais, toolbar ================= */
  function el(tag, cls, html) { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; }
  function toast(msg) {
    if (!hasDOM) return;
    const t = el('div', 'vl-toast', esc(msg)); t.setAttribute('role', 'status');
    document.body.append(t); setTimeout(() => t.remove(), 3200);
  }
  function openModal(title, o) {
    injectStyles();
    o = o || {};
    const prev = document.activeElement;
    const wrap = el('div', 'vl-modal'); wrap.setAttribute('role', 'dialog'); wrap.setAttribute('aria-modal', 'true'); wrap.setAttribute('aria-label', title);
    const card = el('div', 'vl-card');
    const head = el('div', 'vl-head', `<h3>${esc(title)}</h3>`);
    const x = el('button', 'vl-x', '✕'); x.setAttribute('aria-label', 'Fechar');
    head.append(x);
    const body = el('div', 'vl-body');
    card.append(head, body); wrap.append(card); document.body.append(wrap);
    function close() { wrap.remove(); document.removeEventListener('keydown', onKey); if (prev && prev.focus) prev.focus(); if (o.onClose) o.onClose(); }
    function onKey(e) { if (e.key === 'Escape') close(); }
    x.addEventListener('click', close);
    wrap.addEventListener('click', e => { if (e.target === wrap) close(); });
    document.addEventListener('keydown', onKey);
    x.focus();
    return { close, body };
  }

  function nextLabel(card, q) {
    const c = sm2(card, q);
    return c.interval === 0 ? '10 min' : c.interval + ' d';
  }
  function openReview() {
    const queue = getDue(Date.now(), 15);
    let i = 0, hits = 0;
    const m = openModal('🧠 Revisão espaçada');
    function draw() {
      const body = m.body; body.innerHTML = '';
      if (!queue.length) { body.innerHTML = '<p class="vl-muted">Nada para revisar agora. Toque em palavras destacadas nas falas ou cometa erros: eles viram cartas automaticamente ✨</p>'; return; }
      if (i >= queue.length) {
        const xp = queue.length * 2;
        try { root.VentuProgress && root.VentuProgress.addXP && root.VentuProgress.addXP(xp); } catch (e) { /* opcional */ }
        body.innerHTML = `<p><strong>Revisão concluída!</strong></p><p class="vl-muted">${hits}/${queue.length} lembradas · +${xp} XP</p>`;
        const b = el('button', 'vl-btn', 'Fechar'); b.onclick = m.close; body.append(b); return;
      }
      const c = queue[i];
      body.append(el('div', 'vl-progress', `${i + 1}/${queue.length} · ${c.type === 'phrase' ? 'Frase' : 'Vocabulário'}`));
      body.append(el('div', 'vl-flash-front', esc(c.front)));
      const back = el('div', 'vl-flash-back', `<strong>${esc(c.back)}</strong>${c.ctx ? `<small>${esc(c.ctx).slice(0, 160)}</small>` : ''}`);
      back.hidden = true;
      const result = el('div', 'vl-muted');
      const actions = el('div', 'vl-actions');
      const target = c.type === 'phrase' ? c.back : c.front;
      const say = el('button', 'vl-btn ghost', '🔊 Ouvir'); say.onclick = () => speak(target);
      actions.append(say);
      if (speechSupport().stt) {
        const sh = el('button', 'vl-btn ghost', '🎤 Repetir');
        sh.onclick = async () => {
          sh.disabled = true; result.textContent = 'Ouvindo…';
          try {
            const r = await listen(); const p = pronunciationScore(target, r.transcript);
            result.innerHTML = `Você disse: “${esc(r.transcript)}” · <strong>${p.score}%</strong><br>` + p.words.map(w => `<span class="${w.ok ? 'vl-ok' : 'vl-bad'}">${esc(w.w)}</span>`).join(' ');
          } catch (e) { result.textContent = 'Não consegui ouvir (' + e.message + ').'; }
          sh.disabled = false;
        };
        actions.append(sh);
      }
      const reveal = el('button', 'vl-btn', 'Mostrar resposta');
      const rate = el('div', 'vl-rate'); rate.hidden = true;
      [['Errei', 1], ['Difícil', 3], ['Bom', 4], ['Fácil', 5]].forEach(([label, q]) => {
        const b = el('button', 'vl-btn r' + q, `${label}<small>${nextLabel(c, q)}</small>`);
        b.onclick = () => { reviewCard(c.id, q); if (q >= 3) hits++; i++; draw(); };
        rate.append(b);
      });
      reveal.onclick = () => { back.hidden = false; rate.hidden = false; reveal.hidden = true; if (settings.get('tts')) speak(target); };
      body.append(back, actions, result, reveal, rate);
    }
    draw();
  }

  function bar(label, v) {
    return `<div class="vl-bar"><span>${label}</span><div><i style="width:${v}%"></i></div><b>${v}%</b></div>`;
  }
  function openNotebook() {
    const m = openModal('📒 Habilidades e caderno de erros');
    const rep = skillReport(), st = cardStats(), tags = topTags(5), errs = recentErrors(8);
    let h = '';
    h += rep ? `<h4>Suas habilidades</h4>${bar('Precisão (acertos de 1ª)', rep.accuracy)}${bar('Naturalidade (respostas ideais)', rep.naturalness)}${bar('Autonomia (sem dica final)', rep.autonomy)}`
             : '<p class="vl-muted">Complete algumas cenas para ver seu painel de habilidades.</p>';
    h += `<h4>Deck</h4><p class="vl-muted">${st.total} cartas · ${st.due} para revisar · ${st.mature} consolidadas</p>`;
    if (tags.length) h += '<h4>Onde você mais erra</h4>' + tags.map(t => `<span class="vl-chip">${esc(tagLabel(t.tag))} · ${t.count}</span>`).join(' ');
    if (errs.length) {
      h += '<h4>Últimos erros</h4><ul class="vl-errs">' + errs.map(e =>
        `<li><span class="vl-bad">${esc(e.said || '—')}</span>${e.expected ? ` → <span class="vl-ok">${esc(e.expected)}</span>` : ''}<small>${esc(e.type || '')}</small></li>`).join('') + '</ul>';
    }
    m.body.innerHTML = h;
    const go = el('button', 'vl-btn', `🧠 Revisar agora (${st.due})`);
    go.onclick = () => { m.close(); openReview(); };
    m.body.append(go);
  }

  function openSettings() {
    const m = openModal('⚙️ Ajustes'); const b = m.body; const sp = speechSupport();
    function toggle(key, label, extra) {
      const row = el('label', 'vl-row'); const cb = el('input'); cb.type = 'checkbox'; cb.checked = !!settings.get(key);
      cb.onchange = () => {
        if (key === 'soft' && !cb.checked && store.get('adult') !== 'ok') {
          cb.checked = true;
          confirmMature({ force: true }).then(r => { if (r === 'full') cb.checked = false; });
          return;
        }
        settings.set(key, cb.checked);
      };
      row.append(cb, document.createTextNode(' ' + label)); if (extra) row.append(el('small', '', extra)); b.append(row);
    }
    toggle('sound', 'Efeitos sonoros');
    toggle('typewriter', 'Efeito de digitação', 'Toque no chat para pular.');
    toggle('reduceMotion', 'Reduzir animações', 'Também respeita a preferência do sistema.');
    toggle('autoCapture', 'Salvar automaticamente erros e frases no deck');
    toggle('soft', 'Modo suave (conteúdo adulto atenuado)');
    if (sp.tts) {
      toggle('tts', 'Falas dos NPCs em voz alta');
      const r1 = el('label', 'vl-row', 'Sotaque ');
      const sel = el('select'); [['en-US', 'Americano'], ['en-GB', 'Britânico'], ['en-AU', 'Australiano']].forEach(([v, t]) => { const o = el('option', '', t); o.value = v; if (settings.get('accent') === v) o.selected = true; sel.append(o); });
      sel.onchange = () => settings.set('accent', sel.value); r1.append(sel); b.append(r1);
      const r2 = el('label', 'vl-row', 'Velocidade '); const rg = el('input'); rg.type = 'range'; rg.min = 0.6; rg.max = 1.2; rg.step = 0.05; rg.value = settings.get('rate');
      rg.onchange = () => settings.set('rate', +rg.value); r2.append(rg); b.append(r2);
    } else b.append(el('p', 'vl-muted', 'Seu navegador não oferece síntese de voz.'));
    if (sp.stt) toggle('voiceAutoSend', 'Enviar automaticamente o que eu falar');
  }

  function confirmMature(o) {
    o = o || {};
    return new Promise(resolve => {
      const saved = store.get('adult');
      if (!o.force && saved) return resolve(settings.get('soft') ? 'soft' : 'full');
      let decided = false;
      const done = r => { decided = true; m.close(); resolve(r); };
      const m = openModal('⚠️ Conteúdo adulto', { onClose: () => { if (!decided) resolve('back'); } });
      m.body.innerHTML = `<p>${esc(o.title || 'Esta história')} contém temas adultos: tensão sexual, traição e linguagem forte.</p>
        <p class="vl-muted">Esta confirmação é declaratória. Escolha como quer continuar:</p>`;
      const a = el('button', 'vl-btn', 'Tenho 18+ · versão completa');
      const s = el('button', 'vl-btn ghost', 'Modo suave (atenuado)');
      const bk = el('button', 'vl-btn ghost', 'Voltar');
      a.onclick = () => { store.set('adult', 'ok'); settings.set('soft', false); done('full'); };
      s.onclick = () => { store.set('adult', 'soft'); settings.set('soft', true); done('soft'); };
      bk.onclick = () => done('back');
      m.body.append(a, s, bk);
    });
  }

  /* ---- toolbar flutuante (FAB) ---- */
  let badgeEl = null;
  function refreshBadge() {
    if (!badgeEl) return;
    const d = cardStats().due; badgeEl.textContent = d > 99 ? '99+' : d; badgeEl.hidden = d === 0;
  }
  function mountToolbar(o) {
    if (!hasDOM || document.getElementById('vl-fab')) return;
    o = o || {}; injectStyles();
    const sp = speechSupport();
    const fab = el('div', 'vl-fab'); fab.id = 'vl-fab';
    const main = el('button', 'vl-fab-main', '🎓'); main.setAttribute('aria-label', 'Ferramentas de estudo'); main.setAttribute('aria-expanded', 'false');
    const menu = el('div', 'vl-menu'); menu.hidden = true;
    const items = [];
    if (sp.tts) {
      items.push(['🔁', 'Ouvir a última fala', () => speak(o.getLastNpcLine && o.getLastNpcLine())]);
      items.push(['🔊', 'Voz dos NPCs: ligar/desligar', () => { const v = !settings.get('tts'); settings.set('tts', v); toast(v ? 'Voz dos NPCs ligada' : 'Voz dos NPCs desligada'); }]);
    }
    if (sp.stt) items.push(['🎤', 'Responder falando', async btn => {
      btn.classList.add('vl-rec');
      try {
        const r = await listen(); const inp = o.input;
        if (inp) { inp.value = r.transcript; inp.focus(); }
        toast(`🎤 “${r.transcript}” (${Math.round((r.confidence || 0) * 100)}%)`);
        if (settings.get('voiceAutoSend') && o.submit) o.submit(r.transcript);
      } catch (e) { toast('Não consegui ouvir: ' + e.message); }
      btn.classList.remove('vl-rec');
    }]);
    items.push(['🧠', 'Revisar cartas', openReview, true]);
    items.push(['📒', 'Habilidades e erros', openNotebook]);
    items.push(['⚙️', 'Ajustes', openSettings]);
    items.forEach(([icon, label, fn, withBadge]) => {
      const b = el('button', 'vl-fab-item', icon); b.title = label; b.setAttribute('aria-label', label);
      b.onclick = () => fn(b);
      if (withBadge) { badgeEl = el('span', 'vl-badge'); b.append(badgeEl); }
      menu.append(b);
    });
    main.onclick = () => { menu.hidden = !menu.hidden; main.setAttribute('aria-expanded', String(!menu.hidden)); };
    fab.append(menu, main); document.body.append(fab);
    refreshBadge();
  }

  /* ---- CSS (prefixo vl-; usa as variáveis do site com fallback) ---- */
  let stylesDone = false;
  function injectStyles() {
    if (stylesDone || !hasDOM) return; stylesDone = true;
    const s = document.createElement('style');
    s.textContent = `
.vocab-word{border-bottom:1px dotted var(--gold,#fbbf24);cursor:pointer;color:inherit}
.vocab-word:hover,.vocab-word:focus{background:rgba(251,191,36,.18);outline:none}
.vl-pop{position:fixed;z-index:9999;max-width:230px;background:var(--bg,#0b0f19);color:var(--text,#e5e7eb);border:1px solid var(--gold,#fbbf24);border-radius:10px;padding:10px 12px;font-size:.9rem;box-shadow:0 8px 24px rgba(0,0,0,.5)}
.vl-pop-actions{display:flex;gap:6px;margin-top:8px;flex-wrap:wrap}
.vl-pop-actions button,.vl-btn{background:var(--gold,#fbbf24);color:#111;border:0;border-radius:8px;padding:8px 12px;font-weight:600;cursor:pointer;font-size:.85rem}
.vl-btn.ghost,.vl-pop-actions button{background:transparent;color:var(--text,#e5e7eb);border:1px solid var(--border,#374151)}
.vl-btn:disabled,.vl-pop-actions button:disabled{opacity:.5;cursor:default}
.vl-modal{position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.65);display:flex;align-items:center;justify-content:center;padding:12px}
.vl-card{width:min(480px,100%);max-height:88vh;overflow:auto;background:var(--bg,#0b0f19);color:var(--text,#e5e7eb);border:1px solid var(--border,#374151);border-radius:14px}
.vl-head{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:1px solid var(--border,#374151)}
.vl-head h3{margin:0;font-size:1.05rem;color:var(--gold,#fbbf24)}
.vl-x{background:none;border:0;color:inherit;font-size:1.1rem;cursor:pointer;padding:4px 8px}
.vl-body{padding:16px;display:flex;flex-direction:column;gap:10px}
.vl-body h4{margin:8px 0 2px;font-size:.9rem;color:var(--gold,#fbbf24)}
.vl-muted{color:var(--text-muted,#9ca3af);font-size:.9rem;margin:0}
.vl-progress{font-size:.75rem;color:var(--text-muted,#9ca3af)}
.vl-flash-front{font-size:1.3rem;font-weight:700;white-space:pre-line;padding:14px 0}
.vl-flash-back{border-left:3px solid var(--gold,#fbbf24);padding:6px 12px;display:flex;flex-direction:column;gap:4px}
.vl-flash-back[hidden],.vl-rate[hidden],.vl-menu[hidden],.vl-badge[hidden]{display:none}
.vl-actions,.vl-rate{display:flex;gap:8px;flex-wrap:wrap}
.vl-rate .vl-btn{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px}
.vl-rate small{font-weight:400;opacity:.75}
.vl-rate .r1{background:#ef4444;color:#fff}.vl-rate .r3{background:#f59e0b}.vl-rate .r4{background:#10b981}.vl-rate .r5{background:#3b82f6;color:#fff}
.vl-ok{color:#34d399}.vl-bad{color:#f87171}
.vl-bar{display:grid;grid-template-columns:1fr 90px 40px;gap:8px;align-items:center;font-size:.85rem}
.vl-bar>div{height:8px;background:var(--border,#374151);border-radius:4px;overflow:hidden}.vl-bar i{display:block;height:100%;background:var(--gold,#fbbf24)}
.vl-chip{display:inline-block;padding:3px 10px;border:1px solid var(--border,#374151);border-radius:999px;font-size:.8rem;margin:2px}
.vl-errs{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:6px;font-size:.85rem}.vl-errs small{display:block;color:var(--text-muted,#9ca3af)}
.vl-row{display:flex;align-items:center;gap:8px;font-size:.9rem;flex-wrap:wrap}.vl-row small{width:100%;color:var(--text-muted,#9ca3af);margin-left:26px}
.vl-fab{position:fixed;right:12px;bottom:var(--vl-bottom,150px);z-index:9000;display:flex;flex-direction:column;align-items:flex-end;gap:8px}
.vl-fab-main,.vl-fab-item{position:relative;width:44px;height:44px;border-radius:50%;border:1px solid var(--gold,#fbbf24);background:var(--bg,#0b0f19);color:var(--text,#e5e7eb);font-size:1.15rem;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.45)}
.vl-fab-main{background:var(--gold,#fbbf24);color:#111}
.vl-menu{display:flex;flex-direction:column;gap:8px}
.vl-badge{position:absolute;top:-4px;right:-4px;min-width:18px;height:18px;border-radius:9px;background:#ef4444;color:#fff;font-size:.7rem;line-height:18px;text-align:center;padding:0 4px}
.vl-rec{animation:vl-pulse 1s infinite;background:#ef4444}
.vl-toast{position:fixed;left:50%;bottom:110px;transform:translateX(-50%);z-index:10001;background:var(--bg,#0b0f19);color:var(--text,#e5e7eb);border:1px solid var(--gold,#fbbf24);padding:8px 14px;border-radius:10px;font-size:.85rem}
.lens-btn{background:transparent;border:1px solid var(--border,#374151);color:inherit;border-radius:6px;cursor:pointer;margin-left:4px;padding:2px 8px}
.end-report{margin-top:10px;padding:8px 10px;border:1px dashed var(--gold,#fbbf24);border-radius:8px;font-size:.9rem}
.qr-pulse .quick-reply-btn{animation:vl-pulse 1.2s ease 2}
@keyframes vl-pulse{0%,100%{box-shadow:0 0 0 0 rgba(251,191,36,.7)}50%{box-shadow:0 0 0 8px rgba(251,191,36,0)}}
@media (prefers-reduced-motion:reduce){.qr-pulse .quick-reply-btn,.vl-rec{animation:none}}`;
    document.head.append(s);
  }

  /* ================= API pública ================= */
  const API = {
    config, normalize, similarity, levenshtein,
    matchIntent, buildReplyMap, bestAnswer, qualityOf, hintFor, HINT_COSTS, validate,
    sm2, addCard, getDue, reviewCard, cardStats,
    logError, topTags, recentErrors, recordResult, skillReport,
    settings, reducedMotion,
    speechSupport, speak, listen, pronunciationScore,
    decorate, mountToolbar, openReview, openNotebook, openSettings, confirmMature, toast, refreshBadge
  };
  root.VentuLearn = API;
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
})(typeof window !== 'undefined' ? window : globalThis);