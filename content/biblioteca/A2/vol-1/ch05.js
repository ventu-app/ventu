window.VENTU_CHAPTER = {
  "meta": {
    "level": "A2", "volume": 1, "chapter": 5,
    "title": "Where to Eat?", "subtitle": "A melhor comida da cidade",
    "canDo": [
      "Eu consigo comparar coisas usando 'cheaper', 'more expensive', 'better'.",
      "Eu consigo dar conselhos usando 'should'.",
      "Eu consigo pedir recomendações para um local."
    ],
    "estimatedMinutes": 25, "xp": 150,
    "characters": ["Emma", "Lucas", "Local"],
    "loreHook": "O local recomenda um restaurante onde o 'hóspede VIP' do hotel sempre vai."
  },
  "warmup": {
    "recall": [
      { "q": "What was the problem with the room?", "a": "The AC was broken." },
      { "q": "Did they move to another room?", "a": "Yes, they did." }
    ],
    "hook": "Você está em uma cidade nova e quer comer algo típico. Você confia no restaurante do hotel ou pergunta para um morador?",
    "ptHelp": "Você está na rua em Portugal e vê dois restaurantes: um chique e caro, e outro simples e cheio de locais. Qual você escolhe?"
  },
  "input": {
    "scene": "Na Rua, Pedindo Dica",
    "tone": "Amigável e curioso",
    "lines": [
      { "speaker": "Lucas", "en": "Excuse me, where should we eat around here?", "ptHelp": "Com licença, onde nós deveríamos comer por aqui?", "register": "casual" },
      { "speaker": "Local", "en": "The hotel restaurant is expensive. You should try the street food.", "ptHelp": "O restaurante do hotel é caro. Vocês deveriam provar a comida de rua.", "register": "casual" },
      { "speaker": "Emma", "en": "Is it cheaper?", "ptHelp": "É mais barato?", "register": "neutral" },
      { "speaker": "Local", "en": "Yes, much cheaper. And it is better than the hotel food!", "ptHelp": "Sim, muito mais barato. E é melhor que a comida do hotel!", "register": "casual" },
      { "speaker": "Lucas", "en": "But is it safe? We shouldn't get sick on our first night.", "ptHelp": "Mas é seguro? Nós não deveríamos ficar doentes na nossa primeira noite.", "register": "neutral" },
      { "speaker": "Local", "en": "Don't worry. Go to the 'Velho' restaurant. Even the VIP guest from your hotel goes there!", "ptHelp": "Não se preocupe. Vá ao restaurante 'Velho'. Até o hóspede VIP do seu hotel vai lá!", "register": "casual" }
    ],
    "listeningMission": "Ouça e anote por que o Lucas está com medo de comer na rua."
  },
  "vocab": [
    { "en": "Cheaper", "ipa": "/ˈtʃiː.pɚ/", "br": "CHÍ-pâr", "ptHelp": "Mais barato", "register": "neutral", "example": "It is cheaper.", "recycled": false },
    { "en": "More expensive", "ipa": "/mɔːr ɪkˈspen.sɪv/", "br": "MÓR iks-PÉN-siv", "ptHelp": "Mais caro", "register": "neutral", "example": "The hotel is more expensive.", "recycled": false },
    { "en": "Better", "ipa": "/ˈbet̬.ɚ/", "br": "BÉ-râr", "ptHelp": "Melhor", "register": "neutral", "example": "It is better than the hotel.", "recycled": false },
    { "en": "Should", "ipa": "/ʃʊd/", "br": "CHÚD", "ptHelp": "Deveria", "register": "neutral", "example": "You should try the food.", "recycled": false },
    { "en": "Safe", "ipa": "/seɪf/", "br": "SÊIF", "ptHelp": "Seguro", "register": "neutral", "example": "Is it safe?", "recycled": false }
  ],
  "grammar": {
    "rule": "Para comparar, adicionamos -er a adjetivos curtos (cheap -> cheaper, safe -> safer). Para adjetivos longos, usamos 'more' (expensive -> more expensive). O verbo 'should' significa 'deveria' e é usado para dar conselhos.",
    "pattern": "cheaper than / more expensive than / You should...",
    "traps": [
      { "wrong": "It is more cheaper.", "right": "It is cheaper.", "why": "Não use 'more' com adjetivos que já terminam em -er." },
      { "wrong": "You should to try the food.", "right": "You should try the food.", "why": "Depois de 'should', o verbo fica na forma base, sem 'to'." }
    ]
  },
  "pronunciation": {
    "focus": "O som do 'Should'",
    "mouthTip": "O 'Should' tem o 'L' mudo. Ele soa como 'Chud' (/ʃʊd/). Não fale 'shouldi' nem 'shold'. O 'Ch' é o mesmo som de 'shoe'.",
    "minimalPairs": [["Should", "Shoe"], ["Cheaper", "Chi (mais)"], ["Better", "Bitter"]]
  },
  "activities": [
    { "type": "fill", "prompt": "Complete com o comparativo correto:", "items": ["The street food is ___ (cheap) than the hotel.", "The hotel is ___ (expensive) than the street food.", "The food here is ___ (good) than in my country."], "answerKey": ["cheaper", "more expensive", "better"], "feedbackPt": "Lembre-se: cheaper (curto) e more expensive (longo). Good é irregular (better)." },
    { "type": "order", "prompt": "Ordene o conselho:", "items": ["should / You / the / try / food / street / .", "We / go / should / there / not / .", "is / It / than / better / hotel / the / ."], "answerKey": ["You should try the street food.", "We should not go there.", "It is better than the hotel."], "feedbackPt": "Should + verbo base (sem 'to')." }
  ],
  "roleplay": {
    "setup": "Você está em Lisboa e quer comer um pastel de nata. Você pede dicas a um morador local, mas ele parece indeciso.",
    "npcPersona": "Um morador local amigável, mas que fica em dúvida entre duas opções.",
    "complications": ["A IA recomenda dois lugares e você precisa perguntar qual é o melhor.", "A IA fala que o lugar mais famoso está fechado hoje."],
    "successCriteria": ["Use comparativos (cheaper, better, more expensive).", "Peça uma recomendação usando 'should'.", "Tome uma decisão final."],
    "starterPrompt": "ROLE-PLAY: Food Recommendation (CEFR A2)\n\nYou are a friendly local in Lisbon. I am a tourist looking for the best pastel de nata. My goal is to ask for recommendations, compare the options, and decide where to go.\n\nRULES:\n1. Stay in character. Speak ONLY English at CEFR A2.\n2. Each turn: at most 2 sentences. End with ONE question.\n3. If I write in Portuguese, reply: \"In English, please.\"\n4. I must use comparatives and 'should'.\n5. Run exactly 8 turns.\n\nCOMPLICATIONS:\n- On turn 2, suggest two places but say you can't decide which one is better.\n- On turn 4, say the most famous place is closed today.\n\nSCORECARD:\n- Mission objectives: done / not done\n- 3 mistakes + corrections\n\nSTART NOW: speak first, in character."
  },
  "culturalPass": {
    "work": "Ugly Delicious", "type": "series", "year": "2018",
    "whyA1": "O chef David Chang viaja pelo mundo comendo comida de rua e restaurantes locais. Ele compara sabores e culturas.",
    "listeningMission": "Assista a um episódio e anote 3 adjetivos que ele usa para descrever a comida."
  }
};