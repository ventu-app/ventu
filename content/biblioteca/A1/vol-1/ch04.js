window.VENTU_CHAPTER = {
  "meta": {
    "level": "A1", "volume": 1, "chapter": 4,
    "title": "My Family", "subtitle": "Conhecendo a família",
    "canDo": [
      "Eu consigo falar os membros da família.",
      "Eu consigo usar 'my', 'your', 'his', 'her'.",
      "Eu consigo descrever minha família."
    ],
    "estimatedMinutes": 20, "xp": 100,
    "characters": ["Emma", "Lucas"],
    "loreHook": "Emma revela que seu pai é dono da rede de hotéis que ela vai visitar."
  },
  "warmup": {
    "recall": [
      { "q": "How much is that postcard?", "a": "It is ten dollars." },
      { "q": "What is the difference between 'this' and 'that'?", "a": "This is near, that is far." }
    ],
    "hook": "Você tem irmãos? Como você apresenta sua família para alguém?",
    "ptHelp": "Você está mostrando uma foto da sua família no celular para um amigo inglês."
  },
  "input": {
    "scene": "Mostrando a Foto",
    "tone": "Pessoal e caloroso",
    "lines": [
      { "speaker": "Lucas", "en": "Who is this in the photo?", "ptHelp": "Quem é esta na foto?", "register": "casual" },
      { "speaker": "Emma", "en": "This is my mother and my father.", "ptHelp": "Esta é minha mãe e meu pai.", "register": "neutral" },
      { "speaker": "Lucas", "en": "And this girl? Is she your sister?", "ptHelp": "E esta garota? Ela é sua irmã?", "register": "casual" },
      { "speaker": "Emma", "en": "Yes, she is. Her name is Sarah. My father has hotels.", "ptHelp": "Sim, ela é. O nome dela é Sarah. Meu pai tem hotéis.", "register": "neutral" },
      { "speaker": "Lucas", "en": "Wow! My brother works at a hotel too.", "ptHelp": "Uau! Meu irmão trabalha em um hotel também.", "register": "casual" }
    ],
    "listeningMission": "Ouça e anote qual é o nome da irmã de Emma."
  },
  "vocab": [
    { "en": "Mother / Father", "ipa": "/ˈmʌð.ɚ/ /ˈfɑː.ðɚ/", "br": "MÂ-dâr / FÁ-dâr", "ptHelp": "Mãe / Pai", "register": "neutral", "example": "This is my mother.", "recycled": false },
    { "en": "Brother / Sister", "ipa": "/ˈbrʌð.ɚ/ /ˈsɪs.tɚ/", "br": "BRÂ-dâr / SÍS-târ", "ptHelp": "Irmão / Irmã", "register": "neutral", "example": "I have one brother.", "recycled": false },
    { "en": "My / Your", "ipa": "/maɪ/ /jʊr/", "br": "MÁI / IÓR", "ptHelp": "Meu(s) / Seu(s)", "register": "neutral", "example": "My name is Emma.", "recycled": true },
    { "en": "His / Her", "ipa": "/hɪz/ /hɜːr/", "br": "RÍZ / RÂR", "ptHelp": "Dele / Dela", "register": "neutral", "example": "His name is Lucas.", "recycled": false },
    { "en": "Hotel", "ipa": "/hoʊˈtel/", "br": "Rou-TÉL", "ptHelp": "Hotel", "register": "neutral", "example": "My father has hotels.", "recycled": false }
  ],
  "grammar": {
    "rule": "Usamos 'My' (meu), 'Your' (seu), 'His' (dele), 'Her' (dela). Eles vêm SEMPRE antes do substantivo.",
    "pattern": "My father / His name / Her name",
    "traps": [
      { "wrong": "The name of her is Sarah.", "right": "Her name is Sarah.", "why": "Em inglês, o possessivo vem antes. Não usamos 'the name of' para pessoas." },
      { "wrong": "I have 2 brothers.", "right": "I have two brothers.", "why": "Escreva o número por extenso (two) em textos formais." }
    ]
  },
  "pronunciation": {
    "focus": "O plural com 'S' (sons de S, Z e IZ)",
    "mouthTip": "O plural tem 3 sons: 1) 'S' seco (cats). 2) 'Z' (brothers, sisters - vibra). 3) 'IZ' (buses - se já termina com S/Z).",
    "minimalPairs": [["Brothers", "Cats"]]
  },
  "activities": [
    { "type": "match", "prompt": "Relacione as palavras em inglês com a tradução:", "items": ["Mother", "Father", "Brother", "Sister", "Family"], "answerKey": ["Mãe", "Pai", "Irmão", "Irmã", "Família"], "feedbackPt": "O 'th' nessas palavras é o som vibrado." },
    { "type": "fill", "prompt": "Complete com o possessivo correto (my, your, his, her):", "items": ["I am Emma. ___ mother is Jane.", "He is Lucas. ___ father is Mark.", "This is Sarah. ___ brother is David.", "You are a student. Is this ___ book?"], "answerKey": ["My", "His", "Her", "your"], "feedbackPt": "Lembre-se: His = dele, Her = dela." }
  ],
  "roleplay": {
    "setup": "Você está num café em Londres e alguém pergunta sobre a sua família.",
    "npcPersona": "Um colega de trabalho curioso e amigável.",
    "complications": ["A IA confunde os nomes e você precisa corrigir (ex: 'His name is... not her name').", "Ela pergunta sobre a profissão do seu pai/mãe."],
    "successCriteria": ["Dizer quantas pessoas tem na família", "Usar 'His' e 'Her'", "Usar 'My' antes dos substantivos"],
    "starterPrompt": "ROLE-PLAY: Family Talk (CEFR A1)\n\nYou are a friendly coworker asking about my family. I am showing you a photo. My goal is to introduce my family members using possessives.\n\nRULES:\n1. Stay in character. Speak ONLY English at CEFR A1.\n2. Each turn: at most 2 sentences. End with ONE question.\n3. If I write in Portuguese, reply: \"In English, please.\"\n4. I must use possessives (my, his, her).\n5. Run exactly 6 turns.\n\nCOMPLICATIONS:\n- On turn 2, call my brother 'she' and make me correct you.\n- On turn 4, ask about my father's job.\n\nSCORECARD:\n- Mission objectives: done / not done\n- 3 mistakes + corrections\n\nSTART NOW: speak first, in character."
  },
  "culturalPass": {
    "work": "Modern Family", "type": "series", "year": "2009",
    "whyA1": "A série inteira gira em torno de uma família grande e engraçada. As palavras 'mother', 'father' e 'brother' são ditas o tempo todo.",
    "listeningMission": "Assista 2 minutos de qualquer episódio e anote todas as palavras de família que você ouvir."
  }
};