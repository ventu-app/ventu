const gameDataA2 = {
    id: 'a2',
    title: 'Hotel Luxo',
    shopItems: [
        { id: 'coffee', name: '☕ Café Expresso', price: 15.00, energy: 20, desc: 'Recupera 20 de energia.' },
        { id: 'upgrade', name: '⭐ Upgrade de Quarto', price: 100.00, desc: 'Acalma a Sofia e evita finais ruins.' }
    ],
    characters: {
        mia: {
            charId: 'mia',
            name: 'Mia',
            role: 'Recepcionista',
            emoji: '👩‍💼',
            description: 'A linha de frente. Precisa lidar com hóspedes furiosos e um sistema de TI que caiu.',
            initialState: { money: 150.00, energy: 100 },
            startScene: 'mia_1',
            scenes: {
                mia_1: {
                    npcName: 'Sistema',
                    npcText: 'Mia, o sistema de reservas do hotel acabou de cair! A fila no balcão está crescendo. Do nada, uma mulher muito bem vestida (Sofia VIP) bate na sua mesa com raiva porque perdeu a reserva dela.',
                    energyCost: 5,
                    glossary: [{ word: 'Front Desk', meaning: 'Recepção' }, { word: 'Reservation', meaning: 'Reserva' }],
                    quickReplies: [
                        { label: 'Resolver na mão com educação', text: 'I am sorry for the delay. Let me check your reservation manually.' },
                        { label: 'Culpar o sistema (Ruim)', text: 'Our system crashed, it is not my fault.' }
                    ],
                    intents: [
                        { match: /(sorry|apologize|manual|check)/i, nextScene: 'mia_2', addsFlags: ['mia_helped'], energyCost: 5 },
                        { match: /(fault|system|crash)/i, nextScene: 'mia_fail_1' }
                    ],
                    fallback: 'A Sofia olha para você com desdém e bate a mão no balcão. O tempo está passando e a fila atrás dela começa a resmungar.',
                    offensiveScene: 'mia_fail_1'
                },
                mia_fail_1: { npcName: 'Sofia', npcText: 'Are you kidding me? I want to speak to your manager right now! I am not paying for this terrible service.', isEnd: true, endingType: 'ruim' },
                mia_2: {
                    npcName: 'Sofia',
                    npcText: 'Finally! Someone with some competence. Please, just give me a room. I need to rest. Oh, and where is the bellboy? My luggage is still outside in the taxi!',
                    energyCost: 5,
                    glossary: [{ word: 'Bellboy', meaning: 'Carregador de malas' }, { word: 'Luggage', meaning: 'Bagagem' }],
                    quickReplies: [
                        { label: 'Prometer que vai mandar alguém', text: 'I will send someone for your luggage immediately, Ms. Sofia.' },
                        { label: 'Oferecer um café enquanto espera', text: 'While you wait, can I offer you a complimentary coffee?' }
                    ],
                    intents: [
                        { match: /(send someone|immediately|luggage)/i, nextScene: 'mia_3_bellboy', energyCost: 5 },
                        { match: /(coffee|café|drink)/i, nextScene: 'mia_3_bellboy', addsFlags: ['coffee_offered'], energyCost: 5 }
                    ],
                    fallback: 'Sofia cruza os braços. "I am waiting! My bags are heavy and the taxi driver is angry!"',
                    offensiveScene: 'mia_fail_1'
                },
                mia_3_bellboy: {
                    npcName: 'Sistema',
                    npcText: 'O carregador de malas (Bellboy) se aproxima de você, desesperado: "Mia, o elevador de serviço quebrou! Como eu vou levar as malas da Sra. Sofia para o 10º andar?"',
                    energyCost: 5,
                    glossary: [{ word: 'Elevator', meaning: 'Elevador' }, { word: 'Broken', meaning: 'Quebrado' }],
                    quickReplies: [
                        { label: 'Mandar usar as escadas', text: 'Use the stairs. It is the only way.' },
                        { label: 'Avisar a Sofia sobre o problema', text: 'Let me explain the situation to Ms. Sofia.' }
                    ],
                    intents: [
                        { match: /(stairs|only way)/i, nextScene: 'mia_4_stairs', energyCost: 5 },
                        { match: /(explain|situation|tell)/i, nextScene: 'mia_4_explain', energyCost: 5 }
                    ],
                    fallback: 'O Bellboy puxa o ar. "The stairs? With all this luggage? Mr. Carter will not like this."',
                    offensiveScene: 'mia_fail_2'
                },
                mia_4_stairs: {
                    npcName: 'Sofia',
                    npcText: 'I am hearing that the elevator is broken? Are you serious? I am not waiting for my bags to come up 10 floors by stairs! Get the manager!',
                    energyCost: 5,
                    glossary: [{ word: 'Manager', meaning: 'Gerente' }],
                    quickReplies: [
                        { label: 'Oferecer um upgrade', text: 'Please accept our apologies. I can offer you a free room upgrade on the first floor.' },
                        { label: 'Dizer que não pode fazer nada', text: 'I am sorry, but there is nothing I can do right now.' }
                    ],
                    intents: [
                        { match: /(upgrade|apologize|free)/i, nextScene: 'mia_5_walkin', requiresItem: 'upgrade', money: -100, addsFlags: ['upgraded'], energyCost: 10 },
                        { match: /(nothing|can't|cannot)/i, nextScene: 'mia_fail_2' }
                    ],
                    fallback: 'Sofia começa a gravar um vídeo no celular. "This is going on TripAdvisor!"',
                    offensiveScene: 'mia_fail_2'
                },
                mia_4_explain: {
                    npcName: 'Sofia',
                    npcText: 'You are telling me the elevator is broken? Unbelievable. Okay, fine. But my bags better be in my room in 10 minutes, or I am checking out.',
                    energyCost: 5,
                    glossary: [{ word: 'Check out', meaning: 'Fazer o check-out / Sair do hotel' }],
                    quickReplies: [
                        { label: 'Garantir que vai dar certo', text: 'I assure you, Ms. The bellboy will run up the stairs.' },
                        { label: 'Ficar em silêncio e aceitar', text: '...' }
                    ],
                    intents: [
                        { match: /(assure|run|will be there)/i, nextScene: 'mia_5_walkin', energyCost: 5 },
                        { match: /(\.\.\.)/i, nextScene: 'mia_5_walkin', energyCost: 5 }
                    ],
                    fallback: 'Ela suspira e olha para o relógio. "I am counting the minutes."',
                    offensiveScene: 'mia_fail_2'
                },
                mia_fail_2: { npcName: 'Sofia', npcText: 'Unbelievable. I am calling my travel agent right now. This hotel is a joke.', isEnd: true, endingType: 'ruim' },
                mia_5_walkin: {
                    npcName: 'Sistema',
                    npcText: 'Meia hora se passou. A fila finalmente diminuiu, mas quando você ia respirar, um homem de terno (Mr. Smith) entra correndo no hotel. "I need a room right now! My flight was cancelled!" Você olha no sistema: o hotel está LOTADO.',
                    energyCost: 10,
                    glossary: [{ word: 'Fully booked', meaning: 'Lotado / Sem vagas' }, { word: 'Flight', meaning: 'Voo' }],
                    quickReplies: [
                        { label: 'Dizer a verdade (lotado)', text: 'I am so sorry, sir. We are fully booked tonight.' },
                        { label: 'Tentar encontrar um quarto', text: 'Let me check if we have any last-minute cancellations.' }
                    ],
                    intents: [
                        { match: /(fully booked|full|sorry)/i, nextScene: 'mia_6_noise', energyCost: 5 },
                        { match: /(cancellation|check|last-minute)/i, nextScene: 'mia_6_noise', addsFlags: ['checked_system'], energyCost: 5 }
                    ],
                    fallback: 'Mr. Smith bate na mesa. "I know you have rooms! I always stay here!"',
                    offensiveScene: 'mia_fail_3'
                },
                mia_fail_3: { npcName: 'Mr. Smith', npcText: 'This is unacceptable! I am a gold member! I will never come back to this hotel!', isEnd: true, endingType: 'ruim' },
                mia_6_noise: {
                    npcName: 'Sistema',
                    npcText: 'Você conseguiu lidar com o Mr. Smith. De repente, o telefone toca. É a Sofia, no quarto 1002. "There is a terrible noise next door! People are screaming! Do something!"',
                    energyCost: 10,
                    glossary: [{ word: 'Noise', meaning: 'Barulho' }, { word: 'Complaint', meaning: 'Reclamação' }],
                    quickReplies: [
                        { label: 'Ligar para o quarto barulhento', text: 'I will call the guest and ask them to keep it down.' },
                        { label: 'Subir até o quarto pessoalmente', text: 'I am going to the room myself to handle it.' }
                    ],
                    intents: [
                        { match: /(call|ask|keep it down)/i, nextScene: 'mia_7_morning', energyCost: 5 },
                        { match: /(going|myself|room)/i, nextScene: 'mia_7_morning', addsFlags: ['personal_touch'], energyCost: 10 }
                    ],
                    fallback: 'A Sofia grita no telefone. "Are you going to do something or not?!"',
                    offensiveScene: 'mia_fail_4'
                },
                mia_fail_4: { npcName: 'Sofia', npcText: 'I am packing my bags right now. I will find a hotel where people actually work!', isEnd: true, endingType: 'ruim' },
                mia_7_morning: {
                    npcName: 'Sistema',
                    npcText: 'Você resolveu o barulho. São 6 da manhã. O sol está nascendo. O gerente do turno da manhã chega e te vê exausta no balcão. "Rough night, Mia? How was the shift?"',
                    energyCost: 0,
                    glossary: [{ word: 'Shift', meaning: 'Turno de trabalho' }],
                    quickReplies: [
                        { label: 'Dizer que foi um caos, mas deu certo', text: 'It was a nightmare, but I handled it. The guests are safe.' },
                        { label: 'Reclamar de tudo', text: 'It was the worst night of my life. Everything broke.' }
                    ],
                    intents: [
                        { match: /(handled|safe|managed|nightmare but)/i, nextScene: 'mia_8_end_good' },
                        { match: /(worst|everything broke|complain)/i, nextScene: 'mia_8_end_ok' }
                    ],
                    fallback: 'O gerente espera pela sua resposta.',
                    offensiveScene: 'mia_8_end_ok'
                },
                mia_8_end_good: { npcName: 'Gerente', npcText: 'I heard about the system crash and the VIP. You did a great job keeping the front desk together. Go home and rest. The morning team will take over.', isEnd: true, endingType: 'bom' },
                mia_8_end_ok: { npcName: 'Gerente', npcText: 'Well... it happens. Go home, Mia. We will fix the systems later.', isEnd: true, endingType: 'ok' }
            }
        },
        carter: {
            charId: 'carter',
            name: 'Mr. Carter',
            role: 'Gerente',
            emoji: '🤵',
            description: 'O resolvedor. Tem que gerenciar a equipe, o orçamento e a avaliação do hotel no TripAdvisor.',
            initialState: { money: 500.00, energy: 100 },
            startScene: 'carter_1',
            scenes: {
                carter_1: {
                    npcName: 'Sistema',
                    npcText: 'O sistema de TI do hotel caiu. A fila no check-in está enorme. A equipe da recepção está em pânico e o telefone não para de tocar. O TripAdvisor está aberto na sua tela.',
                    energyCost: 10,
                    glossary: [{ word: 'Staff', meaning: 'Equipe' }, { word: 'Panic', meaning: 'Pânico' }],
                    quickReplies: [
                        { label: 'Assumir o balcão com a equipe', text: 'I will take over the front desk and help the staff with the check-ins.' },
                        { label: 'Ficar no escritório resolvendo o sistema', text: 'I need to stay in my office and fix the IT system.' }
                    ],
                    intents: [
                        { match: /(take over|help|front desk)/i, nextScene: 'carter_2_staff', addsFlags: ['helped_staff'], energyCost: 10 },
                        { match: /(office|IT system|fix)/i, nextScene: 'carter_2_office', energyCost: 15 }
                    ],
                    fallback: 'A gerente da recepção liga chorando. "Mr. Carter, we need you here!"',
                    offensiveScene: 'carter_fail_1'
                },
                carter_fail_1: { npcName: 'Sistema', npcText: 'A equipe abandonou o balcão. O hotel virou um caos e os hóspedes fizeram uma vaquinha para te demitir.', isEnd: true, endingType: 'ruim' },
                carter_2_staff: {
                    npcName: 'Recepcionista',
                    npcText: 'Obrigada por ajudar, Mr. Carter! Mas a Sofia VIP está fazendo um escândalo. Ela quer um upgrade de quarto porque esperou 20 minutos. O quarto VIP custa $100 extras.',
                    energyCost: 10,
                    glossary: [{ word: 'Upgrade', meaning: 'Melhoria de quarto' }, { word: 'VIP', meaning: 'Pessoa muito importante' }],
                    quickReplies: [
                        { label: 'Dar o upgrade de graça', text: 'Give her the upgrade for free. We need a good review.' },
                        { label: 'Oferecer apenas um drink grátis', text: 'Offer her a free drink, but no upgrade.' }
                    ],
                    intents: [
                        { match: /(upgrade|free|good review)/i, nextScene: 'carter_3_power', requiresItem: 'upgrade', money: -100, addsFlags: ['gave_upgrade'], energyCost: 5 },
                        { match: /(drink|no upgrade)/i, nextScene: 'carter_3_power', energyCost: 5 }
                    ],
                    fallback: 'A recepcionista espera a sua decisão. A Sofia está batendo o cartão no balcão.',
                    offensiveScene: 'carter_fail_2'
                },
                carter_2_office: {
                    npcName: 'Sistema',
                    npcText: 'Você fica no escritório tentando reiniciar o servidor. Enquanto isso, pela câmera, você vê a fila crescendo e os hóspedes gritando com a sua equipe. O servidor volta, mas a reputação do hotel está caindo.',
                    energyCost: 15,
                    quickReplies: [
                        { label: 'Sair e pedir desculpas aos hóspedes', text: 'I need to go out there and apologize to the guests.' },
                        { label: 'Continuar no escritório checando os logs', text: 'I will keep checking the system logs.' }
                    ],
                    intents: [
                        { match: /(apologize|go out)/i, nextScene: 'carter_3_power', energyCost: 5 },
                        { match: /(logs|stay|checking)/i, nextScene: 'carter_fail_2', energyCost: 10 }
                    ],
                    fallback: 'O telefone toca. É a diretoria perguntando o que está acontecendo.',
                    offensiveScene: 'carter_fail_2'
                },
                carter_fail_2: { npcName: 'Diretoria', npcText: 'Mr. Carter, a avaliação do hotel caiu para 1 estrela. Você está demitido.', isEnd: true, endingType: 'ruim' },
                carter_3_power: {
                    npcName: 'Sistema',
                    npcText: 'Ufa! A situação no balcão acalmou. Mas de repente, as luzes do saguão piscam. O gerador falhou! A cozinha e o bar ficaram sem energia. O chef está gritando.',
                    energyCost: 15,
                    glossary: [{ word: 'Power outage', meaning: 'Queda de energia' }, { word: 'Generator', meaning: 'Gerador' }],
                    quickReplies: [
                        { label: 'Fechar o bar e pedir paciência', text: 'Close the bar. Tell the guests to wait in their rooms.' },
                        { label: 'Comprar gelo e velas (Custa $50)', text: 'Buy ice and candles for the guests. We need to keep them calm.' }
                    ],
                    intents: [
                        { match: /(close|wait|rooms)/i, nextScene: 'carter_3_5_fire', energyCost: 10 },
                        { match: /(buy|ice|candles)/i, nextScene: 'carter_3_5_fire', money: -50, energyCost: 5 }
                    ],
                    fallback: 'O chef ameaça pedir demissão se não tiver energia para manter a comida gelada.',
                    offensiveScene: 'carter_fail_3'
                },
                carter_fail_3: { npcName: 'Sistema', npcText: 'Sem energia e sem gestão, o hotel foi evacuado. Você falhou como gerente.', isEnd: true, endingType: 'ruim' },
                carter_3_5_fire: {
                    npcName: 'Sistema',
                    npcText: 'WEE-WOO! WEE-WOO! O susto da queda de energia disparou o alarme de incêndio! Os hóspedes estão correndo para a saída em pânico. A recepcionista grita: "Mr. Carter, a imprensa está lá fora!"',
                    energyCost: 15,
                    glossary: [{ word: 'Fire alarm', meaning: 'Alarme de incêndio' }, { word: 'Press', meaning: 'Imprensa' }],
                    quickReplies: [
                        { label: 'Evacuar todos com calma', text: 'Everyone, please remain calm and exit the building.' },
                        { label: 'Correr para desligar o alarme', text: 'I need to find the alarm panel and turn it off!' }
                    ],
                    intents: [
                        { match: /(calm|exit|evacuate)/i, nextScene: 'carter_4_review', addsFlags: ['evacuated'], energyCost: 10 },
                        { match: /(alarm panel|turn it off)/i, nextScene: 'carter_4_review', addsFlags: ['turned_off_alarm'], energyCost: 20 }
                    ],
                    fallback: 'O caos se instaura. As pessoas estão pisoteando as malas.',
                    offensiveScene: 'carter_fail_3'
                },
                carter_4_review: {
                    npcName: 'Sistema',
                    npcText: 'Era um falso alarme. O susto passou, mas o estrago está feito. A energia voltou e já são 5 da manhã. Você abre o TripAdvisor e vê uma nova avaliação de 1 estrela da Sofia.',
                    energyCost: 10,
                    glossary: [{ word: 'Review', meaning: 'Avaliação' }, { word: 'Manager', meaning: 'Gerente' }],
                    quickReplies: [
                        { label: 'Responder com educação e oferecer compensação', text: 'Dear Sofia, we are sorry. Please contact us for a free weekend.' },
                        { label: 'Ignorar e ir dormir', text: 'I am too tired for this. I will ignore it.' }
                    ],
                    intents: [
                        { match: /(respond|compensation|sorry)/i, nextScene: 'carter_5_boss', energyCost: 5 },
                        { match: /(ignore|tired|sleep)/i, nextScene: 'carter_5_boss', addsFlags: ['ignored_review'] }
                    ],
                    fallback: 'A diretoria manda um e-mail cobrando uma resposta para a avaliação.',
                    offensiveScene: 'carter_fail_2'
                },
                carter_5_boss: {
                    npcName: 'Sistema',
                    npcText: 'O sol nasceu. O turno da manhã chegou. Mas antes de ir embora, seu celular toca. É o Diretor Regional (Big Boss): "Carter, I saw the news about the fire alarm. What happened to my hotel?"',
                    energyCost: 0,
                    glossary: [{ word: 'Regional Director', meaning: 'Diretor Regional' }, { word: 'News', meaning: 'Notícias' }],
                    quickReplies: [
                        { label: 'Assumir a responsabilidade e elogiar a equipe', text: 'It was a tough night, sir, but my team held the hotel together.' },
                        { label: 'Culpar o sistema e a TI', text: 'The IT system crashed, sir. It was not my fault.' }
                    ],
                    intents: [
                        { match: /(responsibility|team|together|tough)/i, nextScene: 'carter_6_end_good' },
                        { match: /(fault|IT system|not my fault)/i, nextScene: 'carter_6_end_ok' }
                    ],
                    fallback: 'O Diretor espera pela sua resposta.',
                    offensiveScene: 'carter_6_end_ok'
                },
                carter_6_end_good: { npcName: 'Diretor Regional', npcText: 'Thank you for your honesty, Carter. You kept the guests safe. Take the day off tomorrow. You earned it.', isEnd: true, endingType: 'bom' },
                carter_6_end_ok: { npcName: 'Diretor Regional', npcText: 'Excuses, Carter? We need solutions, not excuses. We will talk on Monday.', isEnd: true, endingType: 'ok' }
            }
        },
        sofia: {
            charId: 'sofia',
            name: 'Sofia',
            role: 'Hóspede VIP',
            emoji: '👱‍♀️',
            description: 'A exigente. Chegou de viagem internacional, está exausta, quer o quarto perfeito e não aceita "não".',
            initialState: { money: 100.00, energy: 80 },
            startScene: 'sofia_1',
            scenes: {
                sofia_1: {
                    npcName: 'Sistema',
                    npcText: 'Você chega ao Hotel Luxo depois de um voo de 14 horas. O saguão está cheio e o sistema do hotel caiu. A recepcionista (Mia) parece perdida. Você está exausta e irritada.',
                    energyCost: 10,
                    glossary: [{ word: 'Exhausted', meaning: 'Exausta' }, { word: 'Front Desk', meaning: 'Recepção' }],
                    quickReplies: [
                        { label: 'Gritar com a recepcionista', text: 'Excuse me! I am a VIP guest! Where is my room? This is unacceptable!' },
                        { label: 'Respirar fundo e esperar', text: 'I am very tired. Please, just help me check in.' }
                    ],
                    intents: [
                        { match: /(gritar|unacceptable|VIP)/i, nextScene: 'sofia_2_angry', energyCost: 15 },
                        { match: /(tired|help|wait)/i, nextScene: 'sofia_2_calm', addsFlags: ['calm_start'], energyCost: 5 }
                    ],
                    fallback: 'A fila não anda. Você sente a dor de cabeça aumentando.',
                    offensiveScene: 'sofia_fail_1'
                },
                sofia_fail_1: { npcName: 'Sistema', npcText: 'Você faz um escândalo, mas a segurança é chamada. Você é convidada a se retirar do hotel.', isEnd: true, endingType: 'ruim' },
                sofia_2_angry: {
                    npcName: 'Mia',
                    npcText: 'I am so sorry, Ms. Sofia! I am doing my best. The bellboy is bringing your luggage, but the elevator is broken.',
                    energyCost: 10,
                    quickReplies: [
                        { label: 'Exigir um upgrade', text: 'Broken? Fine. Then give me a suite on the first floor. I am not walking.' },
                        { label: 'Aceitar e esperar as malas', text: 'Okay, I will wait. But hurry up.' }
                    ],
                    intents: [
                        { match: /(upgrade|suite|first floor)/i, nextScene: 'sofia_3_room', money: -100, addsFlags: ['got_upgrade'], energyCost: 10 },
                        { match: /(wait|hurry)/i, nextScene: 'sofia_3_room', energyCost: 5 }
                    ],
                    fallback: 'Mia gagueja e chama o gerente.',
                    offensiveScene: 'sofia_fail_2'
                },
                sofia_2_calm: {
                    npcName: 'Mia',
                    npcText: 'Thank you for understanding, Ms. Sofia. I have your key. Your room is on the 10th floor. The bellboy is bringing your luggage, but the elevator is broken.',
                    energyCost: 5,
                    quickReplies: [
                        { label: 'Oferecer uma gorjeta para o bellboy', text: 'Here is $20. Please tell the bellboy to hurry.' },
                        { label: 'Dizer que pode esperar', text: 'I can wait. Just tell him to be careful with my bags.' }
                    ],
                    intents: [
                        { match: /(gorjeta|tip|\$20|hurry)/i, nextScene: 'sofia_3_room', money: -20, energyCost: 5 },
                        { match: /(wait|careful)/i, nextScene: 'sofia_3_room', energyCost: 5 }
                    ],
                    fallback: 'Mia sorri aliviada.',
                    offensiveScene: 'sofia_fail_2'
                },
                sofia_fail_2: { npcName: 'Mia', npcText: 'I am sorry, but I cannot help you anymore. Security!', isEnd: true, endingType: 'ruim' },
                sofia_3_room: {
                    npcName: 'Sistema',
                    npcText: 'Você finalmente entra no quarto. Mas quando abre a porta, o quarto está sujo! A cama está desfeita e há toalhas molhadas no chão. A governanta esqueceu de limpar.',
                    energyCost: 15,
                    glossary: [{ word: 'Dirty', meaning: 'Sujo' }, { word: 'Housekeeping', meaning: 'Governança / Limpeza' }],
                    quickReplies: [
                        { label: 'Ligar imediatamente para a recepção', text: 'My room is dirty! Send housekeeping right now!' },
                        { label: 'Limpar um pouco por conta própria', text: 'I am too tired. I will just push the towels to the side and sleep.' }
                    ],
                    intents: [
                        { match: /(dirty|housekeeping|right now)/i, nextScene: 'sofia_4_noise', energyCost: 10 },
                        { match: /(sleep|tired|push)/i, nextScene: 'sofia_4_noise', energyCost: 5 }
                    ],
                    fallback: 'Você fica parada na porta, sem acreditar no que está vendo.',
                    offensiveScene: 'sofia_fail_3'
                },
                sofia_fail_3: { npcName: 'Sistema', npcText: 'Você não consegue dormir de tanta raiva. A manhã chega e você faz uma reclamação formal. O hotel te dá um reembolso, mas você nunca mais volta.', isEnd: true, endingType: 'ruim' },
                sofia_4_noise: {
                    npcName: 'Sistema',
                    npcText: 'São 2 da manhã. O quarto está limpo. Você se deita finalmente. Mas de repente, você ouve música alta e risadas no quarto ao lado. Pessoas estão festejando.',
                    energyCost: 15,
                    glossary: [{ word: 'Loud noise', meaning: 'Barulho alto' }, { word: 'Next door', meaning: 'Ao lado' }],
                    quickReplies: [
                        { label: 'Bater na parede', text: 'I will bang on the wall to make them stop.' },
                        { label: 'Ligar para a recepção reclamar', text: 'I will call the front desk to handle this.' }
                    ],
                    intents: [
                        { match: /(bang|wall)/i, nextScene: 'sofia_5_morning', energyCost: 10 },
                        { match: /(call|front desk|reception)/i, nextScene: 'sofia_5_morning', energyCost: 5 }
                    ],
                    fallback: 'A música continua tocando. Você não consegue pregar o olho.',
                    offensiveScene: 'sofia_fail_4'
                },
                sofia_fail_4: { npcName: 'Sistema', npcText: 'Você não dorme nada. Chega em casa doente e cancelando todas as suas reuniões da semana.', isEnd: true, endingType: 'ruim' },
                sofia_5_morning: {
                    npcName: 'Sistema',
                    npcText: 'O barulho parou. São 8 da manhã. Você acorda e desce para o café da manhã. O gerente (Mr. Carter) está no saguão e te vê. Ele caminha até você.',
                    energyCost: 0,
                    glossary: [{ word: 'Breakfast', meaning: 'Café da manhã' }],
                    quickReplies: [
                        { label: 'Elogiar a recepcionista Mia', text: 'Your receptionist Mia was very helpful. She saved my night.' },
                        { label: 'Reclamar de tudo com o gerente', text: 'This hotel is a mess! The elevator, the dirty room, the noise!' }
                    ],
                    intents: [
                        { match: /(Mia|helpful|saved)/i, nextScene: 'sofia_end_good' },
                        { match: /(mess|reclama|dirty|noise)/i, nextScene: 'sofia_end_ok' }
                    ],
                    fallback: 'Mr. Carter espera pelo seu comentário.',
                    offensiveScene: 'sofia_end_ok'
                },
                sofia_end_good: { npcName: 'Mr. Carter', npcText: 'Thank you for your feedback, Ms. Sofia. We will make sure Mia gets a bonus. We hope to see you again.', isEnd: true, endingType: 'bom' },
                sofia_end_ok: { npcName: 'Mr. Carter', npcText: 'I understand. We are deeply sorry. The next time you come, everything will be perfect. Here is a voucher.', isEnd: true, endingType: 'ok' }
            }
        }
    }
};