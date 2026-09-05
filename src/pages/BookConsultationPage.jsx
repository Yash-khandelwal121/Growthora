import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { 
  Phone, Mail, MessageSquare, CheckCircle2, ArrowRight, ArrowLeft, 
  ShieldCheck, Lock, Sparkles, Building, User, PhoneCall, HelpCircle, 
  Check, ChevronDown
} from 'lucide-react';
import { ConsultationModal } from '../components/ConsultationModal';
import { AskGrowthoraModal } from '../components/AskGrowthoraModal';

export default function BookConsultationPage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isAskOpen, setIsAskOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    companyName: '',
    businessStage: 'Pre-revenue / idea stage',
    practiceNeed: 'Finance & Funding',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="services-page-root" style={{ background: '#F8FAFC', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header 
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onOpenAskGrowthora={() => setIsAskOpen(true)}
      />

      {/* TOP HERO BREADCRUMB HEADER */}
      <section style={{ padding: '40px 0 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <button 
            type="button" 
            className="back-btn-ghost" 
            onClick={() => navigate('/')}
            style={{ marginBottom: '18px' }}
          >
            <ArrowLeft size={16} /> Back to Home
          </button>
          
          <div className="eyebrow-badge" style={{ display: 'inline-flex', marginBottom: '14px', background: 'rgba(255, 114, 0, 0.1)', color: '#FF7200', border: '1px solid rgba(255, 114, 0, 0.2)' }}>
            <Sparkles size={14} color="#FF7200" />
            <span>GROWTHORA ADVISORY PRIVATE LIMITED</span>
          </div>

          <h1 style={{ fontSize: '2.6rem', fontWeight: '800', color: '#0F172A', margin: '0 0 12px', letterSpacing: '-0.02em' }}>
            Book a Free 30-Minute Consultation
          </h1>
          <p style={{ color: '#475569', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto', lineHeight: '1.6' }}>
            Direct strategic guidance with Growthora senior partners. No obligations, no hard sell — just an actionable roadmap tailored for your business.
          </p>
        </div>
      </section>

      {/* MAIN SPLIT CONSULTATION CARD */}
      <section style={{ padding: '20px 0 80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', boxSizing: 'border-box' }}>
          
          <div style={{
            background: 'linear-gradient(135deg, #0A0F1D 0%, #0F172A 60%, #172136 100%)',
            borderRadius: '28px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 30px 90px -15px rgba(15, 23, 42, 0.35), 0 0 50px rgba(255, 114, 0, 0.06)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            overflow: 'hidden',
            color: '#FFFFFF'
          }}>
            
            {/* LEFT COLUMN: REQUEST A CONSULTATION FORM */}
            <div style={{ padding: '48px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              
              {!submitted ? (
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 114, 0, 0.15)', color: '#FF7200', border: '1px solid rgba(255, 114, 0, 0.3)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: '800', marginBottom: '16px' }}>
                    <Lock size={13} /> CONFIDENTIAL ADVISORY
                  </div>

                  <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#FFFFFF', margin: '0 0 10px', letterSpacing: '-0.02em' }}>
                    Request a consultation.
                  </h2>
                  <p style={{ color: '#CBD5E1', fontSize: '0.96rem', margin: '0 0 32px', lineHeight: '1.5' }}>
                    Fill this in and we'll confirm a time within one working day.
                  </p>

                  <form onSubmit={handleSubmit}>
                    
                    {/* FULL NAME */}
                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: '#CBD5E1', letterSpacing: '0.05em', marginBottom: '8px', textTransform: 'uppercase' }}>
                        FULL NAME *
                      </label>
                      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <User size={18} color="#94A3B8" style={{ position: 'absolute', left: '16px' }} />
                        <input
                          type="text"
                          required
                          placeholder="Your full name"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          style={{
                            width: '100%',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: '12px',
                            padding: '14px 16px 14px 48px',
                            color: '#FFFFFF',
                            fontSize: '0.95rem',
                            outline: 'none',
                            transition: 'border-color 0.2s ease'
                          }}
                        />
                      </div>
                    </div>

                    {/* PHONE & EMAIL GRID */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                      
                      {/* PHONE */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: '#CBD5E1', letterSpacing: '0.05em', marginBottom: '8px', textTransform: 'uppercase' }}>
                          PHONE *
                        </label>
                        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '12px', padding: '0 14px' }}>
                          <span style={{ fontSize: '0.88rem', fontWeight: '700', color: '#CBD5E1', paddingRight: '8px', borderRight: '1px solid rgba(255,255,255,0.15)' }}>+91</span>
                          <input
                            type="tel"
                            required
                            placeholder="98765 43210"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            style={{
                              width: '100%',
                              background: 'transparent',
                              border: 'none',
                              padding: '14px 10px',
                              color: '#FFFFFF',
                              fontSize: '0.95rem',
                              outline: 'none'
                            }}
                          />
                        </div>
                      </div>

                      {/* EMAIL */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: '#CBD5E1', letterSpacing: '0.05em', marginBottom: '8px', textTransform: 'uppercase' }}>
                          EMAIL *
                        </label>
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                          <Mail size={18} color="#94A3B8" style={{ position: 'absolute', left: '16px' }} />
                          <input
                            type="email"
                            required
                            placeholder="you@business.in"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            style={{
                              width: '100%',
                              background: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid rgba(255, 255, 255, 0.15)',
                              borderRadius: '12px',
                              padding: '14px 16px 14px 48px',
                              color: '#FFFFFF',
                              fontSize: '0.95rem',
                              outline: 'none'
                            }}
                          />
                        </div>
                      </div>

                    </div>

                    {/* COMPANY NAME */}
                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: '#CBD5E1', letterSpacing: '0.05em', marginBottom: '8px', textTransform: 'uppercase' }}>
                        COMPANY NAME (OPTIONAL)
                      </label>
                      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <Building size={18} color="#94A3B8" style={{ position: 'absolute', left: '16px' }} />
                        <input
                          type="text"
                          placeholder="Your company's full name"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          style={{
                            width: '100%',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: '12px',
                            padding: '14px 16px 14px 48px',
                            color: '#FFFFFF',
                            fontSize: '0.95rem',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>

                    {/* BUSINESS STAGE */}
                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: '#CBD5E1', letterSpacing: '0.05em', marginBottom: '8px', textTransform: 'uppercase' }}>
                        BUSINESS STAGE
                      </label>
                      <select
                        value={formData.businessStage}
                        onChange={(e) => setFormData({ ...formData, businessStage: e.target.value })}
                        style={{
                          width: '100%',
                          background: '#1E293B',
                          border: '1px solid rgba(255, 255, 255, 0.16)',
                          borderRadius: '12px',
                          padding: '14px 16px',
                          color: '#FFFFFF',
                          fontSize: '0.95rem',
                          outline: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="Pre-revenue / idea stage">Pre-revenue / idea stage</option>
                        <option value="New Business (0–1 Year)">New Business (0–1 Year)</option>
                        <option value="Early Stage (1–3 Years)">Early Stage (1–3 Years)</option>
                        <option value="Established (3+ Years)">Established (3+ Years)</option>
                      </select>
                    </div>

                    {/* WHAT DO YOU NEED HELP WITH? */}
                    <div style={{ marginBottom: '24px' }}>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: '#CBD5E1', letterSpacing: '0.05em', marginBottom: '8px', textTransform: 'uppercase' }}>
                        WHAT DO YOU NEED HELP WITH?
                      </label>
                      <select
                        value={formData.practiceNeed}
                        onChange={(e) => setFormData({ ...formData, practiceNeed: e.target.value })}
                        style={{
                          width: '100%',
                          background: '#1E293B',
                          border: '1px solid rgba(255, 255, 255, 0.16)',
                          borderRadius: '12px',
                          padding: '14px 16px',
                          color: '#FFFFFF',
                          fontSize: '0.95rem',
                          outline: 'none',
                          cursor: 'pointer',
                          marginBottom: '12px'
                        }}
                      >
                        <option value="Business Registration">01 Business Registration & Incorporation</option>
                        <option value="Finance & Funding">02 Finance & Funding (Loans, Grants & Equity)</option>
                        <option value="Certifications & Compliance">03 Certifications & ISO / FSSAI Compliance</option>
                        <option value="Branding & Marketing">04 Branding, Web & Marketing Strategy</option>
                        <option value="Legal & CA">05 Legal, Agreements & CA Support</option>
                        <option value="Operations">06 Operations, HR & CRM Systems</option>
                        <option value="MSME Benefits">07 MSME Government Subsidies & Schemes</option>
                        <option value="IPO & Capital Markets">08 IPO Advisory & SEBI / Exchange Listing</option>
                        <option value="Business Valuation">09 Business Valuation & Financial Modeling</option>
                      </select>

                      <textarea
                        rows={3}
                        placeholder="Tell us what you want to achieve: funding, registrations, compliance cleanup, or growth support..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        style={{
                          width: '100%',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: '12px',
                          padding: '14px 16px',
                          color: '#FFFFFF',
                          fontSize: '0.92rem',
                          outline: 'none',
                          resize: 'vertical',
                          fontFamily: 'inherit'
                        }}
                      />
                    </div>

                    {/* SUBMIT BUTTON + NOTE */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px' }}>
                      <button
                        type="submit"
                        style={{
                          background: 'linear-gradient(90deg, #FF7200 0%, #E05600 100%)',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '12px',
                          padding: '16px 36px',
                          fontSize: '1rem',
                          fontWeight: '800',
                          cursor: 'pointer',
                          boxShadow: '0 8px 25px rgba(255, 114, 0, 0.35)',
                          transition: 'transform 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px'
                        }}
                      >
                        <span>Book consultation</span>
                        <ArrowRight size={18} />
                      </button>

                      <span style={{ fontSize: '0.78rem', color: '#94A3B8', maxWidth: '240px', lineHeight: '1.4' }}>
                        Confidential. Our team reviews and confirms within one working day.
                      </span>
                    </div>

                  </form>
                </div>
              ) : (
                /* SUCCESS STATE */
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#10B981', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)' }}>
                    <CheckCircle2 size={36} />
                  </div>
                  <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '12px' }}>
                    Consultation Requested!
                  </h2>
                  <p style={{ color: '#CBD5E1', fontSize: '1rem', lineHeight: '1.6', marginBottom: '32px' }}>
                    Thank you, <strong>{formData.fullName}</strong>. Our senior advisory team for <strong>{formData.practiceNeed}</strong> has received your request and will confirm your meeting slot within one working day.
                  </p>
                  
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#FFFFFF',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      padding: '12px 28px',
                      fontSize: '0.95rem',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    Submit Another Request
                  </button>
                </div>
              )}

            </div>

            {/* RIGHT COLUMN: WHAT THE CALL COVERS & CONTACT */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '48px 40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              
              <div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#FFFFFF', margin: '0 0 28px', letterSpacing: '-0.01em' }}>
                  What the call covers.
                </h3>

                {/* 3 NUMBERED STEPS */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
                  
                  {/* Step 01 */}
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#FF7200', flexShrink: 0, marginTop: '2px' }}>
                      01
                    </span>
                    <p style={{ color: '#E2E8F0', fontSize: '0.93rem', margin: 0, lineHeight: '1.5' }}>
                      Bring your latest bank statements, turnover numbers, and any existing loan documents.
                    </p>
                  </div>

                  {/* Step 02 */}
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#FF7200', flexShrink: 0, marginTop: '2px' }}>
                      02
                    </span>
                    <p style={{ color: '#E2E8F0', fontSize: '0.93rem', margin: 0, lineHeight: '1.5' }}>
                      Tell us what you want to achieve: funding, registrations, compliance cleanup, or growth support.
                    </p>
                  </div>

                  {/* Step 03 */}
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#FF7200', flexShrink: 0, marginTop: '2px' }}>
                      03
                    </span>
                    <p style={{ color: '#E2E8F0', fontSize: '0.93rem', margin: 0, lineHeight: '1.5' }}>
                      We map the route, tell you what is realistic, and outline the documents required.
                    </p>
                  </div>

                </div>

                {/* Free call guarantee subtext */}
                <p style={{ color: '#CBD5E1', fontSize: '0.84rem', lineHeight: '1.5', margin: '0 0 32px', fontStyle: 'italic', background: 'rgba(255, 255, 255, 0.04)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  The 30-minute first call is free. You walk away with a written route, even if you don't choose to engage the team further.
                </p>

                {/* 2x2 STATS GRID */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '36px' }}>
                  <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ fontWeight: '800', fontSize: '1.4rem', color: '#FF7200' }}>97%</div>
                    <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '2px' }}>Funding success rate</div>
                  </div>

                  <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ fontWeight: '800', fontSize: '1.4rem', color: '#FF7200' }}>2,173+</div>
                    <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '2px' }}>Businesses supported</div>
                  </div>

                  <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ fontWeight: '800', fontSize: '1.4rem', color: '#10B981' }}>₹19Cr+</div>
                    <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '2px' }}>Funding facilitated</div>
                  </div>

                  <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ fontWeight: '800', fontSize: '1.4rem', color: '#38BDF8' }}>30 min</div>
                    <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '2px' }}>Free first call</div>
                  </div>
                </div>
              </div>

              {/* DIRECT CONTACT SECTION */}
              <div style={{ borderTop: '1px dashed rgba(255, 255, 255, 0.15)', paddingTop: '24px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#FF7200', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
                  PREFER TO TALK FIRST?
                </span>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  
                  {/* CALL US */}
                  <a 
                    href="tel:+919005427979" 
                    style={{ display: 'flex', alignItems: 'center', gap: '14px', color: '#FFFFFF', textDecoration: 'none', transition: 'opacity 0.2s' }}
                  >
                    <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255, 114, 0, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF7200', flexShrink: 0 }}>
                      <Phone size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase' }}>CALL US</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: '700' }}>+91 90054 27979</div>
                    </div>
                  </a>

                  {/* EMAIL US */}
                  <a 
                    href="mailto:info@growthora.co.in" 
                    style={{ display: 'flex', alignItems: 'center', gap: '14px', color: '#FFFFFF', textDecoration: 'none', transition: 'opacity 0.2s' }}
                  >
                    <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255, 114, 0, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF7200', flexShrink: 0 }}>
                      <Mail size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase' }}>EMAIL US</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: '700' }}>info@growthora.co.in</div>
                    </div>
                  </a>

                  {/* WHATSAPP */}
                  <a 
                    href="https://wa.me/919005427979" 
                    target="_blank" 
                    rel="noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '14px', color: '#FFFFFF', textDecoration: 'none', transition: 'opacity 0.2s' }}
                  >
                    <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22C55E', flexShrink: 0 }}>
                      <MessageSquare size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase' }}>WHATSAPP</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#22C55E' }}>Message us directly</div>
                    </div>
                  </a>

                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* WHY FOUNDERS TRUST GROWTHORA FIRST CALLS */}
      <section style={{ padding: '60px 0 80px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          
          <div className="section-header text-center" style={{ marginBottom: '40px' }}>
            <h2 className="section-title">Why Founders Value Our Initial Consultation</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            
            <div style={{ background: '#F8FAFC', padding: '28px', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#FFF7ED', color: '#FF7200', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', border: '1px solid rgba(255, 114, 0, 0.2)' }}>
                <ShieldCheck size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>Zero Hard Sell</h3>
              <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: '1.5', margin: 0 }}>
                We believe in objective guidance. If a government grant or funding round is realistic for your stage, we tell you exactly how. If not, we outline the prep needed.
              </p>
            </div>

            <div style={{ background: '#F8FAFC', padding: '28px', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#FFF7ED', color: '#FF7200', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', border: '1px solid rgba(255, 114, 0, 0.2)' }}>
                <CheckCircle2 size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>Written Action Plan</h3>
              <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: '1.5', margin: 0 }}>
                At the end of the call, you walk away with a written roadmap outlining required documents, timelines, eligibility criteria, and clear next steps.
              </p>
            </div>

            <div style={{ background: '#F8FAFC', padding: '28px', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#FFF7ED', color: '#FF7200', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', border: '1px solid rgba(255, 114, 0, 0.2)' }}>
                <PhoneCall size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>Senior Partner Led</h3>
              <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: '1.5', margin: 0 }}>
                You speak directly with domain experts in MSME schemes, corporate legal, funding, and IPO execution — not junior call center representatives.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* FAQS SECTION */}
      <section style={{ padding: '80px 0', background: '#F8FAFC' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
          
          <div className="section-header text-center" style={{ marginBottom: '40px' }}>
            <h2 className="section-title">Consultation FAQs</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { q: "Is the first 30-minute consultation call completely free?", a: "Yes. The initial 30-minute consultation is 100% free with zero obligation to hire our advisory team." },
              { q: "What documents should I keep handy for the call?", a: "Having your latest bank statements, GST registration, turnover numbers, and any current loan/incorporation documents helps us give you exact eligibility advice." },
              { q: "How soon will I get a confirmation after submitting the form?", a: "Our senior advisory team reviews your request and confirms your meeting slot within one working day via email / WhatsApp." },
              { q: "Can I discuss multiple services in a single call?", a: "Yes. Growthora is an integrated practice covering Funding, MSME Benefits, Compliance, Legal & CA, IPO, and Operations in one place." }
            ].map((faq, idx) => (
              <div key={idx} style={{ background: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '20px' }}>
                <div 
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: '700', fontSize: '1.02rem', color: '#0F172A' }}
                >
                  <span>{faq.q}</span>
                  {openFaqIndex === idx ? <ChevronDown size={20} color="#FF7200" style={{ transform: 'rotate(180deg)', transition: '0.2s' }} /> : <ChevronDown size={20} color="#64748B" />}
                </div>
                {openFaqIndex === idx && (
                  <p style={{ color: '#475569', fontSize: '0.92rem', marginTop: '12px', margin: '12px 0 0', lineHeight: '1.6' }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      <Footer />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        selectedService={{ title: 'Direct Strategic Consultation', category: 'GENERAL ADVISORY' }}
      />

      <AskGrowthoraModal
        isOpen={isAskOpen}
        onClose={() => setIsAskOpen(false)}
      />
    </div>
  );
}
