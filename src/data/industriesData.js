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
    highlights: [
      'AHIDF 3% interest subvention scheme',
      'Dairy processing capital subsidy',
      'Livestock insurance & credit access',
      'Milk chilling unit setup grants'
    ]
  }
];
