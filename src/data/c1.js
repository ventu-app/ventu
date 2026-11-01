const gameDataC1 = {
  id: 'c1',
  title: 'Above the Salt',
  shopItems: [
    { id: 'wine', name: '🍷 Expensive Wine', price: 50.00, energy: 10, desc: 'Saves you from looking cheap. Gives you a boost of confidence.' },
    { id: 'mints', name: '🍬 Breath Mints', price: 5.00, energy: 5, desc: 'Essential before talking to the in-laws.' }
  ],
  characters: {
    // ============================================================
    // ALEX — THE IMMIGRANT (inalterado)
    // ============================================================
    alex: {
      charId: 'alex',
      name: 'Alex',
      role: 'The Immigrant',
      emoji: '🧑‍💼',
      description: 'You built your life from scratch. But at this dinner table, your "old money" father-in-law wants to see you bleed.',
      initialState: { money: 200.00, energy: 100 },
      startScene: 'alex_1',
      scenes: {
        // --- ATO 1: A CHEGADA ---
        alex_1: {
          npcName: 'Arthur (Father-in-law)',
          npcText: "Alex. Welcome to our home. Claire has told us so much about you. Your English is remarkably good, by the way. How long did it take you to lose the accent?",
          energyCost: 10,
          glossary: [{ word: 'Remarkably', meaning: 'Notavelmente' }, { word: 'Lose the accent', meaning: 'Perder o sotaque' }],
          quickReplies: [
            { label: 'Elegante: Elogiar a casa e desviar.', text: "Thank you, Arthur. Your home is beautiful. I'm still working on the accent, but I'm a fast learner." },
            { label: 'Afiado: Rebater com inversão.', text: "I appreciate that. Not only did I lose the accent, but I also learned how to read a room." }
          ],
          intents: [
            { match: /(thank you|beautiful|fast learner)/i, response: "Arthur: 'Yes, well, we do appreciate a... hard worker. Please, come in.' (He smiles, but it doesn't reach his eyes.)", nextScene: 'alex_2' },
            { match: /(not only did i|read a room|lose the accent)/i, response: "Arthur raises an eyebrow. 'Confidence. We will see if it is earned.' (He turns his back to you.)", nextScene: 'alex_2' }
          ],
          fallback: "Arthur is waiting for your response. Choose your words carefully.",
          offensiveScene: 'alex_bad_1'
        },
        alex_2: {
          npcName: 'Margaret (Mother-in-law)',
          npcText: "Alex, dear! So nice to meet you. Please, take a seat. You must be tired from your... long journey? Or do you live nearby now?",
          energyCost: 5,
          glossary: [{ word: 'Long journey', meaning: 'Viagem longa' }],
          quickReplies: [
            { label: 'Ser educado.', text: "Thank you, Margaret. I live nearby, yes. The journey was a while ago." },
            { label: 'Ser honesto.', text: "Actually, I've been here for ten years. It's my home now." }
          ],
          intents: [
            { match: /(nearby|journey|ten years|home)/i, response: "Margaret smiles warmly, but glances at Arthur. 'Ten years! Well, you're practically a local then.'", nextScene: 'alex_3' }
          ],
          fallback: "Margaret is waiting with a polite smile.",
          offensiveScene: 'alex_bad_1'
        },
        alex_3: {
          npcName: 'Richard (The Drunk Uncle)',
          npcText: "So, you're the guy who stole Claire from us! Haha! Relax, I'm joking. I'm Richard, the family's black sheep. What do you do for a living, anyway?",
          energyCost: 10,
          glossary: [{ word: 'Black sheep', meaning: 'Ovelha negra' }, { word: 'Stole', meaning: 'Roubou' }],
          quickReplies: [
            { label: 'Profissional: Falar da carreira.', text: "I'm a software engineer, Richard. I build scalable systems." },
            { label: 'Sarcástico: Entrar na piada.', text: "I didn't steal her, she followed me home. And I'm in tech." }
          ],
          intents: [
            { match: /(software|tech|engineer|systems)/i, response: "Richard: 'A tech guy! Boring, but it pays the bills, right? I'm in real estate.'", nextScene: 'alex_4' },
            { match: /(followed me home|joke|stole)/i, response: "Richard laughs loudly. 'I like you already. You have a spine.' Arthur glares at him from across the room.", nextScene: 'alex_4' }
          ],
          fallback: "Richard is taking a sip of his whiskey, waiting for your answer.",
          offensiveScene: 'alex_bad_1'
        },
        alex_4: {
          npcName: 'Claire (Your Partner)',
          npcText: "Hey, you're doing great. Just ignore my dad. He's... testing you. My mom likes you, I can tell. She's just afraid to show it.",
          energyCost: -10,
          glossary: [{ word: 'Testing you', meaning: 'Testando você' }],
          quickReplies: [
            { label: 'Agradecer o apoio.', text: "Thanks, honey. I'll try not to spill wine on the carpet." },
            { label: 'Mostrar preocupação.', text: "I feel like I'm walking on eggshells here. What if I say the wrong thing?" }
          ],
          intents: [
            { match: /(thanks|try|spill|eggshells|wrong thing)/i, response: "Claire: 'Just be yourself. That's why I love you.' She squeezes your hand just as Arthur calls everyone to the table.", nextScene: 'alex_5' }
          ],
          fallback: "Claire looks at you, waiting for your reaction.",
          offensiveScene: 'alex_bad_1'
        },
        alex_5: {
          npcName: 'Narrador',
          npcText: "As you walk towards the dining room, you trip over a rug. A full glass of red wine flies from your hand and lands directly on Margaret's pristine white Persian carpet.",
          energyCost: 15,
          glossary: [{ word: 'Pristine', meaning: 'Impecável' }, { word: 'Carpet', meaning: 'Tapete' }],
          quickReplies: [
            { label: 'Pedir desculpas e limpar.', text: "I am so sorry, Margaret. I will clean this up immediately. Please forgive me." },
            { label: 'Usar Inversão (C1) para assumir.', text: "Not only did I ruin the carpet, but I also ruined the evening. I am mortified." },
            { label: 'Ficar em silêncio (Pânico).', text: "..." }
          ],
          intents: [
            { match: /(sorry|clean|immediately|forgive)/i, response: "Margaret rushes to help you. Arthur sighs heavily. Richard bursts out laughing. 'Classic!'", nextScene: 'alex_6', energyCost: 5 },
            { match: /(not only did i|ruin|mortified)/i, response: "Arthur stares at you. 'At least you know how to use an inversion,' he says dryly. Margaret hides a tiny smile.", nextScene: 'alex_6', energyCost: 0 },
            { match: /(\.\.\.)/i, response: "The silence is deafening. Arthur rings a small bell. 'Maria, bring the cleaning supplies. And a new rug.' You feel your soul leaving your body.", nextScene: 'alex_6', energyCost: 20 }
          ],
          fallback: "Everyone is staring at the wine on the carpet. Say something!",
          offensiveScene: 'alex_bad_2'
        },
        // --- ATO 2: O JANTAR ---
        alex_6: {
          npcName: 'Arthur (Father-in-law)',
          npcText: "Well. Now that the carpet has been... baptized. Please, take your seat. You are sitting above the salt, Alex. Consider yourself lucky.",
          energyCost: 10,
          glossary: [{ word: 'Baptized', meaning: 'Batizado (usado ironicamente aqui)' }, { word: 'Above the salt', meaning: 'Acima do sal (lugar de honra na Idade Média)' }],
          quickReplies: [
            { label: 'Agradecer com elegância.', text: "Thank you for the honor, Arthur. I will try to be worthy of it." },
            { label: 'C1: Usar Cleft Sentence.', text: "What matters is the company, not the seat. Thank you for having me." }
          ],
          intents: [
            { match: /(honor|worthy|company|matters|having me)/i, response: "Arthur: 'Hmm. Well said.' He gestures for everyone to sit. Richard rolls his eyes.", nextScene: 'alex_7', energyCost: 0 }
          ],
          fallback: "Arthur is waiting for you to sit down. Say something.",
          offensiveScene: 'alex_bad_2'
        },
        alex_7: {
          npcName: 'Richard (The Drunk Uncle)',
          npcText: "This turkey is dry as hell! Maria, did you cook this with a hairdryer? Hahaha! What do you think, Alex?",
          energyCost: 10,
          glossary: [{ word: 'Dry as hell', meaning: 'Seco pra caramba' }],
          quickReplies: [
            { label: 'Defender a cozinheira.', text: "I think it is delicious, Richard. Cooking for this many people is not easy." },
            { label: 'Concordar com o tio (Caos).', text: "It is a bit dry. But I am too polite to say it." }
          ],
          intents: [
            { match: /(delicious|not easy|defend)/i, response: "Margaret looks at you with gratitude. Arthur nods slightly. Richard: 'Boring!'", nextScene: 'alex_8', energyCost: 0, addsFlags: ['alex_defended_chef'] },
            { match: /(dry|polite|chaos)/i, response: "Richard laughs loudly. Arthur frowns. 'We do not insult the staff at this table, Richard.'", nextScene: 'alex_8', energyCost: 5 }
          ],
          fallback: "Richard is waiting for you to bash the turkey.",
          offensiveScene: 'alex_bad_2'
        },
        alex_8: {
          npcName: 'Richard (The Drunk Uncle)',
          npcText: "Alright, enough small talk. Alex, let's talk politics. This country is a mess. What do you think about the immigration policies? Are you stealing our jobs?",
          energyCost: 20,
          glossary: [{ word: 'Mess', meaning: 'Bagunça' }, { word: 'Stealing our jobs', meaning: 'Roubando nossos empregos' }],
          quickReplies: [
            { label: 'Desescalar com C1.', text: "I didn't steal a job, Richard. I created three companies and hired twenty people. I think I'm helping." },
            { label: 'Usar Second Conditional.', text: "If we focused on education, we wouldn't be having this conversation. But let's just eat." }
          ],
          intents: [
            { match: /(created|hired|helping|companies)/i, response: "Richard goes quiet for a second. 'Fair point.' Arthur looks at you, genuinely surprised.", nextScene: 'alex_9', energyCost: 0 },
            { match: /(education|focused|conversation|eat)/i, response: "Arthur: 'A diplomatic answer. But I agree, let's not ruin the dinner.' Margaret sighs in relief.", nextScene: 'alex_9', energyCost: 5 }
          ],
          fallback: "The whole table is looking at you. Don't start a war.",
          offensiveScene: 'alex_bad_2'
        },
        alex_9: {
          npcName: 'Arthur (Father-in-law)',
          npcText: "Claire, pass the potatoes. Alex, a word. Claire is my only daughter. She is my world. If you break her heart, I will destroy your career. I know people.",
          energyCost: 25,
          glossary: [{ word: 'Break her heart', meaning: 'Quebrar o coração dela' }, { word: 'Destroy', meaning: 'Destruir' }],
          quickReplies: [
            { label: 'Mostrar coragem.', text: "I respect you, Arthur. But threatening me won't change how I feel about her. I will never hurt her." },
            { label: 'Aceitar a ameaça com frieza.', text: "Under no circumstances will I break her heart. But do not threaten me in my own home." }
          ],
          intents: [
            { match: /(respect|coragem|won't change|never hurt|never|circumstances)/i, response: "Arthur stares at you for a long moment. 'Good.' He goes back to eating. The tension is thick.", nextScene: 'alex_10', energyCost: 10 }
          ],
          fallback: "Arthur is waiting for your response. This is a test of your spine.",
          offensiveScene: 'alex_bad_2'
        },
        alex_10: {
          npcName: 'Margaret (Mother-in-law)',
          npcText: "I actually think Alex is a wonderful young man, Arthur. He has built so much from nothing. I think we should—",
          npcTextVariants: [
            { ifFlag: 'alex_defended_chef', text: "I actually think Alex is a wonderful young man, Arthur. He even defended Maria's turkey. I think we should—" }
          ],
          energyCost: 15,
          glossary: [{ word: 'Built from nothing', meaning: 'Construiu do zero' }],
          quickReplies: [
            { label: 'Defender a Margaret.', text: "With all due respect, Arthur, let her finish. It's Thanksgiving." },
            { label: 'Ficar quieto.', text: "..." }
          ],
          intents: [
            { match: /(let her finish|respect|thanksgiving)/i, response: "Arthur glares at you, but Margaret smiles. 'Thank you, Alex.' (You gained an ally).", nextScene: 'alex_11', addsFlags: ['alex_defended_margaret'] },
            { match: /(\.\.\.)/i, response: "Arthur cuts her off: 'Margaret, we're discussing business.' She looks down at her plate, defeated.", nextScene: 'alex_11', energyCost: 10 }
          ],
          fallback: "The table is silent. Arthur is controlling the conversation.",
          offensiveScene: 'alex_bad_2'
        },
        // --- ATO 3: O CAOS E O EX ---
        alex_11: {
          npcName: 'Narrador',
          npcText: "The doorbell rings. Arthur smiles for the first time tonight. 'Ah, that must be Julian.' The butler opens the door, and a man in an Armani suit walks in. It's Claire's ex.",
          energyCost: 20,
          glossary: [{ word: 'Must be', meaning: 'Deve ser' }],
          quickReplies: [
            { label: 'Ficar calmo e analisar.', text: "I see. Julian. Nice to meet you." },
            { label: 'Olhar para Claire.', text: "Claire? Did you know about this?" }
          ],
          intents: [
            { match: /(calm|nice to meet|claire|know about this|julian)/i, response: "Julian smirks. 'The famous Alex. Arthur told me so much about you.' Claire looks furious at her father. Margaret drops her fork.", nextScene: 'alex_12' }
          ],
          fallback: "Julian is waiting for your reaction. Arthur is watching.",
          offensiveScene: 'alex_bad_2'
        },
        alex_12: {
          npcName: 'Julian (The Ex)',
          npcText: "So, you're the self-made man. How quaint. Arthur tells me you're in software. Must be nice to work with... computers. I'm in private equity, by the way.",
          energyCost: 15,
          glossary: [{ word: 'Quaint', meaning: 'Pitoresco / Fofo (de forma condescendente)' }, { word: 'Private equity', meaning: 'Capital privado (mercado financeiro)' }],
          quickReplies: [
            { label: 'Usar Cleft Sentence para brilhar.', text: "It is not what we do, Julian, but how we do it. I build things that last." },
            { label: 'Ser sarcástico.', text: "Private equity. So you buy companies and fire people. Very noble." }
          ],
          intents: [
            { match: /(how we do it|build things|last|noble|fire people|buy companies)/i, response: "Julian's smile falters. 'Clever.' Arthur looks annoyed that Julian didn't win the exchange.", nextScene: 'alex_13' }
          ],
          fallback: "Julian is waiting to see if you'll bite.",
          offensiveScene: 'alex_bad_2'
        },
        alex_13: {
          npcName: 'Claire (Your Partner)',
          npcText: "Dad, what the hell is he doing here? You know Julian and I are over. This is completely out of line.",
          energyCost: 10,
          glossary: [{ word: 'Out of line', meaning: 'Ultrapassando os limites' }],
          quickReplies: [
            { label: 'Apoiar a Claire.', text: "I agree with Claire. This is disrespectful to both of us." },
            { label: 'Deixar a Claire liderar.', text: "This is between you and your father, Claire." }
          ],
          intents: [
            { match: /(agree|disrespectful|between you|claire)/i, response: "Arthur: 'I invited a family friend. Show some manners.' He turns to you. 'Alex, come to my study. Now.'", nextScene: 'alex_14' }
          ],
          fallback: "Arthur is ignoring Claire's protest. He is waiting for you.",
          offensiveScene: 'alex_bad_2'
        },
        alex_14: {
          npcName: 'Arthur (Father-in-law)',
          npcText: "Sit down. I will be blunt. Claire is meant for someone like Julian. Not you. I am offering you $5,000 to walk away from my daughter. Tonight.",
          energyCost: 30,
          glossary: [{ word: 'Blunt', meaning: 'Direto / Sem rodeios' }, { word: 'Walk away', meaning: 'Ir embora / Desistir' }],
          quickReplies: [
            { label: 'Recusar com Inversão (C1).', text: "Under no circumstances will I take your money. I love her." },
            { label: 'Negociar (Ganhar dinheiro).', text: "Make it $10,000, and I'll think about it." },
            { label: 'Ofender o Arthur.', text: "You think I'm that cheap? Go to hell, Arthur." }
          ],
          intents: [
            { match: /(under no circumstances|lose her|love her|refuse)/i, response: "Arthur: 'Hmph. You have a spine. That's rare.' He puts the check away. 'Get back to the table.'", nextScene: 'alex_15', energyCost: -10 },
            { match: /(10,000|think about it|negotiate)/i, response: "Arthur: 'So you can be bought. I knew it.' He tears the check. 'Get out of my house.' (You are a gold digger now.)", nextScene: 'alex_bad_2' },
            { match: /(cheap|hell|offend)/i, response: "Arthur: 'I have lawyers that will bury you. You are nothing.' He opens the door. 'We are done here.'", nextScene: 'alex_bad_2' }
          ],
          fallback: "The $5,000 check is on the table. Make your choice.",
          offensiveScene: 'alex_bad_2'
        },
        alex_15: {
          npcName: 'Narrador',
          npcText: "You return to the table. The tension is unbearable. Julian is smirking. Claire looks at you, searching for answers. Arthur says: 'Alex, you missed the pie. But I believe you owe us a toast.'",
          energyCost: 10,
          glossary: [{ word: 'Owe', meaning: 'Deve (obrigação)' }],
          quickReplies: [
            { label: 'Aceitar o brinde.', text: "Of course. I would be honored." },
            { label: 'Desafiar o Arthur.', text: "Only if you promise not to invite any more exes, Arthur." }
          ],
          intents: [
            { match: /(honored|accept|promise|exes|challenge)/i, response: "Arthur's eyes narrow. Claire suppresses a smile. Everyone raises their glasses. (End of Part 3).", nextScene: 'alex_16' }
          ],
          fallback: "Everyone is waiting for your toast.",
          offensiveScene: 'alex_bad_2'
        },
        // --- ATO 4: O BRINDE E O FINAL ---
        alex_16: {
          npcName: 'Julian (The Ex)',
          npcText: "Yes, Alex. Give us a toast. Try not to choke on your words. Or the wine, for that matter.",
          energyCost: 15,
          glossary: [{ word: 'Choke', meaning: 'Engasgar' }],
          quickReplies: [
            { label: 'Ignorar o Julian.', text: "I'll do my best, Julian. Thank you for your concern." },
            { label: 'Responder à altura.', text: "At least I know how to hold a glass, Julian. Unlike your tact." }
          ],
          intents: [
            { match: /(best|concern|glass|tact|hold)/i, response: "Julian's face flushes. Richard snorts into his wine. Claire looks at you, proud. Arthur clears his throat. 'The toast, Alex.'", nextScene: 'alex_17' }
          ],
          fallback: "Julian is waiting for your comeback. The room is watching.",
          offensiveScene: 'alex_bad_2'
        },
        alex_17: {
          npcName: 'Narrador',
          npcText: "You stand up. The entire room is looking at you. Margaret looks terrified. Arthur looks skeptical. Claire holds your hand under the table.",
          energyCost: 10,
          quickReplies: [
            { label: 'Elegante: Agradecer e focar no amor.', text: "I am grateful for tonight. For the food, the home, and most of all, for Claire." },
            { label: 'C1: Usar Inversão Avassaladora.', text: "Never have I felt so challenged, yet so welcomed. To Arthur, for testing me. And to Claire, for believing in me." },
            { label: 'Sincero e Emocional.', text: "I know I don't come from your world. But I promise to build a new one with her." }
          ],
          intents: [
            { match: /(grateful|love|claire|food|home)/i, response: "The table claps politely. Julian rolls his eyes. Arthur nods slowly. (A safe, elegant toast.)", nextScene: 'alex_18', energyCost: 0 },
            { match: /(never have i|challenged|welcomed|testing me|believing)/i, response: "There is a moment of silence. Then Richard says: 'I'll drink to that!' Margaret raises her glass immediately. Arthur stares at you, the corner of his mouth twitching. He raises his glass.", nextScene: 'alex_18', energyCost: -15 },
            { match: /(world|promise|build|new one|don't come)/i, response: "Claire squeezes your hand tighter. Margaret wipes a tear. Arthur looks down at his plate, silent for a moment. (An emotional, honest toast.)", nextScene: 'alex_18', energyCost: -5 }
          ],
          fallback: "The silence is deafening. You must finish your toast.",
          offensiveScene: 'alex_bad_2'
        },
        alex_18: {
          npcName: 'Arthur (Father-in-law)',
          npcText: "Well. That was... unexpected. Julian, pass the brandy. Alex, a word in the hall. Now.",
          energyCost: 15,
          glossary: [{ word: 'Unexpected', meaning: 'Inesperado' }],
          quickReplies: [
            { label: 'Seguir o Arthur com confiança.', text: "Of course, Arthur. Lead the way." },
            { label: 'Olhar para a Claire antes de ir.', text: "I'll be right back, Claire." }
          ],
          intents: [
            { match: /(lead the way|of course|right back|claire)/i, response: "You follow Arthur into the hallway. He closes the door behind him. The noise of the dining room fades. He looks at you, his expression unreadable.", nextScene: 'alex_19' }
          ],
          fallback: "Arthur is waiting for you in the hallway.",
          offensiveScene: 'alex_bad_2'
        },
        alex_19: {
          npcName: 'Arthur (Father-in-law)',
          npcText: "I have been in business for forty years. I can spot a fake a mile away. But you... you have something. Maybe it's the accent. Maybe it's the fact that you didn't take my money. I don't know if I like you. But Claire does. So, here is the deal. One mistake, and you are out. Understood?",
          energyCost: 20,
          glossary: [{ word: 'Spot a fake', meaning: 'Reconhecer uma farsa' }, { word: 'A mile away', meaning: 'De longe' }, { word: 'Understood', meaning: 'Entendido' }],
          quickReplies: [
            { label: 'Aceitar o desafio com elegância.', text: "Understood. I will not let her down." },
            { label: 'Fazer uma piada leve.', text: "Understood. And thank you for not making me wash the carpet." }
          ],
          intents: [
            { match: /(understood|not let her down|thank you|wash)/i, response: "Arthur: 'Good.' He opens the door. 'Go. The pie is getting cold.'", nextScene: 'alex_20' }
          ],
          fallback: "Arthur is waiting for your final answer.",
          offensiveScene: 'alex_bad_2'
        },
        alex_20: {
          npcName: 'Narrador',
          npcText: "You walk back into the dining room. The tension has broken. Richard is pouring brandy for everyone. Margaret gives you a small, secret nod. Julian is quietly sulking. Claire runs to you and kisses your cheek. You survived the dinner.",
          energyCost: 10,
          quickReplies: [
            { label: 'Finalizar.', text: "I made it." }
          ],
          intents: [
            { match: /(made it|survived|final)/i, response: "You made it. You are officially 'Above the Salt'.", nextScene: 'alex_end_good' }
          ],
          fallback: "Enjoy the moment.",
          offensiveScene: 'alex_bad_2'
        },
        alex_end_good: {
          npcName: 'Narrador',
          npcText: "You survived Thanksgiving. Arthur hasn't accepted you completely, but he respects you. You have a long road ahead, but you have Claire, and you kept your dignity. That's a win. (Final Bom)",
          isEnd: true,
          endingType: 'bom'
        },
        alex_bad_1: {
          npcName: 'Arthur',
          npcText: "I think it is time for you to leave. Security will show you the door. Do not call my daughter again.",
          isEnd: true,
          endingType: 'ruim'
        },
        alex_bad_2: {
          npcName: 'Arthur',
          npcText: "You have embarrassed this family in front of our guests. Get out of my house.",
          isEnd: true,
          endingType: 'ruim'
        }
      }
    },

    // ============================================================
    // ARTHUR — THE PATRIARCH
    // (arthur_1 a arthur_8 = seus originais; arthur_9 a arthur_20 = novos)
    // ============================================================
    arthur: {
      charId: 'arthur',
      name: 'Arthur',
      role: 'The Patriarch',
      emoji: '👨‍💼',
      description: 'Forty years in business. You built this family from nothing. Tonight, your daughter brings home a man you do not trust. Your brother is already drunk. Your wife is watching. Welcome to Thanksgiving.',
      initialState: { money: 500.00, energy: 100 },
      startScene: 'arthur_1',
      scenes: {
        // --- ATO 1: ANTES DO JANTAR ---
        arthur_1: {
          npcName: 'Margaret (Your Wife)',
          npcText: "Arthur. I heard you on the phone. You invited Julian to Thanksgiving dinner. Tell me you didn't.",
          energyCost: 5,
          glossary: [{ word: 'Thanksgiving', meaning: 'Dia de Ação de Graças' }],
          quickReplies: [
            { label: 'Justificar como estratégia.', text: "It's business, Margaret. Julian's father is a major investor. I need to keep him close." },
            { label: 'Admitir que é um teste.', text: "I want to see how Alex handles pressure. If he folds in front of Julian, he's not worthy of Claire." },
            { label: 'Fechar o assunto.', text: "I'm not discussing this. The guest list is final." }
          ],
          intents: [
            { match: /(business|investor|close)/i, response: "Margaret: 'Business. On Thanksgiving. You are unbelievable, Arthur.' She walks away, but you hear her mutter: 'I'm warning Claire.'", nextScene: 'arthur_2' },
            { match: /(test|pressure|worthy|folds|claire)/i, response: "Margaret stares at you. 'A test. You're testing the boy on Thanksgiving. God help you, Arthur, if this backfires.'", nextScene: 'arthur_2', addsFlags: ['tested_alex'] },
            { match: /(not discussing|final|guest list)/i, response: "Margaret: 'Fine. But when Claire finds out, it's your mess to clean.' She slams the kitchen door.", nextScene: 'arthur_2', energyCost: 5 }
          ],
          fallback: "Margaret is waiting. She's not going to let this go.",
          offensiveScene: 'arthur_bad_1'
        },
        arthur_2: {
          npcName: 'Richard (Your Brother)',
          npcText: "Big brother! I brought my own bottle — your stuff is too fancy for my taste. But tell me, did you really put me below the salt? Again?",
          energyCost: 5,
          glossary: [{ word: 'Below the salt', meaning: 'Abaixo do sal (lugar de menor honra)' }],
          quickReplies: [
            { label: 'Cortar o irmão.', text: "You're lucky to be at the table, Richard. Sit down before you say something you regret." },
            { label: 'Ter paciência (uma vez).', text: "I saved you a seat, Richard. Stop complaining and pour yourself a drink." },
            { label: 'Explorar a hierarquia.', text: "The salt is where it is, Richard. You know the rules." }
          ],
          intents: [
            { match: /(lucky|sit down|regret)/i, response: "Richard laughs, but his eyes are cold. 'There he is. The king of the castle. You know, Arthur, one day the castle burns down. And I'll be there. Watching.'", nextScene: 'arthur_3', energyCost: 5 },
            { match: /(saved|seat|pour|drink)/i, response: "Richard grunts. 'A seat. Big deal.' He pours a drink and sits. You notice his hands are shaking.", nextScene: 'arthur_3', addsFlags: ['patient_with_richard'] },
            { match: /(salt|rules|where it is)/i, response: "Richard: 'The salt. The rules. The king.' He drinks. 'You know what, Arthur? I'm done.'", nextScene: 'arthur_3', energyCost: 5 }
          ],
          fallback: "Richard is standing by the bar, waiting for you to react.",
          offensiveScene: 'arthur_bad_1'
        },
        arthur_3: {
          npcName: 'Alex (Claire\'s Partner)',
          npcText: "Thank you for having me, Arthur. Claire has told me so much about you. Your home is beautiful.",
          energyCost: 10,
          glossary: [{ word: 'Beautiful', meaning: 'Linda/Bonita' }],
          quickReplies: [
            { label: 'Testar com o sotaque.', text: "Your English is remarkably good. How long did it take you to lose the accent?" },
            { label: 'Receber com calor (raro).', text: "Alex. Claire has told me a lot about you. Come in. Let's see if the stories are true." },
            { label: 'Ser frio e direto.', text: "Alex. Please. Don't spill anything." }
          ],
          intents: [
            { match: /(accent|remarkably|good|english)/i, response: "Alex handles it well. You see something in his eyes — a flicker of steel. Interesting. Claire glares at you, but you ignore it.", nextScene: 'arthur_4', addsFlags: ['tested_accent'] },
            { match: /(stories|true|come in|told)/i, response: "Alex: 'I hope they're all good ones.' You almost smile. Almost. Claire exhales in relief.", nextScene: 'arthur_4', addsFlags: ['warm_start'] },
            { match: /(spill|don't|direct|cold)/i, response: "Alex: 'I'll do my best, sir.' You turn away. Claire looks at you, hurt. Margaret glares from the kitchen.", nextScene: 'arthur_4', energyCost: 5 }
          ],
          fallback: "Alex is waiting for you to say something.",
          offensiveScene: 'arthur_bad_1'
        },
        // --- ATO 2: O JANTAR ---
             arthur_4: {
          npcName: 'Narrador',
          npcText: "Alex walks toward his chair and trips. A full glass of red wine flies from his hand and lands on Margaret's pristine white Persian carpet.",
          energyCost: 15,
          glossary: [{ word: 'Pristine', meaning: 'Impecável' }, { word: 'Carpet', meaning: 'Tapete' }],
          quickReplies: [
            { label: 'Explodir de raiva.', text: "What the hell is wrong with you?! That carpet is worth more than your salary!" },
            { label: 'Ficar em silêncio (frieza).', text: "..." },
            { label: 'Rir (quebrar o gelo).', text: "Well. At least it's not the good carpet. The good one is in the study." }
          ],
          intents: [
            { match: /(hell|wrong|salary|worth|explode)/i, response: "Alex freezes. Margaret rushes to help. Richard laughs. Claire: 'Dad!' You've gone too far. The room is against you.", nextScene: 'arthur_5', energyCost: 10, addsFlags: ['exploded'] },
            { match: /(\.\.\.)/i, response: "The silence is deafening. Alex is mortified. Margaret: 'Arthur, say something!' You stare at the wine. You say nothing.", nextScene: 'arthur_5', energyCost: 5 },
            { match: /(not the good|study|joke|laugh)/i, response: "There is a pause. Then Margaret laughs. Then Claire. Even Alex cracks a smile. Richard: 'The old Arthur. He's still in there.'", nextScene: 'arthur_5', addsFlags: ['humor_carpet'] }
          ],
          fallback: "Everyone is staring at the wine. And at you.",
          offensiveScene: 'arthur_bad_1'
        },
        arthur_5: {
          npcName: 'Narrador',
          npcText: "Everyone is seated. Alex is above the salt — you allowed it. Richard is below, fuming. Margaret says grace. The tension is thick enough to cut.",
          energyCost: 10,
          quickReplies: [
            { label: 'Fazer um brinde de abertura.', text: "Before we eat — a toast. To family. The one we have. And the one we're building." },
            { label: 'Ficar em silêncio e observar.', text: "..." },
            { label: 'Cutucar Richard.', text: "Richard, since you're below the salt, you can carve the turkey. Or is that too much work for you?" }
          ],
          intents: [
            { match: /(toast|family|building)/i, response: "Margaret smiles. Claire beams. Alex raises his glass. Richard watches, suspicion in his eyes. 'Here's to family,' he mutters.", nextScene: 'arthur_6' },
            { match: /(\.\.\.)/i, response: "Silence. Margaret: 'Arthur, say something.' You nod. 'Let's eat.' The table exhales.", nextScene: 'arthur_6', energyCost: 5 },
            { match: /(richard|carve|turkey|work)/i, response: "Richard: 'Hilarious, Arthur. Really.' But he does it. Slowly. Badly. Claire looks at you with disappointment.", nextScene: 'arthur_6', energyCost: 10 }
          ],
          fallback: "The table is silent. Everyone is waiting for you to lead.",
          offensiveScene: 'arthur_bad_1'
        },
        arthur_6: {
          npcName: 'Richard (Your Brother)',
          npcText: "This turkey is dry as hell! Maria, did you cook this with a hairdryer? Hahaha! What do you think, Arthur? You used to have a sense of humor.",
          energyCost: 10,
          glossary: [{ word: 'Dry as hell', meaning: 'Seco pra caramba' }],
          quickReplies: [
            { label: 'Defender a Maria.', text: "Richard. Apologize to Maria. Now." },
            { label: 'Desescalar com humor.', text: "I think the turkey is excellent. The company is what's hard to swallow." },
            { label: 'Rir com ele (caos).', text: "You're right. Next year, we're ordering pizza." }
          ],
          intents: [
            { match: /(apologize|maria|now)/i, response: "Richard: 'Oh, he's serious.' He apologizes, but he's fuming. Maria thanks you later in the kitchen. Margaret squeezes your hand under the table.", nextScene: 'arthur_7', addsFlags: ['defended_maria'] },
            { match: /(excellent|company|hard to swallow)/i, response: "Richard: 'Sharp. The old Arthur. I missed him.' He laughs, but it's hollow. Claire looks at you with something like gratitude.", nextScene: 'arthur_7', addsFlags: ['humor_disarm'] },
            { match: /(pizza|right|order)/i, response: "Richard laughs. Everyone else doesn't. Margaret: 'Arthur, really?' Alex looks at you, confused.", nextScene: 'arthur_7', energyCost: 5 }
          ],
          fallback: "Everyone is watching you. Richard is waiting for your reaction.",
          offensiveScene: 'arthur_bad_1'
        },
        arthur_7: {
          npcName: 'Richard (Your Brother)',
          npcText: "Alright, enough small talk. Alex, let's talk politics. This country is a mess. What do you think about the immigration policies? Are you stealing our jobs?",
          energyCost: 15,
          glossary: [{ word: 'Stealing our jobs', meaning: 'Roubando nossos empregos' }, { word: 'Mess', meaning: 'Bagunça' }],
          quickReplies: [
            { label: 'Intervir e encerrar.', text: "Richard. That's enough. Alex is a guest in my home. We don't interrogate guests." },
            { label: 'Deixar Alex se defender.', text: "..." },
            { label: 'Concordar parcialmente com Richard.', text: "Richard has a point. The system is broken. But Alex isn't the problem." }
          ],
          intents: [
            { match: /(enough|interrogate|guest|my home)/i, response: "The table goes silent. Alex looks at you, surprised. Richard: 'The king speaks.' But he backs down. Margaret nods at you. Claire is beaming.", nextScene: 'arthur_8', addsFlags: ['protected_alex'] },
            { match: /(\.\.\.)/i, response: "Alex handles it well — better than you expected. 'I created three companies and hired twenty people. I think I'm helping.' Richard goes quiet. You watch, impressed.", nextScene: 'arthur_8', addsFlags: ['alex_impressed'] },
            { match: /(point|broken|not the problem)/i, response: "Alex: 'I agree the system is broken. But I didn't break it.' Richard: 'They all say that.' You feel the room slipping.", nextScene: 'arthur_8', energyCost: 5 }
          ],
          fallback: "Richard is waiting. Alex is watching. The whole table is silent.",
          offensiveScene: 'arthur_bad_1'
        },
        arthur_8: {
          npcName: 'Arthur (Yourself)',
          npcText: "You pull Alex aside after the carpet incident. 'Claire is my only daughter. She is my world. If you break her heart, I will destroy your career. I know people.'",
          energyCost: 15,
          glossary: [{ word: 'Break her heart', meaning: 'Quebrar o coração dela' }, { word: 'Destroy', meaning: 'Destruir' }],
          quickReplies: [
            { label: 'Entregar a ameaça.', text: "I respect you, Arthur. But threatening me won't change how I feel about her. I will never hurt her." },
            { label: 'Ser frio e calculista.', text: "Under no circumstances will I break her heart. But do not threaten me in my own home." },
            { label: 'Recuar.', text: "I understand, sir. I'll be careful." }
          ],
          intents: [
            { match: /(respect|won't change|never hurt|circumstances|frio|cold)/i, response: "Alex stares at you for a long moment. 'Good.' You go back to the table. You don't know if you believe him. But you want to.", nextScene: 'arthur_9', addsFlags: ['threat_made'] },
            { match: /(understand|careful|recuar)/i, response: "Alex: 'I understand, sir.' He walks away. You feel something you don't like — the feeling of having won a battle you didn't need to fight.", nextScene: 'arthur_9', energyCost: 5 }
          ],
          fallback: "Alex is waiting. The hallway is empty. It's just the two of you.",
          offensiveScene: 'arthur_bad_2'
        },

        // --- ATO 3: O EX E O SUBORNO (novos) ---
        arthur_9: {
          npcName: 'Claire (Your Daughter)',
          npcText: "Dad. Why is Julian here? You promised. You PROMISED no more tests.",
          energyCost: 15,
          glossary: [{ word: 'Promised', meaning: 'Prometeu' }],
          quickReplies: [
            { label: 'Admitir.', text: "I know. I'm sorry, Claire. I thought — I thought I needed to see something." },
            { label: 'Mentir.', text: "He was in the neighborhood. I didn't invite him." },
            { label: 'Justificar.', text: "Claire, I'm doing this for you. Julian is stable. Julian is family." }
          ],
          intents: [
            { match: /(sorry|thought|needed to see|admit)/i, response: "Claire's eyes soften. 'Dad...' She sits down next to you. 'I don't need you to test him. I need you to trust me.'", nextScene: 'arthur_10', addsFlags: ['admitted'] },
            { match: /(neighborhood|didn't invite|mentir|lying)/i, response: "Claire: 'I don't believe you.' She walks away. Margaret won't look at you. You lied to your daughter — and she knows.", nextScene: 'arthur_10', energyCost: 10, addsFlags: ['lied_to_claire'] },
            { match: /(stable|family|for you|justify)/i, response: "Claire: 'I don't want stable. I want Alex. And you don't get to choose.' She storms off. Richard: 'Well. That went well.'", nextScene: 'arthur_10', energyCost: 15 }
          ],
          fallback: "Claire is waiting. Her eyes are wet.",
          offensiveScene: 'arthur_bad_1'
        },
        arthur_10: {
          npcName: 'Alex (Claire\'s Partner)',
          npcText: "You wanted to talk, Arthur. Here I am. What's this really about?",
          energyCost: 20,
          glossary: [{ word: 'Really about', meaning: 'Realmente sobre o que' }],
          quickReplies: [
            { label: 'Oferecer o suborno.', text: "I'll be blunt. I have a check for $5,000. Walk away from Claire. Tonight." },
            { label: 'Fazer a pergunta final.', text: "Are you going to break her heart?" },
            { label: 'Ser honesto sobre o medo.', text: "I'm afraid. That's what this is really about. I'm afraid of losing her. Of losing my world." }
          ],
          intents: [
            { match: /(5000|check|blunt|walk away|money)/i, response: "Alex: 'You think I'm that cheap?' He puts down his glass. 'I don't want your money, Arthur. I want your daughter.' He walks away. You are left holding the check.", nextScene: 'arthur_11', addsFlags: ['offered_money'], energyCost: 5 },
            { match: /(break her heart|final|question)/i, response: "Alex: 'No. I'm going to marry her.' The words land like a punch. You didn't expect honesty — you expected a fight.", nextScene: 'arthur_11', addsFlags: ['honest_answer'] },
            { match: /(afraid|fear|losing|losing my world)/i, response: "Alex is quiet for a moment. 'Then stop fighting me. I'm not your enemy.' For the first time tonight, you don't know what to say.", nextScene: 'arthur_11', addsFlags: ['vulnerable'] }
          ],
          fallback: "Alex is waiting. The hallway is empty. It's just the two of you.",
          offensiveScene: 'arthur_bad_2'
        },
        arthur_11: {
          npcName: 'Narrador',
          npcText: "You return to the table. Julian is holding court, telling a story about a yacht in Monaco. Richard is pouring himself another drink. Margaret looks at you — she knows something happened in the hallway.",
          energyCost: 10,
          quickReplies: [
            { label: 'Deixar Julian dominar a mesa.', text: "..." },
            { label: 'Elogiar Alex na frente de todos.', text: "Alex. Tell us about your company. I hear you built it from nothing." },
            { label: 'Cortar Julian.', text: "Julian. Enough about the yacht. We get it. You have money." }
          ],
          intents: [
            { match: /(\.\.\.)/i, response: "Julian dominates for ten minutes. Claire looks at you, disappointed. Margaret: 'Arthur, say something.' You don't.", nextScene: 'arthur_12', energyCost: 10, addsFlags: ['passive'] },
            { match: /(company|built it|from nothing|tell us|alex)/i, response: "Alex: 'I started with nothing, yes. But I had a mentor. And I worked.' Julian: 'How inspiring.' Richard snorts. Claire beams at you.", nextScene: 'arthur_12', addsFlags: ['promoted_alex'], energyCost: 0 },
            { match: /(enough|yacht|money|cortar|cut)/i, response: "Julian: 'Arthur, come on. I'm just sharing.' But he stops. Richard laughs. Claire looks at you with something like respect.", nextScene: 'arthur_12', energyCost: 5 }
          ],
          fallback: "The table is awkwardly silent. Julian is waiting for you to react.",
          offensiveScene: 'arthur_bad_2'
        },
        arthur_12: {
          npcName: 'Julian (The Ex)',
          npcText: "Arthur, I have to ask. Are you really going to let her marry a software engineer? I mean, no offense to Alex, but Claire deserves... more.",
          energyCost: 15,
          glossary: [{ word: 'No offense', meaning: 'Sem ofensa (expressão que geralmente precede algo ofensivo)' }],
          quickReplies: [
            { label: 'Defender Alex (virar o jogo).', text: "Claire deserves someone who earned what they have. Alex did. You inherited yours." },
            { label: 'Ficar em silêncio e assistir.', text: "..." },
            { label: 'Concordar com Julian (trair Alex).', text: "You make a fair point, Julian." }
          ],
          intents: [
            { match: /(earned|inherited|defend|earn)/i, response: "Julian's face goes white. Richard: 'OH! He got you, Julian!' Claire covers her mouth. Margaret: 'Arthur, that was...' She smiles. She can't help it.", nextScene: 'arthur_13', addsFlags: ['roasted_julian'], energyCost: 0 },
            { match: /(\.\.\.)/i, response: "Alex: 'I think I can defend myself, Arthur.' He handles it well. But you feel the weight of not having spoken.", nextScene: 'arthur_13', energyCost: 5 },
            { match: /(fair point|concordar|agree)/i, response: "Claire: 'Dad!' Alex looks at you, hurt. Julian smirks. Richard: 'Oof. Stone cold, Arthur.'", nextScene: 'arthur_13', energyCost: 10, addsFlags: ['betrayed_alex'] }
          ],
          fallback: "Julian is waiting for you to agree with him. Claire is watching.",
          offensiveScene: 'arthur_bad_2'
        },
        arthur_13: {
          npcName: 'Margaret (Your Wife)',
          npcText: "Arthur. In the kitchen. Now. We need to talk about what's happening at this table.",
          energyCost: 15,
          glossary: [{ word: 'Now', meaning: 'Agora' }],
          quickReplies: [
            { label: 'Admitir que errou.', text: "You're right. I've been... difficult. Julian was a mistake." },
            { label: 'Defender o plano.', text: "I'm protecting Claire. That's all I've ever done." },
            { label: 'Ser frio.', text: "Not now, Margaret." }
          ],
          intents: [
            { match: /(difficult|mistake|you're right|admit|wrong)/i, response: "Margaret: 'Finally.' She takes a deep breath. 'Then fix it. Tonight. Apologize to Alex. And get Julian out of my house.'", nextScene: 'arthur_14', addsFlags: ['wife_wins'], energyCost: 0 },
            { match: /(protecting|always|plan)/i, response: "Margaret: 'Protecting her from what? From being loved? You're protecting your ego, Arthur. And I'm tired of it.'", nextScene: 'arthur_14', energyCost: 10 },
            { match: /(not now|frio|cold|dismiss)/i, response: "Margaret: 'No. NOW.' She blocks the doorway. 'I have stood by you for forty years. Tonight, you listen to me.'", nextScene: 'arthur_14', energyCost: 5 }
          ],
          fallback: "Margaret is standing in the kitchen doorway. She's not moving.",
          offensiveScene: 'arthur_bad_2'
        },
        arthur_14: {
          npcName: 'Narrador',
          npcText: "You return to the table. Julian is smirking. Claire is holding Alex's hand. Richard is drunker than before. Margaret nods at you — a silent order to fix this.",
          energyCost: 10,
          quickReplies: [
            { label: 'Demandar o brinde.', text: "Alex. You owe us a toast. The floor is yours." },
            { label: 'Apologizar publicamente.', text: "I want to apologize. To Alex. To Claire. Julian was a mistake." },
            { label: 'Aguardar o que acontece.', text: "..." }
          ],
          intents: [
            { match: /(toast|floor|owe|yours)/i, response: "Alex nods. The room goes quiet. Julian: 'Oh, this should be good.'", nextScene: 'arthur_15' },
            { match: /(apologize|sorry|mistake|public)/i, response: "Silence. Then Claire: 'Dad...' She gets up and hugs you. Richard: 'Who are you and what have you done with my brother?'", nextScene: 'arthur_15', addsFlags: ['public_apology'], energyCost: -10 },
            { match: /(\.\.\.)/i, response: "The silence stretches. Margaret: 'Arthur.' Her voice is a warning. You say nothing.", nextScene: 'arthur_15', energyCost: 10, addsFlags: ['passive_again'] }
          ],
          fallback: "Everyone is waiting for you.",
          offensiveScene: 'arthur_bad_2'
        },

        // --- ATO 4: O BRINDE E O FINAL ---
        arthur_15: {
          npcName: 'Alex (Claire\'s Partner)',
          npcText: "Alright. I'll give the toast. But first, I want to say something to you, Arthur. In front of everyone.",
          energyCost: 15,
          glossary: [{ word: 'In front of everyone', meaning: 'Na frente de todos' }],
          quickReplies: [
            { label: 'Conceder espaço.', text: "Go ahead." },
            { label: 'Ficar na defensiva.', text: "What could you possibly have to say?" },
            { label: 'Tentar parar.', text: "This isn't the time, Alex." }
          ],
          intents: [
            { match: /(go ahead|conceder|space)/i, response: "Alex: 'Thank you.' He turns to the table. 'I didn't come here to win Arthur's approval. I came here because Claire asked me to. And I love her.'", nextScene: 'arthur_16', addsFlags: ['gave_floor'], energyCost: 0 },
            { match: /(what could|defensive|possibly|say)/i, response: "Alex: 'I know you don't trust me. But I'm not going anywhere.' The table goes silent. Claire: 'Dad. Stop.'", nextScene: 'arthur_16', energyCost: 5 },
            { match: /(not the time|stop|tentar parar)/i, response: "Alex: 'No. It is the time.' For the first time tonight, he looks at you without fear. 'You need to hear this.'", nextScene: 'arthur_16', energyCost: 5 }
          ],
          fallback: "Alex is waiting. The table is watching. You can't control this anymore.",
          offensiveScene: 'arthur_bad_2'
        },
        arthur_16: {
          npcName: 'Alex (Claire\'s Partner)',
          npcText: "I know what you think of me. You think I'm a gold digger. An immigrant. Not good enough for your daughter. But I have something you don't, Arthur. I have Claire's trust. And that's worth more than your money.",
          energyCost: 20,
          glossary: [{ word: 'Worth more', meaning: 'Vale mais' }, { word: 'Gold digger', meaning: 'Interesseiro (que busca dinheiro)' }],
          quickReplies: [
            { label: 'Reconhecer a verdade.', text: "You're right. I was wrong. About you. About this." },
            { label: 'Contra-atacar.', text: "Trust is earned, Alex. Not demanded." },
            { label: 'Ficar em silêncio.', text: "..." }
          ],
          intents: [
            { match: /(you're right|wrong|reconhecer|truth)/i, response: "Alex nods. 'Thank you.' He raises his glass. 'To family. The one we're building.' Margaret wipes a tear. Richard: 'I'll drink to that.'", nextScene: 'arthur_17', addsFlags: ['truly_respected'], energyCost: -15 },
            { match: /(earned|demanded|contra|trust)/i, response: "Alex: 'I agree. And I've been trying to earn it all night. You just haven't been watching.' The table is silent.", nextScene: 'arthur_17', energyCost: 10 },
            { match: /(\.\.\.)/i, response: "Alex holds your gaze. 'Silence. That's fair.' He sits down. Claire looks at you, and you see something you've never seen before: disappointment.", nextScene: 'arthur_17', energyCost: 15, addsFlags: ['passive_final'] }
          ],
          fallback: "The whole table is watching. Your response will decide everything.",
          offensiveScene: 'arthur_bad_2'
        },
        arthur_17: {
          npcName: 'Narrador',
          npcText: "The dinner winds down. Julian leaves early, making excuses. Richard passes out on the couch. Margaret kisses your forehead. Claire and Alex are helping Maria with the dishes. The house is quiet.",
          energyCost: 10,
          quickReplies: [
            { label: 'Procurar Alex para conversar.', text: "...we should talk. Man to man." },
            { label: 'Ficar sozinho com seus pensamentos.', text: "..." },
            { label: 'Elogiar Alex para Claire.', text: "You chose well, Claire." }
          ],
          intents: [
            { match: /(talk|man to man|conversar)/i, response: "You find Alex on the porch. He's looking at the stars. 'Beautiful night,' he says. You sit down next to him.", nextScene: 'arthur_18', addsFlags: ['sought_alex'] },
            { match: /(\.\.\.)/i, response: "You sit in your study, holding a glass of whiskey. Your reflection stares back at you. You don't like what you see.", nextScene: 'arthur_18', energyCost: 5, addsFlags: ['reflective'] },
            { match: /(chose well|claire|elogiar|praise)/i, response: "Claire looks at you. 'Thank you, Dad.' She hugs you. Alex nods from the kitchen doorway. There's hope.", nextScene: 'arthur_18', addsFlags: ['accepted_union'], energyCost: -10 }
          ],
          fallback: "The night is almost over. What do you do?",
          offensiveScene: 'arthur_bad_2'
        },
        arthur_18: {
          npcName: 'Arthur (Yourself)',
          npcText: "You look at Alex. This is the moment. You can accept him — or you can let him go. Your daughter's happiness is in your hands.",
          energyCost: 20,
          glossary: [{ word: 'In your hands', meaning: 'Nas suas mãos' }],
          quickReplies: [
            { label: 'Dar a bênção.', text: "You have my blessing. Both of you. Don't make me regret it." },
            { label: 'Ameaçar uma última vez.', text: "One mistake. That's all it takes. Understood?" },
            { label: 'Ficar em silêncio.', text: "..." }
          ],
          intents: [
            { match: /(blessing|don't make me|regret|bênção)/i, response: "Alex: 'Thank you, Arthur.' He offers his hand. You shake it. It's not warm. But it's a start.", nextScene: 'arthur_19', addsFlags: ['blessing_given'], energyCost: -20 },
            { match: /(one mistake|understood|threat|ameaçar)/i, response: "Alex: 'Understood.' He doesn't flinch. You respect that. You don't like it. But you respect it.", nextScene: 'arthur_19', energyCost: 10 },
            { match: /(\.\.\.)/i, response: "You say nothing. Alex waits. Then he nods. 'I understand.' He walks away. You let him.", nextScene: 'arthur_19', energyCost: 15, addsFlags: ['silence_final'] }
          ],
          fallback: "The moment is here. Choose.",
          offensiveScene: 'arthur_bad_2'
        },
        arthur_19: {
          npcName: 'Claire (Your Daughter)',
          npcText: "Dad. Thank you. For tonight. I know it wasn't easy. But... you were decent. That's all I wanted.",
          energyCost: 10,
          glossary: [{ word: 'Decent', meaning: 'Decente / Ok' }],
          quickReplies: [
            { label: 'Abraçar a filha.', text: "You deserve a man who loves you. I think... he does." },
            { label: 'Mudar de assunto.', text: "Get some sleep, Claire. Tomorrow is another day." },
            { label: 'Reclamar.', text: "Decent. I let him into my home. That's more than decent." }
          ],
          intents: [
            { match: /(deserve|loves you|he does|abraçar)/i, response: "Claire hugs you. You hold her for a long time. 'I love you, Dad.' You say it back. You mean it.", nextScene: 'arthur_20', addsFlags: ['bond_repaired'], energyCost: -15 },
            { match: /(sleep|another day|mudar|assunto)/i, response: "Claire: 'Good night, Dad.' She kisses your cheek. She lingers. 'I love you.' She walks away.", nextScene: 'arthur_20', energyCost: 0 },
            { match: /(reclamar|decent|more than|complaint)/i, response: "Claire looks at you, disappointed. 'Good night, Dad.' She walks away. You wish you'd said something else.", nextScene: 'arthur_20', energyCost: 10 }
          ],
          fallback: "Claire is waiting. She wants to hear something real.",
          offensiveScene: 'arthur_bad_2'
        },
        arthur_20: {
          npcName: 'Narrador',
          npcText: "You survived Thanksgiving. Your family is still intact — barely. Alex is still here. Your brother is asleep in the guest room. Your wife is next to you, reading. And for the first time in years, you think: maybe I can do this. Maybe I can let go.",
          energyCost: 10,
          quickReplies: [
            { label: 'Finalizar.', text: "I'm still the patriarch. But maybe... that's okay." }
          ],
          intents: [
            { match: /(patriarch|okay|still|final)/i, response: "You are still the patriarch. But now you have a family. A real one. And that's enough. (Final Bom)", nextScene: 'arthur_end_good' }
          ],
          fallback: "Enjoy the moment.",
          offensiveScene: 'arthur_bad_2'
        },
        arthur_end_good: {
          npcName: 'Narrador',
          npcText: "You didn't let go of your pride, but you didn't let it destroy your family either. Claire is happy. Margaret respects you again. Alex is... part of the family now. You're still Above the Salt. But now you're not alone. (Final Bom)",
          isEnd: true,
          endingType: 'bom'
        },
        arthur_bad_1: {
          npcName: 'Narrador',
          npcText: "The dinner is a disaster. You said too much. You tested too hard. Claire left with Alex in tears. Margaret hasn't spoken to you in three days. Richard is gone. The house has never been so quiet. (Final Ruim)",
          isEnd: true,
          endingType: 'ruim'
        },
        arthur_bad_2: {
          npcName: 'Narrador',
          npcText: "You pushed Alex too far. He walked out. Claire went after him. She hasn't called. Your wife is considering a lawyer. And Julian? He left with a smile on his face. You are alone, Arthur. The patriarch of nothing. (Final Ruim)",
          isEnd: true,
          endingType: 'ruim'
        }
      }
    },

    // ============================================================
    // RICHARD — THE DRUNK UNCLE
    // ============================================================
    richard: {
      charId: 'richard',
      name: 'Richard',
      role: 'The Drunk Uncle',
      emoji: '🍺',
      description: "You are the family's black sheep. You've been below the salt your whole life. Tonight, you drink. You cause chaos. And maybe — just maybe — you'll be the only one who tells the truth. Welcome to Thanksgiving.",
      initialState: { money: 50.00, energy: 100 },
      startScene: 'richard_1',
      scenes: {
        // --- ATO 1: A CHEGADA ---
        richard_1: {
          npcName: 'Narrador',
          npcText: "You arrive at Arthur's house with your own bottle of whiskey. You know he hates it. Good. The doorman looks at you with pity. You hate that more.",
          energyCost: 5,
          glossary: [{ word: 'Black sheep', meaning: 'Ovelha negra' }, { word: 'Pity', meaning: 'Pena / Piedade' }],
          quickReplies: [
            { label: 'Entrar com tudo.', text: "Big brother! I brought my own bottle — your stuff is too fancy for my taste!" },
            { label: 'Entrar quieto (raro).', text: "...just let me in. I won't cause trouble." },
            { label: 'Zoar o doorman.', text: "What are you looking at? Go polish a silver spoon or something." }
          ],
          intents: [
            { match: /(big brother|bottle|fancy|taste)/i, response: "Arthur appears at the top of the stairs. 'Richard. You're early. And drunk.' You grin. 'I'm not early. I'm on time. You're just sober.'", nextScene: 'richard_2', addsFlags: ['loud_entry'] },
            { match: /(quiet|won't cause|just let me|raro)/i, response: "The doorman blinks. 'Of course, Mr. Richard.' You walk in, hands in your pockets. Arthur watches you from the study, suspicious.", nextScene: 'richard_2', addsFlags: ['quiet_entry'], energyCost: 0 },
            { match: /(polish|spoon|silver|zoar)/i, response: "The doorman doesn't react. But you catch Arthur's eye from across the hall. He's not amused. 'Richard. In here. Now.'", nextScene: 'richard_2', energyCost: 5, addsFlags: ['hostile_entry'] }
          ],
          fallback: "The doorman is waiting. Arthur is watching from the stairs.",
          offensiveScene: 'richard_bad_1'
        },
        richard_2: {
          npcName: 'Arthur (Your Brother)',
          npcText: "Richard. You brought your own bottle. Again. Must you embarrass me in front of the guests?",
          energyCost: 10,
          glossary: [{ word: 'Embarrass', meaning: 'Envergonhar' }, { word: 'Guests', meaning: 'Convidados' }],
          quickReplies: [
            { label: 'Contra-atacar.', text: "Embarrass you? I'm the only honest person in this house. You should thank me." },
            { label: 'Ignorar e beber.', text: "..." },
            { label: 'Apaziguar (raro).', text: "Relax, Arthur. I'll behave. For Margaret." }
          ],
          intents: [
            { match: /(honest|thank me|contra|attack)/i, response: "Arthur's jaw tightens. 'Honest. You call getting drunk and insulting my guests honest?' You take a swig. 'I call it Tuesday.'", nextScene: 'richard_3', addsFlags: ['fought_arthur'] },
            { match: /(\.\.\.)/i, response: "You drink. Arthur watches. 'Fine. But stay below the salt. And don't talk to Julian.' He walks away.", nextScene: 'richard_3', addsFlags: ['drank_ignored'], energyCost: 5 },
            { match: /(behave|relax|margaret|apaziguar)/i, response: "Arthur blinks. 'You'll behave.' He doesn't believe you. But he nods. 'See that you do.'", nextScene: 'richard_3', addsFlags: ['promised_behave'], energyCost: 0 }
          ],
          fallback: "Arthur is waiting for you to say something. Don't ruin it. Or do.",
          offensiveScene: 'richard_bad_1'
        },
        richard_3: {
          npcName: 'Margaret (Your Sister-in-law)',
          npcText: "Richard! You're here. Please, try not to drink too much tonight. Arthur is already on edge. Claire is bringing someone new.",
          energyCost: 10,
          glossary: [{ word: 'On edge', meaning: 'Nervoso / Tensão' }, { word: 'Someone new', meaning: 'Alguém novo' }],
          quickReplies: [
            { label: 'Elogiar Margaret.', text: "You look beautiful, Margaret. Arthur doesn't deserve you." },
            { label: 'Perguntar sobre o novo.', text: "Someone new? What's his story? Is he another Julian?" },
            { label: 'Zoar a situação.', text: "Another suitor for Claire? This should be fun." }
          ],
          intents: [
            { match: /(beautiful|deserve|elogiar)/i, response: "Margaret blushes. 'Oh, Richard. You're drunk.' But she smiles. 'The new one is Alex. He's... different. I think you'll like him.'", nextScene: 'richard_4', addsFlags: ['charmed_margaret'] },
            { match: /(story|julian|another|perguntar)/i, response: "Margaret: 'His name is Alex. He's an immigrant. He built a company. Arthur hates him.' You laugh. 'So he's interesting.'", nextScene: 'richard_4', addsFlags: ['curious_about_alex'] },
            { match: /(suitor|fun|zoar|should be)/i, response: "Margaret: 'Richard, please. No chaos tonight. Promise me.' You raise your glass. 'I promise... nothing.' She sighs.", nextScene: 'richard_4', energyCost: 5 }
          ],
          fallback: "Margaret is waiting. She looks tired.",
          offensiveScene: 'richard_bad_1'
        },
        richard_4: {
          npcName: 'Claire (Your Niece)',
          npcText: "Uncle Richard! You came. I'm so glad. This is Alex. Alex, this is the famous Uncle Richard.",
          energyCost: 5,
          glossary: [{ word: 'Famous', meaning: 'Famoso' }],
          quickReplies: [
            { label: 'Apertar a mão e testar.', text: "So you're the man who stole Claire from us. What do you do for a living?" },
            { label: 'Ser caloroso (raro).', text: "Alex. I've heard good things. Claire deserves someone good." },
            { label: 'Ser bêbado e direto.', text: "Another one! You're braver than Julian. That one ran when Arthur sneezed." }
          ],
          intents: [
            { match: /(stole|what do you do|test|apertar)/i, response: "Alex: 'I'm a software engineer. I build companies.' You nod. 'Not bad. Better than Julian.' Claire laughs. Alex relaxes.", nextScene: 'richard_5', addsFlags: ['tested_alex'] },
            { match: /(good things|deserves|warm|caloroso)/i, response: "Alex: 'Thank you, Richard.' He means it. Claire looks at you with surprise. 'You're being nice.' You shrug. 'I'm full of surprises.'", nextScene: 'richard_5', addsFlags: ['warm_to_alex'], energyCost: 0 },
            { match: /(braver|julian|ran|sneezed|bebado)/i, response: "Alex laughs. 'I've heard about Julian.' Claire rolls her eyes. 'Don't remind me.' You like this kid already.", nextScene: 'richard_5', addsFlags: ['bonded_with_alex'], energyCost: 5 }
          ],
          fallback: "Claire is waiting. Alex is watching you carefully.",
          offensiveScene: 'richard_bad_1'
        },
        richard_5: {
          npcName: 'Narrador',
          npcText: "You sit down. Below the salt. Again. Arthur is at the head of the table, of course. Julian is on his right. Alex is on his left. You raise your glass and drink. The alcohol warms you.",
          energyCost: 10,
          glossary: [{ word: 'Below the salt', meaning: 'Abaixo do sal (lugar de menor honra)' }],
          quickReplies: [
            { label: 'Beber para esquecer.', text: "..." },
            { label: 'Observar a mesa.', text: "..." },
            { label: 'Fazer um brinde irônico.', text: "To the salt. May it always be above me." }
          ],
          intents: [
            { match: /(\.\.\.)/i, response: "You drink. And drink. Arthur watches you. Margaret looks worried. Claire is talking to Alex. Julian is boring everyone with his yacht story.", nextScene: 'richard_6', energyCost: 10, addsFlags: ['got_drunk'] },
            { match: /(watch|observe|observar)/i, response: "You watch. Arthur controls the conversation. Julian preens. Alex is quiet. Claire is nervous. Margaret is tense. And you? You see everything.", nextScene: 'richard_6', energyCost: 0, addsFlags: ['observed'] },
            { match: /(salt|above me|brinde|ironic|toast)/i, response: "Arthur glares. Margaret sighs. Claire hides a smile. Julian looks confused. You drink. 'What? Too soon?'", nextScene: 'richard_6', energyCost: 5, addsFlags: ['ironic_toast'] }
          ],
          fallback: "The table is full. The tension is thick. What do you do?",
          offensiveScene: 'richard_bad_1'
        },
        // --- ATO 2: O JANTAR ---
        richard_6: {
          npcName: 'Narrador',
          npcText: "The turkey arrives. Arthur cuts it. Everyone is served. You poke at your food. The smell of wine is overwhelming. You want more.",
          energyCost: 10,
          quickReplies: [
            { label: 'Pedir mais vinho.', text: "Maria! More wine. Arthur's cellar won't miss it." },
            { label: 'Comer e ficar quieto.', text: "..." },
            { label: 'Criticar a comida.', text: "This turkey is dry as hell. Maria, did you cook this with a hairdryer?" }
          ],
          intents: [
            { match: /(wine|cellar|maria|more)/i, response: "Arthur: 'Richard.' A warning. You ignore him. Maria brings the wine. You pour yourself a generous glass.", nextScene: 'richard_7', energyCost: -10, addsFlags: ['got_more_wine'] },
            { match: /(\.\.\.)/i, response: "You eat. It's good. But you don't say so. Arthur watches you, waiting for a mistake. You don't give him one.", nextScene: 'richard_7', energyCost: 0, addsFlags: ['stayed_quiet'] },
            { match: /(dry|hairdryer|turkey|criticar)/i, response: "Maria freezes. Arthur: 'Richard. Apologize to Maria. Now.' Margaret: 'Richard, please.' Claire: 'Uncle Richard!' You grin. 'I'm just saying what everyone is thinking.'", nextScene: 'richard_7', energyCost: 5, addsFlags: ['insulted_maria'] }
          ],
          fallback: "Everyone is looking at you. Say something. Or don't.",
          offensiveScene: 'richard_bad_1'
        },
        richard_7: {
          npcName: 'Julian (The Ex)',
          npcText: "So, Richard. Arthur tells me you're in real estate. How's that going? I hear the market is... challenging.",
          energyCost: 15,
          glossary: [{ word: 'Challenging', meaning: 'Desafiador (eufemismo para ruim)' }],
          quickReplies: [
            { label: 'Contra-atacar Julian.', text: "Challenging. Like your personality. I manage. Unlike some people, I earn my money." },
            { label: 'Falar a verdade.', text: "It's terrible. I'm broke. Arthur knows. Everyone knows. Happy?" },
            { label: 'Ser passivo-agressivo.', text: "It's going fine. But I'm not the one who needs to impress Arthur tonight, am I?" }
          ],
          intents: [
            { match: /(personality|manage|earn|contra|attack)/i, response: "Julian's smile falters. 'Clever.' Arthur: 'Richard.' But Claire laughs. Alex hides a smile. You drink.", nextScene: 'richard_8', addsFlags: ['roasted_julian'], energyCost: 0 },
            { match: /(broke|terrible|everyone knows|truth|verdade)/i, response: "Silence. Then Margaret: 'Richard, you're not broke. You just make bad choices.' Arthur: 'Margaret.' Julian smirks. You drink.", nextScene: 'richard_8', energyCost: 5, addsFlags: ['honest_breakdown'] },
            { match: /(fine|impress|passive|agressivo)/i, response: "Julian: 'I'm just making conversation.' You: 'So am I. Funny how it cuts both ways.' Arthur looks at you. Not angry. Curious.", nextScene: 'richard_8', addsFlags: ['sparred_julian'] }
          ],
          fallback: "Julian is waiting. The table is watching.",
          offensiveScene: 'richard_bad_2'
        },
        richard_8: {
          npcName: 'Narrador',
          npcText: "Arthur clears his throat. 'Alex. Let's talk politics. This country is a mess. What do you think about immigration? Are you stealing our jobs?' The table goes silent.",
          energyCost: 20,
          glossary: [{ word: 'Stealing our jobs', meaning: 'Roubando nossos empregos' }, { word: 'Mess', meaning: 'Bagunça' }],
          quickReplies: [
            { label: 'Defender Alex.', text: "Arthur. That's enough. Alex is a guest. We don't interrogate guests." },
            { label: 'Concordar com Arthur (caos).', text: "He has a point, Alex. Are you stealing our jobs? I'm joking. Mostly." },
            { label: 'Ficar quieto e beber.', text: "..." }
          ],
          intents: [
            { match: /(enough|interrogate|guest|defend|defender)/i, response: "The table goes silent. Alex looks at you, surprised. Arthur: 'Richard. Stay out of this.' You: 'No. I won't. Not tonight.'", nextScene: 'richard_9', addsFlags: ['protected_alex'], energyCost: 0 },
            { match: /(joking|mostly|concordar|caos)/i, response: "Alex: 'I created three companies and hired twenty people. I'm not stealing jobs. I'm creating them.' Richard: 'I was joking!' But the damage is done.", nextScene: 'richard_9', energyCost: 10, addsFlags: ['awkward_joke'] },
            { match: /(\.\.\.)/i, response: "You drink. Alex handles it well. Arthur looks impressed. Julian looks annoyed. You say nothing. But you watch everything.", nextScene: 'richard_9', energyCost: 5, addsFlags: ['silent_observer'] }
          ],
          fallback: "The whole table is waiting. Choose.",
          offensiveScene: 'richard_bad_2'
        },
        richard_9: {
          npcName: 'Narrador',
          npcText: "Alex stands up. He's walking toward his chair. He trips. A full glass of red wine flies from his hand and lands on Margaret's pristine white Persian carpet.",
          energyCost: 15,
          glossary: [{ word: 'Pristine', meaning: 'Impecável' }, { word: 'Carpet', meaning: 'Tapete' }],
          quickReplies: [
            { label: 'Rir (caos).', text: "HAHAHA! Classic! Arthur, your face!" },
            { label: 'Ajudar Alex.', text: "Here. Let me help. Margaret, don't worry. It's just wine." },
            { label: 'Ficar em choque.', text: "..." }
          ],
          intents: [
            { match: /(hahaha|classic|face|rir)/i, response: "Arthur: 'Richard.' Margaret: 'Richard!' Claire: 'Uncle Richard!' You laugh. You can't help it. Alex looks mortified. But you see a tiny smile on Claire's face.", nextScene: 'richard_10', energyCost: 5, addsFlags: ['laughed_at_alex'] },
            { match: /(help|worry|just wine|ajudar)/i, response: "You kneel down and dab the carpet with a napkin. Margaret: 'Richard...' You: 'It's fine. It's just wine.' Alex: 'Thank you.' You nod. Arthur says nothing.", nextScene: 'richard_10', energyCost: 0, addsFlags: ['helped_alex'] },
            { match: /(\.\.\.)/i, response: "You stare. Everyone is frozen. Arthur: 'Maria. Cleaning supplies. Now.' Alex: 'I'm so sorry.' You pour yourself another drink.", nextScene: 'richard_10', energyCost: 5, addsFlags: ['shock'] }
          ],
          fallback: "The carpet is ruined. The evening is ruined. Or is it?",
          offensiveScene: 'richard_bad_2'
        },
        richard_10: {
          npcName: 'Arthur (Your Brother)',
          npcText: "Richard. In the kitchen. Now. I need to talk to you about Julian. And Alex. And you.",
          energyCost: 15,
          glossary: [{ word: 'Now', meaning: 'Agora' }],
          quickReplies: [
            { label: 'Seguir Arthur.', text: "Fine. But I'm bringing my bottle." },
            { label: 'Recusar.', text: "I'm not going anywhere. Say it in front of everyone." },
            { label: 'Zoar.', text: "Oh, the king wants to see me. Should I bow first?" }
          ],
          intents: [
            { match: /(bottle|follow|fine|seguir)/i, response: "Arthur: 'Fine.' He leads you to the kitchen. 'I need you to keep Julian occupied. Keep him away from Claire. And don't ruin this.' You drink. 'I'll do my best.'", nextScene: 'richard_11', addsFlags: ['followed_arthur'] },
            { match: /(not going|in front|recusar)/i, response: "Arthur: 'Richard. Please.' He looks tired. You see it. For a moment, you see your brother. Not the king. Just Arthur. You follow him.", nextScene: 'richard_11', addsFlags: ['saw_brother'], energyCost: 5 },
            { match: /(king|bow|zoar|mock)/i, response: "Arthur: 'Richard. For once in your life, be serious.' You follow him. But you don't bow. You never bow.", nextScene: 'richard_11', energyCost: 5, addsFlags: ['mocked_arthur'] }
          ],
          fallback: "Arthur is waiting. This is not a request.",
          offensiveScene: 'richard_bad_2'
        },
        // --- ATO 3: O CAOS ---
        richard_11: {
          npcName: 'Arthur (Your Brother)',
          npcText: "I need you to keep Julian away from Claire. Distract him. Talk to him. I don't care what you do. Just keep him away from my daughter.",
          energyCost: 15,
          glossary: [{ word: 'Distract', meaning: 'Distrair' }],
          quickReplies: [
            { label: 'Aceitar o trabalho.', text: "Fine. I'll keep Julian busy. But you owe me." },
            { label: 'Chantagear Arthur.', text: "What's in it for me? A seat above the salt? A raise? An apology?" },
            { label: 'Recusar e confrontar.', text: "You invited him, Arthur. You fix it. I'm not your servant." }
          ],
          intents: [
            { match: /(owe me|fine|accept|job|trabalho)/i, response: "Arthur: 'Thank you.' You: 'Don't thank me yet.' You walk back to the table. Julian is telling another story. Time to be the black sheep.", nextScene: 'richard_12', addsFlags: ['accepted_mission'] },
            { match: /(what's in it|raise|apology|chantagear)/i, response: "Arthur: 'You want an apology?' You: 'No. I want you to admit you need me.' Arthur: 'I need you.' You: 'That's all I wanted to hear.'", nextScene: 'richard_12', addsFlags: ['blackmailed_arthur'], energyCost: -5 },
            { match: /(you fix|servant|not your|recusar)/i, response: "Arthur: 'Richard. Please.' You: 'No. You invited him. You fix it.' You walk back to the table. Arthur is left alone in the kitchen.", nextScene: 'richard_12', energyCost: 10, addsFlags: ['refused_mission'] }
          ],
          fallback: "Arthur is waiting. Choose.",
          offensiveScene: 'richard_bad_2'
        },
        richard_12: {
          npcName: 'Julian (The Ex)',
          npcText: "Richard. Arthur sent you to babysit me, didn't he? Don't lie. I can see it in your eyes.",
          energyCost: 15,
          glossary: [{ word: 'Babysit', meaning: 'Tomar conta (como de uma criança)' }, { word: 'Lie', meaning: 'Mentir' }],
          quickReplies: [
            { label: 'Admitir com honestidade.', text: "Yes. He did. But I'm not here for him. I'm here because you're an ass and I want to watch you fail." },
            { label: 'Mentir mal.', text: "Babysit? No. I just want to talk. About... yachts. Tell me about yachts." },
            { label: 'Ficar do lado de Julian (trair).', text: "He did. But between you and me? You deserve Claire more than that guy." }
          ],
          intents: [
            { match: /(watch you fail|ass|honest|admit)/i, response: "Julian: 'At least you're honest.' He drinks. 'You know, Richard, we're not so different. We're both below the salt.' You: 'I know. But I don't pretend to be something I'm not.'", nextScene: 'richard_13', addsFlags: ['honest_with_julian'] },
            { match: /(yachts|lie|babysit|bad lie)/i, response: "Julian: 'Yachts. Really.' He laughs. 'You're a terrible liar, Richard.' You: 'I know. I'm drunk.' He pours you a drink. 'At least you're entertaining.'", nextScene: 'richard_13', energyCost: -10, addsFlags: ['lied_badly'] },
            { match: /(deserve|betray|side|trair)/i, response: "Julian: 'Now we're talking. Help me get rid of Alex, and I'll make it worth your while.' You: 'What's your offer?' Arthur appears in the doorway. He heard everything.", nextScene: 'richard_13', addsFlags: ['betrayed_alex'], energyCost: 5 }
          ],
          fallback: "Julian is waiting. He's smarter than he looks.",
          offensiveScene: 'richard_bad_2'
        },
        richard_13: {
          npcName: 'Narrador',
          npcText: "You look across the table. Claire is holding Alex's hand. Arthur is watching you. Margaret is watching Arthur. Julian is smirking. Everyone is playing a role. Except you. You're just drunk.",
          energyCost: 10,
          quickReplies: [
            { label: 'Contar a verdade sobre Julian.', text: "Hey, everyone! Julian offered me money to help him get rid of Alex. Just thought you should know." },
            { label: 'Ficar quieto e beber.', text: "..." },
            { label: 'Fazer um discurso bêbado.', text: "You know what? This family is messed up. But I love it. I love all of you. Even Julian. Wait, no. Not Julian." }
          ],
          intents: [
            { match: /(everyone|offered me money|truth|verdade|conta)/i, response: "Silence. Julian: 'That's a lie!' You: 'Is it?' Arthur: 'Julian. We'll talk later.' Claire looks at you. 'Thank you, Uncle Richard.'", nextScene: 'richard_14', addsFlags: ['exposed_julian'], energyCost: -10 },
            { match: /(\.\.\.)/i, response: "You drink. The chaos continues without you. Arthur controls. Julian manipulates. Claire suffers. Alex endures. You watch. The whiskey burns.", nextScene: 'richard_14', energyCost: 5, addsFlags: ['drank_alone'] },
            { match: /(messed up|love it|discurso|drunk)/i, response: "Everyone stares. Then Richard laughs. Then Claire. Then Margaret. Even Arthur smiles. 'Richard. You're drunk.' You: 'And you're welcome.'", nextScene: 'richard_14', addsFlags: ['comic_relief'], energyCost: -5 }
          ],
          fallback: "The table is watching you. Say something. Do something. Be Richard.",
          offensiveScene: 'richard_bad_2'
        },
        richard_14: {
          npcName: 'Narrador',
          npcText: "Julian leaves in a hurry. Arthur is furious. Claire is relieved. Alex is confused. And you? You're still here. Still drinking. Still the black sheep.",
          energyCost: 15,
          quickReplies: [
            { label: 'Consolar Claire.', text: "Claire. Your father is an idiot. But he loves you. And Alex? He's good. Better than Julian." },
            { label: 'Enfrentar Arthur.', text: "Arthur. We need to talk. About Julian. About Alex. About this family." },
            { label: 'Sumir com uma garrafa.', text: "..." }
          ],
          intents: [
            { match: /(consolar|idiot|love|better|good)/i, response: "Claire hugs you. 'Thank you, Uncle Richard.' You: 'Don't thank me. I'm drunk.' She laughs. 'That's why I love you.'", nextScene: 'richard_15', addsFlags: ['comforted_claire'], energyCost: -10 },
            { match: /(talk|family|enfrentar|need to talk)/i, response: "Arthur: 'Richard. I'm tired.' You: 'I know. I am too. But we need to fix this.' He nods. 'Fine. Tonight. After everyone leaves.'", nextScene: 'richard_15', addsFlags: ['confronted_arthur'] },
            { match: /(\.\.\.)/i, response: "You take the bottle and walk out to the porch. The night is cold. The stars are bright. You drink. And you think about your brother. And your niece. And what you could have been.", nextScene: 'richard_15', energyCost: 10, addsFlags: ['alone'] }
          ],
          fallback: "The house is quiet. What do you do?",
          offensiveScene: 'richard_bad_2'
        },
        richard_15: {
          npcName: 'Narrador',
          npcText: "The guests are gone. The house is dark. You're sitting on the porch, nursing a bottle. Arthur appears behind you. He doesn't say anything. He just sits down.",
          energyCost: 20,
          quickReplies: [
            { label: 'Oferecer uma bebida.', text: "...want some?" },
            { label: 'Esperar ele falar.', text: "..." },
            { label: 'Romper o silêncio.', text: "I'm sorry, Arthur. For tonight. For everything." }
          ],
          intents: [
            { match: /(offer|bottle|want some)/i, response: "Arthur: 'No. I don't drink.' You: 'I know.' He looks at you. 'But thank you.' He doesn't smile. But he doesn't leave either.", nextScene: 'richard_16', addsFlags: ['offered_drink'], energyCost: 0 },
            { match: /(\.\.\.)/i, response: "You sit in silence. The crickets chirp. The bottle passes between you. After a long moment, Arthur says: 'I need you, Richard. I don't want to. But I do.'", nextScene: 'richard_16', addsFlags: ['arthur_opened'], energyCost: 5 },
            { match: /(sorry|apologize|everything|romper)/i, response: "Arthur: 'I know.' He looks at you. 'I'm sorry too.' You: 'For what?' He: 'For keeping you below the salt. For all those years.'", nextScene: 'richard_16', addsFlags: ['mutual_apology'], energyCost: -10 }
          ],
          fallback: "Arthur is waiting. The bottle is between you.",
          offensiveScene: 'richard_bad_2'
        },
        // --- ATO 4: A REDENÇÃO ---
        richard_16: {
          npcName: 'Arthur (Your Brother)',
          npcText: "I need you, Richard. I don't want to. But I do. Claire trusts you. Margaret likes you. And I... I don't know. But I need you.",
          energyCost: 15,
          glossary: [{ word: 'I need you', meaning: 'Eu preciso de você' }],
          quickReplies: [
            { label: 'Aceitar com humor.', text: "Well, it's about time. But I'm not wearing a suit." },
            { label: 'Aceitar com seriedade.', text: "I'm here, Arthur. I've always been here. You just never looked." },
            { label: 'Recusar.', text: "I don't know, Arthur. You've said a lot of things. I need to think." }
          ],
          intents: [
            { match: /(suit|about time|humor|aceitar)/i, response: "Arthur laughs. A real laugh. 'You're impossible.' You: 'I know. That's why you need me.' He nods. 'Yes. That's why.'", nextScene: 'richard_17', addsFlags: ['humor_accepted'], energyCost: -10 },
            { match: /(always|never looked|serious|seriedade)/i, response: "Arthur is quiet. 'I know. I'm sorry.' You: 'Don't be sorry. Be better.' He nods. 'I'll try.' It's not a promise. But it's a start.", nextScene: 'richard_17', addsFlags: ['serious_accepted'] },
            { match: /(think|need to|recusar|refuse)/i, response: "Arthur: 'I understand.' He gets up. 'Good night, Richard.' You: 'Good night, Arthur.' He walks away. You drink. You think.", nextScene: 'richard_17', energyCost: 5, addsFlags: ['hesitant'] }
          ],
          fallback: "Arthur is waiting. The night is cold. The bottle is almost empty.",
          offensiveScene: 'richard_bad_2'
        },
        richard_17: {
          npcName: 'Narrador',
          npcText: "You walk back inside. The house is quiet. You see Claire on the couch, asleep on Alex's shoulder. Margaret is cleaning up. Arthur is standing by the window. The night is almost over.",
          energyCost: 10,
          quickReplies: [
            { label: 'Falar com Margaret.', text: "Margaret. You okay?" },
            { label: 'Observar Claire e Alex.', text: "..." },
            { label: 'Ir dormir.', text: "I'm done. Good night, everyone." }
          ],
          intents: [
            { match: /(margaret|okay|falar)/i, response: "Margaret: 'I'm tired, Richard. But I'm okay.' You: 'He's trying. Arthur. He's trying.' She: 'I know.' She squeezes your hand. 'Thank you.'", nextScene: 'richard_18', addsFlags: ['comforted_margaret'], energyCost: -5 },
            { match: /(\.\.\.)/i, response: "You watch them. Claire is smiling in her sleep. Alex is holding her. They look... happy. You feel something you haven't felt in years. Hope.", nextScene: 'richard_18', energyCost: 0, addsFlags: ['saw_hope'] },
            { match: /(good night|done|dormir|sleep)/i, response: "You stumble to the guest room. The bed is soft. The room is quiet. You fall asleep with a smile on your face. (The first in years.)", nextScene: 'richard_18', energyCost: 5, addsFlags: ['slept'] }
          ],
          fallback: "The house is quiet. The night is almost over.",
          offensiveScene: 'richard_bad_2'
        },
        richard_18: {
          npcName: 'Claire (Your Niece)',
          npcText: "Uncle Richard. Thank you. For tonight. For helping Alex. For... being you.",
          energyCost: 15,
          glossary: [{ word: 'Being you', meaning: 'Sendo você' }],
          quickReplies: [
            { label: 'Abraçar Claire.', text: "You're welcome, kid. You deserve a good one. And he's good." },
            { label: 'Fazer uma piada.', text: "Don't thank me. I'm just here for the free booze." },
            { label: 'Ser sincero.', text: "I was wrong, Claire. About a lot of things. But I was right about you. You're the best of us." }
          ],
          intents: [
            { match: /(deserve|good one|he's good|abraçar)/i, response: "Claire hugs you. 'I love you, Uncle Richard.' You: 'I love you too, kid.' It's not a moment. It's a life. And you're in it.", nextScene: 'richard_19', addsFlags: ['hugged_claire'], energyCost: -15 },
            { match: /(free booze|joke|piada)/i, response: "Claire laughs. 'You're terrible.' You: 'I know. But you love me.' She: 'I do. God help me.'", nextScene: 'richard_19', energyCost: -5 },
            { match: /(wrong|best of us|sincero|honest)/i, response: "Claire is quiet. Then she says: 'You're not wrong, Uncle Richard. You're not the black sheep. You're just... the honest one.' You don't know what to say. So you hug her.", nextScene: 'richard_19', addsFlags: ['honest_redemption'], energyCost: -10 }
          ],
          fallback: "Claire is waiting. She looks at you with something like love.",
          offensiveScene: 'richard_bad_2'
        },
        richard_19: {
          npcName: 'Narrador',
          npcText: "The night is over. You're standing in the doorway. Arthur is at the table, drinking coffee. Margaret is reading. Claire is asleep on Alex's shoulder. Your family. Broken. But yours.",
          energyCost: 10,
          quickReplies: [
            { label: 'Dizer uma última palavra.', text: "Arthur. For what it's worth... this is a good family. You did good." },
            { label: 'Sair em silêncio.', text: "..." },
            { label: 'Ficar.', text: "You know what? I'm staying. For breakfast. If that's okay." }
          ],
          intents: [
            { match: /(good family|did good|word|palavra)/i, response: "Arthur looks up. 'Richard...' He stops. He doesn't know what to say. But his eyes are wet. You nod. You leave. It's enough.", nextScene: 'richard_20', addsFlags: ['final_word'], energyCost: -10 },
            { match: /(\.\.\.)/i, response: "You walk out. The door closes behind you. The night is cold. But you're warm. You don't know why. You just are.", nextScene: 'richard_20', energyCost: 0 },
            { match: /(breakfast|staying|ficar)/i, response: "Arthur: 'Breakfast?' You: 'Yes. I'm staying.' He nods. 'Okay.' That's all. But it's everything.", nextScene: 'richard_20', addsFlags: ['stayed_breakfast'], energyCost: -5 }
          ],
          fallback: "The night is over. What do you do?",
          offensiveScene: 'richard_bad_2'
        },
        richard_20: {
          npcName: 'Narrador',
          npcText: "You survived Thanksgiving. You caused chaos. You drank too much. But you also protected Alex. You defended Claire. You confronted Arthur. And maybe — just maybe — you found your place at the table. Not above the salt. Not below. Just... at the table.",
          energyCost: 10,
          quickReplies: [
            { label: 'Finalizar.', text: "I'm still the black sheep. But maybe... that's not so bad." }
          ],
          intents: [
            { match: /(black sheep|not so bad|final)/i, response: "You are still the black sheep. But now you're the black sheep who saved the day. And that's enough. (Final Bom)", nextScene: 'richard_end_good' }
          ],
          fallback: "Enjoy the moment.",
          offensiveScene: 'richard_bad_2'
        },
        richard_end_good: {
          npcName: 'Narrador',
          npcText: "You didn't just survive Thanksgiving. You earned your place. Arthur respects you (a little). Claire loves you. Margaret trusts you. And Alex? You have a new nephew. The salt is just salt. The family is forever. (Final Bom)",
          isEnd: true,
          endingType: 'bom'
        },
        richard_bad_1: {
          npcName: 'Arthur',
          npcText: "Richard. You've been here for ten minutes and you've already insulted the doorman and the cook. Leave. Now. Before I call security.",
          isEnd: true,
          endingType: 'ruim'
        },
        richard_bad_2: {
          npcName: 'Arthur',
          npcText: "You've embarrassed this family for the last time. You're not the black sheep, Richard. You're the drunk uncle. And you're not welcome here anymore.",
          isEnd: true,
          endingType: 'ruim'
        }
      }
    }
  }
};
window.currentGameDataC1 = gameDataC1;