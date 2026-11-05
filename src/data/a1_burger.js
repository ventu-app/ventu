const gameDataA1 = {
  level: "a1",
  title: "Burger Palace: A Noite do Caos",
  characters: {
    emma: {
      charId: "emma",
      name: "Emma",
      role: "Entregadora",
      emoji: "👩",
      subtitle: "A Entrega",
      description: "Chuva, GPS morrendo, cliente furioso. Sobreviva ao caos.",
      initialState: { energy: 100 },
      startScene: "emma_01",
      scenes: {
        emma_01: {
          npcName: "Mr. Silva",
          npcText: "Hey, Emma! Ten orders are waiting. Take this bag to 41 Main Street. Now! Lucas paid for a cheeseburger and fries. Don't be late.",
          energyCost: 5,
          glossary: [
            { word: "Street", meaning: "Rua", phonetic: "/striːt/" },
            { word: "Late", meaning: "Atrasada", phonetic: "/leɪt/" }
          ],
          phoneme_trap: {
            target: "on my way",
            confusions: ["in the way"],
            npc_on_confusion: "In the way?! You are blocking the door! Just say 'I am on my way' and go!"
          },
          choices: [
            {
              registry: "formal",
              text: "Yes, sir. I am on my way right now.",
              keywords: ["yes", "sir", "on my way", "understood", "immediately"],
              response: "Cool. It's raining. Take the bag and go.",
              nextScene: "emma_02",
              trust: 10,
              lens: {
                good: "Professional and direct. 'Sir' shows respect.",
                odd: "Maybe a bit too formal for a burger place, but safe.",
                native: "Right away, boss."
              }
            },
            {
              registry: "neutral",
              text: "Okay, I'll go right away.",
              keywords: ["okay", "right away", "going", "sure"],
              response: "Great. It's raining hard. Be careful.",
              nextScene: "emma_02",
              trust: 5,
              lens: {
                good: "Simple and clear. Shows you are listening.",
                odd: "Missing a bit of urgency, but it works.",
                native: "Okay, I'm on it."
              }
            },
            {
              registry: "casual",
              text: "Yeah, I'm on it.",
              keywords: ["yeah", "on it", "yep"],
              response: "No time to chat! Go, go!",
              nextScene: "emma_02",
              rizz: 5,
              lens: {
                good: "'On it' is a great casual phrase for work.",
                odd: "Too relaxed when the boss is stressed.",
                native: "Got it, boss."
              }
            }
          ]
        },
        emma_02: {
          npcName: "Narração",
          npcText: "You grab the bag and step outside. The rain is freezing. The address is 41 Main Street, but your phone battery is at 12%. You are lost in the dark street.",
          glossary: [
            { word: "Rain", meaning: "Chuva", phonetic: "/reɪn/" },
            { word: "Lost", meaning: "Perdida", phonetic: "/lɒst/" }
          ],
          choices: [
            {
              registry: "formal",
              text: "Excuse me, madam. Could you tell me how to get to Main Street?",
              keywords: ["excuse me", "where is", "how do i", "directions", "get to"],
              response: "You ask a lady with an umbrella. She smiles: 'Go straight for two blocks, then turn left. It's next to the park.'",
              nextScene: "emma_03",
              trust: 10,
              rizz: 5,
              lens: {
                good: "Perfect. 'Excuse me' and 'Could you' are polite and natural.",
                odd: "Nothing wrong here. This is exactly how natives ask for directions.",
                native: "Excuse me, how do I get to Main Street?"
              }
            },
            {
              registry: "neutral",
              text: "I'll just check my GPS app.",
              keywords: ["gps", "phone", "map", "app", "check"],
              response: "You open your GPS. It says 10 minutes walking, but your screen goes black. Your battery died. You have to ask someone.",
              nextScene: "emma_03",
              lens: {
                good: "Practical solution. Technology saves time.",
                odd: "Risky with 12% battery. And it didn't work.",
                native: "I'll check the map."
              }
            },
            {
              registry: "casual",
              text: "Hey, where is Main Street?",
              keywords: ["hey", "where", "quick question"],
              response: "You ask a man running with a dog. He points quickly: 'Two blocks that way!' and runs away.",
              nextScene: "emma_03",
              trust: 5,
              lens: {
                good: "Direct, and you got the information.",
                odd: "Starting with 'Hey' to a stranger is a bit rude.",
                native: "Sorry to bother you, where is Main Street?"
              }
            }
          ]
        },
        emma_03: {
          npcName: "Narração",
          npcText: "You follow the directions and finally arrive at the house. You are soaking wet. You knock on the door. Lucas opens it.",
          choices: [
            {
              registry: "formal",
              text: "Hello, sir. Here is your cheeseburger and fries.",
              keywords: ["hello", "sir", "cheeseburger", "fries"],
              response: "He takes the bag. 'Great. But wait...' He looks inside. 'I asked for no onions. Did you bring it with onions?'",
              nextScene: "emma_04",
              trust: 10,
              lens: { good: "Clear and polite.", odd: "A bit robotic, but safe.", native: "Here's your order, sir." },
              responseVariants: [
                {
                  ifFlag: "a1_silva_caught_onion",
                  text: "He takes the bag. 'Finally.' He touches it. 'It's cold. Forty-five minutes, and it's cold?'"
                }
              ]
            },
            {
              registry: "neutral",
              text: "Yeah, here is your food.",
              keywords: ["yeah", "food", "here"],
              response: "He takes the bag. 'Great. But wait...' He looks inside. 'I asked for no onions. Did you bring it with onions?'",
              nextScene: "emma_04",
              trust: 5,
              lens: {
                good: "Simple and direct.",
                odd: "Calling it just 'food' feels a bit impersonal.",
                native: "Here's your cheeseburger."
              },
              responseVariants: [
                {
                  ifFlag: "a1_silva_caught_onion",
                  text: "He takes the bag. 'Finally.' He touches it. 'It's cold. Forty-five minutes, and it's cold?'"
                }
              ]
            },
            {
              registry: "casual",
              text: "Finally! Here it is, dude.",
              keywords: ["dude", "bro", "man", "here it is", "finally"],
              response: "Lucas looks at you surprised: 'Whoa, chill. I just wanted my food.' He opens the bag and frowns. 'I said no onions!'",
              nextScene: "emma_04",
              trust: -5,
              rizz: 10,
              lens: {
                good: "'Dude' creates a casual vibe.",
                odd: "Using 'dude' with a hungry, angry customer is a bad idea.",
                native: "Here you go."
              },
              responseVariants: [
                {
                  ifFlag: "a1_silva_caught_onion",
                  text: "Lucas looks at you surprised: 'Whoa, chill. I just wanted my food.' He opens the bag and frowns. 'It's cold!'"
                }
              ]
            }
          ],
          addFlags: ["a1_emma_met_lucas"]
        },
        emma_04: {
          npcName: "Lucas",
          npcText: "I hate onions! I can't eat this. What are you going to do about it?",
          energyCost: 5,
          glossary: [
            { word: "Hate", meaning: "Odeio", phonetic: "/heɪt/" },
            { word: "Onions", meaning: "Cebolas", phonetic: "/ˈʌnjənz/" }
          ],
          subtext: {
            question: "What does Lucas really mean?",
            options: [
              { text: "He is just hungry.", correct: false },
              {
                text: "He is angry and blaming you for the mistake.",
                correct: true,
                tell: ["I hate onions", "What are you going to do"]
              }
            ]
          },
          choices: [
            {
              registry: "formal",
              text: "I sincerely apologize, sir. Let me get you a new one immediately.",
              keywords: ["apologize", "sir", "new one", "immediately", "sorry"],
              response: "He sighs. 'Yes! Please. A new one. No onions this time.'",
              nextScene: "emma_05",
              addsFlags: ["a1_emma_apologized"],
              trust: 10,
              rizz: 5,
              lens: {
                good: "Takes responsibility and offers a solution instantly.",
                odd: "Very formal, but it calms the customer down.",
                native: "I'm so sorry, let me fix that for you."
              },
              responseVariants: [
                { ifFlag: "a1_silva_caught_onion", text: "He sighs. 'Yes! Please. A new one. Hot, this time.'" }
              ]
            },
            {
              registry: "neutral",
              text: "I'm sorry. I will fix it and bring another one.",
              keywords: ["sorry", "fix", "another", "mistake"],
              response: "'Okay. But I'm still hungry. Hurry up.'",
              nextScene: "emma_05",
              addsFlags: ["a1_emma_apologized"],
              trust: 5,
              lens: { good: "Honest and clear.", odd: "Doesn't sound very urgent.", native: "Sorry about that, I'll get a fresh one." }
            },
            {
              registry: "casual",
              text: "My bad, man. I'll grab you a fresh one.",
              keywords: ["my bad", "dude", "man", "fresh one"],
              response: "'Fine. Just go get it.'",
              nextScene: "emma_05",
              addsFlags: ["a1_emma_apologized"],
              rizz: 5,
              lens: {
                good: "'My bad' is very natural English.",
                odd: "Too casual for a paying, angry customer.",
                native: "My mistake, I'll get you a new one right away."
              }
            }
          ],
          npcTextVariants: [
            {
              ifFlag: "a1_silva_caught_onion",
              text: "It's cold! I waited forty-five minutes and the food is cold. What are you going to do about it?"
            }
          ],
          glossaryVariants: [
            {
              ifFlag: "a1_silva_caught_onion",
              glossary: [
                { word: "Cold", meaning: "Frio", phonetic: "/koʊld/" },
                { word: "Waited", meaning: "Esperei", phonetic: "/ˈweɪtɪd/" }
              ]
            }
          ],
          subtextVariants: [
            {
              ifFlag: "a1_silva_caught_onion",
              subtext: {
                question: "What does Lucas really mean?",
                options: [
                  { text: "He is just hungry.", correct: false },
                  {
                    text: "He is angry and blaming you for the delay.",
                    correct: true,
                    tell: ["forty-five minutes", "What are you going to do"]
                  }
                ]
              }
            }
          ]
        },
        emma_05: {
          npcName: "Lucas",
          npcText: "Fine. I'll wait 10 minutes. But if it's cold, I'm giving a bad review on the app.",
          energyCost: 5,
          glossary: [
            { word: "Wait", meaning: "Esperar", phonetic: "/weɪt/" },
            { word: "Review", meaning: "Avaliação", phonetic: "/rɪˈvjuː/" }
          ],
          choices: [
            {
              registry: "formal",
              text: "I promise I will be quick, sir. It will be hot.",
              keywords: ["promise", "quick", "hot", "soon", "sir"],
              response: "You turn around and run back into the rain.",
              nextScene: "emma_06",
              trust: 10,
              rizz: 2,
              lens: {
                good: "Reassures the customer and shows commitment.",
                odd: "A bit formal, but good for a serious situation.",
                native: "I promise I'll be right back with a hot one."
              }
            },
            {
              registry: "neutral",
              text: "I'll be back in 5 minutes.",
              keywords: ["back", "minutes", "fast", "soon"],
              response: "You turn around and run back into the rain.",
              nextScene: "emma_06",
              trust: 5,
              lens: { good: "Sets a clear expectation.", odd: "Simple, but it works.", native: "Five minutes, I'll be right back." }
            },
            {
              registry: "casual",
              text: "Don't worry, I'll run!",
              keywords: ["run", "worry", "dont worry"],
              response: "You turn around and run back into the rain.",
              nextScene: "emma_06",
              rizz: 5,
              lens: { good: "'I'll run' shows energy and action.", odd: "Slightly informal.", native: "Don't worry, I'll run!" }
            }
          ]
        },
        emma_06: {
          npcName: "Narração",
          npcText: "You arrive at the Burger Palace, soaking wet. The rain is worse. You see Davi, the cook, leaving the store looking angry. You go inside.",
          addFlags: ["a1_emma_saw_davi_leave"],
          glossary: [
            { word: "Cook", meaning: "Cozinheiro", phonetic: "/kʊk/" },
            { word: "Leaving", meaning: "Saindo", phonetic: "/ˈliːvɪŋ/" }
          ],
          choices: [
            {
              registry: "formal",
              text: "Mr. Silva, is everything okay? I saw Davi leaving.",
              keywords: ["davi", "okay", "why", "happened", "leaving"],
              response: "Mr. Silva looks stressed: 'Don't ask. Davi quit. I have no cook. I will make the burger myself. Wait here.'",
              nextScene: "emma_07",
              trust: 5,
              lens: {
                good: "Shows concern for the team.",
                odd: "Asking questions when the boss is in crisis mode.",
                native: "Is everything alright, boss?"
              }
            },
            {
              registry: "neutral",
              text: "Okay, I'll wait.",
              keywords: ["okay", "wait", "fine", "sure"],
              response: "You wait, wet and cold. Mr. Silva goes to the kitchen and comes back with a burger. 'Here. Go. Fast.'",
              nextScene: "emma_07",
              trust: 10,
              lens: {
                good: "Smart. You read the room and didn't add stress.",
                odd: "Nothing wrong. Sometimes silence is best.",
                native: "I'll wait right here."
              }
            },
            {
              registry: "casual",
              text: "What's up with Davi? He looked mad.",
              keywords: ["whats up", "mad", "davi", "looked"],
              response: "Mr. Silva snaps: 'Not now, Emma! Just wait!' You wait in silence.",
              nextScene: "emma_07",
              trust: -5,
              lens: {
                good: "'What's up' is a great casual phrase.",
                odd: "Bad timing. The manager is losing his mind.",
                native: "Is Davi okay?"
              }
            }
          ]
        },
        emma_07: {
          npcName: "Narração",
          npcText: "You grab the new burger and run back to Lucas's house. You are soaked. The burger is warm, but not hot. You knock on the door.",
          glossary: [
            { word: "Soaked", meaning: "Encharcada", phonetic: "/soʊkt/" },
            { word: "Warm", meaning: "Morno", phonetic: "/wɔːrm/" }
          ],
          choices: [
            {
              registry: "formal",
              text: "Here is your new burger, sir. I apologize for the wait.",
              keywords: ["here", "apologize", "sir", "wait", "sorry"],
              response: "Lucas opens the door. He looks at you, then at the bag. 'You came back. I didn't think you would.'",
              nextScene: "emma_08",
              trust: 10,
              rizz: 5,
              lens: {
                good: "Perfect customer service.",
                odd: "Maybe too formal for a delivery, but very polite.",
                native: "Sorry to keep you waiting. Here's your burger."
              }
            },
            {
              registry: "neutral",
              text: "Here is your order.",
              keywords: ["here", "order", "food"],
              response: "Lucas opens the door. He looks at you, then at the bag. 'You came back. I didn't think you would.'",
              nextScene: "emma_08",
              trust: 5,
              lens: { good: "Direct and simple.", odd: "No apology, but you delivered the food.", native: "Here you go." }
            },
            {
              registry: "casual",
              text: "Here you go, man. Sorry for the wait.",
              keywords: ["here you go", "man", "sorry"],
              response: "Lucas opens the door. He looks at you, then at the bag. 'You came back. I didn't think you would.'",
              nextScene: "emma_08",
              trust: 5,
              rizz: 5,
              lens: {
                good: "'Here you go' is the most natural phrase in English.",
                odd: "Calling him 'man' after he got mad might be risky.",
                native: "Here you go, sorry about that."
              }
            }
          ]
        },
        emma_08: {
          npcName: "Lucas",
          npcText: "Let me see. (He opens the bag.) No onions this time. Good. But it's a little cold.",
          npcTextVariants: [
            {
              ifFlag: "a1_silva_caught_onion",
              text: "Let me see. (He opens the bag.) It's warm. Good enough. But I waited a very long time."
            },
            {
              ifFlag: "a1_lucas_knows_davi_quit",
              text: "Let me see. (He opens the bag.) Good. (He pauses.) I heard Davi quit. This is not your fault. Thank you for coming back."
            }
          ],
          energyCost: 5,
          glossary: [
            { word: "Cold", meaning: "Frio", phonetic: "/koʊld/" },
            { word: "Quit", meaning: "Pediu demissão", phonetic: "/kwɪt/" }
          ],
          choices: [
            {
              registry: "formal",
              text: "I'm sorry, sir. The rain was terrible and the kitchen had a problem.",
              keywords: ["sorry", "rain", "problem", "kitchen", "sir"],
              response: "It's okay. You came back in the rain. That counts. Here — keep the change.",
              nextScene: "emma_end_good",
              addsFlags: ["a1_emma_delivered", "a1_emma_got_tip"],
              trust: 10,
              rizz: 5,
              lens: {
                good: "Honest and explains the situation without making excuses.",
                odd: "A bit too detailed, but it works.",
                native: "I'm sorry, it's a bit cold. The rain was terrible."
              }
            },
            {
              registry: "neutral",
              text: "I know. I'm sorry, I ran as fast as I could.",
              keywords: ["know", "sorry", "ran", "fast"],
              response: "It's okay. You came back in the rain. That counts. Here — keep the change.",
              nextScene: "emma_end_good",
              addsFlags: ["a1_emma_delivered", "a1_emma_got_tip"],
              trust: 5,
              lens: { good: "Shows effort.", odd: "Simple.", native: "I know, sorry. I ran as fast as I could." }
            },
            {
              registry: "casual",
              text: "Yeah, my bad. The rain is crazy.",
              keywords: ["my bad", "crazy", "rain"],
              response: "Lucas laughs a little. 'Yeah, it is. Thanks for coming back.'",
              nextScene: "emma_end_ok",
              addsFlags: ["a1_emma_delivered"],
              rizz: 5,
              lens: {
                good: "'The rain is crazy' is a very natural small talk phrase.",
                odd: "You didn't really apologize for the cold food.",
                native: "Yeah, I know. The weather is insane tonight."
              }
            }
          ]
        },
        emma_end_good: {
          npcName: "Narração",
          npcText: "Lucas gives you a $5 tip. You walk back in the rain, but you feel lighter. Mr. Silva sees the tip and nods. 'Good job, Emma.'",
          addFlags: ["a1_emma_delivered", "a1_emma_got_tip", "a1_emma_completed"],
          glossary: [
            { word: "Tip", meaning: "Gorjeta", phonetic: "/tɪp/" },
            { word: "Job", meaning: "Trabalho", phonetic: "/dʒɑːb/" }
          ],
          isEnd: true,
          endingType: "bom"
        },
        emma_end_ok: {
          npcName: "Narração",
          npcText: "Lucas closes the door. No tip, no smile — but no bad review either. You go back to the Burger Palace. Mr. Silva says nothing. The night ends.",
          addFlags: ["a1_emma_delivered", "a1_emma_completed"],
          isEnd: true,
          endingType: "ok"
        }
      }
    },
    silva: {
      charId: "silva",
      name: "Mr. Silva",
      role: "Gerente",
      emoji: "👨‍💼",
      subtitle: "O Turno",
      description: "Caixa quebrado, cozinheiro surtado, cliente furioso. Gerencie o caos.",
      initialState: { energy: 100 },
      startScene: "silva_01",
      scenes: {
        silva_01: {
          npcName: "Narração",
          npcText: "6 PM, Burger Palace. The POS system freezes. A line of 6 customers. Davi, the cook, is 15 minutes late.",
          energyCost: 5,
          glossary: [
            { word: "Freeze", meaning: "Travar", phonetic: "/friːz/" },
            { word: "Late", meaning: "Atrasado", phonetic: "/leɪt/" }
          ],
          choices: [
            {
              registry: "formal",
              text: "I will call Davi immediately and then reboot the system.",
              keywords: ["call", "davi", "reboot", "system", "immediately"],
              response: "You call Davi. He answers: 'I'm coming, boss.' You reboot the POS. It works.",
              nextScene: "silva_02",
              trust: 10,
              lens: {
                good: "Great management. Delegating and solving the tech issue.",
                odd: "A bit robotic.",
                native: "I'll call Davi and reboot the system."
              }
            },
            {
              registry: "neutral",
              text: "I'll reboot the POS first.",
              keywords: ["reboot", "pos", "system", "fix"],
              response: "You reboot the POS. It works. The line moves.",
              nextScene: "silva_02",
              trust: 5,
              lens: { good: "Solving the biggest problem first.", odd: "You forgot about the cook.", native: "Let me restart the system." }
            },
            {
              registry: "casual",
              text: "Where the hell is Davi?",
              keywords: ["where", "davi", "hell", "late"],
              response: "You call Davi. He is late and doesn't answer. The line gets bigger.",
              nextScene: "silva_02",
              trust: -5,
              lens: {
                good: "'Where the hell' is a real expression of frustration.",
                odd: "Complaining doesn't solve the problem.",
                native: "Where is Davi?"
              }
            }
          ]
        },
        silva_02: {
          npcName: "Narração",
          npcText: "The line finally moves. Then the phone rings. You pick it up.",
          choices: [
            {
              registry: "neutral",
              text: "[Answer the phone]",
              keywords: ["answer", "phone", "hello"],
              response: "You pick up the phone.",
              nextScene: "silva_03"
            }
          ]
        },
        silva_03: {
          npcName: "Lucas",
          npcText: "Hey, I ordered a cheeseburger and fries. No onions, please. I'm at 41 Main Street. Can you deliver it fast? I'm starving, dude.",
          addFlags: ["a1_silva_knows_lucas"],
          energyCost: 5,
          glossary: [
            { word: "No onions", meaning: "Sem cebola", phonetic: "/noʊ ˈʌnjənz/" },
            { word: "Fast", meaning: "Rápido", phonetic: "/fæst/" }
          ],
          choices: [
            {
              registry: "formal",
              text: "Yes, sir. No onions. 41 Main Street. I will send it immediately.",
              keywords: ["yes", "no onions", "main street", "sir", "immediately"],
              response: "Great. Thanks. 41 Main Street.",
              nextScene: "silva_04",
              trust: 10,
              rizz: 5,
              lens: {
                good: "Repeating the order back is excellent customer service.",
                odd: "Very professional.",
                native: "Got it, no onions. 41 Main Street."
              }
            },
            {
              registry: "neutral",
              text: "Got it. 41 Main Street.",
              keywords: ["got it", "main street", "okay"],
              response: "Great. Thanks.",
              nextScene: "silva_04",
              addsFlags: ["a1_silva_forgot_no_onions"],
              lens: {
                good: "You confirmed the address.",
                odd: "You ignored the most important detail: 'no onions'.",
                native: "Okay, 41 Main Street."
              }
            },
            {
              registry: "casual",
              text: "Yeah, we'll be there. Chill.",
              keywords: ["yeah", "chill", "we will"],
              response: "Okay... just hurry up.",
              nextScene: "silva_04",
              addsFlags: ["a1_silva_forgot_no_onions"],
              trust: -5,
              rizz: -5,
              lens: {
                good: "'Chill' is a good casual word.",
                odd: "Telling a hungry customer to 'chill' is terrible service.",
                native: "Yes, we'll get it to you as soon as possible."
              }
            }
          ]
        },
        silva_04: {
          npcName: "Narração",
          npcText: "Davi finally arrives. He brings the bag.",
          choices: [
            {
              registry: "neutral",
              text: "[Talk to Davi]",
              keywords: ["talk", "davi"],
              response: "You walk over to Davi.",
              nextScene: "silva_05"
            }
          ]
        },
        silva_05: {
          npcName: "Davi",
          npcText: "Boss, I'm here. The burger is ready. Here's the bag for 41 Main Street.",
          energyCost: 5,
          glossary: [
            { word: "Bag", meaning: "Sacola", phonetic: "/bæɡ/" }
          ],
          npcTextVariants: [
            {
              ifFlag: "a1_emma_met_lucas",
              text: "Boss, I'm here. The burger is ready. Here's the bag. (Something feels off. Maybe you should check it before it leaves.)"
            }
          ],
          subtext: {
            question: "What is Davi doing?",
            options: [
              { text: "He is just doing his job.", correct: false },
              { text: "He is trying to hide a mistake.", correct: true, tell: ["Something feels off", "You will regret this"] }
            ]
          },
          choices: [
            {
              registry: "formal",
              text: "Let me check the bag before you go, Davi.",
              keywords: ["check", "bag", "onion", "open", "verify"],
              response: "You open the bag. Onions. Davi forgot. 'Davi! Remake this. No onions!' He groans but does it.",
              nextScene: "silva_06",
              addsFlags: ["a1_silva_caught_onion"],
              trust: 15,
              rizz: 5,
              lens: {
                good: "'Let me check' saved the night. Great management.",
                odd: "You lose 5 minutes, but you save the order.",
                native: "Let me check the bag real quick."
              }
            },
            {
              registry: "neutral",
              text: "Okay, thanks Davi. Tell Emma to take it.",
              keywords: ["okay", "thanks", "emma", "deliver"],
              response: "You call Emma. 'Emma! Take this bag to 41 Main Street. Now.'",
              nextScene: "silva_06",
              lens: { good: "You delegated the delivery.", odd: "You trusted the bag without checking.", native: "Okay, thanks Davi." },
              addsFlags: ["a1_silva_skipped_onion_check"]
            },
            {
              registry: "casual",
              text: "Just give it to Emma, let's go.",
              keywords: ["emma", "go", "give"],
              response: "You call Emma. 'Take this bag. Go fast.'",
              nextScene: "silva_06",
              trust: -5,
              lens: { good: "Fast decision.", odd: "Too rushed. You are skipping quality control.", native: "Give it to Emma, let's go." },
              addsFlags: ["a1_silva_skipped_onion_check"]
            }
          ]
        },
        silva_06: {
          npcName: "Narração",
          npcText: "Emma takes the bag and leaves in the rain. You go back to the counter. A customer is furious.",
          choices: [
            {
              registry: "neutral",
              text: "[Go to the counter]",
              keywords: ["counter", "go"],
              response: "You walk to the counter.",
              nextScene: "silva_07"
            }
          ]
        },
        silva_07: {
          npcName: "Cliente furioso",
          npcText: "Hey! I've been waiting 20 minutes! Is this place a joke?",
          energyCost: 5,
          glossary: [
            { word: "Waiting", meaning: "Esperando", phonetic: "/ˈweɪtɪŋ/" },
            { word: "Joke", meaning: "Piada", phonetic: "/dʒoʊk/" }
          ],
          choices: [
            {
              registry: "formal",
              text: "I sincerely apologize, sir. The drink is on the house.",
              keywords: ["apologize", "sorry", "on the house", "free", "sir"],
              response: "Fine. But hurry up. (You give him a free drink. He calms down.)",
              nextScene: "silva_08",
              trust: 15,
              rizz: 5,
              lens: {
                good: "'On the house' is the perfect phrase to calm a customer.",
                odd: "You lose a little money, but keep the customer.",
                native: "The drink is on the house, sir."
              }
            },
            {
              registry: "neutral",
              text: "Sorry for the wait. One moment, please.",
              keywords: ["sorry", "wait", "moment", "please"],
              response: "Okay, okay. But fast!",
              nextScene: "silva_08",
              trust: 5,
              lens: {
                good: "Polite and buys you time.",
                odd: "Doesn't offer a real solution.",
                native: "One moment please, I'm fixing it."
              }
            },
            {
              registry: "casual",
              text: "Calm down, man. We are doing our best.",
              keywords: ["calm", "man", "best"],
              response: "The customer gets even angrier: 'Don't tell me to calm down!'",
              nextScene: "silva_08",
              trust: -10,
              rizz: -5,
              lens: {
                good: "You are trying to defuse the tension.",
                odd: "Telling an angry person to 'calm down' never works.",
                native: "I understand you're frustrated, let me help."
              }
            }
          ]
        },
        silva_08: {
          npcName: "Narração",
          npcText: "The phone rings again. It's Lucas.",
          choices: [
            {
              registry: "neutral",
              text: "[Answer the phone]",
              keywords: ["answer", "phone"],
              response: "You pick up the phone.",
              nextScene: "silva_09"
            }
          ]
        },
        silva_09: {
          npcName: "Lucas",
          npcText: "Hey! I'm calling about my order. There are onions in my burger! I said NO onions!",
          npcTextVariants: [
            {
  ifFlag: "a1_silva_caught_onion",
  text: "Hey! Where is my food? The app says it's still 15 minutes away. I'm starving!"
}
          ],
          energyCost: 5,
          glossary: [
            { word: "Order", meaning: "Pedido", phonetic: "/ˈɔːrdər/" }
          ],
          choices: [
            {
              registry: "formal",
              text: "I apologize for the mistake, sir. I will send a new one immediately.",
              keywords: ["apologize", "mistake", "new one", "send", "sir"],
              response: "Okay. Send a new one. Fast. I'm still hungry.",
              nextScene: "silva_10",
              trust: 10,
              lens: {
                good: "Takes responsibility and acts.",
                odd: "Very professional.",
                native: "I'm so sorry, I'll send a new one right away."
              },
              ifNotFlag: "a1_silva_caught_onion"
            },
            {
              registry: "neutral",
              text: "Sorry about that. Let me check what happened.",
              keywords: ["sorry", "check", "happened"],
              response: "Yes, please check! And send a new one!",
              nextScene: "silva_10",
              trust: 5,
              rizz: 5,
              lens: {
                good: "'Let me check' shows you want to control the damage.",
                odd: "You are losing time.",
                native: "Let me check on that for you."
              },
              ifNotFlag: "a1_silva_caught_onion"
            },
            {
              registry: "casual",
              text: "Are you sure? Davi never makes mistakes.",
              keywords: ["sure", "davi", "mistake"],
              response: "Lucas yells: 'Are you calling me a liar?!'",
              nextScene: "silva_10",
              trust: -15,
              rizz: -10,
              lens: {
                good: "You trust your employee.",
                odd: "Never argue with a customer about their food.",
                native: "I'm sorry about that, I'll fix it."
              },
              ifNotFlag: "a1_silva_caught_onion"
            },
            {
              ifFlag: "a1_silva_caught_onion",
              registry: "formal",
              text: "I apologize for the delay, sir. Your order will arrive in fifteen minutes.",
              keywords: ["apologize", "delay", "fifteen", "arrive", "sir"],
              response: "Fifteen minutes? Okay. But please hurry. I'm starving.",
              nextScene: "silva_10",
              trust: 10,
              lens: {
                good: "Polite and honest. You give a clear time.",
                odd: "A little stiff, but perfect for a customer call.",
                native: "Sorry for the wait. It'll be there in fifteen minutes."
              }
            },
            {
              ifFlag: "a1_silva_caught_onion",
              registry: "neutral",
              text: "Sorry about that. Let me check on your order.",
              keywords: ["sorry", "check", "order", "wait"],
              response: "Yes, please check. I've been waiting a long time.",
              nextScene: "silva_10",
              trust: 5,
              lens: {
                good: "Short, polite and you promise an action.",
                odd: "'Let me check' alone does not give him a time.",
                native: "Sorry about that. Let me look into it."
              }
            },
            {
              ifFlag: "a1_silva_caught_onion",
              registry: "casual",
              text: "Hey, it's on the way. Chill out, man.",
              keywords: ["hey", "chill", "relax", "on the way"],
              response: "Lucas yells: 'Don't tell me to chill! I'm starving!'",
              nextScene: "silva_10",
              trust: -5,
              rizz: 5,
              lens: {
                good: "'It's on the way' gives real information.",
                odd: "Telling an angry customer to 'chill out' makes things worse.",
                native: "It's on the way. I'm really sorry for the wait."
              }
            }
          ]
        },
        silva_10: {
          npcName: "Narração",
          npcText: "Davi walks out of the kitchen. He takes off his apron and walks towards the door. He looks exhausted.",
          choices: [
            {
              registry: "neutral",
              text: "[Stop Davi]",
              keywords: ["stop", "davi", "wait"],
              response: "You step in front of the door.",
              nextScene: "silva_11"
            }
          ]
        },
        silva_11: {
          npcName: "Davi",
          npcText: "Boss — I'm done. This place is chaos. I quit. Here's my apron. Good luck.",
          addFlags: ["a1_silva_heard_davi_quit"],
          energyCost: 5,
          glossary: [
            { word: "Apron", meaning: "Avental", phonetic: "/ˈeɪprən/" }
          ],
          npcTextVariants: [
            {
              ifFlag: "a1_lucas_knows_davi_quit",
              text: "Boss — I'm done. This place is chaos. I quit. (Davi is Lucas's roommate. If you knew, you would understand why Lucas is so angry.)"
            }
          ],
          choices: [
            {
              registry: "formal",
              text: "Wait, Davi. Let's talk about this. I can offer you a raise.",
              keywords: ["wait", "talk", "raise", "offer", "money"],
              response: "No. I'm sorry, boss. I can't. Good luck.",
              nextScene: "silva_12",
              trust: 10,
              lens: { good: "You showed you value him.", odd: "Sometimes money isn't enough.", native: "Wait, let's talk about this." }
            },
            {
              registry: "neutral",
              text: "I understand. Good luck, Davi.",
              keywords: ["understand", "good luck", "okay", "fine"],
              response: "Davi leaves. You are alone.",
              nextScene: "silva_12",
              lens: { good: "Respectful.", odd: "You didn't even try to keep your cook.", native: "I understand. Good luck." }
            },
            {
              registry: "casual",
              text: "Fine, go. I don't need you.",
              keywords: ["go", "dont need", "fine"],
              response: "Davi storms out. You have no cook.",
              nextScene: "silva_12",
              trust: -15,
              rizz: -5,
              lens: {
                good: "You stood your ground.",
                odd: "Terrible management. Now you have zero cooks.",
                native: "I understand. Good luck."
              }
            }
          ]
        },
        silva_12: {
          npcName: "Narração",
          npcText: "The phone rings again. It's Emma.",
          choices: [
            {
              registry: "neutral",
              text: "[Answer Emma]",
              keywords: ["answer", "emma"],
              response: "You pick up. It's Emma's number.",
              nextScene: "silva_13"
            }
          ]
        },
        silva_13: {
          npcName: "Emma",
          npcText: "Mr. Silva! The customer is very angry. He wants a new burger. But my phone is dying —",
          npcTextVariants: [
            {
              ifFlag: "a1_emma_met_lucas",
              ifNotFlag: "a1_silva_caught_onion",
              text: "Mr. Silva! The customer is very angry. He wants a new burger. I can hear him yelling. My phone is dying —"
            },
            {
              ifFlag: "a1_silva_caught_onion",
              ifNotFlag: "a1_emma_met_lucas",
              text: "Mr. Silva! The customer says the burger is cold. He wants a new one. But my phone is dying —"
            },
            {
              ifFlag: ["a1_silva_caught_onion", "a1_emma_met_lucas"],
              text: "Mr. Silva! The customer says the burger is cold. He wants a new one. I can hear him yelling. My phone is dying —"
            }
          ],
          energyCost: 5,
          glossary: [
            { word: "Dying", meaning: "Morrendo (bateria)", phonetic: "/ˈdaɪɪŋ/" },
            { word: "Angry", meaning: "Com raiva", phonetic: "/ˈæŋɡri/" }
          ],
          choices: [
            {
              registry: "formal",
              text: "Emma, come back immediately. I will fix this myself.",
              keywords: ["come back", "return", "fix", "myself"],
              response: "The line goes dead. Emma's phone died.",
              nextScene: "silva_14",
              trust: 10,
              lens: {
                good: "Taking charge of the situation.",
                odd: "The phone died before she could answer.",
                native: "Come back here, I'll fix it."
              }
            },
            {
              registry: "neutral",
              text: "Tell him I am making a new one right now.",
              keywords: ["tell him", "making", "new one", "right now"],
              response: "The line goes dead. You have no cook.",
              nextScene: "silva_14",
              trust: 5,
              lens: { good: "Good communication.", odd: "How will you make it without a cook?", native: "I'm making a new one right now." }
            },
            {
              registry: "casual",
              text: "Just wait, I'll figure it out.",
              keywords: ["wait", "figure out"],
              response: "The line goes dead. You need a plan.",
              nextScene: "silva_14",
              lens: { good: "Casual and calm.", odd: "You have no idea what to do.", native: "Hold on, I'll figure it out." }
            }
          ]
        },
        silva_14: {
          npcName: "Narração",
          npcText: "No cook. No cash system. One angry customer. Emma is coming back for a new burger. You have to decide.",
          choices: [
            {
              registry: "neutral",
              text: "[Make the burger]",
              keywords: ["make", "burger"],
              response: "You go to the kitchen. You've watched Davi do this a thousand times.",
              nextScene: "silva_15"
            },
            {
              registry: "formal",
              text: "[Give up and refund]",
              keywords: ["refund", "give up"],
              response: "You call Lucas to apologize and offer a refund. He is silent. Then: 'Fine. I'll order somewhere else.'",
              nextScene: "silva_end_ok",
              trust: -10,
              rizz: -5
            }
          ]
        },
        silva_15: {
          npcName: "Narração",
          npcText: "You make a burger. It's not pretty, but it's food. You wrap it up.",
          energyCost: 5,
          choices: [
            {
              registry: "formal",
              text: "I did it. I made the burger myself.",
              keywords: ["make", "myself", "cook", "kitchen", "try"],
              response: "You wrap it carefully. It looks... okay.",
              nextScene: "silva_16",
              addsFlags: ["a1_silva_refez_burger"],
              trust: 15,
              rizz: 5,
              lens: {
                good: "'Myself' shows you take full responsibility.",
                odd: "A manager cooking? Desperate times.",
                native: "I'll make it myself."
              }
            },
            {
              registry: "neutral",
              text: "I tried to cook it. How hard can it be?",
              keywords: ["try", "cook", "hard"],
              response: "You wrap it fast. It looks... okay.",
              nextScene: "silva_16",
              addsFlags: ["a1_silva_refez_burger"],
              trust: 5,
              lens: { good: "Willing to try.", odd: "Cooking is hard.", native: "I'll try to make it." }
            }
          ]
        },
        silva_16: {
          npcName: "Narração",
          npcText: "Emma is back. She is waiting for the new burger.",
          choices: [
            {
              registry: "neutral",
              text: "[Give her the bag]",
              keywords: ["give", "bag"],
              response: "You walk to the door.",
              nextScene: "silva_17"
            }
          ]
        },
        silva_17: {
          npcName: "Emma",
          npcText: "Mr. Silva! I'm back. Give me the new burger. The customer is waiting.",
          energyCost: 5,
          glossary: [
            { word: "Back", meaning: "De volta", phonetic: "/bæk/" }
          ],
          choices: [
            {
              registry: "formal",
              text: "Here it is. Fresh and hot this time. I checked it myself. Go!",
              keywords: ["here", "fresh", "hot", "checked", "go", "myself"],
              response: "You hand her the bag. Emma runs back into the rain.",
              nextScene: "silva_18",
              addsFlags: ["a1_silva_checked"],
              trust: 15,
              lens: { good: "Reassuring and direct.", odd: "Very professional.", native: "Here, fresh and hot. I checked. Go!" }
            },
            {
              registry: "neutral",
              text: "Here. Go fast.",
              keywords: ["here", "go", "fast", "hurry"],
              response: "You hand her the bag. Emma runs.",
              nextScene: "silva_18",
              addsFlags: ["a1_silva_checked"],
              trust: 5,
              lens: { good: "Direct.", odd: "No reassurance.", native: "Here, go fast!" }
            },
            {
              registry: "casual",
              text: "Take it. Run!",
              keywords: ["take", "run"],
              response: "Emma runs back into the rain.",
              nextScene: "silva_18",
              rizz: 5,
              lens: { good: "Shows urgency.", odd: "A bit aggressive.", native: "Take it and run!" }
            }
          ]
        },
        silva_18: {
          npcName: "Narração",
          npcText: "It's 10 PM. The line is gone. The POS is dead. You count the cash. Today you lost money. Then your phone buzzes: a new Google review.",
          choices: [
            {
              registry: "neutral",
              text: "[Read the review]",
              keywords: ["read", "review"],
              response: "You open the review. Lucas wrote it: 'Great service from the delivery girl. Emma. 5 stars. The manager needs a better cook.'",
              nextScene: "silva_end_good",
              ifNotFlag: "a1_lucas_completed"
            },
            {
              registry: "neutral",
              text: "[Read the review]",
              keywords: ["read", "review"],
              response: "You open the review. Lucas wrote it: 'Great service from the delivery girl. Emma. 5 stars. The manager needs a better cook.'",
              nextScene: "silva_end_good",
              ifFlag: "a1_lucas_left_review"
            },
            {
              ifFlag: "a1_lucas_completed",
              ifNotFlag: "a1_lucas_left_review",
              registry: "neutral",
              text: "[Check your phone]",
              keywords: ["check", "phone", "look"],
              response: "No new reviews tonight. Just a quiet phone. You put it away.",
              nextScene: "silva_end_ok"
            },
            {
              registry: "casual",
              text: "[Go home, you are tired]",
              keywords: ["home", "go", "tired"],
              response: "You close the store. You go home. Your wife asks about your day. You don't have the energy to explain.",
              nextScene: "silva_end_ok"
            }
          ],
          npcTextVariants: [
            {
              ifFlag: "a1_lucas_completed",
              ifNotFlag: "a1_lucas_left_review",
              text: "It's 10 PM. The line is gone. The POS is dead. You count the cash. Today you lost money. You look at your phone. Nothing new."
            }
          ]
        },
        silva_end_good: {
          npcName: "Narração",
          npcText: "You read the review twice. 5 stars. Emma saved the night. You make a note: give her a raise. You close the Burger Palace. Not a great day, but not a disaster.",
          glossary: [
            { word: "Raise", meaning: "Aumento", phonetic: "/reɪz/" }
          ],
          isEnd: true,
          endingType: "bom",
          addFlags: ["a1_silva_gave_raise"]
        },
        silva_end_ok: {
          npcName: "Narração",
          npcText: "You close the store with less money than you started. No review. No drama. Just a long night. Tomorrow, you need to find a new cook.",
          isEnd: true,
          endingType: "ok"
        }
      }
    },
    lucas: {
      charId: "lucas",
      name: "Lucas",
      role: "Cliente",
      emoji: "👨🏾",
      subtitle: "A Espera",
      description: "Fome, atraso, vizinho errado, e uma reviravolta que muda tudo.",
      initialState: { energy: 70 },
      startScene: "lucas_01",
      scenes: {
        lucas_01: {
          npcName: "Davi",
          npcText: "I can't do this anymore. That Burger Palace is chaos. I'm quitting tonight. Don't wait up.",
          addFlags: ["a1_lucas_met_davi"],
          energyCost: 5,
          glossary: [
            { word: "Quitting", meaning: "Pedindo demissão", phonetic: "/ˈkwɪtɪŋ/" },
            { word: "Chaos", meaning: "Caos", phonetic: "/ˈkeɪɑːs/" }
          ],
          choices: [
            {
              registry: "formal",
              text: "Why? What happened at work today?",
              keywords: ["why", "what", "happened", "work"],
              response: "The manager is nice but the place is falling apart. I'm done. See you later.",
              nextScene: "lucas_02",
              trust: 10,
              lens: { good: "Shows empathy and interest.", odd: "A bit formal for a roommate.", native: "Why? What happened?" }
            },
            {
              registry: "neutral",
              text: "Good luck, man. See you later.",
              keywords: ["good luck", "man", "later", "see you"],
              response: "Thanks, man. Good luck with your exam tomorrow.",
              nextScene: "lucas_02",
              trust: 5,
              rizz: 5,
              lens: { good: "Friendly and supportive.", odd: "Simple.", native: "Good luck, dude." }
            },
            {
              registry: "casual",
              text: "That sucks, bro.",
              keywords: ["sucks", "bro", "dude"],
              response: "Yeah, it does. See you later.",
              nextScene: "lucas_02",
              trust: 5,
              rizz: 5,
              lens: { good: "'That sucks' is the most common way to say 'que droga'.", odd: "Very casual.", native: "That sucks, man." }
            }
          ]
        },
        lucas_02: {
          npcName: "Narração",
          npcText: "Great. Your roommate leaves, you have an exam tomorrow, and you are starving. You need to order food.",
          choices: [
            {
              registry: "neutral",
              text: "[Order food]",
              keywords: ["order", "food"],
              response: "You open the app. Burger Palace. Cheeseburger and fries. No onions. 'Order placed. 30 minutes.'",
              nextScene: "lucas_03"
            }
          ]
        },
        lucas_03: {
          npcName: "Narração",
          npcText: "45 minutes later. Your food is still not here. The app says 'on the way' but nothing. You're getting angry.",
          energyCost: 5,
          glossary: [
            { word: "On the way", meaning: "A caminho", phonetic: "/ɑːn ðə weɪ/" },
            { word: "Angry", meaning: "Com raiva", phonetic: "/ˈæŋɡri/" }
          ],
          choices: [
            {
              registry: "formal",
              text: "I will call Burger Palace to check on my order.",
              keywords: ["call", "phone", "check", "order"],
              response: "You call Burger Palace.",
              nextScene: "lucas_04",
              trust: 10,
              lens: { good: "Taking action.", odd: "Formal self-talk.", native: "I'm going to call them." }
            },
            {
              registry: "neutral",
              text: "Where is my food? I'll call them.",
              keywords: ["where", "food", "call"],
              response: "You call Burger Palace.",
              nextScene: "lucas_04",
              trust: 5,
              lens: { good: "Direct.", odd: "Simple.", native: "Where is my food? I'll call." }
            },
            {
              registry: "casual",
              text: "This is taking forever. I'm calling them.",
              keywords: ["forever", "calling", "taking"],
              response: "You call.",
              nextScene: "lucas_04",
              trust: 5,
              lens: { good: "'Taking forever' is a great expression.", odd: "Casual.", native: "This is taking forever." }
            }
          ]
        },
        lucas_04: {
          npcName: "Narração",
          npcText: "A man answers the phone.",
          choices: [
            {
              registry: "neutral",
              text: "[Speak to the manager]",
              keywords: ["speak", "manager"],
              response: "You hold the phone to your ear.",
              nextScene: "lucas_05"
            }
          ]
        },
        lucas_05: {
          npcName: "Mr. Silva",
          npcText: "Burger Palace, Mr. Silva speaking. How can I help you?",
          energyCost: 5,
          glossary: [
            { word: "How can I help", meaning: "Como posso ajudar", phonetic: "/haʊ kæn aɪ help/" }
          ],
          choices: [
            {
              registry: "formal",
              text: "Hello, I have been waiting for 45 minutes. Where is my order?",
              keywords: ["hello", "waiting", "minutes", "where", "order"],
              response: "I'm sorry, sir. The delivery girl is on her way. The rain is very bad tonight. Please wait a little more.",
              nextScene: "lucas_06",
              trust: 10,
              lens: { good: "Polite but firm.", odd: "Very professional.", native: "I've been waiting 45 minutes. Where is my food?" }
            },
            {
              registry: "neutral",
              text: "Hey, I ordered 45 minutes ago. Where is my food?",
              keywords: ["hey", "ordered", "where", "food"],
              response: "I'm sorry, sir. The delivery girl is on her way.",
              nextScene: "lucas_06",
              trust: 5,
              lens: { good: "Direct.", odd: "Simple.", native: "Where is my food?" }
            },
            {
              registry: "casual",
              text: "Dude, I'm starving. Where is my burger?",
              keywords: ["dude", "starving", "burger", "where"],
              response: "I'm sorry, sir. Please wait a little more.",
              nextScene: "lucas_06",
              lens: { good: "'Dude' is casual.", odd: "Calling the manager 'dude' is risky.", native: "I'm starving, where is my food?" }
            }
          ]
        },
        lucas_06: {
          npcName: "Narração",
          npcText: "10 minutes later. The doorbell rings. You open the door. It's your neighbor, not the food.",
          choices: [
            {
              registry: "neutral",
              text: "[Open the door]",
              keywords: ["open", "door"],
              response: "Your neighbor asks for sugar. You give it. He leaves. You go back to waiting.",
              nextScene: "lucas_07"
            }
          ]
        },
        lucas_07: {
          npcName: "Narração",
          npcText: "You close the door. Finally, the doorbell rings again. This time it's a girl, wet from the rain, holding a bag.",
          choices: [
            {
              registry: "neutral",
              text: "[Open the door for the delivery]",
              keywords: ["open", "door", "delivery"],
              response: "You open the door.",
              nextScene: "lucas_08"
            }
          ]
        },
        lucas_08: {
          npcName: "Emma",
          npcText: "Burger Palace. I am so sorry for the wait.",
          addFlags: ["a1_lucas_met_emma"],
          energyCost: 5,
          glossary: [
            { word: "Wet", meaning: "Molhada", phonetic: "/wet/" },
            { word: "Wait", meaning: "Espera", phonetic: "/weɪt/" }
          ],
          choices: [
            {
              registry: "formal",
              text: "Thank you for bringing it. I appreciate it.",
              keywords: ["thank you", "bringing", "appreciate"],
              response: "You take the bag. You open it. The burger has... onions.",
              nextScene: "lucas_09",
              trust: 10,
              lens: { good: "Grateful.", odd: "Formal.", native: "Thanks, I appreciate it." },
              responseVariants: [
                {
  ifFlag: "a1_silva_caught_onion",
  text: "You take the bag. You open it. No onions — but the burger is cold. Really cold."
}
              ]
            },
            {
              registry: "neutral",
              text: "Finally! Thanks.",
              keywords: ["finally", "thanks"],
              response: "You take the bag. You open it. The burger has... onions.",
              nextScene: "lucas_09",
              trust: 5,
              lens: { good: "Relieved.", odd: "Simple.", native: "Finally, thanks." },
              responseVariants: [
                {
  ifFlag: "a1_silva_caught_onion",
  text: "You take the bag. You open it. No onions — but the burger is cold. Really cold."
}
              ]
            },
            {
              registry: "casual",
              text: "It's about time! I'm starving.",
              keywords: ["about time", "starving"],
              response: "You take the bag. You open it. The burger has... onions.",
              nextScene: "lucas_09",
              lens: {
                good: "'It's about time' is a great expression.",
                odd: "A bit rude to say to the delivery girl.",
                native: "It's about time, I'm starving!"
              },
              responseVariants: [
                {
  ifFlag: "a1_silva_caught_onion",
  text: "You take the bag. You open it. No onions — but the burger is cold. Really cold."
}
              ]
            }
          ]
        },
        lucas_09: {
          npcName: "Narração",
          npcText: "Onions. I said NO onions. I hate onions. I'm tired, hungry, and my exam is tomorrow.",
          npcTextVariants: [
            {
              ifFlag: "a1_emma_met_lucas",
              ifNotFlag: "a1_silva_caught_onion",
              text: "Onions. I said NO onions. (You look at the girl. She looks scared, not malicious. This is not her fault. Maybe.)"
            },
            {
              ifFlag: "a1_silva_caught_onion",
              ifNotFlag: "a1_emma_met_lucas",
              text: "Cold. It's cold. Forty-five minutes, and it's cold. I'm tired, hungry, and my exam is tomorrow."
            },
            {
              ifFlag: ["a1_silva_caught_onion", "a1_emma_met_lucas"],
              text: "Cold. It's cold. (You look at the girl. She looks scared, not malicious. This is not her fault. Maybe.)"
            }
          ],
          energyCost: 5,
          glossary: [
            { word: "Hate", meaning: "Odeio", phonetic: "/heɪt/" },
            { word: "Tired", meaning: "Cansado", phonetic: "/ˈtaɪərd/" }
          ],
          choices: [
            {
              registry: "formal",
              text: "Excuse me, I asked for no onions. Can you please get me another one?",
              keywords: ["excuse me", "asked", "no onions", "another one", "please"],
              response: "You take a breath. 'Okay. I'm sorry. I'm not angry at you. But I can't eat this.'",
              nextScene: "lucas_10",
              addsFlags: ["a1_lucas_kind"],
              trust: 15,
              rizz: 5,
              lens: {
                good: "Polite but firm. Perfect.",
                odd: "Very controlled.",
                native: "I'm sorry, I asked for no onions. Can you get me a new one?"
              },
              ifNotFlag: "a1_silva_caught_onion"
            },
            {
              registry: "neutral",
              text: "I can't eat this. I said no onions.",
              keywords: ["cant eat", "said", "no onions"],
              response: "You take a breath. 'Okay. I'm not angry at you. But I can't eat this.'",
              nextScene: "lucas_10",
              addsFlags: ["a1_lucas_kind"],
              trust: 5,
              lens: { good: "Clear and direct.", odd: "A bit blunt.", native: "I can't eat this, I asked for no onions." },
              ifNotFlag: "a1_silva_caught_onion"
            },
            {
              registry: "casual",
              text: "Are you kidding me? I hate onions!",
              keywords: ["kidding", "hate", "onions", "angry"],
              response: "You explode. 'This is a joke! I said no onions!' The girl looks like she might cry.",
              nextScene: "lucas_10",
              trust: -10,
              rizz: -5,
              lens: {
                good: "'Are you kidding me?' is a great expression.",
                odd: "Exploding at the delivery girl won't fix the burger.",
                native: "I can't believe this, I said no onions!"
              },
              ifNotFlag: "a1_silva_caught_onion"
            },
            {
              registry: "formal",
              text: "Excuse me, this burger is cold. Can you please get me a fresh one?",
              keywords: ["excuse me", "cold", "fresh", "another", "please"],
              response: "You take a breath. 'Okay. I'm sorry. I'm not angry at you. But I can't eat this.'",
              nextScene: "lucas_10",
              addsFlags: ["a1_lucas_kind"],
              trust: 15,
              rizz: 5,
              lens: { good: "Polite but firm. Perfect.", odd: "Very controlled.", native: "Sorry, this is cold. Can I get a fresh one?" },
              ifFlag: "a1_silva_caught_onion"
            },
            {
              registry: "neutral",
              text: "I can't eat this. It's cold.",
              keywords: ["cant eat", "cold", "freezing"],
              response: "You take a breath. 'Okay. I'm not angry at you. But I can't eat this.'",
              nextScene: "lucas_10",
              addsFlags: ["a1_lucas_kind"],
              trust: 5,
              lens: { good: "Clear and direct.", odd: "A bit blunt.", native: "I can't eat this, it's cold." },
              ifFlag: "a1_silva_caught_onion"
            },
            {
              registry: "casual",
              text: "Are you kidding me? It's freezing!",
              keywords: ["kidding", "freezing", "cold", "angry"],
              response: "You explode. 'This is a joke! It's freezing cold!' The girl looks like she might cry.",
              nextScene: "lucas_10",
              trust: -10,
              rizz: -5,
              lens: {
                good: "'Are you kidding me?' is a great expression.",
                odd: "Exploding at the delivery girl won't warm the burger.",
                native: "I can't believe this, it's freezing!"
              },
              ifFlag: "a1_silva_caught_onion"
            }
          ],
          glossaryVariants: [
            {
              ifFlag: "a1_silva_caught_onion",
              glossary: [
                { word: "Cold", meaning: "Frio", phonetic: "/koʊld/" },
                { word: "Tired", meaning: "Cansado", phonetic: "/ˈtaɪərd/" }
              ]
            }
          ]
        },
        lucas_10: {
          npcName: "Emma",
          npcText: "I'm so sorry. I will go back and get you a new one. I promise. Please wait a little more.",
          energyCost: 5,
          glossary: [
            { word: "Promise", meaning: "Prometer", phonetic: "/ˈprɑːmɪs/" }
          ],
          choices: [
            {
              registry: "formal",
              text: "Thank you. I will wait here. Please be careful in the rain.",
              keywords: ["thank you", "wait", "careful", "rain"],
              response: "She smiles a little. 'Thank you. I will be fast.' She runs back into the rain.",
              nextScene: "lucas_11",
              trust: 15,
              rizz: 5,
              lens: { good: "'Be careful' shows genuine concern.", odd: "Very polite.", native: "Be careful out there." }
            },
            {
              registry: "neutral",
              text: "Okay. Go, I'll wait.",
              keywords: ["okay", "go", "wait"],
              response: "She runs back into the rain. You close the door. You wait. Again.",
              nextScene: "lucas_11",
              trust: 5,
              lens: { good: "Direct.", odd: "Simple.", native: "Go, I'll wait." }
            },
            {
              registry: "casual",
              text: "Hurry up, please.",
              keywords: ["hurry", "please", "fast"],
              response: "She runs back into the rain.",
              nextScene: "lucas_11",
              lens: { good: "Shows urgency.", odd: "A bit demanding.", native: "Please hurry." }
            }
          ]
        },
        lucas_11: {
          npcName: "Narração",
          npcText: "20 minutes pass. The doorbell rings. You open it. It's Davi, your roommate. He looks tired.",
          choices: [
            {
              registry: "neutral",
              text: "[Talk to Davi]",
              keywords: ["talk", "davi"],
              response: "You look at him.",
              nextScene: "lucas_12"
            }
          ]
        },
        lucas_12: {
          npcName: "Davi",
          npcText: "Hey. I quit my job tonight.",
          addFlags: ["a1_lucas_knows_davi_quit"],
          energyCost: 5,
          glossary: [
            { word: "Roommate", meaning: "Colega de quarto", phonetic: "/ˈruːmmeɪt/" },
            { word: "Quit", meaning: "Pediu demissão", phonetic: "/kwɪt/" }
          ],
          npcTextVariants: [
            { ifFlag: "a1_silva_heard_davi_quit", text: "Hey. I quit tonight. The manager is a mess. But he tried, I guess." }
          ],
          choices: [
            {
              registry: "formal",
              text: "Are you okay? What happened at the restaurant?",
              keywords: ["okay", "what", "happened", "restaurant"],
              response: "Davi explains: 'I made your burger with onions. The manager didn't check it. Then everything fell apart. He's a disaster, but he tried.'",
              nextScene: "lucas_13",
              trust: 10,
              lens: { good: "Shows empathy.", odd: "Formal.", native: "What happened, man?" },
              responseVariants: [
                {
                  ifFlag: "a1_silva_caught_onion",
                  text: "Davi explains: 'I forgot the onions. The manager caught it, but then everything fell apart anyway. He's a disaster, but he tried.'"
                }
              ]
            },
            {
              registry: "neutral",
              text: "Man, you look tired. Good night.",
              keywords: ["tired", "good night", "look"],
              response: "Davi goes to his room. You sit on the couch.",
              nextScene: "lucas_13",
              trust: 5,
              rizz: 5,
              lens: { good: "Respectful.", odd: "Simple.", native: "You look tired, get some rest." }
            },
            {
              registry: "casual",
              text: "What happened, dude? You look terrible.",
              keywords: ["what happened", "dude", "terrible"],
              response: "Davi: 'I just quit. It was too much.'",
              nextScene: "lucas_13",
              trust: 5,
              lens: { good: "Casual and direct.", odd: "'You look terrible' can be offensive.", native: "What happened, man?" }
            }
          ]
        },
        lucas_13: {
          npcName: "Narração",
          npcText: "The doorbell rings one more time. You open it. The girl is back. She's soaked, holding a new bag.",
          choices: [
            {
              registry: "neutral",
              text: "[Open the door for Emma]",
              keywords: ["open", "door", "emma"],
              response: "You open the door.",
              nextScene: "lucas_14"
            }
          ]
        },
        lucas_14: {
          npcName: "Emma",
          npcText: "Here. No onions this time. I checked.",
          energyCost: 5,
          glossary: [
            { word: "Soaked", meaning: "Encharcada", phonetic: "/soʊkt/" },
            { word: "Checked", meaning: "Conferi", phonetic: "/tʃekt/" }
          ],
          choices: [
            {
              registry: "formal",
              text: "Thank you so much. You didn't have to come back in this rain.",
              keywords: ["thank you", "didnt have to", "rain", "back"],
              response: "You look at her. She came back in the rain. Twice.",
              nextScene: "lucas_15",
              trust: 15,
              rizz: 5,
              lens: { good: "Recognizing her effort.", odd: "Very polite.", native: "Thank you, really. I appreciate it." }
            },
            {
              registry: "neutral",
              text: "Thanks. Sorry about earlier.",
              keywords: ["thanks", "sorry", "earlier"],
              response: "She nods. 'It's okay. Enjoy your food.'",
              nextScene: "lucas_15",
              trust: 5,
              lens: { good: "Acknowledges the situation.", odd: "Simple.", native: "Thanks, sorry about that." }
            },
            {
              registry: "casual",
              text: "You are soaked! Come in for a towel.",
              keywords: ["soaked", "come in", "towel"],
              response: "She laughs. 'No, I have to go. But thank you.'",
              nextScene: "lucas_15",
              trust: 10,
              rizz: 10,
              lens: {
                good: "'Soaked' is the perfect word here.",
                odd: "Inviting the delivery girl in is unusual.",
                native: "You're soaked! Do you want a towel?"
              }
            }
          ],
          npcTextVariants: [
            { ifFlag: "a1_silva_caught_onion", text: "Here. It's hot this time. I checked." }
          ]
        },
        lucas_15: {
          npcName: "Narração",
          npcText: "The burger is hot. No onions. The girl is still at the door, waiting. Davi is in his room. My exam is tomorrow.",
          energyCost: 5,
          glossary: [
            { word: "Hot", meaning: "Quente", phonetic: "/hɑːt/" },
            { word: "Waiting", meaning: "Esperando", phonetic: "/ˈweɪtɪŋ/" }
          ],
          choices: [
            {
              registry: "formal",
              text: "Here is a tip for you. I will give you 5 stars on the app.",
              keywords: ["tip", "5 stars", "app", "review"],
              response: "You give her a $5 tip and open the app. 5 stars. 'The delivery girl, Emma, saved my night.'",
              nextScene: "lucas_end_good",
              addsFlags: ["a1_lucas_completed", "a1_lucas_gave_tip", "a1_lucas_left_review"],
              trust: 15,
              rizz: 10,
              lens: { good: "Generous and appreciative.", odd: "Formal.", native: "Here's a tip. I'll give you 5 stars." }
            },
            {
              registry: "neutral",
              text: "Here is a tip. Thanks for coming back.",
              keywords: ["tip", "thanks", "back"],
              response: "You close the door. You eat. The burger is good.",
              nextScene: "lucas_end_ok",
              addsFlags: ["a1_lucas_completed", "a1_lucas_gave_tip"],
              trust: 5,
              lens: { good: "Nice gesture.", odd: "Simple.", native: "Here's a tip, thanks." }
            },
            {
              registry: "casual",
              text: "Good night! Thanks!",
              keywords: ["good night", "thanks"],
              response: "You close the door without a tip. You eat.",
              nextScene: "lucas_end_ok",
              addsFlags: ["a1_lucas_completed"],
              lens: { good: "Polite.", odd: "No tip after she came back in the rain.", native: "Good night, thanks." }
            }
          ]
        },
        lucas_end_good: {
          npcName: "Narração",
          npcText: "You eat the burger. It's perfect. You write a 5-star review. The next morning, your exam goes well. Later that week, you hear Burger Palace needs a new cook. You smile. The system is broken, but people are not.",
          glossary: [
            { word: "Raise", meaning: "Aumento", phonetic: "/reɪz/" }
          ],
          isEnd: true,
          endingType: "bom",
          npcTextVariants: [
            {
              ifFlag: "a1_silva_gave_raise",
              text: "You eat the burger. It's perfect. You write a 5-star review. The next morning, your exam goes well. Later that week, you hear the manager gave Emma a raise. You smile. The system is broken, but people are not."
            }
          ]
        },
        lucas_end_ok: {
          npcName: "Narração",
          npcText: "You eat the burger. It's fine. Not great, not bad. You don't leave a review. The next morning, your exam is okay. Life goes on.",
          isEnd: true,
          endingType: "ok"
        }
      }
    }
  }
};