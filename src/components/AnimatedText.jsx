import React from 'react';
import { motion } from 'framer-motion';

/**
 * AnimatedText — reveals text letter-by-letter with a staggered animation.
 * Splits the text into individual characters and animates each one.
 */
export default function AnimatedText({ 
  text = '', 
  tag = 'h1', 
  className = '',
  delay = 0,
  staggerSpeed = 0.03,
  once = false,
  ...props 
}) {
  const letters = text.split('');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerSpeed,
        delayChildren: delay,
      }
    }
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: 'blur(8px)',
      rotateX: -90 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      rotateX: 0,
      transition: { 
        duration: 0.4, 
        ease: [0.25, 0.1, 0.25, 1] 
      } 
    }
  };

  const MotionTag = motion[tag] || motion.div;

  return (
    <MotionTag
      className={`animated-text ${className}`}
      initial="hidden"
      whileInView={props.animate ? undefined : "visible"}
      animate={props.animate}
      viewport={{ once, margin: '0px' }}
      variants={containerVariants}
      style={{ display: 'inline-block', perspective: '600px' }}
      {...props}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          variants={letterVariants}
          style={{ 
            display: 'inline-block',
            whiteSpace: letter === ' ' ? 'pre' : 'normal',
            transformOrigin: 'bottom center'
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </MotionTag>
  );
}
