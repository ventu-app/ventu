const gameDataB1 = {
  id: 'b1',
  title: 'Clinica da Madrugada',
  shopItems: [
    { id: 'coffee', name: 'Cafe Ruim da Maquina', price: 5.00, energy: 20, desc: 'Recupera 20 de energia, mas o gosto e duvidoso.' },
    { id: 'insurance', name: 'Seguro Saude Falso', price: 100.00, desc: 'Ajuda a pagar a conta no final.' }
  ],
  characters: {
    alex: {
      charId: 'alex',
      name: 'Alex',
      role: 'Paciente',
      emoji: '🤒',
      description: 'Voce comeu sketchy food, esta passando mal e o hospital americano nao e barato.',
      initialState: { money: 50.00, energy: 60 },
      startScene: 'alex_1',
      scenes: {
        alex_1: {
          npcName: 'Receptionist',
          npcText: "Good evening. You look awful, dude. Are you here to see a doctor?",
          energyCost: 5,
          glossary: [{ word: 'Awful', meaning: 'Horrivel' }, { word: 'Dude', meaning: 'Cara' }],
          quickReplies: [
            { label: 'Sim, me sentindo muito mal.', text: "Yeah, I have been feeling sick since last night." },
            { label: 'Estou morrendo de dor de barriga.', text: "I have had a bad stomachache all day." }
          ],
          intents: [
            { match: /(sick|feel|stomach|pain|hurt|since|all day|been|vomit)/i, response: "I am sorry to hear that. Can you describe your symptoms?", nextScene: 'alex_2', explanation: 'Voce usou o Present Perfect ("I have been feeling..." / "I have had...") para algo que comecou no passado e continua agora. Perfeito para o B1.' }
          ],
          fallback: "I am sorry, I did not catch that. Are you sick?",
          offensiveScene: 'alex_bad_1'
        },
        alex_2: {
          npcName: 'Receptionist',
          npcText: "I see. Have you eaten anything unusual or... sketchy recently?",
          energyCost: 5,
          glossary: [{ word: 'Unusual', meaning: 'Incomum' }, { word: 'Sketchy', meaning: 'Suspeito / Duvidoso' }],
          quickReplies: [
            { label: 'Comi frutos do mar num lugar suspeito.', text: "I ate seafood at a sketchy place yesterday." },
            { label: 'Acho que foi aquele hamburguer duvidoso.', text: "Maybe it was that sketchy burger I ate." }
          ],
          intents: [
            { match: /(seafood|ate|burger|food|yesterday|sketchy)/i, response: "Ah, that is a red flag. We see this a lot. Please fill out this form.", nextScene: 'alex_3', explanation: '"Sketchy" (duvidoso) e "red flag" (alerta) sao girias B1 essenciais para o dia a dia.' }
          ],
          fallback: "Try to remember. What did you eat? Was it sketchy?",
          offensiveScene: 'alex_bad_1'
        },
        alex_3: {
          npcName: 'Doctor',
          npcText: "Hello, I am Dr. Smith. The nurse tells me you have been vomiting. You must stay here for a hydration IV.",
          energyCost: 5,
          glossary: [{ word: 'Must', meaning: 'Deve (obrigacao forte)' }],
          quickReplies: [
            { label: 'Quanto tempo vai demorar?', text: "How long will I have to stay here?" },
            { label: 'Tudo bem, eu preciso de ajuda.', text: "Okay, I really need to feel better." }
          ],
          intents: [
            { match: /(ok|stay|help|need|how long|fine)/i, response: "Just a few hours. The nurse will bring the bill later. Get some rest.", nextScene: 'alex_4' }
          ],
          fallback: "You must stay to get better. It is important.",
          offensiveScene: 'alex_bad_1'
        },
        alex_4: {
          npcName: 'Nurse',
          npcText: "Here is your bill. It is $1,500. You should have travel insurance, otherwise this is going to be a huge headache.",
          energyCost: 10,
          glossary: [{ word: 'Should', meaning: 'Deveria (conselho)' }],
          quickReplies: [
            { label: 'Eu tenho seguro!', text: "I have travel insurance! Here is my policy." },
            { label: 'Mil e quinhentos?! Nao tenho esse dinheiro.', text: "Fifteen hundred?! I do not have that kind of money." }
          ],
          intents: [
            { match: /(insurance|policy|have)/i, response: "Perfect. Let me copy this. You are good to go. Take it easy, dude.", nextScene: 'alex_end_good', explanation: '"Should have" e usado para arrependimento ou conselho no passado. Ex: "You should have bought insurance".' },
            { match: /(money|do not have|expensive|pay|card)/i, response: "Well, if you do not have insurance, you cannot leave. You must pay or work here.", nextScene: 'alex_end_bad', explanation: 'Voce usou "if" + present simple. Isso e o First Conditional, usado para situacoes reais no futuro.' }
          ],
          fallback: "I need to know how you are going to pay this.",
          offensiveScene: 'alex_bad_2'
        },
        alex_end_good: { npcName: 'Narrador', npcText: "You used your insurance. You got your IV and felt better. You learned a lesson: never eat sketchy seafood again.", isEnd: true, endingType: 'bom' },
        alex_end_bad: { npcName: 'Narrador', npcText: "You had to wash dishes in the hospital cafeteria for 3 days to pay the bill. Your trip was ruined. Highkey worst vacation ever.", isEnd: true, endingType: 'ruim' },
        alex_bad_1: { npcName: 'Security', npcText: "You are causing a scene. You must leave immediately. Bail out!", isEnd: true, endingType: 'ruim' },
        alex_bad_2: { npcName: 'Security', npcText: "Since you cannot pay, we are calling the police. You should have read the fine print.", isEnd: true, endingType: 'ruim' }
      }
    },
    taylor: {
      charId: 'taylor',
      name: 'Taylor',
      role: 'Enfermeira',
      emoji: '👩‍⚕️',
      description: 'Turno da madrugada. O paciente esta surtando na recepcao. De um jeito.',
      initialState: { money: 100.00, energy: 80 },
      startScene: 'taylor_1',
      scenes: {
        taylor_1: {
          npcName: 'Sistema',
          npcText: "It is 3 AM. A patient (Alex) is yelling at the front desk. He says: I have been waiting for two hours! This is a joke!",
          energyCost: 5,
          glossary: [{ word: 'Yelling', meaning: 'Gritando' }],
          quickReplies: [
            { label: 'Tentar acalmar o paciente', text: "Sir, you need to chill. We are doing our best." },
            { label: 'Ignorar e continuar o trabalho', text: "I will just ignore him and check the other patients." }
          ],
          intents: [
            { match: /(chill|calm|best|sorry)/i, response: "Chill? I have been waiting forever! This is a red flag for this hospital!", nextScene: 'taylor_2', explanation: '"Chill" e uma gíria B1 que significa "relaxar/acalmar". Usar isso com um paciente bravo pode ser arriscado, mas voce tentou.' },
            { match: /(ignore|check|other)/i, response: "He gets even more angry and starts recording you on his phone. That is a huge red flag.", nextScene: 'taylor_2' }
          ],
          fallback: "He is still yelling. You need to do something.",
          offensiveScene: 'taylor_bad_1'
        },
        taylor_2: {
          npcName: 'Alex (Paciente)',
          npcText: "I am lowkey dying here! If you do not help me right now, I am going to post this on Twitter!",
          energyCost: 10,
          glossary: [{ word: 'Lowkey', meaning: 'Meio que / Discretamente' }, { word: 'If you do not', meaning: 'Se voce nao (First Conditional)' }],
          quickReplies: [
            { label: 'Ameacar chamar a seguranca', text: "If you do not calm down, I will call security." },
            { label: 'Oferecer um cafe e um cobertor', text: "Here, have a coffee. I will check your file right now." }
          ],
          intents: [
            { match: /(security|calm down|call)/i, response: "Security? Are you kidding me? I am the victim here! I want to speak to the manager!", nextScene: 'taylor_bad_2' },
            { match: /(coffee|blanket|check|file|here)/i, response: "Oh... thanks, I guess. I just want to see the doctor. I have had this pain since last night.", nextScene: 'taylor_3', explanation: 'Voce usou "If you do not..." (First Conditional) e "I have had..." (Present Perfect). Excelente gramatica B1!' }
          ],
          fallback: "He is waiting for your answer.",
          offensiveScene: 'taylor_bad_1'
        },
        taylor_3: {
          npcName: 'Alex (Paciente)',
          npcText: "Okay, I am sorry for yelling. This pain is killing me. What should I do?",
          energyCost: 5,
          quickReplies: [
            { label: 'Manda-lo esperar mais um pouco', text: "You should wait in the waiting room. The doctor will see you soon." },
            { label: 'Chamar o medico imediatamente', text: "I will call the doctor right now. Just stay here." }
          ],
          intents: [
            { match: /(wait|soon|should|room)/i, response: "Okay, I will wait. Thanks for listening, nurse.", nextScene: 'taylor_end_good', explanation: 'Voce usou "should" para dar um conselho/sugestao ("You should wait"). Muito util no B1.' },
            { match: /(call|doctor|right now|stay)/i, response: "Thank you. You are the only one who helped me tonight.", nextScene: 'taylor_end_good' }
          ],
          fallback: "I am still in pain. What should I do?",
          offensiveScene: 'taylor_bad_1'
        },
        taylor_end_good: { npcName: 'Narrador', npcText: "You saved the night. The doctor saw Alex and he got better. You highkey flexed your de-escalation skills.", isEnd: true, endingType: 'bom' },
        taylor_bad_1: { npcName: 'Manager', npcText: "The patient recorded you being rude. This is a huge red flag. You are fired.", isEnd: true, endingType: 'ruim' },
        taylor_bad_2: { npcName: 'Manager', npcText: "You called security for no reason. The hospital is getting a bad review. You must go home.", isEnd: true, endingType: 'ruim' }
      }
    }
  }
};