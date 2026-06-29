import { Activity, Award, CalendarCheck, CheckCircle2, Clock, Dumbbell, Flame, Heart, MapPin, Phone, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import trainerPhoto from '../assets/felipe_santos.png';
import { professionalsData } from '../data/professionalsData';
import './PersonalTrainerLanding.css';

const whatsappNumber = professionalsData.developer.phone;

const buildWhatsAppUrl = (service: string) => {
  const message = `Olá, Thiago! Vi a demonstração de Landing Page para serviços (${service}) e tenho interesse em uma página assim para o meu negócio. Pode me explicar os próximos passos?`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
};

const services = [
  {
    title: 'Personal Presencial',
    text: 'Treinos individuais com acompanhamento técnico, correção de postura e planejamento por objetivo.',
    price: 'A partir de R$ 90/aula',
    icon: Dumbbell
  },
  {
    title: 'Consultoria Online',
    text: 'Planilha mensal, vídeos de execução, check-ins semanais e ajustes conforme sua evolução.',
    price: 'A partir de R$ 180/mês',
    icon: Activity
  },
  {
    title: 'Treino em Dupla',
    text: 'Ideal para casais ou amigos que querem dividir o treino sem perder o acompanhamento profissional.',
    price: 'A partir de R$ 140/aula',
    icon: Heart
  }
];

const results = [
  { value: '8kg', label: 'perdidos em média por alunos focados em emagrecimento' },
  { value: '3x', label: 'mais consistência com acompanhamento semanal' },
  { value: '100%', label: 'treinos adaptados ao nível e rotina do aluno' }
];

const testimonials = [
  {
    name: 'Marina Alves',
    text: 'Eu nunca conseguia manter rotina. Com o Lucas, finalmente treinei com consistência e sem dor nas costas.',
    goal: 'Emagrecimento'
  },
  {
    name: 'Rafael Costa',
    text: 'O treino ficou muito mais objetivo. Ganhei força e aprendi a executar os exercícios do jeito certo.',
    goal: 'Hipertrofia'
  }
];

export const PersonalTrainerLanding = () => {
  return (
    <main className="trainer-page">
      <header className="trainer-header">
        <a className="trainer-logo" href="#inicio">
          <Dumbbell size={22} />
          Lucas Fit
        </a>
        <nav className="trainer-nav">
          <a href="#servicos">Serviços</a>
          <a href="#resultados">Resultados</a>
          <a href="#depoimentos">Depoimentos</a>
          <a href="#contato">Contato</a>
        </nav>
        <a className="trainer-header-cta" href={buildWhatsAppUrl('Avaliação física inicial')} target="_blank" rel="noreferrer">
          Quero uma página assim
        </a>
      </header>

      <section id="inicio" className="trainer-hero">
        <div className="trainer-hero-bg" />
        <div className="trainer-container trainer-hero-grid">
          <motion.div
            className="trainer-hero-content"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="trainer-demo-notice">
              Demonstração fictícia: esta página não pertence a um personal trainer real. Os botões levam ao Thiago para orçamento do projeto.
            </div>
            <span className="trainer-badge">
              <Flame size={16} />
              Treinamento personalizado em São Paulo
            </span>
            <h1>Transforme seu corpo com treino inteligente e acompanhamento real.</h1>
            <p>
              Lucas Martins é personal trainer fictício especializado em emagrecimento, hipertrofia e condicionamento
              físico para pessoas que querem resultado sem treinar no improviso.
            </p>
            <div className="trainer-hero-actions">
              <a className="trainer-btn trainer-btn-primary" href={buildWhatsAppUrl('Avaliação física inicial')} target="_blank" rel="noreferrer">
                Quero uma landing page
                <CalendarCheck size={18} />
              </a>
              <a className="trainer-btn trainer-btn-secondary" href="#servicos">
                Ver planos
              </a>
            </div>
            <div className="trainer-trust-row">
              <span><CheckCircle2 size={16} /> Treinos seguros</span>
              <span><CheckCircle2 size={16} /> Acompanhamento semanal</span>
              <span><CheckCircle2 size={16} /> Foco em resultado</span>
            </div>
          </motion.div>

          <motion.div
            className="trainer-photo-card"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <img src={trainerPhoto} alt="Personal trainer Lucas Martins" />
            <div className="trainer-floating-card trainer-floating-top">
              <Award size={20} />
              <span>7 anos de experiência</span>
            </div>
            <div className="trainer-floating-card trainer-floating-bottom">
              <Activity size={20} />
              <span>Planos sob medida</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="servicos" className="trainer-section">
        <div className="trainer-container">
          <div className="trainer-section-title">
            <span>Serviços</span>
            <h2>Escolha o formato de treino ideal para sua rotina</h2>
          </div>

          <div className="trainer-services-grid">
            {services.map((service) => (
              <motion.article
                className="trainer-service-card"
                key={service.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
              >
                <div className="trainer-card-icon">
                  <service.icon size={24} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <strong>{service.price}</strong>
                <a href={buildWhatsAppUrl(service.title)} target="_blank" rel="noreferrer">
                  Quero esse modelo
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="resultados" className="trainer-section trainer-results-section">
        <div className="trainer-container trainer-results-grid">
          <div>
            <span className="trainer-kicker">Método</span>
            <h2>Treino claro, evolução medida e ajustes no caminho.</h2>
            <p>
              A proposta é simples: entender sua rotina, montar um plano possível de seguir e acompanhar sua evolução
              com ajustes semanais. Nada de treino genérico jogado no celular.
            </p>
          </div>
          <div className="trainer-results-cards">
            {results.map((item) => (
              <div className="trainer-result-card" key={item.value}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="depoimentos" className="trainer-section">
        <div className="trainer-container">
          <div className="trainer-section-title">
            <span>Exemplo de seção</span>
            <h2>Como depoimentos poderiam aparecer na página</h2>
            <p className="trainer-section-note">Nomes e relatos ilustrativos, usados apenas para demonstrar o layout de uma landing page.</p>
          </div>
          <div className="trainer-testimonials">
            {testimonials.map((testimonial) => (
              <article className="trainer-testimonial-card" key={testimonial.name}>
                <div className="trainer-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={16} fill="currentColor" />
                  ))}
                </div>
                <p>"{testimonial.text}"</p>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.goal}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contato" className="trainer-contact">
        <div className="trainer-container trainer-contact-box">
          <div>
            <span className="trainer-kicker">Contato</span>
            <h2>Gostou deste modelo de página?</h2>
            <p>Chame o Thiago para adaptar uma landing page como esta ao seu serviço, com textos, seções e chamadas voltadas ao seu público.</p>
            <div className="trainer-contact-details">
              <span><MapPin size={17} /> Atendimento em academias, condomínios e online</span>
              <span><Clock size={17} /> Segunda a sábado, das 6h às 21h</span>
            </div>
          </div>
          <a className="trainer-btn trainer-btn-primary" href={buildWhatsAppUrl('Avaliação física inicial')} target="_blank" rel="noreferrer">
            Quero adaptar para meu negócio
            <Phone size={18} />
          </a>
        </div>
      </section>
    </main>
  );
};

export default PersonalTrainerLanding;
