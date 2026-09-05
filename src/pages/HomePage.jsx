import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVICES_DATA } from '../data/servicesData';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { ServicesMaster } from '../components/ServicesMaster';
import { ServiceFinder } from '../components/ServiceFinder';
import { FAQSection } from '../components/FAQSection';
import { FinalCTA } from '../components/FinalCTA';
import { Footer } from '../components/Footer';
import { ConsultationModal } from '../components/ConsultationModal';
import { AskGrowthoraModal } from '../components/AskGrowthoraModal';

import '../styles/index.css';
import '../styles/animations.css';
import '../styles/blueprint.css';

export default function HomePage() {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState('01');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isAskOpen, setIsAskOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState(null);

  const handleOpenConsultation = (service = null) => {
    if (service && service.id === '01') {
      navigate('/services/registration');
      return;
    }
    if (service && service.id === '02') {
      navigate('/services/finance-funding');
      return;
    }
    if (service && service.id === '03') {
      navigate('/services/certifications');
      return;
    }
    if (service && service.id === '04') {
      navigate('/services/branding');
      return;
    }
    if (service && service.id === '05') {
      navigate('/services/legal-ca');
      return;
    }
    if (service && service.id === '06') {
      navigate('/services/operations');
      return;
    }
    if (service && service.id === '07') {
      navigate('/services/msme-benefits');
      return;
    }
    setSelectedServiceForModal(service);
    setIsConsultationOpen(true);
  };

  const handleSelectCategory = (id) => {
    setActiveId(id);
    const element = document.getElementById('services-master');
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const activeService = SERVICES_DATA.find((s) => s.id === activeId) || SERVICES_DATA[0];

  return (
    <div className="services-page-root">
      {/* 1. Sticky Page Header */}
      <Header
        onOpenConsultation={() => handleOpenConsultation(activeService)}
        onOpenAskGrowthora={() => setIsAskOpen(true)}
      />

      {/* 2. Hero Section */}
      <Hero
        onOpenConsultation={() => handleOpenConsultation(activeService)}
        onSelectCategory={handleSelectCategory}
      />

      {/* 3. Main 9 Services Master Section */}
      <ServicesMaster
        activeId={activeId}
        setActiveId={setActiveId}
        onOpenConsultation={(srv) => handleOpenConsultation(srv)}
      />

      {/* 4. Interactive "Which Service Do I Need?" Finder */}
      <ServiceFinder
        onSelectCategory={handleSelectCategory}
        onOpenConsultation={(srv) => handleOpenConsultation(srv)}
      />

      {/* 5. FAQ Section (Frequently Asked Questions) */}
      <FAQSection />

      {/* 6. Final High-Conversion CTA */}
      <FinalCTA
        onOpenConsultation={() => handleOpenConsultation(activeService)}
        onOpenAskGrowthora={() => setIsAskOpen(true)}
      />

      {/* 6. Compact Corporate Footer */}
      <Footer onSelectCategory={handleSelectCategory} />

      {/* Interactive Modals */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        selectedService={selectedServiceForModal}
      />

      <AskGrowthoraModal
        isOpen={isAskOpen}
        onClose={() => setIsAskOpen(false)}
        onSelectCategory={handleSelectCategory}
      />
    </div>
  );
}

