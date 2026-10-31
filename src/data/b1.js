const gameDataB1 = {
  id: 'b1',
  title: 'Clínica da Madrugada',
  shopItems: [
    { id: 'coffee', name: '☕ Strong Coffee', price: 5.00, energy: 20, desc: 'Restores 20 energy. Tastes awful.' },
    { id: 'taxi', name: '🚕 Taxi Ride', price: 20.00, energy: 10, desc: 'Saves your energy for the next scene.' }
  ],
  characters: {
    alex: {
      charId: 'alex',
      name: 'Alex',
      role: 'Patient',
      emoji: '🤒',
      description: 'You ate sketchy food in NYC. Now you are at the ER with a $1,500 bill and a broken insurance.',
      initialState: { money: 50.00, energy: 80 },
      startScene: 'alex_1',
      scenes: {
        alex_1: {
          npcName: 'Receptionist',
          npcText: "Good evening. You look awful, dude. Are you here to see a doctor?",
          energyCost: 5,
          glossary: [{ word: 'Awful', meaning: 'Horrível' }, { word: 'Dude', meaning: 'Cara' }],
          quickReplies: [
            { label: 'Sim, me sentindo mal.', text: "Yeah, I have been feeling sick since last night." },
            { label: 'Estou morrendo de dor.', text: "I have had a terrible stomachache all day." }
          ],
          intents: [
            { match: /(sick|feel|stomach|pain|hurt|since|all day|been|vomit)/i, response: "I am sorry to hear that. Can you describe your symptoms?", nextScene: 'alex_2' }
          ],
          fallback: "I am sorry, I did not catch that. Are you sick?",
          offensiveScene: 'alex_bad_1'
        },
        alex_2: {
          npcName: 'Triage Nurse',
          npcText: "I see. Have you eaten anything unusual or... sketchy recently? Be honest, it helps.",
          energyCost: 5,
          glossary: [{ word: 'Sketchy', meaning: 'Suspeito / Duvidoso' }],
          quickReplies: [
            { label: 'Comi frutos do mar suspeitos.', text: "I ate seafood at a sketchy place yesterday." },
            { label: 'Talvez tenha sido o hambúrguer.', text: "Maybe it was that sketchy burger I ate." }
          ],
          intents: [
            { match: /(seafood|ate|burger|food|yesterday|sketchy)/i, response: "Ah, that is a red flag. We see this a lot. Please fill out this form. Your insurance card, please.", nextScene: 'alex_3' }
          ],
          fallback: "Try to remember. What did you eat? Was it sketchy?",
          offensiveScene: 'alex_bad_1'
        },
        alex_3: {
          npcName: 'Nurse',
          npcText: "Wait... your insurance card is from a different state? I am sorry, but we are out-of-network. You will have to pay upfront.",
          energyCost: 10,
          glossary: [{ word: 'Out-of-network', meaning: 'Fora da rede credenciada' }, { word: 'Upfront', meaning: 'Adiantado' }],
          quickReplies: [
            { label: 'Não tenho esse dinheiro agora.', text: "I do not have that kind of money right now. Is there another way?" },
            { label: 'Eu posso pagar depois.', text: "I can pay you later, I just need to see a doctor." }
          ],
          intents: [
            { match: /(money|another way|pay|card|expensive|after)/i, response: "Well, if you do not pay, you cannot see the doctor. You must sign this waiver or go home.", nextScene: 'alex_4' }
          ],
          fallback: "I need to know how you are going to pay for this.",
          offensiveScene: 'alex_bad_2'
        },
        alex_4: {
          npcName: 'Doctor',
          npcText: "Hello, I am Dr. Smith. The nurse tells me you have been vomiting. You must stay for a hydration IV. It will be $1,500.",
          energyCost: 5,
          glossary: [{ word: 'Must', meaning: 'Deve (obrigação forte)' }],
          quickReplies: [
            { label: 'Tudo bem, preciso de ajuda.', text: "Okay, I really need to feel better. Do what you have to do." },
            { label: 'Quinze mil?! Isso é um roubo.', text: "Fifteen hundred?! That is a rip-off! I cannot afford that." }
          ],
          intents: [
            { match: /(ok|stay|help|need|fine|do it)/i, response: "Good. The nurse will bring the bill later. Get some rest.", nextScene: 'alex_5' },
            { match: /(rip-off|afford|expensive|robbery|money)/i, response: "Welcome to the American healthcare system, dude. You can argue with billing later.", nextScene: 'alex_5' }
          ],
          fallback: "You must stay to get better. It is important.",
          offensiveScene: 'alex_bad_1'
        },
        alex_5: {
          npcName: 'Nurse',
          npcText: "Here is your bill. Since you are out-of-network, you must pay $1,500. You should have bought travel insurance before coming.",
          energyCost: 15,
          glossary: [{ word: 'Should have', meaning: 'Deveria ter (arrependimento)' }],
          quickReplies: [
            { label: 'Eu tenho seguro viagem!', text: "I do have travel insurance! Here is my policy." },
            { label: 'Não tenho esse dinheiro.', text: "I do not have that kind of money. I am broke." }
          ],
          intents: [
            { match: /(insurance|policy|have|travel)/i, response: "Wait, you do? Let me check... oh, the system is down. We cannot verify it tonight. You must pay a $500 deposit.", nextScene: 'alex_6' },
            { match: /(broke|money|cannot pay|no money)/i, response: "Since you cannot pay, you must work in the cafeteria to pay off the debt. Or we call the police.", nextScene: 'alex_6' }
          ],
          fallback: "I need to know how you are going to pay this.",
          offensiveScene: 'alex_bad_2'
        },
        alex_6: {
          npcName: 'Billing Department',
          npcText: "Mr. Alex? I am from the billing department. The system is down, but we can do a manual check. Do you have your insurance number?",
          energyCost: 10,
          glossary: [{ word: 'Manual check', meaning: 'Verificação manual' }],
          quickReplies: [
            { label: 'Sim, aqui está o número.', text: "Yes, here is my insurance number. Please check it manually." },
            { label: 'Não sei de cor.', text: "I do not know it by heart. Can I call my insurance company?" }
          ],
          intents: [
            { match: /(yes|number|here|check)/i, response: "Okay, let me type it in... it is going to take a while. The system is very slow.", nextScene: 'alex_7' },
            { match: /(call|do not know|heart|company)/i, response: "You can call them. But the phone lines are down. You should wait here.", nextScene: 'alex_7' }
          ],
          fallback: "We need the number, sir.",
          offensiveScene: 'alex_bad_2'
        },
        alex_7: {
          npcName: 'Pharmacist',
          npcText: "Your prescription is ready, but your insurance does not cover this specific medicine. It will cost $200. Do you want it or not?",
          energyCost: 10,
          glossary: [{ word: 'Cover', meaning: 'Cobrir (seguro)' }, { word: 'Prescription', meaning: 'Receita médica' }],
          quickReplies: [
            { label: 'Vou pagar do meu bolso.', text: "I will pay out of pocket. Give me the medicine." },
            { label: 'Tem um genérico mais barato?', text: "Is there a cheaper generic version? I cannot afford $200." }
          ],
          intents: [
            { match: /(pay|pocket|medicine|give)/i, response: "Here you go. You will feel better in a few hours. Take care.", nextScene: 'alex_end_good' },
            { match: /(cheaper|generic|afford|cannot)/i, response: "Yes, there is a generic. It is $40. It is not as strong, but it works. Do you want it?", nextScene: 'alex_end_ok' }
          ],
          fallback: "I need an answer. There is a line behind you.",
          offensiveScene: 'alex_bad_2'
        },
        alex_end_good: { npcName: 'Narrador', npcText: "You got the medicine. You paid the bill. You survived the American healthcare system. Highkey a nightmare, but you made it.", isEnd: true, endingType: 'bom' },
        alex_end_ok: { npcName: 'Narrador', npcText: "You got the generic medicine. It is not perfect, but you feel better. You saved some money. It is a win, I guess.", isEnd: true, endingType: 'ok' },
        alex_bad_1: { npcName: 'Security', npcText: "You are causing a scene. You must leave immediately. Bail out!", isEnd: true, endingType: 'ruim' },
        alex_bad_2: { npcName: 'Security', npcText: "Since you cannot pay, we are calling the police. You should have read the fine print.", isEnd: true, endingType: 'ruim' }
      }
    },
    taylor: {
      charId: 'taylor',
      name: 'Taylor',
      role: 'ER Nurse',
      emoji: '👩‍⚕️',
      description: 'Night shift at the ER. A patient is yelling, the system is down, and the doctor is useless. Survive.',
      initialState: { money: 100.00, energy: 90 },
      startScene: 'taylor_1',
      scenes: {
        taylor_1: {
          npcName: 'System',
          npcText: "It is 3 AM. A patient (Alex) is yelling at the front desk. He says: 'I have been waiting for two hours! This is a joke!'",
          energyCost: 5,
          glossary: [{ word: 'Yelling', meaning: 'Gritando' }, { word: 'Joke', meaning: 'Piada' }],
          quickReplies: [
            { label: 'Tentar acalmar o paciente.', text: "Sir, you need to chill. We are doing our best." },
            { label: 'Ignorar e continuar o trabalho.', text: "I will just ignore him and check the other patients." }
          ],
          intents: [
            { match: /(chill|calm|best|sorry)/i, response: "Chill? I have been waiting forever! This is a red flag for this hospital!", nextScene: 'taylor_2' },
            { match: /(ignore|check|other)/i, response: "He gets even more angry and starts recording you on his phone. That is a huge red flag.", nextScene: 'taylor_2' }
          ],
          fallback: "He is still yelling. You need to do something.",
          offensiveScene: 'taylor_bad_1'
        },
        taylor_2: {
          npcName: 'Alex (Patient)',
          npcText: "I am lowkey dying here! If you do not help me right now, I am going to post this on Twitter!",
          energyCost: 10,
          glossary: [{ word: 'Lowkey', meaning: 'Meio que / Discretamente' }, { word: 'If you do not', meaning: 'Se você não (First Conditional)' }],
          quickReplies: [
            { label: 'Ameaçar chamar a segurança.', text: "If you do not calm down, I will call security." },
            { label: 'Oferecer um café e um cobertor.', text: "Here, have a coffee. I will check your file right now." }
          ],
          intents: [
            { match: /(security|calm down|call)/i, response: "Security? Are you kidding me? I am the victim here! I want to speak to the manager!", nextScene: 'taylor_3' },
            { match: /(coffee|blanket|check|file|here)/i, response: "Oh... thanks, I guess. I just want to see the doctor. I have had this pain since last night.", nextScene: 'taylor_3' }
          ],
          fallback: "He is waiting for your answer.",
          offensiveScene: 'taylor_bad_1'
        },
        taylor_3: {
          npcName: 'Dr. Smith',
          npcText: "Taylor, why is that patient yelling? You were supposed to handle the front desk. This is your fault.",
          energyCost: 15,
          glossary: [{ word: 'Supposed to', meaning: 'Deveria (expectativa)' }],
          quickReplies: [
            { label: 'Assumir a culpa.', text: "I am sorry, Dr. Smith. I will fix this right now." },
            { label: 'Se defender (ele é o médico).', text: "With all due respect, you are the doctor. You should see him. He has been waiting for hours." }
          ],
          intents: [
            { match: /(sorry|fix|assume)/i, response: "Good. Go fix it. I am going to get some coffee. Do not bother me again.", nextScene: 'taylor_4' },
            { match: /(doctor|waiting|respect|see him)/i, response: "Excuse me? Are you gaslighting me? I am the doctor here. You are just a nurse. Do your job!", nextScene: 'taylor_bad_2' }
          ],
          fallback: "I am waiting for your excuse, Taylor.",
          offensiveScene: 'taylor_bad_1'
        },
        taylor_4: {
          npcName: 'System',
          npcText: "Dr. Smith leaves. The hospital IT system crashes completely. You cannot access Alex's file or his insurance info. He is getting worse.",
          energyCost: 15,
          glossary: [{ word: 'Crash', meaning: 'Cair / Travar (sistema)' }],
          quickReplies: [
            { label: 'Tentar reiniciar o sistema.', text: "I will try to reboot the system and see if I can get the file." },
            { label: 'Improvisar e atender o Alex manualmente.', text: "I will take his vitals manually and write everything down on paper." }
          ],
          intents: [
            { match: /(reboot|system|restart)/i, response: "You reboot the system. It works, but it takes 20 minutes. Alex is in pain.", nextScene: 'taylor_5' },
            { match: /(manual|vitals|paper|write)/i, response: "You take his vitals manually. It takes time, but you are a nurse. You can do this.", nextScene: 'taylor_5' }
          ],
          fallback: "The system is down. You have to do something.",
          offensiveScene: 'taylor_bad_2'
        },
        taylor_5: {
          npcName: 'Alex (Patient)',
          npcText: "Nurse, I am really scared. The pain is getting worse. Am I going to be okay?",
          energyCost: 10,
          glossary: [{ word: 'Scared', meaning: 'Assustado' }, { word: 'Worse', meaning: 'Pior' }],
          quickReplies: [
            { label: 'Mentir e dizer que vai ficar tudo bem.', text: "You are going to be fine. I promise. Just breathe." },
            { label: 'Ser honesta e dizer que não sabe.', text: "I do not know yet, but we are doing everything we can. You are not alone." }
          ],
          intents: [
            { match: /(fine|promise|breathe)/i, response: "Okay... I trust you. Thank you for being nice to me.", nextScene: 'taylor_6' },
            { match: /(do not know|not alone|everything|can)/i, response: "Thank you for being honest. I feel a little better knowing you are here.", nextScene: 'taylor_6' }
          ],
          fallback: "Just tell me something, nurse.",
          offensiveScene: 'taylor_bad_1'
        },
        taylor_6: {
          npcName: 'Dr. Smith',
          npcText: "I am back. Did you fix the patient? I need to check his file. Why is the system down? This is a disaster. You must fix this.",
          energyCost: 15,
          glossary: [{ word: 'Disaster', meaning: 'Desastre' }, { word: 'Must', meaning: 'Deve' }],
          quickReplies: [
            { label: 'Dizer que o sistema caiu.', text: "The system crashed, Dr. Smith. I did what I could manually." },
            { label: 'Dizer que ele deveria ter visto o paciente antes.', text: "Maybe if you had seen the patient earlier, we would not be in this mess." }
          ],
          intents: [
            { match: /(crashed|manual|did what)/i, response: "Manual? This is not the Stone Age, Taylor. Write a report. I will be in my office.", nextScene: 'taylor_7' },
            { match: /(earlier|mess|should have)/i, response: "How dare you speak to me like that? You are insubordinate! I will report you to HR!", nextScene: 'taylor_bad_2' }
          ],
          fallback: "I am waiting, Taylor.",
          offensiveScene: 'taylor_bad_1'
        },
        taylor_7: {
          npcName: 'HR Manager',
          npcText: "Taylor, we received a complaint from Dr. Smith. He says you were insubordinate. What happened?",
          energyCost: 10,
          glossary: [{ word: 'Complaint', meaning: 'Reclamação' }, { word: 'Insubordinate', meaning: 'Insubordinado' }],
          quickReplies: [
            { label: 'Explicar tudo com calma.', text: "Dr. Smith refused to see a patient in pain. The system crashed. I did my best." },
            { label: 'Pedir demissão.', text: "I am done. This place is a mess. I quit." }
          ],
          intents: [
            { match: /(explain|best|crash|patient)/i, response: "I see. I will talk to Dr. Smith. You can go home. You did a good job tonight.", nextScene: 'taylor_end_good' },
            { match: /(quit|done|mess)/i, response: "Are you sure? You were a good nurse. But I understand. Good luck.", nextScene: 'taylor_end_ok' }
          ],
          fallback: "I need to know your side of the story.",
          offensiveScene: 'taylor_bad_1'
        },
        taylor_end_good: { npcName: 'Narrador', npcText: "You survived the shift. Alex is okay. HR is on your side. You highkey flexed your de-escalation skills.", isEnd: true, endingType: 'bom' },
        taylor_end_ok: { npcName: 'Narrador', npcText: "You quit. It was a bad night. But you saved Alex. That is what matters. You go home.", isEnd: true, endingType: 'ok' },
        taylor_bad_1: { npcName: 'Manager', npcText: "The patient recorded you being rude. This is a huge red flag. You are fired.", isEnd: true, endingType: 'ruim' },
        taylor_bad_2: { npcName: 'Manager', npcText: "Dr. Smith reported you. You are fired for insubordination. You must leave the building.", isEnd: true, endingType: 'ruim' }
      }
    }
  }
};