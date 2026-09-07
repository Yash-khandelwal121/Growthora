export const AGRICULTURE_PAGE_DATA = {
  hero: {
    breadcrumb: [
      { label: 'Home', link: '/' },
      { label: 'Industries', link: '/industries' },
      { label: 'Agriculture', link: '/industries/agriculture' }
    ],
    title: 'Agriculture - funded, compliant, and growing.',
    description: 'We work with agriculture businesses across India - from first-time MSME registrations to ₹5 Cr collateral-free term loans and the growth engines that compound after.'
  },

  overview: {
    heading: 'How the work runs for agriculture.',
    paragraphs: [
      "Agriculture, forestry and fishing add roughly 16% to India's GDP and employ 42% of the workforce, but most farms and agri-enterprises still can't access formal credit or cold-chain infrastructure. We work with FPOs, agri-tech ventures, and processing units to pair RKVY-RAFTAAR-style grants with term loans for machinery, storage, and irrigation.",
      "We map central and state schemes against your stage, turnover, and promoter category, then build the project report and run the applications to sanction. After funding, we sequence registration, compliance, and growth - so the work compounds rather than fragments across vendors."
    ],
    stats: [
      { value: '~16%', label: 'Contribution to GDP' },
      { value: '4.4% CAGR', label: '5-yr avg growth' },
      { value: '42%', label: 'Workforce employed' }
    ]
  },

  registrations: {
    heading: 'Registrations agriculture businesses usually need.',
    items: [
      {
        id: 'reg-1',
        title: 'Udyam / MSME registration',
        description: 'Primary identity for government subsidies, priority sector lending, and lower interest rates.',
        icon: 'Award'
      },
      {
        id: 'reg-2',
        title: 'FSSAI license (for processing)',
        description: 'Mandatory food safety licensing for agri-processing, packaging, and food distribution.',
        icon: 'ShieldCheck'
      },
      {
        id: 'reg-3',
        title: 'Agmark / GI certification',
        description: 'Quality certification and Geographical Indication tags for specialized agricultural produce.',
        icon: 'CheckCircle2'
      },
      {
        id: 'reg-4',
        title: 'Farmer Producer Organisation (FPO) registration',
        description: 'Legal structure for farmer collectives to access institutional credit, machinery, and market linkages.',
        icon: 'Users'
      },
      {
        id: 'reg-5',
        title: 'Soil health & organic certification',
        description: 'NPOP and PGS-India certifications required for organic produce branding and export.',
        icon: 'Leaf'
      }
    ]
  },

  painPoints: {
    heading: 'Where agriculture businesses usually get stuck.',
    items: [
      {
        id: 'pp-1',
        title: 'Fragmented land holdings limit collateral for term loans',
        description: 'Traditional banks demand immovable property collateral, leaving land-light agri-tech startups and smallholders without credit access.'
      },
      {
        id: 'pp-2',
        title: 'Post-harvest losses from missing cold-chain and storage',
        description: 'Lack of capital for pack-houses, reefer trucks, and solar cold stores causes up to 30% perishable crop loss.'
      },
      {
        id: 'pp-3',
        title: 'Seasonal cash flow makes standard EMI structures a poor fit',
        description: 'Fixed monthly repayments do not match crop harvest cycles, leading to artificial default risk during sowing periods.'
      }
    ]
  },

  departments: {
    heading: 'Departments engaged.',
    items: [
      {
        id: 'dept-reg',
        name: 'Registration',
        description: 'Every registration your business needs to be legitimate, fundable, and audit-ready.',
        route: '/services/registration'
      },
      {
        id: 'dept-fin',
        name: 'Finance',
        description: 'Grants, debt, equity, and MSME loans - mapped to your eligibility and secured end to end.',
        route: '/services/finance-funding'
      },
      {
        id: 'dept-cert',
        name: 'Certifications',
        description: 'ISO, FSSAI, ZED, and Startup Scheme - quality credentials obtained and maintained.',
        route: '/services/certifications'
      },
      {
        id: 'dept-brand',
        name: 'Branding',
        description: 'Logo, website, SEO, and social - a brand that earns trust and gets found.',
        route: '/services/branding'
      },
      {
        id: 'dept-ops',
        name: 'Operations',
        description: 'HR, CRM, and sales systems set up for the scale you are building toward.',
        route: '/services/operations'
      },
      {
        id: 'dept-legal',
        name: 'Legal & CA',
        description: 'Agreements, IP, compliance, and audits handled by qualified professionals.',
        route: '/services/legal-ca'
      },
      {
        id: 'dept-msme',
        name: 'MSME Benefits',
        description: 'Every loan subsidy, capital grant, and state incentive your MSME qualifies for - identified and secured.',
        route: '/services/msme-benefits'
      },
      {
        id: 'dept-ipo',
        name: 'IPO',
        description: "End-to-end IPO support across all 5 P's - Planning, Preparation, Process, Public Offering, and Post IPO Closure.",
        route: '/services/ipo'
      },
      {
        id: 'dept-val',
        name: 'Valuation & Financial Modeling',
        description: 'Independent valuations and financial models for fundraising, compliance, M&A, and accounting.',
        route: '/services/valuation'
      }
    ]
  },

  schemes: {
    heading: 'Schemes that fit agriculture.',
    allSchemesUrl: 'https://growthora.co.in/govtschemes',
    items: [
      {
        id: 'scheme-1',
        title: 'Young Innovators Grant',
        type: 'Grant',
        provider: 'Zerodha',
        authority: 'Private Investor scheme run by Zerodha.',
        coverage: 'Open pan-India.',
        amount: 'Up To INR 20 Lakh Grant',
        externalUrl: 'https://growthora.co.in/govtschemes/young-innovators-grant',
        route: '/services/finance-funding'
      },
      {
        id: 'scheme-2',
        title: 'MSME Design',
        type: 'Grant',
        provider: 'Ministry of Micro, Small & Medium Enterprises, Govt of India',
        authority: 'Government Scheme run by Ministry of Micro, Small & Medium Enterprises, Govt of India.',
        coverage: 'Open pan-India.',
        amount: 'MSME, 75% (Micro) and 60% (Small & Medium) of the total project cost',
        externalUrl: 'https://growthora.co.in/govtschemes/msme-design',
        route: '/services/msme-benefits'
      },
      {
        id: 'scheme-3',
        title: 'TIDE 2.0',
        type: 'Grant',
        provider: 'MeitY: Ministry of Electronics and Information Technology',
        authority: 'Government Scheme run by MeitY: Ministry of Electronics and Information Technology.',
        coverage: 'Open pan-India.',
        amount: 'Non-refundable Grant up to INR 7 Lakh',
        externalUrl: 'https://growthora.co.in/govtschemes/tide-20',
        route: '/services/finance-funding'
      },
      {
        id: 'scheme-4',
        title: 'Funding Support (Guj)',
        type: 'Grant',
        provider: 'GUIITAR Council',
        authority: 'Government Authorized Incubator Scheme run by GUIITAR Council.',
        coverage: 'Open to applicants in Gujarat Only.',
        amount: 'Grant support: Up to ₹30 lakh',
        externalUrl: 'https://growthora.co.in/govtschemes/funding-support-guj',
        route: '/services/finance-funding'
      },
      {
        id: 'scheme-5',
        title: 'Seed Fund (HR)',
        type: 'Grant',
        provider: 'Haryana Govt',
        authority: 'Government Scheme run by Haryana Govt.',
        coverage: 'Open to applicants in Haryana.',
        amount: 'Seed Funding: Non Refundable Grant up to INR 10 Lakh',
        route: '/services/finance-funding'
      },
      {
        id: 'scheme-6',
        title: 'Seed Fund (BR)',
        type: 'Grant',
        provider: 'Department Of Industries, Govt. Of Bihar',
        authority: 'Government Scheme run by Department Of Industries, Govt. Of Bihar.',
        coverage: 'Open to applicants in Bihar.',
        amount: 'Seed Funding: Up to INR 10 Lakhs per Start-up as an interest-free loan for 10 years.',
        route: '/services/finance-funding'
      },
      {
        id: 'scheme-7',
        title: 'IVP (TN)',
        type: 'Grant',
        provider: 'Government of Tamil Nadu',
        authority: 'Government Funding run by Government of Tamil Nadu.',
        coverage: 'Open to applicants in Tamil Nadu.',
        amount: 'Voucher A: Grant upto Rs. 2 lakhs for converting the Idea into a working Prototype',
        route: '/services/finance-funding/grants/ivp-tn'
      },
      {
        id: 'scheme-8',
        title: 'Nidhi Prayas',
        type: 'Grant',
        provider: 'Department of Science & Technology (DST)',
        authority: 'Government Authorised business incubator Scheme run by Department of Science & Technology (DST).',
        coverage: 'Open pan-India.',
        amount: 'Grant-in-Aid: Up to 10 lakhs product development grant for 12 months',
        route: '/services/finance-funding'
      },
      {
        id: 'scheme-9',
        title: 'SRUJAN - 2025',
        type: 'Grant',
        provider: 'Gujarat Livelihood Promotion Company (GLPC)',
        authority: 'Government Authorised business incubator Scheme run by Gujarat Livelihood Promotion Company (GLPC).',
        coverage: 'Open to applicants in Gujarat based funding opportunity.',
        amount: 'Non-refundable Grant of ₹2.5 to 10 Lakh',
        route: '/services/finance-funding'
      }
    ]
  },

  fundingCta: {
    heading: 'Find out what your business qualifies for.',
    supportingCopy: 'Book a call with a senior government funding advisor. No obligation, zero jargon — just a clear, actionable roadmap for your business.',
    trustPoints: [
      '30-Min Strategy Session',
      'Personalized Scheme Roadmap',
      'Zero Commitment'
    ],
    confidentialNotice: '100% Confidential. We never share your business data.'
  }
};
