import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { usePortfolioContext } from '../context/PortfolioContext';

export default function Skills() {
  const {
    portfolioData,
    isEditMode,
    updateSectionTitle: onUpdateTitle,
    updateSkill: onUpdateSkill,
    addSkill: onAddSkill,
    deleteSkill: onDeleteSkill,
    updateSkillCategory: onUpdateCategory,
    addSkillCategory: onAddCategory,
    deleteSkillCategory: onDeleteCategory
  } = usePortfolioContext();

  const title = portfolioData.sectionTitles.skills;
  const skillCategories = portfolioData.skills;
  
  const handleEditSectionTitle = () => {
    if (!isEditMode) return;
    const newTitle = prompt("Enter new section title:", title);
    if (newTitle !== null) onUpdateTitle('skills', newTitle);
  };

  const handleEditSkill = (catIdx, skillId, currentVal) => {
    if (!isEditMode) return;
    const newVal = prompt("Edit skill name:", currentVal);
    if (newVal !== null && newVal.trim() !== '') {
      onUpdateSkill(catIdx, skillId, 'name', newVal.trim());
    }
  };

  const handleEditCategory = (catIdx, currentTitle) => {
    if (!isEditMode) return;
    const newTitle = prompt("Enter new category title:", currentTitle);
    if (newTitle !== null && newTitle.trim() !== '') {
      onUpdateCategory(catIdx, newTitle.trim());
    }
  };

  // Helper to get Bento class and icon dynamically based on content
  const getBentoInfo = (category, index) => {
    const infos = [
      { icon: '🚀', desc: 'Core development stack and frameworks I use every day.' },
      { icon: '🎨', desc: 'Design systems and UI/UX styling tools.' },
      { icon: '⚡', desc: 'Performance and optimization tools.' },
      { icon: '🛠️', desc: 'Additional libraries.' },
      { icon: '📦', desc: 'State management.' }
    ];
    
    const baseInfo = infos[index] || { icon: '🔹', desc: 'Technical skill set.' };
    
    // Dynamic sizing based on number of skills
    const itemsCount = category.items ? category.items.length : 0;
    let bentoClass = 'small';
    
    if (itemsCount >= 6) {
      bentoClass = 'large';
    } else if (itemsCount >= 4) {
      bentoClass = index % 2 === 0 ? 'wide' : 'tall';
    } else {
      bentoClass = 'small';
    }

    return { ...baseInfo, class: bentoClass };
  };

  return (
    <section id="skills" className="category-section">
      <div className="section-header">
        <span className="section-number">02</span>
        <h2 
          className={isEditMode ? 'editable' : ''} 
          onClick={handleEditSectionTitle}
        >
          {title}
        </h2>
        <div className="section-line"></div>
      </div>

      <div className="infinite-tech-loop-container">
        <div className="infinite-tech-loop-track">
          {/* We render the list twice to create a seamless loop */}
          {[1, 2].map((loopIdx) => (
            <div key={loopIdx} className="infinite-tech-loop-content">
              {skillCategories.flatMap(cat => cat.items || []).map((skill, idx) => (
                <span key={`${loopIdx}-${skill.id || idx}`} className="tech-loop-item">
                  {skill.name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="bento-grid">
        {skillCategories.map((category, catIdx) => {
          const info = getBentoInfo(category, catIdx);
          return (
            <BentoItem 
              key={catIdx}
              className={`bento-item ${info.class}`}
              category={category}
              catIdx={catIdx}
              info={info}
              isEditMode={isEditMode}
              handleEditCategory={handleEditCategory}
              handleEditSkill={handleEditSkill}
              onAddSkill={() => onAddSkill(catIdx)}
              onDeleteSkill={onDeleteSkill}
              onDeleteCategory={() => onDeleteCategory(catIdx)}
            />
          );
        })}
        {isEditMode && (
          <motion.div 
            className="bento-item add-category-card"
            whileHover={{ scale: 1.02 }}
            onClick={onAddCategory}
            style={{ cursor: 'pointer', border: '2px dashed var(--blue)', justifyContent: 'center', alignItems: 'center', background: 'rgba(0,212,255,0.05)' }}
          >
            <span style={{ fontSize: '2rem', color: 'var(--blue)' }}>+ Add Category</span>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function BentoItem({ className, category, catIdx, info, isEditMode, handleEditCategory, handleEditSkill, onAddSkill, onDeleteSkill, onDeleteCategory }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  const xPx = useMotionTemplate`${springX}px`;
  const yPx = useMotionTemplate`${springY}px`;

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div 
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: catIdx * 0.1 }}
      onMouseMove={handleMouseMove}
      style={{
        "--x": xPx,
        "--y": yPx,
      }}
    >
      <div className="glow-bg" />
      
      {isEditMode && (
        <button 
          className="delete-category-btn"
          onClick={(e) => { e.stopPropagation(); onDeleteCategory(); }}
          style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,0,0,0.2)', border: 'none', color: '#ff4d4d', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', zIndex: 10 }}
        >
          ×
        </button>
      )}

      <div className="bento-content">
        <span className="bento-icon">{info.icon}</span>
        <h3 
          className={`bento-title ${isEditMode ? 'editable' : ''}`}
          onClick={() => handleEditCategory(catIdx, category.title)}
        >
          {category.title}
        </h3>
        <p className="bento-desc">{info.desc}</p>
        
        <div className="skill-tags-container" style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {(category.items || []).map((skill, idx) => (
            <div key={skill.id || idx} style={{ position: 'relative' }}>
              <motion.span 
                className={`skill-chip ${isEditMode ? 'editable' : ''}`}
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 212, 255, 0.2)', borderColor: 'var(--blue)' }}
                onClick={() => handleEditSkill(catIdx, skill.id, skill.name)}
                style={{ fontSize: '0.85rem', padding: '4px 12px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', cursor: 'pointer', display: 'inline-block' }}
              >
                {skill.name}
              </motion.span>
              {isEditMode && (
                <button 
                  onClick={(e) => { e.stopPropagation(); onDeleteSkill(catIdx, skill.id); }}
                  style={{ position: 'absolute', top: '-5px', right: '-5px', width: '16px', height: '16px', borderRadius: '50%', background: '#ff4d4d', border: 'none', color: 'white', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 5 }}
                >
                  ×
                </button>
              )}
            </div>
          ))}
          {isEditMode && (
            <motion.button 
              className="add-skill-chip"
              onClick={onAddSkill}
              whileHover={{ scale: 1.1 }}
              style={{ fontSize: '0.85rem', padding: '4px 12px', border: '1px dashed var(--blue)', borderRadius: '100px', background: 'transparent', color: 'var(--blue)', cursor: 'pointer' }}
            >
              + Add Skill
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
