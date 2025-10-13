import React, { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';

interface CountryContextType {
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const useCountry = () => {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
};

interface CountryProviderProps {
  children: ReactNode;
}

export const CountryProvider: React.FC<CountryProviderProps> = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('United Kingdom');

  const setCountry = useCallback((country: string) => {
    if (selectedCountry !== country) {
      setSelectedCountry(country);
    }
  }, [selectedCountry]);

  const contextValue = useMemo(() => ({
    selectedCountry,
    setSelectedCountry: setCountry
  }), [selectedCountry, setCountry]);

  return (
    <CountryContext.Provider value={contextValue}>
      {children}
    </CountryContext.Provider>
  );
}; 