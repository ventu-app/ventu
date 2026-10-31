document.addEventListener('DOMContentLoaded', () => {
  const rawData = window.currentGameData;
  const multiChar = rawData && rawData.characters;

  if (multiChar) {
    const urlChar = new URLSearchParams(window.location.search).get('c');
    if (urlChar && multiChar[urlChar]) {
      startGame({ ...multiChar[urlChar], level: rawData.level });
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
    if (!overlay) { startGame({ ...data.characters[Object.keys(data.characters)[0]], level: data.level }); return; }

    overlay.hidden = false;

    const firstPick = localStorage.getItem('ventu_a1_firstPick');
    const completed = JSON.parse(localStorage.getItem('ventu_a1_completed') || '{}');
    const firstDone = firstPick && completed[firstPick];

    if (firstPick && !firstDone) {
      title.textContent = 'Continue sua perspectiva';
      hint.textContent = `Termine ${data.characters[firstPick].name} para desbloquear as outras perspectivas.`;
    } else if (firstDone) {
      title.textContent = 'Perspectivas desbloqueadas';
      hint.textContent = 'Você já viu uma perspectiva. As outras têm callbacks novos.';
    } else {
      title.textContent = 'Escolha sua perspectiva';
      hint.textContent = 'A mesma noite. Três ângulos. Escolha por onde começar.';
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
        if (!firstPick) localStorage.setItem('ventu_a1_firstPick', charId);
        overlay.hidden = true;
        history.replaceState(null, '', `?l=${data.level}&c=${charId}`);
        startGame({ ...ch, level: data.level });
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
    const missionTitle = document.getElementById('mission-title');
    const statMoney = document.getElementById('stat-money');
    const statEnergy = document.getElementById('stat-energy');
    const glossaryList = document.getElementById('glossary-list');
    const headerTitle = document.getElementById('mission-title');

    if (gameData.subtitle) {
      headerTitle.textContent = `${gameData.subtitle} — ${gameData.title || ''}`.replace(/ — $/, '');
    } else {
      headerTitle.textContent = gameData.title;
    }

    const saveKey = gameData.charId ? `ventu_save_${gameData.level}_${gameData.charId}` : `ventu_save_${gameData.level}`;
    const flagsKey = `ventu_flags_${gameData.level}`;

    const OFFENSIVE = /(fuck|shit|bitch|idiot|stupid|asshole|dumb|moron|hate you|shut up|go to hell|screw you)/i;

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
          if (!v.ifFlag || hasFlag(v.ifFlag)) return v[field] || v.text;
        }
      }
      return scene[field];
    }

    const saved = localStorage.getItem(saveKey);
    if (saved) {
      try {
        const p = JSON.parse(saved);
        currentState = p.state || currentState;
        currentSceneId = p.sceneId || currentSceneId;
        currentScene = gameData.scenes[currentSceneId] || currentScene;
        console.log('💾 Save carregado:', saveKey);
      } catch (e) {}
    }

    function saveGame() { localStorage.setItem(saveKey, JSON.stringify({ state: currentState, sceneId: currentSceneId })); }

    function markCompleted() {
      if (!gameData.charId) return;
      const key = `ventu_a1_completed`;
      try {
        const c = JSON.parse(localStorage.getItem(key) || '{}');
        c[gameData.charId] = true;
        localStorage.setItem(key, JSON.stringify(c));
      } catch (e) {}
    }

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    function playSound(type) {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator(); const gain = audioCtx.createGain();
      osc.connect(gain); gain.connect(audioCtx.destination);
      if (type === 'send') { osc.type = 'sine'; osc.frequency.setValueAtTime(600, audioCtx.currentTime); osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1); gain.gain.setValueAtTime(0.1, audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1); osc.start(); osc.stop(audioCtx.currentTime + 0.1); }
      else if (type === 'receive') { osc.type = 'triangle'; osc.frequency.setValueAtTime(400, audioCtx.currentTime); osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.1); gain.gain.setValueAtTime(0.1, audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15); osc.start(); osc.stop(audioCtx.currentTime + 0.15); }
      else if (type === 'cash') { osc.type = 'square'; osc.frequency.setValueAtTime(1200, audioCtx.currentTime); osc.frequency.setValueAtTime(1500, audioCtx.currentTime + 0.05); gain.gain.setValueAtTime(0.05, audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2); osc.start(); osc.stop(audioCtx.currentTime + 0.2); }
    }

    updateHUD();
    loadScene(currentSceneId);

    function updateHUD() {
      statMoney.textContent = `$ ${currentState.money.toFixed(2)}`;
      statEnergy.textContent = `${currentState.energy}/100`;
      statMoney.style.color = currentState.money <= 0 ? 'var(--error)' : 'var(--gold)';
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
        btn.textContent = label;
        btn.onclick = () => {
          if (isProcessing) return;
          chatInput.value = text;
          chatForm.dispatchEvent(new Event('submit'));
        };
        quickRepliesContainer.appendChild(btn);
      });

      const npcText = resolveText(currentScene, 'npcText');
      toggleInputLock(true);
      setTimeout(() => {
        showTypingIndicator();
        setTimeout(() => {
          removeTypingIndicator();
          addMessage(currentScene.npcName, npcText, 'npc', true);
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
      hint.innerHTML = `<div class="npc-avatar ventu-avatar" style="background: transparent; border: none; width: 40px; height: 40px;"><svg viewBox="0 0 100 100" width="40" height="40"><path d="M 14 52 L 22 8 L 42 40 Z" fill="#fbbf24"/><path d="M 86 52 L 78 8 L 58 40 Z" fill="#fbbf24"/><path d="M 10 48 Q 10 78, 50 96 Q 90 78, 90 48 Q 90 38, 80 38 L 20 38 Q 10 38, 10 48 Z" fill="#fbbf24"/><path d="M 50 92 Q 35 84, 32 72 Q 40 76, 50 76 Q 60 76, 68 72 Q 65 84, 50 92 Z" fill="#fef3c7"/><ellipse cx="35" cy="58" rx="3.5" ry="5" fill="#0b0f19"/><ellipse cx="65" cy="58" rx="3.5" ry="5" fill="#0b0f19"/><path d="M 46 72 L 54 72 L 50 78 Z" fill="#0b0f19"/></svg></div><div class="msg-content"><span class="msg-sender">Ventu</span><div class="msg-bubble">${label}. <a href="?l=${gameData.level}" style="color: var(--gold); text-decoration: underline;">Voltar para as perspectivas</a></div></div>`;
      chatHistory.appendChild(hint);
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    function addMessage(sender, text, type, useTypewriter) {
      const msgDiv = document.createElement('div');
      msgDiv.className = `chat-message ${type}`;
      let avatar;
      if (type === 'npc') avatar = `<div class="npc-avatar">👤</div>`;
      else if (type === 'ventu') avatar = `<div class="npc-avatar ventu-avatar" style="background: transparent; border: none; width: 40px; height: 40px;"><svg viewBox="0 0 100 100" width="40" height="40"><path d="M 14 52 L 22 8 L 42 40 Z" fill="#fbbf24"/><path d="M 86 52 L 78 8 L 58 40 Z" fill="#fbbf24"/><path d="M 10 48 Q 10 78, 50 96 Q 90 78, 90 48 Q 90 38, 80 38 L 20 38 Q 10 38, 10 48 Z" fill="#fbbf24"/><path d="M 50 92 Q 35 84, 32 72 Q 40 76, 50 76 Q 60 76, 68 72 Q 65 84, 50 92 Z" fill="#fef3c7"/><ellipse cx="35" cy="58" rx="3.5" ry="5" fill="#0b0f19"/><ellipse cx="65" cy="58" rx="3.5" ry="5" fill="#0b0f19"/><path d="M 46 72 L 54 72 L 50 78 Z" fill="#0b0f19"/></svg></div>`;
      else avatar = `<div class="npc-avatar player-avatar">Você</div>`;
      msgDiv.innerHTML = `${avatar}<div class="msg-content"><span class="msg-sender">${sender}</span><div class="msg-bubble"></div></div>`;
      const bubble = msgDiv.querySelector('.msg-bubble');
      
      if (useTypewriter) {
        typeWriterEffect(bubble, text);
      } else {
        bubble.textContent = text;
      }
      
      chatHistory.appendChild(msgDiv);
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    function addUserMessage(text) {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'chat-message player';
      msgDiv.innerHTML = `
        <div class="npc-avatar player-avatar">Você</div>
        <div class="msg-content">
          <span class="msg-sender">Você</span>
          <div class="msg-bubble">${text}</div>
        </div>
      `;
      chatHistory.appendChild(msgDiv);
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    function handleUserInput(text) {
      toggleInputLock(true);
      playSound('send');

      // Verificação de ofensa / palavras ruins
      if (OFFENSIVE.test(text) && currentScene.offensiveScene) {
        setTimeout(() => {
          loadScene(currentScene.offensiveScene);
        }, 1000);
        return;
      }

      let matchedIntent = null;
      if (currentScene.intents) {
        for (const intent of currentScene.intents) {
          if (intent.match.test(text)) {
            matchedIntent = intent;
            break;
          }
        }
      }

      if (matchedIntent) {
        if (matchedIntent.addsFlags) setFlags(matchedIntent.addsFlags);
        
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
        } else if (matchedIntent.nextScene) {
          loadScene(matchedIntent.nextScene);
        } else {
          toggleInputLock(false);
        }
      } else {
        // Fallback
        showTypingIndicator();
        setTimeout(() => {
          removeTypingIndicator();
          addMessage(currentScene.npcName, currentScene.fallback || "...", 'npc', true);
          playSound('receive');
          setTimeout(() => {
            toggleInputLock(false);
          }, 1000);
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