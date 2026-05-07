import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactLenis } from '@studio-freight/react-lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import About from './components/About';
import Contact from './components/Contact';
import ParticleBackground from './components/ParticleBackground';
import ReadingProgressBar from './components/ReadingProgressBar';
import Footer from './components/Footer';
import FocusReveal from './components/FocusReveal';
import FloatingElements from './components/FloatingElements';
import BackgroundEffects from './components/BackgroundEffects';
import SectionNavigator from './components/SectionNavigator';
import GooeyCursor from './components/GooeyCursor';
import { usePortfolioContext } from './context/PortfolioContext';

export default function App() {
  const { portfolioData } = usePortfolioContext();

  const currentYear = new Date().getFullYear();

  // Background Perspective Scroll
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const bgBlur = useTransform(scrollYProgress, [0, 0.3, 1], [0, 2, 6]);
  const bgFilter = useTransform(bgBlur, v => `blur(${v}px)`);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.3, 0.15]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0.2]);

  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    portfolioData.navbar.links.forEach((link) => {
      const id = link.href.replace('#', '');
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [portfolioData.navbar.links]);

  return (
    <ReactLenis root>
      <GooeyCursor />
      <ReadingProgressBar />
      <FloatingElements />
      <BackgroundEffects />
      <SectionNavigator 
        links={portfolioData.navbar.links}
        activeSection={activeSection}
      />

      <motion.div style={{ y: bgY, filter: bgFilter, opacity: bgOpacity }} className="parallax-bg-wrapper">
        <ParticleBackground />
      </motion.div>
      <motion.div className="grid-overlay" style={{ opacity: gridOpacity }} />

      <Navbar />

      <div id="app-container">
        <Hero />
        
        <main>
          <FocusReveal delay={0}>
            <Projects />
          </FocusReveal>
          <FocusReveal delay={0.1}>
            <Skills />
          </FocusReveal>
          <FocusReveal delay={0.1}>
            <About />
          </FocusReveal>
          <FocusReveal delay={0.1}>
            <Contact />
          </FocusReveal>
        </main>
        
        <Footer />
      </div>

    </ReactLenis>
  );
}
