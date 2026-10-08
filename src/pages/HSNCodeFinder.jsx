import React, { useState, useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { AskGrowthoraModal } from '../components/AskGrowthoraModal';
import { ConsultationModal } from '../components/ConsultationModal';
import '../styles/hsnFinder.css';
import hsnHeroImage from "../assets/hsn-hero-right.png";

const hsnData = [
  { code: "8517", description: "Mobile phones and other wireless telephones", gst: 18, category: "Electronics", type: "HSN", tags: ["mobile", "phone", "smartphone", "wireless"] },
  { code: "85171200", description: "Cellular mobile telephones", gst: 18, category: "Electronics", type: "HSN", tags: ["mobile", "cellular", "telephone"] },
  { code: "85177000", description: "Parts of telephone sets and transmission apparatus", gst: 18, category: "Electronics", type: "HSN", tags: ["mobile", "parts", "telephone"] },
  { code: "84713010", description: "Portable computers and laptops", gst: 18, category: "Electronics", type: "HSN", tags: ["laptop", "computer", "notebook"] },
  { code: "85076000", description: "Lithium-ion accumulators and batteries", gst: 18, category: "Electronics", type: "HSN", tags: ["battery", "lithium"] },
  { code: "998314", description: "Information technology design and development services", gst: 18, category: "Services", type: "SAC", tags: ["software", "mobile", "application", "IT"] },
  { code: "998312", description: "Business and management consulting services", gst: 18, category: "Services", type: "SAC", tags: ["consulting", "business", "management"] },
  { code: "998361", description: "Advertising services", gst: 18, category: "Services", type: "SAC", tags: ["advertising", "marketing"] },
  { code: "1001", description: "Wheat and meslin", gst: 0, category: "Agriculture", type: "HSN", tags: ["wheat", "grain", "agriculture"] },
  { code: "1006", description: "Rice", gst: 0, category: "Food & Beverages", type: "HSN", tags: ["rice", "food", "grain"] },
  { code: "0901", description: "Coffee", gst: 5, category: "Food & Beverages", type: "HSN", tags: ["coffee", "beverage"] },
  { code: "0902", description: "Tea", gst: 5, category: "Food & Beverages", type: "HSN", tags: ["tea", "beverage"] },
  { code: "2009", description: "Fruit juices and vegetable juices", gst: 12, category: "Food & Beverages", type: "HSN", tags: ["juice", "fruit", "beverage"] },
  { code: "6109", description: "T-shirts and knitted garments", gst: 5, category: "Textiles", type: "HSN", tags: ["shirt", "tshirt", "garment", "textile"] },
  { code: "6204", description: "Women's and girls' garments", gst: 5, category: "Textiles", type: "HSN", tags: ["garment", "dress", "textile"] },
  { code: "8703", description: "Motor cars and motor vehicles", gst: 28, category: "Automotive", type: "HSN", tags: ["car", "vehicle", "automobile"] },
  { code: "8711", description: "Motorcycles and mopeds", gst: 28, category: "Automotive", type: "HSN", tags: ["bike", "motorcycle", "vehicle"] },
  { code: "3402", description: "Cleaning and chemical preparations", gst: 18, category: "Chemicals", type: "HSN", tags: ["chemical", "cleaning", "detergent"] }
];

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function HSNCodeFinder() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isAskOpen, setIsAskOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return hsnData.filter((item) => {
      const searchableText = [
        item.code,
        item.description,
        item.category,
        item.type,
        ...(item.tags || [])
      ].join(" ").toLowerCase();

      const matchesSearch = !query || searchableText.includes(query);
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const gstRates = [0, 5, 12, 18, 28];
  
  const gstChartData = useMemo(() => {
    return gstRates.map((rate) => {
      return filteredData.filter(
        (item) => Number(item.gst) === rate
      ).length;
    });
  }, [filteredData]);

  const gstData = {
    labels: ["0% GST", "5% GST", "12% GST", "18% GST", "28% GST"],
    datasets: [
      {
        data: gstChartData,
        backgroundColor: ["#FFD2B8", "#FFB17A", "#FF914D", "#FF5A0A", "#D83E00"],
        borderColor: "#ffffff",
        borderWidth: 2
      }
    ]
  };

  const categoryDistribution = useMemo(() => {
    const counts = {};
    filteredData.forEach((item) => {
      const key = item.category || "Other";
      counts[key] = (counts[key] || 0) + 1;
    });
    return counts;
  }, [filteredData]);

  const categoryLabels = Object.keys(categoryDistribution);
  const categoryValues = Object.values(categoryDistribution);

  const categoryData = {
    labels: categoryLabels,
    datasets: [
      {
        label: "Number of Codes",
        data: categoryValues,
        backgroundColor: "#FF5A0A",
        borderRadius: 8
      }
    ]
  };



  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  const showDetails = (item) => {
    setModalItem(item);
    setIsDetailsModalOpen(true);
  };

  const handleConsultationSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your consultation request has been submitted.");
    e.target.reset();
  };

  const handleFaqToggle = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="hsn-page-root">
      <Header 
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onOpenAskGrowthora={() => setIsAskOpen(true)}
      />

      {/* HERO */}
      <section className="hsnHero">
        <div className="hsnHeroInner">

          <div className="hsnHeroContent">

            <div className="hsnHeroBadge">
              <span>FREE TOOL</span>
              Find HSN/SAC Code & GST Rate Instantly
            </div>

            <h1>
              <strong>HSN</strong> Code Finder
            </h1>

            <p>
              Search HSN/SAC codes, check GST rates and get detailed
              classification information for your products and services.
            </p>

            <div className="hsnHeroFeatures">
              <div>
                <span className="heroFeatureIcon">✓</span>
                Accurate GST Rates
              </div>

              <div>
                <span className="heroFeatureIcon">◷</span>
                Latest Updates
              </div>

              <div>
                <span className="heroFeatureIcon">⌕</span>
                Easy to Search
              </div>

              <div>
                <span className="heroFeatureIcon">◆</span>
                Expert Verified
              </div>
            </div>

          </div>

          <div className="hsnHeroImage">
            <img
              src={hsnHeroImage}
              alt="HSN SAC code and GST rate search"
            />
          </div>

        </div>
      </section>

      {/* SEARCH */}
      <section className="hsn-search-section">
        <div className="hsn-container">
          <div className="hsn-search-card">
            <div className="hsn-search-row">
              <input
                className="hsn-search-input"
                type="text"
                placeholder="Search product or service (e.g. mobile, laptop, consulting...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="hsn-search-btn">
                Search
              </button>
            </div>
            <div className="hsn-categories">
              {["All", "Agriculture", "Food & Beverages", "Automotive", "Electronics", "Textiles", "Chemicals", "Services"].map(cat => (
                <button
                  key={cat}
                  className={`hsn-category-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS + FORM */}
      <section>
        <div className="hsn-container hsn-main-grid">
          {/* RESULTS */}
          <div className="hsn-card">
            <div className="hsn-card-header">
              <div>
                <h2>Search Results</h2>
                <p>
                  Showing {filteredData.length} matching HSN/SAC code{filteredData.length === 1 ? "" : "s"}
                  {searchQuery ? ` for "${searchQuery}"` : ""}
                </p>
              </div>
              <button className="hsn-clear-btn" onClick={handleClearFilters}>
                Clear Filters
              </button>
            </div>
            <div className="hsn-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>HSN/SAC Code</th>
                    <th>Description</th>
                    <th>GST Rate</th>
                    <th>Category</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center", padding: "35px", color: "#718096" }}>
                        No matching HSN/SAC codes found.
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((item) => (
                      <tr key={item.code}>
                        <td><strong>{item.code}</strong></td>
                        <td>{item.description}</td>
                        <td><span className="hsn-gst-pill">{item.gst}%</span></td>
                        <td>{item.category}</td>
                        <td>
                          <button className="hsn-view-btn" onClick={() => showDetails(item)}>
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* EXPERT FORM AND PERKS */}
          <div className="hsn-sidebar-wrapper" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="hsn-card hsn-expert-card">
              <h2>Get Expert Assistance</h2>
              <p>Still confused about the right HSN code? Our GST experts can help you.</p>
              <form onSubmit={handleConsultationSubmit}>
                <div className="hsn-form-group">
                  <label>Full Name *</label>
                  <input required type="text" placeholder="Enter your name" />
                </div>
                <div className="hsn-form-group">
                  <label>Phone Number *</label>
                  <input required type="tel" placeholder="Enter phone number" />
                </div>
                <div className="hsn-form-group">
                  <label>Business Type *</label>
                  <select required>
                    <option value="">Select business type</option>
                    <option>Manufacturer</option>
                    <option>Trader / Distributor</option>
                    <option>Service Provider</option>
                    <option>E-commerce</option>
                  </select>
                </div>
                <div className="hsn-form-group">
                  <label>Product / Service Details</label>
                  <textarea placeholder="Tell us about your product or service"></textarea>
                </div>
                <button className="hsn-form-btn">
                  Get Free Consultation →
                </button>
              </form>
            </div>
            
            <div className="hsn-expert-perks">
              <h3 className="hsn-perks-title">What You’ll Get</h3>
              <ul className="hsn-perks-list">
                <li><span className="perk-check">✓</span> Correct HSN/SAC Classification</li>
                <li><span className="perk-check">✓</span> Applicable GST Rate Guidance</li>
                <li><span className="perk-check">✓</span> GST Compliance Support</li>
              </ul>
              
              <div className="hsn-urgent-box">
                <p className="urgent-text">Need urgent help?</p>
                <button className="urgent-btn" onClick={(e) => { e.preventDefault(); setIsConsultationOpen(true); }}>
                  Talk to Our GST Expert →
                </button>
              </div>
              
              <div className="hsn-trust-text">
                Free initial consultation • No spam • Expert guidance
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE CHARTS */}
      <section>
        <div className="hsn-container hsn-analytics-grid">
          <div className="hsn-card">
            <h2 className="hsn-chart-title">GST Rate Distribution (Live)</h2>
            <div className="hsn-chart-subtitle">
              Based on {filteredData.length} current search result{filteredData.length === 1 ? "" : "s"}
            </div>
            <div className="hsn-chart-box">
              {filteredData.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 20px", color: "#718096", fontSize: "14px" }}>
                  No chart data for current search.
                </div>
              ) : (
                <Doughnut
                  data={gstData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: "65%",
                    plugins: {
                      legend: { position: "bottom" }
                    }
                  }}
                />
              )}
            </div>
          </div>
          <div className="hsn-card">
            <h2 className="hsn-chart-title">Category-wise Distribution (Live)</h2>
            <div className="hsn-chart-subtitle">
              Updates automatically from search results
            </div>
            <div className="hsn-chart-box">
              {filteredData.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 20px", color: "#718096", fontSize: "14px" }}>
                  No chart data for current search.
                </div>
              ) : (
                <Bar
                  data={categoryData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: { precision: 0 }
                      },
                      x: {
                        grid: { display: false },
                        ticks: {
                          maxRotation: 45,
                          minRotation: 45,
                          autoSkip: true,
                          font: { size: 10 }
                        }
                      }
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section>
        <div className="hsn-container hsn-benefits">
          <div className="hsn-benefit">
            <div className="hsn-benefit-icon">✓</div>
            <div>
              <h3>Accurate Classification</h3>
              <p>Find the correct HSN/SAC code for your product or service.</p>
            </div>
          </div>
          <div className="hsn-benefit">
            <div className="hsn-benefit-icon">✓</div>
            <div>
              <h3>Legal Compliance</h3>
              <p>Ensure accurate GST filing and avoid penalties.</p>
            </div>
          </div>
          <div className="hsn-benefit">
            <div className="hsn-benefit-icon">✓</div>
            <div>
              <h3>Business Benefits</h3>
              <p>Simplify invoicing and smooth business operations.</p>
            </div>
          </div>
          <div className="hsn-benefit">
            <div className="hsn-benefit-icon">✓</div>
            <div>
              <h3>Latest Updates</h3>
              <p>Stay updated with GST classification changes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section>
        <div className="hsn-container hsn-process">
          <h2>How to Find HSN Code?</h2>
          <p>Follow these simple steps to find the correct HSN/SAC code.</p>
          <div className="hsn-steps">
            <div className="hsn-step">
              <div className="hsn-step-number">1</div>
              <h3>Enter Product / Service Name</h3>
              <p>Type your product or service name in the search box.</p>
            </div>
            <div className="hsn-step">
              <div className="hsn-step-number">2</div>
              <h3>Select Category</h3>
              <p>Choose a relevant category for better results.</p>
            </div>
            <div className="hsn-step">
              <div className="hsn-step-number">3</div>
              <h3>Browse Results</h3>
              <p>Check matching HSN/SAC codes and GST rates.</p>
            </div>
            <div className="hsn-step">
              <div className="hsn-step-number">4</div>
              <h3>Verify Details</h3>
              <p>Read the complete classification details.</p>
            </div>
            <div className="hsn-step">
              <div className="hsn-step-number">5</div>
              <h3>Get Expert Help</h3>
              <p>Contact our GST experts if required.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ + CTA */}
      <section>
        <div className="hsn-container hsn-bottom-grid">
          <div>
            <h2 style={{ marginBottom: "15px" }}>Frequently Asked Questions</h2>
            {[
              { q: "What is HSN code?", a: "HSN is a classification system used to classify goods for taxation and international trade." },
              { q: "What is SAC code?", a: "SAC is used for classification of services under GST." },
              { q: "How many digits are there in HSN and SAC codes?", a: "The applicable number of digits depends on the classification and GST reporting requirements." },
              { q: "Is HSN code mandatory for all businesses?", a: "Applicability depends on GST rules, turnover and transaction type." },
              { q: "How often are HSN codes updated?", a: "Classification and GST rules may be revised periodically. Always verify current rates before filing." }
            ].map((faq, idx) => (
              <div key={idx} className={`hsn-faq-item ${openFaqIndex === idx ? 'open' : ''}`}>
                <button className="hsn-faq-question" onClick={() => handleFaqToggle(idx)}>
                  {faq.q}
                  <span>{openFaqIndex === idx ? '⌃' : '⌄'}</span>
                </button>
                <div className="hsn-faq-answer">
                  {faq.a}
                </div>
              </div>
            ))}
          </div>

          <div className="hsn-cta">
            <h2>Need Help with GST Classification?</h2>
            <p>
              Our experts can help you find the right HSN/SAC
              code for your business and ensure accurate GST
              classification.
            </p>
            <button onClick={() => setIsConsultationOpen(true)}>
              Talk to Our GST Experts →
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {/* DETAILS MODAL */}
      <div 
        className={`hsn-modal ${isDetailsModalOpen ? 'active' : ''}`}
        onClick={(e) => {
          if (e.target.className.includes('hsn-modal ')) {
            setIsDetailsModalOpen(false);
          }
        }}
      >
        <div className="hsn-modal-content">
          <div className="hsn-modal-head">
            <div>
              <h2>{modalItem?.description}</h2>
              <p style={{ color: "#718096", fontSize: "12px", marginTop: "5px" }}>
                Classification information from the current HSN/SAC dataset.
              </p>
            </div>
            <button className="hsn-close-modal" onClick={() => setIsDetailsModalOpen(false)}>
              ×
            </button>
          </div>
          <div className="hsn-modal-grid">
            <div className="hsn-modal-box">
              <small>HSN/SAC CODE</small>
              <strong>{modalItem?.code}</strong>
            </div>
            <div className="hsn-modal-box">
              <small>GST RATE</small>
              <strong>{modalItem?.gst}%</strong>
            </div>
            <div className="hsn-modal-box">
              <small>CATEGORY</small>
              <strong>{modalItem?.category}</strong>
            </div>
            <div className="hsn-modal-box">
              <small>TYPE</small>
              <strong>{modalItem?.type}</strong>
            </div>
          </div>
        </div>
      </div>

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      <AskGrowthoraModal
        isOpen={isAskOpen}
        onClose={() => setIsAskOpen(false)}
      />
    </div>
  );
}
