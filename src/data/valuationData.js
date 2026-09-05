// Valuation Practice Data for Growthora Advisory

export const VALUATION_CATEGORY_DATA = {
  title: "Valuation",
  subtitle: "Know what your business is truly worth — with a structured, defensible valuation built for decisions, fundraising, compliance and growth.",
  
  servicesList: [
    { id: "01", slug: "business-valuation", title: "Business Valuation" },
    { id: "02", slug: "startup-valuation", title: "Startup Valuation" },
    { id: "03", slug: "pre-post-money-valuation", title: "Pre-Money & Post-Money Valuation" },
    { id: "04", slug: "fundraising-valuation", title: "Fundraising Valuation" },
    { id: "05", slug: "esop-valuation", title: "ESOP Valuation" },
    { id: "06", slug: "share-equity-valuation", title: "Share / Equity Valuation" },
    { id: "07", slug: "ma-valuation", title: "Merger & Acquisition Valuation" },
    { id: "08", slug: "financial-reporting-valuation", title: "Financial Reporting Valuation" },
    { id: "09", slug: "compliance-valuation", title: "Valuation for Compliance" }
  ],

  valuationApproaches: [
    {
      id: "01",
      name: "INCOME APPROACH",
      desc: "DCF and future cash-flow based valuation for businesses with predictable growth and earnings."
    },
    {
      id: "02",
      name: "MARKET APPROACH",
      desc: "Comparable-company and market-based analysis to understand how similar businesses are valued."
    },
    {
      id: "03",
      name: "ASSET APPROACH",
      desc: "Asset and liability based valuation where the underlying business assets are the primary value drivers."
    }
  ],

  whereValuationHelps: [
    "Fundraising & Investor Negotiation",
    "Mergers & Acquisitions",
    "ESOP & Share Allocation",
    "Business Sale / Exit Planning",
    "Financial Reporting",
    "Regulatory & Compliance Requirements"
  ],

  valuationProcess: [
    { stage: "01", title: "DISCOVER", desc: "Understand the business, industry, financials and purpose of valuation." },
    { stage: "02", title: "ANALYZE", desc: "Review financial performance, assets, liabilities, market position and growth potential." },
    { stage: "03", title: "MODEL", desc: "Apply appropriate valuation methodologies and build the financial analysis." },
    { stage: "04", title: "REVIEW", desc: "Cross-check assumptions, market comparables and valuation results." },
    { stage: "05", title: "DELIVER", desc: "Provide a clear valuation conclusion and professional report." }
  ],

  faqs: [
    {
      q: "Which valuation methodology is right for my company?",
      a: "It depends on your stage, business model, and purpose. Revenue-generating operating companies typically use DCF (Income Approach) or EV/EBITDA multiples (Market Approach). Early-stage startups often use Berkus, Scorecard, or First Chicago methods, while asset-heavy companies rely on NAV (Asset Approach)."
    },
    {
      q: "Who issues statutory valuation certificates under Income Tax & FEMA in India?",
      a: "Under Section 56(2)(xviib) of the Income Tax Act and FEMA regulations, valuation certificates for share issuance and cross-border transfers must be issued by a SEBI Registered Category-I Merchant Banker or an IBBI Registered Valuer."
    },
    {
      q: "How long does it take to complete a defensible valuation report?",
      a: "A standard valuation report takes 1 to 3 weeks after receiving complete financial history, cap table details, and 5-year projections. Express compliance reports can be expedited within 3 to 5 business days."
    },
    {
      q: "Why is a defensible valuation report crucial during investor fundraising?",
      a: "Investors scrutinize growth assumptions, WACC, terminal values, and peer multiples. A well-structured, defensible report prevents aggressive down-rounds, protects founder equity, and speeds up deal due diligence."
    },
    {
      q: "Can Growthora prepare valuation reports for ESOP pool creation & exercise?",
      a: "Yes. We calculate Fair Market Value (FMV) per share under Rule 11UA of the Income Tax Rules for ESOP grant pricing, perquisite tax calculation, and accounting disclosure under Ind AS 102."
    }
  ]
};

