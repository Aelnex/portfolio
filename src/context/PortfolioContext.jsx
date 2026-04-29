import React, { createContext, useContext } from 'react';
import { usePortfolioData } from '../hooks/usePortfolioData';

const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  const portfolioDataValue = usePortfolioData();

  return (
    <PortfolioContext.Provider value={portfolioDataValue}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolioContext() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolioContext must be used within a PortfolioProvider');
  }
  return context;
}
