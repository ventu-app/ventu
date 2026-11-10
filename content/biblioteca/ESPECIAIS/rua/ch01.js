window.VENTU_CHAPTER = {
  "meta": {
    "level": "ESPECIAL", "volume": "RUA", "chapter": 1,
    "title": "Lost in London", "subtitle": "Perdido no beco",
    "canDo": [
      "Eu consigo pedir informação em áreas perigosas de Londres.",
      "Eu consigo entender o sotaque Cockney (gírias britânicas).",
      "Eu consigo desescalar uma situação de desconfiança."
    ],
    "estimatedMinutes": 30, "xp": 250,
    "characters": ["Lucas", "Local"],
    "loreHook": "Lucas está procurando um pub secreto no East End de Londres e acaba entrando numa rua errada."
  },
  "warmup": {
    "recall": [],
    "hook": "Você está no meio de um beco escuro em Londres e não sabe voltar. Como você aborda o cara de capuz fumando ao lado da lixeira?",
    "ptHelp": "Você não pode simplesmente chegar falando 'Excuse me, can you help me?'. O cara já vai te ver como um turista rico e fácil."
  },
  "input": {
    "scene": "Beco em Londres",
    "tone": "Tenso e rápido",
    "lines": [
      { "speaker": "Lucas", "en": "Oi, mate. You alright?", "ptHelp": "Oi, mano. Tudo bem?", "register": "casual" },
      { "speaker": "Local", "en": "Yeah, just having a fag. You lost or something?", "ptHelp": "Sim, só fumando um cigarro. Você tá perdido ou algo assim?", "register": "casual" },
      { "speaker": "Lucas", "en": "Bit lost, yeah. I'm looking for the Blind Beggar pub. Is it round here?", "ptHelp": "Um pouco perdido, sim. Tô procurando o pub Blind Beggar. Fica por aqui?", "register": "casual" },
      { "speaker": "Local", "en": "You're miles away, bruv. It's down that dodgy alley. But I wouldn't go there alone this time of night.", "ptHelp": "Você tá longe pra caramba, mano. Fica lá naquele beco suspeito. Mas eu não iria lá sozinho a essa hora da noite.", "register": "casual" },
      { "speaker": "Lucas", "en": "Right. Cheers for the heads up. I'll get an Uber then.", "ptHelp": "Certo. Valeu pelo aviso. Vou pegar um Uber então.", "register": "casual" }
    ],
    "listeningMission": "Ouça e anote o que o local diz que Lucas não deveria fazer."
  },
  "vocab": [
    { "en": "Mate / Bruv", "ipa": "/meɪt/ /brʌv/", "br": "MÊIT / BRÂV", "ptHelp": "Mano / Parceiro", "register": "casual", "example": "You alright, mate?", "recycled": false },
    { "en": "Fag", "ipa": "/fæɡ/", "br": "FÉG", "ptHelp": "Cigarro (UK)", "register": "casual", "example": "Just having a fag.", "recycled": false },
    { "en": "Dodgy", "ipa": "/ˈdɒdʒ.i/", "br": "DÓ-dji", "ptHelp": "Suspeito / Perigoso", "register": "casual", "example": "A dodgy alley.", "recycled": false },
    { "en": "Cheers", "ipa": "/tʃɪərz/", "br": "CHÍÂRZ", "ptHelp": "Valeu / Saúde", "register": "casual", "example": "Cheers for the help.", "recycled": false },
    { "en": "Heads up", "ipa": "/hɛdz ʌp/", "br": "RÉDZ ÂP", "ptHelp": "Aviso", "register": "casual", "example": "Thanks for the heads up.", "recycled": false }
  ],
  "grammar": {
    "rule": "Inglês Britânico informal (Cockney). Não use 'What' no final de perguntas se quiser soar natural. 'You lost?' soa muito mais nativo que 'Are you lost?'.",
    "pattern": "You alright? / You lost? / Cheers for...",
    "traps": [
      { "wrong": "Can you help me, please?", "right": "Oi, mate. You alright?", "why": "Na rua, soar muito educado (como um robô ou turista rico) atrai problema. Aborde de igual pra igual." },
      { "wrong": "I am looking for a cigarette.", "right": "Just having a fag.", "why": "Se perguntarem, não use a frase inteira robótica. Use as gírias locais." }
    ]
  },
  "pronunciation": {
    "focus": "O Sotaque Cockney (UK)",
    "mouthTip": "O T no meio da palavra vira uma pausa ou som de 'R' fraco (water = wa'er). O TH vira 'F' ou 'V' (brother = bruvver). A entonação é saltitante e sobe no final das frases.",
    "minimalPairs": [["Brother", "Bruv"], ["Think", "Fink"]]
  },
  "activities": [
    { "type": "match", "prompt": "Relacione as gírias britânicas com o significado:", "items": ["Bruv", "Dodgy", "Cheers", "Fag"], "answerKey": ["Brother/Mano", "Suspeito", "Obrigado", "Cigarro"], "feedbackPt": "Gírias essenciais das ruas de Londres." },
    { "type": "order", "prompt": "Ordene a abordagem na rua:", "items": ["alright / You / mate / ? /", "for / Cheers / heads / the / up / ."], "answerKey": ["You alright, mate?", "Cheers for the heads up."], "feedbackPt": "Mantenha a frase curta e casual." }
  ],
  "roleplay": {
    "setup": "Você está num beco escuro em Londres tentando achar um pub. Você vê um local encostado na parede.",
    "npcPersona": "Um local desconfiado que usa gírias pesadas do East End de Londres (Cockney).",
    "complications": [
      "A IA começa a te encarar e perguntar 'What's your business here?' (O que você tá fazendo aqui?).",
      "Ela diz que te leva até o pub, mas pede uma 'libra' (1 pound) pelo favor."
    ],
    "successCriteria": [
      "Use 'mate' ou 'bruv' pelo menos uma vez.",
      "Entenda a gíria 'dodgy'.",
      "Desescale a situação sem parecer uma vítima ou um turista arrogante."
    ],
    "starterPrompt": "ROLE-PLAY: Lost in London (CEFR B2+)\n\nYou are a local in a dark alley in London. You use Cockney slang (mate, bruv, dodgy). I am a tourist trying to find a pub. My goal is to ask for directions without looking like a victim.\n\nRULES:\n1. Stay in character. Speak ONLY English at CEFR B2+.\n2. Each turn: at most 2 sentences. End with ONE question.\n3. If I write in Portuguese, reply: \"In English, please.\"\n4. I must use slang ('mate', 'cheers', etc).\n5. Run exactly 6 turns.\n\nCOMPLICATIONS:\n- On turn 1, be hostile. Ask me what I am doing here.\n- On turn 3, offer to guide me for 5 pounds.\n\nSCORECARD:\n- Mission objectives: done / not done\n- 3 mistakes + corrections\n\nSTART NOW: speak first, in character."
  },
  "culturalPass": {
    "work": "Top Boy", "type": "series", "year": "2011",
    "whyA1": "A série é ambientada nas ruas do East End de Londres. O sotaque Cockney, as gírias pesadas e o linguajar de rua são o coração do seriado.",
    "listeningMission": "Assista a uma cena de conversa na rua e anote quantas vezes você ouvir 'bruv' ou 'mate'."
  }
};