export const VALUATION_SERVICES_DATA = {
  "business-valuation": {
    id: "01",
    slug: "business-valuation",
    title: "Business Valuation",
    subtitle: "What Is Your Business Really Worth?",
    description: "Whether you are raising capital, planning an exit, issuing shares, preparing for an IPO or simply understanding your company's financial position, we help you arrive at a clear and well-supported valuation.",
    
    approaches: [
      { id: "01", name: "INCOME APPROACH", desc: "DCF and future cash-flow based valuation for businesses with predictable growth and earnings." },
      { id: "02", name: "MARKET APPROACH", desc: "Comparable-company and market-based analysis to understand how similar businesses are valued." },
      { id: "03", name: "ASSET APPROACH", desc: "Asset and liability based valuation where the underlying business assets are the primary value drivers." }
    ],

    applications: [
      "Fundraising & Investor Negotiation",
      "Mergers & Acquisitions",
      "ESOP & Share Allocation",
      "Business Sale / Exit Planning",
      "Financial Reporting",
      "Regulatory & Compliance Requirements"
    ],

    deliverables: [
      "Comprehensive Independent Valuation Report",
      "Integrated 5-Year DCF Financial Model (.xlsx)",
      "Peer Multiple & Benchmark Analysis (EV/EBITDA, P/E)",
      "WACC, Beta & Cost of Capital Derivation Sheet",
      "Management Presentation Deck for Investors & Board"
    ],

    timeline: "2 to 3 Weeks"
  },

  "startup-valuation": {
    id: "02",
    slug: "startup-valuation",
    title: "Startup Valuation",
    subtitle: "Data-backed valuation models built for pre-revenue & high-growth tech startups.",
    description: "We combine Scorecard, Berkus, Risk-Factor Summation, and First Chicago methods to establish a defensible valuation for early-stage and seed-round startups.",

    approaches: [
      { id: "01", name: "SCORECARD & BERKUS", desc: "Qualitative weighting based on team, TAM, product readiness, execution traction & market risk." },
      { id: "02", name: "FIRST CHICAGO METHOD", desc: "Multi-scenario DCF accounting for High Growth, Base Case, and Downside liquidation outcomes." },
      { id: "03", name: "ARR / GMV MULTIPLES", desc: "Sector-benchmarked revenue and gross margin multiples based on recent VC funding transactions." }
    ],

    applications: [
      "Pre-Seed & Seed Angel Round Valuation",
      "Incubator & Accelerator Pitch Presentations",
      "Section 56(2)(xviib) Safe Harbor Valuation",
      "Cap Table Dilution Modeling",
      "Investor Term Sheet Negotiation Support"
    ],

    deliverables: [
      "Startup Valuation Certificate & Report",
      "Multi-Scenario Financial Projections Model",
      "Scorecard Metric Assessment Breakdown",
      "Recent VC Deal Multiples Comparison Data",
      "Founder Dilution & Cap Table Simulator"
    ],

    timeline: "1 to 2 Weeks"
  },

  "pre-post-money-valuation": {
    id: "03",
    slug: "pre-post-money-valuation",
    title: "Pre-Money & Post-Money Valuation",
    subtitle: "Precise pricing of equity rounds to optimize founder ownership & dilution.",
    description: "Establish transparent pre-money valuation benchmarks before investment rounds, calculate post-money capitalization, and structure option pool refreshes.",

    approaches: [
      { id: "01", name: "CAP TABLE MODELING", desc: "Detailed post-money share pricing considering fully diluted shares, SAFEs, and convertible notes." },
      { id: "02", name: "OPTION POOL IMPACT", desc: "Structuring pre-money vs post-money ESOP pool creation to prevent unintended founder dilution." },
      { id: "03", name: "SAFE & NOTE CONVERSION", desc: "Valuation cap and discount rate adjustments for converting instrument holders." }
    ],

    applications: [
      "Institutional Series A & B Funding Rounds",
      "Convertible Note & SAFE Note Conversions",
      "Founder Share Retention Strategy",
      "Pro-Rata Rights & Anti-Dilution Calculations",
      "Board & Shareholder Approval Resolutions"
    ],

    deliverables: [
      "Pre & Post-Money Valuation Computation Sheet",
      "Pre vs Post Round Cap Table Analysis",
      "Option Pool Shuffle Impact Matrix",
      "Convertible Instrument Conversion Summary",
      "Investor Term Sheet Valuation Appendix"
    ],

    timeline: "1 to 2 Weeks"
  },

  "fundraising-valuation": {
    id: "04",
    slug: "fundraising-valuation",
    title: "Fundraising Valuation",
    subtitle: "Bankable financial models & pitch deck valuation support for VC/PE funding.",
    description: "Prepare institutional-grade financial forecasts, unit economics analysis, and valuation arguments that stand up to intensive Venture Capital due diligence.",

    approaches: [
      { id: "01", name: "INSTITUTIONAL DCF", desc: "Detailed 5-year cash flow forecasting with defensible WACC and terminal growth assumptions." },
      { id: "02", name: "PEER COMPARABLE ANALYSIS", desc: "EV/Revenue and EV/EBITDA benchmarking against public and private market peers." },
      { id: "03", name: "PRECEDENT TRANSACTIONS", desc: "Analysis of M&A and venture funding multiples in your target sector." }
    ],

    applications: [
      "Venture Capital & Private Equity Pitching",
      "Strategic Corporate Investor Rounds",
      "Cross-Border Outbound & Inbound Investment",
      "Investor Due Diligence Data Room Setup",
      "Venture Debt & Hybrid Instrument Structuring"
    ],

    deliverables: [
      "Institutional-Grade Integrated Financial Model",
      "Fundraising Valuation Defense Dossier",
      "Unit Economics & Cohort Retention Analysis",
      "Sensitivities & Scenario Analysis Matrix",
      "Data Room Financial Annexures"
    ],

    timeline: "2 to 3 Weeks"
  },

  "esop-valuation": {
    id: "05",
    slug: "esop-valuation",
    title: "ESOP Valuation",
    subtitle: "Fair market valuation for employee stock options, grant pricing & tax compliance.",
    description: "Derive Fair Market Value (FMV) per share for ESOP pool creation, strike price determination, perquisite tax computation, and Ind AS 102 share-based accounting.",

    approaches: [
      { id: "01", name: "RULE 11UA COMPUTATION", desc: "Statutory Valuation method under Income Tax Rules for perquisite tax on ESOP exercise." },
      { id: "02", name: "BLACK-SCHOLES MODEL", desc: "Option pricing modeling considering volatility, strike price, risk-free rate, and option tenure." },
      { id: "03", name: "FAIR VALUE ACCOUNTING", desc: "Ind AS 102 / IFRS 2 compliant expense recognition across vesting schedules." }
    ],

    applications: [
      "ESOP Pool Creation & Board Approval",
      "Grant Price / Exercise Price Determination",
      "Perquisite Tax Calculation at Share Allotment",
      "Financial Statement Expense Amortization",
      "Buyback & Liquidity Event Pricing"
    ],

    deliverables: [
      "Registered Valuer ESOP Valuation Certificate",
      "Black-Scholes Option Pricing Calculator Model",
      "Income Tax Rule 11UA Compliance Report",
      "Ind AS 102 Accounting Expense Schedule",
      "Employee ESOP Tax Impact Communication Sheet"
    ],

    timeline: "1 to 2 Weeks"
  },

  "share-equity-valuation": {
    id: "06",
    slug: "share-equity-valuation",
    title: "Share / Equity Valuation",
    subtitle: "Defensible share pricing for equity transfers, rights issues & secondary sales.",
    description: "Determine exact Fair Market Value per equity/preference share for statutory compliance under Section 56(2)(xviib), Section 50CA, and Companies Act rules.",

    approaches: [
      { id: "01", name: "DCF METHOD (RULE 11UA)", desc: "Mandatory Discounted Cash Flow valuation by Registered Valuer / Merchant Banker for fresh share issuance." },
      { id: "02", name: "NET ASSET VALUE (NAV)", desc: "Adjusted book value calculation for statutory asset-backed share transfer pricing." },
      { id: "03", name: "CCPS / CCDB VALUATION", desc: "Conversion ratio and valuation for Compulsorily Convertible Preference Shares." }
    ],

    applications: [
      "Fresh Equity / Rights Issue Pricing",
      "Inter-Promoter & Secondary Share Transfers",
      "Section 56(2)(xviib) Income Tax Compliance",
      "CCPS / Preference Share Conversion Ratio",
      "Family Settlement & Shareholder Restructuring"
    ],

    deliverables: [
      "Statutory Valuation Certificate under Income Tax Act",
      "Per Share Price Computation Report",
      "NAV vs DCF Comparison Summary",
      "CCPS Conversion Matrix & Schedule",
      "ROC Form PAS-3 Valuation Attachment"
    ],

    timeline: "1 to 2 Weeks"
  },

  "ma-valuation": {
    id: "07",
    slug: "ma-valuation",
    title: "Merger & Acquisition Valuation",
    subtitle: "Synergy modeling, swap ratio determination & deal structuring valuation.",
    description: "Independent valuation for business acquisitions, slump sales, corporate spin-offs, and share swap ratio calculations for NCLT merger schemes.",

    approaches: [
      { id: "01", name: "SWAP RATIO COMPUTATION", desc: "Relative valuation of target and acquirer to determine fair share exchange ratios." },
      { id: "02", name: "SYNERGY VALUE MODELING", desc: "Quantifying revenue and cost synergies resulting from strategic consolidation." },
      { id: "03", name: "SLUMP SALE VALUATION", desc: "Itemized asset & liability valuation for business division transfers under Sec 50B." }
    ],

    applications: [
      "Corporate Mergers, Amalgamations & Demergers",
      "Slump Sale & Business Division Transfers",
      "Acquisition Price Negotiation & Fairness Opinion",
      "NCLT Scheme Approval Documentation",
      "Post-Merger Integration Financials"
    ],

    deliverables: [
      "Share Swap Ratio Report for NCLT Merger Scheme",
      "Target Acquisition Valuation & Synergy Model",
      "Slump Sale Net Worth Certificate (Sec 50B)",
      "Fairness Opinion Report for Board & Shareholders",
      "Deal Sensitivity & Payback Period Analysis"
    ],

    timeline: "3 to 4 Weeks"
  },

  "financial-reporting-valuation": {
    id: "08",
    slug: "financial-reporting-valuation",
    title: "Financial Reporting Valuation",
    subtitle: "Ind AS, IFRS & US GAAP compliant fair value accounting valuations.",
    description: "Independent fair value measurements for Purchase Price Allocation (PPA), impairment testing of goodwill/intangibles, and financial instrument accounting.",

    approaches: [
      { id: "01", name: "PURCHASE PRICE ALLOCATION", desc: "Ind AS 103 valuation to allocate acquisition cost to identifiable tangible & intangible assets." },
      { id: "02", name: "IMPAIRMENT TESTING", desc: "Ind AS 36 Cash-Generating Unit (CGU) valuation for annual goodwill impairment review." },
      { id: "03", name: "INTANGIBLE VALUATION", desc: "Relief-from-Royalty and Multi-Period Excess Earnings (MEEM) methods for brand & patent valuation." }
    ],

    applications: [
      "Ind AS 103 / IFRS 3 Business Combinations",
      "Ind AS 36 Annual Goodwill Impairment Testing",
      "Brand, Patent & Technology Asset Valuation",
      "Financial Instrument Fair Value (Ind AS 109)",
      "Statutory Auditor Sign-off Support"
    ],

    deliverables: [
      "Purchase Price Allocation (PPA) Report",
      "Goodwill & Intangible Impairment Testing File",
      "Relief-from-Royalty Valuation Model for Brands/IP",
      "Auditor Technical Sign-off Support Note",
      "Financial Statement Note Disclosure Draft"
    ],

    timeline: "2 to 4 Weeks"
  },

  "compliance-valuation": {
    id: "09",
    slug: "compliance-valuation",
    title: "Valuation for Compliance",
    subtitle: "Registered Valuer certificates under Income Tax, FEMA, Companies Act & SEBI.",
    description: "Legally defensible valuation certificates required by Indian regulatory authorities, tax departments, RBI/FEMA portals, and ROC filings.",

    approaches: [
      { id: "01", name: "INCOME TAX SEC 56(2)(xviib)", desc: "Registered Valuer / Merchant Banker Rule 11UA DCF report for angel tax immunity." },
      { id: "02", name: "FEMA / RBI COMPLIANCE", desc: "Arm's length pricing report for Inbound FDI & Outbound ODI under Foreign Exchange Management rules." },
      { id: "03", name: "COMPANIES ACT SEC 247", desc: "IBBI Registered Valuer Certificate for allotment of shares for consideration other than cash." }
    ],

    applications: [
      "Angel Tax Sec 56(2)(xviib) Defense",
      "FDI Inbound Share Allotment (FC-GPR / RBI)",
      "ODI Outbound Overseas Direct Investment",
      "Companies Act Sec 62 / Sec 42 Share Allotment",
      "Capital Gains Sec 50CA Share Transfer Tax"
    ],

    deliverables: [
      "IBBI Registered Valuer Compliance Certificate",
      "SEBI Category-I Merchant Banker DCF Report",
      "FEMA FC-GPR Arm's Length Pricing Certificate",
      "Income Tax Assessment Defense Note",
      "ROC Portal Filing Annexure Packet"
    ],

    timeline: "3 to 5 Business Days"
  }
};
