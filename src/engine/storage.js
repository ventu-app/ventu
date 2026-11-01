/**
 * Ventu Storage Engine
 * Camada de abstração sobre o localStorage.
 * Previne quebras em navegadores restritivos (ex: Safari anônimo)
 * e centraliza o acesso aos dados do jogador.
 */

(function() {
    // Fallback para quando o localStorage estiver bloqueado
    const memoryStore = {};
    const PREFIX = 'ventu_';

    function safeGet(key) {
        try {
            const item = localStorage.getItem(PREFIX + key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            // Se falhar, tenta buscar da memória
            return memoryStore[key] !== undefined ? memoryStore[key] : null;
        }
    }

    function safeSet(key, value) {
        try {
            localStorage.setItem(PREFIX + key, JSON.stringify(value));
        } catch (e) {
            // Se falhar, salva na memória (dura só enquanto a aba estiver aberta)
            memoryStore[key] = value;
        }
    }

    function safeRemove(key) {
        try {
            localStorage.removeItem(PREFIX + key);
        } catch (e) {
            delete memoryStore[key];
        }
    }

    // --- SCHEMA DO JOGADOR (Sprint 1) ---
    
    const DEFAULT_USER_DATA = {
        xp: 0,
        level: 1,
        streak: 0,
        freezes: 0, // "Congeladores" de ofensiva
        lastPlayedDate: null,
        dailyMission: {
            target: 'complete_1_scene',
            progress: 0,
            completed: false
        }
    };

    const DEFAULT_PROGRESS_DATA = {
        lastLevel: null,
        lastPOV: null,
        lastScene: null,
        completedPOVs: {} // Ex: { "a1": ["davi"], "c2": ["noah"] }
    };

    // --- API PÚBLICA ---
    window.VentuStorage = {
        
        // --- Core (Substitui o localStorage direto) ---
        get: safeGet,
        set: safeSet,
        remove: safeRemove,
        
        // --- Dados do Jogador (Perfil) ---
        getUser: function() {
            return safeGet('user') || { ...DEFAULT_USER_DATA };
        },
        saveUser: function(data) {
            safeSet('user', data);
        },

        // --- Dados de Progresso (Onde parou) ---
        getProgress: function() {
            return safeGet('progress') || { ...DEFAULT_PROGRESS_DATA };
        },
        saveProgress: function(data) {
            safeSet('progress', data);
        },

        // --- Deck de Revisão e Erros (Sprint 4) ---
        getWordBank: function() {
            return safeGet('wordBank') || [];
        },
        getErrorBank: function() {
            return safeGet('errorBank') || [];
        },

        // --- Limpar Tudo (Para testes ou logout) ---
        clearAll: function() {
            try {
                // Remove apenas as chaves que começam com 'ventu_'
                Object.keys(localStorage).forEach(key => {
                    if (key.startsWith(PREFIX)) localStorage.removeItem(key);
                });
            } catch (e) {
                // Limpa a memória
                for (let k in memoryStore) delete memoryStore[k];
            }
        },
        
        // --- Migração de Dados Antigos ---
        // Converte o formato antigo (ventu_a1_completed) para o novo
        migrateOldData: function() {
            try {
                const levels = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'];
                let progress = this.getProgress();
                let hasMigrated = false;

                levels.forEach(level => {
                    const oldKey = `ventu_${level}_completed`;
                    const oldData = localStorage.getItem(oldKey);
                    if (oldData) {
                        const parsed = JSON.parse(oldData);
                        // parsed é algo como { davi: true, emma: true }
                        if (Object.keys(parsed).length > 0) {
                            progress.completedPOVs[level] = Object.keys(parsed);
                            hasMigrated = true;
                        }
                    }
                });

                if (hasMigrated) {
                    this.saveProgress(progress);
                    console.log('✅ Dados antigos migrados com sucesso para o novo formato!');
                }
            } catch (e) {
                console.warn('Falha ao migrar dados antigos:', e);
            }
        }
    };

    // Roda a migração assim que o script carrega
    window.VentuStorage.migrateOldData();

})();