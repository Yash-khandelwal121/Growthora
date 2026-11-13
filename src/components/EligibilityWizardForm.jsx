import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FiArrowLeft, FiArrowRight, FiCheck } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import api, { apiError, getData, track, visitorId } from '../lib/api';
import FileUploader from './FileUploader';

export const intakeSchema = z.object({
  clientName: z.string().trim().min(2, 'Enter your name'),
  businessName: z.string().max(150),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Enter a valid email').or(z.literal('')),
  entityType: z.string().min(1, 'Choose an entity type'),
  businessStage: z.string().min(1, 'Choose your business stage'),
  promoterCategory: z.string().min(1, 'Choose a promoter category'),
  sector: z.string().min(1, 'Choose a sector'),
  state: z.string().min(1, 'Choose a state or union territory'),
  district: z.string().max(100),
  fundingPurpose: z.string().min(1, 'Choose a funding purpose'),
  udyam: z.enum(['Yes', 'No']),
  dpiit: z.enum(['Yes', 'No']),
  gst: z.enum(['Yes', 'No']),
  iec: z.enum(['Yes', 'No']),
  gem: z.enum(['Yes', 'No']),
  fssai: z.enum(['Yes', 'No']),
  businessAge: z.number().min(0, 'Enter 0 or more years'),
  annualTurnover: z.number().min(0, 'Enter 0 or more'),
  projectCost: z.number().min(0, 'Enter 0 or more'),
  website: z.string().max(300),
  social: z.object({
    instagram: z.string().max(300),
    facebook: z.string().max(300),
    linkedin: z.string().max(300),
    youtube: z.string().max(300),
    x: z.string().max(300)
  }),
  documents: z.array(z.string()),
  consent: z.literal(true, { errorMap: () => ({ message: 'Consent is required to prepare your assessment.' }) }),
});

export const blank = {
  clientName: '',
  businessName: '',
  mobile: '',
  email: '',
  entityType: '',
  businessStage: '',
  promoterCategory: '',
  sector: '',
  state: '',
  district: '',
  fundingPurpose: '',
  udyam: 'No',
  dpiit: 'No',
  gst: 'No',
  iec: 'No',
  gem: 'No',
  fssai: 'No',
  businessAge: 0,
  annualTurnover: 0,
  projectCost: 0,
  website: '',
  social: { instagram: '', facebook: '', linkedin: '', youtube: '', x: '' },
  documents: [],
  consent: false,
};

export const stepFields = [
  ['clientName', 'businessName', 'mobile', 'email', 'entityType', 'businessStage'],
  ['promoterCategory', 'sector', 'state', 'district', 'fundingPurpose'],
  ['udyam', 'dpiit', 'gst', 'iec', 'gem', 'fssai'],
  ['businessAge', 'annualTurnover', 'projectCost'],
  ['website', 'social.instagram', 'social.facebook', 'social.linkedin', 'social.youtube', 'social.x'],
  ['consent'],
];

export const steps = [
  'Your business',
  'Profile & location',
  'Registrations',
  'Financials',
  'Digital presence',
  'Review & submit'
];

export const fallback = {
  entityType: ['Individual', 'Proprietorship', 'Partnership', 'LLP', 'Private Limited', 'Trust/Society', 'SHG/FPO', 'Cooperative'],
  businessStage: ['Idea', 'New', 'Existing', 'Growth'],
  promoterCategory: ['General', 'Women', 'SC', 'ST', 'Minority', 'Artisan', 'Farmer/FPO', 'Startup Founder'],
  sector: ['General', 'Manufacturing', 'Services', 'Technology', 'Food Processing', 'Agri', 'Textile', 'Pharma/MedTech', 'Electronics', 'Export'],
  fundingPurpose: ['Grant', 'Subsidy', 'Loan', 'Working Capital', 'Capex', 'Export', 'Procurement', 'Certification', 'Innovation'],
  state: [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
    'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands',
    'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh',
    'Lakshadweep', 'Puducherry'
  ],
};

function FormField({ label, error, children, required = false }) {
  return (
    <label className="ss-form-field">
      <span className="ss-form-label">
        {label}
        {required && <span className="ss-required-mark">*</span>}
      </span>
      {children}
      {error && <small className="ss-field-error">{error}</small>}
    </label>
  );
}

