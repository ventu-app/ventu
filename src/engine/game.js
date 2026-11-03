/**
 * Ventu Game Engine v5.4 (Pronunciation Traps + Complete Clean)
 */

(function() {
    let gameData = null;
    let currentLevel = 'a1';
    let currentCharId = null;
    let currentSceneId = null;
    let state = { energy: 100, trust: 50, rizz: 50, flags: [], history: [] };
    let isProcessing = false;

    const injectCSS = () => {
        const style = document.createElement('style');
        style.innerHTML = `
            .stat:has(#stat-money) { display: none !important; }
            
            /* Chat Moderno */
            .chat-message { display: flex; flex-direction: column; width: 100%; margin-bottom: 15px; animation: fadeIn 0.3s ease; }
            .chat-message.npc { align-items: flex-start; }
            .chat-message.player { align-items: flex-end; }
            
            .msg-header { display: flex; align-items: center; gap: 6px; margin-bottom: 4px; padding: 0 4px; }
            .msg-header .icon { font-size: 1.1rem; }
            .msg-header .name { font-size: 0.8rem; color: var(--text-muted); font-weight: 600; }
            
            .msg-bubble { 
                background-color: var(--npc-bubble); padding: 12px 16px; border-radius: 4px 16px 16px 16px; 
                font-size: 0.95rem; line-height: 1.5; color: var(--text); 
                max-width: 85%; word-wrap: break-word; position: relative;
            }
            .player .msg-bubble { background-color: var(--player-bubble); border-radius: 16px 4px 16px 16px; color: white; }

            /* Narração */
            .chat-message.narration { align-items: center; margin: 20px 0; }
            .chat-message.narration .msg-header { display: none; }
            .chat-message.narration .msg-bubble { 
                background-color: transparent; border-left: 3px solid var(--gold); 
                border-radius: 0; font-style: italic; color: #cbd5e1; 
                padding: 4px 15px; max-width: 95%; font-size: 0.95rem;
            }

            /* Palavras Interativas (Tooltips) */
            .keyword { 
                text-decoration: underline; text-decoration-style: dotted; text-decoration-color: var(--gold); 
                cursor: pointer; position: relative; font-weight: 500;
            }
            .keyword:hover { color: var(--gold); }
            .tooltip-popover {
                position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); margin-bottom: 8px;
                background: #1e293b; border: 1px solid var(--gold); border-radius: 8px; padding: 10px;
                min-width: 150px; z-index: 100; box-shadow: 0 4px 15px rgba(0,0,0,0.5);
                display: flex; flex-direction: column; gap: 5px; font-size: 0.85rem; color: var(--text);
                animation: fadeIn 0.2s ease; pointer-events: auto;
            }
            .tooltip-popover::after {
                content: ''; position: absolute; top: 100%; left: 50%; transform: translateX(-50%);
                border-width: 6px; border-style: solid; border-color: var(--gold) transparent transparent transparent;
            }
            .tooltip-phonetic { color: var(--text-muted); font-style: italic; font-size: 0.8rem; }
            .tooltip-meaning { font-weight: bold; color: #10b981; }

            /* Lentes */
            .lens-bubble { background-color: #0d1117; border: 1px solid #30363d; border-left: 3px solid #4a90d9; padding: 12px; border-radius: 8px; font-size: 0.85rem; width: 100%; margin-top: 5px; animation: fadeIn 0.4s ease; align-self: flex-start; max-width: 85%;}
            .lens-line { display: flex; gap: 8px; margin-bottom: 8px; line-height: 1.4; }
            .lens-line:last-child { margin-bottom: 0; }
            .lens-line.good { color: #3fb950; }
            .lens-line.odd { color: #f0883e; }
            .lens-line.native { color: #8ab4f8; font-style: italic; display: flex; justify-content: space-between; align-items: center; }
            .lens-line .ico { flex-shrink: 0; font-weight: bold; }
            
            /* Botões */
            .action-btn { background: transparent; border: none; cursor: pointer; font-size: 1.1rem; margin-left: 8px; opacity: 0.7; transition: 0.2s; color: inherit; }
            .action-btn:hover { opacity: 1; transform: scale(1.1); }
            
            /* Glossário Lateral */
            .gloss-item { display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; margin-bottom: 8px; cursor: pointer; transition: 0.2s; }
            .gloss-item:hover { background: rgba(255,255,255,0.1); }
            .gloss-item strong { color: var(--gold); }

            /* Subtexto */
            .subtext-container { display: flex; flex-direction: column; gap: 8px; width: 100%; margin-bottom: 10px; background: rgba(139, 92, 246, 0.1); padding: 15px; border-radius: 12px; border: 1px solid #8b5cf6; }
            .subtext-title { font-size: 0.85rem; color: #8b5cf6; font-weight: bold; display: flex; align-items: center; gap: 5px; margin-bottom: 5px; }
            .subtext-btn { background: #1e293b; border: 1px solid #8b5cf6; color: #e2e8f0; padding: 10px 15px; border-radius: 8px; cursor: pointer; font-size: 0.9rem; text-align: left; transition: 0.2s; }
            .subtext-btn:hover { background: #8b5cf6; color: white; }
            .subtext-feedback { padding: 10px; border-radius: 8px; font-size: 0.85rem; line-height: 1.4; }
            .subtext-feedback.correct { background: rgba(16, 185, 129, 0.2); border: 1px solid #10b981; color: #10b981; }
            .subtext-feedback.wrong { background: rgba(239, 68, 68, 0.2); border: 1px solid #ef4444; color: #ef4444; }

            /* Microfone */
            .mic-btn { background: transparent; color: var(--gold); border: 1px solid var(--border); padding: 0 15px; border-radius: 8px; cursor: pointer; font-size: 1.2rem; transition: all 0.2s; }
            .mic-btn.active { background: #ef4444; color: white; border-color: #ef4444; animation: pulse 1.5s infinite; }
            @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); } 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }

            /* FAB Deck */
            .fab-deck { position: fixed; bottom: 80px; right: 20px; width: 50px; height: 50px; background: var(--gold); color: var(--bg); border-radius: 50%; display: flex; justify-content: center; align-items: center; font-size: 1.5rem; box-shadow: 0 4px 10px rgba(0,0,0,0.5); cursor: pointer; z-index: 50; transition: 0.2s; }
            .fab-deck:hover { transform: scale(1.1); background: var(--gold-hover); }

            /* Dopamina Visual */
            .floating-stat { position: fixed; font-weight: bold; font-size: 1.2rem; pointer-events: none; z-index: 2000; animation: floatUp 1.5s ease-out forwards; text-shadow: 0 2px 4px rgba(0,0,0,0.8); }
            @keyframes floatUp { 0% { opacity: 1; transform: translateY(0) scale(1); } 100% { opacity: 0; transform: translateY(-50px) scale(1.2); } }
            
            /* Modais Base */
            .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.9); display: flex; justify-content: center; align-items: center; z-index: 1000; padding: 15px; }
            .modal-content { background: var(--panel); border: 1px solid var(--gold); border-radius: 12px; padding: 20px; max-width: 500px; width: 100%; max-height: 85vh; overflow-y: auto; }
            .cut-line { margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid var(--border); }
            .cut-line:last-child { border-bottom: none; }
            .cut-line .native { color: #8ab4f8; font-style: italic; margin-top: 8px; display: flex; justify-content: space-between; align-items: center; }

            /* FLASHCARD PREMIUM */
            .flashcard-scene { perspective: 1000px; width: 100%; max-width: 320px; height: 420px; margin: 0 auto; cursor: pointer; }
            .flashcard { width: 100%; height: 100%; position: relative; transition: transform 0.6s; transform-style: preserve-3d; }
            .flashcard.is-flipped { transform: rotateY(180deg); }
            .card-face { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 20px; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 20px; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
            .card-front { background: linear-gradient(145deg, #1e293b, #0f172a); border: 1px solid rgba(251, 191, 36, 0.3); color: white; }
            .card-back { background: linear-gradient(145deg, #111827, #0b0f19); border: 1px solid var(--gold); color: var(--text); transform: rotateY(180deg); }
            .card-emoji { font-size: 4rem; margin-bottom: 20px; text-shadow: 0 4px 10px rgba(0,0,0,0.5); }
            .card-word { font-size: 2.2rem; font-weight: bold; margin-bottom: 10px; text-shadow: 0 2px 4px rgba(0,0,0,0.5); }
            .card-meaning { font-size: 1.5rem; color: #10b981; font-weight: bold; margin-bottom: 10px; }
            .deck-controls { display: flex; justify-content: center; gap: 20px; margin-top: 25px; }
            .btn-wrong { background: #ef4444; color: white; border: none; padding: 15px 30px; border-radius: 30px; font-weight: bold; font-size: 1.1rem; cursor: pointer; box-shadow: 0 4px 10px rgba(239,68,68,0.3); transition: 0.2s; }
            .btn-right { background: #10b981; color: white; border: none; padding: 15px 30px; border-radius: 30px; font-weight: bold; font-size: 1.1rem; cursor: pointer; box-shadow: 0 4px 10px rgba(16,185,129,0.3); transition: 0.2s; }
            .btn-wrong:hover { transform: scale(1.05); } .btn-right:hover { transform: scale(1.05); }
            .deck-progress { text-align: center; color: var(--gold); font-weight: bold; font-size: 0.9rem; margin-bottom: 15px; letter-spacing: 1px; text-transform: uppercase; }

            @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        `;
        document.head.appendChild(style);

        const fab = document.createElement('div');
        fab.className = 'fab-deck';
        fab.innerHTML = '🎓';
        fab.title = 'Meu Deck de Revisão';
        fab.onclick = showDeck;
        document.body.appendChild(fab);
    };

    // --- UI E HELPERS ---
    const chatHistory = () => document.getElementById('chat-history');
    const quickReplies = () => document.getElementById('quick-replies');
    const chatInput = () => document.getElementById('chat-input');
    const btnSend = () => document.getElementById('btn-send');

    function scrollToBottom() { chatHistory().scrollTop = chatHistory().scrollHeight; }

    function triggerFloatingStat(text, color) {
        const el = document.createElement('div');
        el.className = 'floating-stat';
        el.style.color = color;
        el.style.right = '20px';
        el.style.top = '60px';
        el.textContent = text;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 1500);
    }

    function updateStats(trustChange = 0, rizzChange = 0) {
        document.getElementById('stat-energy').textContent = `${state.energy}/100`;
        
        if (trustChange !== 0) {
            state.trust = Math.max(0, Math.min(100, state.trust + trustChange));
            triggerFloatingStat(`${trustChange > 0 ? '+' : ''}${trustChange} Trust`, trustChange > 0 ? '#10b981' : '#ef4444');
        }
        if (rizzChange !== 0) {
            state.rizz = Math.max(0, Math.min(100, state.rizz + rizzChange));
            triggerFloatingStat(`${rizzChange > 0 ? '+' : ''}${rizzChange} Rizz`, rizzChange > 0 ? '#8b5cf6' : '#ef4444');
        }

        const trustContainer = document.getElementById('stat-trust-container');
        const rizzContainer = document.getElementById('stat-rizz-container');
        if (trustContainer) { trustContainer.style.display = 'flex'; document.getElementById('stat-trust').textContent = state.trust; }
        if (rizzContainer) { rizzContainer.style.display = 'flex'; document.getElementById('stat-rizz').textContent = state.rizz; }
    }

    function processTextWithGlossary(text, glossary) {
        if (!glossary || glossary.length === 0) return text;
        let formatted = text;
        glossary.forEach(item => {
            try {
                const safeWord = item.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regex = new RegExp(`\\b(${safeWord})\\b`, 'gi');
                formatted = formatted.replace(regex, (match) => {
                    return `<span class="keyword" data-word="${match}" data-meaning="${item.meaning}" data-phonetic="${item.phonetic || ''}">${match}</span>`;
                });
            } catch (e) {}
        });
        return formatted;
    }

    function updateGlossary(glossary) {
        const list = document.getElementById('glossary-list');
        list.innerHTML = '';
        if (!glossary) return;
        glossary.forEach(item => {
            const div = document.createElement('div');
            div.className = 'gloss-item';
            div.innerHTML = `<span><strong>${item.word}</strong>: ${item.meaning}</span> <button class="action-btn tts-btn" data-text="${item.word}" data-gender="female">🔊</button>`;
            div.onclick = (e) => { if(e.target.tagName !== 'BUTTON') window.VentuEngine.speak(item.word, 'female'); };
            list.appendChild(div);
        });
    }

        function getAvatarEmoji(name) {
        if (!name) return '💬';
        if (name.includes('Silva')) return '👨‍💼';
        if (name.includes('Lucas')) return '👨🏾'; // Atualizado para diversidade
        if (name.includes('Davi')) return '👨‍🍳';
        if (name.includes('Emma')) return '👩';
        if (name.includes('Narração') || name.includes('Narrador') || name.includes('Sistema')) return '📖';
        return '💬';
    }

    function addMessage(text, sender, npcName, isTyping = false, glossary = null) {
        const div = document.createElement('div');
        div.className = `chat-message ${sender}`;
        
        const isNarration = (npcName === 'Narração' || npcName === 'Narrador' || npcName === 'Sistema');
        if (isNarration) div.classList.add('narration');

        const content = document.createElement('div');
        content.className = 'msg-content';
        content.style.display = 'flex';
        content.style.flexDirection = 'column';
        content.style.alignItems = sender === 'player' ? 'flex-end' : 'flex-start';
        content.style.width = '100%';

        if (!isNarration) {
            const header = document.createElement('div');
            header.className = 'msg-header';
            const icon = sender === 'player' ? '👤' : getAvatarEmoji(npcName);
            const displayName = sender === 'player' ? 'Você' : npcName;
            header.innerHTML = `<span class="icon">${icon}</span><span class="name">${displayName}</span>`;
            content.appendChild(header);
        }

        const bubble = document.createElement('div');
        bubble.className = 'msg-bubble';
        
        if (isTyping) {
            bubble.innerHTML = '<div class="typing-bubble"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>';
        } else {
            if (glossary && glossary.length > 0) {
                bubble.innerHTML = processTextWithGlossary(text, glossary);
            } else {
                bubble.textContent = text;
            }
        }

        content.appendChild(bubble);
        div.appendChild(content);
        chatHistory().appendChild(div);
        
        scrollToBottom();
        return div;
    }

    function addLens(lens, gender) {
        const div = document.createElement('div');
        div.className = 'chat-message npc';
        
        const lensDiv = document.createElement('div');
        lensDiv.className = 'lens-bubble';
        lensDiv.innerHTML = `
            <div class="lens-line good"><span class="ico">✓</span><span>${lens.good}</span></div>
            <div class="lens-line odd"><span class="ico">~</span><span>${lens.odd}</span></div>
            <div class="lens-line native">
                <span class="ico">→</span>
                <span style="flex:1">${lens.native}</span>
                <button class="action-btn tts-btn" data-text="${lens.native}" data-gender="${gender}">🔊</button>
                <button class="action-btn save-btn" data-text="${lens.native}" data-context="Frase nativa">💾</button>
            </div>
        `;
        
        div.appendChild(lensDiv);
        chatHistory().appendChild(div);
        scrollToBottom();
    }

    document.body.addEventListener('click', (e) => {
        document.querySelectorAll('.tooltip-popover').forEach(el => el.remove());

        if (e.target.classList.contains('keyword')) {
            e.stopPropagation();
            const word = e.target.getAttribute('data-word');
            const meaning = e.target.getAttribute('data-meaning');
            const phonetic = e.target.getAttribute('data-phonetic');

            const popover = document.createElement('div');
            popover.className = 'tooltip-popover';
            popover.innerHTML = `
                <div style="font-weight:bold; color:var(--gold); display:flex; justify-content:space-between; align-items:center;">
                    ${word} <button class="action-btn tts-btn" data-text="${word}" data-gender="female" style="font-size:1rem; padding:0; margin:0;">🔊</button>
                </div>
                ${phonetic ? `<div class="tooltip-phonetic">${phonetic}</div>` : ''}
                <div class="tooltip-meaning">${meaning}</div>
            `;
            e.target.appendChild(popover);

            window.VentuEngine.savePhrase(word, meaning);
        }

        if (e.target.classList.contains('tts-btn')) {
            e.stopPropagation();
            window.VentuEngine.speak(e.target.getAttribute('data-text'), e.target.getAttribute('data-gender'));
        }
        if (e.target.classList.contains('save-btn')) {
            e.stopPropagation();
            window.VentuEngine.savePhrase(e.target.getAttribute('data-text'), e.target.getAttribute('data-context'));
        }
    });

    function findBestChoice(inputText, choices) {
        const t = inputText.toLowerCase();
        let bestMatch = null;
        let maxHits = 0;

        choices.forEach(choice => {
            let hits = 0;
            if (choice.keywords) {
                choice.keywords.forEach(k => { if (t.includes(k.toLowerCase())) hits++; });
            }
            if (hits > maxHits) {
                maxHits = hits;
                bestMatch = choice;
            }
        });
        return maxHits > 0 ? bestMatch : null;
    }

    function handleFallback(text) {
        addMessage(text, 'player');
        state.energy = Math.max(0, state.energy - 5);
        updateStats();

        const currentScene = gameData.characters[currentCharId].scenes[currentSceneId];
        const gender = (currentScene.npcName === 'Mr. Silva' || currentScene.npcName === 'Lucas') ? 'male' : 'female';

        setTimeout(() => {
            const typingMsg = addMessage('', 'npc', currentScene.npcName, true);
            setTimeout(() => {
                typingMsg.remove();
                addMessage("Huh? I don't understand. What do you mean?", 'npc', currentScene.npcName);
                
                setTimeout(() => {
                    if (state.energy <= 0) return endGame('Você perdeu toda a sua energia tentando se comunicar. Fim de jogo.');
                    renderQuickReplies(currentScene.choices);
                    isProcessing = false;
                    chatInput().disabled = false;
                    btnSend().disabled = false;
                }, 1000);
            }, 1000);
        }, 400);
    }

    function processChoice(choice, typedText = null) {
        if (isProcessing) return;
        isProcessing = true;
        
        chatInput().disabled = true;
        btnSend().disabled = true;
        quickReplies().innerHTML = '';

        addMessage(typedText || choice.text, 'player');
        state.history.push({ said: typedText || choice.text, choice: choice });

        updateStats(choice.trust || 0, choice.rizz || 0);
        
        if (choice.addsFlags) {
            choice.addsFlags.forEach(f => { if (!state.flags.includes(f)) state.flags.push(f); });
        }

        const currentScene = gameData.characters[currentCharId].scenes[currentSceneId];
        const gender = (currentScene.npcName === 'Mr. Silva' || currentScene.npcName === 'Lucas') ? 'male' : 'female';

        setTimeout(() => {
            const typingMsg = addMessage('', 'npc', currentScene.npcName, true);
            setTimeout(() => {
                typingMsg.remove();
                addMessage(choice.response, 'npc', currentScene.npcName, false, currentScene.glossary);
                
                setTimeout(() => {
                    if (choice.lens) addLens(choice.lens, gender);
                    setTimeout(() => {
                        if (choice.nextScene) loadScene(choice.nextScene);
                        else isProcessing = false;
                    }, 2000); 
                }, 800);
            }, 1200); 
        }, 400);
    }

    function renderQuickReplies(choices) {
        quickReplies().innerHTML = '';
        choices.forEach((choice, index) => {
            const btn = document.createElement('button');
            btn.className = 'quick-reply-btn';
            const regLabel = choice.registry.charAt(0).toUpperCase() + choice.registry.slice(1);
            btn.textContent = `[${regLabel}] ${choice.text}`;
            btn.onclick = () => processChoice(choice);
            quickReplies().appendChild(btn);
        });
    }

    function renderSubtext(subtext, scene) {
        const quickArea = quickReplies();
        quickArea.innerHTML = '';
        
        const container = document.createElement('div');
        container.className = 'subtext-container';
        
        const title = document.createElement('div');
        title.className = 'subtext-title';
        title.innerHTML = '🧠 O que ele realmente quis dizer?';
        container.appendChild(title);

        subtext.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'subtext-btn';
            btn.textContent = opt.text;
            
            btn.onclick = () => {
                quickArea.innerHTML = ''; 
                
                if (opt.correct) {
                    state.rizz = Math.min(100, state.rizz + 5);
                    updateStats(0, 5);
                    
                    const successMsg = document.createElement('div');
                    successMsg.className = 'subtext-feedback correct';
                    successMsg.innerHTML = `✓ <strong>Exatamente!</strong> ${opt.tell ? 'Pistas: ' + opt.tell.join(' / ') : ''}`;
                    quickArea.appendChild(successMsg);
                } else {
                    const failMsg = document.createElement('div');
                    failMsg.className = 'subtext-feedback wrong';
                    const correctOpt = subtext.options.find(o=>o.correct);
                    failMsg.innerHTML = `✗ <strong>Na verdade não.</strong> ${correctOpt.tell ? 'Pistas ignoradas: ' + correctOpt.tell.join(' / ') : ''}`;
                    quickArea.appendChild(failMsg);
                }

                setTimeout(() => {
                    const promptDiv = document.createElement('div');
                    promptDiv.style.cssText = "font-size:0.85rem; color:var(--text-muted); margin-bottom:5px; margin-top:10px;";
                    promptDiv.textContent = "Agora, escolha sua resposta:";
                    quickArea.appendChild(promptDiv);
                    
                    renderQuickReplies(scene.choices);
                    isProcessing = false;
                    chatInput().disabled = false;
                    btnSend().disabled = false;
                }, 2500);
            };
            container.appendChild(btn);
        });

        quickArea.appendChild(container);
        isProcessing = true;
        chatInput().disabled = true;
        btnSend().disabled = true;
    }

    function loadScene(sceneId) {
        const char = gameData.characters[currentCharId];
        const scene = char.scenes[sceneId];
        if (!scene) return;

        currentSceneId = sceneId;
        
        if (state.energy <= 0) return endGame('Você desmaiou de exaustão. Fim de jogo.');

        let finalNpcText = scene.npcText;
        if (scene.npcTextVariants) {
            scene.npcTextVariants.forEach(variant => {
                if (state.flags.includes(variant.ifFlag)) finalNpcText = variant.text;
            });
        }

        if (scene.energyCost) {
            state.energy = Math.max(0, state.energy - scene.energyCost);
            updateStats();
        }
        if (scene.addFlags) {
            scene.addFlags.forEach(f => { if (!state.flags.includes(f)) state.flags.push(f); });
        }

        updateGlossary(scene.glossary);

        const progress = window.VentuStorage.getProgress();
        progress.lastLevel = currentLevel;
        progress.lastPOV = currentCharId;
        progress.lastScene = currentSceneId;
        window.VentuStorage.saveProgress(progress);

        if (scene.isEnd) {
            setTimeout(() => {
                const typingMsg = addMessage('', 'npc', scene.npcName, true);
                setTimeout(() => {
                    typingMsg.remove();
                    addMessage(finalNpcText, 'npc', scene.npcName, false, scene.glossary);
                    setTimeout(() => endGame(null, scene.endingType), 2000);
                }, 1000);
            }, 500);
            return;
        }

        setTimeout(() => {
            const typingMsg = addMessage('', 'npc', scene.npcName, true);
            setTimeout(() => {
                typingMsg.remove();
                addMessage(finalNpcText, 'npc', scene.npcName, false, scene.glossary);
                
                if (scene.subtext) {
                    setTimeout(() => {
                        renderSubtext(scene.subtext, scene);
                    }, 1000);
                } else {
                    setTimeout(() => {
                        renderQuickReplies(scene.choices);
                        isProcessing = false;
                        chatInput().disabled = false;
                        btnSend().disabled = false;
                        chatInput().focus();
                    }, 1000);
                }
            }, 1500);
        }, 800);
    }

    function endGame(customText, endingType) {
        isProcessing = true;
        chatInput().disabled = true;
        btnSend().disabled = true;
        quickReplies().innerHTML = '';

        if (customText) addMessage(customText, 'npc', 'Narração');

        const progress = window.VentuStorage.getProgress();
        if (!progress.completedPOVs[currentLevel]) progress.completedPOVs[currentLevel] = [];
        if (!progress.completedPOVs[currentLevel].includes(currentCharId)) {
            progress.completedPOVs[currentLevel].push(currentCharId);
            window.VentuStorage.saveProgress(progress);
        }

        let xpGained = endingType === 'bom' ? 100 : endingType === 'ok' ? 50 : 10;
        window.VentuProgress.addXP(xpGained);
        window.VentuProgress.checkStreak();
        window.VentuProgress.registerMissionProgress('complete_1_scene');

        const btn = document.createElement('button');
        btn.className = 'retry-btn';
        btn.style.width = '100%';
        btn.style.marginTop = '15px';
        btn.textContent = '🎬 Ver o Corte do Diretor';
        btn.onclick = showDirectorCut;
        
        setTimeout(() => {
            chatHistory().appendChild(btn);
            scrollToBottom();
        }, 1000);
    }

    function showDirectorCut() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        let html = `<div class="modal-content"><h2 style="color: var(--gold); margin-bottom: 15px;">🎬 Corte do Diretor</h2>`;
        state.history.forEach(h => {
            html += `<div class="cut-line">
                <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">${h.choice.registry}</div>
                <div style="margin: 5px 0; font-weight: 500;">"${h.said}"</div>
                <div class="native">
                    <span>"${h.choice.lens.native}"</span>
                    <button class="action-btn tts-btn" data-text="${h.choice.lens.native}" data-gender="female">🔊</button>
                </div>
            </div>`;
        });
        html += `<button id="btn-close-cut" style="width: 100%; padding: 12px; background: var(--gold); color: var(--bg); border: none; border-radius: 8px; font-weight: bold; cursor: pointer; margin-top: 15px;">Fechar e Voltar</button></div>`;
        modal.innerHTML = html;
        document.body.appendChild(modal);
        document.getElementById('btn-close-cut').onclick = () => { modal.remove(); window.location.href = 'jogar.html'; };
    }

    let deckQueue = [];
    let currentCardIndex = 0;
    let deckModalInstance = null;

    function getCardEmoji(word) {
        const w = word.toLowerCase();
        if (w.includes('rain')) return '🌧️';
        if (w.includes('late')) return '⏰';
        if (w.includes('street')) return '🛣️';
        if (w.includes('hate')) return '😡';
        if (w.includes('onion')) return '🧅';
        if (w.includes('cook')) return '👨‍🍳';
        if (w.includes('cold')) return '🥶';
        if (w.includes('wait')) return '⏳';
        if (w.includes('job')) return '💼';
        if (w.includes('tip')) return '💵';
        if (w.includes('soak')) return '☔';
        if (w.includes('angry')) return '😠';
        return '📖';
    }

    function showDeck() {
        const deck = window.VentuStorage.getWordBank() || [];
        if (deck.length === 0) {
            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.innerHTML = `<div class="modal-content" style="text-align:center; background: linear-gradient(145deg, #1e293b, #0f172a); border-radius: 20px; border: 1px solid #30363d;">
                <h2 style="color: var(--gold); margin-bottom: 15px;">🎓 Meu Deck</h2>
                <div style="font-size: 4rem; margin-bottom: 15px;">📭</div>
                <p style="color: var(--text-muted);">Seu deck está vazio. Clique nas palavras sublinhadas no jogo para salvá-las!</p>
                <button id="btn-close-empty" style="margin-top:20px; padding: 12px 24px; background: var(--gold); color: #000; border:none; border-radius:8px; font-weight:bold; cursor:pointer;">Entendi</button>
            </div>`;
            document.body.appendChild(modal);
            document.getElementById('btn-close-empty').onclick = () => modal.remove();
            return;
        }

        deckQueue = [...deck]; 
        currentCardIndex = 0;

        deckModalInstance = document.createElement('div');
        deckModalInstance.className = 'modal-overlay';
        deckModalInstance.style.backgroundColor = 'rgba(11, 15, 25, 0.95)';
        deckModalInstance.style.backdropFilter = 'blur(10px)';
        
        document.body.appendChild(deckModalInstance);
        renderDeckCard();
    }

    function renderDeckCard() {
        if (!deckModalInstance) return;
        
        if (currentCardIndex >= deckQueue.length) {
            deckModalInstance.innerHTML = `<div class="modal-content" style="text-align:center; background: linear-gradient(145deg, #1e293b, #0f172a); border-radius: 20px; border: 1px solid #30363d;">
                <h2 style="color: var(--gold); margin-bottom: 15px;">🎉 Deck Concluído!</h2>
                <div style="font-size: 4rem; margin-bottom: 15px;">🏆</div>
                <p style="color: var(--text-muted); margin-bottom: 20px;">Você revisou todos os cards por hoje. Excelente trabalho!</p>
                <button id="btn-close-deck" style="width: 100%; padding: 14px; background: var(--gold); color: var(--bg); border: none; border-radius: 12px; font-weight: bold; cursor: pointer; font-size: 1rem;">Voltar ao Jogo</button>
            </div>`;
            document.getElementById('btn-close-deck').onclick = () => {
                deckModalInstance.remove();
                deckModalInstance = null;
            };
            return;
        }

        const card = deckQueue[currentCardIndex];
        const emoji = getCardEmoji(card.front);
        
        deckModalInstance.innerHTML = `<div class="modal-content" style="background: transparent; border: none; box-shadow: none; padding: 0;">
            <div class="deck-progress">Card ${currentCardIndex + 1} de ${deckQueue.length}</div>
            
            <div class="flashcard-scene" id="flashcard-scene">
                <div class="flashcard" id="flashcard">
                    <div class="card-face card-front">
                        <div class="card-emoji">${emoji}</div>
                        <div class="card-word">${card.front}</div>
                        <button class="action-btn tts-btn" data-text="${card.front}" data-gender="female" style="font-size: 2rem; margin-top: 20px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));">🔊</button>
                        <div style="color:var(--text-muted); font-size:0.8rem; margin-top:auto; opacity: 0.5;">Clique para virar</div>
                    </div>
                    <div class="card-face card-back">
                        <div style="font-size: 2rem; margin-bottom: 15px;">💡</div>
                        <div class="card-meaning">${card.back}</div>
                        <div style="color:var(--text-muted); font-size: 0.8rem; margin-top: 15px;">Significado</div>
                    </div>
                </div>
            </div>

            <div class="deck-controls">
                <button class="btn-wrong" id="btn-deck-wrong">Errei</button>
                <button class="btn-right" id="btn-deck-right">Acertei</button>
            </div>
        </div>`;

        const flashcard = document.getElementById('flashcard');
        document.getElementById('flashcard-scene').onclick = () => {
            flashcard.classList.toggle('is-flipped');
        };

        document.getElementById('btn-deck-right').onclick = () => {
            currentCardIndex++;
            renderDeckCard();
        };

        document.getElementById('btn-deck-wrong').onclick = () => {
            const wrongCard = deckQueue.splice(currentCardIndex, 1)[0];
            deckQueue.push(wrongCard);
            if(currentCardIndex >= deckQueue.length) currentCardIndex = 0;
            renderDeckCard();
        };
    }

    function setupInputs() {
        const form = document.getElementById('chat-form');
        if (form) {
            const micBtn = document.createElement('button');
            micBtn.type = 'button';
            micBtn.className = 'mic-btn';
            micBtn.innerHTML = '🎙️';
            form.insertBefore(micBtn, document.getElementById('btn-send'));

            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.lang = 'en-US';
                recognition.interimResults = false;
                
                micBtn.onclick = () => {
                    if (isProcessing) return;
                    micBtn.classList.add('active');
                    recognition.start();
                };

                recognition.onresult = (e) => {
                    micBtn.classList.remove('active');
                    const transcript = e.results[0][0].transcript.toLowerCase();
                    
                    const currentScene = gameData.characters[currentCharId].scenes[currentSceneId];
                    
                    if (currentScene.phoneme_trap) {
                        const trap = currentScene.phoneme_trap;
                        const isConfused = trap.confusions.some(c => transcript.includes(c));
                        
                        if (isConfused) {
                            isProcessing = true;
                            chatInput().disabled = true;
                            btnSend().disabled = true;
                            quickReplies().innerHTML = '';
                            
                            addMessage(transcript, 'player');
                            window.VentuEngine.savePhrase(`${trap.confusions[0].toUpperCase()} vs ${trap.target.toUpperCase()}`, 'Pronunciation Trap');
                            
                            setTimeout(() => {
                                const typingMsg = addMessage('', 'npc', currentScene.npcName, true);
                                setTimeout(() => {
                                    typingMsg.remove();
                                    addMessage(trap.npc_on_confusion, 'npc', currentScene.npcName);
                                    
                                    setTimeout(() => {
                                        renderQuickReplies(currentScene.choices);
                                        isProcessing = false;
                                        chatInput().disabled = false;
                                        btnSend().disabled = false;
                                    }, 2000);
                                }, 1000);
                            }, 400);
                            return; 
                        }
                    }

                    chatInput().value = transcript;
                    document.getElementById('chat-form').dispatchEvent(new Event('submit'));
                };

                recognition.onerror = () => micBtn.classList.remove('active');
                recognition.onend = () => micBtn.classList.remove('active');
            } else {
                micBtn.style.display = 'none';
            }
        }

        form.onsubmit = (e) => {
            e.preventDefault();
            if (isProcessing) return;
            const text = chatInput().value.trim();
            if (!text) return;
            chatInput().value = '';
            
            const badWords = ['fuck', 'shit', 'bitch', 'asshole', 'idiot', 'stupid', 'dick', 'bastard', 'cunt', 'motherfucker'];
            const lowerText = text.toLowerCase();
            if (badWords.some(word => lowerText.includes(word))) {
                addMessage(text, 'player');
                setTimeout(() => {
                    addMessage("*Silence.* I'm not talking to you anymore. Call ended.", 'npc', gameData.characters[currentCharId].scenes[currentSceneId].npcName);
                    setTimeout(() => endGame("Você foi grosseiro(a). O atendimento foi encerrado e você perdeu o jogo.", 'ruim'), 2000);
                }, 1000);
                return;
            }

            const scene = gameData.characters[currentCharId].scenes[currentSceneId];
            const match = findBestChoice(text, scene.choices);
            if (match) processChoice(match, text);
            else handleFallback(text);
        };
    }

   window.VentuEngine = {
        init: function() {
            injectCSS();
            const params = new URLSearchParams(window.location.search);
            
            // LÊ DA URL, SE NÃO TIVER, LÊ DO STORAGE (Último jogado)
            const progress = window.VentuStorage.getProgress();
            
            currentLevel = params.get('l') || progress.lastLevel || 'a1';
            currentCharId = params.get('c') || progress.lastPOV || 'emma';
            
            // Se a URL não tiver os parâmetros, coloca eles lá para ficar visível (Ex: localhost:3000/jogo?l=a1&c=lucas)
            if (!params.get('l') || !params.get('c')) {
                const newUrl = new URL(window.location);
                newUrl.searchParams.set('l', currentLevel);
                newUrl.searchParams.set('c', currentCharId);
                window.history.replaceState({}, '', newUrl);
            }

            gameData = window.currentGameData;
            if (!gameData) return;

            const char = gameData.characters[currentCharId];
            if (!char) return;

            document.getElementById('mission-title').textContent = gameData.title;
            state.energy = char.initialState.energy;
            
            setupInputs();
            updateStats();
            loadScene(char.startScene);

            // ==========================================
            // Lógica do Glossário Mobile
            // ==========================================
            const btnMobileGloss = document.getElementById('btn-mobile-glossary');
            const modalGloss = document.getElementById('glossary-modal');
            const btnCloseGloss = document.getElementById('btn-close-glossary');

            if (btnMobileGloss && modalGloss) {
                btnMobileGloss.onclick = () => {
                    // Copia o conteúdo do glossário lateral para o modal
                    const listContent = document.getElementById('glossary-list').innerHTML;
                    document.getElementById('mobile-glossary-list').innerHTML = listContent || '<p style="color:var(--text-muted);">Nenhuma palavra nesta cena.</p>';
                    modalGloss.classList.add('open');
                };
                btnCloseGloss.onclick = () => modalGloss.classList.remove('open');
            }
        },

        speak: function(text, gender = 'female') {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'en-US';
                utterance.rate = 0.9;
                
                const voices = window.speechSynthesis.getVoices();
                const maleNames = ['david', 'mark', 'george', 'daniel', 'james', 'paul', 'man', 'male'];
                const femaleNames = ['zira', 'samantha', 'victoria', 'karen', 'susan', 'female'];
                
                let selectedVoice = null;
                if (gender === 'male') {
                    selectedVoice = voices.find(v => v.lang.startsWith('en') && maleNames.some(n => v.name.toLowerCase().includes(n)));
                }
                if (!selectedVoice) {
                    selectedVoice = voices.find(v => v.lang.startsWith('en') && femaleNames.some(n => v.name.toLowerCase().includes(n)));
                }
                if (!selectedVoice) {
                    selectedVoice = voices.find(v => v.lang.startsWith('en'));
                }
                if (selectedVoice) utterance.voice = selectedVoice;
                window.speechSynthesis.speak(utterance);
            }
        },

        savePhrase: function(phrase, context) {
            let bank = window.VentuStorage.getWordBank() || [];
            if (!bank.find(c => c.front === phrase)) {
                bank.push({ front: phrase, back: context, type: 'phrase' });
                window.VentuStorage.set('wordBank', bank);
                const toast = document.createElement('div');
                toast.style = "position:fixed; bottom:20px; left:50%; transform:translateX(-50%); background:var(--gold); color:var(--bg); padding:10px 20px; border-radius:20px; font-weight:bold; z-index:2000; font-size:0.9rem; animation: fadeIn 0.3s ease;";
                toast.textContent = "Salvo no Deck! 🎓";
                document.body.appendChild(toast);
                setTimeout(() => toast.remove(), 2000);
            }
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.VentuEngine.init);
    } else {
        window.VentuEngine.init();
    }
})();