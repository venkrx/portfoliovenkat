'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Ripple {
  x: number;
  y: number;
  id: number;
}

interface Wave {
  x: number;
  y: number;
  id: number;
}

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [waves, setWaves] = useState<Wave[]>([]);

  useEffect(() => {
    let waveInterval: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleClick = (e: MouseEvent) => {
      const newRipple = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
      };
      setRipples((prev) => [...prev, newRipple]);
      
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 1000);
    };

    // Create waves continuously following mouse
    waveInterval = setInterval(() => {
      const newWave = {
        x: mousePosition.x,
        y: mousePosition.y,
        id: Date.now() + Math.random(),
      };
      setWaves((prev) => [...prev, newWave]);
      
      setTimeout(() => {
        setWaves((prev) => prev.filter((w) => w.id !== newWave.id));
      }, 2000);
    }, 150); // Create a new wave every 150ms

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('click', handleClick);
      clearInterval(waveInterval);
    };
  }, [mousePosition.x, mousePosition.y]);

  return (
    <>
      {/* Continuous Mouse Trail Waves */}
      <AnimatePresence>
        {waves.map((wave) => (
          <motion.div
            key={wave.id}
            className="fixed pointer-events-none z-[9998]"
            style={{
              left: wave.x,
              top: wave.y,
            }}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeOut' }}
          >
            <div
              className="absolute rounded-full border border-primary/40"
              style={{
                width: 50,
                height: 50,
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 15px rgba(0, 255, 65, 0.3)',
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Click Ripple Waves */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="fixed pointer-events-none z-[9999]"
            style={{
              left: ripple.x,
              top: ripple.y,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div
              className="absolute rounded-full border-2 border-primary"
              style={{
                width: 40,
                height: 40,
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 20px rgba(0, 255, 65, 0.6)',
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

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
