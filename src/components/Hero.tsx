import React from 'react';
import { ArrowRight, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Professional } from '../types/theme';
import './Hero.css';

interface HeroProps {
  professional: Professional;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ professional, onOpenBooking }) => {
  return (
    <section id="apresentacao" className="hero">
      <div className="container">
        <div className="hero-grid">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="badge-experience">
              <Award size={16} />
              <span>{professional.experience}</span>
            </div>

            <h1 className="hero-title">
              Software sob medida com <span>{professional.name}</span>
            </h1>

            <p className="hero-subtitle">
              {professional.subtitle}
            </p>

            <div className="hero-actions">
              <button className="btn btn-primary" onClick={onOpenBooking}>
                Quero um projeto
                <ArrowRight size={16} />
              </button>
              <a href="#servicos" className="btn btn-secondary">
                Ver projetos
              </a>
            </div>
          </motion.div>

          <motion.div
            className="hero-image-wrapper"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="hero-image-decor"></div>
            <div className="hero-image-container">
              <img
                src={professional.avatarUrl}
                alt={`Foto profissional de ${professional.name}`}
                className="hero-img"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
