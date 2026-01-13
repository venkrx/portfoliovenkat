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
      {/* Outer ring - transparent with green border */}
      <motion.div
        className="fixed pointer-events-none z-[10000]"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        animate={{
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25,
        }}
      >
        <div
          className="absolute rounded-full border-2 border-primary"
          style={{
            width: 32,
            height: 32,
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 255, 65, 0.05)',
            boxShadow: '0 0 20px 5px rgba(0, 255, 65, 0.4), 0 0 40px 10px rgba(0, 255, 65, 0.2)',
            filter: 'drop-shadow(0 0 10px rgba(0, 255, 65, 0.5))',
          }}
        />
      </motion.div>

      {/* Inner dot - semi-transparent green with shadow */}
      <motion.div
        className="fixed pointer-events-none z-[10001]"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        animate={{
          scale: isClicking ? 0.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 6,
            height: 6,
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 255, 65, 0.8)',
            boxShadow: '0 0 15px 3px rgba(0, 255, 65, 0.7), 0 0 25px 5px rgba(0, 255, 65, 0.4)',
            filter: 'drop-shadow(0 0 8px rgba(0, 255, 65, 0.8))',
          }}
        />
      </motion.div>
    </>
  );
}
