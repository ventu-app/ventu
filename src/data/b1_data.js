const gameData = {
  level: 'b1',
  title: 'Clínica da Madrugada',
  startScene: 'intro',
  initialState: { money: 80.00, energy: 70 },
  scenes: {
    intro: {
      npcName: 'Receptionist',
      npcText: "Good evening. How can I help you tonight?",
      glossary: [
        { word: "Receptionist", meaning: "Recepcionista" },
        { word: "Tonight", meaning: "Hoje à noite" }
      ],
      intents: [
        {
          id: 'sick',
          match: /(sick|help|hurt|pain|stomach|vomit|doctor|feel bad|headache|ache)/i,
          response: "Oh no, I'm sorry to hear that. Can you describe your symptoms? What exactly is wrong?",
          nextScene: 'symptoms'
        },
        {
          id: 'emergency',
          match: /(emergency|urgent|dying|ambulance)/i,
          response: "If it's a life-threatening emergency, call 911 immediately. Otherwise, I can check you in. What's the issue?",
          nextScene: 'symptoms'
        }
      ],
      fallback: "I'm sorry, I didn't catch that. Are you here to see a doctor? What seems to be the problem?",
      quickReplies: ["I am sick.", "I need help, please.", "I have a stomachache."]
    },
    symptoms: {
      npcName: 'Receptionist',
      npcText: "I see. When did the symptoms start?",
      glossary: [
        { word: "Symptoms", meaning: "Sintomas" },
        { word: "Start", meaning: "Começar" }
      ],
      intents: [
        {
          id: 'time',
          match: /(since|started|hours|yesterday|morning|night|two days|3 hours|days|ago|today)/i,
          response: "Alright. Please fill out this form with your personal details. The doctor will see you shortly.",
          nextScene: 'waiting'
        }
      ],
      fallback: "Could you tell me specifically when you started feeling this way?",
      quickReplies: ["Since last night.", "A few hours ago.", "I started feeling sick yesterday."]
    },
    waiting: {
      npcName: 'Doctor',
      npcText: "Hello, I'm Dr. Smith. So, you've been vomiting since last night. Have you eaten anything unusual?",
      glossary: [
        { word: "Unusual", meaning: "Incomum / Estranho" },
        { word: "Vomiting", meaning: "Vomitando" }
      ],
      intents: [
        {
          id: 'food',
          // Regex MUITO mais abrangente. Se falar de qualquer comida, o jogo aceita.
          match: /(seafood|shrimp|fish|burger|meat|bad food|restaurant|taco|pizza|ate|eat|food|anything|something)/i,
          response: "Ah, we see this a lot with that kind of food. We'll give you some medicine and a hydration IV. You'll be fine.",
          nextScene: 'end'
        }
      ],
      fallback: "Try to remember. Did you eat at a restaurant or something you don't usually eat?",
      quickReplies: ["I ate seafood at a restaurant.", "Maybe it was the burger.", "I think it was bad fish."]
    },
    end: {
      npcName: 'Doctor',
      npcText: "Okay, the nurse will take care of you now. Take it easy for the next 24 hours. That will be $150.",
      isEnd: true
    }
  }
};