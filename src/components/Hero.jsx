import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import MagneticButton from './MagneticButton';
import { usePortfolioContext } from '../context/PortfolioContext';

export default function Hero() {
  const { portfolioData } = usePortfolioContext();
  const profile = portfolioData.profile;

  const [typingText, setTypingText] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);

  // --- 3D Tilt Logic ---
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 100, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    rotateX.set(-y / 12); // Tilt intensity
    rotateY.set(x / 12);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  useEffect(() => {
    const roles = ['Frontend Developer', 'UI Builder', 'Creative Coder', 'Hello <3'];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timer;

    const type = () => {
      const currentRole = roles[roleIdx];
      if (isDeleting) {
        setTypingText(currentRole.substring(0, charIdx - 1));
        charIdx--;
      } else {
        setTypingText(currentRole.substring(0, charIdx + 1));
        charIdx++;
      }

      let speed = isDeleting ? 50 : 100;
      if (!isDeleting && charIdx === currentRole.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        speed = 500;
      }
      timer = setTimeout(type, speed);
    };

    type();
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const charVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } }
  };

  return (
    <motion.header
      id="home"
      className="hero-section"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="hero-content">

        {/* Profile Image with Hologram HUD and Coin-Flip Logic */}
        <motion.div 
          className="profile-img-container" 
          variants={itemVariants}
          style={{ 
            rotateX: springX, 
            rotateY: springY,
            perspective: 1000,
            transformStyle: "preserve-3d" 
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            handleMouseLeave();
            setIsFlipped(false);
          }}
          onMouseEnter={() => setIsFlipped(true)}
          whileHover={{ scale: 1.05 }}
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            y: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          {/* Scanning Line */}
          <div className="scan-line"></div>

          {/* Hologram HUD Background */}
          <div className="hologram-hud">
            <motion.div 
              className="hud-ring"
              animate={{ x: [-12, 12, -12], rotate: [0, 360] }}
              transition={{ 
                x: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 30, repeat: Infinity, ease: "linear" }
              }}
              style={{ opacity: 0.15, border: '1px dashed var(--blue)', inset: '-25px' }}
            />
            <motion.div 
              className="hud-ring-tech"
              animate={{ x: [8, -8, 8], rotate: [0, -360] }}
              transition={{ 
                x: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 15, repeat: Infinity, ease: "linear" }
              }}
              style={{ inset: '-15px', borderTop: '2px solid var(--blue)', opacity: 0.4 }}
            />
          </div>

          <motion.div 
            className="flip-card-inner"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
            style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}
          >
            {/* Front Side (Profile Picture) */}
            <div className="flip-card-front" style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', borderRadius: '50%', overflow: 'hidden' }}>
              <motion.img
                src={profile.image || "https://via.placeholder.com/150/0a0a0f/00d4ff?text=Photo"}
                alt="Profile Picture"
                className="editable-img"
                initial={{ scale: 0.5, rotate: -15, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.2, 0.65, 0.3, 0.9], delay: 0.4 }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.1) brightness(1.1)' }}
              />
            </div>

            {/* Back Side (Faculty Picture) */}
            <div className="flip-card-back" style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', borderRadius: '50%', overflow: 'hidden', transform: 'rotateY(180deg)' }}>
              <img
                src={profile.facultyImage || "https://via.placeholder.com/150/0a0a0f/00d4ff?text=Faculty"}
                alt="Faculty"
                className="editable-img"
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.1) brightness(1.1)' }}
              />
            </div>
          </motion.div>

          {/* Hologram Flicker Overlay */}
          <motion.div 
            className="hologram-overlay"
            animate={{ opacity: [0, 0.1, 0] }}
            transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 5 }}
            style={{ position: 'absolute', inset: 0, background: 'var(--blue)', pointerEvents: 'none', borderRadius: '50%', zIndex: 5 }}
          />

          <div className="profile-ring"></div>
          <div className="profile-ring-outer"></div>
          <div className="profile-backlight"></div>
        </motion.div>

        <motion.h1
          style={{ overflow: 'hidden', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          {profile.name.split('').map((char, index) => (
            <motion.span
              key={index}
              variants={charVariants}
              style={{ display: 'inline-block', minWidth: char === ' ' ? '0.5em' : 'auto' }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.h3 
          className="hero-title"
          variants={itemVariants}
        >
          {profile.title}
        </motion.h3>

        <motion.div className="typing-container" variants={itemVariants}>
          <span className="typing-prefix">&gt; </span>
          <span className="typing-text">{typingText}</span>
          <span className="typing-cursor">_</span>
        </motion.div>

        <motion.p
          className="hero-bio"
          variants={itemVariants}
        >
          {profile.bio}
        </motion.p>

        <motion.div className="hero-cta" variants={itemVariants}>
          <MagneticButton strength={0.35}>
            <motion.a
              href="#professional-experience"
              className="neon-btn primary-cta"
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(0,212,255,0.6)" }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>
          </MagneticButton>
          <MagneticButton strength={0.35}>
            <motion.a
              href="#contact"
              className="neon-btn secondary-cta"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(0,212,255,0.15)" }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </MagneticButton>
        </motion.div>
      </div>
    </motion.header>
  );
}
