import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
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
    </ReactLenis>
  );
}
