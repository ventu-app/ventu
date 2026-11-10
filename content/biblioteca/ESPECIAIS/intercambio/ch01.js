window.VENTU_CHAPTER = {
  "meta": {
    "level": "ESPECIAL", "volume": "INTERCAMBIO", "chapter": 1,
    "title": "The Host Family Nightmare", "subtitle": "Quando a família te odeia",
    "canDo": [
      "Eu consigo identificar microagressões e rebatê-las na hora.",
      "Eu consigo usar a voz passiva para colocar limites sem gritar.",
      "Eu consigo entender como funciona a burocracia de uma reclamação formal."
    ],
    "estimatedMinutes": 40, "xp": 300,
    "characters": ["Emma", "Host Mom", "Agency Rep"],
    "loreHook": "A host mom de Emma (Sra. Higgins) está claramente tentando fazer Emma desistir do intercâmbio para alugar o quarto para outra pessoa."
  },
  "warmup": {
    "recall": [],
    "hook": "Your host mom locks the kitchen at 8 PM and says: 'You should be grateful, in my country we don't feed strangers.' What do you do?",
    "image_concept": "This is a real story from Reddit. It happens more often than you think. You need to know how to document and report."
  },
  "input": {
    "scene": "The Host Family Kitchen",
    "tone": "Passive-aggressive and hostile.",
    "lines": [
      { "speaker": "Host Mom", "en": "I see you're eating again. The groceries here are quite expensive, you know. Not everyone can afford to feed an extra mouth.", "register": "passive-aggressive" },
      { "speaker": "Emma", "en": "I pay rent, Mrs. Higgins. The contract clearly states that three meals a day are included.", "register": "formal" },
      { "speaker": "Host Mom", "en": "Well, in my house, we don't talk about money. It's rude. I'm just saying, maybe you should lose some weight anyway.", "register": "passive-aggressive" },
      { "speaker": "Emma", "en": "That comment is completely inappropriate. I am documenting this conversation and sending it to the agency.", "register": "neutral" },
      { "speaker": "Host Mom", "en": "Go ahead. They won't believe you. You're just a spoiled foreigner who can't speak proper English.", "register": "passive-aggressive" },
      { "speaker": "Emma", "en": "I am not a foreigner in this house, I am a client. And my English is good enough to file a formal complaint.", "register": "neutral" }
    ]
  },
  "vocab": [
    { "en": "Microaggression", "ipa": "/ˈmaɪ.kroʊ.əˌɡreʃ.ən/", "br": "MÁI-krô â-GRÉ-chân", "ptHelp": "Microagressão", "register": "formal", "example": "That comment is a microaggression.", "recycled": false },
    { "en": "To document", "ipa": "/ˈdɑː.kjə.ment/", "br": "DÓ-kiu-mânt", "ptHelp": "Documentar / Registrar", "register": "formal", "example": "I am documenting this incident.", "recycled": false },
    { "en": "Formal complaint", "ipa": "/ˈfɔːr.məl kəmˈpleɪnt/", "br": "FÓR-mâl kâm-PLÊINT", "ptHelp": "Reclamação formal", "register": "formal", "example": "I will file a formal complaint.", "recycled": false },
    { "en": "To be included", "ipa": "/tu bi ɪnˈkluː.dɪd/", "br": "tu bi in-KLÚ-ded", "ptHelp": "Estar incluso", "register": "formal", "example": "Three meals are included.", "recycled": false },
    { "en": "Inappropriate", "ipa": "/ˌɪn.əˈproʊ.pri.ət/", "br": "in-â-PRÔU-pri-ât", "ptHelp": "Inapropriado", "register": "formal", "example": "That comment is inappropriate.", "recycled": false }
  ],
  "grammar": {
    "focus": "Passive Voice for Boundaries",
    "rule": "When someone attacks you, use the passive voice to detach emotion. Instead of 'You are lying', say 'The contract clearly states that...'. It sounds more professional.",
    "examples": [
      "The contract states that meals are included.",
      "This incident is being documented.",
      "These rules were not agreed upon."
    ],
    "brazilianTraps": [
      { "wrong": "You are very rude.", "right": "That behavior is unacceptable.", "why": "Criticize the behavior, not the person." },
      { "wrong": "I will tell the agency.", "right": "A formal complaint will be filed.", "why": "Passive voice sounds colder and more threatening." }
    ]
  },
  "pronunciation": {
    "focus": "The 'Stiff Upper Lip' Tone",
    "explanation": "In English, when you are angry in a formal setting, you speak LOWER and SLOWER. The 'Stiff Upper Lip' (British style) means you don't show emotion. Keep your voice flat.",
    "minimalPairs": [["I am angry.", "I am filing a complaint."]]
  },
  "activities": [
    {
      "type": "reading",
      "instruction": "VIRAL REDDIT POST: r/studyabroad",
      "items": [
        "User <b>@LostInLondon</b> posted:",
        "<div style='background:#1a1a1b; color:#d7dadc; border-radius:8px; padding:16px; font-family:sans-serif; margin-top:10px; border:1px solid #343536;'>",
        "<div style='font-size:0.8rem; color:#818384;'>Posted by u/LostInLondon • 4h</div>",
        "<div style='font-size:1.2rem; font-weight:bold; margin:8px 0;'>My host mom locked the fridge and said I should 'learn to starve like the rest of the world'.</div>",
        "<div style='font-size:0.9rem;'>I called my agency. They said they will move me to a new family. Don't let them gaslight you. DOCUMENT EVERYTHING.</div>",
        "</div>"
      ],
      "feedback": "This is why you must always read your contract. The agency handles these cases if you have proof."
    },
    {
      "type": "gap",
      "instruction": "Formal Complaint Language:",
      "items": [
        "This incident is being ___. (documented)",
        "I will file a formal ___. (complaint)",
        "That behavior is ___. (unacceptable)"
      ],
      "answerKey": ["documented", "complaint", "unacceptable"]
    }
  ],
  "roleplay": {
    "setup": "You are confronting your Host Mom (the AI) in front of the Agency Representative.",
    "npcPersona": "Mrs. Higgins, a passive-aggressive woman who plays the victim.",
    "complications": [
      "The AI will cry and say you are 'attacking' her culture.",
      "If you get emotional, the AI will use it against you."
    ],
    "successCriteria": [
      "Stay completely calm.",
      "Use the passive voice (The contract states...).",
      "Demand a formal resolution."
    ],
    "promptText": "ROLE-PLAY: Host Family Intervention (CEFR B2/C1)\n\nYou are Mrs. Higgins, a passive-aggressive host mom. I am an exchange student, and there is an agency representative listening. My goal is to confront you about your behavior using formal language and passive voice, without losing my temper.\n\nRULES:\n1. Stay in character. Speak ONLY English at CEFR B2/C1.\n2. Each turn: at most 3 sentences. End with ONE defensive question.\n3. If I write in Portuguese, reply: \"In English, please.\"\n4. I must use passive voice (The contract states... / It is unacceptable...).\n5. Run exactly 8 turns.\n\nCOMPLICATIONS:\n- On turn 1, deny everything and say I am lying.\n- On turn 3, cry and say I am being racist against her culture.\n\nSCORECARD:\n- Mission objectives: done / not done\n- 3 mistakes + corrections\n\nSTART NOW: speak first, in character."
  },
  "culturalPass": {
    "series": {
      "title": "The Chair",
      "year": "2021",
      "creator": "Amanda Peet",
      "genre": "Comedy/Drama",
      "difficulty": 3,
      "why": "A série mostra como o ambiente acadêmico lida com microagressões, política e 'cancelamento'.",
      "listeningMission": "Assista ao primeiro episódio e anote como os alunos justificam suas reclamações sobre a professora."
    }
  }
};