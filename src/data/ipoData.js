// IPO & Capital Markets Practice Data for Growthora Advisory

export const IPO_CATEGORY_DATA = {
  title: "IPO",
  subtitle: "From IPO readiness to listing, we help ambitious businesses prepare, structure, and execute their journey to the public markets.",
  heroImage: "/services/ipo_hero.jpg",
  
  servicesList: [
    { id: "01", slug: "ipo-readiness-assessment", title: "IPO Readiness Assessment" },
    { id: "02", slug: "pre-ipo-compliance", title: "Pre-IPO Compliance" },
    { id: "03", slug: "financial-business-structuring", title: "Financial & Business Structuring" },
    { id: "04", slug: "due-diligence-support", title: "Due Diligence Support" },
    { id: "05", slug: "drhp-documentation-support", title: "DRHP / Documentation Support" },
    { id: "06", slug: "merchant-banker-coordination", title: "Merchant Banker Coordination" },
    { id: "07", slug: "sebi-exchange-compliance", title: "SEBI & Exchange Compliance" },
    { id: "08", slug: "ipo-execution-support", title: "IPO Execution Support" },
    { id: "09", slug: "post-listing-compliance", title: "Post-Listing Compliance" }
  ],

  faqs: [
    {
      q: "What is the minimum criteria for an SME IPO in India (BSE SME / NSE Emerge)?",
      a: "For SME IPOs, a company must have a post-issue paid-up capital of at least ₹3 Crore up to ₹25 Crore, positive net worth, track record of at least 2 to 3 years, and audited financials showing operating profits in at least 2 out of 3 preceding fiscal years."
    },
    {
      q: "How long does the complete IPO process take from readiness assessment to listing?",
      a: "For SME IPOs, the process typically takes 4 to 8 months. For Mainboard IPOs (BSE / NSE Main Board), it generally takes 8 to 14 months depending on restated financials, regulatory approvals, and market conditions."
    },
    {
      q: "What is the difference between DRHP and RHP?",
      a: "The Draft Red Herring Prospectus (DRHP) is the initial offer document filed with SEBI and the stock exchange for public review and feedback. The Red Herring Prospectus (RHP) contains complete company details except price/quantum of shares and is registered with ROC right before issue opening."
    },
    {
      q: "What key intermediaries are required for executing an IPO?",
      a: "Key intermediaries include Lead Manager / Merchant Banker, Registrar to the Issue, Peer Reviewed Auditor, Legal Counsel, Underwriters, Depositories (NSDL / CDSL), and Nodal Syndicate Banks."
    },
    {
      q: "How does Growthora help in IPO merchant banker and underwriter coordination?",
      a: "Growthora prepares bankable financial models, restates historical financials, resolves pre-IPO secretarial gaps, and presents a polished equity story to top merchant bankers to secure optimal underwriting terms and pricing."
    }
  ]
};

