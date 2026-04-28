import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SectionNavigator({ links, activeSection, onUpdateLink, isEditMode }) {
  
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEditLabel = (e, index, currentName) => {
    e.stopPropagation(); // Prevent scroll when clicking to edit
    if (!isEditMode) return;
    const newName = prompt("Enter new navigation label:", currentName);
    if (newName !== null && newName.trim() !== '') {
      onUpdateLink(index, newName.trim());
    }
  };

  // Helper to map href to id (e.g. #home -> home)
  const getId = (href) => href.replace('#', '');

  return (
    <div className="section-navigator-v2">
      {/* The Track Base */}
      <div className="nav-track">
        <motion.div 
          className="nav-progress-glow" 
          animate={{ 
            height: `${(Math.max(0, links.findIndex(s => getId(s.href) === activeSection)) / Math.max(1, links.length - 1)) * 100}%` 
          }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
        />
        <motion.div 
          className="nav-scan-pulse"
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      <div className="nav-items">
        {links.map((s, i) => {
          const sectionId = getId(s.href);
          const isActive = activeSection === sectionId;
          const num = i < 10 ? `0${i}` : i;

          return (
            <div 
              key={s.href} 
              className={`nav-item-v2 ${isActive ? 'active' : ''}`}
              onClick={() => scrollToSection(sectionId)}
            >
              {/* Floating Label */}
              <AnimatePresence>
                {(isActive || isEditMode) && (
                  <motion.div 
                    className={`nav-label-v2 ${isEditMode ? 'editable' : ''}`}
                    initial={{ opacity: 0, x: 20, scale: 0.8 }}
                    animate={{ opacity: 1, x: -15, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.8 }}
                    transition={{ duration: 0.4, ease: [0.2, 0.65, 0.3, 0.9] }}
                    onClick={(e) => handleEditLabel(e, i, s.name)}
                  >
                    <span className="label-text">{s.name}</span>
                    <div className="label-line"></div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* The Hub (Dot) */}
              <motion.div 
                className="nav-hub"
                animate={{ 
                  width: isActive ? 40 : 12,
                  height: isActive ? 40 : 12,
                  backgroundColor: isActive ? 'rgba(0, 212, 255, 0.1)' : 'rgba(255,255,255,0.15)',
                  borderColor: isActive ? 'var(--blue)' : 'rgba(255,255,255,0.2)',
                  boxShadow: isActive ? '0 0 20px rgba(0, 212, 255, 0.4)' : 'none'
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.span 
                      className="hub-number"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                    >
                      {num}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
