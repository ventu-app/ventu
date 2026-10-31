const gameDataA2 = {
  level: 'a2',
  title: 'Cafe Palace: O Despertar',
  characters: {
    emma: {
      charId: 'emma', name: 'Emma', role: 'Entregadora', emoji: '👩', subtitle: 'O Turno da Manhã', description: 'Café derramado, cliente excêntrica e uma crítica que pode mudar tudo.',
      initialState: { money: 25.00, energy: 80 },
      startScene: 'emma_a2_01',
      scenes: {
        emma_a2_01: { npcName: 'Mr. Silva (Manager)', npcText: "Morning, Emma. We are short-staffed. Take this coffee and croissant to apartment 42. The client is Chloe. She is... intense. Do not mess up.", glossary: [{ word: 'Short-staffed', meaning: 'Falta de funcionários' }, { word: 'Mess up', meaning: 'Estragar tudo' }], intents: [{ match: /(yes|ok|on it|going)/i, response: "Good. Go. The coffee is hot.", nextScene: 'emma_a2_02' }], fallback: "Go, Emma!", quickReplies: [{ label: 'Já vou!', text: 'Yes, on it!' }] },
        emma_a2_02: { npcName: 'Chloe (Cliente)', npcText: "You are late. I ordered this 15 minutes ago. I am writing a review about this place. Is this how you treat customers?", glossary: [{ word: 'Review', meaning: 'Avaliação' }, { word: 'Treat', meaning: 'Tratar' }], intents: [{ match: /(sorry|apologize|traffic|rain|new|mistake)/i, response: "Apologies don't make my coffee hotter. But fine. Give it here. Let me taste it.", nextScene: 'emma_a2_03', addsFlags: ['a2_emma_apologized'] }], fallback: "I am waiting.", offensiveScene: 'emma_a2_bad', quickReplies: [{ label: 'Mil desculpas.', text: 'I am so sorry.' }] },
        emma_a2_03: { npcName: 'Chloe', npcText: "(She takes a sip). It's actually not bad. Tell the manager I said that. But tell him the delivery girl needs to be faster. I will write a good review.", isEnd: true, endingType: 'bom', addFlags: ['a2_emma_completed'] },
        emma_a2_bad: { npcName: 'Narrador', npcText: "Chloe writes a terrible review. The Cafe Palace goes viral for the wrong reasons. Silva fires you.", isEnd: true, endingType: 'ruim' }
      }
    },
    silva: {
      charId: 'silva', name: 'Mr. Silva', role: 'Gerente', emoji: '👨‍💼', subtitle: 'O Abre Alas', description: 'A máquina quebrou, o café esfriou e a crítica chegou.',
      initialState: { money: 450.00, energy: 70 },
      startScene: 'silva_a2_01',
      scenes: {
        silva_a2_01: { npcName: 'Sistema', npcText: "8 AM. The espresso machine is broken. Chloe, a famous food blogger, is sitting at table 4. She is waiting for her order.", glossary: [{ word: 'Espresso', meaning: 'Café expresso' }, { word: 'Broken', meaning: 'Quebrada' }], intents: [{ match: /(fix|check|repair|coffee|make)/i, response: "You manage to make a pour-over coffee. It's slow, but it works.", nextScene: 'silva_a2_02' }], fallback: "What will you do?", quickReplies: [{ label: 'Vou tentar fazer o café.', text: 'I will try to make the coffee.' }] },
        silva_a2_02: { npcName: 'Chloe', npcText: "Manager. This coffee is surprisingly good. But the machine noise was terrible. I am giving you 4 stars. Fix the machine before I come back.", isEnd: true, endingType: 'ok', addFlags: ['a2_silva_completed'] }
      }
    },
    lucas: {
      charId: 'lucas', name: 'Lucas', role: 'Cliente', emoji: '🧑', subtitle: 'O Despertar', description: 'Ele acordou atrasado, mas pelo menos o café da manhã tem que ser bom.',
      initialState: { money: 15.00, energy: 60 },
      startScene: 'lucas_a2_01',
      scenes: {
        lucas_a2_01: { npcName: 'Lucas (Você)', npcText: "I need coffee. My head is killing me from studying. I go to the Cafe Palace.", glossary: [{ word: 'Killing me', meaning: 'Me matando' }, { word: 'Studying', meaning: 'Estudando' }], intents: [{ match: /(go|order|coffee|eat|sit)/i, response: "You sit at the counter. A woman next to you is typing furiously on a laptop. It's Chloe.", nextScene: 'lucas_a2_02' }], fallback: "Go inside.", quickReplies: [{ label: 'Vou entrar e pedir um café.', text: 'I will go in and order a coffee.' }] },
        lucas_a2_02: { npcName: 'Chloe', npcText: "You look terrible. Rough night? I am Chloe. I review cafes. This place is okay, but the service is weird. What do you think?", glossary: [{ word: 'Rough night', meaning: 'Noite difícil' }, { word: 'Weird', meaning: 'Estranho' }], intents: [{ match: /(agree|yeah|funny|good|bad|davi|burger|yesterday|imagine|idea|chaos|night|terrible|crazy)/i, response: "You tell her about the Burger Palace chaos. She laughs. 'That place sounds like a disaster. But you survived. Here, coffee is on me.'", nextScene: 'lucas_a2_03', addsFlags: ['a2_lucas_met_chloe'] }], fallback: "Chloe raises an eyebrow. 'Cat got your tongue? Go on, tell me what happened.'", quickReplies: [{ label: 'Você não faz ideia do meu ontem.', text: 'You have no idea about yesterday.' }] },
        lucas_a2_03: { npcName: 'Narrador', npcText: "Chloe pays for your coffee. You feel a little better. Your phone rings. It's Davi. He wants to talk.", isEnd: true, endingType: 'bom', addFlags: ['a2_lucas_completed'] }
      }
    }
  }
};
window.currentGameDataA2 = gameDataA2;