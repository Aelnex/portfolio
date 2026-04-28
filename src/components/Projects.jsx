import React, { useState } from 'react';

export default function Projects({ projects, isEditMode, onEdit, onDelete, onAdd }) {
  const [activeTab, setActiveTab] = useState('production');

  const tabs = [
    { id: 'production', label: 'Production' },
    { id: 'competition', label: 'Competition' },
    { id: 'academic', label: 'Academic' },
    { id: 'personal', label: 'Personal' },
    { id: 'opensource', label: 'Open Source' },
  ];

  const handleMouseMove = (e, cardRef) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -8;
    const rotateY = ((x - cx) / cx) * 8;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
  };

  const handleMouseLeave = (cardRef) => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)';
  };

  const activeItems = projects[activeTab] || [];

  return (
    <section id="professional-experience" className="category-section reveal-section">
      <div className="section-header">
        <span className="section-number">01</span>
        <h2>// Projects</h2>
        <div className="section-line"></div>
      </div>
      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="tab-content active">
        <div className="items-container">
          {activeItems.length === 0 && !isEditMode && (
            <div className="empty-state">&gt; no items found_</div>
          )}
          {activeItems.map((item, idx) => (
            <ProjectCard 
              key={item.id} 
              item={item} 
              index={idx}
              isEditMode={isEditMode}
              onEdit={() => onEdit('professional', activeTab, item)}
              onDelete={() => onDelete('professional', activeTab, item.id)}
              handleMouseMove={handleMouseMove}
              handleMouseLeave={handleMouseLeave}
            />
          ))}
        </div>
        {isEditMode && (
          <button 
            className="btn add-item-btn"
            onClick={() => onAdd('professional', activeTab)}
          >
            + Add {tabs.find(t => t.id === activeTab).label} Project
          </button>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ item, index, isEditMode, onEdit, onDelete, handleMouseMove, handleMouseLeave }) {
  const cardRef = React.useRef(null);
  
  const skills = item.learnings ? item.learnings.split(',').map(s => s.trim()).filter(s => s) : [];

  return (
    <div 
      ref={cardRef}
      className="card reveal-item" 
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseMove={(e) => handleMouseMove(e, cardRef)}
      onMouseLeave={() => handleMouseLeave(cardRef)}
    >
      {item.imageUrl && <img src={item.imageUrl} alt={item.title} />}
      <h4>{item.title}</h4>
      <div className="role">{item.role || ''}</div>
      <p>{item.description || ''}</p>
      {skills.length > 0 && (
        <div className="skills">
          {skills.map((s, i) => <span key={i} className="skill-tag">{s}</span>)}
        </div>
      )}
      {isEditMode && (
        <div className="card-actions" style={{ opacity: 1 }}>
          <button className="action-btn edit-item" title="Edit" onClick={onEdit}>✎</button>
          <button className="action-btn delete delete-item" title="Delete" onClick={onDelete}>×</button>
        </div>
      )}
    </div>
  );
}
