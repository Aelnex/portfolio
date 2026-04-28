import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const NUM_TRAILS = 15;

export default function GooeyCursor({ isEditMode }) {
  const [cursorVariant, setCursorVariant] = useState("default");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // We create an array of springs with decreasing stiffness for the trailing effect
  const trails = Array.from({ length: NUM_TRAILS }).map((_, i) => {
    // The main cursor is faster, the trailing ones are slower
    const stiffness = 800 - i * 120;
    const damping = 35 + i * 5;
    const mass = 0.5 + i * 0.1;
    
    return {
      x: useSpring(mouseX, { stiffness: Math.max(100, stiffness), damping, mass }),
      y: useSpring(mouseY, { stiffness: Math.max(100, stiffness), damping, mass }),
    };
  });

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onMouseOver = (e) => {
      if (e.target.closest('a, button, .editable, .card, .tab-btn, input, textarea')) {
        setCursorVariant("hover");
      }
    };

    const onMouseOut = (e) => {
      if (e.target.closest('a, button, .editable, .card, .tab-btn, input, textarea')) {
        setCursorVariant("default");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [mouseX, mouseY]);

  if (isEditMode) return null; // Hide custom cursor in edit mode to avoid interfering with inputs

  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 25 -10"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>
      <div className="gooey-cursor-container" style={{ filter: 'url(#gooey)' }}>
        {trails.map((springs, index) => {
          // Main cursor is larger and slightly different color/opacity
          const isMain = index === 0;
          const size = isMain ? (cursorVariant === "hover" ? 40 : 25) : Math.max(5, 18 - index * 1.2);
          
          return (
            <motion.div
              key={index}
              className="gooey-dot"
              style={{
                x: springs.x,
                y: springs.y,
                width: size,
                height: size,
                translateX: '-50%',
                translateY: '-50%',
                opacity: Math.max(0.1, 1 - index * 0.08)
              }}
              animate={{
                width: size,
                height: size,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          );
        })}
      </div>
    </>
  );
}
