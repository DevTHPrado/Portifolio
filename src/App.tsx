import { useEffect, useState } from 'react';
import {
  Activity,
  Award,
  CheckCircle2,
  ClipboardList,
  Clock,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import { professionalsData } from './data/professionalsData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { BookingModal } from './components/BookingModal';
import { PersonalTrainerLanding } from './examples/PersonalTrainerLanding';
import { WhatsAppCatalog } from './examples/WhatsAppCatalog';
import { MiniDashboard } from './examples/MiniDashboard';
import { ProcessAutomation } from './examples/ProcessAutomation';
import logoImage from './assets/dev-thp-wordmark-transparent.png';

import './App.css';

const professional = professionalsData.developer;

const WhatsAppIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.04 2a9.84 9.84 0 0 0-8.42 14.94L2 22l5.2-1.57A9.97 9.97 0 1 0 12.04 2Zm0 17.95a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.08.93.96-3-.2-.31a8.01 8.01 0 1 1 6.75 3.69Zm4.45-6.05c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.53.06-.24-.12-1.03-.38-1.96-1.21a7.32 7.32 0 0 1-1.36-1.69c-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.41.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.65.3-.22.24-.85.83-.85 2.03s.87 2.36.99 2.52c.12.16 1.72 2.63 4.17 3.69.58.25 1.04.4 1.39.51.59.19 1.12.16 1.54.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.47-.28Z" />
  </svg>
);

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | null>(null);

  useEffect(() => {
    document.body.dataset.theme = professional.id;
    document.title = `${professional.name} | ${professional.role}`;
  }, []);

  if (window.location.pathname === '/personal-trainer') {
    return <PersonalTrainerLanding />;
  }

  if (window.location.pathname === '/catalogo-whatsapp') {
    return <WhatsAppCatalog />;
  }

  if (window.location.pathname === '/mini-dashboard') {
    return <MiniDashboard />;
  }

  if (window.location.pathname === '/automacao-processos') {
    return <ProcessAutomation />;
  }

  const handleOpenBooking = () => {
    setPreselectedService(null);
    setIsBookingOpen(true);
  };

  const handleOpenBookingWithService = (serviceName: string) => {
    setPreselectedService(serviceName);
    setIsBookingOpen(true);
  };

  const quickMessage = 'Olá, Thiago! Vi seu portfólio e gostaria de entender qual solução faz mais sentido para o meu negócio.';
  const quickWhatsappUrl = `https://wa.me/${professional.phone}?text=${encodeURIComponent(quickMessage)}`;

  const highlights = [
    {
      title: 'Escopo claro e seguro',
      desc: 'Projetos pequenos e médios, com objetivo definido e sem complexidade desnecessária.'
    },
    {
      title: 'Fluxo pensado para vender',
      desc: 'WhatsApp, chamadas estratégicas e informações organizadas para o cliente agir.'
    },
    {
      title: 'Entrega que gera resultado',
      desc: 'A solução precisa vender, organizar ou economizar tempo no dia a dia.'
    }
  ];

  const solutionBenefits = [
    {
      id: 'catalogo',
      title: 'Catálogo Digital com Pedido via WhatsApp',
      summary: 'Transforme produtos espalhados em uma experiência de compra simples e organizada.',
      benefits: [
        'Mostra produtos, descrições e preços de forma profissional.',
        'Permite que o cliente monte o carrinho e confira o total antes de pedir.',
        'Envia o pedido completo e organizado diretamente para o WhatsApp.',
        'Reduz perguntas repetidas, erros no atendimento e desistências durante a compra.'
      ]
    },
    {
      id: 'landing-page',
      title: 'Landing Page Premium para Serviços',
      summary: 'Apresente seu trabalho com clareza e conduza o visitante até o contato.',
      benefits: [
        'Transmite mais confiança e profissionalismo para novos clientes.',
        'Organiza serviços, diferenciais e informações importantes em um só lugar.',
        'Direciona o visitante para uma ação clara, como chamar no WhatsApp ou agendar.',
        'Funciona bem no celular e pode ser usada em anúncios, redes sociais e link da bio.'
      ]
    },
    {
      id: 'dashboard',
      title: 'Dashboard e Painel de Controle',
      summary: 'Tenha os números importantes do negócio reunidos em uma visão fácil de entender.',
      benefits: [
        'Centraliza vendas, faturamento e outros indicadores em um único painel.',
        'Ajuda a identificar produtos mais vendidos, tendências e pontos de atenção.',
        'Facilita decisões rápidas sem depender de várias planilhas desorganizadas.',
        'Torna o acompanhamento da operação mais visual, consistente e acessível.'
      ]
    },
    {
      id: 'automacao',
      title: 'Automação de Processos',
      summary: 'Elimine etapas repetitivas e use seu tempo em atividades mais importantes.',
      benefits: [
        'Processa planilhas, arquivos e dados em poucos cliques.',
        'Reduz erros causados por cópias, cálculos e conferências manuais.',
        'Padroniza relatórios e tarefas que precisam ser repetidas com frequência.',
        'Economiza horas de trabalho e deixa o processo mais rápido e previsível.'
      ]
    }
  ];

  const processSteps = [
    { icon: Phone, title: 'Entendo o negócio', desc: 'Mapeio o que você vende, como atende e onde está perdendo tempo.' },
    { icon: ClipboardList, title: 'Definimos o escopo', desc: 'Tudo o que será entregue, e também o que não será incluído, fica combinado antes do início.' },
    { icon: Award, title: 'Entrego pronto para usar', desc: 'Você recebe o projeto funcionando conforme o escopo aprovado.' }
  ];

  const projectTerms = [
    { icon: Mail, title: 'Alinhamento', desc: 'Uma reunião inicial e até 2 reuniões adicionais durante o desenvolvimento.' },
    { icon: ClipboardList, title: 'Escopo fechado', desc: 'Funcionalidades, prazos e itens não inclusos são definidos antes do início.' },
    { icon: Activity, title: 'Pagamento', desc: '50% de entrada para iniciar e 50% na entrega final. Pagamento via Pix ou transferência bancária.' },
    { icon: Clock, title: 'Pós-entrega', desc: 'Durante 15 dias, você pode solicitar até 3 ajustes de cortesia dentro do escopo aprovado, sem limitar a garantia legal para defeitos do serviço.' },
    { icon: CheckCircle2, title: 'O que conta como ajuste', desc: 'Textos, cores, botões, fontes, responsividade e correções simples de funcionamento.' },
    { icon: Sparkles, title: 'Mudanças adicionais', desc: 'Novas telas, integrações e funcionalidades são avaliadas e cobradas separadamente.' }
  ];

  return (
    <div className="app-container">
      <Header professional={professional} onOpenBooking={handleOpenBooking} />
      <Hero professional={professional} onOpenBooking={handleOpenBooking} />

      <section id="sobre" className="section">
        <div className="container">
          <div className="about-grid">
            <motion.div
              className="about-content"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-subtitle">Sobre mim</span>
              <h2 className="about-title">{professional.aboutTitle}</h2>
              <p className="about-text">{professional.bio}</p>
              <p className="about-text">{professional.aboutText2}</p>

              <div className="about-highlights">
                {highlights.map((highlight) => (
                  <div key={highlight.title} className="about-highlight-item">
                    <CheckCircle2 size={18} className="about-highlight-icon" />
                    <div>
                      <span className="about-highlight-title">{highlight.title}</span>
                      <p className="about-highlight-desc">{highlight.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="about-stats"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <button className="stat-box stat-box-button" onClick={() => handleOpenBookingWithService('Catálogo Digital com Pedido via WhatsApp')}>
                <Sparkles size={28} className="stat-icon" />
                <span className="stat-number">Vendas</span>
                <span className="stat-label">Catálogos e páginas para gerar mais contatos</span>
                <span className="stat-action">Quero um projeto</span>
              </button>
              <button className="stat-box stat-box-button" onClick={() => handleOpenBookingWithService('Dashboard e Painel de Controle')}>
                <Activity size={28} className="stat-icon" />
                <span className="stat-number">Gestão</span>
                <span className="stat-label">Painéis simples para organizar a operação</span>
                <span className="stat-action">Quero um projeto</span>
              </button>
              <button className="stat-box stat-box-button stat-box-wide" onClick={() => handleOpenBookingWithService('Automação de Processos')}>
                <CheckCircle2 size={28} className="stat-icon" />
                <span className="stat-number stat-number-wide">Automação sem complicação</span>
                <span className="stat-label">Planilhas, relatórios e tarefas repetitivas resolvidas com Python</span>
                <span className="stat-action">Quero um projeto</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="condicoes" className="section section-bg">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Condições do projeto</span>
            <h2 className="section-title">Um processo transparente do orçamento ao pós-entrega</h2>
          </div>

          <div className="terms-grid">
            {projectTerms.map((term) => (
              <motion.div
                key={term.title}
                className="card term-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
              >
                <term.icon size={22} className="term-icon" />
                <h3>{term.title}</h3>
                <p>{term.desc}</p>
              </motion.div>
            ))}
          </div>

          <p className="terms-note">
            <strong>Pagamento e contratação:</strong> as formas de pagamento disponíveis no momento são Pix e transferência bancária. A contratação é combinada antes do início e pode contar com recibo ou documento aplicável ao acordo.
            <span>Funcionalidades novas ou alterações que mudem o escopo original não fazem parte dos ajustes gratuitos e recebem um orçamento separado. Os prazos, valores e entregas só ficam confirmados após alinhamento e aceite do orçamento.</span>
          </p>
        </div>
      </section>

      <Services professional={professional} onOpenBookingWithService={handleOpenBookingWithService} />

      <section id="processo" className="section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Como funciona</span>
            <h2 className="section-title">Projeto simples, profissional e direto ao ponto</h2>
          </div>

          <div className="process-grid">
            {processSteps.map((step) => (
              <motion.div
                key={step.title}
                className="card process-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="service-icon-wrapper">
                  <step.icon size={24} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Gallery professional={professional} onOpenBookingWithService={handleOpenBookingWithService} />

      <section id="beneficios" className="section section-bg">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Valor para o seu negócio</span>
            <h2 className="section-title">Motivos para investir nestas soluções</h2>
            <p className="benefits-intro">Clique em cada projeto para conhecer seus principais benefícios.</p>
          </div>

          <motion.div
            className="benefits-accordion"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {solutionBenefits.map((solution) => (
              <details key={solution.id} name="solution-benefits" className="benefit-drawer">
                <summary>
                  <span className="benefit-summary-copy">
                    <strong>{solution.title}</strong>
                    <small>{solution.summary}</small>
                  </span>
                  <span className="benefit-toggle" aria-hidden="true" />
                </summary>
                <div className="benefit-drawer-content">
                  <h3>Como esta solução pode ajudar:</h3>
                  <ul>
                    {solution.benefits.map((benefit) => (
                      <li key={benefit}>
                        <CheckCircle2 size={17} />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </motion.div>
        </div>
      </section>

      <footer id="contato" className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="footer-logo">
                <img src={logoImage} alt={`Logo ${professional.name}`} className="footer-logo-img" />
              </div>
              <p className="footer-desc">
                Catálogos, sites, painéis e automações para pequenos negócios venderem mais e trabalharem com menos tarefas manuais.
              </p>
            </div>

            <div className="footer-col">
              <h4 className="footer-title">Navegação</h4>
              <div className="footer-links">
                <a href="#sobre" className="footer-link">Sobre</a>
                <a href="#servicos" className="footer-link">Projetos</a>
                <a href="#processo" className="footer-link">Processo</a>
                <a href="#condicoes" className="footer-link">Condições</a>
                <a href="#contato" className="footer-link">Contato</a>
              </div>
            </div>

            <div className="footer-col">
              <h4 className="footer-title">Fale comigo</h4>
              <div className="contact-items">
                <div className="contact-item">
                  <MapPin size={16} className="contact-icon" />
                  <span className="contact-text">{professional.location}</span>
                </div>
                <div className="contact-item">
                  <Mail size={16} className="contact-icon" />
                  <a className="contact-text" href={`mailto:${professional.email}`}>{professional.email}</a>
                </div>
                <div className="contact-item">
                  <Phone size={16} className="contact-icon" />
                  <a className="contact-text" href={quickWhatsappUrl} target="_blank" rel="noreferrer">+55 (11) 98873-8676</a>
                </div>
                <div className="contact-item">
                  <span className="linkedin-icon" aria-hidden="true">in</span>
                  <a className="contact-text" href="https://www.linkedin.com/in/dev-thprado" target="_blank" rel="noreferrer">linkedin.com/in/dev-thprado</a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div>
              &copy; {new Date().getFullYear()} {professional.name}. Todos os direitos reservados.
            </div>
            <button className="freelancer-credit-btn" onClick={handleOpenBooking}>
              Quero um projeto
            </button>
          </div>
        </div>
      </footer>

      <a
        className="whatsapp-float"
        href={quickWhatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com Thiago Prado pelo WhatsApp"
        title="Falar pelo WhatsApp"
      >
        <WhatsAppIcon size={24} />
        <span>WhatsApp</span>
      </a>

      <AnimatePresence>
        {isBookingOpen && (
          <BookingModal
            key={preselectedService ?? 'booking'}
            professional={professional}
            isOpen={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
            initialServiceName={preselectedService}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
