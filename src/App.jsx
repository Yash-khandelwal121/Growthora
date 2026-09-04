import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegistrationCategoryPage from './pages/RegistrationCategoryPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import FinanceFundingCategoryPage from './pages/FinanceFundingCategoryPage';
import FinanceFundingDetailPage from './pages/FinanceFundingDetailPage';
import CertificationCategoryPage from './pages/CertificationCategoryPage';
import CertificationDetailPage from './pages/CertificationDetailPage';
import ScrollToTop from './components/ScrollToTop';

import './styles/index.css';
import './styles/animations.css';
import './styles/blueprint.css';
import './styles/serviceDetail.css';

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services/registration" element={<RegistrationCategoryPage />} />
        <Route path="/services/registration/:serviceId" element={<ServiceDetailPage />} />
        
        {/* Finance & Funding Routes */}
        <Route path="/services/finance-funding" element={<FinanceFundingCategoryPage />} />
        <Route path="/services/finance-funding/:categoryId" element={<FinanceFundingDetailPage />} />
        <Route path="/services/finance-funding/grants/:grantId" element={<FinanceFundingDetailPage />} />

        {/* Certifications Routes */}
        <Route path="/services/certifications" element={<CertificationCategoryPage />} />
        <Route path="/services/certifications/:serviceSlug" element={<CertificationDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
