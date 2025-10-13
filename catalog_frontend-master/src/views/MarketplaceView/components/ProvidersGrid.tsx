import React, { useMemo, useCallback } from 'react';
import { Provider } from '../../../api/types';
import { SupabaseService } from '../../../api/supabaseService';
import './ProvidersGrid.scss';

interface ProvidersGridProps {
    providers: Provider[];
    loading: boolean;
}

const ProvidersGrid: React.FC<ProvidersGridProps> = React.memo(({ providers, loading }) => {
    // Memoize the getProviderTags function to prevent recalculation on every render
    const getProviderTags = useCallback((provider: Provider): string[] => {
        return SupabaseService.extractProviderTags(provider.Tag);
    }, []);

    // Handle click to open provider details in new window
    const handleProviderClick = useCallback((providerId: number) => {
        window.open(`/marketplace/provider/${providerId}`, '_blank', 'noopener,noreferrer');
    }, []);

    // Memoize the providers with their processed tags to prevent re-renders
    const providersWithTags = useMemo(() => {
        return providers.map(provider => ({
            ...provider,
            processedTags: getProviderTags(provider)
        }));
    }, [providers, getProviderTags]);

    if (loading) {
        return (
            <div className="elegant-providers-grid">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="elegant-provider-card loading">
                        <div className="elegant-card-header">
                            <div className="elegant-avatar skeleton"></div>
                            <div className="elegant-company-info">
                                <div className="elegant-skeleton elegant-skeleton-title"></div>
                                <div className="elegant-skeleton elegant-skeleton-subtitle"></div>
                            </div>
                        </div>
                        <div className="elegant-card-content">
                            <div className="elegant-skeleton elegant-skeleton-text"></div>
                            <div className="elegant-skeleton elegant-skeleton-text"></div>
                            <div className="elegant-skeleton elegant-skeleton-text short"></div>
                        </div>
                        <div className="elegant-card-tags">
                            <div className="elegant-skeleton elegant-skeleton-tag"></div>
                            <div className="elegant-skeleton elegant-skeleton-tag"></div>
                            <div className="elegant-skeleton elegant-skeleton-tag"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (providers.length === 0) {
        return (
            <div className="elegant-no-results">
                <div className="elegant-no-results-icon">🔍</div>
                <h3>No providers found</h3>
                <p>Try adjusting your filters or search criteria</p>
            </div>
        );
    }

    return (
        <div className="elegant-providers-grid">
            {providersWithTags.map((provider) => (
                <div 
                    key={provider.id} 
                    className="elegant-provider-card"
                    onClick={() => handleProviderClick(provider.id)}
                >
                    <div className="elegant-card-header">
                        <div className="elegant-avatar">
                            {provider["Company Name"] ? provider["Company Name"].charAt(0).toUpperCase() : 'P'}
                        </div>
                        <div className="elegant-company-info">
                            <h3 className="elegant-company-name">{provider["Company Name"] || 'Unknown Provider'}</h3>
                            <p className="elegant-company-location">
                                {provider["Company Location"] || 'Global'}
                            </p>
                        </div>
                    </div>

                    <div className="elegant-card-content">
                        <p className="elegant-company-description">
                            {provider["Company Description"] || 'Providing comprehensive health testing services with state-of-the-art technology and professional expertise.'}
                        </p>
                    </div>

                    {provider.processedTags.length > 0 && (
                        <div className="elegant-card-tags">
                            {provider.processedTags.slice(0, 4).map((tag, index) => (
                                <span key={index} className="elegant-tag">
                                    {tag}
                                </span>
                            ))}
                            {provider.processedTags.length > 4 && (
                                <span className="elegant-tag-more">
                                    +{provider.processedTags.length - 4}
                                </span>
                            )}
                        </div>
                    )}

                    <div className="elegant-card-footer">
                        <button className="elegant-view-btn">
                            View Provider
                            <span className="elegant-arrow">→</span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
});

ProvidersGrid.displayName = 'ProvidersGrid';

export default ProvidersGrid;
