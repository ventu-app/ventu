document.addEventListener('DOMContentLoaded', () => {
  const rawData = window.currentGameData;
  const multiChar = rawData && rawData.characters;

  if (multiChar) {
    const urlChar = new URLSearchParams(window.location.search).get('c');
    if (urlChar && multiChar[urlChar]) {
      startGame({ ...multiChar[urlChar], level: rawData.id, title: rawData.title, shopItems: rawData.shopItems });
    } else {
      showCharSelect(rawData);
    }
  } else {
    startGame(rawData);
  }

  function showCharSelect(data) {
    const overlay = document.getElementById('char-select-overlay');
    const cards = document.getElementById('char-cards');
    const hint = document.getElementById('char-select-hint');
    const title = document.getElementById('char-select-title');
    if (!overlay) { startGame({ ...data.characters[Object.keys(data.characters)[0]], level: data.id, title: data.title, shopItems: data.shopItems }); return; }

    overlay.hidden = false;
    const firstPick = localStorage.getItem('ventu_' + data.id + '_firstPick');
    const completed = JSON.parse(localStorage.getItem('ventu_' + data.id + '_completed') || '{}');
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
        <span class="char-card-badge ${badge.cls}">${badge.text}</span>
      `;
      card.addEventListener('click', () => {
        if (!playable) return;
        if (!firstPick) localStorage.setItem('ventu_' + data.id + '_firstPick', charId);
        overlay.hidden = true;
        history.replaceState(null, '', `?l=${data.id}&c=${charId}`);
        startGame({ ...ch, level: data.id, title: data.title, shopItems: data.shopItems });
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

  function startGame(gameData) {
    const chatHistory = document.getElementById('chat-history');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const quickRepliesContainer = document.getElementById('quick-replies');
    const statMoney = document.getElementById('stat-money');
    const statEnergy = document.getElementById('stat-energy');
    const glossaryList = document.getElementById('glossary-list');
    const headerTitle = document.getElementById('mission-title');

    if (gameData.title) { headerTitle.textContent = gameData.title; }

    const saveKey = gameData.charId ? `ventu_save_${gameData.level}_${gameData.charId}` : `ventu_save_${gameData.level}`;
    const flagsKey = `ventu_flags_${gameData.level}`;
    const OFFENSIVE = /(fuck|shit|bitch|idiot|stupid|asshole|dumb|moron|hate you|shut up|go to hell|screw you)/i;

    const SUPABASE_URL = 'https://hbqjoadubrwuafbfykre.supabase.co';
    const SUPABASE_ANON_KEY = 'sb_publishable_Wg3q6v4-ZbVK_9WQXnuFpQ_CZXH68L_';
    let supabaseClient = null;
    if (window.supabase) {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }

    const translations = {
        pt: { money: 'Dinheiro', energy: 'Energia', glossary: 'Glossário', shop: '🛒 Loja', input: 'Digite sua resposta...', send: 'Enviar', langBtn: '🌐 EN' },
        en: { money: 'Money', energy: 'Energy', glossary: 'Glossary', shop: '🛒 Shop', input: 'Type your answer...', send: 'Send', langBtn: '🌐 PT' }
    };
    let currentLang = localStorage.getItem('ventu_lang') || 'pt';
    
    function applyLanguage() {
        const t = translations[currentLang];
        if(document.getElementById('lbl-money')) document.getElementById('lbl-money').textContent = t.money;
        if(document.getElementById('lbl-energy')) document.getElementById('lbl-energy').textContent = t.energy;
        if(document.getElementById('lbl-glossary')) document.getElementById('lbl-glossary').textContent = t.glossary;
        if(document.getElementById('btn-shop')) document.getElementById('btn-shop').textContent = t.shop;
        if(document.getElementById('chat-input')) document.getElementById('chat-input').placeholder = t.input;
        if(document.getElementById('btn-send')) document.getElementById('btn-send').textContent = t.send;
        if(document.getElementById('btn-lang')) document.getElementById('btn-lang').textContent = t.langBtn;
    }
    
    if(document.getElementById('btn-lang')) {
        document.getElementById('btn-lang').addEventListener('click', () => {
            currentLang = currentLang === 'pt' ? 'en' : 'pt';
            localStorage.setItem('ventu_lang', currentLang);
            applyLanguage();
        });
    }
    
    applyLanguage();

    let currentState = { ...gameData.initialState };
    let currentSceneId = gameData.startScene;
    let currentScene = gameData.scenes[currentSceneId];
    let isProcessing = false;
    let textAnimInterval = null;

    function getFlags() { try { return JSON.parse(localStorage.getItem(flagsKey) || '{}'); } catch { return {}; } }
    function hasFlag(n) { return !!getFlags()[n]; }
    function setFlags(list) { if (!list) return; const f = getFlags(); list.forEach(n => f[n] = true); localStorage.setItem(flagsKey, JSON.stringify(f)); }
    
    function resolveText(scene, field) {
      const variants = scene[`${field}Variants`];
      if (variants) {
        for (const v of variants) {
          if (!v.ifFlag || hasFlag(v.ifFlag)) return { text: v[field] || v.text, isCallback: true };
        }
      }
      return { text: scene[field], isCallback: false };
    }

    const saved = localStorage.getItem(saveKey);
    if (saved) {
      try {
        const p = JSON.parse(saved);
        if (p.sceneId && gameData.scenes[p.sceneId]) {
            currentState = p.state || currentState;
            currentSceneId = p.sceneId;
            currentScene = gameData.scenes[currentSceneId];
        } else { localStorage.removeItem(saveKey); }
      } catch (e) { localStorage.removeItem(saveKey); }
    }

    function saveGame() { localStorage.setItem(saveKey, JSON.stringify({ state: currentState, sceneId: currentSceneId })); }

    async function markCompleted() {
      if (!gameData.charId) return;
      
      const key = `ventu_${gameData.level}_completed`;
      try {
        const c = JSON.parse(localStorage.getItem(key) || '{}');
        c[gameData.charId] = true;
        localStorage.setItem(key, JSON.stringify(c));
      } catch (e) {}

      if (supabaseClient) {
          try {
              const { data: { session } } = await supabaseClient.auth.getSession();
              if (session) {
                  const userId = session.user.id;
                  const levelId = gameData.level;
                  const xpGanho = currentScene.endingType === 'bom' ? 150 : 50;

                  const { data: profile } = await supabaseClient.from('profiles').select('xp, levels_completed').eq('id', userId).single();
                  
                  if (profile) {
                      const newCompleted = profile.levels_completed || {};
                      const alreadyCompleted = newCompleted[levelId] && newCompleted[levelId].includes(gameData.charId);

                      if (!alreadyCompleted) {
                          const newXp = (profile.xp || 0) + xpGanho;
                          if (!newCompleted[levelId]) newCompleted[levelId] = [];
                          newCompleted[levelId].push(gameData.charId);

                          await supabaseClient.from('profiles').update({
                              xp: newXp,
                              levels_completed: newCompleted
                          }).eq('id', userId);
                          
                          console.log(`XP salvo! +${xpGanho} XP. Total: ${newXp}`);
                      } else {
                          console.log(`Nível já concluído, sem XP extra.`);
                      }
                  }
              }
          } catch (error) {
              console.error("Erro ao salvar progresso:", error);
          }
      }
    }

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    function playSound(type) {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator(); const gain = audioCtx.createGain();
      osc.connect(gain); gain.connect(audioCtx.destination);
      if (type === 'send') { osc.type = 'sine'; osc.frequency.setValueAtTime(600, audioCtx.currentTime); osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1); gain.gain.setValueAtTime(0.1, audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1); osc.start(); osc.stop(audioCtx.currentTime + 0.1); }
      else if (type === 'receive') { osc.type = 'triangle'; osc.frequency.setValueAtTime(400, audioCtx.currentTime); osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.1); gain.gain.setValueAtTime(0.1, audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15); osc.start(); osc.stop(audioCtx.currentTime + 0.15); }
      else if (type === 'cash') { osc.type = 'square'; osc.frequency.setValueAtTime(1200, audioCtx.currentTime); osc.frequency.setValueAtTime(1500, audioCtx.currentTime + 0.05); gain.gain.setValueAtTime(0.05, audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2); osc.start(); osc.stop(audioCtx.currentTime + 0.2); }
      else if (type === 'success') { osc.type = 'sine'; osc.frequency.setValueAtTime(880, audioCtx.currentTime); osc.frequency.setValueAtTime(1108, audioCtx.currentTime + 0.1); gain.gain.setValueAtTime(0.05, audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3); osc.start(); osc.stop(audioCtx.currentTime + 0.3); }
      else if (type === 'error') { osc.type = 'sawtooth'; osc.frequency.setValueAtTime(150, audioCtx.currentTime); osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.2); gain.gain.setValueAtTime(0.1, audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2); osc.start(); osc.stop(audioCtx.currentTime + 0.2); }
    }

    if(document.getElementById('btn-shop')) document.getElementById('btn-shop').addEventListener('click', openShop);
    if(document.getElementById('btn-close-shop')) document.getElementById('btn-close-shop').addEventListener('click', () => document.getElementById('shop-modal').style.display = 'none');

    function openShop() {
        const list = document.getElementById('shop-items-list');
        list.innerHTML = '';
        const items = gameData.shopItems || [
            { id: 'coffee', name: '☕ Café Quentinho', price: 5, desc: 'Recupera 20 de Energia.' },
            { id: 'umbrella', name: '☂️ Guarda-chuva', price: 10, desc: 'Evita perda de energia na chuva.' }
        ];
        let inventory = JSON.parse(localStorage.getItem('ventu_inventory') || '[]');

        items.forEach(item => {
            const btn = document.createElement('button');
            btn.style.cssText = "background: var(--bg); color: var(--text); padding: 10px; border: 1px solid var(--border); border-radius: 6px; text-align: left; cursor: pointer; transition: 0.2s;";
            btn.innerHTML = `<strong style="color: var(--gold); font-size: 1.1rem;">${item.name}</strong> - <span style="color: #10b981; font-weight: bold;">$ ${item.price.toFixed(2)}</span><br><small style="color: var(--text-muted);">${item.desc}</small>`;
            btn.onmouseover = () => btn.style.borderColor = 'var(--gold)';
            btn.onmouseout = () => btn.style.borderColor = 'var(--border)';
            btn.onclick = () => buyItem(item, inventory);
            list.appendChild(btn);
        });
        document.getElementById('shop-modal').style.display = 'flex';
    }

    function buyItem(item, inventory) {
        if (currentState.money >= item.price) {
            if (inventory.includes(item.id)) { alert('Você já tem esse item!'); return; }
            currentState.money -= item.price;
            if (item.id === 'coffee' || item.energy) {
                currentState.energy = Math.min(100, currentState.energy + (item.energy || 20)); playSound('success'); 
            } else {
                inventory.push(item.id); localStorage.setItem('ventu_inventory', JSON.stringify(inventory)); playSound('cash');
            }
            updateHUD(); saveGame(); document.getElementById('shop-modal').style.display = 'none';
            addMessage('Sistema', `🧾 <strong>Recibo:</strong> Você comprou <em>${item.name}</em> por $${item.price.toFixed(2)}.<br>Saldo atual: $${currentState.money.toFixed(2)}`, 'ventu', false);
        } else { playSound('error'); alert('Dinheiro insuficiente!'); }
    }

    updateHUD();
    loadScene(currentSceneId);

    function updateHUD() {
      if(statMoney) statMoney.textContent = `$ ${currentState.money.toFixed(2)}`;
      if(statEnergy) statEnergy.textContent = `${currentState.energy}/100`;
      if(statMoney) statMoney.style.color = currentState.money <= 0 ? 'var(--error)' : 'var(--gold)';
      if(statEnergy) statEnergy.style.color = currentState.energy <= 20 ? 'var(--error)' : 'var(--gold)';
    }
    
    function checkExhaustion() {
        if (currentState.energy === 0) {
          setTimeout(() => {
            addMessage('Sistema', 'Você está exausto mentalmente e não consegue mais formular frases. A noite acaba em confusão.', 'ventu', true);
            setTimeout(() => {
               const exhaustionScene = { npcName: 'Narrador', npcText: 'Fim de jogo: Exaustão. O estresse foi maior que o seu preparo.', isEnd: true, endingType: 'ruim' };
               currentScene = exhaustionScene;
               showEndingHint();
            }, 2000);
          }, 1000);
          return true;
        }
        return false;
    }

    function toggleInputLock(lock) {
      isProcessing = lock;
      chatInput.disabled = lock;
      chatForm.querySelector('button').disabled = lock;
      quickRepliesContainer.querySelectorAll('button').forEach(b => b.disabled = lock);
      if (!lock) chatInput.focus();
    }
    function showTypingIndicator() {
      const d = document.createElement('div');
      d.className = 'chat-message npc typing-indicator-container';
      d.id = 'typing-indicator';
      d.innerHTML = `<div class="npc-avatar">👤</div><div class="msg-content"><div class="msg-bubble typing-bubble"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div></div>`;
      chatHistory.appendChild(d);
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }
    function removeTypingIndicator() { const i = document.getElementById('typing-indicator'); if (i) i.remove(); }
    function typeWriterEffect(el, text, speed = 18) {
      if (textAnimInterval) clearInterval(textAnimInterval);
      el.textContent = ''; let i = 0;
      textAnimInterval = setInterval(() => {
        if (i < text.length) { el.textContent += text.charAt(i); i++; chatHistory.scrollTop = chatHistory.scrollHeight; }
        else clearInterval(textAnimInterval);
      }, speed);
    }

    function loadScene(sceneId) {
      currentSceneId = sceneId;
      currentScene = gameData.scenes[sceneId];
      if (!currentScene) { console.warn('Scene not found:', sceneId); return; }

      setFlags(currentScene.addFlags);
      
      if (currentScene.energyCost) {
          currentState.energy = Math.max(0, currentState.energy - currentScene.energyCost);
          updateHUD();
          if (checkExhaustion()) return;
      }

      saveGame();
      if (currentScene.isEnd && gameData.charId) markCompleted();

      if (currentScene.cost) {
        if (currentState.money >= currentScene.cost) {
          currentState.money -= currentScene.cost; updateHUD(); saveGame(); playSound('cash');
          addMessage('Sistema', `Você pagou $${currentScene.cost.toFixed(2)}.`, 'ventu');
        } else {
          setTimeout(() => { addMessage('Sistema', `Saldo insuficiente ($${currentState.money.toFixed(2)}).`, 'ventu'); setTimeout(() => loadScene(currentScene.nextScene || currentSceneId), 2000); }, 1000);
          return;
        }
      }

      glossaryList.innerHTML = '';
      if (currentScene.glossary) currentScene.glossary.forEach(g => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${g.word}</strong>: ${g.meaning}`;
        glossaryList.appendChild(li);
      });

      quickRepliesContainer.innerHTML = '';
      if (currentScene.quickReplies) currentScene.quickReplies.forEach(qr => {
        const label = typeof qr === 'string' ? qr : qr.label;
        const text = typeof qr === 'string' ? qr : qr.text;
        const btn = document.createElement('button');
        btn.className = 'quick-reply-btn';
        btn.textContent = text;
        btn.title = label;
        btn.onclick = () => {
          if (isProcessing) return;
          chatInput.value = text;
          chatForm.dispatchEvent(new Event('submit'));
        };
        quickRepliesContainer.appendChild(btn);
      });

      const npcData = resolveText(currentScene, 'npcText');
      toggleInputLock(true);
      setTimeout(() => {
        showTypingIndicator();
        setTimeout(() => {
          removeTypingIndicator();
          addMessage(currentScene.npcName, npcData.text, 'npc', true, npcData.isCallback);
          playSound('receive');
          if (!currentScene.isEnd) toggleInputLock(false);
          else setTimeout(() => showEndingHint(), 1500);
        }, 1000);
      }, 500);
    }

    function showEndingHint() {
      const hint = document.createElement('div');
      hint.className = 'chat-message ventu';
      const label = currentScene.endingType === 'ruim' ? 'Final ruim' : currentScene.endingType === 'ok' ? 'Final ok' : 'Final bom';
      
      const retryBtn = gameData.charId ? `<button class="retry-btn" onclick="localStorage.removeItem('${saveKey}'); window.location.href='?l=${gameData.level}&c=${gameData.charId}';">Tentar de Novo (Reiniciar POV)</button>` : '';
      const backBtn = `<button class="retry-btn" style="background-color: var(--border); color: var(--text);" onclick="window.location.href='?l=${gameData.level}';">Voltar para as Perspectivas</button>`;

      const shareText = encodeURIComponent(`Eu sobrevivi ao caos do ${gameData.title} com ${currentState.energy} de energia sobrando! Será que você consegue não ser demitido? Jogue agora no Ventu: https://ventu-nine.vercel.app`);
      const shareBtn = `<a href="https://api.whatsapp.com/send?text=${shareText}" target="_blank" class="retry-btn" style="background-color: #25D366; color: white; text-decoration: none; display: inline-block; text-align: center; margin-top: 10px;">Compartilhar no WhatsApp</a>`;

      let nextLevelBtn = '';
      if (currentScene.endingType !== 'ruim') {
         if (gameData.level === 'a1') {
             nextLevelBtn = `<button class="retry-btn" style="background-color: var(--player-bubble); color: white;" onclick="window.location.href='?l=a2&c=${gameData.charId}';">Avançar para o Nível 2 (Hotel Luxo)</button>`;
         }
      }

      hint.innerHTML = `<div class="npc-avatar ventu-avatar" style="background: transparent; border: none; width: 40px; height: 40px;"><svg viewBox="0 0 100 100" width="40" height="40"><path d="M 14 52 L 22 8 L 42 40 Z" fill="#fbbf24"/><path d="M 86 52 L 78 8 L 58 40 Z" fill="#fbbf24"/><path d="M 10 48 Q 10 78, 50 96 Q 90 78, 90 48 Q 90 38, 80 38 L 20 38 Q 10 38, 10 48 Z" fill="#fbbf24"/><path d="M 50 92 Q 35 84, 32 72 Q 40 76, 50 76 Q 60 76, 68 72 Q 65 84, 50 92 Z" fill="#fef3c7"/><ellipse cx="35" cy="58" rx="3.5" ry="5" fill="#0b0f19"/><ellipse cx="65" cy="58" rx="3.5" ry="5" fill="#0b0f19"/><path d="M 46 72 L 54 72 L 50 78 Z" fill="#0b0f19"/></svg></div><div class="msg-content"><span class="msg-sender">Ventu</span><div class="msg-bubble"><strong>${label}.</strong><br><div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 15px;">${nextLevelBtn} ${retryBtn} ${backBtn}</div><div style="margin-top: 15px;">${shareBtn}</div></div></div>`;
      
      chatHistory.appendChild(hint);
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    function addMessage(sender, text, type, useTypewriter, isCallback = false) {
      const msgDiv = document.createElement('div');
      msgDiv.className = `chat-message ${type}`;
      let avatar;
      
      if (type === 'npc') {
        let emoji = gameData.emoji || '👤';
        if (!gameData.emoji) {
            if (sender.includes('Emma')) emoji = '👩';
            else if (sender.includes('Silva')) emoji = '👨‍💼';
            else if (sender.includes('Lucas')) emoji = '🧑';
            else if (sender.includes('Davi')) emoji = '👨‍🍳';
            else if (sender.includes('Chloe')) emoji = '🕵️‍♀️';
            else if (sender === 'Narrador') emoji = '📖';
            else if (sender === 'Sistema') emoji = '⚙️';
        }
        avatar = `<div class="npc-avatar">${emoji}</div>`;
      }
      else if (type === 'ventu') avatar = `<div class="npc-avatar ventu-avatar" style="background: transparent; border: none; width: 40px; height: 40px;"><svg viewBox="0 0 100 100" width="40" height="40"><path d="M 14 52 L 22 8 L 42 40 Z" fill="#fbbf24"/><path d="M 86 52 L 78 8 L 58 40 Z" fill="#fbbf24"/><path d="M 10 48 Q 10 78, 50 96 Q 90 78, 90 48 Q 90 38, 80 38 L 20 38 Q 10 38, 10 48 Z" fill="#fbbf24"/><path d="M 50 92 Q 35 84, 32 72 Q 40 76, 50 76 Q 60 76, 68 72 Q 65 84, 50 92 Z" fill="#fef3c7"/><ellipse cx="35" cy="58" rx="3.5" ry="5" fill="#0b0f19"/><ellipse cx="65" cy="58" rx="3.5" ry="5" fill="#0b0f19"/><path d="M 46 72 L 54 72 L 50 78 Z" fill="#0b0f19"/></svg></div>`;
      else avatar = `<div class="npc-avatar player-avatar">Você</div>`;
      
      msgDiv.innerHTML = `${avatar}<div class="msg-content"><span class="msg-sender">${sender}</span><div class="msg-bubble ${isCallback ? 'callback-bubble' : ''}"></div></div>`;
      const bubble = msgDiv.querySelector('.msg-bubble');
      if (useTypewriter) typeWriterEffect(bubble, text); else bubble.innerHTML = text;
      
      chatHistory.appendChild(msgDiv);
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    function addUserMessage(text) {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'chat-message player';
      msgDiv.innerHTML = `<div class="npc-avatar player-avatar">Você</div><div class="msg-content"><span class="msg-sender">Você</span><div class="msg-bubble">${text}</div></div>`;
      chatHistory.appendChild(msgDiv);
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    function handleUserInput(text) {
      toggleInputLock(true);
      playSound('send');

      if (OFFENSIVE.test(text) && currentScene.offensiveScene) {
        playSound('error');
        setTimeout(() => { loadScene(currentScene.offensiveScene); }, 1000);
        return;
      }

      let matchedIntent = null;
      if (currentScene.intents) {
        for (const intent of currentScene.intents) {
          if (intent.match.test(text)) { matchedIntent = intent; break; }
        }
      }

      if (matchedIntent) {
        playSound('success');
        if (matchedIntent.addsFlags) setFlags(matchedIntent.addsFlags);
        
        let usedItem = false;
        if (matchedIntent.requiresItem) {
            const inv = JSON.parse(localStorage.getItem('ventu_inventory') || '[]');
            if (inv.includes(matchedIntent.requiresItem)) {
                inv.splice(inv.indexOf(matchedIntent.requiresItem), 1);
                localStorage.setItem('ventu_inventory', JSON.stringify(inv));
                matchedIntent.money = 0;
                usedItem = true;
            }
        }

        if (usedItem) {
             addMessage('Sistema', `✨ Você usou o item <em>${matchedIntent.requiresItem}</em> que já tinha comprado! (Nenhum dinheiro extra gasto)`, 'ventu', false);
        } else if (matchedIntent.money) {
             if (currentState.money < Math.abs(matchedIntent.money)) {
                 playSound('error');
                 addMessage('Sistema', 'Você não tem dinheiro suficiente para isso!', 'ventu', false);
                 toggleInputLock(false);
                 return;
             }
             currentState.money += matchedIntent.money;
             updateHUD();
        }

        if (matchedIntent.energyCost) {
            currentState.energy = Math.max(0, currentState.energy - matchedIntent.energyCost);
            updateHUD();
            if (checkExhaustion()) return;
        }

        // NOVO: Feedback pedagógico da Ventu
        if (matchedIntent.explanation) {
            setTimeout(() => {
                addMessage('Ventu', `💡 <em>${matchedIntent.explanation}</em>`, 'ventu', false);
            }, 1000);
        }

        if (matchedIntent.response) {
          toggleInputLock(true);
          showTypingIndicator();
          setTimeout(() => {
            removeTypingIndicator();
            addMessage(currentScene.npcName, matchedIntent.response, 'npc', true);
            playSound('receive');
            setTimeout(() => {
              if (matchedIntent.nextScene) loadScene(matchedIntent.nextScene);
              else toggleInputLock(false);
            }, 1500);
          }, 1000);
        } else if (matchedIntent.nextScene) { loadScene(matchedIntent.nextScene); } else { toggleInputLock(false); }
      } else {
        playSound('error');
        let energyLoss = 15; 
        const inv = JSON.parse(localStorage.getItem('ventu_inventory') || '[]');
        
        if (gameData.charId === 'emma' && inv.includes('umbrella') && currentSceneId.includes('emma_a2')) {
            energyLoss = 0;
            addMessage('Sistema', '☂️ Seu guarda-chuva te protegeu da chuva! (Nenhuma energia perdida)', 'ventu', false);
        } else {
            currentState.energy = Math.max(0, currentState.energy - energyLoss);
        }
        
        updateHUD();
        saveGame();

        if (checkExhaustion()) return;

        showTypingIndicator();
        setTimeout(() => {
          removeTypingIndicator();
          addMessage(currentScene.npcName, currentScene.fallback || "...", 'npc', true);
          playSound('receive');
          setTimeout(() => { toggleInputLock(false); }, 1000);
        }, 1000);
      }
    }

    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (isProcessing) return;
      const text = chatInput.value.trim();
      if (!text) return;
      addUserMessage(text);
      chatInput.value = '';
      handleUserInput(text);
    });
  }
});