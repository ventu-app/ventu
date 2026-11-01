/**
 * Ventu Progress Engine
 * Lógica de XP, Streak (Ofensiva) e Missões Diárias.
 * Depende do storage.js
 */

(function() {
    function getToday() {
        // Retorna a data no formato YYYY-MM-DD no fuso local
        return new Date().toLocaleDateString('en-CA'); 
    }
    
    function getYesterday() {
        const d = new Date();
        d.setDate(d.getDate() - 1);
        return d.toLocaleDateString('en-CA');
    }

    window.VentuProgress = {
        
        // 1. Adicionar XP e calcular Nível
        addXP: function(amount) {
            const user = window.VentuStorage.getUser();
            user.xp = (user.xp || 0) + amount;
            
            // Curva de nível simples: cada 1000 XP = 1 nível
            user.level = Math.floor(user.xp / 1000) + 1;
            
            window.VentuStorage.saveUser(user);
            return user.xp;
        },

        // 2. Verificar e atualizar a Ofensiva (Streak)
        checkStreak: function() {
            const user = window.VentuStorage.getUser();
            const today = getToday();
            const yesterday = getYesterday();

            // Se já jogou hoje, não faz nada
            if (user.lastPlayedDate === today) {
                return user.streak;
            }

            if (user.lastPlayedDate === yesterday) {
                // Jogou ontem e hoje, aumenta o streak
                user.streak += 1;
            } else if (user.lastPlayedDate !== null) {
                // Perdeu a ofensiva (passou mais de 1 dia)
                if (user.freezes > 0) {
                    // Usa um congelador para salvar a ofensiva
                    user.freezes -= 1;
                    user.streak += 1; 
                } else {
                    // Resetou a ofensiva
                    user.streak = 1; 
                }
            } else {
                // Primeira vez jogando
                user.streak = 1; 
            }

            // Atualiza a data do último jogo
            user.lastPlayedDate = today;
            window.VentuStorage.saveUser(user);
            return user.streak;
        },

        // 3. Registrar progresso na Missão Diária
        registerMissionProgress: function(action) {
            const user = window.VentuStorage.getUser();
            const today = getToday();
            
            // Se mudou o dia (ou se a missão não tem data), reseta a missão
            if (!user.dailyMission.lastDate || user.dailyMission.lastDate !== today) {
                user.dailyMission = {
                    target: 'complete_1_scene',
                    progress: 0,
                    completed: false,
                    lastDate: today
                };
            }

            // Lógica da missão: completar 1 cena
            if (action === 'complete_1_scene' && !user.dailyMission.completed) {
                user.dailyMission.progress += 1;
                if (user.dailyMission.progress >= 1) {
                    user.dailyMission.completed = true;
                    // Dá um bônus de 50 XP pela missão
                    this.addXP(50); 
                    console.log('🎯 Missão diária concluída! +50 XP');
                }
            }
            
            window.VentuStorage.saveUser(user);
        }
    };
})();