const gameDataB1 = {
  level: 'b1',
  title: 'Clínica da Madrugada',
  startScene: 'intro',
  initialState: { money: 80.00, energy: 70 },
  scenes: {
    intro: {
      npcName: 'Receptionist',
      npcText: "Good evening. How can I help you tonight? You look like you've seen a ghost, dude.",
      energyCost: 5,
      glossary: [{ word: "Receptionist", meaning: "Recepcionista" }, { word: "Tonight", meaning: "Hoje à noite" }],
      intents: [
        { id: 'sick', match: /(sick|help|hurt|pain|stomach|vomit|doctor|feel bad|headache|ache|lowkey dying)/i, response: "Oh no, I'm sorry to hear that. Can you describe your symptoms? What exactly is wrong?", nextScene: 'symptoms', explanation: '"Lowkey dying" é uma gíria B1 que significa "morrendo aos poucos/de forma silenciosa".' },
        { id: 'emergency', match: /(emergency|urgent|dying|ambulance)/i, response: "If it's a life-threatening emergency, call 911 immediately. Otherwise, I can check you in. What's the issue?", nextScene: 'symptoms' }
      ],
      fallback: "I'm sorry, I didn't catch that. Are you here to see a doctor? What seems to be the problem?",
      quickReplies: ["I am sick.", "I need help, please.", "I have a stomachache."]
    },
    symptoms: {
      npcName: 'Receptionist',
      npcText: "I see. When did the symptoms start?",
      energyCost: 5,
      glossary: [{ word: "Symptoms", meaning: "Sintomas" }, { word: "Start", meaning: "Começar" }],
      intents: [
        { id: 'time', match: /(since|started|hours|yesterday|morning|night|two days|3 hours|days|ago|today)/i, response: "Alright. Please fill out this form with your personal details. The doctor will see you shortly.", nextScene: 'waiting' }
      ],
      fallback: "Could you tell me specifically when you started feeling this way?",
      quickReplies: ["Since last night.", "A few hours ago.", "I started feeling sick yesterday."]
    },
    waiting: {
      npcName: 'Doctor',
      npcText: "Hello, I'm Dr. Smith. So, you've been vomiting since last night. Have you eaten anything unusual? Maybe some sketchy food?",
      energyCost: 5,
      glossary: [{ word: "Unusual", meaning: "Incomum / Estranho" }, { word: "Vomiting", meaning: "Vomitando" }, { word: "Sketchy", meaning: "Suspeito / Duvidoso" }],
      intents: [
        { id: 'food', match: /(seafood|shrimp|fish|burger|meat|bad food|restaurant|taco|pizza|ate|eat|food|anything|something)/i, response: "Ah, we see this a lot with that kind of food. We'll give you some medicine and a hydration IV. You'll be fine.", nextScene: 'bill', explanation: '"Sketchy" é uma gíria ótima para descrever lugares ou comidas duvidosas.' }
      ],
      fallback: "Try to remember. Did you eat at a restaurant or something you don't usually eat?",
      quickReplies: ["I ate seafood at a restaurant.", "Maybe it was the burger.", "I think it was bad fish."]
    },
    bill: {
      npcName: 'Doctor',
      npcText: "Okay, the nurse will take care of you now. Take it easy for the next 24 hours. The bill is $150.",
      energyCost: 0,
      isEnd: true,
      nextScene: 'broke'
    },
    broke: {
      npcName: 'Doctor',
      npcText: "Wait, your card was declined? You don't have the money? Well, we can't just let you leave without paying. What do you suggest?",
      energyCost: 10,
      glossary: [{ word: "Declined", meaning: "Recusado" }, { word: "Suggest", meaning: "Sugerir" }],
      intents: [
        { id: 'pay_later', match: /(pay|tomorrow|later|next week|installment|bank|credit card|card)/i, response: "I can't do that. Hospital policy. Cash only.", nextScene: 'end_broke' },
        { id: 'work', match: /(work|clean|wash|dishes|help)/i, response: "Actually, we do need someone to clean the waiting room. It's a deal.", nextScene: 'end_work' },
        { id: 'insurance', match: /(insurance|travel insurance|policy)/i, response: "Oh, travel insurance? Why didn't you say that first? Give me the details.", nextScene: 'end_insurance' }
      ],
      fallback: "I'm listening. How are you going to pay for this?",
      quickReplies: ["Can I pay tomorrow?", "I can work for it.", "I have travel insurance."]
    },
    end_broke: { npcName: 'Doctor', npcText: "Security will escort you out. Good luck.", isEnd: true, endingType: 'ruim' },
    end_work: { npcName: 'Doctor', npcText: "Get a mop. You start now.", isEnd: true, endingType: 'ok' },
    end_insurance: { npcName: 'Doctor', npcText: "Perfect. Fill out this insurance form and you're good to go.", isEnd: true, endingType: 'bom' }
  }
};