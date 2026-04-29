import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TiltCard from './TiltCard';
import { usePortfolioContext } from '../context/PortfolioContext';

export default function About({ onEdit, onDelete, onAdd }) {
  const { portfolioData, isEditMode, updateSectionTitle: onUpdateTitle } = usePortfolioContext();
  const selfdev = portfolioData.selfdev;
  const awards = portfolioData.awards;
  const leadership = portfolioData.leadership;
  const titles = {
    selfDev: portfolioData.sectionTitles.aboutSelfDev,
    awards: portfolioData.sectionTitles.aboutAwards,
    leadership: portfolioData.sectionTitles.aboutLeadership
  };
  return (
    <div id="about" className="perspective-container">
      <SubCategorySection
        id="self-development"
        number="03"
        title={titles.selfDev}
        onUpdateTitle={(val) => onUpdateTitle('aboutSelfDev', val)}
        categories={[
          { key: 'certifications', label: 'Certifications & Courses' },
          { key: 'workshops', label: 'Workshops & Seminars' }
        ]}
        data={selfdev}
        mainCategory="selfdev"
        isEditMode={isEditMode}
        onEdit={onEdit}
        onDelete={onDelete}
        onAdd={onAdd}
      />

      <TimelineSection 
        id="awards"
        number="04"
        title={titles.awards}
        onUpdateTitle={(val) => onUpdateTitle('aboutAwards', val)}
        data={awards} 
        mainCategory="awards"
        cat={ { key: 'competitions', label: 'Competitions' } }
        isEditMode={isEditMode}
        onEdit={onEdit}
        onDelete={onDelete}
        onAdd={onAdd}
      />

      <SubCategorySection
        id="leadership"
        number="05"
        title={titles.leadership}
        onUpdateTitle={(val) => onUpdateTitle('aboutLeadership', val)}
        categories={[
          { key: 'activities', label: 'Leadership & Volunteering' }
        ]}
        data={leadership}
        mainCategory="leadership"
        isEditMode={isEditMode}
        onEdit={onEdit}
        onDelete={onDelete}
        onAdd={onAdd}
      />
    </div>
  );
}

