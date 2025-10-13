import React, { useEffect, useState, memo } from 'react';
import CatalogItem from "./CatalogItem/CatalogItem";
import { PageStat, Paginated, Service } from "../../../api/types";
import { getClient } from "../../../api/client";
import Loader from "../../../components/Loader";
import "../catalog.scss";

interface CatalogListProps {
  selectedTagIds: number[];
  categoryId: string | null;
  page: number;
  setPageStat: (ps: PageStat) => void;
}

const CatalogList = memo<CatalogListProps>(({ selectedTagIds, categoryId, page, setPageStat }) => {
  const [services, setServices] = useState<Paginated<Service> | null>(null);
  const [loading, setLoading] = useState(false);

  // Load services when dependencies change
  useEffect(() => {
    const loadServices = async () => {
      setLoading(true);
      try {
        const filters: any = { 
          tags: selectedTagIds, 
          page: page 
        };
        
        if (categoryId) {
          filters.categories = categoryId;
        }
        
        const result = await getClient().catalog.services(filters);
        setServices(result);
      } catch (error) {
        console.error('Failed to load services:', error);
        setServices(null);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, [page, selectedTagIds, categoryId]);

  // Update page stats when services change
  useEffect(() => {
    if (services) {
      setPageStat(services);
    }
  }, [services, setPageStat]);

  // Show loader while loading
  if (loading || !services) {
    return <Loader />;
  }

  // Render catalog items
  return (
    <div className="catalog-list-container">
      {/* Filter info section */}
      <div className="catalog-filters-info">
        <div className="row">
          <div className="col-xl-2 col-lg-3 mb-10 text-lg-start text-center">
            {/* Left side - empty for now */}
          </div>
          <div className="col-xl-10 col-lg-9 mb-10 text-lg-end text-center">
            {/* Right side - empty for now */}
          </div>
        </div>
      </div>

      {/* Services grid */}
      <div className="catalog-services-grid">
        {services.results.map((service: Service) => (
          <CatalogItem 
            key={service.id} 
            service={service} 
          />
        ))}
      </div>

      {/* No results message */}
      {services.results.length === 0 && (
        <div className="no-results-message">
          <p>No services found matching your criteria.</p>
        </div>
      )}
    </div>
  );
});

CatalogList.displayName = 'CatalogList';

export default CatalogList;