import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function FloatingElements() {
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -90]);

  return (
    <div className="floating-elements-container" style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* Top Left Sphere */}
      <motion.div 
        style={{ y: y1, rotate: rotate1 }}
        className="glass-shape sphere"
      />
      
      {/* Middle Right Cube */}
      <motion.div 
        style={{ y: y2, rotate: rotate2 }}
        className="glass-shape cube"
      />
      
      {/* Bottom Left Donut */}
      <motion.div 
        style={{ y: y3, rotate: rotate1 }}
        className="glass-shape donut"
      />

      {/* Decorative Glows */}
      <div className="bg-glow blue-glow"></div>
      <div className="bg-glow violet-glow"></div>
    </div>
  );
}
