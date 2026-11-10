window.VENTU_CHAPTER = {
  "meta": {
    "level": "A2", "volume": 1, "chapter": 4,
    "title": "The Broken AC", "subtitle": "O quarto infernal",
    "canDo": [
      "Eu consigo usar verbos irregulares no passado (went, saw, had, was).",
      "Eu consigo fazer uma reclamação educada na recepção.",
      "Eu consigo pedir uma solução para um problema."
    ],
    "estimatedMinutes": 25, "xp": 150,
    "characters": ["Emma", "Lucas", "Manager"],
    "loreHook": "O gerente menciona que o 'hóspede VIP' da cobertura está causando problemas no hotel."
  },
  "warmup": {
    "recall": [
      { "q": "What did Emma order from room service?", "a": "She ordered food (and asked for extra sugar)." },
      { "q": "How long did it take to arrive?", "a": "About thirty minutes." }
    ],
    "hook": "O que você faz quando algo no seu quarto de hotel está quebrado e você não consegue dormir?",
    "ptHelp": "Você está no Porto Hotel, o dia foi longo, e o ar-condicionado do quarto 304 resolveu parar de funcionar às 23h."
  },
  "input": {
    "scene": "Na Recepção do Hotel",
    "tone": "Irritado (mas educado)",
    "lines": [
      { "speaker": "Emma", "en": "Excuse me. The AC in room 304 is broken.", "ptHelp": "Com licença. O ar-condicionado do quarto 304 está quebrado.", "register": "neutral" },
      { "speaker": "Lucas", "en": "We called an hour ago, and nobody came.", "ptHelp": "Nós ligamos há uma hora, e ninguém veio.", "register": "neutral" },
      { "speaker": "Manager", "en": "I am very sorry. I sent a technician, but he went to the wrong room.", "ptHelp": "Sinto muito. Eu mandei um técnico, mas ele foi para o quarto errado.", "register": "formal" },
      { "speaker": "Emma", "en": "It is very hot. We had a long flight and we didn't sleep.", "ptHelp": "Está muito quente. Nós tivemos um voo longo e não dormimos.", "register": "neutral" },
      { "speaker": "Manager", "en": "I understand. I saw a free room on the second floor. Do you want to move?", "ptHelp": "Eu entendo. Eu vi um quarto livre no segundo andar. Vocês querem se mudar?", "register": "formal" },
      { "speaker": "Lucas", "en": "Yes, please! And what about the VIP guest in the penthouse?", "ptHelp": "Sim, por favor! E o que tem o hóspede VIP na cobertura?", "register": "casual" }
    ],
    "listeningMission": "Ouça a conversa e anote para onde o técnico foi por engano."
  },
  "vocab": [
    { "en": "Broken", "ipa": "/ˈbroʊ.kən/", "br": "BRÔU-kân", "ptHelp": "Quebrado", "register": "neutral", "example": "The AC is broken.", "recycled": true },
    { "en": "Went (go)", "ipa": "/wɛnt/", "br": "UÉNT", "ptHelp": "Foi", "register": "neutral", "example": "He went to the wrong room.", "recycled": false },
    { "en": "Saw (see)", "ipa": "/sɔː/", "br": "SÓ", "ptHelp": "Viu", "register": "neutral", "example": "I saw a free room.", "recycled": false },
    { "en": "Had (have)", "ipa": "/hæd/", "br": "RÉD", "ptHelp": "Teve/Tiveram", "register": "neutral", "example": "We had a long flight.", "recycled": false },
    { "en": "Move", "ipa": "/muːv/", "br": "MÚV", "ptHelp": "Mudar (de lugar)", "register": "neutral", "example": "Do you want to move?", "recycled": false }
  ],
  "grammar": {
    "rule": "Muitos verbos no passado não terminam em -ed. Eles são irregulares. Ex: go -> went, see -> saw, have -> had, is -> was, send -> sent. Precisamos memorizá-los.",
    "pattern": "I went / I saw / I had / I was",
    "traps": [
      { "wrong": "I goed to the reception.", "right": "I went to the reception.", "why": "'Go' é irregular. O passado é 'went', nunca 'goed'." },
      { "wrong": "I didn't went to the room.", "right": "I didn't go to the room.", "why": "Depois de 'didn't', o verbo volta para a forma base (go), mesmo sendo irregular no passado afirmativo." }
    ]
  },
  "pronunciation": {
    "focus": "A pronúncia de 'Went' e 'Want'",
    "mouthTip": "'Went' tem som de 'e' curto (/wɛnt/). 'Want' tem som de 'ó' (/wɒnt/). Cuidado para não falar 'I want to the hotel' quando quer dizer 'I went to the hotel'.",
    "minimalPairs": [["Went", "Want"], ["Saw", "So"]]
  },
  "activities": [
    { "type": "fill", "prompt": "Complete com o passado irregular correto:", "items": ["I ___ (go) to the reception.", "He ___ (see) the manager.", "We ___ (have) a problem.", "She ___ (is) very tired."], "answerKey": ["went", "saw", "had", "was"], "feedbackPt": "Went, saw, had e was são irregulares. Memorize a forma deles." },
    { "type": "errorfix", "prompt": "Corrija os erros no passado:", "items": ["I goed to the room.", "She didn't saw the AC.", "We haved a long flight."], "answerKey": ["I went to the room.", "She didn't see the AC.", "We had a long flight."], "feedbackPt": "Lembre-se: 'didn't' puxa o verbo para a forma base." }
  ],
  "roleplay": {
    "setup": "Você está na recepção do Porto Hotel reclamando de um problema no quarto (ex: chuveiro quebrado, barulho).",
    "npcPersona": "O gerente do hotel, educado mas tentando minimizar o problema.",
    "complications": ["A IA diz que o hotel está lotado e não tem outro quarto disponível.", "A IA oferece um desconto na conta em vez de resolver o problema na hora."],
    "successCriteria": ["Use 3 verbos irregulares no passado (went, saw, had, was).", "Reclame de forma educada usando 'Excuse me' e 'I am sorry'.", "Peça uma solução clara."],
    "starterPrompt": "ROLE-PLAY: Hotel Complaint (CEFR A2)\n\nYou are the hotel manager at Porto Hotel. I am a guest with a problem in my room. My goal is to complain politely, explain what happened, and ask for a solution.\n\nRULES:\n1. Stay in character. Speak ONLY English at CEFR A2.\n2. Each turn: at most 3 sentences. End with ONE question.\n3. If I write in Portuguese, reply: \"In English, please.\"\n4. I must use Past Simple irregular verbs.\n5. Run exactly 8 turns.\n\nCOMPLICATIONS:\n- On turn 2, say the hotel is fully booked and there is no other room.\n- On turn 4, offer a free breakfast instead of fixing the problem.\n\nSCORECARD:\n- Mission objectives: done / not done\n- 3 mistakes + corrections\n\nSTART NOW: speak first, in character."
  },
  "culturalPass": {
    "work": "Fawlty Towers", "type": "series", "year": "1975",
    "whyA1": "Uma sitcom clássica britânica sobre um hotel horrível onde tudo dá errado. As confusões e reclamações são o coração da série.",
    "listeningMission": "Assista a uma cena de reclamação no hotel e anote qual foi o problema do hóspede."
  }
};