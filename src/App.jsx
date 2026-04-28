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
import { usePortfolioData } from './hooks/usePortfolioData';

export default function App() {
  const {
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
  } = usePortfolioData();

  const [modalOpen, setModalOpen] = useState(false);
  const [editContext, setEditContext] = useState(null);

  // --- Advanced Cursor Logic ---
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onMouseOver = (e) => {
      if (e.target.closest('a, button, .editable, .card, .tab-btn, input, textarea')) {
        setCursorVariant("hover");
      }
    };

    const onMouseOut = (e) => {
      if (e.target.closest('a, button, .editable, .card, .tab-btn, input, textarea')) {
        setCursorVariant("default");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [cursorX, cursorY]);

  const variants = {
    default: {
      width: 36,
      height: 36,
      backgroundColor: "rgba(0, 212, 255, 0)",
      border: "1.5px solid rgba(0, 212, 255, 0.4)"
    },
    hover: {
      width: 60,
      height: 60,
      backgroundColor: "rgba(124, 58, 237, 0.1)",
      border: "1.5px solid rgba(124, 58, 237, 0.5)"
    }
  };

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
      <motion.div
        className="cursor-dot"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      <motion.div
        className="cursor-outline"
        variants={variants}
        animate={cursorVariant}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      <ReadingProgressBar />
      <FloatingElements />
      <BackgroundEffects />
      <SectionNavigator 
        links={portfolioData.navbar.links}
        activeSection={activeSection}
        onUpdateLink={updateNavbarLink}
        isEditMode={isEditMode}
      />

      <motion.div style={{ y: bgY, filter: bgFilter, opacity: bgOpacity }} className="parallax-bg-wrapper">
        <ParticleBackground />
      </motion.div>
      <motion.div className="grid-overlay" style={{ opacity: gridOpacity }} />

      <Navbar 
        data={portfolioData.navbar}
        isEditMode={isEditMode}
        onUpdateLogo={updateNavbarLogo}
        onUpdateLink={updateNavbarLink}
      />

      <div id="app-container">
        <Hero 
          profile={portfolioData.profile} 
          isEditMode={isEditMode} 
          toggleEditMode={toggleEditMode} 
          updateProfile={updateProfile} 
          onExport={exportPortfolioData}
        />
        
        <main>
          <FocusReveal delay={0}>
            <Projects 
              title={portfolioData.sectionTitles.projects}
              onUpdateTitle={(val) => updateSectionTitle('projects', val)}
              projects={portfolioData.professional} 
              isEditMode={isEditMode} 
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
              onAdd={handleAddItem}
            />
          </FocusReveal>
          <FocusReveal delay={0.1}>
            <Skills 
              title={portfolioData.sectionTitles.skills}
              onUpdateTitle={(val) => updateSectionTitle('skills', val)}
              skillCategories={portfolioData.skills} 
              isEditMode={isEditMode}
              onUpdateSkill={updateSkill}
              onAddSkill={addSkill}
              onDeleteSkill={deleteSkill}
              onUpdateCategory={updateSkillCategory}
              onAddCategory={addSkillCategory}
              onDeleteCategory={deleteSkillCategory}
            />
          </FocusReveal>
          <FocusReveal delay={0.1}>
            <About 
              titles={{
                selfDev: portfolioData.sectionTitles.aboutSelfDev,
                awards: portfolioData.sectionTitles.aboutAwards,
                leadership: portfolioData.sectionTitles.aboutLeadership
              }}
              onUpdateTitle={updateSectionTitle}
              selfdev={portfolioData.selfdev} 
              awards={portfolioData.awards} 
              leadership={portfolioData.leadership} 
              isEditMode={isEditMode} 
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
              onAdd={handleAddItem}
            />
          </FocusReveal>
          <FocusReveal delay={0.1}>
            <Contact 
              title={portfolioData.sectionTitles.contact}
              onUpdateTitle={(val) => updateSectionTitle('contact', val)}
              contactData={portfolioData.contact}
              onUpdateContact={updateContact}
              isEditMode={isEditMode}
            />
          </FocusReveal>
        </main>
        
        <Footer 
          data={portfolioData.footer}
          isEditMode={isEditMode}
          onUpdateLogo={updateFooterLogo}
        />
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
