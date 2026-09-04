import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegistrationCategoryPage from './pages/RegistrationCategoryPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
