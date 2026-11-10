window.VENTU_CHAPTER = {
  "meta": {
    "level": "A2", "volume": 1, "chapter": 1,
    "title": "Checking In", "subtitle": "A chegada ao Porto Hotel",
    "canDo": [
      "Eu consigo fazer o check-in em um hotel.",
      "Eu consigo usar o Passado Simples de verbos regulares e do verbo 'to be'.",
      "Eu consigo pronunciar corretamente os verbos terminados em -ed."
    ],
    "estimatedMinutes": 25, "xp": 150,
    "characters": ["Emma", "Lucas", "Receptionist"],
    "loreHook": "Eles chegam ao Porto Hotel e o recepcionista menciona que o hotel está passando por reformas."
  },
  "warmup": {
    "recall": [
      { "q": "Where are Emma and Lucas from?", "a": "Emma is from England and Lucas is from Brazil." },
      { "q": "Why did they travel?", "a": "For a work trip." }
    ],
    "hook": "Você chegou de um voo de 10 horas. O que você fala primeiro na recepção do hotel?",
    "ptHelp": "Imagine a recepção do Porto Hotel. Você está exausto, com malas pesadas, e o recepcionista pergunta: 'Good evening, do you have a reservation?'."
  },
  "input": {
    "scene": "A Chegada de Emma e Lucas",
    "tone": "Formal e profissional",
    "lines": [
      { "speaker": "Receptionist", "en": "Good evening! Welcome to Porto Hotel. How can I help you?", "ptHelp": "Boa noite! Bem-vindos ao Porto Hotel. Como posso ajudar?", "register": "formal" },
      { "speaker": "Emma", "en": "Hi. We have a reservation. The name is Silva.", "ptHelp": "Oi. Nós temos uma reserva. O nome é Silva.", "register": "neutral" },
      { "speaker": "Receptionist", "en": "Let me check... Ah, yes. You booked a double room for three nights.", "ptHelp": "Deixe-me verificar... Ah, sim. Vocês reservaram um quarto de casal para três noites.", "register": "formal" },
      { "speaker": "Lucas", "en": "That's right. We arrived two hours ago and we are very tired.", "ptHelp": "Isso mesmo. Nós chegamos duas horas atrás e estamos muito cansados.", "register": "neutral" },
      { "speaker": "Receptionist", "en": "Here are your keys. Room 304, on the third floor. The elevator is on the left.", "ptHelp": "Aqui estão as chaves. Quarto 304, no terceiro andar. O elevador fica à esquerda.", "register": "formal" }
    ],
    "listeningMission": "Ouça o diálogo e anote em qual andar fica o quarto de Emma e Lucas."
  },
  "vocab": [
    { "en": "Reservation", "ipa": "/ˌrez.ɚˈveɪ.ʃən/", "br": "ré-zâr-VÊI-chân", "ptHelp": "Reserva", "register": "formal", "example": "I have a reservation.", "recycled": false },
    { "en": "Double room", "ipa": "/ˈdʌb.əl ruːm/", "br": "DÂ-bâl RÚM", "ptHelp": "Quarto de casal", "register": "neutral", "example": "A double room, please.", "recycled": false },
    { "en": "Arrived", "ipa": "/əˈraɪvd/", "br": "â-RÁIVD", "ptHelp": "Chegou/Chegaram", "register": "neutral", "example": "We arrived two hours ago.", "recycled": false },
    { "en": "Booked", "ipa": "/bʊkt/", "br": "BÚKT (som de T no final)", "ptHelp": "Reservou", "register": "neutral", "example": "You booked a room.", "recycled": false },
    { "en": "Third", "ipa": "/θɜːrd/", "br": "THÂRD (língua entre os dentes)", "ptHelp": "Terceiro", "register": "neutral", "example": "On the third floor.", "recycled": false }
  ],
  "grammar": {
    "rule": "Para verbos regulares no passado, adicionamos -ed (arrive -> arrived). Para o verbo 'to be', usamos 'was' (I, he, she, it) e 'were' (you, we, they).",
    "pattern": "I arrived / We booked / It was",
    "traps": [
      { "wrong": "I arrived in the hotel.", "right": "I arrived at the hotel.", "why": "Chegar a um lugar específico usa 'at' (arrive at). Chegar a uma cidade/país usa 'in' (arrive in)." },
      { "wrong": "We arrived two hours ago.", "right": "We arrived two hours ago.", "why": "'Ago' significa 'atrás' e sempre vem depois do tempo." }
    ]
  },
  "pronunciation": {
    "focus": "A pronúncia do -ED no passado",
    "mouthTip": "O -ed tem 3 sons: 1) /t/ (booked, checked - seco). 2) /d/ (arrived, traveled - vibrado). 3) /ɪd/ (started, wanted - som de 'id' extra). O erro comum do brasileiro é falar 'bookedi'.",
    "minimalPairs": [["Booked", "Booked (errado /bʊk.ɪd/)"], ["Arrived", "Arrive"]]
  },
  "activities": [
    { "type": "fill", "prompt": "Complete com o passado dos verbos entre parênteses:", "items": ["We ___ (book) a room.", "They ___ (arrive) at 10 PM.", "The hotel ___ (be) beautiful.", "I ___ (check) the website."], "answerKey": ["booked", "arrived", "was", "checked"], "feedbackPt": "Lembre-se da regra do -ed e do verbo to be (was/were)." },
    { "type": "order", "prompt": "Coloque a frase na ordem correta do passado:", "items": ["arrived / We / yesterday / .", "a / booked / She / single / room / .", "was / The / elevator / left / on / the / ."], "answerKey": ["We arrived yesterday.", "She booked a single room.", "The elevator was on the left."], "feedbackPt": "A estrutura é Sujeito + Verbo + Complemento." }
  ],
  "roleplay": {
    "setup": "Você acabou de chegar ao Porto Hotel depois de um voo longo. Você fez a reserva pelo site, mas o recepcionista não está achando o seu nome.",
    "npcPersona": "O recepcionista do Porto Hotel, educado mas um pouco confuso com o sistema.",
    "complications": [
      "O recepcionista não acha a sua reserva e pergunta se você tem o e-mail de confirmação.",
      "Ele fala que o sistema está lento e pede para você soletrar o seu nome."
    ],
    "successCriteria": [
      "Use o Passado Simples para dizer 'I booked...' e 'I arrived...'.",
      "Use 'I have a reservation'.",
      "Resolva o problema com calma."
    ],
    "starterPrompt": "ROLE-PLAY: Hotel Check-in (CEFR A2)\n\nYou are a receptionist at Porto Hotel. I am a tired guest. My goal is to check in, explain when I booked, and solve a reservation problem.\n\nRULES:\n1. Stay in character. Speak ONLY English at CEFR A2.\n2. Each turn: at most 2 sentences. End with ONE question.\n3. If I write in Portuguese, reply: \"In English, please.\"\n4. I must use Past Simple ('booked', 'arrived').\n5. Run exactly 8 turns.\n\nCOMPLICATIONS:\n- On turn 1, say you can't find my reservation.\n- On turn 3, say the system is slow and ask me to spell my name.\n\nSCORECARD:\n- Mission objectives: done / not done\n- 3 mistakes + corrections\n\nSTART NOW: speak first, in character."
  },
  "culturalPass": {
    "work": "The Grand Budapest Hotel", "type": "film", "year": "2014",
    "whyA1": "O filme inteiro se passa em um hotel e mostra todo o tipo de interação entre hóspedes e funcionários.",
    "listeningMission": "Assista à primeira cena no saguão do hotel e anote 3 palavras relacionadas a hotel que você ouvir."
  }
};