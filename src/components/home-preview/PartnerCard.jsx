import React from 'react';

export function PartnerCard({ logo, name }) {
  return (
    <div className="eco-partner-card">
      <img src={logo} alt={name} className="eco-partner-img" />
    </div>
  );
}
