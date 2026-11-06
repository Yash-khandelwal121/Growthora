import React, { useState } from 'react';
import { 
  Search, ArrowRight, Zap, ShieldCheck, Brain, 
  Sparkles, X, RefreshCw 
} from 'lucide-react';
import api from '../../lib/api';

const BUSINESS_TYPES = [
  'Manufacturing',
  'Services & Retail',
  'Trading & Wholesale',
  'Agri & Food Processing',
  'Technology & Startup',
  'Export & Import',
  'Green Energy & Solar',
  'Healthcare & Pharma'
];

const STATES = [
  'Gujarat',
  'Maharashtra',
  'Rajasthan',
  'Delhi NCR',
  'Uttar Pradesh',
  'Karnataka',
  'Tamil Nadu',
  'Madhya Pradesh',
  'Telangana',
  'West Bengal',
  'Haryana',
  'Punjab',
  'Andhra Pradesh',
  'Kerala',
  'Odisha',
  'Bihar',
  'Assam',
  'Goa',
  'Chhattisgarh',
  'Jharkhand',
  'Uttarakhand',
  'Himachal Pradesh'
];

const TURNOVER_RANGES = [
  'Pre-Revenue / New Setup',
  'Below ₹10 Lakh',
  '₹10 Lakh - ₹50 Lakh',
  '₹50 Lakh - ₹2 Crore',
  '₹2 Crore - ₹10 Crore',
  '₹10 Crore - ₹50 Crore',
  'Above ₹50 Crore'
];

const EMPLOYEE_RANGES = [
  '1 - 5 Employees',
  '6 - 20 Employees',
  '21 - 50 Employees',
  '51 - 200 Employees',
  '200+ Employees'
];

// Curated scheme recommendation matrix based on inputs
function getSchemeRecommendations({ businessType, state, turnover, _employees }) {
  const recommendations = [];

  // 1. CGTMSE Scheme (Applicable across most MSMEs)
  recommendations.push({
    name: 'CGTMSE Collateral-Free Credit',
    tag: 'Govt Credit Guarantee',
    amount: 'Up to ₹10 Crore',
    benefit: '100% Collateral-Free Bank Financing with guarantee coverage up to 85%.',
    badge: 'Popular',
    iconColor: '#FF6B00'
  });

  // 2. PMEGP (Prime Minister Employment Generation)
  if (turnover.includes('Pre-Revenue') || turnover.includes('Below ₹10') || turnover.includes('₹10 Lakh - ₹50')) {
    recommendations.push({
      name: 'PMEGP Subsidy Scheme',
      tag: 'Capital Subsidy',
      amount: 'Up to ₹50 Lakh',
      benefit: '15% to 35% Govt capital subsidy for new projects in manufacturing & services.',
      badge: 'High Subsidy',
      iconColor: '#10B981'
    });
  }

  // 3. Sector-specific schemes
  if (businessType.includes('Food') || businessType.includes('Agri')) {
    recommendations.push({
      name: 'PMFME Micro Food Scheme',
      tag: 'Food Processing Subsidy',
      amount: 'Up to ₹10 Lakh',
      benefit: '35% credit-linked capital subsidy for machinery upgrade & branding.',
      badge: 'Agri Focus',
      iconColor: '#F59E0B'
    });
    recommendations.push({
      name: 'Agriculture Infrastructure Fund (AIF)',
      tag: 'Interest Subvention',
      amount: 'Up to ₹2 Crore',
      benefit: '3% annual interest subvention on post-harvest infrastructure credit.',
      badge: 'Low Interest',
      iconColor: '#3B82F6'
    });
  } else if (businessType.includes('Manufacturing')) {
    if (state === 'Gujarat') {
      recommendations.push({
        name: 'Gujarat Electricity Duty Exemption',
        tag: 'State Power Incentive',
        amount: '100% Duty Waiver',
        benefit: 'Complete exemption on industrial power bills for 5 years directly boosting EBITDA.',
        badge: 'State Exclusive',
        iconColor: '#8B5CF6'
      });
    } else if (state === 'Rajasthan') {
      recommendations.push({
        name: 'Rajasthan RIPS 2024 Scheme',
        tag: 'Investment Incentive',
        amount: 'Up to 25% Capex Subsidy',
        benefit: 'Interest subsidy up to 6% and electricity duty rebate for industrial setups.',
        badge: 'State Exclusive',
        iconColor: '#EC4899'
      });
    } else {
      recommendations.push({
        name: 'ZED Certification & Technology Subsidy',
        tag: 'Quality & Machinery',
        amount: 'Up to ₹5 Lakh Subsidy',
        benefit: 'Government reimbursement for testing, green certifications and machine audits.',
        badge: 'Central Scheme',
        iconColor: '#6366F1'
      });
    }
  } else if (businessType.includes('Startup') || businessType.includes('Tech')) {
    recommendations.push({
      name: 'Startup India Seed Fund (SISFS)',
      tag: 'DPIIT Seed Support',
      amount: 'Up to ₹50 Lakh',
      benefit: '₹20 Lakh grant for prototype proof-of-concept + ₹50 Lakh debt via incubators.',
      badge: 'Non-Dilutive',
      iconColor: '#8B5CF6'
    });
  } else {
    recommendations.push({
      name: 'Pradhan Mantri Mudra Yojana (PMMY)',
      tag: 'Mudra Loan',
      amount: 'Up to ₹20 Lakh',
      benefit: 'Low-interest working capital and term loans under Tarun Plus category.',
      badge: 'Micro Credit',
      iconColor: '#14B8A6'
    });
  }

  // Fallback ensure at least 3 cards
  if (recommendations.length < 3) {
    recommendations.push({
      name: 'Udyam Special Benefits & GeM Tendering',
      tag: 'Procurement Exemption',
      amount: '25% Public Procurement',
      benefit: 'Waiver of EMD tender fees and priority MSME vendor onboarding.',
      badge: 'Statutory',
      iconColor: '#0EA5E9'
    });
  }

  return recommendations.slice(0, 3);
}

