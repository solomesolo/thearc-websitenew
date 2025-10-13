import React, { useEffect, useState } from 'react';
import { Paginated, Service, ServiceRatingReview } from "../../../api/types";
import { useOutletContext } from "react-router-dom";
import { ServiceContextType } from "../ServiceView";
import client, { getClient } from "../../../api/client";
import ScaledRatingStars from "../../../components/ScaledRatingStars";
import RelatedServices from "./RelatedServices";
import "../service.css"
import RatingComponent from '../../../components/RatingComponent';
import { Mentions } from './Mentions';
import { TotalReviewScore } from './TotalReviewScore';
import { ReviewsSection } from './ReviewSection';
import { ScreenShots } from './ScreenShots';


type Props = {}
const ServiceInfo = (props: Props) => {
    const { service } = useOutletContext<ServiceContextType>();

    const [reviews, setReviews] = useState<Paginated<ServiceRatingReview>>();
    const [readMoreBio, setReadMoreBio] = useState(false);


    useEffect(() => {
        setReviews(undefined);
        getClient().catalog.serviceReviews(service.id).then(setReviews);
    }, [service]);

    function domainFromUrl(url: string) {
        const m = url.match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/gi);
        if (m) {
            return m[0];
        }
        return "";
    }

    return (
        <>
            <section className="section-box shop-template ">
                <div className="container">
                    <h2>Service Details</h2>
                    <div><b>Name:</b> {String(service.name || 'Unknown Service')}</div>
                    <div><b>Description:</b> {String(service.description || 'No description available')}</div>
                    <div><b>Bio:</b> {String(service.bio || 'No bio available')}</div>
                    <div><b>Link:</b> <a href={service.link} target="_blank" rel="noopener noreferrer">{String(service.link || 'No link available')}</a></div>
                    <div><b>Logo:</b> {service.logo && <img src={service.logo} alt="logo" style={{maxWidth: 100}} />}</div>
                    <div><b>Tags:</b> {service.tags && service.tags.map(tag => <span key={tag.id} style={{marginRight: 8, padding: '2px 8px', background: '#eee', borderRadius: 8}}>{String(tag.name || 'Unknown Tag')}</span>)}</div>
                    <div><b>Categories:</b> {service.categories && service.categories.map(cat => <span key={cat.id} style={{marginRight: 8, padding: '2px 8px', background: '#e0e0ff', borderRadius: 8}}>{String(cat.name || 'Unknown Category')}</span>)}</div>
                    <div><b>Countries:</b> {service.countries && service.countries.map(country => <span key={country.id} style={{marginRight: 8, padding: '2px 8px', background: '#ffe0e0', borderRadius: 8}}>{String(country.name || 'Unknown Country')}</span>)}</div>
                    <div><b>Features:</b> {service.features && service.features.map(feature => <div key={feature.id}><b>{String(feature.title || 'Unknown Feature')}:</b> {String(feature.description || 'No description')}</div>)}</div>
                    <div><b>Certificates:</b> {service.certificates && service.certificates.map(cert => <div key={cert.id}><b>{String(cert.organisation_entity?.name || 'Unknown Organization')}:</b> {String(cert.description || 'No description')}</div>)}</div>
                    <RelatedServices service={service} />
                    <Mentions domainFromUrl={domainFromUrl} service={service} />
                    {(service.ratings && service.ratings.length > 0 && reviews) && <ReviewsSection reviews={reviews} service={service} />}
                    <ScreenShots screenshots={service.screenshots} />
                </div>
            </section>
        </>
    );
};

export default ServiceInfo;