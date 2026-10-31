const levelsData = [
  { 
    id: 'a1', cefr: 'A1', title: 'Vila Sobrevivente', color: '#10b981', available: true,
    desc: 'Pedir comida, andar pela cidade e se virar no básico.',
    ventuSays: "Bem-vindo ao caos! Aqui você vai aprender a não passar fome e não dormir na rua. O básico para sobreviver.",
    objectives: ['Fazer pedidos simples (I want/need)', 'Pedir direções e informações', 'Usar números e horários']
  },
  { 
    id: 'a2', cefr: 'A2', title: 'Porto Hotel', color: '#3b82f6', available: true,
    desc: 'Resolver pepinos do dia a dia, check-in e farmácia.',
    ventuSays: "O quarto tá errado? A farmácia tá fechada? Sem pânico. Hora de resolver problemas do mundo real.",
    objectives: ['Narrar eventos no passado', 'Fazer pedidos educados (Can/Could)', 'Reclamar de problemas']
  },
  { 
    id: 'b1', cefr: 'B1', title: 'Caos Cotidiano', color: '#ffb547', available: true,
    desc: 'Clínica de madrugada, apartamento alagado e burocracia.',
    ventuSays: "Imprevistos acontecem. Você tá doente num país estranho ou o chuveiro quebrou? Hora de se virar e explicar o problema.",
    objectives: ['Usar Present Perfect', 'Fazer condicionais simples', 'Lidar com imprevistos e burocracia']
  },
  { 
    id: 'b2', cefr: 'B2', title: 'O Negociador', color: '#8b5cf6', available: true,
    desc: 'Clientes furiosos, entrevistas de emprego e acordos.',
    ventuSays: "O cliente tá gritando e você precisa salvar o contrato? Ou o recrutador tá te pressionando? Use as palavras certas para não sair perdendo.",
    objectives: ['Usar Condicionais Complexas', 'Voz Passiva para se esquivar', 'Argumentar e negociar']
  },
  { 
    id: 'c1', cefr: 'C1', title: 'O Mediador', color: '#ef4444', available: true,
    desc: 'Jantares de família, ironia, sarcasmo e política.',
    ventuSays: "Jantar na casa dos sogros? O tio tá fazendo piada política ofensiva? Você precisa entender a ironia e desviar das provocações com elegância.",
    objectives: ['Entender sarcasmo e ironia fina', 'Mediar conflitos e debates', 'Usar expressões idiomáticas']
  },
  { 
    id: 'c2', cefr: 'C2', title: 'O Estrategista', color: '#eab308', available: true,
    desc: 'Conselhos hostis, crises de imprensa e persuasão pura.',
    ventuSays: "Uma sala cheia de tubarões querendo derrubar seu projeto? A imprensa te atacando? É aqui que o inglês de verdade entra em jogo.",
    objectives: ['Retórica e Persuasão de alto nível', 'Uso de Humor Calculado', 'Improviso sob pressão extrema']
  },
  { 
    id: 'social', cefr: 'B1+', title: 'Bairro do Flerte', color: '#ec4899', available: true, badge: 'NOVO',
    desc: 'Dates, flerte, humor e detecção de red flags.',
    ventuSays: "Vamos falar de amor... ou algo assim. Aprenda a flertar usando humor sem parecer um robô e a fugir de gente estranha.",
    objectives: ['Usar perguntas indiretas', 'Fazer small talk e piadas', 'Detectar red flags']
  },
  { 
    id: 'street', cefr: 'B2+', title: 'Beco da Rua', color: '#e11d48', available: true, badge: '18+',
    desc: 'Conflito, insultos, palavrões e como se impor.',
    ventuSays: "Aqui a coisa esquenta. Palavrão, gíria e gente chata. Não tô te ensinando a ser babaca, tô te ensinando a se defender.",
    objectives: ['Usar imperativos', 'Desescalar conflitos', 'Entender gírias e insultos']
  },
  { 
    id: 'abroad', cefr: 'B1+/B2+', title: 'Vida no Exterior', color: '#06b6d4', available: true, badge: 'AU PAIR',
    desc: 'Entrevistas, host family, aluguel e sobrevivência fora do país.',
    ventuSays: "Au pair, trabalho ou intercâmbio? A vida real lá fora não é um conto de fadas. Vamos ver se você aguenta o tranco com a host family.",
    objectives: ['Falar sobre experiências de vida', 'Negociar regras e rotinas', 'Resolver mal-entendidos culturais']
  }
];