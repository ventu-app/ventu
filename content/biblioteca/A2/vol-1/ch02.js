window.VENTU_CHAPTER = {
  "meta": {
    "level": "A2", "volume": 1, "chapter": 2,
    "title": "The Missing Luggage", "subtitle": "Onde está a minha mala?",
    "canDo": [
      "Eu consigo fazer perguntas e negar no Passado Simples usando 'Did'.",
      "Eu consigo usar phrasal verbs de viagem (pick up, fill out).",
      "Eu consigo descrever um problema com bagagem."
    ],
    "estimatedMinutes": 25, "xp": 150,
    "characters": ["Emma", "Lucas", "Attendant"],
    "loreHook": "Lucas revela que a mala perdida tem os contratos que eles precisam entregar no Porto Hotel."
  },
  "warmup": {
    "recall": [
      { "q": "How did Emma and Lucas check in at the hotel?", "a": "They said 'We have a reservation'." },
      { "q": "What is the past of 'arrive'?", "a": "Arrived." }
    ],
    "hook": "O que você faz se a sua mala não chega na esteira do aeroporto?",
    "ptHelp": "Você está na esteira do aeroporto, todo mundo já pegou as malas, a esteira parou, e a sua mala não apareceu."
  },
  "input": {
    "scene": "Na Esteira do Aeroporto",
    "tone": "Preocupado e urgente",
    "lines": [
      { "speaker": "Lucas", "en": "Emma, did you see my black bag?", "ptHelp": "Emma, você viu minha mala preta?", "register": "casual" },
      { "speaker": "Emma", "en": "No, I didn't. I only have my blue suitcase.", "ptHelp": "Não, eu não vi. Eu só tenho minha mala azul.", "register": "casual" },
      { "speaker": "Lucas", "en": "I think they lost it. Let's go to the baggage claim.", "ptHelp": "Acho que eles perderam. Vamos ao setor de bagagens.", "register": "neutral" },
      { "speaker": "Attendant", "en": "Good evening. Did you have a problem with your flight?", "ptHelp": "Boa noite. Você teve um problema com o seu voo?", "register": "formal" },
      { "speaker": "Lucas", "en": "Yes. I didn't pick up my bag. It didn't arrive. The documents for Porto Hotel are inside!", "ptHelp": "Sim. Eu não peguei minha mala. Ela não chegou. Os documentos do Porto Hotel estão dentro!", "register": "neutral" },
      { "speaker": "Attendant", "en": "Okay, please fill out this form with your information.", "ptHelp": "Okay, por favor preencha este formulário com suas informações.", "register": "formal" }
    ],
    "listeningMission": "Ouça o diálogo e anote o que Lucas diz que está dentro da mala perdida."
  },
  "vocab": [
    { "en": "Suitcase", "ipa": "/ˈsuːt.keɪs/", "br": "SÚT-kêis", "ptHelp": "Mala", "register": "neutral", "example": "My blue suitcase.", "recycled": true },
    { "en": "Lost", "ipa": "/lɒst/", "br": "LÓST (o O é aberto)", "ptHelp": "Perdeu/Perdido", "register": "neutral", "example": "They lost my bag.", "recycled": false },
    { "en": "Pick up", "ipa": "/pɪk ʌp/", "br": "PÍK ÂP", "ptHelp": "Pegar (algo)", "register": "neutral", "example": "I picked up my bag.", "recycled": false },
    { "en": "Fill out", "ipa": "/fɪl aʊt/", "br": "FÍL ÁUT", "ptHelp": "Preencher (formulário)", "register": "formal", "example": "Fill out this form.", "recycled": false },
    { "en": "Baggage claim", "ipa": "/ˈbæɡ.ɪdʒ kleɪm/", "br": "BÉ-guedj KLÊIM", "ptHelp": "Restituição de bagagem", "register": "neutral", "example": "Go to baggage claim.", "recycled": false }
  ],
  "grammar": {
    "rule": "Para fazer perguntas no passado, usamos 'Did' no início + o verbo no infinitivo. Para negar, usamos 'didn't' + verbo no infinitivo.",
    "pattern": "Did you...? / I didn't...",
    "traps": [
      { "wrong": "Did you saw my bag?", "right": "Did you see my bag?", "why": "Quando usamos 'Did', o verbo volta para a forma base." },
      { "wrong": "I didn't picked up my bag.", "right": "I didn't pick up my bag.", "why": "A mesma regra do 'Didn't': verbo no infinitivo." }
    ]
  },
  "pronunciation": {
    "focus": "A redução de 'Did you'",
    "mouthTip": "Na fala rápida, 'Did you' vira 'Dija' (/dɪdʒə/). 'Did you see?' soa como 'Dijá sí?'. Pratique a conexão.",
    "minimalPairs": [["Did you", "Did"], ["See", "Saw (errado)"]]
  },
  "activities": [
    { "type": "errorfix", "prompt": "Corrija as perguntas e negações no passado:", "items": ["Did you went to the hotel?", "I didn't arrived on time.", "Did she saw the bag?"], "answerKey": ["Did you go to the hotel?", "I didn't arrive on time.", "Did she see the bag?"], "feedbackPt": "Lembre-se: depois de Did/Didn't, o verbo fica na forma base." },
    { "type": "fill", "prompt": "Complete com 'did' ou 'didn't':", "items": ["___ you find your bag? (Pergunta)", "No, I ___ find it. (Negativa)", "Where ___ you put your suitcase? (Pergunta)"], "answerKey": ["Did", "didn't", "did"], "feedbackPt": "Did para perguntas, didn't para negar." }
  ],
  "roleplay": {
    "setup": "Você está no balcão da companhia aérea no aeroporto do Porto. Sua mala não chegou.",
    "npcPersona": "O atendente da companhia aérea, prestativo mas seguindo os protocolos.",
    "complications": ["A IA diz que o sistema está fora do ar e você precisa descrever a mala de memória.", "Ela fala muito rápido e usa palavras difíceis (ex: 'compensation'). Peça para repetir."],
    "successCriteria": ["Use 'Did you...?' e 'I didn't...'.", "Use 'Fill out' ou 'I need to fill out'.", "Descreva a mala usando as cores (black, blue)."],
    "starterPrompt": "ROLE-PLAY: Lost Luggage (CEFR A2)\n\nYou are an airline baggage attendant. I am a passenger whose bag didn't arrive. My goal is to explain the problem, answer your questions about the bag, and ask to fill out a form.\n\nRULES:\n1. Stay in character. Speak ONLY English at CEFR A2.\n2. Each turn: at most 2 sentences. End with ONE question.\n3. If I write in Portuguese, reply: \"In English, please.\"\n4. I must use Past Simple questions and negatives.\n5. Run exactly 8 turns.\n\nCOMPLICATIONS:\n- On turn 2, say the computer system is down.\n- On turn 4, speak fast and use the word 'compensation'.\n\nSCORECARD:\n- Mission objectives: done / not done\n- 3 mistakes + corrections\n\nSTART NOW: speak first, in character."
  },
  "culturalPass": {
    "work": "The White Lotus", "type": "series", "year": "2021",
    "whyA1": "A série se passa em resorts de luxo. Tem muitas cenas de problemas com quartos e interações com funcionários.",
    "listeningMission": "Assista à cena de check-in do primeiro episódio e anote uma reclamação que um hóspede faz."
  }
};