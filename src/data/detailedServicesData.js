export const DETAILED_SERVICES_DATA = {
  "llp": {
    slug: "llp",
    title: "Limited Liability Partnership (LLP)",
    subtitle: "Protect Your Personal Assets with a Flexible Corporate Structure",
    description: "An LLP offers the perfect balance of a traditional partnership and a private limited company. Enjoy limited liability protection for your partners without complex corporate compliances.",
    heroImage: "/services/reg_llp_hero.jpg",
    cardImage: "/services/reg_llp.png",
    overview: {
      whatItIs: "A corporate business vehicle that enables professional expertise and entrepreneurial initiative to combine and operate in flexible, innovative and efficient manner, providing benefits of limited liability while allowing its members the flexibility for organizing their internal structure as a partnership.",
      whyImportant: "It separates personal assets from business liabilities, protecting partners from debts the business incurs.",
      whoNeedsIt: "Professional service providers, startups, and closely held businesses preferring a simpler corporate structure.",
      benefits: ["Limited liability protection", "No minimum capital requirement", "Lower compliance burden compared to Pvt Ltd", "Flexible management structure"]
    },
    whatYouGet: [
      "LLP Name Approval & Reservation",
      "Drafting of LLP Agreement",
      "DSC (Digital Signature Certificate) for Partners",
      "DIN (Director Identification Number)",
      "Filing of Incorporation Forms (FiLLiP)",
      "Certificate of Incorporation Issuance",
      "PAN & TAN Application"
    ],
    documents: [
      "PAN Card (Partners)",
      "Aadhaar Card / Voter ID / Passport (Partners)",
      "Latest Bank Statement / Utility Bill (Partners)",
      "Passport-size Photograph (Partners)",
      "Registered Office Address Proof (Electricity Bill / Rent Agreement)",
      "NOC from Owner of Registered Office"
    ],
    process: [
      { step: "01", title: "Consultation", desc: "Expert assessment of your business structure needs." },
      { step: "02", title: "Name Approval", desc: "Applying for a unique LLP name via RUN-LLP." },
      { step: "03", title: "DSC & DIN", desc: "Obtaining Digital Signatures and DPIN for designated partners." },
      { step: "04", title: "Filing FiLLiP", desc: "Submitting the incorporation document to the MCA." },
      { step: "05", title: "Certificate", desc: "Receiving the Certificate of Incorporation." },
      { step: "06", title: "LLP Agreement", desc: "Drafting and filing the LLP agreement within 30 days." }
    ],
    idealFor: [
      "Consultants & Professionals",
      "Family-owned businesses",
      "Small and Medium Enterprises (SMEs)",
      "Service-oriented businesses",
      "Real estate ventures"
    ],
    timeline: "Subject to MCA processing, name availability, and document readiness. Typically takes 10-15 working days.",
    faqs: [
      { q: "What is the minimum number of partners required for an LLP?", a: "A minimum of 2 designated partners are required to incorporate an LLP." },
      { q: "Is audit mandatory for an LLP?", a: "Audit is mandatory only if the turnover exceeds ₹40 lakhs or capital contribution exceeds ₹25 lakhs." },
      { q: "Can an NRI be a partner in an LLP?", a: "Yes, an NRI or foreign national can be a partner, provided at least one designated partner is a resident of India." },
      { q: "What is the liability of partners in an LLP?", a: "The liability of each partner is limited to their agreed contribution to the LLP." },
      { q: "Does an LLP have a separate legal entity?", a: "Yes, an LLP is a separate legal entity from its partners." },
      { q: "Can a private limited company be converted to an LLP?", a: "Yes, subject to fulfilling certain statutory requirements." }
    ]
  },
  "proprietorship": {
    slug: "proprietorship",
    title: "Proprietorship Registration",
    subtitle: "The Simplest Way to Start Your Business Journey",
    description: "Launch your solo venture effortlessly. A sole proprietorship is the easiest, fastest, and most cost-effective business structure for independent founders and small traders.",
    heroImage: "/services/reg_prop_hero.jpg",
    cardImage: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    overview: {
      whatItIs: "A business structure owned, managed, and controlled by a single individual.",
      whyImportant: "It requires minimal legal formalities and is the fastest way to start operating a formal business.",
      whoNeedsIt: "Freelancers, independent contractors, local shop owners, and solo founders testing an idea.",
      benefits: ["Complete control over the business", "Minimal compliance requirements", "Lower setup costs", "Easy to dissolve"]
    },
    whatYouGet: [
      "Business Name Registration Support",
      "MSME / Udyam Registration",
      "GST Registration (if applicable)",
      "Shop & Establishment License Guidance",
      "Current Account Opening Assistance",
      "Basic Compliance Consultation"
    ],
    documents: [
      "PAN Card of the Proprietor",
      "Aadhaar Card of the Proprietor",
      "Passport-size Photograph",
      "Business Address Proof (Electricity Bill / Rent Agreement)",
      "NOC from the Owner (if rented)",
      "Latest Bank Statement"
    ],
    process: [
      { step: "01", title: "Consultation", desc: "Understanding your business scope and regulatory needs." },
      { step: "02", title: "Document Collection", desc: "Gathering KYC and address proofs." },
      { step: "03", title: "Udyam/MSME", desc: "Registering under MSME for legal entity proof." },
      { step: "04", title: "GST Application", desc: "Filing for GST if crossing thresholds or voluntarily." },
      { step: "05", title: "Bank Account", desc: "Providing documentation to open a current account." }
    ],
    idealFor: [
      "Freelancers & Consultants",
      "Local Retailers & Shop Owners",
      "Home-based businesses",
      "Solo Service Providers",
      "E-commerce sellers (depending on platform rules)"
    ],
    timeline: "Typically 3-7 working days depending on MSME/GST processing and document readiness.",
    faqs: [
      { q: "Do I need a separate PAN card for my proprietorship?", a: "No, the proprietor's personal PAN is used for the business." },
      { q: "Is registration mandatory for a sole proprietorship?", a: "There is no separate 'Proprietorship Registration' under law, but you need an MSME or GST registration to prove existence and open a bank account." },
      { q: "What is the liability in a proprietorship?", a: "The liability is unlimited, meaning personal assets can be attached to clear business debts." },
      { q: "Can I upgrade to a Private Limited Company later?", a: "Yes, a proprietorship can be taken over by a new Private Limited Company." },
      { q: "Is audit required for a proprietorship?", a: "Audit is only required if turnover exceeds the threshold specified under the Income Tax Act." }
    ]
  },
  "private-limited-company": {
    slug: "private-limited-company",
    title: "Private Limited Company",
    subtitle: "The Gold Standard Structure for Scaling and Fundraising",
    description: "Incorporate a Private Limited Company to build credibility, raise venture capital, and protect your personal assets with a robust corporate structure designed for growth.",
    heroImage: "/services/reg_pvt_hero.jpg",
    cardImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    overview: {
      whatItIs: "A privately held business entity recognized by law as separate from its founders, with limited liability and restricted share transferability.",
      whyImportant: "It's the preferred structure for investors and offers the most professional image in the market.",
      whoNeedsIt: "Startups seeking funding, growing businesses, and enterprises needing limited liability protection.",
      benefits: ["Limited liability for shareholders", "Separate legal entity", "Ability to raise equity capital", "High credibility and trust"]
    },
    whatYouGet: [
      "Name Approval (SPICe+ Part A)",
      "Digital Signature Certificate (DSC)",
      "Director Identification Number (DIN)",
      "Drafting MoA & AoA",
      "Incorporation Certificate",
      "Company PAN & TAN",
      "EPFO & ESIC Registration",
      "Professional Tax Registration (State specific)"
    ],
    documents: [
      "PAN Card (Directors/Shareholders)",
      "Aadhaar / Voter ID / Passport (Directors)",
      "Latest Bank Statement (Directors)",
      "Passport-size Photographs",
      "Registered Office Address Proof",
      "NOC from Owner of Registered Office"
    ],
    process: [
      { step: "01", title: "Consultation", desc: "Structuring the board and shareholding pattern." },
      { step: "02", title: "DSC & Name", desc: "Applying for Digital Signatures and reserving company name." },
      { step: "03", title: "Drafting", desc: "Preparing the Memorandum and Articles of Association." },
      { step: "04", title: "Filing SPICe+", desc: "Submitting comprehensive incorporation forms to MCA." },
      { step: "05", title: "Incorporation", desc: "Receiving the Certificate of Incorporation, PAN & TAN." },
      { step: "06", title: "Bank Setup", desc: "Opening the corporate bank account." }
    ],
    idealFor: [
      "Tech Startups",
      "Fast-growing SMEs",
      "B2B Service Providers",
      "Businesses seeking VC/Angel funding",
      "Manufacturing companies"
    ],
    timeline: "Generally 10-15 working days, subject to MCA approval times and name availability.",
    faqs: [
      { q: "What is the minimum capital required?", a: "There is no longer a minimum paid-up capital requirement for a Private Limited Company." },
      { q: "How many directors are required?", a: "A minimum of 2 directors are required, and at least one must be a resident of India." },
      { q: "What are MoA and AoA?", a: "Memorandum of Association defines the company's charter and scope. Articles of Association define internal rules and regulations." },
      { q: "Can a foreign national be a director?", a: "Yes, foreign nationals can be directors, provided they obtain a DIN and one director is an Indian resident." },
      { q: "Is statutory audit mandatory?", a: "Yes, every private limited company must appoint an auditor and conduct an annual statutory audit regardless of turnover." },
      { q: "Are annual filings required?", a: "Yes, filing annual returns (AOC-4 and MGT-7) with the ROC is mandatory." }
    ]
  },
  "partnership": {
    slug: "partnership",
    title: "Partnership Firm Registration",
    subtitle: "Formalize Your Business Alliance with a Solid Foundation",
    description: "Start a business with your trusted partners. A registered partnership firm clearly defines roles, profit-sharing, and operational guidelines, preventing future disputes.",
    heroImage: "/services/reg_partner_hero.jpg",
    cardImage: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    overview: {
      whatItIs: "A business structure where two or more individuals manage and operate a business according to the terms set out in a Partnership Deed.",
      whyImportant: "Registering the firm gives it legal recognition, the right to file suits, and clarifies the relationship between partners.",
      whoNeedsIt: "Traditional businesses, small trading firms, and professionals partnering without needing corporate complexity.",
      benefits: ["Shared responsibility and capital", "Easy to form with minimal compliance", "Flexibility in management", "Clear profit-sharing guidelines"]
    },
    whatYouGet: [
      "Drafting of Comprehensive Partnership Deed",
      "Notarization and Stamping of Deed",
      "Registration with Registrar of Firms (RoF)",
      "Partnership Firm PAN Application",
      "Current Account Opening Guidance",
      "GST/MSME Registration Support"
    ],
    documents: [
      "PAN Card (All Partners)",
      "Aadhaar Card (All Partners)",
      "Address Proof of Partners",
      "Registered Office Address Proof",
      "NOC from Owner of Registered Office"
    ],
    process: [
      { step: "01", title: "Consultation", desc: "Defining roles, capital, and profit-sharing ratios." },
      { step: "02", title: "Deed Drafting", desc: "Drafting a customized partnership deed." },
      { step: "03", title: "Stamping", desc: "Printing the deed on appropriate stamp paper & notarizing." },
      { step: "04", title: "PAN Application", desc: "Applying for the firm's PAN." },
      { step: "05", title: "RoF Filing", desc: "Filing application with the Registrar of Firms." },
      { step: "06", title: "Certificate", desc: "Receiving the Registration Certificate." }
    ],
    idealFor: [
      "Trading businesses",
      "Local service providers",
      "Family-run enterprises",
      "Small scale manufacturing",
      "Professional consultancies"
    ],
    timeline: "Deed drafting and PAN take 3-5 days. RoF registration depends entirely on the state registrar's processing time.",
    faqs: [
      { q: "Is registration of a partnership firm mandatory?", a: "No, it is optional. However, an unregistered firm cannot file a legal suit against third parties or its partners." },
      { q: "How many partners can a firm have?", a: "A minimum of 2 and a maximum of 50 partners." },
      { q: "What is a Partnership Deed?", a: "A written legal document containing the terms and conditions agreed upon by the partners." },
      { q: "Do partners have limited liability?", a: "No, in a traditional partnership, partners have unlimited liability." },
      { q: "Can the partnership deed be amended later?", a: "Yes, by executing a supplementary deed and notifying the Registrar." }
    ]
  },
  "trademark": {
    slug: "trademark",
    title: "Trademark Registration",
    subtitle: "Protect Your Brand Identity and Intellectual Property",
    description: "Safeguard your business name, logo, or slogan from copycats. A registered trademark gives you exclusive legal rights and builds immense brand value over time.",
    heroImage: "/services/reg_tm_hero.jpg",
    cardImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    overview: {
      whatItIs: "A recognizable insignia, phrase, word, or symbol that denotes a specific product or service and legally differentiates it from others.",
      whyImportant: "It prevents unauthorized use of your brand, provides legal recourse against infringement, and creates an intangible asset.",
      whoNeedsIt: "Any business with a unique brand name, logo, or product seeking exclusive market identity.",
      benefits: ["Exclusive rights to use the mark", "Legal protection against infringement", "Builds trust and goodwill", "Creates an intangible asset"]
    },
    whatYouGet: [
      "Comprehensive Trademark Search",
      "Class Selection Strategy",
      "Application Preparation (Form TM-A)",
      "Filing with the Trademark Registry",
      "Tracking Application Status",
      "Basic Objection Handling Guidance"
    ],
    documents: [
      "Logo/Mark Image (if applicable)",
      "Applicant's Identity Proof",
      "Certificate of Incorporation (for companies)",
      "MSME/Udyam Certificate (for reduced government fees)",
      "Power of Attorney (Form TM-M)",
      "User Affidavit (if claiming prior use)"
    ],
    process: [
      { step: "01", title: "TM Search", desc: "Conducting a thorough search across classes to check availability." },
      { step: "02", title: "Application Draft", desc: "Preparing the application and determining the correct class." },
      { step: "03", title: "Filing", desc: "Submitting the application. You can now use the 'TM' symbol." },
      { step: "04", title: "Examination", desc: "Registry examines the application and may raise objections." },
      { step: "05", title: "Publication", desc: "Published in the TM Journal for third-party opposition." },
      { step: "06", title: "Registration", desc: "Issuance of the Certificate. You can now use the 'R' symbol." }
    ],
    idealFor: [
      "E-commerce brands",
      "Software & Tech products",
      "FMCG companies",
      "Service providers",
      "Franchises"
    ],
    timeline: "Filing takes 2-3 days. Full registration process by the government typically takes 6-12 months if no oppositions.",
    faqs: [
      { q: "When can I use the ™ and ® symbols?", a: "You can use ™ immediately after filing the application. You can use ® only after the trademark is successfully registered." },
      { q: "How long is a trademark valid?", a: "A trademark is valid for 10 years and can be renewed indefinitely." },
      { q: "Can I register a sound or smell as a trademark?", a: "Yes, non-conventional trademarks like sounds can be registered if they are distinctive and graphically representable." },
      { q: "What happens if someone objects to my application?", a: "You must file a reply to the examination report or opposition, and potentially attend a hearing." },
      { q: "Is a trademark valid globally?", a: "No, trademark protection is territorial. You must file separately in other countries or use the Madrid Protocol for international registration." }
    ]
  },
  "gst-registration": {
    slug: "gst-registration",
    title: "GST Registration",
    subtitle: "Ensure Tax Compliance and Expand Your Market Reach",
    description: "Navigate indirect taxation smoothly. GST registration is essential for claiming input tax credit, selling interstate, and operating on e-commerce platforms.",
    heroImage: "/services/reg_gst_hero.jpg",
    cardImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    overview: {
      whatItIs: "A mandatory tax registration for businesses whose turnover exceeds the threshold limit or who engage in specific taxable activities.",
      whyImportant: "It legalizes your business for tax collection, allows input tax credit claims, and enables pan-India sales.",
      whoNeedsIt: "Businesses crossing turnover thresholds, e-commerce sellers, and those supplying goods interstate.",
      benefits: ["Legal recognition as a supplier", "Claim Input Tax Credit (ITC)", "Sell online effortlessly", "Interstate trade capability"]
    },
    whatYouGet: [
      "Eligibility Assessment",
      "Document Verification",
      "Preparation of Application",
      "Filing on the GST Portal",
      "Handling Clarification Queries (if any)",
      "Generation of GSTIN & Certificate"
    ],
    documents: [
      "PAN Card of Business/Applicant",
      "Aadhaar Card of Applicant",
      "Business Registration Document (COI/Partnership Deed)",
      "Address Proof of Business Place",
      "Bank Account Details/Cancelled Cheque",
      "Digital Signature (for Companies/LLPs)"
    ],
    process: [
      { step: "01", title: "Consultation", desc: "Determining applicability and required state registrations." },
      { step: "02", title: "Document Check", desc: "Collecting and verifying all proofs." },
      { step: "03", title: "Application", desc: "Filing the registration form on the GST portal." },
      { step: "04", title: "ARN Generation", desc: "Receiving the Application Reference Number." },
      { step: "05", title: "Verification", desc: "Government officer reviews application." },
      { step: "06", title: "GSTIN Issuance", desc: "Receiving the GSTIN and registration certificate." }
    ],
    idealFor: [
      "Retailers & Wholesalers",
      "Service Providers crossing 20L turnover",
      "Goods Suppliers crossing 40L turnover",
      "E-commerce sellers (Amazon, Flipkart)",
      "Exporters & Importers"
    ],
    timeline: "Usually takes 3-7 working days, subject to government processing and Aadhaar authentication.",
    faqs: [
      { q: "What is the turnover threshold for GST registration?", a: "Generally ₹40 Lakhs for goods and ₹20 Lakhs for services, but varies by state and business type." },
      { q: "Is GST registration mandatory for e-commerce sellers?", a: "Yes, anyone selling through an e-commerce operator must register for GST irrespective of turnover." },
      { q: "Can I get multiple GST registrations in one state?", a: "Yes, you can obtain separate registrations for different business verticals within the same state." },
      { q: "What is Input Tax Credit (ITC)?", a: "ITC allows you to reduce the tax you have already paid on purchases from the tax you must pay on sales." },
      { q: "Do I need to file returns if there are no sales?", a: "Yes, you must file a 'Nil' return if there are no transactions during the period." }
    ]
  },
  "msme-udyam": {
    slug: "msme-udyam",
    title: "MSME / Udyam Registration",
    subtitle: "Unlock Government Subsidies, Lower Interest Rates, and Growth",
    description: "Get recognized by the Ministry of MSME. Udyam registration is a zero-cost gateway to a multitude of government schemes, priority sector lending, and protection against delayed payments.",
    heroImage: "/services/reg_msme_hero.jpg",
    cardImage: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    overview: {
      whatItIs: "A government registration that provides a unique identity and recognition to micro, small, and medium enterprises.",
      whyImportant: "It opens doors to collateral-free bank loans, lower interest rates, and trademark fee subsidies.",
      whoNeedsIt: "Any manufacturing or service enterprise that falls within the micro, small, or medium investment/turnover criteria.",
      benefits: ["Protection against delayed payments", "Collateral-free bank loans", "Discount on trademark/patent fees", "Subsidy on barcode registration"]
    },
    whatYouGet: [
      "Eligibility Check & Classification",
      "Data Preparation based on PAN/GST",
      "Application Filing on Udyam Portal",
      "Udyam Registration Certificate Generation",
      "Advisory on MSME Benefits"
    ],
    documents: [
      "Aadhaar Number of the Applicant",
      "PAN Number of the Business",
      "GSTIN (if applicable)",
      "Bank Account Details",
      "NIC Codes for Business Activities",
      "Details of Plant/Machinery Investment"
    ],
    process: [
      { step: "01", title: "Information Gathering", desc: "Collecting basic Aadhaar, PAN, and business details." },
      { step: "02", title: "Aadhaar OTP", desc: "Verifying identity through Aadhaar OTP." },
      { step: "03", title: "Data Entry", desc: "Selecting correct NIC codes and entering investment data." },
      { step: "04", title: "Submission", desc: "Final submission on the Udyam portal." },
      { step: "05", title: "Certificate", desc: "Instant generation of the Udyam Registration Certificate." }
    ],
    idealFor: [
      "Manufacturing units",
      "Service-based startups",
      "Wholesale and retail traders",
      "B2B vendors facing payment delays",
      "Businesses seeking bank loans"
    ],
    timeline: "Usually completed within 1-2 working days.",
    faqs: [
      { q: "Is Udyam Registration free?", a: "Yes, the government portal does not charge a fee. You only pay for our professional filing and advisory services." },
      { q: "Do I need a GST number for MSME registration?", a: "Since the integration of portals, PAN and GST data are often pulled automatically, but exceptions exist based on the business type." },
      { q: "What is the MSME Samadhaan scheme?", a: "It's a portal for MSMEs to file cases for delayed payments from buyers (payments delayed beyond 45 days)." },
      { q: "Can traders register for MSME?", a: "Yes, wholesale and retail traders can now register under MSME for limited benefits like priority sector lending." },
      { q: "Is Udyam registration valid for a lifetime?", a: "Yes, it is a permanent registration, but details update dynamically based on your income tax and GST returns." }
    ]
  },
  "gem-registration": {
    slug: "gem-registration",
    title: "GeM Registration",
    subtitle: "Become an Authorized Supplier to the Government of India",
    description: "The Government e-Marketplace (GeM) is the national public procurement portal. Registering enables your business to sell goods and services directly to government departments and PSUs.",
    heroImage: "/services/reg_gem_hero.jpg",
    cardImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    overview: {
      whatItIs: "A digital marketplace registration that allows businesses to participate in government tenders and procurement.",
      whyImportant: "Government departments are mandated to procure through GeM, offering a massive market opportunity for private sellers.",
      whoNeedsIt: "Manufacturers, service providers, and traders looking to supply to government bodies.",
      benefits: ["Direct access to government buyers", "Transparent bidding process", "Timely payments guarantee", "No middleman interference"]
    },
    whatYouGet: [
      "GeM Seller Profile Creation",
      "Aadhaar & PAN Verification",
      "Bank Account Validation",
      "Caution Money Deposit Guidance",
      "Catalog Management Assistance (Add-on)",
      "Vendor Assessment Support (Add-on)"
    ],
    documents: [
      "Aadhaar Number (linked to mobile)",
      "PAN Card of Business",
      "Bank Account Details",
      "Income Tax Return (ITR) Details",
      "GSTIN",
      "MSME/Udyam Certificate (for exemptions)"
    ],
    process: [
      { step: "01", title: "Profile Creation", desc: "Setting up the primary seller account on GeM." },
      { step: "02", title: "Verifications", desc: "Aadhaar, PAN, and Bank Account validation." },
      { step: "03", title: "Tax Validation", desc: "Validating GSTIN and ITR details on the portal." },
      { step: "04", title: "Caution Money", desc: "Guidance on paying the required caution money deposit." },
      { step: "05", title: "Profile Completion", desc: "Ensuring 100% profile completion." },
      { step: "06", title: "Catalog Upload", desc: "Assistance with listing initial products/services." }
    ],
    idealFor: [
      "IT Hardware/Software Suppliers",
      "Office Supplies Vendors",
      "Manpower/Security Service Providers",
      "Vehicle Fleet Operators",
      "Medical Equipment Suppliers"
    ],
    timeline: "Profile creation takes 2-4 days. Catalog approval and vendor assessment (if required) can take several weeks.",
    faqs: [
      { q: "Is GST mandatory for GeM registration?", a: "Yes, GSTIN is generally required to register as a seller on GeM." },
      { q: "What is Caution Money on GeM?", a: "It's a security deposit required to ensure seller discipline, varying based on your turnover." },
      { q: "Do MSMEs get exemptions on GeM?", a: "Yes, registered MSMEs may get exemptions from certain criteria like prior experience and turnover, and may be exempt from Vendor Assessment." },
      { q: "What is Vendor Assessment?", a: "It's a process conducted by QCI to verify the credentials and manufacturing capacity of the seller, required for certain product categories." },
      { q: "Can traders list products on GeM?", a: "Yes, authorized resellers and traders can list products by getting brand authorization." }
    ]
  },
  "company-registration": {
    slug: "company-registration",
    title: "Company Registration",
    subtitle: "Establish a Powerful Corporate Presence",
    description: "Whether you need a Section 8 NGO, an OPC (One Person Company), or a Public Limited Company, our end-to-end company registration services lay the foundation for your enterprise.",
    heroImage: "/services/reg_company_hero.jpg",
    cardImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    overview: {
      whatItIs: "The legal process of incorporating a business entity under the Companies Act, providing it with a distinct legal identity.",
      whyImportant: "It provides legal recognition, limits personal liability, and establishes the formal structure required to operate at scale.",
      whoNeedsIt: "Founders, NGOs, foreign subsidiaries, and solo entrepreneurs seeking a formal corporate structure.",
      benefits: ["Distinct legal identity", "Perpetual succession", "Limited liability", "Easier access to formal credit"]
    },
    whatYouGet: [
      "Consultation on Entity Type Selection",
      "Name Availability Search & Reservation",
      "Digital Signature Certificate (DSC)",
      "Drafting of MoA & AoA",
      "Filing Incorporation Forms",
      "Issuance of COI, PAN & TAN"
    ],
    documents: [
      "PAN Card of Directors/Shareholders",
      "Aadhaar / Voter ID / Passport",
      "Latest Bank Statement / Utility Bill",
      "Passport-size Photographs",
      "Registered Office Address Proof",
      "NOC from Owner of Registered Office"
    ],
    process: [
      { step: "01", title: "Entity Selection", desc: "Choosing between OPC, Section 8, Public Ltd, etc." },
      { step: "02", title: "Name Approval", desc: "Reserving a unique name with the MCA." },
      { step: "03", title: "Documentation", desc: "Drafting the MoA, AoA, and obtaining DSCs." },
      { step: "04", title: "Form Filing", desc: "Submitting SPICe+ forms for incorporation." },
      { step: "05", title: "Approval", desc: "MCA verifies documents and approves incorporation." },
      { step: "06", title: "Handover", desc: "Delivering the COI, PAN, TAN, and incorporation kit." }
    ],
    idealFor: [
      "Non-Profit Organizations (Section 8)",
      "Solo Founders (OPC)",
      "Large scale enterprises (Public Ltd)",
      "Foreign companies opening Indian subsidiaries"
    ],
    timeline: "Usually 10-15 working days, subject to MCA processing times and document accuracy.",
    faqs: [
      { q: "What is a One Person Company (OPC)?", a: "An OPC allows a single entrepreneur to operate a corporate entity with limited liability protection." },
      { q: "What is a Section 8 Company?", a: "It is a company established for promoting commerce, art, science, sports, education, research, social welfare, religion, charity, or protection of environment." },
      { q: "Can a foreign national start a company in India?", a: "Yes, foreign nationals and corporate bodies can incorporate a company in India, subject to FDI guidelines." },
      { q: "What is the difference between Private and Public Limited?", a: "A Private Limited company restricts share transfer and has a limit of 200 members, whereas a Public Limited company can offer shares to the public and has no member limit." },
      { q: "Are there post-incorporation compliances?", a: "Yes, opening a bank account, depositing share capital, filing commencement of business, and appointing an auditor are immediate requirements." }
    ]
  }
};
