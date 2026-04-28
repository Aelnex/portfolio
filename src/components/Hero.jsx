import React, { useState, useEffect } from 'react';

export default function Hero({ profile, isEditMode, toggleEditMode, updateProfile }) {
  const [typingText, setTypingText] = useState('');
  
  useEffect(() => {
    const roles = ['Frontend Developer', 'Full-Stack Engineer', 'UI Builder', 'Creative Coder'];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timeout;

    const type = () => {
      const current = roles[roleIdx];
      if (isDeleting) {
        setTypingText(current.substring(0, charIdx - 1));
        charIdx--;
        if (charIdx < 0) {
          isDeleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
          timeout = setTimeout(type, 400);
          return;
        }
        timeout = setTimeout(type, 40);
      } else {
        setTypingText(current.substring(0, charIdx + 1));
        charIdx++;
        if (charIdx > current.length) {
          isDeleting = true;
          timeout = setTimeout(type, 1800);
          return;
        }
        timeout = setTimeout(type, 80);
      }
    };
    timeout = setTimeout(type, 600);
    return () => clearTimeout(timeout);
  }, []);

  const handleEdit = (field) => {
    if (!isEditMode) return;
    const newVal = prompt(`Edit ${field}:`, profile[field]);
    if (newVal !== null && newVal.trim() !== '') {
      updateProfile(field, newVal.trim());
    }
  };

  return (
    <header id="home" className="hero-section">
      <div className="hero-content">
        <div className="profile-img-container">
          <img 
            src="https://via.placeholder.com/150/0a0a0f/00d4ff?text=Photo" 
            alt="Profile Picture" 
            className={isEditMode ? 'editable-img editable' : 'editable-img'}
            onClick={isEditMode ? () => console.log('Image edit not implemented in prompt') : undefined}
          />
          <div className="profile-ring"></div>
        </div>
        <h1 
          className={`glitch-text ${isEditMode ? 'editable' : ''}`} 
          onClick={() => handleEdit('name')}
        >
          {profile.name}
        </h1>
        <div className="typing-container">
          <span className="typing-prefix">&gt;&nbsp;</span>
          <span className="typing-text">{typingText}</span>
          <span className="typing-cursor">|</span>
        </div>
        <p 
          className={`hero-bio ${isEditMode ? 'editable' : ''}`}
          onClick={() => handleEdit('bio')}
        >
          {profile.bio}
        </p>
        <div className="hero-cta">
          <a href="#professional-experience" className="btn neon-btn primary-cta">View My Work</a>
          <a href="#contact" className="btn neon-btn secondary-cta">Contact Me</a>
        </div>
      </div>
      <div className="controls">
        <button 
          onClick={toggleEditMode} 
          className="btn edit-toggle-btn"
          style={{ 
            borderColor: isEditMode ? '#ef4444' : '', 
            color: isEditMode ? '#ef4444' : '' 
          }}
        >
          {isEditMode ? '✕ Exit Edit' : '⚙ Edit Mode'}
        </button>
      </div>
    </header>
  );
}
