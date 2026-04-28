import { useState, useEffect } from 'react';
import { defaultPortfolioData } from '../data/defaultData';

export function usePortfolioData() {
  const [portfolioData, setPortfolioData] = useState(() => {
    const saved = localStorage.getItem('portfolioData');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultPortfolioData;
      }
    }
    return defaultPortfolioData;
  });

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
  }, [portfolioData]);

  const updateProfile = (field, value) => {
    setPortfolioData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value
      }
    }));
  };

  const addItem = (category, subcategory, item) => {
    setPortfolioData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subcategory]: [...prev[category][subcategory], { ...item, id: Date.now().toString() }]
      }
    }));
  };

  const updateItem = (category, subcategory, id, updatedItem) => {
    setPortfolioData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subcategory]: prev[category][subcategory].map(item =>
          item.id === id ? { ...item, ...updatedItem } : item
        )
      }
    }));
  };

  const deleteItem = (category, subcategory, id) => {
    setPortfolioData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subcategory]: prev[category][subcategory].filter(item => item.id !== id)
      }
    }));
  };

  const toggleEditMode = () => {
    setIsEditMode(prev => !prev);
  };

  return {
    portfolioData,
    isEditMode,
    toggleEditMode,
    updateProfile,
    addItem,
    updateItem,
    deleteItem
  };
}
