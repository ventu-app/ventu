window.VENTU_CHAPTER = {
  "meta": {
    "level": "A1", "volume": 1, "chapter": 1,
    "title": "Hello, I'm…", "subtitle": "Sobrevivendo ao primeiro oi",
    "canDo": [
      "Eu consigo me apresentar de forma simples.",
      "Eu consigo perguntar o nome e a origem de alguém.",
      "Eu consigo usar o verbo 'to be' (I am, You are)."
    ],
    "estimatedMinutes": 20, "xp": 100,
    "characters": ["Emma", "Lucas"],
    "loreHook": "Emma comenta que fará uma viagem de trabalho em breve."
  },
  "warmup": {
    "recall": [],
    "hook": "Como você se apresenta quando conhece alguém em uma situação formal? O que você costuma falar primeiro?",
    "ptHelp": "Imagine chegar numa festa de networking onde você não conhece ninguém. Como quebrar o gelo em inglês sem parecer um robô?"
  },
  "input": {
    "scene": "O Primeiro Dia de Emma no Escritório",
    "tone": "Neutro e amigável",
    "lines": [
      { "speaker": "Emma", "en": "Hello! I am Emma. I am the new designer.", "ptHelp": "Olá! Eu sou a Emma. Sou a nova designer.", "register": "neutral" },
      { "speaker": "Lucas", "en": "Hi, Emma! I am Lucas. Nice to meet you.", "ptHelp": "Oi, Emma! Eu sou o Lucas. Prazer em conhecer você.", "register": "casual" },
      { "speaker": "Emma", "en": "Nice to meet you too. Are you from New York?", "ptHelp": "Prazer em conhecer você também. Você é de Nova York?", "register": "neutral" },
      { "speaker": "Lucas", "en": "No, I am not. I am from Canada. Where are you from?", "ptHelp": "Não, não sou. Sou do Canadá. De onde você é?", "register": "neutral" },
      { "speaker": "Emma", "en": "I am from London. I have a work trip next month.", "ptHelp": "Sou de Londres. Eu tenho uma viagem de trabalho no mês que vem.", "register": "neutral" }
    ],
    "listeningMission": "Ouça o diálogo e anote de onde Emma e Lucas são."
  },
  "vocab": [
    { "en": "Hello", "ipa": "/həˈloʊ/", "br": "RÊ-LOU", "ptHelp": "Olá", "register": "neutral", "example": "Hello, I am Emma.", "recycled": false },
    { "en": "Hi", "ipa": "/haɪ/", "br": "RÁI", "ptHelp": "Oi", "register": "casual", "example": "Hi, Emma!", "recycled": false },
    { "en": "Nice to meet you", "ipa": "/naɪs tə miːt juː/", "br": "NÁIS tâ MÍT iú", "ptHelp": "Prazer em conhecer você", "register": "neutral", "example": "Nice to meet you, Lucas.", "recycled": false },
    { "en": "I am / I'm", "ipa": "/aɪ æm/", "br": "ÁI ém", "ptHelp": "Eu sou / Eu estou", "register": "neutral", "example": "I am from Canada.", "recycled": false },
    { "en": "Where are you from?", "ipa": "/wɛr ɑːr juː frʌm/", "br": "UÉR ár iú frâm", "ptHelp": "De onde você é?", "register": "neutral", "example": "Where are you from?", "recycled": false }
  ],
  "grammar": {
    "rule": "O verbo 'to be' significa 'ser' ou 'estar'. Usamos 'am' para 'I', 'are' para 'you/we/they' e 'is' para 'he/she/it'.",
    "pattern": "I am / You are / He is / She is / It is",
    "traps": [
      { "wrong": "I have 25 years.", "right": "I am 25 years old.", "why": "Em inglês, idade usa o verbo 'to be' (ser), não 'have' (ter)." },
      { "wrong": "I am agree.", "right": "I agree.", "why": "O verbo 'agree' já é a ação. Não usamos 'to be' antes." }
    ]
  },
  "pronunciation": {
    "focus": "O som do 'H' aspirado e a redução de 'I am'",
    "mouthTip": "Em 'Hello' e 'Hi', o 'h' tem um sopro leve, como se você estivesse embaçando um vidro. Não é o 'R' carioca! Já o 'I am' na fala rápida vira 'I'm' (soa como 'AIM').",
    "minimalPairs": [["Hi", "I"], ["Hate", "Eight"]]
  },
  "activities": [
    { "type": "fill", "prompt": "Complete as frases com 'am', 'is' ou 'are'.", "items": ["I ___ Emma.", "You ___ from Canada.", "Where ___ you from?", "It ___ a beautiful city.", "No, I ___ not."], "answerKey": ["am", "are", "are", "is", "am"], "feedbackPt": "Lembre-se: 'I' sempre leva 'am'." },
    { "type": "order", "prompt": "Coloque as palavras na ordem correta.", "items": ["Emma / I / am / Hello / .", "meet / Nice / you / to / .", "from / you / Where / are / ?"], "answerKey": ["Hello, I am Emma.", "Nice to meet you.", "Where are you from?"], "feedbackPt": "Nas perguntas, o verbo 'to be' vem antes do sujeito." }
  ],
  "roleplay": {
    "setup": "Você está numa conferência e precisa falar com colegas para fazer contatos profissionais.",
    "npcPersona": "Sarah, uma gerente de produto de Toronto que está numa mesa tomando café.",
    "complications": ["Ela fala muito rápido e você precisa pedir para repetir.", "Ela acha que você é dos EUA e você tem que corrigir."],
    "successCriteria": ["Usar 'Nice to meet you'", "Perguntar de onde ela é", "Dizer sua profissão usando 'to be'"],
    "starterPrompt": "ROLE-PLAY: Networking Event (CEFR A1)\n\nYou are Sarah, a product manager from Toronto. I am a professional attending the conference. My goal is to introduce myself, ask where you are from, and say what I do.\n\nRULES:\n1. Stay in character. Speak ONLY English at CEFR A1.\n2. Each turn: at most 2 sentences. End with ONE question.\n3. If I write in Portuguese, reply: \"In English, please. Try: 'I am...'\"\n4. I must use 'I am', 'Where are you from?', and 'Nice to meet you'.\n5. Run exactly 6 turns.\n\nCOMPLICATIONS:\n- On turn 2, speak fast and use a slang word like 'Hey there'.\n- On turn 4, assume I am American. Make me correct you.\n\nSCORECARD:\n- Mission objectives: done / not done\n- 3 mistakes + corrections\n\nSTART NOW: speak first, in character."
  },
  "culturalPass": {
    "work": "The Terminal", "type": "film", "year": "2004",
    "whyA1": "O personagem principal chega aos EUA sem falar inglês e precisa aprender o básico para sobreviver no aeroporto.",
    "listeningMission": "Assista a primeira cena de conversação no aeroporto e anote 2 formas de dizer 'Olá' ou 'Obrigado'."
  }
};