window.VENTU_CHAPTER = {
  "meta": {
    "level": "ESPECIAL", "volume": "RUA", "chapter": 1,
    "title": "The Stop and Frisk", "subtitle": "Abordagem Policial",
    "canDo": [
      "Eu consigo sobreviver a uma abordagem policial agressiva sem ser preso.",
      "Eu consigo usar as frases legais corretas em inglês (Am I being detained?).",
      "Eu consigo entender o sotaque e o jargão policial."
    ],
    "estimatedMinutes": 40, "xp": 300,
    "characters": ["Lucas", "Officer Miller"],
    "loreHook": "Lucas está voltando do trabalho tarde da noite em Nova York e é parado pela polícia porque 'bateu com a descrição' de um suspeito."
  },
  "warmup": {
    "recall": [],
    "hook": "A police officer stops you on the street and says: 'Put your hands where I can see them.' What is the FIRST thing you should say?",
    "image_concept": "This is not a movie. In the US, one wrong move can get you arrested or worse. Know your rights."
  },
  "input": {
    "scene": "Sidewalk in the Bronx, 11 PM",
    "tone": "Tense, authoritative, and procedural.",
    "lines": [
      { "speaker": "Officer Miller", "en": "Hey! Stop right there. Let me see your hands.", "register": "formal" },
      { "speaker": "Lucas", "en": "Okay, officer. My hands are right here. Am I being detained?", "register": "neutral" },
      { "speaker": "Officer Miller", "en": "Just shut up and keep your hands on the car. We got a report of a break-in and you match the description.", "register": "formal" },
      { "speaker": "Lucas", "en": "I understand. I am not resisting, but I do not consent to a search. What is your probable cause?", "register": "neutral" },
      { "speaker": "Officer Miller", "en": "Don't get smart with me. Do you have any ID on you? Where are you coming from?", "register": "formal" },
      { "speaker": "Lucas", "en": "My ID is in my back pocket. I am coming from work. Can you tell me your badge number?", "register": "neutral" },
      { "speaker": "Officer Miller", "en": "You're pushing it, kid. Stay right here while I run your ID.", "register": "formal" }
    ]
  },
  "vocab": [
    { "en": "Am I being detained?", "ipa": "/æm aɪ ˈbiː.ɪŋ dɪˈteɪnd/", "br": "ém ái BÍ-in di-TÊIND", "ptHelp": "Estou sendo detido?", "register": "formal", "example": "If the officer says no, you are free to go.", "recycled": false },
    { "en": "To consent", "ipa": "/kənˈsent/", "br": "kân-SÉNT", "ptHelp": "Consentir / Autorizar", "register": "formal", "example": "I do not consent to a search.", "recycled": false },
    { "en": "Probable cause", "ipa": "/ˈprɑː.bə.bəl kɔːz/", "br": "PRÓ-bâ-bâl KÓZ", "ptHelp": "Motivo justo / Evidência", "register": "formal", "example": "You need probable cause to search my car.", "recycled": false },
    { "en": "Badge number", "ipa": "/bædʒ ˈnʌm.bɚ/", "br": "BÉDJ NÂM-bâr", "ptHelp": "Número da matrícula policial", "register": "formal", "example": "What is your badge number?", "recycled": false },
    { "en": "To resist", "ipa": "/rɪˈzɪst/", "br": "ri-ZÍST", "ptHelp": "Resistir", "register": "formal", "example": "I am not resisting arrest.", "recycled": false }
  ],
  "grammar": {
    "focus": "Polite Defiance (Formal Language)",
    "rule": "When dealing with police, NEVER use slang or swear. Use formal, passive structures to show you know your rights without being aggressive. 'I am not resisting' instead of 'I'm not doing anything'.",
    "examples": [
      "I am not resisting, but I do not consent to a search.",
      "My ID is in my back pocket.",
      "Can you tell me your badge number?"
    ],
    "brazilianTraps": [
      { "wrong": "Why you stop me?", "right": "Excuse me, sir, why was I stopped?", "why": "Never demand. Ask procedurally." },
      { "wrong": "I don't have nothing.", "right": "I don't have anything on me.", "why": "Double negatives make you sound uneducated and suspicious." }
    ]
  },
  "pronunciation": {
    "focus": "Controlling your voice",
    "explanation": "When people get scared, their voice goes up (like a question). To sound in control, you must lower your pitch and slow down. Say 'Am I being detained?' with a flat tone.",
    "minimalPairs": [["Am I being detained? (Flat)", "Am I being detained? (Scared)"]]
  },
  "activities": [
    {
      "type": "reading",
      "instruction": "MOCKUP: The Viral TikTok Script",
      "items": [
        "A video with 15M views on TikTok is teaching people what to do when stopped by the police.",
        "<div style='background:#000; color:#fff; border-radius:12px; padding:16px; font-family:monospace; margin-top:10px;'>",
        "<div style='color:#00ff00;'>[Body Cam Footage]</div>",
        "<div style='margin-bottom:10px;'><b>Officer:</b> Get out of the car! Now!</div>",
        "<div style='margin-bottom:10px;'><b>Citizen:</b> I am getting out of the car. I have my hands visible. Am I being detained?</div>",
        "<div style='margin-bottom:10px;'><b>Officer:</b> Yes, you are. Keep your hands on the hood.</div>",
        "<div style='margin-bottom:10px;'><b>Citizen:</b> Understood. I am not resisting. I do not consent to a search.</div>",
        "</div>"
      ],
      "feedback": "Notice how the citizen repeats the same 3 phrases. Repetition shows you are calm and trained."
    },
    {
      "type": "gap",
      "instruction": "Survival Phrases Gap-fill:",
      "items": [
        "Am I being ___? (detained)",
        "I do not ___ to a search. (consent)",
        "My ID is in my ___ pocket. (back)",
        "What is your ___ number? (badge)"
      ],
      "answerKey": ["detained", "consent", "back", "badge"]
    }
  ],
  "roleplay": {
    "setup": "You are stopped by an aggressive police officer (the AI) at night. He wants to search your bag.",
    "npcPersona": "Officer Miller, impatient, authoritative, but follows the law.",
    "complications": [
      "The AI will shine a flashlight in your eyes and demand you stop looking at him.",
      "If you say 'I know my rights', the AI will get angry. You must use 'I am not resisting, but...'."
    ],
    "successCriteria": [
      "Ask 'Am I being detained?'.",
      "Refuse the search using 'I do not consent'.",
      "Ask for his badge number."
    ],
    "promptText": "ROLE-PLAY: Police Stop (CEFR B2+)\n\nYou are Officer Miller, an aggressive police officer in NYC. I am Lucas, a civilian who got stopped. My goal is to survive the encounter, protect my rights, and not get arrested.\n\nRULES:\n1. Stay in character. Speak ONLY English at CEFR B2+.\n2. Each turn: at most 2 sentences. End with ONE command.\n3. If I write in Portuguese, reply: \"In English, please.\"\n4. I must use formal defiance (Am I being detained? / I do not consent).\n5. Run exactly 8 turns.\n\nCOMPLICATIONS:\n- On turn 2, demand to search my bag.\n- On turn 4, threaten to arrest me for 'disorderly conduct'.\n\nSCORECARD:\n- Mission objectives: done / not done\n- 3 mistakes + corrections\n\nSTART NOW: speak first, in character."
  },
  "culturalPass": {
    "film": {
      "title": "When They See Us",
      "year": 2019,
      "creator": "Ava DuVernay",
      "genre": "Drama",
      "difficulty": 4,
      "why": "A série mostra a brutalidade real do sistema policial de Nova York e como as pessoas sobrevivem (ou não) aos interrogatórios.",
      "listeningMission": "Assista ao primeiro episódio e anote como o policial tenta manipular os adolescentes na sala de interrogatório."
    }
  }
};