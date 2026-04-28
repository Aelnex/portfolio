import React, { useState, useEffect } from 'react';

export default function EditModal({ isOpen, onClose, onSave, itemContext }) {
  const [formData, setFormData] = useState({
    title: '',
    role: '',
    description: '',
    learnings: '',
    imageUrl: '',
    link: ''
  });

  useEffect(() => {
    if (itemContext && itemContext.item) {
      setFormData({
        title: itemContext.item.title || '',
        role: itemContext.item.role || '',
        description: itemContext.item.description || '',
        learnings: itemContext.item.learnings || '',
        imageUrl: itemContext.item.imageUrl || '',
        link: itemContext.item.link || ''
      });
    } else {
      setFormData({
        title: '',
        role: '',
        description: '',
        learnings: '',
        imageUrl: '',
        link: ''
      });
    }
  }, [itemContext, isOpen]);

  if (!isOpen || !itemContext) return null;

  const { category } = itemContext;
  
  let labels = {
    title: 'Title / Project Name',
    role: 'Role / Position',
    description: 'Description',
    learnings: 'Skills (comma separated)',
    imageUrl: 'Image URL or Upload',
    link: 'External Link / URL'
  };

  if (category === 'selfdev') { 
    labels.title = 'Course / Event'; 
    labels.role = 'Provider'; 
  } else if (category === 'awards') { 
    labels.title = 'Award Name'; 
    labels.role = 'Organizer'; 
  } else if (category === 'leadership') { 
    labels.title = 'Activity'; 
    labels.role = 'Role'; 
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div id="edit-modal" className="modal">
      <div className="modal-content">
        <span className="close-modal" onClick={onClose}>&times;</span>
        <h2 id="modal-title">{itemContext.item ? '// edit_item' : '// new_item'}</h2>
        <form id="edit-form" onSubmit={handleSubmit}>
          <div id="form-fields">
            <div className="form-group">
              <label>{labels.title}</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>{labels.role}</label>
              <input type="text" name="role" value={formData.role} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>{labels.description}</label>
              <textarea name="description" rows="3" value={formData.description} onChange={handleChange}></textarea>
            </div>
            <div className="form-group">
              <label>{labels.learnings}</label>
              <input type="text" name="learnings" value={formData.learnings} onChange={handleChange} placeholder="React, Node.js, etc." />
            </div>
            <div className="form-group">
              <label>{labels.imageUrl}</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input 
                  type="text" 
                  name="imageUrl" 
                  value={formData.imageUrl} 
                  onChange={handleChange} 
                  placeholder="https://... or select file below" 
                />
                <input 
                  type="file" 
                  onChange={handleFileChange} 
                  accept="image/*"
                  style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}
                />
              </div>
            </div>
            <div className="form-group">
              <label>{labels.link}</label>
              <input type="url" name="link" value={formData.link} onChange={handleChange} placeholder="https://..." />
            </div>
          </div>
          <button type="submit" className="btn neon-btn">Save</button>
        </form>
      </div>
    </div>
  );
}
