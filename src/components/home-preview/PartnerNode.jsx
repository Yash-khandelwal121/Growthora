import React from 'react';

export function PartnerNode({ partner, index, total, radius }) {
  const angle = (360 / total) * index;
  const radian = (angle - 90) * (Math.PI / 180); 

  const x = Math.cos(radian) * radius;
  const y = Math.sin(radian) * radius;

  // Placed relative to the rotating container center
  const style = {
    left: `calc(50% + ${x}px)`,
    top: `calc(50% + ${y}px)`,
  };

  return (
    <div className="eco-partner-node-wrapper" style={style}>
      <div className="eco-partner-node">
        <img src={partner.logo} alt={partner.name} className="eco-partner-logo" />
        <div className="eco-partner-tooltip">{partner.name}</div>
      </div>
    </div>
  );
}
