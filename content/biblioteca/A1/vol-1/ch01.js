window.VENTU_CHAPTER = {
  "meta": {
    "sublevel": "A1.1",
    "chapter": 1,
    "title": "Hello, I'm…",
    "subtitle": "Sobrevivendo ao primeiro oi",
    "format": "story",
    "estimatedMinutes": 20,
    "canDo": [
      "Eu consigo me apresentar de forma simples.",
      "Eu consigo perguntar o nome de alguém e de onde ele é.",
      "Eu consigo usar o verbo 'to be' (I am, You are, Is)."
    ]
  },
  "warmup": {
    "prompt": "Como você se apresenta quando conhece alguém em uma situação formal? O que você costuma falar primeiro?",
    "image_concept": "Imagine chegar numa festa de networking onde você não conhece ninguém. Como quebrar o gelo em inglês sem parecer um robô?"
  },
  "input": {
    "title": "O Primeiro Dia de Emma no Escritório",
    "lines": [
      { "speaker": "Emma", "text": "Hello! I am Emma. I am the new designer.", "ptHelp": "Olá! Eu sou a Emma. Sou a nova designer." },
      { "speaker": "Lucas", "text": "Hi, Emma! I am Lucas. Nice to meet you.", "ptHelp": "Oi, Emma! Eu sou o Lucas. Prazer em conhecer você." },
      { "speaker": "Emma", "text": "Nice to meet you too. Are you from New York?", "ptHelp": "Prazer em conhecer você também. Você é de Nova York?" },
      { "speaker": "Lucas", "text": "No, I am not. I am from Canada. Where are you from?", "ptHelp": "Não, não sou. Sou do Canadá. De onde você é?" },
      { "speaker": "Emma", "text": "I am from London. It is a beautiful city.", "ptHelp": "Sou de Londres. É uma cidade linda." },
      { "speaker": "Lucas", "text": "Cool! Welcome to the team, Emma.", "ptHelp": "Legal! Bem-vinda à equipe, Emma." }
    ]
  },
  "vocab": [
    { "term": "Hello", "pos": "expression", "meaning": "Olá / Oi", "example": "Hello, I am Emma.", "ipa": "/həˈloʊ/", "br": "RÊ-LOU (o 'H' tem um sopro leve)" },
    { "term": "Hi", "pos": "expression", "meaning": "Oi (informal)", "example": "Hi, Emma!", "ipa": "/haɪ/", "br": "RÁI (sopro leve no H)" },
    { "term": "I am / I'm", "pos": "verb", "meaning": "Eu sou / Eu estou", "example": "I'm from Canada.", "ipa": "/aɪ æm/", "br": "ÁI ém (junto fica 'AIM')" },
    { "term": "Nice", "pos": "adj", "meaning": "Legal / Agradável", "example": "Nice to meet you.", "ipa": "/naɪs/", "br": "NÁIS (som de 'S' no final, não 'nice' com 'i' no fim)" },
    { "term": "Meet", "pos": "verb", "meaning": "Conhecer / Encontrar", "example": "Nice to meet you.", "ipa": "/miːt/", "br": "MÍT (o 'T' é seco, sem som de 'i' no final)" },
    { "term": "From", "pos": "prep", "meaning": "De (origem)", "example": "I am from Brazil.", "ipa": "/frʌm/", "br": "FRÂM (o 'o' soa como 'â')" },
    { "term": "City", "pos": "noun", "meaning": "Cidade", "example": "London is a big city.", "ipa": "/ˈsɪt.i/", "br": "SÍ-ri (o 'T' entre vogais vira um 'R' fraco)" }
  ],
  "grammar": {
    "focus": "Verb To Be (Present)",
    "rule": "O verbo 'to be' significa 'ser' ou 'estar'. Usamos 'am' para 'I', 'are' para 'you/we/they' e 'is' para 'he/she/it'.",
    "examples": [
      "I am Emma. (Eu sou a Emma)",
      "You are from Canada. (Você é do Canadá)",
      "Are you from New York? (Você é de NY?)",
      "No, I am not. (Não, eu não sou)"
    ],
    "brazilianTraps": [
      { "wrong": "I have 25 years.", "right": "I am 25 years old.", "why": "Em inglês, idade usa o verbo 'to be' (ser), não 'have' (ter)." },
      { "wrong": "I am agree.", "right": "I agree.", "why": "O verbo 'agree' já é a ação. Não usamos 'to be' antes." },
      { "wrong": "I am a engineer.", "right": "I am an engineer.", "why": "Usamos 'an' antes de sons de vogal (en-ge-neer)." }
    ]
  },
  "pronunciation": {
    "focus": "O som do 'H' e a redução de 'I am'",
    "explanation": "O erro número 1 do brasileiro é não soprar o 'H'. Em 'Hello' e 'Hi', o 'h' tem um sopro leve, como se você estivesse embaçando um vidro. Não é o 'R' carioca! Já o 'I am' na fala rápida vira 'I'm' (soa como 'AIM').",
    "minimalPairs": [
      { "a": "Hi", "aIpa": "/haɪ/", "b": "I", "bIpa": "/aɪ/" },
      { "a": "Hate", "aIpa": "/heɪt/", "b": "Eight", "bIpa": "/eɪt/" }
    ]
  },
  "activities": [
    {
      "type": "gap",
      "instruction": "Complete as frases com 'am', 'is' ou 'are'.",
      "items": ["I ___ Emma.", "You ___ from Canada.", "Where ___ you from?", "It ___ a beautiful city.", "No, I ___ not."]
    },
    {
      "type": "order",
      "instruction": "Coloque as palavras na ordem correta.",
      "items": ["Emma / I / am / Hello / .", "meet / Nice / you / to / .", "from / you / Where / are / ?"]
    },
    {
      "type": "errorfix",
      "instruction": "Corrija o erro comum do brasileiro.",
      "items": ["I have 30 years old.", "I am agree with you.", "I am from Brazil, I am a engineer."]
    },
    {
      "type": "record",
      "instruction": "Grave sua voz (ou treine no espelho) focando no 'H' soprado:",
      "items": ["Hello! I am from Brazil.", "Hi! Nice to meet you.", "Where are you from?"]
    }
  ],
  "roleplay": {
    "title": "A Festa de Networking",
    "scenario": "Você está numa conferência de tecnologia em Londres e precisa falar com colegas para fazer contatos profissionais.",
    "aiCharacter": "Sarah, uma gerente de produto de Toronto que está numa mesa tomando café.",
    "studentRole": "Você, um profissional brasileiro buscando novas conexões.",
    "studentGoal": "Se apresentar, perguntar de onde ela é e dizer o que você faz.",
    "objectives": [
      "Use 'Nice to meet you' pelo menos uma vez.",
      "Pergunte a origem dela usando 'Where are you from?'.",
      "Responda sobre sua profissão usando o verbo 'to be'."
    ],
    "promptText": "ROLE-PLAY: Networking Event (CEFR A1)\n\nYou are Sarah, a product manager from Toronto. I am a professional attending the conference. My goal is to introduce myself, ask where you are from, and say what I do.\n\nRULES:\n1. Stay in character. Speak ONLY English at CEFR A1.\n2. Each turn: at most 2 sentences. End with ONE question.\n3. If I write in Portuguese, reply: \"In English, please. Try: 'I am...'\"\n4. I must use 'I am', 'Where are you from?', and 'Nice to meet you'.\n5. Run exactly 6 turns.\n\nSCORECARD:\n- Mission objectives: done / not done\n- 3 mistakes + corrections\n\nSTART NOW: speak first, in character."
  },
  "culturalPass": {
    "film": {
      "title": "The Terminal",
      "year": 2004,
      "creator": "Steven Spielberg",
      "genre": "Comedy/Drama",
      "difficulty": 2,
      "why": "O personagem principal chega aos EUA sem falar inglês e precisa aprender o básico para sobreviver no aeroporto.",
      "listeningMission": "Assista a primeira cena de conversação no aeroporto e anote 2 formas de dizer 'Olá' ou 'Obrigado'."
    },
    "song": {
      "title": "Hello, Goodbye",
      "year": 1967,
      "creator": "The Beatles",
      "genre": "Pop",
      "difficulty": 1,
      "why": "Uma música clássica e lenta que repete exaustivamente expressões de cumprimento e despedida.",
      "listeningMission": "Ouça e conte quantas vezes eles dizem 'Hello' e 'Goodbye'."
    }
  }
};