import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Provider, Product } from '../../../api/types';
import { SupabaseService } from '../../../api/supabaseService';
import './ProviderDetail.scss';

const ProviderDetail: React.FC = () => {
	const { providerId } = useParams<{ providerId: string }>();
	const [provider, setProvider] = useState<Provider | null>(null);
	const [products, setProducts] = useState<Product[]>([]);
	const [similarProviders, setSimilarProviders] = useState<Provider[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Memoized values to prevent unnecessary re-renders
	const providerTags = useMemo(() => {
		if (!provider) return [];
		return SupabaseService.extractProviderTags(provider.Tag);
	}, [provider]);

	const companyName = useMemo(() => provider?.['Company Name'] || 'Unknown Company', [provider]);
	const companyLocation = useMemo(() => provider?.['Company Location'] || 'Unknown Location', [provider]);
	const companyDescription = useMemo(() => provider?.['Company Description'] || 'No description available', [provider]);
	const websiteLink = useMemo(() => provider?.['Website Link'] || '', [provider]);
	const reviewsLink = useMemo(() => provider?.['Reviews'] || '', [provider]);
	const mentionsLink = useMemo(() => provider?.['Mentions'] || '', [provider]);
	
	// Handle Pros and Cons
	const pros = useMemo(() => {
		return provider?.Pros || '';
	}, [provider]);
	
	const cons = useMemo(() => {
		return provider?.Cons || '';
	}, [provider]);

	// Fetch provider and related data
	useEffect(() => {
		const fetchData = async () => {
			if (!providerId) return;

			try {
				setLoading(true);
				setError(null);

				// Fetch provider data
				const providerData = await SupabaseService.getProviderById(parseInt(providerId));
				setProvider(providerData);

				// Fetch products for this provider
				const productsData = await SupabaseService.getProductsByProviderId(parseInt(providerId));
				setProducts(productsData);

				// Fetch similar providers
				const similarData = await SupabaseService.getSimilarProviders(parseInt(providerId));
				setSimilarProviders(similarData);

			} catch (err) {
				console.error('Error fetching provider data:', err);
				setError('Failed to load provider information');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [providerId]);

	// Handle opening website in new window
	const handleWebsiteClick = useCallback(() => {
		if (websiteLink) {
			window.open(websiteLink, '_blank', 'noopener,noreferrer');
		}
	}, [websiteLink]);

	// Handle opening reviews in new window
	const handleReviewsClick = useCallback(() => {
		if (reviewsLink) {
			window.open(reviewsLink, '_blank', 'noopener,noreferrer');
		}
	}, [reviewsLink]);

	// Handle opening mentions in new window
	const handleMentionsClick = useCallback(() => {
		if (mentionsLink) {
			window.open(mentionsLink, '_blank', 'noopener,noreferrer');
		}
	}, [mentionsLink]);

	// Handle opening product in new window
	const handleProductClick = useCallback((productId: number) => {
		window.open(`/marketplace/product/${productId}`, '_blank', 'noopener,noreferrer');
	}, []);

	// Handle opening similar provider in new window
	const handleSimilarProviderClick = useCallback((similarProviderId: number) => {
		window.open(`/marketplace/provider/${similarProviderId}`, '_blank', 'noopener,noreferrer');
	}, []);

	if (loading) {
		return (
			<div className="elegant-provider-detail-container">
				<div className="elegant-loading-container">
					<div className="elegant-loading-spinner"></div>
					<p>Loading provider information...</p>
				</div>
			</div>
		);
	}

	if (error || !provider) {
		return (
			<div className="elegant-provider-detail-container">
				<div className="elegant-error-container">
					<h2>Error</h2>
					<p>{error || 'Provider not found'}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="elegant-provider-detail-container">
			{/* Company Header */}
			<div className="elegant-company-header">
				<div className="elegant-logo-section">
					<div className="elegant-company-logo">
						{companyName.charAt(0).toUpperCase()}
					</div>
				</div>
				
				<div className="elegant-company-info-section">
					<h1 className="elegant-company-name">{companyName}</h1>
					<p className="elegant-company-location">📍 {companyLocation}</p>
					{websiteLink && (
						<button className="elegant-website-btn" onClick={handleWebsiteClick}>
							Visit Website
						</button>
					)}
				</div>
				
				<div className="elegant-labels-section">
					<div className="elegant-labels-container">
						{providerTags.map((tag, index) => (
							<span key={index} className="elegant-provider-tag">
								{tag}
							</span>
						))}
					</div>
				</div>
			</div>

			{/* Main Layout */}
			<div className="elegant-main-layout">
				{/* Left Column - Company Information */}
				<div className="elegant-company-info-column">
					{/* Company Description */}
					<div className="elegant-company-description-section">
						<h2>About {companyName}</h2>
						<p className="elegant-company-description">{companyDescription}</p>
					</div>

					{/* Reviews and Mentions */}
					{(reviewsLink || mentionsLink) && (
						<div className="elegant-reviews-mentions-section">
							<h2>Reviews & Mentions</h2>
							<div className="elegant-reviews-links">
								{reviewsLink && (
									<button className="elegant-reviews-btn" onClick={handleReviewsClick}>
										View Reviews
									</button>
								)}
								{mentionsLink && (
									<button className="elegant-mentions-btn" onClick={handleMentionsClick}>
										View Mentions
									</button>
								)}
							</div>
						</div>
					)}

					{/* Pros and Cons */}
					{(pros || cons) && (
						<div className="elegant-pros-cons-section">
							<h2>What People Say</h2>
							{pros && (
								<div className="elegant-pros-section">
									<h3>✅ Pros</h3>
									<p className="elegant-pros-text">{pros}</p>
								</div>
							)}
							{cons && (
								<div className="elegant-cons-section">
									<h3>❌ Cons</h3>
									<p className="elegant-cons-text">{cons}</p>
								</div>
							)}
						</div>
					)}
				</div>

				{/* Right Column - Products */}
				<div className="elegant-products-column">
					<div className="elegant-services-section">
						<h2>Available Tests</h2>
						{products.length > 0 ? (
							<div className="elegant-services-grid">
								{products.map((product) => (
									<div 
										key={product.id} 
										className="elegant-service-card"
										onClick={() => handleProductClick(product.id)}
									>
										<h3 className="elegant-service-name">{product.name}</h3>
										<p className="elegant-service-description">{product.description}</p>
										<div className="elegant-service-price">€{product.price}</div>
										{product.tags && (
											<div className="elegant-service-tags">
												{SupabaseService.extractProductTags(product.tags).slice(0, 3).map((tag, index) => (
													<span key={index} className="elegant-service-tag">
														{tag}
													</span>
												))}
											</div>
										)}
									</div>
								))}
							</div>
						) : (
							<p className="elegant-no-products">No products available for this provider.</p>
						)}
					</div>
				</div>
			</div>

			{/* Similar Companies */}
			{similarProviders.length > 0 && (
				<div className="elegant-similar-companies-section">
					<h2>Similar Companies</h2>
					<div className="elegant-similar-companies-grid">
						{similarProviders.map((similarProvider) => (
							<div 
								key={similarProvider.id} 
								className="elegant-similar-company-card"
								onClick={() => handleSimilarProviderClick(similarProvider.id)}
							>
								<div className="elegant-similar-company-logo">
									{similarProvider['Company Name']?.charAt(0).toUpperCase() || 'P'}
								</div>
								<h3 className="elegant-similar-company-name">{similarProvider['Company Name']}</h3>
								<p className="elegant-similar-company-location">{similarProvider['Company Location']}</p>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default ProviderDetail;
