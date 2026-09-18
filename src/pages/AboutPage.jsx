import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { AskGrowthoraModal } from '../components/AskGrowthoraModal';
import { ConsultationModal } from '../components/ConsultationModal';
import LeadershipSection from '../components/LeadershipSection';

import '../styles/index.css';

export default function AboutPage() {
  const navigate = useNavigate();
  const [isAskOpen, setIsAskOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const handleSelectCategory = (id) => {
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('services-master');
      if (el) {
        const yOffset = -90;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="about-page-root">
      <Header
        onOpenAskGrowthora={() => setIsAskOpen(true)}
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      <main className="about-content" style={{ minHeight: '80vh', backgroundColor: '#f8f9fa' }}>
        <div style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: '#0B132B', color: 'white' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>About Growthora</h1>
          <p style={{ fontSize: '1.125rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>
            Empowering businesses with strategic consulting, legal, and operational expertise.
          </p>
        </div>

        <LeadershipSection />
        
      </main>

      <Footer onSelectCategory={handleSelectCategory} />

      <AskGrowthoraModal
        isOpen={isAskOpen}
        onClose={() => setIsAskOpen(false)}
        onSelectCategory={handleSelectCategory}
      />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}
