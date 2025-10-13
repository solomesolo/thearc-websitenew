import React, { memo, useMemo } from 'react';
import Header from "./components/Header";
import { Routes, Route, useLocation } from 'react-router-dom';
import Footer from "./components/Footer/Footer";
import HomeView from './views/HomeView';
import CatalogView from "./views/CatalogView";
import AboutView from "./views/AboutView";
import BlogView from "./views/BlogView";
import BlogPostView from "./views/BlogPostView";
import ServiceView from "./views/ServiceView";
import ServiceInfo from "./views/ServiceView/components/ServiceInfo";
import MarketplaceView from "./views/MarketplaceView/MarketplaceView";
import ProviderDetail from "./views/MarketplaceView/components/ProviderDetail";
import ProductDetail from "./views/MarketplaceView/components/ProductDetail";

const AppRoutes = memo(() => {
  const location = useLocation();
  const isLanding = useMemo(() => location.pathname === "/", [location.pathname]);

  return (
    <div className=''>
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-column flex-column-fluid">
          {!isLanding && <Header />}
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/catalog" element={<CatalogView />} />
            <Route path="/catalog/:serviceId" element={<ServiceView />}>
              <Route path="" element={<ServiceInfo />} />
              <Route path="screens" element={<ServiceView />} />
            </Route>
            <Route path="/blog" element={<BlogView/>}/>
            <Route path="/blog/:postId" element={<BlogPostView/>}/>
            <Route path="/about" element={<AboutView />} />
            <Route path="/marketplace" element={<MarketplaceView />} />
            <Route path="/marketplace/provider/:providerId" element={<ProviderDetail />} />
            <Route path="/marketplace/product/:productId" element={<ProductDetail />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
});

export default AppRoutes; 