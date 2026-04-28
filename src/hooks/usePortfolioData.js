import { useState, useEffect } from 'react';
import { defaultPortfolioData } from '../data/defaultData';

export function usePortfolioData() {
  const [portfolioData, setPortfolioData] = useState(() => {
    const saved = localStorage.getItem('portfolioData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...defaultPortfolioData,
          ...parsed,
          profile: { ...defaultPortfolioData.profile, ...parsed.profile },
          navbar: { ...defaultPortfolioData.navbar, ...parsed.navbar },
          footer: { ...defaultPortfolioData.footer, ...parsed.footer },
          sectionTitles: { ...defaultPortfolioData.sectionTitles, ...parsed.sectionTitles },
          professional: { ...defaultPortfolioData.professional, ...parsed.professional },
          selfdev: { ...defaultPortfolioData.selfdev, ...parsed.selfdev },
          awards: { ...defaultPortfolioData.awards, ...parsed.awards },
          leadership: { ...defaultPortfolioData.leadership, ...parsed.leadership },
          skills: parsed.skills || defaultPortfolioData.skills,
          contact: parsed.contact || defaultPortfolioData.contact || {
            facebook: '',
            github: '',
            phone: '',
            email: '',
            linkedin: ''
          }
        };
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
      profile: { ...prev.profile, [field]: value }
    }));
  };

  const updateContact = (field, value) => {
    setPortfolioData(prev => ({
      ...prev,
      contact: { ...prev.contact, [field]: value }
    }));
  };

  const updateSectionTitle = (section, title) => {
    setPortfolioData(prev => ({
      ...prev,
      sectionTitles: { ...prev.sectionTitles, [section]: title }
    }));
  };

  const updateFooterLogo = (logo) => {
    setPortfolioData(prev => ({
      ...prev,
      footer: { ...prev.footer, logo }
    }));
  };

  const updateNavbarLogo = (logo) => {
    setPortfolioData(prev => ({
      ...prev,
      navbar: { ...prev.navbar, logo }
    }));
  };

  const updateNavbarLink = (idx, name) => {
    setPortfolioData(prev => {
      const newLinks = [...prev.navbar.links];
      newLinks[idx] = { ...newLinks[idx], name };
      return { ...prev, navbar: { ...prev.navbar, links: newLinks } };
    });
  };

  // --- Skills Management ---
  const updateSkill = (categoryIdx, skillId, field, value) => {
    setPortfolioData(prev => {
      const newSkills = [...prev.skills];
      newSkills[categoryIdx] = {
        ...newSkills[categoryIdx],
        items: newSkills[categoryIdx].items.map(item =>
          item.id === skillId ? { ...item, [field]: value } : item
        )
      };
      return { ...prev, skills: newSkills };
    });
  };

  const addSkill = (categoryIdx) => {
    setPortfolioData(prev => {
      const newSkills = [...prev.skills];
      const newItem = { id: Date.now().toString(), name: "New Skill", level: "80%" };
      newSkills[categoryIdx] = {
        ...newSkills[categoryIdx],
        items: [...newSkills[categoryIdx].items, newItem]
      };
      return { ...prev, skills: newSkills };
    });
  };

  const deleteSkill = (categoryIdx, skillId) => {
    setPortfolioData(prev => {
      const newSkills = [...prev.skills];
      newSkills[categoryIdx] = {
        ...newSkills[categoryIdx],
        items: newSkills[categoryIdx].items.filter(item => item.id !== skillId)
      };
      return { ...prev, skills: newSkills };
    });
  };

  const updateSkillCategory = (categoryIdx, title) => {
    setPortfolioData(prev => {
      const newSkills = [...prev.skills];
      newSkills[categoryIdx] = { ...newSkills[categoryIdx], title };
      return { ...prev, skills: newSkills };
    });
  };

  const addSkillCategory = () => {
    setPortfolioData(prev => ({
      ...prev,
      skills: [...prev.skills, { title: "New Category", items: [] }]
    }));
  };

  const deleteSkillCategory = (categoryIdx) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== categoryIdx)
    }));
  };

  // --- Item Management (Projects, Awards, etc.) ---
  const addItem = (category, subcategory, item) => {
    setPortfolioData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subcategory]: [...(prev[category][subcategory] || []), { ...item, id: Date.now().toString() }]
      }
    }));
  };

  const updateItem = (category, subcategory, id, updatedItem) => {
    setPortfolioData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subcategory]: (prev[category][subcategory] || []).map(item =>
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
        [subcategory]: (prev[category][subcategory] || []).filter(item => item.id !== id)
      }
    }));
  };

  const toggleEditMode = () => {
    setIsEditMode(prev => !prev);
  };

  const exportPortfolioData = () => {
    const dataStr = JSON.stringify(portfolioData, null, 4);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    alert("Data exported! Please send the downloaded 'portfolio-data.json' file to me.");
  };

  return {
    portfolioData,
    isEditMode,
    toggleEditMode,
    updateProfile,
    updateContact,
    updateSectionTitle,
    updateNavbarLogo,
    updateNavbarLink,
    updateFooterLogo,
    updateSkill,
    addSkill,
    deleteSkill,
    updateSkillCategory,
    addSkillCategory,
    deleteSkillCategory,
    addItem,
    updateItem,
    deleteItem,
    exportPortfolioData
  };
}