export const MSMESchemeFinder = ({ onOpenConsultation, onInputFocus }) => {
  const [formData, setFormData] = useState({
    businessType: '',
    state: '',
    annualTurnover: '',
    employeeCount: ''
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.businessType) {
      setErrorMsg('Please select your Business Type');
      return;
    }
    if (!formData.state) {
      setErrorMsg('Please select your State');
      return;
    }
    if (!formData.annualTurnover) {
      setErrorMsg('Please select your Annual Turnover');
      return;
    }
    if (!formData.employeeCount) {
      setErrorMsg('Please select your Employee Count');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const visitorId = localStorage.getItem('growthora.visitorId') || (() => {
        const id = crypto.randomUUID();
        localStorage.setItem('growthora.visitorId', id);
        return id;
      })();

      // Send lead to backend API safely
      await api.post('/leads', {
        sessionId: visitorId,
        data: {
          source: 'business-suchna-gate',
          businessType: formData.businessType,
          state: formData.state,
          annualTurnover: formData.annualTurnover,
          employeeCount: formData.employeeCount,
          timestamp: new Date().toISOString()
        }
      }).catch((err) => {
        // Non-blocking in case local server is in offline mode
        console.warn('Leads API dispatch info:', err?.message || err);
      });

      // Calculate matching scheme recommendations
      const matched = getSchemeRecommendations(formData);
      setResults(matched);
    } catch (err) {
      console.error(err);
      setErrorMsg('Unable to retrieve schemes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
  };

  return (
    <div className="scheme-finder-card" role="region" aria-label="MSME Scheme Finder Form">
      {/* Results View Modal / Overlay */}
      {results && (
        <div className="finder-results-overlay animate-fade-in">
          <div className="finder-results-header">
            <div className="finder-results-badge">
              <Sparkles size={14} />
              <span>AI Scheme Assessment</span>
            </div>
            <button 
              type="button" 
              className="finder-close-results-btn" 
              onClick={handleReset}
              aria-label="Close results"
            >
              <X size={18} />
            </button>
          </div>

          <h3 className="finder-results-title">
            Eligible Schemes Found for Your MSME!
          </h3>
          <p className="finder-results-sub">
            Based on <strong>{formData.businessType}</strong> in <strong>{formData.state}</strong>:
          </p>

          <div className="finder-matched-list">
            {results.map((scheme, idx) => (
              <div key={idx} className="matched-scheme-row">
                <div className="matched-scheme-info">
                  <div className="matched-scheme-tag-row">
                    <span className="matched-tag">{scheme.tag}</span>
                    <span className="matched-amount-pill">{scheme.amount}</span>
                  </div>
                  <h4 className="matched-name">{scheme.name}</h4>
                  <p className="matched-desc">{scheme.benefit}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="finder-results-actions">
            <button
              type="button"
              className="finder-claim-btn"
              onClick={() => {
                if (onOpenConsultation) {
                  onOpenConsultation({
                    schemeName: results[0]?.name,
                    businessType: formData.businessType,
                    state: formData.state
                  });
                } else {
                  window.location.href = '/book-consultation';
                }
              }}
            >
              <span>Get Expert Assistance to Apply</span>
              <ArrowRight size={16} />
            </button>
            <button
              type="button"
              className="finder-recheck-btn"
              onClick={handleReset}
            >
              <RefreshCw size={14} />
              <span>Modify Details</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Finder Form Header */}
      <div className="scheme-finder-head">
        <div className="scheme-finder-icon-badge" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 2V8H20" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="11.5" cy="14.5" r="2.5" stroke="#FF6B00" strokeWidth="2"/>
            <path d="M13.5 16.5L16 19" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <h2 className="scheme-finder-title">Find Schemes for Your MSME</h2>
        <p className="scheme-finder-desc">
          Get personalised scheme recommendations in seconds with AI.
        </p>
      </div>

      {/* Error notification */}
      {errorMsg && (
        <div className="scheme-finder-error-bar" role="alert">
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Form Fields Grid */}
      <form onSubmit={handleSubmit} className="scheme-finder-form" noValidate>
        <div className="scheme-finder-grid">
          {/* 1. Business Type */}
          <div className="scheme-field-group">
            <label htmlFor="businessType" className="scheme-field-label">
              Business Type
            </label>
            <div className="scheme-select-wrapper">
              <select
                id="businessType"
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                onFocus={onInputFocus}
                className="scheme-select"
                required
              >
                <option value="" disabled>Select Business Type</option>
                {BUSINESS_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 2. State */}
          <div className="scheme-field-group">
            <label htmlFor="state" className="scheme-field-label">
              State
            </label>
            <div className="scheme-select-wrapper">
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                onFocus={onInputFocus}
                className="scheme-select"
                required
              >
                <option value="" disabled>Select State</option>
                {STATES.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 3. Annual Turnover */}
          <div className="scheme-field-group">
            <label htmlFor="annualTurnover" className="scheme-field-label">
              Annual Turnover
            </label>
            <div className="scheme-select-wrapper">
              <select
                id="annualTurnover"
                name="annualTurnover"
                value={formData.annualTurnover}
                onChange={handleChange}
                onFocus={onInputFocus}
                className="scheme-select"
                required
              >
                <option value="" disabled>Select Range</option>
                {TURNOVER_RANGES.map((range) => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 4. Employee Count */}
          <div className="scheme-field-group">
            <label htmlFor="employeeCount" className="scheme-field-label">
              Employee Count
            </label>
            <div className="scheme-select-wrapper">
              <select
                id="employeeCount"
                name="employeeCount"
                value={formData.employeeCount}
                onChange={handleChange}
                onFocus={onInputFocus}
                className="scheme-select"
                required
              >
                <option value="" disabled>Select Range</option>
                {EMPLOYEE_RANGES.map((cnt) => (
                  <option key={cnt} value={cnt}>{cnt}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Submit CTA Button */}
        <button
          type="submit"
          className="scheme-finder-submit-btn"
          disabled={loading}
          aria-label="Check Eligible Schemes"
        >
          {loading ? (
            <span className="scheme-btn-loading">
              <RefreshCw className="spin-icon" size={17} />
              <span>Assessing Schemes...</span>
            </span>
          ) : (
            <span className="scheme-btn-content">
              <Search size={17} className="btn-search-icon" />
              <span>Check Eligible Schemes</span>
              <ArrowRight size={17} className="btn-arrow-icon" />
            </span>
          )}
        </button>

        {/* Trust Badges */}
        <div className="scheme-finder-trust-row" aria-label="Scheme Finder Trust Indicators">
          <div className="scheme-trust-badge">
            <span className="trust-icon-zap">
              <Zap size={14} />
            </span>
            <span>Instant Results</span>
          </div>

          <div className="scheme-trust-badge">
            <span className="trust-icon-shield">
              <ShieldCheck size={14} />
            </span>
            <span>100% Free</span>
          </div>

          <div className="scheme-trust-badge">
            <span className="trust-icon-brain">
              <Brain size={14} />
            </span>
            <span>AI-Powered</span>
          </div>
        </div>

        {/* Micro Subtext */}
        <p className="scheme-finder-disclaimer">
          100% Free • No Registration Required
        </p>
      </form>
    </div>
  );
};
