import React from 'react';
import MagneticButton from './MagneticButton';
import { usePortfolioContext } from '../context/PortfolioContext';

export default function Footer() {
  const { portfolioData } = usePortfolioContext();
  const data = portfolioData.footer;
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-content">
        <p className="footer-logo">
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
