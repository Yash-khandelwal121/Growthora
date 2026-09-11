import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const KNOWLEDGE_DIR = path.join(__dirname, 'knowledge');
if (!fs.existsSync(KNOWLEDGE_DIR)) {
  fs.mkdirSync(KNOWLEDGE_DIR);
}

function writeMd(filename, content) {
  fs.writeFileSync(path.join(KNOWLEDGE_DIR, filename), content.trim() + '\n', 'utf8');
}

async function buildKnowledgeBase() {
  console.log('Building Growthora Knowledge Base...');

  try {
    // 1. Company
    const aboutData = `**Keywords:** company, about, overview, who, team, growthora, founder, services
# Growthora Advisory Private Limited
Growthora Advisory Private Limited is a premium business advisory firm based in India. We help businesses, MSMEs, and startups scale, remain compliant, and access necessary funding.
Our holistic approach unifies complex advisory services:
- **Registration**: Company Setup, MSME Udyam, FSSAI, ISO, GeM
- **Finance & Funding**: Grants, Debt, Equity, Startup India Seed Fund, Government Schemes
- **Legal & CA**: Audits, IP (Trademark/Patent), Compliances
- **Branding & Operations**: Market positioning and backend operational setups
- **MSME Support**: Specialized focus on MSME benefits, loan subsidies, and state incentives
- **Valuation & IPO**: Independent valuations, financial modeling, and end-to-end IPO support

**Contact Information**: Please refer to the website for direct office information.
`;
    writeMd('company.md', aboutData);

    // 2. Services
    const { SERVICES_DATA } = await import('./src/data/servicesData.js');
    let servicesMd = `**Keywords:** services, kya karta hai, help, provide, list\n# Growthora Services Overview\n\n`;
    SERVICES_DATA.forEach(s => {
      servicesMd += `## ${s.title}\n`;
      servicesMd += `**Category:** ${s.category}\n`;
      servicesMd += `${s.description}\n\n`;
      if (s.idealFor) servicesMd += `**Ideal For:**\n- ${s.idealFor.join('\n- ')}\n\n`;
      if (s.included) servicesMd += `**Included Services:**\n- ${s.included.join('\n- ')}\n\n`;
      if (s.timeline) servicesMd += `**Timeline:** ${s.timeline}\n\n`;
    });
    writeMd('services.md', servicesMd);

    // 3. Funding
    const { FINANCE_FUNDING_DATA } = await import('./src/data/financeFundingData.js');
    let fundingMd = `**Keywords:** fund, funding, loan, grant, subsidy, equity, debt, paisa, scheme\n# Growthora Finance & Funding Solutions\n\n`;
    Object.keys(FINANCE_FUNDING_DATA).forEach(categoryKey => {
      const categoryObj = FINANCE_FUNDING_DATA[categoryKey];
      Object.keys(categoryObj).forEach(key => {
        const fd = categoryObj[key];
        fundingMd += `## ${fd.title}\n${fd.description}\n\n`;
        if (fd.overview) {
          fundingMd += `**What it is:** ${fd.overview.whatItIs || ''}\n`;
          fundingMd += `**Why Important:** ${fd.overview.whyImportant || ''}\n`;
          fundingMd += `**Who Needs it:** ${fd.overview.whoNeedsIt || ''}\n\n`;
        }
        if (fd.whatYouGet) {
           fundingMd += `**What you get:**\n- ${fd.whatYouGet.join('\n- ')}\n\n`;
        }
      });
    });
    fundingMd += `\n> **Funding Assessment**: If a business is seeking funding, Growthora provides a formal Funding Assessment to determine eligibility for Grants, Debt (Business Loans), or Equity. Recommend they click the 'Start Funding Assessment' button.\n`;
    writeMd('funding.md', fundingMd);

    // 4. MSME & Govt Schemes
    const { MSME_DATA } = await import('./src/data/msmeData.js');
    let msmeMd = `**Keywords:** msme, udyam, scheme, government, subsidy, scale\n# Growthora MSME & Government Schemes\n\n`;
    Object.keys(MSME_DATA).forEach(categoryKey => {
      const categoryObj = MSME_DATA[categoryKey];
      Object.keys(categoryObj).forEach(key => {
        const ms = categoryObj[key];
        msmeMd += `## ${ms.title}\n${ms.description}\n\n`;
        if (ms.overview) {
          msmeMd += `**What it is:** ${ms.overview.whatItIs || ''}\n`;
          msmeMd += `**Who Needs it:** ${ms.overview.whoNeedsIt || ''}\n\n`;
        }
        if (ms.whatYouGet) msmeMd += `**Benefits / What you get:**\n- ${ms.whatYouGet.join('\n- ')}\n\n`;
      });
    });
    writeMd('msme-government-schemes.md', msmeMd);

    // 5. Registrations & Compliance
    const { LEGAL_CA_DATA } = await import('./src/data/legalCaData.js');
    const { CERTIFICATION_DATA } = await import('./src/data/certificationData.js');
    let regMd = `**Keywords:** registration, compliance, gst, audit, ipo, trademark, fssai, iso, gem, pvt ltd, llp, proprietorship, company\n# Growthora Registrations & Compliance\n\n`;
    [LEGAL_CA_DATA, CERTIFICATION_DATA].forEach(dataObj => {
      Object.keys(dataObj).forEach(categoryKey => {
        const categoryObj = dataObj[categoryKey];
        Object.keys(categoryObj).forEach(key => {
          const item = categoryObj[key];
          regMd += `## ${item.title}\n${item.description}\n\n`;
          if (item.overview) {
             regMd += `**What it is:** ${item.overview.whatItIs || ''}\n`;
             regMd += `**Why Important:** ${item.overview.whyImportant || ''}\n`;
             regMd += `**Who Needs it:** ${item.overview.whoNeedsIt || ''}\n\n`;
          }
          if (item.whatYouGet) regMd += `**What you get:**\n- ${item.whatYouGet.join('\n- ')}\n\n`;
        });
      });
    });
    writeMd('registrations-compliance.md', regMd);

    // 6. Industries
    const { INDUSTRIES_DATA } = await import('./src/data/industriesData.js');
    let indMd = `**Keywords:** industry, agriculture, manufacturing, kheti, kisan, factory, sector\n# Growthora Supported Industries\n\n`;
    INDUSTRIES_DATA.forEach(ind => {
      indMd += `## ${ind.title}\n${ind.description}\n\n`;
      if (ind.stats) {
        indMd += `**Industry Scope:**\n`;
        ind.stats.forEach(s => indMd += `- ${s.label}: ${s.value}\n`);
        indMd += `\n`;
      }
    });
    writeMd('industries.md', indMd);

    // 7. IPO & Valuation
    const { IPO_SERVICES_DATA } = await import('./src/data/ipoData.js');
    const { VALUATION_SERVICES_DATA } = await import('./src/data/valuationData.js');
    let ipoMd = `**Keywords:** ipo, valuation, value, share, market, listing, sme ipo, bse, nse\n# Growthora IPO & Valuation Advisory\n\n`;
    [IPO_SERVICES_DATA, VALUATION_SERVICES_DATA].forEach(dataObj => {
      Object.keys(dataObj).forEach(categoryKey => {
        const categoryObj = dataObj[categoryKey];
        Object.keys(categoryObj).forEach(key => {
          const item = categoryObj[key];
          ipoMd += `## ${item.title}\n${item.description}\n\n`;
          if (item.overview) {
             ipoMd += `**What it is:** ${item.overview.whatItIs || ''}\n`;
             ipoMd += `**Why Important:** ${item.overview.whyImportant || ''}\n`;
             ipoMd += `**Who Needs it:** ${item.overview.whoNeedsIt || ''}\n\n`;
          }
          if (item.whatYouGet) ipoMd += `**What you get:**\n- ${item.whatYouGet.join('\n- ')}\n\n`;
        });
      });
    });
    writeMd('ipo-valuation.md', ipoMd);

    console.log('Knowledge Base built successfully!');

  } catch (error) {
    console.error('Error building knowledge base:', error);
  }
}

buildKnowledgeBase();
