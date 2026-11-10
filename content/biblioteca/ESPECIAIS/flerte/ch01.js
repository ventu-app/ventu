window.VENTU_CHAPTER = {
  "meta": {
    "level": "ESPECIAL", "volume": "FLERTE", "chapter": 1,
    "title": "The Match", "subtitle": "Saindo do 'Hey'",
    "canDo": [
      "Eu consigo iniciar uma conversa em apps de namoro sem parecer desesperado.",
      "Eu consigo identificar 'red flags' numa conversa.",
      "Eu consigo usar gírias de relacionamento (ghosting, breadcrumbing)."
    ],
    "estimatedMinutes": 25, "xp": 200,
    "characters": ["Emma", "Jake"],
    "loreHook": "Emma deu match com um cara chamado Jake. A conversa inicial é sempre o momento mais tenso."
  },
  "warmup": {
    "recall": [],
    "hook": "Você deu match no Tinder. A pessoa manda um 'Hey'. O que você responde para não deixar a conversa morrer?",
    "ptHelp": "No Brasil, a gente costuma mandar 'Oi, tudo bem?'. Mas em inglês, 'Hey' ou 'How are you' pode soar muito genérico. Como se destacar?"
  },
  "input": {
    "scene": "Chat do Tinder",
    "tone": "Irônico e brincalhão (com um toque de sarcasmo)",
    "lines": [
      { "speaker": "Jake", "en": "Hey there. How's your week going?", "ptHelp": "Oi. Como tá sua semana?", "register": "casual" },
      { "speaker": "Emma", "en": "Hey! It's going well, just surviving the corporate world. You?", "ptHelp": "Oi! Tá indo bem, só sobrevivendo ao mundo corporativo. E você?", "register": "casual" },
      { "speaker": "Jake", "en": "Same. Just working and hitting the gym. Your pictures are cool. Where was the second one taken?", "ptHelp": "O mesmo. Só trabalhando e indo pra academia. Suas fotos são legais. Onde a segunda foi tirada?", "register": "casual" },
      { "speaker": "Emma", "en": "That was in Lisbon. I went there for a work trip. Have you ever been to Europe?", "ptHelp": "Foi em Lisboa. Eu fui pra lá numa viagem de trabalho. Você já foi pra Europa?", "register": "casual" },
      { "speaker": "Jake", "en": "Nope. Too expensive. So, what are you looking for on here?", "ptHelp": "Não. Muito caro. Então, o que você tá procurando aqui?", "register": "casual" }
    ],
    "listeningMission": "Ouça o diálogo e anote o que Jake diz que está fazendo na semana dele."
  },
  "vocab": [
    { "en": "Match", "ipa": "/mætʃ/", "br": "MÉTCH", "ptHelp": "Conexão (nos apps)", "register": "casual", "example": "We matched on Tinder.", "recycled": false },
    { "en": "Red flag", "ipa": "/rɛd flæɡ/", "br": "RÉD FLÉG", "ptHelp": "Sinal de alerta / Bandeira vermelha", "register": "casual", "example": "He is talking about his ex. Red flag!", "recycled": false },
    { "en": "Ghosting", "ipa": "/ˈɡoʊ.stɪŋ/", "br": "GÔUS-tin", "ptHelp": "Dar um vácuo / Desaparecer", "register": "casual", "example": "He stopped replying. Classic ghosting.", "recycled": false },
    { "en": "To hit the gym", "ipa": "/tu hɪt ðə dʒɪm/", "br": "tu RÍT dâ DJÍM", "ptHelp": "Ir à academia", "register": "casual", "example": "I hit the gym every day.", "recycled": false },
    { "en": "Too expensive", "ipa": "/tu ɪkˈspen.sɪv/", "br": "tú iks-PÉN-siv", "ptHelp": "Muito caro", "register": "neutral", "example": "Europe is too expensive.", "recycled": true }
  ],
  "grammar": {
    "rule": "Para puxar assunto, use perguntas abertas (Wh-questions) em vez de perguntas de 'Sim ou Não'. Em vez de 'Do you like traveling?', pergunte 'Where was the second photo taken?'.",
    "pattern": "Where was...? / What are you looking for...?",
    "traps": [
      { "wrong": "How is your week going?", "right": "How's your week going?", "why": "Na vida real, gringos adoram contrações (How's, It's, I'm). Falar tudo inteiro soa robótico." },
      { "wrong": "I go to the gym.", "right": "I hit the gym.", "why": "'Hit the gym' é a expressão idiomática usada para 'ir à academia' de forma natural." }
    ]
  },
  "pronunciation": {
    "focus": "A entonação das perguntas",
    "mouthTip": "Em perguntas abertas (Where, What, Why), a entonação da voz CAI no final. Em perguntas fechadas (Are you...? Do you...?), a entonação SOBE no final.",
    "minimalPairs": [["Where are you from?", "Are you from Brazil?"]]
  },
  "activities": [
    { "type": "errorfix", "prompt": "Corrija as respostas robóticas do chat:", "items": ["I am fine, thank you. And you?", "Yes, I do like travel.", "I go to the gym."], "answerKey": ["I'm good, you?", "Yeah, I love traveling.", "I hit the gym."], "feedbackPt": "Use contrações e soe mais casual." },
    { "type": "fill", "prompt": "Complete a conversa com as gírias corretas (ghosting, match, red flag):", "items": ["We had a ___ on Tinder.", "He never replied again. That's ___.", "He still lives with his ex? That's a huge ___."], "answerKey": ["match", "ghosting", "red flag"], "feedbackPt": "Vocabulário essencial do mundo dos apps." }
  ],
  "roleplay": {
    "setup": "Você deu match com alguém no Tinder. A conversa começou, mas a pessoa (a IA) está respondendo com monossílabos e você tem que manter o papo vivo.",
    "npcPersona": "Jake, um cara bonito mas que não tem muita lábia. Ele dá respostas curtas.",
    "complications": [
      "A IA responde com 'K' ou 'Haha' e você tem que fazer uma pergunta aberta para salvar a conversa.",
      "A IA fala que ainda é amigo da ex e você tem que apontar isso como uma 'red flag' (ou sair fora educadamente)."
    ],
    "successCriteria": [
      "Faça pelo menos 2 perguntas abertas.",
      "Use uma gíria do vocabulário (match, red flag, etc).",
      "Não deixe a conversa morrer (não responda só com 'Yes' ou 'No')."
    ],
    "starterPrompt": "ROLE-PLAY: Tinder Chat (CEFR B1+)\n\nYou are Jake, a guy I matched with on Tinder. You are a bit dry and give short answers. I am trying to keep the conversation interesting.\n\nRULES:\n1. Stay in character. Speak ONLY English at CEFR B1/B2.\n2. Each turn: at most 2 sentences. End with ONE question.\n3. If I write in Portuguese, reply: \"In English, please.\"\n4. I must use open-ended questions and dating slang.\n5. Run exactly 6 turns.\n\nCOMPLICATIONS:\n- On turn 2, reply with just 'Haha' or 'Cool'. Make me work to keep the chat alive.\n- On turn 4, casually mention you still live with your ex.\n\nSCORECARD:\n- Mission objectives: done / not done\n- 3 mistakes + corrections\n\nSTART NOW: speak first, in character."
  },
  "culturalPass": {
    "work": "How I Met Your Mother", "type": "series", "year": "2005",
    "whyA1": "A série inteira é sobre dating, relacionamentos e 'red flags' em Nova York. As gírias de relacionamento são o prato principal.",
    "listeningMission": "Assista a um episódio e anote 3 expressões que os personagens usam para flertar."
  }
};