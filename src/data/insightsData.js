// Growthora Insights Dataset - 29 Unique Articles with Topic-Specific High-Res Images

export const INSIGHT_CATEGORIES = [
  'All',
  'Funding',
  'Compliance',
  'Certifications',
  'Strategy'
];

export const ALL_INSIGHTS = [
  {
    id: 'art-1',
    slug: '80-iac-tax-exemption-startup-india',
    title: '80-IAC Tax Exemption for Startups: Eligibility, Benefits & Complete Application Guide',
    category: 'Certifications',
    badge: 'CERTIFICATIONS',
    readTime: '10 min read',
    date: '3 July 2026',
    featured: true,
    description: 'Eligible startups can claim a 100% income tax exemption for any three consecutive years under Section 80-IAC — but many founders either don\'t qualify or miss the opportunity due to improper planning. Learn the eligibility criteria, application process, documentation, timelines, and how to maximize this benefit.',
    image: '/services/cert_80iac.jpg',
    overlayText: '100% Tax Exemption',
    content: {
      introduction: 'Eligible startups can claim a 100% income tax exemption for any three consecutive years under Section 80-IAC — but many founders either don\'t qualify or miss the opportunity due to improper planning.',
      sections: [
        {
          heading: '1. Eligibility & Statutory Criteria',
          body: 'To qualify under Section 80-IAC:\n• The entity must be an incorporated Private Limited Company or LLP.\n• Turnover must not exceed ₹100 Crore in any financial year since incorporation.\n• The startup must hold official DPIIT Recognition.\n• The venture must be engaged in innovation, development, or improvement of products, processes, or services with scalable business models.'
        },
        {
          heading: '2. Application Process & Documentation',
          body: 'Applications are submitted online via the Startup India portal or National Single Window System (NSWS). Key documents include proof of innovation (video demo, patent filings, or technical whitepapers), audited balance sheets, CA certificates, and incorporation records.'
        },
        {
          heading: '3. Inter-Ministerial Board (IMB) Evaluation',
          body: 'The Inter-Ministerial Board evaluates the pitch deck and innovation merit. Once approved, the startup can select any 3 consecutive assessment years within its first 10 years of operations to claim 100% profit tax deduction.'
        }
      ],
      takeaways: [
        'Ensure DPIIT Recognition is active before applying for Section 80-IAC.',
        'Demonstrate clear technological or process innovation beyond standard trading.',
        'Select your 3-year tax holiday block when operational profits peak.'
      ]
    }
  },
  {
    id: 'art-2',
    slug: 'zed-certification-msme-guide',
    title: 'ZED Certification for MSMEs: Benefits, Subsidies, Ratings & Step-by-Step Process',
    category: 'Certifications',
    badge: 'CERTIFICATIONS',
    readTime: '9 min read',
    date: '3 July 2026',
    featured: false,
    description: 'Zero Defect Zero Effect (ZED) Certification helps MSMEs improve quality, enhance operational efficiency, and gain access to government incentives, procurement opportunities, and global markets. Learn how the certification works, who should apply, and the financial assistance available.',
    image: '/services/cert_zed.jpg',
    content: {
      introduction: 'Zero Defect Zero Effect (ZED) Certification helps MSMEs improve quality, enhance operational efficiency, and gain access to government incentives, procurement opportunities, and global markets.',
      sections: [
        {
          heading: '1. ZED Rating Levels (Bronze, Silver, Gold)',
          body: 'MSMEs are evaluated across parameters including process control, safety, environmental management, quality assurance, and energy efficiency to receive Bronze, Silver, or Gold certification.'
        },
        {
          heading: '2. Financial Assistance & Subsidies',
          body: 'Micro enterprises receive an 80% subsidy, Small enterprises receive 60%, and Medium enterprises receive 50% on ZED certification costs. Additional financial support is available for technology adoption and testing equipment.'
        },
        {
          heading: '3. Strategic Business & Procurement Benefits',
          body: 'Certified MSMEs receive concessions on bank loan processing fees, priority in government procurement tenders, and financial assistance for international trade fair participation.'
        }
      ],
      takeaways: [
        'Apply via the official MSME ZED portal using your Udyam Registration.',
        'Leverage ZED certification for concessional interest rates at partner banks.',
        'Use ZED quality frameworks to reduce shop-floor defect rates.'
      ]
    }
  },
  {
    id: 'art-3',
    slug: 'duns-number-global-business-guide',
    title: 'D-U-N-S Number Explained: Why Every Global Business Needs One',
    category: 'Certifications',
    badge: 'CERTIFICATIONS',
    readTime: '8 min read',
    date: '3 July 2026',
    featured: false,
    description: 'A D-U-N-S Number is more than just a business identifier — it builds credibility with international buyers, multinational corporations, financial institutions, and government agencies. Discover why it matters and how it supports global expansion.',
    image: '/services/cert_duns.jpg',
    content: {
      introduction: 'A D-U-N-S Number is a unique nine-digit identifier assigned by Dun & Bradstreet that establishes corporate identity and financial credibility across international supply chains.',
      sections: [
        {
          heading: '1. Why International Enterprise Buyers Require D-U-N-S',
          body: 'Global OEMs, US/EU enterprise clients, and government procurement bodies use D-U-N-S numbers to perform background checks, evaluate creditworthiness, and verify corporate legitimacy.'
        },
        {
          heading: '2. Impact on Export Contracts & Cross-Border Credit',
          body: 'Having a verified D-U-N-S profile speeds up vendor onboarding with Fortune 500 companies and simplifies foreign trade credit insurance approvals.'
        }
      ],
      takeaways: [
        'Essential for Indian exporters selling to US, EU, and Gulf markets.',
        'Required for developer registration on Apple Developer and enterprise platforms.',
        'Keeps corporate credit records accurate globally.'
      ]
    }
  },
  {
    id: 'art-4',
    slug: 'iso-certification-complete-guide-2026',
    title: 'ISO Certification for Businesses: Choosing the Right Standard, Costs, Benefits & Government Support',
    category: 'Certifications',
    badge: 'CERTIFICATIONS',
    readTime: '12 min read',
    date: '3 July 2026',
    featured: false,
    description: 'From ISO 9001 and ISO 14001 to ISO 27001 and ISO 45001, selecting the right certification can improve quality, strengthen customer trust, unlock new markets, and support long-term growth. This guide explains the standards, costs, implementation process, and available support for businesses of every size.',
    image: '/services/cert_iso.jpg',
    content: {
      introduction: 'Selecting the right ISO standard improves operational consistency, builds client confidence, and unlocks qualification criteria for corporate tenders.',
      sections: [
        {
          heading: '1. Key ISO Standards Breakdown',
          body: '• ISO 9001: Quality Management Systems (universal requirement).\n• ISO 27001: Information Security Management (critical for IT/SaaS).\n• ISO 14001: Environmental Management (manufacturing & export units).\n• ISO 45001: Occupational Health & Safety.'
        },
        {
          heading: '2. Implementation & Audit Workflow',
          body: 'The audit process consists of gap analysis, documentation preparation, internal audits, and Stage 1 & Stage 2 external audits by an accredited certification body.'
        }
      ],
      takeaways: [
        'Choose NABCB-accredited certification bodies to ensure tender validity.',
        'Utilize MSME reimbursement schemes for ISO implementation costs.',
        'Conduct bi-annual internal audits to maintain compliance.'
      ]
    }
  },
  {
    id: 'art-5',
    slug: '100-crore-business-roadmap-india',
    title: 'Building a ₹100 Crore Business: The Strategic Roadmap Every Founder Should Follow',
    category: 'Strategy',
    badge: 'STRATEGY',
    readTime: '12 min read',
    date: '3 July 2026',
    featured: false,
    description: 'Growing from a startup to a ₹100 crore enterprise requires far more than increasing sales. It demands structured leadership, financial discipline, scalable systems, governance, capital planning, and strategic execution.',
    image: '/growthora_industries_hero_building.jpg',
    overlayTag: 'Bigger Businesses A Stronger India',
    content: {
      introduction: 'Growing from a startup to a ₹100 crore enterprise requires far more than increasing sales. It demands structured leadership, financial discipline, scalable systems, governance, capital planning, and strategic execution.',
      sections: [
        {
          heading: '1. Phase 1: Foundation & Contribution Margins (₹0 to ₹5 Crore)',
          body: 'Focus strictly on product-market fit, positive unit economics, clean corporate structure, and cash flow predictability before attempting aggressive marketing expansion.'
        },
        {
          heading: '2. Phase 2: Systemization & Capital Infusion (₹5 to ₹25 Crore)',
          body: 'Delegate operational decisions by hiring professional function heads (CFO, COO). Utilize non-dilutive government funding like CGTMSE credit guarantees alongside equity investment.'
        },
        {
          heading: '3. Phase 3: Scale & Institutional Governance (₹25 to ₹100 Crore)',
          body: 'Implement enterprise ERP systems, independent board oversight, internal audits, and strategic M&A to institutionalize growth.'
        }
      ],
      takeaways: [
        'Protect gross margins before scaling customer acquisition spend.',
        'Transition from founder-centric operations to process-driven departments.',
        'Maintain audit-ready books to accelerate institutional capital rounds.'
      ]
    }
  },
  {
    id: 'art-6',
    slug: 'breaking-5-crore-revenue-plateau-india',
    title: 'Why Businesses Stop Growing After ₹5 Crore Revenue — and How to Break Through',
    category: 'Strategy',
    badge: 'STRATEGY',
    readTime: '8 min read',
    date: '3 July 2026',
    featured: false,
    description: 'Many companies experience rapid early growth but struggle to move beyond ₹5 crore in annual revenue. Discover the operational, financial, and leadership bottlenecks that limit scale — and the strategic frameworks used by successful businesses to overcome them.',
    image: '/services/ops_strategy.jpg',
    content: {
      introduction: 'Many Indian enterprises hit an invisible growth wall at ₹5 crore revenue due to founder dependency, cash flow misalignment, and informal management structures.',
      sections: [
        {
          heading: '1. Identifying Bottlenecks at ₹5 Crore',
          body: 'Primary bottlenecks include: \n• Founder acting as sole bottleneck for sales and execution decisions.\n• Lack of formal working capital management and credit terms control.\n• Absence of mid-level managers capable of independent accountability.'
        },
        {
          heading: '2. Strategic Solutions for Scalable Breakthrough',
          body: 'Establish Delegation Frameworks, implement MIS dashboards, introduce performance incentives for department leaders, and structure formal sales channels.'
        }
      ],
      takeaways: [
        'Shift from informal daily firefighting to weekly KPI reviews.',
        'Hire senior talent ahead of the revenue curve.',
        'Optimize working capital cycle to prevent cash starvations during growth.'
      ]
    }
  },
  {
    id: 'art-7',
    slug: 'ceo-dashboard-25-business-metrics-india',
    title: 'The CEO Dashboard: 25 Business Metrics Every Founder Should Track Monthly',
    category: 'Strategy',
    badge: 'STRATEGY',
    readTime: '10 min read',
    date: '3 July 2026',
    featured: false,
    description: 'Revenue alone doesn\'t measure business health. From EBITDA and cash conversion cycle to customer acquisition cost, gross margin, and employee productivity, learn the key performance indicators every CEO should monitor to drive sustainable growth.',
    image: '/services/ff_chart.jpg',
    content: {
      introduction: 'Revenue alone doesn\'t measure business health. Managing a scaling business requires tracking a balanced dashboard of financial, operational, customer, and human capital metrics.',
      sections: [
        {
          heading: '1. Financial Health Indicators',
          body: '• Gross Margin % and Net EBITDA Margin.\n• Cash Conversion Cycle (Days Sales Outstanding + Days Inventory - Days Payable).\n• Burn Multiple and Runway Months.'
        },
        {
          heading: '2. Commercial & Operational KPIs',
          body: '• Customer Acquisition Cost (CAC) vs Lifetime Value (LTV).\n• Revenue per Employee and Customer Churn Rate.\n• Order Fulfillment On-Time In-Full (OTIF) %.'
        }
      ],
      takeaways: [
        'Review the CEO dashboard on the 5th of every month.',
        'Set quarterly benchmark thresholds for each key metric.',
        'Use visual MIS dashboards for real-time leadership alignment.'
      ]
    }
  },
  {
    id: 'art-8',
    slug: 'business-expansion-strategy-india',
    title: 'Business Expansion Strategy: When Should You Open a New Branch, Franchise or Subsidiary?',
    category: 'Strategy',
    badge: 'STRATEGY',
    readTime: '9 min read',
    date: '3 July 2026',
    featured: false,
    description: 'Expansion is one of the biggest investments a company makes. Learn how to determine the right time, structure, funding model, and risk management approach before entering new cities, states, or international markets.',
    image: '/industries/manufacturing.jpg',
    content: {
      introduction: 'Expansion requires evaluating market demand, local compliance regulations, tax implications (GST cross-charge/transfer pricing), and capital requirements.',
      sections: [
        {
          heading: '1. Evaluating Expansion Models',
          body: '• Company-Owned Branch: High control, high capital requirement.\n• Franchise Model: Fast expansion, shared capital, strict quality control needed.\n• Wholly Owned Subsidiary: Ideal for distinct product lines or foreign entry.'
        },
        {
          heading: '2. Financial & Legal Checkpoints',
          body: 'Ensure state-specific GST registrations, local shop & establishment filings, clear intra-company pricing, and localized supply chain logistics.'
        }
      ],
      takeaways: [
        'Validate unit economics in the pilot location before duplicating.',
        'Standardize operating SOPs to ensure consistent quality across units.',
        'Structure inter-branch transfer pricing in compliance with GST guidelines.'
      ]
    }
  },
  {
    id: 'art-9',
    slug: 'business-valuation-india-guide',
    title: 'Business Valuation Explained: What Your Company Is Really Worth',
    category: 'Strategy',
    badge: 'STRATEGY',
    readTime: '11 min read',
    date: '3 July 2026',
    featured: false,
    description: 'Business valuation isn\'t only for investors or acquisitions. Learn the financial methods, growth drivers, and strategic factors that determine your company\'s value and how to increase it before seeking funding or planning an exit.',
    image: '/services/ff_laptop.jpg',
    content: {
      introduction: 'Understanding business valuation methodologies enables founders to negotiate funding rounds, structure M&A transactions, and build long-term enterprise value.',
      sections: [
        {
          heading: '1. Standard Valuation Methodologies in India',
          body: '• Discounted Cash Flow (DCF): Based on 5-year projected free cash flows discounted by WACC.\n• Comparable Companies Multiple: Industry EBITDA or Revenue multiples.\n• Net Asset Value (NAV): Asset-heavy manufacturing or real estate businesses.'
        },
        {
          heading: '2. Key Drivers That Boost Valuation Multiples',
          body: 'Recurring revenue streams, defensible IP/patents, strong gross margins, diversified customer base, and clean corporate governance.'
        }
      ],
      takeaways: [
        'Engage Registered Valuers (IBBI) for statutory tax and FEMA compliance.',
        'Diversify revenue concentration to reduce investor risk perception.',
        'Build predictable monthly recurring revenue to command higher multiples.'
      ]
    }
  },
  {
    id: 'art-10',
    slug: 'investor-ready-business-india',
    title: 'Building an Investor-Ready Business Before You Raise Capital',
    category: 'Strategy',
    badge: 'STRATEGY',
    readTime: '8 min read',
    date: '3 July 2026',
    featured: false,
    description: 'Investors fund businesses that demonstrate financial discipline, governance, predictable growth, and operational maturity. Discover the key documents, metrics, systems, and strategies that make your company investment-ready.',
    image: '/services/ff_team.jpg',
    content: {
      introduction: 'Being investor-ready means having audited financial records, clean legal cap tables, clear IP ownership, and structured growth forecasts prepared before entering due diligence.',
      sections: [
        {
          heading: '1. The Investment Due Diligence Data Room',
          body: 'Essential contents include: \n• 3-5 years audited financial statements & GST returns.\n• Cap table with clear shareholder agreements (SHA/SSA).\n• Employment contracts, IP assignment deeds, and material vendor contracts.'
        },
        {
          heading: '2. Articulating Growth Story & Unit Economics',
          body: 'Demonstrate clear path to profitability, defensible moat, scalable customer acquisition channels, and capital deployment strategy.'
        }
      ],
      takeaways: [
        'Resolve capitalization table discrepancies before investor meetings.',
        'Ensure all intellectual property is owned by the corporate entity.',
        'Prepare realistic 5-year financial models backed by historical metrics.'
      ]
    }
  },
  {
    id: 'art-11',
    slug: '5-year-business-plan-india',
    title: 'Strategic Business Planning: Creating a 5-Year Growth Blueprint',
    category: 'Strategy',
    badge: 'STRATEGY',
    readTime: '10 min read',
    date: '3 July 2026',
    featured: false,
    description: 'A successful business isn\'t built quarter by quarter — it follows a long-term strategic roadmap. Learn how to develop a practical five-year business plan covering growth targets, expansion, funding, people, operations, and risk management.',
    image: '/industries/information_technology.jpg',
    content: {
      introduction: 'A structured 5-year strategic blueprint aligns management, capital allocation, operational roadmap, and market expansion targets.',
      sections: [
        {
          heading: '1. Pillars of a 5-Year Strategic Blueprint',
          body: '• Market Positioning & Product Vision.\n• Financial Projections & Capital Allocation Model.\n• Operational Capacity Scaling & Infrastructure Strategy.\n• Organization Design & Executive Hiring Plan.'
        },
        {
          heading: '2. Execution & Review Cadence',
          body: 'Break down 5-year goals into annual operating plans (AOP) and quarterly OKRs with explicit departmental accountability.'
        }
      ],
      takeaways: [
        'Review and update strategic assumptions annually.',
        'Cascade organizational goals into measurable team OKRs.',
        'Stress-test financial projections against economic downturn scenarios.'
      ]
    }
  },
  {
    id: 'art-12',
    slug: 'exit-strategy-business-india',
    title: 'Exit Strategy Planning: Selling Your Business at Maximum Value',
    category: 'Strategy',
    badge: 'STRATEGY',
    readTime: '9 min read',
    date: '3 July 2026',
    featured: false,
    description: 'Every successful business should be built with an exit strategy in mind. Whether planning a merger, acquisition, management buyout, family succession, or IPO, strategic preparation significantly impacts valuation and transaction success.',
    image: '/industries/fintech.jpg',
    content: {
      introduction: 'Planning an exit strategy 3 to 5 years in advance maximizes transaction valuation, streamlines regulatory approvals, and ensures seamless leadership succession.',
      sections: [
        {
          heading: '1. Exit Route Analysis',
          body: '• Strategic Trade Sale / M&A: Acquisition by larger industry player.\n• Financial Buyer / Private Equity Buyout.\n• SME IPO listing on BSE SME / NSE Emerge.\n• Family Succession or Management Buyout (MBO).'
        },
        {
          heading: '2. Pre-Exit Clean-up & Value Maximization',
          body: 'Eliminate contingent liabilities, resolve pending litigation, institutionalize customer relationships away from founders, and audit environmental/tax compliances.'
        }
      ],
      takeaways: [
        'Start exit preparation 36 months before going to market.',
        'Institutionalize client relationships to eliminate key-person risk.',
        'Maintain clean tax compliance records to avoid transaction escrows.'
      ]
    }
  },
  {
    id: 'art-13',
    slug: 'corporate-governance-competitive-advantage-india',
    title: 'Boardrooms, Not Back Offices: Why Governance Is the Next Competitive Advantage for Growing Companies',
    category: 'Strategy',
    badge: 'STRATEGY',
    readTime: '9 min read',
    date: '3 July 2026',
    featured: false,
    description: 'The strongest businesses don\'t just grow — they build governance systems that inspire investor confidence, improve decision-making, and reduce operational risk. Learn how structured governance can transform an ambitious company into an institution.',
    image: '/services/legal_ca_hero_wide.jpg',
    content: {
      introduction: 'Robust corporate governance transforms mid-sized companies into institutional enterprises that attract premium valuations and banking lines.',
      sections: [
        {
          heading: '1. Core Components of Corporate Governance',
          body: '• Board of Directors with qualified independent directors.\n• Structured Audit and Risk Management Committees.\n• Formal Internal Financial Controls (IFC) and Whistleblower Policies.'
        },
        {
          heading: '2. Governance as a Business Catalyst',
          body: 'Institutional investors and lenders offer lower interest rates and higher valuation multiples to companies demonstrating strong governance practices.'
        }
      ],
      takeaways: [
        'Appoint independent industry advisors to your advisory board early.',
        'Implement monthly board reporting and formal committee minutes.',
        'Separate ownership from operational executive management.'
      ]
    }
  },
  {
    id: 'art-14',
    slug: 'founder-to-professional-management-india',
    title: 'From Founder-Led to Professionally Managed: The Transformation That Defines Great Companies',
    category: 'Strategy',
    badge: 'STRATEGY',
    readTime: '10 min read',
    date: '3 July 2026',
    featured: false,
    description: 'Businesses often reach a point where growth depends less on the founder and more on the strength of systems, leadership, and accountability. Explore the strategic transition that enables companies to scale sustainably and endure across generations.',
    image: '/services/ops_hr.jpg',
    overlayTag: 'People Process Progress',
    content: {
      introduction: 'Transitioning from founder-driven execution to a professionally managed enterprise is the single most critical evolution for scaling beyond early success.',
      sections: [
        {
          heading: '1. When to Initiate Professionalization',
          body: 'Signs include: revenue growth slowing due to founder bottleneck, increasing operational complexity, and entering institutional fundraising rounds.'
        },
        {
          heading: '2. The 4-Step Professionalization Framework',
          body: '1. Define clear C-suite roles (CFO, COO, CMO).\n2. Establish decision-making authority matrices (Delegation of Authority).\n3. Implement enterprise ERP & performance management systems.\n4. Evolve founder role to Strategic Board Chair / CEO.'
        }
      ],
      takeaways: [
        'Empower function heads with genuine budget and hiring autonomy.',
        'Shift founder focus to long-term strategy, capital, and culture.',
        'Align executive compensation with long-term enterprise benchmarks.'
      ]
    }
  },
  {
    id: 'art-15',
    slug: 'private-limited-vs-llp-vs-opc-india',
    title: 'Private Limited vs LLP vs OPC: Which Business Structure to Choose in India (2026)',
    category: 'Compliance',
    badge: 'COMPLIANCE',
    readTime: '8 min read',
    date: '15 May 2026',
    featured: false,
    description: 'Three legal structures dominate Indian startup and MSME registrations — Private Limited, LLP, and OPC. Each has different compliance costs, tax implications, and investor readiness. A direct comparison for founders making the decision.',
    image: '/services/card_reg_pvt_ltd.jpg',
    content: {
      introduction: 'Choosing the right legal entity structure balances annual compliance costs, tax optimization, limited liability protection, and fundraising capability.',
      sections: [
        {
          heading: '1. Comparative Analysis Matrix',
          body: '• Private Limited: Required for equity fundraising, ESOP pools, high credibility; compliance costs are higher.\n• Limited Liability Partnership (LLP): Lower statutory compliance, no dividend distribution tax friction; suitable for service firms & bootstrapped businesses.\n• One Person Company (OPC): Single founder control with limited liability; converts to Pvt Ltd upon reaching turnover thresholds.'
        },
        {
          heading: '2. Statutory Compliance & Tax Considerations',
          body: 'Pvt Ltd requires mandatory annual audit, ROC filings (AOC-4, MGT-7), and minimum 4 board meetings per year. LLPs require Form 8 and Form 11 filings.'
        }
      ],
      takeaways: [
        'Choose Private Limited if equity venture funding is planned.',
        'Choose LLP for partners offering professional services with lower compliance expenses.',
        'Select OPC for single-owner ventures desiring corporate entity status.'
      ]
    }
  },
  {
    id: 'art-16',
    slug: 'pmfme-scheme-food-processing-subsidy',
    title: 'PMFME Scheme: the 35% Capital Subsidy Built for Food-Processing Units',
    category: 'Funding',
    badge: 'FUNDING',
    readTime: '8 min read',
    date: '6 May 2026',
    featured: false,
    description: 'PMFME gives micro food-processing units a 35% credit-linked capital subsidy, seed capital for SHGs, and branding support. Here is who qualifies and how to build a fundable application.',
    image: '/services/msme_pmfme.jpg',
    content: {
      introduction: 'The Pradhan Mantri Formalisation of Micro food processing Enterprises (PMFME) scheme offers micro food-processing enterprises financial, technical, and business support.',
      sections: [
        {
          heading: '1. Subsidy Architecture & Financial Benefits',
          body: '• 35% credit-linked capital subsidy up to maximum of ₹10 Lakh per unit for individual micro enterprises.\n• 50% subsidy for branding and packaging support under One District One Product (ODOP).\n• Seed capital of ₹40,000 per SHG member for working capital and small tools.'
        },
        {
          heading: '2. Eligibility & Application Workflow',
          body: 'Existing micro food processing units, FPOs, Self Help Groups, and Producer Cooperatives engaged in food processing qualify. Applications are processed through the online PMFME portal.'
        }
      ],
      takeaways: [
        'Ensure alignment with One District One Product (ODOP) categories for maximum priority.',
        'Submit bankable Detailed Project Reports (DPR) detailing capacity and machinery.',
        'Combine PMFME with interest subvention schemes where eligible.'
      ]
    }
  },
  {
    id: 'art-17',
    slug: 'mudra-loan-vs-cgtmse-2026',
    title: 'Mudra Loan vs CGTMSE: Which Government Scheme Should You Choose in 2026?',
    category: 'Funding',
    badge: 'FUNDING',
    readTime: '6 min read',
    date: '28 April 2026',
    featured: false,
    description: 'Both schemes offer collateral-free lending — but they serve different business sizes, loan amounts, and purposes. A direct comparison to help you choose the right scheme before you approach a bank.',
    image: '/services/ff_loan_wide.jpg',
    content: {
      introduction: 'India’s two primary collateral-free credit schemes—MUDRA and CGTMSE—cater to distinct borrowing requirements, loan limits, and business maturity stages.',
      sections: [
        {
          heading: '1. Key Differences: MUDRA vs CGTMSE',
          body: '• MUDRA Loan: Focuses on micro enterprises with credit limits up to ₹10 Lakh (Shishu up to ₹50k, Kishore ₹50k-5L, Tarun ₹5L-10L). No collateral, low processing fees.\n• CGTMSE Scheme: Guarantees collateral-free credit up to ₹5 Crore for MSMEs across manufacturing and service sectors, covering term loans and working capital.'
        },
        {
          heading: '2. Underwriting Criteria & Bank Approval Process',
          body: 'MUDRA relies on basic business income proof and shop establishment; CGTMSE requires bankable project reports, GST returns, and credit score evaluations.'
        }
      ],
      takeaways: [
        'Opt for MUDRA for micro working capital requirements under ₹10 Lakh.',
        'Apply for CGTMSE for expansion capital, plant machinery, or credit up to ₹5 Crore.',
        'Prepare clean GST returns and audited financial statements for CGTMSE bank sanctions.'
      ]
    }
  },
  {
    id: 'art-18',
    slug: 'iso-certification-msme-guide',
    title: 'ISO Certification for MSMEs: Which Standard, What It Costs, and How to Fund It',
    category: 'Certifications',
    badge: 'CERTIFICATIONS',
    readTime: '8 min read',
    date: '12 April 2026',
    featured: false,
    description: 'ISO certification unlocks tenders, buyer confidence, and scheme eligibility — but only the right standard, obtained the right way, delivers value. Here is how MSMEs choose, budget, and get certified.',
    image: '/services/cert_lab_wide.jpg',
    content: {
      introduction: 'ISO certification equips MSMEs with globally recognized quality credentials required for corporate vendor registration and public procurement tenders.',
      sections: [
        {
          heading: '1. Selecting the Right Standard & Budgeting',
          body: 'ISO 9001 (Quality) is standard for all sectors; ISO 22000 for food units; ISO 27001 for IT services. Implementation costs range from ₹25,000 to ₹1.5 Lakh depending on scope and unit size.'
        },
        {
          heading: '2. Government Subsidies & Reimbursement',
          body: 'Central and state MSME schemes reimburse up to 75% of ISO certification expenses under technological quality upgrade programs.'
        }
      ],
      takeaways: [
        'Engage accredited certification bodies recognized by NABCB.',
        'Claim MSME reimbursement scheme subsidies post-certification.',
        'Use ISO standards to streamline operational SOPs.'
      ]
    }
  },
  {
    id: 'art-19',
    slug: 'dpiit-startup-india-recognition-2026',
    title: 'How to Get DPIIT Startup India Recognition in 2026 (Step-by-Step)',
    category: 'Compliance',
    badge: 'COMPLIANCE',
    readTime: '7 min read',
    date: '10 April 2026',
    featured: false,
    description: 'DPIIT recognition unlocks tax exemptions, fast-track IPR filing, government tender access, and eligibility for the Startup India Seed Fund. Here\'s the exact process, documents, and timeline.',
    image: '/services/cert_startup_india.jpg',
    overlayTag: 'Ideas Innovation Impact',
    content: {
      introduction: 'DPIIT Recognition grants startups access to official incentives including tax holidays, self-certification under labor laws, fast-tracked patent filing, and public procurement waivers.',
      sections: [
        {
          heading: '1. Key Privileges Unlocked by DPIIT Certificate',
          body: '• Section 80-IAC 3-year income tax holiday eligibility.\n• Section 56(2)(viib) Angel Tax exemption.\n• 80% rebate on patent filings & 50% rebate on trademark filings.\n• Exemption from EMD (Earnest Money Deposit) and prior experience criteria in government tenders.'
        },
        {
          heading: '2. Application Requirements & Documentation',
          body: 'Apply online on Startup India portal with Certificate of Incorporation/Registration, pitch deck detailing innovation, website/app link, and CA certificate.'
        }
      ],
      takeaways: [
        'Ensure startup entity is under 10 years from incorporation date.',
        'Highlight product/service innovation and job creation potential clearly.',
        'Use DPIIT certificate for fast-track trademark and patent applications.'
      ]
    }
  },
  {
    id: 'art-20',
    slug: 'pmegp-scheme-2026-guide',
    title: 'PMEGP Scheme 2026: How to Apply, Eligibility, and Subsidy You Actually Get',
    category: 'Funding',
    badge: 'FUNDING',
    readTime: '8 min read',
    date: '25 March 2026',
    featured: false,
    description: 'The Prime Minister\'s Employment Generation Programme offers 15-35% capital subsidy for new micro-enterprises — but the application process, bank linkage, and margin money requirement trip up most first-time applicants. A complete guide.',
    image: '/services/msme_pmegp.jpg',
    content: {
      introduction: 'The Prime Minister’s Employment Generation Programme (PMEGP) is a credit-linked subsidy scheme for establishing new micro-enterprises in manufacturing and service sectors.',
      sections: [
        {
          heading: '1. Project Cost Limits & Margin Money Subsidies',
          body: '• Maximum Project Cost: ₹50 Lakh for Manufacturing; ₹20 Lakh for Service sector.\n• Subsidy Rates: 15% to 25% for General category; 25% to 35% for Special categories (SC/ST/OBC/Minorities/Women/Ex-servicemen/Rural areas).\n• Beneficiary Contribution: 5% to 10% of project cost.'
        },
        {
          heading: '2. Application & Nodal Agency Routing',
          body: 'Applications are submitted on KVIC online portal and routed via KVIC, KVIB, or District Industries Centre (DIC) for EDP training and bank loan sanction.'
        }
      ],
      takeaways: [
        'Applicable only for setting up NEW micro-enterprises.',
        'Mandatory EDP (Entrepreneurship Development Programme) training required before subsidy release.',
        'Margin money is kept in a 3-year lock-in term deposit by the bank.'
      ]
    }
  },
  {
    id: 'art-21',
    slug: 'gem-registration-msme-2026',
    title: 'GeM Registration in 2026: How MSMEs Win Government Orders',
    category: 'Compliance',
    badge: 'COMPLIANCE',
    readTime: '7 min read',
    date: '20 March 2026',
    featured: false,
    description: 'The Government e-Marketplace is one of the largest public procurement channels in the world. Here is how MSMEs register as sellers, unlock purchase preference, and avoid the errors that get listings blocked.',
    image: '/services/cert_gem.jpg',
    content: {
      introduction: 'The Government e-Marketplace (GeM) provides Indian MSMEs direct access to multi-billion-dollar central and state government department procurement tenders.',
      sections: [
        {
          heading: '1. Benefits for Registered MSME Vendors',
          body: '• 25% mandatory annual public procurement reservation for MSMEs.\n• Exemption from Earnest Money Deposit (EMD) for Udyam-registered MSMEs.\n• Direct purchase provisions for orders up to ₹25,000 and L1 bidding mechanisms for larger contracts.'
        },
        {
          heading: '2. Registration & OEM Verification Process',
          body: 'Complete primary registration using Aadhaar/PAN, link GST & bank accounts, complete OEM/Reseller brand approval, and upload product catalog parameters.'
        }
      ],
      takeaways: [
        'Keep Udyam registration updated to claim tender fee exemptions.',
        'Upload clear product specifications and competitive pricing on GeM catalog.',
        'Maintain high vendor rating to win direct purchase orders.'
      ]
    }
  },
  {
    id: 'art-22',
    slug: 'msme-business-loan-10-lakh',
    title: 'How to Secure a ₹10 Lakh MSME Business Loan in 2026',
    category: 'Funding',
    badge: 'FUNDING',
    readTime: '7 min read',
    date: '10 March 2026',
    featured: false,
    description: 'With AI-driven digital lending and expanded government backing, securing up to ₹10 lakh is now faster and more transparent than ever. A guide to eligibility, top schemes, and the fastest approval paths.',
    image: '/services/ff_meeting.jpg',
    content: {
      introduction: 'Securing collateral-free business loans up to ₹10 Lakh for MSMEs has been streamlined through digital lending portals, MUDRA, and PSBLoansIn59Minutes.',
      sections: [
        {
          heading: '1. Leading Loan Options for ₹10 Lakh Capital',
          body: '• MUDRA Tarun Scheme: Collateral-free loans from ₹5 Lakh to ₹10 Lakh.\n• CGTMSE-backed Bank Loans: Subsidized credit coverage.\n• Fintech / Digital Business Loans: Fast approval based on GST banking cash flows.'
        },
        {
          heading: '2. Underwriting Criteria & Document Checklist',
          body: 'Lenders evaluate 12-month GST returns, 6-month bank statements, CIBIL score (700+), PAN, and Udyam certificate.'
        }
      ],
      takeaways: [
        'Maintain clean GST filing and banking transaction history.',
        'Use PSBLoansIn59Minutes for fast in-principle bank approvals.',
        'Avoid multiple simultaneous loan applications to protect credit score.'
      ]
    }
  },
  {
    id: 'art-23',
    slug: 'msme-subsidy-schemes-india-2026',
    title: 'Every MSME Subsidy in India (2026): The Schemes Founders Keep Missing',
    category: 'Funding',
    badge: 'FUNDING',
    readTime: '10 min read',
    date: '2 March 2026',
    featured: false,
    description: 'A practical map of the central and state subsidies Indian MSMEs qualify for in 2026 — capital subsidies, interest subvention, credit guarantee, and state incentives — and how to actually claim them.',
    image: '/industries/clean_energy.jpg',
    content: {
      introduction: 'Indian MSMEs miss out on crores in government financial incentives annually due to lack of awareness regarding central and state subsidy schemes.',
      sections: [
        {
          heading: '1. Major Subsidies Overview',
          body: '• Capital Investment Subsidies (RIPS, State Industrial Policies: 15%-30% of eligible fixed capital).\n• Interest Subvention Schemes: 3% to 6% interest rebates on plant machinery term loans.\n• Electricity Duty Waivers & Stamp Duty Exemptions.'
        },
        {
          heading: '2. Step-by-Step Claim Strategy',
          body: 'File preliminary registration prior to purchasing plant equipment. Submit formal subsidy applications within specified timelines post commercial production commencement.'
        }
      ],
      takeaways: [
        'Check state industrial policy incentives before choosing plant location.',
        'File preliminary subsidy intent applications BEFORE commercial production.',
        'Work with specialized advisors to prevent paperwork rejections.'
      ]
    }
  },
  {
    id: 'art-24',
    slug: 'gst-compliance-msme-2026',
    title: 'GST Compliance for MSMEs in 2026: Avoid Penalties, Maximize Input Credits',
    category: 'Compliance',
    badge: 'COMPLIANCE',
    readTime: '6 min read',
    date: '20 February 2026',
    featured: false,
    description: 'With the GST Council\'s push toward auto-reconciliation in 2026, MSMEs that stay compliant gain a competitive edge. A practical guide to ITC, filing calendars, and the mistakes that cost lakhs.',
    image: '/services/card_reg_gst.jpg',
    content: {
      introduction: 'Strict GST compliance and automated Input Tax Credit (ITC) reconciliation prevent cash flow blockages and tax audit penalties.',
      sections: [
        {
          heading: '1. Critical GST Compliance Checkpoints',
          body: '• Monthly GSTR-1 & GSTR-3B reconciliation against GSTR-2B.\n• Mandatory E-Invoicing for eligible turnover thresholds.\n• E-Way bill generation and timely annual return filing (GSTR-9/9C).'
        },
        {
          heading: '2. Avoiding Common Costly Errors',
          body: 'Failing to reconcile vendor ITC leads to Section 16(4) credit disallowances and interest penalties at 18% per annum.'
        }
      ],
      takeaways: [
        'Perform automated 2B reconciliation before filing monthly returns.',
        'Block payments to non-compliant GST vendors who fail to upload GSTR-1.',
        'Ensure e-invoices are generated in real-time upon dispatch.'
      ]
    }
  },
  {
    id: 'art-25',
    slug: 'stand-up-india-scheme-2026',
    title: 'Stand-Up India in 2026: The Collateral-Light Loan Built for SC, ST, and Women Founders',
    category: 'Funding',
    badge: 'FUNDING',
    readTime: '8 min read',
    date: '8 February 2026',
    featured: false,
    description: 'Stand-Up India funds greenfield enterprises for SC, ST, and women founders with composite loans from Rs 10 lakh to Rs 1 crore. Here is who qualifies, how the 85% funding works, and the mistakes that stall sanctions.',
    image: '/services/msme_naiff.jpg',
    content: {
      introduction: 'The Stand-Up India scheme facilitates bank loans between ₹10 Lakh and ₹1 Crore to Scheduled Caste (SC), Scheduled Tribe (ST), and Women borrowers for setting up greenfield enterprises.',
      sections: [
        {
          heading: '1. Scheme Features & Loan Structure',
          body: '• Loan Amount: Composite loan (term loan + working capital) between ₹10 Lakh and ₹1 Crore.\n• Coverage: Up to 85% of total project cost.\n• Target Borrowers: SC/ST and/or Woman entrepreneurs (51% shareholding in non-individual entities).'
        },
        {
          heading: '2. Margin Money & Handholding Support',
          body: 'Beneficiaries bring minimum 10% margin money, with balance covered by state subsidy schemes. Handholding support is provided via Stand-Up India portal.'
        }
      ],
      takeaways: [
        'Applicable exclusively for GREENFIELD (first-time) ventures in manufacturing, services, or trading.',
        'Ensure woman founder holds at least 51% equity in corporate entities.',
        'Utilize Credit Guarantee Scheme for Stand-Up India (CGFSI) for collateral waiver.'
      ]
    }
  },
  {
    id: 'art-26',
    slug: 'udyam-registration-2026',
    title: 'Udyam Registration in 2026: Your Gateway to MSME Benefits',
    category: 'Compliance',
    badge: 'COMPLIANCE',
    readTime: '5 min read',
    date: '5 February 2026',
    featured: false,
    description: 'The single most impactful step an Indian business owner can take to formally enter the MSME ecosystem — free, paperless, and Aadhaar-based. Here\'s what registration actually unlocks.',
    image: '/services/msme_electricity_duty.jpg',
    content: {
      introduction: 'Udyam Registration is the official government registration system for Micro, Small, and Medium Enterprises in India, replacing Udyog Aadhaar Memorandum.',
      sections: [
        {
          heading: '1. Vital Benefits Unlocked by Udyam Certificate',
          body: '• Access to CGTMSE collateral-free bank loans.\n• Priority Sector Lending (PSL) classification at commercial banks.\n• Protection against delayed payments under MSMED Act (Samadhaan Portal).\n• Waivers on patent/trademark filing fees and GeM tender exemptions.'
        },
        {
          heading: '2. Registration Process',
          body: 'Free, paperless, online registration based on Aadhaar, PAN, and GSTIN on the official Udyam portal.'
        }
      ],
      takeaways: [
        'Udyam Registration is 100% free; beware of unauthorized portals.',
        'Ensure investment and turnover values align with ITR data automatically fetched by portal.',
        'Essential for claiming government interest subventions and bank loan waivers.'
      ]
    }
  },
  {
    id: 'art-27',
    slug: 'msme-financial-model-template',
    title: 'What a Fundable MSME Project Report Actually Looks Like (With the Model Lenders Accept)',
    category: 'Strategy',
    badge: 'STRATEGY',
    readTime: '9 min read',
    date: '25 January 2026',
    featured: false,
    description: 'The non-negotiables: a five-year P&L tied to a realistic capacity ramp, a sensitivity table the bank can stress-test, and the schedules — DSCR, working-capital cycle, debt-equity — every credit committee opens first.',
    image: '/services/branding_agency_wide.jpg',
    content: {
      introduction: 'A fundable project report is the key document bank credit committees evaluate to determine loan sanction, debt-service coverage, and repayment feasibility.',
      sections: [
        {
          heading: '1. Essential Financial Statements & Ratios',
          body: '• Debt Service Coverage Ratio (DSCR): Minimum 1.5x average coverage required.\n• Working Capital Assessment (Tandon Committee / Nayak Committee benchmarks).\n• 5-Year Projected Balance Sheet, Profit & Loss, and Cash Flow Statement.'
        },
        {
          heading: '2. Technical & Commercial Feasibility',
          body: 'Include plant machinery technical quotes, raw material sourcing agreements, target customer demand proof, and break-even analysis.'
        }
      ],
      takeaways: [
        'Ensure DSCR remains above 1.5x across all 5 projected years.',
        'Match project report figures with historical GST and ITR returns.',
        'Include sensitivity analysis showing debt serviceability under lower capacity utilization.'
      ]
    }
  },
  {
    id: 'art-28',
    slug: 'udyam-registration-step-by-step',
    title: 'Udyam Registration, Step by Step — and the Classification That Quietly Changes Your Scheme Access',
    category: 'Compliance',
    badge: 'COMPLIANCE',
    readTime: '6 min read',
    date: '18 January 2026',
    featured: false,
    description: 'Why the micro/small/medium threshold matters far more than founders realize: it determines which schemes, which subsidies, and which lender desks even look at your file.',
    image: '/services/card_reg_msme.jpg',
    content: {
      introduction: 'Understanding MSME composite classification thresholds (Investment in Plant & Machinery + Annual Turnover) determines eligibility for specific state and central subsidy schemes.',
      sections: [
        {
          heading: '1. Composite Classification Thresholds (2026)',
          body: '• Micro: Investment ≤ ₹1 Crore AND Turnover ≤ ₹5 Crore.\n• Small: Investment ≤ ₹10 Crore AND Turnover ≤ ₹50 Crore.\n• Medium: Investment ≤ ₹50 Crore AND Turnover ≤ ₹250 Crore.'
        },
        {
          heading: '2. Impact on Scheme Access',
          body: 'Exceeding thresholds automatically reclassifies your enterprise, impacting subsidy percentage rates (e.g., ZED, PMEGP, PMFME subsidies differ by micro/small status).'
        }
      ],
      takeaways: [
        'Calculations exclude export turnover from total turnover evaluations.',
        'Investment values are auto-linked to Written Down Value (WDV) from Income Tax returns.',
        'Monitor turnover growth to anticipate changes in scheme subsidy caps.'
      ]
    }
  },
  {
    id: 'art-29',
    slug: 'cgtmse-eligibility-2026',
    title: 'CGTMSE in 2026: Who Actually Qualifies, and the Four Mistakes That Kill Applications',
    category: 'Funding',
    badge: 'FUNDING',
    readTime: '7 min read',
    date: '10 January 2026',
    featured: false,
    description: 'A field-tested walkthrough of the credit-guarantee scheme — sector eligibility, the working-capital vs. term-loan distinction, and what bankers look for in your project report.',
    image: '/services/msme_ahidf.jpg',
    content: {
      introduction: 'The Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE) provides collateral-free credit guarantees to banks and NBFCs for lending to MSMEs.',
      sections: [
        {
          heading: '1. Eligible Borrowers & Coverage Limits',
          body: 'New and existing Micro and Small Enterprises in manufacturing, service, and retail trade qualify for credit guarantees up to ₹5 Crore per borrower.'
        },
        {
          heading: '2. Four Common Application Pitfalls',
          body: '1. Presenting unviable or inflated cash flow projections.\n2. Poor CIBIL score (below 700) of primary promoters.\n3. Requesting credit for ineligible activity sectors.\n4. Delaying guarantee fee payment post bank sanction.'
        }
      ],
      takeaways: [
        'CGTMSE fee is paid annually based on outstanding loan balance.',
        'Both Term Loans and Working Capital Limits can be covered under CGTMSE.',
        'Work with experienced banking advisors to present bankable credit proposals.'
      ]
    }
  }
];

// Default featured article
export const FEATURED_INSIGHT = ALL_INSIGHTS[0];

// Default 3 latest insights using unique articles from the dataset
export const LATEST_INSIGHTS = [ALL_INSIGHTS[1], ALL_INSIGHTS[14], ALL_INSIGHTS[15]];

// Full list of 29 articles for main grid
export const GRID_INSIGHTS = ALL_INSIGHTS;

// Stats bar metrics
export const INSIGHTS_STATS = [
  {
    number: '29',
    label: 'Articles',
    subtext: 'In-depth advisory & guides'
  },
  {
    number: '4',
    label: 'Key Domains',
    subtext: 'Strategy, Funding, Compliance & Certifications'
  },
  {
    number: 'Built for',
    label: 'Founders',
    subtext: 'Real insights. Measurable outcomes.'
  }
];
