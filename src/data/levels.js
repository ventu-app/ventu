const levelsData = [
  { 
    id: 'a1', cefr: 'A1', title: 'Vila Sobrevivente', icon: '🏘️', color: '#10b981', available: true,
    desc: 'Pedir comida, andar pela cidade, entender gírias básicas e fugir de situações estranhas.',
    ventuSays: "Bem-vindo ao caos! Aqui você não vai aprender 'The book is on the table'. Vamos ver se você consegue pedir um lanche, entender quando alguém tá sendo irônico e perceber se a pessoa no bar é apenas amigável ou um esquisito.",
    objectives: ['Pedidos e gírias básicas (wanna, gonna)', 'Detectar ironia simples e sarcasmo', 'Identificar um creep básico']
  },
  { 
    id: 'a2', cefr: 'A2', title: 'Porto Hotel', icon: '🏨', color: '#3b82f6', available: true,
    desc: 'Resolver pepinos, reclamar de péssimo serviço sem ser babaca e entender piadas duvidosas.',
    ventuSays: "O quarto tá errado? A farmácia tá fechada? Sem pânico. Você vai aprender a fazer aquele 'Karen complaint' educado, usar palavrões leves na hora certa e entender quando o funcionário tá te enrolando.",
    objectives: ['Reclamar com firmeza e educação', 'Usar palavrões leves (damn, hell)', 'Narrar eventos passados e burocracias']
  },
  { 
    id: 'b1', cefr: 'B1', title: 'Caos Cotidiano', icon: '🚑', color: '#f97316', available: true,
    desc: 'Clínica de madrugada, apartamento alugado e conversas políticas de família.',
    ventuSays: "Imprevistos acontecem. Você tá doente, o chuveiro quebrou e o senhorio tá sendo babaca. Além disso, vamos falar de política e como discordar do tiozão gringo sem perder a amizade.",
    objectives: ['Usar Present Perfect e Condicionais', 'Discutir política e notícias', 'Lidar com estresse extremo e burocracia']
  },
  { 
    id: 'b2', cefr: 'B2', title: 'O Negociador', icon: '💼', color: '#8b5cf6', available: false,
    desc: 'Clientes furiosos, chefe tóxico, entrevistas e o inglês corporativo passivo-agressivo.',
    ventuSays: "O cliente tá gritando? O RH te fez uma pergunta capciosa? O chefe mandou um e-mail passivo-agressivo? Hora de usar a voz passiva para se esquivar e as palavras certas para mandar todo mundo pro inferno... profissionalmente.",
    objectives: ['Voz Passiva para esquivar de culpa', 'Detectar gaslighting corporativo', 'Negociar salários e acordos']
  },
  { 
    id: 'c1', cefr: 'C1', title: 'O Mediador', icon: '🎭', color: '#ef4444', available: false,
    desc: 'Jantares com a sogra, piadas pesadas, ironia fina e flertes ousados em eventos sociais.',
    ventuSays: "Jantar de família com gente intolerante? Um amigo fazendo piadas de duplo sentido? Você precisa entender a ironia, esquivar de provocações políticas e identificar sinais de flerte que não são apenas pequena conversa.",
    objectives: ['Dominar sarcasmo e duplo sentido', 'Debater temas sensíveis com elegância', 'Flerte sofisticado e sexualidade']
  },
  { 
    id: 'c2', cefr: 'C2', title: 'O Estrategista', icon: '♟️', color: '#eab308', available: false,
    desc: 'Crises de imprensa, retórica de manipulação, política pesada e charme no mais alto nível.',
    ventuSays: "Uma sala cheia de tubarões querendo derrubar seu projeto? A imprensa te atacando? É aqui que o inglês de verdade entra em jogo. Use retórica, manipule com sutileza, entenda piadas cultas e flerte no nível de James Bond.",
    objectives: ['Retórica, persuasão e manipulação', 'Ambigüidade sexual e ironia culta', 'Improviso sob pressão extrema']
  },
  { 
    id: 'social', cefr: 'B1+', title: 'Bairro do Flerte', icon: '💕', color: '#ec4899', available: false, badge: '18+',
    desc: 'Tinder, dates, mensagens picantes, red flags e como não ser um esquisito.',
    ventuSays: "Vamos falar de amor... ou algo assim. Aprenda a flertar, fazer piadas sexuais sem parecer um tarado, identificar os 'red flags' (aqueles sinais de que a pessoa é doida) e como mandar uma nude ou um 'spicy text' com classe.",
    objectives: ['Entender double meanings e sarcasmo', 'Filtrar red flags e love bombers', 'Small talk e conversas picantes']
  },
  { 
    id: 'street', cefr: 'B2+', title: 'Beco da Rua', icon: '🔥', color: '#e11d48', available: false, badge: '18+',
    desc: 'Conflito, gírias pesadas, palavrões e como desarmar um babaca na rua.',
    ventuSays: "Aqui a coisa esquenta. Palavrão pesado, gíria de rua, gangues e gente chata. Não tô te ensinando a ser babaca, tô te ensinando a se defender. Você vai aprender a mandar a pessoa tomar no cu em inglês sem levar um soco.",
    objectives: ['Entender e usar palavrões pesados', 'Desescalar violência e se impor', 'Gírias de rua e dialetos']
  },
  { 
    id: 'abroad', cefr: 'B1+/B2+', title: 'Vida no Exterior', icon: '✈️', color: '#06b6d4', available: false, badge: 'AU PAIR',
    desc: 'Vistos, aluguel, xenofobia e a saudade da família (além do choque cultural).',
    ventuSays: "Au pair, trabalho ou intercâmbio? A vida real lá fora não é um conto de fadas. Vamos ver se você aguenta o tranco com a host family, resolve pepinos no consulado e responde a comentários xenofóbicos.",
    objectives: ['Resolver burocracias de visto', 'Lidar com preconceito e abusos', 'Falar sobre sentimentos e saudade']
  }
];