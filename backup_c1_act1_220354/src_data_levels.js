const levelsData = [
  {
    id: 'a1',
    title: 'Vila Sobrevivente',
    cefr: 'A1',
    color: '#10b981',
    icon: '🏘️',
    available: true,
    desc: 'Pedir comida, andar pela cidade, entender gírias básicas e fugir de situações estranhas.',
    mascot: '🦊',
    ventuSays: "Bem-vindo à Vila. As ruas são confusas, o GPS falha e o cliente tá com fome. Use o básico para sobreviver sem passar fome.",
    objectives: ['Fazer pedidos simples', 'Entender gírias básicas', 'Sobreviver ao caos']
  },
  {
    id: 'a2',
    title: 'Porto Hotel',
    cefr: 'A2',
    color: '#3b82f6',
    icon: '🏨',
    available: true,
    desc: 'Resolver pepinos, reclamar de péssimo serviço sem ser babaca e entender piadas duvidosas.',
    mascot: '🦊',
    ventuSays: "O hotel é um caos. O café esfriou, a máquina quebrou e a cliente VIP quer o seu emprego. Resolva tudo sem perder a pose.",
    objectives: ['Reclamar educadamente', 'Narrar o passado', 'Lidar com clientes difíceis']
  },
  {
    id: 'b1',
    title: 'Caos Cotidiano',
    cefr: 'B1',
    color: '#f97316',
    icon: '🚑',
    available: true,
    desc: 'Clínica de madrugada, apartamento alugado e conversas políticas de família.',
    mascot: '🦊',
    ventuSays: "A coisa tá ficando séria. Você comeu sketchy food e o hospital americano não é barato. Use seu inglês para não faliar.",
    objectives: ['Usar o Present Perfect', 'Lidar com burocracia', 'Desescalar o estresse']
  },
  {
    id: 'b2',
    title: 'O Negociador',
    cefr: 'B2',
    color: '#8b5cf6',
    icon: '💼',
    available: true, // <-- LIBERADO AQUI
    desc: 'Clientes furiosos, chefe tóxico, entrevistas e o inglês corporativo passivo-agressivo.',
    mascot: '👔',
    ventuSays: "O cliente tá gritando? O RH te fez uma pergunta capciosa? O chefe mandou um e-mail passivo-agressivo? Hora de usar a voz passiva para se esquivar e as palavras certas para mandar todo mundo pro inferno... profissionalmente.",
    objectives: ['Voz Passiva para esquivar de culpa', 'Detectar gaslighting corporativo', 'Negociar salários e acordos']
  },
  {
    id: 'c1',
    title: 'O Mediador',
    cefr: 'C1',
    color: '#ef4444',
    icon: '🎭',
    available: false,
    desc: 'Jantares com a sogra, piadas pesadas, ironia fina e flertes ousados em eventos sociais.',
    mascot: '🎭',
    ventuSays: "Seu sarcasmo precisa ser afiado. Você vai precisar mediar conflitos e usar o duplo sentido sem ofender ninguém.",
    objectives: ['Ironia de 2ª camada', 'Debater temas sensíveis', 'Flerte sutil']
  },
  {
    id: 'c2',
    title: 'O Estrategista',
    cefr: 'C2',
    color: '#eab308',
    icon: '♟️',
    available: false,
    desc: 'Crises de imprensa, retórica de manipulação, política pesada e charme no mais alto nível.',
    mascot: '♟️',
    ventuSays: "O jogo final. Cada palavra pode ser uma armadilha. Manipule, debata e vença sem que ninguém perceba.",
    objectives: ['Retórica avançada', 'Manipulação de massas', 'Ambigüidade']
  },
  {
    id: 'social',
    title: 'Bairro do Flerte',
    cefr: 'B1+',
    color: '#ec4899',
    icon: '😍',
    available: false,
    badge: '18+',
    desc: 'Duplo sentido, red flags, small talk picante e o famoso ghosting.',
    mascot: '😍',
    ventuSays: "Hora de testar seu charme. Detecte os red flags antes que seja tarde e descubra como sair de um encontro ruim.",
    objectives: ['Duplo sentido', 'Detectar red flags', 'Sair de situações estranhas']
  },
  {
    id: 'street',
    title: 'Beco da Rua',
    cefr: 'B2+',
    color: '#e11d48',
    icon: '😎',
    available: false,
    badge: '18+',
    desc: 'Palavrões, gírias de rua e desescalar violência sem levar um soco.',
    mascot: '😎',
    ventuSays: "A vida real é cruel. Você está perdido no Bronx e um cara suspeito te aborda. Use as gírias certas para sair vivo.",
    objectives: ['Gírias de rua', 'Desescalar violência', 'Lidar com o perigo']
  },
  {
    id: 'abroad',
    title: 'Vida no Exterior',
    cefr: 'B1+/B2+',
    color: '#06b6d4',
    icon: '🧳',
    available: false,
    badge: 'Morar Fora',
    desc: 'Burocracia, xenofobia, host family e a saudade da comida brasileira.',
    mascot: '🧳',
    ventuSays: "Bem-vindo ao aeroporto. Seu voo foi cancelado, a host family é estranha e você não acha o RU. Boa sorte.",
    objectives: ['Burocracia de imigração', 'Lidar com xenofobia', 'Resolver problemas de viagem']
  }
];