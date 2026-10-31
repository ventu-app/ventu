document.addEventListener('DOMContentLoaded', () => {
  const chatHistory = document.getElementById('chat-history');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const quickRepliesContainer = document.getElementById('quick-replies');
  
  const missionTitle = document.getElementById('mission-title');
  const statMoney = document.getElementById('stat-money');
  const statEnergy = document.getElementById('stat-energy');
  const glossaryList = document.getElementById('glossary-list');

  let currentState = { ...gameData.initialState };
  let currentSceneId = gameData.startScene;
  let currentScene = gameData.scenes[currentSceneId];
  let isProcessing = false;

  // --- ÁUDIO NATIVO ---
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  function playSound(type) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    if (type === 'send') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      osc.start(); osc.stop(audioCtx.currentTime + 0.1);
    } else if (type === 'receive') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
      osc.start(); osc.stop(audioCtx.currentTime + 0.15);
    }
  }

  missionTitle.textContent = gameData.title;
  updateHUD();
  loadScene(currentSceneId);

  function updateHUD() {
    statMoney.textContent = `$ ${currentState.money.toFixed(2)}`;
    statEnergy.textContent = `${currentState.energy}/100`;
  }

  function toggleInputLock(lock) {
    isProcessing = lock;
    chatInput.disabled = lock;
    chatForm.querySelector('button').disabled = lock;
    const qBtns = quickRepliesContainer.querySelectorAll('button');
    qBtns.forEach(btn => btn.disabled = lock);
    if (!lock) chatInput.focus();
  }

  function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message npc typing-indicator-container';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
      <div class="npc-avatar">👤</div>
      <div class="msg-content">
        <div class="msg-bubble typing-bubble">
          <span class="dot"></span><span class="dot"></span><span class="dot"></span>
        </div>
      </div>
    `;
    chatHistory.appendChild(typingDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
  }

  function loadScene(sceneId) {
    currentScene = gameData.scenes[sceneId];
    
    glossaryList.innerHTML = '';
    if (currentScene.glossary) {
      currentScene.glossary.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${item.word}</strong>: ${item.meaning}`;
        glossaryList.appendChild(li);
      });
    }

    quickRepliesContainer.innerHTML = '';
    if (currentScene.quickReplies) {
      currentScene.quickReplies.forEach(reply => {
        const btn = document.createElement('button');
        btn.className = 'quick-reply-btn';
        btn.textContent = reply;
        btn.onclick = () => {
          if (isProcessing) return;
          chatInput.value = reply;
          chatForm.dispatchEvent(new Event('submit'));
        };
        quickRepliesContainer.appendChild(btn);
      });
    }

    toggleInputLock(true);
    setTimeout(() => {
      showTypingIndicator();
      setTimeout(() => {
        removeTypingIndicator();
        addMessage(currentScene.npcName, currentScene.npcText, 'npc');
        playSound('receive');
        if (!currentScene.isEnd) toggleInputLock(false);
      }, 1000);
    }, 500);
  }

  function addMessage(sender, text, type) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${type}`;
    
    let avatar = '';
    if (type === 'npc') {
      avatar = `<div class="npc-avatar">👤</div>`;
    } else if (type === 'ventu') {
      avatar = `<div class="npc-avatar ventu-avatar" style="background: transparent; border: none; width: 40px; height: 40px;">
        <svg viewBox="0 0 100 100" width="40" height="40">
          <path d="M 14 52 L 22 8 L 42 40 Z" fill="#fbbf24"/><path d="M 86 52 L 78 8 L 58 40 Z" fill="#fbbf24"/><path d="M 22 46 L 25 22 L 36 38 Z" fill="#ea580c"/><path d="M 78 46 L 75 22 L 64 38 Z" fill="#ea580c"/><path d="M 10 48 Q 10 78, 50 96 Q 90 78, 90 48 Q 90 38, 80 38 L 20 38 Q 10 38, 10 48 Z" fill="#fbbf24"/><path d="M 50 92 Q 35 84, 32 72 Q 40 76, 50 76 Q 60 76, 68 72 Q 65 84, 50 92 Z" fill="#fef3c7"/><ellipse cx="35" cy="58" rx="3.5" ry="5" fill="#0b0f19"/><ellipse cx="65" cy="58" rx="3.5" ry="5" fill="#0b0f19"/><path d="M 46 72 L 54 72 L 50 78 Z" fill="#0b0f19"/>
        </svg>
      </div>`;
    } else {
      avatar = `<div class="npc-avatar player-avatar">Você</div>`;
    }

    msgDiv.innerHTML = `
      ${avatar}
      <div class="msg-content">
        <span class="msg-sender">${sender}</span>
        <div class="msg-bubble">${text}</div>
      </div>
    `;

    chatHistory.appendChild(msgDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (isProcessing) return;
    
    const playerText = chatInput.value.trim();
    if (!playerText) return;

    playSound('send');
    addMessage('Você', playerText, 'player');
    chatInput.value = '';
    processPlayerResponse(playerText);
  });

  async function processPlayerResponse(text) {
    toggleInputLock(true);
    let matchedIntent = null;
    let usedAI = false;

    // 1. TENTA USAR A INTELIGÊNCIA ARTIFICIAL
    try {
      const validIntents = currentScene.intents ? currentScene.intents.map(i => i.id) : [];
      
      // Se não houver intenções na cena (ex: cena final), nem chama a IA
      if (validIntents.length > 0) {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            message: text, 
            context: currentScene.npcText,
            validIntents: validIntents
          })
        });

        if (response.ok) {
          const data = await response.json();
          matchedIntent = currentScene.intents.find(i => i.id === data.intent);
          if (matchedIntent) usedAI = true;
        }
      }
    } catch (error) {
      console.log('IA indisponível (modo local), usando Regex.', error);
    }

    // 2. FALLBACK: SE A IA FALHAR OU ESTIVER RODANDO LOCAL, USA REGEX
    if (!matchedIntent && currentScene.intents) {
      for (let intent of currentScene.intents) {
        if (intent.match.test(text)) {
          matchedIntent = intent;
          break;
        }
      }
    }

    // 3. EXIBE A RESPOSTA
    setTimeout(() => {
      showTypingIndicator();
      
      setTimeout(() => {
        removeTypingIndicator();
        
        if (matchedIntent) {
          addMessage(currentScene.npcName, matchedIntent.response, 'npc');
          playSound('receive');
          
          // Se usou IA, a Ventu comenta!
          if (usedAI) {
             addMessage('Ventu', "Uau, a IA entendeu perfeitamente o que você quis dizer!", 'ventu');
          } else if (Math.random() > 0.5) {
             addMessage('Ventu', "Boa! Você se fez entender.", 'ventu');
          }
          
          if (matchedIntent.nextScene) {
            setTimeout(() => {
              loadScene(matchedIntent.nextScene);
            }, 2000);
          } else {
            toggleInputLock(false);
          }
        } else {
          addMessage(currentScene.npcName, currentScene.fallback, 'npc');
          playSound('receive');
          addMessage('Ventu', "Tente usar palavras-chave diferentes. O que exatamente você quer dizer?", 'ventu');
          toggleInputLock(false);
        }
      }, 1200);
    }, 400);
  }
});