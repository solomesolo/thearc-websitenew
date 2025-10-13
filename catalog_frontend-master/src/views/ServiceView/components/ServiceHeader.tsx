import React from 'react';
import { Service } from "../../../api/types";
import RatingComponent from "../../../components/RatingComponent";
import { Link } from "react-router-dom";
import ISOIconComponent from "../../../components/ISOIconComponent";
import { ServiceInfoHeader } from './ServiceInfoHeader';

type Props = {
    service: Service
}
const ServiceHeader = ({ service }: Props) => {
    const defaultCatImage = "/assets/imgs/page/vendor/featured.png";
    let category = service.categories && service.categories.length > 0 ? service.categories[0] : null;
    let catImage = category && category.image ? category.image : defaultCatImage;

    return (
        <>
            <section className="section-box shop-template mt-30">
                <div className="container">
                    <div className="d-flex box-banner-vendor">
                        <div className="vendor-left">
                            <ServiceInfoHeader service={service} />
                            <div className="service-details">
                                <div><b>Tags:</b> {service.tags && service.tags.map(tag => <span key={tag.id} style={{marginRight: 8, padding: '2px 8px', background: '#eee', borderRadius: 8}}>{String(tag.name || 'Unknown Tag')}</span>)}</div>
                                <div><b>Categories:</b> {service.categories && service.categories.map(cat => <span key={cat.id} style={{marginRight: 8, padding: '2px 8px', background: '#e0e0ff', borderRadius: 8}}>{String(cat.name || 'Unknown Category')}</span>)}</div>
                                <div><b>Countries:</b> {service.countries && service.countries.map(country => <span key={country.id} style={{marginRight: 8, padding: '2px 8px', background: '#ffe0e0', borderRadius: 8}}>{String(country.name || 'Unknown Country')}</span>)}</div>
                                <div><b>Features:</b> {service.features && service.features.map(feature => <div key={feature.id}><b>{String(feature.title || 'Unknown Feature')}:</b> {String(feature.description || 'No description')}</div>)}</div>
                                <div><b>Certificates:</b> {service.certificates && service.certificates.map(cert => <div key={cert.id}><b>{String(cert.organisation_entity?.name || 'Unknown Organization')}:</b> {String(cert.description || 'No description')}</div>)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ServiceHeader;