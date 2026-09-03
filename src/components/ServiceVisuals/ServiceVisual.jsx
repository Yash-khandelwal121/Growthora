import React from 'react';

export const ServiceVisual = ({ categoryId }) => {
  switch (categoryId) {
    case '01':
      return (
        <div className="visual-wrapper visual-registration">
          <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="visual-svg">
            <defs>
              <linearGradient id="regGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#FF9E43" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#FAF8F5" />
              </linearGradient>
            </defs>

            {/* Background Grid Lines */}
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(15,23,42,0.05)" strokeWidth="1" />
            </pattern>
            <rect width="400" height="300" fill="url(#grid)" rx="16" />

            {/* Central Certificate Card */}
            <rect x="70" y="50" width="260" height="200" rx="12" fill="url(#cardGrad)" stroke="rgba(255, 107, 0, 0.4)" strokeWidth="1.5" className="glow-box" />
            
            {/* Document Details */}
            <rect x="100" y="80" width="140" height="12" rx="4" fill="url(#regGrad)" />
            <rect x="100" y="104" width="200" height="6" rx="3" fill="rgba(15,23,42,0.12)" />
            <rect x="100" y="118" width="170" height="6" rx="3" fill="rgba(15,23,42,0.08)" />
            <rect x="100" y="132" width="120" height="6" rx="3" fill="rgba(15,23,42,0.08)" />

            {/* Badges / Filings */}
            <g transform="translate(100, 160)">
              <rect x="0" y="0" width="60" height="24" rx="6" fill="rgba(255,107,0,0.12)" stroke="#FF6B00" strokeWidth="1" />
              <text x="30" y="16" fill="#FF6B00" fontSize="10" fontWeight="700" textAnchor="middle">MCA</text>
            </g>
            <g transform="translate(170, 160)">
              <rect x="0" y="0" width="60" height="24" rx="6" fill="rgba(99,102,241,0.12)" stroke="#6366F1" strokeWidth="1" />
              <text x="30" y="16" fill="#6366F1" fontSize="10" fontWeight="700" textAnchor="middle">GSTIN</text>
            </g>
            <g transform="translate(240, 160)">
              <rect x="0" y="0" width="60" height="24" rx="6" fill="rgba(16,185,129,0.12)" stroke="#10B981" strokeWidth="1" />
              <text x="30" y="16" fill="#10B981" fontSize="10" fontWeight="700" textAnchor="middle">UDYAM</text>
            </g>

            {/* Floating Stamp Badge */}
            <g transform="translate(280, 70)" className="float-anim">
              <circle cx="25" cy="25" r="24" fill="#FF6B00" />
              <circle cx="25" cy="25" r="18" fill="none" stroke="#FFF" strokeWidth="1.5" strokeDasharray="3 2" />
              <path d="M18 25L23 30L33 18" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* Verification Status */}
            <rect x="100" y="200" width="200" height="24" rx="6" fill="rgba(16, 185, 129, 0.12)" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="1" />
            <circle cx="114" cy="212" r="4" fill="#10B981" />
            <text x="126" y="216" fill="#10B981" fontSize="10" fontWeight="700">INCORPORATION VERIFIED</text>
          </svg>
        </div>
      );

    case '02':
      return (
        <div className="visual-wrapper visual-finance">
          <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="visual-svg">
            <defs>
              <linearGradient id="finGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366F1" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#818CF8" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            <rect width="400" height="300" fill="#FAF8F5" rx="16" />

            {/* Capital Pipeline Path */}
            <path d="M 50 220 C 120 220, 140 140, 200 140 C 260 140, 280 80, 350 70" fill="none" stroke="url(#finGrad)" strokeWidth="4" />
            
            {/* Area Fill */}
            <path d="M 50 220 C 120 220, 140 140, 200 140 C 260 140, 280 80, 350 70 L 350 250 L 50 250 Z" fill="url(#finGrad)" opacity="0.15" />

            {/* Nodes */}
            <g transform="translate(100, 200)">
              <circle cx="0" cy="0" r="14" fill="#FFFFFF" stroke="#6366F1" strokeWidth="2" />
              <text x="0" y="4" fill="#0F172A" fontSize="9" fontWeight="700" textAnchor="middle">GRANT</text>
            </g>
            <g transform="translate(200, 140)">
              <circle cx="0" cy="0" r="18" fill="#6366F1" />
              <text x="0" y="4" fill="#FFF" fontSize="10" fontWeight="700" textAnchor="middle">DEBT</text>
            </g>
            <g transform="translate(300, 85)" className="pulse-anim">
              <circle cx="0" cy="0" r="22" fill="#FF6B00" />
              <text x="0" y="4" fill="#FFF" fontSize="11" fontWeight="800" textAnchor="middle">EQUITY</text>
            </g>

            {/* Disbursement Card Floating */}
            <g transform="translate(210, 180)" className="float-anim">
              <rect width="150" height="60" rx="10" fill="#FFFFFF" stroke="rgba(255, 107, 0, 0.5)" strokeWidth="1.5" />
              <text x="14" y="24" fill="#64748B" fontSize="10">Disbursement Status</text>
              <text x="14" y="44" fill="#10B981" fontSize="14" fontWeight="800">₹5.0 Cr Sanctioned</text>
            </g>
          </svg>
        </div>
      );

    case '03':
      return (
        <div className="visual-wrapper visual-certifications">
          <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="visual-svg">
            <rect width="400" height="300" fill="#FAF8F5" rx="16" />

            {/* ISO / FSSAI Quality Shield */}
            <path d="M 200 40 L 300 80 V 170 C 300 230, 200 260, 200 260 C 200 260, 100 230, 100 170 V 80 Z" fill="#FFFFFF" stroke="#10B981" strokeWidth="2.5" className="glow-box" />

            {/* Shield Center Emblem */}
            <circle cx="200" cy="140" r="45" fill="rgba(16, 185, 129, 0.1)" stroke="#10B981" strokeWidth="1.5" />
            <path d="M 180 140 L 195 155 L 225 125" stroke="#10B981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

            {/* Floating Certification Badges */}
            <g transform="translate(50, 90)" className="float-anim">
              <rect width="90" height="32" rx="8" fill="#FFFFFF" stroke="#10B981" strokeWidth="1.5" />
              <text x="45" y="20" fill="#0F172A" fontSize="11" fontWeight="700" textAnchor="middle">ISO 9001</text>
            </g>
            <g transform="translate(260, 180)" className="float-anim" style={{ animationDelay: '1s' }}>
              <rect width="90" height="32" rx="8" fill="#FFFFFF" stroke="#FF6B00" strokeWidth="1.5" />
              <text x="45" y="20" fill="#0F172A" fontSize="11" fontWeight="700" textAnchor="middle">FSSAI</text>
            </g>
            <g transform="translate(60, 200)" className="float-anim" style={{ animationDelay: '1.5s' }}>
              <rect width="90" height="32" rx="8" fill="#FFFFFF" stroke="#6366F1" strokeWidth="1.5" />
              <text x="45" y="20" fill="#0F172A" fontSize="11" fontWeight="700" textAnchor="middle">ZED GOLD</text>
            </g>
          </svg>
        </div>
      );

    case '04':
      return (
        <div className="visual-wrapper visual-branding">
          <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="visual-svg">
            <rect width="400" height="300" fill="#FAF8F5" rx="16" />

            {/* Design Browser Window */}
            <rect x="50" y="40" width="300" height="220" rx="10" fill="#FFFFFF" stroke="rgba(236, 72, 153, 0.4)" strokeWidth="1.5" />
            <path d="M 50 70 L 350 70" stroke="rgba(15,23,42,0.1)" strokeWidth="1" />
            <circle cx="70" cy="55" r="4" fill="#FF5F56" />
            <circle cx="85" cy="55" r="4" fill="#FFBD2E" />
            <circle cx="100" cy="55" r="4" fill="#27C93F" />

            {/* Brand Logo & Layout Preview */}
            <rect x="75" y="95" width="110" height="40" rx="6" fill="rgba(236, 72, 153, 0.12)" stroke="#EC4899" strokeWidth="1" />
            <text x="130" y="120" fill="#EC4899" fontSize="12" fontWeight="800" textAnchor="middle">BRAND SYS</text>

            <rect x="200" y="95" width="125" height="12" rx="4" fill="rgba(15,23,42,0.12)" />
            <rect x="200" y="115" width="90" height="8" rx="4" fill="rgba(15,23,42,0.08)" />

            {/* Palette circles */}
            <circle cx="90" cy="170" r="14" fill="#FF6B00" />
            <circle cx="125" cy="170" r="14" fill="#EC4899" />
            <circle cx="160" cy="170" r="14" fill="#6366F1" />

            <rect x="200" y="150" width="125" height="80" rx="8" fill="#F8F6F0" stroke="rgba(15,23,42,0.1)" />
            <path d="M 215 200 L 245 170 L 275 190 L 305 160" stroke="#EC4899" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      );

    case '05':
      return (
        <div className="visual-wrapper visual-operations">
          <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="visual-svg">
            <rect width="400" height="300" fill="#FAF8F5" rx="16" />

            {/* Interconnected Workflow Nodes */}
            <path d="M 100 150 L 200 80 L 300 150 L 200 220 Z" fill="none" stroke="rgba(14, 165, 233, 0.4)" strokeWidth="2" strokeDasharray="4 4" />

            {/* CRM Node */}
            <g transform="translate(100, 150)">
              <circle cx="0" cy="0" r="26" fill="#FFFFFF" stroke="#0EA5E9" strokeWidth="2" />
              <text x="0" y="4" fill="#0F172A" fontSize="10" fontWeight="700" textAnchor="middle">CRM</text>
            </g>

            {/* HR Node */}
            <g transform="translate(200, 80)">
              <circle cx="0" cy="0" r="26" fill="#FFFFFF" stroke="#6366F1" strokeWidth="2" />
              <text x="0" y="4" fill="#0F172A" fontSize="10" fontWeight="700" textAnchor="middle">HR INFRA</text>
            </g>

            {/* Sales Node */}
            <g transform="translate(300, 150)">
              <circle cx="0" cy="0" r="26" fill="#FFFFFF" stroke="#FF6B00" strokeWidth="2" />
              <text x="0" y="4" fill="#0F172A" fontSize="10" fontWeight="700" textAnchor="middle">SALES</text>
            </g>

            {/* Strategy Center Node */}
            <g transform="translate(200, 220)">
              <circle cx="0" cy="0" r="26" fill="#FFFFFF" stroke="#10B981" strokeWidth="2" />
              <text x="0" y="4" fill="#0F172A" fontSize="9" fontWeight="700" textAnchor="middle">STRATEGY</text>
            </g>

            {/* Central Hub */}
            <circle cx="200" cy="150" r="16" fill="#0EA5E9" className="pulse-anim" />
            <text x="200" y="154" fill="#FFF" fontSize="9" fontWeight="800" textAnchor="middle">SYNC</text>
          </svg>
        </div>
      );

    case '06':
      return (
        <div className="visual-wrapper visual-legal">
          <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="visual-svg">
            <rect width="400" height="300" fill="#FAF8F5" rx="16" />

            {/* Legal Pillars & Balance Scales */}
            <g transform="translate(200, 70)">
              <line x1="0" y1="0" x2="0" y2="130" stroke="#8B5CF6" strokeWidth="3" />
              <line x1="-80" y1="20" x2="80" y2="20" stroke="#8B5CF6" strokeWidth="3" />
              
              {/* Left Pan */}
              <line x1="-80" y1="20" x2="-100" y2="70" stroke="rgba(15,23,42,0.2)" strokeWidth="1.5" />
              <line x1="-80" y1="20" x2="-60" y2="70" stroke="rgba(15,23,42,0.2)" strokeWidth="1.5" />
              <path d="M -115 70 C -115 85, -45 85, -45 70 Z" fill="rgba(139, 92, 246, 0.15)" stroke="#8B5CF6" strokeWidth="1.5" />

              {/* Right Pan */}
              <line x1="80" y1="20" x2="60" y2="70" stroke="rgba(15,23,42,0.2)" strokeWidth="1.5" />
              <line x1="80" y1="20" x2="100" y2="70" stroke="rgba(15,23,42,0.2)" strokeWidth="1.5" />
              <path d="M 45 70 C 45 85, 115 85, 115 70 Z" fill="rgba(139, 92, 246, 0.15)" stroke="#8B5CF6" strokeWidth="1.5" />
            </g>

            {/* Floating IP & Agreement Badges */}
            <g transform="translate(70, 210)" className="float-anim">
              <rect width="110" height="34" rx="8" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="1.5" />
              <text x="55" y="21" fill="#0F172A" fontSize="10" fontWeight="700" textAnchor="middle">PATENT & IP</text>
            </g>

            <g transform="translate(220, 210)" className="float-anim" style={{ animationDelay: '1s' }}>
              <rect width="110" height="34" rx="8" fill="#FFFFFF" stroke="#FF6B00" strokeWidth="1.5" />
              <text x="55" y="21" fill="#0F172A" fontSize="10" fontWeight="700" textAnchor="middle">CA AUDIT READY</text>
            </g>
          </svg>
        </div>
      );

    case '07':
      return (
        <div className="visual-wrapper visual-msme">
          <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="visual-svg">
            <rect width="400" height="300" fill="#FAF8F5" rx="16" />

            {/* Scheme unlock cards */}
            <g transform="translate(40, 50)" className="float-anim">
              <rect width="150" height="90" rx="10" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="1.5" />
              <text x="14" y="28" fill="#F59E0B" fontSize="11" fontWeight="800">UNNATI SCHEME</text>
              <text x="14" y="52" fill="#0F172A" fontSize="16" fontWeight="800">₹5 Cr Subsidy</text>
              <text x="14" y="70" fill="#64748B" fontSize="9">State Govt Sanction</text>
            </g>

            <g transform="translate(210, 50)" className="float-anim" style={{ animationDelay: '0.8s' }}>
              <rect width="150" height="90" rx="10" fill="#FFFFFF" stroke="#10B981" strokeWidth="1.5" />
              <text x="14" y="28" fill="#10B981" fontSize="11" fontWeight="800">PMFME SCHEME</text>
              <text x="14" y="52" fill="#0F172A" fontSize="16" fontWeight="800">35% Subsidy</text>
              <text x="14" y="70" fill="#64748B" fontSize="9">Agri & Food Processing</text>
            </g>

            <g transform="translate(125, 160)" className="float-anim" style={{ animationDelay: '1.5s' }}>
              <rect width="150" height="90" rx="10" fill="#FFFFFF" stroke="#FF6B00" strokeWidth="1.5" />
              <text x="14" y="28" fill="#FF6B00" fontSize="11" fontWeight="800">UDYAM KRANTI</text>
              <text x="14" y="52" fill="#0F172A" fontSize="16" fontWeight="800">₹50L Loan</text>
              <text x="14" y="70" fill="#64748B" fontSize="9">Interest Subvention</text>
            </g>
          </svg>
        </div>
      );

    case '08':
      return (
        <div className="visual-wrapper visual-ipo">
          <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="visual-svg">
            <rect width="400" height="300" fill="#FAF8F5" rx="16" />

            {/* Candlestick & SEBI Listing Chart */}
            <g transform="translate(60, 60)">
              {/* Grid Lines */}
              <line x1="0" y1="0" x2="280" y2="0" stroke="rgba(15,23,42,0.06)" />
              <line x1="0" y1="50" x2="280" y2="50" stroke="rgba(15,23,42,0.06)" />
              <line x1="0" y1="100" x2="280" y2="100" stroke="rgba(15,23,42,0.06)" />
              <line x1="0" y1="150" x2="280" y2="150" stroke="rgba(15,23,42,0.06)" />

              {/* Candlesticks */}
              <line x1="30" y1="120" x2="30" y2="160" stroke="#10B981" strokeWidth="2" />
              <rect x="22" y="130" width="16" height="20" fill="#10B981" rx="2" />

              <line x1="80" y1="90" x2="80" y2="140" stroke="#10B981" strokeWidth="2" />
              <rect x="72" y="100" width="16" height="30" fill="#10B981" rx="2" />

              <line x1="130" y1="70" x2="130" y2="120" stroke="#14B8A6" strokeWidth="2" />
              <rect x="122" y="80" width="16" height="30" fill="#14B8A6" rx="2" />

              <line x1="180" y1="40" x2="180" y2="90" stroke="#FF6B00" strokeWidth="2" />
              <rect x="172" y="45" width="16" height="35" fill="#FF6B00" rx="2" />

              <line x1="230" y1="10" x2="230" y2="70" stroke="#10B981" strokeWidth="2" />
              <rect x="222" y="15" width="16" height="45" fill="#10B981" rx="2" />
            </g>

            {/* SEBI / DRHP Floating Badge */}
            <g transform="translate(100, 220)" className="float-anim">
              <rect width="200" height="38" rx="8" fill="#FFFFFF" stroke="#14B8A6" strokeWidth="1.5" />
              <text x="100" y="23" fill="#14B8A6" fontSize="11" fontWeight="800" textAnchor="middle">SEBI DRHP & LISTING READY</text>
            </g>
          </svg>
        </div>
      );

    case '09':
      return (
        <div className="visual-wrapper visual-valuation">
          <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="visual-svg">
            <rect width="400" height="300" fill="#FAF8F5" rx="16" />

            {/* DCF Valuation & Cap Table Visual */}
            <g transform="translate(60, 50)">
              {/* Financial Model Bars */}
              <rect x="20" y="100" width="35" height="80" rx="4" fill="rgba(99, 102, 241, 0.3)" stroke="#6366F1" strokeWidth="1" />
              <text x="37" y="195" fill="#64748B" fontSize="9" textAnchor="middle">FY24</text>

              <rect x="75" y="80" width="35" height="100" rx="4" fill="rgba(99, 102, 241, 0.5)" stroke="#6366F1" strokeWidth="1" />
              <text x="92" y="195" fill="#64748B" fontSize="9" textAnchor="middle">FY25</text>

              <rect x="130" y="50" width="35" height="130" rx="4" fill="rgba(99, 102, 241, 0.7)" stroke="#6366F1" strokeWidth="1" />
              <text x="147" y="195" fill="#64748B" fontSize="9" textAnchor="middle">FY26</text>

              <rect x="185" y="20" width="35" height="160" rx="4" fill="#FF6B00" stroke="#FF6B00" strokeWidth="1" />
              <text x="202" y="195" fill="#FF6B00" fontSize="9" fontWeight="700" textAnchor="middle">DCF</text>
            </g>

            {/* FEMA / Income Tax Compliant Badge */}
            <g transform="translate(70, 230)">
              <rect width="260" height="32" rx="8" fill="#FFFFFF" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="1" />
              <text x="130" y="20" fill="#6366F1" fontSize="10" fontWeight="700" textAnchor="middle">FEMA & INCOME TAX COMPLIANT REPORT</text>
            </g>
          </svg>
        </div>
      );

    default:
      return null;
  }
};
