import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Product, Provider } from '../../../api/types';
import { SupabaseService } from '../../../api/supabaseService';
import './ProductDetail.scss';

const ProductDetail: React.FC = () => {
	const { productId } = useParams<{ productId: string }>();
	const [product, setProduct] = useState<Product | null>(null);
	const [provider, setProvider] = useState<Provider | null>(null);
	const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Memoized values
	const productTags = useMemo(() => {
		if (!product) return [];
		return SupabaseService.extractProductTags(product.tags);
	}, [product]);

	const productBiomarkers = useMemo(() => {
		if (!product) return [];
		return SupabaseService.extractProductBiomarkers(product.biomarkers);
	}, [product]);

	const productName = useMemo(() => product?.name || 'Unknown Product', [product]);
	const productDescription = useMemo(() => product?.description || 'No description available', [product]);
	const productPrice = useMemo(() => product?.price || '0', [product]);
	const aboutTest = useMemo(() => product?.['about this test'] || '', [product]);
	const whatCanItHelp = useMemo(() => product?.['What can it help check or prevent?'] || '', [product]);
	const whoIsItFor = useMemo(() => product?.['Who is this most important for?'] || '', [product]);

	// Fetch product and related data
	useEffect(() => {
		const fetchData = async () => {
			if (!productId) return;

			try {
				setLoading(true);
				setError(null);

				// Fetch product data
				const productData = await SupabaseService.getProductById(parseInt(productId));
				setProduct(productData);

				// Fetch provider data
				if (productData.provider_id) {
					const providerData = await SupabaseService.getProviderById(productData.provider_id);
					setProvider(providerData);
				}

				// Fetch similar products
				const similarData = await SupabaseService.getSimilarProducts(parseInt(productId));
				setSimilarProducts(similarData);

			} catch (err) {
				console.error('Error fetching product data:', err);
				setError('Failed to load product information');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [productId]);

	// Handle opening provider in new window
	const handleProviderClick = useCallback(() => {
		if (provider) {
			window.open(`/marketplace/provider/${provider.id}`, '_blank', 'noopener,noreferrer');
		}
	}, [provider]);

	// Handle opening similar product in new window
	const handleSimilarProductClick = useCallback((similarProductId: number) => {
		window.open(`/marketplace/product/${similarProductId}`, '_blank', 'noopener,noreferrer');
	}, []);

	// Handle biomarker click
	const handleBiomarkerClick = useCallback((biomarkerName: string) => {
		// Could implement biomarker detail view or search
		console.log('Biomarker clicked:', biomarkerName);
	}, []);

	if (loading) {
		return (
			<div className="elegant-product-detail-container">
				<div className="elegant-loading-container">
					<div className="elegant-loading-spinner"></div>
					<p>Loading product information...</p>
				</div>
			</div>
		);
	}

	if (error || !product) {
		return (
			<div className="elegant-product-detail-container">
				<div className="elegant-error-container">
					<h2>Error</h2>
					<p>{error || 'Product not found'}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="elegant-product-detail-container">
			{/* Product Header */}
			<div className="elegant-product-header">
				<div className="elegant-product-info">
					<h1 className="elegant-product-name">{productName}</h1>
					{provider && (
						<div className="elegant-company-info" onClick={handleProviderClick}>
							<span className="elegant-company-name">by {provider['Company Name']}</span>
							<span className="elegant-company-location">📍 {provider['Company Location']}</span>
						</div>
					)}
					<div className="elegant-product-price">€{productPrice}</div>
				</div>
				
				{productTags.length > 0 && (
					<div className="elegant-labels-container">
						{productTags.map((tag, index) => (
							<span key={index} className="elegant-product-tag">
								{tag}
							</span>
						))}
					</div>
				)}
			</div>

			{/* Main Layout */}
			<div className="elegant-main-layout">
				{/* Left Column - Product Information */}
				<div className="elegant-product-info-column">
					{/* Product Description */}
					<div className="elegant-product-description-section">
						<h2>About This Test</h2>
						<p className="elegant-product-description">{productDescription}</p>
					</div>

					{/* About This Test */}
					{aboutTest && (
						<div className="elegant-about-test-section">
							<h2>Why These Markers Together?</h2>
							<p className="elegant-about-test-text">{aboutTest}</p>
						</div>
					)}

					{/* What Can It Help */}
					{whatCanItHelp && (
						<div className="elegant-what-can-help-section">
							<h2>What Can It Help Check or Prevent?</h2>
							<p className="elegant-what-can-help-text">{whatCanItHelp}</p>
						</div>
					)}

					{/* Who Is It For */}
					{whoIsItFor && (
						<div className="elegant-who-is-for-section">
							<h2>Who Is This Most Important For?</h2>
							<p className="elegant-who-is-for-text">{whoIsItFor}</p>
						</div>
					)}
				</div>

				{/* Right Column - Biomarkers */}
				<div className="elegant-biomarker-description-column">
					<div className="elegant-biomarkers-section">
						<h2>Biomarkers Included</h2>
						{productBiomarkers.length > 0 ? (
							<div className="elegant-biomarkers-grid">
								{productBiomarkers.map((biomarker, index) => (
									<div 
										key={index} 
										className="elegant-biomarker-chip"
										onClick={() => handleBiomarkerClick(biomarker.name)}
									>
										<div className="elegant-biomarker-name">{biomarker.name}</div>
										{biomarker.category && (
											<div className="elegant-biomarker-category">{biomarker.category}</div>
										)}
										{biomarker.code && (
											<div className="elegant-biomarker-code">{biomarker.code}</div>
										)}
									</div>
								))}
							</div>
						) : (
							<p className="elegant-no-biomarkers">No biomarkers information available.</p>
						)}
					</div>
				</div>
			</div>

			{/* Similar Products */}
			{similarProducts.length > 0 && (
				<div className="elegant-similar-products-section">
					<h2>Similar Products</h2>
					<div className="elegant-similar-products-grid">
						{similarProducts.map((similarProduct) => (
							<div 
								key={similarProduct.id} 
								className="elegant-similar-product-card"
								onClick={() => handleSimilarProductClick(similarProduct.id)}
							>
								<h3 className="elegant-similar-product-name">{similarProduct.name}</h3>
								<p className="elegant-similar-product-description">{similarProduct.description}</p>
								<div className="elegant-similar-product-price">€{similarProduct.price}</div>
								{similarProduct.tags && (
									<div className="elegant-similar-product-tags">
										{SupabaseService.extractProductTags(similarProduct.tags).slice(0, 2).map((tag, index) => (
											<span key={index} className="elegant-similar-product-tag">
												{tag}
											</span>
										))}
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductDetail;
