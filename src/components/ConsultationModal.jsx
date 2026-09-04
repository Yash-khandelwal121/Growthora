import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Calendar, Clock, Building, User, Mail, Phone, Send } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';

export const ConsultationModal = ({ isOpen, onClose, selectedService }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    companyName: '',
    serviceId: selectedService && selectedService.id ? selectedService.id : '01',
    businessStage: 'Early Stage / Startup',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      if (selectedService && selectedService.id) {
        setFormData((prev) => ({ ...prev, serviceId: selectedService.id }));
      }
    }
  }, [isOpen, selectedService]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {!submitted ? (
          <>
            <div className="modal-header">
              <span className="modal-eyebrow">GROWTHORA ADVISORY</span>
              <h2 className="modal-title">Book a Free Consultation</h2>
              <p className="modal-sub">
                {selectedService
                  ? `Discussing: ${selectedService.title}`
                  : 'Connect with a senior advisor for a zero-obligation structured roadmap.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group-grid">
                <div className="form-field">
                  <label htmlFor="fullName"><User size={14} /> Full Name *</label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    placeholder="e.g. Rajesh Kumar"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="phone"><Phone size={14} /> Phone Number *</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group-grid">
                <div className="form-field">
                  <label htmlFor="email"><Mail size={14} /> Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="rajesh@company.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="companyName"><Building size={14} /> Company / Entity Name</label>
                  <input
                    id="companyName"
                    type="text"
                    placeholder="e.g. Acme Tech Pvt Ltd"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group-grid">
                <div className="form-field">
                  <label htmlFor="serviceId">Primary Advisory Practice</label>
                  <select
                    id="serviceId"
                    value={formData.serviceId}
                    onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                  >
                    {SERVICES_DATA.map((srv) => (
                      <option key={srv.id} value={srv.id}>
                        {srv.num} - {srv.category} ({srv.navLabel})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="businessStage">Business Stage</label>
                  <select
                    id="businessStage"
                    value={formData.businessStage}
                    onChange={(e) => setFormData({ ...formData, businessStage: e.target.value })}
                  >
                    <option>Idea / Pre-incorporation</option>
                    <option>Early Stage / Startup</option>
                    <option>Growth MSME (₹1Cr - ₹10Cr)</option>
                    <option>Mature Enterprise (₹10Cr+)</option>
                    <option>Preparing for IPO / Capital Raise</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="notes">How can our advisors best help you?</label>
                <textarea
                  id="notes"
                  rows="3"
                  placeholder="Share details about your filing, scheme requirement, or capital objective..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <button type="submit" className="btn-modal-submit">
                <span>Confirm Consultation Booking</span>
                <Send size={16} />
              </button>

              <p className="modal-privacy-note">
                🔒 Your business details are strictly confidential under Growthora Advisory NDA principles.
              </p>
            </form>
          </>
        ) : (
          <div className="modal-success-state animate-scale-up">
            <CheckCircle2 size={56} className="success-icon" />
            <h3 className="success-title">Consultation Requested!</h3>
            <p className="success-desc">
              Thank you <strong>{formData.fullName}</strong>. A Growthora Senior Advisor will review your entity requirements and reach out within 4 business hours at <strong>{formData.phone}</strong>.
            </p>
            <button
              type="button"
              className="btn-modal-submit"
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
