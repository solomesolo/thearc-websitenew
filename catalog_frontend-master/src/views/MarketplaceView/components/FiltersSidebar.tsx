import React, { useState, useEffect, useCallback } from 'react';
import { Provider, Product, ProviderFilters, ProductFilters } from '../../../api/types';
import { SupabaseService } from '../../../api/supabaseService';
import './FiltersSidebar.scss';

interface FiltersSidebarProps {
    providers: Provider[];
    products: Product[];
    providerFilters: ProviderFilters;
    productFilters: ProductFilters;
    onProviderFiltersChange: (filters: Partial<ProviderFilters>) => void;
    onProductFiltersChange: (filters: Partial<ProductFilters>) => void;
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = React.memo(({
    providers,
    products,
    providerFilters,
    productFilters,
    onProviderFiltersChange,
    onProductFiltersChange
}) => {
    const [loading, setLoading] = useState(true);
    const [availableBiomarkers, setAvailableBiomarkers] = useState<string[]>([]);

    // Beautiful predefined filter options
    const filterData = {
        testCollectionMethods: [
            'at-home kit', 'lab', 'visit required', 'mobile nurse', 
            'in-clinic', 'partnerlabs', 'pharmacy pickup'
        ],
        pricingTiers: [
            'low cost', 'mid range', 'premium', 
            'subscription model', 'pay per test'
        ],
        positioning: [
            'preventive care', 'longevity focused', 'holistic approach',
            'clinical precision', 'biohacker friendly', 'science first',
            'luxury health', 'budget friendly', 'ai driven'
        ],
        serviceTypes: [
            'blood tests', 'urine tests', 'stool tests', 'saliva tests',
            'genetic testing', 'epigenetic testing', 'hormonal testing',
            'microbiome analysis', 'cardiometabolic panels', 'longevity screening',
            'vitamin mineral panels', 'inflammation panels', 'cancer screening',
            'biological age test', 'fertility tests', 'mental health panels'
        ]
    };

    // Load biomarkers from products
    useEffect(() => {
        const loadBiomarkers = async () => {
            try {
                const allBiomarkers = new Set<string>();
                
                products.forEach(product => {
                    if (product.biomarkers) {
                        const biomarkers = SupabaseService.extractProductBiomarkers(product.biomarkers);
                        biomarkers.forEach(bio => {
                            allBiomarkers.add(bio.name);
                        });
                    }
                });
                
                setAvailableBiomarkers(Array.from(allBiomarkers).sort());
                setLoading(false);
            } catch (error) {
                console.error('Error loading biomarkers:', error);
                setLoading(false);
            }
        };

        loadBiomarkers();
    }, [products]);

    const handleProviderTagChange = useCallback((tag: string, checked: boolean) => {
        const normalizedTag = tag.replace(/\s+/g, '_');
        const newTags = checked
            ? [...providerFilters.tags, normalizedTag]
            : providerFilters.tags.filter(t => t !== normalizedTag);
        onProviderFiltersChange({ tags: newTags });
    }, [providerFilters.tags, onProviderFiltersChange]);

    const handleProductTagChange = useCallback((tag: string, checked: boolean) => {
        const normalizedTag = tag.replace(/\s+/g, '_');
        const newTags = checked
            ? [...productFilters.tags, normalizedTag]
            : productFilters.tags.filter(t => t !== normalizedTag);
        onProductFiltersChange({ tags: newTags });
    }, [productFilters.tags, onProductFiltersChange]);

    const handleBiomarkerChange = useCallback((biomarker: string, checked: boolean) => {
        const newBiomarkers = checked
            ? [...productFilters.biomarkers, biomarker]
            : productFilters.biomarkers.filter(b => b !== biomarker);
        onProductFiltersChange({ biomarkers: newBiomarkers });
    }, [productFilters.biomarkers, onProductFiltersChange]);

    const clearAllFilters = useCallback(() => {
        onProviderFiltersChange({ 
            locations: [], 
            tags: [], 
            hasProducts: false 
        });
        onProductFiltersChange({ 
            tags: [], 
            biomarkers: [], 
            available: true 
        });
    }, [onProviderFiltersChange, onProductFiltersChange]);

    const CheckboxOption = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) => (
        <div className="elegant-checkbox-wrapper" onClick={onChange}>
            <div className={`elegant-checkbox ${checked ? 'checked' : ''}`}>
                {checked && <span className="checkmark">✓</span>}
            </div>
            <span className="elegant-label">{label}</span>
        </div>
    );

    if (loading) {
        return (
            <div className="elegant-filters-sidebar">
                <div className="elegant-loading">
                    <div className="elegant-spinner"></div>
                    <p>Loading filters...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="elegant-filters-sidebar">
            <div className="elegant-filters-header">
                <h2 className="elegant-title">Filters</h2>
                <button className="elegant-clear-btn" onClick={clearAllFilters}>
                    Clear All
                </button>
            </div>

            {/* Find Provider Section */}
            <div className="elegant-filter-section">
                <h3 className="elegant-section-title">Find Provider</h3>
                
                <div className="elegant-filter-group">
                    <h4 className="elegant-group-title">Test Collection Method</h4>
                    <div className="elegant-options-grid">
                        {filterData.testCollectionMethods.map(method => {
                            const normalizedMethod = method.replace(/\s+/g, '_');
                            return (
                                <CheckboxOption
                                    key={method}
                                    label={method}
                                    checked={providerFilters.tags.includes(normalizedMethod)}
                                    onChange={() => handleProviderTagChange(method, !providerFilters.tags.includes(normalizedMethod))}
                                />
                            );
                        })}
                    </div>
                </div>

                <div className="elegant-filter-group">
                    <h4 className="elegant-group-title">Pricing Tier</h4>
                    <div className="elegant-options-grid">
                        {filterData.pricingTiers.map(tier => {
                            const normalizedTier = tier.replace(/\s+/g, '_');
                            return (
                                <CheckboxOption
                                    key={tier}
                                    label={tier}
                                    checked={providerFilters.tags.includes(normalizedTier)}
                                    onChange={() => handleProviderTagChange(tier, !providerFilters.tags.includes(normalizedTier))}
                                />
                            );
                        })}
                    </div>
                </div>

                <div className="elegant-filter-group">
                    <h4 className="elegant-group-title">Positioning</h4>
                    <div className="elegant-options-grid">
                        {filterData.positioning.map(pos => {
                            const normalizedPos = pos.replace(/\s+/g, '_');
                            return (
                                <CheckboxOption
                                    key={pos}
                                    label={pos}
                                    checked={providerFilters.tags.includes(normalizedPos)}
                                    onChange={() => handleProviderTagChange(pos, !providerFilters.tags.includes(normalizedPos))}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Find Product Section */}
            <div className="elegant-filter-section">
                <h3 className="elegant-section-title">Find Product</h3>
                
                <div className="elegant-filter-group">
                    <h4 className="elegant-group-title">Service Type</h4>
                    <div className="elegant-options-grid">
                        {filterData.serviceTypes.map(service => {
                            const normalizedService = service.replace(/\s+/g, '_');
                            return (
                                <CheckboxOption
                                    key={service}
                                    label={service}
                                    checked={productFilters.tags.includes(normalizedService)}
                                    onChange={() => handleProductTagChange(service, !productFilters.tags.includes(normalizedService))}
                                />
                            );
                        })}
                    </div>
                </div>

                <div className="elegant-filter-group">
                    <h4 className="elegant-group-title">Biomarkers</h4>
                    <div className="elegant-options-grid">
                        {availableBiomarkers.slice(0, 20).map(biomarker => (
                            <CheckboxOption
                                key={biomarker}
                                label={biomarker}
                                checked={productFilters.biomarkers.includes(biomarker)}
                                onChange={() => handleBiomarkerChange(biomarker, !productFilters.biomarkers.includes(biomarker))}
                            />
                        ))}
                    </div>
                    {availableBiomarkers.length > 20 && (
                        <p className="elegant-more-text">+ {availableBiomarkers.length - 20} more biomarkers available</p>
                    )}
                </div>
            </div>
        </div>
    );
});

FiltersSidebar.displayName = 'FiltersSidebar';

export default FiltersSidebar;
