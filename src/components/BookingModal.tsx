import React, { useState } from 'react';
import { Check, Mail, Phone, User, X } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Professional, Service } from '../types/theme';
import './BookingModal.css';

interface BookingModalProps {
  professional: Professional;
  isOpen: boolean;
  onClose: () => void;
  initialServiceName: string | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  professional,
  isOpen,
  onClose,
  initialServiceName
}) => {
  const initialSelectedService = initialServiceName
    ? professional.services.find((service) => service.name === initialServiceName) ?? null
    : null;

  const [selectedService, setSelectedService] = useState<Service | null>(initialSelectedService);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');
  const [deadline, setDeadline] = useState('');
  const [budget, setBudget] = useState('');
  const [sent, setSent] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  if (!isOpen) return null;

  const openWhatsApp = () => {
    if (!selectedService || !name.trim()) return;

    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) {
      setPhoneError('Digite um WhatsApp válido para retorno.');
      return;
    }

    const defaultDetails: Record<string, string> = {
      'dev-1': 'Quero organizar meus produtos e receber pedidos prontos pelo WhatsApp.',
      'dev-2': 'Quero uma página profissional para divulgar meus serviços e gerar contatos.',
      'dev-3': 'Quero organizar vendas, indicadores ou cadastros em um painel simples.',
      'dev-4': 'Quero automatizar uma tarefa repetitiva com planilhas, dados ou relatórios.',
      'dev-5': 'Tenho uma ideia de sistema e quero verificar se o desenvolvimento é viável.'
    };
    const projectDetails = details || defaultDetails[selectedService.id];
    const viabilityNote = selectedService.id === 'dev-5'
      ? '\n\n*Estou ciente de que o pedido passará por uma análise de viabilidade e que o desenvolvimento não é garantido.*'
      : '';
    const message = `Olá, Thiago! Vi seu portfólio e quero conversar sobre um projeto.\n\n*Solução:* ${selectedService.name}\n*Prazo desejado:* ${deadline}\n*Orçamento estimado:* ${budget}\n*Meu nome:* ${name}\n*Meu WhatsApp:* ${phone}\n*O que preciso resolver:* ${projectDetails}${viabilityNote}\n\nPode analisar essas informações e me explicar os próximos passos?`;
    const whatsappUrl = `https://wa.me/${professional.phone}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
    setSent(true);
  };

  return (
    <div className="booking-overlay-wrapper">
      <button className="booking-overlay" onClick={onClose} aria-label="Fechar formulário de orçamento" />

      <motion.div
        className="booking-modal"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        data-theme={professional.id}
      >
        <button className="booking-close" onClick={onClose} aria-label="Fechar">
          <X size={18} />
        </button>

        <div className="booking-content">
          {!sent ? (
            <>
              <h3 className="step-title">Conte sobre seu projeto</h3>
              <p className="step-subtitle">Responda algumas perguntas rápidas antes de continuar no WhatsApp.</p>

              <div className="services-list">
                {professional.services.map((service) => (
                  <button
                    type="button"
                    key={service.id}
                    className={`service-option-card ${selectedService?.id === service.id ? 'selected' : ''}`}
                    onClick={() => setSelectedService(service)}
                  >
                    <span className="service-option-text-group">
                      <span className="service-option-name">{service.name}</span>
                      <span className="service-option-details">{service.duration}</span>
                    </span>
                    <span className="service-option-price">{service.id === 'dev-5' ? 'Analisar' : 'Ver faixa'}</span>
                  </button>
                ))}
              </div>

              {selectedService?.id === 'dev-5' && (
                <p className="viability-notice">
                  A solicitação será analisada antes do orçamento. O envio não garante que o software poderá ser desenvolvido.
                </p>
              )}

              <div className="filter-grid">
                <div className="booking-form-group">
                  <label className="booking-label" htmlFor="project-deadline">Qual é o prazo?</label>
                  <select
                    id="project-deadline"
                    className="booking-input booking-select"
                    value={deadline}
                    onChange={(event) => setDeadline(event.target.value)}
                    required
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="Sem urgência">Sem urgência</option>
                    <option value="Até 15 dias">Até 15 dias</option>
                    <option value="Até 30 dias">Até 30 dias</option>
                    <option value="Mais de 30 dias">Mais de 30 dias</option>
                  </select>
                </div>

                <div className="booking-form-group">
                  <label className="booking-label" htmlFor="project-budget">Orçamento estimado</label>
                  <select
                    id="project-budget"
                    className="booking-input booking-select"
                    value={budget}
                    onChange={(event) => setBudget(event.target.value)}
                    required
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="Até R$ 500">Até R$ 500</option>
                    <option value="De R$ 500 a R$ 1.000">De R$ 500 a R$ 1.000</option>
                    <option value="Acima de R$ 1.000">Acima de R$ 1.000</option>
                    <option value="Ainda não defini">Ainda não defini</option>
                  </select>
                </div>
              </div>

              <div className="booking-form-group">
                <label className="booking-label" htmlFor="client-name">Nome</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    id="client-name"
                    className="booking-input"
                    placeholder="Ex: João Silva"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    style={{ paddingLeft: '2.5rem' }}
                    required
                  />
                </div>
              </div>

              <div className="booking-form-group">
                <label className="booking-label" htmlFor="client-phone">WhatsApp</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="tel"
                    id="client-phone"
                    className="booking-input"
                    placeholder="Ex: (11) 99999-9999"
                    value={phone}
                    onChange={(event) => {
                      setPhone(event.target.value);
                      setPhoneError('');
                    }}
                    style={{ paddingLeft: '2.5rem' }}
                    required
                  />
                </div>
                {phoneError && <span className="form-error">{phoneError}</span>}
              </div>

              <div className="booking-form-group">
                <label className="booking-label" htmlFor="client-details">Conte um pouco sobre o projeto</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                  <textarea
                    id="client-details"
                    className="booking-input booking-textarea"
                    placeholder="Ex: Tenho uma loja de marmitas e quero receber pedidos pelo WhatsApp."
                    value={details}
                    onChange={(event) => setDetails(event.target.value)}
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>

              <p className="commercial-notice">
                <strong>Condições comerciais:</strong> pagamentos por Pix ou transferência bancária. Prazos, valores e entregas só ficam confirmados após análise e aceite do orçamento. A contratação pode contar com recibo ou documento aplicável ao acordo.
              </p>
              <p className="commercial-notice">
                <strong>Privacidade:</strong> seus dados serão usados apenas para responder esta solicitação de orçamento pelo WhatsApp. Evite enviar senhas, dados bancários ou informações sensíveis nesta etapa.
              </p>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={onClose}>
                  Cancelar
                </button>
                <button className="btn btn-primary" onClick={openWhatsApp} disabled={!selectedService || !deadline || !budget || !name || !phone}>
                  Continuar no WhatsApp
                </button>
              </div>
            </>
          ) : (
            <div className="success-wrapper">
              <div className="success-icon-circle">
                <Check size={36} />
              </div>
              <h3 className="success-title">Mensagem preparada</h3>
              <p className="success-text">
                O WhatsApp foi aberto com sua solicitação de orçamento para <strong>{professional.name}</strong>.
              </p>
              <button className="btn btn-primary" onClick={openWhatsApp}>
                Reabrir WhatsApp
              </button>
              <button className="btn btn-secondary" onClick={onClose}>
                Fechar
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default BookingModal;