export default function EligibilityWizardForm({
  heading = 'Check Your Business Eligibility',
  subheading = 'Find the right government funding scheme and support for your business with Growthora Advisory.',
  showBadge = true,
  className = ''
}) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [lookups, setLookups] = useState(fallback);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    trigger,
    getFieldState,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    watch,
    reset
  } = useForm({
    resolver: zodResolver(intakeSchema),
    defaultValues: blank
  });

  useEffect(() => {
    void getData('/public/lookups').then(setLookups).catch(() => undefined);
    void track('eligibility_started', '/check').catch(() => undefined);
    const saved = localStorage.getItem('growthora.eligibilityDraft');
    if (saved) {
      try {
        reset({ ...blank, ...JSON.parse(saved) });
      } catch {
        localStorage.removeItem('growthora.eligibilityDraft');
      }
    }
    const subscription = watch((values) =>
      localStorage.setItem('growthora.eligibilityDraft', JSON.stringify(values))
    );
    return () => subscription.unsubscribe();
  }, [reset, watch]);

  async function nextStep() {
    if (await trigger(stepFields[step])) {
      const next = Math.min(step + 1, steps.length - 1);
      setStep(next);
      void track('wizard_step', '/check', { step: next + 1, name: steps[next] }).catch(() => undefined);
    }
  }

  async function submit(values) {
    setSubmitError('');
    try {
      const result = await api.post('/public/submissions', { ...values, visitorId: visitorId() });
      localStorage.removeItem('growthora.eligibilityDraft');
      navigate(`/report/${result.data.data.shareToken}`);
    } catch (error) {
      setSubmitError(apiError(error));
    }
  }

  function renderSelectField(name, label, key, placeholder, required = true) {
    const error = getFieldState(name).error?.message;
    return (
      <FormField label={label} error={error} required={required}>
        <div className="ss-select-wrap">
          <select {...register(name)} defaultValue="">
            <option value="" disabled>{placeholder}</option>
            {(lookups[key] || fallback[key] || []).map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </FormField>
    );
  }

  function renderRegistrationField(name, title, detail) {
    return (
      <div className="ss-reg-item" key={name}>
        <div className="ss-reg-info">
          <strong>{title}</strong>
          <span>{detail}</span>
        </div>
        <div className="ss-segmented-control">
          <label>
            <input type="radio" value="Yes" {...register(name)} />
            <span>Yes</span>
          </label>
          <label>
            <input type="radio" value="No" {...register(name)} />
            <span>No</span>
          </label>
        </div>
      </div>
    );
  }

  const documents = watch('documents');

  return (
    <div className={`ss-elig-form-wrapper ${className}`}>
      {/* 30-Minute Free Consultation Circular Badge */}
      {showBadge && (
        <div className="ss-form-badge" aria-label="30 Minute Free Consultation">
          <b>30</b>
          <span>Minute Free<br />Consultation</span>
        </div>
      )}

      <div className="ss-elig-card">
        {/* Form Header */}
        <div className="ss-elig-card-header">
          <h3 className="ss-elig-form-title">{heading}</h3>
          <p className="ss-elig-form-desc">{subheading}</p>
        </div>

        {/* Progress & Step Indicator */}
        <div className="ss-form-progress-bar">
          <div className="ss-step-label-row">
            <span className="ss-step-indicator">
              STEP 0{step + 1} / 06 · <b>{steps[step]}</b>
            </span>
          </div>
          <div className="ss-progress-track">
            <div
              className="ss-progress-fill"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Container */}
        <form className="ss-elig-form-body" onSubmit={handleSubmit(submit)} noValidate>
          {/* STEP 1: Your Business */}
          {step === 0 && (
            <div className="ss-form-grid">
              <FormField label="Your name" error={errors.clientName?.message} required>
                <input
                  {...register('clientName')}
                  placeholder="Full name"
                  autoComplete="name"
                />
              </FormField>

              <FormField label="Business name" error={errors.businessName?.message}>
                <input
                  {...register('businessName')}
                  placeholder="Registered or working name"
                />
              </FormField>

              <FormField label="Mobile number" error={errors.mobile?.message} required>
                <input
                  {...register('mobile')}
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="10-digit Indian number"
                  autoComplete="tel-national"
                />
              </FormField>

              <FormField label="Email address" error={errors.email?.message}>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="you@business.com"
                  autoComplete="email"
                />
              </FormField>

              {renderSelectField('entityType', 'Entity type', 'entityType', 'Choose entity type', true)}
              {renderSelectField('businessStage', 'Business stage', 'businessStage', 'Choose stage', true)}
            </div>
          )}

          {/* STEP 2: Profile & Location */}
          {step === 1 && (
            <div className="ss-form-grid">
              {renderSelectField('promoterCategory', 'Promoter category', 'promoterCategory', 'Choose category', true)}
              {renderSelectField('sector', 'Primary sector', 'sector', 'Choose sector', true)}
              {renderSelectField('state', 'State / union territory', 'state', 'Choose location', true)}

              <FormField label="District" error={errors.district?.message}>
                <input
                  {...register('district')}
                  placeholder="District"
                />
              </FormField>

              <div className="ss-grid-full">
                {renderSelectField('fundingPurpose', 'Funding purpose', 'fundingPurpose', 'Choose purpose', true)}
              </div>
            </div>
          )}

          {/* STEP 3: Registrations */}
          {step === 2 && (
            <div className="ss-reg-list">
              {renderRegistrationField('udyam', 'Udyam registration', 'MSME registration status')}
              {renderRegistrationField('dpiit', 'DPIIT recognition', 'Startup India recognition status')}
              {renderRegistrationField('gst', 'GST registration', 'GSTIN status')}
              {renderRegistrationField('iec', 'Import Export Code', 'IEC for export activity')}
              {renderRegistrationField('gem', 'GeM registration', 'Government e-Marketplace')}
              {renderRegistrationField('fssai', 'FSSAI / sector licence', 'Food or other sector licence')}
            </div>
          )}

          {/* STEP 4: Financials */}
          {step === 3 && (
            <div className="ss-form-grid">
              <FormField label="Business age (years)" error={errors.businessAge?.message}>
                <input
                  {...register('businessAge', { valueAsNumber: true })}
                  type="number"
                  min="0"
                  step="1"
                />
              </FormField>

              <FormField label="Annual turnover (₹)" error={errors.annualTurnover?.message}>
                <input
                  {...register('annualTurnover', { valueAsNumber: true })}
                  type="number"
                  min="0"
                  step="1000"
                />
              </FormField>

              <div className="ss-grid-full">
                <FormField label="Project cost / funding need (₹)" error={errors.projectCost?.message}>
                  <input
                    {...register('projectCost', { valueAsNumber: true })}
                    type="number"
                    min="0"
                    step="1000"
                  />
                </FormField>
                <p className="ss-form-hint">
                  Use your estimated project cost or funding need. This is assessed separately from annual turnover.
                </p>
              </div>
            </div>
          )}

          {/* STEP 5: Digital Presence */}
          {step === 4 && (
            <div className="ss-form-grid">
              <div className="ss-grid-full">
                <FormField label="Business website" error={errors.website?.message}>
                  <input
                    {...register('website')}
                    type="url"
                    placeholder="https://yourbusiness.in"
                  />
                </FormField>
              </div>

              {['instagram', 'facebook', 'linkedin', 'youtube', 'x'].map((platform) => (
                <FormField
                  key={platform}
                  label={platform === 'x' ? 'X' : platform[0].toUpperCase() + platform.slice(1)}
                  error={errors.social?.[platform]?.message}
                >
                  <input
                    {...register(`social.${platform}`)}
                    type="url"
                    placeholder={`https://${platform}.com/...`}
                  />
                </FormField>
              ))}

              <div className="ss-grid-full ss-upload-wrap">
                <p className="ss-upload-title">
                  Supporting documents <span>Optional</span>
                </p>
                <FileUploader
                  value={documents}
                  onChange={(ids) => setValue('documents', ids, { shouldDirty: true })}
                />
              </div>
            </div>
          )}

          {/* STEP 6: Review & Submit */}
          {step === 5 && (
            <div className="ss-review-panel">
              <p className="ss-review-intro">
                We’ll use these details to compare your profile with currently published schemes. The result is guidance, not an approval or guarantee of funding.
              </p>

              <div className="ss-review-summary">
                <div className="ss-review-item">
                  <span>Business</span>
                  <strong>{getValues('businessName') || getValues('clientName') || 'Your business'}</strong>
                </div>
                <div className="ss-review-item">
                  <span>Location</span>
                  <strong>{[getValues('district'), getValues('state')].filter(Boolean).join(', ') || 'Not provided'}</strong>
                </div>
                <div className="ss-review-item">
                  <span>Funding purpose</span>
                  <strong>{getValues('fundingPurpose') || 'Not provided'}</strong>
                </div>
                <div className="ss-review-item">
                  <span>Documents</span>
                  <strong>{documents.length ? `${documents.length} attached` : 'None attached'}</strong>
                </div>
              </div>

              <label className="ss-consent-check">
                <input type="checkbox" {...register('consent')} />
                <span>
                  I agree that Growthora may use these details to prepare my assessment and contact me about relevant support.
                </span>
              </label>
              {errors.consent?.message && (
                <small className="ss-field-error" style={{ display: 'block', marginTop: '6px' }}>
                  {errors.consent.message}
                </small>
              )}
            </div>
          )}

          {/* Submission Error Banner */}
          {submitError && (
            <p className="ss-notice-error" role="alert">
              {submitError}
            </p>
          )}

          {/* Action Buttons */}
          <div className="ss-form-actions">
            {step > 0 ? (
              <button
                className="ss-btn-back"
                type="button"
                onClick={() => setStep((current) => current - 1)}
              >
                <FiArrowLeft size={15} />
                <span>Back</span>
              </button>
            ) : (
              <span />
            )}

            {step < steps.length - 1 ? (
              <button
                className="ss-btn-continue"
                type="button"
                onClick={() => void nextStep()}
              >
                <span>Continue</span>
                <FiArrowRight size={15} />
              </button>
            ) : (
              <button
                className="ss-btn-submit"
                type="submit"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? 'Preparing assessment…' : 'Get my assessment'}</span>
                <FiArrowRight size={15} />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

