import { Article, NewsCategory } from '../types';

// Optimized image helper
const optimizeImg = (url: string, width = 800) => {
  if (!url) return 'https://placehold.co/800x600?text=Sem+Imagem';
  
  // Clean basic Unsplash optimization
  if (url.includes('images.unsplash.com')) {
    // Check if it already has params
    const hasParams = url.includes('?');
    const separator = hasParams ? '&' : '?';
    // Append size and format params
    return `${url}${separator}auto=format&fit=crop&w=${width}&q=80`;
  }
  return url;
};

const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: "Cúpula Global Alcança Acordo Histórico sobre Metas Climáticas para 2030",
    excerpt: "Em uma decisão histórica, 195 nações se comprometeram com novas metas agressivas de redução de carbono, sinalizando uma abordagem unificada para a crise climática.",
    content: `
      <p class="mb-4 font-serif text-lg leading-relaxed">Em uma reviravolta histórica, líderes mundiais reunidos em Genebra concordaram unanimemente com o plano de ação climática mais agressivo desde o Acordo de Paris. O "Pacto da Terra 2030" visa reduzir as emissões globais de carbono em 60% nos próximos seis anos.</p>
      <p class="mb-4 font-serif text-lg leading-relaxed">"Este não é apenas um documento; é uma tábua de salvação para o nosso planeta", declarou o Secretário-Geral da ONU durante a cerimônia de encerramento. O acordo foca fortemente na transição das redes de energia para fontes 100% renováveis e na implementação de impostos rigorosos sobre carbono para indústrias pesadas.</p>
      <h3 class="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Implicações Econômicas</h3>
      <p class="mb-4 font-serif text-lg leading-relaxed">Economistas preveem uma volatilidade de curto prazo nos mercados de energia, seguida por um boom massivo nos setores de tecnologia verde. Ações de energia solar, eólica e armazenamento de bateria subiram imediatamente após o anúncio.</p>
      <p class="mb-4 font-serif text-lg leading-relaxed">No entanto, críticos argumentam que as nações em desenvolvimento podem ter dificuldades com a transição rápida sem ajuda financeira significativa. O pacto inclui um fundo de $500 bilhões para ajudar essas economias, financiado principalmente pelas nações do G7.</p>
      <h3 class="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">O Caminho à Frente</h3>
      <p class="mb-4 font-serif text-lg leading-relaxed">A implementação começa imediatamente, com revisões trimestrais agendadas para garantir a conformidade. Ativistas fora da cúpula celebraram a notícia, mas prometeram permanecer vigilantes.</p>
    `,
    category: NewsCategory.Mundo,
    author: "Elena Fisher",
    publishedAt: "2024-05-20T08:30:00Z",
    // Reliable Wind Farm Image
    imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7", 
    readTime: 5,
    featured: true
  },
  {
    id: '2',
    title: "Gigantes da Tecnologia Revelam Processador Quântico Revolucionário",
    excerpt: "O novo chip Q-Core promete resolver problemas complexos em segundos, problemas que levariam milênios para supercomputadores.",
    content: `
      <p class="mb-4 font-serif text-lg leading-relaxed">O Vale do Silício está agitado com a revelação do 'Q-Core', um processador quântico que supostamente alcança a supremacia quântica. Desenvolvido por uma coalizão das principais empresas de tecnologia, o chip utiliza 128 qubits com estabilidade sem precedentes.</p>
      <p class="mb-4 font-serif text-lg leading-relaxed">As aplicações variam desde a descoberta de medicamentos até criptografia avançada. "Estamos entrando em uma nova era da computação", disse o Dr. Aris Thorne, engenheiro líder do projeto.</p>
    `,
    category: NewsCategory.Tecnologia,
    author: "Marcus Chen",
    publishedAt: "2024-05-19T14:15:00Z",
    // Quantum/Chip Image
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    readTime: 4,
    featured: true
  },
  {
    id: '3',
    title: "Mercados Sobem com Dados de Inflação Mostrando Queda Inesperada",
    excerpt: "Os principais índices atingiram recordes hoje, pois o último relatório do IPC indica que as pressões inflacionárias estão finalmente diminuindo.",
    content: "<p>Wall Street celebrou hoje, pois o Índice de Preços ao Consumidor (IPC) subiu apenas 0,1% no mês passado, bem abaixo das expectativas.</p>",
    category: NewsCategory.Negocios,
    author: "Sarah Jenkins",
    publishedAt: "2024-05-20T10:00:00Z",
    // Wall St / Finance Image
    imageUrl: "https://images.unsplash.com/photo-1611974765270-ca1258634369",
    readTime: 3,
    featured: false
  },
  {
    id: '4',
    title: "O Futuro do Transporte Urbano: Táxis Voadores Liberados",
    excerpt: "Órgãos reguladores concederam as primeiras licenças comerciais para aeronaves EVTOL em três grandes cidades.",
    content: "<p>O sonho dos carros voadores está um passo mais perto da realidade. A Administração Federal de Aviação concedeu licenças comerciais limitadas a duas grandes startups de EVTOL (Decolagem e Aterrissagem Vertical Elétrica).</p>",
    category: NewsCategory.Tecnologia,
    author: "David Ross",
    publishedAt: "2024-05-18T09:45:00Z",
    // Drone/City Image
    imageUrl: "https://images.unsplash.com/photo-1524143986875-3b098d78b363",
    readTime: 6,
    featured: false
  },
  {
    id: '5',
    title: "Finais do Campeonato: Zebras Levam o Troféu em Virada Espetacular",
    excerpt: "Em uma partida que será lembrada por décadas, o City Rovers derrotou os Titans por 3-2.",
    content: "<p>A história do esporte foi feita na noite passada. O City Rovers, entrando no torneio como zebras, levantou o troféu.</p>",
    category: NewsCategory.Esportes,
    author: "Tom Brady",
    publishedAt: "2024-05-19T22:00:00Z",
    // Stadium Image
    imageUrl: "https://images.unsplash.com/photo-1504454172868-6087c3176b1b",
    readTime: 4,
    featured: false
  },
  {
    id: '6',
    title: "Novo Rover em Marte Envia Panorama de Tirar o Fôlego",
    excerpt: "O mais recente explorador da NASA capturou as imagens mais detalhadas da superfície do Planeta Vermelho até hoje.",
    content: "<p>As imagens revelam antigos leitos de rios e possíveis sinais de vida microbiana de bilhões de anos atrás.</p>",
    category: NewsCategory.Ciencia,
    author: "Dra. Emily Stone",
    publishedAt: "2024-05-17T11:20:00Z",
    // Space/Mars Image
    imageUrl: "https://images.unsplash.com/photo-1614728853975-69c960c72741",
    readTime: 5,
    featured: false
  },
  {
    id: '7',
    title: "Minimalismo no Web Design: A Tendência Acabou?",
    excerpt: "Designers estão se movendo em direção ao maximalismo e brutalismo em reação à estética limpa da década de 2010.",
    content: "<p>As tendências de web design são cíclicas. Estamos vendo um ressurgimento de cores ousadas, layouts complexos e tipografia pesada.</p>",
    category: NewsCategory.Tecnologia,
    author: "Jessica Lee",
    publishedAt: "2024-05-15T16:30:00Z",
    // Abstract Art/Design Image
    imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853",
    readTime: 7,
    featured: false
  },
  {
    id: '8',
    title: "Eleições no Parlamento Europeu: O Que Esperar",
    excerpt: "Com a votação se aproximando, pesquisas indicam uma mudança significativa no cenário político do continente.",
    content: "<p>Analistas políticos preveem um comparecimento recorde nas próximas eleições. As questões centrais incluem imigração, economia e segurança energética.</p>",
    category: NewsCategory.Politica,
    author: "Jean-Pierre Dubois",
    publishedAt: "2024-05-21T07:00:00Z",
    // EU Flag/Politics Image
    imageUrl: "https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8",
    readTime: 6,
    featured: false
  },
  {
    id: '9',
    title: "Avanço na Cura do Alzheimer: Novos Testes Clínicos Promissores",
    excerpt: "Um novo medicamento experimental mostrou capacidade de reverter a perda de memória em estágios iniciais.",
    content: "<p>Pesquisadores da Universidade de Oxford publicaram resultados animadores sobre a droga 'NeuroClear'. Os pacientes demonstraram uma melhoria de 40% nas funções cognitivas.</p>",
    category: NewsCategory.Saude,
    author: "Dr. Roberto Silva",
    publishedAt: "2024-05-21T09:00:00Z",
    // Medical Research Image
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
    readTime: 8,
    featured: true
  },
  {
    id: '10',
    title: "Festival de Cinema de Cannes: Os Vencedores Deste Ano",
    excerpt: "O cinema independente roubou a cena, com produções de baixo orçamento levando os principais prêmios.",
    content: "<p>A Palma de Ouro foi para um drama experimental coreano, surpreendendo os críticos. O tapete vermelho brilhou com as maiores estrelas do mundo.</p>",
    category: NewsCategory.Entretenimento,
    author: "Sophia Loren",
    publishedAt: "2024-05-20T18:00:00Z",
    // Cinema/Red Carpet Image
    imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
    readTime: 4,
    featured: false
  },
  {
    id: '11',
    title: "Startup Brasileira de Agronegócio Recebe Investimento Bilionário",
    excerpt: "A 'AgroTech Verde' se tornou o mais novo unicórnio do país após rodada de investimento liderada por fundos asiáticos.",
    content: "<p>A tecnologia da empresa utiliza drones e IA para monitorar a saúde das plantações em tempo real, reduzindo o uso de pesticidas em 70%.</p>",
    category: NewsCategory.Negocios,
    author: "Ana Paula Padrão",
    publishedAt: "2024-05-21T11:00:00Z",
    // Agriculture/Drone Image
    imageUrl: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff",
    readTime: 5,
    featured: false
  },
  {
    id: '12',
    title: "Descoberta Arqueológica no Egito Revela Tumba Desconhecida",
    excerpt: "Arqueólogos encontraram uma tumba intacta de 4.000 anos que pode pertencer a um faraó esquecido.",
    content: "<p>Os artefatos encontrados dentro da tumba estão em condições impecáveis. Hieróglifos nas paredes contam a história de um reinado próspero, mas breve.</p>",
    category: NewsCategory.Ciencia,
    author: "Zahi Hawass",
    publishedAt: "2024-05-18T14:30:00Z",
    // Egypt/Pyramid Image
    imageUrl: "https://images.unsplash.com/photo-1539650116455-251d9a6952dd",
    readTime: 6,
    featured: false
  },
  {
    id: '13',
    title: "Copa do Mundo Feminina: Sedes Anunciadas para 2027",
    excerpt: "O Brasil foi escolhido como país sede, prometendo a 'Copa das Copas' para o futebol feminino.",
    content: "<p>A decisão da FIFA foi celebrada em todo o país. O Maracanã será o palco da grande final, com expectativa de recorde de público.</p>",
    category: NewsCategory.Esportes,
    author: "Marta Silva",
    publishedAt: "2024-05-19T10:00:00Z",
    // Soccer Image
    imageUrl: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d",
    readTime: 3,
    featured: false
  },
  {
    id: '14',
    title: "O Retorno do Vinil: Vendas Superam CDs Pela Primeira Vez em 30 Anos",
    excerpt: "A nostalgia e a busca por qualidade de som impulsionam o mercado físico de música.",
    content: "<p>Lojas de discos estão reabrindo em todo o mundo. Artistas como Taylor Swift e Harry Styles lideram as vendas com edições especiais de colecionador.</p>",
    category: NewsCategory.Entretenimento,
    author: "Jack White",
    publishedAt: "2024-05-17T15:45:00Z",
    // Vinyl Record Image
    imageUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1",
    readTime: 4,
    featured: false
  },
  {
    id: '15',
    title: "Meditação e Saúde Mental: Estudos Comprovam Benefícios a Longo Prazo",
    excerpt: "Praticar mindfulness por apenas 10 minutos diários pode reduzir drasticamente os níveis de cortisol.",
    content: "<p>O estudo acompanhou 5.000 participantes durante cinco anos. Os resultados mostram melhorias significativas na qualidade do sono e redução da ansiedade.</p>",
    category: NewsCategory.Saude,
    author: "Deepak Chopra",
    publishedAt: "2024-05-16T08:00:00Z",
    // Meditation/Peaceful Image
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    readTime: 5,
    featured: false
  },
  {
    id: '16',
    title: "Reforma Tributária: Entenda o Que Muda no Seu Bolso",
    excerpt: "O Congresso aprovou as novas alíquotas de imposto de renda e consumo. Especialistas analisam os impactos.",
    content: "<p>A simplificação dos impostos é o principal objetivo da reforma. Produtos da cesta básica terão isenção total, enquanto bens de luxo terão taxação elevada.</p>",
    category: NewsCategory.Politica,
    author: "Miriam Leitão",
    publishedAt: "2024-05-20T12:00:00Z",
    // Calculator/Finance/Tax Image
    imageUrl: "https://images.unsplash.com/photo-1554224155-8303275bf6fa",
    readTime: 7,
    featured: false
  }
].map(article => ({
  ...article,
  // Optimization is key - using 800px width standard for list
  imageUrl: optimizeImg(article.imageUrl, 800)
}));

