window.VENTU_CHAPTER = {
  "meta": {
    "level": "A1", "volume": 1, "chapter": 2,
    "title": "Numbers & Time", "subtitle": "Não perca o horário",
    "canDo": [
      "Eu consigo falar as horas (What time is it?).",
      "Eu consigo entender números de 1 a 100.",
      "Eu consigo diferenciar 'thirteen' (13) de 'thirty' (30)."
    ],
    "estimatedMinutes": 20, "xp": 100,
    "characters": ["Emma", "Lucas"],
    "loreHook": "Lucas menciona que tem uma reunião às 10:15 no Porto Hotel."
  },
  "warmup": {
    "recall": [
      { "q": "How do you introduce yourself?", "a": "I am [Name]. Nice to meet you." },
      { "q": "Where is Lucas from?", "a": "He is from Canada." }
    ],
    "hook": "Como você pergunta as horas para um estranho na rua em inglês? Tente lembrar a frase.",
    "ptHelp": "Imagine que seu celular descarregou e você tem uma reunião em 10 minutos. Você precisa perguntar as horas."
  },
  "input": {
    "scene": "Atrasadíssima no Aeroporto",
    "tone": "Ansioso e rápido",
    "lines": [
      { "speaker": "Emma", "en": "Excuse me, what time is it?", "ptHelp": "Com licença, que horas são?", "register": "neutral" },
      { "speaker": "Lucas", "en": "It is half past nine.", "ptHelp": "São nove e meia.", "register": "neutral" },
      { "speaker": "Emma", "en": "Oh no! My flight is at ten fifteen.", "ptHelp": "Ah não! Meu voo é às dez e quinze.", "register": "casual" },
      { "speaker": "Lucas", "en": "Gate fifteen or gate fifty?", "ptHelp": "Portão quinze ou portão cinquenta?", "register": "neutral" },
      { "speaker": "Emma", "en": "Gate thirteen. I have a meeting at the Porto Hotel!", "ptHelp": "Portão treze. Eu tenho uma reunião no Porto Hotel!", "register": "casual" }
    ],
    "listeningMission": "Ouça o diálogo e anote qual é o número do portão de Emma."
  },
  "vocab": [
    { "en": "Thirteen (13)", "ipa": "/ˌθɜːrˈtiːn/", "br": "THÂR-TÍN (força no fim)", "ptHelp": "Treze", "register": "neutral", "example": "Gate thirteen.", "recycled": false },
    { "en": "Thirty (30)", "ipa": "/ˈθɜːr.ti/", "br": "THÂR-ri (força no começo)", "ptHelp": "Trinta", "register": "neutral", "example": "It's thirty dollars.", "recycled": false },
    { "en": "Half past", "ipa": "/hæf pæst/", "br": "RÉF pést", "ptHelp": "Meia (trinta minutos)", "register": "neutral", "example": "It's half past nine.", "recycled": false },
    { "en": "Fifteen (15)", "ipa": "/ˌfɪfˈtiːn/", "br": "FIF-TÍN (força no fim)", "ptHelp": "Quinze", "register": "neutral", "example": "Ten fifteen.", "recycled": false },
    { "en": "Meeting", "ipa": "/ˈmiː.t̬ɪŋ/", "br": "MÍ-rin", "ptHelp": "Reunião", "register": "neutral", "example": "I have a meeting.", "recycled": false }
  ],
  "grammar": {
    "rule": "Para horas cheias, usamos 'o'clock'. Para meia hora, 'half past'. Para 15 min, 'a quarter past' (e quinze) ou 'a quarter to' (para). Para o resto, falamos a hora e os minutos (Ex: 9:20 - nine twenty).",
    "pattern": "What time is it? / It is...",
    "traps": [
      { "wrong": "I have 20 years.", "right": "I am 20 years old.", "why": "Não falamos 'Eu tenho 20 anos' literalmente." },
      { "wrong": "It's thirteen hours.", "right": "It's one PM.", "why": "Para horários, não usamos o relógio de 24h na fala comum (a não ser em aeroportos). Usamos AM/PM." }
    ]
  },
  "pronunciation": {
    "focus": "O famoso TH (θ) e a diferença de Teen/Ty",
    "mouthTip": "O 'th' em 'thirteen' e 'thirty' NÃO é um 't' nem um 'f'. Coloque a ponta da língua entre os dentes e sopre. Para 'Teen' (13, 14...) a força vai no final (TÍN). Para 'Ty' (30, 40...) a força vai no começo (THÂR-ri, FÓR-ri).",
    "minimalPairs": [["Thirteen", "Thirty"], ["Fifteen", "Fifty"]]
  },
  "activities": [
    { "type": "fill", "prompt": "Escreva as horas em inglês:", "items": ["7:00 (em ponto) = Seven ___", "9:30 = ___ past nine", "8:45 = A quarter ___ nine", "10:15 = A quarter ___ ten"], "answerKey": ["o'clock", "half", "to", "past"], "feedbackPt": "Lembre-se: 'past' é depois da hora, 'to' é antes da próxima hora." },
    { "type": "match", "prompt": "Relacione o número à sua escrita em inglês:", "items": ["13", "30", "15", "50"], "answerKey": ["Thirteen", "Thirty", "Fifteen", "Fifty"], "feedbackPt": "Cuidado com a sílaba tônica no final dos 'teens'." }
  ],
  "roleplay": {
    "setup": "Você está na Central Station em Nova York e precisa pegar um trem. Você não sabe as horas e nem qual plataforma ir.",
    "npcPersona": "Um atendente da estação, um pouco apressado, mas educado.",
    "complications": ["A IA responde 'fifty' em vez de 'fifteen' e você precisa pedir para ela soletrar ou repetir.", "O trem parte em 5 minutos e a IA fica impaciente se você demorar."],
    "successCriteria": ["Perguntar as horas", "Dizer o horário do seu trem", "Entender a diferença de números"],
    "starterPrompt": "ROLE-PLAY: Lost at the Station (CEFR A1)\n\nYou are a busy station attendant in New York. I am a lost tourist. My goal is to ask the time, say when my train is, and ask for the platform.\n\nRULES:\n1. Stay in character. Speak ONLY English at CEFR A1.\n2. Each turn: at most 2 sentences. End with ONE question.\n3. If I write in Portuguese, reply: \"In English, please.\"\n4. I must use numbers and times.\n5. Run exactly 6 turns.\n\nCOMPLICATIONS:\n- On turn 2, say 'fifty' instead of 'fifteen'. If I don't understand, be impatient.\n- On turn 4, rush me because the train is leaving.\n\nSCORECARD:\n- Mission objectives: done / not done\n- 3 mistakes + corrections\n\nSTART NOW: speak first, in character."
  },
  "culturalPass": {
    "work": "Groundhog Day", "type": "film", "year": "1993",
    "whyA1": "O filme se passa no mesmo dia repetidamente, o que significa que a rotina (acordar às 6:00) é mostrada várias e várias vezes.",
    "listeningMission": "Anote a que horas o personagem principal acorda todos os dias."
  }
};