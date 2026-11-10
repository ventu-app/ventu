window.VENTU_CHAPTER = {
  "meta": {
    "level": "A1", "volume": 1, "chapter": 3,
    "title": "This or That?", "subtitle": "Apontando e escolhendo",
    "canDo": [
      "Eu consigo apontar para coisas perto (this) e longe (that).",
      "Eu consigo perguntar o preço de algo.",
      "Eu consigo comprar um item simples."
    ],
    "estimatedMinutes": 20, "xp": 100,
    "characters": ["Emma", "Lucas"],
    "loreHook": "Emma compra um cartão postal para mandar para a família antes da viagem."
  },
  "warmup": {
    "recall": [
      { "q": "What time is the meeting?", "a": "It is at ten fifteen." },
      { "q": "How do you spell 30?", "a": "Thirty." }
    ],
    "hook": "Como você pede para ver uma camisa na vitrine de uma loja em inglês?",
    "ptHelp": "Você está numa loja de suvenires e vê um boneco bonito na vitrine. Você quer comprar, mas está longe de você."
  },
  "input": {
    "scene": "Comprando um Suvenir",
    "tone": "Amigável",
    "lines": [
      { "speaker": "Emma", "en": "Excuse me, how much is this?", "ptHelp": "Com licença, quanto custa isso? (perto)", "register": "neutral" },
      { "speaker": "Clerk", "en": "This is ten dollars.", "ptHelp": "Isso aqui (perto) é dez dólares.", "register": "neutral" },
      { "speaker": "Emma", "en": "And how much is that?", "ptHelp": "E quanto custa aquilo? (longe)", "register": "neutral" },
      { "speaker": "Clerk", "en": "That is fifteen dollars.", "ptHelp": "Aquilo lá é quinze dólares.", "register": "neutral" },
      { "speaker": "Emma", "en": "I want this postcard, please. Here is twenty.", "ptHelp": "Eu quero este cartão postal, por favor. Aqui está vinte.", "register": "casual" }
    ],
    "listeningMission": "Ouça e anote o preço do cartão postal que Emma comprou."
  },
  "vocab": [
    { "en": "This", "ipa": "/ðɪs/", "br": "DÍS (vibra o 'Z')", "ptHelp": "Isto / Este (perto)", "register": "neutral", "example": "This is my pen.", "recycled": false },
    { "en": "That", "ipa": "/ðæt/", "br": "DÉT", "ptHelp": "Aquilo / Aquele (longe)", "register": "neutral", "example": "That is my car.", "recycled": false },
    { "en": "How much", "ipa": "/haʊ mʌtʃ/", "br": "RÁU MÂTCH", "ptHelp": "Quanto custa", "register": "neutral", "example": "How much is this?", "recycled": false },
    { "en": "Postcard", "ipa": "/ˈpoʊst.kɑːrd/", "br": "PÔUST-KÁRD", "ptHelp": "Cartão postal", "register": "neutral", "example": "I want this postcard.", "recycled": false },
    { "en": "Twenty", "ipa": "/ˈtwen.t̬i/", "br": "TUÉN-ri", "ptHelp": "Vinte", "register": "neutral", "example": "Here is twenty.", "recycled": true }
  ],
  "grammar": {
    "rule": "Use 'This' (isto) para algo que está perto de você. Use 'That' (aquilo) para algo que está longe. Use 'These' (estes) e 'Those' (aqueles) no plural.",
    "pattern": "This is... / That is... / How much is this?",
    "traps": [
      { "wrong": "How much is it costs?", "right": "How much does it cost? / How much is it?", "why": "Não misture 'is' com 'costs'." },
      { "wrong": "I want to buy this.", "right": "I want to buy this one.", "why": "Geralmente usamos 'one' no final para não repetir o substantivo." }
    ]
  },
  "pronunciation": {
    "focus": "O TH sonoro (This/That)",
    "mouthTip": "Aqui o 'TH' é vibrado (sonoro). A língua fica entre os dentes e você faz o som de 'Z' com a garganta vibrando. Não é 'Dis' (com D) nem 'Zis'. O 'H' em 'How' tem um sopro leve.",
    "minimalPairs": [["This", "Dis (errado)"], ["That", "Hat"]]
  },
  "activities": [
    { "type": "fill", "prompt": "Complete com 'this' ou 'that':", "items": ["___ book in my hands is good. (perto)", "Look at ___ bird in the sky! (longe)", "How much is ___ shirt (you are touching it)?", "___ cars far away are expensive."], "answerKey": ["This", "that", "this", "Those"], "feedbackPt": "Se você pode tocar, é 'this'. Se está longe, é 'that'." },
    { "type": "order", "prompt": "Coloque na ordem correta:", "items": ["much / How / is / this / ?", "want / I / one / that / .", "is / Here / ten / dollars / ."], "answerKey": ["How much is this?", "I want that one.", "Here is ten dollars."], "feedbackPt": "Lembre-se que 'How much' vem sempre no início." }
  ],
  "roleplay": {
    "setup": "Você está numa loja em Londres comprando presentes. Você vê coisas na vitrine e coisas no balcão.",
    "npcPersona": "O vendedor da loja, muito prestativo.",
    "complications": ["A IA não tem troco para a sua nota de 50.", "O item que você quer está em falta e ela oferece outro."],
    "successCriteria": ["Perguntar preços", "Usar 'this' e 'that'", "Usar 'I want this one'"],
    "starterPrompt": "ROLE-PLAY: Souvenir Shop (CEFR A1)\n\nYou are a shop clerk in London. I am a tourist. My goal is to ask the price of items near and far, choose one, and pay.\n\nRULES:\n1. Stay in character. Speak ONLY English at CEFR A1.\n2. Each turn: at most 2 sentences. End with ONE question.\n3. If I write in Portuguese, reply: \"In English, please.\"\n4. I must use 'this', 'that', and 'how much'.\n5. Run exactly 6 turns.\n\nCOMPLICATIONS:\n- On turn 3, say you don't have change for a 50-dollar bill.\n- On turn 5, say the item is out of stock and offer a different color.\n\nSCORECARD:\n- Mission objectives: done / not done\n- 3 mistakes + corrections\n\nSTART NOW: speak first, in character."
  },
  "culturalPass": {
    "work": "Friends", "type": "series", "year": "1994",
    "whyA1": "A série tem uma cafeteria como ponto central. As cenas de pedir café e comprar coisas são muito comuns.",
    "listeningMission": "Assista a uma cena na cafeteria e anote como os personagens pedem suas bebidas."
  }
};