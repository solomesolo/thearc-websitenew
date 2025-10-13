import React from 'react';
import { Link, Route, Routes, Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getClient } from '../../api/client';
import { Service } from '../../api/types';
import ServiceHeader from "./components/ServiceHeader";
import TrustBox from "./components/TrustBox";
import './styles/serviceInfoHeader.scss';
import useAxios from 'axios-hooks';

export type ServiceContextType = { service: Service };

type Props = {}
const ServiceView = (props: Props) => {
    const { serviceId } = useParams();
    const [{ data: service, loading, error }] = getClient().catalog.service(serviceId || '');

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error loading service.</div>;
    }
    if (!service) {
        return <div>Service not found.</div>;
    }

    return (
        <div style={{display: 'flex', flexDirection: 'row', gap: 32, maxWidth: 1200, margin: '40px auto', padding: 16}}>
            {/* Left column */}
            <div style={{flex: '0 0 320px', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#18181b', borderRadius: 16, padding: 24, minWidth: 260}}>
                <img src={service.logo} alt="logo" style={{width: 120, height: 120, objectFit: 'contain', borderRadius: 16, marginBottom: 24, background: '#fff'}} />
                <a href={service.link} target="_blank" rel="noopener noreferrer" style={{background: '#a21caf', color: '#fff', borderRadius: 24, padding: '12px 32px', fontWeight: 700, fontSize: 18, textDecoration: 'none', marginBottom: 24, display: 'inline-block'}}>Company Site ↗</a>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24}}>
                    {service.countries && service.countries.map((c, i) => <span key={i} style={{background: '#2563eb', color: '#fff', borderRadius: 16, padding: '4px 12px', fontWeight: 600}}>{String(c.name || 'Unknown Country')}</span>)}
                    {service.tags && service.tags.length > 0 && <span style={{background: '#a21caf', color: '#fff', borderRadius: 16, padding: '4px 12px', fontWeight: 600}}>{String(service.tags[0].name || 'Unknown Tag')}</span>}
                    {service.categories && service.categories.length > 0 && <span style={{background: '#f59e42', color: '#fff', borderRadius: 16, padding: '4px 12px', fontWeight: 600}}>{String(service.categories[0].name || 'Unknown Category')}</span>}
                    {service.features && service.features.map((f, i) => <span key={i} style={{background: '#22c55e', color: '#fff', borderRadius: 16, padding: '4px 12px', fontWeight: 600}}>{String(f.title || 'Unknown Feature')}</span>)}
                </div>
                {/* Address or other info can go here if available */}
            </div>
            {/* Right column */}
            <div style={{flex: 1, background: '#18181b', borderRadius: 16, padding: 32, minWidth: 0}}>
                <h1 style={{fontSize: 32, fontWeight: 800, marginBottom: 8}}>{String(service.name || 'Unknown Service')}</h1>
                <div style={{display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16}}>
                    {service.ratings && service.ratings.length > 0 && <span style={{color: '#f59e42', fontWeight: 700, fontSize: 20}}>★ {String(service.ratings[0].score || '0')}</span>}
                </div>
                <div style={{fontSize: 18, marginBottom: 16}}>{String(service.description || 'No description available')}</div>
                <div style={{fontWeight: 600, marginBottom: 4}}>How the company describes itself</div>
                <div style={{marginBottom: 24}}>{String(service.bio || 'No bio available')}</div>
                {/* Badges for all tags, categories, countries, features, certificates */}
                <div style={{marginBottom: 24}}>
                    <div style={{marginBottom: 8}}><b>Tags:</b> {service.tags && service.tags.map(tag => <span key={tag.id} style={{marginRight: 8, padding: '2px 8px', background: '#a21caf22', color: '#a21caf', borderRadius: 8}}>{String(tag.name || 'Unknown Tag')}</span>)}</div>
                    <div style={{marginBottom: 8}}><b>Categories:</b> {service.categories && service.categories.map(cat => <span key={cat.id} style={{marginRight: 8, padding: '2px 8px', background: '#f59e4222', color: '#f59e42', borderRadius: 8}}>{String(cat.name || 'Unknown Category')}</span>)}</div>
                    <div style={{marginBottom: 8}}><b>Countries:</b> {service.countries && service.countries.map(country => <span key={country.id} style={{marginRight: 8, padding: '2px 8px', background: '#2563eb22', color: '#2563eb', borderRadius: 8}}>{String(country.name || 'Unknown Country')}</span>)}</div>
                    <div style={{marginBottom: 8}}><b>Features:</b> {service.features && service.features.map(feature => <span key={feature.id} style={{marginRight: 8, padding: '2px 8px', background: '#22c55e22', color: '#22c55e', borderRadius: 8}}>{String(feature.title || 'Unknown Feature')}</span>)}</div>
                    <div style={{marginBottom: 8}}><b>Certificates:</b> {service.certificates && service.certificates.map(cert => <span key={cert.id} style={{marginRight: 8, padding: '2px 8px', background: '#0ea5e922', color: '#0ea5e9', borderRadius: 8}}>{String(cert.organisation_entity?.name || 'Unknown Organization')}</span>)}</div>
                </div>
                {/* Screenshots */}
                {service.screenshots && service.screenshots.length > 0 && (
                    <div style={{marginBottom: 24}}>
                        <h3 style={{marginBottom: 8}}>Screenshots</h3>
                        <div style={{display: 'flex', gap: 16, flexWrap: 'wrap'}}>
                            {service.screenshots.map((s, i) => (
                                <img key={i} src={s.image} alt={String(s.alt_text || 'Screenshot')} style={{width: 180, height: 120, objectFit: 'cover', borderRadius: 8, background: '#222'}} />
                            ))}
                        </div>
                    </div>
                )}
                {/* Mentions */}
                {service.mentions && service.mentions.length > 0 && (
                    <div style={{marginBottom: 24}}>
                        <h3 style={{marginBottom: 8}}>Mentions</h3>
                        <div style={{display: 'flex', gap: 16, flexWrap: 'wrap'}}>
                            {service.mentions.map((m, i) => (
                                <a key={i} href={m.link} target="_blank" rel="noopener noreferrer" style={{display: 'block', background: '#232323', borderRadius: 8, padding: 16, minWidth: 220, color: '#fff', textDecoration: 'none'}}>
                                    <div style={{fontWeight: 700, marginBottom: 4}}>{String(m.name || 'Unknown Mention')}</div>
                                    <div style={{fontSize: 14}}>{String(m.text || 'No text available')}</div>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
                {/* Related Services and Reviews can be added here as needed */}
            </div>
        </div>
    );
};

export default ServiceView;