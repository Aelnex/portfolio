import React from 'react';

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
            <a key={idx} href={link.href}>{link.name}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
