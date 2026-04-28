import React from 'react';

export default function About({ 
  selfdev, 
  awards, 
  leadership, 
  isEditMode, 
  onEdit, 
  onDelete, 
  onAdd 
}) {
  return (
    <div id="about">
      <SubCategorySection
        id="self-development"
        number="03"
        title="Self-Development"
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

      <SubCategorySection
        id="awards"
        number="04"
        title="Awards & Achievements"
        categories={[
          { key: 'competitions', label: 'Competitions' },
          { key: 'honors', label: 'Honors & Scholarships' }
        ]}
        data={awards}
        mainCategory="awards"
        isEditMode={isEditMode}
        onEdit={onEdit}
        onDelete={onDelete}
        onAdd={onAdd}
      />

      <SubCategorySection
        id="leadership"
        number="05"
        title="Leadership & Volunteer"
        categories={[
          { key: 'activities', label: 'Activities' }
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

function SubCategorySection({ id, number, title, categories, data, mainCategory, isEditMode, onEdit, onDelete, onAdd }) {
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

  return (
    <section id={id} className="category-section reveal-section">
      <div className="section-header">
        <span className="section-number">{number}</span>
        <h2>// {title}</h2>
        <div className="section-line"></div>
      </div>
      
      {categories.map(cat => {
        const items = data[cat.key] || [];
        return (
          <div key={cat.key} className="subcategory">
            <h3>{cat.label}</h3>
            <div className="items-container">
              {items.length === 0 && !isEditMode && (
                <div className="empty-state">&gt; no items found_</div>
              )}
              {items.map((item, idx) => (
                <AboutCard 
                  key={item.id} 
                  item={item} 
                  index={idx}
                  isEditMode={isEditMode}
                  onEdit={() => onEdit(mainCategory, cat.key, item)}
                  onDelete={() => onDelete(mainCategory, cat.key, item.id)}
                  handleMouseMove={handleMouseMove}
                  handleMouseLeave={handleMouseLeave}
                />
              ))}
            </div>
            {isEditMode && (
              <button 
                className="btn add-item-btn"
                onClick={() => onAdd(mainCategory, cat.key)}
              >
                + Add {cat.label.split(' ')[0]}
              </button>
            )}
          </div>
        );
      })}
    </section>
  );
}

function AboutCard({ item, index, isEditMode, onEdit, onDelete, handleMouseMove, handleMouseLeave }) {
  const cardRef = React.useRef(null);
  
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
      {isEditMode && (
        <div className="card-actions" style={{ opacity: 1 }}>
          <button className="action-btn edit-item" title="Edit" onClick={onEdit}>✎</button>
          <button className="action-btn delete delete-item" title="Delete" onClick={onDelete}>×</button>
        </div>
      )}
    </div>
  );
}
