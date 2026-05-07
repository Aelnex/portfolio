import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { usePortfolioContext } from '../context/PortfolioContext';

export default function Skills() {
  const { portfolioData } = usePortfolioContext();

  const title = portfolioData.sectionTitles.skills;
  const skillCategories = portfolioData.skills;

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
        <h2>
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
            />
          );
        })}
      </div>
    </section>
  );
}

function BentoItem({ className, category, catIdx, info }) {
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
      
      <div className="bento-content">
        <span className="bento-icon">{info.icon}</span>
        <h3 className="bento-title">
          {category.title}
        </h3>
        <p className="bento-desc">{info.desc}</p>
        
        <div className="skill-tags-container" style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {(category.items || []).map((skill, idx) => (
            <div key={skill.id || idx} style={{ position: 'relative' }}>
              <motion.span 
                className="skill-chip"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 212, 255, 0.2)', borderColor: 'var(--blue)' }}
                style={{ fontSize: '0.85rem', padding: '4px 12px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', display: 'inline-block' }}
              >
                {skill.name}
              </motion.span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
