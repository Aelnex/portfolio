import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import About from './components/About';
import Contact from './components/Contact';
import EditModal from './components/EditModal';
import ParticleBackground from './components/ParticleBackground';
import { usePortfolioData } from './hooks/usePortfolioData';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function App() {
  const {
    portfolioData,
    isEditMode,
    toggleEditMode,
    updateProfile,
    addItem,
    updateItem,
    deleteItem
  } = usePortfolioData();

  useScrollReveal();

  const [modalOpen, setModalOpen] = useState(false);
  const [editContext, setEditContext] = useState(null);

  // Custom Cursor
  useEffect(() => {
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    if (!dot || !outline) return;

    const onMouseMove = (e) => {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      outline.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 400, fill: 'forwards' });
    };

    const onMouseOver = (e) => {
      if (e.target.closest('a, button, .editable, .card, .tab-btn, input, textarea')) {
        outline.style.width = '50px';
        outline.style.height = '50px';
        outline.style.borderColor = 'rgba(124,58,237,0.5)';
      }
    };

    const onMouseOut = (e) => {
      if (e.target.closest('a, button, .editable, .card, .tab-btn, input, textarea')) {
        outline.style.width = '36px';
        outline.style.height = '36px';
        outline.style.borderColor = 'rgba(0,212,255,0.4)';
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('edit-mode', isEditMode);
  }, [isEditMode]);

  const handleEditItem = (category, subcategory, item) => {
    setEditContext({ category, subcategory, item });
    setModalOpen(true);
  };

  const handleAddItem = (category, subcategory) => {
    setEditContext({ category, subcategory, item: null });
    setModalOpen(true);
  };

  const handleDeleteItem = (category, subcategory, id) => {
    if (window.confirm('Delete this item?')) {
      deleteItem(category, subcategory, id);
    }
  };

  const handleSaveModal = (data) => {
    const { category, subcategory, item } = editContext;
    if (item) {
      updateItem(category, subcategory, item.id, data);
    } else {
      addItem(category, subcategory, data);
    }
    setModalOpen(false);
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="cursor-dot"></div>
      <div className="cursor-outline"></div>

      <ParticleBackground />
      <div className="grid-overlay"></div>

      <Navbar />

      <div id="app-container">
        <Hero 
          profile={portfolioData.profile} 
          isEditMode={isEditMode} 
          toggleEditMode={toggleEditMode} 
          updateProfile={updateProfile} 
        />
        
        <main>
          <Projects 
            projects={portfolioData.professional} 
            isEditMode={isEditMode} 
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
            onAdd={handleAddItem}
          />
          <Skills />
          <About 
            selfdev={portfolioData.selfdev} 
            awards={portfolioData.awards} 
            leadership={portfolioData.leadership} 
            isEditMode={isEditMode} 
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
            onAdd={handleAddItem}
          />
          <Contact />
        </main>
        
        <footer>
          <div className="footer-content">
            <p className="footer-logo">&lt;Portfolio /&gt;</p>
            <p>&copy; <span>{currentYear}</span>. Built with React & ❤️</p>
            <div className="footer-links">
              <a href="#home">Home</a>
              <a href="#professional-experience">Projects</a>
              <a href="#skills">Skills</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </footer>
      </div>

      <EditModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onSave={handleSaveModal}
        itemContext={editContext}
      />
    </>
  );
}