function ScrollRevealText({ text }) {
  const words = text.split(' ');
  return (
    <div className="scroll-reveal-text" style={{ fontSize: '1.2rem', lineHeight: '1.6', color: 'rgba(255,255,255,0.3)', marginBottom: '2rem' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ color: 'rgba(255,255,255,0.2)', filter: 'blur(4px)' }}
          whileInView={{ color: 'rgba(255,255,255,1)', filter: 'blur(0px)' }}
          viewport={{ once: false, margin: '-20% 0px -20% 0px' }}
          transition={{ duration: 0.5, delay: i * 0.02 }}
          style={{ display: 'inline-block', marginRight: '0.3em' }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

function SubCategorySection({ id, number, title, onUpdateTitle, categories, data, mainCategory, isEditMode, onEdit, onDelete, onAdd }) {
  const handleEditTitle = () => {
    if (!isEditMode) return;
    const newTitle = prompt("Enter new section title:", title);
    if (newTitle !== null) onUpdateTitle(newTitle);
  };

  return (
    <motion.section 
      id={id} 
      className="category-section perspective-section"
      initial={{ opacity: 0, rotateX: 10, y: 50 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
    >
      <div className="section-header">
        <span className="section-number">{number}</span>
        <h2 
          className={isEditMode ? 'editable' : ''} 
          onClick={handleEditTitle}
        >
          {title}
        </h2>
        <div className="section-line"></div>
      </div>

      {categories.map(cat => {
        const items = data[cat.key] || [];
        return (
          <div key={cat.key} className="subcategory">
            <ScrollRevealText text={cat.label} />
            <div className="items-container">
              {items.map((item, idx) => (
                <AboutCard 
                  key={item.id} 
                  item={item} 
                  index={idx}
                  isEditMode={isEditMode}
                  onEdit={() => onEdit(mainCategory, cat.key, item)}
                  onDelete={() => onDelete(mainCategory, cat.key, item.id)}
                />
              ))}
            </div>
            {isEditMode && (
              <button 
                className="btn add-item-btn"
                onClick={() => onAdd(mainCategory, cat.key)}
              >
                + Add New to {cat.label}
              </button>
            )}
          </div>
        );
      })}
    </motion.section>
  );
}

function TimelineSection({ id, number, title, onUpdateTitle, data, mainCategory, cat, isEditMode, onEdit, onDelete, onAdd }) {
  const items = data[cat.key] || [];
  
  const handleEditTitle = () => {
    if (!isEditMode) return;
    const newTitle = prompt("Enter new section title:", title);
    if (newTitle !== null) onUpdateTitle(newTitle);
  };

  return (
    <motion.section 
      id={id} 
      className="category-section perspective-section"
      initial={{ opacity: 0, rotateX: 10, y: 50 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
    >
      <div className="section-header">
        <span className="section-number">{number}</span>
        <h2 
          className={isEditMode ? 'editable' : ''} 
          onClick={handleEditTitle}
        >
          {title}
        </h2>
        <div className="section-line"></div>
      </div>

      <div className="timeline-container">
        <ScrollRevealText text="My Journey and Achievements" />
        <div className="timeline-line"></div>
        <div className="timeline-items">
          <AnimatePresence>
            {items.map((item, idx) => (
              <TimelineItem 
                key={item.id} 
                item={item} 
                idx={idx} 
                isEditMode={isEditMode}
                onEdit={() => onEdit(mainCategory, cat.key, item)}
                onDelete={() => onDelete(mainCategory, cat.key, item.id)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
      
      {isEditMode && (
        <button 
          className="btn add-item-btn"
          onClick={() => onAdd(mainCategory, cat.key)}
        >
          + Add New to {cat.label}
        </button>
      )}
    </motion.section>
  );
}

function TimelineItem({ item, idx, isEditMode, onEdit, onDelete }) {
  const CardWrapper = item.link ? 'a' : 'div';
  const wrapperProps = item.link ? { href: item.link, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <TiltCard className="timeline-tilt-container" tiltStrength={10}>
      <motion.div 
        className="timeline-item"
        initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="timeline-dot"></div>
        <CardWrapper className="timeline-content" {...wrapperProps} style={{ textDecoration: 'none', cursor: item.link ? 'pointer' : 'default' }}>
          <h4>
            {item.title}
            {item.link && <span style={{ marginLeft: '8px', fontSize: '0.8rem', verticalAlign: 'middle', opacity: 0.6 }}>🔗</span>}
          </h4>
          <div className="role">{item.role}</div>
          <p>{item.description}</p>
          {isEditMode && (
            <div className="card-actions">
              <button className="action-btn edit-item" onClick={(e) => { e.preventDefault(); onEdit(); }}>✎</button>
              <button className="action-btn delete delete-item" onClick={(e) => { e.preventDefault(); onDelete(); }}>×</button>
            </div>
          )}
        </CardWrapper>
      </motion.div>
    </TiltCard>
  );
}

function AboutCard({ item, index, isEditMode, onEdit, onDelete }) {
  const CardWrapper = item.link ? 'a' : 'div';
  const wrapperProps = item.link ? { href: item.link, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <TiltCard className="about-tilt-container">
      <motion.div 
        className={`card ${item.link ? 'clickable-card' : ''}`}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        style={{ 
          background: 'rgba(255,255,255,0.03)', 
          border: '1px solid rgba(255,255,255,0.08)', 
          borderRadius: '20px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <CardWrapper {...wrapperProps} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          {item.imageUrl && <img src={item.imageUrl} alt={item.title} style={{ borderRadius: '12px', marginBottom: '1rem', width: '100%' }} />}
          <h4 style={{ color: 'var(--blue)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {item.title}
            {item.link && <span className="link-icon">↗</span>}
          </h4>
          <div className="role" style={{ opacity: 0.7, fontSize: '0.9rem', marginBottom: '0.5rem' }}>{item.role}</div>
          <p style={{ opacity: 0.6, fontSize: '0.95rem' }}>{item.description}</p>
        </CardWrapper>

        {isEditMode && (
          <div className="card-actions">
            <button className="action-btn edit-item" onClick={(e) => { e.stopPropagation(); onEdit(); }}>✎</button>
            <button className="action-btn delete delete-item" onClick={(e) => { e.stopPropagation(); onDelete(); }}>×</button>
          </div>
        )}
      </motion.div>
    </TiltCard>
  );
}
