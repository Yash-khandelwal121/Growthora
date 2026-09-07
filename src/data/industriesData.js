export const INDUSTRIES_CATEGORIES = [
  'All',
  'Agriculture',
  'Manufacturing',
  'Trader',
  'Healthcare',
  'Education',
  'Information Technology',
  'Textile',
  'Construction',
  'Logistics',
  'Electronics',
  'Food & Beverages',
  'Handicrafts',
  'Fintech',
  'Deep-Tech & AI',
  'Clean Energy & ClimateTech',
  'MedTech & Biotech',
  'Social Impact & NGOs',
  'Defence & Aerospace',
  'Media, Gaming & Animation',
  'Dairy & Animal Husbandry'
];

export const INDUSTRIES_DATA = [
  {
    id: 'ind-01',
    slug: 'agriculture',
    name: 'Agriculture',
    category: 'Agriculture',
    subtitle: 'Agri-business & allied sectors',
    description: 'Farming, post-harvest processing, agri-machinery, and rural enterprise advisory.',
    iconName: 'Wheat',
    image: '/industries/agriculture.jpg',
    featured: false,
    schemesCount: '18+',
    fundingAccess: 'AIF, NABARD, PM-KISAN, NABARD Subsidy',
    metrics: {
      gdpGva: '~18%',
      gdpNote: '',
      gdpFull: '~18%',
      growth: '~4%',
      growthNote: '',
      growthFull: '~4%',
      workforce: '~43%',
      workforceNote: '(PLFS 2025)',
      workforceFull: '~43% (PLFS 2025)'
    },
    highlights: [
      'NABARD & AIF term loan advisory',
      'PM-KISAN & agri-infra capital subsidies',
      'FPO registration & governance setup',
      'Cold-chain & food processing expansion'
    ]
  },
  {
    id: 'ind-02',
    slug: 'manufacturing',
    name: 'Manufacturing',
    category: 'Manufacturing',
    subtitle: 'Industrial & production units',
    description: 'From compliance and registrations to funding, PLI schemes, and factory expansion.',
    iconName: 'Factory',
    image: '/industries/manufacturing.jpg',
    featured: true,
    featuredNumber: '01',
    featuredDesc: 'From compliance and registrations to funding and expansion.',
    bgImage: '/services/card_reg_company_wide.jpg',
    schemesCount: '35+',
    fundingAccess: 'PMEGP, ZED Certification, CGTMSE Loan',
    metrics: {
      gdpGva: '~14–17%',
      gdpNote: '',
      gdpFull: '~14–17%',
      growth: '~6–7%',
      growthNote: '',
      growthFull: '~6–7%',
      workforce: '~12.1%',
      workforceNote: '',
      workforceFull: '~12.1%'
    },
    growthAreas: ['Funding', 'Compliance', 'Expansion'],
    growthPoints: [
      'CGTMSE collateral-free credit up to ₹5 Cr',
      'ZED certification & state capital subsidies',
      'Turnkey factory expansion & PLI mapping'
    ],
    highlights: [
      'CGTMSE collateral-free credit up to ₹5 Cr',
      'ZED certification & state capital subsidies',
      'Turnkey factory expansion & PLI mapping',
      'Pollution clearance & ISO audit compliance'
    ]
  },
  {
    id: 'ind-03',
    slug: 'trader',
    name: 'Trader',
    category: 'Trader',
    subtitle: 'Wholesale & retail trade',
    description: 'GST compliance, import-export licenses, MSME merchant benefits, and working capital.',
    iconName: 'Store',
    image: '/industries/trader.jpg',
    featured: false,
    schemesCount: '12+',
    fundingAccess: 'MSME Merchant Loans, IEC Code, Trade Credit',
    metrics: {
      gdpGva: '~11%',
      gdpNote: '(part of services)',
      gdpFull: '~11% (part of services)',
      growth: '~7–8%',
      growthNote: '',
      growthFull: '~7–8%',
      workforce: '~9–10%',
      workforceNote: '',
      workforceFull: '~9–10%'
    },
    highlights: [
      'MSME merchant working capital credit',
      'GST & Import-Export Code (IEC) licensing',
      'Trade credit & bill discounting support',
      'Customs & warehouse compliance setup'
    ]
  },
  {
    id: 'ind-04',
    slug: 'healthcare',
    name: 'Healthcare',
    category: 'Healthcare',
    subtitle: 'Hospitals, pharma & wellness',
    description: 'Advisory built around regulation, NABH compliance, pharma licensing, and expansion funding.',
    iconName: 'Stethoscope',
    image: '/industries/healthcare.jpg',
    featured: true,
    featuredNumber: '03',
    featuredDesc: 'Advisory built around regulation, funding and sustainable growth.',
    bgImage: '/services/cert_lab_wide.jpg',
    schemesCount: '15+',
    fundingAccess: 'Ayushman Bharat Mapped, Healthcare Equipment Loans',
    metrics: {
      gdpGva: '~2.1–2.5%',
      gdpNote: '(est.)',
      gdpFull: '~2.1–2.5% (est.)',
      growth: '~10–12%',
      growthNote: '',
      growthFull: '~10–12%',
      workforce: '~2.5–3%',
      workforceNote: '',
      workforceFull: '~2.5–3%'
    },
    growthAreas: ['Compliance', 'Funding', 'Scale'],
    growthPoints: [
      'NABH & CDSCO regulatory compliance',
      'Medical equipment & infrastructure financing',
      'Hospital chain expansion & M&A advisory'
    ],
    highlights: [
      'NABH & CDSCO regulatory approvals',
      'Medical equipment & infrastructure loans',
      'Hospital chain expansion & M&A advisory',
      'Ayushman Bharat scheme empanelement'
    ]
  },
  {
    id: 'ind-05',
    slug: 'education',
    name: 'Education',
    category: 'Education',
    subtitle: 'Schools, colleges & edtech',
    description: 'Trust/society registrations, FCRA, CSR funding access, and EdTech startup structuring.',
    iconName: 'GraduationCap',
    image: '/industries/education.jpg',
    featured: false,
    schemesCount: '10+',
    fundingAccess: 'Section 8 Trust Advisory, Skill India Grants',
    metrics: {
      gdpGva: '~3–4%',
      gdpNote: '(est.)',
      gdpFull: '~3–4% (est.)',
      growth: '~8–9%',
      growthNote: '',
      growthFull: '~8–9%',
      workforce: '~2–3%',
      workforceNote: '',
      workforceFull: '~2–3%'
    },
    highlights: [
      'Section 8 Trust & Society formation',
      '12A, 80G & FCRA tax-exempt status',
      'EdTech IP & software structuring',
      'Skill India & CSR grant matchmaking'
    ]
  },
  {
    id: 'ind-06',
    slug: 'information-technology',
    name: 'Information Technology',
    category: 'Information Technology',
    subtitle: 'IT companies & SaaS',
    description: 'Helping technology businesses structure, scale, protect IP, and stay tax-compliant.',
    iconName: 'Laptop',
    image: '/industries/information_technology.jpg',
    featured: true,
    featuredNumber: '02',
    featuredDesc: 'Helping technology businesses structure, scale and stay compliant.',
    bgImage: '/services/ff_ai_challenge.png',
    schemesCount: '25+',
    fundingAccess: 'Startup India 80-IAC, Software Export STPI, Angel Tax',
    metrics: {
      gdpGva: '~7.5%',
      gdpNote: '(direct + indirect)',
      gdpFull: '~7.5% (direct + indirect)',
      growth: '~8–9%',
      growthNote: '',
      growthFull: '~8–9%',
      workforce: '~1% direct',
      workforceNote: '(~5.4M jobs)',
      workforceFull: '~1% direct (~5.4M jobs)'
    },
    growthAreas: ['Innovation', 'Funding', 'Scale'],
    growthPoints: [
      'Startup India 80-IAC tax exemption & IP setup',
      'STPI software export compliance & GST refund',
      'R&D grants & angel investment structuring'
    ],
    highlights: [
      'Startup India 80-IAC tax exemption',
      'STPI software export & GST refund',
      'R&D grants & angel tax exemption',
      'SaaS IP protection & global structuring'
    ]
  },
  {
    id: 'ind-07',
    slug: 'textile',
    name: 'Textile',
    category: 'Textile',
    subtitle: 'Apparel, garments & fabrics',
    description: 'TUFS scheme subsidies, export incentive guidance, cluster development, and apparel manufacturing.',
    iconName: 'Scissors',
    image: '/industries/textile.jpg',
    featured: false,
    schemesCount: '14+',
    fundingAccess: 'ATUFS Textile Subsidy, EPCG Export License',
    metrics: {
      gdpGva: '~2.3%',
      gdpNote: '',
      gdpFull: '~2.3%',
      growth: '~4–5%',
      growthNote: '',
      growthFull: '~4–5%',
      workforce: '~4.5%',
      workforceNote: '(~45M workers)',
      workforceFull: '~4.5% (~45M workers)'
    },
    highlights: [
      'ATUFS capital investment subsidy',
      'EPCG export license & drawback claim',
      'Garment cluster infrastructure grants',
      'Pollution & textile ISO audit support'
    ]
  },
  {
    id: 'ind-08',
    slug: 'construction',
    name: 'Construction',
    category: 'Construction',
    subtitle: 'Real estate & infrastructure',
    description: 'RERA compliance, joint venture structures, project funding access, and environmental clearances.',
    iconName: 'Building2',
    image: '/industries/construction.jpg',
    featured: false,
    schemesCount: '11+',
    fundingAccess: 'RERA Advisory, Infrastructure Project Credit',
    metrics: {
      gdpGva: '~9%',
      gdpNote: '',
      gdpFull: '~9%',
      growth: '~8–9%',
      growthNote: '',
      growthFull: '~8–9%',
      workforce: '~12.0%',
      workforceNote: '',
      workforceFull: '~12.0%'
    },
    highlights: [
      'RERA project registration & compliance',
      'Joint venture credit structuring',
      'Environmental & municipal clearances',
      'Infrastructure project debt syndication'
    ]
  },
  {
    id: 'ind-09',
    slug: 'logistics',
    name: 'Logistics',
    category: 'Logistics',
    subtitle: 'Supply chain & transportation',
    description: 'Fleet financing assistance, warehouse compliance, logistics park subsidies, and customs clearance.',
    iconName: 'Truck',
    image: '/industries/logistics.jpg',
    featured: false,
    schemesCount: '16+',
    fundingAccess: 'National Logistics Policy Subsidies, Vehicle Loans',
    metrics: {
      gdpGva: '~14.4%',
      gdpNote: '(of GDP as cost, not GVA head)',
      gdpFull: '~14.4% (of GDP as cost, not GVA head)',
      growth: '~8–10%',
      growthNote: '',
      growthFull: '~8–10%',
      workforce: '~4–5%',
      workforceNote: '(~22M)',
      workforceFull: '~4–5% (~22M)'
    },
    highlights: [
      'National Logistics Policy subsidies',
      'Fleet financing & commercial credit',
      'Warehouse park compliance & zoning',
      'Customs & bonded warehouse licensing'
    ]
  },
  {
    id: 'ind-10',
    slug: 'electronics',
    name: 'Electronics',
    category: 'Electronics',
    subtitle: 'Components & consumer goods',
    description: 'SPECS scheme support, BIS certification, electronic component assembly, and hardware grants.',
    iconName: 'Cpu',
    image: '/industries/electronics.jpg',
    featured: false,
    schemesCount: '20+',
    fundingAccess: 'SPECS Electronics Grant, EMC 2.0 Subsidy',
    metrics: {
      gdpGva: '~2.5–3%',
      gdpNote: '(est.)',
      gdpFull: '~2.5–3% (est.)',
      growth: '~15–17%',
      growthNote: '(PLI-driven)',
      growthFull: '~15–17% (PLI-driven)',
      workforce: '~1–1.5%',
      workforceNote: '',
      workforceFull: '~1–1.5%'
    },
    highlights: [
      'SPECS component manufacturing grant',
      'EMC 2.0 cluster scheme benefits',
      'BIS & WPC equipment certification',
      'Hardware startup seed capital access'
    ]
  },
  {
    id: 'ind-11',
    slug: 'food-beverages',
    name: 'Food & Beverages',
    category: 'Food & Beverages',
    subtitle: 'FMCG, food processing',
    description: 'PMFME scheme assistance, FSSAI central licensing, cold chain subsidies, and organic certification.',
    iconName: 'Utensils',
    image: '/industries/food_beverages.jpg',
    featured: false,
    schemesCount: '22+',
    fundingAccess: 'PMFME 35% Capital Subsidy, MOFPI Grants',
    metrics: {
      gdpGva: '~2–3%',
      gdpNote: '(of mfg GVA)',
      gdpFull: '~2–3% of manufacturing GVA',
      growth: '~7–8%',
      growthNote: '',
      growthFull: '~7–8%',
      workforce: '~8–9%',
      workforceNote: '(agro-processing incl.)',
      workforceFull: '~8–9% (agro-processing incl.)'
    },
    highlights: [
      'PMFME 35% capital subsidy scheme',
      'FSSAI Central licensing & audit',
      'MOFPI mega food park grants',
      'Organic certification & APEDA export'
    ]
  },
  {
    id: 'ind-12',
    slug: 'handicrafts',
    name: 'Handicrafts',
    category: 'Handicrafts',
    subtitle: 'Artisans & traditional crafts',
    description: 'Artisan cluster grants, GI registration, handicraft export incentives, and Khadi MSME benefits.',
    iconName: 'Palette',
    image: '/industries/handicrafts.jpg',
    featured: false,
    schemesCount: '14+',
    fundingAccess: 'Ambedkar Hastshilp Vikas Yojana, GI Tagging',
    metrics: {
      gdpGva: '<0.5%',
      gdpNote: '(~$4–5B exports)',
      gdpFull: '<0.5% (but ~$4–5B exports)',
      growth: '~3–5%',
      growthNote: '',
      growthFull: '~3–5%',
      workforce: '~7M',
      workforceNote: 'artisans (informal-heavy)',
      workforceFull: '~7M artisans (informal-heavy)'
    },
    highlights: [
      'Ambedkar Hastshilp Vikas Yojana grants',
      'Geographical Indication (GI) tagging',
      'Artisan cluster infrastructure support',
      'Khadi MSME export & marketing aid'
    ]
  },
  {
    id: 'ind-13',
    slug: 'fintech',
    name: 'Fintech',
    category: 'Fintech',
    subtitle: 'Financial services & digital finance',
    description: 'RBI regulatory sandbox guidance, NBFC setup, payment gateway compliance, and fintech structuring.',
    iconName: 'TrendingUp',
    image: '/industries/fintech.jpg',
    featured: false,
    schemesCount: '12+',
    fundingAccess: 'GIFT City IFSCA Regulations, NBFC Registration',
    metrics: {
      gdpGva: 'N/A',
      gdpNote: '(~$110–120B market)',
      gdpFull: 'not a separate head; ~$110–120B market',
      growth: '~15–20%',
      growthNote: '',
      growthFull: '~15–20%',
      workforce: '~1.5M',
      workforceNote: '(industry est.)',
      workforceFull: '~1.5M (industry est.)'
    },
    highlights: [
      'RBI regulatory sandbox guidance',
      'IFSCA GIFT City setup advisory',
      'NBFC registration & compliance',
      'Payment gateway & PPI licensing'
    ]
  },
  {
    id: 'ind-14',
    slug: 'deep-tech-ai',
    name: 'Deep-Tech & AI',
    category: 'Deep-Tech & AI',
    subtitle: 'Emerging tech & innovation',
    description: 'Patent filing support, R&D tax exemptions, BIRAC/MeitY deep-tech seed funds, and AI governance.',
    iconName: 'Brain',
    image: '/industries/deep_tech_ai.jpg',
    featured: false,
    schemesCount: '19+',
    fundingAccess: 'MeitY SAMRIDH Scheme, TIDE 2.0 Grants',
    metrics: {
      gdpGva: 'N/A',
      gdpNote: '(~$5–6B market)',
      gdpFull: 'not separately tracked; ~$5–6B market',
      growth: '~25–30%',
      growthNote: '',
      growthFull: '~25–30%',
      workforce: '<0.5M',
      workforceNote: '(fast-growing)',
      workforceFull: '<0.5M (fast-growing)'
    },
    highlights: [
      'MeitY SAMRIDH & TIDE 2.0 seed grants',
      'Patent & AI IP filing support',
      'R&D tax deduction advisory',
      'BIRAC & deep-tech venture funds'
    ]
  },
  {
    id: 'ind-15',
    slug: 'clean-energy-climatetech',
    name: 'Clean Energy & ClimateTech',
    category: 'Clean Energy & ClimateTech',
    subtitle: 'Renewable & sustainable solutions',
    description: 'Solar power incentives, EV manufacturing subsidies, carbon credit compliance, and ESG advisory.',
    iconName: 'Leaf',
    image: '/industries/clean_energy.jpg',
    featured: false,
    schemesCount: '24+',
    fundingAccess: 'IREDA Concessional Loans, FAME II Subsidies',
    metrics: {
      gdpGva: '~1–1.5%',
      gdpNote: '(rising)',
      gdpFull: '~1–1.5% (rising)',
      growth: '~15–18%',
      growthNote: '',
      growthFull: '~15–18%',
      workforce: '~1M+',
      workforceNote: '',
      workforceFull: '~1M+'
    },
    highlights: [
      'IREDA concessional solar project loans',
      'FAME II EV manufacturing subsidy',
      'Carbon credit & ESG audit advisory',
      'Grid connectivity & DISCOM NOC'
    ]
  },
  {
    id: 'ind-16',
    slug: 'medtech-biotech',
    name: 'MedTech & Biotech',
    category: 'MedTech & Biotech',
    subtitle: 'Healthcare innovation',
    description: 'CDSCO medical device approvals, BIRAC BIG grants, clinical trial compliance, and biotech park incentives.',
    iconName: 'Dna',
    image: '/industries/medtech_biotech.jpg',
    featured: false,
    schemesCount: '17+',
    fundingAccess: 'BIRAC BIG ₹50 Lakh Grant, CDSCO Approval',
    metrics: {
      gdpGva: '~1.3%',
      gdpNote: '',
      gdpFull: '~1.3%',
      growth: '~12–15%',
      growthNote: '',
      growthFull: '~12–15%',
      workforce: '~1–1.5M',
      workforceNote: '',
      workforceFull: '~1–1.5M'
    },
    highlights: [
      'BIRAC BIG ₹50 Lakh seed grant',
      'CDSCO medical device approvals',
      'Clinical trial regulatory compliance',
      'Biotech park land & capital grants'
    ]
  },
  {
    id: 'ind-17',
    slug: 'social-impact-ngos',
    name: 'Social Impact & NGOs',
    category: 'Social Impact & NGOs',
    subtitle: 'Non-profits & development',
    description: 'Section 8 formation, 12A & 80G tax exemptions, FCRA registration, and CSR grant matchmaking.',
    iconName: 'Users',
    image: '/industries/social_impact.jpg',
    featured: false,
    schemesCount: '13+',
    fundingAccess: '12A & 80G Approval, Corporate CSR Funds',
    metrics: {
      gdpGva: 'N/A',
      gdpNote: '(not in GDP accounting)',
      gdpFull: 'not in GDP accounting',
      growth: 'N/A',
      growthNote: '',
      growthFull: 'N/A',
      workforce: '~3M+',
      workforceNote: '(informal, est.)',
      workforceFull: '~3M+ (informal, est.)'
    },
    highlights: [
      'Section 8 NGO / NPO formation',
      '12A & 80G tax exemption approval',
      'FCRA foreign funding registration',
      'Corporate CSR grant matchmaking'
    ]
  },
  {
    id: 'ind-18',
    slug: 'defence-aerospace',
    name: 'Defence & Aerospace',
    category: 'Defence & Aerospace',
    subtitle: 'Strategic & advanced manufacturing',
    description: 'Industrial defense licenses, iDEX innovation grants, defense corridor incentives, and offset advisory.',
    iconName: 'Shield',
    image: '/industries/defence_aerospace.jpg',
    featured: false,
    schemesCount: '15+',
    fundingAccess: 'iDEX ₹1.5 Cr Grant, Defense Corridor Incentives',
    metrics: {
      gdpGva: '~0.5–0.7%',
      gdpNote: '(rising)',
      gdpFull: '~0.5–0.7% (rising)',
      growth: '~10–12%',
      growthNote: '',
      growthFull: '~10–12%',
      workforce: '~0.3–0.4M',
      workforceNote: '(formal)',
      workforceFull: '~0.3–0.4M (formal)'
    },
    highlights: [
      'iDEX ₹1.5 Cr innovation grant',
      'Industrial defence production license',
      'Defence Corridor capital subsidies',
      'Offset obligation compliance advisory'
    ]
  },
  {
    id: 'ind-19',
    slug: 'media-gaming-animation',
    name: 'Media, Gaming & Animation',
    category: 'Media, Gaming & Animation',
    subtitle: 'Content & creative industries',
    description: 'AVGC policy incentives, copyright & IP protection, gaming license compliance, and film production grants.',
    iconName: 'Gamepad2',
    image: '/industries/media_gaming.jpg',
    featured: false,
    schemesCount: '10+',
    fundingAccess: 'State AVGC Policy Subsidies, IP Advisory',
    metrics: {
      gdpGva: '~1–1.2%',
      gdpNote: '',
      gdpFull: '~1–1.2%',
      growth: '~10–11%',
      growthNote: '',
      growthFull: '~10–11%',
      workforce: '~2–2.5M',
      workforceNote: '',
      workforceFull: '~2–2.5M'
    },
    highlights: [
      'State AVGC policy capital subsidies',
      'Game copyright & IP protection',
      'Broadcasting & OTT regulatory audit',
      'Film & animation production grants'
    ]
  },
  {
    id: 'ind-20',
    slug: 'dairy-animal-husbandry',
    name: 'Dairy & Animal Husbandry',
    category: 'Dairy & Animal Husbandry',
    subtitle: 'Livestock & dairy businesses',
    description: 'AHIDF scheme 3% interest subvention, dairy processing capital subsidies, and FPO formation.',
    iconName: 'Flame',
    image: '/industries/dairy_husbandry.jpg',
    featured: false,
    schemesCount: '16+',
    fundingAccess: 'AHIDF 33% Capital Subsidy, NABARD Dairy Loans',
    metrics: {
      gdpGva: '~5%',
      gdpNote: '(largest ag sub-sector)',
      gdpFull: '~5% (largest ag sub-sector)',
      growth: '~6%',
      growthNote: '',
      growthFull: '~6%',
      workforce: '~80M+',
      workforceNote: 'households',
      workforceFull: '~80M+ households'
    },
    highlights: [
      'AHIDF 3% interest subvention scheme',
      'Dairy processing capital subsidy',
      'Livestock insurance & credit access',
      'Milk chilling unit setup grants'
    ]
  }
];
