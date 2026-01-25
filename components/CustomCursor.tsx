'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Adaptive color cursor with mix-blend-mode */}
      <motion.div
        className="fixed pointer-events-none z-[10000]"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          mixBlendMode: 'difference',
        }}
        animate={{
          scale: isClicking ? 0.7 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 16,
            height: 16,
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#ffffff',
            border: '2px solid #ffffff',
          }}
        />
      </motion.div>

      {/* Small center dot */}
      <motion.div
        className="fixed pointer-events-none z-[10001]"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          mixBlendMode: 'difference',
        }}
        animate={{
          scale: isClicking ? 0.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 600,
          damping: 30,
        }}
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 4,
            height: 4,
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#ffffff',
          }}
        />
      </motion.div>
    </>
  );
}