export const IPO_SERVICES_DATA = {
  "ipo-readiness-assessment": {
    id: "01",
    slug: "ipo-readiness-assessment",
    title: "IPO Readiness Assessment",
    subtitle: "Is Your Business Ready for an IPO?",
    description: "Evaluate your financial strength, governance, compliance, documentation, business structure and growth story before entering the public markets.",
    heroImage: "/services/ipo_readiness.jpg",
    cardImage: "/services/ipo_readiness.jpg",
    
    journeyStages: [
      { num: "01", title: "Assess", desc: "Financial audit, historical earnings evaluation, corporate governance review & preliminary IPO eligibility check." },
      { num: "02", title: "Prepare", desc: "Resolving secretarial non-compliances, balance sheet clean-up, independent director onboarding & internal audit controls." },
      { num: "03", title: "Structure", desc: "Capital restructuring, promoter holding consolidation, valuation modeling & SME / Mainboard platform selection." },
      { num: "04", title: "File", desc: "Draft Red Herring Prospectus (DRHP) drafting, SEBI submission, merchant banker review & regulatory query resolution." },
      { num: "05", title: "List", desc: "Book building, roadshows, anchor investor allocation, issue opening, allotment & bell-ringing listing ceremony." }
    ],

    readinessAreas: [
      "Financial statements & reporting",
      "Corporate governance",
      "Legal & regulatory compliance",
      "Business restructuring",
      "Due diligence",
      "Documentation & disclosures"
    ],

    deliverables: [
      "Gap Analysis & Diagnostic Report for SEBI / Exchange compliance",
      "Historical Financial Restatement Roadmap (3-year Ind AS / AS conversion)",
      "Promoter Holding & Capital Structure Optimization Plan",
      "Intermediary Selection Strategy (Merchant Bankers, Legal Counsel, Auditors)",
      "IPO Timeline & Cost Estimate Framework"
    ],

    process: [
      { step: 1, title: "Diagnostic Audit", desc: "Review 3 years of audited financials, ROC filings, GST, IT returns, and board minutes." },
      { step: 2, title: "Gap Rectification Plan", desc: "Identify secretarial lapses, promoter shareholding mismatches, and compliance deficits." },
      { step: 3, title: "Board & Committee Setup", desc: "Structure Audit Committee, Nomination Committee, and Stakeholder Relationship Committee." },
      { step: 4, title: "Roadmap Presentation", desc: "Present board-ready IPO execution timeline, valuation bandwidth, and capital strategy." }
    ],

    timeline: "2 to 4 Weeks"
  },

  "pre-ipo-compliance": {
    id: "02",
    slug: "pre-ipo-compliance",
    title: "Pre-IPO Compliance",
    subtitle: "Strengthening secretarial, regulatory & corporate compliance before public filing.",
    description: "Systematically resolve ROC backlogs, share allotment gaps, board composition requirements, and statutory tax compliances to ensure smooth regulatory clearance.",
    heroImage: "/services/ipo_compliance.jpg",
    cardImage: "/services/ipo_compliance.jpg",

    journeyStages: [
      { num: "01", title: "Audit", desc: "Complete secretarial & ROC compliance verification across all operational years." },
      { num: "02", title: "Rectify", desc: "Condonation of delays, filing pending MGT-14, PAS-3, and ROC forms." },
      { num: "03", title: "Appoint", desc: "Induct Independent Directors, Qualified Company Secretary & Peer Reviewed Auditor." },
      { num: "04", title: "Standardize", desc: "Draft mandatory code of conduct, insider trading policies, and whistleblower mechanisms." },
      { num: "05", title: "Certify", desc: "Obtain clean Secretarial Compliance Certificates from Practicing CS." }
    ],

    readinessAreas: [
      "ROC MGT & PAS Filing Clean-up",
      "Independent Director Onboarding",
      "Insider Trading Prevention Code",
      "Statutory Tax Clearance & NOCs",
      "Related Party Transaction (RPT) Policies",
      "Internal Financial Controls (IFC)"
    ],

    deliverables: [
      "Clean Secretarial Audit Report",
      "Updated Statutory Registers & Share Certificates",
      "Board & Statutory Committee Charters",
      "SEBI Prohibition of Insider Trading (PIT) Compliance Manual",
      "Dematerialization of Shares (ISIN Activation with NSDL/CDSL)"
    ],

    process: [
      { step: 1, title: "Secretarial Due Diligence", desc: "Scrutinize all ROC records, MGT-7, AOC-4, share allotments, and board resolutions." },
      { step: 2, title: "Form Rectification", desc: "File compounding applications and delayed ROC filings to clear statutory records." },
      { step: 3, title: "ISIN & Demat Setup", desc: "Convert promoter & physical shareholding into demat form with NSDL/CDSL." },
      { step: 4, title: "Committee Governance", desc: "Formalize mandatory committees required under Companies Act & SEBI LODR." }
    ],

    timeline: "4 to 8 Weeks"
  },

  "financial-business-structuring": {
    id: "03",
    slug: "financial-business-structuring",
    title: "Financial & Business Structuring",
    subtitle: "Optimizing capital structure, financial modeling & corporate architecture.",
    description: "Structure promoter equity, convert debt into equity, restate historical financial statements, and build bankable 5-year valuation models.",
    heroImage: "/services/ipo_structuring.jpg",
    cardImage: "/services/ipo_structuring.jpg",

    journeyStages: [
      { num: "01", title: "Consolidate", desc: "Consolidate group entities, subsidiaries & associate business entities under holding company." },
      { num: "02", title: "Restructure", desc: "Bonus share issue, stock split, and capitalization of reserves to optimize EPS & share price." },
      { num: "03", title: "Restate", desc: "Convert financials into Restated Financial Statements as required by SEBI ICDR." },
      { num: "04", title: "Model", desc: "Build detailed financial forecasts, DCF valuation, and peer comparison multiples." },
      { num: "05", title: "Finalize", desc: "Determine optimum issue size, dilution percentage, and price band strategy." }
    ],

    readinessAreas: [
      "Restated Financials (SEBI ICDR)",
      "Promoter Share Capitalization",
      "Bonus Share & Stock Split Execution",
      "Valuation & DCF Modeling",
      "Group Entity Amalgamation / Slump Sale",
      "Working Capital Optimization"
    ],

    deliverables: [
      "SEBI-Compliant Restated Financial Statements",
      "5-Year Integrated Financial Model & Valuation Report",
      "Capital Restructuring Scheme (Bonus Issue / Stock Split)",
      "Management Discussion & Analysis (MD&A) Draft",
      "Key Financial Ratio Comparison vs Listed Peers"
    ],

    process: [
      { step: 1, title: "Peer Audit Alignment", desc: "Engage Peer Reviewed CA firm to audit & restate 3-year P&L and Balance Sheet." },
      { step: 2, title: "Capital Optimization", desc: "Execute bonus share issuance to adjust paid-up equity capital to target range." },
      { step: 3, title: "Financial Modeling", desc: "Forecast revenues, EBITDA, PAT, cash flows, and working capital cycles." },
      { step: 4, title: "Valuation Benchmarking", desc: "Benchmark valuation metrics against listed competitors on BSE / NSE." }
    ],

    timeline: "6 to 10 Weeks"
  },

  "due-diligence-support": {
    id: "04",
    slug: "due-diligence-support",
    title: "Due Diligence Support",
    subtitle: "Comprehensive legal, financial & secretarial due diligence for DRHP filing.",
    description: "Prepare an airtight Virtual Data Room (VDR) and coordinate legal & financial due diligence required by Merchant Bankers and SEBI.",
    heroImage: "/services/ipo_diligence.jpg",
    cardImage: "/services/ipo_diligence.jpg",

    journeyStages: [
      { num: "01", title: "Setup VDR", desc: "Create secure Virtual Data Room indexed with legal, tax & commercial contracts." },
      { num: "02", title: "Verify", desc: "Verify material contracts, vendor agreements, customer SLAs & land title deeds." },
      { num: "03", title: "Resolve", desc: "Address legal disputes, pending litigation, show cause notices & tax demands." },
      { num: "04", title: "Coordinate", desc: "Facilitate due diligence reviews with Merchant Banker legal counsel." },
      { num: "05", title: "Sign-off", desc: "Obtain Due Diligence Certificates from BRLM and Legal Advisors." }
    ],

    readinessAreas: [
      "Virtual Data Room (VDR) Management",
      "Legal & Material Contract Due Diligence",
      "Financial & Tax Risk Scrutiny",
      "IPR & Asset Title Verification",
      "Litigation & Contingent Liabilities",
      "Employee & ESOP Documentation"
    ],

    deliverables: [
      "Fully Indexed Virtual Data Room (VDR)",
      "Comprehensive Due Diligence Checklist & Compliance Tracker",
      "Materiality Policy & Litigation Disclosure File",
      "Vendor & Customer Concentration Analysis Report",
      "IPR Title & Patent Registration Portfolio Summary"
    ],

    process: [
      { step: 1, title: "VDR Data Archiving", desc: "Upload 500+ statutory, commercial, and operational records into classified VDR folders." },
      { step: 2, title: "Legal Counsel Review", desc: "Work closely with merchant banker legal counsel to review every material contract." },
      { step: 3, title: "Litigation Closure", desc: "Obtain legal opinions and tax status reports for outstanding legal claims." },
      { step: 4, title: "Diligence Report Sign-off", desc: "Finalize Due Diligence Certificate required for DRHP submission." }
    ],

    timeline: "4 to 6 Weeks"
  },

  "drhp-documentation-support": {
    id: "05",
    slug: "drhp-documentation-support",
    title: "DRHP / Documentation Support",
    subtitle: "Drafting robust, compliant Draft Red Herring Prospectus & offer documents.",
    description: "End-to-end drafting of DRHP, RHP, and Final Prospectus chapters — covering industry reports, business description, financial disclosures, and risk factors.",
    heroImage: "/services/ipo_drhp.jpg",
    cardImage: "/services/ipo_drhp.jpg",

    journeyStages: [
      { num: "01", title: "Industry Report", desc: "Commission independent industry research report from accredited research agencies." },
      { num: "02", title: "Draft DRHP", desc: "Draft core sections: Risk Factors, Objects of Issue, Business & Financial Disclosures." },
      { num: "03", title: "Board Review", desc: "Review DRHP chapters with Board of Directors, Promoters & Legal Counsel." },
      { num: "04", title: "Submit", desc: "File DRHP with SEBI and designated Stock Exchange for public comments." },
      { num: "05", title: "Update RHP", desc: "Update prospectus with price band, anchor allocation, and issue dates." }
    ],

    readinessAreas: [
      "Draft Red Herring Prospectus (DRHP)",
      "Objects of the Issue Justification",
      "Risk Factors & Industry Analysis",
      "Promoter Group & Management Disclosures",
      "Financial Statements Disclosures",
      "Legal & Statutory Undertakings"
    ],

    deliverables: [
      "Complete Board-Approved DRHP Document",
      "Independent Industry Research & Market Positioning Report",
      "Objects of Issue Utilization & Capital Deployment Plan",
      "Risk Factor Matrix & Mitigation Strategies",
      "Draft Red Herring Prospectus Print & Electronic Media Files"
    ],

    process: [
      { step: 1, title: "Chapter Drafting", desc: "Draft detailed business overview, competitive strengths, strategies, and financial metrics." },
      { step: 2, title: "Objects Justification", desc: "Validate capital expenditure quotes, debt repayment schedules, and working capital needs." },
      { step: 3, title: "Intermediary Review", desc: "Conduct multi-round review sessions with Book Running Lead Managers (BRLMs)." },
      { step: 4, title: "SEBI / Exchange Filing", desc: "Submit physical & electronic copies to SEBI, BSE, and NSE." }
    ],

    timeline: "6 to 8 Weeks"
  },

  "merchant-banker-coordination": {
    id: "06",
    slug: "merchant-banker-coordination",
    title: "Merchant Banker Coordination",
    subtitle: "Selecting, negotiating & managing key IPO intermediaries.",
    description: "Identify and shortlist top SEBI-registered Merchant Bankers (BRLMs), Syndicate Members, Registrars, and Legal Counsels at optimal fee structures.",
    heroImage: "/services/ipo_merchant_banker.jpg",
    cardImage: "/services/ipo_merchant_banker.jpg",

    journeyStages: [
      { num: "01", title: "Shortlist", desc: "Evaluate SEBI-registered Category-I Merchant Bankers based on sector track record." },
      { num: "02", title: "Pitching", desc: "Organize merchant banker presentations and mandate negotiations." },
      { num: "03", title: "Appoint", desc: "Sign engagement letters with Lead Manager, Registrar, Sponsor Bank & Underwriters." },
      { num: "04", title: "Coordinate", desc: "Manage weekly execution tracking meetings across all appointed intermediaries." },
      { num: "05", title: "Underwrite", desc: "Finalize underwriting terms, syndicate allocation & market maker agreements." }
    ],

    readinessAreas: [
      "Merchant Banker (BRLM) Selection",
      "Intermediary Fee Negotiation",
      "Registrar & Share Transfer Agent (RTA)",
      "Sponsor & Nodal Bankers",
      "Syndicate & Market Maker Agreements",
      "Underwriting Commitments"
    ],

    deliverables: [
      "Merchant Banker Evaluation Matrix & Pitch Deck",
      "Intermediary Mandate Agreements & Fee Structures",
      "Integrated Master IPO Project Plan & Milestone Tracker",
      "Market Maker & Underwriter Execution Contracts",
      "Banker Coordination Protocols & Data Sharing Workflows"
    ],

    process: [
      { step: 1, title: "Intermediary RFP", desc: "Issue Request for Proposals (RFP) to top-tier Category-I Merchant Bankers." },
      { step: 2, title: "Valuation Alignment", desc: "Align expectations on target company valuation, issue size, and pricing band." },
      { step: 3, title: "Contract Execution", desc: "Finalize agreements with BRLM, Registrar, Depository, and Legal Advisors." },
      { step: 4, title: "Weekly Execution Calls", desc: "Chair weekly IPO execution committee calls to track progress against DRHP targets." }
    ],

    timeline: "3 to 5 Weeks"
  },

  "sebi-exchange-compliance": {
    id: "07",
    slug: "sebi-exchange-compliance",
    title: "SEBI & Exchange Compliance",
    subtitle: "Handling SEBI observations, stock exchange approvals & in-principle clearance.",
    description: "Coordinate with SEBI and stock exchange (BSE SME / NSE Emerge / Mainboard) officials to resolve queries and obtain In-Principle Approval.",
    heroImage: "/services/ipo_sebi.jpg",
    cardImage: "/services/ipo_sebi.jpg",

    journeyStages: [
      { num: "01", title: "In-Principle", desc: "Apply for In-Principle Listing Approval from BSE / NSE." },
      { num: "02", title: "SEBI Review", desc: "SEBI reviews DRHP for 21 days while open to public comments." },
      { num: "03", title: "Queries", desc: "Draft point-by-point technical replies to SEBI observation letters." },
      { num: "04", title: "Site Visit", desc: "Coordinate stock exchange team site visit & management interview." },
      { num: "05", title: "NOC Release", desc: "Secure SEBI observation letter and Exchange In-Principle Approval." }
    ],

    readinessAreas: [
      "Stock Exchange In-Principle Approval",
      "SEBI Observation Letter Resolution",
      "Public Comment Handling & Media Clarifications",
      "Exchange Advisory Committee Presentation",
      "ROC Prospectus Filing (RHP)",
      "Regulatory NOCs & Compliance Clearances"
    ],

    deliverables: [
      "Stock Exchange In-Principle Approval Letter",
      "SEBI Observation Reply Matrix & Technical Addendums",
      "Exchange Advisory Committee Pitch Deck",
      "Registered Red Herring Prospectus (RHP) with ROC",
      "Final SEBI Compliance Clearance Certificate"
    ],

    process: [
      { step: 1, title: "Exchange Submission", desc: "File DRHP with BSE/NSE along with listing application fees." },
      { step: 2, title: "Management Interview", desc: "Present growth strategy to Exchange Listing Advisory Committee." },
      { step: 3, title: "SEBI Query Response", desc: "Prepare comprehensive replies to SEBI comments within stipulated timelines." },
      { step: 4, title: "ROC Registration", desc: "File RHP with Registrar of Companies (ROC) post regulatory clearances." }
    ],

    timeline: "6 to 10 Weeks"
  },

  "ipo-execution-support": {
    id: "08",
    slug: "ipo-execution-support",
    title: "IPO Execution Support",
    subtitle: "Roadshows, book building, anchor allocation, subscription & listing.",
    description: "Manage pre-IPO investor roadshows, book building, ASBA syndicate bank monitoring, allotment finalization, and the exchange listing ceremony.",
    heroImage: "/services/ipo_execution.jpg",
    cardImage: "/services/ipo_execution.jpg",

    journeyStages: [
      { num: "01", title: "Roadshows", desc: "Conduct institutional investor roadshows, HNI meets & broker conferences." },
      { num: "02", title: "Anchor Book", desc: "Open anchor investor bidding window 1 day prior to public issue." },
      { num: "03", title: "Issue Open", desc: "Launch 3 to 5 day public subscription window via UPI / ASBA process." },
      { num: "04", title: "Allotment", desc: "Finalize basis of allotment in coordination with Registrar & Stock Exchange." },
      { num: "05", title: "Bell Ringing", desc: "Credit shares to demat accounts & execute listing ceremony at Exchange." }
    ],

    readinessAreas: [
      "Investor Roadshow & Presentation Deck",
      "Anchor Investor Allocation Strategy",
      "Book Building & Bidding Monitoring",
      "ASBA / UPI Subscription Tracking",
      "Basis of Allotment Finalization",
      "Stock Exchange Listing Ceremony Execution"
    ],

    deliverables: [
      "Investor Roadshow Presentation & Pitch Deck",
      "Anchor Book Allocation Agreement & Confirmation Notes",
      "Daily Subscription Tracking & Bidding Reports",
      "Basis of Allotment Approval Document",
      "Listing Day Bell-Ringing Ceremony & Press Release"
    ],

    process: [
      { step: 1, title: "Pre-IPO Investor Meetings", desc: "Host 20+ institutional & HNI investor roadshows with Merchant Bankers." },
      { step: 2, title: "Price Band Announcement", desc: "Publish advertisement in major national newspapers detailing price band." },
      { step: 3, title: "Bidding & Subscription", desc: "Monitor real-time subscription numbers across QIB, NII, and Retail categories." },
      { step: 4, title: "Listing Day", desc: "Execute formal bell-ringing ceremony at BSE/NSE headquarters and commence trading." }
    ],

    timeline: "2 to 3 Weeks"
  },

  "post-listing-compliance": {
    id: "09",
    slug: "post-listing-compliance",
    title: "Post-Listing Compliance",
    subtitle: "SEBI LODR corporate governance, quarterly reporting & investor relations.",
    description: "Maintain continuous compliance under SEBI Listing Obligations and Disclosure Requirements (LODR), quarterly earnings calls, and annual secretarial audits.",
    heroImage: "/services/ipo_post_listing.jpg",
    cardImage: "/services/ipo_post_listing.jpg",

    journeyStages: [
      { num: "01", title: "LODR Compliance", desc: "Implement SEBI LODR compliance calendar for quarterly & annual disclosures." },
      { num: "02", title: "Quarterly Results", desc: "Draft quarterly financial result press releases, investor decks & SEBI portal filings." },
      { num: "03", title: "Shareholding Pattern", desc: "File quarterly Shareholding Pattern (Reg 31) & Corporate Governance Report (Reg 27)." },
      { num: "04", title: "Investor Relations", desc: "Manage investor queries, earnings conference calls & annual analyst meets." },
      { num: "05", title: "Secretarial Audit", desc: "Conduct annual secretarial audit (MR-3) & SEBI LODR compliance certification." }
    ],

    readinessAreas: [
      "SEBI LODR Regulation 27, 31, 33, 47 Filings",
      "Quarterly Earnings Presentation & Investor Decks",
      "Annual Report & Shareholder AGM Management",
      "Material Event Disclosure (Reg 30)",
      "Trading Window Closure Notices",
      "Secretarial Audit & Compliance Certificate"
    ],

    deliverables: [
      "SEBI LODR Annual Compliance Calendar & Filing Tracker",
      "Quarterly Earnings Release Template & Investor Presentation",
      "Board Meeting Agenda, Minutes & SEBI Portal Filing Packets",
      "Annual Secretarial Audit Report (Form MR-3)",
      "Investor Relations Portal Content & Compliance Log"
    ],

    process: [
      { step: 1, title: "Compliance Calendar Setup", desc: "Deploy automated tracking calendar for mandatory 15-day, 21-day, and 45-day SEBI filings." },
      { step: 2, title: "Quarterly Board Meetings", desc: "Prepare financial results, MD&A, and board resolutions for approval." },
      { step: 3, title: "Exchange Portal Filing", desc: "Submit disclosures on BSE Listing Centre & NSE NEAPS portal within deadline." },
      { step: 4, title: "Annual Report Drafting", desc: "Draft Director's Report, Governance Report, and BRSR for annual shareholder AGM." }
    ],

    timeline: "Ongoing Retainer Practice"
  }
};
