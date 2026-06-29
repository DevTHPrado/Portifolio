import React, { useEffect, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import type { Professional } from '../types/theme';
import logoImage from '../assets/dev-thp-wordmark-transparent.png';
import './Header.css';

interface HeaderProps {
  professional: Professional;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ professional, onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const openContact = () => {
    closeMobileMenu();
    onOpenBooking();
  };

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          <a href="#apresentacao" className="logo">
            <img src={logoImage} alt={`Logo ${professional.name}`} className="header-logo-img" />
          </a>

          <nav className="nav-links">
            <a href="#sobre" className="nav-link">Sobre</a>
            <a href="#servicos" className="nav-link">Projetos</a>
            <a href="#processo" className="nav-link">Processo</a>
            <a href="#condicoes" className="nav-link">Condições</a>
            <a href="#contato" className="nav-link">Contato</a>
          </nav>

          <div className="header-actions">
            <button className="btn btn-primary" onClick={onOpenBooking}>
              <Phone size={16} />
              Quero um projeto
            </button>

            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <button
        className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
        aria-label="Fechar menu de navegação"
      />

      <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <button className="mobile-nav-close" onClick={closeMobileMenu} aria-label="Fechar menu">
          <X size={20} />
        </button>

        <div className="mobile-nav-links">
          <a href="#sobre" className="mobile-nav-link" onClick={closeMobileMenu}>Sobre</a>
          <a href="#servicos" className="mobile-nav-link" onClick={closeMobileMenu}>Projetos</a>
          <a href="#processo" className="mobile-nav-link" onClick={closeMobileMenu}>Processo</a>
          <a href="#condicoes" className="mobile-nav-link" onClick={closeMobileMenu}>Condições</a>
          <a href="#contato" className="mobile-nav-link" onClick={closeMobileMenu}>Contato</a>
        </div>

        <button className="btn btn-primary" onClick={openContact} style={{ width: '100%', marginTop: '2rem' }}>
          <Phone size={16} />
          Quero um projeto
        </button>
      </div>
    </>
  );
};

export default Header;