export const getFeaturedArticles = (): Article[] => {
  return MOCK_ARTICLES.filter(a => a.featured).map(a => ({
      ...a,
      // Re-optimize for hero size if it's featured
      imageUrl: optimizeImg(a.imageUrl, 1200)
  }));
};

export const getLatestArticles = (): Article[] => {
  return MOCK_ARTICLES.filter(a => !a.featured);
};

export const getAllArticles = (): Article[] => {
  return MOCK_ARTICLES;
};

export const getArticleById = (id: string): Article | undefined => {
  const article = MOCK_ARTICLES.find(a => a.id === id);
  if (article) {
      // Return high-res for detail view
      return {
          ...article,
          imageUrl: optimizeImg(article.imageUrl, 1600)
      };
  }
  return undefined;
};

export const getRelatedArticles = (category: string, currentId: string): Article[] => {
  return MOCK_ARTICLES.filter(a => a.category === category && a.id !== currentId).slice(0, 3);
};

export const searchArticles = (query: string): Article[] => {
  const lowerQuery = query.toLowerCase();
  return MOCK_ARTICLES.filter(article => 
    article.title.toLowerCase().includes(lowerQuery) || 
    article.excerpt.toLowerCase().includes(lowerQuery) ||
    article.category.toLowerCase().includes(lowerQuery)
  );
};