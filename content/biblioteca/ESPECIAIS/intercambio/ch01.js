window.VENTU_CHAPTER = {
  "meta": {
    "level": "ESPECIAL", "volume": "INTERCAMBIO", "chapter": 1,
    "title": "Welcome to Sydney", "subtitle": "Passando pela Imigração",
    "canDo": [
      "Eu consigo responder às perguntas do oficial de imigração sem gaguejar.",
      "Eu consigo falar sobre meus planos de estudo e onde vou ficar.",
      "Eu consigo usar frases formais para burocracia."
    ],
    "estimatedMinutes": 25, "xp": 200,
    "characters": ["Emma", "Officer"],
    "loreHook": "Emma chegou em Sydney para o intercâmbio, mas o oficial da imigração parece desconfiado do visto dela."
  },
  "warmup": {
    "recall": [],
    "hook": "Você desceu do avião na Austrália depois de 30 horas de voo. O oficial te olha de cara fechada e pergunta: 'What is the purpose of your visit?'. O que você responde?",
    "ptHelp": "A imigração não é hora de usar gírias ou fazer piadas. Aja de forma educada e direta."
  },
  "input": {
    "scene": "Guichê da Imigração (Austrália)",
    "tone": "Formal e intimidador",
    "lines": [
      { "speaker": "Officer", "en": "Good morning. Passport, please.", "ptHelp": "Bom dia. Passaporte, por favor.", "register": "formal" },
      { "speaker": "Emma", "en": "Good morning. Here you go.", "ptHelp": "Bom dia. Aqui está.", "register": "formal" },
      { "speaker": "Officer", "en": "What is the purpose of your visit? Study or tourism?", "ptHelp": "Qual o propósito da sua visita? Estudo ou turismo?", "register": "formal" },
      { "speaker": "Emma", "en": "Study. I have a student visa. I am going to study English for six months.", "ptHelp": "Estudo. Eu tenho um visto de estudante. Eu vou estudar inglês por seis meses.", "register": "formal" },
      { "speaker": "Officer", "en": "And where will you be staying? Do you have an address?", "ptHelp": "E onde você vai ficar? Você tem um endereço?", "register": "formal" },
      { "speaker": "Emma", "en": "Yes, I have a host family in Bondi. Here is the confirmation letter.", "ptHelp": "Sim, eu tenho uma host family em Bondi. Aqui está a carta de confirmação.", "register": "formal" }
    ],
    "listeningMission": "Ouça e anote quanto tempo Emma vai ficar na Austrália."
  },
  "vocab": [
    { "en": "Purpose", "ipa": "/ˈpɜːr.pəs/", "br": "PÂR-pâs", "ptHelp": "Propósito / Motivo", "register": "formal", "example": "What is the purpose of your visit?", "recycled": false },
    { "en": "Student visa", "ipa": "/ˈstuː.dənt ˈviː.zə/", "br": "STÚ-dânt VÍ-zâ", "ptHelp": "Visto de estudante", "register": "formal", "example": "I have a student visa.", "recycled": false },
    { "en": "Host family", "ipa": "/hoʊst ˈfæm.əl.i/", "br": "RÔUST FÉM-mi-li", "ptHelp": "Família anfitriã", "register": "formal", "example": "I will stay with a host family.", "recycled": false },
    { "en": "Confirmation letter", "ipa": "/ˌkɑːn.fɚˈmeɪ.ʃən ˈlet̬.ɚ/", "br": "kân-fâr-MÊI-chân LÉ-râr", "ptHelp": "Carta de confirmação", "register": "formal", "example": "Here is my confirmation letter.", "recycled": false },
    { "en": "Here you go", "ipa": "/hɪr ju ɡoʊ/", "br": "RÍR iú GÔU", "ptHelp": "Aqui está", "register": "neutral", "example": "Passport? Here you go.", "recycled": true }
  ],
  "grammar": {
    "rule": "Em situações formais, evite contrações (use 'I am' em vez de 'I'm') e responda na sequência exata que a pergunta foi feita.",
    "pattern": "I am going to... / I will be staying at...",
    "traps": [
      { "wrong": "I go to study.", "right": "I am going to study.", "why": "Para planos futuros, use 'going to'." },
      { "wrong": "I stay in a hotel.", "right": "I will be staying at a hotel.", "why": "O futuro contínuo ('will be staying') soa muito mais formal e correto para a imigração." }
    ]
  },
  "pronunciation": {
    "focus": "O sotaque Australiano (Aussie)",
    "mouthTip": "O som do 'A' na Austrália é fechado e longo (Sydney = SÍD-ni, mas 'mate' soa como 'máit'). O 'R' no final é quase sempre omitido.",
    "minimalPairs": [["Study", "Staddy"]]
  },
  "activities": [
    { "type": "fill", "prompt": "Complete as respostas formais para a imigração:", "items": ["What is the ___ of your visit? (purpose)", "I have a student ___. (visa)", "I will be ___ with a host family. (staying)"], "answerKey": ["purpose", "visa", "staying"], "feedbackPt": "Use as palavras exatas da pergunta." },
    { "type": "errorfix", "prompt": "Corrija as respostas informais demais para a imigração:", "items": ["I wanna study English.", "I'm crashing at a friend's place.", "I don't know where I'm staying."], "answerKey": ["I am going to study English.", "I will be staying at a friend's place.", "I have the address here."], "feedbackPt": "Nunca diga 'I don't know' para a imigração. Sempre tenha um papel com o endereço." }
  ],
  "roleplay": {
    "setup": "Você está no guichê da imigração na Austrália. O oficial é muito rigoroso e faz muitas perguntas.",
    "npcPersona": "Oficial da Australian Border Force, sério, formal e desconfiado.",
    "complications": [
      "O oficial pergunta 'Do you have a return ticket?'. Se você não tiver, ele vai falar que pode te deportar.",
      "Ele pergunta o nome da sua host family e você precisa lembrar (ou soletrar)."
    ],
    "successCriteria": [
      "Use linguagem formal (sem gírias).",
      "Responda 'What is the purpose of your visit?' de forma clara.",
      "Tenha as informações do endereço em mãos."
    ],
    "starterPrompt": "ROLE-PLAY: Australian Border Control (CEFR B1)\n\nYou are a strict Australian immigration officer. I am a student arriving in Sydney. My goal is to answer your questions about my visa, my host family, and my plans.\n\nRULES:\n1. Stay in character. Speak ONLY English at CEFR B1.\n2. Each turn: at most 2 sentences. End with ONE question.\n3. If I write in Portuguese, reply: \"In English, please.\"\n4. I must use formal language.\n5. Run exactly 8 turns.\n\nCOMPLICATIONS:\n- On turn 3, ask for my return ticket. If I say I don't have it, threaten deportation.\n- On turn 5, ask me to spell the name of my host family.\n\nSCORECARD:\n- Mission objectives: done / not done\n- 3 mistakes + corrections\n\nSTART NOW: speak first, in character."
  },
  "culturalPass": {
    "work": "Border Security: Australia's Front Line", "type": "series", "year": "2004",
    "whyA1": "É um reality show real sobre a imigração e alfândega australiana. Você vê exatamente como os oficiais falam e as perguntas que eles fazem.",
    "listeningMission": "Assista a 5 minutos de um episódio e anote 3 perguntas que o oficial faz aos viajantes."
  }
};