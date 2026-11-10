window.VENTU_CHAPTER = {
  "meta": {
    "level": "A2", "volume": 1, "chapter": 3,
    "title": "Room Service", "subtitle": "Comida no quarto",
    "canDo": [
      "Eu consigo pedir comida pelo telefone usando 'I would like'.",
      "Eu consigo perguntar quanto tempo vai demorar ('How long').",
      "Eu consigo entender termos de menu e pagamento."
    ],
    "estimatedMinutes": 25, "xp": 150,
    "characters": ["Emma", "Lucas", "Operator"],
    "loreHook": "Lucas comenta que o telefone do quarto parece dos anos 80 e a recepção é esquisita."
  },
  "warmup": {
    "recall": [
      { "q": "Did Lucas find his bag?", "a": "No, he didn't." },
      { "q": "What did they need to fill out?", "a": "A form." }
    ],
    "hook": "Você está muito cansado para sair para jantar. Como você pede comida no hotel?",
    "ptHelp": "O quarto está silencioso, você está de pijama e com fome. Você liga para a recepção e pede o cardápio."
  },
  "input": {
    "scene": "Ligando para o Room Service",
    "tone": "Cansado e educado",
    "lines": [
      { "speaker": "Operator", "en": "Room service, good evening. How can I help?", "ptHelp": "Serviço de quarto, boa noite. Como posso ajudar?", "register": "formal" },
      { "speaker": "Emma", "en": "Hi, I would like to order some food, please.", "ptHelp": "Oi, eu gostaria de pedir um pouco de comida, por favor.", "register": "formal" },
      { "speaker": "Operator", "en": "Of course. Would you like to see the menu?", "ptHelp": "Claro. Você gostaria de ver o cardápio?", "register": "formal" },
      { "speaker": "Emma", "en": "Yes, please. And how long will it take to arrive?", "ptHelp": "Sim, por favor. E quanto tempo vai levar para chegar?", "register": "neutral" },
      { "speaker": "Operator", "en": "It takes about thirty minutes. We charge it to your room.", "ptHelp": "Leva cerca de trinta minutos. Nós cobramos no seu quarto.", "register": "formal" },
      { "speaker": "Lucas", "en": "Perfect. We are in room 304. And please bring extra sugar.", "ptHelp": "Perfeito. Nós estamos no quarto 304. E por favor traga açúcar extra.", "register": "casual" }
    ],
    "listeningMission": "Ouça o diálogo e anote quanto tempo a comida vai levar para chegar."
  },
  "vocab": [
    { "en": "Would like", "ipa": "/wʊd laɪk/", "br": "UÚD LÁIK", "ptHelp": "Gostaria", "register": "formal", "example": "I would like a sandwich.", "recycled": false },
    { "en": "Take (time)", "ipa": "/teɪk/", "br": "TÊIK", "ptHelp": "Levar (tempo)", "register": "neutral", "example": "It takes 30 minutes.", "recycled": true },
    { "en": "Charge", "ipa": "/tʃɑːrdʒ/", "br": "CHÁRDJ", "ptHelp": "Cobrar", "register": "formal", "example": "We charge it to your room.", "recycled": false },
    { "en": "Menu", "ipa": "/ˈmen.juː/", "br": "MÉN-iú", "ptHelp": "Cardápio", "register": "neutral", "example": "The menu, please.", "recycled": false },
    { "en": "Extra", "ipa": "/ˈek.strə/", "br": "ÉKS-trâ", "ptHelp": "Extra / Adicional", "register": "neutral", "example": "Extra sugar.", "recycled": false }
  ],
  "grammar": {
    "rule": "'Would like' é a forma educada de dizer 'want'. Para perguntar, invertemos: 'Would you like...?'. Para perguntar o tempo de espera, usamos 'How long does it take?'.",
    "pattern": "I would like... / Would you like...? / How long does it take?",
    "traps": [
      { "wrong": "I want to make an order.", "right": "I would like to order.", "why": "'Make an order' é muito formal e pouco usado na fala." },
      { "wrong": "How much time it takes?", "right": "How long does it take?", "why": "Usamos 'How long' para duração e o auxiliar 'does' para perguntas." }
    ]
  },
  "pronunciation": {
    "focus": "A redução de 'Would you'",
    "mouthTip": "Na fala natural, 'Would you' soa como 'Wud-ja' (/wʊdʒə/). 'Would you like' vira 'Wud-ja laik'. Não fale 'UÚD IÚ' separado.",
    "minimalPairs": [["Would you", "Wood"], ["Charge", "Sharj"]]
  },
  "activities": [
    { "type": "fill", "prompt": "Complete com 'would like' ou 'want':", "items": ["I ___ a pizza, please. (Formal)", "Do you ___ a coffee? (Informal)", "___ you like some water? (Pergunta)"], "answerKey": ["would like", "want", "Would"], "feedbackPt": "'Would like' é sempre mais educado que 'want'." },
    { "type": "order", "prompt": "Ordene a conversa de room service:", "items": ["order / would / I / to / like / .", "it / How / take / long / will / ?", "to / charge / room / my / it / ."], "answerKey": ["I would like to order.", "How long will it take?", "Charge it to my room."], "feedbackPt": "Lembre-se: 'How long' pergunta tempo, 'How much' pergunta preço." }
  ],
  "roleplay": {
    "setup": "Você está hospedado no quarto 502 e decide pedir o jantar. Você liga para o room service.",
    "npcPersona": "O atendente do room service, que vai anotar seu pedido e avisar o tempo de espera.",
    "complications": ["A IA diz que o prato que você quer acabou e oferece algo parecido.", "A IA 'não entende' o número do seu quarto na primeira vez e pede para repetir."],
    "successCriteria": ["Use 'I would like' para fazer o pedido.", "Use 'How long does it take?'.", "Resolva a complicação da comida que acabou."],
    "starterPrompt": "ROLE-PLAY: Room Service (CEFR A2)\n\nYou are a room service attendant at Porto Hotel. I am a guest in room 502. My goal is to order food, ask for the time, and confirm the room number.\n\nRULES:\n1. Stay in character. Speak ONLY English at CEFR A2.\n2. Each turn: at most 2 sentences. End with ONE question.\n3. If I write in Portuguese, reply: \"In English, please.\"\n4. I must use 'I would like' and 'How long'.\n5. Run exactly 8 turns.\n\nCOMPLICATIONS:\n- On turn 2, say the dish I want is out of stock. Offer an alternative.\n- On turn 4, pretend you didn't hear the room number.\n\nSCORECARD:\n- Mission objectives: done / not done\n- 3 mistakes + corrections\n\nSTART NOW: speak first, in character."
  },
  "culturalPass": {
    "work": "Home Alone 2: Lost in New York", "type": "film", "year": "1992",
    "whyA1": "O protagonista se hospeda no Hotel Plaza e pede um enorme room service. As cenas de pedido e entrega são hilárias.",
    "listeningMission": "Assista à cena em que o Kevin liga para o room service e anote o que ele pede."
  }
};