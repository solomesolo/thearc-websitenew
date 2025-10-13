import React, { memo } from 'react';
import { Service } from "../../../../api/types";
import { CatalogItemHeader } from './components/CatalogItemHeader';
import { CatalogItemSubHeader } from './components/CatalogItemSubHeader';
import { CatalogItemLogo } from './components/CatalogItemLogo';
import { CatalogItemDescription } from './components/CatalogItemDescription';
import "./styles/catalogItem.scss";

interface CatalogItemProps {
  service: Service;
}

const CatalogItem = memo<CatalogItemProps>(({ service }) => {
  // Static values to prevent any dynamic changes
  const serviceLink = `/catalog/${service.id}`;

  // Handle click to open in new window
  const handleCompanyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Open company page in new window/tab
    window.open(serviceLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="catalog-item">
      <div className="catalog-item-card" onClick={handleCompanyClick}>
        <CatalogItemLogo logo={service.logo} />
        <div className="catalog-item-card-description">
          <CatalogItemHeader name={service.name} />
          <CatalogItemSubHeader 
            categories={service.categories} 
            ratings={service.ratings} 
          />
          <div className="divider"></div>
          <CatalogItemDescription
            certificates={service.certificates}
            description={service.description}
            tags={service.tags} 
          />
        </div>
        
        {/* Click indicator */}
        <div className="catalog-item-click-indicator">
          <span className="click-text">Click to open</span>
        </div>
      </div>
    </div>
  );
});

CatalogItem.displayName = 'CatalogItem';

export default CatalogItem;