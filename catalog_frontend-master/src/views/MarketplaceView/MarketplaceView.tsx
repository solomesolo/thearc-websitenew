import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Provider, Product, ProviderFilters, ProductFilters } from '../../api/types';
import { SupabaseService } from '../../api/supabaseService';
import { testSupabaseConnection } from '../../api/testSupabase';
import { useCountry } from '../../contexts/CountryContext';
import FiltersSidebar from './components/FiltersSidebar';
import ProvidersGrid from './components/ProvidersGrid';
import './MarketplaceView.scss';

const MarketplaceView: React.FC = () => {
    const [searchParams] = useSearchParams();
    const { selectedCountry, setSelectedCountry } = useCountry();
    const [providers, setProviders] = useState<Provider[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [providerFilters, setProviderFilters] = useState<ProviderFilters>({
        locations: [],
        tags: [],
        hasProducts: false
    });
    const [productFilters, setProductFilters] = useState<ProductFilters>({
        tags: [],
        biomarkers: [],
        available: true
    });

    // Handle country selection from URL params
    useEffect(() => {
        const countryFromUrl = searchParams.get('country');
        if (countryFromUrl && countryFromUrl !== selectedCountry) {
            setSelectedCountry(countryFromUrl);
        }
    }, [searchParams, selectedCountry, setSelectedCountry]);

    // Load initial data
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [providersData, productsData] = await Promise.all([
                    SupabaseService.getProviders(),
                    SupabaseService.getProducts({ 
                        available: true,
                        tags: [],
                        biomarkers: []
                    })
                ]);
                
                setProviders(providersData);
                setProducts(productsData);
                setFilteredProviders(providersData);
            } catch (error) {
                console.error('Error loading data:', error);
                setError(`Failed to load data from Supabase: ${error instanceof Error ? error.message : 'Unknown error'}`);
                // Set empty arrays to prevent further errors
                setProviders([]);
                setProducts([]);
                setFilteredProviders([]);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Apply filters when filters or country changes
    useEffect(() => {
        const applyFilters = async () => {
            if (providers.length === 0) return;
            
            try {
                // Create filters with country included
                const filtersWithCountry = {
                    ...providerFilters,
                    locations: selectedCountry ? [selectedCountry] : []
                };
                
                const filtered = await SupabaseService.getProviders(filtersWithCountry);
                setFilteredProviders(filtered);
            } catch (error) {
                console.error('Error applying filters:', error);
                // Don't show error for filter failures, just keep current data
            }
        };

        applyFilters();
    }, [providerFilters, selectedCountry]); // Removed providers.length to prevent infinite loop

    const handleProviderFiltersChange = useCallback((newFilters: Partial<ProviderFilters>) => {
        setProviderFilters(prev => ({ ...prev, ...newFilters }));
    }, []);

    const handleProductFiltersChange = useCallback((newFilters: Partial<ProductFilters>) => {
        setProductFilters(prev => ({ ...prev, ...newFilters }));
    }, []);

    // Show error state
    if (error) {
        return (
            <div className="container mt-4">
                <div className="alert alert-warning" role="alert">
                    <h4 className="alert-heading">⚠️ Connection Issue</h4>
                    <p>{error}</p>
                    <hr />
                    <p className="mb-0">
                        <strong>To fix this:</strong>
                        <ul className="mt-2">
                            <li>Check your Supabase credentials in the <code>.env</code> file</li>
                            <li>Ensure your Supabase database has the required tables</li>
                            <li>Verify your database has Row Level Security (RLS) policies set up</li>
                        </ul>
                    </p>
                    <div className="mt-3">
                        <a href="/SUPABASE_SETUP.md" className="btn btn-primary btn-sm">
                            View Setup Guide
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    // Show loading state with content
    if (loading) {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <h4 className="mt-3">Loading Marketplace...</h4>
                            <p className="text-muted">Connecting to Supabase and loading data...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-3">
                    <FiltersSidebar
                        providers={providers}
                        products={products}
                        providerFilters={providerFilters}
                        productFilters={productFilters}
                        onProviderFiltersChange={handleProviderFiltersChange}
                        onProductFiltersChange={handleProductFiltersChange}
                    />
                </div>
                <div className="col-lg-9">
                    <ProvidersGrid
                        providers={filteredProviders}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
};

export default MarketplaceView; 