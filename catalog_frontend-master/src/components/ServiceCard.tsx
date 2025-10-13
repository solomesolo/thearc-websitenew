import React, { memo } from "react";
import { Service } from "../api/types";
import RatingComponent from "./RatingComponent";
import "../views/ServiceView/styles/serviceCard.scss";

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = memo<ServiceCardProps>(({ service }) => {
  // Static values to prevent any dynamic changes
  const serviceLink = `/catalog/${service.id}`;
  const serviceName = service.name || 'Unknown Service';
  const hasRatings = service.ratings && service.ratings.length > 0;
  const firstRating = hasRatings ? service.ratings[0] : null;
  const categories = service.categories || [];

  // Handle click to open in new window
  const handleCompanyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Open company page in new window/tab
    window.open(serviceLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="service-card">
      <div className="service-card-content" onClick={handleCompanyClick}>
        {/* Logo Section */}
        <div className="service-card-logo">
          <img 
            src={service.logo} 
            alt={serviceName}
            className="service-logo-image"
            loading="lazy"
          />
        </div>

        {/* Content Section */}
        <div className="service-card-info">
          {/* Service Name */}
          <h3 className="service-name">{serviceName}</h3>
          
          {/* Rating */}
          {firstRating && (
            <div className="service-rating">
              <RatingComponent rating={firstRating} />
            </div>
          )}
          
          {/* Categories */}
          {categories.length > 0 && (
            <div className="service-categories">
              {categories.map(category => (
                <span key={category.id} className="category-tag">
                  {category.name || 'Unknown Category'}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* Click indicator */}
        <div className="service-card-click-indicator">
          <span className="click-text">Click to open</span>
        </div>
      </div>
    </div>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;