import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TiltCard from './TiltCard';

export default function Projects({ title, onUpdateTitle, projects, isEditMode, onEdit, onDelete, onAdd }) {
  const categories = Object.keys(projects);
  const [activeTab, setActiveTab] = useState(categories[0] || '');

  const handleEditTitle = () => {
    if (!isEditMode) return;
    const newTitle = prompt("Enter new section title:", title);
    if (newTitle !== null) onUpdateTitle(newTitle);
  };

  const activeItems = projects[activeTab] || [];

  return (
    <section id="professional-experience" className="category-section perspective-container">
      <motion.div
        className="perspective-section"
        initial={{ opacity: 0, rotateX: 10, y: 50 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
      >
        <div className="section-header">
          <span className="section-number">01</span>
          <h2 
            className={isEditMode ? 'editable' : ''} 
            onClick={handleEditTitle}
          >
            {title}
          </h2>
          <div className="section-line"></div>
        </div>

        <div className="tabs">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`tab-btn ${activeTab === cat ? 'active' : ''}`}
              onClick={() => setActiveTab(cat)}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="items-container"
        >
          <AnimatePresence mode='wait'>
            {activeItems.length === 0 && !isEditMode && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="empty-state"
              >
                &gt; no items found_
              </motion.div>
            )}
            {activeItems.map((item, idx) => (
              <ProjectCard 
                key={item.id} 
                item={item} 
                index={idx}
                isEditMode={isEditMode}
                onEdit={() => onEdit('professional', activeTab, item)}
                onDelete={() => onDelete('professional', activeTab, item.id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {isEditMode && (
          <button 
            className="btn add-item-btn"
            onClick={() => onAdd('professional', activeTab)}
          >
            + Add New Project to {activeTab}
          </button>
        )}
      </motion.div>
    </section>
  );
}

function ProjectCard({ item, index, isEditMode, onEdit, onDelete }) {
  const CardWrapper = item.link ? 'a' : 'div';
  const wrapperProps = item.link ? { href: item.link, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <TiltCard className="card-tilt-container">
      <motion.div 
        layout
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ 
          duration: 0.4, 
          delay: index * 0.05,
          layout: { duration: 0.4, type: "spring", stiffness: 200, damping: 25 }
        }}
        className={`card ${item.link ? 'clickable-card' : ''}`} 
        whileHover="hover"
      >
        <CardWrapper {...wrapperProps} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          {item.imageUrl && (
            <div className="project-image-mask" style={{ overflow: 'hidden', position: 'relative' }}>
              <motion.div
                variants={{
                  hover: { borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: '12px' }}
              >
                <motion.div
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: [0.6, 0.05, 0.01, 0.9] }}
                  style={{ width: '100%', height: '100%' }}
                >
                  <motion.img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    variants={{
                      hover: { scale: 1.1 }
                    }}
                    initial={{ scale: 1.3, filter: 'blur(10px)' }}
                    whileInView={{ scale: 1, filter: 'blur(0px)' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </motion.div>
              </motion.div>
              {item.link && (
                <div className="link-badge">
                  <span>VIEW PROJECT</span>
                </div>
              )}
            </div>
          )}
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {item.title}
            {item.link && <span className="link-icon">↗</span>}
          </h4>
          <div className="role" style={{ color: 'var(--blue)', fontWeight: 600 }}>{item.role || ''}</div>
          <p style={{ opacity: 0.7 }}>{item.description || ''}</p>
          
          <div className="skills">
            {(item.learnings || '').split(',').filter(s => s.trim() !== '').map((skill, i) => (
              <span key={i} className="skill-tag" style={{ border: '1px solid rgba(0,212,255,0.2)', background: 'rgba(0,212,255,0.05)' }}>
                {skill.trim()}
              </span>
            ))}
          </div>
        </CardWrapper>

        {isEditMode && (
          <div className="card-actions">
            <button className="action-btn edit-item" title="Edit" onClick={(e) => { e.preventDefault(); onEdit(); }}>✎</button>
            <button className="action-btn delete delete-item" title="Delete" onClick={(e) => { e.preventDefault(); onDelete(); }}>×</button>
          </div>
        )}
      </motion.div>
    </TiltCard>
  );
}
