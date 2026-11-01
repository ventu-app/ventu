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
    },
    
    sarah: {
      charId: 'sarah',
      name: 'Sarah',
      role: 'HR Manager',
      emoji: '👩‍💼',
      description: 'You have to fire 30% of the team today. Leo has proof. Gary is crying. Chad is gaslighting you. Survive.',
      initialState: { money: 1000.00, energy: 100 },
      startScene: 'sarah_1',
      scenes: {
        sarah_1: {
          npcName: 'Chad (CEO)',
          npcText: "Chad: 'Sarah, we need to cut 30% of the staff today. It is just business. I need you to handle the layoffs. Start with the dev team.'",
          energyCost: 10,
          glossary: [{ word: 'Layoffs', meaning: 'Demissões em massa' }, { word: 'Cut', meaning: 'Cortar / Reduzir' }],
          quickReplies: [
            { label: 'Aceitar a ordem.', text: "Understood, Chad. I will start the layoffs immediately." },
            { label: 'Tentar argumentar.', text: "Chad, is there another way? The team is already burned out." }
          ],
          intents: [
            { match: /(understood|start|immediately|accept)/i, response: "Chad: 'Good. That is why I hired you. Make it quick and quiet.'", nextScene: 'sarah_2' },
            { match: /(another way|burned out|argument|no)/i, response: "Chad: 'Sarah, do not be emotional. This is a business, not a charity. Do your job.' (You lose 5 energy).", nextScene: 'sarah_2', energyCost: 5 }
          ],
          fallback: "Chad is waiting. Accept the order or argue.",
          offensiveScene: 'sarah_bad_1'
        },
        sarah_2: {
          npcName: 'Gary (Intern)',
          npcText: "You call Gary into the office. He is shaking. 'Sarah, am I getting fired? I worked so hard. I have student loans to pay.'",
          energyCost: 15,
          glossary: [{ word: 'Student loans', meaning: 'Empréstimos estudantis' }, { word: 'Shaking', meaning: 'Tremendo' }],
          quickReplies: [
            { label: 'Ser honesta e empática.', text: "Gary, I am so sorry. Due to budget cuts, your position is being eliminated." },
            { label: 'Usar jargão corporativo.', text: "We are pivoting the team structure. We wish you the best in your future endeavors." }
          ],
          intents: [
            { match: /(sorry|honest|eliminated|budget)/i, response: "Gary starts crying. 'I understand. Thank you for being honest, Sarah. Can I get a recommendation letter?'", nextScene: 'sarah_3' },
            { match: /(pivoting|future endeavors|corporate|jargon)/i, response: "Gary looks confused. 'What does that mean? Just tell me if I am fired!' (You lose 10 energy from guilt).", nextScene: 'sarah_3', energyCost: 10 }
          ],
          fallback: "Gary is waiting. Be honest or use corporate jargon.",
          offensiveScene: 'sarah_bad_1'
        },
        sarah_3: {
          npcName: 'Leo (Developer)',
          npcText: "Leo walks into your office. He looks angry. 'Sarah, I know about the 30% layoffs. I have a photo of the email. I want a $2,000 severance package, or my lawyer will hear about this.'",
          energyCost: 15,
          glossary: [{ word: 'Severance package', meaning: 'Pacote de rescisão' }, { word: 'Lawyer', meaning: 'Advogado' }],
          quickReplies: [
            { label: 'Negociar com ele.', text: "Leo, let us be reasonable. We can offer you $1,500 and a good recommendation." },
            { label: 'Ameaçar de volta.', text: "You have no proof, Leo. If you sue us, you will never work in this industry again." }
          ],
          intents: [
            { match: /(reasonable|1500|recommendation|negotiate)/i, response: "Leo: 'Make it $1,800 and we have a deal. I will sign the NDA.'", nextScene: 'sarah_4' },
            { match: /(no proof|sue|never work|threaten)/i, response: "Leo: 'Are you gaslighting me, Sarah? I have the photo. I will see you in court.' (He storms out. You lose 20 energy).", nextScene: 'sarah_4', energyCost: 20 }
          ],
          fallback: "Leo is waiting. Negotiate or threaten him.",
          offensiveScene: 'sarah_bad_2'
        },
        sarah_4: {
          npcName: 'System',
          npcText: "You finished the layoffs. You are exhausted. Chad calls you into his office. 'Sarah, you did a great job today. But we need to cut more costs. I am afraid we have to let you go too.'",
          energyCost: 20,
          glossary: [{ word: 'Cut costs', meaning: 'Cortar custos' }],
          quickReplies: [
            { label: 'Chantagear o Chad.', text: "Chad, if you fire me, I will tell the press about the illegal layoffs and the gaslighting." },
            { label: 'Aceitar e sair.', text: "I understand, Chad. I will pack my things." }
          ],
          intents: [
            { match: /(blackmail|press|illegal|tell)/i, response: "Chad: 'You would not dare. Okay, fine. I will give you a $5,000 severance to keep your mouth shut.'", nextScene: 'sarah_end_good', money: 5000 },
            { match: /(understand|accept|pack|things)/i, response: "Chad: 'Thank you for your service, Sarah. Security will escort you.'", nextScene: 'sarah_end_ok' }
          ],
          fallback: "Chad is waiting. Blackmail him or accept your fate.",
          offensiveScene: 'sarah_bad_2'
        },
        sarah_end_good: { npcName: 'Narrador', npcText: "You walked out with $5,000 and a clear conscience. You exposed Chad to the press anonymously. He got fired. You are the real winner.", isEnd: true, endingType: 'bom' },
        sarah_end_ok: { npcName: 'Narrador', npcText: "You packed your things. You are unemployed, but at least you did not sell your soul completely. You need a vacation.", isEnd: true, endingType: 'ok' },
        sarah_bad_1: { npcName: 'Manager', npcText: "Chad: 'You are too emotional for this job. You are fired.' (Game Over).", isEnd: true, endingType: 'ruim' },
        sarah_bad_2: { npcName: 'Manager', npcText: "Leo sues the company. The company loses everything. You are blamed and fired. (Game Over).", isEnd: true, endingType: 'ruim' }
      }
    },
    
    chad: {
      charId: 'chad',
      name: 'Chad',
      role: 'CEO (Villain)',
      emoji: '🦈',
      description: 'You are the CEO. The goal is the IPO. Squeeze the team, gaslight the client, and make millions.',
      initialState: { money: 50000.00, energy: 100 },
      startScene: 'chad_1',
      scenes: {
        chad_1: {
          npcName: 'System',
          npcText: "It is Monday morning. The server crashed over the weekend. The dev team is exhausted. You have a meeting with the investors on Friday. What do you do?",
          energyCost: 5,
          glossary: [{ word: 'Investors', meaning: 'Investidores' }],
          quickReplies: [
            { label: 'Culpar a equipe.', text: "I will blame the dev team. The mistake was made by them." },
            { label: 'Assumir a culpa (Nunca!).', text: "I will take the blame and apologize to the investors." }
          ],
          intents: [
            { match: /(blame|dev team|mistake was made)/i, response: "You send an email blaming Leo and the dev team. You gain 10 energy (Corporate Power).", nextScene: 'chad_2', energyCost: -10 },
            { match: /(take the blame|apologize|never)/i, response: "Are you crazy? You are the CEO! You cannot show weakness. (You lose 20 energy).", nextScene: 'chad_2', energyCost: 20 }
          ],
          fallback: "Blame the team or take the blame. Choose.",
          offensiveScene: 'chad_bad_1'
        },
        chad_2: {
          npcName: 'Karen (Client)',
          npcText: "Karen calls. 'Chad, the new feature is not working. This is unacceptable. I am calling my lawyer.'",
          energyCost: 10,
          glossary: [{ word: 'Lawyer', meaning: 'Advogado' }],
          quickReplies: [
            { label: 'Gaslight da Karen.', text: "Karen, I think there has been a misunderstanding. The feature works perfectly. It is a user error." },
            { label: 'Oferecer um desconto.', text: "Karen, I apologize. We will give you a 20% discount on your next contract." }
          ],
          intents: [
            { match: /(misunderstanding|user error|gaslight)/i, response: "Karen: 'A user error? Are you kidding me? I am the client! I will destroy your company!' (You gain 15 energy).", nextScene: 'chad_3', energyCost: -15 },
            { match: /(discount|apologize|20%)/i, response: "Karen: 'Fine. But I want 30%.' (You lose $5,000).", nextScene: 'chad_3', money: -5000 }
          ],
          fallback: "Karen is waiting. Gaslight her or give a discount.",
          offensiveScene: 'chad_bad_1'
        },
        chad_3: {
          npcName: 'Sarah (HR)',
          npcText: "Sarah: 'Chad, the team is burned out. If we fire 30%, we might have a strike. What should I do?'",
          energyCost: 10,
          glossary: [{ word: 'Burned out', meaning: 'Esgotado' }, { word: 'Strike', meaning: 'Greve' }],
          quickReplies: [
            { label: 'Mandar demitir mesmo assim.', text: "Fire them, Sarah. We need to cut costs. Hire cheaper interns." },
            { label: 'Dar um bônus de retenção.', text: "Give them a $100 bonus. That should keep them quiet." }
          ],
          intents: [
            { match: /(fire|cut costs|interns)/i, response: "Sarah: 'Okay, Chad. But this is going to be a PR nightmare.' (You gain 10 energy. You lose $0).", nextScene: 'chad_4', energyCost: -10 },
            { match: /(bonus|100|quiet|keep)/i, response: "Sarah: 'A $100 bonus? That is an insult. But fine.' (You lose $5,000 for the bonuses).", nextScene: 'chad_4', money: -5000 }
          ],
          fallback: "Sarah is waiting. Fire them or give a bonus.",
          offensiveScene: 'chad_bad_1'
        },
        chad_4: {
          npcName: 'System',
          npcText: "It is Friday. The IPO is today. The investors are in the room. The team is exhausted, the client is suing, and the server is still down. What do you say?",
          energyCost: 20,
          glossary: [{ word: 'IPO', meaning: 'Oferta Pública Inicial (Abertura de capital)' }],
          quickReplies: [
            { label: 'Mentir para os investidores.', text: "The company is growing 300% this year. The team is happy. We are a family." },
            { label: 'Ser honesto (Final Ruim para o vilão).', text: "We have some issues, but we are working on it." }
          ],
          intents: [
            { match: /(growing|300%|happy|family|lie|investors)/i, response: "The investors are impressed. The IPO is a success. You are now a millionaire. You fire the whole team and move to the Bahamas.", nextScene: 'chad_end_good', money: 1000000 },
            { match: /(honest|issues|working on it)/i, response: "The investors pull out. The company crashes. You are bankrupt. The team laughs at you.", nextScene: 'chad_end_ok' }
          ],
          fallback: "The investors are waiting. Lie or be honest.",
          offensiveScene: 'chad_bad_1'
        },
        chad_end_good: { npcName: 'Narrador', npcText: "You sold the company, fired everyone, and bought a yacht. You are a terrible person, but you are rich. Highkey the worst timeline, but you won.", isEnd: true, endingType: 'bom' },
        chad_end_ok: { npcName: 'Narrador', npcText: "You were honest. The company crashed. You are bankrupt. Maybe you should have gaslighted them one last time.", isEnd: true, endingType: 'ok' },
        chad_bad_1: { npcName: 'Board of Directors', npcText: "The board of directors is tired of your scandals. You are fired. The golden parachute is gone.", isEnd: true, endingType: 'ruim' }
      }
    }
  }
};
window.currentGameDataB2 = gameDataB2;