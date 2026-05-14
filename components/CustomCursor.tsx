'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  // Inner dot: near-instant follow
  const dotX = useSpring(rawX, { stiffness: 900, damping: 44, mass: 0.25 });
  const dotY = useSpring(rawY, { stiffness: 900, damping: 44, mass: 0.25 });

  // Outer ring: smooth lag — the "premium" parallax delay
  const ringX = useSpring(rawX, { stiffness: 105, damping: 20, mass: 0.85 });
  const ringY = useSpring(rawY, { stiffness: 105, damping: 20, mass: 0.85 });

  const removeRipple = useCallback((id: number) => {
    setRipples(prev => prev.filter(r => r.id !== id));
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      const el = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(el).cursor === 'pointer' ||
        !!el.closest('a, button, [role="button"], [tabindex]')
      );
    };
    const onDown = (e: MouseEvent) => {
      setIsClicking(true);
      setRipples(prev => [...prev.slice(-3), { id: Date.now(), x: e.clientX, y: e.clientY }]);
    };
    const onUp = () => setIsClicking(false);
    const onLeave = () => setIsHidden(true);
    const onEnter = () => setIsHidden(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [rawX, rawY]);

  if (isHidden) return null;

  return (
    <>
      {/* Outer transparent ring — lags behind cursor, zooms on hover */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000]"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: isClicking ? 0.65 : isPointer ? 1.7 : 1,
          opacity: isClicking ? 0.4 : isPointer ? 0.85 : 0.6,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 22, mass: 0.45 }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            border: '1.5px solid #00ff41',
            backgroundColor: 'transparent',
            boxShadow: isPointer
              ? '0 0 12px rgba(0,255,65,0.5), inset 0 0 8px rgba(0,255,65,0.06)'
              : '0 0 5px rgba(0,255,65,0.22)',
            transition: 'box-shadow 0.22s ease',
          }}
        />
      </motion.div>

      {/* Inner dot — precise fast follow, shrinks when ring zooms */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10001]"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: isClicking ? 2 : isPointer ? 0.3 : 1,
          opacity: isPointer ? 0.6 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        <div
          style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            backgroundColor: '#00ff41',
            boxShadow: '0 0 8px rgba(0,255,65,0.9)',
          }}
        />
      </motion.div>

      {/* Click ripple burst */}
      {ripples.map(r => (
        <motion.div
          key={r.id}
          className="fixed top-0 left-0 pointer-events-none z-[9998]"
          style={{ x: r.x, y: r.y, translateX: '-50%', translateY: '-50%' }}
          initial={{ scale: 0.25, opacity: 0.75 }}
          animate={{ scale: 4.5, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          onAnimationComplete={() => removeRipple(r.id)}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              border: '1px solid rgba(0,255,65,0.55)',
            }}
          />
        </motion.div>
      ))}
    </>
  );
}
