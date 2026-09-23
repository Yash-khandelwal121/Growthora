import React from 'react';
import { Building2, GraduationCap, Rocket } from 'lucide-react';

export function EcosystemCategoryCard({ theme, title, description }) {
  const getIcon = () => {
    switch (theme) {
      case 'purple':
        return <Building2 size={24} />;
      case 'green':
        return <GraduationCap size={24} />;
      case 'orange':
        return <Rocket size={24} />;
      default:
        return <Building2 size={24} />;
    }
  };

  return (
    <div className={`eco-category-card bg-${theme}`}>
      <div className="eco-cat-icon">
        {getIcon()}
      </div>
      <h3 className="eco-cat-title" dangerouslySetInnerHTML={{ __html: title }}></h3>
      <div className="eco-cat-divider"></div>
      <p className="eco-cat-desc">{description}</p>
    </div>
  );
}
