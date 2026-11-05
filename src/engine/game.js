/**
 * Ventu Game Engine v6.0 (variantes por flag, flags por POV, itens, LCS/diff/iscas no treino)
 */

(function() {
    let gameData = null;
    let currentLevel = 'a1';
    let currentCharId = null;
    let currentSceneId = null;
    let state = { energy: 100, trust: 50, rizz: 50, money: 0, flags: [], history: [] };
    let isProcessing = false;

    // ===== Helpers v6: HTML seguro, condições por flag, variantes =====
    const esc = (v) => String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    const glossOf = (sc) => pickVariant(sc.glossaryVariants, sc.glossary, 'glossary');
    const asArr = (v) => v === undefined || v === null ? [] : (Array.isArray(v) ? v : [v]);
    // Um objeto passa se TODAS as ifFlag existem e NENHUMA ifNotFlag existe.
    const cond = (o) => !o || (asArr(o.ifFlag).every(f => state.flags.includes(f)) && asArr(o.ifNotFlag).every(f => !state.flags.includes(f)));
    // Entre as variantes válidas, a ÚLTIMA vence. Sem nenhuma válida, usa o padrão.
    const pickVariant = (list, fallback, key) => { let r = fallback; (list || []).forEach(v => { if (cond(v)) r = v[key]; }); return r; };
    const addFlag = (f) => {
        if (!state.flags.includes(f)) {
            state.flags.push(f);
            try { localStorage.setItem('ventu_flags', JSON.stringify(state.flags)); } catch (e) {}
        }
    };
    const MALE_NPCS = ['Mr. Silva', 'Lucas', 'Davi', 'Cliente furioso'];
    const genderOf = (name) => MALE_NPCS.includes(name) ? 'male' : 'female';
    const isNarr = (n) => n === 'Narração' || n === 'Narrador' || n === 'Sistema';
    function tryRevive() {
        if (!window.hasRevive) return false;
        window.hasRevive = false;
        state.energy = 30;
        updateStats();
        addMessage('💖 Coração Extra usado! Você voltou com 30 de energia.', 'npc', 'Sistema');
        return true;
    }
    function showTranslation(scene) {
        if (!window.hasTranslator || !glossOf(scene) || !glossOf(scene).length) return;
        window.hasTranslator = false;
        addMessage('🗣️ ' + glossOf(scene).map(g => g.word + ' = ' + g.meaning).join('  ·  '), 'npc', 'Sistema');
    }

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

            /* BOTÃO CORTE DO DIRETOR */
            .retry-btn {
                background-color: var(--gold);
                color: var(--bg);
                border: none;
                padding: 15px;
                border-radius: 12px;
                font-weight: bold;
                font-size: 1rem;
                cursor: pointer;
                transition: 0.2s;
                box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                width: 100%;
                margin-top: 15px;
            }
            .retry-btn:hover { background-color: var(--gold-hover); transform: translateY(-2px); }

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

            /* ============ TREINO PÓS-RODADA (CSS que faltava) ============ */
            .training-modal { background: linear-gradient(145deg, rgba(30,41,59,0.97), rgba(15,23,42,0.99)); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 26px 22px; max-width: 520px; width: 100%; max-height: 92vh; overflow-y: auto; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.8); backdrop-filter: blur(10px); animation: fadeIn 0.3s ease; }
            .training-modal h2 { color: #fff; font-family: 'Playfair Display', serif; font-size: 1.7rem; margin: 4px 0 0; }
            .training-subtitle { font-size: 0.75rem; color: var(--gold); font-weight: 700; letter-spacing: 2px; text-transform: uppercase; }

            /* Word Order estilo Duolingo: cada palavra é um chip */
            .wo-assembly { min-height: 76px; background: rgba(0,0,0,0.35); border: 2px dashed #4a90d9; border-radius: 14px; padding: 12px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center; align-content: flex-start; justify-content: flex-start; margin-bottom: 12px; text-align: left; }
            .wo-pool { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; padding: 10px 0; min-height: 52px; }
            .wo-chip { display: inline-flex; align-items: center; justify-content: center; background: #1e293b; color: #e2e8f0; border: 1px solid #3b4a63; border-bottom-width: 3px; padding: 9px 16px; border-radius: 12px; cursor: pointer; font-size: 1rem; font-weight: 600; font-family: 'Inter', sans-serif; user-select: none; transition: transform .15s, background .15s, border-color .15s; }
            .wo-chip:hover { background: #2a3a55; border-color: #4a90d9; transform: translateY(-2px); }
            .wo-chip:active { transform: translateY(1px); border-bottom-width: 1px; }
            .wo-chip-used { background: rgba(251,191,36,0.15); color: var(--gold); border-color: var(--gold); }
            .wo-chip-used:hover { background: rgba(239,68,68,0.2); border-color: #ef4444; color: #fecaca; }
            .wo-feedback { padding: 12px; border-radius: 10px; margin-top: 12px; font-size: 0.92rem; font-weight: 600; line-height: 1.4; animation: fadeIn 0.3s ease; }
            .wo-feedback.ok { background: rgba(16,185,129,0.15); color: #10b981; border: 1px solid #10b981; }
            .wo-feedback.partial { background: rgba(251,191,36,0.15); color: #fbbf24; border: 1px solid #fbbf24; }
            .wo-feedback.bad { background: rgba(239,68,68,0.15); color: #f87171; border: 1px solid #ef4444; }

            /* Listen & Type */
            .listen-play-btn { width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px; padding: 20px; border: none; border-radius: 16px; background: linear-gradient(135deg, #fbbf24, #f59e0b); color: #0b0f19; font-size: 1.15rem; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; box-shadow: 0 6px 20px rgba(251,191,36,0.35); transition: transform .2s, box-shadow .2s; font-family: 'Inter', sans-serif; }
            .listen-play-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 26px rgba(251,191,36,0.5); }
            .listen-play-btn:active { transform: scale(0.98); }
            .listen-play-btn:disabled { background: #30363d; color: #8b949e; box-shadow: none; cursor: not-allowed; transform: none; opacity: 1; }
            input.listen-input { width: 100%; box-sizing: border-box; padding: 16px; background: rgba(0,0,0,0.5) !important; color: #fff !important; -webkit-text-fill-color: #fff; border: 2px solid #30363d; border-radius: 14px; font-size: 1.05rem; font-family: 'Inter', sans-serif; text-align: center; outline: none; transition: border-color .2s, box-shadow .2s; }
            input.listen-input::placeholder { color: #64748b; -webkit-text-fill-color: #64748b; }
            input.listen-input:focus { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(251,191,36,0.15); }
            input.listen-input:disabled { opacity: .7; }

            /* Diff colorido (Word Order e Listen & Type) */
            .diff-label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin: 10px 0 4px; text-align: left; font-weight: 600; }
            .diff-row { display: flex; flex-wrap: wrap; gap: 6px; text-align: left; }
            .diff-word { padding: 4px 10px; border-radius: 8px; font-weight: 600; font-size: 0.95rem; }
            .diff-word.ok { background: rgba(16,185,129,0.15); color: #10b981; }
            .diff-word.bad { background: rgba(239,68,68,0.15); color: #f87171; text-decoration: line-through; }
            .diff-word.miss { background: rgba(251,191,36,0.15); color: #fbbf24; }

            /* Resultado */
            .tier-badge { display: inline-block; margin: 16px 0 20px; padding: 10px 28px; border-radius: 30px; font-size: 1.3rem; font-weight: 900; letter-spacing: 1px; text-transform: uppercase; box-shadow: 0 8px 25px rgba(0,0,0,0.5); }
            .result-row { display: flex; justify-content: space-between; align-items: center; padding: 13px 18px; margin-bottom: 8px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; color: #cbd5e1; }
            .result-row strong { color: #fff; }
            .result-total { background: rgba(251,191,36,0.1); border-color: rgba(251,191,36,0.3); }
            .result-total strong { color: var(--gold); font-size: 1.2rem; }
            .result-reward { display: flex; justify-content: center; flex-wrap: wrap; gap: 12px; margin: 20px 0 0; font-weight: 800; }
            .result-reward > div { background: rgba(255,255,255,0.06); padding: 10px 18px; border-radius: 20px; }
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
                    return `<span class="keyword" data-word="${esc(match)}" data-meaning="${esc(item.meaning)}" data-phonetic="${esc(item.phonetic || '')}">${match}</span>`;
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
            div.innerHTML = `<span><strong>${item.word}</strong>: ${item.meaning}</span> <button class="action-btn tts-btn" data-text="${esc(item.word)}" data-gender="female">🔊</button>`;
            div.onclick = (e) => { if(e.target.tagName !== 'BUTTON') window.VentuEngine.speak(item.word, 'female'); };
            list.appendChild(div);
        });
    }

    function getAvatarEmoji(name) {
        if (!name) return '💬';
        if (name.includes('Silva')) return '👨‍💼';
        if (name.includes('Lucas')) return '👨🏾';
        if (name.includes('Davi')) return '👨‍🍳';
        if (name.includes('Emma')) return '👩';
        if (name.includes('Cliente')) return '😠';
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
            const icon = sender === 'player' ? (window.playerSkin || '👤') : getAvatarEmoji(npcName);
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
                <button class="action-btn tts-btn" data-text="${esc(lens.native)}" data-gender="${gender}">🔊</button>
                <button class="action-btn save-btn" data-text="${esc(lens.native)}" data-context="Frase nativa">💾</button>
            </div>
        `;
        
        div.appendChild(lensDiv);
        chatHistory().appendChild(div);
        scrollToBottom();
    }

    // --- EVENTO DE CLIQUE NAS PALAVRAS (TOOLTIP) ---
    document.addEventListener('click', (e) => {
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

    // --- LÓGICA DE TEXTO E FLUXO ---
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
        const gender = genderOf(currentScene.npcName);

        setTimeout(() => {
            const typingMsg = addMessage('', 'npc', currentScene.npcName, true);
            setTimeout(() => {
                typingMsg.remove();
                addMessage("Huh? I don't understand. What do you mean?", 'npc', currentScene.npcName);
                
                setTimeout(() => {
                    if (state.energy <= 0 && !tryRevive()) return endGame('Você perdeu toda a sua energia tentando se comunicar. Fim de jogo.');
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
        
        updateStats(choice.trust || 0, choice.rizz || 0);
        
        (choice.addsFlags || []).forEach(addFlag);
        // Resolvido DEPOIS das flags da própria escolha, para elas já valerem
        const respText = pickVariant(choice.responseVariants, choice.response, 'text');
        const nextId = pickVariant(choice.nextSceneVariants, choice.nextScene, 'scene');
        state.history.push({
            said: typedText || choice.text, choice: choice, response: respText,
            npcName: gameData.characters[currentCharId].scenes[currentSceneId].npcName
        });

        const currentScene = gameData.characters[currentCharId].scenes[currentSceneId];
        const gender = genderOf(currentScene.npcName);

        setTimeout(() => {
            const typingMsg = addMessage('', 'npc', currentScene.npcName, true);
            setTimeout(() => {
                typingMsg.remove();
                addMessage(respText, 'npc', currentScene.npcName, false, glossOf(currentScene));
                
                setTimeout(() => {
                    if (choice.lens) addLens(choice.lens, gender);
                    setTimeout(() => {
                        if (nextId) loadScene(nextId);
                        else isProcessing = false;
                    }, 2000); 
                }, 800);
            }, 1200); 
        }, 400);
    }

    function renderQuickReplies(choices) {
        choices = (choices || []).filter(cond);
        const hintOn = !!window.showHintNext;
        quickReplies().innerHTML = '';
        choices.forEach((choice, index) => {
            const btn = document.createElement('button');
            btn.className = 'quick-reply-btn';
            const regLabel = choice.registry.charAt(0).toUpperCase() + choice.registry.slice(1);
            btn.textContent = `[${regLabel}] ${choice.text}`;
            if (hintOn && choice.lens && choice.lens.native) {
                const h = document.createElement('div');
                h.style.cssText = 'font-size:0.75rem; opacity:0.8; margin-top:4px; font-style:italic;';
                h.textContent = '💡 Nativo: ' + choice.lens.native;
                btn.appendChild(h);
            }
            btn.onclick = () => processChoice(choice);
            quickReplies().appendChild(btn);
        });
        if (hintOn) window.showHintNext = false;
    }

    function renderSubtext(subtext, scene) {
        const quickArea = quickReplies();
        quickArea.innerHTML = '';
        
        const container = document.createElement('div');
        container.className = 'subtext-container';
        
        const title = document.createElement('div');
        title.className = 'subtext-title';
        title.innerHTML = `🧠 ${subtext.question || 'O que ele realmente quis dizer?'}`;
        container.appendChild(title);

        subtext.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'subtext-btn';
            btn.textContent = opt.text;
            
            btn.onclick = () => {
                quickArea.innerHTML = ''; 
                
                if (opt.correct) {
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
        
        if (state.energy <= 0 && !tryRevive()) return endGame('Você desmaiou de exaustão. Fim de jogo.');

        let finalNpcText = pickVariant(scene.npcTextVariants, scene.npcText, 'text');
        const activeSubtext = pickVariant(scene.subtextVariants, scene.subtext, 'subtext');

        if (scene.energyCost) {
            state.energy = Math.max(0, state.energy - scene.energyCost);
            updateStats();
        }
        if (scene.addFlags) {
            scene.addFlags.forEach(addFlag);
        }

        updateGlossary(glossOf(scene));

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
                    addMessage(finalNpcText, 'npc', scene.npcName, false, glossOf(scene));
                    setTimeout(() => endGame(null, scene.endingType), 2000);
                }, 1000);
            }, 500);
            return;
        }

        setTimeout(() => {
            const typingMsg = addMessage('', 'npc', scene.npcName, true);
            setTimeout(() => {
                typingMsg.remove();
                addMessage(finalNpcText, 'npc', scene.npcName, false, glossOf(scene));
                
                showTranslation(scene);
                if (activeSubtext) {
                    setTimeout(() => {
                        renderSubtext(activeSubtext, scene);
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
        if (!progress.completedPOVs) progress.completedPOVs = {};
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
        btn.textContent = '🎯 Rodada de Treino';
        btn.onclick = () => {
            if (btn.disabled) return;
            btn.disabled = true;
            btn.style.opacity = '0.6';
            btn.textContent = '🎬 Ver o Corte do Diretor';
            startPostRoundTraining(() => showDirectorCut());
        };

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
            // Verifica se a Lente existe para não quebrar o código
            const safeLensNative = (h.choice && h.choice.lens && h.choice.lens.native) ? h.choice.lens.native : (h.choice.text || h.said);
            const safeRegistry = (h.choice && h.choice.registry) ? h.choice.registry : 'neutral';

            html += `<div class="cut-line">
                <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">${safeRegistry}</div>
                <div style="margin: 5px 0; font-weight: 500;">"${esc(h.said)}"</div>
                <div class="native">
                    <span>"${esc(safeLensNative)}"</span>
                    <button class="action-btn tts-btn" data-text="${esc(safeLensNative)}" data-gender="female">🔊</button>
                </div>
            </div>`;
        });
        
        // Novos botões de navegação no final
        html += `
            <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 20px;">
                <button id="btn-play-other-pov" style="width: 100%; padding: 15px; background: var(--gold); color: var(--bg); border: none; border-radius: 12px; font-weight: bold; cursor: pointer; font-size: 1rem; transition: 0.2s;">
                    🎭 Jogar com outro POV
                </button>
                <button id="btn-back-hub" style="width: 100%; padding: 15px; background: transparent; color: var(--text); border: 1px solid var(--border); border-radius: 12px; font-weight: bold; cursor: pointer; font-size: 1rem; transition: 0.2s;">
                    🎮 Voltar para o Hub
                </button>
            </div>
        </div>`;
        
        modal.innerHTML = html;
        document.body.appendChild(modal);
        
        // Ação do botão "Outro POV" (Vai para o nivel.html)
        document.getElementById('btn-play-other-pov').onclick = () => { 
            modal.remove(); 
            window.location.href = `nivel.html?l=${currentLevel}`; 
        };

        // Ação do botão "Voltar para o Hub" (Vai para o jogar.html)
        document.getElementById('btn-back-hub').onclick = () => { 
            modal.remove(); 
            window.location.href = 'jogar.html'; 
        };
    }

    // --- FLASHCARD SWIPE MODAL ---
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

    // --- SETUP E EVENTOS GLOBAIS ---
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
                    try { recognition.start(); } catch (err) { micBtn.classList.remove('active'); }
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
            if (badWords.some(word => new RegExp('\\b' + word + '\\b').test(lowerText))) {
                addMessage(text, 'player');
                setTimeout(() => {
                    addMessage("*Silence.* I'm not talking to you anymore. Call ended.", 'npc', gameData.characters[currentCharId].scenes[currentSceneId].npcName);
                    setTimeout(() => endGame("Você foi grosseiro(a). O atendimento foi encerrado e você perdeu o jogo.", 'ruim'), 2000);
                }, 1000);
                return;
            }

            const scene = gameData.characters[currentCharId].scenes[currentSceneId];
            const match = findBestChoice(text, scene.choices.filter(cond));
            if (match) processChoice(match, text);
            else handleFallback(text);
        };
    }

    // ============================================================
    // SPRINT 6 — TREINO PÓS-RODADA (Word Order + Listen & Type)
    // ============================================================

    const TRAINING_TIERS = [
        { min: 19, name: '💎 Perfeito', coins: 50, xp: 40, color: '#8b5cf6' },
        { min: 14, name: '🥇 Ouro',     coins: 30, xp: 20, color: '#fbbf24' },
        { min: 8,  name: '🥈 Prata',    coins: 15, xp: 10, color: '#94a3b8' },
        { min: 0,  name: '🥉 Bronze',   coins: 5,  xp: 5,  color: '#b45309' }
    ];

    function getTier(score) {
        return TRAINING_TIERS.find(t => score >= t.min) || TRAINING_TIERS[TRAINING_TIERS.length - 1];
    }

    function addCoins(amount) {
        state.money += amount;
        try { localStorage.setItem('ventu_money', state.money.toString()); } catch(e) {}
        const h = document.getElementById('stat-money');
        if (h) h.textContent = `$ ${state.money.toFixed(2)}`;
        const s = document.getElementById('shop-money');
        if (s) s.textContent = `$ ${state.money.toFixed(2)}`;
    }

    function cleanPhrase(text) {
        return String(text || '')
            .replace(/\[.*?\]/g, '')
            .replace(/\*[^*]*\*/g, '')
            .replace(/\([^)]*\)/g, '')
            .replace(/[\u2018\u2019]/g, "'")
            .replace(/[^a-zA-Z0-9\s'\-]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    // Maior subsequência comum (LCS): nota justa mesmo se o jogador errar uma palavra no começo
    function lcsMarks(a, b) {
        const n = a.length, m = b.length;
        const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= m; j++) {
                dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
        const hitA = new Set(), hitB = new Set();
        let i = n, j = m;
        while (i > 0 && j > 0) {
            if (a[i - 1] === b[j - 1]) { hitA.add(i - 1); hitB.add(j - 1); i--; j--; }
            else if (dp[i - 1][j] >= dp[i][j - 1]) i--;
            else j--;
        }
        return { len: dp[n][m], hitA, hitB };
    }

    function computeWordOrderSimilarity(a, b) {
        const wA = a.toLowerCase().split(' ').filter(Boolean);
        const wB = b.toLowerCase().split(' ').filter(Boolean);
        const maxLen = Math.max(wA.length, wB.length);
        return maxLen === 0 ? 0 : lcsMarks(wA, wB).len / maxLen;
    }

    // Verde = no lugar certo · vermelho riscado = sobrou/errou · amarelo = faltou
    function renderDiff(attemptWords, targetWords) {
        const lo = (w) => w.toLowerCase();
        const { hitA, hitB } = lcsMarks(attemptWords.map(lo), targetWords.map(lo));
        const yours = attemptWords.map((w, i) => '<span class="diff-word ' + (hitA.has(i) ? 'ok' : 'bad') + '">' + esc(w) + '</span>').join('');
        const right = targetWords.map((w, j) => '<span class="diff-word ' + (hitB.has(j) ? 'ok' : 'miss') + '">' + esc(w) + '</span>').join('');
        return '<div class="diff-label">Você montou</div><div class="diff-row">' + (yours || '<em>—</em>') + '</div>' +
               '<div class="diff-label">Frase correta</div><div class="diff-row">' + right + '</div>';
    }

    function computeListenSimilarity(a, b) {
        const wA = a.split(/\s+/).filter(Boolean);
        const wB = b.split(/\s+/).filter(Boolean);
        if (wA.length === 0 && wB.length === 0) return 1;
        if (wA.length === 0 || wB.length === 0) return 0;
        const bagA = {}, bagB = {};
        wA.forEach(w => bagA[w] = (bagA[w] || 0) + 1);
        wB.forEach(w => bagB[w] = (bagB[w] || 0) + 1);
        let matches = 0;
        for (const w in bagA) if (bagB[w]) matches += Math.min(bagA[w], bagB[w]);
        return matches / Math.max(wA.length, wB.length);
    }

    function extractTrainingData() {
        let pool = [];
        const add = (t) => {
            const c = cleanPhrase(t);
            const n = c.split(' ').filter(Boolean).length;
            if (c.length > 3 && n >= 3 && n <= 10) pool.push(c);
        };
        state.history.forEach(h => {
            if (h.choice && h.choice.lens && h.choice.lens.native) add(h.choice.lens.native);
            if (h.response && h.npcName && !isNarr(h.npcName)) add(h.response);
        });
        const scene = gameData.characters[currentCharId].scenes[currentSceneId];
        if (scene && scene.npcText && !isNarr(scene.npcName)) add(pickVariant(scene.npcTextVariants, scene.npcText, 'text'));
        pool = [...new Set(pool)];
        pool.sort(() => Math.random() - 0.5);

        let wordOrderPhrases = pool.filter(p => p.split(' ').length <= 9).slice(0, 3);
        if (wordOrderPhrases.length === 0) wordOrderPhrases = ["Hello how are you today"];
        let listenPhrases = pool.filter(p => !wordOrderPhrases.includes(p)).slice(0, 3);
        if (listenPhrases.length === 0) listenPhrases = pool.slice(0, 3);
        if (listenPhrases.length === 0) listenPhrases = [wordOrderPhrases[0]];
        return { wordOrderPhrases, listenPhrases };
    }

    function showWordOrderGame(targetPhrase, onComplete, currentRound, totalRounds) {
        const targetWords = targetPhrase.split(' ').filter(Boolean);
        const lowerTarget = targetWords.map(w => w.toLowerCase());
        // Iscas: sempre distintas e nunca palavras que já fazem parte da frase
        const DECOYS = ['very', 'always', 'maybe', 'today', 'really', 'never', 'just', 'now', 'still', 'also'];
        const decoys = DECOYS.filter(d => !lowerTarget.includes(d)).sort(() => Math.random() - 0.5).slice(0, targetWords.length >= 4 ? 2 : 1);
        const fullPool = [...targetWords, ...decoys];
        const shuffle = (arr) => {
            let r, tries = 0;
            do { r = [...arr].sort(() => Math.random() - 0.5); tries++; }
            while (tries < 6 && r.length > 1 && r.join(' ') === targetWords.join(' '));
            return r;
        };

        let poolWords = shuffle(fullPool);
        let assembledWords = [];
        let submitted = false;
        let finalScore = 0;

        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.style.zIndex = '5000';
        overlay.innerHTML = `
            <div class="training-modal" style="border-top: 4px solid var(--gold);">
                <div style="text-align:center; margin-bottom:15px;">
                    <div class="training-subtitle">🎯 Treino Pós-Rodada — 1/2</div>
                    <h2>Word Order (${currentRound}/${totalRounds})</h2>
                    <p style="color:var(--text-muted); font-size:0.9rem; margin-top:5px;">Monte a frase na ordem correta. Cuidado: ${decoys.length > 1 ? 'há palavras que não fazem' : 'há uma palavra que não faz'} parte dela.</p>
                </div>
                <div id="wo-assembly" class="wo-assembly"></div>
                <div style="text-align:center; margin:10px 0; color:var(--text-muted); font-size:0.8rem;">Palavras disponíveis:</div>
                <div id="wo-pool" class="wo-pool"></div>
                <div id="wo-feedback"></div>
                <div style="display:flex; gap:10px; margin-top:20px;">
                    <button id="wo-reset" style="flex:0 0 auto; padding:14px 20px; background:transparent; color:var(--text); border:1px solid var(--border); border-radius:12px; font-weight:bold; cursor:pointer;">Resetar</button>
                    <button id="wo-check" style="flex:1; padding:14px; background:var(--gold); color:var(--bg); border:none; border-radius:12px; font-weight:bold; cursor:pointer;">Verificar</button>
                </div>
            </div>`;
        document.body.appendChild(overlay);

        const assembly = document.getElementById('wo-assembly');
        const pool = document.getElementById('wo-pool');
        const feedback = document.getElementById('wo-feedback');
        const checkBtn = document.getElementById('wo-check');
        const resetBtn = document.getElementById('wo-reset');

        function render() {
            assembly.innerHTML = '';
            pool.innerHTML = '';
            if (assembledWords.length === 0) {
                assembly.innerHTML = '<span style="color:var(--text-muted); font-style:italic; font-size:0.9rem;">Clique nas palavras abaixo…</span>';
            } else {
                assembledWords.forEach((w, i) => {
                    const chip = document.createElement('span');
                    chip.className = 'wo-chip wo-chip-used';
                    chip.textContent = w;
                    chip.onclick = () => { if (submitted) return; assembledWords.splice(i, 1); poolWords.push(w); render(); };
                    assembly.appendChild(chip);
                });
            }
            poolWords.forEach((w, i) => {
                const chip = document.createElement('span');
                chip.className = 'wo-chip';
                chip.textContent = w;
                chip.onclick = () => { if (submitted) return; poolWords.splice(i, 1); assembledWords.push(w); render(); };
                pool.appendChild(chip);
            });
        }
        render();

        resetBtn.onclick = () => {
            if (submitted) return;
            poolWords = shuffle(fullPool);   // mesmas iscas, só reembaralha
            assembledWords = [];
            feedback.innerHTML = '';
            render();
        };

        checkBtn.onclick = () => {
            if (submitted) { overlay.remove(); onComplete(finalScore); return; }
            if (assembledWords.length === 0) {
                feedback.innerHTML = '<div class="wo-feedback bad">Monte a frase primeiro.</div>';
                return;
            }
            submitted = true;
            const sim = computeWordOrderSimilarity(assembledWords.join(' '), targetPhrase);
            finalScore = sim === 1 ? 10 : Math.min(9, Math.round(sim * 10));

            let cls = 'bad', txt = '❌ Não foi dessa vez.';
            if (sim === 1) { cls = 'ok'; txt = '✓ Perfeito! Frase montada corretamente.'; }
            else if (sim >= 0.5) { cls = 'partial'; txt = '~ Quase! Nota: ' + finalScore + '/10.'; }
            const diff = sim === 1 ? '' : renderDiff(assembledWords, targetWords);
            feedback.innerHTML = '<div class="wo-feedback ' + cls + '">' + txt + diff + '</div>';

            resetBtn.disabled = true;
            resetBtn.style.opacity = '0.4';
            checkBtn.textContent = 'Continuar →';
        };
    }

    function showListenTypeGame(targetPhrase, onComplete, currentRound, totalRounds) {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.style.zIndex = '5000';
        overlay.innerHTML = `
            <div class="training-modal" style="border-top: 4px solid #8b5cf6;">
                <div style="text-align:center; margin-bottom:15px;">
                    <div class="training-subtitle" style="color:#8b5cf6;">🎯 Treino Pós-Rodada — 2/2</div>
                    <h2>Listen & Type (${currentRound}/${totalRounds})</h2>
                    <p style="color:var(--text-muted); font-size:0.9rem; margin-top:5px;">Ouça e digite o que você ouviu.</p>
                </div>
                <div style="display: flex; flex-direction: column; gap: 15px; margin-top: 20px;">
                    <button id="lt-play" class="listen-play-btn">🔊 Ouvir (3)</button>
                    <input id="lt-input" class="listen-input" type="text" placeholder="Digite em inglês…" autocomplete="off" autocapitalize="off" />
                </div>
                <div id="lt-feedback"></div>
                <button id="lt-check" style="width:100%; margin-top:15px; padding:14px; background:var(--gold); color:var(--bg); border:none; border-radius:12px; font-weight:bold; cursor:pointer;">Verificar</button>
            </div>`;
        document.body.appendChild(overlay);

        let replaysLeft = 3;
        let checked = false;
        let finalScore = 0;
        const playBtn = document.getElementById('lt-play');
        const input = document.getElementById('lt-input');
        const feedback = document.getElementById('lt-feedback');
        const checkBtn = document.getElementById('lt-check');

        setTimeout(() => window.VentuEngine.speak(targetPhrase, 'female'), 400);

        playBtn.onclick = () => {
            if (replaysLeft <= 0) return;
            window.VentuEngine.speak(targetPhrase, 'female');
            replaysLeft--;
            playBtn.textContent = '🔊 Ouvir (' + replaysLeft + ')';
            if (replaysLeft <= 0) playBtn.disabled = true;
        };

        input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); checkBtn.click(); } });

        checkBtn.onclick = () => {
            if (checked) { overlay.remove(); onComplete(finalScore); return; }
            const raw = input.value.trim();
            if (!raw) {
                feedback.innerHTML = '<div class="wo-feedback bad">Digite o que você ouviu.</div>';
                return;
            }
            checked = true;
            const attemptWords = cleanPhrase(raw).split(' ').filter(Boolean);
            const targetWords = cleanPhrase(targetPhrase).split(' ').filter(Boolean);
            const sim = computeListenSimilarity(attemptWords.join(' ').toLowerCase(), targetWords.join(' ').toLowerCase());
            finalScore = sim === 1 ? 10 : Math.min(9, Math.round(sim * 10));

            let cls = 'bad', txt = '❌ Não foi dessa vez.';
            if (sim === 1) { cls = 'ok'; txt = '✓ Perfeito! Você ouviu certinho.'; }
            else if (sim >= 0.5) { cls = 'partial'; txt = '~ Quase! Nota: ' + finalScore + '/10.'; }
            const diff = sim === 1 ? '' : renderDiff(attemptWords, targetWords);
            feedback.innerHTML = '<div class="wo-feedback ' + cls + '">' + txt + diff + '</div>';

            input.disabled = true;
            playBtn.disabled = true;
            checkBtn.textContent = 'Continuar →';
        };

        setTimeout(() => input.focus(), 500);
    }

    function showTrainingResults(wordScore, listenScore, onComplete) {
        const total = wordScore + listenScore;
        const tier = getTier(total);

        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.style.zIndex = '5000';
        overlay.innerHTML = `
            <div class="training-modal" style="border-top: 4px solid ${tier.color};">
                <div style="font-size:3rem; margin-bottom:10px;">🎉</div>
                <h2 style="color:white; margin-bottom:5px; font-family:'Playfair Display',serif;">Rodada Completa!</h2>
                <div class="tier-badge" style="background:${tier.color}; color:#0b0f19;">${tier.name}</div>
                <div class="result-row"><span>Word Order</span><strong>${wordScore}/10</strong></div>
                <div class="result-row"><span>Listen & Type</span><strong>${listenScore}/10</strong></div>
                <div class="result-row" style="background:rgba(251,191,36,0.1); border:1px solid var(--gold);">
                    <span><strong>Total</strong></span>
                    <strong style="color:var(--gold);">${total}/20</strong>
                </div>
                <div class="result-reward">
                    <div style="color:var(--gold);">💰 +${tier.coins} moedas</div>
                    <div style="color:#8b5cf6;">✨ +${tier.xp} XP</div>
                </div>
                <button id="lt-continue" style="width:100%; margin-top:25px; padding:15px; background:var(--gold); color:var(--bg); border:none; border-radius:12px; font-weight:bold; cursor:pointer; font-size:1rem;">
                    🎬 Ver o Corte do Diretor
                </button>
            </div>`;
        document.body.appendChild(overlay);

        addCoins(tier.coins);
        if (tier.xp > 0 && window.VentuProgress) window.VentuProgress.addXP(tier.xp);

        document.getElementById('lt-continue').onclick = () => {
            overlay.remove();
            if (onComplete) onComplete();
        };
    }

    function startPostRoundTraining(onComplete) {
        const data = extractTrainingData();
        let woScoreTotal = 0, woIndex = 0;
        let listenScoreTotal = 0, listenIndex = 0;

        function playWordOrder() {
            if (woIndex >= data.wordOrderPhrases.length) return playListen();
            showWordOrderGame(data.wordOrderPhrases[woIndex], (score) => {
                woScoreTotal += score; woIndex++; playWordOrder();
            }, woIndex + 1, data.wordOrderPhrases.length);
        }

        function playListen() {
            if (listenIndex >= data.listenPhrases.length) {
                const finalWo = Math.round(woScoreTotal / (data.wordOrderPhrases.length || 1));
                const finalLt = Math.round(listenScoreTotal / (data.listenPhrases.length || 1));
                return showTrainingResults(finalWo, finalLt, onComplete);
            }
            showListenTypeGame(data.listenPhrases[listenIndex], (score) => {
                listenScoreTotal += score; listenIndex++; playListen();
            }, listenIndex + 1, data.listenPhrases.length);
        }
        playWordOrder();
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
            try { state.flags = JSON.parse(localStorage.getItem('ventu_flags') || '[]'); } catch(e) { state.flags = []; }
            // Recomeçar um POV apaga só as flags DELE (a1_silva_*, etc). As dos outros POVs continuam valendo.
            const ownPrefix = `${currentLevel}_${currentCharId}_`;
            state.flags = state.flags.filter(f => !f.startsWith(ownPrefix));
            try { localStorage.setItem('ventu_flags', JSON.stringify(state.flags)); } catch(e) {}
            if ('speechSynthesis' in window) { window.speechSynthesis.getVoices(); window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices(); }
            const savedMoney = localStorage.getItem('ventu_money');
            state.money = savedMoney !== null ? (parseFloat(savedMoney) || 0) : (char.initialState.money || 0);
            
            setupInputs();
            updateStats();
            window.VentuEngine.updateShopMoneyUI();
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

        updateShopMoneyUI: function() {
            const el = document.getElementById('shop-money');
            if (el) el.textContent = `$ ${state.money.toFixed(2)}`;
            
            const headerMoney = document.getElementById('stat-money');
            if (headerMoney) headerMoney.textContent = `$ ${state.money.toFixed(2)}`;
        },

        buyItem: function(itemType, cost) {
            if (state.money < cost) {
                alert("Saldo insuficiente! Continue jogando para ganhar mais dinheiro (gorjetas).");
                return;
            }

            state.money -= cost;
            try { localStorage.setItem('ventu_money', state.money.toString()); } catch(e) {}

            if (itemType === 'coffee') {
                state.energy = Math.min(100, state.energy + 20);
                updateStats();
                alert("☕ Café tomado! +20 de Energia restaurada.");
            } 
            else if (itemType === 'freeze') {
                const user = window.VentuStorage.getUser();
                user.freezes = (user.freezes || 0) + 1;
                window.VentuStorage.saveUser(user);
                alert("🧊 Gelo comprado! Sua ofensiva está protegida.");
            }
            else if (itemType === 'hint') {
                window.showHintNext = true;
                alert("🎯 Dica ativada! A próxima resposta mostrará a versão nativa.");
            }
            else if (itemType === 'revive') {
                window.hasRevive = true;
                alert("💖 Coração Extra comprado! Se sua energia zerar, você será revivido.");
            }
            else if (itemType === 'skin') {
                window.playerSkin = '🦊';
                alert("🦊 Skin VIP equipada! Seu avatar no chat foi alterado.");
            }
            else if (itemType === 'translator') {
                window.hasTranslator = true;
                alert("🗣️ Tradutor Simultâneo comprado! A próxima fala do NPC será traduzida.");
            }

            this.updateShopMoneyUI();
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