'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState<TrailPoint[]>([]);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let trailId = 0;
    let moveTimeout: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);

      // Add trail point
      setTrails((prev) => {
        const newTrail = { x: e.clientX, y: e.clientY, id: trailId++ };
        const updatedTrails = [...prev, newTrail];
        // Keep only last 6 trail points for better performance
        return updatedTrails.slice(-6);
      });

      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        setIsMoving(false);
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(moveTimeout);
    };
  }, []);

  return (
    <>
      {/* Trail circles */}
      {trails.map((trail, index) => (
        <motion.div
          key={trail.id}
          className="fixed pointer-events-none z-[9999] rounded-full bg-primary"
          style={{
            left: trail.x,
            top: trail.y,
            width: 8,
            height: 8,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{
            scale: 0,
            opacity: 0,
          }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-[10000] mix-blend-screen"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        animate={{
          scale: isMoving ? 1.2 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      >
        {/* Single cursor circle */}
        <div
          className="absolute rounded-full bg-primary"
          style={{
            width: 12,
            height: 12,
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 10px rgba(0, 255, 65, 1), 0 0 20px rgba(0, 255, 65, 0.8), 0 0 30px rgba(0, 255, 65, 0.6)',
          }}
        />
      </motion.div>
    </>
  );
}
