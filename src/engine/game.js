/*! game.js v2 — motor do Ventu (requer ventu-learning.js carregado antes) */
document.addEventListener('DOMContentLoaded', () => {
  /* ---------- camada pedagógica (com shim mínimo se o módulo não carregar) ---------- */
  function makeShim() {
    const noop = () => {};
    const cfg = { sound: true, typewriter: true, soft: false };
    console.error('[Ventu] ventu-learning.js não foi carregado: rodando em modo básico.');
    return {
      config: {}, HINT_COSTS: [10], settings: { get: k => cfg[k], set: noop },
      reducedMotion: () => false, normalize: s => String(s).toLowerCase().trim(),
      matchIntent: (s, t) => {
        const i = (s.intents || []).findIndex(it => it.match && ((it.match.lastIndex = 0), it.match.test(t)));
        return { intent: i >= 0 ? s.intents[i] : null, index: i, kind: i >= 0 ? 'regex' : null };
      },
      bestAnswer: () => ({ intentIndex: -1, phrase: null }),
      hintFor: () => 'Releia a fala do NPC e procure a palavra-chave.',
      qualityOf: () => 'ok', validate: () => [], addCard: noop, logError: noop, recordResult: noop,
      skillReport: () => null, speak: noop, decorate: noop, mountToolbar: noop, openReview: noop,
      confirmMature: () => Promise.resolve('full'), cardStats: () => ({ due: 0, total: 0 })
    };
  }
  const VL = window.VentuLearn || makeShim();

  /* ---------- helpers ---------- */
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const stripTags = s => String(s == null ? '' : s).replace(/<[^>]*>/g, '');
  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
  const nz = (v, d) => (v === undefined || v === null ? d : v);   // corrige o bug de `trust || 100` quando trust = 0
  const looksPortuguese = s => /[ãõçáéíóúâêô]|\b(você|não|para|com)\b/i.test(s);

  // Botões de balanceamento: mexa aqui, não no meio do código.
  const TUNING = {
    failEnergyLoss: 5,        // energia perdida por resposta que não casa
    failsBeforeNudge: 2,      // 2ª falha seguida: Ventu reexibe os botões
    failsBeforeLock: 3,       // 3ª falha seguida: trava o texto livre (cenas com botões)
    rewindCost: 15,
    firstTryTrustBonus: 2,    // acertou de primeira, resposta ideal, sem dica
    typoTrustPenalty: 1,
    assistedNoRizz: true,     // com a dica 3 (resposta pronta) não ganha Rizz
    xp: { endGood: 150, endOther: 50, replay: 10, accuracyBonusMax: 50, firstTryHit: 3 },
    readMsPerChar: 22         // tempo de leitura do feedback antes da próxima cena
  };

  const multiChar = window.currentGameData && window.currentGameData.characters;
  const rawData = window.currentGameData;

  function charGame(data, ch) {
    return { ...ch, level: data.id, title: data.title, shopItems: data.shopItems, nextLevel: data.nextLevel, mature: nz(ch.mature, data.mature) };
  }

  if (multiChar) {
    const urlChar = new URLSearchParams(window.location.search).get('c');
    if (urlChar && multiChar[urlChar]) startGame(charGame(rawData, multiChar[urlChar]));
    else showCharSelect(rawData);
  } else {
    startGame(rawData);
  }

  /* ====================== seleção de perspectiva ====================== */
  function showCharSelect(data) {
    const overlay = document.getElementById('char-select-overlay');
    const cards = document.getElementById('char-cards');
    const hint = document.getElementById('char-select-hint');
    const title = document.getElementById('char-select-title');
    if (!overlay) { startGame(charGame(data, data.characters[Object.keys(data.characters)[0]])); return; }

    overlay.hidden = false;
    const firstPick = window.VentuStorage.get(data.id + '_firstPick');
    const completed = window.VentuStorage.get(data.id + '_completed') || {};
    const firstDone = firstPick && completed[firstPick];

    if (firstPick && !firstDone) {
      title.textContent = 'Continue sua perspectiva';
      hint.textContent = `Termine ${data.characters[firstPick].name} para desbloquear as outras perspectivas.`;
    } else if (firstDone) {
      title.textContent = 'Perspectivas desbloqueadas';
      hint.textContent = 'Você já viu uma perspectiva. As outras têm callbacks novos.';
    } else {
      title.textContent = 'Escolha sua perspectiva';
      hint.textContent = data.hint || 'A mesma noite. Três ângulos. Escolha por onde começar.';
    }

    cards.innerHTML = '';
    Object.keys(data.characters).forEach((charId, i) => {
      const ch = data.characters[charId];
      const playable = isCharPlayable(charId, firstPick, firstDone);
      const badge = getBadge(charId, firstPick, firstDone, completed);
      const card = document.createElement('button');
      card.className = `char-card ${playable ? '' : 'char-card-locked'}`;
      card.disabled = !playable;
      card.style.animationDelay = `${i * 80}ms`;
      card.innerHTML = `
        <div class="char-card-emoji">${ch.emoji || '👤'}</div>
        <div class="char-card-body">
          <span class="char-card-role">${ch.role || ''}</span>
          <h3 class="char-card-name">${ch.name}</h3>
          <p class="char-card-desc">${ch.description || ''}</p>
        </div>
        <span class="char-card-badge ${badge.cls}">${badge.text}</span>`;
      card.addEventListener('click', () => {
        if (!playable) return;
        if (!firstPick) window.VentuStorage.set(data.id + '_firstPick', charId);
        overlay.hidden = true;
        history.replaceState(null, '', `?l=${data.id}&c=${charId}`);
        startGame(charGame(data, ch));
      });
      cards.appendChild(card);
    });
  }

  function isCharPlayable(charId, firstPick, firstDone) {
    if (!firstPick) return true;
    if (firstDone) return true;
    return charId === firstPick;
  }
  function getBadge(charId, firstPick, firstDone, completed) {
    if (completed[charId]) return { text: 'Concluído', cls: 'badge-done' };
    if (firstDone) return { text: 'Desbloqueado', cls: 'badge-new' };
    if (!firstPick) return { text: 'Perspectiva Inicial', cls: 'badge-start' };
    if (charId === firstPick) return { text: 'Continuar', cls: 'badge-active' };
    return { text: '🔒 Bloqueado', cls: 'badge-locked' };
  }

  /* ====================== jogo ====================== */
  function startGame(gameData) {
    const chatHistory = document.getElementById('chat-history');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const quickRepliesContainer = document.getElementById('quick-replies');
    const statMoney = document.getElementById('stat-money');
    const statEnergy = document.getElementById('stat-energy');
    const glossaryList = document.getElementById('glossary-list');
    const headerTitle = document.getElementById('mission-title');
    const statTrust = document.getElementById('stat-trust');
    const statRizz = document.getElementById('stat-rizz');
    const containerTrust = document.getElementById('stat-trust-container');
    const containerRizz = document.getElementById('stat-rizz-container');
    const mainChatContainer = document.getElementById('main-chat');

    if (gameData.title) headerTitle.textContent = gameData.title;
    chatHistory.setAttribute('role', 'log');
    chatHistory.setAttribute('aria-live', 'polite');

    const saveKey = gameData.charId ? `save_${gameData.level}_${gameData.charId}` : `save_${gameData.level}`;
    const flagsKey = `flags_${gameData.level}`;
    const OFFENSIVE = /(fuck|shit|bitch|idiot|stupid|asshole|dumb|moron|hate you|shut up|go to hell|screw you)/i;
    const DEBUG = new URLSearchParams(window.location.search).get('debug') === '1';
    const finePointer = !!(window.matchMedia && window.matchMedia('(pointer:fine)').matches);

    /* ---- Supabase (a chave publishable é pública por design; proteja com RLS) ---- */
    const SUPABASE_URL = 'https://hbqjoadubrwuafbfykre.supabase.co';
    const SUPABASE_ANON_KEY = 'sb_publishable_Wg3q6v4-ZbVK_9WQXnuFpQ_CZXH68L_';
    let supabaseClient = null;
    if (window.supabase) supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    /* ---- idioma da interface ---- */
    const translations = {
      pt: { money: 'Dinheiro', energy: 'Energia', glossary: 'Glossário', shop: '🛒 Loja', input: 'Digite sua resposta...', locked: 'Escolha uma das opções ↓', send: 'Enviar', langBtn: '🌐 EN' },
      en: { money: 'Money', energy: 'Energy', glossary: 'Glossary', shop: '🛒 Shop', input: 'Type your answer...', locked: 'Pick one of the options ↓', send: 'Send', langBtn: '🌐 PT' }
    };
    let currentLang = window.VentuStorage.get('lang') || 'pt';
    const $ = id => document.getElementById(id);
    function applyLanguage() {
      const t = translations[currentLang];
      if ($('lbl-money')) $('lbl-money').textContent = t.money;
      if ($('lbl-energy')) $('lbl-energy').textContent = t.energy;
      if ($('lbl-glossary')) $('lbl-glossary').textContent = t.glossary;
      if ($('btn-shop')) $('btn-shop').textContent = t.shop;
      if (chatInput) chatInput.placeholder = textLocked ? t.locked : t.input;
      if ($('btn-send')) $('btn-send').textContent = t.send;
      if ($('btn-lang')) $('btn-lang').textContent = t.langBtn;
    }
    if ($('btn-lang')) $('btn-lang').addEventListener('click', () => {
      currentLang = currentLang === 'pt' ? 'en' : 'pt';
      window.VentuStorage.set('lang', currentLang);
      applyLanguage();
    });

    /* ---- estado ---- */
    let currentState = { ...gameData.initialState };
    let currentSceneId = gameData.startScene;
    let currentScene = gameData.scenes[currentSceneId];
    let isProcessing = false;
    let activeTypers = [];
    let skipCurrentTyper = null;
    let textLocked = false;
    let hintLevel = 0, sceneAttempts = 0, failStreak = 0;
    let lastUserText = '', lastNpcLine = '';
    let completionHandled = false;
    const rewindStack = [];
    const session = { scenes: 0, firstTry: 0, matched: 0, ideal: 0, assisted: 0, hints: 0, rewinds: 0, errors: 0, fuzzy: 0, scored: new Set() };

    applyLanguage();

    function getFlags() { return window.VentuStorage.get(flagsKey) || {}; }
    function hasFlag(n) { return !!getFlags()[n]; }
    function setFlags(list) {
      if (!list) return;
      const f = getFlags();
      list.forEach(n => (f[n] = true));
      window.VentuStorage.set(flagsKey, f);
    }

    const soft = () => !!VL.settings.get('soft');
    const pick = (obj, field) => (soft() && obj[field + 'Soft'] ? obj[field + 'Soft'] : obj[field]);

    function resolveText(scene, field) {
      if (soft() && scene[field + 'Soft']) return { text: scene[field + 'Soft'], isCallback: false };
      const variants = scene[`${field}Variants`];
      if (variants) {
        for (const v of variants) {
          if (!v.ifFlag || hasFlag(v.ifFlag)) return { text: v[field] || v.text, isCallback: true };
        }
      }
      return { text: scene[field], isCallback: false };
    }

    const saved = window.VentuStorage.get(saveKey);
    if (saved) {
      if (saved.sceneId && gameData.scenes[saved.sceneId]) {
        currentState = saved.state || currentState;
        currentSceneId = saved.sceneId;
        currentScene = gameData.scenes[currentSceneId];
      } else window.VentuStorage.remove(saveKey);
    }
    function saveGame() { window.VentuStorage.set(saveKey, { state: currentState, sceneId: currentSceneId }); }

    function sessionReport() {
      const n = session.scenes;
      if (!n) return null;
      return {
        accuracy: Math.round((100 * session.firstTry) / n),
        naturalness: Math.round((100 * session.ideal) / Math.max(1, session.matched)),
        autonomy: 100 - Math.round((100 * session.assisted) / n)
      };
    }

    /* ---- conclusão / XP (agora sem farm de XP por recarregar o final) ---- */
    async function markCompleted() {
      if (!gameData.charId || completionHandled) return;
      completionHandled = true;

      const key = gameData.level + '_completed';
      let wasDone = false;
      try {
        const c = window.VentuStorage.get(key) || {};
        wasDone = !!c[gameData.charId];
        c[gameData.charId] = true;
        window.VentuStorage.set(key, c);
      } catch (e) { /* storage indisponível */ }

      const rep = sessionReport();
      const base = currentScene.endingType === 'bom' ? TUNING.xp.endGood : TUNING.xp.endOther;
      const bonus = rep ? Math.round((rep.accuracy / 100) * TUNING.xp.accuracyBonusMax) : 0;
      const xp = wasDone ? TUNING.xp.replay : base + bonus;

      const P = window.VentuProgress;
      if (P) {
        try { P.checkStreak && P.checkStreak(); P.addXP && P.addXP(xp); P.registerMissionProgress && P.registerMissionProgress('complete_1_scene'); } catch (e) { console.warn(e); }
      }

      if (supabaseClient && !wasDone) {
        try {
          const { data: { session: auth } } = await supabaseClient.auth.getSession();
          if (!auth) return;
          const userId = auth.user.id, levelId = gameData.level;
          const { data: profile } = await supabaseClient.from('profiles').select('xp, levels_completed').eq('id', userId).single();
          if (!profile) return;
          let done = profile.levels_completed || {};
          if (typeof done === 'string') { try { done = JSON.parse(done); } catch (e) { done = {}; } }
          if (!Array.isArray(done[levelId])) done[levelId] = [];
          if (done[levelId].includes(gameData.charId)) return;
          done[levelId].push(gameData.charId);
          const { error } = await supabaseClient.from('profiles').update({ xp: (profile.xp || 0) + xp, levels_completed: done }).eq('id', userId);
          if (error) console.error('Erro no update do Supabase:', error.message);
        } catch (error) { console.error('Erro ao salvar progresso:', error); }
      }
    }

    /* ---- áudio (AudioContext só nasce após o 1º gesto do usuário) ---- */
    let audioCtx = null;
    const SFX = {
      send: { t: 'sine', a: 600, b: 800, when: 0.1, exp: true, g: 0.1, d: 0.1 },
      receive: { t: 'triangle', a: 400, b: 300, when: 0.1, exp: true, g: 0.1, d: 0.15 },
      cash: { t: 'square', a: 1200, b: 1500, when: 0.05, exp: false, g: 0.05, d: 0.2 },
      success: { t: 'sine', a: 880, b: 1108, when: 0.1, exp: false, g: 0.05, d: 0.3 },
      error: { t: 'sawtooth', a: 150, b: 100, when: 0.2, exp: true, g: 0.1, d: 0.2 }
    };
    function playSound(type) {
      if (!VL.settings.get('sound')) return;
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      if (!audioCtx) audioCtx = new AC();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const s = SFX[type]; if (!s) return;
      const now = audioCtx.currentTime, osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.type = s.t;
      osc.frequency.setValueAtTime(s.a, now);
      if (s.exp) osc.frequency.exponentialRampToValueAtTime(s.b, now + s.when); else osc.frequency.setValueAtTime(s.b, now + s.when);
      gain.gain.setValueAtTime(s.g, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + s.d);
      osc.start(); osc.stop(now + s.d);
    }

    /* ---- loja ---- */
    if ($('btn-shop')) $('btn-shop').addEventListener('click', openShop);
    if ($('btn-close-shop')) $('btn-close-shop').addEventListener('click', () => ($('shop-modal').style.display = 'none'));

    function openShop() {
      const list = $('shop-items-list');
      list.innerHTML = '';
      const items = gameData.shopItems || [
        { id: 'coffee', name: '☕ Café Quentinho', price: 5, desc: 'Recupera 20 de Energia.' },
        { id: 'umbrella', name: '☂️ Guarda-chuva', price: 10, desc: 'Evita perda de energia na chuva.' }
      ];
      const inventory = window.VentuStorage.get('inventory') || [];
      items.forEach(item => {
        const btn = document.createElement('button');
        btn.style.cssText = 'background: var(--bg); color: var(--text); padding: 10px; border: 1px solid var(--border); border-radius: 6px; text-align: left; cursor: pointer; transition: 0.2s;';
        btn.innerHTML = `<strong style="color: var(--gold); font-size: 1.1rem;">${item.name}</strong> - <span style="color: #10b981; font-weight: bold;">$ ${item.price.toFixed(2)}</span><br><small style="color: var(--text-muted);">${item.desc}</small>`;
        btn.onmouseover = () => (btn.style.borderColor = 'var(--gold)');
        btn.onmouseout = () => (btn.style.borderColor = 'var(--border)');
        btn.onclick = () => buyItem(item, inventory);
        list.appendChild(btn);
      });
      $('shop-modal').style.display = 'flex';
    }

    function buyItem(item, inventory) {
      if (currentState.money < item.price) { playSound('error'); systemNote('💸 Dinheiro insuficiente!'); return; }
      if (inventory.includes(item.id)) { playSound('error'); systemNote('Você já tem esse item!'); return; }
      currentState.money -= item.price;
      if (item.id === 'coffee' || item.energy) {
        currentState.energy = Math.min(100, currentState.energy + (item.energy || 20)); playSound('success');
      } else {
        inventory.push(item.id); window.VentuStorage.set('inventory', inventory); playSound('cash');
      }
      updateHUD(); saveGame(); $('shop-modal').style.display = 'none';
      systemNote(`🧾 <strong>Recibo:</strong> Você comprou <em>${item.name}</em> por $${item.price.toFixed(2)}.<br>Saldo atual: $${currentState.money.toFixed(2)}`);
    }

    /* ---- HUD ---- */
    function updateHUD() {
      if (statMoney) { statMoney.textContent = `$ ${currentState.money.toFixed(2)}`; statMoney.style.color = currentState.money <= 0 ? 'var(--error)' : 'var(--gold)'; }
      if (statEnergy) { statEnergy.textContent = `${currentState.energy}/100`; statEnergy.style.color = currentState.energy <= 20 ? 'var(--error)' : 'var(--gold)'; }
      if (currentState.trust !== undefined) { if (statTrust) statTrust.textContent = currentState.trust; if (containerTrust) containerTrust.style.display = 'flex'; }
      else if (containerTrust) containerTrust.style.display = 'none';
      if (currentState.rizz !== undefined) { if (statRizz) statRizz.textContent = currentState.rizz; if (containerRizz) containerRizz.style.display = 'flex'; }
      else if (containerRizz) containerRizz.style.display = 'none';
    }

    function applyFx(fx) {
      if (!fx) return;
      if (fx.energy) currentState.energy = clamp(currentState.energy + fx.energy, 0, 100);
      if (fx.trust !== undefined) currentState.trust = clamp(nz(currentState.trust, 100) + fx.trust, 0, 100);
      if (fx.rizz !== undefined) currentState.rizz = clamp(nz(currentState.rizz, 50) + fx.rizz, 0, 100);
      if (fx.money) currentState.money = Math.max(0, currentState.money + fx.money);
    }

    /* ---- exaustão (desmaio no lugar de game over) ---- */
    async function checkExhaustion() {
      if (currentState.energy > 0) return false;
      currentState.energy = 50;
      currentState.trust = Math.max(0, nz(currentState.trust, 100) - 10);
      updateHUD(); saveGame();
      toggleInputLock(true);
      showTypingIndicator();
      await sleep(1000);
      removeTypingIndicator();
      await addMessage('Narrador', 'Seus olhos pesam. Você apaga por um momento. Quando acorda, você se sente um pouco melhor, mas perdeu um pouco de confiança. (+50 Energia, -10 Trust)', 'npc', true);
      return true;
    }

    /* ---- trava de input ---- */
    function toggleInputLock(lock) {
      isProcessing = lock;
      const blockText = lock || textLocked;
      chatInput.disabled = blockText;
      const sendBtn = chatForm.querySelector('button');
      if (sendBtn) sendBtn.disabled = blockText;
      quickRepliesContainer.querySelectorAll('button').forEach(b => { b.disabled = lock || b.dataset.locked === '1'; });
      if (!lock && !textLocked && finePointer) chatInput.focus();   // não abre o teclado no celular a cada fala
    }

    function scrollDown() { chatHistory.scrollTop = chatHistory.scrollHeight; }

    function showTypingIndicator() {
      const d = document.createElement('div');
      d.className = 'chat-message npc typing-indicator-container';
      d.id = 'typing-indicator';
      d.innerHTML = `<div class="npc-avatar">👤</div><div class="msg-content"><div class="msg-bubble typing-bubble"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div></div>`;
      chatHistory.appendChild(d); scrollDown();
    }
    function removeTypingIndicator() { const i = $('typing-indicator'); if (i) i.remove(); }

    /* ---- typewriter: toque no chat (ou Esc) para pular; respeita prefers-reduced-motion ---- */
    function typeWriterEffect(el, text, speed = 15) {
      return new Promise(resolve => {
        if (!VL.settings.get('typewriter') || VL.reducedMotion()) { el.textContent = text; scrollDown(); return resolve(); }
        let i = 0; el.textContent = '';
        const finish = () => {
          clearInterval(iv); activeTypers = activeTypers.filter(t => t !== iv);
          skipCurrentTyper = null; el.textContent = text; scrollDown(); resolve();
        };
        const iv = setInterval(() => {
          if (i < text.length) { i++; el.textContent = text.slice(0, i); scrollDown(); } else finish();
        }, speed);
        activeTypers.push(iv); skipCurrentTyper = finish;
      });
    }
    chatHistory.addEventListener('click', e => { if (skipCurrentTyper && !e.target.closest('.vocab-word')) skipCurrentTyper(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && skipCurrentTyper) skipCurrentTyper(); });

    /* ---- mensagens ---- */
    const VENTU_SVG = `<svg viewBox="0 0 100 100" width="40" height="40"><path d="M 14 52 L 22 8 L 42 40 Z" fill="#fbbf24"/><path d="M 86 52 L 78 8 L 58 40 Z" fill="#fbbf24"/><path d="M 10 48 Q 10 78, 50 96 Q 90 78, 90 48 Q 90 38, 80 38 L 20 38 Q 10 38, 10 48 Z" fill="#fbbf24"/><path d="M 50 92 Q 35 84, 32 72 Q 40 76, 50 76 Q 60 76, 68 72 Q 65 84, 50 92 Z" fill="#fef3c7"/><ellipse cx="35" cy="58" rx="3.5" ry="5" fill="#0b0f19"/><ellipse cx="65" cy="58" rx="3.5" ry="5" fill="#0b0f19"/><path d="M 46 72 L 54 72 L 50 78 Z" fill="#0b0f19"/></svg>`;
    const VENTU_AVATAR = `<div class="npc-avatar ventu-avatar" style="background: transparent; border: none; width: 40px; height: 40px;">${VENTU_SVG}</div>`;

    function npcEmoji(sender) {
      if (gameData.emoji) return gameData.emoji;
      if (sender.includes('Emma')) return '👩';
      if (sender.includes('Silva')) return '👨‍💼';
      if (sender.includes('Lucas')) return '🧑';
      if (sender.includes('Davi')) return '👨‍🍳';
      if (sender.includes('Chloe')) return '🕵️‍♀️';
      if (sender === 'Narrador') return '📖';
      if (sender === 'Sistema') return '⚙️';
      return '👤';
    }

    async function addMessage(sender, text, type, useTypewriter, isCallback = false) {
      const msgDiv = document.createElement('div');
      msgDiv.className = `chat-message ${type}`;
      const avatar = type === 'npc' ? `<div class="npc-avatar">${npcEmoji(sender)}</div>` : type === 'ventu' ? VENTU_AVATAR : `<div class="npc-avatar player-avatar">Você</div>`;
      msgDiv.innerHTML = `${avatar}<div class="msg-content"><span class="msg-sender">${sender}</span><div class="msg-bubble ${isCallback ? 'callback-bubble' : ''}"></div></div>`;
      const bubble = msgDiv.querySelector('.msg-bubble');
      chatHistory.appendChild(msgDiv); scrollDown();

      const safeText = text || '...';
      const speakable = type === 'npc' && sender !== 'Narrador' && sender !== 'Sistema' && !looksPortuguese(safeText);
      if (speakable) { lastNpcLine = safeText; if (VL.settings.get('tts')) VL.speak(safeText); }

      if (useTypewriter) await typeWriterEffect(bubble, safeText); else bubble.innerHTML = safeText;
      if (type === 'npc' && sender !== 'Narrador' && currentScene.glossary) VL.decorate(bubble, currentScene.glossary);
      return bubble;
    }
    const ventuNote = html => addMessage('Ventu', html, 'ventu', false);
    const systemNote = html => addMessage('Sistema', html, 'ventu', false);

    function addUserMessage(text) {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'chat-message player';
      msgDiv.innerHTML = `<div class="npc-avatar player-avatar">Você</div><div class="msg-content"><span class="msg-sender">Você</span><div class="msg-bubble"></div></div>`;
      msgDiv.querySelector('.msg-bubble').textContent = text;   // sem innerHTML: evita XSS
      chatHistory.appendChild(msgDiv); scrollDown();
    }

    /* ---- Lente de Inglês (com áudio e salvar no deck) ---- */
    function showLens(lens, userText, autoSaved) {
      if (!lens) return;
      const div = document.createElement('div');
      div.className = 'lens-bubble';
      let html = `<div class="lens-title">🔍 Lente de Inglês</div><div>${lens.explanation}</div>`;
      if (lens.native) {
        html += `<div class="lens-native"><strong>Como um nativo diria:</strong> <span class="lens-phrase">${lens.native}</span>
          <button class="lens-btn" data-act="say" aria-label="Ouvir">🔊</button>
          ${autoSaved ? '<small> · 🧠 salvo para revisão</small>' : '<button class="lens-btn" data-act="save">➕ Salvar</button>'}</div>`;
      }
      div.innerHTML = html;
      div.addEventListener('click', e => {
        const act = e.target.dataset && e.target.dataset.act;
        if (act === 'say') VL.speak(stripTags(lens.native));
        if (act === 'save') {
          VL.addCard({ type: 'phrase', front: `Como um nativo diria isto?\n“${userText}”`, back: stripTags(lens.native), ctx: stripTags(currentScene.npcText || ''), source: 'lens' });
          e.target.textContent = '✔ Salvo'; e.target.disabled = true;
        }
      });
      chatHistory.appendChild(div); scrollDown();
      playSound('receive');
    }

    /* ---- botões de resposta rápida, dica progressiva e rewind ---- */
    const HINT_COSTS = VL.HINT_COSTS || [10];

    function updateHintButton() {
      const b = quickRepliesContainer.querySelector('.hint-btn');
      if (!b) return;
      if (hintLevel >= HINT_COSTS.length) { b.innerHTML = '✅ Dicas esgotadas'; b.dataset.locked = '1'; b.disabled = true; }
      else { b.innerHTML = `💡 Dica ${hintLevel + 1}/${HINT_COSTS.length} (-${HINT_COSTS[hintLevel]} ⚡)`; b.dataset.locked = ''; }
    }

    function renderQuickReplies(opts = {}) {
      quickRepliesContainer.innerHTML = '';
      if (currentScene.intents && currentScene.intents.length) {
        const hintBtn = document.createElement('button');
        hintBtn.className = 'hint-btn'; hintBtn.onclick = useHint;
        quickRepliesContainer.appendChild(hintBtn);
      }
      if (rewindStack.length) {
        const rw = document.createElement('button');
        rw.className = 'hint-btn rewind-btn';
        rw.innerHTML = `⏪ Rewind (-${TUNING.rewindCost} ⚡)`;
        rw.title = 'Volte uma escolha e veja outro resultado';
        rw.onclick = doRewind;
        quickRepliesContainer.appendChild(rw);
      }
      (currentScene.quickReplies || []).forEach(qr => {
        const label = typeof qr === 'string' ? qr : qr.label;
        const text = typeof qr === 'string' ? qr : qr.text;
        const btn = document.createElement('button');
        btn.className = 'quick-reply-btn';
        btn.textContent = text; btn.title = label || text;
        btn.onclick = () => submitText(text, { fromButton: true });
        quickRepliesContainer.appendChild(btn);
      });
      if (opts.pulse && !VL.reducedMotion()) {
        quickRepliesContainer.classList.add('qr-pulse');
        setTimeout(() => quickRepliesContainer.classList.remove('qr-pulse'), 2600);
      }
      quickRepliesContainer.querySelectorAll('button').forEach(b => (b.disabled = isProcessing));
      updateHintButton();
    }

    function captureError(best) {
      if (!VL.settings.get('autoCapture') || !best.phrase) return;
      VL.addCard({ type: 'phrase', front: `Situação:\n“${stripTags(currentScene.npcText || '').slice(0, 110)}”\nComo responder?`, back: best.phrase, ctx: '', source: 'error' });
    }

    function useHint() {
      if (isProcessing || hintLevel >= HINT_COSTS.length) return;
      const cost = HINT_COSTS[hintLevel];
      if (currentState.energy < cost) { playSound('error'); systemNote(`Energia insuficiente para esta dica (${cost} ⚡).`); return; }
      currentState.energy -= cost;
      hintLevel++; session.hints++;
      updateHUD(); saveGame(); playSound('cash');
      ventuNote(`💡 <strong>Dica ${hintLevel}/${HINT_COSTS.length} (-${cost} Energia):</strong><br>${esc(VL.hintFor(currentScene, hintLevel))}`);
      if (hintLevel >= 3) { captureError(VL.bestAnswer(currentScene)); }
      updateHintButton();
    }

    async function doRewind() {
      if (isProcessing || !rewindStack.length) return;
      if (currentState.energy < TUNING.rewindCost) { playSound('error'); systemNote(`Energia insuficiente para o Rewind (${TUNING.rewindCost} ⚡).`); return; }
      const snap = rewindStack.pop();
      toggleInputLock(true);
      currentState = { ...snap.state, energy: Math.max(0, snap.state.energy - TUNING.rewindCost) };
      window.VentuStorage.set(flagsKey, snap.flags);
      session.rewinds++;
      playSound('cash'); updateHUD();
      const c = snap.choice;
      await ventuNote(`⏪ <strong>Rewind.</strong> Da última vez você disse <em>“${esc(c.text)}”</em>${c.summary ? ` → ${esc(c.summary)}` : ''}. Que tal tentar outro caminho e comparar?`);
      loadScene(snap.sceneId);
    }

    /* ---- carregamento de cena ---- */
    async function loadScene(sceneId) {
      currentSceneId = sceneId;
      currentScene = gameData.scenes[sceneId];
      if (!currentScene) { console.warn('Scene not found:', sceneId); return; }

      hintLevel = 0; sceneAttempts = 0; failStreak = 0; textLocked = false;
      applyLanguage();
      toggleInputLock(true);
      setFlags(currentScene.addFlags);
      if (mainChatContainer) mainChatContainer.dataset.bg = currentScene.bg || '';
      saveGame();
      if (currentScene.isEnd && gameData.charId) markCompleted();

      if (currentScene.cost) {
        if (currentState.money >= currentScene.cost) {
          currentState.money -= currentScene.cost; updateHUD(); saveGame(); playSound('cash');
          addMessage('Sistema', `Você pagou $${currentScene.cost.toFixed(2)}.`, 'ventu');
        } else {
          setTimeout(() => {
            addMessage('Sistema', `Saldo insuficiente ($${currentState.money.toFixed(2)}).`, 'ventu');
            setTimeout(() => loadScene(currentScene.nextScene || currentSceneId), 2000);
          }, 1000);
          return;
        }
      }

      glossaryList.innerHTML = '';
      (currentScene.glossary || []).forEach(g => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${g.word}</strong>: ${g.meaning}`;
        glossaryList.appendChild(li);
      });

      renderQuickReplies();

      const npcData = resolveText(currentScene, 'npcText');
      await sleep(500);
      showTypingIndicator();
      await sleep(1000);
      removeTypingIndicator();
      await addMessage(currentScene.npcName, npcData.text, 'npc', true, npcData.isCallback);
      playSound('receive');
      if (!currentScene.isEnd) toggleInputLock(false);
      else {
        textLocked = true;            // no final o texto livre fica bloqueado, mas o Rewind continua disponível
        toggleInputLock(false);
        setTimeout(showEndingHint, 1500);
      }
    }

    /* ---- entrada do jogador ---- */
    function submitText(text, opts = {}) {
      if (isProcessing) return;
      text = String(text || '').trim();
      if (!text) return;
      addUserMessage(text);
      chatInput.value = '';
      handleUserInput(text, opts);
    }
    chatForm.addEventListener('submit', e => { e.preventDefault(); submitText(chatInput.value); });

    async function handleUserInput(text, opts = {}) {
      toggleInputLock(true);
      playSound('send');
      lastUserText = text;

      if (OFFENSIVE.test(text) && currentScene.offensiveScene) {
        playSound('error');
        VL.logError({ type: 'offensive', said: text, sceneId: currentSceneId, tag: 'politeness' });
        await sleep(1000);
        loadScene(currentScene.offensiveScene);
        return;
      }

      sceneAttempts++;
      // O texto é SEMPRE validado pelas regex. Botão e digitação seguem a mesma regra.
      let m = VL.matchIntent(currentScene, text);
      if (!m.intent && opts.fromButton && currentScene.intents) {
        // Rede de segurança: botão sem regex correspondente não pode travar o jogador.
        const qi = (currentScene.quickReplies || []).findIndex(q => (typeof q === 'string' ? q : q.text) === text);
        if (qi >= 0 && currentScene.intents[qi]) {
          console.warn(`[Ventu] botão “${text}” em ${currentSceneId} não casa com nenhuma regex; usando índice legado. Corrija o JSON (rode ?debug=1).`);
          m = { intent: currentScene.intents[qi], index: qi, kind: 'legacy' };
        }
      }
      if (DEBUG) console.debug('[match]', currentSceneId, m.kind, m.index, m.intent && m.intent.id, text);

      if (m.intent) await onMatched(m, text); else await onNoMatch(text);
    }

    async function onMatched(m, text) {
      const intent = m.intent;
      const quality = VL.qualityOf(intent);
      const assisted = hintLevel >= 3;
      const firstTry = sceneAttempts === 1 && hintLevel === 0 && m.kind !== 'fuzzy';
      const best = VL.bestAnswer(currentScene);
      const tag = intent.tag || currentScene.tag;

      // snapshot para o Rewind (antes de qualquer efeito)
      const snap = {
        sceneId: currentSceneId, state: { ...currentState }, flags: { ...getFlags() },
        choice: { text, summary: stripTags((intent.lens && intent.lens.explanation) || intent.explanation || '').slice(0, 140) }
      };

      playSound('success');
      failStreak = 0;
      if (intent.addsFlags) setFlags(intent.addsFlags);

      // erro de digitação aceito, mas explicado
      if (m.kind === 'fuzzy') {
        session.fuzzy++;
        VL.logError({ type: 'typo', said: text, expected: m.suggestion, sceneId: currentSceneId, tag: 'grammar' });
        await ventuNote(`✍️ <strong>Quase!</strong> Você escreveu “${esc(text)}”. O correto é <strong>${esc(m.suggestion)}</strong>.`);
      }

      // efeitos narrativos + mecânica de aprendizado
      const fx = { ...(intent.fx || {}) };
      if (assisted && TUNING.assistedNoRizz && fx.rizz > 0) fx.rizz = 0;
      applyFx(fx);
      if (currentState.trust !== undefined) {
        if (firstTry && quality === 'ideal') currentState.trust = clamp(currentState.trust + TUNING.firstTryTrustBonus, 0, 100);
        if (m.kind === 'fuzzy') currentState.trust = clamp(currentState.trust - TUNING.typoTrustPenalty, 0, 100);
      }
      if (intent.energyCost) currentState.energy = Math.max(0, currentState.energy - intent.energyCost);
      updateHUD(); saveGame();
      if (currentState.energy <= 0) await checkExhaustion();

      // pontuação da cena (1x por cena na sessão: Rewind não vira farm)
      if (!session.scored.has(currentSceneId)) {
        session.scored.add(currentSceneId);
        session.scenes++; session.matched++;
        if (firstTry) session.firstTry++;
        if (quality === 'ideal') session.ideal++;
        if (assisted) session.assisted++;
        VL.recordResult({ sceneId: currentSceneId, firstTry, quality, hintLevel, assisted, kind: m.kind });
        if (firstTry && window.VentuProgress && window.VentuProgress.addXP) { try { window.VentuProgress.addXP(TUNING.xp.firstTryHit); } catch (e) { /* opcional */ } }
      }

      // resposta pouco natural vira erro + carta de produção
      if (quality === 'awkward' || quality === 'bad') {
        VL.logError({ type: 'register', said: text, expected: best.phrase, sceneId: currentSceneId, tag: tag || 'register' });
        captureError(best);
      }

      // resposta do NPC
      if (intent.response) {
        showTypingIndicator();
        await sleep(1000);
        removeTypingIndicator();
        await addMessage(currentScene.npcName, pick(intent, 'response'), 'npc', true);
        playSound('receive');
        await sleep(500);
      }

      // feedback (Lente ou explicação) depois da resposta, com tempo de leitura
      let feedbackLen = 0;
      if (intent.lens) {
        const autoSaved = VL.settings.get('autoCapture') && quality !== 'ideal' && intent.lens.native;
        if (autoSaved) VL.addCard({ type: 'phrase', front: `Como um nativo diria isto?\n“${text}”`, back: stripTags(intent.lens.native), ctx: stripTags(currentScene.npcText || ''), source: 'lens' });
        showLens(intent.lens, text, autoSaved);
        feedbackLen = stripTags(intent.lens.explanation).length + stripTags(intent.lens.native || '').length;
      } else if (intent.explanation) {
        await ventuNote(`💡 <em>${intent.explanation}</em>`);
        feedbackLen = stripTags(intent.explanation).length;
      }

      if (intent.nextScene) {
        rewindStack.push(snap); if (rewindStack.length > 10) rewindStack.shift();
        await sleep(feedbackLen ? clamp(900 + feedbackLen * TUNING.readMsPerChar, 1500, 6000) : 1000);
        loadScene(intent.nextScene);
      } else {
        toggleInputLock(false);
      }
    }

    async function onNoMatch(text) {
      playSound('error');
      failStreak++; session.errors++;
      const best = VL.bestAnswer(currentScene);
      VL.logError({ type: 'nomatch', said: text, expected: best.phrase, sceneId: currentSceneId, tag: currentScene.tag || 'geral' });

      // quem está travado não é punido para sempre: só as primeiras falhas custam energia
      const shielded = currentScene.protectedBy
        ? (window.VentuStorage.get('inventory') || []).includes(currentScene.protectedBy)
        : gameData.charId === 'emma' && (window.VentuStorage.get('inventory') || []).includes('umbrella') && currentSceneId.includes('emma_a2');
      if (shielded) {
        systemNote('☂️ Seu guarda-chuva te protegeu da chuva! (Nenhuma energia perdida)');
      } else if (failStreak < TUNING.failsBeforeLock) {
        currentState.energy = Math.max(0, currentState.energy - TUNING.failEnergyLoss);
      }
      updateHUD(); saveGame();
      if (currentState.energy <= 0) await checkExhaustion();

      // 1ª falha: o NPC reage (fallback)
      showTypingIndicator();
      await sleep(1000);
      removeTypingIndicator();
      await addMessage(currentScene.npcName, currentScene.fallback || '...', 'npc', true);
      playSound('receive');

      const hasButtons = (currentScene.quickReplies || []).length > 0;

      // 2ª falha seguida: o Ventu destrava e reexibe as opções
      if (failStreak === TUNING.failsBeforeNudge) {
        captureError(best);
        if (hasButtons) {
          await ventuNote('🐾 Parece que você travou. Tente usar uma das opções abaixo:');
          renderQuickReplies({ pulse: true });
        } else if (hintLevel === 0) {
          await ventuNote(`🐾 Parece que você travou. Dica grátis: ${esc(VL.hintFor(currentScene, 1))}`);
        }
      }

      // 3ª falha seguida: trava o texto livre (ou entrega a resposta modelo se não há botões)
      if (failStreak >= TUNING.failsBeforeLock) {
        if (hasButtons) {
          textLocked = true;
          applyLanguage();
          renderQuickReplies({ pulse: true });
          await ventuNote('🔒 Vamos com calma: escolha uma das opções abaixo para continuar.');
        } else if (best.phrase) {
          const bubble = await addMessage('Ventu', `🐾 Resposta modelo: <strong>${esc(best.phrase)}</strong> `, 'ventu', false);
          const use = document.createElement('button');
          use.className = 'lens-btn'; use.textContent = 'Usar esta resposta';
          use.onclick = () => { use.disabled = true; hintLevel = 3; submitText(best.phrase); };
          bubble.appendChild(use);
        }
      }
      toggleInputLock(false);
    }

    /* ---- final de história ---- */
    function showEndingHint() {
      const label = currentScene.endingType === 'ruim' ? 'Final ruim' : currentScene.endingType === 'ok' ? 'Final ok' : 'Final bom';
      const rep = sessionReport();
      const due = VL.cardStats ? VL.cardStats().due : 0;

      const btns = [];
      if (currentScene.endingType !== 'ruim') {
        const next = gameData.nextLevel || (gameData.level === 'a1' ? { id: 'a2', label: 'Nível 2 (Hotel Luxo)' } : null);
        if (next) btns.push(`<button class="retry-btn" style="background-color: var(--player-bubble); color: white;" data-act="next" data-id="${esc(next.id)}">Avançar para o ${esc(next.label)}</button>`);
      }
      if (gameData.charId) btns.push(`<button class="retry-btn" data-act="retry">Tentar de Novo (Reiniciar POV)</button>`);
      btns.push(`<button class="retry-btn" style="background-color: var(--border); color: var(--text);" data-act="back">Voltar para as Perspectivas</button>`);
      if (due > 0) btns.push(`<button class="retry-btn" data-act="review">🧠 Revisar ${due} carta${due > 1 ? 's' : ''}</button>`);

      const shareText = encodeURIComponent(`Eu sobrevivi ao caos do ${gameData.title} com ${currentState.energy} de energia sobrando${rep ? ` e ${rep.accuracy}% de precisão` : ''}! Jogue agora no Ventu: https://ventu-nine.vercel.app`);
      const reportHtml = rep ? `<div class="end-report">📊 Precisão <strong>${rep.accuracy}%</strong> · Naturalidade <strong>${rep.naturalness}%</strong> · Autonomia <strong>${rep.autonomy}%</strong>${session.rewinds ? ` · ⏪ ${session.rewinds}` : ''}</div>` : '';

      const hint = document.createElement('div');
      hint.className = 'chat-message ventu';
      hint.innerHTML = `${VENTU_AVATAR}<div class="msg-content"><span class="msg-sender">Ventu</span><div class="msg-bubble"><strong>${label}.</strong>${reportHtml}
        <div class="end-actions">${btns.join(' ')}</div>
        <div style="margin-top: 15px;"><a href="https://api.whatsapp.com/send?text=${shareText}" target="_blank" rel="noopener" class="retry-btn" style="background-color: #25D366; color: white; text-decoration: none; display: inline-block; text-align: center; margin-top: 10px;">Compartilhar no WhatsApp</a></div></div></div>`;
      hint.addEventListener('click', e => {
        const act = e.target.dataset && e.target.dataset.act;
        if (act === 'next') window.location.href = `?l=${e.target.dataset.id}&c=${gameData.charId || ''}`;
        if (act === 'retry') { window.VentuStorage.remove(saveKey); window.location.href = `?l=${gameData.level}&c=${gameData.charId}`; }
        if (act === 'back') window.location.href = `?l=${gameData.level}`;
        if (act === 'review') VL.openReview();
      });
      chatHistory.appendChild(hint); scrollDown();
    }

    /* ---- inicialização ---- */
    async function boot() {
      if (gameData.mature) {
        const choice = await VL.confirmMature({ title: gameData.title });
        if (choice === 'back') { if (history.length > 1) history.back(); else window.location.href = window.location.pathname; return; }
      }
      chatHistory.innerHTML = '';
      updateHUD();
      VL.mountToolbar({ input: chatInput, submit: t => submitText(t), getLastNpcLine: () => lastNpcLine });
      if (DEBUG) VL.validate(gameData, { print: true });
      loadScene(currentSceneId);
    }
    boot();
  }
});