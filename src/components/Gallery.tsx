import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';
import type { GalleryItem, Professional } from '../types/theme';
import './Gallery.css';

interface GalleryProps {
  professional: Professional;
  onOpenBookingWithService: (serviceName: string) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ professional, onOpenBookingWithService }) => {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (!selectedItem) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedItem(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem]);

  const filteredGallery = activeFilter === 'Todos'
    ? professional.gallery
    : professional.gallery.filter(item => item.category === activeFilter);

  return (
    <section id="galeria" className="section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="section-subtitle">Encontre a solução ideal</span>
          <h2 className="section-title">Veja para quem serve cada projeto</h2>
          <p className="gallery-intro">Clique em um cartão para conhecer a solução, ver exemplos de uso e descobrir se ela combina com o seu negócio.</p>
        </div>

        <div className="gallery-filters">
          {professional.galleryCategories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div 
          layout 
          className="gallery-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredGallery.map((item) => (
              <motion.button
                type="button"
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                className="gallery-item"
                onClick={() => setSelectedItem(item)}
                aria-label={`Ver detalhes de ${item.title}`}
              >
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className="gallery-image"
                  loading="lazy"
                />
                <div className="gallery-overlay">
                  <span className="gallery-item-category">{item.category}</span>
                  <h4 className="gallery-item-title">{item.title}</h4>
                  <span className="gallery-item-action">Ver detalhes <ArrowRight size={15} /></span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="gallery-detail-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelectedItem(null);
            }}
          >
            <motion.aside
              className="gallery-detail-drawer"
              role="dialog"
              aria-modal="true"
              aria-labelledby="gallery-detail-title"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            >
              <button className="gallery-detail-close" onClick={() => setSelectedItem(null)} aria-label="Fechar detalhes">
                <X size={21} />
              </button>

              <div className="gallery-detail-image-wrap">
                <img src={selectedItem.url} alt="" className="gallery-detail-image" />
                <span>{selectedItem.category}</span>
              </div>

              <div className="gallery-detail-content">
                <h2 id="gallery-detail-title">{selectedItem.title}</h2>
                <p>{selectedItem.description}</p>

                <div className="gallery-audience-block">
                  <h3>Para quem este projeto serve?</h3>
                  <div className="gallery-audience-list">
                    {selectedItem.audiences.map((audience) => (
                      <span key={audience}><CheckCircle2 size={14} /> {audience}</span>
                    ))}
                  </div>
                </div>

                <div className="gallery-detail-actions">
                  {selectedItem.demoUrl && (
                    <a href={selectedItem.demoUrl} target="_blank" rel="noreferrer" className="gallery-demo-button">
                      Ver demonstração <ArrowRight size={16} />
                    </a>
                  )}
                  <button
                    className="gallery-project-button"
                    onClick={() => {
                      onOpenBookingWithService(selectedItem.serviceName);
                      setSelectedItem(null);
                    }}
                  >
                    Quero este projeto
                  </button>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
export default Gallery;
