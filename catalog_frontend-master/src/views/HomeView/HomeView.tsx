import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Select, { SingleValue } from 'react-select';
import { useCountry } from '../../contexts/CountryContext';
import './home.scss';
import map from '../../assets/imgs/template/map-desktop.svg';

interface CountryOption {
  value: string;
  label: string;
}

const countries: CountryOption[] = [
  'Australia',
  'France',
  'Germany',
  'Italy',
  'Portugal',
  'Spain',
  'United Kingdom',
  'United States of America',
].map(c => ({ value: c, label: c }));

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    background: 'transparent',
    borderColor: state.isFocused ? '#a21caf' : '#b3b3b3',
    boxShadow: 'none',
    borderRadius: 10,
    minHeight: 0,
    height: 48,
    color: state.isFocused ? '#a21caf' : '#b3b3b3',
    fontSize: '1rem',
    padding: 0,
    paddingLeft: 18,
    paddingRight: 18,
    width: '100%',
    maxWidth: 400,
    margin: '0 auto',
    fontFamily: 'Open Sans, sans-serif',
    zIndex: 2,
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    background: 'transparent',
    border: 'none',
    borderRadius: 0,
    padding: 0,
    margin: 0,
    boxShadow: 'none',
    width: '100%',
  }),
  singleValue: (provided: any, state: any) => ({
    ...provided,
    color: state.isFocused ? '#a21caf' : '#b3b3b3',
    background: 'transparent',
    border: 'none',
    borderRadius: 0,
    padding: 0,
    margin: 0,
    boxShadow: 'none',
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: '#b3b3b3',
    opacity: 1,
  }),
  menu: (provided: any) => ({
    ...provided,
    background: 'rgba(0,0,0,0.95)',
    border: 'none',
    borderRadius: 10,
    boxShadow: '0 4px 24px 0 rgba(162,28,175,0.10)',
    marginTop: 0,
    color: '#b3b3b3',
    fontSize: '1.1rem',
    overflow: 'hidden',
    zIndex: 3,
    left: 0,
    right: 0,
    minWidth: 0,
  }),
  menuList: (provided: any) => ({
    ...provided,
    padding: 0,
    borderRadius: 10,
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    background: state.isSelected
      ? '#a21caf'
      : state.isFocused
      ? 'rgba(162,28,175,0.15)'
      : 'transparent',
    color: state.isSelected || state.isFocused ? '#fff' : '#b3b3b3',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontFamily: 'Open Sans, sans-serif',
    padding: '12px 18px',
    borderRadius: 0,
  }),
  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    color: state.isFocused ? '#a21caf' : '#b3b3b3',
    padding: 6,
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  input: (provided: any) => ({
    ...provided,
    color: '#b3b3b3',
    background: 'transparent',
    border: 'none',
    borderRadius: 0,
    padding: 0,
    margin: 0,
    boxShadow: 'none',
  }),
  menuPortal: (base: any) => ({
    ...base,
    zIndex: 9999,
  }),
};

export default function HomeView() {
  const { selectedCountry, setSelectedCountry } = useCountry();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<CountryOption | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Initialize selected country from context
  useEffect(() => {
    if (selectedCountry) {
      const countryOption = countries.find(c => c.value === selectedCountry);
      if (countryOption) {
        setSelected(countryOption);
      }
    }
  }, [selectedCountry]);

  const handleCountryChange = useCallback((option: SingleValue<CountryOption>) => {
    setSelected(option);
    if (option) {
      setSelectedCountry(option.value);
    }
  }, [setSelectedCountry]);

  const handleExploreMarketplace = useCallback(() => {
    if (selected) {
      navigate(`/marketplace?country=${encodeURIComponent(selected.value)}`);
    } else {
      navigate('/marketplace');
    }
  }, [selected, navigate]);

  const handleMenuOpen = useCallback(() => setMenuOpen(true), []);
  const handleMenuClose = useCallback(() => setMenuOpen(false), []);

  const buttonClassName = useMemo(() => 
    `explore-btn${menuOpen ? ' blurred' : ''}`, [menuOpen]);

  return (
    <div className="home-wrapper">
      <div className="header-bar">
        <div className="thearc-logo">TheArc</div>
      </div>
      <div className="home-main">
        <div className="map">
          <img src={map} alt="map" />
        </div>
        <h1 className="main-title">Choose your country</h1>
        <Select
          className="country-select"
          classNamePrefix="country-select"
          options={countries}
          value={selected}
          onChange={handleCountryChange}
          placeholder="Choose your country to start"
          styles={customStyles}
          isSearchable={false}
          onMenuOpen={handleMenuOpen}
          onMenuClose={handleMenuClose}
        />
        <button 
          className={buttonClassName}
          type="button"
          onClick={handleExploreMarketplace}
        >
          Explore Marketplace
        </button>
      </div>
    </div>
  );
}