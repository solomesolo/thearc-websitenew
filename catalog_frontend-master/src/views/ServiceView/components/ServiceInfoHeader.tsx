import React, { useState } from 'react'
import RatingComponent from '../../../components/RatingComponent'
import { Service } from '../../../api/types'
import { Link, useNavigate } from 'react-router-dom'
import "../styles/serviceInfoHeader.scss"
import arrow from "../../../assets/imgs/template/company-site-button-arrow.svg"
import ISOIconComponent from '../../../components/ISOIconComponent'

export const ServiceInfoHeader = ({ service }: { service: Service }) => {

  const [readMoreBio, setReadMoreBio] = useState(false)

  return (
    <div className="service-header-main">
      <div className="left-side">
        <div className="logo">
          <img src={service.logo} alt="logo" />
        </div>
        <div className="company-site-btn">
          <Link to={service.link}>
            <button className='cta-01' >
              <span>
                Company Site
              </span>
              <img src={arrow} />
            </button>
          </Link>
        </div>
      </div>

      <div className="right-side">
        <div className='company-name'>
          {String(service.name || 'Unknown Service')}
        </div>
        <div className="badge-row" style={{display: 'flex', gap: '12px', margin: '16px 0'}}>
          {/* Country */}
          {service.countries && service.countries.length > 0 && (
            <span style={{background: '#2563eb', color: '#fff', borderRadius: '16px', padding: '4px 12px', fontWeight: 600}}>
              {String(service.countries[0].name || 'Unknown Country')}
            </span>
          )}
          {/* Prime Tag */}
          {service.tags && service.tags.length > 0 && (
            <span style={{background: '#a21caf', color: '#fff', borderRadius: '16px', padding: '4px 12px', fontWeight: 600}}>
              {String(service.tags[0].name || 'Unknown Tag')}
            </span>
          )}
          {/* Category */}
          {service.categories && service.categories.length > 0 && (
            <span style={{background: '#f59e42', color: '#fff', borderRadius: '16px', padding: '4px 12px', fontWeight: 600}}>
              {String(service.categories[0].name || 'Unknown Category')}
            </span>
          )}
          {/* Features */}
          {service.features && service.features.map((f, i) => (
            <span key={i} style={{background: '#22c55e', color: '#fff', borderRadius: '16px', padding: '4px 12px', fontWeight: 600}}>
              {String(f.title || 'Unknown Feature')}
            </span>
          ))}
        </div>
        <div className="subheader">
          <div className="ratings">
            {service.ratings && service.ratings.length > 0 &&
              <RatingComponent rating={service.ratings[0]} />}
          </div>
        </div>
        <div className="divider"></div>
        <div className="company-description">
          {String(service.description || 'No description available')}
        </div>
        <div className="company-self-description">
          <span>How the company describes itself</span>
          <div className="company-self-description-bio">
            {readMoreBio ?
              <>{String(service.bio || 'No bio available')} <a href={"#"} onClick={() => setReadMoreBio(!readMoreBio)}>Collapse</a></>
              :
              (<>{String(service.bio || '').slice(0, 100)}... <a href={"#"} onClick={() => setReadMoreBio(true)}>Read more</a></>)}
          </div>
        </div>
      </div>
    </div>
  )
}
