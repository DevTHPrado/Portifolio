import type { Professional } from '../types/theme';

import thiagoAvatar from '../assets/thiago-prado-profile.jpeg';

export const professionalsData: Record<string, Professional> = {
  developer: {
    id: 'developer',
    name: 'Thiago Prado',
    role: 'Desenvolvedor de Software',
    subtitle: 'Soluções digitais enxutas para pequenos negócios venderem mais, organizarem a operação e economizarem tempo.',
    bio: 'Sou desenvolvedor de software e construo soluções web modernas para pequenos negócios, profissionais autônomos e comércios locais. Meu foco é transformar processos manuais em páginas, catálogos, painéis e automações simples de usar, com visual profissional e objetivo bem definido.',
    aboutTitle: 'Tecnologia prática para vender, atender e controlar melhor',
    aboutText1: 'Crio catálogos para vender pelo WhatsApp, sites que geram contatos, painéis simples para organizar a operação e automações para eliminar tarefas repetitivas.',
    aboutText2: 'Cada projeto é pensado para o fluxo real do negócio. Antes de desenvolver, analiso o problema, defino um escopo claro e proponho uma solução bonita, rápida e realmente útil no dia a dia.',
    experience: 'Tecnologia prática para pequenos negócios',
    location: 'Atendimento remoto e presencial sob combinação',
    phone: '5511988738676',
    instagram: '@thiagoprado.dev',
    email: 'dev.thprado@gmail.com',
    avatarUrl: thiagoAvatar,
    heroBgGradient: 'radial-gradient(circle at top right, rgba(37, 99, 235, 0.28), transparent 34%), linear-gradient(135deg, #05070d 0%, #0b1220 48%, #151a23 100%)',
    services: [
      {
        id: 'dev-1',
        name: 'Catálogo Digital com Pedido via WhatsApp',
        description: 'Organize seus produtos e permita pedidos rápidos direto no WhatsApp. Ideal para lojas, marmitarias, hamburguerias, docerias, roupas e maquiagem.',
        duration: 'VENDAS',
        price: 'A partir de R$ 750',
        icon: 'ShoppingCart'
      },
      {
        id: 'dev-2',
        name: 'Landing Page Premium para Serviços',
        description: 'Uma página profissional para transformar visitantes em clientes. Ideal para psicólogos, personal trainers, advogados, dentistas e esteticistas.',
        duration: 'SITES',
        price: 'A partir de R$ 700',
        icon: 'MonitorSmartphone'
      },
      {
        id: 'dev-3',
        name: 'Dashboard e Painel de Controle',
        description: 'Pare de controlar seu negócio em planilhas desorganizadas. Visualize vendas, faturamento, produtos mais vendidos e estoque simples em um único painel.',
        duration: 'SISTEMAS',
        price: 'A partir de R$ 900',
        icon: 'BarChart3'
      },
      {
        id: 'dev-4',
        name: 'Automação de Processos',
        description: 'Elimine tarefas manuais repetitivas e economize horas de trabalho com automação de planilhas, relatórios, arquivos CSV, dados e integrações com APIs.',
        duration: 'AUTOMAÇÃO',
        price: 'A partir de R$ 800',
        icon: 'Zap'
      },
      {
        id: 'dev-5',
        name: 'Precisa de algo diferente?',
        description: 'Não encontrou o que precisa? Explique sua ideia e solicite uma análise de viabilidade. O pedido será avaliado antes do orçamento, pois nem todo sistema poderá ser desenvolvido dentro do escopo oferecido.',
        duration: 'SOB ANÁLISE',
        price: 'Viabilidade e orçamento',
        icon: 'Custom'
      }
    ],
    galleryCategories: ['Todos', 'Vendas', 'Sites', 'Sistemas', 'Automação'],
    gallery: [
      {
        id: 'gal-dev-1',
        url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80',
        category: 'Vendas',
        title: 'Catálogo com carrinho e pedido no WhatsApp',
        description: 'Organiza produtos, preços e pedidos em uma experiência simples. O cliente escolhe os itens, confere o total e envia tudo pronto para o WhatsApp.',
        audiences: ['Hamburguerias', 'Marmitarias', 'Pizzarias', 'Docerias', 'Lojas de roupas', 'Lojas de cosméticos'],
        serviceName: 'Catálogo Digital com Pedido via WhatsApp',
        demoUrl: '/catalogo-whatsapp'
      },
      {
        id: 'gal-dev-2',
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
        category: 'Sites',
        title: 'Landing pages responsivas para serviços',
        description: 'Apresenta o profissional, seus serviços e diferenciais em uma página focada em gerar contatos, pedidos de orçamento ou agendamentos.',
        audiences: ['Advogados', 'Psicólogos', 'Dentistas', 'Personal trainers', 'Clínicas', 'Esteticistas', 'Consultores', 'Corretores'],
        serviceName: 'Landing Page Premium para Serviços',
        demoUrl: '/personal-trainer'
      },
      {
        id: 'gal-dev-3',
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
        category: 'Sistemas',
        title: 'Dashboards com indicadores do negócio',
        description: 'Reúne vendas, faturamento e indicadores importantes em um painel visual para acompanhar resultados e tomar decisões com mais rapidez.',
        audiences: ['Lojas', 'E-commerces', 'Restaurantes', 'Distribuidoras', 'Equipes de vendas', 'Prestadores de serviços'],
        serviceName: 'Dashboard e Painel de Controle',
        demoUrl: '/mini-dashboard'
      },
      {
        id: 'gal-dev-5',
        url: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80',
        category: 'Automação',
        title: 'Automação de planilhas, dados e relatórios',
        description: 'Executa tarefas repetitivas com arquivos e dados, reduzindo trabalho manual, erros de digitação e tempo gasto em relatórios.',
        audiences: ['Escritórios contábeis', 'Setores administrativos', 'Equipes financeiras', 'Logística', 'Agências', 'Equipes comerciais'],
        serviceName: 'Automação de Processos',
        demoUrl: '/automacao-processos'
      }
    ]
  }
};
