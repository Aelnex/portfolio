import React from 'react';
import MagneticButton from './MagneticButton';

export default function Footer({ data, isEditMode, onUpdateLogo }) {
  const currentYear = new Date().getFullYear();

  const handleEditLogo = () => {
    if (!isEditMode) return;
    const newLogo = prompt("Enter new footer logo text:", data.logo);
    if (newLogo !== null) onUpdateLogo(newLogo);
  };

  return (
    <footer>
      <div className="footer-content">
        <p 
          className={`footer-logo ${isEditMode ? 'editable' : ''}`}
          onClick={handleEditLogo}
        >
          {data.logo}
        </p>
        <p>&copy; <span>{currentYear}</span>. Built with React & ❤️</p>
        <div className="footer-links">
          {data.links.map((link, idx) => (
            <MagneticButton key={idx} strength={0.2}>
              <a href={link.href}>{link.name}</a>
            </MagneticButton>
          ))}
        </div>
      </div>
    </footer>
  );
}
