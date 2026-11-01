const gameDataC1 = {
  id: 'c1',
  title: 'Above the Salt',
  shopItems: [
    { id: 'wine', name: '🍷 Expensive Wine', price: 50.00, energy: 10, desc: 'Saves you from looking cheap. Gives you a boost of confidence.' },
    { id: 'mints', name: '🍬 Breath Mints', price: 5.00, energy: 5, desc: 'Essential before talking to the in-laws.' }
  ],
  characters: {
    alex: {
      charId: 'alex',
      name: 'Alex',
      role: 'The Immigrant',
      emoji: '🧑‍💼',
      description: 'You built your life from scratch. But at this dinner table, your "old money" father-in-law wants to see you bleed.',
      initialState: { money: 200.00, energy: 100 },
      startScene: 'alex_1',
      scenes: {
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
            { label: 'Agradecer o apoio.', text: "Thanks, Claire. I'll try not to spill wine on the carpet." },
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
            { match: /(sorry|clean|immediately|forgive)/i, response: "Margaret rushes to help you. Arthur sighs heavily. Richard bursts out laughing. 'Classic!'", nextScene: 'alex_end_part1', energyCost: 5 },
            { match: /(not only did i|ruin|mortified)/i, response: "Arthur stares at you. 'At least you know how to use an inversion,' he says dryly. Margaret hides a tiny smile.", nextScene: 'alex_end_part1', energyCost: 0 },
            { match: /(\.\.\.)/i, response: "The silence is deafening. Arthur rings a small bell. 'Maria, bring the cleaning supplies. And a new rug.' You feel your soul leaving your body.", nextScene: 'alex_end_part1', energyCost: 20 }
          ],
          fallback: "Everyone is staring at the wine on the carpet. Say something!",
          offensiveScene: 'alex_bad_2'
        },
        alex_end_part1: {
          npcName: 'Narrador',
          npcText: "The first act is over. You survived the greetings, the tests, and the wine disaster. But the dinner is just beginning. (End of Part 1 - Act 1)",
          isEnd: true,
          endingType: 'ok'
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
    }
  }
};
window.currentGameDataC1 = gameDataC1;