window.VENTU_CHAPTER = {
  "meta": {
    "sublevel": "A1.1",
    "chapter": 5,
    "title": "Where Are You From?",
    "subtitle": "De onde você vem?",
    "format": "mission",
    "estimatedMinutes": 20,
    "canDo": [
      "Eu consigo falar de qual país eu sou.",
      "Eu consigo perguntar a nacionalidade de alguém.",
      "Eu consigo usar o verbo 'to be' na forma negativa."
    ]
  },
  "warmup": {
    "prompt": "Qual é a primeira coisa que as pessoas perguntam quando você fala que tem sotaque?",
    "image_concept": "Imagine que você está em uma conferência internacional. Você conhece pessoas da França, do Japão e do Canadá."
  },
  "input": {
    "title": "A Conferência Internacional",
    "lines": [
      { "speaker": "Emma", "text": "Hi! Are you from Canada?", "ptHelp": "Oi! Você é do Canadá?" },
      { "speaker": "Lucas", "text": "No, I am not. I am from Brazil.", "ptHelp": "Não, eu não sou. Eu sou do Brasil." },
      { "speaker": "Emma", "text": "Oh, Brazil! Where are you from in Brazil?", "ptHelp": "Ah, Brasil! De onde você é no Brasil?" },
      { "speaker": "Lucas", "text": "I am from Rio de Janeiro. And you?", "ptHelp": "Eu sou do Rio de Janeiro. E você?" },
      { "speaker": "Emma", "text": "I am from England. It is my first time here.", "ptHelp": "Eu sou da Inglaterra. É minha primeira vez aqui." }
    ]
  },
  "vocab": [
    { "term": "Where", "pos": "adverb", "meaning": "Onde / De onde", "example": "Where are you from?", "ipa": "/wer/", "br": "UÉR (o 'H' é mudo aqui)" },
    { "term": "From", "pos": "preposition", "meaning": "De (origem)", "example": "I am from Brazil.", "ipa": "/frʌm/", "br": "FRÂM (não fale 'fromi')" },
    { "term": "Brazil", "pos": "noun", "meaning": "Brasil", "example": "I am from Brazil.", "ipa": "/brəˈzɪl/", "br": "brâ-ZÍL (o S tem som de Z)" },
    { "term": "England", "pos": "noun", "meaning": "Inglaterra", "example": "She is from England.", "ipa": "/ˈɪŋ.ɡlənd/", "br": "ÍN-glând" },
    { "term": "Country", "pos": "noun", "meaning": "País", "example": "Brazil is a big country.", "ipa": "/ˈkʌn.tri/", "br": "CÂN-tri" }
  ],
  "grammar": {
    "focus": "Verb To Be (Negative and Questions)",
    "rule": "Para perguntar, invertemos o verbo: 'Are you...?' (Você é...?). Para negar, adicionamos 'not': 'I am not' (Eu não sou), 'You are not' (Você não é). Na fala, 'I am not' vira 'I'm not' e 'You are not' vira 'You aren't'.",
    "examples": [
      "Are you from Canada? (Você é do Canadá?)",
      "No, I am not. (Não, eu não sou)",
      "Where are you from? (De onde você é?)",
      "She is not here. (Ela não está aqui)"
    ],
    "brazilianTraps": [
      { "wrong": "I am not from Brazil, I am from Portuguese.", "right": "I am not from Brazil, I am from Portugal.", "why": "Cuidado com o falso cognato. O país é Portugal. A língua é Portuguese." },
      { "wrong": "Where you are from?", "right": "Where are you from?", "why": "Em inglês, nas perguntas, o verbo 'to be' vem ANTES do sujeito." }
    ]
  },
  "pronunciation": {
    "focus": "Redução de 'Are you' e 'From'",
    "explanation": "Na fala rápida, 'Are you' vira 'Ar-ya' (/ˈɑːr.jə/). E a palavra 'From' tem o som de 'â' (/frʌm/), não fale 'fromi' nem 'from' com som de 'o' aberto.",
    "minimalPairs": [
      { "a": "From", "aIpa": "/frʌm/", "b": "Form", "bIpa": "/fɔːrm/" }
    ]
  },
  "activities": [
    {
      "type": "gap",
      "instruction": "Complete com 'am', 'is' ou 'are' e depois negue a frase:",
      "items": ["I ___ from Brazil. (Negativo: I ___ from Brazil.)", "She ___ from Canada. (Negativo: She ___ from Canada.)", "___ you from England?"]
    },
    {
      "type": "errorfix",
      "instruction": "Corrija os erros:",
      "items": ["Where you from?", "I no am from USA.", "He are from Japan."]
    }
  ],
  "roleplay": {
    "title": "Networking Internacional",
    "scenario": "Você está num evento em Nova York. Você precisa descobrir de onde as pessoas são.",
    "aiCharacter": "Uma pessoa misteriosa que pode ser de qualquer lugar do mundo.",
    "studentRole": "Você, tentando fazer amigos internacionais.",
    "studentGoal": "Perguntar de onde a pessoa é, dizer de onde você é e negar se ela errar seu país.",
    "objectives": [
      "Use 'Where are you from?'.",
      "Responda usando 'I am from...'.",
      "Use 'I am not' pelo menos uma vez."
    ],
    "promptText": "ROLE-PLAY: International Networking (CEFR A1)\n\nYou are a mysterious person at a New York event. I am trying to make friends. My goal is to ask where you are from, say where I am from, and correct you if you guess my country wrong.\n\nRULES:\n1. Stay in character. Speak ONLY English at CEFR A1.\n2. Each turn: at most 2 sentences. End with ONE question.\n3. If I write in Portuguese, reply: \"In English, please.\"\n4. I must use 'Where are you from?' and 'I am not...'.\n5. Run exactly 6 turns.\n\nSCORECARD:\n- Mission objectives: done / not done\n- 3 mistakes + corrections\n\nSTART NOW: speak first, in character."
  },
  "culturalPass": {
    "film": {
      "title": "The Terminal",
      "year": 2004,
      "creator": "Steven Spielberg",
      "genre": "Drama / Comedy",
      "difficulty": 2,
      "why": "O filme todo é sobre alguém de um país fictício tentando sobreviver em Nova York sem falar inglês direito, com muitas cenas de 'Where are you from?'.",
      "listeningMission": "Assista a primeira cena no aeroporto e tente ouvir quantas nacionalidades diferentes são mencionadas."
    }
  }
};