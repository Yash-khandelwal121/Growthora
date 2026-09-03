import React from 'react';
import { BLUEPRINT_DATA } from '../../../data/blueprintData';

export const Blueprint3DModel = ({ categoryId }) => {
  const blueprint = BLUEPRINT_DATA[categoryId] || BLUEPRINT_DATA['01'];

  return (
    <div className="blueprint-3d-render-container">
      <img 
        key={categoryId}
        src={blueprint.image} 
        alt={`${blueprint.category} 3D Business Blueprint`}
        className="blueprint-3d-render-img animate-fade-in"
        loading="eager"
      />
      <div className="blueprint-img-overlay-glow" />
    </div>
  );
};
