import React from 'react';
import {
  Activity,
  CalendarCheck,
  ClipboardList,
  Clock,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import type { Professional, Service } from '../types/theme';
import './Services.css';

interface ServicesProps {
  professional: Professional;
  onOpenBookingWithService: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ professional, onOpenBookingWithService }) => {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'ShoppingCart':
        return <ClipboardList size={24} />;
      case 'MonitorSmartphone':
        return <Sparkles size={24} />;
      case 'BarChart3':
        return <Activity size={24} />;
      case 'Zap':
        return <Sparkles size={24} />;
      case 'Custom':
        return <ClipboardList size={24} />;
      default:
        return <Sparkles size={24} />;
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="servicos" className="section section-bg">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="section-subtitle">Problemas que eu resolvo</span>
          <h2 className="section-title">Algumas soluções objetivas para pequenos negócios</h2>
        </div>

        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {professional.services.map((service: Service) => (
            <motion.div key={service.id} className="card service-card" variants={cardVariants}>
              <div className="service-icon-wrapper">
                {getIconComponent(service.icon)}
              </div>

              <h3 className="service-title">{service.name}</h3>
              <p className="service-desc">{service.description}</p>

              <div className="service-meta">
                <div className="service-duration">
                  <Clock size={14} />
                  <span>{service.duration}</span>
                </div>
                <div className="service-price">
                  {service.price}
                </div>
              </div>

              <button className="btn btn-primary" onClick={() => onOpenBookingWithService(service.name)}>
                <CalendarCheck size={14} />
                {service.id === 'dev-5' ? 'Contar minha ideia' : 'Quero este projeto'}
              </button>

              {service.id === 'dev-1' && (
                <a className="service-demo-link" href="/catalogo-whatsapp" target="_blank" rel="noreferrer">
                  Ver exemplo pronto
                </a>
              )}

              {service.id === 'dev-2' && (
                <a className="service-demo-link" href="/personal-trainer" target="_blank" rel="noreferrer">
                  Ver exemplo pronto
                </a>
              )}

              {service.id === 'dev-3' && (
                <a className="service-demo-link" href="/mini-dashboard" target="_blank" rel="noreferrer">
                  Ver exemplo pronto
                </a>
              )}

              {service.id === 'dev-4' && (
                <a className="service-demo-link" href="/automacao-processos" target="_blank" rel="noreferrer">
                  Ver exemplo pronto
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
