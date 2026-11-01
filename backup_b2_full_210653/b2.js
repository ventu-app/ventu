const gameDataB2 = {
  id: 'b2',
  title: 'Corporate Nightmare',
  shopItems: [
    { id: 'coffee', name: '☕ Triple Espresso', price: 10.00, energy: 20, desc: 'Restores 20 energy. Your hands will shake.' },
    { id: 'stress', name: '🧘 Stress Ball', price: 30.00, desc: 'Blocks energy loss for one scene.' },
    { id: 'dossier', name: '📂 The Dossier', price: 200.00, desc: 'Proof of Chad\'s gaslighting. Useful for HR.' }
  ],
  characters: {
    leo: {
      charId: 'leo',
      name: 'Leo',
      role: 'Senior Developer',
      emoji: '💻',
      description: 'You built the app. Chad took the credit. Now the server is down and you have 8 hours to fix it.',
      initialState: { money: 500.00, energy: 100 },
      startScene: 'leo_1',
      scenes: {
        leo_1: {
          npcName: 'Slack [Chad]',
          npcText: "[Slack Notification] Chad: 'Hey team! The client just changed the scope. We need the new deployment by 5 PM. No excuses. Let us synergize!'",
          energyCost: 5,
          glossary: [{ word: 'Scope', meaning: 'Escopo / Escala do projeto' }, { word: 'Synergize', meaning: 'Trabalhar juntos (jargão corporativo)' }],
          quickReplies: [
            { label: 'Aceitar o prazo.', text: "Got it, Chad. I will get it done by 5 PM." },
            { label: 'Reclamar do prazo impossível.', text: "Chad, this scope change is impossible to do by 5 PM." }
          ],
          intents: [
            { match: /(got it|will get|done|yes|ok)/i, response: "Chad: 'That is the spirit! This is a low-hanging fruit for you.' (You feel your soul dying a little.)", nextScene: 'leo_2' },
            { match: /(impossible|no way|cannot|reclaim|complain)/i, response: "Chad: 'Let us take this offline. We need to pivot and touch base later.' (He ignores your complaint.)", nextScene: 'leo_2' }
          ],
          fallback: "Chad is waiting for an answer on Slack. Say yes or complain.",
          offensiveScene: 'leo_bad_1'
        },
        leo_2: {
          npcName: 'Slack [Chad]',
          npcText: "[Team Meeting - 10 AM] Chad: 'So, mistakes were made yesterday. The dev team underperformed. The deployment was delayed because of technical issues.'",
          energyCost: 10,
          glossary: [{ word: 'Mistakes were made', meaning: 'Erros foram cometidos (Voz Passiva - esconde quem errou)' }, { word: 'Underperformed', meaning: 'Teve desempenho abaixo do esperado' }],
          quickReplies: [
            { label: 'Se defender (Voz Ativa).', text: "Actually, Chad, the requirements were changed by you at the last minute." },
            { label: 'Engolir o sapo.', text: "I will take full responsibility for the delay." }
          ],
          intents: [
            { match: /(actually|requirements|changed|you)/i, response: "Chad: 'Let us not point fingers, Leo. We are a family here. I will circle back with you later.'", nextScene: 'leo_3' },
            { match: /(responsibility|take the blame|sapo)/i, response: "Chad: 'Thank you, Leo. That is what I like to hear. The team needs to step up.'", nextScene: 'leo_3' }
          ],
          fallback: "Chad is looking at you. Defend yourself or take the blame.",
          offensiveScene: 'leo_bad_1'
        },
        leo_3: {
          npcName: 'Gary (Intern)',
          npcText: "Gary is crying in the bathroom. 'Leo, I am so sorry. I deleted the database. Chad said he would fire me if I told anyone. If I had known it was the production server, I would not have touched it!'",
          energyCost: 5,
          glossary: [{ word: 'If I had known', meaning: 'Se eu soubesse (Third Conditional)' }, { word: 'Production server', meaning: 'Servidor de produção (o real)' }],
          quickReplies: [
            { label: 'Acalmar o Gary.', text: "Hey, breathe. We will fix this. I will not tell Chad." },
            { label: 'Jogar o Gary debaixo do ônibus.', text: "You messed up, Gary. I have to tell Chad. It is your fault." }
          ],
          intents: [
            { match: /(breathe|fix|will not tell|help)/i, response: "Gary: 'Thank you, Leo. You are a good man. I will help you fix it.'", nextScene: 'leo_4' },
            { match: /(messed up|tell chad|your fault|under the bus)/i, response: "Gary: 'What? I thought you were cool. You are just like Chad!' (He runs away crying. You lose 10 energy).", nextScene: 'leo_4', energyCost: 10 }
          ],
          fallback: "Gary is waiting for your reaction. Be nice or throw him under the bus.",
          offensiveScene: 'leo_bad_1'
        },
        leo_4: {
          npcName: 'Email [Client - Karen]',
          npcText: "[Email Notification] Subject: URGENT - Touch base. Karen: 'I need to circle back on this. The new feature was not delivered on time. This is unacceptable. I am calling the CEO.'",
          energyCost: 10,
          glossary: [{ word: 'Touch base', meaning: 'Falar rapidamente / alinhar' }, { word: 'Circle back', meaning: 'Voltar ao assunto depois' }, { word: 'Unacceptable', meaning: 'Inaceitável' }],
          quickReplies: [
            { label: 'Responder com educação.', text: "Dear Karen, I apologize for the delay. We are working on it right now." },
            { label: 'Ser passivo-agressivo.', text: "As per my last email, the delay was caused by the scope change." }
          ],
          intents: [
            { match: /(apologize|dear karen|working on it)/i, response: "Karen: 'Fine. But I want an update in 1 hour. Do not disappoint me again.'", nextScene: 'leo_5' },
            { match: /(as per my last email|scope change|aggressive)/i, response: "Karen: 'Are you gaslighting me, Leo? I will forward this to Chad.'", nextScene: 'leo_5' }
          ],
          fallback: "Karen is waiting for an email response. Apologize or be passive-aggressive.",
          offensiveScene: 'leo_bad_2'
        },
        leo_5: {
          npcName: 'Slack [Chad]',
          npcText: "[Slack Message] Chad: 'Leo, I saw Karen email. If you had tested the code, we would not be in this mess. You need to micromanage the team better.'",
          energyCost: 15,
          glossary: [{ word: 'If you had tested', meaning: 'Se você tivesse testado (Third Conditional)' }, { word: 'Micromanage', meaning: 'Microgerenciar (controlar cada detalhe)' }, { word: 'Gaslighting', meaning: 'Manipulação psicológica' }],
          quickReplies: [
            { label: 'Apontar o erro dele (Third Conditional).', text: "If you had not changed the requirements, I would have tested it, Chad." },
            { label: 'Concordar e sofrer.', text: "You are right, Chad. I will micromanage them." }
          ],
          intents: [
            { match: /(if you had not|changed|requirements|tested)/i, response: "Chad: 'Excuse me? I am your boss. You are being insubordinate. We will talk about this in your performance review.' (You feel a chill down your spine.)", nextScene: 'leo_6' },
            { match: /(you are right|micromanage|sorry)/i, response: "Chad: 'Good. That is what I thought. Now go fix it.' (You lose 5 more energy from stress).", nextScene: 'leo_6', energyCost: 5 }
          ],
          fallback: "Chad is gaslighting you. Fight back or agree.",
          offensiveScene: 'leo_bad_2'
        },
        leo_6: {
          npcName: 'System',
          npcText: "You are working late. The server is still down. You see an email on Chad laptop (he left it open). Subject: 'Layoffs - 30% of staff.' Your name is on the list.",
          energyCost: 10,
          glossary: [{ word: 'Layoffs', meaning: 'Demissões em massa' }],
          quickReplies: [
            { label: 'Tirar foto do e-mail.', text: "I will take a picture of this email. I need proof." },
            { label: 'Surtar.', text: "I cannot believe this. I am going to quit right now!" }
          ],
          intents: [
            { match: /(photo|picture|proof|take)/i, response: "You take a photo. You now have leverage. (You can use this in the HR meeting).", nextScene: 'leo_7', addsFlags: ['leo_has_proof'] },
            { match: /(surtar|quit|cannot believe|right now)/i, response: "You scream in the empty office. The cleaning lady looks at you with pity. (You lose 20 energy).", nextScene: 'leo_7', energyCost: 20 }
          ],
          fallback: "You need to decide what to do with the information.",
          offensiveScene: 'leo_bad_2'
        },
        leo_7: {
          npcName: 'Slack [Chad]',
          npcText: "[Slack Message] Chad: 'Leo, I need you to come to my office. We need to touch base about your performance. HR is here.'",
          energyCost: 5,
          glossary: [{ word: 'Performance', meaning: 'Desempenho' }],
          quickReplies: [
            { label: 'Ir com calma.', text: "I am on my way. We can discuss my performance." },
            { label: 'Ir preparado para a guerra.', text: "I am coming. And I have some things to discuss too." }
          ],
          intents: [
            { match: /(on my way|calm|discuss)/i, response: "You walk into the office. Chad and Sarah (HR) are waiting for you. Chad is smiling. That is never a good sign.", nextScene: 'leo_8' },
            { match: /(prepared|war|discuss too)/i, response: "You walk into the office. Chad and Sarah (HR) are waiting. You feel your heart beating fast.", nextScene: 'leo_8' }
          ],
          fallback: "Chad is waiting. Say you are on your way.",
          offensiveScene: 'leo_bad_2'
        },
        leo_8: {
          npcName: 'Chad (CEO)',
          npcText: "Chad: 'Leo, thanks for coming. Look, the company is going through a rough patch. We need to let some people go. Due to budget cuts, your position has been eliminated. You are being fired.'",
          energyCost: 15,
          glossary: [{ word: 'Rough patch', meaning: 'Fase difícil' }, { word: 'Budget cuts', meaning: 'Cortes no orçamento' }, { word: 'Position eliminated', meaning: 'Cargo eliminado (demissão)' }],
          quickReplies: [
            { label: 'Usar a prova (Dossiê).', text: "I know about the 30% layoffs, Chad. I have proof. I want a severance package." },
            { label: 'Aceitar a demissão.', text: "I understand. I will pack my things." }
          ],
          intents: [
            { match: /(proof|severance|package|dossier|30%)/i, response: "Chad face turns pale. Sarah (HR) looks at him. 'Leo, let us discuss a severance package. We can offer you $2,000 to leave quietly.' (You won a negotiation!)", nextScene: 'leo_end_good', money: 2000 },
            { match: /(understand|pack|things|accept)/i, response: "Chad: 'Security will escort you. Good luck, Leo.' (You leave with nothing but stress).", nextScene: 'leo_end_ok' }
          ],
          fallback: "Chad is waiting. Use your leverage or accept the firing.",
          offensiveScene: 'leo_bad_2'
        },
        leo_end_good: { npcName: 'Narrador', npcText: "You walked out with $2,000 and your dignity. You highkey flexed your negotiation skills. You are going to be fine.", isEnd: true, endingType: 'bom' },
        leo_end_ok: { npcName: 'Narrador', npcText: "You packed your things. The security guard is nice. You are unemployed, but at least you do not have to deal with Chad anymore.", isEnd: true, endingType: 'ok' },
        leo_bad_1: { npcName: 'Manager', npcText: "Chad: 'You are not a team player. Get out of my sight.' (You are fired on the spot).", isEnd: true, endingType: 'ruim' },
        leo_bad_2: { npcName: 'Manager', npcText: "HR: 'Your behavior is unacceptable. We are terminating your contract immediately and suing you for defamation.' (Game Over).", isEnd: true, endingType: 'ruim' }
      }
    }
  }
};
window.currentGameDataB2 = gameDataB2;