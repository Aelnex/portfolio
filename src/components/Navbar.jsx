import React, { useState, useEffect } from 'react';
import MagneticButton from './MagneticButton';

export default function Navbar({ data, isEditMode, onUpdateLogo, onUpdateLink }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEditLogo = (e) => {
    if (!isEditMode) return;
    e.preventDefault();
    const newLogo = prompt("Enter new logo text:", data.logo);
    if (newLogo !== null) onUpdateLogo(newLogo);
  };

  const handleEditLink = (e, idx, currentName) => {
    if (!isEditMode) return;
    e.preventDefault();
    const newName = prompt("Enter new link name:", currentName);
    if (newName !== null) onUpdateLink(idx, newName);
  };

  return (
    <nav className={`glass-nav ${scrolled ? 'scrolled' : ''}`} id="main-nav">
      <div className="nav-content">
        <MagneticButton strength={0.2}>
          <a 
            href="#" 
            className={`nav-logo ${isEditMode ? 'editable' : ''}`}
            onClick={handleEditLogo}
          >
            {data.logo}
          </a>
        </MagneticButton>
        
        <button 
          className="nav-toggle" 
          id="nav-toggle" 
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span><span></span><span></span>
        </button>
        
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`} id="nav-links">
          {data.links.map((link, idx) => (
            <li key={idx}>
              <MagneticButton strength={0.15}>
                <a 
                  href={link.href} 
                  className={isEditMode ? 'editable' : ''}
                  onClick={(e) => {
                    if (isEditMode) {
                      handleEditLink(e, idx, link.name);
                    } else {
                      setMenuOpen(false);
                    }
                  }}
                >
                  {link.name}
                </a>
              </MagneticButton>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
