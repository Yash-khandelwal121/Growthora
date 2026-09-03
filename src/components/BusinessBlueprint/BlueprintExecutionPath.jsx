import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

export const BlueprintExecutionPath = ({ executionPath }) => {
  const [activeStep, setActiveStep] = useState(0);

  if (!executionPath || executionPath.length === 0) return null;

  // Reset active step when category changes
  useEffect(() => {
    setActiveStep(0);
  }, [executionPath]);

  // Automatic Step Cursor Movement Loop (every 2.5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % executionPath.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [executionPath.length]);

  const currentItem = executionPath[activeStep] || executionPath[0];

  return (
    <div className="blueprint-execution-path-card">
      {/* Header without manual buttons */}
      <div className="path-header">
        <div className="path-header-left">
          <span className="path-tag">ILLUMINATED EXECUTION PATH</span>
          <span className="path-sub">{executionPath.length} STEPS AUTOMATIC EXECUTION FLOW</span>
        </div>
      </div>

      {/* Automatic Step Track */}
      <div className="execution-steps-track">
        {executionPath.map((stepItem, index) => {
          const isActive = index === activeStep;
          const isPassed = index < activeStep;

          return (
            <React.Fragment key={stepItem.step}>
              <div 
                className={`path-step-node ${isActive ? 'active-step' : ''} ${isPassed ? 'passed-step' : ''}`}
                onClick={() => setActiveStep(index)}
              >
                <div className={`step-pin ${isActive ? 'pulse-pin' : ''}`}>
                  <span className="pin-num">{stepItem.step}</span>
                </div>
                <span className="step-label">{stepItem.label}</span>
              </div>

              {index < executionPath.length - 1 && (
                <div className={`step-connector ${isPassed || isActive ? 'active-connector' : ''}`}>
                  <div className="pulse-line" />
                  <ChevronRight size={14} className="connector-arrow" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Live Automatic Active Phase Indicator Bar */}
      <div className="active-phase-bar animate-fade-in">
        <span className="phase-indicator-dot" />
        <span className="phase-text">
          <strong>ACTIVE PHASE {currentItem.step}:</strong> {currentItem.label} — Growthora Advisory Team Executing
        </span>
      </div>
    </div>
  );
};
