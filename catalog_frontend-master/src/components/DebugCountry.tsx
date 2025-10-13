import React from 'react';
import { useCountry } from '../contexts/CountryContext';

export const DebugCountry: React.FC = () => {
  const { selectedCountry, setSelectedCountry } = useCountry();

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      left: '10px', 
      background: 'red', 
      color: 'white', 
      padding: '10px', 
      zIndex: 9999,
      fontSize: '12px'
    }}>
      <div>Debug: {selectedCountry}</div>
      <button onClick={() => setSelectedCountry('Germany')}>Set Germany</button>
      <button onClick={() => setSelectedCountry('France')}>Set France</button>
    </div>
  );
}; 