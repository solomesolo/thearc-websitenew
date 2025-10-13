import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
// import geoIcon from "../assets/imgs/template/geolocation.svg"; // Removed to prevent twitching
import "./navBarRight.css";
import { useCountry } from '../contexts/CountryContext';
import { useNavigate } from 'react-router-dom';

const COUNTRIES = [
  'United Kingdom',
  'Germany',
  'France',
  'Italy',
  'Spain',
  'Netherlands',
  'Belgium',
  'Austria',
  'Switzerland',
  'Sweden',
  'Norway',
  'Denmark',
  'Finland',
  'Poland',
  'Czech Republic',
  'Hungary',
  'Slovakia',
  'Slovenia',
  'Croatia',
  'Bulgaria',
  'Romania',
  'Greece',
  'Portugal',
  'Ireland',
  'Luxembourg',
  'Malta',
  'Cyprus',
  'Estonia',
  'Latvia',
  'Lithuania',
  'United States',
  'Canada',
  'Australia',
  'Japan',
  'South Korea',
  'China',
  'India',
  'Brazil',
  'Mexico',
  'Argentina',
  'Chile',
  'Colombia',
  'Peru',
  'Uruguay',
  'Paraguay',
  'Bolivia',
  'Ecuador',
  'Venezuela',
  'Guyana',
  'Suriname',
  'French Guiana',
  'South Africa',
  'Nigeria',
  'Kenya',
  'Ghana',
  'Ethiopia',
  'Tanzania',
  'Uganda',
  'Morocco',
  'Algeria',
  'Tunisia',
  'Egypt',
  'Libya',
  'Sudan',
  'Chad',
  'Niger',
  'Mali',
  'Burkina Faso',
  'Senegal',
  'Guinea',
  'Sierra Leone',
  'Liberia',
  'Ivory Coast',
  'Togo',
  'Benin',
  'Cameroon',
  'Central African Republic',
  'Equatorial Guinea',
  'Gabon',
  'Republic of the Congo',
  'Democratic Republic of the Congo',
  'Angola',
  'Zambia',
  'Zimbabwe',
  'Botswana',
  'Namibia',
  'Lesotho',
  'Eswatini',
  'Mozambique',
  'Madagascar',
  'Mauritius',
  'Seychelles',
  'Comoros',
  'Mayotte',
  'Reunion',
  'Djibouti',
  'Somalia',
  'Eritrea',
  'Burundi',
  'Rwanda',
  'Malawi'
] as const;

export const NavBarRight = React.memo(() => {
  const { selectedCountry, setSelectedCountry } = useCountry();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCountrySelect = useCallback((country: string) => {
    setSelectedCountry(country);
    setIsOpen(false);
    // Navigate to marketplace with country filter
    navigate(`/marketplace?country=${encodeURIComponent(country)}`);
  }, [setSelectedCountry, navigate]);

  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const dropdownStyle = useMemo(() => ({
    position: 'absolute' as const,
    right: 0,
    top: '100%',
    zIndex: 1000,
    background: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    maxHeight: '300px',
    overflowY: 'auto' as const,
    minWidth: '200px',
    listStyle: 'none' as const,
    padding: 0,
    margin: 0
  }), []);

  const buttonStyle = useMemo(() => ({
    background: 'transparent',
    border: 'none',
    color: '#fff'
  }), []);

  const countryItems = useMemo(() => 
    COUNTRIES.map((country) => (
      <li key={country} style={{ margin: 0, padding: 0 }}>
        <button
          className="dropdown-item"
          onClick={() => handleCountrySelect(country)}
          style={{
            background: country === selectedCountry ? '#f8f9fa' : 'transparent',
            border: 'none',
            width: '100%',
            textAlign: 'left' as const,
            padding: '8px 16px',
            cursor: 'pointer',
            color: country === selectedCountry ? '#007bff' : '#333',
            fontSize: '14px'
          }}
        >
          {country}
        </button>
      </li>
    )), [selectedCountry, handleCountrySelect]);

  return (
    <div className="menu-topbar-right" ref={dropdownRef}>
      <div className="dropdown dropdown-language">
        <button 
          className="btn dropdown-toggle" 
          id="dropdownPage" 
          type="button"
          onClick={toggleDropdown}
          style={buttonStyle}
        >
          <div className="dropdown-right font-xs color-brand-3">
            {/* Image replaced with text to prevent twitching */}
            <span style={{ marginRight: '8px' }}>📍</span>
            <div className="text">
              {selectedCountry}
            </div>
          </div>
        </button>
        <ul 
          className={`dropdown-menu dropdown-menu-light ${isOpen ? 'show' : ''}`}
          style={dropdownStyle}
        >
          {countryItems}
        </ul>
      </div>
    </div>
  );
});
