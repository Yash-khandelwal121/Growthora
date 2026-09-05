import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegistrationCategoryPage from './pages/RegistrationCategoryPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import FinanceFundingCategoryPage from './pages/FinanceFundingCategoryPage';
import FinanceFundingDetailPage from './pages/FinanceFundingDetailPage';
import CertificationCategoryPage from './pages/CertificationCategoryPage';
import CertificationDetailPage from './pages/CertificationDetailPage';
import BrandingPage from './pages/BrandingPage';
import OperationsCategoryPage from './pages/OperationsCategoryPage';
import OperationsDetailPage from './pages/OperationsDetailPage';
import LegalCaCategoryPage from './pages/LegalCaCategoryPage';
import LegalCaDetailPage from './pages/LegalCaDetailPage';
import MsmeCategoryPage from './pages/MsmeCategoryPage';
import MsmeDetailPage from './pages/MsmeDetailPage';
import IpoPage from './pages/IpoPage';
import ValuationPage from './pages/ValuationPage';
import BookConsultationPage from './pages/BookConsultationPage';
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

        {/* Branding Routes */}
        <Route path="/services/branding" element={<BrandingPage />} />

        {/* Operations Routes */}
        <Route path="/services/operations" element={<OperationsCategoryPage />} />
        <Route path="/services/operations/:serviceSlug" element={<OperationsDetailPage />} />

        {/* Legal & CA Routes */}
        <Route path="/services/legal-ca" element={<LegalCaCategoryPage />} />
        <Route path="/services/legal-ca/:serviceSlug" element={<LegalCaDetailPage />} />

        {/* MSME Benefits Routes */}
        <Route path="/services/msme-benefits" element={<MsmeCategoryPage />} />
        <Route path="/services/msme-benefits/:schemeSlug" element={<MsmeDetailPage />} />

        {/* IPO Routes */}
        <Route path="/services/ipo" element={<IpoPage />} />
        <Route path="/services/ipo/:serviceSlug" element={<IpoPage />} />

        {/* Valuation Routes */}
        <Route path="/services/valuation" element={<ValuationPage />} />
        <Route path="/services/valuation/:serviceSlug" element={<ValuationPage />} />

        {/* Book a Consultation Standalone Page Routes */}
        <Route path="/book-a-consultation" element={<BookConsultationPage />} />
        <Route path="/book-consultation" element={<BookConsultationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
