import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactLenis } from '@studio-freight/react-lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import About from './components/About';
import Contact from './components/Contact';
import EditModal from './components/EditModal';
import ParticleBackground from './components/ParticleBackground';
import ReadingProgressBar from './components/ReadingProgressBar';
import Footer from './components/Footer';
import FocusReveal from './components/FocusReveal';
import FloatingElements from './components/FloatingElements';
import BackgroundEffects from './components/BackgroundEffects';
import SectionNavigator from './components/SectionNavigator';
import GooeyCursor from './components/GooeyCursor';
import { usePortfolioContext } from './context/PortfolioContext';

export default function App() {
  const {
    portfolioData,
    isEditMode,
    toggleEditMode,
    addItem,
    updateItem,
    deleteItem,
  } = usePortfolioContext();

  const [modalOpen, setModalOpen] = useState(false);
  const [editContext, setEditContext] = useState(null);

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

  // Background Perspective Scroll
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const bgBlur = useTransform(scrollYProgress, [0, 0.3, 1], [0, 2, 6]);
  const bgFilter = useTransform(bgBlur, v => `blur(${v}px)`);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.3, 0.15]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0.2]);

  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    portfolioData.navbar.links.forEach((link) => {
      const id = link.href.replace('#', '');
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [portfolioData.navbar.links]);

  return (
    <ReactLenis root>
      <GooeyCursor isEditMode={isEditMode} />
      <ReadingProgressBar />
      <FloatingElements />
      <BackgroundEffects />
      <SectionNavigator 
        links={portfolioData.navbar.links}
        activeSection={activeSection}
      />

      <motion.div style={{ y: bgY, filter: bgFilter, opacity: bgOpacity }} className="parallax-bg-wrapper">
        <ParticleBackground />
      </motion.div>
      <motion.div className="grid-overlay" style={{ opacity: gridOpacity }} />

      <Navbar />

      <div id="app-container">
        <Hero />
        
        <main>
          <FocusReveal delay={0}>
            <Projects 
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
              onAdd={handleAddItem}
            />
          </FocusReveal>
          <FocusReveal delay={0.1}>
            <Skills />
          </FocusReveal>
          <FocusReveal delay={0.1}>
            <About 
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
              onAdd={handleAddItem}
            />
          </FocusReveal>
          <FocusReveal delay={0.1}>
            <Contact />
          </FocusReveal>
        </main>
        
        <Footer />
      </div>

      <EditModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onSave={handleSaveModal}
        itemContext={editContext}
      />

      {/* Floating Admin Controls */}
      <div className="admin-controls" style={{ position: 'fixed', bottom: '2rem', left: '2rem', zIndex: 10000, display: 'flex', gap: '1rem' }}>
        <motion.button
          className={`admin-btn ${isEditMode ? 'active' : ''}`}
          onClick={toggleEditMode}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            padding: '12px 20px',
            borderRadius: '100px',
            background: isEditMode ? 'var(--blue)' : 'rgba(255,255,255,0.05)',
            border: '1px solid var(--blue)',
            color: isEditMode ? '#000' : 'var(--blue)',
            cursor: 'pointer',
            fontWeight: '600',
            boxShadow: isEditMode ? '0 0 20px var(--blue)' : 'none',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease'
          }}
        >
          {isEditMode ? '🚀 Exit Edit Mode' : '✎ Enable Edit Mode'}
        </motion.button>

        {isEditMode && (
          <motion.button
            className="admin-btn export-btn"
            onClick={() => {
              const dataStr = JSON.stringify(portfolioData, null, 4);
              const blob = new Blob([dataStr], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = 'portfolio-data.json';
              link.click();
              alert("Data exported! Save this file to backup your changes.");
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              padding: '12px 20px',
              borderRadius: '100px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid #fff',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: '600',
              backdropFilter: 'blur(10px)'
            }}
          >
            📥 Export JSON
          </motion.button>
        )}
      </div>
    </ReactLenis>
  );
}
