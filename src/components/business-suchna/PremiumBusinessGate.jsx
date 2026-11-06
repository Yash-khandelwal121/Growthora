import React, { useState, useRef } from 'react';
import GateDecorations from './GateDecorations';
import './PremiumBusinessGate.css';

function BusinessIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="8" y="27" width="7" height="13" rx="3" fill="currentColor" />
      <rect x="20" y="19" width="7" height="21" rx="3" fill="currentColor" />
      <rect x="32" y="9" width="7" height="31" rx="3" fill="currentColor" />
    </svg>
  );
}

function SuchnaIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M13 5h17l8 8v29H13z" />
      <path d="M30 5v9h8" />
      <circle cx="24" cy="27" r="6" />
      <path d="m28.5 31.5 5 5" />
    </svg>
  );
}

export default function PremiumBusinessGate({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const gateRef = useRef(null);

  const openGate = () => {
    setIsOpen(true);
  };

  const closeGate = () => {
    setIsOpen(false);
  };

  return (
    <div
      ref={gateRef}
      className={`premium-gate ${isOpen ? 'premium-gate--open' : ''}`}
      onMouseEnter={(event) => {
        if (
          event.pointerType === undefined ||
          (typeof window !== 'undefined' &&
            window.matchMedia('(hover: hover) and (pointer: fine)').matches)
        ) {
          openGate();
        }
      }}
    >
      {/* Accessible Control / Mobile Toggle Pill */}
      <div className="premium-gate__control-bar">
        <button
          type="button"
          className="premium-gate__toggle"
          onClick={() => {
            if (isOpen) {
              closeGate();
            } else {
              openGate();
            }
          }}
          aria-expanded={isOpen}
          aria-controls="premium-gate-form"
        >
          {isOpen ? 'Close Gate' : 'Open Business Suchna'}
        </button>
      </div>

      <div className="premium-gate__scene">
        {/* Layered Architectural Archway */}
        <div className="premium-gate__arch">
          
          {/* Luminous Inner Sanctuary Alcove */}
          <div className="premium-gate__interior">
            <div className="premium-gate__glow" />

            {/* Revealed Functional MSME Form */}
            <div
              id="premium-gate-form"
              className="premium-gate__form"
              inert={!isOpen ? true : undefined}
            >
              {children}
            </div>
          </div>

          {/* 3D Double Doors System */}
          <div className="premium-gate__doors">
            
            {/* Left Door — "Business" */}
            <div className="premium-gate__door premium-gate__door--left">
              <div className="premium-gate__door-surface">
                
                {/* Upper Recessed Panel */}
                <div className="premium-gate__upper-panel">
                  <div className="premium-gate__icon">
                    <BusinessIcon />
                  </div>
                  <span>Business</span>
                </div>

                {/* Lower Architectural Panel */}
                <div className="premium-gate__lower-panel" />

                {/* Golden Brass Handle */}
                <div className="premium-gate__handle premium-gate__handle--left" aria-hidden="true" />
              </div>
            </div>

            {/* Right Door — "Suchna" */}
            <div className="premium-gate__door premium-gate__door--right">
              <div className="premium-gate__door-surface">
                
                {/* Upper Recessed Panel */}
                <div className="premium-gate__upper-panel">
                  <div className="premium-gate__icon">
                    <SuchnaIcon />
                  </div>
                  <span>Suchna</span>
                </div>

                {/* Lower Architectural Panel */}
                <div className="premium-gate__lower-panel" />

                {/* Golden Brass Handle */}
                <div className="premium-gate__handle premium-gate__handle--right" aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* Realistic Botanical Arch Greenery */}
          <GateDecorations />
        </div>

        {/* Architectural Entrance Steps */}
        <div className="premium-gate__steps" aria-hidden="true">
          <div className="premium-gate__step-one" />
          <div className="premium-gate__step-two" />
        </div>
      </div>
    </div>
  );
}

export { PremiumBusinessGate };
