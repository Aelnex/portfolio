import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function GooeyCursor() {
  const [cursorVariant, setCursorVariant] = useState("default");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs for the main dot (fast, follows closely)
  const dotX = useSpring(mouseX, { stiffness: 1000, damping: 40, mass: 0.1 });
  const dotY = useSpring(mouseY, { stiffness: 1000, damping: 40, mass: 0.1 });

  // Springs for the ring (smooth, slightly delayed)
  const ringX = useSpring(mouseX, { stiffness: 200, damping: 25, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 200, damping: 25, mass: 0.5 });

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onMouseOver = (e) => {
      if (e.target.closest('a, button, .card, .tab-btn, input, textarea')) {
        setCursorVariant("hover");
      }
    };

    const onMouseOut = (e) => {
      if (e.target.closest('a, button, .card, .tab-btn, input, textarea')) {
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

  return (
    <>
      {/* Soft Ambient Glow */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          position: 'fixed',
          top: 0,
          left: 0,
          translateX: '-50%',
          translateY: '-50%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 9997,
        }}
        animate={{
          width: cursorVariant === "hover" ? 120 : 60,
          height: cursorVariant === "hover" ? 120 : 60,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />

      {/* Outer Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          position: 'fixed',
          top: 0,
          left: 0,
          translateX: '-50%',
          translateY: '-50%',
          borderRadius: '50%',
          border: '1.5px solid rgba(0, 212, 255, 0.6)',
          boxShadow: '0 0 15px rgba(0, 212, 255, 0.3)',
          pointerEvents: 'none',
          zIndex: 9998,
        }}
        animate={{
          width: cursorVariant === "hover" ? 50 : 36,
          height: cursorVariant === "hover" ? 50 : 36,
          backgroundColor: cursorVariant === "hover" ? 'rgba(0, 212, 255, 0.1)' : 'transparent',
          borderColor: cursorVariant === "hover" ? 'rgba(0, 212, 255, 1)' : 'rgba(0, 212, 255, 0.6)'
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />

      {/* Inner Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          position: 'fixed',
          top: 0,
          left: 0,
          translateX: '-50%',
          translateY: '-50%',
          borderRadius: '50%',
          backgroundColor: '#00d4ff',
          boxShadow: '0 0 10px #00d4ff, 0 0 20px #00d4ff',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
        animate={{
          width: cursorVariant === "hover" ? 0 : 6,
          height: cursorVariant === "hover" ? 0 : 6,
          opacity: cursorVariant === "hover" ? 0 : 1
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
