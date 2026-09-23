import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ConsultationModal } from '../components/ConsultationModal';
import { AskGrowthoraModal } from '../components/AskGrowthoraModal';
import { EcosystemSection } from '../components/home-preview/EcosystemSection';

import '../styles/index.css';
import '../styles/homePreview.css'; // New styles

export default function EcosystemPreviewPage() {
  const navigate = useNavigate();
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isAskOpen, setIsAskOpen] = useState(false);

  const handleOpenConsultation = () => {
    navigate('/book-consultation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (id) => {
    // For preview, we just navigate to standard routes if clicked from footer
    if (id === '01') { navigate('/services/registration'); return; }
    if (id === '02') { navigate('/services/finance-funding'); return; }
    if (id === '03') { navigate('/services/certifications'); return; }
  };

  return (
    <div className="home-preview-page">
      {/* Existing Header */}
      <Header
        onOpenConsultation={handleOpenConsultation}
        onOpenAskGrowthora={() => setIsAskOpen(true)}
      />
      
      {/* Watermark Background */}
      <div className="ecosystem-watermark"></div>

      {/* New Isolated Component */}
      <EcosystemSection />

      {/* Existing Footer to make it look like a complete page */}
      <Footer onSelectCategory={handleSelectCategory} />

      {/* Modals for Header functionality */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        selectedService={null}
      />

      <AskGrowthoraModal
        isOpen={isAskOpen}
        onClose={() => setIsAskOpen(false)}
        onSelectCategory={handleSelectCategory}
      />
    </div>
  );
}
