import React, { useState, useEffect } from 'react';
import MagneticButton from './MagneticButton';
import { usePortfolioContext } from '../context/PortfolioContext';

export default function Navbar() {
  const { portfolioData } = usePortfolioContext();
  const data = portfolioData.navbar;

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`glass-nav ${scrolled ? 'scrolled' : ''}`} id="main-nav">
      <div className="nav-content">
        <MagneticButton strength={0.2}>
          <a 
            href="#" 
            className="nav-logo"
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
                  onClick={() => setMenuOpen(false)}
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
