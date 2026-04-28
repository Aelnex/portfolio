import React from 'react';
import { motion } from 'framer-motion';

/**
 * FocusReveal — wraps children with a blur-to-focus entrance animation
 * triggered when the element scrolls into view.
 */
export default function FocusReveal({ 
  children, 
  className = '', 
  delay = 0,
  duration = 0.8,
  blurAmount = 12,
  yOffset = 40 
}) {
  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0, 
        y: yOffset, 
        filter: `blur(${blurAmount}px)` 
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)' 
      }}
      viewport={{ once: false, margin: '-80px' }}
      transition={{ 
        duration, 
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      {children}
    </motion.div>
  );
}
