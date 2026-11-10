window.VENTU_CHAPTER = {
  "meta": {
    "level": "A1", "volume": 1, "chapter": 5,
    "title": "Where Are You From?", "subtitle": "De onde você vem?",
    "canDo": [
      "Eu consigo falar de qual país eu sou.",
      "Eu consigo perguntar a nacionalidade de alguém.",
      "Eu consigo usar o verbo 'to be' na forma negativa."
    ],
    "estimatedMinutes": 20, "xp": 100,
    "characters": ["Emma", "Lucas"],
    "loreHook": "Emma e Lucas recebem uma ligação misteriosa: 'O Porto Hotel precisa de vocês. Venham para Portugal.'"
  },
  "warmup": {
    "recall": [
      { "q": "What is your sister's name?", "a": "Her name is Sarah." },
      { "q": "Is your father a doctor?", "a": "No, he is not." }
    ],
    "hook": "Qual é a primeira coisa que as pessoas perguntam quando você fala que tem sotaque?",
    "ptHelp": "Imagine que você está em uma conferência internacional. Você conhece pessoas da França, do Japão e do Canadá."
  },
  "input": {
    "scene": "A Conferência Internacional",
    "tone": "Empolgado e surpreso",
    "lines": [
      { "speaker": "Emma", "en": "Hi! Are you from Canada?", "ptHelp": "Oi! Você é do Canadá?", "register": "casual" },
      { "speaker": "Lucas", "en": "No, I am not. I am from Brazil.", "ptHelp": "Não, eu não sou. Eu sou do Brasil.", "register": "casual" },
      { "speaker": "Emma", "en": "Oh, Brazil! Where are you from in Brazil?", "ptHelp": "Ah, Brasil! De onde você é no Brasil?", "register": "casual" },
      { "speaker": "Lucas", "en": "I am from Rio de Janeiro. And you?", "ptHelp": "Eu sou do Rio de Janeiro. E você?", "register": "casual" },
      { "speaker": "Emma", "en": "I am from England. Oh, I have a message! 'Porto Hotel needs you'.", "ptHelp": "Eu sou da Inglaterra. Ah, tenho uma mensagem! 'O Porto Hotel precisa de vocês'.", "register": "surpreso" }
    ],
    "listeningMission": "Ouça o diálogo e anote a mensagem misteriosa que Emma recebe."
  },
  "vocab": [
    { "en": "Where", "ipa": "/wer/", "br": "UÉR", "ptHelp": "Onde / De onde", "register": "neutral", "example": "Where are you from?", "recycled": true },
    { "en": "From", "ipa": "/frʌm/", "br": "FRÂM", "ptHelp": "De (origem)", "register": "neutral", "example": "I am from Brazil.", "recycled": true },
    { "en": "Brazil", "ipa": "/brəˈzɪl/", "br": "brâ-ZÍL", "ptHelp": "Brasil", "register": "neutral", "example": "I am from Brazil.", "recycled": false },
    { "en": "England", "ipa": "/ˈɪŋ.ɡlənd/", "br": "ÍN-glând", "ptHelp": "Inglaterra", "register": "neutral", "example": "She is from England.", "recycled": false },
    { "en": "Message", "ipa": "/ˈmes.ɪdʒ/", "br": "MÉ-sedj", "ptHelp": "Mensagem", "register": "neutral", "example": "I have a message.", "recycled": false }
  ],
  "grammar": {
    "rule": "Para perguntar, invertemos o verbo: 'Are you...?' Para negar, adicionamos 'not': 'I am not' (Eu não sou). Na fala, vira 'I'm not' e 'You aren't'.",
    "pattern": "Are you...? / I am not. / Where are you from?",
    "traps": [
      { "wrong": "I am not from Brazil, I am from Portuguese.", "right": "I am not from Brazil, I am from Portugal.", "why": "Cuidado com o falso cognato. O país é Portugal. A língua é Portuguese." },
      { "wrong": "Where you are from?", "right": "Where are you from?", "why": "Nas perguntas, o verbo 'to be' vem ANTES do sujeito." }
    ]
  },
  "pronunciation": {
    "focus": "Redução de 'Are you' e 'From'",
    "mouthTip": "Na fala rápida, 'Are you' vira 'Ar-ya' (/ˈɑːr.jə/). E a palavra 'From' tem o som de 'â' (/frʌm/), não fale 'fromi' nem 'from' com som de 'o' aberto.",
    "minimalPairs": [["From", "Form"]]
  },
  "activities": [
    { "type": "fill", "prompt": "Complete com 'am', 'is' ou 'are' e depois negue a frase:", "items": ["I ___ from Brazil. (Negativo: I ___ from Brazil.)", "She ___ from Canada. (Negativo: She ___ from Canada.)", "___ you from England?"], "answerKey": ["am / am not", "is / is not", "Are"], "feedbackPt": "Contrações comuns: I'm not, She isn't, Aren't you?" },
    { "type": "errorfix", "prompt": "Corrija os erros:", "items": ["Where you from?", "I no am from USA.", "He are from Japan."], "answerKey": ["Where are you from?", "I am not from the USA.", "He is from Japan."], "feedbackPt": "Lembre-se da inversão nas perguntas e da conjugação correta." }
  ],
  "roleplay": {
    "setup": "Você está num evento em Nova York. Você precisa descobrir de onde as pessoas são.",
    "npcPersona": "Uma pessoa misteriosa que pode ser de qualquer lugar do mundo.",
    "complications": ["A IA acha que você é dos EUA e você tem que negar usando 'I am not'.", "Ela responde num sotaque difícil e você precisa pedir 'Can you repeat, please?'"],
    "successCriteria": ["Perguntar 'Where are you from?'", "Usar 'I am from...'", "Usar 'I am not' pelo menos uma vez"],
    "starterPrompt": "ROLE-PLAY: International Networking (CEFR A1)\n\nYou are a mysterious person at a New York event. I am trying to make friends. My goal is to ask where you are from, say where I am from, and correct you if you guess my country wrong.\n\nRULES:\n1. Stay in character. Speak ONLY English at CEFR A1.\n2. Each turn: at most 2 sentences. End with ONE question.\n3. If I write in Portuguese, reply: \"In English, please.\"\n4. I must use 'Where are you from?' and 'I am not...'.\n5. Run exactly 6 turns.\n\nCOMPLICATIONS:\n- On turn 1, assume I am American. Make me correct you using 'I am not'.\n- On turn 3, speak with a thick accent or use a slang word.\n\nSCORECARD:\n- Mission objectives: done / not done\n- 3 mistakes + corrections\n\nSTART NOW: speak first, in character."
  },
  "culturalPass": {
    "work": "Lost in Translation", "type": "film", "year": "2003",
    "whyA1": "O filme mostra dois americanos perdidos no Japão, lidando com barreiras de idioma, sotaques e culturas diferentes.",
    "listeningMission": "Assista à cena do hotel e anote quantas vezes a palavra 'from' ou 'where' aparece."
  }
};