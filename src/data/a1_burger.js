const gameDataA1 = {
  level: 'a1',
  title: 'Burger Palace: A Noite do Caos',
  characters: {
    emma: {
      charId: 'emma',
      name: 'Emma',
      role: 'Entregadora',
      emoji: '👩',
      subtitle: 'A Entrega',
      description: 'Chuva, GPS morrendo, cliente furioso. Sobreviva ao caos.',
      initialState: { money: 20.00, energy: 100 },
      startScene: 'emma_01',
      scenes: {
        emma_01: {
          npcName: 'Mr. Silva (Manager)',
          npcText: "Emma! Ten orders are waiting. Take this bag to 41 Main Street. Now! Lucas paid for a cheeseburger and fries. Don't be late.",
          glossary: [{ word: 'Street', meaning: 'Rua' }, { word: 'Late', meaning: 'Atrasada' }],
          intents: [
            { match: /(yes|ok|sure|understood|going|right away|on it|coming)/i, response: "Good. It's raining. Take the bag and go.", nextScene: 'emma_02' },
            { match: /(who|what|where|address|help|understand|sorry)/i, response: "No time for questions! Read the address on the bag. Go!", nextScene: 'emma_02' }
          ],
          fallback: "Why are you still here? Go!",
          quickReplies: [
            { label: 'Sim, senhor!', text: 'Yes, sir!' },
            { label: 'Estou indo agora.', text: 'I am going now.' },
            { label: 'Desculpa, Mr. Silva.', text: 'Sorry, Mr. Silva.' }
          ]
        },
        emma_02: {
          npcName: 'Emma (Você)',
          npcText: "Okay, the address says 41 Main Street. It's raining hard and my phone has 12%. I need to find this place fast.",
          glossary: [{ word: 'Rain', meaning: 'Chuva' }, { word: 'Fast', meaning: 'Rápido' }],
          intents: [
            { match: /(excuse me|where is|how do i|directions|get to|ask)/i, response: "You ask a lady with an umbrella. She says: 'Go straight for two blocks, then turn left. It's next to the park.'", nextScene: 'emma_03' },
            { match: /(map|gps|phone|look|app|check)/i, response: "You open your GPS. 10 minutes walking. Your battery is 12%. Let's go.", nextScene: 'emma_03' }
          ],
          fallback: "I can't just stand in the rain. Let me ask or check my phone.",
          quickReplies: [
            { label: 'Com licença, onde fica Main Street?', text: 'Excuse me, where is Main Street?' },
            { label: 'Vou usar o GPS.', text: 'I will use my GPS.' },
            { label: 'Como chego lá?', text: 'How do I get there?' }
          ]
        },
        emma_03: {
          npcName: 'Lucas (Customer)',
          npcText: "Finally! I am starving. Is that my cheeseburger?",
          addFlags: ['a1_emma_met_lucas'],
          glossary: [{ word: 'Starving', meaning: 'Morrendo de fome' }, { word: 'Cheeseburger', meaning: 'X-Burger' }],
          intents: [
            { match: /(yes|here|cheeseburger|fries|order|delivery|food|your)/i, response: "Great. But wait... I asked for no onions. Did you bring it with onions?", nextScene: 'emma_04' }
          ],
          fallback: "Hello? Are you going to give me my food?",
          quickReplies: [
            { label: 'Sim, aqui está.', text: 'Yes, here is your cheeseburger.' },
            { label: 'Aqui está o pedido.', text: 'Here is your order, sir.' },
            { label: 'Tenho sua comida.', text: 'I have your food.' }
          ]
        },
        emma_04: {
          npcName: 'Lucas',
          npcText: "I hate onions! I can't eat this. What are you going to do about it?",
          glossary: [{ word: 'Hate', meaning: 'Odeio' }, { word: 'What are you going to do', meaning: 'O que você vai fazer' }],
          intents: [
            { match: /(sorry|apologize|my fault|mistake|excuse me|my bad)/i, response: "Okay. But I'm still hungry. Can you get me a new one?", nextScene: 'emma_05', addsFlags: ['a1_emma_apologized'] },
            { match: /(fix|new|replace|another|change|remake)/i, response: "Yes! Please. A new one. No onions this time.", nextScene: 'emma_05', addsFlags: ['a1_emma_apologized'] },
            { match: /(refund|money|cancel|free)/i, response: "A refund? I want FOOD, not money! Call your manager!", nextScene: 'emma_05' }
          ],
          fallback: "I am waiting. What are you going to do?",
          offensiveScene: 'emma_bad_fired',
          quickReplies: [
            { label: 'Mil desculpas, senhor.', text: 'I am so sorry, sir.' },
            { label: 'Posso trazer outro.', text: 'Can I bring you another one?' },
            { label: 'Foi um erro, desculpa.', text: 'It was a mistake, I apologize.' }
          ]
        },
        emma_05: {
          npcName: 'Lucas',
          npcText: "Fine. I'll wait 10 minutes. But if it's cold, I'm giving a bad review on the app.",
          glossary: [{ word: 'Wait', meaning: 'Esperar' }, { word: 'Review', meaning: 'Avaliação' }],
          intents: [
            { match: /(promise|will be|hot|fast|soon|back|hurry|run)/i, response: "I'll be here. Hurry up.", nextScene: 'emma_06' }
          ],
          fallback: "Just go get the food!",
          quickReplies: [
            { label: 'Volto em 5 minutos!', text: 'I will be back in 5 minutes!' },
            { label: 'Prometo que virá quente.', text: 'I promise it will be hot.' },
            { label: 'Vou correr!', text: 'I will run!' }
          ]
        },
        emma_06: {
          npcName: 'Emma (Você)',
          npcText: "I run back to the Burger Palace. The rain is worse. My phone dies. I see Davi, the cook, leaving the store. He looks angry. I go inside.",
          addFlags: ['a1_emma_saw_davi_leave'],
          glossary: [{ word: 'Cook', meaning: 'Cozinheiro' }, { word: 'Leaving', meaning: 'Saindo' }],
          intents: [
            { match: /(davi|why|what happened|angry|leaving|who)/i, response: "Mr. Silva says: 'Don't ask. Davi quit. I have no cook. I will make the burger myself. Wait here.'", nextScene: 'emma_07' },
            { match: /(ok|wait|sure|fine|yes)/i, response: "Mr. Silva goes to the kitchen. You wait, wet and cold. He comes back with a burger. 'Here. Go. Fast.'", nextScene: 'emma_07' }
          ],
          fallback: "I need to get this burger back to Lucas.",
          quickReplies: [
            { label: 'Por que o Davi saiu?', text: 'Why is Davi leaving?' },
            { label: 'O que aconteceu?', text: 'What happened?' },
            { label: 'Vou esperar.', text: 'I will wait.' }
          ]
        },
        emma_07: {
          npcName: 'Emma (Você)',
          npcText: "I run back to Lucas. I am soaked. The burger is warm but not hot. I knock on the door.",
          glossary: [{ word: 'Soaked', meaning: 'Encharcada' }, { word: 'Warm', meaning: 'Morno' }],
          intents: [
            { match: /(here|sorry|your|burger|food|delivery|order)/i, response: "Lucas opens the door. He looks at you, then at the bag. 'You came back. I didn't think you would.'", nextScene: 'emma_08' }
          ],
          fallback: "I have to give him this burger.",
          quickReplies: [
            { label: 'Aqui está, senhor.', text: 'Here is your burger, sir.' },
            { label: 'Desculpa a demora.', text: 'Sorry for the wait.' },
            { label: 'Seu pedido, senhor.', text: 'Your order, sir.' }
          ]
        },
        emma_08: {
          npcName: 'Lucas',
          npcText: "Let me see. (He opens the bag.) No onions this time. Good. But it's a little cold.",
          npcTextVariants: [
            { ifFlag: 'a1_lucas_knows_davi_quit', text: "Let me see. No onions this time. Good. (He pauses.) I heard Davi quit. This is not your fault. Thank you for coming back." }
          ],
          glossary: [{ word: 'Cold', meaning: 'Frio' }, { word: 'Quit', meaning: 'Pediu demissão' }],
          intents: [
            { match: /(sorry|apologize|rain|wait|slow|back|again)/i, response: "It's okay. You came back in the rain. That counts. Here — keep the change.", nextScene: 'emma_end_good', addsFlags: ['a1_emma_delivered', 'a1_emma_got_tip'] },
            { match: /(yes|enjoy|eat|good|ok|sure)/i, response: "Thanks. Have a good night, Emma.", nextScene: 'emma_end_ok', addsFlags: ['a1_emma_delivered'] }
          ],
          fallback: "Say something.",
          quickReplies: [
            { label: 'Desculpa, está frio.', text: 'Sorry, it is cold.' },
            { label: 'Voltei, é o que importa.', text: 'I came back. That is what matters.' },
            { label: 'Bom apetite!', text: 'Enjoy your food!' }
          ]
        },
        emma_end_good: {
          npcName: 'Narrador',
          npcText: "Lucas gives you a $5 tip. You walk back in the rain, but you feel lighter. Mr. Silva sees the tip and nods. 'Good job, Emma.'",
          addFlags: ['a1_emma_delivered', 'a1_emma_got_tip', 'a1_emma_completed'],
          glossary: [{ word: 'Tip', meaning: 'Gorjeta' }, { word: 'Job', meaning: 'Trabalho' }],
          isEnd: true,
          endingType: 'bom'
        },
        emma_end_ok: {
          npcName: 'Narrador',
          npcText: "Lucas closes the door. No tip, no smile — but no bad review either. You go back to the Burger Palace. Mr. Silva says nothing. The night ends.",
          addFlags: ['a1_emma_delivered', 'a1_emma_completed'],
          isEnd: true,
          endingType: 'ok'
        },
        emma_bad_fired: {
          npcName: 'Mr. Silva',
          npcText: "Lucas called me. He recorded what you said. I can't defend that. Emma — you're fired. I'm sorry. You should not speak to customers like that.",
          addFlags: ['a1_emma_fired', 'a1_emma_completed'],
          glossary: [{ word: 'Fired', meaning: 'Demitida' }],
          isEnd: true,
          endingType: 'ruim'
        }
      }
    },

    silva: {
      charId: 'silva',
      name: 'Mr. Silva',
      role: 'Gerente',
      emoji: '👨‍💼',
      subtitle: 'O Turno',
      description: 'Caixa quebrado, cozinheiro surtado, cliente furioso. Gerencie o caos.',
      initialState: { money: 500.00, energy: 100 },
      startScene: 'silva_01',
      scenes: {
        silva_01: {
          npcName: 'Sistema',
          npcText: "6 PM, Burger Palace. The POS system freezes. A line of 6 customers. Davi, the cook, is 15 minutes late.",
          glossary: [{ word: 'Freeze', meaning: 'Travar' }, { word: 'Late', meaning: 'Atrasado' }],
          intents: [
            { match: /(fix|reboot|restart|system|computer|pos|check)/i, response: "You reboot the POS. It works. The line moves. Then the phone rings.", nextScene: 'silva_02' },
            { match: /(davi|cook|call|where|late|phone)/i, response: "You call Davi. He answers: 'I'm coming, boss. Five minutes.' The phone rings again — a customer.", nextScene: 'silva_02' }
          ],
          fallback: "You need to deal with this. What do you do?",
          quickReplies: [
            { label: 'Vou reiniciar o sistema.', text: 'I will reboot the system.' },
            { label: 'Vou ligar pro Davi.', text: 'I will call Davi.' },
            { label: 'Onde está o Davi?', text: 'Where is Davi?' }
          ]
        },
        silva_02: {
          npcName: 'Lucas (on phone)',
          npcText: "Hi, I ordered a cheeseburger and fries. No onions, please. I'm at 41 Main Street. Can you deliver it fast? I'm starving.",
          addFlags: ['a1_silva_knows_lucas'],
          glossary: [{ word: 'No onions', meaning: 'Sem cebola' }, { word: 'Fast', meaning: 'Rápido' }],
          intents: [
            { match: /(ok|yes|sure|got it|understood|fine|order|written|noted|correct|right)/i, response: "Great. Thanks. 41 Main Street.", nextScene: 'silva_03', addsFlags: ['a1_silva_forgot_no_onions'] },
            { match: /(no onions|without|note|write|remember)/i, response: "Yes, no onions. Please. 41 Main Street.", nextScene: 'silva_03' }
          ],
          fallback: "Hello? Are you there?",
          quickReplies: [
            { label: 'Anotado. 41 Main Street.', text: 'Got it. 41 Main Street.' },
            { label: 'Sem cebola, entendi.', text: 'No onions, understood.' },
            { label: 'Está anotado, senhor.', text: 'It is written down, sir.' }
          ]
        },
        silva_03: {
          npcName: 'Davi (Cook)',
          npcText: "Boss, I'm here. The burger is ready. Here's the bag for 41 Main Street.",
          addFlags: ['a1_silva_skipped_onion_check'],
          glossary: [{ word: 'Cook', meaning: 'Cozinheiro' }, { word: 'Bag', meaning: 'Sacola' }],
          npcTextVariants: [
            { ifFlag: 'a1_emma_met_lucas', text: "Boss, I'm here. The burger is ready. Here's the bag. (You glance at it. Something feels off, but you don't check. You will regret this.)" }
          ],
          intents: [
            { match: /(ok|thanks|good|go|emma|deliver)/i, response: "You call Emma. 'Emma! Take this bag to 41 Main Street. Now.'", nextScene: 'silva_04' },
            { match: /(onion|check|verify|open|look)/i, response: "You open the bag. Onions. Davi forgot. 'Davi! Remake this. No onions!' He groans but does it. You lose 5 minutes.", nextScene: 'silva_04', addsFlags: ['a1_silva_caught_onion'] }
          ],
          fallback: "Davi is waiting. What do you do?",
          quickReplies: [
            { label: 'Obrigado, Davi.', text: 'Thanks, Davi.' },
            { label: 'Deixa eu conferir.', text: 'Let me check the bag.' },
            { label: 'Emma, entregue isso.', text: 'Emma, take this bag.' }
          ]
        },
        silva_04: {
          npcName: 'Emma',
          npcText: "Yes, sir! I'm going now. (She leaves in the rain.)",
          glossary: [{ word: 'Going now', meaning: 'Indo agora' }],
          intents: [
            { match: /(ok|good|back|go|work|line)/i, response: "The line at the counter is still long. A customer is angry. The POS freezes again. It's dead. Cash only.", nextScene: 'silva_05' }
          ],
          fallback: "You need to manage the counter.",
          quickReplies: [
            { label: 'Volto ao caixa.', text: 'I will go back to the counter.' },
            { label: 'Vou atender a fila.', text: 'I will serve the line.' }
          ]
        },
        silva_05: {
          npcName: 'Cliente furioso',
          npcText: "Hey! I've been waiting 20 minutes! Is this place a joke?",
          glossary: [{ word: 'Waiting', meaning: 'Esperando' }, { word: 'Joke', meaning: 'Piada' }],
          intents: [
            { match: /(sorry|apologize|wait|free|discount|on me|system|broken)/i, response: "Fine. But hurry up. (You give him a free drink. He calms down.)", nextScene: 'silva_06' },
            { match: /(calm|wait|moment|minute|please)/i, response: "Okay, okay. But fast!", nextScene: 'silva_06' }
          ],
          fallback: "Hello? Are you going to help me or not?",
          offensiveScene: 'silva_bad_review',
          quickReplies: [
            { label: 'Mil desculpas, senhor.', text: 'I am so sorry, sir.' },
            { label: 'A bebida é por conta da casa.', text: 'The drink is on the house.' },
            { label: 'Um momento, por favor.', text: 'One moment, please.' }
          ]
        },
        silva_06: {
          npcName: 'Lucas (on phone)',
          npcText: "Hey! I'm calling about my order. There are onions in my burger! I said NO onions!",
          glossary: [{ word: 'Onions', meaning: 'Cebolas' }, { word: 'Order', meaning: 'Pedido' }],
          intents: [
            { match: /(sorry|apologize|mistake|fix|remake|new|send)/i, response: "Okay. Send a new one. Fast. I'm still hungry.", nextScene: 'silva_07' },
            { match: /(check|look|let me|confirm|verify)/i, response: "Yes, please check! And send a new one!", nextScene: 'silva_07' }
          ],
          fallback: "Are you going to fix this or not?",
          offensiveScene: 'silva_bad_review',
          quickReplies: [
            { label: 'Desculpa, vou corrigir.', text: 'Sorry, I will fix it.' },
            { label: 'Vou mandar outro.', text: 'I will send another one.' },
            { label: 'Deixa eu verificar.', text: 'Let me check.' }
          ]
        },
        silva_07: {
          npcName: 'Davi (Cook)',
          npcText: "Boss — I'm done. This place is chaos. I quit. Here's my apron. Good luck.",
          addFlags: ['a1_silva_heard_davi_quit'],
          glossary: [{ word: 'Quit', meaning: 'Pedir demissão' }, { word: 'Apron', meaning: 'Avental' }],
          npcTextVariants: [
            { ifFlag: 'a1_lucas_knows_davi_quit', text: "Boss — I'm done. This place is chaos. I quit. (Davi is Lucas's roommate. If you knew, you would understand why Lucas is so angry.)" }
          ],
          intents: [
            { match: /(wait|stop|stay|please|talk|more money|raise)/i, response: "No. I'm sorry, boss. I can't. Good luck.", nextScene: 'silva_08' },
            { match: /(ok|fine|go|understand|leave)/i, response: "Davi leaves. You are alone. The phone rings again. It's Emma's number.", nextScene: 'silva_08' }
          ],
          fallback: "Davi is at the door.",
          quickReplies: [
            { label: 'Espera, Davi!', text: 'Wait, Davi!' },
            { label: 'Entendo. Boa sorte.', text: 'I understand. Good luck.' },
            { label: 'Posso te pagar mais.', text: 'I can pay you more.' }
          ]
        },
        silva_08: {
          npcName: 'Emma (on phone)',
          npcText: "Mr. Silva! The customer is very angry. He wants a new burger. But my phone is dying —",
          npcTextVariants: [
            { ifFlag: 'a1_emma_met_lucas', text: "Mr. Silva! The customer is very angry. He wants a new burger. I can hear him yelling. My phone is dying —" }
          ],
          glossary: [{ word: 'Dying', meaning: 'Morrendo (bateria)' }, { word: 'Angry', meaning: 'Com raiva' }],
          intents: [
            { match: /(come back|return|new|remake|wait|ok|i will)/i, response: "The line goes dead. Emma's phone died. You have no cook, no cash system, and a customer waiting for a new burger.", nextScene: 'silva_09' }
          ],
          fallback: "The phone is dead. You need to act.",
          quickReplies: [
            { label: 'Volta pra cá, Emma.', text: 'Come back here, Emma.' },
            { label: 'Vou fazer outro burger.', text: 'I will make another burger.' },
            { label: 'Espera, eu resolvo.', text: 'Wait, I will fix it.' }
          ]
        },
        silva_09: {
          npcName: 'Mr. Silva (Você)',
          npcText: "No cook. No cash system. One angry customer. Emma is coming back for a new burger. I have to decide.",
          glossary: [{ word: 'Decide', meaning: 'Decidir' }, { word: 'System', meaning: 'Sistema' }],
          intents: [
            { match: /(make|myself|cook|kitchen|burger|try)/i, response: "You go to the kitchen. You've watched Davi do this a thousand times. You make a burger. It's not pretty, but it's food.", nextScene: 'silva_10', addsFlags: ['a1_silva_refez_burger'] },
            { match: /(refund|money back|cancel|close|give up)/i, response: "You call Lucas. 'Sir, I'm sorry. We can't remake the burger tonight. I can refund you.' Lucas is silent. Then: 'Fine. I'll order somewhere else.'", nextScene: 'silva_end_ok', addsFlags: ['a1_silva_refunded'] }
          ],
          fallback: "You have to decide now.",
          quickReplies: [
            { label: 'Vou fazer eu mesmo.', text: 'I will make it myself.' },
            { label: 'Vou dar reembolso.', text: 'I will give a refund.' }
          ]
        },
        silva_10: {
          npcName: 'Emma',
          npcText: "Mr. Silva! I'm back. Give me the new burger. The customer is waiting.",
          glossary: [{ word: 'Back', meaning: 'De volta' }, { word: 'Waiting', meaning: 'Esperando' }],
          intents: [
            { match: /(here|take|go|fast|hurry|burger|no onions)/i, response: "You hand her the bag. 'No onions this time. I checked. Go.' Emma runs back into the rain.", nextScene: 'silva_11', addsFlags: ['a1_silva_checked'] }
          ],
          fallback: "Emma is waiting.",
          quickReplies: [
            { label: 'Aqui está. Sem cebola.', text: 'Here. No onions.' },
            { label: 'Vai rápido!', text: 'Go fast!' },
            { label: 'Eu conferi.', text: 'I checked.' }
          ]
        },
        silva_11: {
          npcName: 'Mr. Silva (Você)',
          npcText: "It's 10 PM. The line is gone. The POS is dead. You count the cash. Today you lost money. Then your phone rings. It's a notification: a new Google review.",
          glossary: [{ word: 'Lost money', meaning: 'Perdeu dinheiro' }, { word: 'Review', meaning: 'Avaliação' }],
          intents: [
            { match: /(read|open|check|review|look|see)/i, response: "You open the review. Lucas wrote it: 'Great service from the delivery girl. Emma. 5 stars. The manager needs a better cook.'", nextScene: 'silva_end_good', addsFlags: ['a1_silva_completed'] },
            { match: /(close|home|go|wife|sleep|tired)/i, response: "You close the store. You go home. Your wife asks about your day. You don't have the energy to explain.", nextScene: 'silva_end_ok', addsFlags: ['a1_silva_completed'] }
          ],
          fallback: "You open the review.",
          quickReplies: [
            { label: 'Vou ler a avaliação.', text: 'I will read the review.' },
            { label: 'Vou fechar a loja.', text: 'I will close the store.' },
            { label: 'Quero ir pra casa.', text: 'I want to go home.' }
          ]
        },
        silva_end_good: {
          npcName: 'Narrador',
          npcText: "You read the review twice. 5 stars. Emma saved the night. You make a note: give her a raise. You close the Burger Palace. Not a great day, but not a disaster.",
          glossary: [{ word: 'Raise', meaning: 'Aumento' }],
          isEnd: true,
          endingType: 'bom'
        },
        silva_end_ok: {
          npcName: 'Narrador',
          npcText: "You close the store with less money than you started. No review. No drama. Just a long night. Tomorrow, you need to find a new cook.",
          isEnd: true,
          endingType: 'ok'
        },
        silva_bad_review: {
          npcName: 'Narrador',
          npcText: "The customer records what you said. The video goes viral. Your Google rating drops to 1 star. Customers start canceling orders. Mr. Silva — you're in trouble.",
          glossary: [{ word: 'Viral', meaning: 'Viralizou' }],
          isEnd: true,
          endingType: 'ruim'
        }
      }
    },

    lucas: {
      charId: 'lucas',
      name: 'Lucas',
      role: 'Cliente',
      emoji: '🧑',
      subtitle: 'A Espera',
      description: 'Fome, atraso, vizinho errado, e uma reviravolta que muda tudo.',
      initialState: { money: 30.00, energy: 70 },
      startScene: 'lucas_01',
      scenes: {
        lucas_01: {
          npcName: 'Davi (seu colega de quarto)',
          npcText: "I can't do this anymore. That Burger Palace is chaos. I'm quitting tonight. Don't wait up.",
          addFlags: ['a1_lucas_met_davi'],
          glossary: [{ word: 'Quitting', meaning: 'Pedindo demissão' }, { word: 'Chaos', meaning: 'Caos' }],
          intents: [
            { match: /(why|what|happened|boss|silva|pay|problem)/i, response: "The manager is nice but the place is falling apart. I'm done. See you later.", nextScene: 'lucas_02' },
            { match: /(ok|good luck|fine|understand|sorry)/i, response: "Thanks, man. Good luck with your exam tomorrow.", nextScene: 'lucas_02' }
          ],
          fallback: "Davi is at the door.",
          quickReplies: [
            { label: 'Por quê? O que aconteceu?', text: 'Why? What happened?' },
            { label: 'Boa sorte, cara.', text: 'Good luck, man.' },
            { label: 'Entendo, até mais.', text: 'I understand, see you later.' }
          ]
        },
        lucas_02: {
          npcName: 'Lucas (Você)',
          npcText: "Great. My roommate leaves, I have an exam tomorrow, and I'm starving. Let me order food.",
          glossary: [{ word: 'Starving', meaning: 'Morrendo de fome' }, { word: 'Exam', meaning: 'Prova' }],
          intents: [
            { match: /(order|burger|food|pizza|delivery|app|eat)/i, response: "You open the app. Burger Palace. Cheeseburger and fries. No onions. 'Order placed. 30 minutes.'", nextScene: 'lucas_03' }
          ],
          fallback: "You need food.",
          quickReplies: [
            { label: 'Vou pedir um burger.', text: 'I will order a burger.' },
            { label: 'Vou usar o app.', text: 'I will use the app.' },
            { label: 'Quero comer algo.', text: 'I want to eat something.' }
          ]
        },
        lucas_03: {
          npcName: 'Sistema',
          npcText: "45 minutes later. Your food is still not here. The app says 'on the way' but nothing. You're getting angry.",
          glossary: [{ word: 'On the way', meaning: 'A caminho' }, { word: 'Angry', meaning: 'Com raiva' }],
          intents: [
            { match: /(call|phone|complain|where|late|silva|burger|check)/i, response: "You call Burger Palace. A man answers: 'Burger Palace, Mr. Silva speaking.'", nextScene: 'lucas_04' },
            { match: /(wait|patience|soon|another|minute)/i, response: "You wait 10 more minutes. Nothing. You call.", nextScene: 'lucas_04' }
          ],
          fallback: "You need to call.",
          quickReplies: [
            { label: 'Vou ligar pro Burger Palace.', text: 'I will call the Burger Palace.' },
            { label: 'Cadê minha comida?', text: 'Where is my food?' },
            { label: 'Vou esperar mais.', text: 'I will wait more.' }
          ]
        },
        lucas_04: {
          npcName: 'Mr. Silva',
          npcText: "Burger Palace, Mr. Silva speaking. How can I help you?",
          glossary: [{ word: 'How can I help', meaning: 'Como posso ajudar' }],
          intents: [
            { match: /(where|food|late|burger|order|waiting|angry)/i, response: "I'm sorry, sir. The delivery girl is on her way. The rain is very bad tonight. Please wait a little more.", nextScene: 'lucas_05' },
            { match: /(onion|no onions|remember|told you)/i, response: "No onions. Yes, sir. I have it here. The delivery girl is almost there.", nextScene: 'lucas_05' }
          ],
          fallback: "Hello? Are you there?",
          offensiveScene: 'lucas_bad_competitor',
          quickReplies: [
            { label: 'Cadê minha comida?', text: 'Where is my food?' },
            { label: 'Estou esperando há 45 minutos.', text: 'I have been waiting 45 minutes.' },
            { label: 'Lembra: sem cebola!', text: 'Remember: no onions!' }
          ]
        },
        lucas_05: {
          npcName: 'Sistema',
          npcText: "10 minutes later. The doorbell rings. You open the door. It's your neighbor, not the food.",
          glossary: [{ word: 'Doorbell', meaning: 'Campainha' }, { word: 'Neighbor', meaning: 'Vizinho' }],
          intents: [
            { match: /(hi|hello|neighbor|not now|busy|waiting)/i, response: "Your neighbor asks for sugar. You give it. He leaves. You go back to waiting.", nextScene: 'lucas_06' },
            { match: /(food|burger|not you|sorry|busy)/i, response: "Your neighbor laughs: 'Waiting for food? Good luck.' He leaves.", nextScene: 'lucas_06' }
          ],
          fallback: "Your neighbor is waiting.",
          quickReplies: [
            { label: 'Oi, vizinho.', text: 'Hi, neighbor.' },
            { label: 'Desculpa, estou esperando comida.', text: 'Sorry, I am waiting for food.' },
            { label: 'O que você quer?', text: 'What do you want?' }
          ]
        },
        lucas_06: {
          npcName: 'Sistema',
          npcText: "Finally! The doorbell rings again. This time it's a girl, wet from the rain, holding a bag. 'Burger Palace,' she says. 'I am so sorry for the wait.'",
          addFlags: ['a1_lucas_met_emma'],
          glossary: [{ word: 'Wet', meaning: 'Molhada' }, { word: 'Wait', meaning: 'Espera' }],
          intents: [
            { match: /(finally|thanks|food|here|give|ok|hungry)/i, response: "You take the bag. 'It's about time.' You open it. The burger has... onions.", nextScene: 'lucas_07' }
          ],
          fallback: "Take the bag.",
          quickReplies: [
            { label: 'Finalmente!', text: 'Finally!' },
            { label: 'Obrigado.', text: 'Thanks.' },
            { label: 'Estou morrendo de fome.', text: 'I am starving.' }
          ]
        },
        lucas_07: {
          npcName: 'Lucas (Você)',
          npcText: "Onions. I said NO onions. I hate onions. I'm tired, hungry, and my exam is tomorrow. What do I do?",
          glossary: [{ word: 'Hate', meaning: 'Odeio' }, { word: 'Tired', meaning: 'Cansado' }],
          npcTextVariants: [
            { ifFlag: 'a1_emma_met_lucas', text: "Onions. I said NO onions. (You look at the girl. She looks scared, not malicious. This is not her fault. Maybe.)" }
          ],
          intents: [
            { match: /(calm|ok|fine|sorry|not your fault|girl|rain|wait)/i, response: "You take a breath. 'Okay. I'm sorry. I'm not angry at you. But I can't eat this. Can you get me another one?'", nextScene: 'lucas_08', addsFlags: ['a1_lucas_kind'] },
            { match: /(angry|hate|stupid|bad|terrible|complain|manager)/i, response: "You explode. 'This is a joke! I said no onions! Call your manager!' The girl looks like she might cry.", nextScene: 'lucas_08' }
          ],
          fallback: "Say something. She's waiting.",
          offensiveScene: 'lucas_bad_competitor',
          quickReplies: [
            { label: 'Calma, não é sua culpa.', text: 'Calm down. It is not your fault.' },
            { label: 'Estou com raiva, mas tudo bem.', text: 'I am angry, but it is okay.' },
            { label: 'Chama seu gerente!', text: 'Call your manager!' }
          ]
        },
        lucas_08: {
          npcName: 'Emma',
          npcText: "I'm so sorry. I will go back and get you a new one. I promise. Please wait a little more.",
          glossary: [{ word: 'Promise', meaning: 'Prometer' }, { word: 'Wait', meaning: 'Esperar' }],
          intents: [
            { match: /(ok|go|wait|fine|hurry|please|fast)/i, response: "She runs back into the rain. You close the door. You wait. Again.", nextScene: 'lucas_09' },
            { match: /(sorry|forgive|no problem|rain|careful)/i, response: "She smiles a little. 'Thank you. I will be fast.' She runs back into the rain.", nextScene: 'lucas_09' }
          ],
          fallback: "She's waiting for your answer.",
          quickReplies: [
            { label: 'Vai, eu espero.', text: 'Go, I will wait.' },
            { label: 'Rápido, por favor.', text: 'Fast, please.' },
            { label: 'Cuidado com a chuva.', text: 'Be careful in the rain.' }
          ]
        },
        lucas_09: {
          npcName: 'Sistema',
          npcText: "20 minutes pass. The doorbell rings. You open it. It's Davi, your roommate. He looks tired. 'Hey. I quit my job tonight.'",
          addFlags: ['a1_lucas_knows_davi_quit'],
          glossary: [{ word: 'Roommate', meaning: 'Colega de quarto' }, { word: 'Quit', meaning: 'Pediu demissão' }],
          npcTextVariants: [
            { ifFlag: 'a1_silva_heard_davi_quit', text: "20 minutes pass. Davi comes home. He looks tired. 'Hey. I quit tonight. The manager is a mess. But he tried to fix everything alone.'" }
          ],
          intents: [
            { match: /(why|what|burger|onion|chaos|boss|silva|sorry)/i, response: "Davi explains: 'The manager forgot to check the burger. Then he made another one alone. He's a disaster, but he tried.' You think about the girl in the rain.", nextScene: 'lucas_10' },
            { match: /(ok|tired|sleep|sorry|good night)/i, response: "Davi goes to his room. You sit on the couch. You think about the girl in the rain. You feel a little bad.", nextScene: 'lucas_10' }
          ],
          fallback: "Davi is waiting.",
          quickReplies: [
            { label: 'Por que você saiu?', text: 'Why did you quit?' },
            { label: 'O que aconteceu?', text: 'What happened?' },
            { label: 'Boa noite, Davi.', text: 'Good night, Davi.' }
          ]
        },
        lucas_10: {
          npcName: 'Sistema',
          npcText: "The doorbell rings one more time. You open it. The girl is back. She's soaked, holding a new bag. 'Here. No onions this time. I checked.'",
          glossary: [{ word: 'Soaked', meaning: 'Encharcada' }, { word: 'Checked', meaning: 'Conferi' }],
          intents: [
            { match: /(thanks|sorry|come in|towel|rain|wow|really)/i, response: "You look at her. She came back in the rain. Twice. You remember Davi's words. 'Thank you. Really. You didn't have to come back.'", nextScene: 'lucas_11' },
            { match: /(ok|fine|give|food|hungry|finally)/i, response: "You take the bag. 'Thanks. Finally.' She nods and starts to leave.", nextScene: 'lucas_11' }
          ],
          fallback: "Say something.",
          quickReplies: [
            { label: 'Obrigado, de verdade.', text: 'Thank you, really.' },
            { label: 'Desculpa por antes.', text: 'Sorry about earlier.' },
            { label: 'Você está encharcada!', text: 'You are soaked!' }
          ]
        },
        lucas_11: {
          npcName: 'Lucas (Você)',
          npcText: "The burger is hot. No onions. The girl is still at the door, waiting. Davi is in his room. My exam is tomorrow. What do I do?",
          glossary: [{ word: 'Hot', meaning: 'Quente' }, { word: 'Waiting', meaning: 'Esperando' }],
          intents: [
            { match: /(tip|money|thank|sorry|app|review|good|5 stars)/i, response: "You give her a $5 tip and open the app. 5 stars for Burger Palace. 'The delivery girl, Emma, saved my night.' You eat. The burger is good.", nextScene: 'lucas_end_good', addsFlags: ['a1_lucas_completed', 'a1_lucas_gave_tip'] },
            { match: /(ok|bye|good night|close door|eat|fine)/i, response: "You close the door. You eat. The burger is good. But you feel a little bad about the girl in the rain.", nextScene: 'lucas_end_ok', addsFlags: ['a1_lucas_completed'] }
          ],
          fallback: "You need to decide.",
          quickReplies: [
            { label: 'Aqui, uma gorjeta.', text: 'Here, a tip for you.' },
            { label: 'Vou dar 5 estrelas no app.', text: 'I will give 5 stars on the app.' },
            { label: 'Boa noite.', text: 'Good night.' }
          ]
        },
        lucas_end_good: {
          npcName: 'Narrador',
          npcText: "You eat the burger. It's perfect. You write a 5-star review. The next morning, your exam goes well. Davi tells you the manager gave Emma a raise. You smile. The system is broken, but people are not.",
          glossary: [{ word: 'Raise', meaning: 'Aumento' }],
          isEnd: true,
          endingType: 'bom'
        },
        lucas_end_ok: {
          npcName: 'Narrador',
          npcText: "You eat the burger. It's fine. Not great, not bad. You don't leave a review. The next morning, your exam is okay. Life goes on.",
          isEnd: true,
          endingType: 'ok'
        },
        lucas_bad_competitor: {
          npcName: 'Narrador',
          npcText: "You say something terrible. Emma leaves in tears. You don't eat that night. Davi hears about it and doesn't speak to you for a week. You order from a competitor. The burger is cold. Your exam is a disaster.",
          glossary: [{ word: 'Tears', meaning: 'Lágrimas' }, { word: 'Competitor', meaning: 'Concorrente' }],
          isEnd: true,
          endingType: 'ruim'
        }
      }
    }
  }
};