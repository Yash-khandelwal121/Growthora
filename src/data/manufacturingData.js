export const MANUFACTURING_PAGE_DATA = {
  hero: {
    breadcrumb: [
      { label: 'Home', link: '/' },
      { label: 'Industries', link: '/industries' },
      { label: 'Manufacturing', link: '/industries/manufacturing' }
    ],
    eyebrow: 'MANUFACTURING',
    title: 'Manufacturing - funded, compliant, and growing.',
    description: 'We work with manufacturing businesses across India — from first-time MSME registrations to ₹5 Cr collateral-free term loans and the growth engines that compound after.',
    image: '/industries/manufacturing.jpg',
    floatingStats: [
      { number: '₹5 Cr', label: 'Collateral-Free Credit' },
      { number: '35%+', label: 'Government Subsidy Eligibility' }
    ]
  },

  overview: {
    heading: 'How the work runs for manufacturing.',
    paragraphs: [
      "MSMEs make up 63.4 million units and drive roughly 35% of India's manufacturing GVA and 45% of exports. Machinery upgrades, working-capital cycles, and export documentation are where most manufacturing clients need structured support alongside CGTMSE-backed credit.",
      "We map central and state schemes against your stage, turnover, and promoter category, then build the project report and run the applications to sanction. After funding, we sequence registration, compliance, and growth — so the work compounds rather than fragments across vendors."
    ],
    stats: [
      { value: '63.4M+', label: 'MSME manufacturing units' },
      { value: '~35%', label: 'Share of manufacturing GVA' },
      { value: '~45%', label: 'Share of India\'s exports' }
    ],
    visualImage: '/services/card_reg_company_wide.jpg'
  },

  registrations: {
    heading: 'Registrations manufacturing businesses usually need.',
    items: [
      {
        id: 'mfg-reg-1',
        title: 'Udyam / MSME registration',
        description: 'Primary registration for government schemes, subsidies, CGTMSE credit, and priority sector benefits.',
        icon: 'Award'
      },
      {
        id: 'mfg-reg-2',
        title: 'Factory license',
        description: 'State factory license required under the Factories Act for operational manufacturing and industrial production units.',
        icon: 'Factory'
      },
      {
        id: 'mfg-reg-3',
        title: 'BIS / ISI certification',
        description: 'Quality and safety product certification required for standard industrial goods and domestic supply compliance.',
        icon: 'ShieldCheck'
      },
      {
        id: 'mfg-reg-4',
        title: 'ISO 9001 quality certification',
        description: 'International standard for quality management systems required for corporate, OEM, and B2B vendor approval.',
        icon: 'CheckCircle2'
      },
      {
        id: 'mfg-reg-5',
        title: 'IEC code for exporters',
        description: 'Import Export Code required for shipping manufactured products globally and claiming export subsidies.',
        icon: 'Building2'
      }
    ]
  },

  painPoints: {
    heading: 'Where manufacturing businesses usually get stuck.',
    items: [
      {
        id: 'mfg-pp-1',
        title: 'Machinery financing needs collateral most micro units can\'t post',
        description: 'Traditional bank loans demand heavy immovable property collateral for machinery purchases, stalling plant upgrades and capacity expansion.'
      },
      {
        id: 'mfg-pp-2',
        title: 'Working capital gaps between production and payment cycles',
        description: 'Extended credit terms from buyers create severe cash flow bottlenecks between raw material procurement and final invoice realization.'
      },
      {
        id: 'mfg-pp-3',
        title: 'Compliance with state pollution and labour clearances before scale-up',
        description: 'Navigating State Pollution Control Board (SPCB) consent to establish/operate and complex labour clearances halts factory scaling.'
      }
    ]
  },

  storytellerBanner: {
    image: '/services/ff_loan_wide.jpg',
    heading: 'Industrial Scale Require Synchronized Advisory',
    subtext: 'From capital subsidies (PMEGP, PLI, State RIPS) to CGTMSE collateral-free credit, we align your factory infrastructure with government incentives.'
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
        description: 'End-to-end IPO support across all 5 P\'s - Planning, Preparation, Process, Public Offering, and Post IPO Closure.',
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
    heading: 'Schemes that fit manufacturing.',
    allSchemesUrl: 'https://growthora.co.in/govtschemes',
    items: [
      {
        id: 'mfg-scheme-1',
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
        id: 'mfg-scheme-2',
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
        id: 'mfg-scheme-3',
        title: 'Seed Fund (HR)',
        type: 'Grant',
        provider: 'Haryana Govt',
        authority: 'Government Scheme run by Haryana Govt.',
        coverage: 'Open to applicants in Haryana.',
        amount: 'Seed Funding: Non Refundable Grant up to INR 10 Lakh',
        route: '/services/finance-funding'
      },
      {
        id: 'mfg-scheme-4',
        title: 'Seed Fund (BR)',
        type: 'Grant',
        provider: 'Department Of Industries, Govt. Of Bihar',
        authority: 'Government Scheme run by Department Of Industries, Govt. Of Bihar.',
        coverage: 'Open to applicants in Bihar.',
        amount: 'Seed Funding: Up to INR 10 Lakhs per Start-up as an interest-free loan for 10 years.',
        route: '/services/finance-funding'
      },
      {
        id: 'mfg-scheme-5',
        title: 'Nidhi Prayas',
        type: 'Grant',
        provider: 'Department of Science & Technology (DST)',
        authority: 'Government Authorised business incubator Scheme run by Department of Science & Technology (DST).',
        coverage: 'Open pan-India.',
        amount: 'Grant-in-Aid: Up to 10 lakhs product development grant for 12 months',
        route: '/services/finance-funding'
      },
      {
        id: 'mfg-scheme-6',
        title: 'SRUJAN - 2025',
        type: 'Grant',
        provider: 'Gujarat Livelihood Promotion Company (GLPC)',
        authority: 'Government Authorised business incubator Scheme run by Gujarat Livelihood Promotion Company (GLPC).',
        coverage: 'Open to applicants in Gujarat based funding opportunity.',
        amount: 'Non-refundable Grant of ₹2.5 to 10 Lakh',
        route: '/services/finance-funding'
      },
      {
        id: 'mfg-scheme-7',
        title: 'Innovation Grant',
        type: 'Grant',
        provider: 'Govt of Kerala, Kerala Technology Startup Policy',
        authority: 'Government Scheme run by Govt of Kerala.',
        coverage: 'Open pan-India.',
        amount: '1. Idea Grant: Grant of up to INR 3 lakhs.',
        route: '/services/finance-funding'
      },
      {
        id: 'mfg-scheme-8',
        title: 'Women Startup Program (NSRCEL)',
        type: 'Grant',
        provider: 'IIM Bangalore',
        authority: 'Grant + Incubation run by IIM Bangalore.',
        coverage: 'Open to applicants in Women-led startup.',
        amount: '₹10L - ₹30L support + Incubation',
        route: '/services/finance-funding'
      },
      {
        id: 'mfg-scheme-9',
        title: 'herSTART Accelerator',
        type: 'Grant',
        provider: 'Gujarat Startup Mission',
        authority: 'Grant run by Gujarat Startup Mission.',
        coverage: 'Open to applicants in Women Startup.',
        amount: 'Up to ₹20L support',
        route: '/services/finance-funding'
      }
    ]
  },

  fundingCta: {
    heading: 'Find out what your manufacturing business qualifies for.',
    supportingCopy: 'Book a call with a senior manufacturing funding and compliance advisor. Zero obligation — just a clear, structured roadmap for plant expansion, capital subsidy, and credit.',
    trustPoints: [
      '30-Min Strategy Session',
      'PMEGP & PLI Eligibility Audit',
      'Zero Commitment'
    ],
    confidentialNotice: '100% Confidential. We never share your manufacturing data.'
  }
};
